/*!
  * Native JavaScript for Bootstrap Toast v3.0.14 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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

function Toast(element,options) {
  options = options || {};
  var self = this,
      toast, timer = 0,
      animationData,
      autohideData,
      delayData,
      showCustomEvent,
      hideCustomEvent,
      shownCustomEvent,
      hiddenCustomEvent,
      ops = {};
  function showComplete() {
    toast.classList.remove( 'showing' );
    toast.classList.add( 'show' );
    dispatchCustomEvent.call(toast,shownCustomEvent);
    if (ops.autohide) { self.hide(); }
  }
  function hideComplete() {
    toast.classList.add( 'hide' );
    dispatchCustomEvent.call(toast,hiddenCustomEvent);
  }
  function close () {
    toast.classList.remove('show' );
    ops.animation ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
  }
  function disposeComplete() {
    clearTimeout(timer);
    element.removeEventListener('click',self.hide,false);
    delete element.Toast;
  }
  self.show = function () {
    if (toast && !toast.classList.contains('show')) {
      dispatchCustomEvent.call(toast,showCustomEvent);
      if (showCustomEvent.defaultPrevented) { return; }
      ops.animation && toast.classList.add( 'fade' );
      toast.classList.remove('hide' );
      toast.offsetWidth;
      toast.classList.add('showing' );
      ops.animation ? emulateTransitionEnd(toast, showComplete) : showComplete();
    }
  };
  self.hide = function (noTimer) {
    if (toast && toast.classList.contains('show')) {
      dispatchCustomEvent.call(toast,hideCustomEvent);
      if(hideCustomEvent.defaultPrevented) { return; }
      noTimer ? close() : (timer = setTimeout( close, ops.delay));
    }
  };
  self.dispose = function () {
    ops.animation ? emulateTransitionEnd(toast, disposeComplete) : disposeComplete();
  };
  element = queryElement(element);
  element.Toast && element.Toast.dispose();
  toast = element.closest('.toast');
  animationData = element.getAttribute('data-animation');
  autohideData = element.getAttribute('data-autohide');
  delayData = element.getAttribute('data-delay');
  showCustomEvent = bootstrapCustomEvent('show', 'toast');
  hideCustomEvent = bootstrapCustomEvent('hide', 'toast');
  shownCustomEvent = bootstrapCustomEvent('shown', 'toast');
  hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast');
  ops.animation = options.animation === false || animationData === 'false' ? 0 : 1;
  ops.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1;
  ops.delay = parseInt(options.delay || delayData) || 500;
  if ( !element.Toast ) {
    element.addEventListener('click',self.hide,false);
  }
  element.Toast = self;
}

export default Toast;
