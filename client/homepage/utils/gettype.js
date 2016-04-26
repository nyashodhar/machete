(function () {

	this.add('machete.utils.gettype', function (obj, istype) {

		var ret		= 'Undefined',
			types	= ['Window', 'HTMLDocument', 'Global', 'Document'];

		if (obj) {

			ret = ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1];

			types = types.some(function (item) {
				return item.toLowerCase() === ret.toLowerCase();
			});

			ret = types ? 'Object' : ret;

		} else {

			if (obj === null) {
				ret = 'Null';
			} else if (obj === false) {
				ret = 'Boolean';
			} else if (typeof obj === 'string') {
				ret = 'String';
			} else if (obj === 0) {
				ret = 'Number';
			} else if (isNaN(obj) && typeof obj === 'number') {
				ret = 'NaN';
			}
		}
		if (typeof istype === 'string') {
			return (istype.toLowerCase() === ret.toLowerCase());
		} else {
			return ret;
		}
	});

}.call(window.Syringe));