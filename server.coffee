
# -----------------------------------------------------------------------------
# --- Vendor Modules ----------------------------------------------------------
# -----------------------------------------------------------------------------

express			= require 'express'
connect			= require 'connect'
colors			= require 'colors'
session			= require 'express-session'
RedisStore		= require('connect-redis')(session)
http			= require 'http'
bodyParser		= require 'body-parser'
cookieParser	= require 'cookie-parser'
connectAssets	= require 'connect-assets'
socketio		= require 'socket.io'
request			= require 'request'
redis			= require 'redis'
fs				= require 'fs'


# -----------------------------------------------------------------------------
# --- Local Modules -----------------------------------------------------------
# -----------------------------------------------------------------------------

socket		= require './lib/socket'
lib			= require './lib'
routes		= require './routes'

error		= lib.error
cors		= lib.cors
page		= lib.page
getdata		= routes.getdata


# -----------------------------------------------------------------------------
# --- Configure App -----------------------------------------------------------
# -----------------------------------------------------------------------------

http.globalAgent.maxSockets = 100

app	= express()
app.set 'view engine', 'jade'
app.set 'trust proxy', true
app.set 'json spaces', 3


# -----------------------------------------------------------------------------
# --- Create Redis Client and Middleware --------------------------------------
# -----------------------------------------------------------------------------

client = redis.createClient()

#client.flushdb()
app.use (req, res, next) ->
	req.cache = do () ->
		get: (key, fn) ->  client.get(key, (err, reply) -> fn err, JSON.parse(reply))
		set: (key, val) -> client.set key, JSON.stringify(val)
	next()


# -----------------------------------------------------------------------------
# --- Middleware --------------------------------------------------------------
# -----------------------------------------------------------------------------

app.use connectAssets()

app
	.use(bodyParser.json({limit: '50mb'}))
	.use(bodyParser.urlencoded())
	.use(cookieParser())
	.use(session(
		secret	: (secret = 'keyboard ecat')
		store	: new RedisStore()
	))


# -----------------------------------------------------------------------------
# --- Server and Socket Instances ---------------------------------------------
# -----------------------------------------------------------------------------

server = http.Server(app)
socket(server, secret, app)


# -----------------------------------------------------------------------------
# ----- Routing ---------------------------------------------------------------
# -----------------------------------------------------------------------------

app.get '/api/machete', getdata

app.get '/machete/:component', page('main')


# -----------------------------------------------------------------------------
# --- Start Server ------------------------------------------------------------
# -----------------------------------------------------------------------------
# 
server.listen 4007, -> console.log 'Express server listening on port '.green + (4007 + '').yellow
