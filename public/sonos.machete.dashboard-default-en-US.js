/* File: sonos.machete.dashboard-default-en-US.js */
/* Generated on Wed Apr 27 2016 20:10:11 GMT-0700 (PDT) by yashodhar.narvaneni */

(function( /*! Packaged using Combine.js v2.6.0 by Michael Holt !*/ ) {

    "use strict";

    (function( /*! Stitch !*/ ) {
        if (!this.dashboard_require) {
            var modules = {}, cache = {}, require = function(name, root) {
                    var path = expand(root, name),
                        module = cache[path],
                        fn;
                    if (module) {
                        return module.exports;
                    } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
                        module = {
                            id: path,
                            exports: {}
                        };
                        try {
                            cache[path] = module;
                            fn(module.exports, function(name) {
                                return require(name, dirname(path));
                            }, module);
                            return module.exports;
                        } catch (err) {
                            delete cache[path];
                            throw err;
                        }
                    } else {
                        throw 'module \'' + name + '\' not found';
                    }
                }, expand = function(root, name) {
                    var results = [],
                        parts, part;
                    if (/^\.\.?(\/|$)/.test(name)) {
                        parts = [root, name].join('/').split('/');
                    } else {
                        parts = name.split('/');
                    }
                    for (var i = 0, length = parts.length; i < length; i++) {
                        part = parts[i];
                        if (part == '..') {
                            results.pop();
                        } else if (part != '.' && part != '') {
                            results.push(part);
                        }
                    }
                    return results.join('/');
                }, dirname = function(path) {
                    return path.split('/').slice(0, -1).join('/');
                };
            this.dashboard_require = function(name) {
                return require(name, '');
            }
            this.dashboard_require.define = function(bundle) {
                for (var key in bundle)
                    modules[key] = bundle[key];
            };
        }
        return this.dashboard_require.define;
    }).call(this)({
        "app": function(exports, require, module) {

            /* Original CommonJS module source: app.js */
            (function() {
                'use strict';

                /* --- Utilities ----------------------------------------------------------- */

                require('utils/alert');
                require('utils/getscript');
                require('utils/gettype');
                require('utils/namespacer');
                require('utils/capitalize');
                require('utils/transform');
                require('utils/middleware');
                require('utils/broadcast');
                require('utils/refresh');
                require('utils/dialog');


                // Enhance the Backbone objects
                Backbone.View = require('mvc/view');


                require('models/dashboard/dashboard');
                require('collections/dashboard/dashboard');


                // Inject the app MVC components
                require('views/dashboard');


                (function(Backbone, Handlebars, Modernizr) {

                    var
                    APP = 'machete',
                        app = this.get(APP);


                    Handlebars.registerHelper('ifObject', function(item, options) {
                        if (typeof item === 'object') {
                            return options.fn(this);
                        } else {
                            return options.inverse(this);
                        }
                    });


                    Handlebars.registerHelper('breaklines', function(text) {
                        text = Handlebars.Utils.escapeExpression(text);
                        text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
                        return new Handlebars.SafeString(text);
                    });

                    this

                    // Specify the websocket message handler
                    .add(APP + '.messaging.io', io ? io.connect() : false)

                    // Provide a pointer to the app templates
                    .add(APP + '.templates', Handlebars.compiled.dashboard)

                    // Upload view
                    .add(APP + '.views.dashboard', new app.views.Dashboard({
                        id: 'dashboard'
                    }))

                    // Add container for page title
                    .add(APP + '.dom.title', [])

                    // Add flag for touchscreen
                    .add(APP + '.data.touch', Modernizr.touch)

                    // Bind major page elements to the injector
                    .exec(APP + '.utils.refresh')

                    // Start any views subscribed to the wakeup event
                    .exec(APP + '.utils.broadcast', {
                        id: 'app',
                        event: 'wakeup'
                    });

                }.apply(window.Syringe, [
                    window.Backbone,
                    window.Handlebars,
                    window.Modernizr
                ]));

            }.call(window));

        },
        "collections/dashboard/dashboard": function(exports, require, module) {

            /* Original CommonJS module source: collections/dashboard/dashboard.js */
            (function() {
                'use strict';
                (function(Backbone) {
                    return this.add('machete.collections.Dashboard', Backbone.Collection.extend({
                        model: this.get('machete.models.Dashboard'),
                        initialize: function(props) {
                            this.url = props.url;
                        }
                    }));
                }.call(window.Syringe, window.Backbone));
            }.call(window));

        },
        "models/dashboard/dashboard": function(exports, require, module) {

            /* Original CommonJS module source: models/dashboard/dashboard.js */
            (function() {
                'use strict';
                (function(Backbone) {
                    return this.add('machete.models.Dashboard', Backbone.DeepModel.extend({
                        initialize: function(props) {
                            this.url = props.url;
                        }
                    }));
                }.call(window.Syringe, window.Backbone));
            }.call(window));

        },
        "mvc/view": function(exports, require, module) {

            /* Original CommonJS module source: mvc/view.js */
            (function() {
                'use strict';
                (function(Backbone) {

                    var
                    self = this,
                        gettype = self.get('machete.utils.gettype'),
                        mw = self.get('machete.utils.middleware');

                    var getObj = function(str, ctx, sep) {
                        return str.split((sep || '.')).filter(function(num) {
                            return num.length;
                        }).reduce(function(prev, curr, index, list) {
                            if (prev) {
                                return prev[list[index]];
                            }
                        }, (ctx || this));
                    };

                    var setObj = function(str, ctx, sep) {
                        return str.split((sep || '.')).reduce(function(prev, curr) {
                            return (prev[curr]) ? (prev[curr]) : (prev[curr]) = {};
                        }, (ctx || this));
                    };

                    var extend = function(obj) {

                        var View,
                            __hasProp = {}.hasOwnProperty,
                            __extends = function(child, parent) {
                                for (var key in parent) {
                                    if (__hasProp.call(parent, key)) {
                                        child[key] = parent[key];
                                    }
                                }

                                function Ctor() {
                                    this.constructor = child;
                                }
                                Ctor.prototype = parent.prototype;
                                child.prototype = new Ctor();
                                child.__super__ = parent.prototype;
                                return child;
                            };

                        View = (function(_super) {
                            __extends(View, _super);

                            function View() {

                                this.templates = {};

                                // Simplified injection utility
                                this.inject = function(obj, arr, ctx) {
                                    ctx = ctx || this;
                                    arr = gettype(arr, 'array') ? arr : [];
                                    if (typeof obj === 'object') {
                                        arr.push('performance');
                                        for (var key in obj) {
                                            if (obj.hasOwnProperty(key)) {
                                                var
                                                keys = key.split('.'),
                                                    str = (keys.length > 1) ? keys.pop() : false,
                                                    fn = getObj(key, ctx),
                                                    config = {
                                                        'id': ctx.id,
                                                        'name': key,
                                                        'arr': arr,
                                                        'mw': mw,
                                                        'ctx': ctx
                                                    };
                                                if (str) {
                                                    setObj(keys.join('.'), ctx)[str] = self.on(obj[key], fn, ctx);
                                                    if (mw && mw.enabled) {
                                                        setObj(keys.join('.'), ctx)[str] = self.wrap(getObj(key, ctx), mw.controller, config);
                                                    }
                                                } else {
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
                                    this.model.on('all', function(event, model, value) {
                                        Backbone.Events.trigger('listener', {
                                            id: this.id,
                                            event: event,
                                            value: value,
                                            model: model
                                        });
                                    }, this);
                                }
                                if (this.collection) {
                                    this.collection.on('all', function(event, collection, value) {
                                        Backbone.Events.trigger('listener', {
                                            id: this.id,
                                            event: event,
                                            value: value,
                                            collection: collection
                                        });
                                    }, this);
                                }

                                // Subscribe this view to the public listener and handle
                                // relevant events
                                Backbone.Events.on('listener', function(obj) {

                                    var lstn = this.listener;

                                    if (typeof lstn === 'object') {

                                        var func = lstn['* ' + obj.event] || lstn[obj.id + ' ' + obj.event] || false;

                                        if (typeof func === 'string') {
                                            this[func].call(this, obj);
                                        } else if (typeof func === 'function') {
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
            }.call(window));

        },
        "utils/alert": function(exports, require, module) {

            /* Original CommonJS module source: utils/alert.js */
            (function() {
                'use strict';
                (function($, Backbone) {

                    var
                    $body = $('body'),
                        animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                        timeoutid = false;

                    this.add('machete.utils.alert', function(template, props) {

                        props = props || {};

                        if (!timeoutid && ((typeof props.type === 'string') || (typeof props.message === 'string'))) {

                            timeoutid = true;

                            var close = function() {
                                $el.one(animationend, function() {
                                    $el.remove();
                                    if (typeof props.onclosed === 'function') {
                                        props.onclosed();
                                    }
                                });
                                $el.removeClass('fadeInDown').addClass('fadeOutUp');
                                clearTimeout(timeoutid);
                                timeoutid = false;
                            };

                            var $el = $(template({
                                type: props.type,
                                title: (typeof props.title === 'string') ? props.title : false,
                                message: (typeof props.message === 'string') ? props.message : false,
                                icon: (props.type === 'info') ? 'info' : (typeof props.icon === 'string' ? props.icon : 'alert')
                            }));

                            $el.find('button').mousedown(close);
                            $el.one(animationend, function() {

                                if (typeof props.onopen === 'function') {
                                    props.onopen();
                                }

                                if ((typeof props.timeout === 'number') ? props.timeout : false) {
                                    timeoutid = setTimeout(close, props.timeout);
                                }
                            });

                            $body.append($el);
                            return $el;
                        } else {
                            return false;
                        }

                    }, ['machete.templates.alert']);

                }.apply(window.Syringe, [
                    window.jQuery,
                    window.Backbone
                ]));
            }.call(window));

        },
        "utils/broadcast": function(exports, require, module) {

            /* Original CommonJS module source: utils/broadcast.js */
            (function() {
                'use strict';
                (function($, Backbone) {
                    this.add('machete.utils.broadcast', function(gettype, props) {
                        if (gettype(props, 'object')) {
                            Backbone.Events.trigger('listener', props);
                        }
                        return this;
                    }, ['machete.utils.gettype']);
                }.apply(window.Syringe, [
                    window.jQuery,
                    window.Backbone
                ]));
            }.call(window));

        },
        "utils/capitalize": function(exports, require, module) {

            /* Original CommonJS module source: utils/capitalize.js */
            (function() {
                'use strict';
                (function() {

                    this.add('machete.utils.capitalize', function(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    });

                }.call(window.Syringe));
            }.call(window));

        },
        "utils/dialog": function(exports, require, module) {

            /* Original CommonJS module source: utils/dialog.js */
            (function() {
                'use strict';
                (function($) {

                    var $body = $('body');

                    this.add('machete.utils.dialog', function($els, t, props) {

                        props = (typeof props === 'object') ? props : {};

                        if ((typeof t.dialog.base === 'function') && (typeof props.html === 'string' || props.html instanceof $)) {

                            var
                            html = (props.html instanceof $) ? props.html.html() : props.html,
                                dismissable = (props.dismissable === false) ? false : true,
                                $dlg = $('dialog');

                            $dlg.length && $dlg.remove();

                            $dlg = $(t.dialog.base({
                                foreground: (props.foreground === false) ? false : true,
                                background: (props.background === false) ? false : true,
                                width: props.width || 'auto',
                                height: props.height || 'auto',
                                class: props.class || false,
                                html: html
                            }));

                            $body.addClass('noscroll');

                            if (props.anchor) {
                                $(props.anchor).append($dlg);
                            } else {
                                $body.append($dlg);
                            }

                            $dlg.one('close.dialog', function(e) {
                                $body.off('keydown.dialog');
                                $body.removeClass('noscroll');
                                $dlg.remove();
                            });

                            $dlg.click(function(e) {
                                dismissable && $(e.target).is('dialog') && $dlg.trigger('close.dialog');
                            });

                            $body.on('keydown.dialog', function(e) {
                                dismissable && e.keyCode === 27 && $dlg.trigger('close.dialog');
                            });

                            typeof props.callback === 'function' && props.callback($dlg);

                            $dlg.find('button.btn-default:first').focus();


                            $dlg.find('button.btn.cancel').one('click', function(e) {
                                $dlg.trigger('close.dialog');
                            });

                            return $dlg;
                        }

                        return false;

                    }.bind(this), ['machete.$els', 'machete.templates']);

                }.apply(window.Syringe, [window.jQuery]));
            }.call(window));

        },
        "utils/getscript": function(exports, require, module) {

            /* Original CommonJS module source: utils/getscript.js */
            (function() {
                'use strict';
                jQuery.extend({
                    getScript: function(props) {

                        var p = props.src,
                            l = props.fn,
                            id = props.id || false;

                        var n = document.getElementsByTagName("body")[0],
                            o = document.createElement("script"),
                            m = false;
                        o.src = p + "?rand=" + (new Date()).getTime();

                        if (id) {
                            o.id = id;
                        }

                        o.async = true;
                        o.onload = o.onreadystatechange = function() {
                            if (!m && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                                m = true;
                                if (l) {
                                    l();
                                }
                                o.onload = o.onreadystatechange = null;
                            }
                        };
                        n.appendChild(o);
                        return;
                    }
                });
            }.call(window));

        },
        "utils/gettype": function(exports, require, module) {

            /* Original CommonJS module source: utils/gettype.js */
            (function() {
                'use strict';
                (function() {

                    this.add('machete.utils.gettype', function(obj, istype) {

                        var ret = 'Undefined',
                            types = ['Window', 'HTMLDocument', 'Global', 'Document'];

                        if (obj) {

                            ret = ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1];

                            types = types.some(function(item) {
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
            }.call(window));

        },
        "utils/middleware": function(exports, require, module) {

            /* Original CommonJS module source: utils/middleware.js */
            (function() {
                'use strict';
                (function(Backbone) {

                    var exec = function(fn, start, stop) {
                        this.prevdepth = this.depth++;
                        start = start || (new Date()).getTime();
                        fn = fn();
                        stop = stop || (new Date()).getTime();
                        this.depth--;

                        return {
                            ret: fn,
                            time: stop - start
                        };
                    };

                    var insertArrayAt = function(array, index, arrayToInsert) {
                        [].splice.apply(array, [index, 0].concat(arrayToInsert));
                        return array;
                    };

                    // Public [component or third-party] function stack
                    var pub = [];

                    this.add('machete.utils.middleware', (function() {

                        return {

                            enabled: true,
                            logging: false,
                            depth: 0,
                            prevdepth: 0,

                            set: function(fn, idx) {
                                ('function' === typeof fn) && (idx ? pub.splice(idx, 0, fn) : pub.push(fn));
                                return this;
                            },

                            controller: function(fn) {

                                var
                                self = this,
                                    ctx = self.ctx,
                                    mw = self.mw,
                                    args = [].slice.call(arguments),
                                    count = 0,
                                    next = null,
                                    ret = null,
                                    func = null;

                                // Shift the proxied function from the args array.
                                args.shift();

                                // Prepend the public array items to the component middleware 
                                // specification.
                                insertArrayAt(self.arr = self.arr.filter(function(item) {
                                    return (typeof item !== 'function');
                                }), 0, pub);

                                // Define, augment, and return the `next()` callback that pushes
                                // us through the middleware stack
                                return next = function() {

                                    args = args.concat([].slice.call(arguments));

                                    func = (typeof self.arr[count++] === 'function') ? self.arr[count - 1] : mw[self.arr[count - 1]];

                                    return ret = func.apply(self, [fn, args, next]) || ret;
                                },

                                (next.end = function(val) {
                                    ret = val || ctx;
                                }),

                                next();
                            },

                            performance: function(fn, args, next) {

                                var
                                mw = this.mw,
                                    id = this.id || 'unknown',
                                    name = this.name || 'unknown',
                                    str = '',
                                    obj, i;

                                if (mw.logging) {

                                    for (i = 0; i <= mw.depth; i++) {
                                        str = (i > 0) ? str + '│   ' : str;
                                    }

                                    mw.depth > mw.prevdepth && console.log(str + '│');
                                    console.log(str + '├─[%s] \"%s\" start', id, name);

                                    obj = exec.call(mw, fn);

                                    console.log(str + '│ [%s] \"%s\" end (%sms)', id, name, obj.time);
                                    console.log(str + '│');

                                } else {
                                    obj = exec.call(mw, fn);
                                }
                                next.end(obj.ret);
                            }
                        };
                    }.call(this)));

                }.call(window.Syringe, window.Backbone));
            }.call(window));

        },
        "utils/namespacer": function(exports, require, module) {

            /* Original CommonJS module source: utils/namespacer.js */
            (function() {
                'use strict';
                (function() {

                    this.add('machete.utils.namespacer', function(ns, nsObj, sep) {
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
            }.call(window));

        },
        "utils/refresh": function(exports, require, module) {

            /* Original CommonJS module source: utils/refresh.js */
            (function() {
                'use strict';
                (function() {
                    this.add('machete.utils.refresh', function() {
                        return this.dom({
                            'action': 'add',
                            'processor': function(el) {
                                return $(el);
                            }
                        });
                    }.bind(this));
                }.call(window.Syringe));
            }.call(window));

        },
        "utils/transform": function(exports, require, module) {

            /* Original CommonJS module source: utils/transform.js */
            (function() {
                'use strict';
                (function() {

                    this.add('machete.utils.transform', function(transform, obj, fn) {

                        var _key, getType;

                        getType = function(obj, istype) {
                            var
                            ret = 'Undefined',
                                types = ['Window', 'HTMLDocument', 'Global', 'Document'];

                            if (obj) {

                                ret = ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1];

                                types = types.some(function(item) {
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
                            obj.forEach(function(item) {
                                transform(item, fn);
                            });
                        }

                        return obj;
                    }, ['machete.utils.transform']);

                }.call(window.Syringe));
            }.call(window));

        },
        "views/dashboard": function(exports, require, module) {

            /* Original CommonJS module source: views/dashboard.js */
            (function() {
                'use strict';
                (function($, Backbone, moment, Modernizr) {

                    var
                    transitionend = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                        animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                    return this.add('machete.views.Dashboard', Backbone.View.extend({

                        /**
                         * [events description]
                         * @type {Object}
                         */
                        events: {
                            'click span.more': 'more',
                            'keyup thead input': 'filter',
                            'click thead i.fa-times': 'clear'
                        },

                        /**
                         * [listener description]
                         * @type {Object}
                         */
                        listener: {
                            'app wakeup': 'wakeup'
                        },

                        /**
                         * [initialized description]
                         * @type {Boolean}
                         */
                        initialized: false,

                        /**
                         * [filterstr description]
                         * @type {String}
                         */
                        filterstr: '',

                        /**
                         * [wakeup description]
                         * @return {[type]} [description]
                         */
                        wakeup: function() {
                            if (!this.initialized) {
                                this.render();
                            }
                            return this;
                        },

                        /**
                         * [clock description]
                         * @param  {[type]} poll [description]
                         * @return {[type]}      [description]
                         */
                        clock: function($els, poll) {
                            clearInterval(this.countid);
                            this.countid = setInterval(function() {

                                if (poll) {
                                    poll = poll - 1000;
                                    $els.cn.find('span').text(moment.utc(poll).format('mm:ss'));
                                } else {
                                    $els.cn.find('span').text('00:00');
                                    clearInterval(this.countid);
                                }


                            }, 1000);
                            return this;
                        },

                        /**
                         * [more description]
                         * @return {[type]} [description]
                         */
                        more: function($els, e) {

                            var
                            id = $(e.target).parents('tr').attr('id'),
                                model = this.collections[this.id].get(id);

                            this.$dlg = this.utils.dialog({
                                foreground: true,
                                width: '100%',
                                html: this.templates.lightbox(model.toJSON()),
                                class: 'lightbox',
                                dismissable: true,
                                callback: function($el) {
                                    $el.find('div.cancel').one('mousedown', function(e) {
                                        this.$dlg.trigger('close.dialog');
                                    }.bind(this));
                                    $el.find('p')
                                        .lettering()
                                        .textillate({ in : {
                                                effect: 'fadeIn',
                                                delayScale: 1.5,
                                                delay: 5
                                            }
                                        });
                                }.bind(this)

                            });
                            return this;
                        },

                        /**
                         * [clear description]
                         * @return {[type]} [description]
                         */
                        clear: function($els, e) {
                            this.filterstr = '';
                            $els. in .val('');
                            this.addrows();
                            return this;
                        },

                        /**
                         * [filter description]
                         * @param  {[type]} e [description]
                         * @return {[type]}   [description]
                         */
                        filter: function(e) {
                            this.filterstr = $(e.target).val().trim();
                            this.addrows();
                            return this;
                        },

                        /**
                         * [addtoroom description]
                         * @param  {[type]} data [description]
                         * @param  {[type]} io   [description]
                         * @return {[type]}      [description]
                         */
                        addtoroom: function(data, io) {
                            io.emit('addToRoom', 'sync');
                            data.outgoing = {};
                            return this;
                        },

                        /**
                         * [addrows description]
                         * @param  {[type]} $els [description]
                         * @return {[type]}      [description]
                         */
                        addrows: function($els) {
                            $els.tb.find('tbody tr').remove();
                            $els.tb.off();
                            this.collections[this.id].each(function(row, idx) {
                                var include = true,
                                    data;
                                include = row.get('name').toLowerCase().indexOf(this.filterstr.toLowerCase()) === -1 ? false : true;
                                data = row.toJSON();
                                data.new = !this.initialized;
                                data.dir = (idx + 1) % 2 ? 'Left' : 'Right';
                                include && $els.tb.find('tbody').append(this.templates.row(data));
                            }.bind(this));

                            this.initialized = true;

                            return this;
                        },

                        /**
                         * [zoomSpinner description]
                         * @param  {[type]} $els [description]
                         * @return {[type]}      [description]
                         */
                        zoomSpinner: function($els) {
                            var $cog = $els.wr.find('.fa-cog');
                            $cog.one(transitionend, function() {

                                $els.bd.removeClass('noscroll');
                                $els.tb.one(animationend, function() {
                                    this.addrows();
                                    $els. in .focus();
                                    $els.cn.removeClass('hidden').addClass('zoomIn');
                                }.bind(this));
                                $els.sp.remove();
                                $els.tb
                                    .removeClass('hidden')
                                    .addClass('slideInDown');
                            }.bind(this)).addClass('loaded');
                        },

                        /**
                         * [addheader description]
                         * @param  {[type]} $els [description]
                         * @return {[type]}      [description]
                         */
                        addheader: function($els) {
                            return this;
                        },

                        /**
                         * [addfooter description]
                         * @param  {[type]} $els [description]
                         * @return {[type]}      [description]
                         */
                        addfooter: function($els) {
                            return this;
                        },

                        /**
                         * [render description]
                         * @param  {[type]} $els [description]
                         * @param  {[type]} data [description]
                         * @return {[type]}      [description]
                         */
                        render: function($els, data) {
                            var $timeline = $(this.templates[this.id]());
                            $(this.templates[this.id]());
                            $els.wr.parent()
                                .addClass(data.touch ? 'touch-yes' : 'touch-no')
                                .addClass(this.id);
                            $els.wr.html($timeline);
                            this.setElement($els.wr);
                            this.utils.refresh();
                            this.collections.dashboard.fetch();
                            return this;
                        },

                        /**
                         * [initialize description]
                         * @param  {[type]} templates [description]
                         * @param  {[type]} props     [description]
                         * @return {[type]}           [description]
                         */
                        initialize: function(templates, models, collections, views, data, io, props) {
                            this.id = props.id;
                            this.templates = templates;
                            this.models = models;
                            this.collections = collections;
                            this.views = views;
                            this.inject({
                                'wakeup': [],
                                'focus': ['machete.$els'],

                                'clock': ['machete.$els'],
                                'clear': ['machete.$els'],
                                'more': ['machete.$els'],
                                'addtoroom': ['machete.data', 'machete.messaging.io'],
                                'addrows': ['machete.$els'],
                                'zoomSpinner': ['machete.$els'],
                                'addheader': ['machete.$els'],
                                'addfooter': ['machete.$els'],
                                'render': ['machete.$els', 'machete.data']
                            }, []);

                            this.collections.dashboard = new this.collections.Dashboard({
                                id: data.uuid,
                                url: '/api/machete'
                            });

                            this.collections.dashboard.on('sync', function(coll) {
                                this
                                    .zoomSpinner()
                                    .addheader()
                                    .addfooter();

                            }.bind(this));


                            io.emit('addToRoom', 'sync');


                            io.on('cache/refreshed', function(msg) {
                                this.clock(msg);
                                this.collections.dashboard.fetch();
                            }.bind(this));


                            return this;
                        }

                    }), [
                        'machete.templates',
                        'machete.models',
                        'machete.collections',
                        'machete.views',
                        'machete.data',
                        'machete.messaging.io'
                    ]);

                }.apply(window.Syringe, [
                    window.jQuery,
                    window.Backbone,
                    window.moment,
                    window.Modernizr
                ]));
            }.call(window));

        }
    });


    /* Injected stylesheet for dashboard-dashboard-default */
    if (!document.getElementById('dashboard-dashboard-default')) {
        var elem = document.createElement('style');
        elem.setAttribute('id', 'dashboard-dashboard-default');
        elem.setAttribute('type', 'text/css');
        elem.setAttribute('media', 'all');
        var stylesheet = '.dashboard .global_panel,body,html,section{height:100%}html{font-size:12px!important}@media screen and (min-width:768px){html{font-size:14px!important}}@media screen and (min-width:992px){html{font-size:16px!important}}@media screen and (min-width:1200px){html{font-size:18px!important}}@media screen and (min-width:1600px){html{font-size:20px!important}}body.noscroll{overflow:hidden}.dashboard{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-smoothing:antialiased;background-color:#ddd!important;font-family:citrixsans-regular,Helvetica,Arial,sans-serif;overflow-x:hidden;text-rendering:optimizelegibility}.dashboard div.count{position:absolute;height:2rem;background-color:transparent;z-index:2;left:0;right:0;width:50%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin:auto}.dashboard div.count span{width:5rem;background-color:rgba(255,255,255,.5);height:100%;margin-top:.25rem;color:#fff;text-align:center;padding-top:.25rem;border-radius:.25rem}.dashboard .spinner-wrapper{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;color:#fff;height:100%}.dashboard .fa-cog{font-size:5rem;-webkit-animation:spin 2s infinite linear;animation:spin 2s infinite linear;-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%;-webkit-transition:all 2s ease-in-out;transition:all 2s ease-in-out}.dashboard .fa-cog.loaded{font-size:30rem;opacity:0;-webkit-transition:all 2s ease-in-out;transition:all 2s ease-in-out}.dashboard table{background-color:transparent;border-collapse:collapse;box-shadow:0 5px 20px rgba(0,0,0,.15)}.dashboard table thead,.dashboard table thead tr:nth-of-type(even),.dashboard table thead tr:nth-of-type(odd){background:-webkit-linear-gradient(top,#696969 0,#3f3f3f 100%);background:linear-gradient(top,#696969 0,#3f3f3f 100%)}.dashboard thead input{float:right;width:100%;height:1.5rem;margin:0;border:0;padding-right:1.25rem;border-radius:.15rem}.dashboard thead i.fa-times{float:right;top:-1.25rem;position:relative;right:.25rem;color:#ccc;text-shadow:none;cursor:pointer;margin-bottom:-1.25rem;-webkit-transition:color .25s ease-in-out;transition:color .25s ease-in-out}.dashboard thead i.fa-times:hover{color:#777;-webkit-transition:color .25s ease-in-out;transition:color .25s ease-in-out}.dashboard table tbody tr{background-color:#fff;overflow:hidden;-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out}.dashboard table tbody tr:hover{background-color:#efefef;-webkit-transition:all .25s ease-in-out;transition:all .25s ease-in-out}.dashboard table thead th{color:#fff;text-shadow:0 1px #333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dashboard table tbody td{vertical-align:center;border-bottom:1px solid #ccc;font-size:.7rem;padding-top:1.5rem;padding-bottom:1.5rem}.dashboard table td ul{list-style:none;margin:0;font-size:.7rem}.dashboard table td span.more{color:#06f;cursor:pointer}.dashboard table span.running,.dashboard table span.stopped{border-width:0;border-style:solid;border-radius:100%;float:left;width:1.5rem;height:1.5rem;text-align:center;padding-top:.2rem;margin-left:.7rem;-webkit-transition:background .25s ease-in-out;transition:background .25s ease-in-out}.dashboard table span.stopped{border-color:#C00;color:#C00;background-color:#FFF4E8}.dashboard table span.running{border-color:#008C00;color:#008C00;background-color:#E0FFE0}.dashboard table span.running i{-webkit-animation:throb 2s infinite;animation:throb 2s infinite}.dashboard table td{word-break:break-word}.dashboard table td.name{font-weight:700;padding-left:1rem}.dashboard table td.ip{font-family:monospace}.hidden{display:none!important}@-webkit-keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spin{from{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes throb{from,to{opacity:1}50%{opacity:0}}@keyframes throb{from,to{opacity:1}50%{opacity:0}}';
        if (elem.styleSheet && document.documentMode < 9) {
            elem.styleSheet.cssText = stylesheet;
        } else {
            elem.innerHTML = stylesheet;
        }
        [].slice.call(document.getElementsByTagName('head')[0].children).some(function(tag) {
            if ('style' === tag.tagName.toLowerCase() || 'link' === tag.tagName.toLowerCase()) {
                for (var next = tag.nextSibling; next && 1 !== next.nodeType;) {
                    next = next.nextSibling;
                }
                if (next && ('style' !== next.tagName.toLowerCase() && 'link' !== next.tagName.toLowerCase())) {
                    return next.parentNode.insertBefore(elem, next), !0;
                }
            } else {
                return tag.parentNode.insertBefore(elem, tag.parentNode.firstChild), !1;
            }
        });
    }


    /* Injected stylesheet for dashboard-lightbox-default */
    if (!document.getElementById('dashboard-lightbox-default')) {
        var elem = document.createElement('style');
        elem.setAttribute('id', 'dashboard-lightbox-default');
        elem.setAttribute('type', 'text/css');
        elem.setAttribute('media', 'all');
        var stylesheet = 'dialog.lightbox div.cancel{position:fixed;top:1.25rem;right:1.25rem;font-size:2rem;float:right;width:3rem;height:3rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;text-shadow:2px 2px 4px rgba(0,0,0,.5);cursor:pointer;-webkit-transition:-webkit-transform .25s ease-in-out;transition:transform .25s ease-in-out}dialog.lightbox div.cancel:hover{-webkit-transform:scale(1.5,1.5);-ms-transform:scale(1.5,1.5);transform:scale(1.5,1.5);-webkit-transform-origin:center center;-ms-transform-origin:center center;transform-origin:center center;-webkit-transition:-webkit-transform .25s ease-in-out;transition:transform .25s ease-in-out}dialog.lightbox h4{margin:.5rem .5rem 1rem;color:#fff}';
        if (elem.styleSheet && document.documentMode < 9) {
            elem.styleSheet.cssText = stylesheet;
        } else {
            elem.innerHTML = stylesheet;
        }
        [].slice.call(document.getElementsByTagName('head')[0].children).some(function(tag) {
            if ('style' === tag.tagName.toLowerCase() || 'link' === tag.tagName.toLowerCase()) {
                for (var next = tag.nextSibling; next && 1 !== next.nodeType;) {
                    next = next.nextSibling;
                }
                if (next && ('style' !== next.tagName.toLowerCase() && 'link' !== next.tagName.toLowerCase())) {
                    return next.parentNode.insertBefore(elem, next), !0;
                }
            } else {
                return tag.parentNode.insertBefore(elem, tag.parentNode.firstChild), !1;
            }
        });
    }


    /* Injected stylesheet for dashboard-global.dialog-default */
    if (!document.getElementById('dashboard-global.dialog-default')) {
        var elem = document.createElement('style');
        elem.setAttribute('id', 'dashboard-global.dialog-default');
        elem.setAttribute('type', 'text/css');
        elem.setAttribute('media', 'all');
        var stylesheet = 'dialog,dialog div.row{max-width:100%!important}dialog{visibility:visible!important;border:none!important}dialog.outer{-webkit-box-align:center!important;-webkit-align-items:center!important;-ms-flex-align:center!important;align-items:center!important;background-color:transparent;bottom:0!important;display:-webkit-box!important;display:-webkit-flex!important;display:-ms-flexbox!important;display:flex!important;height:100%!important;-webkit-box-pack:center!important;-webkit-justify-content:center!important;-ms-flex-pack:center!important;justify-content:center!important;left:0!important;overflow:hidden!important;position:fixed!important;top:0!important;width:100%!important;z-index:10!important}dialog.outer.opaque{background-color:rgba(61,61,61,.9)}dialog.outer div.inner{background-color:transparent;color:#fff;height:400px;padding:1rem;width:600px}dialog.outer div.inner.opaque{background-color:rgba(49,44,44,.75)}dialog.outer div.inner h2,dialog.outer div.inner h3{text-shadow:1px 1px rgba(0,0,0,.5);color:#fff;padding-top:0}dialog.outer div.inner p{margin:.5rem;font-size:.8rem}dialog.wait .spinner-wrapper{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}dialog.wait .spinner{height:60px;text-align:center;width:148px}dialog.wait .spinner h3{margin-top:0}dialog.wait .spinner>div{-webkit-animation:bouncedelay 1.4s infinite ease-in-out;animation:bouncedelay 1.4s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both;background-color:#fff;border-radius:100%;display:inline-block;height:40px;width:40px}dialog.wait .spinner .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s;background-color:#309ddc}dialog.wait .spinner .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s;background-color:#000}dialog.wait div.inner .spinner{background-color:rgba(49,44,44,.75);border-radius:40px;box-shadow:1px 1px 0 rgba(0,0,0,.25) inset;padding:10px}@-webkit-keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bouncedelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}';
        if (elem.styleSheet && document.documentMode < 9) {
            elem.styleSheet.cssText = stylesheet;
        } else {
            elem.innerHTML = stylesheet;
        }
        [].slice.call(document.getElementsByTagName('head')[0].children).some(function(tag) {
            if ('style' === tag.tagName.toLowerCase() || 'link' === tag.tagName.toLowerCase()) {
                for (var next = tag.nextSibling; next && 1 !== next.nodeType;) {
                    next = next.nextSibling;
                }
                if (next && ('style' !== next.tagName.toLowerCase() && 'link' !== next.tagName.toLowerCase())) {
                    return next.parentNode.insertBefore(elem, next), !0;
                }
            } else {
                return tag.parentNode.insertBefore(elem, tag.parentNode.firstChild), !1;
            }
        });
    }

    /* Compiled HandlebarsJS templates for the "default" theme */
    window.Handlebars && window.Handlebars.set({
        "dashboard": {
            "dashboard": {
                "compiler": [6, ">= 2.0.0-beta.1"],
                "main": function(depth0, helpers, partials, data) {
                    return "<div data-syringe-add=\"machete.$els.sp\" class=\"animated bounceInDown global_panel row\">\n	<div class=\"spinner-wrapper\">\n		<i class=\"fa fa-cog\"></i>\n	</div>\n</div>\n\n<div data-syringe-add=\"machete.$els.cn\" class=\"count hidden animated\"><span>Cached</span></div>\n\n<div data-syringe-add=\"machete.$els.tb\" class=\"hidden animated\">\n	<table>\n		<colgroup>\n			<col width=\"14%\">\n			<col width=\"14%\">\n			<col width=\"30%\">\n			<col width=\"10%\">\n			<col width=\"15%\">\n			<col width=\"8%\">\n			<col width=\"9%\">\n		</colgroup>\n		<thead>\n			<tr>\n				<th><input data-syringe-add=\"machete.$els.in\" placeholder=\"Name\" type=\"text\" /><i title=\"Clear filter\" class=\"fa fa-times\"></i></th>\n				<th>DNS</th>\n				<th>ELB</th>\n				<th>IP Address</th>\n				<th>Version</th>\n				<th>Status</th>\n				<th>PubSub Info</th>\n			</tr>\n		</thead>\n		<tbody></tbody>\n	</table>\n</div>	";
                },
                "useData": true
            },
            "dialog": {
                "base": {
                    "1": function(depth0, helpers, partials, data) {
                        var helper;

                        return this.escapeExpression(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0, {
                            "name": "class",
                            "hash": {},
                            "data": data
                        }) : helper))) + " ";
                    },
                    "3": function(depth0, helpers, partials, data) {
                        return " opaque";
                    },
                    "5": function(depth0, helpers, partials, data) {
                        var helper;

                        return "height:" + this.escapeExpression(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0, {
                            "name": "height",
                            "hash": {},
                            "data": data
                        }) : helper))) + ";";
                    },
                    "7": function(depth0, helpers, partials, data) {
                        var helper;

                        return "width:" + this.escapeExpression(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0, {
                            "name": "width",
                            "hash": {},
                            "data": data
                        }) : helper))) + ";";
                    },
                    "compiler": [6, ">= 2.0.0-beta.1"],
                    "main": function(depth0, helpers, partials, data) {
                        var stack1, helper;

                        return "<dialog class=\"" + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0['class'] : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(1, data, 0),
                            "inverse": this.noop,
                            "data": data
                        })) != null ? stack1 : "") + "outer" + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.background : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(3, data, 0),
                            "inverse": this.noop,
                            "data": data
                        })) != null ? stack1 : "") + "\" open>\n	<div class=\"inner" + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.foreground : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(3, data, 0),
                            "inverse": this.noop,
                            "data": data
                        })) != null ? stack1 : "") + "\" style=\"" + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.height : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(5, data, 0),
                            "inverse": this.noop,
                            "data": data
                        })) != null ? stack1 : "") + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.width : depth0), {
                            "name": "if",
                            "hash": {},
                            "fn": this.program(7, data, 0),
                            "inverse": this.noop,
                            "data": data
                        })) != null ? stack1 : "") + "\">" + ((stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0, {
                            "name": "html",
                            "hash": {},
                            "data": data
                        }) : helper))) != null ? stack1 : "") + "</div>\n</dialog>";
                    },
                    "useData": true
                }
            },
            "row": {
                "1": function(depth0, helpers, partials, data, blockParams, depths) {
                    var stack1, alias1 = this.lambda,
                        alias2 = this.escapeExpression;

                    return "	<tr id=\"" + alias2(alias1((depths[1] != null ? depths[1].id : depths[1]), depth0)) + "\">\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "name\" colspan=\"" + alias2(alias1(((stack1 = (depth0 != null ? depth0.instances : depth0)) != null ? stack1.length : stack1), depth0)) + "\">" + alias2(alias1((depths[1] != null ? depths[1].name : depths[1]), depth0)) + "</td>\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "dns\" colspan=\"" + alias2(alias1(((stack1 = (depth0 != null ? depth0.instances : depth0)) != null ? stack1.length : stack1), depth0)) + "\">" + alias2(alias1((depths[1] != null ? depths[1].dnsName : depths[1]), depth0)) + "</td>\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "elb\" colspan=\"" + alias2(alias1(((stack1 = (depth0 != null ? depth0.instances : depth0)) != null ? stack1.length : stack1), depth0)) + "\">" + alias2(alias1((depths[1] != null ? depths[1].elb : depths[1]), depth0)) + "</td>\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "ip\">" + alias2(alias1((depth0 != null ? depth0.ip : depth0), depth0)) + "</td>\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "version\">" + alias2(alias1((depth0 != null ? depth0.version : depth0), depth0)) + "</td>\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "status\"><span class=\"animated fadeIn " + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.status : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(4, data, 0, blockParams, depths),
                        "inverse": this.program(6, data, 0, blockParams, depths),
                        "data": data
                    })) != null ? stack1 : "") + "\">" + ((stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.status : depth0), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(8, data, 0, blockParams, depths),
                        "inverse": this.program(10, data, 0, blockParams, depths),
                        "data": data
                    })) != null ? stack1 : "") + "</span></td>\n		<td class=\"" + ((stack1 = helpers['if'].call(depth0, (depths[1] != null ? depths[1]['new'] : depths[1]), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(2, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "pubsub\">\n" + ((stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.pubSubInfo : depth0)) != null ? stack1.length : stack1), {
                        "name": "if",
                        "hash": {},
                        "fn": this.program(12, data, 0, blockParams, depths),
                        "inverse": this.program(14, data, 0, blockParams, depths),
                        "data": data
                    })) != null ? stack1 : "") + "		</td>\n	</tr>\n";
                },
                "2": function(depth0, helpers, partials, data) {
                    return "animated fadeIn ";
                },
                "4": function(depth0, helpers, partials, data) {
                    return "running";
                },
                "6": function(depth0, helpers, partials, data) {
                    return "stopped";
                },
                "8": function(depth0, helpers, partials, data) {
                    return "<i class=\"fa fa-check\"></i>";
                },
                "10": function(depth0, helpers, partials, data) {
                    return "Stopped <i class=\"fa fa-times\"></i>";
                },
                "12": function(depth0, helpers, partials, data) {
                    var stack1;

                    return "				<span class=\"more\"><strong>" + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.pubSubInfo : depth0)) != null ? stack1.length : stack1), depth0)) + "</strong> Entries</span>\n";
                },
                "14": function(depth0, helpers, partials, data) {
                    return "				N/A\n";
                },
                "compiler": [6, ">= 2.0.0-beta.1"],
                "main": function(depth0, helpers, partials, data, blockParams, depths) {
                    var stack1;

                    return ((stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.instances : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(1, data, 0, blockParams, depths),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "");
                },
                "useData": true,
                "useDepths": true
            },
            "lightbox": {
                "1": function(depth0, helpers, partials, data) {
                    var stack1;

                    return ((stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.pubSubInfo : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(2, data, 0),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "");
                },
                "2": function(depth0, helpers, partials, data) {
                    var stack1;

                    return "				<p>" + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "") + "</p>\n";
                },
                "compiler": [6, ">= 2.0.0-beta.1"],
                "main": function(depth0, helpers, partials, data) {
                    var stack1, helper;

                    return "<div class=\"row\">\n	<div title=\"Close\" class=\"cancel\"><i class=\"fa fa-times\"></i></div>\n	<div class=\"col-md-offset-1 col-md-10\">\n\n		<h4>PubSub Info for " + this.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === "function" ? helper.call(depth0, {
                        "name": "name",
                        "hash": {},
                        "data": data
                    }) : helper))) + "</h4>\n\n" + ((stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.instances : depth0), {
                        "name": "each",
                        "hash": {},
                        "fn": this.program(1, data, 0),
                        "inverse": this.noop,
                        "data": data
                    })) != null ? stack1 : "") + "\n	</div>\n</div>";
                },
                "useData": true
            }
        }
    });

    /* Module invocation and Stitch object cleanup */
    if (this.dashboard_require) {
        this.dashboard_require('app');
        this.dashboard_require = void 0;
        try {
            delete this.dashboard_require;
        } catch (e) {};
    }

}.call(window));

/*  Compiled by combine.js - Copyright © 2011-2016 M Holt. Distributed under the MIT License */