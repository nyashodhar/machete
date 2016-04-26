module.exports = (req, res, next) ->
	res.header "Access-Control-Allow-Origin", "*"
	res.header "Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept"
	res.header "Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS"
	res.header "Access-Control-Max-Age", "1728000"
	res.header "Access-Control-Allow-Credentials", true
	res.header "Vary", "Accept-Encoding, Cookie"
	next()