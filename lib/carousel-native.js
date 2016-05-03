// Native Javascript for Bootstrap 3 | Carousel
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
    window.Carousel = factory();
  }

})(function(){

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
    this.isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false; 
    this.options.duration = (this.isIE && this.isIE < 10) ? 0 : (options.duration || this.duration);

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
      var pauseHandler = function () {
        if ( self.options.interval !==false && !/paused/.test(self.carousel.className) ) {
          self.carousel.className += ' paused';
          clearInterval( self.timer );
          self.timer = null;
        }
      };
      var resumeHandler = function() {
        if ( self.options.interval !==false && /paused/.test(self.carousel.className) ) {
          self.cycle();
          self.carousel.className = self.carousel.className.replace(' paused','');
        }
      };
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
      var dr = direction === 'left' ? 'next' : 'prev';
      var slid = null, slide=null;
      
      //register events
      if (('CustomEvent' in window) && window.dispatchEvent) {
        slid =  new CustomEvent("slid.bs.carousel");
        slide = new CustomEvent("slide.bs.carousel");
      }
      if (slid) { self.carousel.dispatchEvent(slid); } //here we go with the slid

      self._removeEventListeners();
      clearInterval(self.timer);
      self.timer = null;
      self._curentPage( self.indicators[next] );

      if ( /slide/.test(this.carousel.className) && !(this.isIE && this.isIE < 10) ) {
        self.slides[next].className += (' '+dr);
        self.slides[next].offsetWidth;
        self.slides[next].className += (' '+direction);
        self.slides[active].className += (' '+direction);

        setTimeout(function() { //we're gonna fake waiting for the animation to finish, cleaner and better
          self._addEventListeners();

          self.slides[next].className += ' active';
          self.slides[active].className = self.slides[active].className.replace(' active','');

          self.slides[next].className = self.slides[next].className.replace(' '+dr,'');
          self.slides[next].className = self.slides[next].className.replace(' '+direction,'');
          self.slides[active].className = self.slides[active].className.replace(' '+direction,'');

          if ( self.options.interval !== false && !/paused/.test(self.carousel.className) ){
            clearInterval(self.timer); self.cycle();
          }
          if (slide) { self.carousel.dispatchEvent(slide); } //here we go with the slide
        }, self.options.duration + 100 );
      } else {
        self.slides[next].className += ' active';
        self.slides[next].offsetWidth;
        self.slides[active].className = self.slides[active].className.replace(' active','');
        setTimeout(function() {
          self._addEventListeners();
          if ( self.options.interval !== false && !/paused/.test(self.carousel.className) ){
            clearInterval(self.timer); self.cycle();
          }
          if (slide) { self.carousel.dispatchEvent(slide); } //here we go with the slide
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
  var Carousels = document.querySelectorAll('[data-ride="carousel"]'), i = 0, crl = Carousels.length;
  for (i;i<crl;i++) {
    var c = Carousels[i], options = {};
    options.interval = c.getAttribute('data-interval') && c.getAttribute('data-interval');
    options.pause = c.getAttribute('data-pause') && c.getAttribute('data-pause') || 'hover';
    options.keyboard = c.getAttribute('data-keyboard') && c.getAttribute('data-keyboard') || false;
    options.duration = c.getAttribute('data-duration') && c.getAttribute('data-duration') || false;
    new Carousel(c, options)
  }

  return Carousel;

});
