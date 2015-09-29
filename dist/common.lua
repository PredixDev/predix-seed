local cjson = require "cjson"
local resty_session = require "resty.session"
local M = {}


function M.connect_to_redis ()
    local redis = require "resty.redis"
    local red = redis:new()
    red:set_timeout(10000)

    local vcap_services = cjson.decode(os.getenv("VCAP_SERVICES"))

    local redis_service_name = os.getenv("REDIS")
    local redis_credentials = vcap_services[redis_service_name][1].credentials;
    local redis_host = redis_credentials.host
    local redis_port = redis_credentials.port
    local redis_password = redis_credentials.password

    local ok, err = red:connect(redis_host, redis_port)

    local res, err = red:auth(redis_password)
    return red
end

function M.set_value(session_id, token)
    local red = M.connect_to_redis()
    red:set(session_id, token)
end

function M.get_value(key)
    local red = M.connect_to_redis()
    local value = red:get(key)
    if value == ngx.null
    then
        return nil
    end
    return value
end

function M.get_token()
    local session = resty_session.start()
    return M.get_value(session.id)
end

function M.is_empty(s)
  return s == nil or s == ''
end

function M.delete_token(session_id)
    local red = M.connect_to_redis()
    red:del(session_id)
end

function M.get_session()
    local session = resty_session.start()
    return session;
end

function M.start_session ()
    local session = M.get_session()
    M.delete_token(session.id)
    session:save()
    return session
end

function M.remove_session()
    local session = M.get_session()
    M.delete_token(session.id)
    M.delete_token(session.id..'_user_info')
    session:destroy()
end

function M.redirect_on_invalid_token(redirect_url)
    local token = M.get_token()
    if M.is_empty(token)
    then
        return ngx.redirect(redirect_url)
    end
    return token
end


function M.redirect_on_valid_session(redirect_url)
    local token = M.get_token()
    if not M.is_empty(token)
    then
        return ngx.redirect(redirect_url)
    end

end

function M.exchange_token_for_user_info(token)
    local response = ngx.location.capture(
        '/_internal/_userinfo',
        {
            method = ngx.HTTP_POST,
            body = 'token='..token
        }
    )
    return response.body
end

function get_current_user()
    local session = M.get_session()
    local user_info =  M.get_value(session.id..'_user_info')
    local user_info_table = {}

    if M.is_empty(user_info)
    then
        ngx.status = ngx.HTTP_UNAUTHORIZED;
        user_info_table['error'] = 'unknown_user';
        return user_info_table
    end

    local user_info_json = cjson.decode(user_info)

    user_info_table['user_name'] = user_info_json["user_name"]
    user_info_table['email'] = user_info_json["email"]
    return user_info_table;
end

function M.get_current_user_info()
    return cjson.encode(get_current_user())
end

function M.get_user_email()
    local user_info = get_current_user()
    if not  M.is_empty(user_info['email'])
     then
        return user_info['email']
     end
     return nil
end

return M;
