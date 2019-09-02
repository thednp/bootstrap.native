
/* Native JavaScript for Bootstrap 4 | Toast
---------------------------------------------*/

// TOAST DEFINITION
// ==================
var Toast = function( element,options ) {

  // initialization element
  element = queryElement(element);

  // set options
  options = options || {};

  // DATA API
  var animationData = element[getAttribute](dataAnimation),
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
  this[animation] = options[animation] === false || animationData === 'false' ? 0 : 1; // true by default
  this[autohide] = options[autohide] === false || autohideData === 'false' ? 0 : 1; // true by default
  this[delay] = parseInt(options[delay] || delayData) || 500; // 500ms default

  // bind,toast and timer
  var self = this, timer = 0,
      // get the toast element
      toast = getClosest(element,'.toast');

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
  this.show = function() {
    if (toast) {
      dispatchCustomEvent.call(toast,showCustomEvent);
      if (showCustomEvent[defaultPrevented]) return;
      self[animation] && addClass( toast,fade );
      removeClass( toast,hide );
      addClass( toast,showing );

      self[animation] ? emulateTransitionEnd(toast, showComplete) : showComplete();
    }
  };
  this.hide = function(noTimer) {
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
  this.dispose = function() {
    if ( toast && hasClass(toast,showClass) ) {
      removeClass( toast,showClass );
      self[animation] ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
    }
  };

  // init
  if ( !(stringToast in element) ) { // prevent adding event handlers twice
    on(element, clickEvent, self.hide);
  }
  element[stringToast] = self;
};

// TOAST DATA API
// =================
supports[push]( [ stringToast, Toast, '['+dataDismiss+'="toast"]' ] );

