(function (Backbone) {
	return this.add('machete.models.Dashboard', Backbone.DeepModel.extend({
		initialize: function (props) {
			this.url = props.url;
		}
	}));
}.call(window.Syringe, window.Backbone));