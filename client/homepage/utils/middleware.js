(function (Backbone) {

	var exec = function (fn, start, stop) {
		this.prevdepth = this.depth++;
		start	= start || (new Date()).getTime();
		fn		= fn();
		stop	= stop	|| (new Date()).getTime();
		this.depth--;

		return {
			ret	: fn,
			time: stop - start
		};
	};

	var insertArrayAt = function (array, index, arrayToInsert) {
		[].splice.apply(array, [index, 0].concat(arrayToInsert));
		return array;
	};

	// Public [component or third-party] function stack
	var pub = [];

	this.add('machete.utils.middleware', (function () {

		return {

			enabled		: true,
			logging		: false,
			depth		: 0,
			prevdepth	: 0,

			set: function (fn, idx) {
				('function' === typeof fn) && (idx ? pub.splice(idx, 0, fn) : pub.push(fn));
				return this;
			},

			controller: function (fn) {

				var 
					self	= this,
					ctx		= self.ctx,
					mw		= self.mw,
					args	= [].slice.call(arguments),
					count	= 0,
					next	= null,
					ret		= null,
					func	= null;

				// Shift the proxied function from the args array.
				args.shift();

				// Prepend the public array items to the component middleware 
				// specification.
				insertArrayAt(self.arr = self.arr.filter(function (item) {
					return (typeof item !== 'function');
				}), 0, pub);

				// Define, augment, and return the `next()` callback that pushes
				// us through the middleware stack
				return next = function () {

					args = args.concat([].slice.call(arguments));

					func = (typeof self.arr[count++] === 'function') 
						? self.arr[count - 1] 
						: mw[self.arr[count - 1]];
						
					return ret = func.apply(self, [fn, args, next]) || ret;
				},

				(next.end = function (val) {
					ret = val || ctx;
				}),

				next(); 
			},

			performance: function (fn, args, next) {

				var
					mw		= this.mw,
					id		= this.id   || 'unknown',
					name	= this.name || 'unknown',
					str		= '',
					obj, i;

				if (mw.logging) {

					for (i = 0; i <= mw.depth; i++) {
						str = (i > 0) ? str + '│   ' : str;
					}

					mw.depth > mw.prevdepth && console.log(str + '│');						
					console.log(str + '├─[%s] \"%s\" start', id, name);
					
					obj	= exec.call(mw, fn);
					
					console.log(str + '│ [%s] \"%s\" end (%sms)', id, name, obj.time);
					console.log(str + '│');			

				}
				else {
					obj	= exec.call(mw, fn);
				}
				next.end(obj.ret);
			}
		};		
	}.call(this)));

}.call(window.Syringe, window.Backbone));