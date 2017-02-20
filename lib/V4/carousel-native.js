
/* Native Javascript for Bootstrap 4 | Carousel
----------------------------------------------*/

// CAROUSEL DEFINITION
// ===================
var Carousel = function( element, options ) {

  // initialization element
  element = queryElement( element );

  // set options
  options = options || {};

  // DATA API
  var intervalData = element[getAttribute](dataInterval) === 'false' ? false : parseInt(element[getAttribute](dataInterval)) || 5000, // bootstrap carousel default interval
      pauseData = element[getAttribute](dataPause) === hoverEvent || false,
      keyboardData = element[getAttribute](dataKeyboard) === 'true' || false,
    
      // strings
      component = 'carousel',
      paused = 'paused',
      direction = 'direction',
      carouselItem = 'carousel-item',
      dataSlideTo = 'data-slide-to'; 

  this[keyboard] = options[keyboard] === true || keyboardData;
  this[pause] = (options[pause] === hoverEvent || pauseData) ? hoverEvent : false; // false / hover

  if ( !( options[interval] || intervalData ) ) { // determine slide interval
    this[interval] = false;
  } else {
    this[interval] = parseInt(options[interval]) || intervalData; // default slide interval
  }

  // bind, event targets
  var self = this, index = element.index = 0, timer = element.timer = 0, 
    isSliding = false, // isSliding prevents click event handlers when animation is running
    slides = getElementsByClassName(element,carouselItem), total = slides[length],
    slideDirection = this[direction] = left,
    leftArrow = getElementsByClassName(element,component+'-control-prev')[0], 
    rightArrow = getElementsByClassName(element,component+'-control-next')[0],
    indicator = queryElement( '.'+component+'-indicators', element ),
    indicators = indicator[getElementsByTagName]( "LI" );

  // handlers
  var pauseHandler = function () {
      if ( self[interval] !==false && !hasClass(element,paused) ) {
        addClass(element,paused);
        !isSliding && clearInterval( timer );
      }
    },
    resumeHandler = function() {
      if ( self[interval] !== false && hasClass(element,paused) ) {
        removeClass(element,paused);
        !isSliding && clearInterval( timer );
        !isSliding && self.cycle();
      }
    },
    indicatorHandler = function(e) {
      e.preventDefault();
      if (isSliding) return;

      var eventTarget = e[target], activeIndicator = self.getActiveIndex(); // event target | the current active item

      if ( eventTarget && !hasClass(eventTarget,active) && eventTarget[getAttribute](dataSlideTo) ) {
        index = parseInt( eventTarget[getAttribute](dataSlideTo), 10 );

        //determine direction first
        if  ( (activeIndicator < index ) || (activeIndicator === 0 && index === total -1 ) ) {
          slideDirection = self[direction] = left; // next
        } else if  ( (activeIndicator > index) || (activeIndicator === total - 1 && index === 0 ) ) {
          slideDirection = self[direction] = right; // prev
        }
      } else { return false; }

      self.slideTo( index ); //Do the slide
    },
    controlsHandler = function (e) {
      e.preventDefault();
      if (isSliding) return;

      var eventTarget = e.currentTarget || e.srcElement;

      if ( eventTarget === rightArrow ) {
        index++;
        slideDirection = self[direction] = left; //set direction first

        if( index === total - 1 ) {
          index = total - 1;
        } else if ( index === total ){
          index = 0;
        }
      } else if ( eventTarget === leftArrow ) {
        index--;
        slideDirection = self[direction] = right; //set direction first

        if( index === 0 ) {
          index = 0;
        } else if ( index < 0 ){
          index = total - 1
        }
      }

      self.slideTo( index ); //Do the slide
    },
    keyHandler = function (e) {
      if (isSliding) return;
      switch (e.which) {
        case 39:
          index++;
          slideDirection = self[direction] = left;
          if( index == total - 1 ) { index = total - 1; } else
          if ( index == total ){ index = 0 }
          break;
        case 37:
          index--;
          slideDirection = self[direction] = right;
          if ( index == 0 ) { index = 0; } else
          if ( index < 0 ) { index = total - 1 }
          break;
        default: return;
      }
      self.slideTo( index ); //Do the slide
    },
    // private methods
    setActivePage = function( pageIndex ) { //indicators
      for ( var i = 0, icl = indicators[length]; i < icl; i++ ) {
        removeClass(indicators[i],active);
      }
      if (indicators[pageIndex]) addClass(indicators[pageIndex], active);
    };


  // public methods
  this.cycle = function() {
    slideDirection = this[direction] = left; // make sure to always come back to default slideDirection
    timer = setInterval(function() {
      index++;

      index = index === total ? 0 : index;
      self.slideTo( index );
    }, this[interval]);
  };
  this.slideTo = function( next ) {
    var activeItem = this.getActiveIndex(), // the current active
      orientation = slideDirection === left ? 'next' : 'prev'; //determine type

    bootstrapCustomEvent.call(element, slideEvent, component, slides[next]); // here we go with the slide

    isSliding = true;
    clearInterval(timer);
    setActivePage( next );

    if ( supportTransitions && hasClass(element,'slide') 
      && ( // we now check if the media queries do actually filter out BS4 transitions
        globalObject.getComputedStyle(slides[next])[Transition[toLowerCase]()] 
          || globalObject.getComputedStyle(slides[next])[Webkit[toLowerCase]() + Transition]
          || globalObject.getComputedStyle(slides[next])[Webkit + Transition + 'Duration'] // old Safari stuff
      )
    ) {

      addClass(slides[next],carouselItem +'-'+ orientation);
      slides[next][offsetWidth];
      addClass(slides[next],carouselItem +'-'+ slideDirection);
      addClass(slides[activeItem],carouselItem +'-'+ slideDirection);

      one(slides[activeItem], transitionEndEvent, function(e) {
        var timeout = e[target] !== slides[activeItem] ? e.elapsedTime*1000 : 0;
        setTimeout(function(){
          isSliding = false;

          addClass(slides[next],active);
          removeClass(slides[activeItem],active);

          removeClass(slides[next],carouselItem +'-'+ orientation);
          removeClass(slides[next],carouselItem +'-'+ slideDirection);
          removeClass(slides[activeItem],carouselItem +'-'+ slideDirection);

          bootstrapCustomEvent.call(element, slidEvent, component, slides[next]);

          if ( !document.hidden && self[interval] && !hasClass(element,paused) ) {
            self.cycle();
          }
        },timeout);
      });

    } else {
      addClass(slides[next],active);
      slides[next][offsetWidth];
      removeClass(slides[activeItem],active);
      setTimeout(function() {
        isSliding = false;
        if ( self[interval] && !hasClass(element,paused) ) {
          self.cycle();
        }
        bootstrapCustomEvent.call(element, slidEvent, component, slides[next]);
      }, 100 );
    }
  };
  this.getActiveIndex = function () {
    return slides[indexOf](getElementsByClassName(element,carouselItem+' active')[0]) || 0;
  };

  // init
  if ( !(stringCarousel in element ) ) { // prevent adding event handlers twice

    if ( this[pause] && this[interval] ) {
      on( element, mouseHover[0], pauseHandler );
      on( element, mouseHover[1], resumeHandler );
      on( element, 'touchstart', pauseHandler );
      on( element, 'touchend', resumeHandler );
    }
  
    rightArrow && on( rightArrow, clickEvent, controlsHandler );
    leftArrow && on( leftArrow, clickEvent, controlsHandler );
  
    indicator && on( indicator, clickEvent, indicatorHandler, false);
    this[keyboard] === true && on( globalObject, keydownEvent, keyHandler, false);
  }
  if (this.getActiveIndex()<0) {
    slides[length] && addClass(slides[0],active);
    indicators[length] && setActivePage(0);
  }

  if ( this[interval] ){ this.cycle(); }
  element[stringCarousel] = this;
};

// CAROUSEL DATA API
// =================
initializeDataAPI( stringCarousel, Carousel, dataRide );

