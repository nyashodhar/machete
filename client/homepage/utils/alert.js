(function ($, Backbone) {

	var 
		$body			= $('body'),
		animationend	= 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
		timeoutid		= false;

	this.add('machete.utils.alert', function (template, props) {

		props = props || {};

		if (!timeoutid && ((typeof props.type === 'string') || (typeof props.message === 'string'))) {

			timeoutid = true;

			var close = function () {
				$el.one(animationend, function () { 
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
				type	: props.type,
				title	: (typeof props.title === 'string') ? props.title : false,
				message	: (typeof props.message === 'string') ? props.message : false,
				icon	: (props.type === 'info') ? 'info' : (typeof props.icon === 'string' ? props.icon : 'alert')
			}));

			$el.find('button').mousedown(close);
			$el.one(animationend, function () {

				if (typeof props.onopen === 'function') {
					props.onopen();
				}

				if ((typeof props.timeout === 'number') ? props.timeout : false) {
					timeoutid = setTimeout(close, props.timeout);
				}
			});

			$body.append($el);
			return $el;
		}

		else {
			return false;
		}

	}, ['machete.templates.alert']);

}.apply(window.Syringe, [
	window.jQuery, 
	window.Backbone
]));