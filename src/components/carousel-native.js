
/* Native JavaScript for Bootstrap 4 | Carousel
----------------------------------------------- */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, touchEvents, mouseHover, passiveHandler } from '../util/event.js';
import { queryElement } from '../util/selector.js';
import { getElementTransitionDuration, emulateTransitionEnd } from '../util/transition.js';
import { componentInit } from '../util/misc.js';

// CAROUSEL DEFINITION
// ===================

export default function Carousel (element,options) {

  // set options
  options = options || {}

  // bind
  const self = this

  // custom events
  let slideCustomEvent, slidCustomEvent

  // carousel elements
  let slides, leftArrow, rightArrow, indicator, indicators

  // handlers
  function pauseHandler() {
    if ( self.options.interval !==false && !hasClass(element,'paused') ) {
      addClass(element,'paused');
      !self.vars.isSliding && ( clearInterval(self.vars.timer), self.vars.timer = null );
    }
  }
  function resumeHandler() {
    if ( self.options.interval !== false && hasClass(element,'paused') ) {
      removeClass(element,'paused');
      !self.vars.isSliding && ( clearInterval(self.vars.timer), self.vars.timer = null );
      !self.vars.isSliding && self.cycle();
    }
  }
  function indicatorHandler(e) {
    e.preventDefault();
    if (self.vars.isSliding) return;

    const eventTarget = e.target; // event target | the current active item

    if ( eventTarget && !hasClass(eventTarget,'active') && eventTarget.getAttribute('data-slide-to') ) {
      self.vars.index = parseInt( eventTarget.getAttribute('data-slide-to'), 10 );
    } else { return false; }

    self.slideTo( self.vars.index ); //Do the slide
  }
  function controlsHandler(e) {
    e.preventDefault();
    if (self.vars.isSliding) return;

    const eventTarget = e.currentTarget || e.srcElement;

    if ( eventTarget === rightArrow ) {
      self.vars.index++;
    } else if ( eventTarget === leftArrow ) {
      self.vars.index--;
    }

    self.slideTo( self.vars.index ); //Do the slide
  }
  function keyHandler({which}) {
    if (self.vars.isSliding) return;
    switch (which) {
      case 39:
        self.vars.index++;
        break;
      case 37:
        self.vars.index--;
        break;
      default: return;
    }
    self.slideTo( self.vars.index ); //Do the slide
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
    if ( self.vars.isTouch ) { return; } 
      
    self.vars.touchPosition.startX = e.changedTouches[0].pageX;

    if ( element.contains(e.target) ) {
      self.vars.isTouch = true;
      toggleTouchEvents(on);
    }
  }
  function touchMoveHandler(e) {
    if ( !self.vars.isTouch ) { e.preventDefault(); return; }

    self.vars.touchPosition.currentX = e.changedTouches[0].pageX;
    
    // cancel touch if more than one changedTouches detected
    if ( e.type === 'touchmove' && e.changedTouches.length > 1 ) {
      e.preventDefault();
      return false;
    }
  }
  function touchEndHandler (e) {
    if ( !self.vars.isTouch || self.vars.isSliding ) { return }
    
    self.vars.touchPosition.endX = self.vars.touchPosition.currentX || e.changedTouches[0].pageX;

    if ( self.vars.isTouch ) {
      if ( (!element.contains(e.target) || !element.contains(e.relatedTarget) ) 
          && Math.abs(self.vars.touchPosition.startX - self.vars.touchPosition.endX) < 75 ) {
        return false;
      } else {
        if ( self.vars.touchPosition.currentX < self.vars.touchPosition.startX ) {
          self.vars.index++;
        } else if ( self.vars.touchPosition.currentX > self.vars.touchPosition.startX ) {
          self.vars.index--;        
        }
        self.vars.isTouch = false;
        self.slideTo(self.vars.index);
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
    [].slice.call(indicators).map(x=>{removeClass(x,'active')})
    indicators[pageIndex] && addClass(indicators[pageIndex], 'active');
  }
  function transitionEndHandler(e){
    if (self.vars){
      const next = self.vars.index,
            timeout = e && e.target !== slides[next] ? e.elapsedTime*1000+100 : 20,
            activeItem = self.getActiveIndex(),
            orientation = self.vars.direction === 'left' ? 'next' : 'prev'
      
      self.vars.isSliding && setTimeout(() => {
        if (self.vars){
          self.vars.isSliding = false;
    
          addClass(slides[next],'active');
          removeClass(slides[activeItem],'active');
    
          removeClass(slides[next],`carousel-item-${orientation}`);
          removeClass(slides[next],`carousel-item-${self.vars.direction}`);
          removeClass(slides[activeItem],`carousel-item-${self.vars.direction}`);
    
          dispatchCustomEvent.call(element, slidCustomEvent);
          // check for element, might have been disposed
          if ( !document.hidden && self.options.interval && !hasClass(element,'paused') ) {
            self.cycle();
          }
        }
      }, timeout);
    }
  }

  // public methods
  self.cycle = () => {
    if (self.vars.timer) {
      clearInterval(self.vars.timer);
      self.vars.timer = null;
    }

    self.vars.timer = setInterval(() => {
      let idx = self.vars.index || self.getActiveIndex()
      isElementInScrollRange() && (idx++, self.slideTo( idx ) );
    }, self.options.interval);
  }
  self.slideTo = next => {
    if (self.vars.isSliding) return; // when controled via methods, make sure to check again      

    // the current active and orientation
    let activeItem = self.getActiveIndex(), orientation;

    // first return if we're on the same item #227
    if ( activeItem === next ) {
      return;
    // or determine slide direction
    } else if  ( (activeItem < next ) || (activeItem === 0 && next === slides.length -1 ) ) {
      self.vars.direction = 'left'; // next
    } else if  ( (activeItem > next) || (activeItem === slides.length - 1 && next === 0 ) ) {
      self.vars.direction = 'right'; // prev
    }

    // find the right next index 
    if ( next < 0 ) { next = slides.length - 1; } 
    else if ( next >= slides.length ){ next = 0; }

    orientation = self.vars.direction === 'left' ? 'next' : 'prev'; // determine type

    slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', slides[next]);
    slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', slides[next]);
    dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
    if (slideCustomEvent.defaultPrevented) return; // discontinue when prevented

    // update index
    self.vars.index = next;

    self.vars.isSliding = true;
    clearInterval(self.vars.timer);
    self.vars.timer = null;
    setActivePage( next );

    if ( getElementTransitionDuration(slides[next]) && hasClass(element,'slide') ) {

      addClass(slides[next],`carousel-item-${orientation}`);
      slides[next].offsetWidth;
      addClass(slides[next],`carousel-item-${self.vars.direction}`);
      addClass(slides[activeItem],`carousel-item-${self.vars.direction}`);

      emulateTransitionEnd(slides[next], transitionEndHandler);

    } else {
      addClass(slides[next],'active');
      slides[next].offsetWidth;
      removeClass(slides[activeItem],'active');
      setTimeout(() => {
        self.vars.isSliding = false;
        // check for element, might have been disposed
        if ( self.options.interval && element && !hasClass(element,'paused') ) {
          self.cycle();
        }
        dispatchCustomEvent.call(element, slidCustomEvent);
      }, 100 );
    }
  }

  self.getActiveIndex = () => [].slice.call(slides).indexOf(element.getElementsByClassName('carousel-item active')[0]) || 0

  self.dispose = () => {
    let itemClasses = ['left','right','prev','next'];

    [].slice.call(slides).map((slide,idx) => {
      if (hasClass(slide,'active')){
        setActivePage( idx );
      }
      itemClasses.map(cls => removeClass(slide,`carousel-item-${cls}`))
    })
    clearInterval(self.vars.timer);

    toggleEvents(off);
    delete self.vars;
    delete element.Carousel;
  }

  // set initial state
  self.vars = {}
  self.vars.direction = 'left';
  self.vars.index = 0;
  self.vars.timer = null;
  self.vars.isSliding = false;
  self.vars.isTouch = false;
  self.vars.touchPosition = {
    startX : 0,
    currentX : 0,
    endX : 0
  }

  // init
  componentInit(()=>{

    // initialization element
    element = queryElement( element );

    // reset on re-init
    element.Carousel && element.Carousel.dispose(); 

    // options
    let
      // DATA API
      intervalAttribute = element.getAttribute('data-interval'),
      intervalOption = options.interval,
      intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
      pauseData = element.getAttribute('data-pause') === 'hover' || false,
      keyboardData = element.getAttribute('data-keyboard') === 'true' || false

    // carousel elements
    slides = element.getElementsByClassName('carousel-item')
    leftArrow = element.getElementsByClassName('carousel-control-prev')[0]
    rightArrow = element.getElementsByClassName('carousel-control-next')[0]
    indicator = queryElement( '.carousel-indicators', element )
    indicators = indicator && indicator.getElementsByTagName( "LI" ) || []

    // set instance options
    self.options = {};
    self.options.keyboard = options.keyboard === true || keyboardData;
    self.options.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
    
    self.options.interval = typeof intervalOption === 'number' ? intervalOption
                          : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                          : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
                          : intervalData;



    // invalidate when not enough items
    if (slides.length < 2) { return; }

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
    element.Carousel = self;
  })

}

