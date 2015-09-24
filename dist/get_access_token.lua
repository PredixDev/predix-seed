local common = require "common"
local cjson = require "cjson"

targetUrl = ''

function exchange_code_for_token (code)
    targetUrl = ngx.req.get_uri_args().state
    local response = ngx.location.capture(
        '/_internal/_access_token',
        {
            method = ngx.HTTP_POST,
            body = 'grant_type=authorization_code&code='..code..'&redirect_uri=https%3A%2F%2F'..ngx.var.host..'%2Fcallback&state='..targetUrl
        }
    )
    local json = cjson.decode(response.body)
    return json.access_token
end

function get_token_from_request()
    local query_parameters = ngx.req.get_uri_args()

    if query_parameters.code then
        local access_token = exchange_code_for_token(query_parameters.code)
        local session = common.start_session()
        common.set_value(session.id, access_token)

        local user_info = common.exchange_token_for_user_info(access_token)
        common.set_value(session.id..'_user_info', user_info)
        return ngx.redirect(targetUrl)
    end
end

return get_token_from_request();