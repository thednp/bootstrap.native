
/* Native Javascript for Bootstrap 4 | Internal Utility Functions
----------------------------------------------------------------*/

// globals
var globalObject = typeof global !== 'undefined' ? global : this||window,
  doc = document.documentElement, body = document.body,

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
  getElementsByCLASSNAME  = 'getElementsByClassName',

  indexOf      = 'indexOf',
  parentNode   = 'parentNode',
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
  fixedTop = '.fixed-top',
  fixedBottom = '.fixed-bottom',
  mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
  tipPositions = /\b(top|bottom|left|top)+/,

  // transitionEnd since 2.0.4
  supportTransitions = Webkit+Transition in doc[style] || Transition[toLowerCase]() in doc[style],
  transitionEndEvent = Webkit+Transition in doc[style] ? Webkit[toLowerCase]()+Transition+'End' : Transition[toLowerCase]()+'end',

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

  // reference a live collection of the DOM
  AllDOMElements = document[getElementsByTagName]('*'),

  // Init DATA API
  initializeDataAPI = function( component, constructor, dataAttribute, collection ){
    var lookUp = collection && collection[length] ? collection : AllDOMElements;
    for (var i=0; i < lookUp[length]; i++) {
      var attrValue = lookUp[i][getAttribute](dataAttribute), expectedAttrValue = component.replace(/spy/i,'')[toLowerCase]();
      if ( attrValue && component === stringButton && ( attrValue[indexOf](expectedAttrValue) > -1 ) // data-toggle="buttons"
          || attrValue === expectedAttrValue ) { // all other components
        new constructor(lookUp[i]);
      }
    }
  },  

  // tab / collapse stuff
  targetsReg = /^\#(.)+$/,
  getOuterHeight = function (child) {
    var childStyle = child && globalObject.getComputedStyle(child), 
      btp = /px/.test(childStyle.borderTopWidth) ? Math.round(childStyle.borderTopWidth.replace('px','')) : 0,
      btb = /px/.test(childStyle.borderBottomWidth) ? Math.round(childStyle.borderBottomWidth.replace('px','')) : 0,
      mtp = /px/.test(childStyle.marginTop) ? Math.round(childStyle.marginTop.replace('px','')) : 0,
      mbp = /px/.test(childStyle.marginBottom) ? Math.round(childStyle.marginBottom.replace('px','')) : 0;
    return child[clientHeight] + parseInt( btp ) + parseInt( btb ) + parseInt( mtp ) + parseInt( mbp );
  },
  getMaxHeight = function(parent) { // get collapse trueHeight and border
    var parentHeight = 0;
    for (var k = 0, ll = parent.children[length]; k < ll; k++) {
      parentHeight += getOuterHeight(parent.children[k]);
    }
    return parentHeight;
  },

  // tooltip / popover stuff
  isElementInViewport = function(element) { // check if this.tooltip is in viewport
    var rect = element[getBoundingClientRect]();
    return ( rect[top] >= 0 && rect[left] >= 0 &&
      rect[bottom] <= (globalObject[innerHeight] || doc[clientHeight]) &&
      rect[right] <= (globalObject[innerWidth] || doc[clientWidth]) )
  },
  getScroll = function() { // also Affix and ScrollSpy uses it
    return {
      y : globalObject.pageYOffset || doc[scrollTop],
      x : globalObject.pageXOffset || doc[scrollLeft]
    }
  },
  styleTip = function(link,element,position,parent) { // both popovers and tooltips
    var rect = link[getBoundingClientRect](), 
        scroll = parent === body ? getScroll() : { x: parent[offsetLeft] + parent[scrollLeft], y: parent[offsetTop] + parent[scrollTop] },
        linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
        elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] };

    // apply styling to tooltip or popover
    if ( position === top ) { // TOP
      element[style][top] = rect[top] + scroll.y - elementDimensions.h + 'px';
      element[style][left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px'

    } else if ( position === bottom ) { // BOTTOM
      element[style][top] = rect[top] + scroll.y + linkDimensions.h + 'px';
      element[style][left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px';

    } else if ( position === left ) { // LEFT
      element[style][top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
      element[style][left] = rect[left] + scroll.x - elementDimensions.w + 'px';

    } else if ( position === right ) { // RIGHT
      element[style][top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
      element[style][left] = rect[left] + scroll.x + linkDimensions.w + 'px';
    }
    element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions,position));
  },
  updatePlacement = function(position) {
    return position === top ? bottom : // top
            position === bottom ? top : // bottom
            position === left ? right : // left
            position === right ? left : position; // right
  };

