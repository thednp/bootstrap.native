
/* Native Javascript for Bootstrap 3 | Internal Utility Functions
----------------------------------------------------------------*/
"use strict";

// globals
var globalObject = typeof global !== 'undefined' ? global : this||window,
  DOC = document, HTML = DOC.documentElement, body = 'body', // allow the library to be used in <head>

  // Native Javascript for Bootstrap Global Object
  BSN = globalObject.BSN = {},
  supports = BSN.supports = [],

  // function toggle attributes
  dataToggle    = 'data-toggle',
  dataDismiss   = 'data-dismiss',
  dataSpy       = 'data-spy',
  dataRide      = 'data-ride',
  
  // components
  stringAffix     = 'Affix',
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

  // options DATA API
  databackdrop      = 'data-backdrop',
  dataKeyboard      = 'data-keyboard',
  dataTarget        = 'data-target',
  dataInterval      = 'data-interval',
  dataHeight        = 'data-height',
  dataPause         = 'data-pause',
  dataTitle         = 'data-title',  
  dataOriginalTitle = 'data-original-title',
  dataOriginalText  = 'data-original-text',
  dataDismissible   = 'data-dismissible',
  dataTrigger       = 'data-trigger',
  dataAnimation     = 'data-animation',
  dataContainer     = 'data-container',
  dataPlacement     = 'data-placement',
  dataDelay         = 'data-delay',
  dataOffsetTop     = 'data-offset-top',
  dataOffsetBottom  = 'data-offset-bottom',

  // option keys
  backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
  content = 'content', target = 'target', currentTarget = 'currentTarget',
  interval = 'interval', pause = 'pause', animation = 'animation',
  placement = 'placement', container = 'container', 

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

  // other
  getAttribute           = 'getAttribute',
  setAttribute           = 'setAttribute',
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
  inClass    = 'in',
  collapsing = 'collapsing',
  disabled   = 'disabled',
  loading    = 'loading',
  left       = 'left',
  right      = 'right',
  top        = 'top',
  bottom     = 'bottom',

  // IE8 browser detect
  isIE8 = !('opacity' in HTML[style]),

  // tooltip / popover
  tipPositions = /\b(top|bottom|left|right)+/,
  
  // modal
  modalOverlay = 0,
  fixedTop = 'navbar-fixed-top',
  fixedBottom = 'navbar-fixed-bottom',  
  
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
  nodeListToArray = function(nodeList){
    var childItems = []; for (var i = 0, nll = nodeList[length]; i<nll; i++) { childItems[push]( nodeList[i] ) }
    return childItems;
  },
  getElementsByClassName = function(element,classNAME) { // getElementsByClassName IE8+
    var selectionMethod = isIE8 ? querySelectorAll : getElementsByCLASSNAME;      
    return nodeListToArray(element[selectionMethod]( isIE8 ? '.' + classNAME.replace(/\s(?=[a-z])/g,'.') : classNAME ));
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
      handler(e);
      off(element, event, handlerWrapper, options);
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
      one(globalObject, 'testPassive', null, opts);
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
    var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName);
    OriginalCustomEvent.relatedTarget = related;
    this.dispatchEvent(OriginalCustomEvent);
  },

  // tooltip / popover stuff
  getScroll = function() { // also Affix and ScrollSpy uses it
    return {
      y : globalObject.pageYOffset || HTML[scrollTop],
      x : globalObject.pageXOffset || HTML[scrollLeft]
    }
  },
  styleTip = function(link,element,position,parent) { // both popovers and tooltips (target,tooltip/popover,placement,elementToAppendTo)
    var elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] },
        windowWidth = (HTML[clientWidth] || DOC[body][clientWidth]),
        windowHeight = (HTML[clientHeight] || DOC[body][clientHeight]),
        rect = link[getBoundingClientRect](), 
        scroll = parent === DOC[body] ? getScroll() : { x: parent[offsetLeft] + parent[scrollLeft], y: parent[offsetTop] + parent[scrollTop] },
        linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
        arrow = queryElement('[class*="arrow"]',element),
        topPosition, leftPosition, arrowTop, arrowLeft,

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
    
    // apply styling to tooltip or popover
    if ( position === left || position === right ) { // secondary|side positions
      if ( position === left ) { // LEFT
        leftPosition = rect[left] + scroll.x - elementDimensions.w;
      } else { // RIGHT
        leftPosition = rect[left] + scroll.x + linkDimensions.w;
      }

      // adjust top and arrow
      if (halfTopExceed) {
        topPosition = rect[top] + scroll.y;
        arrowTop = linkDimensions.h/2;
      } else if (halfBottomExceed) {
        topPosition = rect[top] + scroll.y - elementDimensions.h + linkDimensions.h;
        arrowTop = elementDimensions.h - linkDimensions.h/2;
      } else {
        topPosition = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2;
      }
    } else if ( position === top || position === bottom ) { // primary|vertical positions
      if ( position === top) { // TOP
        topPosition =  rect[top] + scroll.y - elementDimensions.h;
      } else { // BOTTOM
        topPosition = rect[top] + scroll.y + linkDimensions.h;
      }
      // adjust left | right and also the arrow
      if (halfLeftExceed) {
        leftPosition = 0;
        arrowLeft = rect[left] + linkDimensions.w/2;
      } else if (halfRightExceed) {
        leftPosition = windowWidth - elementDimensions.w*1.01;
        arrowLeft = elementDimensions.w - ( windowWidth - rect[left] ) + linkDimensions.w/2;
      } else {
        leftPosition = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2;
      }
    }

    // apply style to tooltip/popover and it's arrow
    element[style][top] = topPosition + 'px';
    element[style][left] = leftPosition + 'px';

    arrowTop && (arrow[style][top] = arrowTop + 'px');
    arrowLeft && (arrow[style][left] = arrowLeft + 'px');

    element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
  };
