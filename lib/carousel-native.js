// Native Javascript for Bootstrap 3 | Carousel
// by dnp_theme

// CAROUSEL DEFINITION
// ===================
var Carousel = function( element, options ) {
  options = options || {};

  this.carousel = (typeof element === 'object') ? element : document.querySelector( element );
  this.options = {}; //replace extend
  this.options.keyboard = options.keyboard === 'true' ? true : false;
  this.options.pause = options.pause ? options.pause : 'hover'; // false / hover

  // bootstrap carousel default transition duration / option
  this.duration = 600;
  this.options.duration = (isIE && isIE < 10) ? 0 : (parseInt(options.duration) || this.duration);

  var items = this.carousel.querySelectorAll('.item'), il=items.length; //this is an object
  this.controls = this.carousel.querySelectorAll('.carousel-control');
  this.prev = this.controls[0];
  this.next = this.controls[1];
  this.slides = []; for (var i = 0; i < il; i++) { this.slides.push(items[i]); } // this is an array
  this.indicator = this.carousel.querySelector( ".carousel-indicators" ); // object
  this.indicators = this.carousel.querySelectorAll( ".carousel-indicators li" ); // object
  this.total    = this.slides.length;
  this.timer    = null;
  this.direction  = null;
  this.index    = 0;

  var self = this;

  if (options.interval === 'false' ) {
    this.options.interval = false;
  } else {
    this.options.interval = parseInt(options.interval) || 5000;
  }

  this.cycle = function(e) {

    this.direction = 'left';
    this.timer = setInterval(function() {
      self.index++;
      if( self.index == self.slides.length ) {
        self.index = 0;
      }
      self._slideTo( self.index, e );

    }, this.options.interval);
  }
  this.pause = function() {
    var pauseHandler = function () {
      if ( self.options.interval !==false && !/\bpaused/.test(self.carousel.className) ) {
        self.carousel.className += ' paused';
        clearInterval( self.timer );
        self.timer = null;
      }
    };
    var resumeHandler = function() {
      if ( self.options.interval !==false && /\bpaused/.test(self.carousel.className) ) {
        self.cycle();
        self.carousel.className = self.carousel.className.replace(/\bpaused/,'');
      }
    };
    self.carousel.addEventListener( "mouseenter", pauseHandler, false);
    self.carousel.addEventListener( "mouseleave", resumeHandler, false);
    self.carousel.addEventListener( "touchstart", pauseHandler, false);
    self.carousel.addEventListener( "touchend", resumeHandler, false);
  }
  this._slideTo = function( next, e ) {
    var active = this._getActiveIndex(); // the current active
    //determine type
    var direction = this.direction;
    var dr = direction === 'left' ? 'next' : 'prev';
    var slid = null, slide = null;

    //register events
    if (('CustomEvent' in window) && window.dispatchEvent) {
      slid =  new CustomEvent("slid.bs.carousel");
      slide = new CustomEvent("slide.bs.carousel");
    }
    if (slide) { this.carousel.dispatchEvent(slide); } //here we go with the slide

    this._removeEventListeners();
    clearInterval(this.timer);
    this.timer = null;
    this._curentPage( this.indicators[next] );

    if ( /\bslide/.test(this.carousel.className) && !(isIE && isIE < 10) ) {
      this.slides[next].className += (' '+dr);
      this.slides[next].offsetWidth;
      this.slides[next].className += (' '+direction);
      this.slides[active].className += (' '+direction);

      setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
        self._addEventListeners();

        self.slides[next].className += ' active';
        self.slides[active].className = self.slides[active].className.replace(' active','');

        self.slides[next].className = self.slides[next].className.replace(' '+dr,'');
        self.slides[next].className = self.slides[next].className.replace(' '+direction,'');
        self.slides[active].className = self.slides[active].className.replace(' '+direction,'');

        if ( self.options.interval !== false && !/\bpaused/.test(self.carousel.className) ){
          clearInterval(self.timer); self.cycle();
        }
        if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid
      }, this.options.duration + 100 );
    } else {
      this.slides[next].className += ' active';
      this.slides[next].offsetWidth;
      this.slides[active].className = this.slides[active].className.replace(' active','');
      setTimeout(function() {
        self._addEventListeners();
        if ( self.options.interval !== false && !/\bpaused/.test(self.carousel.className) ){
          clearInterval(self.timer); self.cycle();
        }
        if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid
      }, this.options.duration + 100 );
    }
  }
  this._addEventListeners = function () {
    this.next && this.next.addEventListener( "click", this.controlsHandler, false);
    this.prev && this.prev.addEventListener( "click", this.controlsHandler, false);

    this.indicator && this.indicator.addEventListener( "click", this.indicatorHandler, false);

    this.options.keyboard === true && window.addEventListener('keydown', this.keyHandler, false);
  }
  this._removeEventListeners = function () { // prevent mouse bubbles while animating
    this.next && this.next.removeEventListener( "click", this.controlsHandler, false);
    this.prev && this.prev.removeEventListener( "click", this.controlsHandler, false);

    this.indicator && this.indicator.removeEventListener( "click", this.indicatorHandler, false);

    this.options.keyboard === true && window.removeEventListener('keydown', this.keyHandler, false);
  }
  this._getActiveIndex = function () {
    return this.slides.indexOf(this.carousel.querySelector('.item.active'));
  }
  this._curentPage = function( p ) {
    for( var i = 0; i < this.indicators.length; ++i ) {
      var a = this.indicators[i];
      a.className = "";
    }
    if (p) p.className = "active";
  }
  this.indicatorHandler = function(e) {
    e.preventDefault();
    var target = e.target;
    var active = self._getActiveIndex(); // the current active

    if ( target && !/\bactive/.test(target.className) && target.getAttribute('data-slide-to') ) {
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
  }
  this.controlsHandler = function (e) {
    var target = e.currentTarget || e.srcElement;

    if ( target === self.next ) {
      self.index++;
      self.direction = 'left'; //set direction first

      if( self.index == self.total - 1 ) {
        self.index = self.total - 1;
      } else if ( self.index == self.total ){
        self.index = 0;
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
  this.keyHandler = function (e) {
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

  // init
  if ( this.options.interval !== false ){
    this.cycle();
  }

  if ( this.options && this.options.pause === 'hover' && this.options.interval !== false ) {
    this.pause();
  }
  this._addEventListeners();
  this.next && this.next.addEventListener( "click", function(e){e.preventDefault()}, false);
  this.prev && this.prev.addEventListener( "click", function(e){e.preventDefault()}, false);
};

(function () {
  // CAROUSEL DATA API
  // =================
  var Carousels = document.querySelectorAll('[data-ride="carousel"]'), i = 0, crl = Carousels.length;
  for (i;i<crl;i++) {
    var c = Carousels[i], options = {};
    options.interval = c.getAttribute('data-interval') && c.getAttribute('data-interval');
    options.pause = c.getAttribute('data-pause') && c.getAttribute('data-pause') || 'hover';
    options.keyboard = c.getAttribute('data-keyboard') && c.getAttribute('data-keyboard') || false;
    options.duration = c.getAttribute('data-duration') && c.getAttribute('data-duration') || false;
    new Carousel(c, options)
  }
})();
