(function ($, Backbone) {
	this.add('machete.utils.broadcast', function (gettype, props) {
		if (gettype(props, 'object')) {
			Backbone.Events.trigger('listener', props);
		}
		return this;
	}, ['machete.utils.gettype']);
}.apply(window.Syringe, [
	window.jQuery, 
	window.Backbone
]));