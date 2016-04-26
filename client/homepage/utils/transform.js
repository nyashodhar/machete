(function () {

	this.add('machete.utils.transform', function (transform, obj, fn) {

		var _key, getType;

		getType = function (obj, istype) {
			var
				ret		= 'Undefined',
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
		};

		if (!getType(fn, 'function')) {
			return obj;
		}

		if (getType(obj, 'object')) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					_key = fn(key, obj[key], obj);
					if (!getType(_key, 'undefined')) {
						obj[key] = _key;
					}			
					if (getType(obj[key], 'array') || getType(obj[key], 'object')) {					
						transform(obj[key], fn);
					}
				}
			}
		} else if (getType(obj, 'array')) {
			obj.forEach(function (item) {
				transform(item, fn);
			});
		}

		return obj;
	}, ['machete.utils.transform']);

}.call(window.Syringe));