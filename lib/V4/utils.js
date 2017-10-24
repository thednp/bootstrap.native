
/* Native Javascript for Bootstrap 4 | Internal Utility Functions
----------------------------------------------------------------*/
"use strict";

// globals
var globalObject = typeof global !== 'undefined' ? global : this||window,
  HTML = document.documentElement, DOC = document, body = 'body', // allow the library to be used in <head>

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
  content = 'content', target = 'target',
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
  hoverEvent    = 'hover',
  keydownEvent  = 'keydown',
  resizeEvent   = 'resize',
  scrollEvent   = 'scroll',
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
  getAttribute            = 'getAttribute',
  setAttribute            = 'setAttribute',
  hasAttribute            = 'hasAttribute',
  getElementsByTagName    = 'getElementsByTagName',
  getBoundingClientRect   = 'getBoundingClientRect',
  querySelectorAll        = 'querySelectorAll',
  getElementsByCLASSNAME  = 'getElementsByClassName',

  indexOf      = 'indexOf',
  parentNode   = 'parentNode',
  preventDefault = 'preventDefault',
  length       = 'length',
  toLowerCase  = 'toLowerCase',
  Transition   = 'Transition',
  Webkit       = 'Webkit',
  style        = 'style',

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
  fixedTop = 'fixed-top',
  fixedBottom = 'fixed-bottom',
  mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
  tipPositions = /\b(top|bottom|left|top)+/,

  // modal
  modalOverlay = 0,
  
  // transitionEnd since 2.0.4
  supportTransitions = Webkit+Transition in HTML[style] || Transition[toLowerCase]() in HTML[style],
  transitionEndEvent = Webkit+Transition in HTML[style] ? Webkit[toLowerCase]()+Transition+'End' : Transition[toLowerCase]()+'end',

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
    return element.classList.contains(classNAME);
  },

  // selection methods
  getElementsByClassName = function(element,classNAME) { // returns Array
    return [].slice.call(element[getElementsByCLASSNAME]( classNAME ));
  },
  queryElement = function (selector, parent) {
    var lookUp = parent ? parent : document;
    return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
  },
  getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
  // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
    var firstChar = selector.charAt(0);
    for ( ; element && element !== document; element = element[parentNode] ) {// Get closest match
      if ( firstChar === '.' ) {// If selector is a class
        if ( queryElement(selector,element[parentNode]) !== null && hasClass(element,selector.replace('.','')) ) { return element; }
      } else if ( firstChar === '#' ) { // If selector is an ID
        if ( element.id === selector.substr(1) ) { return element; }
      }
    }
    return false;
  },

  // event attach jQuery style / trigger  since 1.2.0
  on = function (element, event, handler) {
    element.addEventListener(event, handler, false);
  },
  off = function(element, event, handler) {
    element.removeEventListener(event, handler, false);
  },
  one = function (element, event, handler) { // one since 2.0.4
    on(element, event, function handlerWrapper(e){
      handler(e);
      off(element, event, handlerWrapper);
    });
  },
  emulateTransitionEnd = function(element,handler){ // emulateTransitionEnd since 2.0.4
    if (supportTransitions) { one(element, transitionEndEvent, function(e){ handler(e); }); }
    else { handler(); }
  },
  bootstrapCustomEvent = function (eventName, componentName, related) {
    var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName);
    OriginalCustomEvent.relatedTarget = related;
    this.dispatchEvent(OriginalCustomEvent);
  },

  // Init DATA API
  initializeDataAPI = function( component, constructor, collection ){
    for (var i=0; i < collection[length]; i++) {
      new constructor(collection[i]);
    }
  },

  // tab / collapse stuff
  targetsReg = /^\#(.)+$/,

  // tooltip / popover stuff
  isElementInViewport = function(element) { // check if this.tooltip is in viewport
    var rect = element[getBoundingClientRect]();
    return ( rect[top] >= 0 && rect[left] >= 0 &&
      rect[bottom] <= (globalObject[innerHeight] || HTML[clientHeight]) &&
      rect[right] <= (globalObject[innerWidth] || HTML[clientWidth]) )
  },
  getScroll = function() { // also Affix and ScrollSpy uses it
    return {
      y : globalObject.pageYOffset || HTML[scrollTop],
      x : globalObject.pageXOffset || HTML[scrollLeft]
    }
  },
  styleTip = function(link,element,position,parent) { // both popovers and tooltips
    var rect = link[getBoundingClientRect](),
        arrow = queryElement('.arrow',element),
        arrowWidth = arrow[offsetWidth], isPopover = hasClass(element,'popover'),
        scroll = parent === DOC[body] ? getScroll() : { x: parent[offsetLeft] + parent[scrollLeft], y: parent[offsetTop] + parent[scrollTop] },
        linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
        elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] };

    // apply styling to tooltip or popover
    if ( position === top ) { // TOP
      element[style][top] = rect[top] + scroll.y - elementDimensions.h - ( isPopover ? arrowWidth : 0 ) + 'px'; // isPopover is trying to fix bug with V4beta CSS
      element[style][left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px'
      arrow[style][left] = elementDimensions.w/2 - arrowWidth/2 + 'px';

    } else if ( position === bottom ) { // BOTTOM
      element[style][top] = rect[top] + scroll.y + linkDimensions.h + 'px';
      element[style][left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px';
      arrow[style][left] = elementDimensions.w/2 - arrowWidth/2 + 'px';

    } else if ( position === left ) { // LEFT
      element[style][top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
      element[style][left] = rect[left] + scroll.x - elementDimensions.w - ( isPopover ? arrowWidth : 0 ) + 'px'; // isPopover is trying to fix bug with V4beta CSS
      arrow[style][top] = elementDimensions.h/2 - arrowWidth/2 + 'px';

    } else if ( position === right ) { // RIGHT
      element[style][top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
      element[style][left] = rect[left] + scroll.x + linkDimensions.w + 'px';
      arrow[style][top] = elementDimensions.h/2 - arrowWidth/2 + 'px';
    }
    element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
  },
  updatePlacement = function(position) {
    return position === top ? bottom : // top
           position === bottom ? top : // bottom
           position === left ? right : // left
           position === right ? left : position; // right
  };
