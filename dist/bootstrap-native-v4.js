// Native JavaScript for Bootstrap 4 v2.0.28 | © dnp_theme | MIT-License
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD support:
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like:
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var bsn = factory();
    root.Alert = bsn.Alert;
    root.Button = bsn.Button;
    root.Carousel = bsn.Carousel;
    root.Collapse = bsn.Collapse;
    root.Dropdown = bsn.Dropdown;
    root.Modal = bsn.Modal;
    root.Popover = bsn.Popover;
    root.ScrollSpy = bsn.ScrollSpy;
    root.Tab = bsn.Tab;
    root.Toast = bsn.Toast;
    root.Tooltip = bsn.Tooltip;
  }
}(this, function () {
  
  /* Native JavaScript for Bootstrap 4 | Internal Utility Functions
  ----------------------------------------------------------------*/
  "use strict";
  
  // globals
  var globalObject = typeof global !== 'undefined' ? global : this||window,
    DOC = document, HTML = DOC.documentElement, body = 'body', // allow the library to be used in <head>
  
    // Native JavaScript for Bootstrap Global Object
    BSN = globalObject.BSN = {},
    supports = BSN.supports = [],
  
    // function toggle attributes
    dataToggle    = 'data-toggle',
    dataDismiss   = 'data-dismiss',
    dataSpy       = 'data-spy',
    dataRide      = 'data-ride',
  
    // components
    stringAlert     = 'Alert',
    stringButton    = 'Button',
    stringCarousel  = 'Carousel',
    stringCollapse  = 'Collapse',
    stringDropdown  = 'Dropdown',
    stringModal     = 'Modal',
    stringPopover   = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab       = 'Tab',
    stringTooltip   = 'Tooltip',
    stringToast     = 'Toast',
  
    // options DATA API
    dataAutohide      = 'data-autohide',
    databackdrop      = 'data-backdrop',
    dataKeyboard      = 'data-keyboard',
    dataTarget        = 'data-target',
    dataInterval      = 'data-interval',
    dataHeight        = 'data-height',
    dataPause         = 'data-pause',
    dataTitle         = 'data-title',
    dataOriginalTitle = 'data-original-title',
    dataDismissible   = 'data-dismissible',
    dataTrigger       = 'data-trigger',
    dataAnimation     = 'data-animation',
    dataContainer     = 'data-container',
    dataPlacement     = 'data-placement',
    dataDelay         = 'data-delay',
  
    // option keys
    backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
    content = 'content', target = 'target', currentTarget = 'currentTarget',
    interval = 'interval', pause = 'pause', animation = 'animation',
    placement = 'placement', container = 'container', template = 'template',
  
    // box model
    offsetTop    = 'offsetTop',      offsetBottom   = 'offsetBottom',
    offsetLeft   = 'offsetLeft',
    scrollTop    = 'scrollTop',      scrollLeft     = 'scrollLeft',
    clientWidth  = 'clientWidth',    clientHeight   = 'clientHeight',
    offsetWidth  = 'offsetWidth',    offsetHeight   = 'offsetHeight',
    innerWidth   = 'innerWidth',     innerHeight    = 'innerHeight',
    scrollHeight = 'scrollHeight',   height         = 'height',
  
    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden   = 'aria-hidden',
    ariaSelected = 'aria-selected',
  
    // event names
    clickEvent    = 'click',
    focusEvent    = 'focus',
    hoverEvent    = 'hover',
    keydownEvent  = 'keydown',
    keyupEvent    = 'keyup',
    resizeEvent   = 'resize', // passive
    scrollEvent   = 'scroll', // passive
    mouseHover = ('onmouseleave' in DOC) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
    // touch since 2.0.26
    touchEvents = { start: 'touchstart', end: 'touchend', move:'touchmove' }, // passive
    // originalEvents
    showEvent     = 'show',
    shownEvent    = 'shown',
    hideEvent     = 'hide',
    hiddenEvent   = 'hidden',
    closeEvent    = 'close',
    closedEvent   = 'closed',
    slidEvent     = 'slid',
    slideEvent    = 'slide',
    changeEvent   = 'change',
    // custom events related
    defaultPrevented = 'defaultPrevented',  
  
    // other
    getAttribute           = 'getAttribute',
    setAttribute           = 'setAttribute',
    removeAttribute        = 'removeAttribute',
    hasAttribute           = 'hasAttribute',
    createElement          = 'createElement',
    appendChild            = 'appendChild',
    innerHTML              = 'innerHTML',
    getElementsByTagName   = 'getElementsByTagName',
    preventDefault         = 'preventDefault',
    getBoundingClientRect  = 'getBoundingClientRect',
    querySelectorAll       = 'querySelectorAll',
    getElementsByCLASSNAME = 'getElementsByClassName',
    getComputedStyle       = 'getComputedStyle',  
  
    indexOf      = 'indexOf',
    parentNode   = 'parentNode',
    length       = 'length',
    toLowerCase  = 'toLowerCase',
    Transition   = 'Transition',
    Duration     = 'Duration',
    Webkit       = 'Webkit',
    style        = 'style',
    push         = 'push',
    tabindex     = 'tabindex',
    contains     = 'contains',
  
    active     = 'active',
    showClass  = 'show',
    collapsing = 'collapsing',
    disabled   = 'disabled',
    loading    = 'loading',
    left       = 'left',
    right      = 'right',
    top        = 'top',
    bottom     = 'bottom',
  
    // tooltip / popover
    tipPositions = /\b(top|bottom|left|right)+/,
  
    // modal
    fixedTop = 'fixed-top',
    fixedBottom = 'fixed-bottom',
  
    // transitionEnd since 2.0.4
    supportTransitions = Webkit+Transition in HTML[style] || Transition[toLowerCase]() in HTML[style],
    transitionEndEvent = Webkit+Transition in HTML[style] ? Webkit[toLowerCase]()+Transition+'End' : Transition[toLowerCase]()+'end',
    transitionDuration = Webkit+Duration in HTML[style] ? Webkit[toLowerCase]()+Transition+Duration : Transition[toLowerCase]()+Duration,
  
    // set new focus element since 2.0.3
    setFocus = function(element){
      element.focus ? element.focus() : element.setActive();
    },
  
    // class manipulation, since 2.0.0 requires polyfill.js
    addClass = function(element,classNAME) {
      element.classList.add(classNAME);
    },
    removeClass = function(element,classNAME) {
      element.classList.remove(classNAME);
    },
    hasClass = function(element,classNAME){ // since 2.0.0
      return element.classList[contains](classNAME);
    },
  
    // selection methods
    getElementsByClassName = function(element,classNAME) { // returns Array
      return [].slice.call(element[getElementsByCLASSNAME]( classNAME ));
    },
    queryElement = function (selector, parent) {
      var lookUp = parent ? parent : DOC;
      return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
    },
    getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
      // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
      var firstChar = selector.charAt(0), selectorSubstring = selector.substr(1);
      if ( firstChar === '.' ) {// If selector is a class
        for ( ; element && element !== DOC; element = element[parentNode] ) { // Get closest match
          if ( queryElement(selector,element[parentNode]) !== null && hasClass(element,selectorSubstring) ) { return element; }
        }
      } else if ( firstChar === '#' ) { // If selector is an ID
        for ( ; element && element !== DOC; element = element[parentNode] ) { // Get closest match
          if ( element.id === selectorSubstring ) { return element; }
        }
      }
      return false;
    },
  
    // event attach jQuery style / trigger  since 1.2.0
    on = function (element, event, handler, options) {
      options = options || false;
      element.addEventListener(event, handler, options);
    },
    off = function(element, event, handler, options) {
      options = options || false;
      element.removeEventListener(event, handler, options);
    },
    one = function (element, event, handler, options) { // one since 2.0.4
      on(element, event, function handlerWrapper(e){
        if (e[target] === element) {
          handler(e);
          off(element, event, handlerWrapper, options);
        }
      }, options);
    },
    // determine support for passive events
    supportPassive = (function(){
      // Test via a getter in the options object to see if the passive property is accessed
      var result = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          get: function() {
            result = true;
          }
        });
        one(globalObject, null, null, opts);
      } catch (e) {}
  
      return result;
    }()),
    // event options
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
    passiveHandler = supportPassive ? { passive: true } : false,
    // transitions
    getTransitionDurationFromElement = function(element) {
      var duration = supportTransitions ? globalObject[getComputedStyle](element)[transitionDuration] : 0;
      duration = parseFloat(duration);
      duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
      return duration; // we take a short offset to make sure we fire on the next frame after animation
    },
    emulateTransitionEnd = function(element,handler){ // emulateTransitionEnd since 2.0.4
      var called = 0, duration = getTransitionDurationFromElement(element);
      duration ? one(element, transitionEndEvent, function(e){ !called && handler(e), called = 1; })
               : setTimeout(function() { !called && handler(), called = 1; }, 17);
    },
    bootstrapCustomEvent = function (eventName, componentName, related) {
      var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
      OriginalCustomEvent.relatedTarget = related;
      return OriginalCustomEvent;
    },
    dispatchCustomEvent = function(customEvent){
      this.dispatchEvent(customEvent);
    },
  
    // tooltip / popover stuff
    getScroll = function() { // also Affix and ScrollSpy uses it
      return {
        y : globalObject.pageYOffset || HTML[scrollTop],
        x : globalObject.pageXOffset || HTML[scrollLeft]
      }
    },
    styleTip = function(link,element,position,parent) { // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
      var elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] },
          windowWidth = (HTML[clientWidth] || DOC[body][clientWidth]),
          windowHeight = (HTML[clientHeight] || DOC[body][clientHeight]),
          rect = link[getBoundingClientRect](),
          scroll = parent === DOC[body] ? getScroll() : { x: parent[offsetLeft] + parent[scrollLeft], y: parent[offsetTop] + parent[scrollTop] },
          linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
          isPopover = hasClass(element,'popover'),
          topPosition, leftPosition,
  
          arrow = queryElement('.arrow',element),
          arrowTop, arrowLeft, arrowWidth, arrowHeight,
  
          halfTopExceed = rect[top] + linkDimensions.h/2 - elementDimensions.h/2 < 0,
          halfLeftExceed = rect[left] + linkDimensions.w/2 - elementDimensions.w/2 < 0,
          halfRightExceed = rect[left] + elementDimensions.w/2 + linkDimensions.w/2 >= windowWidth,
          halfBottomExceed = rect[top] + elementDimensions.h/2 + linkDimensions.h/2 >= windowHeight,
          topExceed = rect[top] - elementDimensions.h < 0,
          leftExceed = rect[left] - elementDimensions.w < 0,
          bottomExceed = rect[top] + elementDimensions.h + linkDimensions.h >= windowHeight,
          rightExceed = rect[left] + elementDimensions.w + linkDimensions.w >= windowWidth;
  
      // recompute position
      position = (position === left || position === right) && leftExceed && rightExceed ? top : position; // first, when both left and right limits are exceeded, we fall back to top|bottom
      position = position === top && topExceed ? bottom : position;
      position = position === bottom && bottomExceed ? top : position;
      position = position === left && leftExceed ? right : position;
      position = position === right && rightExceed ? left : position;
  
      // update tooltip/popover class
      element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
  
      // we check the computed width & height and update here
      arrowWidth = arrow[offsetWidth]; arrowHeight = arrow[offsetHeight];
  
      // apply styling to tooltip or popover
      if ( position === left || position === right ) { // secondary|side positions
        if ( position === left ) { // LEFT
          leftPosition = rect[left] + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 );
        } else { // RIGHT
          leftPosition = rect[left] + scroll.x + linkDimensions.w;
        }
  
        // adjust top and arrow
        if (halfTopExceed) {
          topPosition = rect[top] + scroll.y;
          arrowTop = linkDimensions.h/2 - arrowWidth;
        } else if (halfBottomExceed) {
          topPosition = rect[top] + scroll.y - elementDimensions.h + linkDimensions.h;
          arrowTop = elementDimensions.h - linkDimensions.h/2 - arrowWidth;
        } else {
          topPosition = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2;
          arrowTop = elementDimensions.h/2 - (isPopover ? arrowHeight*0.9 : arrowHeight/2);
        }
      } else if ( position === top || position === bottom ) { // primary|vertical positions
        if ( position === top) { // TOP
          topPosition =  rect[top] + scroll.y - elementDimensions.h - ( isPopover ? arrowHeight : 0 );
        } else { // BOTTOM
          topPosition = rect[top] + scroll.y + linkDimensions.h;
        }
        // adjust left | right and also the arrow
        if (halfLeftExceed) {
          leftPosition = 0;
          arrowLeft = rect[left] + linkDimensions.w/2 - arrowWidth;
        } else if (halfRightExceed) {
          leftPosition = windowWidth - elementDimensions.w*1.01;
          arrowLeft = elementDimensions.w - ( windowWidth - rect[left] ) + linkDimensions.w/2 - arrowWidth/2;
        } else {
          leftPosition = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2;
          arrowLeft = elementDimensions.w/2 - ( isPopover ? arrowWidth : arrowWidth/2 );
        }
      }
  
      // apply style to tooltip/popover and its arrow
      element[style][top] = topPosition + 'px';
      element[style][left] = leftPosition + 'px';
  
      arrowTop && (arrow[style][top] = arrowTop + 'px');
      arrowLeft && (arrow[style][left] = arrowLeft + 'px');
    };
  
  BSN.version = '2.0.28';
  
  /* Native JavaScript for Bootstrap 4 | Alert
  -------------------------------------------*/
  
  // ALERT DEFINITION
  // ================
  var Alert = function( element ) {
  
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringAlert] && element[stringAlert].destroy();
  
    // bind, target alert, duration and stuff
    var self = this, component = 'alert',
      // custom events
      closeCustomEvent = bootstrapCustomEvent(closeEvent, component),
      closedCustomEvent = bootstrapCustomEvent(closedEvent, component),
      alert = getClosest(element,'.'+component),
      triggerHandler = function(){ hasClass(alert,'fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler(); },
      // handlers
      clickHandler = function(e){
        alert = getClosest(e[target],'.'+component);
        element = queryElement('['+dataDismiss+'="'+component+'"]',alert);
        element && alert && (element === e[target] || element[contains](e[target])) && self.close();
      },
      transitionEndHandler = function(){
        off(element, clickEvent, clickHandler); // detach it's listener
        alert[parentNode].removeChild(alert);
        dispatchCustomEvent.call(alert,closedCustomEvent);
      };
    
    // public method
    self.close = function() {
      if ( alert && element && hasClass(alert,showClass) ) {
        dispatchCustomEvent.call(alert,closeCustomEvent);
        if ( closeCustomEvent[defaultPrevented] ) return;
        self.destroy();
      }
    };
    self.destroy = function() {
      removeClass(alert,showClass);
      alert && triggerHandler();
      off(element, clickEvent, clickHandler);
      delete element[stringAlert];
    };
  
    // init
    if ( !(stringAlert in element ) ) { // prevent adding event handlers twice
      on(element, clickEvent, clickHandler);
    }
    element[stringAlert] = self;
  };
  
  // ALERT DATA API
  // ==============
  supports[push]([stringAlert, Alert, '['+dataDismiss+'="alert"]']);
  
  
  /* Native JavaScript for Bootstrap 4 | Button
  ---------------------------------------------*/
  
  // BUTTON DEFINITION
  // ===================
  var Button = function( element ) {
  
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringButton] && element[stringButton].destroy();
  
    // bind
    var self = this,
        // constant
        toggled = false, // toggled makes sure to prevent triggering twice the change.bs.button events
  
        // strings
        component = 'button',
        checked = 'checked',
        LABEL = 'LABEL',
        INPUT = 'INPUT',
  
        // changeEvent
        changeCustomEvent = bootstrapCustomEvent(changeEvent, component),
  
        // private methods
        keyHandler = function(e){ 
          var key = e.which || e.keyCode;
          key === 32 && e[target] === DOC.activeElement && toggle(e);
        },
        preventScroll = function(e){ 
          var key = e.which || e.keyCode;
          key === 32 && e[preventDefault]();
        },
        toggle = function(e) {
          var label = e[target].tagName === LABEL ? e[target] : e[target][parentNode].tagName === LABEL ? e[target][parentNode] : null; // the .btn label
          
          if ( !label ) return; //react if a label or its immediate child is clicked
  
          var labels = getElementsByClassName(label[parentNode],'btn'), // all the button group buttons
            input = label[getElementsByTagName](INPUT)[0];
  
          if ( !input ) return; // return if no input found
  
          dispatchCustomEvent.call(input, changeCustomEvent); // trigger the change for the input
          dispatchCustomEvent.call(element, changeCustomEvent); // trigger the change for the btn-group
  
          // manage the dom manipulation
          if ( input.type === 'checkbox' ) { //checkboxes
            if ( changeCustomEvent[defaultPrevented] ) return; // discontinue when defaultPrevented is true
  
            if ( !input[checked] ) {
              addClass(label,active);
              input[getAttribute](checked);
              input[setAttribute](checked,checked);
              input[checked] = true;
            } else {
              removeClass(label,active);
              input[getAttribute](checked);
              input.removeAttribute(checked);
              input[checked] = false;
            }
  
            if (!toggled) { // prevent triggering the event twice
              toggled = true;
            }
          }
  
          if ( input.type === 'radio' && !toggled ) { // radio buttons
            if ( changeCustomEvent[defaultPrevented] ) return;
            // don't trigger if already active (the OR condition is a hack to check if the buttons were selected with key press and NOT mouse click)
            if ( !input[checked] || (e.screenX === 0 && e.screenY == 0) ) {
              addClass(label,active);
              addClass(label,focusEvent);
              input[setAttribute](checked,checked);
              input[checked] = true;
  
              toggled = true;
              for (var i = 0, ll = labels[length]; i<ll; i++) {
                var otherLabel = labels[i], otherInput = otherLabel[getElementsByTagName](INPUT)[0];
                if ( otherLabel !== label && hasClass(otherLabel,active) )  {
                  dispatchCustomEvent.call(otherInput, changeCustomEvent); // trigger the change
                  removeClass(otherLabel,active);
                  otherInput.removeAttribute(checked);
                  otherInput[checked] = false;
                }
              }
            }
          }
          setTimeout( function() { toggled = false; }, 50 );
        },
        focusHandler = function(e) {
          addClass(e[target][parentNode],focusEvent);
        },
        blurHandler = function(e) {
          removeClass(e[target][parentNode],focusEvent);
        },
        toggleEvents = function(action) {
          action( element, clickEvent, toggle );
          action( element, keyupEvent, keyHandler ), action( element, keydownEvent, preventScroll );
      
          var allBtns = getElementsByClassName(element, 'btn');
          for (var i=0; i<allBtns.length; i++) {
            var input = allBtns[i][getElementsByTagName](INPUT)[0];
            action( input, focusEvent, focusHandler), action( input, 'blur', blurHandler);
          }
        };
  
    // public method
    self.destroy = function() {
      toggleEvents(off);
      delete element[stringButton];
    }
  
    // init
    if ( !element[stringButton] ) { // prevent adding event handlers twice
      toggleEvents(on);
    }
  
    // activate items on load
    var labelsToACtivate = getElementsByClassName(element, 'btn'), lbll = labelsToACtivate[length];
    for (var i=0; i<lbll; i++) {
      !hasClass(labelsToACtivate[i],active) && queryElement('input:checked',labelsToACtivate[i]) 
                                            && addClass(labelsToACtivate[i],active);
    }
    element[stringButton] = self;
  };
  
  // BUTTON DATA API
  // =================
  supports[push]( [ stringButton, Button, '['+dataToggle+'="buttons"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | Carousel
  ----------------------------------------------*/
  
  // CAROUSEL DEFINITION
  // ===================
  var Carousel = function( element, options ) {
  
    // initialization element
    element = queryElement( element );
  
    // reset on re-init
    element[stringCarousel] && element[stringCarousel].destroy();
  
    // set options
    options = options || {};
  
    // bind, index and timer
    var self = this,
        index = element.index = 0, timer = element.timer = 0, 
        // DATA API
        intervalAttribute = element[getAttribute](dataInterval),
        intervalOption = options[interval],
        intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),  
        pauseData = element[getAttribute](dataPause) === hoverEvent || false,
        keyboardData = element[getAttribute](dataKeyboard) === 'true' || false,
      
        // strings
        component = 'carousel',
        paused = 'paused',
        direction = 'direction',
        carouselItem = 'carousel-item',
        dataSlideTo = 'data-slide-to',
  
        // custom events
        slideCustomEvent, slidCustomEvent; 
  
    self[keyboard] = options[keyboard] === true || keyboardData;
    self[pause] = (options[pause] === hoverEvent || pauseData) ? hoverEvent : false; // false / hover
  
    self[interval] = typeof intervalOption === 'number' ? intervalOption
                   : intervalOption === false || intervalData === 0 || intervalData === false ? 0
                   : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
                   : intervalData;
  
    // constants
    var isSliding = false, // isSliding prevents click event handlers when animation is running
      isTouch = false, startXPosition = null, currentXPosition = null, endXPosition = null, // touch and event coordinates
      slides = getElementsByClassName(element,carouselItem), total = slides[length],
      slideDirection = self[direction] = left,
      leftArrow = getElementsByClassName(element,component+'-control-prev')[0], 
      rightArrow = getElementsByClassName(element,component+'-control-next')[0],
      indicator = queryElement( '.'+component+'-indicators', element ),
      indicators = indicator && indicator[getElementsByTagName]( "LI" ) || [];
  
    // invalidate when not enough items
    if (total < 2) { return; }
  
    // handlers
    var pauseHandler = function () {
        if ( self[interval] !==false && !hasClass(element,paused) ) {
          addClass(element,paused);
          !isSliding && ( clearInterval(timer), timer = null );
        }
      },
      resumeHandler = function() {
        if ( self[interval] !== false && hasClass(element,paused) ) {
          removeClass(element,paused);
          !isSliding && ( clearInterval(timer), timer = null );
          !isSliding && self.cycle();
        }
      },
      indicatorHandler = function(e) {
        e[preventDefault]();
        if (isSliding) return;
  
        var eventTarget = e[target]; // event target | the current active item
  
        if ( eventTarget && !hasClass(eventTarget,active) && eventTarget[getAttribute](dataSlideTo) ) {
          index = parseInt( eventTarget[getAttribute](dataSlideTo), 10 );
        } else { return false; }
  
        self.slideTo( index ); //Do the slide
      },
      controlsHandler = function (e) {
        e[preventDefault]();
        if (isSliding) return;
  
        var eventTarget = e.currentTarget || e.srcElement;
  
        if ( eventTarget === rightArrow ) {
          index++;
        } else if ( eventTarget === leftArrow ) {
          index--;
        }
  
        self.slideTo( index ); //Do the slide
      },
      keyHandler = function (e) {
        if (isSliding) return;
        switch (e.which) {
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
      toggleEvents = function(action){
        if ( self[pause] && self[interval] ) {
          action( element, mouseHover[0], pauseHandler );
          action( element, mouseHover[1], resumeHandler );
          action( element, touchEvents.start, pauseHandler, passiveHandler );
          action( element, touchEvents.end, resumeHandler, passiveHandler );
        }
      
        slides[length] > 1 && action( element, touchEvents.start, touchDownHandler, passiveHandler );
    
        rightArrow && action( rightArrow, clickEvent, controlsHandler );
        leftArrow && action( leftArrow, clickEvent, controlsHandler );
      
        indicator && action( indicator, clickEvent, indicatorHandler );
        self[keyboard] && action( globalObject, keydownEvent, keyHandler );
      },
      // touch events
      toggleTouchEvents = function(action){
        action( element, touchEvents.move, touchMoveHandler, passiveHandler );
        action( element, touchEvents.end, touchEndHandler, passiveHandler );
      },  
      touchDownHandler = function(e) {
        if ( isTouch ) { return; } 
          
        startXPosition = parseInt(e.touches[0].pageX);
  
        if ( element.contains(e[target]) ) {
          isTouch = true;
          toggleTouchEvents(on);
        }
      },
      touchMoveHandler = function(e) {
        if ( !isTouch ) { e.preventDefault(); return; }
  
        currentXPosition = parseInt(e.touches[0].pageX);
        
        //cancel touch if more than one touches detected
        if ( e.type === 'touchmove' && e.touches[length] > 1 ) {
          e.preventDefault();
          return false;
        }
      },
      touchEndHandler = function(e) {
        if ( !isTouch || isSliding ) { return }
        
        endXPosition = currentXPosition || parseInt( e.touches[0].pageX );
  
        if ( isTouch ) {
          if ( (!element.contains(e[target]) || !element.contains(e.relatedTarget) ) && Math.abs(startXPosition - endXPosition) < 75 ) {
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
      isElementInScrollRange = function () {
        var rect = element[getBoundingClientRect](),
          viewportHeight = globalObject[innerHeight] || HTML[clientHeight]
        return rect[top] <= viewportHeight && rect[bottom] >= 0; // bottom && top
      },
      setActivePage = function( pageIndex ) { //indicators
        for ( var i = 0, icl = indicators[length]; i < icl; i++ ) {
          removeClass(indicators[i],active);
        }
        if (indicators[pageIndex]) addClass(indicators[pageIndex], active);
      };
  
  
    // public methods
    self.cycle = function() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
  
      timer = setInterval(function() {
        isElementInScrollRange() && (index++, self.slideTo( index ) );
      }, self[interval]);
    };
    self.slideTo = function( next ) {
      if (isSliding) return; // when controled via methods, make sure to check again      
      
      var activeItem = self.getActiveIndex(), // the current active
          orientation;
      
      // first return if we're on the same item #227
      if ( activeItem === next ) {
        return;
      // or determine slideDirection
      } else if  ( (activeItem < next ) || (activeItem === 0 && next === total -1 ) ) {
        slideDirection = self[direction] = left; // next
      } else if  ( (activeItem > next) || (activeItem === total - 1 && next === 0 ) ) {
        slideDirection = self[direction] = right; // prev
      }
  
      // find the right next index 
      if ( next < 0 ) { next = total - 1; } 
      else if ( next >= total ){ next = 0; }
  
      // update index
      index = next;
  
      orientation = slideDirection === left ? 'next' : 'prev'; // determine type
  
      slideCustomEvent = bootstrapCustomEvent(slideEvent, component, slides[next]);
      slidCustomEvent = bootstrapCustomEvent(slidEvent, component, slides[next]);
  
      dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
      if (slideCustomEvent[defaultPrevented]) return; // discontinue when prevented
      
      isSliding = true;
      clearInterval(timer);
      timer = null;
      setActivePage( next );
  
      if ( supportTransitions && hasClass(element,'slide') ) {
  
        addClass(slides[next],carouselItem +'-'+ orientation);
        slides[next][offsetWidth];
        addClass(slides[next],carouselItem +'-'+ slideDirection);
        addClass(slides[activeItem],carouselItem +'-'+ slideDirection);
  
        emulateTransitionEnd(slides[next], function(e) {
          var timeout = e && e[target] !== slides[next] ? e.elapsedTime*1000+100 : 20;
          
          isSliding && setTimeout(function(){
            isSliding = false;
  
            addClass(slides[next],active);
            removeClass(slides[activeItem],active);
  
            removeClass(slides[next],carouselItem +'-'+ orientation);
            removeClass(slides[next],carouselItem +'-'+ slideDirection);
            removeClass(slides[activeItem],carouselItem +'-'+ slideDirection);
  
            dispatchCustomEvent.call(element, slidCustomEvent);
  
            if ( !DOC.hidden && self[interval] && !hasClass(element,paused) ) {
              self.cycle();
            }
          }, timeout);
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
          dispatchCustomEvent.call(element, slidCustomEvent);
        }, 100 );
      }
    };
    self.getActiveIndex = function () {
      return slides[indexOf](getElementsByClassName(element,carouselItem+' active')[0]) || 0;
    };
    self.destroy = function () {
      toggleEvents(off);
      clearInterval(timer);
      delete element[stringCarousel];
    };
  
    // init
    if ( !element[stringCarousel] ) { // prevent adding event handlers twice
      toggleEvents(on);
    }
    // set first slide active if none
    if (self.getActiveIndex()<0) {
      slides[length] && addClass(slides[0],active);
      indicators[length] && setActivePage(0);
    }
    // start to cycle if set
    if ( self[interval] ){ self.cycle(); }
  
    element[stringCarousel] = self;
  };
  
  // CAROUSEL DATA API
  // =================
  supports[push]( [ stringCarousel, Carousel, '['+dataRide+'="carousel"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | Collapse
  -----------------------------------------------*/
  
  // COLLAPSE DEFINITION
  // ===================
  var Collapse = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringCollapse] && element[stringCollapse].destroy();
  
    // set options
    options = options || {};
  
    // bind, event targets and constants
    var self = this, 
      accordion = null, collapse = null,
      accordionData = element[getAttribute]('data-parent'),
      activeCollapse, activeElement,
  
      // component strings
      component = 'collapse',
      collapsed = 'collapsed',
      isAnimating = 'isAnimating',
  
      // custom events
      showCustomEvent = bootstrapCustomEvent(showEvent, component),
      shownCustomEvent = bootstrapCustomEvent(shownEvent, component),
      hideCustomEvent = bootstrapCustomEvent(hideEvent, component),
      hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component),
      
      // private methods
      openAction = function(collapseElement,toggle) {
        dispatchCustomEvent.call(collapseElement, showCustomEvent);
        if ( showCustomEvent[defaultPrevented] ) return;
        collapseElement[isAnimating] = true;
        addClass(collapseElement,collapsing);
        removeClass(collapseElement,component);
        collapseElement[style][height] = collapseElement[scrollHeight] + 'px';
        
        emulateTransitionEnd(collapseElement, function() {
          collapseElement[isAnimating] = false;
          collapseElement[setAttribute](ariaExpanded,'true');
          toggle[setAttribute](ariaExpanded,'true');
          removeClass(collapseElement,collapsing);
          addClass(collapseElement, component);
          addClass(collapseElement,showClass);
          collapseElement[style][height] = '';
          dispatchCustomEvent.call(collapseElement, shownCustomEvent);
        });
      },
      closeAction = function(collapseElement,toggle) {
        dispatchCustomEvent.call(collapseElement, hideCustomEvent);
        if ( hideCustomEvent[defaultPrevented] ) return;
        collapseElement[isAnimating] = true;
        collapseElement[style][height] = collapseElement[scrollHeight] + 'px'; // set height first
        removeClass(collapseElement,component);
        removeClass(collapseElement,showClass);
        addClass(collapseElement,collapsing);
        collapseElement[offsetWidth]; // force reflow to enable transition
        collapseElement[style][height] = '0px';
        
        emulateTransitionEnd(collapseElement, function() {
          collapseElement[isAnimating] = false;
          collapseElement[setAttribute](ariaExpanded,'false');
          toggle[setAttribute](ariaExpanded,'false');
          removeClass(collapseElement,collapsing);
          addClass(collapseElement,component);
          collapseElement[style][height] = '';
          dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
        });
      },
      getTarget = function() {
        var href = element.href && element[getAttribute]('href'),
          parent = element[getAttribute](dataTarget),
          id = href || ( parent && parent.charAt(0) === '#' ) && parent;
        return id && queryElement(id);
      };
    
    // public methods
    self.toggle = function(e) {
      e[preventDefault]();
      if (!hasClass(collapse,showClass)) { self.show(); } 
      else { self.hide(); }
    };
    self.hide = function() {
      if ( collapse[isAnimating] ) return;    
      closeAction(collapse,element);
      addClass(element,collapsed);
    };
    self.show = function() {
      if ( accordion ) {
        activeCollapse = queryElement('.'+component+'.'+showClass,accordion);
        activeElement = activeCollapse && (queryElement('['+dataTarget+'="#'+activeCollapse.id+'"]',accordion)
                      || queryElement('[href="#'+activeCollapse.id+'"]',accordion) );
      }
  
      if ( !collapse[isAnimating] || activeCollapse && !activeCollapse[isAnimating] ) {
        if ( activeElement && activeCollapse !== collapse ) {
          closeAction(activeCollapse,activeElement); 
          addClass(activeElement,collapsed);
        }
        openAction(collapse,element);
        removeClass(element,collapsed);
      }
    };
    self.destroy = function() {
      off(element, clickEvent, self.toggle);
      delete element[stringCollapse];
    }
  
    // init
    if ( !element[stringCollapse] ) { // prevent adding event handlers twice
      on(element, clickEvent, self.toggle);
    }
    collapse = getTarget();
    collapse[isAnimating] = false;  // when true it will prevent click handlers  
    accordion = queryElement(options.parent) || accordionData && getClosest(element, accordionData);
    element[stringCollapse] = self;
  };
  
  // COLLAPSE DATA API
  // =================
  supports[push]( [ stringCollapse, Collapse, '['+dataToggle+'="collapse"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | Dropdown
  ----------------------------------------------*/
  
  // DROPDOWN DEFINITION
  // ===================
  var Dropdown = function( element, option ) {
      
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringDropdown] && element[stringDropdown].destroy();
  
    // constants, event targets, strings
    var self = this,
      parent = element[parentNode],
      relatedTarget = null,
  
      // strings
      children = 'children',
      component = 'dropdown', 
      open = 'open',
  
      // custom events
      showCustomEvent, shownCustomEvent, hideCustomEvent, hiddenCustomEvent,
      
      menu = queryElement('.dropdown-menu', parent),
      menuItems = (function(){
        var set = menu[children], newSet = [];
        for ( var i=0; i<set[length]; i++ ){
          set[i][children][length] && (set[i][children][0].tagName === 'A' && newSet[push](set[i][children][0]));
          set[i].tagName === 'A' && newSet[push](set[i]);
        }
        return newSet;
      })(),
  
      // preventDefault on empty anchor links
      preventEmptyAnchor = function(anchor){
        (anchor.href && anchor.href.slice(-1) === '#' || anchor[parentNode] && anchor[parentNode].href 
          && anchor[parentNode].href.slice(-1) === '#') && this[preventDefault]();    
      },
  
      // toggle dismissible events
      toggleDismiss = function(){
        var type = element[open] ? on : off;
        type(DOC, clickEvent, dismissHandler); 
        type(DOC, keydownEvent, preventScroll);
        type(DOC, keyupEvent, keyHandler);
        type(DOC, focusEvent, dismissHandler, true);
      },
  
      // handlers
      dismissHandler = function(e) {
        var eventTarget = e[target], hasData = eventTarget && (eventTarget[getAttribute](dataToggle) 
                              || eventTarget[parentNode] && getAttribute in eventTarget[parentNode] 
                              && eventTarget[parentNode][getAttribute](dataToggle));
        if ( e.type === focusEvent && (eventTarget === element || eventTarget === menu || menu[contains](eventTarget) ) ) {
          return;
        }
        if ( (eventTarget === menu || menu[contains](eventTarget)) && (self.persist || hasData) ) { return; }
        else {
          relatedTarget = eventTarget === element || element[contains](eventTarget) ? element : null;
          hide();
        }
        preventEmptyAnchor.call(e,eventTarget);
      },
      clickHandler = function(e) {
        relatedTarget = element;
        show();
        preventEmptyAnchor.call(e,e[target]);
      },
      preventScroll = function(e){
        var key = e.which || e.keyCode;
        if( key === 38 || key === 40 ) { e[preventDefault](); }
      },
      keyHandler = function(e){
        var key = e.which || e.keyCode,
          activeItem = DOC.activeElement,
          idx = menuItems[indexOf](activeItem),
          isSameElement = activeItem === element,
          isInsideMenu = menu[contains](activeItem),
          isMenuItem = activeItem[parentNode] === menu || activeItem[parentNode][parentNode] === menu;          
  
        if ( isMenuItem ) { // navigate up | down
          idx = isSameElement ? 0 
                              : key === 38 ? (idx>1?idx-1:0)
                              : key === 40 ? (idx<menuItems[length]-1?idx+1:idx) : idx;
          menuItems[idx] && setFocus(menuItems[idx]);
        }
        if ( (menuItems[length] && isMenuItem // menu has items
              || !menuItems[length] && (isInsideMenu || isSameElement)  // menu might be a form
              || !isInsideMenu ) // or the focused element is not in the menu at all
              && element[open] && key === 27  // menu must be open
        ) {
          self.toggle();
          relatedTarget = null;
        }
      },
  
      // private methods
      show = function() {
        showCustomEvent = bootstrapCustomEvent(showEvent, component, relatedTarget);
        dispatchCustomEvent.call(parent, showCustomEvent);
        if ( showCustomEvent[defaultPrevented] ) return;
  
        addClass(menu,showClass);
        addClass(parent,showClass);
        element[setAttribute](ariaExpanded,true);
        element[open] = true;
        off(element, clickEvent, clickHandler);
        setTimeout(function(){
          setFocus( menu[getElementsByTagName]('INPUT')[0] || element ); // focus the first input item | element
          toggleDismiss();
          shownCustomEvent = bootstrapCustomEvent( shownEvent, component, relatedTarget);
          dispatchCustomEvent.call(parent, shownCustomEvent);        
        },1);
      },
      hide = function() {
        hideCustomEvent = bootstrapCustomEvent(hideEvent, component, relatedTarget);
        dispatchCustomEvent.call(parent, hideCustomEvent);
        if ( hideCustomEvent[defaultPrevented] ) return;
  
        removeClass(menu,showClass);
        removeClass(parent,showClass);
        element[setAttribute](ariaExpanded,false);
        element[open] = false;
        toggleDismiss();
        setFocus(element);
        setTimeout(function(){ on(element, clickEvent, clickHandler); },1);
  
        hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component, relatedTarget);
        dispatchCustomEvent.call(parent, hiddenCustomEvent);
      };
  
    // set initial state to closed
    element[open] = false;
  
    // public methods
    self.toggle = function() {
      if (hasClass(parent,showClass) && element[open]) { hide(); } 
      else { show(); }
    };
    self.destroy = function(){
      if (hasClass(parent,showClass) && element[open]) { hide(); }
      off(element, clickEvent, clickHandler);
      delete element[stringDropdown];
    };
  
    // init
    if ( !element[stringDropdown] ) { // prevent adding event handlers twice
      !tabindex in menu && menu[setAttribute](tabindex, '0'); // Fix onblur on Chrome | Safari
      on(element, clickEvent, clickHandler);
    }
  
    // set option
    self.persist = option === true || element[getAttribute]('data-persist') === 'true' || false;
  
    element[stringDropdown] = self;
  };
  
  // DROPDOWN DATA API
  // =================
  supports[push]( [stringDropdown, Dropdown, '['+dataToggle+'="dropdown"]'] );
  
  
  /* Native JavaScript for Bootstrap 4 | Modal
  -------------------------------------------*/
  
  // MODAL DEFINITION
  // ===============
  var Modal = function(element, options) { // element can be the modal/triggering button
  
    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement(element);
  
    // bind
    var self = this,
      // strings
      component = 'modal',
      staticString = 'static',
      modalTrigger = 'modalTrigger',
      paddingRight = 'paddingRight',
      modalBackdropString = 'modal-backdrop',
      isAnimating = 'isAnimating',
      // custom events
      showCustomEvent, shownCustomEvent, hideCustomEvent, hiddenCustomEvent,
      // determine modal, triggering element
      btnCheck = element[getAttribute](dataTarget)||element[getAttribute]('href'),
      checkModal = queryElement( btnCheck ),
      modal = hasClass(element,component) ? element : checkModal;
  
    if ( hasClass(element, component) ) { element = null; } // modal is now independent of it's triggering element
  
    if ( !modal ) { return; } // invalidate
  
    // reset on re-init
    element && element[stringModal] && element[stringModal].destroy();
    modal[stringModal] && modal[stringModal].destroy();
  
    // set options
    options = options || {};
  
    self[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
    self[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
    self[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : self[backdrop];
    self[animation] = hasClass(modal, 'fade') ? true : false;
    self[content]  = options[content]; // JavaScript only
  
    // set an initial state of the modal
    modal[isAnimating] = false;
    
    // constants, event targets and other vars
    var relatedTarget = null,
      scrollBarWidth, overlay, overlayDelay,
  
      // also find fixed-top / fixed-bottom items
      fixedItems = getElementsByClassName(HTML,fixedTop).concat(getElementsByClassName(HTML,fixedBottom)),
  
      // private methods
      setScrollbar = function () {
        var openModal = hasClass(DOC[body],component+'-open'),
          bodyStyle = globalObject[getComputedStyle](DOC[body]),
          bodyPad = parseInt((bodyStyle[paddingRight]), 10), itemPad;
  
        DOC[body][style][paddingRight] = (bodyPad + (openModal?0:scrollBarWidth)) + 'px';
        modal[style][paddingRight] = (scrollBarWidth?scrollBarWidth+'px':'');
        if (fixedItems[length]){
          for (var i = 0; i < fixedItems[length]; i++) {
            itemPad = globalObject[getComputedStyle](fixedItems[i])[paddingRight];
            fixedItems[i][style][paddingRight] = ( parseInt(itemPad) + (openModal?0:scrollBarWidth) ) + 'px';
          }
        }
      },
      resetScrollbar = function () {
        DOC[body][style][paddingRight] = '';
        modal[style][paddingRight] = '';
        if (fixedItems[length]){
          for (var i = 0; i < fixedItems[length]; i++) {
            fixedItems[i][style][paddingRight] = '';
          }
        }
      },
      measureScrollbar = function () { // thx walsh
        var scrollDiv = DOC[createElement]('div'), widthValue;
        scrollDiv.className = component+'-scrollbar-measure'; // this is here to stay
        DOC[body][appendChild](scrollDiv);
        widthValue = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
        DOC[body].removeChild(scrollDiv);
        return widthValue;
      },
      checkScrollbar = function () {
        scrollBarWidth = measureScrollbar();
      },
      createOverlay = function() {
        var newOverlay = DOC[createElement]('div');
        overlay = queryElement('.'+modalBackdropString);
  
        if ( overlay === null ) {
          newOverlay[setAttribute]('class', modalBackdropString + (self[animation] ? ' fade' : ''));
          overlay = newOverlay;
          DOC[body][appendChild](overlay);
        }
        return overlay;
      },
      removeOverlay = function() {
        overlay = queryElement('.'+modalBackdropString);
        if ( overlay && !getElementsByClassName(DOC,component+' '+showClass)[0] ) {
          DOC[body].removeChild(overlay); overlay = null;       
        }
        overlay === null && (removeClass(DOC[body],component+'-open'), resetScrollbar());
      },
      toggleEvents = function(action){
        action(globalObject, resizeEvent, self.update, passiveHandler);
        action(modal, clickEvent, dismissHandler);
        action(DOC, keydownEvent, keyHandler);
      },
      // triggers
      beforeShow = function(){
        modal[style].display = 'block'; 
  
        checkScrollbar();
        setScrollbar();
        !getElementsByClassName(DOC,component+' '+showClass)[0] && addClass(DOC[body],component+'-open');
  
        addClass(modal,showClass);
        modal[setAttribute](ariaHidden, false);
  
        hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
      },    
      triggerShow = function() {
        setFocus(modal);
        modal[isAnimating] = false;
  
        toggleEvents(on);
  
        shownCustomEvent = bootstrapCustomEvent(shownEvent, component, relatedTarget);
        dispatchCustomEvent.call(modal, shownCustomEvent);
      },
      triggerHide = function() {
        modal[style].display = '';
        element && (setFocus(element));
  
        overlay = queryElement('.'+modalBackdropString);
  
        if (overlay && hasClass(overlay,showClass) && !getElementsByClassName(DOC,component+' '+showClass)[0]) {
          removeClass(overlay,showClass);
          emulateTransitionEnd(overlay,removeOverlay);
        } else {
          removeOverlay();
        }
  
        toggleEvents(off);
  
        modal[isAnimating] = false;
  
        hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component);
        dispatchCustomEvent.call(modal, hiddenCustomEvent);
      },
      // handlers
      clickHandler = function(e) {
        if ( modal[isAnimating] ) return;
  
        var clickTarget = e[target];
        clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
        if ( clickTarget === element && !hasClass(modal,showClass) ) {
          modal[modalTrigger] = element;
          relatedTarget = element;
          self.show();
          e[preventDefault]();
        }
      },
      keyHandler = function(e) {
        if ( modal[isAnimating] ) return;
  
        if (self[keyboard] && e.which == 27 && hasClass(modal,showClass) ) {
          self.hide();
        }
      },
      dismissHandler = function(e) {
        if ( modal[isAnimating] ) return;
        var clickTarget = e[target];
  
        if ( hasClass(modal,showClass) && ( clickTarget[parentNode][getAttribute](dataDismiss) === component
            || clickTarget[getAttribute](dataDismiss) === component
            || clickTarget === modal && self[backdrop] !== staticString ) ) {
          self.hide(); relatedTarget = null;
          e[preventDefault]();
        }
      };
  
    // public methods
    self.toggle = function() {
      if ( hasClass(modal,showClass) ) {self.hide();} else {self.show();}
    };
    self.show = function() {
      if ( hasClass(modal,showClass) ) {return}
  
      showCustomEvent = bootstrapCustomEvent(showEvent, component, relatedTarget);
      dispatchCustomEvent.call(modal, showCustomEvent);
  
      if ( showCustomEvent[defaultPrevented] ) return;
  
      modal[isAnimating] = true;
  
      // we elegantly hide any opened modal
      var currentOpen = getElementsByClassName(DOC,component+' '+showClass)[0];
      if (currentOpen && currentOpen !== modal) {
        modalTrigger in currentOpen && currentOpen[modalTrigger][stringModal].hide();
        stringModal in currentOpen && currentOpen[stringModal].hide();
      }
  
      if ( self[backdrop] ) {
        overlay = createOverlay();
      }
  
      if ( overlay && !currentOpen && !hasClass(overlay,showClass) ) {
        overlay[offsetWidth]; // force reflow to enable trasition
        overlayDelay = getTransitionDurationFromElement(overlay);
        addClass(overlay, showClass);
      }
  
      !currentOpen ? setTimeout( beforeShow, overlay && overlayDelay ? overlayDelay:0 ) : beforeShow();
    };
    self.hide = function() {
      if ( !hasClass(modal,showClass) ) {return}
  
      hideCustomEvent = bootstrapCustomEvent( hideEvent, component);
      dispatchCustomEvent.call(modal, hideCustomEvent);
      if ( hideCustomEvent[defaultPrevented] ) return;
  
      modal[isAnimating] = true;    
  
      removeClass(modal,showClass);
      modal[setAttribute](ariaHidden, true);
  
      hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
    };
    self.setContent = function( content ) {
      queryElement('.'+component+'-content',modal)[innerHTML] = content;
    };
    self.update = function() {
      if (hasClass(modal,showClass)) {
        checkScrollbar();
        setScrollbar();
      }
    };
    self.destroy = function() {
      self.hide();
      if (!!element) {off(element, clickEvent, clickHandler); delete element[stringModal]; } 
      else {delete modal[stringModal];}
    };
  
    // init
    // prevent adding event handlers over and over
    // modal is independent of a triggering element
    if ( !!element && !element[stringModal] ) {
      on(element, clickEvent, clickHandler);
    }
    if ( !!self[content] ) { self.setContent( self[content].trim() ); }
    if (element) { element[stringModal] = self; modal[modalTrigger] = element; }
    else { modal[stringModal] = self; }
  };
  
  // DATA API
  supports[push]( [ stringModal, Modal, '['+dataToggle+'="modal"]' ] );
  
  /* Native JavaScript for Bootstrap 4 | Popover
  ----------------------------------------------*/
  
  // POPOVER DEFINITION
  // ==================
  var Popover = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringPopover] && element[stringPopover].destroy();  
  
    // set options
    options = options || {};
  
    // bind, popover and timer
    var self = this, popover = null, timer = 0,
        // DATA API
        triggerData = element[getAttribute](dataTrigger), // click / hover / focus
        animationData = element[getAttribute](dataAnimation), // true / false
        placementData = element[getAttribute](dataPlacement),
        dismissibleData = element[getAttribute](dataDismissible),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
  
        // internal strings
        component = 'popover',
        trigger = 'trigger',
        div = 'div',
        fade = 'fade',
        headerClass = component+'-header',
        bodyClass = component+'-body',
        dataContent = 'data-content',
        dismissible = 'dismissible',
        closeBtn = '<button type="button" class="close">×</button>',
        // custom events
        showCustomEvent = bootstrapCustomEvent(showEvent, component),
        shownCustomEvent = bootstrapCustomEvent(shownEvent, component),
        hideCustomEvent = bootstrapCustomEvent(hideEvent, component),
        hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component),
  
        // check container
        containerElement = queryElement(options[container]),
        containerDataElement = queryElement(containerData),       
        
        // maybe the element is inside a modal
        modal = getClosest(element,'.modal'),
        
        // maybe the element is inside a fixed navbar
        navbarFixedTop = getClosest(element,'.'+fixedTop),
        navbarFixedBottom = getClosest(element,'.'+fixedBottom);
  
    // set instance options
    self[template] = options[template] ? options[template] : null; // JavaScript only
    self[trigger] = options[trigger] ? options[trigger] : triggerData || hoverEvent;
    self[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    self[placement] = options[placement] ? options[placement] : placementData || top;
    self[delay] = parseInt(options[delay] || delayData) || 200;
    self[dismissible] = options[dismissible] || dismissibleData === 'true' ? true : false;
    self[container] = containerElement ? containerElement 
                    : containerDataElement ? containerDataElement 
                    : navbarFixedTop ? navbarFixedTop
                    : navbarFixedBottom ? navbarFixedBottom
                    : modal ? modal : DOC[body];
    
    // title and content
    var titleString = options.title || element[getAttribute](dataTitle) || null,
        contentString = options.content || element[getAttribute](dataContent) || null,
        placementClass = 'bs-' + component+'-'+self[placement];
  
    if ( !contentString && !self[template] ) return; // invalidate
  
    // private methods
    // handlers
    var dismissibleHandler = function(e) {
        if (popover !== null && e[target] === queryElement('.close',popover)) {
          self.hide();
        }
      },
  
      // private methods
      removePopover = function() {
        self[container].removeChild(popover);
        timer = null; popover = null; 
      },
      createPopover = function() {
        titleString = options.title || element[getAttribute](dataTitle);
        contentString = options.content || element[getAttribute](dataContent);
        // fixing https://github.com/thednp/bootstrap.native/issues/233
        contentString = !!contentString ? contentString.trim() : null;
  
        popover = DOC[createElement](div);
  
        // popover arrow
        var popoverArrow = DOC[createElement](div);
        addClass(popoverArrow,'arrow');
        popover[appendChild](popoverArrow);
  
        if ( contentString !== null && self[template] === null ) { //create the popover from data attributes
  
          popover[setAttribute]('role','tooltip');     
  
          if (titleString !== null) {
            var popoverTitle = DOC[createElement]('h3');
            addClass(popoverTitle,headerClass);
            popoverTitle[innerHTML] = self[dismissible] ? titleString + closeBtn : titleString;
            popover[appendChild](popoverTitle);
          }
  
          //set popover content
          var popoverBody = DOC[createElement](div);
          addClass(popoverBody,bodyClass);
          popoverBody[innerHTML] = self[dismissible] && titleString === null ? contentString + closeBtn : contentString;
          popover[appendChild](popoverBody);
  
        } else {  // or create the popover from template
          var popoverTemplate = DOC[createElement](div);
          popoverTemplate[innerHTML] = self[template].trim();
          popover.className = popoverTemplate.firstChild.className;
          popover[innerHTML] = popoverTemplate.firstChild[innerHTML];
  
          var popoverHeader = queryElement('.'+headerClass,popover),
              popoverBody = queryElement('.'+bodyClass,popover);
  
          titleString && popoverHeader && (popoverHeader[innerHTML] = titleString.trim());
          contentString && popoverBody && (popoverBody[innerHTML] = contentString.trim());
        }
  
        //append to the container
        self[container][appendChild](popover);
        popover[style].display = 'block';
        !hasClass(popover, component) && addClass(popover, component);
        !hasClass(popover, self[animation]) && addClass(popover, self[animation]);
        !hasClass(popover, placementClass) && addClass(popover, placementClass);      
      },
      showPopover = function () {
        !hasClass(popover,showClass) && ( addClass(popover,showClass) );
      },
      updatePopover = function() {
        styleTip(element, popover, self[placement], self[container]);
      },
      toggleEvents = function(action){
        if (self[trigger] === hoverEvent) {
          action( element, mouseHover[0], self.show );
          if (!self[dismissible]) { action( element, mouseHover[1], self.hide ); }
        } else if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
          action( element, self[trigger], self.toggle );
        }
      },
  
      // event toggle
      dismissHandlerToggle = function(action){
        if (clickEvent == self[trigger] || 'focus' == self[trigger]) {
          !self[dismissible] && action( element, 'blur', self.hide );
        }
        self[dismissible] && action( DOC, clickEvent, dismissibleHandler );     
        action( globalObject, resizeEvent, self.hide, passiveHandler );
      },
  
      // triggers
      showTrigger = function() {
        dismissHandlerToggle(on);
        dispatchCustomEvent.call(element, shownCustomEvent);
      },
      hideTrigger = function() {
        dismissHandlerToggle(off);
        removePopover();
        dispatchCustomEvent.call(element, hiddenCustomEvent);
      };
  
    // public methods / handlers
    self.toggle = function() {
      if (popover === null) { self.show(); } 
      else { self.hide(); }
    };
    self.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover === null) {
          dispatchCustomEvent.call(element, showCustomEvent);
          if ( showCustomEvent[defaultPrevented] ) return;
  
          createPopover();
          updatePopover();
          showPopover();
          !!self[animation] ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
        }
      }, 20 );
    };
    self.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (popover && popover !== null && hasClass(popover,showClass)) {
          dispatchCustomEvent.call(element, hideCustomEvent);
          if ( hideCustomEvent[defaultPrevented] ) return;
          removeClass(popover,showClass);
          !!self[animation] ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
        }
      }, self[delay] );
    };
    self.destroy = function() {
      self.hide();
      toggleEvents(off);
      delete element[stringPopover];
    };
  
    // init
    if ( !element[stringPopover] ) { // prevent adding event handlers twice
      toggleEvents(on);
    }
  
    element[stringPopover] = self;
  };
  
  // POPOVER DATA API
  // ================
  supports[push]( [ stringPopover, Popover, '['+dataToggle+'="popover"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | ScrollSpy
  -----------------------------------------------*/
  
  // SCROLLSPY DEFINITION
  // ====================
  var ScrollSpy = function(element, options) {
  
    // initialization element, the element we spy on
    element = queryElement(element);
  
    // reset on re-init
    element[stringScrollSpy] && element[stringScrollSpy].destroy();
  
    // DATA API
    var targetData = queryElement(element[getAttribute](dataTarget)),
        offsetData = element[getAttribute]('data-offset');
  
    // set options
    options = options || {};
  
    // invalidate
    if ( !options[target] && !targetData ) { return; } 
  
    // event targets, constants
    var self = this,
        spyTarget = options[target] && queryElement(options[target]) || targetData,
        links = spyTarget && spyTarget[getElementsByTagName]('A'),
        offset = parseInt(options['offset'] || offsetData) || 10,      
        items = [], targetItems = [], scrollOffset,
        scrollTarget = element[offsetHeight] < element[scrollHeight] ? element : globalObject, // determine which is the real scrollTarget
        isWindow = scrollTarget === globalObject;  
  
    // populate items and targets
    for (var i=0, il=links[length]; i<il; i++) {
      var href = links[i][getAttribute]('href'), 
          targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);
      if ( !!targetItem ) {
        items[push](links[i]);
        targetItems[push](targetItem);
      }
    }
  
    // private methods
    var updateItem = function(index) {
        var item = items[index],
          targetItem = targetItems[index], // the menu item targets this element
          dropdown = item[parentNode][parentNode],
          dropdownLink = hasClass(dropdown,'dropdown') && dropdown[getElementsByTagName]('A')[0],
          targetRect = isWindow && targetItem[getBoundingClientRect](),
  
          isActive = hasClass(item,active) || false,
  
          topEdge = (isWindow ? targetRect[top] + scrollOffset : targetItem[offsetTop]) - offset,
          bottomEdge = isWindow ? targetRect[bottom] + scrollOffset - offset : targetItems[index+1] ? targetItems[index+1][offsetTop] - offset : element[scrollHeight],
  
          inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;
  
        if ( !isActive && inside ) {
          if ( !hasClass(item,active) ) {
            addClass(item,active);
            if (dropdownLink && !hasClass(dropdownLink,active) ) {
              addClass(dropdownLink,active);
            }
            dispatchCustomEvent.call(element, bootstrapCustomEvent( 'activate', 'scrollspy', items[index]));
          }
        } else if ( !inside ) {
          if ( hasClass(item,active) ) {
            removeClass(item,active);
            if (dropdownLink && hasClass(dropdownLink,active) && !getElementsByClassName(item[parentNode],active).length  ) {
              removeClass(dropdownLink,active);
            }
          }
        } else if ( !inside && !isActive || isActive && inside ) {
          return;
        }
      },
      toggleEvents = function(action){
        action( scrollTarget, scrollEvent, self.refresh, passiveHandler );
        action( globalObject, resizeEvent, self.refresh, passiveHandler );
      },
      updateItems = function(){
        scrollOffset = isWindow ? getScroll().y : element[scrollTop];
        for (var index=0, itl=items[length]; index<itl; index++) {
          updateItem(index)
        }
      };
  
    // public method
    self.refresh = function() {
      updateItems();
    }
    self.destroy = function() {
      toggleEvents(off);
      delete element[stringScrollSpy];
    }
  
    // init
    if ( !element[stringScrollSpy] ) { // prevent adding event handlers twice
      toggleEvents(on);
    }
    self.refresh();
    element[stringScrollSpy] = self;
  };
  
  // SCROLLSPY DATA API
  // ==================
  supports[push]( [ stringScrollSpy, ScrollSpy, '['+dataSpy+'="scroll"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | Tab
  -----------------------------------------*/
  
  // TAB DEFINITION
  // ==============
  var Tab = function( element, options ) {
  
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringTab] && element[stringTab].destroy();  
  
    // bind
    var self = this,
        // DATA API
        heightData = element[getAttribute](dataHeight),
      
        // strings
        component = 'tab', height = 'height', float = 'float', isAnimating = 'isAnimating',
        // custom events
        showCustomEvent, shownCustomEvent, hideCustomEvent, hiddenCustomEvent;
        
    // set options
    options = options || {};
    self[height] = !supportTransitions || (options[height] === false || heightData === 'false') ? false : true;
  
    // event targets
    var tabs = getClosest(element,'.nav'), next,
      tabsContentContainer = false,
      dropdown = tabs && queryElement('.dropdown-toggle',tabs),
      activeTab, activeContent, nextContent, containerHeight, equalContents, nextHeight,
      
      // trigger
      triggerEnd = function(){
        tabsContentContainer[style][height] = '';
        removeClass(tabsContentContainer,collapsing);
        tabs[isAnimating] = false;
      },
      triggerShow = function() {
        if (tabsContentContainer) { // height animation
          if ( equalContents ) {
            triggerEnd();
          } else {
            setTimeout(function(){ // enables height animation
              tabsContentContainer[style][height] = nextHeight + 'px'; // height animation
              tabsContentContainer[offsetWidth];
              emulateTransitionEnd(tabsContentContainer, triggerEnd);
            },50);
          }
        } else {
          tabs[isAnimating] = false; 
        }
        shownCustomEvent = bootstrapCustomEvent(shownEvent, component, activeTab);
        dispatchCustomEvent.call(next, shownCustomEvent);
      },
      triggerHide = function() {
        if (tabsContentContainer) {
          activeContent[style][float] = left;
          nextContent[style][float] = left;        
          containerHeight = activeContent[scrollHeight];
        }
  
        showCustomEvent = bootstrapCustomEvent(showEvent, component, activeTab);
        hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component, next);
  
        dispatchCustomEvent.call(next, showCustomEvent);
        if ( showCustomEvent[defaultPrevented] ) return;
          
        addClass(nextContent,active);
  
        removeClass(activeContent,active);
  
        if (tabsContentContainer) {
          nextHeight = nextContent[scrollHeight];
          equalContents = nextHeight === containerHeight;
          addClass(tabsContentContainer,collapsing);
          tabsContentContainer[style][height] = containerHeight + 'px'; // height animation
          tabsContentContainer[offsetHeight];
          activeContent[style][float] = '';
          nextContent[style][float] = '';
        }
  
        if ( hasClass(nextContent, 'fade') ) {
          setTimeout(function(){
            addClass(nextContent,showClass);
            emulateTransitionEnd(nextContent,triggerShow);
          },20);
        } else { triggerShow(); }
  
        dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
      };
  
    if (!tabs) return; // invalidate
  
    // set default animation state
    tabs[isAnimating] = false;    
          
    // private methods
    var getActiveTab = function() {
        var activeTabs = getElementsByClassName(tabs,active), activeTab;
        if ( activeTabs[length] === 1 && !hasClass(activeTabs[0][parentNode],'dropdown') ) {
          activeTab = activeTabs[0];
        } else if ( activeTabs[length] > 1 ) {
          activeTab = activeTabs[activeTabs[length]-1];
        }
        return activeTab;
      },
      getActiveContent = function() {
        return queryElement(getActiveTab()[getAttribute]('href'));
      },
      // handler 
      clickHandler = function(e) {
        e[preventDefault]();
        next = e[currentTarget];
        !tabs[isAnimating] && !hasClass(next,active) && self.show();
      };
  
    // public method
    self.show = function() { // the tab we clicked is now the next tab
      next = next || element;
      nextContent = queryElement(next[getAttribute]('href')); // this is the actual object, the next tab content to activate
      activeTab = getActiveTab(); 
      activeContent = getActiveContent();
  
      hideCustomEvent = bootstrapCustomEvent( hideEvent, component, next);
      dispatchCustomEvent.call(activeTab, hideCustomEvent);
      if (hideCustomEvent[defaultPrevented]) return;    
  
      tabs[isAnimating] = true;
      removeClass(activeTab,active);
      activeTab[setAttribute](ariaSelected,'false');
      addClass(next,active);
      next[setAttribute](ariaSelected,'true');    
  
      if ( dropdown ) {
        if ( !hasClass(element[parentNode],'dropdown-menu') ) {
          if (hasClass(dropdown,active)) removeClass(dropdown,active);
        } else {
          if (!hasClass(dropdown,active)) addClass(dropdown,active);
        }
      }
  
      if (hasClass(activeContent, 'fade')) {
        removeClass(activeContent,showClass);
        emulateTransitionEnd(activeContent, triggerHide);
      } else { triggerHide(); }
    };
    self.destroy = function() {
      off(element, clickEvent, clickHandler);
      delete element[stringTab];
    };
  
    // init
    if ( !element[stringTab] ) { // prevent adding event handlers twice
      on(element, clickEvent, clickHandler);
    }
    if (self[height]) { tabsContentContainer = getActiveContent()[parentNode]; }
    element[stringTab] = self;
  };
  
  // TAB DATA API
  // ============
  supports[push]( [ stringTab, Tab, '['+dataToggle+'="tab"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | Toast
  ---------------------------------------------*/
  
  // TOAST DEFINITION
  // ==================
  var Toast = function( element,options ) {
  
    // initialization element
    element = queryElement(element);
  
    // reset on re-init
    element[stringToast] && element[stringToast].destroy();  
  
    // set options
    options = options || {};
  
    // bind, toast and timer
    var self = this, 
        toast = getClosest(element,'.toast'),
        timer = 0,
  
        // DATA API
        animationData = element[getAttribute](dataAnimation),
        autohideData = element[getAttribute](dataAutohide),
        delayData = element[getAttribute](dataDelay),
        
        // strings
        component = 'toast',
        autohide = 'autohide',
        animation = 'animation',
        showing = 'showing',
        hide = 'hide',
        fade = 'fade',
        // custom events
        showCustomEvent = bootstrapCustomEvent(showEvent, component),
        hideCustomEvent = bootstrapCustomEvent(hideEvent, component),        
        shownCustomEvent = bootstrapCustomEvent(shownEvent, component),        
        hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component);
  
    // set instance options
    self[animation] = options[animation] === false || animationData === 'false' ? 0 : 1; // true by default
    self[autohide] = options[autohide] === false || autohideData === 'false' ? 0 : 1; // true by default
    self[delay] = parseInt(options[delay] || delayData) || 500; // 500ms default
  
  
    // private methods
    // animation complete
    var showComplete = function() {
        removeClass( toast, showing );
        addClass( toast, showClass );
        if (self[autohide]) { self.hide(); }
        dispatchCustomEvent.call(toast,shownCustomEvent);
      },
      hideComplete = function() {
        addClass( toast, hide );
        dispatchCustomEvent.call(toast,hiddenCustomEvent);
      },
      close = function() {
        removeClass( toast,showClass );
        self[animation] ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
      },
      disposeComplete = function(){
        clearTimeout(timer); timer = null;
        addClass( toast, hide );
        off(element, clickEvent, self.hide);
        element[stringToast] = null;
        element = null;
        toast = null;
      };
  
    // public methods
    self.show = function() {
      if (toast) {
        dispatchCustomEvent.call(toast,showCustomEvent);
        if (showCustomEvent[defaultPrevented]) return;
        self[animation] && addClass( toast,fade );
        removeClass( toast,hide );
        addClass( toast,showing );
  
        self[animation] ? emulateTransitionEnd(toast, showComplete) : showComplete();
      }
    };
    self.hide = function(noTimer) {
      if (toast && hasClass(toast,showClass)) {
        dispatchCustomEvent.call(toast,hideCustomEvent);
        if(hideCustomEvent[defaultPrevented]) return;
  
        if (noTimer) {
          close();
        } else {
          timer = setTimeout( close, self[delay]);
        }
      }
    };
    self.dispose = function() {
      if ( toast && hasClass(toast,showClass) ) {
        removeClass( toast,showClass );
        self[animation] ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
      }
    };
    self.destroy = function() {
      self.hide();
      off(element, clickEvent, self.hide);
      delete element[stringToast];
    };
  
    // init
    if ( !element[stringToast] ) { // prevent adding event handlers twice
      on(element, clickEvent, self.hide);
    }
    element[stringToast] = self;
  };
  
  // TOAST DATA API
  // =================
  supports[push]( [ stringToast, Toast, '['+dataDismiss+'="toast"]' ] );
  
  
  /* Native JavaScript for Bootstrap 4 | Tooltip
  ---------------------------------------------*/
  
  // TOOLTIP DEFINITION
  // ==================
  var Tooltip = function( element,options ) {
  
    // initialization element
    element = queryElement(element);
  
    // set options
    options = options || {};
  
    // reset on re-init
    element[stringTooltip] && element[stringTooltip].destroy();
  
    // bind, timer and tooltip
    var self = this, timer = 0, tooltip = null,
  
        // DATA API
        animationData = element[getAttribute](dataAnimation),
        placementData = element[getAttribute](dataPlacement),
        delayData = element[getAttribute](dataDelay),
        containerData = element[getAttribute](dataContainer),
        
        // strings
        component = 'tooltip',
        classString = 'class',
        title = 'title',
        fade = 'fade',
        div = 'div',
        // custom events
        showCustomEvent = bootstrapCustomEvent(showEvent, component),
        shownCustomEvent = bootstrapCustomEvent(shownEvent, component),
        hideCustomEvent = bootstrapCustomEvent(hideEvent, component),
        hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component),
  
        // check container
        containerElement = queryElement(options[container]),
        containerDataElement = queryElement(containerData),      
  
        // maybe the element is inside a modal
        modal = getClosest(element,'.modal'),
        
        // maybe the element is inside a fixed navbar
        navbarFixedTop = getClosest(element,'.'+fixedTop),
        navbarFixedBottom = getClosest(element,'.'+fixedBottom);
  
    // set instance options
    self[animation] = options[animation] && options[animation] !== fade ? options[animation] : animationData || fade;
    self[placement] = options[placement] ? options[placement] : placementData || top;
    self[template] = options[template] ? options[template] : null; // JavaScript only
    self[delay] = parseInt(options[delay] || delayData) || 200;
    self[container] = containerElement ? containerElement 
                    : containerDataElement ? containerDataElement
                    : navbarFixedTop ? navbarFixedTop
                    : navbarFixedBottom ? navbarFixedBottom
                    : modal ? modal : DOC[body];
  
    // title and placement class
    var titleString = element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle),
        placementClass = 'bs-' + component + '-' + self[placement];
  
    if ( !titleString || titleString == "" ) return; // invalidate
  
    // private methods
    var removeToolTip = function() {
        self[container].removeChild(tooltip);
        tooltip = null; timer = null;
      },
      createToolTip = function() {
        titleString = element[getAttribute](title) || element[getAttribute](dataTitle) || element[getAttribute](dataOriginalTitle); // read the title again
        if ( titleString && titleString !== "" ) { // invalidate, maybe markup changed
          // create tooltip
          tooltip = DOC[createElement](div);
          
          // set markup
          if (self[template]) {
            var tooltipMarkup = DOC[createElement](div);
            tooltipMarkup[innerHTML] = self[template].trim();
  
            tooltip.className = tooltipMarkup.firstChild.className;
            tooltip[innerHTML] = tooltipMarkup.firstChild[innerHTML];
  
            queryElement('.'+component+'-inner',tooltip)[innerHTML] = titleString.trim();
          } else {
            // tooltip arrow
            var tooltipArrow = DOC[createElement](div);
            tooltipArrow[setAttribute](classString,'arrow');
            tooltip[appendChild](tooltipArrow);
            // tooltip inner
            var tooltipInner = DOC[createElement](div);
            tooltipInner[setAttribute](classString,component+'-inner');
            tooltip[appendChild](tooltipInner);
            tooltipInner[innerHTML] = titleString;
          }
          // reset position
          tooltip[style][left] = '0';
          tooltip[style][top] = '0';
          // set class and role attribute
          tooltip[setAttribute]('role',component);
          !hasClass(tooltip, component) && addClass(tooltip, component);
          !hasClass(tooltip, self[animation]) && addClass(tooltip, self[animation]);
          !hasClass(tooltip, placementClass) && addClass(tooltip, placementClass);
          // append to container
          self[container][appendChild](tooltip);
        }
      },
      updateTooltip = function () {
        styleTip(element, tooltip, self[placement], self[container]);
      },
      showTooltip = function () {
        !hasClass(tooltip,showClass) && ( addClass(tooltip,showClass) );
      },
      // triggers
      showAction = function() {
        on( globalObject, resizeEvent, self.hide, passiveHandler );
        dispatchCustomEvent.call(element, shownCustomEvent);
      },
      hideAction = function() {
        off( globalObject, resizeEvent, self.hide, passiveHandler );
        removeToolTip();
        dispatchCustomEvent.call(element, hiddenCustomEvent);
      },
      toggleEvents = function(action){
        action(element, mouseHover[0], self.show);
        action(element, mouseHover[1], self.hide);
      };
  
    // public methods
    self.show = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip === null) {
          dispatchCustomEvent.call(element, showCustomEvent);
          if (showCustomEvent[defaultPrevented]) return;        
          // if(createToolTip() == false) return;
          if(createToolTip() !== false) {
            updateTooltip();
            showTooltip();
            !!self[animation] ? emulateTransitionEnd(tooltip, showAction) : showAction();          
          }
        }
      }, 20 );
    };
    self.hide = function() {
      clearTimeout(timer);
      timer = setTimeout( function() {
        if (tooltip && hasClass(tooltip,showClass)) {
          dispatchCustomEvent.call(element, hideCustomEvent);
          if (hideCustomEvent[defaultPrevented]) return;
          removeClass(tooltip,showClass);
          !!self[animation] ? emulateTransitionEnd(tooltip, hideAction) : hideAction();
        }
      }, self[delay]);
    };
    self.toggle = function() {
      if (!tooltip) { self.show(); } 
      else { self.hide(); }
    };
    self.destroy = function() {
      toggleEvents(off);
      self.hide();
      element[setAttribute](title, element[getAttribute](dataOriginalTitle));
      element[removeAttribute](dataOriginalTitle);
      delete element[stringTooltip];
    };  
  
    // init
    if (!element[stringTooltip]){ // prevent adding event handlers twice
      element[setAttribute](dataOriginalTitle,titleString);
      element[removeAttribute](title);
      toggleEvents(on);
    }
  
    element[stringTooltip] = self;
  };
  
  // TOOLTIP DATA API
  // =================
  supports[push]( [ stringTooltip, Tooltip, '['+dataToggle+'="tooltip"]' ] );
  
  
  
  /* Native JavaScript for Bootstrap | Initialize Data API
  --------------------------------------------------------*/
  var initializeDataAPI = function( constructor, collection ){
      for (var i=0, l=collection[length]; i<l; i++) {
        new constructor(collection[i]);
      }
    },
    initCallback = BSN.initCallback = function(lookUp){
      lookUp = lookUp || DOC;
      for (var i=0, l=supports[length]; i<l; i++) {
        initializeDataAPI( supports[i][1], lookUp[querySelectorAll] (supports[i][2]) );
      }
    };
  
  // bulk initialize all components
  DOC[body] ? initCallback() : on( DOC, 'DOMContentLoaded', function(){ initCallback(); } );
  
  return {
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
    Tooltip: Tooltip
  };
}));
