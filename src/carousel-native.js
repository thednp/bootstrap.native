
/* Native JavaScript for Bootstrap 4 | Carousel
----------------------------------------------- */

import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, touchEvents, mouseHover, passiveHandler } from './util/event.js';
import { queryElement } from './util/selector.js';
import { getElementTransitionDuration, emulateTransitionEnd } from './util/transition.js';

// CAROUSEL DEFINITION
// ===================

export default function Carousel (element,options) {

  // initialization element
  element = queryElement( element );

  // reset on re-init
  element.Carousel && element.Carousel.dispose();

  // set options
  options = options || {};    

  // bind
  const self = this,
  
    // DATA API
    intervalAttribute = element.getAttribute('data-interval'),
    intervalOption = options.interval,
    intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
    pauseData = element.getAttribute('data-pause') === 'hover' || false,
    keyboardData = element.getAttribute('data-keyboard') === 'true' || false,
    // carousel elements
    slides = element.getElementsByClassName('carousel-item'),
    leftArrow = element.getElementsByClassName('carousel-control-prev')[0],
    rightArrow = element.getElementsByClassName('carousel-control-next')[0],
    indicator = queryElement( `.carousel-indicators`, element ),
    indicators = indicator && indicator.getElementsByTagName( "LI" ) || [];

  // invalidate when not enough items
  if (slides.length < 2) { return; }

  // set instance options
  self.options = {};
  self.options.keyboard = options.keyboard === true || keyboardData;
  self.options.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
  
  self.options.interval = typeof intervalOption === 'number' ? intervalOption
                        : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                        : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
                        : intervalData;

  // custom events
  let slideCustomEvent, slidCustomEvent;

  // handlers
  function pauseHandler() {
    if ( self.options.interval !==false && !hasClass(element,'paused') ) {
      addClass(element,'paused');
      !element.isSliding && ( clearInterval(element.timer), element.timer = null );
    }
  }
  function resumeHandler() {
    if ( self.options.interval !== false && hasClass(element,'paused') ) {
      removeClass(element,'paused');
      !element.isSliding && ( clearInterval(element.timer), element.timer = null );
      !element.isSliding && self.cycle();
    }
  }
  function indicatorHandler(e) {
    e.preventDefault();
    if (element.isSliding) return;

    const eventTarget = e.target; // event target | the current active item

    if ( eventTarget && !hasClass(eventTarget,'active') && eventTarget.getAttribute('data-slide-to') ) {
      element.index = parseInt( eventTarget.getAttribute('data-slide-to'), 10 );
    } else { return false; }

    self.slideTo( element.index ); //Do the slide
  }
  function controlsHandler(e) {
    e.preventDefault();
    if (element.isSliding) return;

    const eventTarget = e.currentTarget || e.srcElement;

    if ( eventTarget === rightArrow ) {
      element.index++;
    } else if ( eventTarget === leftArrow ) {
      element.index--;
    }

    self.slideTo( element.index ); //Do the slide
  }
  function keyHandler({which}) {
    if (element.isSliding) return;
    switch (which) {
      case 39:
        element.index++;
        break;
      case 37:
        element.index--;
        break;
      default: return;
    }
    self.slideTo( element.index ); //Do the slide
  }
  function toggleEvents(action) {
    if ( self.options.pause && self.options.interval ) {
      action( element, mouseHover[0], pauseHandler );
      action( element, mouseHover[1], resumeHandler );
      action( element, touchEvents.start, pauseHandler, passiveHandler );
      action( element, touchEvents.end, resumeHandler, passiveHandler );
    }
  
    slides.length > 1 && action( element, touchEvents.start, touchDownHandler, passiveHandler );

    rightArrow && action( rightArrow, 'click', controlsHandler );
    leftArrow && action( leftArrow, 'click', controlsHandler );
  
    indicator && action( indicator, 'click', indicatorHandler );
    self.options.keyboard && action( window, 'keydown', keyHandler );
  }
  // touch events
  function toggleTouchEvents(action) {
    action( element, touchEvents.move, touchMoveHandler, passiveHandler );
    action( element, touchEvents.end, touchEndHandler, passiveHandler );
  }
  function touchDownHandler(e) {
    if ( element.isTouch ) { return; } 
      
    element.touchPosition.startX = parseInt(e.currentTouches[0].pageX);

    if ( element.contains(e.target) ) {
      element.isTouch = true;
      toggleTouchEvents(on);
    }
  }
  function touchMoveHandler(e) {
    if ( !element.isTouch ) { e.preventDefault(); return; }

    element.touchPosition.currentX = parseInt(e.currentTouches[0].pageX);
    
    // cancel touch if more than one touches detected
    if ( e.type === 'touchmove' && e.currentTouches.length > 1 ) {
      e.preventDefault();
      return false;
    }
  }
  function touchEndHandler (e) {
    if ( !element.isTouch || element.isSliding ) { return }
    
    element.touchPosition.endX = element.touchPosition.currentX || parseInt( e.currentTouches[0].pageX );

    if ( element.isTouch ) {
      if ( (!element.contains(e.target) || !element.contains(e.relatedTarget) ) 
          && Math.abs(element.touchPosition.startX - element.touchPosition.endX) < 75 ) {
        return false;
      } else {
        if ( element.touchPosition.currentX < element.touchPosition.startX ) {
          element.index++;
        } else if ( element.touchPosition.currentX > element.touchPosition.startX ) {
          element.index--;        
        }
        element.isTouch = false;
        self.slideTo(element.index);
      }
      toggleTouchEvents(off);            
    }
  }
  // private methods
  function isElementInScrollRange() {
    const rect = element.getBoundingClientRect(), viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top <= viewportHeight && rect.bottom >= 0; // bottom && top
  }
  function setActivePage(pageIndex) { //indicators
    for ( let i = 0, icl = indicators.length; i < icl; i++ ) {
      removeClass(indicators[i],'active');
    }
    if (indicators[pageIndex]) addClass(indicators[pageIndex], 'active');
  }

  // public methods
  self.cycle = () => {
    if (element.timer) {
      clearInterval(element.timer);
      element.timer = null;
    }

    element.timer = setInterval(() => {
      isElementInScrollRange() && (element.index++, self.slideTo( element.index ) );
    }, self.options.interval);
  }
  self.slideTo = next => {
    if (element.isSliding) return; // when controled via methods, make sure to check again      

    // the current active and orientation
    let activeItem = self.getActiveIndex(), orientation;

    // first return if we're on the same item #227
    if ( activeItem === next ) {
      return;
    // or determine slide direction
    } else if  ( (activeItem < next ) || (activeItem === 0 && next === slides.length -1 ) ) {
      element.direction = 'left'; // next
    } else if  ( (activeItem > next) || (activeItem === slides.length - 1 && next === 0 ) ) {
      element.direction = 'right'; // prev
    }

    // find the right next index 
    if ( next < 0 ) { next = slides.length - 1; } 
    else if ( next >= slides.length ){ next = 0; }

    // update index
    element.index = next;

    orientation = element.direction === 'left' ? 'next' : 'prev'; // determine type

    slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', slides[next]);
    slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', slides[next]);
    dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
    if (slideCustomEvent.defaultPrevented) return; // discontinue when prevented

    element.isSliding = true;
    clearInterval(element.timer);
    element.timer = null;
    setActivePage( next );

    if ( getElementTransitionDuration(slides[next]) && hasClass(element,'slide') ) {

      addClass(slides[next],`carousel-item-${orientation}`);
      slides[next].offsetWidth;
      addClass(slides[next],`carousel-item-${element.direction}`);
      addClass(slides[activeItem],`carousel-item-${element.direction}`);

      emulateTransitionEnd(slides[next], e => {
        const timeout = e && e.target !== slides[next] ? e.elapsedTime*1000+100 : 20;
        
        element.isSliding && setTimeout(() => {
          element.isSliding = false;

          addClass(slides[next],'active');
          removeClass(slides[activeItem],'active');

          removeClass(slides[next],`carousel-item-${orientation}`);
          removeClass(slides[next],`carousel-item-${element.direction}`);
          removeClass(slides[activeItem],`carousel-item-${element.direction}`);

          dispatchCustomEvent.call(element, slidCustomEvent);

          if ( !document.hidden && self.options.interval && !hasClass(element,'paused') ) {
            self.cycle();
          }
        }, timeout);
      });

    } else {
      addClass(slides[next],'active');
      slides[next].offsetWidth;
      removeClass(slides[activeItem],'active');
      setTimeout(() => {
        element.isSliding = false;
        if ( self.options.interval && !hasClass(element,'paused') ) {
          self.cycle();
        }
        dispatchCustomEvent.call(element, slidCustomEvent);
      }, 100 );
    }
  }

  self.getActiveIndex = () => [].slice.call(slides).indexOf(element.getElementsByClassName('carousel-item active')[0]) || 0

  self.dispose = () => {
    toggleEvents(off);
    clearInterval(element.timer);
    delete element.Carousel;
  }

  // set initial state
  element.direction = 'left';
  element.index = 0;
  element.timer = null;
  element.isSliding = false;
  element.isTouch = false;
  element.touchPosition = {
    startX : 0,
    currentX : 0,
    endX : 0
  }

  // init
  // prevent adding event handlers twice
  if ( !element.Carousel ) { 
    toggleEvents(on);
  }
  // set first slide active if none
  if (self.getActiveIndex()<0) {
    slides.length && addClass(slides[0],'active');
    indicators.length && setActivePage(0);
  }

  // start to cycle if set
  if ( self.options.interval ){ self.cycle(); }

  // associate init object to target
  self.element = element;
  element.Carousel = self;

}

