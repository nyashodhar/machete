(function () {

	this.add('machete.utils.namespacer', function (ns, nsObj, sep) {
		var obj, _i, _len;
		nsObj = nsObj || this;
		ns = ns.split(sep || '.');
		for (_i = 0, _len = ns.length; _i < _len; _i++) {
			obj = ns[_i];
			nsObj = (nsObj[obj] = nsObj[obj] || {});
		}
		return nsObj;
	});

}.call(window.Syringe));