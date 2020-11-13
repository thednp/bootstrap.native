
/* Native JavaScript for Bootstrap 4 | Carousel
----------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import isElementInScrollRange from 'shorter-js/src/misc/isElementInScrollRange.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// CAROUSEL DEFINITION
// ===================

export default function Carousel (element,options) {

  // set options
  options = options || {}

  // bind
  let self = this,

    // internal variables
    vars, ops,

    // custom events
    slideCustomEvent, slidCustomEvent,

    // carousel elements
    slides, leftArrow, rightArrow, indicator, indicators

  // handlers
  function pauseHandler() {
    if ( ops.interval !==false && !element.classList.contains('paused') ) {
      element.classList.add('paused');
      !vars.isSliding && ( clearInterval(vars.timer), vars.timer = null );
    }
  }
  function resumeHandler() {
    if ( ops.interval !== false && element.classList.contains('paused') ) {
      element.classList.remove('paused');
      !vars.isSliding && ( clearInterval(vars.timer), vars.timer = null );
      !vars.isSliding && self.cycle();
    }
  }
  function indicatorHandler(e) {
    e.preventDefault();
    if (vars.isSliding) return;

    let eventTarget = e.target; // event target | the current active item

    if ( eventTarget && !eventTarget.classList.contains('active') && eventTarget.getAttribute('data-slide-to') ) {
      vars.index = parseInt( eventTarget.getAttribute('data-slide-to'));
    } else { return false; }

    self.slideTo( vars.index ); //Do the slide
  }
  function controlsHandler(e) {
    e.preventDefault();
    if (vars.isSliding) return;

    let eventTarget = e.currentTarget || e.srcElement;

    if ( eventTarget === rightArrow ) {
      vars.index++;
    } else if ( eventTarget === leftArrow ) {
      vars.index--;
    }

    self.slideTo( vars.index ); //Do the slide
  }
  function keyHandler({which}) {
    if (vars.isSliding) return;
    switch (which) {
      case 39:
        vars.index++;
        break;
      case 37:
        vars.index--;
        break;
      default: return;
    }
    self.slideTo( vars.index ); //Do the slide
  }
  function toggleEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener'
    if ( ops.pause && ops.interval ) {
      element[action]( mouseHoverEvents[0], pauseHandler, false );
      element[action]( mouseHoverEvents[1], resumeHandler, false );
      element[action]( 'touchstart', pauseHandler, passiveHandler );
      element[action]( 'touchend', resumeHandler, passiveHandler );
    }
  
    ops.touch && slides.length > 1 && element[action]( 'touchstart', touchDownHandler, passiveHandler );

    rightArrow && rightArrow[action]( 'click', controlsHandler,false );
    leftArrow && leftArrow[action]( 'click', controlsHandler,false );
  
    indicator && indicator[action]( 'click', indicatorHandler,false );
    ops.keyboard && window[action]( 'keydown', keyHandler,false );
  }
  // touch events
  function toggleTouchEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener';
    element[action]( 'touchmove', touchMoveHandler, passiveHandler );
    element[action]( 'touchend', touchEndHandler, passiveHandler );
  }
  function touchDownHandler(e) {
    if ( vars.isTouch ) { return; } 
      
    vars.touchPosition.startX = e.changedTouches[0].pageX;

    if ( element.contains(e.target) ) {
      vars.isTouch = true;
      toggleTouchEvents(1);
    }
  }
  function touchMoveHandler(e) {
    if ( !vars.isTouch ) { e.preventDefault(); return; }

    vars.touchPosition.currentX = e.changedTouches[0].pageX;
    
    // cancel touch if more than one changedTouches detected
    if ( e.type === 'touchmove' && e.changedTouches.length > 1 ) {
      e.preventDefault();
      return false;
    }
  }
  function touchEndHandler (e) {
    if ( !vars.isTouch || vars.isSliding ) { return }
    
    vars.touchPosition.endX = vars.touchPosition.currentX || e.changedTouches[0].pageX;

    if ( vars.isTouch ) {
      if ( (!element.contains(e.target) || !element.contains(e.relatedTarget) ) 
          && Math.abs(vars.touchPosition.startX - vars.touchPosition.endX) < 75 ) {
        return false;
      } else {
        if ( vars.touchPosition.currentX < vars.touchPosition.startX ) {
          vars.index++;
        } else if ( vars.touchPosition.currentX > vars.touchPosition.startX ) {
          vars.index--;        
        }
        vars.isTouch = false;
        self.slideTo(vars.index);
      }
      toggleTouchEvents(); // remove
    }
  }
  // private methods
  function setActivePage(pageIndex) { //indicators
    Array.from(indicators).map(x=>{x.classList.remove('active')})
    indicators[pageIndex] && indicators[pageIndex].classList.add('active');
  }
  function transitionEndHandler(e){
    if (vars.touchPosition){
      let next = vars.index,
          timeout = e && e.target !== slides[next] ? e.elapsedTime*1000+100 : 20,
          activeItem = self.getActiveIndex(),
          orientation = vars.direction === 'left' ? 'next' : 'prev'

      vars.isSliding && setTimeout(() => {
        if (vars.touchPosition){
          vars.isSliding = false;
    
          slides[next].classList.add('active');
          slides[activeItem].classList.remove('active');
    
          slides[next].classList.remove(`carousel-item-${orientation}`);
          slides[next].classList.remove(`carousel-item-${vars.direction}`);
          slides[activeItem].classList.remove(`carousel-item-${vars.direction}`);
    
          dispatchCustomEvent.call(element, slidCustomEvent);
          // check for element, might have been disposed
          if ( !document.hidden && ops.interval && !element.classList.contains('paused') ) {
            self.cycle();
          }
        }
      }, timeout);
    }
  }

  // public methods
  self.cycle = () => {
    if (vars.timer) {
      clearInterval(vars.timer);
      vars.timer = null;
    }

    vars.timer = setInterval(() => {
      let idx = vars.index || self.getActiveIndex()
      isElementInScrollRange(element) && (idx++, self.slideTo( idx ) );
    }, ops.interval);
  }
  self.slideTo = next => {
    if (vars.isSliding) return; // when controled via methods, make sure to check again      

    // the current active, orientation, event eventProperties
    let activeItem = self.getActiveIndex(), orientation, eventProperties;

    // first return if we're on the same item #227
    if ( activeItem === next ) {
      return;
    // or determine slide direction
    } else if  ( (activeItem < next ) || (activeItem === 0 && next === slides.length -1 ) ) {
      vars.direction = 'left'; // next
    } else if  ( (activeItem > next) || (activeItem === slides.length - 1 && next === 0 ) ) {
      vars.direction = 'right'; // prev
    }

    // find the right next index 
    if ( next < 0 ) { next = slides.length - 1; } 
    else if ( next >= slides.length ){ next = 0; }

    orientation = vars.direction === 'left' ? 'next' : 'prev'; // determine type

    eventProperties = { relatedTarget: slides[next], direction: vars.direction, from: activeItem, to: next };
    slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', eventProperties);
    slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', eventProperties);
    dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
    if (slideCustomEvent.defaultPrevented) return; // discontinue when prevented

    // update index
    vars.index = next;

    vars.isSliding = true;
    clearInterval(vars.timer);
    vars.timer = null;
    setActivePage( next );

    if ( getElementTransitionDuration(slides[next]) && element.classList.contains('slide') ) {

      slides[next].classList.add(`carousel-item-${orientation}`);
      slides[next].offsetWidth;
      slides[next].classList.add(`carousel-item-${vars.direction}`);
      slides[activeItem].classList.add(`carousel-item-${vars.direction}`);

      emulateTransitionEnd(slides[next], transitionEndHandler);

    } else {
      slides[next].classList.add('active');
      slides[next].offsetWidth;
      slides[activeItem].classList.remove('active');
      setTimeout(() => {
        vars.isSliding = false;
        // check for element, might have been disposed
        if ( ops.interval && element && !element.classList.contains('paused') ) {
          self.cycle();
        }
        dispatchCustomEvent.call(element, slidCustomEvent);
      }, 100 );
    }
  }

  self.getActiveIndex = () => Array.from(slides).indexOf(element.getElementsByClassName('carousel-item active')[0]) || 0

  self.dispose = () => {
    let itemClasses = ['left','right','prev','next'];

    Array.from(slides).map((slide,idx) => {
      slide.classList.contains('active') && setActivePage( idx )
      itemClasses.map(cls => slide.classList.remove(`carousel-item-${cls}`))
    })
    clearInterval(vars.timer);

    toggleEvents();
    vars = {};
    ops = {};
    delete element.Carousel;
  }

  // init

  // initialization element
  element = queryElement( element );

  // reset on re-init
  element.Carousel && element.Carousel.dispose();

  // carousel elements
  slides = element.getElementsByClassName('carousel-item')
  leftArrow = element.getElementsByClassName('carousel-control-prev')[0]
  rightArrow = element.getElementsByClassName('carousel-control-next')[0]
  indicator = element.getElementsByClassName('carousel-indicators')[0]
  indicators = indicator && indicator.getElementsByTagName( "LI" ) || []

  // invalidate when not enough items
  if (slides.length < 2) { return }    

  // check options
  let
    // DATA API
    intervalAttribute = element.getAttribute('data-interval'),
    intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
    touchData = element.getAttribute('data-touch') === 'false' ? 0 : 1,
    pauseData = element.getAttribute('data-pause') === 'hover' || false,
    keyboardData = element.getAttribute('data-keyboard') === 'true' || false,
    
    // JS options
    intervalOption = options.interval,
    touchOption = options.touch;

  // set instance options
  ops = {};
  ops.keyboard = options.keyboard === true || keyboardData;
  ops.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
  ops.touch = touchOption || touchData
  
  ops.interval = typeof intervalOption === 'number' ? intervalOption
              : intervalOption === false || intervalData === 0 || intervalData === false ? 0
              : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
              : intervalData;

  // set first slide active if none
  if (self.getActiveIndex()<0) {
    slides.length && slides[0].classList.add('active');
    indicators.length && setActivePage(0);
  }

  // set initial state
  vars = {}
  vars.direction = 'left';
  vars.index = 0;
  vars.timer = null;
  vars.isSliding = false;
  vars.isTouch = false;
  vars.touchPosition = {
    startX : 0,
    currentX : 0,
    endX : 0
  }                

  // attach event handlers
  toggleEvents(1);

  // start to cycle if interval is set
  if ( ops.interval ){ self.cycle(); }

  // associate init object to target
  element.Carousel = self;
}
