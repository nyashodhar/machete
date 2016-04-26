(function (Backbone) {
	return this.add('machete.collections.Dashboard', Backbone.Collection.extend({
		model: this.get('machete.models.Dashboard'),
		initialize: function (props) {
			this.url = props.url;
		}
	}));
}.call(window.Syringe, window.Backbone));