
/* Native JavaScript for Bootstrap 4 | Modal
-------------------------------------------- */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';
import setFocus from '../util/setFocus.js';

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
    overlayDelay,

    // also find fixed-top / fixed-bottom items
    fixedItems,
    ops = {};

  // private methods
  function setScrollbar() {
    let openModal = document.body.classList.contains('modal-open'),
        bodyPad = parseInt(getComputedStyle(document.body).paddingRight),
        bodyOverflow = document.documentElement.clientHeight !== document.documentElement.scrollHeight 
                    || document.body.clientHeight !== document.body.scrollHeight,
        modalOverflow = modal.clientHeight !== modal.scrollHeight;

    scrollBarWidth = measureScrollbar();

    modal.style.paddingRight = !modalOverflow && scrollBarWidth ? `${scrollBarWidth}px` : '';
    document.body.style.paddingRight = modalOverflow || bodyOverflow ? `${bodyPad + (openModal ? 0:scrollBarWidth)}px` : '';

    fixedItems.length && fixedItems.map(fixed=>{
      let itemPad = getComputedStyle(fixed).paddingRight;
      fixed.style.paddingRight = modalOverflow || bodyOverflow ? `${parseInt(itemPad) + (openModal?0:scrollBarWidth)}px` : `${parseInt(itemPad)}px`;
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
    let scrollDiv = document.createElement('div'), widthValue;

    scrollDiv.className = 'modal-scrollbar-measure'; // this is here to stay
    document.body.appendChild(scrollDiv);
    widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return widthValue;
  }
  function checkScrollbar() {
    
  }
  function createOverlay() {
    let newOverlay = document.createElement('div');
    overlay = queryElement('.modal-backdrop');

    if ( overlay === null ) {
      newOverlay.setAttribute('class', 'modal-backdrop' + (ops.animation ? ' fade' : ''));
      overlay = newOverlay;
      document.body.appendChild(overlay);
    }
    return overlay;
  }
  function removeOverlay () {
    overlay = queryElement('.modal-backdrop');
    if ( overlay && !document.getElementsByClassName('modal show')[0] ) {
      document.body.removeChild(overlay); overlay = null;       
    }
    overlay === null && (document.body.classList.remove('modal-open'), resetScrollbar());
  }
  function toggleEvents(action) {
    action = action ? 'addEventListener' : 'removeEventListener';
    window[action]( 'resize', self.update, passiveHandler);
    modal[action]( 'click',dismissHandler,false);
    document[action]( 'keydown',keyHandler,false);
  }
  // triggers
  function beforeShow() {
    modal.style.display = 'block'; 

    setScrollbar();
    !document.getElementsByClassName('modal show')[0] && document.body.classList.add('modal-open');

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', false);

    modal.classList.contains('fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
  }
  function triggerShow() {
    setFocus(modal);
    modal.isAnimating = false;

    toggleEvents(1);

    shownCustomEvent = bootstrapCustomEvent('shown', 'modal', { relatedTarget: relatedTarget });
    dispatchCustomEvent.call(modal, shownCustomEvent);
  }
  function triggerHide(force) {
    modal.style.display = '';
    element && (setFocus(element));

    overlay = queryElement('.modal-backdrop');

    // force can also be the transitionEvent object, we wanna make sure it's not
    if (force !== 1 && overlay && overlay.classList.contains('show') && !document.getElementsByClassName('modal show')[0]) {
      overlay.classList.remove('show');
      emulateTransitionEnd(overlay,removeOverlay);
    } else {
      removeOverlay();
    }

    toggleEvents();

    modal.isAnimating = false;

    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'modal');
    dispatchCustomEvent.call(modal, hiddenCustomEvent);
  }
  // handlers
  function clickHandler(e) {
    if ( modal.isAnimating ) return;
    let clickTarget = e.target,
        modalID = `#${modal.getAttribute('id')}`,
        targetAttrValue = clickTarget.getAttribute('data-target') || clickTarget.getAttribute('href'),
        elemAttrValue = element.getAttribute('data-target') || element.getAttribute('href');

    if ( !modal.classList.contains('show') 
        && (clickTarget === element && targetAttrValue === modalID 
        || element.contains(clickTarget) && elemAttrValue === modalID) ) {
      modal.modalTrigger = element;
      relatedTarget = element;
      self.show();
      e.preventDefault();
    }
  }
  function keyHandler({which}) {
    if (!modal.isAnimating && ops.keyboard && which == 27 && modal.classList.contains('show') ) {
      self.hide();
    }
  }
  function dismissHandler(e) {
    if ( modal.isAnimating ) return;
    let clickTarget = e.target,
        hasData = clickTarget.getAttribute('data-dismiss') === 'modal',
        parentWithData = clickTarget.closest('[data-dismiss="modal"]');

    if ( modal.classList.contains('show') && ( parentWithData || hasData
        || clickTarget === modal && ops.backdrop !== 'static' ) ) {
      self.hide(); relatedTarget = null;
      e.preventDefault();
    }
  }

  // public methods
  self.toggle = () => {
    if ( modal.classList.contains('show') ) {self.hide();} else {self.show();}
  };
  self.show = () => {
    if (modal.classList.contains('show') && !!modal.isAnimating ) {return}

    showCustomEvent = bootstrapCustomEvent('show', 'modal', { relatedTarget: relatedTarget });
    dispatchCustomEvent.call(modal, showCustomEvent);

    if ( showCustomEvent.defaultPrevented ) return;

    modal.isAnimating = true;

    // we elegantly hide any opened modal
    let currentOpen = document.getElementsByClassName('modal show')[0];
    if (currentOpen && currentOpen !== modal) {
      currentOpen.modalTrigger && currentOpen.modalTrigger.Modal.hide();
      currentOpen.Modal && currentOpen.Modal.hide();
    }

    if ( ops.backdrop ) {
      overlay = createOverlay();
    }

    if ( overlay && !currentOpen && !overlay.classList.contains('show') ) {
      overlay.offsetWidth; // force reflow to enable trasition
      overlayDelay = getElementTransitionDuration(overlay);
      overlay.classList.add('show');
    }

    !currentOpen ? setTimeout( beforeShow, overlay && overlayDelay ? overlayDelay:0 ) : beforeShow();
  };
  self.hide = (force) => {
    if ( !modal.classList.contains('show') ) {return}

    hideCustomEvent = bootstrapCustomEvent( 'hide', 'modal');
    dispatchCustomEvent.call(modal, hideCustomEvent);
    if ( hideCustomEvent.defaultPrevented ) return;

    modal.isAnimating = true;    

    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', true);

    modal.classList.contains('fade') && force !== 1 ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
  };
  self.setContent = content => {
    queryElement('.modal-content',modal).innerHTML = content;
  };
  self.update = () => {
    if (modal.classList.contains('show')) {
      setScrollbar();
    }
  };
  self.dispose = () => {
    self.hide(1);
    if (element) {element.removeEventListener('click',clickHandler,false); delete element.Modal; } 
    else {delete modal.Modal;}
  };

  // init

  // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
  element = queryElement(element);

  // determine modal, triggering element
  let checkModal = queryElement( element.getAttribute('data-target') || element.getAttribute('href') )
  modal = element.classList.contains('modal') ? element : checkModal

  // set fixed items
  fixedItems = Array.from(document.getElementsByClassName('fixed-top'))
                    .concat(Array.from(document.getElementsByClassName('fixed-bottom')));

  if ( element.classList.contains('modal') ) { element = null; } // modal is now independent of it's triggering element

  // reset on re-init
  element && element.Modal && element.Modal.dispose();
  modal && modal.Modal && modal.Modal.dispose();

  // set options
  ops.keyboard = options.keyboard === false || modal.getAttribute('data-keyboard') === 'false' ? false : true;
  ops.backdrop = options.backdrop === 'static' || modal.getAttribute('data-backdrop') === 'static' ? 'static' : true;
  ops.backdrop = options.backdrop === false || modal.getAttribute('data-backdrop') === 'false' ? false : ops.backdrop;
  ops.animation = modal.classList.contains('fade') ? true : false;
  ops.content = options.content; // JavaScript only
  
  // set an initial state of the modal
  modal.isAnimating = false;

  // prevent adding event handlers over and over
  // modal is independent of a triggering element
  if ( element && !element.Modal ) {
    element.addEventListener('click',clickHandler,false);
  }

  if ( ops.content ) { 
    self.setContent( ops.content.trim() ); 
  }

  // set associations
  if (element) { 
    modal.modalTrigger = element;
    element.Modal = self;
  } else { 
    modal.Modal = self;
  }

}

