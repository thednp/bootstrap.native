/*!
  * Native JavaScript for Bootstrap Polyfill v3.0.10 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
 "use strict";
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    return function from(arrayLike) {
      var C = this, items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined, T;
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      var k = 0;
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    }
  }());
}

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function closest(selector) {
    var node = this;
    while (node) {
      if (node.matches(selector)) { return node; }
      else { node = 'SVGElement' in window && node instanceof SVGElement ? node.parentNode : node.parentElement; }
    }
    return null;
  };
}

if (!window.Event || !Window.prototype.Event) {
  window.Event = Window.prototype.Event = Document.prototype.Event = Element.prototype.Event = function Event(type, eventInitDict) {
    if (!type) { throw new Error('Not enough arguments'); }
    var event,
      bubbles = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false,
      cancelable = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
    if ( 'createEvent' in document ) {
      event = document.createEvent('Event');
      event.initEvent(type, bubbles, cancelable);
    } else {
      event = document.createEventObject();
      event.type = type;
      event.bubbles = bubbles;
      event.cancelable = cancelable;
    }
    return event;
  };
}

if ( !window.CustomEvent || !Window.prototype.CustomEvent) {
  window.CustomEvent = Window.prototype.CustomEvent = Document.prototype.CustomEvent = Element.prototype.CustomEvent = function CustomEvent(type, eventInitDict) {
    if (!type) {
      throw Error('TypeError: Failed to construct "CustomEvent": An event name must be provided.');
    }
    var event = new Event(type, eventInitDict);
    event.detail = eventInitDict && eventInitDict.detail || null;
    return event;
  };
}

if (!Node.prototype.contains) {
  Node.prototype.contains = function (el) {
    while (el = el.parentNode) {
      if (el === this) { return true; }
    }
    return false;
  };
}
