/*!
  * Native JavaScript for Bootstrap Alert v3.0.14 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Alert = factory());
}(this, (function () { 'use strict';

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

  function Alert(element) {
    var self = this,
      alert,
      closeCustomEvent = bootstrapCustomEvent('close','alert'),
      closedCustomEvent = bootstrapCustomEvent('closed','alert');
    function triggerHandler() {
      alert.classList.contains('fade') ? emulateTransitionEnd(alert,transitionEndHandler) : transitionEndHandler();
    }
    function toggleEvents(action){
      action = action ? 'addEventListener' : 'removeEventListener';
      element[action]('click',clickHandler,false);
    }
    function clickHandler(e) {
      alert = e && e.target.closest(".alert");
      element = queryElement('[data-dismiss="alert"]',alert);
      element && alert && (element === e.target || element.contains(e.target)) && self.close();
    }
    function transitionEndHandler() {
      toggleEvents();
      alert.parentNode.removeChild(alert);
      dispatchCustomEvent.call(alert,closedCustomEvent);
    }
    self.close = function () {
      if ( alert && element && alert.classList.contains('show') ) {
        dispatchCustomEvent.call(alert,closeCustomEvent);
        if ( closeCustomEvent.defaultPrevented ) { return; }
        self.dispose();
        alert.classList.remove('show');
        triggerHandler();
      }
    };
    self.dispose = function () {
      toggleEvents();
      delete element.Alert;
    };
    element = queryElement(element);
    alert = element.closest('.alert');
    element.Alert && element.Alert.dispose();
    if ( !element.Alert ) {
      toggleEvents(1);
    }
    self.element = element;
    element.Alert = self;
  }

  return Alert;

})));
