
/* Native JavaScript for Bootstrap 4 | Carousel
----------------------------------------------*/

// IMPORTS
import { supports } from './util/globals.js';
import { hasClass, addClass, removeClass } from './util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, touchEvents, mouseHover, passiveHandler } from './util/event.js';
import { queryElement, getElementsByClassName } from './util/selector.js';
import { supportTransitions, emulateTransitionEnd } from './util/transition.js';

// CAROUSEL DEFINITION
// ===================
export default class Carousel {

  constructor (element,options) {

    // initialization element
    element = queryElement( element );

    // reset on re-init
    element.Carousel && element.Carousel.destroy();

    // bind
    const self = this,
   
      // DATA API
      intervalAttribute = element.getAttribute('data-interval');
      intervalOption = options.interval,
      intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
      pauseData = element.getAttribute('data-pause') === 'hover' || false,
      keyboardData = element.getAttribute('data-keyboard') === 'true' || false,
      // carousel elements
      slides = getElementsByClassName(element,'carousel-item'),
      total = slides.length,
      leftArrow = getElementsByClassName(element,`carousel-control-prev`)[0],
      rightArrow = getElementsByClassName(element,`carousel-control-next`)[0],
      indicator = queryElement( `.carousel-indicators`, element ),
      indicators = indicator && indicator.getElementsByTagName( "LI" ) || [];

    // invalidate when not enough items
    if (total < 2) { return; }

    // set options
    options = options || {};
    self.options = {};
    self.options.keyboard = options.keyboard === true || keyboardData;
    self.options.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
    
    self.options.interval = typeof intervalOption === 'number' ? intervalOption
                          : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                          : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
                          : intervalData;

    // vars, index, timer
    let index = element.index = 0, 
      timer = element.timer = 0,
      isSliding = false, // isSliding prevents click event handlers when animation is running
      // touch and event coordinates
      isTouch = false,
      startXPosition = null,
      currentXPosition = null,
      endXPosition = null, 
      slideDirection = self.direction = left,
      // custom events
      slideCustomEvent,
      slidCustomEvent;

    // handlers
    const 
      pauseHandler = () => {
        if ( self.options.interval !==false && !hasClass(element,'paused') ) {
          addClass(element,'paused');
          !isSliding && ( clearInterval(timer), timer = null );
        }
      },
      resumeHandler = () => {
        if ( self.options.interval !== false && hasClass(element,'paused') ) {
          removeClass(element,'paused');
          !isSliding && ( clearInterval(timer), timer = null );
          !isSliding && self.cycle();
        }
      },
      indicatorHandler = e => {
        e.preventDefault();
        if (isSliding) return;

        const eventTarget = e.target; // event target | the current active item

        if ( eventTarget && !hasClass(eventTarget,'active') && eventTarget.getAttribute('data-slide-to') ) {
          index = parseInt( eventTarget.getAttribute('data-slide-to'), 10 );
        } else { return false; }

        self.slideTo( index ); //Do the slide
      },
      controlsHandler = e => {
        e.preventDefault();
        if (isSliding) return;

        const eventTarget = e.currentTarget || e.srcElement;

        if ( eventTarget === rightArrow ) {
          index++;
        } else if ( eventTarget === leftArrow ) {
          index--;
        }

        self.slideTo( index ); //Do the slide
      },
      keyHandler = ({which}) => {
        if (isSliding) return;
        switch (which) {
          case 39:
            index++;
            break;
          case 37:
            index--;
            break;
          default: return;
        }
        self.slideTo( index ); //Do the slide
      },
      toggleEvents = action => {
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
      },
      // touch events
      toggleTouchEvents = action => {
        action( element, touchEvents.move, touchMoveHandler, passiveHandler );
        action( element, touchEvents.end, touchEndHandler, passiveHandler );
      },
      touchDownHandler = e => {
        if ( isTouch ) { return; } 
          
        startXPosition = parseInt(e.touches[0].pageX);

        if ( element.contains(e.target) ) {
          isTouch = true;
          toggleTouchEvents(on);
        }
      },
      touchMoveHandler = e => {
        if ( !isTouch ) { e.preventDefault(); return; }

        currentXPosition = parseInt(e.touches[0].pageX);
        
        //cancel touch if more than one touches detected
        if ( e.type === 'touchmove' && e.touches.length > 1 ) {
          e.preventDefault();
          return false;
        }
      },
      touchEndHandler = e => {
        if ( !isTouch || isSliding ) { return }
        
        endXPosition = currentXPosition || parseInt( e.touches[0].pageX );

        if ( isTouch ) {
          if ( (!element.contains(e.target) || !element.contains(e.relatedTarget) ) && Math.abs(startXPosition - endXPosition) < 75 ) {
            return false;
          } else {
            if ( currentXPosition < startXPosition ) {
              index++;
            } else if ( currentXPosition > startXPosition ) {
              index--;        
            }
            isTouch = false;
            self.slideTo(index);
          }
          toggleTouchEvents(off);            
        }
      },
      // private methods
      isElementInScrollRange = () => {
        const rect = element.getBoundingClientRect(), viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= viewportHeight && rect.bottom >= 0; // bottom && top
      },
      setActivePage = pageIndex => { //indicators
        for ( let i = 0, icl = indicators.length; i < icl; i++ ) {
          removeClass(indicators[i],'active');
        }
        if (indicators[pageIndex]) addClass(indicators[pageIndex], 'active');
      };

    // public methods
    self.cycle = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }

      timer = setInterval(() => {
        isElementInScrollRange() && (index++, self.slideTo( index ) );
      }, self.options.interval);
    }
    self.slideTo = next => {
      if (isSliding) return; // when controled via methods, make sure to check again      

      // the current active and orientation
      let activeItem = self.getActiveIndex(), orientation;

      // first return if we're on the same item #227
      if ( activeItem === next ) {
        return;
      // or determine slideDirection
      } else if  ( (activeItem < next ) || (activeItem === 0 && next === total -1 ) ) {
        slideDirection = self.direction = 'left'; // next
      } else if  ( (activeItem > next) || (activeItem === total - 1 && next === 0 ) ) {
        slideDirection = self.direction = 'right'; // prev
      }

      // find the right next index 
      if ( next < 0 ) { next = total - 1; } 
      else if ( next >= total ){ next = 0; }

      // update index
      index = next;

      orientation = slideDirection === 'left' ? 'next' : 'prev'; // determine type

      slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', slides[next]);
      slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', slides[next]);
      dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
      if (slideCustomEvent.defaultPrevented) return; // discontinue when prevented

      isSliding = true;
      clearInterval(timer);
      timer = null;
      setActivePage( next );

      if ( supportTransitions && hasClass(element,'slide') ) {

        addClass(slides[next],`carousel-item-${orientation}`);
        slides[next].offsetWidth;
        addClass(slides[next],`carousel-item-${slideDirection}`);
        addClass(slides[activeItem],`carousel-item-${slideDirection}`);

        emulateTransitionEnd(slides[next], e => {
          const timeout = e && e.target !== slides[next] ? e.elapsedTime*1000+100 : 20;
          
          isSliding && setTimeout(() => {
            isSliding = false;

            addClass(slides[next],'active');
            removeClass(slides[activeItem],'active');

            removeClass(slides[next],`carousel-item-${orientation}`);
            removeClass(slides[next],`carousel-item-${slideDirection}`);
            removeClass(slides[activeItem],`carousel-item-${slideDirection}`);

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
          isSliding = false;
          if ( self.options.interval && !hasClass(element,'paused') ) {
            self.cycle();
          }
          dispatchCustomEvent.call(element, slidCustomEvent);
        }, 100 );
      }
    }

    self.getActiveIndex = () => slides.indexOf(getElementsByClassName(element,'carousel-item active')[0]) || 0

    self.destroy = () => {
      toggleEvents(off);
      clearInterval(timer);
      delete element.Carousel;
    }

    // init
    if ( !element.Carousel ) { // prevent adding event handlers twice
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

};

// CAROUSEL DATA API
// =================
supports.push( [ 'Carousel', Carousel, '[data-ride="carousel"]' ] );

