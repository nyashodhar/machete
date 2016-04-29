(function ($, Backbone, moment, Modernizr) {

	var 
		transitionend	= 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
		animationend	= 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

	return this.add('machete.views.Dashboard', Backbone.View.extend({

		/**
		 * [events description]
		 * @type {Object}
		 */
		events: {
			'click span.more'		: 'more',
			'keyup thead input'		: 'filter',
			'click thead i.fa-times': 'clear'
		},

		/**
		 * [listener description]
		 * @type {Object}
		 */
		listener: { 'app wakeup': 'wakeup' },

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
		wakeup: function () {
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
		clock: function ($els, poll) {
			clearInterval(this.countid);
			this.countid = setInterval(function () {

				if (poll) {
					poll = poll - 1000;
					$els.cn.find('span').text(moment.utc(poll).format('mm:ss'));
				}
				else {
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
		more: function ($els, e) {

			var
				id = $(e.target).parents('tr').attr('id'),
				model = this.collections[this.id].get(id);

			this.$dlg = this.utils.dialog({
				foreground	: true,
				width		: '100%',
				html		: this.templates.lightbox(model.toJSON()),
				class		: 'lightbox',
				dismissable	: true,
				callback	: function ($el) {
					$el.find('div.cancel').one('mousedown', function (e) {
						this.$dlg.trigger('close.dialog');
					}.bind(this));
					$el.find('p')
						.lettering()
						.textillate({ 
							in : { 
								effect		: 'fadeIn',
								delayScale	: 1.5,
								delay		: 5
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
		clear: function ($els, e) {
			this.filterstr = '';
			$els.in.val('');
			this.addrows();
			return this;
		},

		/**
		 * [filter description]
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		filter: function (e) {
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
		addtoroom: function (data, io) {
			io.emit('addToRoom', 'sync');
			data.outgoing = {};
			return this;
		},

		/**
		 * [addrows description]
		 * @param  {[type]} $els [description]
		 * @return {[type]}      [description]
		 */
		addrows: function ($els) {
			$els.tb.find('tbody tr').remove();
			$els.tb.off();
			this.collections[this.id].each(function (row, idx) {
				var include = true, data;
				include		= row.get('name').toLowerCase().indexOf(this.filterstr.toLowerCase()) === -1 ? false : true;
				data		= row.toJSON();
				data.new	= !this.initialized;
				data.dir	= (idx + 1) % 2 ? 'Left' : 'Right';
				console.log(data);
				include && $els.tb.find('.grid').append(this.templates.row(data));
			}.bind(this));

			$els.tb.find('.grid').masonry({
				// options
				itemSelector: '.grid-item'
			});

			this.initialized = true;

			return this;
		},

		/**
		 * [zoomSpinner description]
		 * @param  {[type]} $els [description]
		 * @return {[type]}      [description]
		 */
		zoomSpinner: function ($els) {
			var $cog = $els.wr.find('.fa-cog');
			$cog.one(transitionend, function () {

				$els.bd.removeClass('noscroll');
				$els.tb.one(animationend, function () {
					this.addrows();
					// $els.in.focus();
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
		addheader: function ($els) {
			return this;
		},

		/**
		 * [addfooter description]
		 * @param  {[type]} $els [description]
		 * @return {[type]}      [description]
		 */
		addfooter: function ($els) {
			return this;
		},

		/**
		 * [render description]
		 * @param  {[type]} $els [description]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		render: function ($els, data) {
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
		initialize: function (templates, models, collections, views, data, io, props) {
			this.id				= props.id;
			this.templates		= templates;
			this.models			= models;
			this.collections	= collections;
			this.views			= views;
			this.inject({
				'wakeup'		: [],
				//'focus'			: ['machete.$els'],

				'clock'			: ['machete.$els'],
				'clear'			: ['machete.$els'],
				'more'			: ['machete.$els'],
				'addtoroom'		: ['machete.data', 'machete.messaging.io'],
				'addrows'		: ['machete.$els'],
				'zoomSpinner'	: ['machete.$els'],
				'addheader'		: ['machete.$els'],
				'addfooter'		: ['machete.$els'],
				'render'		: ['machete.$els', 'machete.data']
			}, []);

			this.collections.dashboard = new this.collections.Dashboard({
				id	: data.uuid,
				url	: '/api/machete'
			});

			this.collections.dashboard.on('sync', function (coll) {
				this
					.zoomSpinner()
					.addheader()
					.addfooter();

			}.bind(this));


			io.emit('addToRoom', 'sync');


			io.on('cache/refreshed', function (msg) {
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