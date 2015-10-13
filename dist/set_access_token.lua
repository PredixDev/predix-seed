local common = require "common"

function add_user_token_to_header()
	local token = common.get_token()
	if common.is_empty(token)
	then
		ngx.status = ngx.HTTP_FORBIDDEN
		ngx.say('{}')
		ngx.exit(ngx.HTTP_OK)
	end

	-- Change this to use email once nurego provisions user in service now
	ngx.var.user_token = 'Bearer '..token;
end

add_user_token_to_header()
