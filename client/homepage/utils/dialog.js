(function ($) {
	
	var $body = $('body');

	this.add('machete.utils.dialog', function ($els, t, props) {
		
		props = (typeof props === 'object') ? props : {};

		if ((typeof t.dialog.base === 'function') 
			&& (typeof props.html === 'string' || props.html instanceof $)) {

			var 
				html		= (props.html instanceof $) ? props.html.html() : props.html,
				dismissable	= (props.dismissable === false) ? false : true,
				$dlg		= $('dialog');

			$dlg.length && $dlg.remove();

			$dlg = $(t.dialog.base({
				foreground	: (props.foreground === false) ? false : true,
				background	: (props.background === false) ? false : true,
				width		: props.width	|| 'auto',
				height		: props.height	|| 'auto',
				class		: props.class	|| false,
				html		: html
			}));

			$body.addClass('noscroll');

			if (props.anchor) {
				$(props.anchor).append($dlg);
			}
			else {
				$body.append($dlg);
			}

			$dlg.one('close.dialog', function (e) {
				$body.off('keydown.dialog');
				$body.removeClass('noscroll');
				$dlg.remove();
			});

			$dlg.click(function (e) {
				dismissable && $(e.target).is('dialog') && $dlg.trigger('close.dialog');
			});

			$body.on('keydown.dialog', function (e) {
				dismissable && e.keyCode === 27 && $dlg.trigger('close.dialog');
			});

			typeof props.callback === 'function' && props.callback($dlg);

			// $dlg.find('button.btn-default:first').focus();


			$dlg.find('button.btn.cancel').one('click', function (e) {
				$dlg.trigger('close.dialog');
			});

			return $dlg;
		}

		return false;

	}.bind(this), ['machete.$els', 'machete.templates']);

}.apply(window.Syringe, [window.jQuery]));