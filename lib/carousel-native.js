// Native Javascript for Bootstrap 3 | Carousel
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

	// CAROUSEL DEFINITION
	// ===================
	var Carousel = root.Carousel = function( element, options ) {
		this.carousel = (typeof element === 'object') ? element : document.querySelector( element );
		this.options = {}; //replace extend
		this.options.keyboard = options && options.keyboard === 'true' ? true : false;
		this.options.pause = options && options.pause ? options.pause : 'hover'; // false / hover

		// bootstrap carousel default transition duration / option
		this.duration = 600;
		this.options.duration = document.documentElement.classList.contains('ie') ? 0 : (options.duration || this.duration);

		var items = this.carousel.querySelectorAll('.item'), il=items.length; //this is an object
		this.controls = this.carousel.querySelectorAll('.carousel-control');
		this.prev = this.controls[0];
		this.next = this.controls[1];
		this.slides = []; for (var i = 0; i < il; i++) { this.slides.push(items[i]); } // this is an array
		this.indicator = this.carousel.querySelector( ".carousel-indicators" ); // object
		this.indicators = this.carousel.querySelectorAll( ".carousel-indicators li" ); // object
		this.total		= this.slides.length;
		this.timer		= null;
		this.direction	= null;
		this.index		= 0;

		if (options.interval === 'false' ) {
			this.options.interval = false;
		} else {
			this.options.interval = parseInt(options.interval) || 5000;
		}

		this.init();
	};

	// CAROUSEL METHODS
	// ================
	Carousel.prototype = {
		init: function() {
			if ( this.options.interval !== false ){
				this.cycle();
			}

			if ( this.options && this.options.pause === 'hover' && this.options.interval !== false ) {
				this.pause();
			}
			this.actions();
			this._addEventListeners();
		},
		cycle: function(e) {
			var self = this;

			self.direction = 'left';
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index, e );

			}, self.options.interval);
		},
		pause: function() {
			var self = this;
			pauseHandler = function () {
				if ( self.options.interval !==false && !self.carousel.classList.contains('paused')) {
					self.carousel.classList.add('paused');
					clearInterval( self.timer );
					self.timer = null;
				}
			}
			resumeHandler = function() {
				if ( self.options.interval !==false && self.carousel.classList.contains('paused')) {
					self.cycle();
					self.carousel.classList.remove('paused');
				}

			}
			self.carousel.addEventListener( "mouseenter", pauseHandler, false);
			self.carousel.addEventListener( "mouseleave", resumeHandler, false);
			self.carousel.addEventListener( "touchstart", pauseHandler, false);
			self.carousel.addEventListener( "touchend", resumeHandler, false);
		},
		_slideTo: function( next, e ) {
			var self = this;
			var active = self._getActiveIndex(); // the current active
			//determine type
			var direction = self.direction;
			var type = direction === 'left' ? 'next' : 'prev';

			//register events
			var slid = new CustomEvent("slid.bs.carousel");
			var slide = new CustomEvent("slide.bs.carousel");

			self.carousel.dispatchEvent(slid); //here we go with the slid

			self._removeEventListeners();
			clearInterval(self.timer);
			self.timer = null;
			self._curentPage( self.indicators[next] );

			if ( this.carousel.classList.contains('slide') && !document.documentElement.classList.contains('ie') ) {
				self.slides[next].classList.add(type);
				self.slides[next].offsetWidth;
				self.slides[next].classList.add(direction);
				self.slides[active].classList.add(direction);

				setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
					self._addEventListeners();

					self.slides[next].classList.add('active');
					self.slides[active].classList.remove('active');

					self.slides[next].classList.remove(type);
					self.slides[next].classList.remove(direction);
					self.slides[active].classList.remove(direction);


					if ( self.options.interval !== false && !self.carousel.classList.contains('paused') ){
						clearInterval(self.timer); self.cycle();
					}
					self.carousel.dispatchEvent(slide) //here we go with the slide
				}, self.options.duration + 100 );
			} else {
				self.slides[next].classList.add('active');
				self.slides[next].offsetWidth;
				self.slides[active].classList.remove('active');
				setTimeout(function() {
					self._addEventListeners();
					if ( self.options.interval !== false && !self.carousel.classList.contains('paused') ){
						clearInterval(self.timer); self.cycle();
					}
					self.carousel.dispatchEvent(slide) //here we go with the slide
				}, self.options.duration + 100 );
			}
		},
		_addEventListeners : function () {
			var self = this;

			self.next && self.next.addEventListener( "click", self.controlsHandler, false);
			self.prev && self.prev.addEventListener( "click", self.controlsHandler, false);

			self.indicator && self.indicator.addEventListener( "click", self.indicatorHandler, false);

			if (self.options.keyboard === true) {
				window.addEventListener('keydown', self.keyHandler, false);
			}
		},
		_removeEventListeners : function () { // prevent mouse bubbles while animating
			var self = this;

			self.next && self.next.removeEventListener( "click", self.controlsHandler, false);
			self.prev && self.prev.removeEventListener( "click", self.controlsHandler, false);

			self.indicator && self.indicator.removeEventListener( "click", self.indicatorHandler, false);

			if (self.options.keyboard === true) {
				window.removeEventListener('keydown', self.keyHandler, false);
			}
		},
		_getActiveIndex : function () {
			return this.slides.indexOf(this.carousel.querySelector('.item.active'))
		},
		_curentPage: function( p ) {
			for( var i = 0; i < this.indicators.length; ++i ) {
				var a = this.indicators[i];
				a.className = "";
			}
			if (p) p.className = "active";
		},
		actions: function() {
			var self = this;
			var oldTs = 0, oldKTs = 0;

			self.indicatorHandler = function(e) {
				e.preventDefault();
				var target = e.target;
				var active = self._getActiveIndex(); // the current active

				if ( target && !/active/.test(target.className) && target.getAttribute('data-slide-to') ) {
					var n = parseInt( target.getAttribute('data-slide-to'), 10 );

					self.index = n;

					if( self.index == 0 ) {
						self.index = 0;
					} else if ( self.index == self.total - 1 ) {
						self.index = self.total - 1;
					}

					 //determine direction first
					if  ( (active < self.index ) || (active === self.total - 1 && self.index === 0 ) ) {
						self.direction = 'left'; // next
					} else if  ( (active > self.index) || (active === 0 && self.index === self.total -1 ) ) {
						self.direction = 'right'; // prev
					}
				} else { return false; }

				self._slideTo( self.index, e ); //Do the slide

			},

			self.controlsHandler = function (e) {
				var target = e.currentTarget || e.srcElement;
				e.preventDefault();
				var active = self._getActiveIndex(); // the current active

				if ( target === self.next ) {
					self.index++;
					self.direction = 'left'; //set direction first

					if( self.index == self.total - 1 ) {
						self.index = self.total - 1;
					} else if ( self.index == self.total ){
						self.index = 0
					}
				} else if ( target === self.prev ) {
					self.index--;
					self.direction = 'right'; //set direction first

					if( self.index == 0 ) {
						self.index = 0;
					} else if ( self.index < 0 ){
						self.index = self.total - 1
					}
				}

				self._slideTo( self.index, e ); //Do the slide
			}

			self.keyHandler = function (e) {

				switch (e.which) {
					case 39:
						e.preventDefault();
						self.index++;
						self.direction = 'left';
						if( self.index == self.total - 1 ) { self.index = self.total - 1; } else
						if ( self.index == self.total ){ self.index = 0 }
						break;
					case 37:
						e.preventDefault();
						self.index--;
						self.direction = 'right';
						if( self.index == 0 ) { self.index = 0; } else
						if ( self.index < 0 ){ self.index = self.total - 1 }
						break;
					default: return;
				}
				self._slideTo( self.index, e ); //Do the slide
			}
		}
	}

	// CAROUSEL DATA API
	// =================
	var Carousels = document.querySelectorAll('[data-ride="carousel"]');
	[].forEach.call(Carousels, function (item) {
		var c = item;
		var options = {};
			options.interval = c.getAttribute('data-interval') && c.getAttribute('data-interval');
			options.pause = c.getAttribute('data-pause') && c.getAttribute('data-pause') || 'hover';
			options.keyboard = c.getAttribute('data-keyboard') && c.getAttribute('data-keyboard') || false;
			options.duration = c.getAttribute('data-duration') && c.getAttribute('data-duration') || false;
		return new Carousel(c, options)
	})

});
