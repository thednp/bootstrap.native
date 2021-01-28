
/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js'
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js'
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js'
import isElementInScrollRange from 'shorter-js/src/misc/isElementInScrollRange.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'

import privateProperties from '../util/privateProperties.js'
import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v5.js'
import getUID from '../util/getUID.js'


// CAROUSEL PRIVATE GC
// ===================
const carouselString = 'carousel',
      carouselComponent = 'Carousel',
      carouselSelector = '[data-bs-ride="carousel"]',
      carouselIDKey = `${carouselString}UID`


// CAROUSEL CUSTOM EVENTS
// ======================
const carouselSlideEvent = bootstrapCustomEvent(  `slide.bs.${carouselString}` ),
      carouselSlidEvent = bootstrapCustomEvent( `slide.bs.${carouselString}` )


// CAROUSEL EVENT HANDLERS
// =======================
function carouselTransitionEndHandler( e ){
  const element = e.target.closest('.carousel'), // e.target is slides[next]
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ],
        slides = vars.slides

  if ( Object.keys(vars).length ) {
    const next = vars.index,
          timeout = e.target !== slides[next] ? e.elapsedTime*1000+50 : 20,
          activeItem = self.getActiveIndex(),
          orientation = vars.direction === 'left' ? 'next' : 'prev',
          directionClass = vars.direction === 'left' ? 'start' : 'end'

    vars.isSliding && setTimeout( () => {
      if ( Object.keys(vars).length ){
        vars.isSliding = false
  
        slides[next].classList.add( 'active' )
        slides[activeItem].classList.remove( 'active' )
  
        slides[next].classList.remove( `carousel-item-${orientation}` )
        slides[next].classList.remove( `carousel-item-${directionClass}` )
        slides[activeItem].classList.remove( `carousel-item-${directionClass}` )
  
        element.dispatchEvent( carouselSlidEvent )

        // check for element, might have been disposed
        if ( !document.hidden && vars.options.interval 
          && !element.classList.contains( 'paused' ) ) 
        {
          self.cycle()
        }
      }
    }, timeout )
  }
}

function carouselPauseHandler( e ) {
  const element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]

  if ( vars.options.interval !== false 
    && !element.classList.contains( 'paused' ) ) 
  {
    element.classList.add( 'paused' )
    !vars.isSliding && ( clearInterval( vars.timer ), vars.timer = null )
  }
}

function carouselResumeHandler( e ) {
  const element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]

  if ( vars.options.interval !== false
    && element.classList.contains( 'paused' ) ) 
  {
    element.classList.remove( 'paused' )
    !vars.isSliding && ( clearInterval( vars.timer ), vars.timer = null )
    !vars.isSliding && self.cycle()
  }
}

function carouselIndicatorHandler(e) {
  e.preventDefault()

  const eventTarget = e.target, // event target | the current active item
        element = eventTarget.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]

  if ( vars.isSliding ) return

  if ( eventTarget && !eventTarget.classList.contains( 'active' ) // event target is not active
    && eventTarget.getAttribute( 'data-bs-slide-to' ) ) // AND has the specific attribute
  {
    vars.index = parseInt( eventTarget.getAttribute( 'data-bs-slide-to' ) )
  } else { 
    return false 
  }

  self.slideTo( vars.index ) // do the slide
}

function carouselControlsHandler(e) {
  e.preventDefault()

  const eventTarget = e.currentTarget || e.srcElement,
        self = eventTarget.closest('.carousel')[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ],        
        controls = vars.controls

  if ( vars.isSliding ) return

  if ( controls[1] && eventTarget === controls[1] ) {
    vars.index++
  } else if ( controls[1] && eventTarget === controls[0] ) {
    vars.index--
  }

  self.slideTo( vars.index ) // do the slide
}

function carouselKeyHandler( e ) {
  const element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]

  if ( vars.isSliding || !isElementInScrollRange( element ) ) return

  switch ( e.which ) {
    case 39:
      vars.index++
      break
    case 37:
      vars.index--
      break
    default: return
  }

  self.slideTo( vars.index ) // do the slide
}


// CAROUSEL TOUCH HANDLERS
// =======================
function carouselTouchDownHandler(e) {
  const element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]
  
  if ( vars.isTouch ) { return } 

  vars.startX = e.changedTouches[0].pageX

  if ( element.contains(e.target) ) {
    vars.isTouch = true
    toggleCarouselTouchEvents( self, 1 )
  }
}

function carouselTouchMoveHandler(e) {
  const element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]     
  
  if ( !vars.isTouch ) return

  vars.currentX = e.changedTouches[0].pageX
  
  // cancel touch if more than one changedTouches detected
  if ( e.type === 'touchmove' && e.changedTouches.length > 1 ) {
    e.preventDefault()
    return false
  }
}

function carouselTouchEndHandler (e) {
  const element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ]

  if ( !vars.isTouch || vars.isSliding ) return
  
  vars.endX = vars.currentX || e.changedTouches[0].pageX

  if ( vars.isTouch ) {

    if ( ( !element.contains( e.target ) || !element.contains( e.relatedTarget ) ) // the event target is outside the carousel OR carousel doens't include the related target
        && Math.abs( vars.startX - vars.endX) < 75 ) // AND swipe distance is less than 75px
    { // when the above conditions are satisfied, no need to continue
      return false
    } else { // OR determine next index to slide to
      if ( vars.currentX < vars.startX ) {
        vars.index++
      } else if ( vars.currentX > vars.startX ) {
        vars.index--
      }

      vars.isTouch = false
      self.slideTo( vars.index ) // do the slide
    }

    toggleCarouselTouchEvents(self) // remove touch events handlers
  }
}


// CAROUSEL PRIVATE METHODS
// ========================
function setCarouselActivePage( self, pageIndex ) { // indicators
  const { indicators } = privateProperties[ self[carouselIDKey] ]
  
  Array.from( indicators ).map( x => x.classList.remove( 'active' ) )
  indicators[pageIndex] && indicators[pageIndex].classList.add( 'active' )
}

function toggleCarouselTouchEvents( self, action ) {
  action = action ? 'addEventListener' : 'removeEventListener'
  const { element } = privateProperties[ self[carouselIDKey] ]

  element[action]( 'touchmove', carouselTouchMoveHandler, passiveHandler )
  element[action]( 'touchend', carouselTouchEndHandler, passiveHandler )
}

function toggleCarouselEvents( self, action ) {
  action = action ? 'addEventListener' : 'removeEventListener'
  const { element, options, slides, controls, indicator  } = privateProperties[ self[carouselIDKey] ]

  if ( options.pause && options.interval ) {
    element[action]( mouseHoverEvents[0], carouselPauseHandler )
    element[action]( mouseHoverEvents[1], carouselResumeHandler )
    element[action]( 'touchstart', carouselPauseHandler, passiveHandler )
    element[action]( 'touchend', carouselResumeHandler, passiveHandler )
  }

  options.touch && slides.length > 1 && element[action]( 'touchstart', carouselTouchDownHandler, passiveHandler )
  controls.map( arrow => arrow && arrow[action]( 'click', carouselControlsHandler ) )

  indicator && indicator[action]( 'click', carouselIndicatorHandler )
  options.keyboard && window[action]( 'keydown', carouselKeyHandler )
}


// CAROUSEL DEFINITION
// ===================
export default class Carousel {
  constructor ( element, options ){

    // set options
    options = options || {}

    // initialization element
    element = queryElement( element )

    // reset on re-init
    element[carouselComponent] && element[carouselComponent].dispose()

    // carousel elements
    const slides = element.getElementsByClassName( 'carousel-item' ),
          leftArrow = element.getElementsByClassName( 'carousel-control-prev' )[0],
          rightArrow = element.getElementsByClassName( 'carousel-control-next' )[0],
          controls = [leftArrow,rightArrow],
          indicator = element.getElementsByClassName( 'carousel-indicators' )[0],
          indicators = indicator && indicator.getElementsByTagName( 'LI' ) || []

    // invalidate when not enough items
    if ( slides.length < 2 ) { return }

    // set options
    const 
      // DATA API
      intervalAttribute = element.getAttribute( 'data-bs-interval' ),
      intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
      touchData = element.getAttribute( 'data-bs-touch' ) === 'false' ? 0 : 1,
      pauseData = element.getAttribute( 'data-bs-pause' ) === 'hover' || false,
      keyboardData = element.getAttribute( 'data-bs-keyboard' ) === 'true' || false,
      
      // JS options
      intervalOption = options.interval,
      touchOption = options.touch

    // set instance options
    const ops = {}
    ops.keyboard = options.keyboard === true || keyboardData
    ops.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false // false / hover
    ops.touch = touchOption || touchData
    
    ops.interval = typeof intervalOption === 'number' ? intervalOption
                : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
                : intervalData


    // set private properties unique ID key
    const elementID = getUID( element, carouselIDKey )

    // set instance unique ID
    this[carouselIDKey] = elementID

    // register private internals
    privateProperties[elementID] = {
      element: element,
      options: ops,
      slides: slides,
      indicator: indicator,
      indicators: indicators,
      controls: controls,
      direction: 'left',
      index: 0,
      timer: null,
      isSliding: false,
      isTouch: false,
      // touchPosition
      startX : 0,
      currentX : 0,
      endX : 0
    }

    // set first slide active if none
    if ( this.getActiveIndex() < 0 ) {
      slides.length && slides[0].classList.add( 'active' )
      indicators.length && setCarouselActivePage( this, 0 )
    }

    // attach event handlers
    toggleCarouselEvents( this, 1 )

    // start to cycle if interval is set
    ops.interval && this.cycle()

    // associate init object to target
    element[carouselComponent] = this
  }

  // CAROUSEL PUBLIC METHODS
  // =======================
  cycle() {
    const self = this,
          vars = privateProperties[ self[carouselIDKey] ]

    if ( vars.timer ) {
      clearInterval( vars.timer )
      vars.timer = null
    }

    vars.timer = setInterval( () => {
      let idx = vars.index || self.getActiveIndex()
      isElementInScrollRange( vars.element ) && ( idx++, self.slideTo( idx ) )
    }, vars.options.interval )
  }

  slideTo( next ) {
    const self = this,
          activeItem = self.getActiveIndex(),
          vars = privateProperties[ self[carouselIDKey] ],
          { element, options, slides } = vars

    if ( vars.isSliding ) return // when controled via methods, make sure to check again

    // first return if we're on the same item #227
    if ( activeItem === next ) {
      return
    // or determine slide direction
    } else if ( ( activeItem < next ) || ( activeItem === 0 && next === slides.length -1 ) ) {
      vars.direction = 'left' // next
    } else if ( ( activeItem > next ) || ( activeItem === slides.length - 1 && next === 0 ) ) {
      vars.direction = 'right' // prev
    }

    // find the right next index 
    if ( next < 0 ) { next = slides.length - 1 } 
    else if ( next >= slides.length ){ next = 0 }

    // orientation, class name, eventProperties
    const orientation = vars.direction === 'left' ? 'next' : 'prev', // determine type
          directionClass = vars.direction === 'left' ? 'start' : 'end',
          eventProperties = { relatedTarget: slides[next], direction: vars.direction, from: activeItem, to: next }

    // update event properties
    Object.keys( eventProperties ).map( k => {
      carouselSlideEvent[k] = eventProperties[k]
      carouselSlidEvent[k] = eventProperties[k]
    })

    element.dispatchEvent( carouselSlideEvent )
    if ( carouselSlideEvent.defaultPrevented ) return // discontinue when prevented

    // update index
    vars.index = next

    vars.isSliding = true
    clearInterval(vars.timer)
    vars.timer = null
    setCarouselActivePage( this, next )

    if ( getElementTransitionDuration( slides[next] ) && element.classList.contains( 'slide' ) ) {
      slides[next].classList.add( `carousel-item-${orientation}` )
      slides[next].offsetWidth
      slides[next].classList.add( `carousel-item-${directionClass}` )
      slides[activeItem].classList.add( `carousel-item-${directionClass}` )

      emulateTransitionEnd( slides[next], carouselTransitionEndHandler )
    } else {
      slides[next].classList.add( 'active' )
      slides[activeItem].classList.remove( 'active' )

      setTimeout( () => {
        vars.isSliding = false
        // check for element, might have been disposed
        if ( options.interval && element && !element.classList.contains( 'paused' ) ) {
          self.cycle()
        }

        element.dispatchEvent( carouselSlidEvent )
      }, 100 )
    }
  }

  getActiveIndex() {
    const { element, slides } = privateProperties[ this[carouselIDKey] ]

    return Array.from( slides )
      .indexOf( element.getElementsByClassName( 'carousel-item active' )[0] ) || 0
  }

  dispose() {
    const itemClasses = [ 'start', 'end', 'prev', 'next' ],
          self = this,
          uid = this[carouselIDKey],
          vars = privateProperties[uid],
          {element,slides} = vars

    Array.from( slides ).map( ( slide,idx ) => {
      slide.classList.contains( 'active' ) && setCarouselActivePage( self, idx )
      itemClasses.map( cls => slide.classList.remove( `carousel-item-${cls}` ) )
    })
    clearInterval( vars.timer )

    toggleCarouselEvents( this )
    delete element.Carousel
    delete element[carouselIDKey]
    delete this[carouselIDKey]
    delete privateProperties[uid]
  }
}

export const carouselInit = {
  component: carouselComponent,
  selector: carouselSelector,
  constructor: Carousel
}

