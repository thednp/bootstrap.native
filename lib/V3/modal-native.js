
/* Native JavaScript for Bootstrap 3 | Modal
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

  // set options
  options = options || {};

  this[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
  this[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
  this[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : this[backdrop];
  this[animation] = hasClass(modal, 'fade') ? true : false;
  this[content]  = options[content]; // JavaScript only

  // set an initial state of the modal
  modal[isAnimating] = false;
  
  // bind, constants, event targets and other vars
  var self = this, relatedTarget = null,
    scrollBarWidth, overlay, overlayDelay,

    // also find fixed-top / fixed-bottom items
    fixedItems = getElementsByClassName(HTML,fixedTop).concat(getElementsByClassName(HTML,fixedBottom)),

    // private methods
    setScrollbar = function () {
      var openModal = hasClass(DOC[body],component+'-open'),
          bodyStyle = DOC[body].currentStyle || globalObject[getComputedStyle](DOC[body]),
          bodyPad = parseInt((bodyStyle[paddingRight]), 10), itemPad;

      DOC[body][style][paddingRight] = (bodyPad + (openModal?0:scrollBarWidth)) + 'px';
      modal[style][paddingRight] = (scrollBarWidth?scrollBarWidth+'px':'');
      if (fixedItems[length]){
        for (var i = 0; i < fixedItems[length]; i++) {
          itemPad = (fixedItems[i].currentStyle || globalObject[getComputedStyle](fixedItems[i]))[paddingRight];
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
      if ( overlay && !getElementsByClassName(DOC,component+' '+inClass)[0] ) {
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
      !getElementsByClassName(DOC,component+' '+inClass)[0] && addClass(DOC[body],component+'-open');

      addClass(modal,inClass);
      modal[setAttribute](ariaHidden, false);

      hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
    },    
    triggerShow = function() {
      setFocus(modal);
      modal[isAnimating] = false;

      toggleEvents(on);

      shownCustomEvent = bootstrapCustomEvent(shownEvent, component, relatedTarget);
      dispatchCustomEvent.call(modal, shownCustomEvent);
      // if ( shownCustomEvent[defaultPrevented] ) return; // TO BE DECIDED
    },
    triggerHide = function() {
      modal[style].display = '';
      element && (setFocus(element));

      overlay = queryElement('.'+modalBackdropString);
      
      if (overlay && hasClass(overlay,inClass) && !getElementsByClassName(DOC,component+' '+inClass)[0]) {
        removeClass(overlay,inClass);
        emulateTransitionEnd(overlay,removeOverlay);
      } else {
        removeOverlay();
      }
        
      toggleEvents(off);

      modal[isAnimating] = false;

      hiddenCustomEvent = bootstrapCustomEvent(hiddenEvent, component);
      dispatchCustomEvent.call(modal, hiddenCustomEvent);
      // if ( hiddenCustomEvent[defaultPrevented] ) return; // TO BE DECIDED
    },
    // handlers
    clickHandler = function(e) {
      if ( modal[isAnimating] ) return;

      var clickTarget = e[target];
      clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
      if ( clickTarget === element && !hasClass(modal,inClass) ) {
        modal[modalTrigger] = element;
        relatedTarget = element;
        self.show();
        e[preventDefault]();
      }
    },
    keyHandler = function(e) {
      if ( modal[isAnimating] ) return;

      var key = e.which || e.keyCode; // keyCode for IE8
      if (self[keyboard] && key == 27 && hasClass(modal,inClass)) {
        self.hide();
      }
    },
    dismissHandler = function(e) {
      if ( modal[isAnimating] ) return;

      var clickTarget = e[target];
      if ( hasClass(modal,inClass) && (clickTarget[parentNode][getAttribute](dataDismiss) === component
          || clickTarget[getAttribute](dataDismiss) === component
          || clickTarget === modal && self[backdrop] !== staticString) ) {
        self.hide(); relatedTarget = null;
        e[preventDefault]();
      }
    };

  // public methods
  this.toggle = function() {
    if ( hasClass(modal,inClass) ) {this.hide();} else {this.show();}
  };
  this.show = function() {
    if ( hasClass(modal,inClass) ) return;

    showCustomEvent = bootstrapCustomEvent(showEvent, component, relatedTarget);
    dispatchCustomEvent.call(modal, showCustomEvent);

    if ( showCustomEvent[defaultPrevented] ) return;
    
    modal[isAnimating] = true;    

    // we elegantly hide any opened modal
    var currentOpen = getElementsByClassName(DOC,component+' '+inClass)[0];
    if (currentOpen && currentOpen !== modal) {
      modalTrigger in currentOpen && currentOpen[modalTrigger][stringModal].hide();
      stringModal in currentOpen && currentOpen[stringModal].hide();
    }

    if ( self[backdrop] ) {
      overlay = createOverlay();
    }

    if ( overlay && !currentOpen && !hasClass(overlay,inClass)) {
      overlay[offsetWidth]; // force reflow to enable trasition
      overlayDelay = getTransitionDurationFromElement(overlay);
      addClass(overlay,inClass);
    }

    !currentOpen ? setTimeout( beforeShow, overlay && overlayDelay ? overlayDelay:0 ) : beforeShow();
  };
  this.hide = function() {
    if ( !hasClass(modal,inClass) ) {return}

    hideCustomEvent = bootstrapCustomEvent( hideEvent, component);
    dispatchCustomEvent.call(modal, hideCustomEvent);
    if ( hideCustomEvent[defaultPrevented] ) return;
    
    modal[isAnimating] = true;

    removeClass(modal,inClass);
    modal[setAttribute](ariaHidden, true);

    hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
  };
  this.setContent = function( content ) {
    queryElement('.'+component+'-content',modal)[innerHTML] = content;
  };
  this.update = function() {
    if (hasClass(modal,inClass)) {
      checkScrollbar();
      setScrollbar();
    }
  };

  // init
  // prevent adding event handlers over and over
  // modal is independent of a triggering element
  if ( !!element && !(stringModal in element) ) {
    on(element, clickEvent, clickHandler);
  }
  if ( !!self[content] ) { self.setContent( self[content] ); }
  if (element) { element[stringModal] = self; modal[modalTrigger] = element; }
  else { modal[stringModal] = self; }
};

// DATA API
supports[push]( [ stringModal, Modal, '['+dataToggle+'="modal"]' ] );
