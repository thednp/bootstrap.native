
/* Native Javascript for Bootstrap 3 | Affix
-------------------------------------------*/

// AFFIX DEFINITION
var Affix = function(element, options) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

  // read DATA API
  var targetData        = element[getAttribute](dataTarget),
      offsetTopData     = element[getAttribute](dataOffsetTop),
      offsetBottomData  = element[getAttribute](dataOffsetBottom),
      
      // component specific strings
      affix = 'affix', affixed = 'affixed', fn = 'function', update = 'update',
      affixTop = 'affix-top', affixedTop = 'affixed-top',
      affixBottom = 'affix-bottom', affixedBottom = 'affixed-bottom';

  this[target] = options[target] ? queryElement(options[target]) : queryElement(targetData) || null; // target is an object
  this[offsetTop] = options[offsetTop] ? options[offsetTop] : parseInt(offsetTopData) || 0; // offset option is an integer number or function to determine that number
  this[offsetBottom] = options[offsetBottom] ? options[offsetBottom]: parseInt(offsetBottomData) || 0;

  if ( !this[target] && !( this[offsetTop] || this[offsetBottom] ) ) { return; } // invalidate

  // internal bind
  var self = this,

    // constants
    pinOffsetTop, pinOffsetBottom, maxScroll, scrollY, pinnedTop, pinnedBottom,
    affixedToTop = false, affixedToBottom = false,
    
    // private methods 
    getMaxScroll = function(){
      return Math.max( DOC[body][scrollHeight], DOC[body][offsetHeight], HTML[clientHeight], HTML[scrollHeight], HTML[offsetHeight] );
    },
    getOffsetTop = function () {
      if ( self[target] !== null ) {
        return self[target][getBoundingClientRect]()[top] + scrollY;
      } else if ( self[offsetTop] ) {
        return parseInt(typeof self[offsetTop] === fn ? self[offsetTop]() : self[offsetTop] || 0);
      }
    },
    getOffsetBottom = function () {
      if ( self[offsetBottom] ) {
        return maxScroll - element[offsetHeight] - parseInt( typeof self[offsetBottom] === fn ? self[offsetBottom]() : self[offsetBottom] || 0 );
      }
    },
    checkPosition = function () {
      maxScroll = getMaxScroll();
      scrollY = parseInt(getScroll().y,0);
      pinOffsetTop = getOffsetTop();
      pinOffsetBottom = getOffsetBottom(); 
      pinnedTop = ( parseInt(pinOffsetTop) - scrollY < 0) && (scrollY > parseInt(pinOffsetTop) );
      pinnedBottom = ( parseInt(pinOffsetBottom) - scrollY < 0) && (scrollY > parseInt(pinOffsetBottom) );
    },
    pinTop = function () {
      if ( !affixedToTop && !hasClass(element,affix) ) { // on loading a page halfway scrolled these events don't trigger in Chrome
        bootstrapCustomEvent.call(element, affix, affix);
        bootstrapCustomEvent.call(element, affixTop, affix);
        addClass(element,affix);
        affixedToTop = true;
        bootstrapCustomEvent.call(element, affixed, affix);
        bootstrapCustomEvent.call(element, affixedTop, affix);
      }
    },
    unPinTop = function () {
      if ( affixedToTop && hasClass(element,affix) ) {
        removeClass(element,affix);
        affixedToTop = false;
      }
    },
    pinBottom = function () {
      if ( !affixedToBottom && !hasClass(element, affixBottom) ) {
        bootstrapCustomEvent.call(element, affix, affix);
        bootstrapCustomEvent.call(element, affixBottom, affix);
        addClass(element,affixBottom);
        affixedToBottom = true;
        bootstrapCustomEvent.call(element, affixed, affix);
        bootstrapCustomEvent.call(element, affixedBottom, affix);
      }
    },
    unPinBottom = function () {
      if ( affixedToBottom && hasClass(element,affixBottom) ) {
        removeClass(element,affixBottom);
        affixedToBottom = false;
      }
    },
    updatePin = function () {
      if ( pinnedBottom ) {
        if ( pinnedTop ) { unPinTop(); }
        pinBottom(); 
      } else {
        unPinBottom();
        if ( pinnedTop ) { pinTop(); } 
        else { unPinTop(); }
      }
    };

  // public method
  this[update] = function () {
    checkPosition();
    updatePin(); 
  };

  // init
  if ( !(stringAffix in element ) ) { // prevent adding event handlers twice
    on( globalObject, scrollEvent, self[update], passiveHandler );
    !isIE8 && on( globalObject, resizeEvent, self[update], passiveHandler );
}
  element[stringAffix] = self;

  self[update]();
};

// AFFIX DATA API
// =================
supports[push]([stringAffix, Affix, '['+dataSpy+'="affix"]']);


