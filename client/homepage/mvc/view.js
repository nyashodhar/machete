(function (Backbone) {

	var 
		self	= this,
		gettype = self.get('machete.utils.gettype'),
		mw		= self.get('machete.utils.middleware');

	var getObj = function (str, ctx, sep) {
		return str.split((sep || '.')).filter(function (num) {
			return num.length;
		}).reduce(function (prev, curr, index, list) {
			if (prev) {
				return prev[list[index]];
			}
		}, (ctx || this));
	};
	
	var setObj = function (str, ctx, sep) {
		return str.split((sep || '.')).reduce(function (prev, curr) {
			return (prev[curr]) ? (prev[curr]) : (prev[curr]) = {};
		}, (ctx || this));
	};
	
	var extend = function (obj) {

		var View,
			__hasProp = {}.hasOwnProperty,
			__extends = function (child, parent) {
				for (var key in parent) {
					if (__hasProp.call(parent, key)) {
						child[key] = parent[key];
					}
				}
				function Ctor() {
					this.constructor = child;
				}
				Ctor.prototype	= parent.prototype;
				child.prototype = new Ctor();
				child.__super__ = parent.prototype;
				return child;
			};

		View = (function (_super) {
			__extends(View, _super);
			function View() {

				this.templates = {};

				// Simplified injection utility
				this.inject = function (obj, arr, ctx) {
					ctx = ctx || this;
					arr = gettype(arr, 'array') ? arr : [];
					if (typeof obj === 'object') {
						arr.push('performance');
						for (var key in obj) {
							if (obj.hasOwnProperty(key)) {
								var
									keys	= key.split('.'),
									str		= (keys.length > 1) ? keys.pop() : false,
									fn		= getObj(key, ctx),
									config	= {
										'id'	: ctx.id,
										'name'	: key,
										'arr'	: arr,
										'mw'	: mw,
										'ctx'	: ctx
									};
								if (str) {
									setObj(keys.join('.'), ctx)[str] = self.on(obj[key], fn, ctx);
									if (mw && mw.enabled) {
										setObj(keys.join('.'), ctx)[str] = self.wrap(getObj(key, ctx), mw.controller, config);
									}
								}
								else {
									ctx[key] = self.on(obj[key], fn, ctx);
									if (mw && mw.enabled) {
										ctx[key] = self.wrap(ctx[key], mw.controller, config);
									}
								}
							}
						}
					}
					return ctx;
				};

				View.__super__.constructor.apply(this, arguments);

				// Bind any API events to Backbone.Events								
				for (var event in this.api) {
					if (this.api.hasOwnProperty(event)) {
						Backbone.Events.on(event, this.api[event], this);
					}
				}

				// Broadcast Backbone events on a public channel
				if (this.model) {
					this.model.on('all', function (event, model, value) {
						Backbone.Events.trigger('listener', {
							id		: this.id,
							event	: event,
							value	: value,
							model	: model
						});
					}, this);
				}
				if (this.collection) {
					this.collection.on('all', function (event, collection, value) {
						Backbone.Events.trigger('listener', {
							id			: this.id,
							event		: event,
							value		: value,
							collection	: collection
						});
					}, this);
				}

				// Subscribe this view to the public listener and handle
				// relevant events
				Backbone.Events.on('listener', function (obj) {

					var lstn = this.listener;
					
					if (typeof lstn === 'object') {
					
						var func = lstn['* ' + obj.event] || lstn[obj.id + ' ' + obj.event] || false;

						if (typeof func === 'string') {
							this[func].call(this, obj);
						}
						else if (typeof func === 'function') {
							func.call(this, obj);
						}
					} 

				}, this);

			}
			return View;
		})(obj);
		return View;
	};

	module.exports = extend(Backbone.View.extend({		
		utils: this.get('machete.utils')
	}));

}.call(window.Syringe, window.Backbone));