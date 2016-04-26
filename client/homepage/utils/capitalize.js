(function () {

	this.add('machete.utils.capitalize', function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	});

}.call(window.Syringe));