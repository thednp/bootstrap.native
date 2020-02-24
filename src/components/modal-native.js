
/* Native JavaScript for Bootstrap 4 | Modal
-------------------------------------------- */
import { hasClass, addClass, removeClass } from '../util/class.js';
import { bootstrapCustomEvent, dispatchCustomEvent, on, off, passiveHandler } from '../util/event.js';
import { queryElement, getElementsByClassName } from '../util/selector.js';
import { emulateTransitionEnd, getElementTransitionDuration } from '../util/transition.js';
import { componentInit, setFocus } from '../util/misc.js';

// MODAL DEFINITION
// ================

export default function Modal(element,options) { // element can be the modal/triggering button

  // set options
  options = options || {};

  // bind, modal
  let self = this, modal,

    // custom events
    showCustomEvent,
    shownCustomEvent,
    hideCustomEvent,
    hiddenCustomEvent,
    // event targets and other
    relatedTarget = null,
    scrollBarWidth,
    overlay,
    overlayDelay;

  // also find fixed-top / fixed-bottom items
  const fixedItems = getElementsByClassName(document.documentElement,'fixed-top')
                    .concat(getElementsByClassName(document.documentElement,'fixed-bottom'));

  // private methods
  function setScrollbar() {
    const openModal = hasClass(document.body,'modal-open'),
          bodyStyle = window.getComputedStyle(document.body),
          bodyPad = parseInt((bodyStyle.paddingRight), 10);
    let itemPad;

    document.body.style.paddingRight = `${bodyPad + (openModal?0:scrollBarWidth)}px`;
    modal.style.paddingRight = (scrollBarWidth?`${scrollBarWidth}px`:'');

    fixedItems.length && fixedItems.map(fixed=>{
      itemPad = window.getComputedStyle(fixed).paddingRight;
      fixed.style.paddingRight = `${parseInt(itemPad) + (openModal?0:scrollBarWidth)}px`;
    })
  }
  function resetScrollbar() {
    document.body.style.paddingRight = '';
    modal.style.paddingRight = '';
    fixedItems.length && fixedItems.map(fixed=>{
      fixed.style.paddingRight = '';
    })
  }
  function measureScrollbar() {
    const scrollDiv = document.createElement('div');
    let widthValue;

    scrollDiv.className = 'modal-scrollbar-measure'; // this is here to stay
    document.body.appendChild(scrollDiv);
    widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return widthValue;
  }
  function checkScrollbar() {
    scrollBarWidth = measureScrollbar();
  }
  function createOverlay() {
    const newOverlay = document.createElement('div');
    overlay = queryElement('.modal-backdrop');

    if ( overlay === null ) {
      newOverlay.setAttribute('class', 'modal-backdrop' + (self.options.animation ? ' fade' : ''));
      overlay = newOverlay;
      document.body.appendChild(overlay);
    }
    return overlay;
  }
  function removeOverlay () {
    overlay = queryElement('.modal-backdrop');
    if ( overlay && !getElementsByClassName(document,'modal show')[0] ) {
      document.body.removeChild(overlay); overlay = null;       
    }
    overlay === null && (removeClass(document.body,'modal-open'), resetScrollbar());
  }
  function toggleEvents(action) {
    action(window, 'resize', self.update, passiveHandler);
    action(modal, 'click', dismissHandler);
    action(document, 'keydown', keyHandler);
  }
  // triggers
  function beforeShow() {
    modal.style.display = 'block'; 

    checkScrollbar();
    setScrollbar();
    !getElementsByClassName(document,'modal show')[0] && addClass(document.body,'modal-open');

    addClass(modal,'show');
    modal.setAttribute('aria-hidden', false);

    hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
  }
  function triggerShow() {
    setFocus(modal);
    modal.isAnimating = false;

    toggleEvents(on);

    shownCustomEvent = bootstrapCustomEvent('shown', 'modal', relatedTarget);
    dispatchCustomEvent.call(modal, shownCustomEvent);
  }
  function triggerHide() {
    modal.style.display = '';
    element && (setFocus(element));

    overlay = queryElement('.modal-backdrop');

    if (overlay && hasClass(overlay,'show') && !getElementsByClassName(document,'modal show')[0]) {
      removeClass(overlay,'show');
      emulateTransitionEnd(overlay,removeOverlay);
    } else {
      removeOverlay();
    }

    toggleEvents(off);

    modal.isAnimating = false;

    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'modal');
    dispatchCustomEvent.call(modal, hiddenCustomEvent);
  }
  // handlers
  function clickHandler(e) {
    if ( modal.isAnimating ) return;

    let clickTarget = e.target;
    clickTarget = clickTarget.hasAttribute('data-target') || clickTarget.hasAttribute('href') ? clickTarget : clickTarget.parentNode;
    if ( clickTarget === element && !hasClass(modal,'show') ) {
      modal.modalTrigger = element;
      relatedTarget = element;
      self.show();
      e.preventDefault();
    }
  }
  function keyHandler({which}) {
    if ( modal.isAnimating ) return;

    if (self.options.keyboard && which == 27 && hasClass(modal,'show') ) {
      self.hide();
    }
  }
  function dismissHandler(e) {
    if ( modal.isAnimating ) return;
    const clickTarget = e.target;

    if ( hasClass(modal,'show') && ( clickTarget.parentNode.getAttribute('data-dismiss') === 'modal'
        || clickTarget.getAttribute('data-dismiss') === 'modal'
        || clickTarget === modal && self.options.backdrop !== 'static' ) ) {
      self.hide(); relatedTarget = null;
      e.preventDefault();
    }
  }

  // public methods
  self.toggle = () => {
    if ( hasClass(modal,'show') ) {self.hide();} else {self.show();}
  };
  self.show = () => {
    if ( hasClass(modal,'show') ) {return}

    showCustomEvent = bootstrapCustomEvent('show', 'modal', relatedTarget);
    dispatchCustomEvent.call(modal, showCustomEvent);

    if ( showCustomEvent.defaultPrevented ) return;

    modal.isAnimating = true;

    // we elegantly hide any opened modal
    const currentOpen = getElementsByClassName(document,'modal show')[0];
    if (currentOpen && currentOpen !== modal) {
      currentOpen.modalTrigger && currentOpen.modalTrigger.Modal.hide();
      currentOpen.Modal && currentOpen.Modal.hide();
    }

    if ( self.options.backdrop ) {
      overlay = createOverlay();
    }

    if ( overlay && !currentOpen && !hasClass(overlay,'show') ) {
      overlay.offsetWidth; // force reflow to enable trasition
      overlayDelay = getElementTransitionDuration(overlay);
      addClass(overlay, 'show');
    }

    !currentOpen ? setTimeout( beforeShow, overlay && overlayDelay ? overlayDelay:0 ) : beforeShow();
  };
  self.hide = () => {
    if ( !hasClass(modal,'show') ) {return}

    hideCustomEvent = bootstrapCustomEvent( 'hide', 'modal');
    dispatchCustomEvent.call(modal, hideCustomEvent);
    if ( hideCustomEvent.defaultPrevented ) return;

    modal.isAnimating = true;    

    removeClass(modal,'show');
    modal.setAttribute('aria-hidden', true);

    hasClass(modal,'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
  };
  self.setContent = content => {
    queryElement('.modal-content',modal).innerHTML = content;
  };
  self.update = () => {
    if (hasClass(modal,'show')) {
      checkScrollbar();
      setScrollbar();
    }
  };
  self.dispose = () => {
    self.hide();
    if (element) {off(element, 'click', clickHandler); delete element.Modal; } 
    else {delete modal.Modal;}
  };

  // init
  componentInit(()=>{

    // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
    element = queryElement(element);

    // determine modal, triggering element
    let checkModal = queryElement( element.getAttribute('data-target') || element.getAttribute('href') )
    modal = hasClass(element,'modal') ? element : checkModal

    if ( hasClass(element, 'modal') ) { element = null; } // modal is now independent of it's triggering element

    // reset on re-init
    element && element.Modal && element.Modal.dispose();
    modal && modal.Modal && modal.Modal.dispose();

    // set options
    self.options = {};
    self.options.keyboard = options.keyboard === false || modal.getAttribute('data-keyboard') === 'false' ? false : true;
    self.options.backdrop = options.backdrop === 'static' || modal.getAttribute('data-backdrop') === 'static' ? 'static' : true;
    self.options.backdrop = options.backdrop === false || modal.getAttribute('data-backdrop') === 'false' ? false : self.options.backdrop;
    self.options.animation = hasClass(modal, 'fade') ? true : false;
    self.options.content = options.content; // JavaScript only
    
    // set an initial state of the modal
    modal.isAnimating = false;  

    // prevent adding event handlers over and over
    // modal is independent of a triggering element
    if ( element && !element.Modal ) {
      on(element, 'click', clickHandler);
    }

    if ( self.options.content ) { 
      self.setContent( self.options.content.trim() ); 
    }
  
    // set associations
    self.modal = modal;
    if (element) { 
      modal.modalTrigger = element;
      self.element = element;
      element.Modal = self;
    } else { 
      modal.Modal = self;
    }

  })

}

