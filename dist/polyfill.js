/* Native JavaScript for Bootstrap Polyfill
--------------------------------------------*/
(function () {

  // Element.prototype.closest 
  // https://github.com/idmadj/element-closest-polyfill/blob/master/index.js
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;

      do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  // Event
  if (!window.Event || !Window.prototype.Event) {
    window.Event = Window.prototype.Event = Document.prototype.Event = Element.prototype.Event = function (type, eventInitDict) {
      if (!type) { throw new Error('Not enough arguments'); }
      var event,
        bubblesValue = eventInitDict && eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false,
        cancelableValue = eventInitDict && eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
      if ('createEvent' in document) {
        event = document.createEvent('Event');
        event.initEvent(type, bubblesValue, cancelableValue);
      } else {
        event = document.createEventObject();
        event.etype = type;
        event.bubbles = bubblesValue;
        event.cancelable = cancelableValue;
      }
      return event;
    };
  }

  // CustomEvent
  if (!window.CustomEvent || !Window.prototype.CustomEvent) {
    window.CustomEvent = Window.prototype.CustomEvent = Document.prototype.CustomEvent = Element.prototype.CustomEvent = function (type, eventInitDict) {
      if (!type) {
        throw Error('CustomEvent TypeError: An event name must be provided.');
      }
      var event = new Event(type, eventInitDict);
      event.detail = eventInitDict && eventInitDict.detail || null;
      return event;
    };
  }

  // Production steps of ECMA-262, Edition 6, 22.1.2.1
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

      return function from(arrayLike/*, mapFn, thisArg */) {
        var C = this;

        var items = Object(arrayLike);

        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
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

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
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
      };
    }());
  }
  if (!Node.prototype.contains) {
    Node.prototype.contains = function (el) {
      while (el = el.parentNode) {
        if (el === this) return true;
      }
      return false;
    }
  }
}());