/*!
  * Native JavaScript for Bootstrap Modal v3.0.14 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
var supportPassive = (function () {
  var result = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        result = true;
      }
    });
    document.addEventListener('DOMContentLoaded', function wrap(){
      document.removeEventListener('DOMContentLoaded', wrap, opts);
    }, opts);
  } catch (e) {}
  return result;
})();

var passiveHandler = supportPassive ? { passive: true } : false;

var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  var computedStyle = getComputedStyle(element),
      property = computedStyle[transitionProperty],
      duration = supportTransition && property && property !== 'none'
               ? parseFloat(computedStyle[transitionDuration]) : 0;
  return !isNaN(duration) ? duration * 1000 : 0;
}

function emulateTransitionEnd(element,handler){
  var called = 0, duration = getElementTransitionDuration(element);
  duration ? element.addEventListener( transitionEndEvent, function transitionEndWrapper(e){
              !called && handler(e), called = 1;
              element.removeEventListener( transitionEndEvent, transitionEndWrapper);
            })
           : setTimeout(function() { !called && handler(), called = 1; }, 17);
}

function queryElement(selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function bootstrapCustomEvent(eventName, componentName, eventProperties) {
  var OriginalCustomEvent = new CustomEvent( eventName + '.bs.' + componentName, {cancelable: true});
  if (typeof eventProperties !== 'undefined') {
    Object.keys(eventProperties).forEach(function (key) {
      Object.defineProperty(OriginalCustomEvent, key, {
        value: eventProperties[key]
      });
    });
  }
  return OriginalCustomEvent;
}

function dispatchCustomEvent(customEvent){
  this && this.dispatchEvent(customEvent);
}

function setFocus (element){
  element.focus ? element.focus() : element.setActive();
}

function Modal(element,options) {
  options = options || {};
  var self = this, modal,
    showCustomEvent,
    shownCustomEvent,
    hideCustomEvent,
    hiddenCustomEvent,
    relatedTarget = null,
    scrollBarWidth,
    overlay,
    overlayDelay,
    fixedItems,
    ops = {};
  function setScrollbar() {
    var openModal = document.body.classList.contains('modal-open'),
        bodyPad = parseInt(getComputedStyle(document.body).paddingRight),
        bodyOverflow = document.documentElement.clientHeight !== document.documentElement.scrollHeight
                    || document.body.clientHeight !== document.body.scrollHeight,
        modalOverflow = modal.clientHeight !== modal.scrollHeight;
    scrollBarWidth = measureScrollbar();
    modal.style.paddingRight = !modalOverflow && scrollBarWidth ? (scrollBarWidth + "px") : '';
    document.body.style.paddingRight = modalOverflow || bodyOverflow ? ((bodyPad + (openModal ? 0:scrollBarWidth)) + "px") : '';
    fixedItems.length && fixedItems.map(function (fixed){
      var itemPad = getComputedStyle(fixed).paddingRight;
      fixed.style.paddingRight = modalOverflow || bodyOverflow ? ((parseInt(itemPad) + (openModal?0:scrollBarWidth)) + "px") : ((parseInt(itemPad)) + "px");
    });
  }
  function resetScrollbar() {
    document.body.style.paddingRight = '';
    modal.style.paddingRight = '';
    fixedItems.length && fixedItems.map(function (fixed){
      fixed.style.paddingRight = '';
    });
  }
  function measureScrollbar() {
    var scrollDiv = document.createElement('div'), widthValue;
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);
    widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return widthValue;
  }
  function createOverlay() {
    var newOverlay = document.createElement('div');
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
  function clickHandler(e) {
    if ( modal.isAnimating ) { return; }
    var clickTarget = e.target,
        modalID = "#" + (modal.getAttribute('id')),
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
  function keyHandler(ref) {
    var which = ref.which;
    if (!modal.isAnimating && ops.keyboard && which == 27 && modal.classList.contains('show') ) {
      self.hide();
    }
  }
  function dismissHandler(e) {
    if ( modal.isAnimating ) { return; }
    var clickTarget = e.target,
        hasData = clickTarget.getAttribute('data-dismiss') === 'modal',
        parentWithData = clickTarget.closest('[data-dismiss="modal"]');
    if ( modal.classList.contains('show') && ( parentWithData || hasData
        || clickTarget === modal && ops.backdrop !== 'static' ) ) {
      self.hide(); relatedTarget = null;
      e.preventDefault();
    }
  }
  self.toggle = function () {
    if ( modal.classList.contains('show') ) {self.hide();} else {self.show();}
  };
  self.show = function () {
    if (modal.classList.contains('show') && !!modal.isAnimating ) {return}
    showCustomEvent = bootstrapCustomEvent('show', 'modal', { relatedTarget: relatedTarget });
    dispatchCustomEvent.call(modal, showCustomEvent);
    if ( showCustomEvent.defaultPrevented ) { return; }
    modal.isAnimating = true;
    var currentOpen = document.getElementsByClassName('modal show')[0];
    if (currentOpen && currentOpen !== modal) {
      currentOpen.modalTrigger && currentOpen.modalTrigger.Modal.hide();
      currentOpen.Modal && currentOpen.Modal.hide();
    }
    if ( ops.backdrop ) {
      overlay = createOverlay();
    }
    if ( overlay && !currentOpen && !overlay.classList.contains('show') ) {
      overlay.offsetWidth;
      overlayDelay = getElementTransitionDuration(overlay);
      overlay.classList.add('show');
    }
    !currentOpen ? setTimeout( beforeShow, overlay && overlayDelay ? overlayDelay:0 ) : beforeShow();
  };
  self.hide = function (force) {
    if ( !modal.classList.contains('show') ) {return}
    hideCustomEvent = bootstrapCustomEvent( 'hide', 'modal');
    dispatchCustomEvent.call(modal, hideCustomEvent);
    if ( hideCustomEvent.defaultPrevented ) { return; }
    modal.isAnimating = true;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', true);
    modal.classList.contains('fade') && force !== 1 ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
  };
  self.setContent = function (content) {
    queryElement('.modal-content',modal).innerHTML = content;
  };
  self.update = function () {
    if (modal.classList.contains('show')) {
      setScrollbar();
    }
  };
  self.dispose = function () {
    self.hide(1);
    if (element) {element.removeEventListener('click',clickHandler,false); delete element.Modal; }
    else {delete modal.Modal;}
  };
  element = queryElement(element);
  var checkModal = queryElement( element.getAttribute('data-target') || element.getAttribute('href') );
  modal = element.classList.contains('modal') ? element : checkModal;
  fixedItems = Array.from(document.getElementsByClassName('fixed-top'))
                    .concat(Array.from(document.getElementsByClassName('fixed-bottom')));
  if ( element.classList.contains('modal') ) { element = null; }
  element && element.Modal && element.Modal.dispose();
  modal && modal.Modal && modal.Modal.dispose();
  ops.keyboard = options.keyboard === false || modal.getAttribute('data-keyboard') === 'false' ? false : true;
  ops.backdrop = options.backdrop === 'static' || modal.getAttribute('data-backdrop') === 'static' ? 'static' : true;
  ops.backdrop = options.backdrop === false || modal.getAttribute('data-backdrop') === 'false' ? false : ops.backdrop;
  ops.animation = modal.classList.contains('fade') ? true : false;
  ops.content = options.content;
  modal.isAnimating = false;
  if ( element && !element.Modal ) {
    element.addEventListener('click',clickHandler,false);
  }
  if ( ops.content ) {
    self.setContent( ops.content.trim() );
  }
  if (element) {
    modal.modalTrigger = element;
    element.Modal = self;
  } else {
    modal.Modal = self;
  }
}

export default Modal;
