// backbone-structured-events-min.js v0.1.8
(function(){var q=[].slice,r=/\s+/,j=function(a,c,b,d){if(!b)return!0;if("object"===typeof b)for(var e in b)b.hasOwnProperty(e)&&a[c].apply(a,[e,b[e]].concat(d));else if(r.test(b)){b=b.split(r);e=0;for(var f=b.length;e<f;e++)a[c].apply(a,[b[e]].concat(d))}else return!0},n=function(a,c){var b,d=-1,e=a.length;switch(c.length){case 0:for(;++d<e;)(b=a[d]).callback.call(b.ctx);break;case 1:for(;++d<e;)(b=a[d]).callback.call(b.ctx,c[0]);break;case 2:for(;++d<e;)(b=a[d]).callback.call(b.ctx,c[0],c[1]);break; case 3:for(;++d<e;)(b=a[d]).callback.call(b.ctx,c[0],c[1],c[2]);break;default:for(;++d<e;)(b=a[d]).callback.apply(b.ctx,c)}},m,h=".",t=Object.prototype.toString,k=function(a){return t.call(a).slice(8,-1)},u=function(a,c,b){c=c||window;a=a.split(b||h);var d,e;d=0;for(e=a.length;d<e;d++)b=a[d],c=c[b]=c[b]||{};return c},p=function(a,c,b){c=c||window;a=a.split(b||h);a=_.filter(a,function(a){return a.length});b=null;return b=_.reduce(a,function(a,b,c,g){if(a)return a[g[c]]},c)},l=function(a,c,b){var d, e={};if("Function"!==k(c))return a;if("Object"===k(a))for(d in a)a.hasOwnProperty(d)&&c(d,a[d],a,b)&&(e[d]="Object"===k(a[d])?l(a[d],c,d):a[d]);return e},s=function(a,c,b){var d,e,f,g;d=[];e=0;for(f=a.length;e<f;e++)g=a[e],(c&&c!==g.callback&&c!==g.callback._callback||b&&b!==g.context)&&d.push(g);return d};m={on:function(a,c,b){if(!j(this,"on",a,[c,b])||!c)return this;this._events||(this._events={});var d=p(a,this._events);(d&&d._events||(u(a,this._events)._events=[])).push({callback:c,context:b, ctx:b||this});return this},once:function(a,c,b){if(!j(this,"once",a,[c,b])||!c)return this;var d=this,e=_.once(function(){d.off(a,e);c.apply(this,arguments)});e._callback=c;this.on(a,e,b);return this},off:function(a,c,b){if(!this._events||!j(this,"off",a,[c,b]))return this;if(!a&&!c&&!b)return this._events={},this;this._events=l(this._events,function(d,e,f,g){return a?c||b?("_events"===d&&(a.split(h).pop()===g&&"Array"===k(e))&&(f[d]=s(e,c,b)),!0):"_events"===d&&a.split(h).pop()===g?!1:!0:c||b?("_events"=== d&&"Array"===k(e)&&(f[d]=s(e,c,b)),!0):!1});this._events=l(this._events,function(a,b){return _.isEmpty(b)?!1:!0});return this},trigger:function(a){if(!this._events)return this;var c=q.call(arguments,1);if(!j(this,"trigger",a,c))return this;var b=this._events.all&&this._events.all._events,d=p(a,this._events);(d=d?d._events:!1)&&n(d,c);b&&n(b,arguments);return this},setSeperator:function(a){h=a&&a.toString()||h;return this},destroy:function(a){if(!this._events||!j(this,"destroy",a))return this;if(!a)return this._events= {},this;var c=a.split(h),b=!1;a="*"!==c[c.length-1]?c.pop():(b=!0)&&c[c.length-2];this._events=l(this._events,function(c,e,f,g){return b?a===g&&"_events"!==c?!1:!0:a===c?!1:!0});return this},deepTrigger:function(a){if(!this._events)return this;var c=q.call(arguments,1);if(!j(this,"deepTrigger",a,c))return this;var b=a.split(h),d=!1,e=[],f={};a="*"!==b[b.length-1]?b[b.length-1]:(d=!0)&&b[b.length-2];d&&b.pop();if(f=p(b.join("."),this._events))!d&&f._events&&e.push(f._events),l(f,function(a,b){b._events&& e.push(b._events);return!0});_.each(e,function(a){n(a,c)});return this},listenTo:function(a,c,b){var d=this._listeners||(this._listeners={}),e=a._listenerId||(a._listenerId=_.uniqueId("l"));d[e]=a;a.on(c,"object"===typeof c?this:b,this);return this},stopListening:function(a,c,b){var d=this._listeners;if(!d)return this;var e=!c&&!b;"object"===typeof c&&(b=this);a&&((d={})[a._listenerId]=a);for(var f in d)d.hasOwnProperty(f)&&(d[f].off(c,b,this),e&&delete this._listeners[f]);return this}};this.Backbone? (_.extend(this.Backbone.Events,m),_.extend(this.Backbone,m)):this.__Events__=m}).call(this);