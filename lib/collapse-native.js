// Native Javascript for Bootstrap 3 | Collapse
// by dnp_theme

// (function(w,d) {

	// COLLAPSE DEFINITION
	// ===================
	var Collapse = function( element, options ) {
		this.btn = typeof element === 'object' ? element : document.querySelector(element);
		this.accordion = null;
		this.collapse = null;
		this.options = {};
		this.duration = 300; // default collapse transition duration
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);		
		this.init();
	}
	
	// COLLAPSE METHODS
	// ================
	Collapse.prototype = {
		
		init : function() {
			var self = this;
			this.actions();
			this.btn.addEventListener('click', this.toggle, false);
			
			// allows the collapse to expand 
			// ** when window gets resized 
			// ** or via internal clicks handers such as dropwowns or any other
			document.addEventListener('click', this.update, false); 
			window.addEventListener('resize', this.update, false)
		},
	
		actions : function() {
			var self = this;
			
			this.toggle = function(e) {
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
								
				if (!self.collapse.classList.contains('in')) {
					self.open(e)
				} else {
					self.close(e)					
				}
			},
			this.close = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self._close(self.collapse);
				self.btn.classList.remove('collapsed');
			},
			this.open = function(e) {
				e.preventDefault();
				self.btn = self.getTarget(e).btn;
				self.collapse = self.getTarget(e).collapse;
				self.accordion = self.btn.getAttribute('data-parent') && self.getClosest(self.btn, self.btn.getAttribute('data-parent'));
				
				self._open(self.collapse);
				self.btn.classList.add('collapsed');
				
				if ( self.accordion !== null ) {
					var active = self.accordion.querySelectorAll('.collapse.in');
					[].forEach.call(active,function(a) {
						if ( a !== self.collapse) self._close(a)						
					})
				}
			},
			this._open = function(c) {

				c.classList.add('in');
				c.style.height = 0;
				c.style.overflow = 'hidden';
				c.setAttribute('area-expanded','true');
				
				// the collapse MUST have a childElement div to wrap them all inside, just like accordion/well
				var oh = this.getMaxHeight(c).oh;
				var br = this.getMaxHeight(c).br;

				c.style.height = oh + br + 'px';
				setTimeout(function() {
					c.style.overflow = '';
				}, self.options.duration)				
			},
			this._close = function(c) {

				c.style.overflow = 'hidden';
				c.style.height = 0;
				setTimeout(function() {
					c.classList.remove('in');
					c.style.overflow = '';
					c.setAttribute('area-expanded','false');
				}, self.options.duration)				
			},
			this.update = function(e) {
				var evt = e.type;
				var tg = e.target;
				var itms = document.querySelectorAll('.collapse.in');
				[].forEach.call(itms, function(itm) {
					var oh = self.getMaxHeight(itm).oh;
					var br = self.getMaxHeight(itm).br;

					if ( evt === 'resize' || ( evt === 'click' && self.getClosest(tg,'.collapse') === itm ) ) {
						setTimeout(function() {
							itm.style.height =  oh + br + 'px'
						}, 300)
					}
				})
			},
			this.getMaxHeight = function(l) { // get collapse trueHeight and border
				var t = l.children[0]; 
				var cs = l.currentStyle || window.getComputedStyle(l);
				
				return {
					oh : getOuterHeight(t),
					br : parseInt(cs.borderTop||0) + parseInt(cs.borderBottom||0)
				}
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
				}
			},
			
			this.getClosest = function (el, s) { //el is the element and s the selector of the closest item to find
			// source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
				var f = s.charAt(0);
			
				for ( ; el && el !== document; el = el.parentNode ) {// Get closest match
					
					if ( f === '.' ) {// If selector is a class
						if ( el.classList.contains( s.substr(1) ) ) {
							return el;
						}
					}
	
					if ( f === '#' ) { // If selector is an ID
						if ( el.id === s.substr(1) ) {
							return el;
						}
					}
				}
				return false;
			}
		}
    }
	
	var getOuterHeight = function (el) {
		var s = el.currentStyle || window.getComputedStyle(el);
		
		return el.offsetHeight  //we need an accurate margin value
			+ parseInt( /px/.test(s.marginTop)		? Math.round(s.marginTop.replace('px',''))		: 0 ) 
			+ parseInt( /px/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('px',''))	: 0 )
			+ parseInt( /em/.test(s.marginTop)		? Math.round(s.marginTop.replace('em','')		* parseInt(s.fontSize)) : 0 )
			+ parseInt( /em/.test(s.marginBottom)	? Math.round(s.marginBottom.replace('em','')	* parseInt(s.fontSize)) : 0 )
	}	
    
	// COLLAPSE DATA API
	// =================
    var Collapses = document.querySelectorAll('[data-toggle="collapse"]');
	[].forEach.call(Collapses, function (item) {
		var options = {};
		options.duration = item.getAttribute('data-duration');
		return new Collapse(item,options);
	});
	
	//we must add the height to the pre-opened collapses
	window.addEventListener('load', function() {
		var openedCollapses = document.querySelectorAll('.collapse');
		[].forEach.call(openedCollapses, function(oc) {
			if (oc.classList.contains('in')) {
				var s = oc.currentStyle || window.getComputedStyle(oc);
				var oh = getOuterHeight(oc.children[0]);
				var br = parseInt(s.borderTop||0) + parseInt(s.borderBottom||0);
				oc.style.height = oh + br + 'px'
			}
		})
	})
	
// })(window,document);	
