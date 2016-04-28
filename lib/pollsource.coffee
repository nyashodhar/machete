request 		= require 'request'
moment			= require 'moment'
Q				= require 'q'
colors			= require 'colors'
cookie			= require 'cookie'
signature		= require 'cookie-signature'
util			= require 'util'

URL	= 'http://localhost:8080/environments/getinfo'
KEY	= 'dashboard'
POL = 300000

# Promise-ified call to Request
requestify = (options) ->
	deferred = Q.defer()
	request options, (err, resp) ->
		if err then deferred.reject err
		else deferred.resolve resp
	deferred.promise


# Promise-ified call to the REDIS cache
redisify = (req, name) ->
	deferred = Q.defer()
	req.cache.get name, (err, obj) ->
		if err then deferred.reject err
		else deferred.resolve obj
	deferred.promise


# Returns a function that either invokes call to a remote service or
# retrieves the current JSON data from the REDIS cache. The former
# action also starts the long poll to the remote server, the result
# of which updates the REDIS cache at timed intervals.
module.exports = () ->
	id = null
	go = 0
	fn = (req) -> 
		requestify({url: URL, json: true}).then((data) -> 	
			console.log "[#{moment().format('HH:mm:ss A').yellow}] REDIS cache refreshed"
			req.io.sockets.in('dashboard/sync').emit('cache/refreshed', POL)
			data = data.body
			req.cache.set(KEY, data)
			data)
	(req) ->

		unless go
			console.log "[#{moment().format('HH:mm:ss A').yellow}] Return data from remote server and start the #{(POL + 'ms').white} poll"
			go = !0
			id = setInterval((() -> fn(req)), POL)
			fn(req)

		else
			console.log "[#{moment().format('HH:mm:ss A').yellow}] Return data from REDIS cache"
			redisify(req, KEY)





