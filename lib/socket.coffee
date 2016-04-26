socketio		= require 'socket.io'
redis			= require('redis').createClient()
cookie			= require 'cookie'
signature		= require 'cookie-signature'
uuid			= require 'node-uuid'
moment			= require 'moment'
lib				= require '../lib'
Q				= require 'q'
EventEmitter	= require('events')



parseSignedCookie = (str, secret) ->
	if str and str.substr(0, 2) is "s:" then signature.unsign(str.slice(2), secret) else str


module.exports = (server, secret, app) ->

	# --- Socket.IO ---------------------------------------------------------------

	io = socketio server


	# Add the socket instance to the app middleware 
	app.use (req, res, next) ->
		req.io = io
		next()


	io.sockets.on 'connection', (socket) ->

		# Specifies which room the client needs to be added to
		socket.on 'addToRoom', (uuid) -> socket.join('dashboard/' + uuid)