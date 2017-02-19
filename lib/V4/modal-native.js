
/* Native Javascript for Bootstrap 4 | Modal
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
  var self = this, open = this.open = false, relatedTarget = null,
    bodyIsOverflowing, modalIsOverflowing, scrollbarWidth, overlay,

    // also find fixed-top / fixed-bottom items
    fixedItems = getElementsByClassName(doc,'fixed-top').concat(getElementsByClassName(doc,'fixed-bottom')),


    // private methods
    getWindowWidth = function() {
      var htmlRect = doc[getBoundingClientRect]();
      return globalObject[innerWidth] || (htmlRect[right] - Math.abs(htmlRect[left]));
    },
    setScrollbar = function () {
      var bodyStyle = globalObject.getComputedStyle(body), 
          bodyPad = parseInt((bodyStyle[paddingRight]), 10), itemPad;
      if (bodyIsOverflowing) { 
        body[style][paddingRight] = (bodyPad + scrollbarWidth) + 'px';
        if (fixedItems[length]){
          for (var i = 0; i < fixedItems[length]; i++) {
            itemPad = globalObject.getComputedStyle(fixedItems[i])[paddingRight];
            fixedItems[i][style][paddingRight] = ( parseInt(itemPad) + scrollbarWidth) + 'px';
          }
        }
      }
    },
    resetScrollbar = function () {
      body[style][paddingRight] = '';
      if (fixedItems[length]){
        for (var i = 0; i < fixedItems[length]; i++) {
          fixedItems[i][style][paddingRight] = '';
        }
      }
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
      modal[style][paddingLeft] = !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth + 'px' : '';
      modal[style][paddingRight] = bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth + 'px' : '';
    },
    resetAdjustments = function () {
      modal[style][paddingLeft] = '';
      modal[style][paddingRight] = '';
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
      if (!hasClass(modal,showClass)) {
        on(document, keydownEvent, keyHandler);
      } else {
        off(document, keydownEvent, keyHandler);
      }
    },
    resizeHandlerToggle = function() {
      if (!hasClass(modal,showClass)) {
        on(globalObject, resizeEvent, self.update);
      } else {
        off(globalObject, resizeEvent, self.update);
      }
    },
    dismissHandlerToggle = function() {
      if (!hasClass(modal,showClass)) {
        on(modal, clickEvent, dismissHandler);
      } else {
        off(modal, clickEvent, dismissHandler);
      }
    },
    // handlers
    clickHandler = function(e) {
      var clickTarget = e[target]; 
      clickTarget = clickTarget[hasAttribute](dataTarget) || clickTarget[hasAttribute]('href') ? clickTarget : clickTarget[parentNode];
      if ( !open && clickTarget === element && !hasClass(modal,showClass) ) {
        modal.modalTrigger = element;
        relatedTarget = element;
        self.show();
        e.preventDefault();
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
      if ( open && (clickTarget[parentNode][getAttribute](dataDismiss) === component 
          || clickTarget[getAttribute](dataDismiss) === component
          || (clickTarget === modal && self[backdrop] !== staticString) ) ) {
        self.hide(); relatedTarget = null;
        e.preventDefault();
      }
    };

  // public methods
  this.toggle = function() {
    if (open && hasClass(modal,showClass)) {this.hide();} else {this.show();}
  };
  this.show = function() {
    bootstrapCustomEvent.call(modal, showEvent, component, relatedTarget);

    // we elegantly hide any opened modal
    var currentOpen = getElementsByClassName(document,component+' '+showClass)[0];
    currentOpen && currentOpen !== modal && currentOpen.modalTrigger[stringModal].hide(); 

    if ( this[backdrop] ) {
      createOverlay();
    }

    if ( overlay && !hasClass(overlay,showClass)) {
      setTimeout( function() { addClass(overlay, showClass); },0);
    }

    setTimeout( function() {
      modal[style].display = 'block';

      checkScrollbar();
      setScrollbar();
      adjustDialog();

      resizeHandlerToggle();
      dismissHandlerToggle();
      keydownHandlerToggle();

      addClass(body,component+'-open');
      addClass(modal,showClass);
      modal[setAttribute](ariaHidden, false);

      emulateTransitionEnd(modal, function(){
        open = self.open = true;
        setFocus(modal);
        bootstrapCustomEvent.call(modal, shownEvent, component, relatedTarget);
      });
    }, supportTransitions ? 150 : 0);
  };
  this.hide = function() {
    bootstrapCustomEvent.call(modal, hideEvent, component);
    overlay = queryElement('.'+modalBackdropString);

    removeClass(modal,showClass);
    modal[setAttribute](ariaHidden, true);

    !!overlay && removeClass(overlay,showClass);

    setTimeout(function(){
    emulateTransitionEnd(modal, function(){
      resizeHandlerToggle();
      dismissHandlerToggle();
      keydownHandlerToggle();

      modal[style].display = '';

      open = self.open = false;
      element && (setFocus(element));
      bootstrapCustomEvent.call(modal, hiddenEvent, component);
      setTimeout(function(){
        if (!getElementsByClassName(document,component+' '+showClass)[0]) {
          resetAdjustments();
          resetScrollbar();
          removeClass(body,component+'-open');
          removeOverlay(); 
        }
      }, 100);
    });
    }, supportTransitions ? 150 : 0);
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

