/*!
  * Native JavaScript for Bootstrap v3.0.15 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  var computedStyle = getComputedStyle(element),
      property = computedStyle[transitionProperty],
      duration = supportTransition && property && property !== 'none' 
               ? parseFloat(computedStyle[transitionDuration]) : 0;

  return !isNaN(duration) ? duration * 1000 : 0;
}

// emulateTransitionEnd
function emulateTransitionEnd(element,handler){ 
  var called = 0, duration = getElementTransitionDuration(element);
  duration ? element.addEventListener( transitionEndEvent, function transitionEndWrapper(e){ 
              !called && handler(e), called = 1; 
              element.removeEventListener( transitionEndEvent, transitionEndWrapper);
            })
           : setTimeout(function() { !called && handler(), called = 1; }, 17);
}

function queryElement(selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function bootstrapCustomEvent( namespacedEventType, eventProperties ) {
  var OriginalCustomEvent = new CustomEvent( namespacedEventType, { cancelable: true } );

  if ( eventProperties instanceof Object ) {
    Object.keys( eventProperties ).forEach( function (key) {
      Object.defineProperty( OriginalCustomEvent, key, {
        value: eventProperties[key]
      });
    });
  }
  return OriginalCustomEvent
}

var privateProperties = {};

var bsnUID = 1;

function getUID( element, key ){
  return element[key] || (bsnUID++)
}

// ALERT PRIVATE GC
// ================
var alertString = 'alert',
      alertComponent = 'Alert',
      alertSelector = '[data-bs-dismiss="alert"]',
      alertIDKey = alertString + "UID";


// ALERT CUSTOM EVENTS
// ===================
var closeAlertEvent = bootstrapCustomEvent( ("close.bs." + alertString) ), // 'type.bs.component'
      closedAlertEvent = bootstrapCustomEvent( ("closed.bs." + alertString) );


// ALERT EVENT HANDLERS
// ====================
function alertTransitionEndHandler( alert ) {
  var element = queryElement( alertSelector, alert );

  element.removeEventListener( 'click', alertClickHandler );
  alert.dispatchEvent( closedAlertEvent );

  alert.parentNode.removeChild( alert );
}

function alertClickHandler(e) {
  var eventTarget = e.target,
        element = this,
        alert = eventTarget && eventTarget.closest( '.alert' ); // go around and check

  alert && ( element === eventTarget || element.contains( eventTarget ) )
    && element[alertComponent].close();
}


// ALERT DEFINITION
// ================
var Alert = function Alert( element ){

  // initialization element
  element = queryElement( element );
    
  // reset on re-init
  element[alertComponent] && element[alertComponent].dispose();

  // set private properties unique ID key
  var elementID = getUID( element, alertIDKey );

  this[alertIDKey] = elementID;
  privateProperties[elementID] = {
    element: element,
    alert: element.closest( '.alert' )
  };

  // add event listener
  element.addEventListener( 'click', alertClickHandler );

  // store init object within target element 
  element[alertComponent] = this;
};

// ALERT PUBLIC METHODS
// ====================
Alert.prototype.close = function close (){
  var ref = privateProperties[ this[alertIDKey] ];
    var alert = ref.alert;

  if ( alert && alert.classList.contains( 'show' ) ) {
    alert.dispatchEvent( closeAlertEvent );
    if ( closeAlertEvent.defaultPrevented ) { return }

    alert.classList.remove( 'show' );

    alert.classList.contains( 'fade' )
      ? emulateTransitionEnd( alert, function endWrap() { alertTransitionEndHandler( alert ); } ) 
      : alertTransitionEndHandler( alert );

    this.dispose();
  }
};

Alert.prototype.dispose = function dispose () {
  var uid = this[alertIDKey];
    var ref = privateProperties[ uid ];
    var element = ref.element;

  element.removeEventListener( 'click', alertClickHandler );

  delete element[alertComponent];
  delete element[alertIDKey];
  delete this[alertIDKey];
  delete privateProperties[uid];
};

var alertInit = {
  component: alertComponent,
  selector: alertSelector,
  constructor: Alert
};

// BUTTON PRIVATE GC
// =================
var buttonString = 'button',
      buttonComponent = 'Button',
      buttonSelector = '[data-bs-toggle="buttons"]',
      buttonIDKey = buttonString + "UID";


// BUTTON CUSTOM EVENT
// ===================
var changeButtonEvent = bootstrapCustomEvent( ("change.bs." + buttonString) );


// BUTTON PRIVATE METHODS
function toggleButtonEvents( self, action) {
  action = action ? 'addEventListener' : 'removeEventListener';

  var ref = privateProperties[ self[buttonIDKey] ];
  var element = ref.element;

  element[action]( 'click', toggleButtonHandler );
  element[action]( 'keyup', buttonKeyHandler );
  element[action]( 'keydown', buttonPreventScroll );
  element[action]( 'focusin', buttonFocusHandler );
  element[action]( 'focusout', buttonFocusHandler );
}


// BUTTON EVENT HANDLERS
// =====================
function toggleButtonHandler(e) {
  var eventTarget = e.target,
        element = eventTarget.closest( buttonSelector ),
        vars = privateProperties[ element[buttonIDKey] ],
        buttons = vars.buttons,
        label = eventTarget.tagName === 'LABEL' ? eventTarget // the .btn label 
              : eventTarget.closest( 'LABEL' ),
        input = label && label.getElementsByTagName( 'INPUT' )[0];

  // invalidate if no input
  if ( !input ) { return }

  element.dispatchEvent( changeButtonEvent ); // trigger the change for the btn-group
  if ( changeButtonEvent.defaultPrevented ) { return } // discontinue when defaultPrevented is true

  // manage the dom manipulation
  if ( input.type === 'checkbox' ) { //checkboxes

    if ( !input.checked ) {
      label.classList.add( 'active' );
      input.getAttribute( 'checked' );
      input.setAttribute( 'checked', 'checked' );
      input.checked = true;
    } else {
      label.classList.remove( 'active' );
      input.getAttribute( 'checked' );
      input.removeAttribute( 'checked' );
      input.checked = false;
    }

    if ( !element.toggled ) { // prevent triggering the event twice
      element.toggled = true;
    }
  }

  if ( input.type === 'radio' && !element.toggled ) { // radio buttons
    // if ( changeButtonEvent.defaultPrevented ) return
    // don't trigger if already active (the OR condition is a hack to check 
    // if the buttons were selected with key press and NOT mouse click)
    if ( !input.checked || (e.screenX === 0 && e.screenY == 0) ) {
      label.classList.add( 'active' );
      label.classList.add( 'focus' );
      input.setAttribute( 'checked', 'checked' );
      input.checked = true;
      element.toggled = true;

      buttons.map( function (otherLabel) {
        var otherInput = otherLabel.getElementsByTagName( 'INPUT' )[0];

        if ( otherLabel !== label && otherLabel.classList.contains( 'active' ) )  {
          otherInput.dispatchEvent( changeButtonEvent ); // trigger the change
          otherLabel.classList.remove( 'active' );
          otherInput.removeAttribute( 'checked' );
          otherInput.checked = false;
        }
      });
    }
  }
  setTimeout( function () { element.toggled = false; }, 10 );
}

function buttonKeyHandler(e) {
  e.which === 32 && e.target === document.activeElement && toggleButtonHandler(e);
}

function buttonPreventScroll(e) { 
  e.which === 32 && e.preventDefault();
}

function buttonFocusHandler(e) {
  var eventTarget = e.target, 
        action = e.type === 'focusin' ? 'add' : 'remove';

  eventTarget.tagName === 'INPUT' &&
    eventTarget.closest( '.btn' ).classList[action]( 'focus' );
}


// BUTTON DEFINITION
// =================
var Button = function Button( element ){

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element[buttonComponent] && element[buttonComponent].dispose();

  // store all possible targets
  var buttons = Array.from( element.getElementsByClassName( 'btn' ) );
    
  // invalidate
  if (!buttons.length) { return }

  // set private properties unique ID key
  var elementID = getUID( element, buttonIDKey );
    
  // associate target with init object
  this[buttonIDKey] = elementID;
  element[buttonIDKey] = elementID;
  privateProperties[elementID] = {
    element: element,
    buttons: buttons
  };
    
  // add event listeners
  toggleButtonEvents( this, 1 );
  element[buttonComponent] = this;
    
  // set initial toggled state
  // toggled makes sure to prevent triggering twice the change.bs.button events
  element.toggled = false;

  // activate items on init
  buttons.map( function (btn) {
    !btn.classList.contains( 'active' ) 
      && queryElement( 'input:checked', btn )
      && btn.classList.add( 'active' );
    btn.classList.contains( 'active' )
      && !queryElement( 'input:checked', btn )
      && btn.classList.remove( 'active' );
  });
};

// BUTTON PUBLIC METHOD
Button.prototype.dispose = function dispose () {
  toggleButtonEvents( this );

  var uid = this[buttonIDKey];
    var ref = privateProperties[uid];
    var element = ref.element;

  delete element[buttonComponent];
  delete element[buttonIDKey];
  delete this[buttonIDKey];
  delete privateProperties[uid];
};

var buttonInit = {
  component: buttonComponent,
  selector: buttonSelector,
  constructor: Button
};

var mouseHoverEvents = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

// determine support for passive events
var supportPassive = (function () {
  // Test via a getter in the options object to see if the passive property is accessed
  var result = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        result = true;
      }
    });
    document.addEventListener('DOMContentLoaded', function wrap(){
      document.removeEventListener('DOMContentLoaded', wrap, opts);
    }, opts);
  } catch (e) {}

  return result;
})();

// general event options

var passiveHandler = supportPassive ? { passive: true } : false;

function isElementInScrollRange(element) {
  var bcr = element.getBoundingClientRect(), 
      viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
}

// CAROUSEL PRIVATE GC
// ===================
var carouselString = 'carousel',
      carouselComponent = 'Carousel',
      carouselSelector = '[data-bs-ride="carousel"]',
      carouselIDKey = carouselString + "UID";


// CAROUSEL CUSTOM EVENTS
// ======================
var carouselSlideEvent = bootstrapCustomEvent(  ("slide.bs." + carouselString) ),
      carouselSlidEvent = bootstrapCustomEvent( ("slide.bs." + carouselString) );


// CAROUSEL EVENT HANDLERS
// =======================
function carouselTransitionEndHandler( e ){
  var element = e.target.closest('.carousel'), // e.target is slides[next]
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ],
        slides = vars.slides;

  if ( Object.keys(vars).length ) {
    var next = vars.index,
          timeout = e.target !== slides[next] ? e.elapsedTime*1000+50 : 20,
          activeItem = self.getActiveIndex(),
          orientation = vars.direction === 'left' ? 'next' : 'prev',
          directionClass = vars.direction === 'left' ? 'start' : 'end';

    vars.isSliding && setTimeout( function () {
      if ( Object.keys(vars).length ){
        vars.isSliding = false;
  
        slides[next].classList.add( 'active' );
        slides[activeItem].classList.remove( 'active' );
  
        slides[next].classList.remove( ("carousel-item-" + orientation) );
        slides[next].classList.remove( ("carousel-item-" + directionClass) );
        slides[activeItem].classList.remove( ("carousel-item-" + directionClass) );
  
        element.dispatchEvent( carouselSlidEvent );

        // check for element, might have been disposed
        if ( !document.hidden && vars.options.interval 
          && !element.classList.contains( 'paused' ) ) 
        {
          self.cycle();
        }
      }
    }, timeout );
  }
}

function carouselPauseHandler( e ) {
  var element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];

  if ( vars.options.interval !== false 
    && !element.classList.contains( 'paused' ) ) 
  {
    element.classList.add( 'paused' );
    !vars.isSliding && ( clearInterval( vars.timer ), vars.timer = null );
  }
}

function carouselResumeHandler( e ) {
  var element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];

  if ( vars.options.interval !== false
    && element.classList.contains( 'paused' ) ) 
  {
    element.classList.remove( 'paused' );
    !vars.isSliding && ( clearInterval( vars.timer ), vars.timer = null );
    !vars.isSliding && self.cycle();
  }
}

function carouselIndicatorHandler(e) {
  e.preventDefault();

  var eventTarget = e.target, // event target | the current active item
        element = eventTarget.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];

  if ( vars.isSliding ) { return }

  if ( eventTarget && !eventTarget.classList.contains( 'active' ) // event target is not active
    && eventTarget.getAttribute( 'data-bs-slide-to' ) ) // AND has the specific attribute
  {
    vars.index = parseInt( eventTarget.getAttribute( 'data-bs-slide-to' ) );
  } else { 
    return false 
  }

  self.slideTo( vars.index ); // do the slide
}

function carouselControlsHandler(e) {
  e.preventDefault();

  var eventTarget = e.currentTarget || e.srcElement,
        self = eventTarget.closest('.carousel')[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ],        
        controls = vars.controls;

  if ( vars.isSliding ) { return }

  if ( controls[1] && eventTarget === controls[1] ) {
    vars.index++;
  } else if ( controls[1] && eventTarget === controls[0] ) {
    vars.index--;
  }

  self.slideTo( vars.index ); // do the slide
}

function carouselKeyHandler( e ) {
  var element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];

  if ( vars.isSliding || !isElementInScrollRange( element ) ) { return }

  switch ( e.which ) {
    case 39:
      vars.index++;
      break
    case 37:
      vars.index--;
      break
    default: return
  }

  self.slideTo( vars.index ); // do the slide
}


// CAROUSEL TOUCH HANDLERS
// =======================
function carouselTouchDownHandler(e) {
  var element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];
  
  if ( vars.isTouch ) { return } 

  vars.startX = e.changedTouches[0].pageX;

  if ( element.contains(e.target) ) {
    vars.isTouch = true;
    toggleCarouselTouchEvents( self, 1 );
  }
}

function carouselTouchMoveHandler(e) {
  var element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];     
  
  if ( !vars.isTouch ) { return }

  vars.currentX = e.changedTouches[0].pageX;
  
  // cancel touch if more than one changedTouches detected
  if ( e.type === 'touchmove' && e.changedTouches.length > 1 ) {
    e.preventDefault();
    return false
  }
}

function carouselTouchEndHandler (e) {
  var element = e.target.closest( '.carousel' ),
        self = element[carouselComponent],
        vars = privateProperties[ self[carouselIDKey] ];

  if ( !vars.isTouch || vars.isSliding ) { return }
  
  vars.endX = vars.currentX || e.changedTouches[0].pageX;

  if ( vars.isTouch ) {

    if ( ( !element.contains( e.target ) || !element.contains( e.relatedTarget ) ) // the event target is outside the carousel OR carousel doens't include the related target
        && Math.abs( vars.startX - vars.endX) < 75 ) // AND swipe distance is less than 75px
    { // when the above conditions are satisfied, no need to continue
      return false
    } else { // OR determine next index to slide to
      if ( vars.currentX < vars.startX ) {
        vars.index++;
      } else if ( vars.currentX > vars.startX ) {
        vars.index--;
      }

      vars.isTouch = false;
      self.slideTo( vars.index ); // do the slide
    }

    toggleCarouselTouchEvents(self); // remove touch events handlers
  }
}


// CAROUSEL PRIVATE METHODS
// ========================
function setCarouselActivePage( self, pageIndex ) { // indicators
  var ref = privateProperties[ self[carouselIDKey] ];
  var indicators = ref.indicators;
  
  Array.from( indicators ).map( function (x) { return x.classList.remove( 'active' ); } );
  indicators[pageIndex] && indicators[pageIndex].classList.add( 'active' );
}

function toggleCarouselTouchEvents( self, action ) {
  action = action ? 'addEventListener' : 'removeEventListener';
  var ref = privateProperties[ self[carouselIDKey] ];
  var element = ref.element;

  element[action]( 'touchmove', carouselTouchMoveHandler, passiveHandler );
  element[action]( 'touchend', carouselTouchEndHandler, passiveHandler );
}

function toggleCarouselEvents( self, action ) {
  action = action ? 'addEventListener' : 'removeEventListener';
  var ref = privateProperties[ self[carouselIDKey] ];
  var element = ref.element;
  var options = ref.options;
  var slides = ref.slides;
  var controls = ref.controls;
  var indicator = ref.indicator;

  if ( options.pause && options.interval ) {
    element[action]( mouseHoverEvents[0], carouselPauseHandler );
    element[action]( mouseHoverEvents[1], carouselResumeHandler );
    element[action]( 'touchstart', carouselPauseHandler, passiveHandler );
    element[action]( 'touchend', carouselResumeHandler, passiveHandler );
  }

  options.touch && slides.length > 1 && element[action]( 'touchstart', carouselTouchDownHandler, passiveHandler );
  controls.map( function (arrow) { return arrow && arrow[action]( 'click', carouselControlsHandler ); } );

  indicator && indicator[action]( 'click', carouselIndicatorHandler );
  options.keyboard && window[action]( 'keydown', carouselKeyHandler );
}


// CAROUSEL DEFINITION
// ===================
var Carousel = function Carousel ( element, options ){

  // set options
  options = options || {};

  // initialization element
  element = queryElement( element );

  // reset on re-init
  element[carouselComponent] && element[carouselComponent].dispose();

  // carousel elements
  var slides = element.getElementsByClassName( 'carousel-item' ),
        leftArrow = element.getElementsByClassName( 'carousel-control-prev' )[0],
        rightArrow = element.getElementsByClassName( 'carousel-control-next' )[0],
        controls = [leftArrow,rightArrow],
        indicator = element.getElementsByClassName( 'carousel-indicators' )[0],
        indicators = indicator && indicator.getElementsByTagName( 'LI' ) || [];

  // invalidate when not enough items
  if ( slides.length < 2 ) { return }

  // set options
  var 
    // DATA API
    intervalAttribute = element.getAttribute( 'data-bs-interval' ),
    intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
    touchData = element.getAttribute( 'data-bs-touch' ) === 'false' ? 0 : 1,
    pauseData = element.getAttribute( 'data-bs-pause' ) === 'hover' || false,
    keyboardData = element.getAttribute( 'data-bs-keyboard' ) === 'true' || false,
      
    // JS options
    intervalOption = options.interval,
    touchOption = options.touch;

  // set instance options
  var ops = {};
  ops.keyboard = options.keyboard === true || keyboardData;
  ops.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
  ops.touch = touchOption || touchData;
    
  ops.interval = typeof intervalOption === 'number' ? intervalOption
              : intervalOption === false || intervalData === 0 || intervalData === false ? 0
              : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
              : intervalData;


  // set private properties unique ID key
  var elementID = getUID( element, carouselIDKey );

  // set instance unique ID
  this[carouselIDKey] = elementID;

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
  };

  // set first slide active if none
  if ( this.getActiveIndex() < 0 ) {
    slides.length && slides[0].classList.add( 'active' );
    indicators.length && setCarouselActivePage( this, 0 );
  }

  // attach event handlers
  toggleCarouselEvents( this, 1 );

  // start to cycle if interval is set
  ops.interval && this.cycle();

  // associate init object to target
  element[carouselComponent] = this;
};

// CAROUSEL PUBLIC METHODS
// =======================
Carousel.prototype.cycle = function cycle () {
  var self = this,
        vars = privateProperties[ self[carouselIDKey] ];

  if ( vars.timer ) {
    clearInterval( vars.timer );
    vars.timer = null;
  }

  vars.timer = setInterval( function () {
    var idx = vars.index || self.getActiveIndex();
    isElementInScrollRange( vars.element ) && ( idx++, self.slideTo( idx ) );
  }, vars.options.interval );
};

Carousel.prototype.slideTo = function slideTo ( next ) {
  var self = this,
        activeItem = self.getActiveIndex(),
        vars = privateProperties[ self[carouselIDKey] ];
    var element = vars.element;
    var options = vars.options;
    var slides = vars.slides;

  if ( vars.isSliding ) { return } // when controled via methods, make sure to check again

  // first return if we're on the same item #227
  if ( activeItem === next ) {
    return
  // or determine slide direction
  } else if ( ( activeItem < next ) || ( activeItem === 0 && next === slides.length -1 ) ) {
    vars.direction = 'left'; // next
  } else if ( ( activeItem > next ) || ( activeItem === slides.length - 1 && next === 0 ) ) {
    vars.direction = 'right'; // prev
  }

  // find the right next index 
  if ( next < 0 ) { next = slides.length - 1; } 
  else if ( next >= slides.length ){ next = 0; }

  // orientation, class name, eventProperties
  var orientation = vars.direction === 'left' ? 'next' : 'prev', // determine type
        directionClass = vars.direction === 'left' ? 'start' : 'end',
        eventProperties = { relatedTarget: slides[next], direction: vars.direction, from: activeItem, to: next };

  // update event properties
  Object.keys( eventProperties ).map( function (k) {
    carouselSlideEvent[k] = eventProperties[k];
    carouselSlidEvent[k] = eventProperties[k];
  });

  element.dispatchEvent( carouselSlideEvent );
  if ( carouselSlideEvent.defaultPrevented ) { return } // discontinue when prevented

  // update index
  vars.index = next;

  vars.isSliding = true;
  clearInterval(vars.timer);
  vars.timer = null;
  setCarouselActivePage( this, next );

  if ( getElementTransitionDuration( slides[next] ) && element.classList.contains( 'slide' ) ) {
    slides[next].classList.add( ("carousel-item-" + orientation) );
    slides[next].offsetWidth;
    slides[next].classList.add( ("carousel-item-" + directionClass) );
    slides[activeItem].classList.add( ("carousel-item-" + directionClass) );

    emulateTransitionEnd( slides[next], carouselTransitionEndHandler );
  } else {
    slides[next].classList.add( 'active' );
    slides[activeItem].classList.remove( 'active' );

    setTimeout( function () {
      vars.isSliding = false;
      // check for element, might have been disposed
      if ( options.interval && element && !element.classList.contains( 'paused' ) ) {
        self.cycle();
      }

      element.dispatchEvent( carouselSlidEvent );
    }, 100 );
  }
};

Carousel.prototype.getActiveIndex = function getActiveIndex () {
  var ref = privateProperties[ this[carouselIDKey] ];
    var element = ref.element;
    var slides = ref.slides;

  return Array.from( slides )
    .indexOf( element.getElementsByClassName( 'carousel-item active' )[0] ) || 0
};

Carousel.prototype.dispose = function dispose () {
  var itemClasses = [ 'start', 'end', 'prev', 'next' ],
        self = this,
        uid = this[carouselIDKey],
        vars = privateProperties[uid];
    var element = vars.element;
    var slides = vars.slides;

  Array.from( slides ).map( function ( slide,idx ) {
    slide.classList.contains( 'active' ) && setCarouselActivePage( self, idx );
    itemClasses.map( function (cls) { return slide.classList.remove( ("carousel-item-" + cls) ); } );
  });
  clearInterval( vars.timer );

  toggleCarouselEvents( this );
  delete element.Carousel;
  delete element[carouselIDKey];
  delete this[carouselIDKey];
  delete privateProperties[uid];
};

var carouselInit = {
  component: carouselComponent,
  selector: carouselSelector,
  constructor: Carousel
};

function getTargetElement( element ){
  return queryElement( 
    element.getAttribute( 'data-bs-target' ) || element.getAttribute( 'href' ) 
  )
}

// COLLAPSE GC
// ===========
var collapseString = 'collapse',
      collapseComponent = 'Collapse',
      collapseSelector = '[data-bs-toggle="collapse"]',
      collapseIDKey = collapseString + "UID";


// COLLAPSE CUSTOM EVENTS
// ======================
var showCollapseEvent = bootstrapCustomEvent( ("show.bs." + collapseString) ),
      showsCollapseEvent = bootstrapCustomEvent( ("shown.bs." + collapseString) ),
      hideCollapseEvent = bootstrapCustomEvent( ("hide.bs." + collapseString) ),
      hiddenCollapseEvent = bootstrapCustomEvent( ("hidden.bs." + collapseString) );


// COLLAPSE PRIVATE METHODS
// ========================
function openAction( vars ) {
  var collapse = vars.collapse;
  var element = vars.element;
  var accordion = vars.accordion;

  collapse.dispatchEvent( showCollapseEvent );
  if ( showCollapseEvent.defaultPrevented ) { return }

  collapse.isAnimating = true;
  accordion && ( accordion.isAnimating = true );

  collapse.classList.add( 'collapsing' );
  collapse.classList.remove( 'collapse' );
  collapse.style.height = (collapse.scrollHeight) + "px";
  
  emulateTransitionEnd( collapse, function () {
    collapse.isAnimating = false;
    accordion && ( accordion.isAnimating = false );

    collapse.setAttribute( 'aria-expanded', 'true' );
    element.setAttribute( 'aria-expanded', 'true' );
    collapse.classList.remove( 'collapsing' );
    collapse.classList.add( 'collapse' );
    collapse.classList.add( 'show' );
    collapse.style.height = '';
    collapse.dispatchEvent( showsCollapseEvent );
  });
}

function closeAction( vars ) {
  var collapse = vars.collapse;
  var element = vars.element;
  var accordion = vars.accordion;
          
  collapse.dispatchEvent( hideCollapseEvent );
  if ( hideCollapseEvent.defaultPrevented ) { return }

  collapse.isAnimating = true;
  accordion && ( accordion.isAnimating = true );

  collapse.style.height = (collapse.scrollHeight) + "px"; // set height first
  collapse.classList.remove( 'collapse' );
  collapse.classList.remove( 'show' );
  collapse.classList.add( 'collapsing' );
  collapse.offsetWidth; // force reflow
  collapse.style.height = '0px';
  
  emulateTransitionEnd( collapse, function () {
    collapse.isAnimating = false;
    accordion && ( accordion.isAnimating = false );

    collapse.setAttribute( 'aria-expanded', 'false' );
    element.setAttribute( 'aria-expanded', 'false' );
    collapse.classList.remove( 'collapsing' );
    collapse.classList.add( 'collapse' );
    collapse.style.height = '';
    collapse.dispatchEvent( hiddenCollapseEvent );
  });
}


// COLLAPSE EVENT HANDLER
// ======================
function collapseClickHandler(e){
  var eventTarget = e.target,
        element = this,
        self = element[collapseComponent];

  self.toggle();
  // event target is anchor link with collapse DATA API #398
  if ( e && eventTarget.tagName === 'A' && eventTarget.getAttribute( 'data-bs-toggle' ) === 'collapse' 
    || element.tagName === 'A' ) // OR our init element is anchor link
  {
    e.preventDefault(); 
  }
}


// COLLAPSE DEFINITION
// ===================
var Collapse = function Collapse( element, options ) {
    
  // set options
  options = options || {};

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element[collapseComponent] && element[collapseComponent].dispose();

  // determine targets
  var collapse =queryElement( options.target ) || getTargetElement( element ),
        accordion = element.closest( options.parent || collapse.getAttribute( 'data-bs-parent' ) );

  collapse && ( collapse.isAnimating = false );
  accordion && ( accordion.isAnimating = false );

  // prevent adding event handlers twice
  element.addEventListener( 'click', collapseClickHandler );

  // set private properties unique ID key
  var elementID = getUID( element, collapseIDKey );

  // after validation set
  this[collapseIDKey] = elementID;
  privateProperties[elementID] = {
    element: element,
    collapse: collapse,
    accordion: accordion
  };

  // associate target to init object
  element.Collapse = this;
};

// COLLAPSE PUBLIC METHODS
// =======================
Collapse.prototype.toggle = function toggle () {
  var ref = privateProperties[ this[collapseIDKey] ];
    var collapse = ref.collapse;

  if ( !collapse.classList.contains( 'show' ) ) { this.show(); } 
  else { this.hide(); }
};

Collapse.prototype.hide = function hide () {
  var vars = privateProperties[ this[collapseIDKey] ];
    var collapse = vars.collapse;
    var element = vars.element;
    
  if ( collapse.isAnimating ) { return }

  closeAction( vars );
  element.classList.add( 'collapsed' );
};
Collapse.prototype.show = function show () {
  var vars = privateProperties[ this[collapseIDKey] ];
    var collapse = vars.collapse;
    var element = vars.element;
    var accordion = vars.accordion;

  var activeElement, activeCollapse;

  if ( accordion ) {
    activeCollapse = accordion.getElementsByClassName( 'collapse show' )[0];
    activeElement = Array.from( accordion.querySelectorAll( collapseSelector ) )
                         .find( function (c) { return !c.classList.contains( 'collapsed' ); } );
  }

  if ( ( !accordion || accordion && !accordion.isAnimating ) && !collapse.isAnimating ) {
    if ( activeElement && activeCollapse !== collapse ) {
      closeAction( { collapse: activeCollapse, element: activeElement, accordion: accordion } );
      activeElement.classList.add( 'collapsed' );
    }
    openAction( vars );
    element.classList.remove( 'collapsed' );
  }
};
Collapse.prototype.dispose = function dispose () {
  var uid = this[collapseIDKey];
    var ref = privateProperties[uid];
    var element = ref.element;
          
  element.removeEventListener( 'click', collapseClickHandler );

  delete element[collapseComponent];
  delete element[collapseIDKey];
  delete this[collapseIDKey];
  delete privateProperties[uid];
};

var collapseInit = {
  component: collapseComponent,
  selector: collapseSelector,
  constructor: Collapse
};

function setFocus (element){
  element.focus ? element.focus() : element.setActive();
}

function isEmptyAnchor( anchor ) {

  // return anchor ? ( anchor.href && anchor.href.slice(-1) === '#' // anchor href starts with #
  //   || anchor.parentNode && anchor.parentNode.href  // OR a child of an anchor with href starts with #
  //   && anchor.parentNode.href.slice(-1) === '#' ) 
  // && e.preventDefault() : false
  return anchor && ( anchor.href && anchor.href.slice(-1) === '#' // anchor href starts with #
    || anchor.parentNode && anchor.parentNode.href  // OR a child of an anchor with href starts with #
    && anchor.parentNode.href.slice(-1) === '#' )
}

// DROPDOWN PRIVATE GC
// ===================
var dropdownString = 'dropdown',
      dropdownComponent = 'Dropdown',
      dropdownSelector = '[data-bs-toggle="dropdown"]',
      dropdownIDKey = dropdownString + "UID",
      dropdownMenuEndClass = 'dropdown-menu-end',
      dropdownClasses = ['dropdown','dropup','dropstart','dropend'];


// DROPDOWN CUSTOM EVENTS
// ========================
var showDropdownEvent = bootstrapCustomEvent( ("show.bs." + dropdownString) ),  
      shownDropdownEvent = bootstrapCustomEvent( ("shown.bs." + dropdownString) ), 
      hideDropdownEvent = bootstrapCustomEvent( ("hide.bs." + dropdownString) ), 
      hiddenDropdownEvent = bootstrapCustomEvent( ("hidden.bs." + dropdownString) );


// DROPDOWN PRIVATE METHODS
// ========================
function styleDropdown( show, vars ){
  var element = vars.element;
  var menu = vars.menu;
  var parent = vars.parent;
  var btnGroup = vars.btnGroup;
  var originalClass = vars.originalClass;
  var dropLeft = vars.dropLeft;
  var dropRight = vars.dropRight;
  var dropdownMenuEnd = vars.dropdownMenuEnd;
  var hideMenuClass = ['d-block','invisible'],
      verticalClass = ['dropdown','dropup'],
      horizontalClass = ['dropstart','dropend'];

  var positionClass = dropdownClasses.filter( function (c) { return originalClass.includes(c); } )[0];

  if ( !show ) {
    parent.className = originalClass.join( ' ' );
    var menuAction = dropdownMenuEnd && !menu.classList.contains( dropdownMenuEndClass ) ? 'add' : 'remove';
    menu.classList[menuAction]( dropdownMenuEndClass );
    return
  }

  // force showing the menu to calculate its size
  hideMenuClass.map( function (c) { return menu.classList.add( c ); } );

  var dropdownRegex = /\b(dropdown|dropup|dropstart|dropend)+/,
        elementDimensions = { w : element.offsetWidth, h: element.offsetHeight },
        menuDimensions    = { w : menu.offsetWidth,    h: menu.offsetHeight    },
        windowWidth       = ( document.documentElement.clientWidth  || document.body.clientWidth  ),
        windowHeight      = ( document.documentElement.clientHeight || document.body.clientHeight ),
        targetBCR         = element.getBoundingClientRect(),
        leftExceed        = targetBCR.left + elementDimensions.w - menuDimensions.w < 0, // dropdownMenuEnd && [ dropdown | dropup ]
        leftFullExceed    = targetBCR.left - menuDimensions.w < 0, // dropstart
        rightExceed       = targetBCR.left + menuDimensions.w >= windowWidth, // !dropdownMenuEnd && [ dropdown | dropup ]
        rightFullExceed   = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth, // dropend 
        bottomExceed      = targetBCR.top  + menuDimensions.h >= windowHeight, // dropstart | dropend
        bottomFullExceed  = targetBCR.top  + menuDimensions.h + elementDimensions.h >= windowHeight, // dropdown
        topExceed         = targetBCR.top  - menuDimensions.h < 0; // dropup

  // recompute position
  positionClass = horizontalClass.includes( positionClass ) && leftFullExceed && rightFullExceed ? 'dropdown' : positionClass;
  positionClass = horizontalClass.includes( positionClass ) && bottomExceed ? 'dropup' : positionClass;
  positionClass = positionClass === 'dropstart' && leftFullExceed && !bottomExceed ? 'dropend' : positionClass;
  positionClass = positionClass === 'dropend' && rightFullExceed && !bottomExceed ? 'dropstart' : positionClass;
  positionClass = positionClass === 'dropup' && topExceed && !bottomFullExceed ? 'dropdown' : positionClass;
  positionClass = positionClass === 'dropdown' && bottomFullExceed && !topExceed ? 'dropup' : positionClass;

  // update dropdown position class
  !parent.classList.contains( positionClass ) && 
  ( parent.className = parent.className.replace( dropdownRegex, positionClass ) );

  // update dropstart / dropend to pixel perfect
  var dropStartAction = (!dropLeft || !dropRight) && positionClass === 'dropstart' ? 'add' : 'remove',
        dropEndAction = (!dropLeft || !dropRight) && positionClass === 'dropend' ? 'add' : 'remove';

  parent.classList[dropStartAction]( 'dropleft' );
  parent.classList[dropEndAction]( 'dropright' );

  // update dropdown / dropup to handle parent btn-group element
  // as well as the dropdown-menu-end utility class
  if ( verticalClass.includes( positionClass ) ) {
    var menuEndAction = rightExceed ? 'add' : 'remove';

    !btnGroup ? menu.classList[menuEndAction]( dropdownMenuEndClass )
              : leftExceed && parent.classList.add( 'position-static' );
  }

  // remove util classes from the menu, we have its size
  hideMenuClass.map( function (c) { return menu.classList.remove( c ); } );
}

function toggleDropdownDismiss( vars ) {
  var element = vars.element;
  var action = element.open ? 'addEventListener' : 'removeEventListener';

  document[action]( 'click', dropdownDismissHandler );
  document[action]( 'focus', dropdownDismissHandler );
  document[action]( 'keydown', preventDropdownScroll );
  document[action]( 'keyup', dropdownKeyHandler );
  window[action]( 'scroll', dropdownLayoutHandler, passiveHandler );
  window[action]( 'resize', dropdownLayoutHandler, passiveHandler );
}

function showDropdown( vars ){
  var element = vars.element;
  var menu = vars.menu;
  var parent = vars.parent;
  var relatedTarget = vars.relatedTarget;
  var currentParent = queryElement( dropdownClasses.map( function (c) { return ("." + c + ".show"); } ).join(',') ),
      currentElement = currentParent && queryElement( dropdownSelector, currentParent );

  currentElement && currentElement[dropdownComponent].toggle();

  // update relatedTarget and dispatch
  showDropdownEvent.relatedTarget = relatedTarget;
  parent.dispatchEvent( showDropdownEvent );
  if ( showDropdownEvent.defaultPrevented ) { return }

  // change menu position
  styleDropdown( 1, vars );

  menu.classList.add( 'show' );
  parent.classList.add( 'show' );

  element.setAttribute( 'aria-expanded', true );
  element.open = true;

  setTimeout( function () {
    setFocus( menu.getElementsByTagName( 'INPUT' )[0] || element ); // focus the first input item | element
    toggleDropdownDismiss( vars );

    shownDropdownEvent.relatedTarget = relatedTarget;
    parent.dispatchEvent( shownDropdownEvent );
  }, 1 );
}

function hideDropdown( vars ){
  var element = vars.element;
  var menu = vars.menu;
  var parent = vars.parent;
  var relatedTarget = vars.relatedTarget;

  hideDropdownEvent.relatedTarget = relatedTarget;
  parent.dispatchEvent( hideDropdownEvent );
  if ( hideDropdownEvent.defaultPrevented ) { return }

  menu.classList.remove( 'show' );
  parent.classList.remove( 'show' );

  // revert to original position
  styleDropdown( 0, vars );

  element.setAttribute( 'aria-expanded', false );
  element.open = false;

  setFocus( element );
  
  // only re-attach handler if the instance is not disposed
  setTimeout( function () { return toggleDropdownDismiss( vars ); }, 1 );

  // update relatedTarget and dispatch
  hiddenDropdownEvent.relatedTarget = relatedTarget;
  parent.dispatchEvent( hiddenDropdownEvent );
}


// DROPDOWN EVENT HANDLERS
// =======================
function dropdownDismissHandler( e ) {
  var eventTarget = e.target,
        parent = queryElement( dropdownClasses.map( function (c) { return ("." + c + ".show"); } ).join(',') ),
        menu = eventTarget.closest( '.dropdown-menu.show' ),
        element = queryElement( dropdownSelector, parent ),
        vars = privateProperties[ element[dropdownIDKey] ],
        hasData = eventTarget.getAttribute( 'data-bs-toggle' ) === dropdownString ||
          eventTarget.closest( dropdownSelector ) !== null,
        isForm = parent && parent.contains( eventTarget ) &&
          ( eventTarget.tagName === 'form' || eventTarget.closest( 'form' ) !== null );

  if ( e.type === 'click' && ( menu || parent ) && isEmptyAnchor( eventTarget ) ) { 
    e.preventDefault();
  }
  if ( e.type === 'focus' && 
    ( eventTarget === element || eventTarget === menu || menu.contains( eventTarget ) ) ) 
  { return }  

  if ( isForm || hasData ){
    return
  } else if ( vars ){
    vars.relatedTarget = eventTarget;
    hideDropdown( vars );
  }
}

function dropdownClickHandler( e ) {
  isEmptyAnchor( e.target ) && e.preventDefault();

  var element = this,
        self = element[dropdownComponent],
        vars = privateProperties[ element[dropdownIDKey] ];

  vars.relatedTarget = element;
  self.toggle();
}

function preventDropdownScroll( e ) {
  if ( e.which === 38 || e.which === 40 ) { e.preventDefault(); }
}

function dropdownKeyHandler(ref) {
  var which = ref.which;

  var activeItem = document.activeElement,
        parent = queryElement( dropdownClasses.map( function (c) { return ("." + c + ".show"); } ).join(',') ),
        element = parent.querySelector( dropdownSelector ),
        self = element[dropdownComponent],
        vars = privateProperties[ element[dropdownIDKey] ],
        menu = vars.menu,
        menuItems = vars.menuItems,
        isSameElement = activeItem === element,
        isInsideMenu = menu.contains(activeItem),
        isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;

  var idx = menuItems.indexOf( activeItem );

  if ( isMenuItem ) { // navigate up | down
    idx = isSameElement ? 0 
        : which === 38 ? ( idx > 1 ? idx-1 : 0 )
        : which === 40 ? ( idx < menuItems.length-1 ? idx+1 : idx ) : idx;
    menuItems[idx] && setFocus( menuItems[idx] );
  }

  if ( ( menuItems.length && isMenuItem // menu has items
      || !menuItems.length && (isInsideMenu || isSameElement )  // menu might be a form
      || !isInsideMenu ) // or the focused element is not in the menu at all
      && element.open && which === 27  // menu must be open
  ) {
    vars.relatedTarget = null;
    self.toggle();
  }
}

function dropdownLayoutHandler(){
  var parent = queryElement( dropdownClasses.map( function (c) { return ("." + c + ".show"); } ).join(',') ),
        element = queryElement( dropdownSelector, parent ),
        vars = privateProperties[ element[dropdownIDKey] ];

  element.open && styleDropdown( 1, vars );
}


// DROPDOWN DEFINITION
// ===================

var Dropdown = function Dropdown ( element ) {

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element[dropdownComponent] && element[dropdownComponent].dispose();

  // set targets
  var parent = element.parentNode,
        menu = queryElement( '.dropdown-menu', parent ),
        btnGroup = parent.parentNode.closest('.btn-group,.btn-group-vertical'),
        isForm = menu.tagName === 'form' || queryElement( 'form', menu ) !== null,
        // set original position
        originalClass = Array.from( parent.classList ),
        dropLeft = originalClass.includes( 'dropleft' ),
        dropRight = originalClass.includes( 'dropright' ),
        dropdownMenuEnd = menu.classList.contains( dropdownMenuEndClass ),
        relatedTarget = null,
        menuItems = [];

  Array.from( menu.children ).map( function (child) {
    child.children.length && (child.children[0].tagName === 'A' && menuItems.push(child.children[0]));
    child.tagName === 'A' && menuItems.push(child);
  });

  // add event listener
  element.addEventListener( 'click', dropdownClickHandler );

  // set initial state to closed
  element.open = false;

  // set private properties unique ID key
  var elementID = getUID( element, dropdownIDKey );

  this[dropdownIDKey] = elementID;
  element[dropdownIDKey] = elementID;
  privateProperties[elementID] = {
    element: element,
    parent: parent,
    menu: menu,
    btnGroup: btnGroup,
    isForm: isForm, // replaces persist option
    originalClass: originalClass,
    dropLeft: dropLeft,
    dropright: dropRight,
    dropdownMenuEnd: dropdownMenuEnd,
    menuItems: menuItems,
    relatedTarget: relatedTarget
  };     

  // associate element with init object 
  element[dropdownComponent] = this;
};


// DROPDOWN PUBLIC METHODS
// =======================
Dropdown.prototype.toggle = function toggle () {
  var vars = privateProperties[ this[dropdownIDKey] ];
    var element = vars.element;
    var parent = vars.parent;
    
  if ( parent.classList.contains( 'show' ) && element.open ) { hideDropdown( vars ); }
  else { showDropdown( vars ); }
};
Dropdown.prototype.dispose = function dispose () {
  var uid = this[dropdownIDKey],
        vars = privateProperties[uid];
    var element = vars.element;
    var parent = vars.parent;

  if ( parent.classList.contains( 'show' ) && element.open ) { hideDropdown( vars ); }

  element.removeEventListener( 'click', dropdownClickHandler );

  delete element[dropdownComponent];
  delete element[dropdownIDKey];
  delete this[dropdownIDKey];
};

var dropdownInit = {
  component: dropdownComponent,
  selector: dropdownSelector,
  constructor: Dropdown
};

// MODAL PRIVATE GC
// ================
var modalString = 'modal',
      modalComponent = 'Modal',
      modalSelector = '[data-bs-toggle="modal"]',
      modalIDKey = modalString + "UID",
      modalFixedItems = Array.from(document.getElementsByClassName( 'fixed-top' ))
                .concat(Array.from(document.getElementsByClassName( 'fixed-bottom' )));


// MODAL CUSTOM EVENTS
// ===================
var showModalEvent = bootstrapCustomEvent( ("show.bs." + modalString) ),
      shownModalEvent = bootstrapCustomEvent( ("shown.bs." + modalString) ),
      hideModalEvent = bootstrapCustomEvent( ("hide.bs." + modalString) ),
      hiddenModalEvent = bootstrapCustomEvent( ("hidden.bs." + modalString) );


// MODAL PRIVATE METHODS
// =====================
function setModalScrollbar( modal ) {
  var openModal = document.body.classList.contains( 'modal-open' ),
        bodyPad = parseInt( getComputedStyle(document.body).paddingRight ),
        bodyOverflow = document.documentElement.clientHeight !== document.documentElement.scrollHeight 
                    || document.body.clientHeight !== document.body.scrollHeight,
        modalOverflow = modal.clientHeight !== modal.scrollHeight,
        scrollBarWidth = measureModalScrollbar();

  modal.style.paddingRight = !modalOverflow && scrollBarWidth 
    ? (scrollBarWidth + "px") : '';

  document.body.style.paddingRight = modalOverflow || bodyOverflow 
    ? ((bodyPad + ( openModal ? 0 : scrollBarWidth )) + "px") : '';

  modalFixedItems.length && modalFixedItems.map( function (fixed) {
    var itemPad = getComputedStyle(fixed).paddingRight;

    fixed.style.paddingRight = modalOverflow || bodyOverflow 
      ? ((parseInt( itemPad ) + ( openModal ? 0 : scrollBarWidth )) + "px")
      : ((parseInt( itemPad )) + "px");
  });
}

function resetModalScrollbar( modal ) {
  document.body.style.paddingRight = '';
  modal.style.paddingRight = '';

  modalFixedItems.length && modalFixedItems.map( function (fixed) {
    fixed.style.paddingRight = '';
  });
}

function measureModalScrollbar() {
  var scrollDiv = document.createElement( 'div' ), widthValue;

  scrollDiv.className = 'modal-scrollbar-measure'; // this is here to stay
  document.body.appendChild(scrollDiv);
  widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild( scrollDiv );
  return widthValue;
}

function createModalOverlay( options ) {
  var overlay = queryElement( '.modal-backdrop' );

  if ( overlay === null ) {
    var newOverlay = document.createElement( 'div' );
    newOverlay.setAttribute( 'class', ("modal-backdrop" + (options.animation ? ' fade' : '')));

    overlay = newOverlay;
    document.body.appendChild( overlay );
  }

  return overlay
}

function removeModalOverlay ( vars ) {
  var modal = vars.modal;
  var overlay = queryElement( '.modal-backdrop' );

  if ( overlay && !document.getElementsByClassName('modal show')[0] ) {
    document.body.removeChild(overlay); overlay = null;     
  }

  overlay === null && ( document.body.classList.remove( 'modal-open' ), resetModalScrollbar( modal ) );
}

function toggleModalEvents( action, modal ) {
  action = action ? 'addEventListener' : 'removeEventListener';
  window[action]( 'resize', modalResizeHandler, passiveHandler);
  modal[action]( 'click', modalDismissHandler );
  document[action]( 'keydown', modalKeyHandler );
}

function beforeModalShow( vars ) {
  var modal = vars.modal;

  modal.style.display = 'block';

  setModalScrollbar( modal );
  !document.getElementsByClassName( 'modal show' )[0]
    && document.body.classList.add('modal-open');

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', false);

  modal.classList.contains('fade') ? 
    emulateTransitionEnd( modal, function showTransitionEndHandler(){ triggerShow( vars ); }) :
    triggerShow( vars );
}

function triggerShow( vars ) {
  var modal = vars.modal;

  setFocus( modal );
  vars.isAnimating = false;

  toggleModalEvents( 1, modal );

  shownModalEvent.relatedTarget = vars.relatedTarget;
  modal.dispatchEvent( shownModalEvent );
}

function triggerHide( force, vars ) {
  var overlay = queryElement('.modal-backdrop');
  var modal = vars.modal;
  var element = vars.element;

  modal.style.display = '';
  element && ( setFocus( element ) ); 

  // force can also be the transitionEvent object, we wanna make sure it's not
  if ( force !== 1 && overlay && overlay.classList.contains( 'show' ) // call is not forced and overlay is visible
    && !queryElement( '.modal.show' ) ) // AND no modal is visible
  {
    overlay.classList.remove( 'show' );
    emulateTransitionEnd( overlay, 
      function hideWrap() { 
        removeModalOverlay( vars ); 
      });
  } else {
    removeModalOverlay( vars );
  }

  toggleModalEvents( 0, modal );

  vars.isAnimating = false;

  modal.dispatchEvent( hiddenModalEvent );
}


// MODAL EVENT HANDLERS
// ====================
function modalClickHandler(e) {
  var eventTarget = e.target,
        element = this,
        vars = privateProperties[ element[modalIDKey] ],
        self = vars && element[modalComponent],
        modal = vars.modal;

  if ( vars.isAnimating ) { return }

  var modalID = modal.getAttribute( 'id' ),
        // eventTargetModal = getTargetElement( eventTarget ),
        elemTargetModal = getTargetElement( element );

  // if ( !modal.classList.contains( 'show' ) // modal not visible AND
  //     && (eventTarget === element && eventTargetModal.id === modalID // EITHER the event target is our element and points to our modal
  //     || element.contains( eventTarget ) && elemTargetModal.id === modalID ) ) // OR the event target is a child of the element pointing to our modal
  // {
  if ( !modal.classList.contains( 'show' ) // modal not visible AND
      && element.contains( eventTarget ) && elemTargetModal.id === modalID ) // OR the event target is a child of the element pointing to our modal
  {
    vars.relatedTarget = element;
    self.show();
    e.preventDefault();
  }
}

function modalResizeHandler(){
  var modal = document.getElementsByClassName( 'modal show' )[0],
        self = ( modal.modalTrigger || modal )[modalComponent];

  self.update();
}

function modalKeyHandler( ref ) {
  var which = ref.which;

  var modal = document.getElementsByClassName( 'modal show' )[0],
        self = ( modal.modalTrigger || modal )[modalComponent],
        vars = privateProperties[ self[modalIDKey] ],
        options = vars.options;

  if ( !vars.isAnimating // modal has no animations running
    && options.keyboard && which == 27 // the keyboard option is enabled and the key is 27
    && modal.classList.contains('show') ) // the modal is not visible
  {
    self.hide();
  }
}

function modalDismissHandler(e) {
  var modal = this,
        self = ( modal.modalTrigger || modal )[modalComponent],
        vars = privateProperties[ self[modalIDKey] ],
        options = vars.options;

  if ( vars.isAnimating ) { return }

  var clickTarget = e.target,
      hasData = clickTarget.getAttribute( 'data-bs-dismiss' ) === 'modal',
      parentWithData = clickTarget.closest( '[data-bs-dismiss="modal"]' );

  if ( modal.classList.contains( 'show' ) // modal is visible AND
      && ( parentWithData || hasData // the event target is a dismissing element or it's child
      || clickTarget === modal && options.backdrop !== 'static' ) ) // OR event target is the non-static modal
  {
    self.hide();
    vars.relatedTarget = null;
    e.preventDefault();
  }
}


// MODAL DEFINITION
// ================
var Modal = function Modal( element, options ){ // element can be the modal/triggering button

  // set options
  options = options || {};

  // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
  element = queryElement( element );

  // determine modal, triggering element
  var modal = element.classList.contains( 'modal' ) ? element : getTargetElement( element );

  // modal is now independent of it's triggering element
  if ( element.classList.contains( 'modal' ) ) { element = null; } 

  // reset on re-init
  if ( element ) {
    element[modalComponent] && element[modalComponent].dispose();
  } else {
    modal[modalComponent] && modal[modalComponent].dispose();
  }

  // set private properties unique ID key
  var elementID = getUID( ( element||modal ), modalIDKey );
  this[modalIDKey] = elementID;
  modal[modalIDKey] = elementID;

  // set associations
  if ( element ) {
    // modal is independent of a triggering element
    element.addEventListener( 'click', modalClickHandler );

    modal.modalTrigger = element;
    element[modalIDKey] = elementID;
    element[modalComponent] = this;

  } else { 
    modal[modalComponent] = this;
  }

  // set options
  var ops = {};
  ops.keyboard = options.keyboard === false || modal.getAttribute('data-bs-keyboard') === 'false' ? false : true;
  ops.backdrop = options.backdrop === 'static' || modal.getAttribute('data-bs-backdrop') === 'static' ? 'static' : true;
  ops.backdrop = options.backdrop === false || modal.getAttribute('data-bs-backdrop') === 'false' ? false : ops.backdrop;
  ops.animation = modal.classList.contains('fade') ? true : false;
  ops.content = options.content; // JavaScript only

  // register private internals
  privateProperties[elementID] = {
    element: element,
    modal: modal,
    options: ops,
    isAnimating: false,
    relatedTarget: null
  };

  // set content from option
  options.content && this.setContent( options.content.trim() );
};

// MODAL PUBLIC METHODS
// ====================
Modal.prototype.toggle = function toggle () {
  var ref = privateProperties[ this[modalIDKey] ];
    var modal = ref.modal;

  modal.classList.contains( 'show' ) ? this.hide() : this.show();
};

Modal.prototype.show = function show () {
  var vars = privateProperties[ this[modalIDKey] ];
    var modal = vars.modal;
    var options = vars.options;

  if ( modal.classList.contains( 'show' ) && !vars.isAnimating ) { return }

  showModalEvent.relatedTarget = vars.relatedTarget;
  modal.dispatchEvent( showModalEvent );
  if ( showModalEvent.defaultPrevented ) { return }

  vars.isAnimating = true;

  // we elegantly hide any opened modal
  var currentOpen = document.getElementsByClassName('modal show')[0],
        overlay = options.backdrop ? createModalOverlay( options ) : null;

  var overlayDelay = 0;

  if ( currentOpen && currentOpen !== modal ) {
    currentOpen.modalTrigger && currentOpen.modalTrigger[modalComponent].hide();
    currentOpen[modalComponent] && currentOpen[modalComponent].hide();
  }

  if ( overlay // overlay exists
    && !currentOpen // no open modal found 
    && !overlay.classList.contains( 'show' ) // overlay not visible
  ) {
    overlay.offsetWidth; // force reflow to enable trasition
    overlayDelay = getElementTransitionDuration( overlay );
    overlay.classList.add( 'show' );
  }

  !currentOpen ? setTimeout( function () { return beforeModalShow( vars ); }, overlay && overlayDelay ? overlayDelay : 0 ) 
               : beforeModalShow( vars );
};

Modal.prototype.hide = function hide ( force ) {
  var vars = privateProperties[ this[modalIDKey] ];
    var modal = vars.modal;
    
  if ( !modal.classList.contains( 'show' ) && !vars.isAnimating ) { return }

  modal.dispatchEvent( hideModalEvent );
  if ( hideModalEvent.defaultPrevented ) { return }

  vars.isAnimating = true;
  modal.classList.remove( 'show' );
  modal.setAttribute( 'aria-hidden', true );

  modal.classList.contains( 'fade' ) && force !== 1 // modal should fade AND not forced to hide
      ? emulateTransitionEnd( modal, function triggerHideHandler() { triggerHide( 0, vars ); } ) // then wait for overlay to fade then triggerHide
      : triggerHide( force, vars ); // OR triggerHide on force or no fade class present
};

Modal.prototype.setContent = function setContent ( content ) {
  var ref = privateProperties[ this[modalIDKey] ];
    var modal = ref.modal;
  queryElement( '.modal-content', modal ).innerHTML = content.trim();
};

Modal.prototype.update = function update () {
  var ref = privateProperties[ this[modalIDKey] ];
    var modal = ref.modal;
  modal.classList.contains( 'show' ) && setModalScrollbar( modal );
};

Modal.prototype.dispose = function dispose () {
  var uid = this[modalIDKey],
        vars = privateProperties[uid];
    var modal = vars.modal;
    var element = vars.element;

  this.hide(1); // forced call

  if ( element ) {
    delete element[modalComponent]; // remove init object
    delete element[modalIDKey];
    delete modal.modalTrigger;
    element.removeEventListener( 'click', modalClickHandler ); // detatch event handler
  } else { 
    delete modal[modalComponent]; // remove init Object
  }

  // remove all associations
  delete privateProperties[uid];
  delete modal[modalIDKey];
  delete this[modalIDKey];
};

var modalInit = {
  component: modalComponent,
  selector: modalSelector,
  constructor: Modal
};

var mouseClickEvents = { down: 'mousedown', up: 'mouseup' };

var tipClassPositions = {top:'top', bottom:'bottom', left:'start', right:'end'};

function isMedia(element){
  return [SVGElement,HTMLImageElement,HTMLVideoElement]
  .some( function (mediaType) { return element instanceof mediaType; } )
}

function styleTip(link,element,position,parent,e) { // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
  var tipClasses = /\b(top|bottom|start|end)+/,
      elementDimensions = { w : element.offsetWidth, h: element.offsetHeight },
      windowWidth = ( document.documentElement.clientWidth || document.body.clientWidth ),
      windowHeight = ( document.documentElement.clientHeight || document.body.clientHeight ),
      rect = link.getBoundingClientRect(),
      scroll = parent === document.body 
              ? { x: window.pageXOffset, y: window.pageYOffset } 
              : { x: parent.offsetLeft + parent.scrollLeft, y: parent.offsetTop + parent.scrollTop },
      linkDimensions = { w: rect.right - rect.left, h: rect.bottom - rect.top },
      isPopover = element.classList.contains( 'popover' ),
      arrow = element.getElementsByClassName( ((isPopover?'popover':'tooltip') + "-arrow") )[0],
      topPosition, leftPosition,
      arrowTop, arrowLeft, arrowWidth, arrowHeight,
      // check position
      halfTopExceed = rect.top + linkDimensions.h/2 - elementDimensions.h/2 < 0,
      halfLeftExceed = rect.left + linkDimensions.w/2 - elementDimensions.w/2 < 0,
      halfRightExceed = rect.left + elementDimensions.w/2 + linkDimensions.w/2 >= windowWidth,
      halfBottomExceed = rect.top + elementDimensions.h/2 + linkDimensions.h/2 >= windowHeight,
      topExceed = rect.top - elementDimensions.h < 0,
      leftExceed = rect.left - elementDimensions.w < 0,
      bottomExceed = rect.top + elementDimensions.h + linkDimensions.h >= windowHeight,
      rightExceed = rect.left + elementDimensions.w + linkDimensions.w >= windowWidth,
      arrowAdjust = 0;

  // recompute position
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  position = ( position === 'left' || position === 'right' ) && leftExceed && rightExceed ? 'top' : position; 
  position = position === 'top' && topExceed ? 'bottom' : position;
  position = position === 'bottom' && bottomExceed ? 'top' : position;
  position = position === 'left' && leftExceed ? 'right' : position;
  position = position === 'right' && rightExceed ? 'left' : position;

  // update tooltip/popover class
  element.className.indexOf(position) === -1 
    && ( element.className = element.className.replace( tipClasses, tipClassPositions[position] ) );

  // we check the computed width & height and update here
  arrowWidth = arrow ? arrow.offsetWidth : 0;
  arrowHeight = arrow ? arrow.offsetHeight : 0;
  arrowAdjust = ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );

  // apply styling to tooltip / popover
  if ( position === 'left' || position === 'right' ) { // secondary|side positions
    if ( position === 'left' ) { // LEFT
      leftPosition = rect.left + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 );
    } else { // RIGHT
      leftPosition = rect.left + scroll.x + linkDimensions.w;
    }

    // adjust top and arrow
    if ( halfTopExceed ) {
      topPosition = rect.top + scroll.y;
      arrowTop = linkDimensions.h/2 - arrowWidth;
    } else if ( halfBottomExceed ) {
      topPosition = rect.top + scroll.y - elementDimensions.h + linkDimensions.h;
      arrowTop = elementDimensions.h - linkDimensions.h/2 - arrowWidth;
    } else {
      topPosition = rect.top + scroll.y - elementDimensions.h/2 + linkDimensions.h/2;
      arrowTop = elementDimensions.h/2 - ( isPopover ? arrowHeight*0.9 : arrowHeight/2 );
    }
    arrowLeft = null;

  } else if ( position === 'top' || position === 'bottom' ) {

    if ( e && isMedia(link) ) {

      if ( position === 'top' ) {
        topPosition = e.pageY - elementDimensions.h - ( isPopover ? arrowWidth : arrowHeight );
      } else {
        topPosition = e.pageY + arrowHeight;
      }

      // adjust left | right and also the arrow
      if (e.clientX - elementDimensions.w/2 < 0) {
        leftPosition = 0;
        // arrowLeft = e.pageX - arrowWidth/2
        arrowLeft = e.pageX - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      } else if (e.clientX + elementDimensions.w * 0.51 > windowWidth) {
        leftPosition = windowWidth - elementDimensions.w * 1.009;
        // arrowLeft = elementDimensions.w - (windowWidth - e.pageX) - arrowWidth/2
        arrowLeft = elementDimensions.w - (windowWidth - e.pageX) - arrowAdjust;
      } else {
        leftPosition = e.pageX - elementDimensions.w/2;
        arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
        // arrowLeft = elementDimensions.w/2 - arrowWidth/2
      }

    } else {

      if ( position === 'top' ) {
        topPosition =  rect.top + scroll.y - elementDimensions.h - ( isPopover ? arrowHeight : 0 );
      } else { // BOTTOM
        topPosition = rect.top + scroll.y + linkDimensions.h;
      }

      // adjust left | right and also the arrow
      if ( halfLeftExceed ) {
        leftPosition = 0;
        arrowLeft = rect.left + linkDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      } else if ( halfRightExceed ) {
        leftPosition = windowWidth - elementDimensions.w;
        arrowLeft = elementDimensions.w - ( windowWidth - rect.left ) + linkDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      } else {
        leftPosition = rect.left + scroll.x - elementDimensions.w/2 + linkDimensions.w/2;
        arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth*0.8 : arrowWidth/2 );
      }
    }
    arrowTop = null;

  }

  // apply style to tooltip/popover and its arrow
  element.style.top = topPosition + 'px';
  element.style.left = leftPosition + 'px';

  // update arrow position or clear side
  arrowTop !== null ? (arrow.style.top = arrowTop + 'px') : (arrow.style.top = '');
  arrowLeft !== null ? (arrow.style.left = arrowLeft + 'px') : (arrow.style.left = '');
}

// POPOVER PRIVATE GC
// ==================
var popoverString = 'popover',
      popoverComponent = 'Popover',
      popoverSelector = '[data-bs-toggle="popover"],[data-tip="popover"]',
      popoverIDKey = popoverString + "UID",
      isIphone = /(iPhone|iPod|iPad)/.test(navigator.userAgent),
      // close btn for dissmissible popover
      popoverCloseButton = '<button type="button" class="btn-close"></button>';


// POPOVER CUSTOM EVENTS
// =====================
var showPopoverEvent = bootstrapCustomEvent( ("show.bs." + popoverString) ),
      shownPopoverEvent = bootstrapCustomEvent( ("shown.bs." + popoverString) ),
      hidePopoverEvent = bootstrapCustomEvent( ("hide.bs." + popoverString) ),
      hiddenPopoverEvent = bootstrapCustomEvent( ("hidden.bs." + popoverString) );


// POPOVER EVENT HANDLERS
// ======================
function dismissiblePopoverHandler(e) {
  var popover = document.getElementsByClassName( (popoverString + " show") )[0],
        self = privateProperties[ popover[popoverIDKey] ]
              .element[popoverComponent];

  if ( popover !== null && e.target === queryElement( '.btn-close', popover ) ) {
    self.hide();
  }
}

function updatePopover(e) {
  var vars = {};

  if ( e.type === 'mousemove' ) {
    vars = privateProperties[ this[popoverIDKey] ];
  } else if ( ['resize','scroll'].includes( e.type ) ) {
    var currentPopover = document.getElementsByClassName( (popoverString + " show") )[0];
    vars = currentPopover ? privateProperties[ currentPopover[popoverIDKey] ] : {};
  } else if ( e.element ) {
    vars = e;
  } else {
    vars = { popover: null };
  }

  var element = vars.element;
  var popover = vars.popover;
  var options = vars.options;

  popover && styleTip( element, popover, options.placement, options.container, e );
}

function popoverForceFocus() {
  var ref = privateProperties[ this[popoverIDKey] ];
  var element = ref.element;
  var popover = ref.popover;
  popover === null && element.focus();
}

function popoverShowHandler() {
  var self = this[popoverComponent];
  self.show();
}

function popoverHideHandler() {
  var self = this[popoverComponent];
  self.hide();
}

function popoverClickHandler() {
  var self = this[popoverComponent];
  self.toggle();
}

function popoverTouchHandler(e){
  var popover = document.getElementsByClassName( (popoverString + " show") )[0],
        vars = privateProperties[ popover[popoverIDKey] ],
        eventTarget = e.target;
  var element = vars.element;
  var self = element[popoverComponent];

  if ( popover && popover.contains( eventTarget ) // popover includes touch target
    || eventTarget === element // OR touch target is element
    || element.contains( eventTarget ) ) // OR element includes touch target
  ; else {
    self.hide();
  }
}


// POPOVER PRIVATE METHODS
// =======================
function getPopoverContents( vars ) {
  var element = vars.element;
  var options = vars.options;

  return {
    0 : options.title || element.getAttribute( 'data-bs-title' ) || null,
    1 : options.content || element.getAttribute( 'data-bs-content' ) || null
  }
}

function removePopover( vars ) {
  var options = vars.options;
  var popover = vars.popover;
  options.container.removeChild( popover );
  vars.timer = null;
  vars.popover = null;
}

function createPopover( vars ) {
  var element = vars.element;
  var options = vars.options;
  var placementClass = vars.placementClass;
  var popoverContents = getPopoverContents({ element: element, options: options });

  var titleString = popoverContents[0],
      contentString = popoverContents[1];

  // fixing #233
  titleString = !!titleString ? titleString.trim() : null;
  contentString = !!contentString ? contentString.trim() : null;

  // sanitize title && content
  if ( options.sanitizeFn ) {
    titleString = titleString ? options.sanitizeFn( titleString ) : null;
    contentString = contentString ? options.sanitizeFn( contentString ) : null;
  }    

  var popover = document.createElement( 'div' );
  popover[popoverIDKey] = element[popoverIDKey];

  // popover arrow
  var popoverArrow = document.createElement( 'div' );
  popoverArrow.classList.add( 'popover-arrow' );
  popover.appendChild( popoverArrow );

  if ( contentString !== null && options.template === null ) { // create the popover from data attributes
    popover.setAttribute( 'role', 'tooltip' );

    // set title if any
    if ( titleString !== null ) {
      var popoverTitle = document.createElement( 'h3' );
      options.sanitizeFn && ( titleString = options.sanitizeFn( titleString ) ); // sanitize title
      popoverTitle.classList.add( 'popover-header' );
      popoverTitle.innerHTML = options.dismissible ? titleString + popoverCloseButton : titleString;
      popover.appendChild( popoverTitle );
    }

    // set popover content
    var popoverBodyMarkup = document.createElement( 'div' );
    popoverBodyMarkup.classList.add( 'popover-body' );
    options.sanitizeFn && ( contentString = options.sanitizeFn( contentString ) ); // sanitize content
    popoverBodyMarkup.innerHTML = options.dismissible && titleString === null ? contentString + popoverCloseButton : contentString;
    popover.appendChild( popoverBodyMarkup );

  } else {  // or create the popover from template
    var popoverTemplate = document.createElement( 'div' );
    popoverTemplate.innerHTML = options.template.trim();
    popover.className = popoverTemplate.firstChild.className;
    popover.innerHTML = popoverTemplate.firstChild.innerHTML;

    var popoverHeader = queryElement( '.popover-header', popover ),
          popoverBody = queryElement( '.popover-body', popover );

    // fill the template with content from data attributes
    titleString && popoverHeader && ( popoverHeader.innerHTML = titleString.trim() );
    contentString && popoverBody && ( popoverBody.innerHTML = contentString.trim() );
  }

  //append to the container
  options.container.appendChild( popover );
  popover.style.display = 'block';
  !popover.classList.contains( 'popover' ) && popover.classList.add( 'popover' );
  !popover.classList.contains( options.animation ) && popover.classList.add( options.animation );
  !popover.classList.contains( placementClass ) && popover.classList.add( placementClass );

  vars.popover = popover;
}

function showPopover( vars ) {
  var popover = vars.popover;
  !popover.classList.contains( 'show' ) && ( popover.classList.add( 'show' ) );
}

function toggleEvents( action, vars ) {
  var element = vars.element;
  var options = vars.options;
  action = action ? 'addEventListener' : 'removeEventListener';

  if ( 'hover' === options.trigger ) {
    element[action]( mouseClickEvents.down, popoverShowHandler );
    element[action]( mouseHoverEvents[0], popoverShowHandler );
    isMedia(element) && element[action]( 'mousemove', updatePopover, passiveHandler );
    !options.dismissible && element[action]( mouseHoverEvents[1], popoverHideHandler ); // mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ]
  } else if ( 'click' === options.trigger ) {
    element[action]( options.trigger, popoverClickHandler );
  } else if ( 'focus' === options.trigger ) {
    isIphone && element[action]( 'click', popoverForceFocus );
    element[action]( options.trigger, popoverClickHandler );
  }
}

function dismissHandlerToggle( action, vars ) {
  var element = vars.element;
  var options = vars.options;
  action = action ? 'addEventListener' : 'removeEventListener';

  if ( options.dismissible ) {
    document[action]( 'click', dismissiblePopoverHandler );
  } else {
    'focus' === options.trigger && element[action]( 'blur', popoverHideHandler );
    'hover' === options.trigger && document[action]( 'touchstart', popoverTouchHandler, passiveHandler );
  }

  if ( !isMedia(element) ) {
    window[action]( 'scroll', updatePopover, passiveHandler );
    window[action]( 'resize', updatePopover, passiveHandler );
  }
}

function popoverShowTrigger( vars ) {
  dismissHandlerToggle( 1, vars );
  vars.element.dispatchEvent( shownPopoverEvent );
}
function popoverHideTrigger( vars ) {
  dismissHandlerToggle( 0, vars );
  removePopover( vars );
  vars.element.dispatchEvent( hiddenPopoverEvent );
}


// POPOVER DEFINITION
// ==================
var Popover = function Popover( element, options ){

  // set instance options
  options = options || {};

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element[popoverComponent] && element[popoverComponent].dispose();

  // DATA API
  var triggerData = element.getAttribute( 'data-bs-trigger' ), // click / hover / focus
        animationData = element.getAttribute( 'data-bs-animation' ), // true / false

        placementData = element.getAttribute( 'data-bs-placement' ),
        dismissibleData = element.getAttribute( 'data-bs-dismissible' ),
        delayData = element.getAttribute( 'data-bs-delay' ),
        containerData = element.getAttribute( 'data-bs-container' ),

        // check container
        containerOption = queryElement( options.container || containerData ),

        // maybe the element is inside a modal
        modal = element.closest( '.modal' ),

        // maybe the element is inside a fixed navbar
        navbarFixed = element.closest( '.fixed-top' ) || element.closest( '.fixed-bottom' );

  // set instance options
  var ops = {};
  ops.title = options.title;
  ops.content = options.content;
  ops.sanitizeFn = typeof options.sanitizeFn === 'function' ? options.sanitizeFn : null; // JavaScript only
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.trigger = options.trigger ? options.trigger : triggerData || 'hover';
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.delay = parseInt(options.delay || delayData) || 200;
  ops.dismissible = options.dismissible || dismissibleData === 'true' ? true : false;
  ops.container = containerOption ? containerOption
                : navbarFixed ? navbarFixed
                : modal ? modal : document.body;

  // invalidate
  var contentString = getPopoverContents({element: element,options:ops})[1];

  if ( !contentString && !ops.template ) { return }

  toggleEvents( 1, {element: element, options:ops} );

  // set private properties unique ID key
  var elementID = getUID( element, popoverIDKey );

  this[popoverIDKey] = elementID;
  element[popoverIDKey] = elementID;

  privateProperties[elementID] = {
    element: element,
    placementClass: ("bs-popover-" + (tipClassPositions[ops.placement])),
    popover: null,
    options: ops,
    timer: null
  };

  // associate target to init object
  element[popoverComponent] = this;
};

// POPOVER PUBLIC METHODS
// ======================
Popover.prototype.toggle = function toggle () {
  var ref = privateProperties[ this[popoverIDKey] ];
    var popover = ref.popover;
  popover === null ? this.show() : this.hide();
};

Popover.prototype.show = function show () {
  var vars = privateProperties[ this[popoverIDKey] ];
    var element = vars.element;
    var options = vars.options;
    var showWrap = function () { popoverShowTrigger( vars ); };

  clearTimeout( vars.timer );
  vars.timer = setTimeout( function () {
    if ( vars.popover === null ) {
      element.dispatchEvent( showPopoverEvent );
      if ( showPopoverEvent.defaultPrevented ) { return }

      createPopover( vars );
      updatePopover( vars );
      showPopover( vars );
      !!options.animation ? emulateTransitionEnd( vars.popover, showWrap )
                          : popoverShowTrigger( vars );
    }
  }, 20 );
};

Popover.prototype.hide = function hide () {
  var vars = privateProperties[ this[popoverIDKey] ];
    var element = vars.element;
    var options = vars.options;
    var popover = vars.popover;
    var hideWrap = function () { popoverHideTrigger( vars ); };

  clearTimeout(vars.timer);

  vars.timer = setTimeout( function () {
    if (popover && popover !== null && popover.classList.contains( 'show' )) {
      element.dispatchEvent( hidePopoverEvent );
      if ( hidePopoverEvent.defaultPrevented ) { return }

      popover.classList.remove( 'show' );
      !!options.animation ? emulateTransitionEnd( popover, hideWrap) 
                          : popoverHideTrigger( vars );
    }
  }, options.delay );
};

Popover.prototype.dispose = function dispose () {
  var uid = this[popoverIDKey],
        vars = privateProperties[ uid ];
    var element = vars.element;

  this.hide();
  toggleEvents( 0, vars );
  delete element[popoverComponent];
  delete element[popoverIDKey];
  delete this[popoverIDKey];
  delete privateProperties[ uid ];
};

var popoverInit = {
  component: popoverComponent,
  selector: popoverSelector,
  constructor: Popover
};

// SCROLLSPY PRIVATE GC
// ====================
var scrollspyString = 'scrollspy',
      scrollspyComponent = 'ScrollSpy',
      scrollspySelector = '[data-bs-spy="scroll"]',
      scrollspyIDKey = scrollspyString + "UID";


// SCROLLSPY CUSTOM EVENT
// ======================
var activateScrollSpy = bootstrapCustomEvent( ("activate.bs." + scrollspyString) );


// SCROLLSPY PRIVATE METHODS
// =========================
function updateSpyTargets( vars ){
  var links = vars.spyTarget.getElementsByTagName( 'A' );
  var scrollTarget = vars.scrollTarget;
  var length = vars.length;
  var isWindow = vars.isWindow;
  var offset = vars.offset;

  vars.scrollTop = isWindow ? scrollTarget.pageYOffset : scrollTarget.scrollTop;

  // only update vars once or with each mutation
  if ( length !== links.length || getScrollHeight( scrollTarget ) !== vars.scrollHeight ) {
    var href, targetItem, rect;

    // reset arrays & update 
    vars.items = [];
    vars.offsets = [];
    vars.scrollHeight = getScrollHeight( scrollTarget );
    vars.maxScroll = vars.scrollHeight - getOffsetHeight( vars );

    Array.from( links ).map( function (link) {
      href = link.getAttribute( 'href' );
      targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement( href );

      if ( targetItem ) {
        vars.items.push( link );
        rect = targetItem.getBoundingClientRect();        
        vars.offsets.push( ( isWindow ? rect.top + vars.scrollTop : targetItem.offsetTop ) - offset );
      }
    });
    vars.length = vars.items.length;
  }
}

function getScrollHeight( scrollTarget ){
  return scrollTarget.scrollHeight || Math.max( 
    document.body.scrollHeight, 
    document.documentElement.scrollHeight)
}

function getOffsetHeight(ref){
  var isWindow = ref.isWindow;
  var element = ref.element;

  return !isWindow ? element.getBoundingClientRect().height : window.innerHeight
}

function clear( spyTarget ){
  Array.from( spyTarget.getElementsByTagName( 'A' ) ).map( function (item) { return item.classList.contains( 'active' ) 
    && item.classList.remove( 'active' ); } );
}

function activate( item, vars ){
  var element = vars.element;
  var spyTarget = vars.spyTarget;

  clear( spyTarget );
  vars.activeItem = item;
  item.classList.add( 'active' );

  // activate all parents
  var parents = [];
  while (item.parentNode !== document.body) {
    item = item.parentNode
    ;[ 'dropdown-menu', 'nav' ].some( function (c) { return item.classList.contains( c ); } ) && parents.push(item);
  }

  parents.map( function (menuItem) {
    var parentLink = menuItem.previousElementSibling;

    if ( parentLink && !parentLink.classList.contains( 'active' ) ) {
      parentLink.classList.add( 'active' );
    }      
  });

  // update relatedTarget and dispatch
  activateScrollSpy.relatedTarget = item;
  element.dispatchEvent( activateScrollSpy );
}

function toggleSpyEvents( plus, uid, self ) {
  var action = plus ? 'addEventListener' : 'removeEventListener',
        scrollIdx = scrollHandlerQueue.indexOf( scrollHandlerQueue.find( function (s) { return s.id===uid; } ) ),
        resizeIdx = resizeHandlerQueue.indexOf( resizeHandlerQueue.find( function (r) { return r.id===uid; } ) );
  var ref = privateProperties[uid];
  var scrollTarget = ref.scrollTarget;
  var isWindow = ref.isWindow;
  var listener = { id: uid, self: self };

  // window should always have a single scroll/resize listener
  if ( !plus ) {
    scrollIdx > -1 && scrollHandlerQueue.splice( scrollIdx, 1 );
    resizeIdx > -1 && resizeHandlerQueue.splice( resizeIdx, 1 );
  }

  // scroll handling
  if ( !isWindow || plus && !scrollHandlerQueue.length || !plus ) {
    scrollTarget[action]( 'scroll', scrollUpdateHandler, passiveHandler );
  }

  // resize handling
  if ( plus && !resizeHandlerQueue.length || !plus && !resizeHandlerQueue.length ) {
    window[action]( 'resize', resizeUpdateHandler, passiveHandler );
  }

  if ( plus ) {
    scrollHandlerQueue.push( listener );
    resizeHandlerQueue.push( listener );
  }
}


// SCROLLSPY EVENT HANDLER
// ========================
var scrollHandlerQueue = [];
function scrollUpdateHandler(){
  scrollHandlerQueue.map( function (i) { return i.self.refresh(); } );
}

var resizeHandlerQueue = [];
function resizeUpdateHandler(){
  resizeHandlerQueue.map( function (i) { return i.self.refresh(); } );
}


// SCROLLSPY DEFINITION
// ====================
var ScrollSpy = function ScrollSpy( element, options ){

  // set options
  options = options || {};

  // initialization element, the element we spy on
  element = queryElement(element);

  // reset on re-init
  element[scrollspyComponent] && element[scrollspyComponent].dispose();

  // event targets, constants   
  // DATA API
  var spyTarget = queryElement( options.target || element.getAttribute( 'data-bs-target' ) ),
        // determine which is the real scrollTarget
        scrollTarget = element.clientHeight < element.scrollHeight ? element : window;

  if ( !spyTarget ) { return }
    
  // set private properties unique ID key
  var elementID = getUID( element, scrollspyIDKey );
    
  this[scrollspyIDKey] = elementID;
  element[scrollspyIDKey] = elementID;
    
  privateProperties[elementID] = {
    element: element,
    offset: +(options.offset || element.getAttribute( 'data-bs-offset' )) || 10,
    length: 0,
    items: [],
    offsets: [],
    scrollTarget: scrollTarget,
    spyTarget: spyTarget,
    isWindow: scrollTarget === window,
    activeItem: null,
    scrollHeight: 0,
    maxScroll: 0
  };

  // prevent adding event handlers multiple times
  toggleSpyEvents( 1, elementID, this );

  this.refresh();

  // associate target with init object
  element[scrollspyComponent] = this;
};

// SCROLLSPY PUBLIC METHODS
// ========================
ScrollSpy.prototype.refresh = function refresh () {
  var vars = privateProperties[ this[scrollspyIDKey] ];
    var activeItem = vars.activeItem;
    var spyTarget = vars.spyTarget;

  updateSpyTargets( vars );
    
  if ( vars.scrollTop >= vars.maxScroll ) {
    var newActiveItem = vars.items[vars.length - 1];

    if ( activeItem !== newActiveItem ) {
      activate( newActiveItem, vars );
    }
    return
  }

  if ( activeItem && vars.scrollTop < vars.offsets[0] && vars.offsets[0] > 0 ) {
    vars.activeItem = null;
    clear( spyTarget );
    return
  }

  vars.items.map( function ( item, i ) {
    if ( vars.activeItem !== item && vars.scrollTop >= vars.offsets[i] 
      && ( typeof vars.offsets[i + 1] === 'undefined' || vars.scrollTop < vars.offsets[i + 1] ) )
    {
      activate( item, vars );
    }
  });
};

ScrollSpy.prototype.dispose = function dispose () {
  var uid = this[scrollspyIDKey];
    var ref = privateProperties[uid];
    var element = ref.element;

  toggleSpyEvents( 0, uid, this );
  delete element[scrollspyComponent];
  delete element[scrollspyIDKey];
  delete this[scrollspyIDKey];
  delete privateProperties[uid];
};

var scrollSpyInit = {
  component: scrollspyComponent,
  selector: scrollspySelector,
  constructor: ScrollSpy
};

// TAB PRIVATE GC
// ================
var tabString = 'tab',
      tabComponent = 'Tab',
      tabSelector = '[data-bs-toggle="tab"]',
      tabIDKey = tabString + "UID";


// TAB CUSTOM EVENTS
// =================
var showTabEvent = bootstrapCustomEvent( ("show.bs." + tabString) ),
      shownTabEvent = bootstrapCustomEvent( ("shown.bs." + tabString) ),
      hideTabEvent = bootstrapCustomEvent( ("hide.bs." + tabString) ), 
      hiddenTabEvent = bootstrapCustomEvent( ("hidden.bs." + tabString) );


// TAB PRIVATE METHODS
// ===================
function triggerTabEnd( ref ) {
  var tabContent = ref.tabContent;
  var nav = ref.nav;

  tabContent.style.height = '';
  tabContent.classList.remove( 'collapsing' );
  nav.isAnimating = false;
}

function triggerTabShow( ref ) {
  var next = ref.next;
  var nextHeight = ref.nextHeight;
  var activeTab = ref.activeTab;
  var tabContent = ref.tabContent;
  var nav = ref.nav;
  var equalContents = ref.equalContents;

  if ( tabContent ) { // height animation
    if ( equalContents ) {
      triggerTabEnd( { tabContent: tabContent, nav: nav } );
    } else {
      setTimeout( function () { // enables height animation
        tabContent.style.height = nextHeight + "px"; // height animation
        tabContent.offsetWidth;
        emulateTransitionEnd( tabContent, function endWrapper() { 
          triggerTabEnd( { tabContent: tabContent, nav: nav } ); 
        });
      }, 50 );
    }
  } else {
    nav.isAnimating = false;
  }
  shownTabEvent.relatedTarget = activeTab;
  next.dispatchEvent( shownTabEvent );
}

function triggerTabHide( vars ) {
  var tabContent = vars.tabContent;
  var activeTab = vars.activeTab;
  var activeContent = vars.activeContent;
  var next = vars.next;
  var nextContent = vars.nextContent;

  if ( tabContent ) {
    activeContent.style.float = 'left';
    nextContent.style.float = 'left';
    vars.containerHeight = activeContent.scrollHeight;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = activeTab;
  hiddenTabEvent.relatedTarget = next;
  next.dispatchEvent( showTabEvent );
  if ( showTabEvent.defaultPrevented ) { return }
    
  nextContent.classList.add('active');
  activeContent.classList.remove('active');

  if ( tabContent ) {
    vars.nextHeight = nextContent.scrollHeight;
    vars.equalContents = vars.nextHeight === vars.containerHeight;
    tabContent.classList.add( 'collapsing' );
    tabContent.style.height = (vars.containerHeight) + "px"; // height animation
    tabContent.offsetHeight;
    activeContent.style.float = '';
    nextContent.style.float = '';
  }

  if ( nextContent.classList.contains( 'fade' ) ) {
    setTimeout( function () {
      nextContent.classList.add( 'show' );
      emulateTransitionEnd( nextContent, function showWrap() {
        triggerTabShow( vars );
      });
    }, 20 );
  } else { triggerTabShow( vars ); }

  activeTab.dispatchEvent( hiddenTabEvent );
}

function getActiveTab( ref ) {
  var nav = ref.nav;

  var activeTabs = nav.getElementsByClassName('active'), activeTab;

  if ( activeTabs.length === 1 
    && !activeTabs[0].parentNode.classList.contains( 'dropdown' ) ) 
  {
    activeTab = activeTabs[0];
  } else if ( activeTabs.length > 1 ) {
    activeTab = activeTabs[activeTabs.length-1];
  }
  return activeTab
}

function getActiveTabContent( ref ) {
  var nav = ref.nav;
 
  return queryElement(getActiveTab( {nav: nav} ).getAttribute('href')) 
}


// TAB EVENT HANDLER
// ================= 
function tabClickHandler(e) {
  var element = this,
        self = element[tabComponent],
        vars = privateProperties[ self[tabIDKey] ];

  e.preventDefault();
  vars.next = e.currentTarget;
  !vars.nav.isAnimating && self.show();
}


// TAB DEFINITION
// ==============
var Tab = function Tab( element, options ) {

  // initialization element
  element = queryElement(element);

  // reset on re-init
  element[tabComponent] && element[tabComponent].dispose();

  // event targets
  var nav = element.closest( '.nav' ),
        dropdown = nav && queryElement( '.dropdown-toggle', nav ),
        activeContent = getActiveTabContent({ nav: nav }),
        tabContent = supportTransition && activeContent.closest( '.tab-content' );

  // set default animation state
  nav.isAnimating = false;

  // set private properties unique ID key
  var elementID = getUID( element, tabIDKey );
  element[tabIDKey] = elementID;

  this[tabIDKey] = elementID;
  privateProperties[elementID] = {
    element: element,
    next: null,
    nextContent: null,
    nextHeight: 0,
    activeTab: null,
    activeContent: activeContent,
    nav: nav,
    dropdown: dropdown,
    tabContent: tabContent,
    containerHeight: tabComponent.scrollHeight
  };

  // add event listener
  element.addEventListener( 'click', tabClickHandler );

  // associate target with init object
  element[tabComponent] = this;
};

// TAB PUBLIC METHODS
// ==================
Tab.prototype.show = function show () { // the tab we clicked is now the next tab
  var vars = privateProperties[ this[tabIDKey] ];
    var element = vars.element;
    var dropdown = vars.dropdown;
    var nav = vars.nav;

  var next = vars.next || element, nextContent, 
      activeTab, activeContent;

  if ( !next.classList.contains( 'active' ) ) {
    nextContent = queryElement( next.getAttribute( 'href' ) ); // this is the actual object, the next tab content to activate
    activeTab = getActiveTab( {nav: nav} );
    activeContent = getActiveTabContent( {nav: nav} );
  
    // update relatedTarget and dispatch
    hideTabEvent.relatedTarget = next;
    activeTab.dispatchEvent( hideTabEvent );
    if ( hideTabEvent.defaultPrevented ) { return }

    nav.isAnimating = true;
    activeTab.classList.remove( 'active' );
    activeTab.setAttribute( 'aria-selected','false' );
    next.classList.add( 'active' );
    next.setAttribute( 'aria-selected', 'true' );
  
    if ( dropdown ) {
      if ( !element.parentNode.classList.contains( 'dropdown-menu' ) ) {
        dropdown.classList.contains( 'active' ) && dropdown.classList.remove( 'active' );
      } else {
        !dropdown.classList.contains( 'active' ) && dropdown.classList.add( 'active' );
      }
    }
  
    if ( activeContent.classList.contains( 'fade' ) ) {
      activeContent.classList.remove( 'show' );
      emulateTransitionEnd( activeContent, function hideWrap(){
        triggerTabHide( vars ); 
      });
    } else { triggerTabHide( vars ); }

    // update vars
    vars.next = next;
    vars.nextContent = nextContent;
    vars.activeTab = activeTab;
    vars.activeContent = activeContent;
  }
};

Tab.prototype.dispose = function dispose () {
  var uid = this[tabIDKey];
    var ref = privateProperties[uid];
    var element = ref.element;

  element.removeEventListener( 'click', tabClickHandler );
  delete this[tabIDKey];
  delete element[tabIDKey];
  delete element[tabComponent];
  delete privateProperties[uid];
};

var tabInit = {
  component: tabComponent,
  selector: tabSelector,
  constructor: Tab
};

// TOAST PRIVATE GC
// ================
var toastString = 'toast',
      toastComponent = 'Toast',
      toastSelector = '[data-bs-dismiss="toast"]',
      toastIDKey = toastString + "UID";


// TOAST CUSTOM EVENTS
// ===================
var showToastEvent = bootstrapCustomEvent( ("show.bs." + toastString) ),
      hideToastEvent = bootstrapCustomEvent( ("hide.bs." + toastString) ),
      shownToastEvent = bootstrapCustomEvent( ("shown.bs." + toastString) ),
      hiddenToastEvent = bootstrapCustomEvent( ("hidden.bs." + toastString) );


// TOAST PRIVATE METHODS
// =====================
function showToastComplete(ref) {
  var element = ref.element;
  var toast = ref.toast;
  var options = ref.options;

  if ( !options.animation ) {
    toast.classList.remove( 'showing' );
    toast.classList.add( 'show' );
  }

  toast.dispatchEvent( shownToastEvent );
  options.autohide && element[toastComponent].hide();
}

function hideToastComplete(ref) {
  var toast = ref.toast;

  toast.classList.add( 'hide' );
  toast.dispatchEvent( hiddenToastEvent );
}

function closeToast(ref) {
  var toast = ref.toast;
  var options = ref.options;

  toast.classList.remove( 'show' );
  if ( options.animation ) {
    toast.offsetWidth; // force reflow
    emulateTransitionEnd( toast, function hideWrap(){
      hideToastComplete({ toast: toast });
    });
  } else {
    hideToastComplete({ toast: toast });
  }
}

function openToast(ref) {
  var element = ref.element;
  var toast = ref.toast;
  var options = ref.options;

  toast.classList.remove( 'hide' );
  
  if ( options.animation ) {
    toast.offsetWidth; // force reflow
    toast.classList.add( 'showing' );
    toast.classList.add( 'show' );
    
    emulateTransitionEnd(toast, function showWrap() {
      showToastComplete({ element: element, toast: toast, options: options }); 
    });
  } else {
    showToastComplete({ element: element, toast: toast, options: options });
  }
}

function disposeToastComplete( vars ) {
  var element = vars.element;
  var uid = element[toastIDKey];

  clearTimeout( vars.timer );
  element.removeEventListener( 'click', toastClickHandler );
  delete element[toastComponent][toastIDKey];
  delete element[toastComponent];
  delete element[toastIDKey];
  delete privateProperties[uid];
}


// TOAST EVENT HANDLER
// ===================
function toastClickHandler(){
  this[toastComponent].hide();
}


// TOAST DEFINITION
// ================
var Toast = function Toast( element, options ) {

  // set options
  options = options || {};

  // initialization element
  element = queryElement( element );

  // reset on re-init
  element[toastComponent] && element[toastComponent].dispose();

  // DATA API
  var animationData = element.getAttribute( 'data-bs-animation' ),
        autohideData = element.getAttribute( 'data-bs-autohide' ),
        delayData = element.getAttribute( 'data-bs-delay' );

  // set instance options
  var ops = {};
  ops.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default
  ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default
  ops.delay = +(options.delay || delayData) || 500; // 500ms default

  // set private properties unique ID key
  var elementID = getUID( element, toastIDKey );

  element[toastIDKey] = elementID;
  this[toastIDKey] = elementID;
  privateProperties[elementID] = {
    element: element,
    toast: element.closest( '.toast' ),
    options: ops,
    timer: null
  };
    
  // add event listener
  element.addEventListener( 'click', toastClickHandler );

  // associate targets to init object
  element[toastComponent] = this;    
};

// TOAST PUBLIC METHODS
// ====================
Toast.prototype.show = function show () {
  var vars = privateProperties[ this[toastIDKey] ];
    var toast = vars.toast;

  if ( toast && toast.classList.contains( 'hide' ) ) {
    toast.dispatchEvent( showToastEvent );
    if ( showToastEvent.defaultPrevented ) { return }

    toast.classList.add( 'fade' );
    clearTimeout( vars.timer );
    vars.timer = setTimeout( function () { return openToast( vars ); }, 10);
  }
};

Toast.prototype.hide = function hide ( noTimer ) {
  var vars = privateProperties[ this[toastIDKey] ];
    var toast = vars.toast;
    var options = vars.options;

  if ( toast && toast.classList.contains( 'show' ) ) {
    toast.dispatchEvent( hideToastEvent );
    if ( hideToastEvent.defaultPrevented ) { return }

    clearTimeout( vars.timer );
    vars.timer = setTimeout( function () { return closeToast( vars ); }, noTimer ? 10 : options.delay );
  }
};

Toast.prototype.dispose = function dispose () {
  var vars = privateProperties[ this[toastIDKey] ];
    var toast = vars.toast;
    var options = vars.options;
    
  options.animation ? emulateTransitionEnd( toast, function completeWrap() {
    disposeToastComplete( vars ); 
  }) : disposeToastComplete( vars );
};

var toastInit = {
  component: toastComponent,
  selector: toastSelector,
  constructor: Toast
};

// TOOLTIP PRIVATE GC
// ==================
var tooltipString = 'tooltip',
      tooltipComponent = 'Tooltip',
      tooltipSelector = '[data-bs-toggle="tooltip"],[data-tip="tooltip"]',
      tooltipIDKey = tooltipString + "UID";


// TOOLTIP CUSTOM EVENTS
// =====================
var showTooltipEvent = bootstrapCustomEvent( ("show.bs." + tooltipString) ),
      shownTooltipEvent = bootstrapCustomEvent( ("shown.bs." + tooltipString) ),
      hideTooltipEvent = bootstrapCustomEvent( ("hide.bs." + tooltipString) ),
      hiddenTooltipEvent = bootstrapCustomEvent( ("hidden.bs." + tooltipString) );


// TOOLTIP PRIVATE METHODS
// =======================
function getTooltipTitle(ref) {
  var element = ref.element;
  var options = ref.options;

  return options.title
      || element.getAttribute( 'title' )
      || element.getAttribute( 'data-bs-title' )
      || element.getAttribute( 'data-original-title' )
}

function removeTooltip( vars ) {
  var options = vars.options;
  var tooltip = vars.tooltip;

  options.container.removeChild( tooltip );
  vars.tooltip = null;
  vars.timer = null;
}

function createTooltip( vars ) {
  var element = vars.element;
  var options = vars.options;
  var placementClass = vars.placementClass;
  var titleString = getTooltipTitle( vars ).trim(); // read the title again

  // sanitize title
  titleString = options.sanitizeFn ? options.sanitizeFn( titleString ) : titleString;

  if ( !titleString ) { return } // invalidate, maybe markup changed

  // create tooltip
  var tooltip = vars.tooltip || document.createElement( 'div' );
  tooltip[tooltipIDKey] = element[tooltipIDKey];

  // set markup
  if ( options.template ) {
    var tooltipMarkup = document.createElement( 'div' );
    tooltipMarkup.innerHTML = options.template.trim();

    tooltip.className = tooltipMarkup.firstChild.className;
    tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;

    queryElement( '.tooltip-inner', tooltip ).innerHTML = titleString;
  } else {
    // tooltip arrow
    var tooltipArrow = document.createElement( 'div' );
    tooltipArrow.classList.add( 'tooltip-arrow' );
    tooltip.appendChild( tooltipArrow );
    // tooltip inner
    var tooltipInner = document.createElement( 'div' );
    tooltipInner.classList.add( 'tooltip-inner' );
    tooltip.appendChild( tooltipInner );
    tooltipInner.innerHTML = titleString;
  }
  // reset position
  tooltip.style.left = '0';
  tooltip.style.top = '0';
  // set class and role attribute
  tooltip.setAttribute('role','tooltip');
  !tooltip.classList.contains('tooltip') && tooltip.classList.add('tooltip');
  !tooltip.classList.contains(options.animation) && tooltip.classList.add(options.animation);
  !tooltip.classList.contains(placementClass) && tooltip.classList.add(placementClass);
  // append to container
  options.container.appendChild( tooltip );
  // update internals
  vars.tooltip = tooltip;
}

function updateTooltip(e) {
  var vars = {};

  if ( e.type === 'mousemove' ) {
    vars = privateProperties[ this[tooltipIDKey] ];
  } else if ( ['resize','scroll'].includes( e.type ) ) {
    var currentTooltip = document.getElementsByClassName( (tooltipString + " show") )[0];
    vars = currentTooltip ? privateProperties[ currentTooltip[tooltipIDKey] ] : {};
  } else if ( e.element ) {
    vars = e;
  } else {
    vars = { tooltip: null };
  }

  var element = vars.element;
  var tooltip = vars.tooltip;
  var options = vars.options;

  tooltip && styleTip( element, tooltip, options.placement, options.container, e );
}

function showTooltip(ref) {
  var tooltip = ref.tooltip;

  !tooltip.classList.contains( 'show' ) && tooltip.classList.add( 'show' );
}

function tooltipTouchHandler(e){
  var tooltip = document.getElementsByClassName( (tooltipString + " show") )[0],
        vars = privateProperties[ tooltip[tooltipIDKey] ],
        eventTarget = e.target;
  var element = vars.element;
  var self = element[tooltipComponent];

  if ( tooltip && tooltip.contains( eventTarget ) || eventTarget === element || element.contains( eventTarget ) ) ; else {
    self.hide();
  }
}

function openTooltipHandler(){
  var self = this[tooltipComponent];
  self.show();
}

function closeTooltipHandler(){
  var self = this[tooltipComponent];
  self.hide();
}

function toggleTooltipAction( action, element ){
  action = action ? 'addEventListener' : 'removeEventListener';

  document[action]( 'touchstart', tooltipTouchHandler, passiveHandler );

  if ( !isMedia( element ) ) {
    window[action]( 'scroll', updateTooltip, passiveHandler );
    window[action]( 'resize', updateTooltip, passiveHandler );
  }
}

function tooltipShownAction(ref) {
  var element = ref.element;

  toggleTooltipAction( 1, element );
  element.dispatchEvent( shownTooltipEvent );
}

function tooltipHiddenAction( vars ) {
  var element = vars.element;
  toggleTooltipAction( 0, element );
  removeTooltip( vars );
  element.dispatchEvent( hiddenTooltipEvent );
}

function toggleTooltipEvents( action, element ) {
  action = action ? 'addEventListener' : 'removeEventListener';

  isMedia(element) && element[action]( 'mousemove', updateTooltip, passiveHandler );
  element[action]( mouseClickEvents.down, openTooltipHandler );
  element[action]( mouseHoverEvents[0], openTooltipHandler );
  element[action]( mouseHoverEvents[1], closeTooltipHandler );
}


// TOOLTIP DEFINITION
// ==================
var Tooltip = function Tooltip( element, options ) {

  // set options
  options = options || {};
  
  // initialization element
  element = queryElement(element);
  
  // reset on re-init
  element[tooltipComponent] && element[tooltipComponent].dispose();
  
  // DATA API
  var animationData = element.getAttribute( 'data-bs-animation' ),
        placementData = element.getAttribute( 'data-bs-placement' ),
        delayData = element.getAttribute( 'data-bs-delay' ),
        containerData = element.getAttribute( 'data-bs-container' ),

        // check container
        containerOption = queryElement( options.container || containerData ),

        // maybe the element is inside a modal
        modal = element.closest( '.modal' ),

        // maybe the element is inside a fixed navbar
        navbarFixed = element.closest( '.fixed-top' ) || element.closest( '.fixed-bottom' );
  
  // set instance options
  var ops = {};
  ops.title = options.title; // JavaScript only
  ops.template = options.template ? options.template : null; // JavaScript only
  ops.sanitizeFn = options.sanitizeFn && typeof options.sanitizeFn === 'function' ? options.sanitizeFn : null; // JavaScript only
  ops.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
  ops.placement = options.placement ? options.placement : placementData || 'top';
  ops.delay = +(options.delay || delayData) || 200;
  ops.container = containerOption ? containerOption
                : navbarFixed ? navbarFixed
                : modal ? modal : document.body;

  // check tooltip title
  var titleString = getTooltipTitle({ element: element, options:ops });
  
  // invalidate
  if ( !titleString && !ops.template ) { return }

  // set private properties unique ID key
  var elementID = getUID( element, tooltipIDKey );
  element[tooltipIDKey] = elementID;
  this[tooltipIDKey] = elementID;

  privateProperties[elementID] = {
    element: element,
    placementClass: ("bs-tooltip-" + (tipClassPositions[ops.placement])),
    options: ops,
    tooltip: null,
    timer: null
  };
  
  // set title attributes and add event listeners
  element.setAttribute( 'data-original-title', titleString );
  element.removeAttribute( 'title' );
  toggleTooltipEvents( 1, element );
  
  // associate target to init object
  element[tooltipComponent] = this;
};

// TOOLTIP PRIVATE METHODS
// =======================
Tooltip.prototype.show = function show () {
  var vars = privateProperties[ this[tooltipIDKey] ];
    var element = vars.element;
    var options = vars.options;

  clearTimeout( vars.timer );
  vars.timer = setTimeout( function () {
    if ( vars.tooltip === null ) {
      element.dispatchEvent( showTooltipEvent);
      if ( showTooltipEvent.defaultPrevented ) { return }

      if ( createTooltip( vars ) !== false ) {
        updateTooltip( vars );
        showTooltip( vars );
        !!options.animation ? emulateTransitionEnd( vars.tooltip, function shownWrap(){
          tooltipShownAction( vars ); 
        }) : tooltipShownAction( vars );
      }
    }
  }, 20 );
};

Tooltip.prototype.hide = function hide () {
  var vars = privateProperties[ this[tooltipIDKey] ];
    var element = vars.element;
    var tooltip = vars.tooltip;
    var options = vars.options;

  clearTimeout( vars.timer );
  vars.timer = setTimeout( function () {
    if (tooltip && tooltip.classList.contains( 'show' )) {
      element.dispatchEvent( hideTooltipEvent );
      if ( hideTooltipEvent.defaultPrevented ) { return }

      tooltip.classList.remove( 'show' );
      !!options.animation ? emulateTransitionEnd( tooltip, function hiddenWrap() { 
        tooltipHiddenAction( vars ); 
      }) : tooltipHiddenAction( vars );
    }
  }, options.delay );
};

Tooltip.prototype.toggle = function toggle () {
  var ref = privateProperties[ this[tooltipIDKey] ];
    var tooltip = ref.tooltip;
  tooltip === null ? this.show() : this.hide();
};

Tooltip.prototype.dispose = function dispose () {
  var uid = this[tooltipIDKey];
    var ref = privateProperties[uid];
    var element = ref.element;

  this.hide();
  toggleTooltipEvents( 0, element );
  element.setAttribute( 'title', element.getAttribute( 'data-original-title' ));
  element.removeAttribute( 'data-original-title' );
  delete element[tooltipComponent];
  delete element[tooltipIDKey];
  delete this[tooltipIDKey];
  delete privateProperties[uid];
};

var tooltipInit = {
  component: tooltipComponent,
  selector: tooltipSelector,
  constructor: Tooltip
};

var version = "3.0.15";

var componentsInit = {
  Alert: alertInit,
  Button: buttonInit,
  Carousel: carouselInit,
  Collapse: collapseInit,
  Dropdown: dropdownInit,
  Modal: modalInit,
  Popover: popoverInit,
  ScrollSpy: scrollSpyInit,
  Tab: tabInit,
  Toast: toastInit,
  Tooltip: tooltipInit
};

function initializeDataAPI( konstructor, collection ){
  Array.from( collection ).map( function (x) { return new konstructor(x); } );
}
function removeElementDataAPI( konstructor, collection, action ){
  Array.from(collection).map( function (x) { return x[konstructor].dispose(); } );
}
function Callback( lookUp, action ){
  lookUp = lookUp || document;
  action = action ? initializeDataAPI : removeElementDataAPI;

  for (var component in componentsInit) {
    action( componentsInit[component].constructor, 
      lookUp.querySelectorAll( componentsInit[component].selector ) );
  }
}

// bulk initialize all components
document.body ? Callback(0,1) : 
document.addEventListener( 'DOMContentLoaded', function () { return Callback(0,1); }, { once: true });

var indexV5 = {
  Alert: Alert,
  Button: Button,
  Carousel: Carousel,
  Collapse: Collapse,
  Dropdown: Dropdown,
  Modal: Modal,
  Popover: Popover,
  ScrollSpy: ScrollSpy,
  Tab: Tab,
  Toast: Toast,
  Tooltip: Tooltip,

  Callback: Callback,
  Version: version
};

export default indexV5;
