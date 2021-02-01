
/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import isElementInScrollRange from 'shorter-js/src/misc/isElementInScrollRange.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'

import activeClass from '../strings/activeClass.js'
import addEventListener from '../strings/addEventListener.js'
import removeEventListener from '../strings/removeEventListener.js'

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import normalizeOptions from '../util/normalizeOptions.js'


// CAROUSEL PRIVATE GC
// ===================
const carouselString = 'carousel',
    carouselComponent = 'Carousel',
    carouselSelector = `[data-bs-ride="${carouselString}"]`


// CAROUSEL SCOPE
// ==============
export default function Carousel( carouselElement, carouselOptions ){
  
  // CAROUSEL PRIVATE GC
  // ===================
  const carouselControl = `${carouselString}-control`,
      carouselItem = `${carouselString}-item`,
      dataBsSlideTo = 'data-bs-slide-to',
      pausedClass = 'paused',
      defaultCarouselOptions = {
        pause: 'hover', // 'boolean|string'
        keyboard: false, // 'boolean'
        touch: true, // 'boolean'
        interval: 5000 // 'boolean|number'
      },

      // CAROUSEL CUSTOM EVENTS
      // ======================
      carouselSlideEvent = bootstrapCustomEvent(  `slide.bs.${carouselString}` ),
      carouselSlidEvent = bootstrapCustomEvent( `slid.bs.${carouselString}` )

  let element,
      self, 
      ops = {},
      slides,
      indicator,
      indicators,
      controls,
      direction = 'left',
      index = 0,
      timer = null,
      isAnimating = false,
      isTouch = false,
      startX = 0,
      currentX = 0,
      endX = 0


  // CAROUSEL EVENT HANDLERS
  // =======================
  function carouselTransitionEndHandler(){
    const next = index,
        // timeout = e.target !== slides[next] ? e.elapsedTime*1000+50 : 20,
        // timeout = getElementTransitionDuration(slides[next]) ||  20,
        activeItem = self.getActiveIndex(),
        orientation = direction === 'left' ? 'next' : 'prev',
        directionClass = direction === 'left' ? 'start' : 'end'

    if ( isAnimating && element[carouselComponent] ){
      isAnimating = false

      addClass( slides[next], activeClass )
      removeClass( slides[activeItem], activeClass )

      removeClass( slides[next], `${carouselItem}-${orientation}` )
      removeClass( slides[next], `${carouselItem}-${directionClass}` )
      removeClass( slides[activeItem], `${carouselItem}-${directionClass}` )

      element.dispatchEvent( carouselSlidEvent )

      // check for element, might have been disposed
      if ( !document.hidden && ops.interval 
        && !hasClass( element, pausedClass ) ) 
      {
        self.cycle()
      }
    }
  }

  function carouselPauseHandler() {
    if ( !hasClass( element, pausedClass ) ) {
      addClass( element, pausedClass )
      !isAnimating && ( clearInterval( timer ), timer = null )
    }
  }

  function carouselResumeHandler() {
    if ( hasClass( element, pausedClass ) ) {

      removeClass( element, pausedClass )

      if ( !isAnimating ) {
        clearInterval( timer )
        timer = null 
        self.cycle()
      } 
    }
  }

  function carouselIndicatorHandler(e) {
    e.preventDefault()

    const eventTarget = e.target // event target | the current active item

    if ( isAnimating ) return

    if ( eventTarget && !hasClass( eventTarget, activeClass ) // event target is not active
      && eventTarget.getAttribute( dataBsSlideTo ) ) // AND has the specific attribute
    {
      self.to( +eventTarget.getAttribute( dataBsSlideTo ) ) // do the slide
    }
  }

  function carouselControlsHandler(e) {
    e.preventDefault()

    const eventTarget = e.currentTarget || e.srcElement

    if ( controls[1] && eventTarget === controls[1] ) {
      self.next()
    } else if ( controls[1] && eventTarget === controls[0] ) {
      self.prev()
    }
  }

  function carouselKeyHandler({ which }) {

    if ( !isElementInScrollRange( element ) ) return

    switch ( which ) {
      case 39:
        self.next()
        break
      case 37:
        self.prev()
        break
      default: return
    }
  }


  // CAROUSEL TOUCH HANDLERS
  // =======================
  function carouselTouchDownHandler(e) {
    if ( isTouch ) { return } 

    startX = e.changedTouches[0].pageX

    if ( element.contains(e.target) ) {
      isTouch = true
      toggleCarouselTouchHandlers( 1 )
    }
  }

  function carouselTouchMoveHandler(e) {
    
    if ( !isTouch ) return

    currentX = e.changedTouches[0].pageX
    
    // cancel touch if more than one changedTouches detected
    if ( e.type === 'touchmove' && e.changedTouches.length > 1 ) {
      e.preventDefault()
      return false
    }
  }

  function carouselTouchEndHandler (e) {

    if ( !isTouch || isAnimating ) return
    
    endX = currentX || e.changedTouches[0].pageX

    if ( isTouch ) {

      if ( ( !element.contains( e.target ) || !element.contains( e.relatedTarget ) ) // the event target is outside the carousel OR carousel doens't include the related target
          && Math.abs( startX - endX) < 75 ) // AND swipe distance is less than 75px
      { // when the above conditions are satisfied, no need to continue
        return false
      } else { // OR determine next index to slide to
        if ( currentX < startX ) {
          index++
        } else if ( currentX > startX ) {
          index--
        }

        isTouch = false
        self.to( index ) // do the slide
      }

      toggleCarouselTouchHandlers() // remove touch events handlers
    }
  }


  // CAROUSEL PRIVATE METHODS
  // ========================
  function activateCarouselIndicator( pageIndex ) { // indicators    
    Array.from( indicators ).map( x => removeClass( x, activeClass ) )
    indicators[pageIndex] && addClass( indicators[pageIndex], activeClass )
  }

  function toggleCarouselTouchHandlers( action ) {
    action = action ? addEventListener : removeEventListener
    element[action]( 'touchmove', carouselTouchMoveHandler, passiveHandler )
    element[action]( 'touchend', carouselTouchEndHandler, passiveHandler )
  }

  function toggleCarouselHandlers( action ) {
    action = action ? addEventListener : removeEventListener

    if ( ops.pause && ops.interval ) {
      element[action]( mouseHoverEvents[0], carouselPauseHandler )
      element[action]( mouseHoverEvents[1], carouselResumeHandler )
      element[action]( 'touchstart', carouselPauseHandler, passiveHandler )
      element[action]( 'touchend', carouselResumeHandler, passiveHandler )
    }

    ops.touch && slides.length > 1 
      && element[action]( 'touchstart', carouselTouchDownHandler, passiveHandler )

    controls.map( arrow => arrow 
      && arrow[action]( 'click', carouselControlsHandler ) )

    indicator && indicator[action]( 'click', carouselIndicatorHandler )
    ops.keyboard && window[action]( 'keydown', carouselKeyHandler )
  }


  // CAROUSEL DEFINITION
  // ===================
  class Carousel {
    constructor ( target, options ){

      // bind
      self = this

      // set options
      options = options || {}

      // initialization element
      element = queryElement( target )

      // carousel elements
      slides = element.getElementsByClassName( carouselItem )

      // reset previous instance
      element[carouselComponent] && element[carouselComponent].dispose()

      // invalidate when not enough items
      // no need to go further
      if ( slides.length < 2 ) { return }

      controls = [
        element.getElementsByClassName( `${carouselControl}-prev` )[0],
        element.getElementsByClassName( `${carouselControl}-next` )[0]
      ]

      indicator = element.getElementsByClassName( 'carousel-indicators' )[0]
      indicators = indicator && indicator.getElementsByTagName( 'LI' ) || []

      // set JavaScript and DATA API options
      ops = normalizeOptions( element, defaultCarouselOptions, options )
      // don't use 0 as interval
      ops.interval = ops.interval === true
                   ? defaultCarouselOptions.interval : ops.interval

      // set first slide active if none
      if ( this.getActiveIndex() < 0 ) {
        slides.length && addClass( slides[0], activeClass )
        indicators.length && activateCarouselIndicator( 0 )
      }

      // attach event handlers
      toggleCarouselHandlers( 1 )

      // start to cycle if interval is set
      ops.interval && this.cycle()

      // associate init object to target
      element[carouselComponent] = this
    }
  }


  // CAROUSEL PUBLIC METHODS
  // =======================
  const CarouselProto = Carousel.prototype

  CarouselProto.cycle = function() {
    if ( timer ) {
      clearInterval( timer )
      timer = null
    }

    timer = setInterval( () => {
      isElementInScrollRange( element ) && ( index++, self.to( index ) )
    }, ops.interval )
  }

  CarouselProto.next = function() {
    !isAnimating && index++, self.to( index )
  }

  CarouselProto.prev = function() {
    !isAnimating && index--, self.to( index )
  }

  CarouselProto.to = function( next ) {
    const activeItem = self.getActiveIndex()

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    if ( isAnimating || activeItem === next ) return

    // // or determine slide direction
    if ( ( activeItem < next ) || ( activeItem === 0 && next === slides.length -1 ) ) {
      direction = 'left' // next
    } else if ( ( activeItem > next ) || ( activeItem === slides.length - 1 && next === 0 ) ) {
      direction = 'right' // prev
    }

    // find the right next index 
    if ( next < 0 ) { next = slides.length - 1 } 
    else if ( next >= slides.length ){ next = 0 }

    // orientation, class name, eventProperties
    const orientation = direction === 'left' ? 'next' : 'prev',
        directionClass = direction === 'left' ? 'start' : 'end',
        eventProperties = { relatedTarget: slides[next], direction: direction, from: activeItem, to: next }

    // update event properties
    Object.keys( eventProperties ).map( k => {
      carouselSlideEvent[k] = eventProperties[k]
      carouselSlidEvent[k] = eventProperties[k]
    })

    // discontinue when prevented
    element.dispatchEvent( carouselSlideEvent )
    if ( carouselSlideEvent.defaultPrevented ) return 

    // update index
    index = next

    isAnimating = true
    clearInterval( timer )
    timer = null
    activateCarouselIndicator( next )

    if ( getElementTransitionDuration( slides[next] ) && hasClass( element, 'slide' ) ) {

      addClass( slides[next], `${carouselItem}-${orientation}` )
      slides[next].offsetWidth
      addClass( slides[next], `${carouselItem}-${directionClass}` )
      addClass( slides[activeItem], `${carouselItem}-${directionClass}` )

      emulateTransitionEnd( slides[next], carouselTransitionEndHandler )

    } else {

      addClass( slides[next], activeClass )
      removeClass( slides[activeItem], activeClass )

      setTimeout( () => {
        isAnimating = false

        // check for element, might have been disposed
        if ( ops.interval && element && !hasClass( element, pausedClass ) ) {
          self.cycle()
        }

        element.dispatchEvent( carouselSlidEvent )
      }, 100 )
    }
  }

  CarouselProto.getActiveIndex = function() {
    return Array.from( slides )
      .indexOf( element.getElementsByClassName( `${carouselItem} ${activeClass}` )[0] ) || 0
  }

  CarouselProto.dispose = function() {
    const itemClasses = ['start','end','prev','next']

    Array.from( slides ).map( ( slide, idx ) => {
      hasClass( slide, activeClass ) && activateCarouselIndicator( idx )
      itemClasses.map( c => removeClass( slide, `${carouselItem}-${c}` ) )
    })

    toggleCarouselHandlers()
    clearInterval( timer )

    delete element[carouselComponent]
  }

  return new Carousel( carouselElement, carouselOptions )
}


export const carouselInit = {
  component: carouselComponent,
  selector: carouselSelector,
  constructor: Carousel
}

