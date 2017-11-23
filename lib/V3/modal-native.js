
/* Native Javascript for Bootstrap 3 | Modal
-------------------------------------------*/

// MODAL DEFINITION
// ===============
var Modal = function(element, options) { // element can be the modal/triggering button

  // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
  element = queryElement(element);

  // determine modal, triggering element
  var btnCheck = element[getAttribute](dataTarget)||element[getAttribute]('href'),
    checkModal = queryElement( btnCheck ),
    modal = hasClass(element,'modal') ? element : checkModal,

    // strings
    component = 'modal',
    staticString = 'static',
    paddingLeft = 'paddingLeft',
    paddingRight = 'paddingRight',
    modalBackdropString = 'modal-backdrop';

  if ( hasClass(element,'modal') ) { element = null; } // modal is now independent of it's triggering element

  if ( !modal ) { return; } // invalidate

  // set options
  options = options || {};

  this[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
  this[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
  this[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : this[backdrop];
  this[content]  = options[content]; // JavaScript only

  // bind, constants, event targets and other vars
  var self = this, relatedTarget = null,
    bodyIsOverflowing, modalIsOverflowing, scrollbarWidth, overlay,

    // also find fixed-top / fixed-bottom items
    fixedItems = getElementsByClassName(HTML,fixedTop).concat(getElementsByClassName(HTML,fixedBottom)),

    // private methods
    getWindowWidth = function() {
      var htmlRect = HTML[getBoundingClientRect]();
      return globalObject[innerWidth] || (htmlRect[right] - Math.abs(htmlRect[left]));
    },
    setScrollbar = function () {
      var bodyStyle = DOC[body].currentStyle || globalObject.getComputedStyle(DOC[body]),
          bodyPad = parseInt((bodyStyle[paddingRight]), 10), itemPad;
      if (bodyIsOverflowing) {
        DOC[body][style][paddingRight] = (bodyPad + scrollbarWidth) + 'px';
        if (fixedItems[length]){
          for (var i = 0; i < fixedItems[length]; i++) {
            itemPad = (fixedItems[i].currentStyle || globalObject.getComputedStyle(fixedItems[i]))[paddingRight];
            fixedItems[i][style][paddingRight] = ( parseInt(itemPad) + scrollbarWidth) + 'px';
          }
        }
      }
    },
    resetScrollbar = function () {
      DOC[body][style][paddingRight] = '';
      if (fixedItems[length]){
        for (var i = 0; i < fixedItems[length]; i++) {
          fixedItems[i][style][paddingRight] = '';
        }
      }
    },
    measureScrollbar = function () { // thx walsh
      var scrollDiv = DOC[createElement]('div'), scrollBarWidth;
      scrollDiv.className = component+'-scrollbar-measure'; // this is here to stay
      DOC[body][appendChild](scrollDiv);
      scrollBarWidth = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
      DOC[body].removeChild(scrollDiv);
    return scrollBarWidth;
    },
    checkScrollbar = function () {
      bodyIsOverflowing = DOC[body][clientWidth] < getWindowWidth();
      modalIsOverflowing = modal[scrollHeight] > HTML[clientHeight];
      scrollbarWidth = measureScrollbar();
    },
    adjustDialog = function () {
      modal[style][paddingLeft] = !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth + 'px' : '';
      modal[style][paddingRight] = bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth + 'px' : '';
    },
    resetAdjustments = function () {
      modal[style][paddingLeft] = '';
      modal[style][paddingRight] = '';
    },
    createOverlay = function() {
      modalOverlay = 1;
      
      var newOverlay = DOC[createElement]('div');
      overlay = queryElement('.'+modalBackdropString);

      if ( overlay === null ) {
        newOverlay[setAttribute]('class',modalBackdropString+' fade');
        overlay = newOverlay;
        DOC[body][appendChild](overlay);
      }
    },
    removeOverlay = function() {
      overlay = queryElement('.'+modalBackdropString);
      if ( overlay && overlay !== null && typeof overlay === 'object' ) {
        modalOverlay = 0;
        DOC[body].removeChild(overlay); overlay = null;
      }
      bootstrapCustomEvent.call(modal, hiddenEvent, component);      
    },
    keydownHandlerToggle = function() {
      if (hasClass(modal,inClass)) {
        on(DOC, keydownEvent, keyHandler);
      } else {
        off(DOC, keydownEvent, keyHandler);
      }
    },
    resizeHandlerToggle = function() {
      if (hasClass(modal,inClass)) {
        on(globalObject, resizeEvent, self.update);
      } else {
        off(globalObject, resizeEvent, self.update);
      }
    },
    dismissHandlerToggle = function() {
      if (hasClass(modal,inClass)) {
        on(modal, clickEvent, dismissHandler);
      } else {
        off(modal, clickEvent, dismissHandler);
      }
    },
    // triggers
    triggerShow = function() {
      setFocus(modal);
      bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
    },
    triggerHide = function() {
      modal[style].display = '';
      element && (setFocus(element));
      
      setTimeout(function(){
        if (!getElementsByClassName(DOC,component+' '+inClass)[0]) {
          resetAdjustments();
          resetScrollbar();
          removeClass(DOC[body],component+'-open');
          overlay && hasClass(overlay,'fade') ? (removeClass(overlay,inClass), emulateTransitionEnd(overlay,removeOverlay)) 
          : removeOverlay();

          resizeHandlerToggle();
          dismissHandlerToggle();
          keydownHandlerToggle();
        }
      }, 50);
    },
    // handlers
    clickHandler = function(e) {
      var clickTarget = e[target];
      clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
      if ( clickTarget === element && !hasClass(modal,inClass) ) {
        modal.modalTrigger = element;
        relatedTarget = element;
        self.show();
        e[preventDefault]();
      }
    },
    keyHandler = function(e) {
      var key = e.which || e.keyCode; // keyCode for IE8
      if (self[keyboard] && key == 27 && hasClass(modal,inClass)) {
        self.hide();
      }
    },
    dismissHandler = function(e) {
      var clickTarget = e[target];
      if ( hasClass(modal,inClass) && (clickTarget[parentNode][getAttribute](dataDismiss) === component
          || clickTarget[getAttribute](dataDismiss) === component
          || (clickTarget === modal && self[backdrop] !== staticString) ) ) {
        self.hide(); relatedTarget = null;
        e[preventDefault]();
      }
    };

  // public methods
  this.toggle = function() {
    if ( hasClass(modal,inClass) ) {this.hide();} else {this.show();}
  };
  this.show = function() {
    bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);

    // we elegantly hide any opened modal
    var currentOpen = getElementsByClassName(DOC,component+' in')[0];
    currentOpen && currentOpen !== modal && currentOpen.modalTrigger[stringModal].hide();

    if ( this[backdrop] ) {
      !modalOverlay && createOverlay();
    }

    if ( overlay && modalOverlay && !hasClass(overlay,inClass)) {
      overlay[offsetWidth]; // force reflow to enable trasition
      addClass(overlay,inClass);
    }

    setTimeout( function() {
      modal[style].display = 'block';

      checkScrollbar();
      setScrollbar();
      adjustDialog();

      addClass(DOC[body],component+'-open');
      addClass(modal,inClass);
      modal[setAttribute](ariaHidden, false);
      
      resizeHandlerToggle();
      dismissHandlerToggle();
      keydownHandlerToggle();

      hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
    }, supportTransitions ? 150 : 0);
  };
  this.hide = function() {
    bootstrapCustomEvent.call(modal, hideEvent, component);
    overlay = queryElement('.'+modalBackdropString);

    removeClass(modal,inClass);
    modal[setAttribute](ariaHidden, true);

    setTimeout(function(){
      hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
    }, supportTransitions ? 150 : 0);
  };
  this.setContent = function( content ) {
    queryElement('.'+component+'-content',modal)[innerHTML] = content;
  };
  this.update = function() {
    if (hasClass(modal,inClass)) {
      checkScrollbar();
      setScrollbar();
      adjustDialog();
    }
  };

  // init
  // prevent adding event handlers over and over
  // modal is independent of a triggering element
  if ( !!element && !(stringModal in element) ) {
    on(element, clickEvent, clickHandler);
  }
  if ( !!self[content] ) { self.setContent( self[content] ); }
  !!element && (element[stringModal] = self);
};

// DATA API
supports[push]( [ stringModal, Modal, '['+dataToggle+'="modal"]' ] );
