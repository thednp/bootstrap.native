// Native Javascript for Bootstrap 3 | Popover
// by dnp_theme
// Edited by: Ingwie Phoenix

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module == "defined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			exports = factory(exports);
		} else {
			// Let the user give the factory a Window and Document.
			exports = factory;
		}
	} else {
		// Assume a traditional browser.
		factory(global);
	}

})(function(root){

	// POPOVER DEFINITION
	// ===================
	var Popover = root.Popover = function( element,options ) {
		this.link = typeof element === 'object' ? element : document.querySelector(element);
		this.title = this.link.getAttribute('data-title') || null;
		this.content = this.link.getAttribute('data-content') || null;
		this.popover = null;
		this.options = {};
		this.options.template = options.template ? options.template : null;
		this.options.trigger = options.trigger ? options.trigger : 'hover';
		this.options.animation = options.animation && options.animation !== 'true' ? options.animation : 'true';
		this.options.placement = options.placement ? options.placement : 'top';
		this.options.delay = parseInt(options.delay) || 100;
		this.duration = 150;
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);
		this.options.container = document.body;
		if ( this.content || this.options.template ) this.init();
		this.timer = 0 // the link own event timer
		this.rect = null;
	}

	// POPOVER METHODS
	// ================
	Popover.prototype = {

		init : function() {
			this.actions();
			if (this.options.trigger === 'hover') {
				this.link.addEventListener('mouseenter', this.open, false);
				this.link.addEventListener('mouseleave', this.close, false);
			} else if (this.options.trigger === 'click') {
				this.link.addEventListener('click', this.toggle, false);
				this.link.addEventListener('blur', this.close, false);
			} else if (this.options.trigger === 'focus') {
				this.link.addEventListener('focus', this.toggle, false);
				this.link.addEventListener('blur', this.close, false);
			}
			if (!document.documentElement.classList.contains('ie') && (this.options.trigger === 'focus' || this.options.trigger === 'click') )
				window.addEventListener('resize', this.close, false ); // dismiss on window resize
		},

		actions : function() {
			var self = this;

			this.toggle = function(e) {
				if (self.popover === null) {
					self.open()
				} else {
					self.close()
				}
			},
			this.open = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.popover === null) {
						self.createPopover();
						self.stylePopover();
						self.updatePopover()
					}
				}, self.options.duration );
				self.link.setAttribute('data-timer',self.timer);
			},

			this.close = function(e) {
				clearTimeout(self.link.getAttribute('data-timer'));
				self.timer = setTimeout( function() {
					if (self.popover && self.popover !== null && self.popover.classList.contains('in')) {
						self.popover.classList.remove('in');
						setTimeout(function() {
							self.removePopover(); // for performance/testing reasons we can keep the popovers if we want
						}, self.options.duration);
					}

				}, self.options.delay + self.options.duration);
				self.link.setAttribute('data-timer',self.timer);
			},

			//remove the popover
			this.removePopover = function() {
				this.popover && this.options.container.removeChild(this.popover);
				this.popover = null;
				this.timer = null
			},

			this.createPopover = function() {
				this.popover = document.createElement('div');

				if ( this.content !== null && this.options.template === null ) { //create the popover from data attributes

					this.popover.setAttribute('role','tooltip');

					var popoverArrow = document.createElement('div');
					popoverArrow.setAttribute('class','arrow');

					if (this.title !== null) {
						var popoverTitle = document.createElement('h3');
						popoverTitle.setAttribute('class','popover-title');
						popoverTitle.innerHTML = this.title
						this.popover.appendChild(popoverTitle);
					}

					var popoverContent = document.createElement('div');
					popoverContent.setAttribute('class','popover-content');

					this.popover.appendChild(popoverArrow);
					this.popover.appendChild(popoverContent);

					//set popover content
					popoverContent.innerHTML = this.content;

				} else {  // or create the popover from template
					var template = document.createElement('div');
					template.innerHTML = this.options.template;
					this.popover.innerHTML = template.firstChild.innerHTML;
				}

				//append to the container
				this.options.container.appendChild(this.popover);
				this.popover.style.display = 'block';
			},

			this.stylePopover = function(pos) {
				this.rect = this.getRect();
				var placement = pos || this.options.placement;
				var animation = this.options.animation === 'true' ? 'fade' : '';
				this.popover.setAttribute('class','popover '+placement+' '+animation);

				var linkDim = { w: this.link.offsetWidth, h: this.link.offsetHeight }; //link real dimensions

				// all popover dimensions
				var pd = this.popoverDimensions(this.popover);
				var toolDim = { w : pd.w, h: pd.h }; //popover real dimensions


				//window vertical and horizontal scroll
				// var scrollYOffset = this.options.container === document.body ? window.pageYOffset || document.documentElement.scrollTop : this.options.container.offsetTop;
				// var scrollXOffset = this.options.container === document.body ? window.pageXOffset || document.documentElement.scrollLeft : this.options.container.offsetLeft;
				var scrollYOffset = this.getScroll().y;
				var scrollXOffset =  this.getScroll().x;

				//apply styling
				if ( /top/.test(placement) ) { //TOP
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px'

				} else if ( /bottom/.test(placement) ) { //BOTTOM
					this.popover.style.top = this.rect.top + scrollYOffset + linkDim.h + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w/2 + linkDim.w/2 + 'px';

				} else if ( /left/.test(placement) ) { //LEFT
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset - toolDim.w + 'px';

				} else if ( /right/.test(placement) ) { //RIGHT
					this.popover.style.top = this.rect.top + scrollYOffset - toolDim.h/2 + linkDim.h/2 + 'px';
					this.popover.style.left = this.rect.left + scrollXOffset + linkDim.w + 'px';
				}
			},

			this.updatePopover = function() {
				var placement = null;
				if ( !self.isElementInViewport(self.popover) ) {
					placement = self.updatePlacement();
				} else {
					placement = self.options.placement;
				}

				self.stylePopover(placement);

				self.popover.classList.add('in');
			},
			this.updatePlacement = function() {
				var pos = this.options.placement;
				if ( /top/.test(pos) ) { //TOP
					return 'bottom';
				} else if ( /bottom/.test(pos) ) { //BOTTOM
					return 'top';
				} else if ( /left/.test(pos) ) { //LEFT
					return 'right';
				} else if ( /right/.test(pos) ) { //RIGHT
					return 'left';
				}
			},
			this.getRect = function() {
				return this.link.getBoundingClientRect()
			},
			this.getScroll = function() {
				return {
					y : window.pageYOffset || document.documentElement.scrollTop,
					x : window.pageXOffset || document.documentElement.scrollLeft
				}
			},
			this.popoverDimensions	= function(p) {//check popover width and height
				return {
					w : p.offsetWidth,
					h : p.offsetHeight
				}
			},
			this.isElementInViewport = function(t) { // check if this.popover is in viewport
				var r = t.getBoundingClientRect();
				return (
					r.top >= 0 &&
					r.left >= 0 &&
					r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
					r.right <= (window.innerWidth || document.documentElement.clientWidth)
				)
			}
		}
    }

	// POPOVER DATA API
	// =================
    var Popovers = document.querySelectorAll('[data-toggle=popover]');
	[].forEach.call(Popovers, function (item,index) {
		var options = {};
		options.trigger = item.getAttribute('data-trigger'); // click / hover / focus
		options.animation = item.getAttribute('data-animation'); // true / false
		options.duration = item.getAttribute('data-duration');
		options.placement = item.getAttribute('data-placement');
		options.delay = item.getAttribute('data-delay');
		return new Popover(item,options);
	})

});
