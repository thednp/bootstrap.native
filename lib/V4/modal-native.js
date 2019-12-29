
/* Native JavaScript for Bootstrap 4 | Modal
-------------------------------------------*/

// MODAL DEFINITION
// ===============
var Modal = function(element, options) { // element can be the modal/triggering button

  // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
  element = queryElement(element);

    // strings
    var component = 'modal',
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

  // bind
  var self = element[stringModal] || modal[stringModal] || this;

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
