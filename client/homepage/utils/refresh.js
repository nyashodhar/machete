(function () {
	this.add('machete.utils.refresh', function () {
		return this.dom({
			'action'	: 'add',
			'processor'	: function (el) { return $(el); }
		});
	}.bind(this));	
}.call(window.Syringe));