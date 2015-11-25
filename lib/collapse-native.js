// Native Javascript for Bootstrap 3 | Collapse
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Collapse = factory();
	}

})(function(){

	// COLLAPSE DEFINITION
	// ===================
	var Collapse = function( element, options ) {
		options = options || {};
		this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false;
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.accordion = null;
		this.collapse = null;
		this.duration = 300; // default collapse transition duration
		this.options = {};
		this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);
		this.init();
	};

	// COLLAPSE METHODS
	// ================
	Collapse.prototype = {

		init : function() {
			this.actions();
			this.btn.addEventListener('click', this.toggle, false);

			// allows the collapse to expand
			// ** when window gets resized
			// ** or via internal clicks handers such as dropwowns or any other
			window.addEventListener('resize', this.update, false);
		},

		actions : function() {
			var self = this;
			var currHeight = -1;

			this.toggle = function(e) {
				var tg = false;
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;

				if (!tg){self.collapse.addEventListener('click', self.update, false); tg = true;}

				if (!/in/.test(self.collapse.className)) {
					self.open(e);
				} else {
					self.close(e);
				}
			},
			this.close = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self._close(self.collapse);
				self.btn.className = self.btn.className.replace(' collapsed','');
			},
			this.open = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self.accordion = self.btn.getAttribute('data-parent') && self.getClosest(self.btn, self.btn.getAttribute('data-parent'));

				self._open(self.collapse);
				self.btn.className += ' collapsed';

				if ( self.accordion !== null ) {
					var active = self.accordion.querySelectorAll('.collapse.in'), al = active.length, i = 0;
					for (i;i<al;i++) {
						if ( active[i] !== self.collapse) self._close(active[i]);
					}
				}
			},
			this._open = function(c) {
				c.className += ' in';
				c.setAttribute('area-expanded','true');

				c.style.height = '0px';
				var ch = this.getMaxHeight(c);
				this._resize(c,ch);
			},
			this._close = function(c) {
                var ch = self.getMaxHeight(c);
                c.style.height = ch + 'px';

                setTimeout(function () {
                    c.setAttribute('area-expanded','false');
                    c.className += ' collapsing';
                    c.style.overflow = 'hidden';
                    c.style.height = '0px';
                }, 1);
				setTimeout(function() {
					c.className = c.className.replace(' in collapsing','');
				}, self.options.duration);
			},
			this.update = function(e) {
				var evt = e.type, itms = document.querySelectorAll('.collapse.in'), i = 0, il = itms.length;
				if ( evt === 'resize' && !(this.isIE && this.isIE < 9) ) { // only filter for IE8-
					for (i;i<il;i++) {
						self._resize(itms[i],self.getMaxHeight(itms[i]));
					}
				} else if ( evt === 'click' ) {
					var maxHeight = self.getMaxHeight(this);
					if (maxHeight !== currHeight) {
						self._resize(this, maxHeight);
					}
				}
			},
			this._resize = function(l,h) { // set new resize
				currHeight = h;
				l.className += ' collapsing';
				l.style.overflow = 'hidden';
				l.style.height = h + 'px';
				setTimeout(function() {
					l.style.overflow = null;
					l.style.height = null;
					l.className = l.className.replace(' collapsing','');
				}, self.options.duration+50);
			},
			this.getMaxHeight = function(l) { // get collapse trueHeight and border
				return l.scrollHeight;
			},
			this.getTarget = function(e) {
				var t = e.currentTarget || e.srcElement,
					h = t.href && t.getAttribute('href').replace('#',''),
					d = t.getAttribute('data-target') && ( t.getAttribute('data-target') ),
					id = h || ( d && /#/.test(d)) && d.replace('#',''),
					cl = (d && d.charAt(0) === '.') && d, //the navbar collapse trigger targets a class
					c = id && document.getElementById(id) || cl && document.querySelector(cl);

				return {
					btn : t,
					collapse : c
				};
			},

			this.getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
			// source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
				var f = s.charAt(0);
				for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
					if ( f === '.' ) {// If selector is a class
						if ( document.querySelector(s) !== undefined ) { return el; }
					}
					if ( f === '#' ) { // If selector is an ID
						if ( el.id === s.substr(1) ) { return el; }
					}
				}
				return false;
			};

			//we must add the height to the pre-opened collapses
			window.addEventListener('load', function() {
				var openedCollapses = document.querySelectorAll('.collapse'), i = 0, ocl = openedCollapses.length;
				for (i;i<ocl;i++) {
					var oc = openedCollapses[i];
					if (oc && /in/.test(oc.className)) {
						var ch = self.getMaxHeight(oc);
						oc.style.height = ch + 'px';
					}
				}
			});
		}
	};

	// COLLAPSE DATA API
	// =================
	var Collapses = document.querySelectorAll('[data-toggle="collapse"]'), i = 0, cll = Collapses.length;
	for (i;i<cll;i++) {
		var item = Collapses[i], options = {};
		options.duration = item.getAttribute('data-duration');
		new Collapse(item,options);
	}

	return Collapse;

});
