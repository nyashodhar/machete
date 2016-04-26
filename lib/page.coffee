lib = require '../lib'

module.exports = (template, component) ->
	
	(req, res, next) ->

		component = component or req.params.component

		res.setHeader 'Cache-Control', 'public, max-age=0'
		res.setHeader 'Expires', new Date(Date.now() + 0).toUTCString()

		config =
			cache	: false
			minified: true
			version	: '0.0.1'
			script	: "sonos.machete.#{component}-default-en-US"


		switch component		

			when 'dashboard'
				res.statusCode	= 200
				config.session	= false
				config.uuid		= req.params.id

			else
				config.session	= lib.getsession req

				res.statusCode	= 401
				config.session	= false


		res.render(template, config)