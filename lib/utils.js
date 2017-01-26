
/* Native Javascript for Bootstrap 3 | Internal Utility Functions
----------------------------------------------------------------*/

// globals
var global = typeof global !== 'undefined' ? global : this||window,
  doc = document.documentElement, body = document.body,
  
  // IE browser detect
  isIE = (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,

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
  dataDuration      = 'data-duration',
  dataTarget        = 'data-target',
  dataInterval      = 'data-interval',
  dataHeight        = 'data-height',
  dataPause         = 'data-pause',
  dataOriginalTitle = 'data-original-title',
  dataOriginalText  = 'data-original-text',
  dataDismissible   = 'data-dismissible',
  dataTrigger       = 'data-trigger',
  dataAnimation     = 'data-animation',
  dataPlacement     = 'data-placement',
  dataDelay         = 'data-delay',
  dataOffsetTop     = 'data-offset-top',
  dataOffsetBottom  = 'data-offset-bottom',

  // option keys
  backdrop = 'backdrop', keyboard = 'keyboard', delay = 'delay',
  duration = 'duration', content = 'content', target = 'target', 
  interval = 'interval', pause = 'pause', animation = 'animation',
  placement = 'placement', container = 'container', 

  // box model
  offsetTop    = 'offsetTop',      offsetBottom   = 'offsetBottom',
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
  getAttribute         = 'getAttribute',
  setAttribute         = 'setAttribute',
  hasAttribute         = 'hasAttribute',
  getElementsByTagName = 'getElementsByTagName',
  getBoundingClientRect= 'getBoundingClientRect',
  dispatchEvent        = 'dispatchEvent',

  collapsing = 'collapsing',
  parentNode = 'parentNode',
  length     = 'length',
  active     = 'active',
  disabled   = 'disabled',
  loading    = 'loading',
  left       = 'left',
  right      = 'right',
  top        = 'top',
  bottom     = 'bottom',

  // tooltip / popover
  mouseHover = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ],
  tipPositions = /\b(top|bottom|left|top)+/,

  // class manipulation, since 1.2.0 requires polyfill.js
  addClass = function(element,classNAME) {
    element.classList.add(classNAME);
  },
  removeClass = function(element,classNAME) {
    element.classList.remove(classNAME);
  },
  hasClass = function(element,classNAME){ // since 1.2.0
    return element.classList.contains(classNAME);
  },

  // selection methods
  getElementsByClassName = function(element,classNAME) {
    var selectionMethod = isIE === 8 ? 'querySelectorAll' : 'getElementsByClassName'; // getElementsByClassName IE8+
    return element[selectionMethod]( isIE === 8 ? '.' + classNAME.replace(/\s(?=[a-z])/g,'.') : classNAME );
  },
  queryElement = function (selector, parent) { // selector utility since 1.2.0
    var lookUp = parent ? parent : document;
    return typeof selector === 'object' ? selector : 
      (/^#/.test(selector) ? document.getElementById(selector.replace('#', '')) : lookUp.querySelector(selector));
  },
  getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
  // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
    var firstChar = selector.charAt(0);
    for ( ; element && element !== document; element = element[parentNode] ) {// Get closest match
      if ( firstChar === '.' || firstChar !== '#') {// If selector is a class
        if ( queryElement(selector,element[parentNode]) !== null ) { return element; }
      }
      if ( firstChar === '#' ) { // If selector is an ID
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
  bootstrapCustomEvent = function (eventName, componentName, related) {
    var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName);
    OriginalCustomEvent.relatedTarget = related;
    this.dispatchEvent(OriginalCustomEvent);
  },

  // reference a live collection of the DOM
  AllDOMElements = document[getElementsByTagName]('*'),

  /* Init DATA API
  *  -------------
  *  component : Dropdown
  *  constructor : Dropdown() constructor
  *  dataAttribute : data-toggle 
  */
  initializeDataAPI = function( component, constructor, dataAttribute, collection ){
    var lookUp = collection && collection[length] ? collection : AllDOMElements;
    for (var i=0; i < lookUp[length]; i++) {
      var attrValue = lookUp[i][getAttribute](dataAttribute), expectedAttrValue = component.replace(/spy/i,'').toLowerCase();
      if ( attrValue && component === stringButton && ( attrValue.indexOf(expectedAttrValue) > -1 ) // data-toggle="buttons"
          || attrValue === expectedAttrValue ) { // all other components
        new constructor(lookUp[i]);
      }
    }
  },
  /* BULK initialization
  *  -------------------
  * you can uncomment the below to trigger a global re-initialization 
  * at any time you can either go for your own HTMLCollection / Array object
  * or use with no argument to use the above AllDOMElements collection */
  // components = [stringAffix, stringAlert, stringButton, stringCarousel, stringCollapse, stringDropdown, stringModal, stringPopover, stringScrollSpy, stringTab, stringToolTip],
  // componentsSelectors = [dataSpy, dataDismiss, dataToggle, dataRide, dataToggle, dataToggle, dataToggle, dataToggle, dataSpy, dataToggle, dataToggle],
  // bulkInitializeDataAPI = function(collection){
  //   for (var i=0; i<components[length]; i++){
  //     initializeDataAPI( components[i], global[components[i]], componentsSelectors[i], collection );
  //   }
  // },

  // tab / collapse stuff
  getOuterHeight = function (child) {
    var style = child && (child.currentStyle || global.getComputedStyle(child)), // the getComputedStyle polyfill would do this for us, but we want to make sure it does
      btp = /px/.test(style.borderTopWidth) ? Math.round(style.borderTopWidth.replace('px','')) : 0,
      btb = /px/.test(style.borderBottomWidth) ? Math.round(style.borderBottomWidth.replace('px','')) : 0,
      mtp = /px/.test(style.marginTop)  ? Math.round(style.marginTop.replace('px',''))    : 0,
      mbp = /px/.test(style.marginBottom)  ? Math.round(style.marginBottom.replace('px',''))  : 0;
    return child[clientHeight] + parseInt( btp ) + parseInt( btb ) + parseInt( mtp ) + parseInt( mbp );
  },
  getMaxHeight = function(parent) { // get collapse trueHeight and border
    var parentHeight = 0, style, margin;
    for (var k = 0, ll = parent.children[length]; k < ll; k++) {
      parentHeight += getOuterHeight(parent.children[k]);
    }
    return parentHeight;
  },

  // tooltip / popover stuff
  isElementInViewport = function(element) { // check if this.tooltip is in viewport
    var rect = element[getBoundingClientRect]();
    return ( rect[top] >= 0 && rect[left] >= 0 &&
      rect[bottom] <= (global[innerHeight] || doc[clientHeight]) &&
      rect[right] <= (global[innerWidth] || doc[clientWidth]) )
  },
  getScroll = function() { // also Affix and ScrollSpy uses it
    return {
      y : global.pageYOffset || doc[scrollTop],
      x : global.pageXOffset || doc[scrollLeft]
    }
  },
  styleTip = function(link,element,position) { // both popovers and tooltips
    var rect = link[getBoundingClientRect](), scroll = getScroll(),
        linkDimensions = { w: rect[right] - rect[left], h: rect[bottom] - rect[top] },
        elementDimensions = { w : element[offsetWidth], h: element[offsetHeight] };

    // apply styling to tooltip or popover
    if ( position === top ) { // TOP
      element.style[top] = rect[top] + scroll.y - elementDimensions.h + 'px';
      element.style[left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px'

    } else if ( position === bottom ) { // BOTTOM
      element.style[top] = rect[top] + scroll.y + linkDimensions.h + 'px';
      element.style[left] = rect[left] + scroll.x - elementDimensions.w/2 + linkDimensions.w/2 + 'px';

    } else if ( position === left ) { // LEFT
      element.style[top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
      element.style[left] = rect[left] + scroll.x - elementDimensions.w + 'px';

    } else if ( position === right ) { // RIGHT
      element.style[top] = rect[top] + scroll.y - elementDimensions.h/2 + linkDimensions.h/2 + 'px';
      element.style[left] = rect[left] + scroll.x + linkDimensions.w + 'px';
    }
    element.className.indexOf(position) === -1 && (element.className = element.className.replace(tipPositions,position));
  },
  updatePlacement = function(position) {
    return position === top ? bottom : // top
            position === bottom ? top : // bottom
            position === left ? right : // left
            position === right ? left : position; // right
  };

