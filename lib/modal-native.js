
/* Native Javascript for Bootstrap 3 | Modal
-------------------------------------------*/
  
// MODAL DEFINITION
// ===============
var Modal = function(element, options) { // element can be the modal/triggering button

  // the modal (JavaScript init) / triggering button element (DATA API)
  element = queryElement(element);

  // determine modal, triggering element 
  var btnCheck = element[getAttribute](dataTarget)||element[getAttribute]('href'),
    checkModal = queryElement( btnCheck ),
    modal = hasClass(element,'modal') ? element : checkModal,

    // strings
    component = 'modal',
    staticString = 'static',
    paddingLeft = 'paddingLeft',
    paddingRight = 'paddingRight'
    modalBackdropString = 'modal-backdrop';

  if ( hasClass(element,'modal') ) { element = null; } // modal is now independent of it's triggering element

  if ( !modal ) { return; } // invalidate

  // set options
  options = options || {};

  this[keyboard] = options[keyboard] === false || modal[getAttribute](dataKeyboard) === 'false' ? false : true;
  this[backdrop] = options[backdrop] === staticString || modal[getAttribute](databackdrop) === staticString ? staticString : true;
  this[backdrop] = options[backdrop] === false || modal[getAttribute](databackdrop) === 'false' ? false : this[backdrop];
  this[duration] = (isIE && isIE < 10) ? 50 : (options[duration] || parseInt(modal[getAttribute](dataDuration)) || 300); // the default modal fade duration option
  this[content]  = options[content]; // JavaScript only

  // bind, constants, event targets and other vars
  var self = this, open = this.open = false, relatedTarget = null,
    bodyIsOverflowing, modalIsOverflowing, scrollbarWidth, overlay,

    // private methods
    getWindowWidth = function() {
      var htmlRect = doc[getBoundingClientRect]();
      return globalObject[innerWidth] || (htmlRect[right] - Math.abs(htmlRect[left]));
    },
    setScrollbar = function () {
      var bodyStyle = body.currentStyle || globalObject.getComputedStyle(body), bodyPad = parseInt((bodyStyle[paddingRight]), 10);
      if (bodyIsOverflowing) { body.style[paddingRight] = (bodyPad + scrollbarWidth) + 'px'; }
    },
    resetScrollbar = function () {
      body.style[paddingRight] = '';
    },
    measureScrollbar = function () { // thx walsh
      var scrollDiv = document.createElement('div'), scrollBarWidth;
      scrollDiv.className = component+'-scrollbar-measure'; // this is here to stay
      body.appendChild(scrollDiv);
      scrollBarWidth = scrollDiv[offsetWidth] - scrollDiv[clientWidth];
      body.removeChild(scrollDiv);
      return scrollBarWidth;
    },
    checkScrollbar = function () {
      bodyIsOverflowing = body[clientWidth] < getWindowWidth();
      modalIsOverflowing = modal[scrollHeight] > doc[clientHeight];
      scrollbarWidth = measureScrollbar();
    },
    adjustDialog = function () {
      modal.style[paddingLeft] = !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth + 'px' : '';
      modal.style[paddingRight] = bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth + 'px' : '';
    },
    resetAdjustments = function () {
      modal.style[paddingLeft] = '';
      modal.style[paddingRight] = '';
    },
    createOverlay = function() {
      var newOverlay = document.createElement('div');
      overlay = queryElement('.'+modalBackdropString);

      if ( overlay === null ) {
        newOverlay[setAttribute]('class',modalBackdropString+' fade');
        overlay = newOverlay;
        body.appendChild(overlay);
      }
    },
    removeOverlay = function() {
      overlay = queryElement('.'+modalBackdropString); 
      if ( overlay && overlay !== null && typeof overlay === 'object' ) {
        body.removeChild(overlay); overlay = null;
      }
    },
    keydownHandlerToggle = function() {
      if (!hasClass(modal,'in')) {
        on(document, keydownEvent, keyHandler);
      } else {
        off(document, keydownEvent, keyHandler);
      }
    },
    resizeHandlerToggle = function() {
      if (!hasClass(modal,'in')) {
        on(globalObject, resizeEvent, self.update);
      } else {
        off(globalObject, resizeEvent, self.update);
      }
    },
    dismissHandlerToggle = function() {
      if (!hasClass(modal,'in')) {
        on(modal, clickEvent, dismissHandler);
      } else {
        off(modal, clickEvent, dismissHandler);
      }
    },
    // handlers
    clickHandler = function(e) {
      var clickTarget = e[target]; 
      clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
      if ( !e.defaultPrevented && !open && clickTarget === element && !hasClass(modal,'in') ) {
        modal.modalTrigger = element;
        relatedTarget = element;
        self.show();
        e.preventDefault();
        setTimeout(function(){ e.defaultPrevented = false; }, 50);
      }
    },
    keyHandler = function(e) {
      var key = e.which || e.keyCode; // keyCode for IE8
      if (self[keyboard] && key == 27 && open) {
        self.hide();
      }
    },
    dismissHandler = function(e) {
      var clickTarget = e[target];
      if ( !e.defaultPrevented && open && (clickTarget[parentNode][getAttribute](dataDismiss) === component 
          || clickTarget[getAttribute](dataDismiss) === component
          || (clickTarget === modal && self[backdrop] !== staticString) ) ) {
        self.hide(); relatedTarget = null;
        e.preventDefault();
        setTimeout(function(){ e.defaultPrevented = false; }, 50);
      }
    };

  // public methods
  this.toggle = function() {
    if (open && hasClass(modal,'in')) {this.hide();} else {this.show();}
  };
  this.show = function() {
    bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);

    var currentOpen = getElementsByClassName(document,component+' in')[0];
    currentOpen && currentOpen !== modal && currentOpen.modalTrigger[stringModal].hide(); // we elegantly hide any opened modal

    if ( this[backdrop] ) {
      createOverlay();
    }

    if ( overlay && !hasClass(overlay,'in')) {
      setTimeout( function() { addClass(overlay,'in'); }, 0);
    }

    setTimeout( function() {
      modal.style.display = 'block';

      checkScrollbar();
      setScrollbar();
      adjustDialog();

      resizeHandlerToggle();
      dismissHandlerToggle();
      keydownHandlerToggle();

      addClass(body,component+'-open');
      addClass(modal,'in');
      modal[setAttribute](ariaHidden, false);
    }, this[duration]/2);
    setTimeout( function() {
      open = self.open = true;
      bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
    }, this[duration]);
  };
  this.hide = function() {
    bootstrapCustomEvent.call(modal, hideEvent, component);
    overlay = queryElement('.'+modalBackdropString);

    if ( overlay !== null ) {
      removeClass(overlay,'in');
    }
    removeClass(modal,'in');
    modal[setAttribute](ariaHidden, true);

    setTimeout( function() {
      removeClass(body,component+'-open');

      resizeHandlerToggle();
      dismissHandlerToggle();
      keydownHandlerToggle();

      resetAdjustments();
      resetScrollbar();
      modal.style.display = '';
    }, this[duration]/2);

    setTimeout( function() {
      if (!getElementsByClassName(document,component+' in')[0]) { removeOverlay(); }
      open = self.open = false;
      bootstrapCustomEvent.call(modal, hiddenEvent, component);
    }, this[duration]);
  };
  this.setContent = function( content ) {
    queryElement('.'+component+'-content',modal).innerHTML = content;
  };
  this.update = function() {
    if (open) {
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
  if ( !!this[content] ) { this.setContent( this[content] ); }
  !!element && (element[stringModal] = this);
};

// DATA API
initializeDataAPI(stringModal, Modal, dataToggle);

