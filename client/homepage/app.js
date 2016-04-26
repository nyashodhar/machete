
/* --- Utilities ----------------------------------------------------------- */

require('utils/alert');
require('utils/getscript');
require('utils/gettype');
require('utils/namespacer');
require('utils/capitalize');
require('utils/transform');
require('utils/middleware');
require('utils/broadcast');
require('utils/refresh');
require('utils/dialog');


// Enhance the Backbone objects
Backbone.View = require('mvc/view');


require('models/dashboard/dashboard');
require('collections/dashboard/dashboard');


// Inject the app MVC components
require('views/dashboard');


(function (Backbone, Handlebars, Modernizr) {

	var 
		APP	= 'machete',
		app	= this.get(APP);


	Handlebars.registerHelper('ifObject', function(item, options) {
		if(typeof item === 'object') {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});


	Handlebars.registerHelper('breaklines', function (text) {
		text = Handlebars.Utils.escapeExpression(text);
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return new Handlebars.SafeString(text);
	});

	this

		// Specify the websocket message handler
		.add(APP + '.messaging.io', io ? io.connect() : false)

		// Provide a pointer to the app templates
		.add(APP + '.templates', Handlebars.compiled.dashboard)

		// Upload view
		.add(APP + '.views.dashboard', new app.views.Dashboard({id: 'dashboard'}))

		// Add container for page title
		.add(APP + '.dom.title', [])

		// Add flag for touchscreen
		.add(APP + '.data.touch', Modernizr.touch)

		// Bind major page elements to the injector
		.exec(APP + '.utils.refresh')

		// Start any views subscribed to the wakeup event
		.exec(APP + '.utils.broadcast', {id: 'app', event: 'wakeup'});

}.apply(window.Syringe, [
	window.Backbone,
	window.Handlebars,
	window.Modernizr
]));

