jQuery.extend({
	getScript: function (props) {

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
		o.onload = o.onreadystatechange = function () {
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