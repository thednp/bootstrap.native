/*!
  * Native JavaScript for Bootstrap v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * A global namespace for 'transitionend' string.
 * @type {string}
 */
const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

/**
 * A global namespace for CSS3 transition support.
 * @type {boolean}
 */
const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

/**
 * A global namespace for 'transitionDelay' string.
 * @type {string}
 */
const transitionDelay = 'webkitTransition' in document.head.style ? 'webkitTransitionDelay' : 'transitionDelay';

/**
 * A global namespace for 'transitionProperty' string.
 * @type {string}
 */
const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

/**
 * Utility to get the computed transitionDelay
 * from Element in miliseconds.
 *
 * @param {Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDelay(element) {
  const computedStyle = getComputedStyle(element);
  const propertyValue = computedStyle[transitionProperty];
  const delayValue = computedStyle[transitionDelay];
  const delayScale = delayValue.includes('ms') ? 1 : 1000;
  const duration = supportTransition && propertyValue && propertyValue !== 'none'
    ? parseFloat(delayValue) * delayScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * A global namespace for 'transitionDuration' string.
 * @type {string}
 */
const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

/**
 * Utility to get the computed transitionDuration
 * from Element in miliseconds.
 *
 * @param {Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDuration(element) {
  const computedStyle = getComputedStyle(element);
  const propertyValue = computedStyle[transitionProperty];
  const durationValue = computedStyle[transitionDuration];
  const durationScale = durationValue.includes('ms') ? 1 : 1000;
  const duration = supportTransition && propertyValue && propertyValue !== 'none'
    ? parseFloat(durationValue) * durationScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * Utility to make sure callbacks are consistently
 * called when transition ends.
 *
 * @param {Element} element target
 * @param {function} handler `transitionend` callback
 */
function emulateTransitionEnd(element, handler) {
  let called = 0;
  const endEvent = new Event(transitionEndEvent);
  const duration = getElementTransitionDuration(element);
  const delay = getElementTransitionDelay(element);

  if (duration) {
    /**
     * Wrap the handler in on -> off callback
     * @param {Event} e Event object
     * @callback
     */
    const transitionEndWrapper = (e) => {
      if (e.target === element) {
        handler.apply(element, [e]);
        element.removeEventListener(transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    };
    element.addEventListener(transitionEndEvent, transitionEndWrapper);
    setTimeout(() => {
      if (!called) element.dispatchEvent(endEvent);
    }, duration + delay + 17);
  } else {
    handler.apply(element, [endEvent]);
  }
}

/**
 * Utility to check if target is typeof Element
 * or find one that matches a selector.
 *
 * @param {Element | string} selector the input selector or target element
 * @param {Element | null} parent optional Element to look into
 * @return {Element | null} the Element or result of the querySelector
 */
function queryElement(selector, parent) {
  const lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

/**
 * Check class in Element.classList
 *
 * @param {Element} element target
 * @param {string} classNAME to check
 * @return {boolean}
 */
function hasClass(element, classNAME) {
  return element.classList.contains(classNAME);
}

/**
 * Remove class from Element.classList
 *
 * @param {Element} element target
 * @param {string} classNAME to remove
 */
function removeClass(element, classNAME) {
  element.classList.remove(classNAME);
}

/**
 * A global namespace for 'addEventListener' string.
 * @type {string}
 */
const addEventListener = 'addEventListener';

/**
 * A global namespace for 'removeEventListener' string.
 * @type {string}
 */
const removeEventListener = 'removeEventListener';

const componentData = new Map();
/**
 * An interface for web components background data.
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  /**
   * Sets web components data.
   * @param {Element} element target element
   * @param {string} component the component's name or a unique key
   * @param {any} instance the component instance
   */
  set: (element, component, instance) => {
    if (!componentData.has(component)) {
      componentData.set(component, new Map());
    }

    const instanceMap = componentData.get(component);
    instanceMap.set(element, instance);
  },

  /**
   * Returns all instances for specified component.
   * @param {string} component the component's name or a unique key
   * @returns {?any} all the component instances
   */
  getAllFor: (component) => {
    if (componentData.has(component)) {
      return componentData.get(component) || null;
    }
    return null;
  },

  /**
   * Returns the instance associated with the target.
   * @param {Element} element target element
   * @param {string} component the component's name or a unique key
   * @returns {?any} the instance
   */
  get: (element, component) => {
    const allForC = Data.getAllFor(component);
    if (allForC && allForC.has(element)) {
      return allForC.get(element) || null;
    }
    return null;
  },

  /**
   * Removes web components data.
   * @param {Element} element target element
   * @param {string} component the component's name or a unique key
   * @param {any} instance the component instance
   */
  remove: (element, component) => {
    if (!componentData.has(component)) return;

    const instanceMap = componentData.get(component);
    instanceMap.delete(element);

    if (instanceMap.size === 0) {
      componentData.delete(component);
    }
  },
};

/**
 * Shortcut for `Data.get(a, b)` to setup usable component static method.
 * @type {SHORTER.getInstance<SHORTER.Component, string>}
 */
const getInstance = (element, component) => Data.get(element, component);

/**
 * Global namespace for most components `fade` class.
 */
const fadeClass = 'fade';

/**
 * Global namespace for most components `show` class.
 */
const showClass = 'show';

/**
 * Global namespace for most components `dismiss` option.
 */
const dataBsDismiss = 'data-bs-dismiss';

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} namespacedEventType Event.type
 * @param {AddEventListenerOptions | boolean} eventProperties Event.options | Event.properties
 * @returns {CustomEvent} a new namespaced event
 */
function bootstrapCustomEvent(namespacedEventType, eventProperties) {
  const OriginalCustomEvent = new CustomEvent(namespacedEventType, { cancelable: true });

  if (eventProperties instanceof Object) {
    Object.assign(OriginalCustomEvent, eventProperties);
  }
  return OriginalCustomEvent;
}

/**
 * The raw value or a given component option.
 *
 * @typedef {string | Element | Function | number | boolean | null} niceValue
 */

/**
 * Utility to normalize component options
 *
 * @param {any} value the input value
 * @return {niceValue} the normalized value
 */
function normalizeValue(value) {
  if (value === 'true') { // boolean
    return true;
  }

  if (value === 'false') { // boolean
    return false;
  }

  if (!Number.isNaN(+value)) { // number
    return +value;
  }

  if (value === '' || value === 'null') { // null
    return null;
  }

  // string / function / Element / object
  return value;
}

/**
 * Utility to normalize component options
 *
 * @param {Element} element target
 * @param {object} defaultOps component default options
 * @param {object} inputOps component instance options
 * @param {string} ns component namespace
 * @return {object} normalized component options object
 */
function normalizeOptions(element, defaultOps, inputOps, ns) {
  // @ts-ignore
  const data = { ...element.dataset };
  const normalOps = {};
  const dataOps = {};

  Object.keys(data)
    .forEach((k) => {
      const key = k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

  Object.keys(inputOps)
    .forEach((k) => {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

  Object.keys(defaultOps)
    .forEach((k) => {
      if (k in inputOps) {
        normalOps[k] = inputOps[k];
      } else if (k in dataOps) {
        normalOps[k] = dataOps[k];
      } else {
        normalOps[k] = defaultOps[k];
      }
    });

  return normalOps;
}

var version = "4.1.0";

const Version = version;

/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

/**
 * Returns a new `BaseComponent` instance.
 */
class BaseComponent {
  /**
   * @param {Element | string} target Element or selector string
   * @param {BSN.ComponentOptions?} config
   */
  constructor(target, config) {
    const self = this;
    const element = queryElement(target);

    if (!element) return;

    const prevInstance = getInstance(element, self.name);
    if (prevInstance) prevInstance.dispose();

    /** @private */
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
      /** @private */
      self.options = normalizeOptions(element, self.defaults, (config || {}), 'bs');
    }

    Data.set(element, self.name, self);
  }

  /* eslint-disable */
  /** @static */
  get version() { return Version; }
  /* eslint-enable */

  /** @static */
  get name() { return this.constructor.name; }

  /** @static */
  get defaults() { return this.constructor.defaults; }

  /**
   * Removes component from target element;
   */
  dispose() {
    const self = this;
    Data.remove(self.element, self.name);
    Object.keys(self).forEach((prop) => { self[prop] = null; });
  }
}

/* Native JavaScript for Bootstrap 5 | Alert
-------------------------------------------- */

// ALERT PRIVATE GC
// ================
const alertString = 'alert';
const alertComponent = 'Alert';
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;

/**
 * Static method which returns an existing `Alert` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Alert>}
 */
const getAlertInstance = (element) => getInstance(element, alertComponent);

/**
* An `Alert` initialization callback.
* @type {BSN.InitCallback<Alert>}
*/
const alertInitCallback = (element) => new Alert(element);

// ALERT CUSTOM EVENTS
// ===================
/** @type {BSN.AlertEvent.close} */
const closeAlertEvent = bootstrapCustomEvent(`close.bs.${alertString}`);
/** @type {BSN.AlertEvent.closed} */
const closedAlertEvent = bootstrapCustomEvent(`closed.bs.${alertString}`);

// ALERT EVENT HANDLER
// ===================
/**
 * Alert `transitionend` callback.
 * @param {Alert} self target Alert instance
 */
function alertTransitionEnd(self) {
  const { element, relatedTarget } = self;
  toggleAlertHandler(self);

  if (relatedTarget) closedAlertEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(closedAlertEvent);

  self.dispose();
  element.remove();
}

// ALERT PRIVATE METHOD
// ====================
/**
 * Toggle on / off the `click` event listener.
 * @param {Alert} self the target alert instance
 * @param {boolean | number} add
 */
function toggleAlertHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  if (self.dismiss) self.dismiss[action]('click', self.close);
}

// ALERT DEFINITION
// ================
/** Creates a new Alert instance. */
class Alert extends BaseComponent {
  /** @param {Element | string} target element or selector */
  constructor(target) {
    super(target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // the dismiss button
    /** @private */
    self.dismiss = queryElement(alertDismissSelector, element);
    /** @private */
    self.relatedTarget = null;

    // add event listener
    toggleAlertHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return alertComponent; }
  /* eslint-enable */

  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   *
   * @param {Event} e most likely the `click` event
   */
  close(e) {
    const target = e ? e.target : null;
    const self = e
      ? getAlertInstance(e.target.closest(alertSelector))
      : this;
    const { element } = self;

    if (self && element && hasClass(element, showClass)) {
      if (target) {
        closeAlertEvent.relatedTarget = target;
        self.relatedTarget = target;
      }
      element.dispatchEvent(closeAlertEvent);
      if (closeAlertEvent.defaultPrevented) return;

      removeClass(element, showClass);

      if (hasClass(element, fadeClass)) {
        emulateTransitionEnd(element, () => alertTransitionEnd(self));
      } else alertTransitionEnd(self);
    }
  }

  /** Remove the component from target element. */
  dispose() {
    toggleAlertHandler(this);
    super.dispose();
  }
}

Object.assign(Alert, {
  selector: alertSelector,
  init: alertInitCallback,
  getInstance: getAlertInstance,
});

/**
 * Add class to Element.classList
 *
 * @param {Element} element target
 * @param {string} classNAME to add
 */
function addClass(element, classNAME) {
  element.classList.add(classNAME);
}

/**
 * A global namespace for aria-pressed.
 * @type {string}
 */
const ariaPressed = 'aria-pressed';

/**
 * Global namespace for most components active class.
 */
const activeClass = 'active';

/**
 * Global namespace for most components `toggle` option.
 */
const dataBsToggle = 'data-bs-toggle';

/* Native JavaScript for Bootstrap 5 | Button
---------------------------------------------*/

// BUTTON PRIVATE GC
// =================
const buttonString = 'button';
const buttonComponent = 'Button';
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;

/**
 * Static method which returns an existing `Button` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Button>}
 */
const getButtonInstance = (element) => getInstance(element, buttonComponent);

/**
 * A `Button` initialization callback.
 * @type {BSN.InitCallback<Button>}
 */
const buttonInitCallback = (element) => new Button(element);

// BUTTON PRIVATE METHOD
// =====================
function toggleButtonHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', self.toggle);
}

// BUTTON DEFINITION
// =================
/** Creates a new `Button` instance. */
class Button extends BaseComponent {
  /**
   * @param {Element | string} target usually a `.btn` element
   */
  constructor(target) {
    super(target);
    const self = this;

    // initialization element
    const { element } = self;

    // set initial state
    /** @private @type {boolean} */
    self.isActive = hasClass(element, activeClass);
    element.setAttribute(ariaPressed, !!self.isActive);

    // add event listener
    toggleButtonHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return buttonComponent; }
  /* eslint-enable */

  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   * @param {Event} e usually `click` Event object
   */
  toggle(e) {
    if (e) e.preventDefault();
    const self = e ? getButtonInstance(this) : this;
    const { element } = self;

    if (hasClass(element, 'disabled')) return;

    self.isActive = hasClass(element, activeClass);
    const { isActive } = self;

    const action = isActive ? removeClass : addClass;
    const ariaValue = isActive ? 'false' : 'true';

    action(element, activeClass);
    element.setAttribute(ariaPressed, ariaValue);
  }

  /** Removes the `Button` component from the target element. */
  dispose() {
    toggleButtonHandler(this);
    super.dispose(buttonComponent);
  }
}

Object.assign(Button, {
  selector: buttonSelector,
  init: buttonInitCallback,
  getInstance: getButtonInstance,
});

/**
 * A global namespace for passive events support.
 * @type {boolean}
 */
const supportPassive = (() => {
  let result = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        result = true;
        return result;
      },
    });
    document[addEventListener]('DOMContentLoaded', function wrap() {
      document[removeEventListener]('DOMContentLoaded', wrap, opts);
    }, opts);
  } catch (e) {
    throw Error('Passive events are not supported');
  }

  return result;
})();

// general event options

/**
 * A global namespace for most scroll event listeners.
 */
const passiveHandler = supportPassive ? { passive: true } : false;

/**
 * Utility to force re-paint of an Element
 *
 * @param {Element | HTMLElement} element is the target
 * @return {number} the Element.offsetHeight value
 */
function reflow(element) {
  // @ts-ignore
  return element.offsetHeight;
}

/**
 * Utility to determine if an `Element`
 * is partially visible in viewport.
 *
 * @param {Element} element target
 * @return {boolean} Boolean
 */
function isElementInScrollRange(element) {
  const bcr = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return bcr.top <= viewportHeight && bcr.bottom >= 0; // bottom && top
}

/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */

// CAROUSEL PRIVATE GC
// ===================
const carouselString = 'carousel';
const carouselComponent = 'Carousel';
const carouselSelector = `[data-bs-ride="${carouselString}"]`;
const carouselControl = `${carouselString}-control`;
const carouselItem = `${carouselString}-item`;
const dataBsSlideTo = 'data-bs-slide-to';
const pausedClass = 'paused';

const carouselDefaults = {
  pause: 'hover',
  keyboard: false,
  touch: true,
  interval: 5000,
};

const CarouselEventProperties = {
  /** @type {Element} */
  relatedTarget: null,
  /** @type {string} */
  direction: 'left' ,
  /** @type {number} */
  from: 0,
  /** @type {number} */
  to: 1,
};

/**
 * Static method which returns an existing `Carousel` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Carousel>}
 */
const getCarouselInstance = (element) => getInstance(element, carouselComponent);

/**
 * A `Carousel` initialization callback.
 * @type {BSN.InitCallback<Carousel>}
 */
const carouselInitCallback = (element) => new Carousel(element);

let startX = 0;
let currentX = 0;
let endX = 0;

// CAROUSEL CUSTOM EVENTS
// ======================
/** @type {BSN.CarouselEvent.slide} */
const carouselSlideEvent = bootstrapCustomEvent(`slide.bs.${carouselString}`, CarouselEventProperties);
/** @type {BSN.CarouselEvent.slid} */
const carouselSlidEvent = bootstrapCustomEvent(`slid.bs.${carouselString}`, CarouselEventProperties);

// CAROUSEL EVENT HANDLERS
// =======================
/**
 * The `transitionend` event listener of the `Carousel`.
 * @param {Carousel} self the `Carousel` instance
 */
function carouselTransitionEndHandler(self) {
  const {
    index, direction, element, slides, options, isAnimating,
  } = self;

  // discontinue disposed instances
  if (isAnimating && getCarouselInstance(element)) {
    const activeItem = getActiveIndex(self);
    const orientation = direction === 'left' ? 'next' : 'prev';
    const directionClass = direction === 'left' ? 'start' : 'end';
    self.isAnimating = false;

    addClass(slides[index], activeClass);
    removeClass(slides[activeItem], activeClass);

    removeClass(slides[index], `${carouselItem}-${orientation}`);
    removeClass(slides[index], `${carouselItem}-${directionClass}`);
    removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);

    element.dispatchEvent(carouselSlidEvent);

    // check for element, might have been disposed
    if (!document.hidden && options.interval
      && !hasClass(element, pausedClass)) {
      self.cycle();
    }
  }
}

/**
 * Handles the `mouseenter` / `touchstart` events when *options.pause*
 * is set to `hover`.
 *
 * @param {Event} e the `Event` object
 */
function carouselPauseHandler(e) {
  const eventTarget = e.target;
  const self = getCarouselInstance(eventTarget.closest(carouselSelector));
  const { element, isAnimating } = self;

  if (!hasClass(element, pausedClass)) {
    addClass(element, pausedClass);
    if (!isAnimating) {
      clearInterval(self.timer);
      self.timer = null;
    }
  }
}

/**
 * Handles the `mouseleave` / `touchsend` events when *options.pause*
 * is set to `hover`.
 *
 * @param {Event} e the `Event` object
 */
function carouselResumeHandler(e) {
  const { target } = e;
  const self = getCarouselInstance(target.closest(carouselSelector));
  const { isPaused, isAnimating, element } = self;

  if (!isPaused && hasClass(element, pausedClass)) {
    removeClass(element, pausedClass);

    if (!isAnimating) {
      clearInterval(self.timer);
      self.timer = null;
      self.cycle();
    }
  }
}

/**
 * Handles the `click` event for the `Carousel` indicators.
 *
 * @param {Event} e the `Event` object
 */
function carouselIndicatorHandler(e) {
  e.preventDefault();
  const { target } = e;
  const self = getCarouselInstance(target.closest(carouselSelector));

  if (self.isAnimating) return;

  const newIndex = target.getAttribute(dataBsSlideTo);

  if (target && !hasClass(target, activeClass) // event target is not active
    && newIndex) { // AND has the specific attribute
    self.to(+newIndex); // do the slide
  }
}

/**
 * Handles the `click` event for the `Carousel` arrows.
 *
 * @param {Event} e the `Event` object
 */
function carouselControlsHandler(e) {
  e.preventDefault();
  const that = this;
  const self = getCarouselInstance(that.closest(carouselSelector));

  const { controls } = self;

  if (controls[1] && that === controls[1]) {
    self.next();
  } else if (controls[1] && that === controls[0]) {
    self.prev();
  }
}

/**
 * Handles the keyboard `keydown` event for the visible `Carousel` elements.
 *
 * @param {Event} e the `Event` object
 */
function carouselKeyHandler({ which }) {
  const [element] = Array.from(document.querySelectorAll(carouselSelector))
    .filter((x) => isElementInScrollRange(x));

  if (!element) return;
  const self = getCarouselInstance(element);

  switch (which) {
    case 39:
      self.next();
      break;
    case 37:
      self.prev();
      break;
  }
}

// CAROUSEL TOUCH HANDLERS
// =======================
/**
 * Handles the `touchdown` event for the `Carousel` element.
 *
 * @param {Event} e the `Event` object
 */
function carouselTouchDownHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || self.isTouch) { return; }

  startX = e.changedTouches[0].pageX;

  if (element.contains(e.target)) {
    self.isTouch = true;
    toggleCarouselTouchHandlers(self, 1);
  }
}

/**
 * Handles the `touchmove` event for the `Carousel` element.
 *
 * @param {Event} e the `Event` object
 */
function carouselTouchMoveHandler(e) {
  const { changedTouches, type } = e;
  const self = getCarouselInstance(this);

  if (!self || !self.isTouch) { return; }

  currentX = changedTouches[0].pageX;

  // cancel touch if more than one changedTouches detected
  if (type === 'touchmove' && changedTouches.length > 1) {
    e.preventDefault();
  }
}

/**
 * Handles the `touchend` event for the `Carousel` element.
 *
 * @param {Event} e the `Event` object
 */
function carouselTouchEndHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || !self.isTouch) { return; }

  endX = currentX || e.changedTouches[0].pageX;

  if (self.isTouch) {
    // the event target is outside the carousel OR carousel doens't include the related target
    if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
      && Math.abs(startX - endX) < 75) { // AND swipe distance is less than 75px
      // when the above conditions are satisfied, no need to continue
      return;
    } // OR determine next index to slide to
    if (currentX < startX) {
      self.index += 1;
    } else if (currentX > startX) {
      self.index -= 1;
    }

    self.isTouch = false;
    self.to(self.index); // do the slide

    toggleCarouselTouchHandlers(self); // remove touch events handlers
  }
}

// CAROUSEL PRIVATE METHODS
// ========================
/**
 * Sets active indicator for the `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {number} pageIndex the index of the new active indicator
 */
function activateCarouselIndicator(self, pageIndex) {
  const { indicators } = self;
  Array.from(indicators).forEach((x) => removeClass(x, activeClass));
  if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
}

/**
 * Toggles the touch event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean | number} add when `TRUE` event listeners are added
 */
function toggleCarouselTouchHandlers(self, add) {
  const { element } = self;
  const action = add ? addEventListener : removeEventListener;
  element[action]('touchmove', carouselTouchMoveHandler, passiveHandler);
  element[action]('touchend', carouselTouchEndHandler, passiveHandler);
}

/**
 * Toggles all event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean | number} add when `TRUE` event listeners are added
 */
function toggleCarouselHandlers(self, add) {
  const {
    element, options, slides, controls, indicator,
  } = self;
  const {
    touch, pause, interval, keyboard,
  } = options;
  const action = add ? addEventListener : removeEventListener;

  if (pause && interval) {
    element[action]('mouseenter', carouselPauseHandler);
    element[action]('mouseleave', carouselResumeHandler);
    element[action]('touchstart', carouselPauseHandler, passiveHandler);
    element[action]('touchend', carouselResumeHandler, passiveHandler);
  }

  if (touch && slides.length > 1) {
    element[action]('touchstart', carouselTouchDownHandler, passiveHandler);
  }

  controls.forEach((arrow) => {
    if (arrow) arrow[action]('click', carouselControlsHandler);
  });

  if (indicator) indicator[action]('click', carouselIndicatorHandler);
  if (keyboard) window[action]('keydown', carouselKeyHandler);
}

/**
 * Returns the index of the current active item.
 * @param {Carousel} self the `Carousel` instance
 * @returns {number} the query result
 */
function getActiveIndex(self) {
  const { slides, element } = self;
  return Array.from(slides)
    .indexOf(element.getElementsByClassName(`${carouselItem} ${activeClass}`)[0]) || 0;
}

// CAROUSEL DEFINITION
// ===================
/**
 * Creates a new `Carousel` instance.
 */
class Carousel extends BaseComponent {
  /**
   *
   * @param {Element | string} target mostly a `.carousel` element
   * @param {BSN.CarouselOptions?} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // additional properties
    /** @private @type {number?} */
    self.timer = null;
    /** @private @type {string} */
    self.direction = 'left';
    /** @private @type {boolean} */
    self.isPaused = false;
    /** @private @type {boolean} */
    self.isAnimating = false;
    /** @private @type {number} */
    self.index = 0;
    /** @private @type {boolean} */
    self.isTouch = false;

    // initialization element
    const { element } = self;
    // carousel elements
    // a LIVE collection is prefferable
    /** @private @type {HTMLCollection} */
    self.slides = element.getElementsByClassName(carouselItem);
    const { slides } = self;

    // invalidate when not enough items
    // no need to go further
    if (slides.length < 2) { return; }

    /** @private @type {[?Element, ?Element]} */
    self.controls = [
      queryElement(`.${carouselControl}-prev`, element),
      queryElement(`.${carouselControl}-next`, element),
    ];

    // a LIVE collection is prefferable
    /** @private @type {Element?} */
    self.indicator = queryElement('.carousel-indicators', element);
    /** @private @type {NodeList | any[]} */
    self.indicators = (self.indicator && self.indicator.querySelectorAll(`[${dataBsSlideTo}]`)) || [];

    // set JavaScript and DATA API options
    const { options } = self;

    // don't use TRUE as interval, it's actually 0, use the default 5000ms better
    self.options.interval = options.interval === true
      ? carouselDefaults.interval
      : options.interval;

    // set first slide active if none
    if (getActiveIndex(self) < 0) {
      if (slides.length) addClass(slides[0], activeClass);
      if (self.indicators.length) activateCarouselIndicator(self, 0);
    }

    // attach event handlers
    toggleCarouselHandlers(self, 1);

    // start to cycle if interval is set
    if (options.interval) self.cycle();
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return carouselComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return carouselDefaults; }
  /* eslint-enable */

  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const self = this;
    const { isPaused, element, options } = self;
    if (self.timer) {
      clearInterval(self.timer);
      self.timer = null;
    }

    if (isPaused) {
      removeClass(element, pausedClass);
      self.isPaused = !isPaused;
    }

    self.timer = setInterval(() => {
      if (isElementInScrollRange(element)) {
        self.index += 1;
        self.to(self.index);
      }
    }, options.interval);
  }

  /** Pause the automatic cycle. */
  pause() {
    const self = this;
    const { element, options, isPaused } = self;
    if (options.interval && !isPaused) {
      clearInterval(self.timer);
      self.timer = null;
      addClass(element, pausedClass);
      self.isPaused = !isPaused;
    }
  }

  /** Slide to the next item. */
  next() {
    const self = this;
    if (!self.isAnimating) { self.index += 1; self.to(self.index); }
  }

  /** Slide to the previous item. */
  prev() {
    const self = this;
    if (!self.isAnimating) { self.index -= 1; self.to(self.index); }
  }

  /**
   * Jump to the item with the `idx` index.
   * @param {number} idx the index of the item to jump to
   */
  to(idx) {
    const self = this;
    const {
      element, isAnimating, slides, options,
    } = self;
    const activeItem = getActiveIndex(self);
    let next = idx;

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    if (isAnimating || activeItem === next) return;

    // determine transition direction
    if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
      self.direction = 'left'; // next
    } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
      self.direction = 'right'; // prev
    }
    const { direction } = self;

    // find the right next index
    if (next < 0) { next = slides.length - 1; } else if (next >= slides.length) { next = 0; }

    // orientation, class name, eventProperties
    const orientation = direction === 'left' ? 'next' : 'prev';
    const directionClass = direction === 'left' ? 'start' : 'end';

    const eventProperties = {
      relatedTarget: slides[next],
      from: activeItem,
      to: next,
      direction,
    };

    // update event properties
    Object.assign(carouselSlideEvent, eventProperties);
    Object.assign(carouselSlidEvent, eventProperties);

    // discontinue when prevented
    element.dispatchEvent(carouselSlideEvent);
    if (carouselSlideEvent.defaultPrevented) return;

    // update index
    self.index = next;

    clearInterval(self.timer);
    self.timer = null;

    self.isAnimating = true;
    activateCarouselIndicator(self, next);

    if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
      addClass(slides[next], `${carouselItem}-${orientation}`);
      reflow(slides[next]);
      addClass(slides[next], `${carouselItem}-${directionClass}`);
      addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

      emulateTransitionEnd(slides[next], () => carouselTransitionEndHandler(self));
    } else {
      addClass(slides[next], activeClass);
      removeClass(slides[activeItem], activeClass);

      setTimeout(() => {
        self.isAnimating = false;

        // check for element, might have been disposed
        if (element && options.interval && !hasClass(element, pausedClass)) {
          self.cycle();
        }

        element.dispatchEvent(carouselSlidEvent);
      }, 17);
    }
  }

  /** Remove `Carousel` component from target. */
  dispose() {
    const self = this;
    const { slides } = self;
    const itemClasses = ['start', 'end', 'prev', 'next'];

    Array.from(slides).forEach((slide, idx) => {
      if (hasClass(slide, activeClass)) activateCarouselIndicator(self, idx);
      itemClasses.forEach((c) => removeClass(slide, `${carouselItem}-${c}`));
    });

    toggleCarouselHandlers(self);
    clearInterval(self.timer);
    super.dispose();
  }
}

Object.assign(Carousel, {
  selector: carouselSelector,
  init: carouselInitCallback,
  getInstance: getCarouselInstance,
});

/**
 * A global namespace for aria-expanded.
 * @type {string}
 */
const ariaExpanded = 'aria-expanded';

/**
 * Global namespace for most components `collapsing` class.
 * As used by `Collapse` / `Tab`.
 */
const collapsingClass = 'collapsing';

/**
 * Global namespace for most components `target` option.
 */
const dataBsTarget = 'data-bs-target';

/**
 * Global namespace for most components `parent` option.
 */
const dataBsParent = 'data-bs-parent';

/**
 * Global namespace for most components `container` option.
 */
const dataBsContainer = 'data-bs-container';

/**
 * Returns the `Element` that THIS one targets
 * via `data-bs-target`, `href`, `data-bs-parent` or `data-bs-container`.
 *
 * @param {Element} element the target element
 * @returns {?Element} the query result
 */
function getTargetElement(element) {
  return queryElement(element.getAttribute(dataBsTarget) || element.getAttribute('href'))
        || element.closest(element.getAttribute(dataBsParent))
        || queryElement(element.getAttribute(dataBsContainer));
}

/* Native JavaScript for Bootstrap 5 | Collapse
----------------------------------------------- */

// COLLAPSE GC
// ===========
const collapseString = 'collapse';
const collapseComponent = 'Collapse';
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;
const collapseDefaults = { parent: null };

/**
 * Static method which returns an existing `Collapse` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Collapse>}
 */
const getCollapseInstance = (element) => getInstance(element, collapseComponent);

/**
 * A `Collapse` initialization callback.
 * @type {BSN.InitCallback<Collapse>}
 */
const collapseInitCallback = (element) => new Collapse(element);

// COLLAPSE CUSTOM EVENTS
// ======================
/** @type {BSN.CollapseEvent.show} */
const showCollapseEvent = bootstrapCustomEvent(`show.bs.${collapseString}`);
/** @type {BSN.CollapseEvent.shown} */
const shownCollapseEvent = bootstrapCustomEvent(`shown.bs.${collapseString}`);
/** @type {BSN.CollapseEvent.hide} */
const hideCollapseEvent = bootstrapCustomEvent(`hide.bs.${collapseString}`);
/** @type {BSN.CollapseEvent.hidden} */
const hiddenCollapseEvent = bootstrapCustomEvent(`hidden.bs.${collapseString}`);

// COLLAPSE PRIVATE METHODS
// ========================
/**
 * Expand the designated `Element`.
 * @param {Collapse} self the `Collapse` instance
 */
function expandCollapse(self) {
  const {
    element, parent, triggers,
  } = self;

  element.dispatchEvent(showCollapseEvent);
  if (showCollapseEvent.defaultPrevented) return;

  self.isAnimating = true;
  if (parent) parent.isAnimating = true;

  addClass(element, collapsingClass);
  removeClass(element, collapseString);

  element.style.height = `${element.scrollHeight}px`;

  emulateTransitionEnd(element, () => {
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'true'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);
    addClass(element, showClass);

    element.style.height = '';

    element.dispatchEvent(shownCollapseEvent);
  });
}

/**
 * Collapse the designated `Element`.
 * @param {Collapse} self the `Collapse` instance
 */
function collapseContent(self) {
  const {
    element, parent, triggers,
  } = self;

  element.dispatchEvent(hideCollapseEvent);

  if (hideCollapseEvent.defaultPrevented) return;

  self.isAnimating = true;
  if (parent) parent.isAnimating = true;

  element.style.height = `${element.scrollHeight}px`;

  removeClass(element, collapseString);
  removeClass(element, showClass);
  addClass(element, collapsingClass);

  reflow(element);
  element.style.height = '0px';

  emulateTransitionEnd(element, () => {
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, 'false'));

    removeClass(element, collapsingClass);
    addClass(element, collapseString);

    element.style.height = '';

    element.dispatchEvent(hiddenCollapseEvent);
  });
}

/**
 * Toggles on/off the event listener(s) of the `Collapse` instance.
 * @param {Collapse} self the `Collapse` instance
 * @param {boolean | number} add when `true`, the event listener is added
 */
function toggleCollapseHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', collapseClickHandler));
  }
}

// COLLAPSE EVENT HANDLER
// ======================
/**
 * Handles the `click` event for the `Collapse` instance.
 * @param {Event} e the `Event` object
 */
function collapseClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(collapseToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && getCollapseInstance(element);
  if (self) self.toggle();

  // event target is anchor link #398
  if (trigger && trigger.tagName === 'A') e.preventDefault();
}

// COLLAPSE DEFINITION
// ===================

/** Returns a new `Colapse` instance. */
class Collapse extends BaseComponent {
  /**
   * @param {Element | string} target and `Element` that matches the selector
   * @param {BSN.CollapseOptions?} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element
    const { element, options } = self;

    // set triggering elements
    /** @private @type {Element[]} */
    self.triggers = Array.from(document.querySelectorAll(collapseToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // set parent accordion
    /** @private @type {Element?} */
    self.parent = queryElement(options.parent);
    const { parent } = self;

    // set initial state
    /** @private @type {boolean} */
    self.isAnimating = false;
    if (parent) parent.isAnimating = false;

    // add event listeners
    toggleCollapseHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return collapseComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return collapseDefaults; }
  /* eslint-enable */

  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    const self = this;
    if (!hasClass(self.element, showClass)) self.show();
    else self.hide();
  }

  /** Hides the collapse. */
  hide() {
    const self = this;
    const { triggers, isAnimating } = self;
    if (isAnimating) return;

    collapseContent(self);
    if (triggers.length) {
      triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
    }
  }

  /** Shows the collapse. */
  show() {
    const self = this;
    const {
      element, parent, triggers, isAnimating,
    } = self;
    let activeCollapse;
    let activeCollapseInstance;

    if (parent) {
      activeCollapse = Array.from(parent.querySelectorAll(`.${collapseString}.${showClass}`))
        .find((i) => getCollapseInstance(i));
      activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse);
    }

    if ((!parent || (parent && !parent.isAnimating)) && !isAnimating) {
      if (activeCollapseInstance && activeCollapse !== element) {
        collapseContent(activeCollapseInstance);
        activeCollapseInstance.triggers.forEach((btn) => {
          addClass(btn, `${collapseString}d`);
        });
      }

      expandCollapse(self);
      if (triggers.length) {
        triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
      }
    }
  }

  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    const self = this;
    const { parent } = self;
    toggleCollapseHandler(self);

    if (parent) delete parent.isAnimating;
    super.dispose();
  }
}

Object.assign(Collapse, {
  selector: collapseSelector,
  init: collapseInitCallback,
  getInstance: getCollapseInstance,
});

/**
 * Global namespace for `Dropdown` types / classes.
 */
const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

/**
 * Global namespace for `.dropdown-menu`.
 */
const dropdownMenuClass = 'dropdown-menu';

/**
 * Checks if an *event.target* or its parent has an `href="#"` value.
 * We need to prevent jumping around onclick, don't we?
 *
 * @param {Element} elem the target element
 * @returns {boolean} the query result
 */
function isEmptyAnchor(elem) {
  const parentAnchor = elem.closest('A');
  // anchor href starts with #
  return elem && ((elem.hasAttribute('href') && elem.href.slice(-1) === '#')
    // OR a child of an anchor with href starts with #
    || (parentAnchor && parentAnchor.hasAttribute('href') && parentAnchor.href.slice(-1) === '#'));
}

/**
 * Points the focus to a specific element.
 * @param {Element} element target
 */
function setFocus(element) {
  element.focus();
}

/* Native JavaScript for Bootstrap 5 | Dropdown
----------------------------------------------- */

// DROPDOWN PRIVATE GC
// ===================
const [dropdownString] = dropdownMenuClasses;
const dropdownComponent = 'Dropdown';
const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

/**
 * Static method which returns an existing `Dropdown` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Dropdown>}
 */
const getDropdownInstance = (element) => getInstance(element, dropdownComponent);

/**
 * A `Dropdown` initialization callback.
 * @type {BSN.InitCallback<Dropdown>}
 */
const dropdownInitCallback = (element) => new Dropdown(element);

// DROPDOWN PRIVATE GC
// ===================
const dropupString = dropdownMenuClasses[1];
const dropstartString = dropdownMenuClasses[2];
const dropendString = dropdownMenuClasses[3];
const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
const hideMenuClass = ['d-block', 'invisible'];
const verticalClass = [dropdownString, dropupString];
const horizontalClass = [dropstartString, dropendString];

const dropdownDefaults = {
  offset: 5, // [number] 5(px)
  display: 'dynamic', // [dynamic|static]
};

// DROPDOWN CUSTOM EVENTS
// ========================
/** @type {BSN.DropdownEvent.show} */
const showDropdownEvent = bootstrapCustomEvent(`show.bs.${dropdownString}`);
/** @type {BSN.DropdownEvent.shown} */
const shownDropdownEvent = bootstrapCustomEvent(`shown.bs.${dropdownString}`);
/** @type {BSN.DropdownEvent.hide} */
const hideDropdownEvent = bootstrapCustomEvent(`hide.bs.${dropdownString}`);
/** @type {BSN.DropdownEvent.hidden} */
const hiddenDropdownEvent = bootstrapCustomEvent(`hidden.bs.${dropdownString}`);

// DROPDOWN PRIVATE METHODS
// ========================
/**
 * Apply specific style or class names to a `.dropdown-menu` to automatically
 * accomodate the layout and the page scroll.
 *
 * @param {Dropdown} self the `Dropdown` instance
 * @param {boolean | number} show when `true` will have a different effect
 */
function styleDropdown(self, show) {
  const {
    element, menu, originalClass, menuEnd, options,
  } = self;
  const { offset } = options;
  const parent = element.parentElement;

  // reset menu offset and position
  const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
  resetProps.forEach((p) => { menu.style[p] = ''; });
  removeClass(parent, 'position-static');

  if (!show) {
    const menuEndNow = hasClass(menu, dropdownMenuEndClass);
    parent.className = originalClass.join(' ');
    if (menuEndNow && !menuEnd) removeClass(menu, dropdownMenuEndClass);
    else if (!menuEndNow && menuEnd) addClass(menu, dropdownMenuEndClass);
    return;
  }

  // set initial position class
  // take into account .btn-group parent as .dropdown
  let positionClass = dropdownMenuClasses.find((c) => originalClass.includes(c)) || dropdownString;

  let dropdownMargin = {
    dropdown: [offset, 0, 0],
    dropup: [0, 0, offset],
    dropstart: [-1, offset, 0],
    dropend: [-1, 0, 0, offset],
  };

  const dropdownPosition = {
    dropdown: { top: '100%' },
    dropup: { top: 'auto', bottom: '100%' },
    dropstart: { left: 'auto', right: '100%' },
    dropend: { left: '100%', right: 'auto' },
    menuEnd: { right: 0, left: 'auto' },
  };

  // force showing the menu to calculate its size
  hideMenuClass.forEach((c) => addClass(menu, c));

  const dropdownRegex = new RegExp(`\\b(${dropdownString}|${dropupString}|${dropstartString}|${dropendString})+`);
  const elementDimensions = { w: element.offsetWidth, h: element.offsetHeight };
  const menuDimensions = { w: menu.offsetWidth, h: menu.offsetHeight };
  const HTML = document.documentElement;
  const BD = document.body;
  const windowWidth = (HTML.clientWidth || BD.clientWidth);
  const windowHeight = (HTML.clientHeight || BD.clientHeight);
  const targetBCR = element.getBoundingClientRect();
  // dropdownMenuEnd && [ dropdown | dropup ]
  const leftExceed = targetBCR.left + elementDimensions.w - menuDimensions.w < 0;
  // dropstart
  const leftFullExceed = targetBCR.left - menuDimensions.w < 0;
  // !dropdownMenuEnd && [ dropdown | dropup ]
  const rightExceed = targetBCR.left + menuDimensions.w >= windowWidth;
  // dropend
  const rightFullExceed = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth;
  // dropstart | dropend
  const bottomExceed = targetBCR.top + menuDimensions.h >= windowHeight;
  // dropdown
  const bottomFullExceed = targetBCR.top + menuDimensions.h + elementDimensions.h >= windowHeight;
  // dropup
  const topExceed = targetBCR.top - menuDimensions.h < 0;

  // recompute position
  if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
    positionClass = dropdownString;
  }
  if (horizontalClass.includes(positionClass) && bottomExceed) {
    positionClass = dropupString;
  }
  if (positionClass === dropstartString && leftFullExceed && !bottomExceed) {
    positionClass = dropendString;
  }
  if (positionClass === dropendString && rightFullExceed && !bottomExceed) {
    positionClass = dropstartString;
  }
  if (positionClass === dropupString && topExceed && !bottomFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
    positionClass = dropupString;
  }

  // set spacing
  dropdownMargin = dropdownMargin[positionClass];
  menu.style.margin = `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`;
  Object.keys(dropdownPosition[positionClass]).forEach((position) => {
    menu.style[position] = dropdownPosition[positionClass][position];
  });

  // update dropdown position class
  if (!hasClass(parent, positionClass)) {
    parent.className = parent.className.replace(dropdownRegex, positionClass);
  }

  // update dropdown / dropup to handle parent btn-group element
  // as well as the dropdown-menu-end utility class
  if (verticalClass.includes(positionClass)) {
    if (!menuEnd && rightExceed) addClass(menu, dropdownMenuEndClass);
    else if (menuEnd && leftExceed) removeClass(menu, dropdownMenuEndClass);

    if (hasClass(menu, dropdownMenuEndClass)) {
      Object.keys(dropdownPosition.menuEnd).forEach((p) => {
        menu.style[p] = dropdownPosition.menuEnd[p];
      });
    }
  }

  // remove util classes from the menu, we have its size
  hideMenuClass.forEach((c) => removeClass(menu, c));
}

/**
 * Toggles on/off the listeners for the events that close the dropdown
 * as well as event that request a new position for the dropdown.
 *
 * @param {Dropdown} self the `Dropdown` instance
 */
function toggleDropdownDismiss(self) {
  const action = self.open ? addEventListener : removeEventListener;

  document[action]('click', dropdownDismissHandler);
  document[action]('focus', dropdownDismissHandler);
  document[action]('keydown', dropdownPreventScroll);
  document[action]('keyup', dropdownKeyHandler);

  if (self.options.display === 'dynamic') {
    window[action]('scroll', dropdownLayoutHandler, passiveHandler);
    window[action]('resize', dropdownLayoutHandler, passiveHandler);
  }
}

/**
 * Toggles on/off the `click` event listener of the `Dropdown`.
 *
 * @param {Dropdown} self the `Dropdown` instance
 * @param {*} add when `true`, it will add the event listener
 */
function toggleDropdownHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', dropdownClickHandler);
}

/**
 * Returns the currently open `.dropdown` element.
 *
 * @returns {Element?} the query result
 */
function getCurrentOpenDropdown() {
  const currentParent = [...dropdownMenuClasses, 'btn-group', 'input-group']
    .map((c) => document.getElementsByClassName(`${c} ${showClass}`))
    .find((x) => x.length);

  if (currentParent && currentParent.length) {
    return Array.from(currentParent[0].children).find((x) => x.hasAttribute(dataBsToggle));
  }
  return null;
}

// DROPDOWN EVENT HANDLERS
// =======================
/**
 * Handles the `click` event for the `Dropdown` instance.
 *
 * @param {Event} e event object
 */
function dropdownDismissHandler(e) {
  const { target, type } = e;
  if (!target.closest) return; // some weird FF bug #409

  const element = getCurrentOpenDropdown();
  if (!element) return;

  const self = getDropdownInstance(element);
  const parent = element.parentNode;
  const menu = self && self.menu;

  const hasData = target.closest(dropdownSelector) !== null;
  const isForm = parent && parent.contains(target)
    && (target.tagName === 'form' || target.closest('form') !== null);

  if (type === 'click' && isEmptyAnchor(target)) {
    e.preventDefault();
  }
  if (type === 'focus'
    && (target === element || target === menu || menu.contains(target))) {
    return;
  }

  if (isForm || hasData) ; else if (self) {
    self.hide(element);
  }
}

/**
 *
 * @param {EventListener} e event object
 * @returns {void}
 */
function dropdownClickHandler(e) {
  const element = this;
  const self = getDropdownInstance(element);
  self.toggle(element);

  if (isEmptyAnchor(e.target)) e.preventDefault();
}

/**
 *
 * @param {EventListener} e event object
 * @returns {void}
 */
function dropdownPreventScroll(e) {
  if (e.which === 38 || e.which === 40) e.preventDefault();
}

/**
 *
 * @param {{which: number}} which keyboard key
 * @returns {void}
 */
function dropdownKeyHandler({ which }) {
  const element = getCurrentOpenDropdown();
  const self = getDropdownInstance(element);
  const { menu, menuItems, open } = self;
  const activeItem = document.activeElement;
  const isSameElement = activeItem === element;
  const isInsideMenu = menu.contains(activeItem);
  const isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;

  let idx = menuItems.indexOf(activeItem);

  if (isMenuItem) { // navigate up | down
    if (isSameElement) {
      idx = 0;
    } else if (which === 38) {
      idx = idx > 1 ? idx - 1 : 0;
    } else if (which === 40) {
      idx = idx < menuItems.length - 1 ? idx + 1 : idx;
    }

    if (menuItems[idx]) setFocus(menuItems[idx]);
  }

  if (((menuItems.length && isMenuItem) // menu has items
      || (!menuItems.length && (isInsideMenu || isSameElement)) // menu might be a form
      || !isInsideMenu) // or the focused element is not in the menu at all
      && open && which === 27 // menu must be open
  ) {
    self.toggle();
  }
}

/**
 * @returns {void}
 */
function dropdownLayoutHandler() {
  const element = getCurrentOpenDropdown();
  const self = element && getDropdownInstance(element);

  if (self && self.open) styleDropdown(self, 1);
}

// DROPDOWN DEFINITION
// ===================
/**
 * Returns a new Dropdown instance.
 * @implements {BaseComponent}
 */
class Dropdown extends BaseComponent {
  /**
   * @param {Element | string} target Element or string selector
   * @param {BSN.DropdownOptions?} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // set targets
    const { parentElement } = element;
    /** @private @type {Element} */
    self.menu = queryElement(`.${dropdownMenuClass}`, parentElement);
    const { menu } = self;

    /** @private @type {string} */
    self.originalClass = Array.from(parentElement.classList);

    // set original position
    /** @private @type {boolean} */
    self.menuEnd = hasClass(menu, dropdownMenuEndClass);

    /** @private @type {Element[]} */
    self.menuItems = [];

    Array.from(menu.children).forEach((child) => {
      if (child.children.length && (child.children[0].tagName === 'A')) self.menuItems.push(child.children[0]);
      if (child.tagName === 'A') self.menuItems.push(child);
    });

    // set initial state to closed
    /** @private @type {boolean} */
    self.open = false;

    // add event listener
    toggleDropdownHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return dropdownComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return dropdownDefaults; }
  /* eslint-enable */

  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    const self = this;
    const { open } = self;

    if (open) self.hide();
    else self.show();
  }

  /** Shows the dropdown menu to the user. */
  show() {
    const self = this;
    const currentParent = queryElement(dropdownMenuClasses.concat('btn-group', 'input-group').map((c) => `.${c}.${showClass}`).join(','));
    const currentElement = currentParent && queryElement(dropdownSelector, currentParent);

    if (currentElement) getDropdownInstance(currentElement).hide();

    const { element, menu, open } = self;
    const parent = element.parentNode;

    // update relatedTarget and dispatch
    parent.dispatchEvent(showDropdownEvent);
    if (showDropdownEvent.defaultPrevented) return;

    // change menu position
    styleDropdown(self, 1);

    addClass(menu, showClass);
    addClass(parent, showClass);

    element.setAttribute(ariaExpanded, true);
    self.open = !open;

    setTimeout(() => {
      setFocus(element); // focus the element
      toggleDropdownDismiss(self);

      parent.dispatchEvent(shownDropdownEvent);
    }, 1);
  }

  /** Hides the dropdown menu from the user. */
  hide() {
    const self = this;
    const { element, menu, open } = self;
    const parent = element.parentNode;
    parent.dispatchEvent(hideDropdownEvent);
    if (hideDropdownEvent.defaultPrevented) return;

    removeClass(menu, showClass);
    removeClass(parent, showClass);

    // revert to original position
    styleDropdown(self);

    element.setAttribute(ariaExpanded, false);
    self.open = !open;

    // only re-attach handler if the instance is not disposed
    setTimeout(() => toggleDropdownDismiss(self), 1);

    parent.dispatchEvent(hiddenDropdownEvent);
  }

  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    const self = this;
    const { element } = self;

    if (hasClass(element.parentNode, showClass) && self.open) self.hide();

    toggleDropdownHandler(self);

    super.dispose();
  }
}

Object.assign(Dropdown, {
  selector: dropdownSelector,
  init: dropdownInitCallback,
  getInstance: getDropdownInstance,
});

/**
 * A global namespace for aria-hidden.
 * @type {string}
 */
const ariaHidden = 'aria-hidden';

/**
 * A global namespace for aria-modal.
 * @type {string}
 */
const ariaModal = 'aria-modal';

/**
 * Global namespace for components `fixed-top` class.
 */
const fixedTopClass = 'fixed-top';

/**
 * Global namespace for components `fixed-bottom` class.
 */
const fixedBottomClass = 'fixed-bottom';

/**
 * Global namespace for components `sticky-top` class.
 */
const stickyTopClass = 'sticky-top';

const fixedItems = [
  ...document.getElementsByClassName(fixedTopClass),
  ...document.getElementsByClassName(fixedBottomClass),
  ...document.getElementsByClassName(stickyTopClass),
  ...document.getElementsByClassName('is-fixed'),
];

/**
 * Removes *padding* and *overflow* from the `<body>`
 * and all spacing from fixed items.
 */
function resetScrollbar() {
  const bd = document.body;
  bd.style.paddingRight = '';
  bd.style.overflow = '';

  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      fixed.style.paddingRight = '';
      fixed.style.marginRight = '';
    });
  }
}

/**
 * Returns the scrollbar width if the body does overflow
 * the window.
 * @returns {number} the value
 */
function measureScrollbar() {
  const { clientWidth } = document.documentElement;
  return Math.abs(window.innerWidth - clientWidth);
}

/**
 * Sets the `<body>` and fixed items style when modal / offcanvas
 * is shown to the user.
 *
 * @param {number} scrollbarWidth the previously measured scrollbar width
 * @param {boolean | number} overflow body does overflow or not
 */
function setScrollbar(scrollbarWidth, overflow) {
  const bd = document.body;
  const bdStyle = getComputedStyle(bd);
  const bodyPad = parseInt(bdStyle.paddingRight, 10);
  const isOpen = bdStyle.overflow === 'hidden';
  const sbWidth = isOpen && bodyPad ? 0 : scrollbarWidth;

  if (overflow) {
    bd.style.overflow = 'hidden';
    bd.style.paddingRight = `${bodyPad + sbWidth}px`;

    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const isSticky = hasClass(fixed, stickyTopClass);
        const itemPadValue = getComputedStyle(fixed).paddingRight;
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if (isSticky) {
          const itemMValue = getComputedStyle(fixed).marginRight;
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
}

const modalBackdropClass = 'modal-backdrop';
const offcanvasBackdropClass = 'offcanvas-backdrop';
const modalActiveSelector = `.modal.${showClass}`;
const offcanvasActiveSelector = `.offcanvas.${showClass}`;
const overlay = document.createElement('div');

/**
 * Returns the current active modal / offcancas element.
 * @returns {Element} the requested element
 */
function getCurrentOpen() {
  return queryElement(`${modalActiveSelector},${offcanvasActiveSelector}`);
}

/**
 * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
 * @param {boolean | number} isModal
 */
function toggleOverlayType(isModal) {
  const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
  [modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
    removeClass(overlay, c);
  });
  addClass(overlay, targetClass);
}

/**
 * Append the overlay to DOM.
 * @param {boolean | number} hasFade
 * @param {boolean | number} isModal
 */
function appendOverlay(hasFade, isModal) {
  toggleOverlayType(isModal);
  document.body.append(overlay);
  if (hasFade) addClass(overlay, fadeClass);
}

/**
 * Shows the overlay to the user.
 */
function showOverlay() {
  addClass(overlay, showClass);
  reflow(overlay);
}

/**
 * Hides the overlay from the user.
 */
function hideOverlay() {
  removeClass(overlay, showClass);
}

/**
 * Removes the overlay from DOM.
 */
function removeOverlay() {
  if (!getCurrentOpen()) {
    removeClass(overlay, fadeClass);
    overlay.remove();
    resetScrollbar();
  }
}

function isVisible(element) {
  return getComputedStyle(element).visibility !== 'hidden'
    && element.offsetParent !== null;
}

/* Native JavaScript for Bootstrap 5 | Modal
-------------------------------------------- */

// MODAL PRIVATE GC
// ================
const modalString = 'modal';
const modalComponent = 'Modal';
const modalSelector = `.${modalString}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;
/**
 * Static method which returns an existing `Modal` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Modal>}
 */
const getModalInstance = (element) => getInstance(element, modalComponent);

/**
 * A `Modal` initialization callback.
 * @type {BSN.InitCallback<Modal>}
 */
const modalInitCallback = (element) => new Modal(element);

const modalDefaults = {
  backdrop: true, // boolean|string
  keyboard: true, // boolean
};

// MODAL CUSTOM EVENTS
// ===================
/** @type {BSN.ModalEvent.show} */
const showModalEvent = bootstrapCustomEvent(`show.bs.${modalString}`);
/** @type {BSN.ModalEvent.shown} */
const shownModalEvent = bootstrapCustomEvent(`shown.bs.${modalString}`);
/** @type {BSN.ModalEvent.hide} */
const hideModalEvent = bootstrapCustomEvent(`hide.bs.${modalString}`);
/** @type {BSN.ModalEvent.hidden} */
const hiddenModalEvent = bootstrapCustomEvent(`hidden.bs.${modalString}`);

// MODAL PRIVATE METHODS
// =====================
/**
 * Applies special style for the `<body>` and fixed elements
 * when a modal instance is shown to the user.
 *
 * @param {Modal} self the `Modal` instance
 */
function setModalScrollbar(self) {
  const { element, scrollbarWidth } = self;
  const bd = document.body;
  const html = document.documentElement;
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  const modalOverflow = element.clientHeight !== element.scrollHeight;

  if (!modalOverflow && scrollbarWidth) {
    element.style.paddingRight = `${scrollbarWidth}px`;
  }
  setScrollbar(scrollbarWidth, (modalOverflow || bodyOverflow));
}

/**
 * Toggles on/off the listeners of events that close the modal.
 *
 * @param {Modal} self the `Modal` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function toggleModalDismiss(self, add) {
  const action = add ? addEventListener : removeEventListener;
  window[action]('resize', self.update, passiveHandler);
  self.element[action]('click', modalDismissHandler);
  document[action]('keydown', modalKeyHandler);
}

/**
 * Toggles on/off the `click` event listener of the `Modal` instance.
 * @param {Modal} self the `Modal` instance
 * @param {boolean | number} add when `true`, event listener is added
 */
function toggleModalHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { triggers } = self;

  if (triggers.length) {
    triggers.forEach((btn) => btn[action]('click', modalClickHandler));
  }
}

/**
 * Executes after a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 */
function afterModalHide(self) {
  const { triggers } = self;
  removeOverlay();
  self.element.style.paddingRight = '';
  self.isAnimating = false;

  if (triggers.length) {
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) setFocus(visibleTrigger);
  }
}

/**
 * Executes after a modal is shown to the user.
 * @param {Modal} self the `Modal` instance
 */
function afterModalShow(self) {
  const { element, relatedTarget } = self;
  setFocus(element);
  self.isAnimating = false;

  toggleModalDismiss(self, 1);

  shownModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(shownModalEvent);
}

/**
 * Executes before a modal is shown to the user.
 * @param {Modal} self the `Modal` instance
 */
function beforeModalShow(self) {
  const { element, hasFade } = self;
  element.style.display = 'block';

  setModalScrollbar(self);
  if (!getCurrentOpen()) {
    document.body.style.overflow = 'hidden';
  }

  addClass(element, showClass);
  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);

  if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
  else afterModalShow(self);
}

/**
 * Executes before a modal is hidden to the user.
 * @param {Modal} self the `Modal` instance
 */
function beforeModalHide(self, force) {
  const {
    element, options, relatedTarget, hasFade,
  } = self;

  element.style.display = '';

  // force can also be the transitionEvent object, we wanna make sure it's not
  // call is not forced and overlay is visible
  if (options.backdrop && !force && hasFade && hasClass(overlay, showClass)
    && !getCurrentOpen()) { // AND no modal is visible
    hideOverlay();
    emulateTransitionEnd(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self);
  }

  toggleModalDismiss(self);

  hiddenModalEvent.relatedTarget = relatedTarget;
  element.dispatchEvent(hiddenModalEvent);
}

// MODAL EVENT HANDLERS
// ====================
/**
 * Handles the `click` event listener for modal.
 * @param {Event} e the `Event` object
 */
function modalClickHandler(e) {
  const { target } = e;
  const trigger = target.closest(modalToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && getModalInstance(element);

  if (trigger.tagName === 'A') e.preventDefault();

  if (self.isAnimating) return;

  self.relatedTarget = trigger;

  self.toggle();
}

/**
 * Handles the `keydown` event listener for modal
 * to hide the modal when user type the `ESC` key.
 *
 * @param {Event} e the `Event` object
 */
function modalKeyHandler({ which }) {
  const element = queryElement(modalActiveSelector);
  const self = getModalInstance(element);
  const { options, isAnimating } = self;
  if (!isAnimating // modal has no animations running
    && options.keyboard && which === 27 // the keyboard option is enabled and the key is 27
    && hasClass(element, showClass)) { // the modal is not visible
    self.relatedTarget = null;
    self.hide();
  }
}

/**
 * Handles the `click` event listeners that hide the modal.
 *
 * @param {Event} e the `Event` object
 */
function modalDismissHandler(e) {
  const element = this;
  const self = getModalInstance(element);

  if (self.isAnimating) return;

  const { options, isStatic, modalDialog } = self;
  const { backdrop } = options;
  const { target } = e;
  const selectedText = document.getSelection().toString().length;
  const targetInsideDialog = modalDialog.contains(target);
  const dismiss = target.closest(modalDismissSelector);

  if (isStatic && !targetInsideDialog) {
    addClass(element, modalStaticClass);
    self.isAnimating = true;
    emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
  } else if (dismiss || (!selectedText && !isStatic && !targetInsideDialog && backdrop)) {
    self.relatedTarget = dismiss || null;
    self.hide();
    e.preventDefault();
  }
}

function staticTransitionEnd(self) {
  const duration = getElementTransitionDuration(self.modalDialog) + 17;
  removeClass(self.element, modalStaticClass);
  // user must wait for zoom out transition
  setTimeout(() => { self.isAnimating = false; }, duration);
}

// MODAL DEFINITION
// ================
/** Returns a new `Modal` instance. */
class Modal extends BaseComponent {
  /**
   * @param {Element | string} target usually the `.modal` element
   * @param {BSN.ModalOptions?} config instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;

    // the modal
    const { element } = self;

    // the modal-dialog
    /** @private @type {Element} */
    self.modalDialog = queryElement(`.${modalString}-dialog`, element);

    // modal can have multiple triggering elements
    /** @private @type {Element[]} */
    self.triggers = Array.from(document.querySelectorAll(modalToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional internals
    /** @private @type {boolean} */
    self.isStatic = self.options.backdrop === 'static';
    /** @private @type {boolean} */
    self.hasFade = hasClass(element, fadeClass);
    /** @private @type {boolean} */
    self.isAnimating = false;
    /** @private @type {number} */
    self.scrollbarWidth = measureScrollbar();
    /** @private @type {number} */
    self.relatedTarget = null;

    // attach event listeners
    toggleModalHandler(self, 1);

    // bind
    self.update = self.update.bind(self);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return modalComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return modalDefaults; }
  /* eslint-enable */

  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show();
  }

  /** Shows the modal to the user. */
  show() {
    const self = this;
    const {
      element, options, isAnimating, hasFade, relatedTarget,
    } = self;
    const { backdrop } = options;
    let overlayDelay = 0;

    if (hasClass(element, showClass) && !isAnimating) return;

    showModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(showModalEvent);
    if (showModalEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const this1 = getModalInstance(currentOpen);
      const that1 = this1 || getInstance(currentOpen, 'Offcanvas');
      that1.hide();
    }

    self.isAnimating = true;

    if (backdrop) {
      if (!currentOpen && !hasClass(overlay, showClass)) {
        appendOverlay(hasFade, 1);
      } else {
        toggleOverlayType(1);
      }
      overlayDelay = getElementTransitionDuration(overlay);

      if (!hasClass(overlay, showClass)) showOverlay();
      setTimeout(() => beforeModalShow(self), overlayDelay);
    } else {
      beforeModalShow(self);
      if (currentOpen && hasClass(overlay, showClass)) {
        hideOverlay();
      }
    }
  }

  /**
   * Hide the modal from the user.
   * @param {boolean | number} force when `true` it will skip animation
   */
  hide(force) {
    const self = this;
    const {
      element, isAnimating, hasFade, relatedTarget,
    } = self;
    if (!hasClass(element, showClass) && !isAnimating) return;

    hideModalEvent.relatedTarget = relatedTarget || null;
    element.dispatchEvent(hideModalEvent);
    if (hideModalEvent.defaultPrevented) return;

    self.isAnimating = true;
    removeClass(element, showClass);
    element.setAttribute(ariaHidden, true);
    element.removeAttribute(ariaModal);

    if (hasFade && force !== 1) {
      emulateTransitionEnd(element, () => beforeModalHide(self));
    } else {
      beforeModalHide(self, force);
    }
  }

  /** Updates the modal layout. */
  update() {
    const self = this;

    if (hasClass(self.element, showClass)) setModalScrollbar(self);
  }

  /** Removes the `Modal` component from target element. */
  dispose() {
    const self = this;
    self.hide(1); // forced call

    toggleModalHandler(self);

    super.dispose();
  }
}

Object.assign(Modal, {
  selector: modalSelector,
  init: modalInitCallback,
  getInstance: getModalInstance,
});

/* Native JavaScript for Bootstrap 5 | OffCanvas
------------------------------------------------ */

// OFFCANVAS PRIVATE GC
// ====================
const offcanvasString = 'offcanvas';
const offcanvasComponent = 'Offcanvas';
const offcanvasSelector = `.${offcanvasString}`;
const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
const offcanvasTogglingClass = `${offcanvasString}-toggling`;

const offcanvasDefaults = {
  backdrop: true, // boolean
  keyboard: true, // boolean
  scroll: false, // boolean
};

/**
 * Static method which returns an existing `Offcanvas` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Offcanvas>}
 */
const getOffcanvasInstance = (element) => getInstance(element, offcanvasComponent);

/**
 * An `Offcanvas` initialization callback.
 * @type {BSN.InitCallback<Offcanvas>}
 */
const offcanvasInitCallback = (element) => new Offcanvas(element);

// OFFCANVAS CUSTOM EVENTS
// =======================
/** @type {BSN.OffcanvasEvent.show} */
const showOffcanvasEvent = bootstrapCustomEvent(`show.bs.${offcanvasString}`);
/** @type {BSN.OffcanvasEvent.shown} */
const shownOffcanvasEvent = bootstrapCustomEvent(`shown.bs.${offcanvasString}`);
/** @type {BSN.OffcanvasEvent.hide} */
const hideOffcanvasEvent = bootstrapCustomEvent(`hide.bs.${offcanvasString}`);
/** @type {BSN.OffcanvasEvent.hidden} */
const hiddenOffcanvasEvent = bootstrapCustomEvent(`hidden.bs.${offcanvasString}`);

// OFFCANVAS PRIVATE METHODS
// =========================
/**
 * Sets additional style for the `<body>` and other elements
 * when showing an offcanvas to the user.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function setOffCanvasScrollbar(self) {
  const bd = document.body;
  const html = document.documentElement;
  const bodyOverflow = html.clientHeight !== html.scrollHeight
                    || bd.clientHeight !== bd.scrollHeight;
  setScrollbar(self.scrollbarWidth, bodyOverflow);
}

/**
 * Toggles on/off the `click` event listeners.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 * @param {boolean | number} add when `true`, listeners are added
 */
function toggleOffcanvasEvents(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.triggers.forEach((btn) => btn[action]('click', offcanvasTriggerHandler));
}

/**
 * Toggles on/off the listeners of the events that close the offcanvas.
 *
 * @param {boolean | number} add the `Offcanvas` instance
 */
function toggleOffCanvasDismiss(add) {
  const action = add ? addEventListener : removeEventListener;
  document[action]('keydown', offcanvasKeyDismissHandler);
  document[action]('click', offcanvasDismissHandler);
}

/**
 * Executes before showing the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function beforeOffcanvasShow(self) {
  const { element, options } = self;

  if (!options.scroll) {
    document.body.style.overflow = 'hidden';
    setOffCanvasScrollbar(self);
  }

  addClass(element, offcanvasTogglingClass);
  addClass(element, showClass);
  element.style.visibility = 'visible';

  emulateTransitionEnd(element, () => showOffcanvasComplete(self));
}

/**
 * Executes before hiding the offcanvas.
 *
 * @param {Offcanvas} self the `Offcanvas` instance
 */
function beforeOffcanvasHide(self) {
  const { element, options } = self;
  const currentOpen = getCurrentOpen();

  element.blur();

  if (!currentOpen && options.backdrop && hasClass(overlay, showClass)) {
    hideOverlay();
    emulateTransitionEnd(overlay, () => hideOffcanvasComplete(self));
  } else hideOffcanvasComplete(self);
}

// OFFCANVAS EVENT HANDLERS
// ========================
/**
 * Handles the `click` event listeners.
 *
 * @param {Event} e the `Event` object
 */
function offcanvasTriggerHandler(e) {
  const trigger = this.closest(offcanvasToggleSelector);
  const element = getTargetElement(trigger);
  const self = element && getOffcanvasInstance(element);

  if (trigger.tagName === 'A') e.preventDefault();
  if (self) {
    self.toggle();
  }
}

/**
 * Handles the event listeners that close the offcanvas.
 *
 * @param {Event} e the `Event` object
 */
function offcanvasDismissHandler(e) {
  const element = queryElement(offcanvasActiveSelector);
  if (!element) return;

  const offCanvasDismiss = queryElement(offcanvasDismissSelector, element);
  const self = getOffcanvasInstance(element);
  if (!self) return;

  const { options, triggers } = self;
  const { target } = e;
  const trigger = target.closest(offcanvasToggleSelector);

  if (trigger && trigger.tagName === 'A') e.preventDefault();

  if ((!element.contains(target) && options.backdrop
    && (!trigger || (trigger && !triggers.includes(trigger))))
    || (offCanvasDismiss && offCanvasDismiss.contains(target))) {
    self.hide();
  }
}

/**
 * Handles the `keydown` event listener for offcanvas
 * to hide it when user type the `ESC` key.
 *
 * @param {Event} {which} the `Event` object
 */
function offcanvasKeyDismissHandler({ which }) {
  const element = queryElement(offcanvasActiveSelector);
  if (!element) return;

  const self = getOffcanvasInstance(element);

  if (self && self.options.keyboard && which === 27) {
    self.hide();
  }
}

function showOffcanvasComplete(self) {
  const { element, triggers } = self;
  removeClass(element, offcanvasTogglingClass);

  element.removeAttribute(ariaHidden);
  element.setAttribute(ariaModal, true);
  element.setAttribute('role', 'dialog');
  self.isAnimating = false;

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, true));
  }

  element.dispatchEvent(shownOffcanvasEvent);

  toggleOffCanvasDismiss(1);
  setFocus(element);
}

function hideOffcanvasComplete(self) {
  const {
    element, triggers,
  } = self;

  element.setAttribute(ariaHidden, true);
  element.removeAttribute(ariaModal);
  element.removeAttribute('role');
  element.style.visibility = '';
  self.isAnimating = false;

  if (triggers.length) {
    triggers.forEach((btn) => btn.setAttribute(ariaExpanded, false));
    const visibleTrigger = triggers.find((x) => isVisible(x));
    if (visibleTrigger) setFocus(visibleTrigger);
  }

  removeOverlay();

  element.dispatchEvent(hiddenOffcanvasEvent);
  removeClass(element, offcanvasTogglingClass);

  toggleOffCanvasDismiss();
}

// OFFCANVAS DEFINITION
// ====================
/** Returns a new `Offcanvas` instance. */
class Offcanvas extends BaseComponent {
  /**
   * @param {Element | string} target usually an `.offcanvas` element
   * @param {BSN.OffcanvasOptions?} config instance options
   */
  constructor(target, config) {
    super(target, config);
    const self = this;

    // instance element
    const { element } = self;

    // all the triggering buttons
    /** @private @type {Element[]} */
    self.triggers = Array.from(document.querySelectorAll(offcanvasToggleSelector))
      .filter((btn) => getTargetElement(btn) === element);

    // additional instance property
    /** @private @type {boolean} */
    self.isAnimating = false;
    /** @private @type {number} */
    self.scrollbarWidth = measureScrollbar();

    // attach event listeners
    toggleOffcanvasEvents(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return offcanvasComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return offcanvasDefaults; }
  /* eslint-enable */

  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    const self = this;
    if (hasClass(self.element, showClass)) self.hide();
    else self.show();
  }

  /** Shows the offcanvas to the user. */
  show() {
    const that = getOffcanvasInstance(this);
    const self = that || this;
    const {
      element, options, isAnimating,
    } = self;
    let overlayDelay = 0;

    if (hasClass(element, showClass) || isAnimating) return;

    element.dispatchEvent(showOffcanvasEvent);

    if (showOffcanvasEvent.defaultPrevented) return;

    // we elegantly hide any opened modal/offcanvas
    const currentOpen = getCurrentOpen();
    if (currentOpen && currentOpen !== element) {
      const this1 = getOffcanvasInstance(currentOpen);
      const that1 = this1 || getInstance(currentOpen, 'Modal');
      that1.hide();
    }

    self.isAnimating = true;

    if (options.backdrop) {
      if (!currentOpen) {
        appendOverlay(1);
      } else {
        toggleOverlayType();
      }

      overlayDelay = getElementTransitionDuration(overlay);

      if (!hasClass(overlay, showClass)) showOverlay();

      setTimeout(() => beforeOffcanvasShow(self), overlayDelay);
    } else {
      beforeOffcanvasShow(self);
      if (currentOpen && hasClass(overlay, showClass)) {
        hideOverlay();
      }
    }
  }

  /**
   * Hides the offcanvas from the user.
   * @param {boolean | number} force when `true` it will skip animation
   */
  hide(force) {
    const self = this;
    const { element, isAnimating } = self;

    if (!hasClass(element, showClass) || isAnimating) return;

    element.dispatchEvent(hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented) return;

    self.isAnimating = true;
    addClass(element, offcanvasTogglingClass);
    removeClass(element, showClass);

    if (!force) {
      emulateTransitionEnd(element, () => beforeOffcanvasHide(self));
    } else beforeOffcanvasHide(self);
  }

  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const self = this;
    self.hide(1);
    toggleOffcanvasEvents(self);
    super.dispose();
  }
}

Object.assign(Offcanvas, {
  selector: offcanvasSelector,
  init: offcanvasInitCallback,
  getInstance: getOffcanvasInstance,
});

/**
 * A global namespace for aria-describedby.
 * @type {string}
 */
const ariaDescribedBy = 'aria-describedby';

/**
 * Checks if an element is an `<svg>`, `<img>` or `<video>`.
 * *Tooltip* / *Popover* works different with media elements.
 * @param {Element} element the target element
 * @returns {boolean} the query result
 */
function isMedia(element) {
  return [SVGElement, HTMLImageElement, HTMLVideoElement]
    .some((mediaType) => element instanceof mediaType);
}

var tipClassPositions = {
  top: 'top', bottom: 'bottom', left: 'start', right: 'end',
};

function isVisibleTip(tip, container) {
  return container.contains(tip);
}

/**
 * Style popovers and tooltips.
 * @param {BSN.Tooltip | BSN.Popover} self the Popover / Tooltip instance
 * @param {Event=} e event object
 */
function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  // @ts-ignore
  const tip = self.tooltip || self.popover;
  // reset tip style
  tip.style.top = '';
  tip.style.left = '';
  tip.style.right = '';
  // continue with metrics
  const isPopover = !!self.popover;
  let tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };
  const windowWidth = (document.documentElement.clientWidth || document.body.clientWidth);
  const windowHeight = (document.documentElement.clientHeight || document.body.clientHeight);
  const {
    element, options, arrow, positions,
  } = self;
  let { container, placement } = options;
  let parentIsBody = container === document.body;

  const { elementPosition, containerIsStatic, relContainer } = positions;
  let { containerIsRelative } = positions;
  // static containers should refer to another relative container or the body
  container = relContainer || container;
  containerIsRelative = containerIsStatic && relContainer ? 1 : containerIsRelative;
  parentIsBody = container === document.body;
  const parentRect = container.getBoundingClientRect();
  const leftBoundry = containerIsRelative ? parentRect.left : 0;
  const rightBoundry = containerIsRelative ? parentRect.right : windowWidth;
  // this case should not be possible
  // containerIsAbsolute = !parentIsBody && containerPosition === 'absolute',
  // this case requires a container with position: relative
  const absoluteTarget = elementPosition === 'absolute';
  const targetRect = element.getBoundingClientRect();
  const scroll = parentIsBody
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: container.scrollLeft, y: container.scrollTop };
  const elemDimensions = { w: element.offsetWidth, h: element.offsetHeight };
  const top = containerIsRelative ? element.offsetTop : targetRect.top;
  const left = containerIsRelative ? element.offsetLeft : targetRect.left;
  // reset arrow style
  arrow.style.top = '';
  arrow.style.left = '';
  arrow.style.right = '';
  let topPosition;
  let leftPosition;
  let rightPosition;
  let arrowTop;
  let arrowLeft;
  let arrowRight;

  // check placement
  let topExceed = targetRect.top - tipDimensions.h < 0;
  let bottomExceed = targetRect.top + tipDimensions.h + elemDimensions.h >= windowHeight;
  let leftExceed = targetRect.left - tipDimensions.w < leftBoundry;
  let rightExceed = targetRect.left + tipDimensions.w + elemDimensions.w >= rightBoundry;

  topExceed = ['left', 'right'].includes(placement)
    ? targetRect.top + elemDimensions.h / 2 - tipDimensions.h / 2 < 0
    : topExceed;
  bottomExceed = ['left', 'right'].includes(placement)
    ? targetRect.top + tipDimensions.h / 2 + elemDimensions.h / 2 >= windowHeight
    : bottomExceed;
  leftExceed = ['top', 'bottom'].includes(placement)
    ? targetRect.left + elemDimensions.w / 2 - tipDimensions.w / 2 < leftBoundry
    : leftExceed;
  rightExceed = ['top', 'bottom'].includes(placement)
    ? targetRect.left + tipDimensions.w / 2 + elemDimensions.w / 2 >= rightBoundry
    : rightExceed;

  // recompute placement
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  placement = (['left', 'right'].includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tip.className.includes(placement)) {
    tip.className = tip.className.replace(tipClasses, tipClassPositions[placement]);
  }
  // if position has changed, update tip dimensions
  tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };

  // we check the computed width & height and update here
  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // compute tooltip / popover coordinates
  if (['left', 'right'].includes(placement)) { // secondary|side positions
    if (placement === 'left') { // LEFT
      leftPosition = left + scroll.x - tipDimensions.w - (isPopover ? arrowWidth : 0);
    } else { // RIGHT
      leftPosition = left + scroll.x + elemDimensions.w + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = top + scroll.y;
      arrowTop = elemDimensions.h / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = top + scroll.y - tipDimensions.h + elemDimensions.h;
      arrowTop = tipDimensions.h - elemDimensions.h / 2 - arrowWidth;
    } else {
      topPosition = top + scroll.y - tipDimensions.h / 2 + elemDimensions.h / 2;
      arrowTop = tipDimensions.h / 2 - arrowHeight / 2;
    }
  } else if (['top', 'bottom'].includes(placement)) {
    if (e && isMedia(element)) {
      const eX = !containerIsRelative
        ? e.pageX
        : e.layerX + (absoluteTarget ? element.offsetLeft : 0);
      const eY = !containerIsRelative
        ? e.pageY
        : e.layerY + (absoluteTarget ? element.offsetTop : 0);

      if (placement === 'top') {
        topPosition = eY - tipDimensions.h - (isPopover ? arrowWidth : arrowHeight);
      } else {
        topPosition = eY + arrowHeight;
      }

      // adjust left | right and also the arrow
      if (e.clientX - tipDimensions.w / 2 < leftBoundry) { // when exceeds left
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e.clientX + tipDimensions.w * 0.51 >= rightBoundry) { // when exceeds right
        leftPosition = 'auto';
        rightPosition = 0;
        arrowLeft = tipDimensions.w - (rightBoundry - eX) - arrowAdjust;
      } else { // normal top/bottom
        leftPosition = eX - tipDimensions.w / 2;
        arrowLeft = tipDimensions.w / 2 - arrowAdjust;
      }
    } else {
      if (placement === 'top') {
        topPosition = top + scroll.y - tipDimensions.h - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = top + scroll.y + elemDimensions.h + (isPopover ? arrowHeight : 0);
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = left + elemDimensions.w / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = elemDimensions.w / 2 + (parentRect.right - targetRect.right) - arrowAdjust;
      } else {
        leftPosition = left + scroll.x - tipDimensions.w / 2 + elemDimensions.w / 2;
        arrowLeft = tipDimensions.w / 2 - arrowAdjust;
      }
    }
  }

  // apply style to tooltip/popover and its arrow
  tip.style.top = `${topPosition}px`;
  tip.style.left = leftPosition === 'auto' ? leftPosition : `${leftPosition}px`;
  tip.style.right = rightPosition !== undefined ? `${rightPosition}px` : '';
  // update arrow placement or clear side
  if (arrowTop !== undefined) {
    arrow.style.top = `${arrowTop}px`;
  }

  if (arrowLeft !== undefined) {
    arrow.style.left = `${arrowLeft}px`;
  } else if (arrowRight !== undefined) {
    arrow.style.right = `${arrowRight}px`;
  }
}

let bsnUID = 1;

/**
 * Returns a unique identifier for popover, tooltip, scrollspy.
 *
 * @param {Element} element target element
 * @param {number} key predefined key
 * @returns {number} an existing or new unique key
 */
function getUID(element, key) {
  bsnUID += 1;
  return element[key] || bsnUID;
}

/**
 * Returns an `Element` to be used as *options.container*
 * for `Tooltip` / `Popover` components when the target is included inside
 * a modal or a fixed navbar.
 *
 * @param {Element} element the target
 * @returns {Element} the query result
 */
function getTipContainer(element) {
  // maybe the element is inside a modal
  const modal = element.closest('.modal');

  // OR maybe the element is inside a fixed navbar
  const navbarFixed = element.closest(`.${fixedTopClass},.${fixedBottomClass}`);

  // set default container option appropriate for the context
  return modal || navbarFixed || document.body;
}

/**
 * Returns the closest parentElement with `position: relative`.
 * @param {Element} element target element
 * @returns {?Element} the closest match
 */
function closestRelative(element) {
  let retval = null;
  let el = element;
  while (el !== document.body) {
    el = el.parentElement;
    if (getComputedStyle(el).position === 'relative') {
      retval = el;
      break;
    }
  }
  return retval;
}

/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {Element} element target
 * @param {Element | string} content the `Element` to append / string
 * @param {function} sanitizeFn a function to sanitize string content
 */
function setHtml(element, content, sanitizeFn) {
  if (typeof content === 'string' && !content.length) return;

  if (content instanceof Element) {
    element.append(content);
  } else {
    let dirty = content.trim(); // fixing #233

    if (typeof sanitizeFn === 'function') dirty = sanitizeFn(dirty);

    const domParser = new DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    const { body } = tempDocument;
    const method = body.children.length ? 'innerHTML' : 'innerText';
    element[method] = body[method];
  }
}

/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */

// POPOVER PRIVATE GC
// ==================
const popoverString = 'popover';
const popoverComponent = 'Popover';
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
const appleBrands = /(iPhone|iPod|iPad)/;
const isIphone = navigator.userAgentData
  ? navigator.userAgentData.brands.some((x) => appleBrands.test(x.brand))
  : appleBrands.test(navigator.userAgent);
const popoverHeaderClass = `${popoverString}-header`;
const popoverBodyClass = `${popoverString}-body`;

// POPOVER CUSTOM EVENTS
// =====================
/** @type {BSN.PopoverEvent.show} */
const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
/** @type {BSN.PopoverEvent.shown} */
const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
/** @type {BSN.PopoverEvent.hide} */
const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
/** @type {BSN.PopoverEvent.hidden} */
const hiddenPopoverEvent = bootstrapCustomEvent(`hidden.bs.${popoverString}`);

const popoverDefaults = {
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  title: null,
  content: null,
  customClass: null,
  trigger: 'hover',
  placement: 'top',
  btnClose: '<button class="btn-close" aria-label="Close"></button>',
  sanitizeFn: null,
  dismissible: false,
  animation: true,
  delay: 200,
  container: null,
};

/**
 * Static method which returns an existing `Popover` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Popover>}
 */
const getPopoverInstance = (element) => getInstance(element, popoverComponent);

/**
 * A `Popover` initialization callback.
 * @type {BSN.InitCallback<Popover>}
 */
const popoverInitCallback = (element) => new Popover(element);

// POPOVER EVENT HANDLERS
// ======================
/**
 * Handles the `touchstart` event listener for `Popover`
 * @param {Event} e the `Event` object
 */
function popoverTouchHandler({ target }) {
  const self = this;
  const { popover, element } = self;

  if ((popover && popover.contains(target)) // popover includes touch target
    || target === element // OR touch target is element
    || element.contains(target)) ; else {
    self.hide();
  }
}

// POPOVER PRIVATE METHODS
// =======================
/**
 * Creates a new popover.
 *
 * @param {Popover} self the `Popover` instance
 */
function createPopover(self) {
  const { id, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
  } = options;
  let {
    title, content,
  } = options;
  const {
    template, btnClose,
  } = options;

  // set initial popover class
  const placementClass = `bs-${popoverString}-${tipClassPositions[placement]}`;

  // load template
  let popoverTemplate;
  if (typeof template === 'object') {
    popoverTemplate = template;
  } else {
    const htmlMarkup = document.createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    popoverTemplate = htmlMarkup.firstChild;
  }
  // set popover markup
  self.popover = popoverTemplate.cloneNode(true);

  const { popover } = self;

  // set id and role attributes
  popover.setAttribute('id', id);
  popover.setAttribute('role', 'tooltip');

  const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
  const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

  // set arrow and enable access for styleTip
  self.arrow = queryElement(`.${popoverString}-arrow`, popover);

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (title instanceof Element) setHtml(title, btnClose, sanitizeFn);
      else title += btnClose;
    } else {
      if (popoverHeader) popoverHeader.remove();
      if (content instanceof Element) setHtml(content, btnClose, sanitizeFn);
      else content += btnClose;
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  if (title && popoverHeader) setHtml(popoverHeader, title, sanitizeFn);
  if (content && popoverBody) setHtml(popoverBody, content, sanitizeFn);

  // set btn and enable access for styleTip
  [self.btn] = popover.getElementsByClassName('btn-close');

  // set popover animation and placement
  if (!hasClass(popover, popoverString)) addClass(popover, popoverString);
  if (animation && !hasClass(popover, fadeClass)) addClass(popover, fadeClass);
  if (customClass && !hasClass(popover, customClass)) {
    addClass(popover, customClass);
  }
  if (!hasClass(popover, placementClass)) addClass(popover, placementClass);
}

/**
 * Removes the popover from the DOM.
 *
 * @param {Popover} self the `Popover` instance
 */
function removePopover(self) {
  const { element, popover } = self;
  element.removeAttribute(ariaDescribedBy);
  popover.remove();
  self.timer = null;
}

/**
 * Toggles on/off the `Popover` event listeners.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function togglePopoverHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element, options } = self;
  const { trigger, dismissible } = options;
  self.enabled = !!add;

  if (trigger === 'hover') {
    element[action]('mousedown', self.show);
    element[action]('mouseenter', self.show);
    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    if (!dismissible) element[action]('mouseleave', self.hide);
  } else if (trigger === 'click') {
    element[action](trigger, self.toggle);
  } else if (trigger === 'focus') {
    if (isIphone) element[action]('click', () => setFocus(element));
    element[action]('focusin', self.show);
  }
}

/**
 * Toggles on/off the `Popover` event listeners that close popover.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function dismissHandlerToggle(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { options, element, btn } = self;
  const { trigger, dismissible } = options;

  if (dismissible) {
    if (btn) btn[action]('click', self.hide);
  } else {
    if (trigger === 'focus') element[action]('focusout', self.hide);
    if (trigger === 'hover') document[action]('touchstart', popoverTouchHandler, passiveHandler);
  }

  if (!isMedia(element)) {
    window[action]('scroll', self.update, passiveHandler);
    window[action]('resize', self.update, passiveHandler);
  }
}

/**
 * Executes after popover was shown to the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverShowComplete(self) {
  self.element.dispatchEvent(shownPopoverEvent);
}

/**
 * Executes after popover was been hidden from the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverHideComplete(self) {
  removePopover(self);
  self.element.dispatchEvent(hiddenPopoverEvent);
}

// POPOVER DEFINITION
// ==================
/** Returns a new `Popover` instance. */
class Popover extends BaseComponent {
  /**
   * @param {Element | string} target usualy an element with `data-bs-toggle` attribute
   * @param {BSN.PopoverOptions?} config instance options
   */
  constructor(target, config) {
    const element = queryElement(target);
    popoverDefaults.container = getTipContainer(element);
    super(target, config);

    // bind
    const self = this;

    // additional instance properties
    /** @private @type {number} */
    self.timer = null;
    /** @private @type {Element} */
    self.popover = null;
    /** @private @type {Element} */
    self.arrow = null;
    /** @private @type {Element} */
    self.btn = null;
    /** @private @type {boolean} */
    self.enabled = false;
    // set unique ID for aria-describedby
    /** @private @type {string} */
    self.id = `${popoverString}-${getUID(element)}`;

    // set instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? popoverDefaults.container
      : queryElement(options.container);

    // reset default container
    popoverDefaults.container = null;

    // invalidate when no content is set
    if (!options.content) return;

    // crate popover
    createPopover(self);

    // set positions
    const { container } = self.options;
    const elementPosition = getComputedStyle(element).position;
    const containerPosition = getComputedStyle(container).position;
    const parentIsBody = container === document.body;
    const containerIsStatic = !parentIsBody && containerPosition === 'static';
    const containerIsRelative = !parentIsBody && containerPosition === 'relative';
    const relContainer = containerIsStatic && closestRelative(container);
    /** @private @type {Record<string, any>} */
    self.positions = {
      elementPosition,
      containerIsRelative,
      containerIsStatic,
      relContainer,
    };

    // bind
    self.update = self.update.bind(self);

    // attach event listeners
    togglePopoverHandlers(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */ 
  get name() { return popoverComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return popoverDefaults; }
  /* eslint-enable */

  /**
   * Updates the position of the popover.
   *
   * @param {Event?} e the `Event` object
   */
  update(e) {
    styleTip(this, e);
  }

  // POPOVER PUBLIC METHODS
  // ======================
  /**
   * Toggles visibility of the popover.
   *
   * @param {Event?} e the `Event` object
   */
  toggle(e) {
    const self = e ? getPopoverInstance(this) : this;
    const { popover, options } = self;
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  /**
   * Shows the popover.
   *
   * @param {Event?} e the `Event` object
   */
  show(e) {
    const self = e ? getPopoverInstance(this) : this;
    const {
      element, popover, options, id,
    } = self;
    const { container } = options;

    clearTimeout(self.timer);
    if (!isVisibleTip(popover, container)) {
      element.dispatchEvent(showPopoverEvent);
      if (showPopoverEvent.defaultPrevented) return;

      // append to the container
      container.append(popover);
      element.setAttribute(ariaDescribedBy, id);

      self.update(e);
      if (!hasClass(popover, showClass)) addClass(popover, showClass);
      dismissHandlerToggle(self, 1);

      if (options.animation) emulateTransitionEnd(popover, () => popoverShowComplete(self));
      else popoverShowComplete(self);
    }
  }

  /**
   * Hides the popover.
   *
   * @param {Event?} e the `Event` object
   */
  hide(e) {
    let self;
    if (e) {
      self = getPopoverInstance(this);
      if (!self) { // dismissible popover
        const dPopover = this.closest(`.${popoverString}`);
        const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
        self = getPopoverInstance(dEl);
      }
    } else {
      self = this;
    }
    const { element, popover, options } = self;

    clearTimeout(self.timer);
    self.timer = setTimeout(() => {
      if (isVisibleTip(popover, options.container)) {
        element.dispatchEvent(hidePopoverEvent);
        if (hidePopoverEvent.defaultPrevented) return;

        removeClass(popover, showClass);
        dismissHandlerToggle(self);

        if (options.animation) emulateTransitionEnd(popover, () => popoverHideComplete(self));
        else popoverHideComplete(self);
      }
    }, options.delay + 17);
  }

  /** Disables the popover. */
  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      togglePopoverHandlers(self, 1);
      self.enabled = !enabled;
    }
  }

  /** Enables the popover. */
  disable() {
    const self = this;
    const { enabled, popover, options } = self;
    if (enabled) {
      if (isVisibleTip(popover, options.container) && options.animation) {
        self.hide();

        setTimeout(
          () => togglePopoverHandlers(self),
          getElementTransitionDuration(popover) + options.delay + 17,
        );
      } else {
        togglePopoverHandlers(self);
      }
      self.enabled = !enabled;
    }
  }

  /** Toggles the `enabled` property. */
  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

  /** Removes the `Popover` from the target element. */
  dispose() {
    const self = this;
    const { popover, options } = self;
    const { container, animation } = options;
    if (animation && isVisibleTip(popover, container)) {
      self.options.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd(popover, () => togglePopoverHandlers(self));
    } else {
      togglePopoverHandlers(self);
    }
    super.dispose();
  }
}

Object.assign(Popover, {
  selector: popoverSelector,
  init: popoverInitCallback,
  getInstance: getPopoverInstance,
});

/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */

// console.log(typeof addEventListener)

// SCROLLSPY PRIVATE GC
// ====================
const scrollspyString = 'scrollspy';
const scrollspyComponent = 'ScrollSpy';
const scrollspySelector = '[data-bs-spy="scroll"]';

const scrollspyDefaults = {
  offset: 10,
  target: null,
};

/**
 * Static method which returns an existing `ScrollSpy` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<ScrollSpy>}
 */
const getScrollSpyInstance = (element) => getInstance(element, scrollspyComponent);

/**
 * A `ScrollSpy` initialization callback.
 * @type {BSN.InitCallback<ScrollSpy>}
 */
const scrollspyInitCallback = (element) => new ScrollSpy(element);

// SCROLLSPY CUSTOM EVENT
// ======================
/** @type {BSN.ScrollSpyEvent.activate} */
const activateScrollSpy = bootstrapCustomEvent(`activate.bs.${scrollspyString}`);

// SCROLLSPY PRIVATE METHODS
// =========================
/**
 * Update the state of all items.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 */
function updateSpyTargets(self) {
  const {
    target, scrollTarget, isWindow, options, itemsLength, scrollHeight,
  } = self;
  const { offset } = options;
  const links = target.getElementsByTagName('A');

  self.scrollTop = isWindow
    ? scrollTarget.pageYOffset
    : scrollTarget.scrollTop;

  // only update items/offsets once or with each mutation
  if (itemsLength !== links.length || getScrollHeight(scrollTarget) !== scrollHeight) {
    let href;
    let targetItem;
    let rect;

    // reset arrays & update
    self.items = [];
    self.offsets = [];
    self.scrollHeight = getScrollHeight(scrollTarget);
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);

    Array.from(links).forEach((link) => {
      href = link.getAttribute('href');
      targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

      if (targetItem) {
        self.items.push(link);
        rect = targetItem.getBoundingClientRect();
        self.offsets.push((isWindow ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
      }
    });
    self.itemsLength = self.items.length;
  }
}

/**
 * Returns the `scrollHeight` property of the scrolling element.
 * @param {Element?} scrollTarget the `ScrollSpy` instance
 */
function getScrollHeight(scrollTarget) {
  return scrollTarget.scrollHeight || Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
}

/**
 * Returns the height property of the scrolling element.
 * @param {{Element, boolean}} params the `ScrollSpy` instance
 */
function getOffsetHeight({ element, isWindow }) {
  if (!isWindow) return element.getBoundingClientRect().height;
  return window.innerHeight;
}

/**
 * Clear all items of the target.
 * @param {Element} target a single item
 */
function clear(target) {
  Array.from(target.getElementsByTagName('A')).forEach((item) => {
    if (hasClass(item, activeClass)) removeClass(item, activeClass);
  });
}

/**
 * Activates a new item.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 * @param {Element} item a single item
 */
function activate(self, item) {
  const { target, element } = self;
  clear(target);
  self.activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  const parents = [];
  let parentItem = item;
  while (parentItem !== document.body) {
    parentItem = parentItem.parentNode;
    if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
  }

  parents.forEach((menuItem) => {
    const parentLink = menuItem.previousElementSibling;

    if (parentLink && !hasClass(parentLink, activeClass)) {
      addClass(parentLink, activeClass);
    }
  });

  // update relatedTarget and dispatch
  activateScrollSpy.relatedTarget = item;
  element.dispatchEvent(activateScrollSpy);
}

/**
 * Toggles on/off the component event listener.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 * @param {boolean | number} add when `true`, listener is added
 */
function toggleSpyHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.scrollTarget[action]('scroll', self.refresh, passiveHandler);
}

// SCROLLSPY DEFINITION
// ====================
/** Returns a new `ScrollSpy` instance. */
class ScrollSpy extends BaseComponent {
  /**
   * @param {Element | string} target the target element
   * @param {BSN.ScrollspyOptions?} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element & options
    const { element, options } = self;

    // additional properties
    /** @private @type {Element} */
    self.target = queryElement(options.target);

    // invalidate
    if (!self.target) return;

    // set initial state
    /** @private @type {Element} */
    self.scrollTarget = element.clientHeight < element.scrollHeight ? element : window;
    /** @private @type {boolean} */
    self.isWindow = self.scrollTarget === window;
    /** @private @type {number} */
    self.scrollTop = 0;
    /** @private @type {number} */
    self.maxScroll = 0;
    /** @private @type {number} */
    self.scrollHeight = 0;
    /** @private @type {Element?} */
    self.activeItem = null;
    /** @private @type {Element[]} */
    self.items = [];
    /** @private @type {number[]} */
    self.offsets = [];

    // bind events
    self.refresh = self.refresh.bind(self);

    // add event handlers
    toggleSpyHandlers(self, 1);

    self.refresh();
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return scrollspyComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return scrollspyDefaults; }
  /* eslint-enable */

  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh() {
    const self = this;
    const { target } = self;

    // check if target is visible and invalidate
    if (target.offsetHeight === 0) return;

    updateSpyTargets(self);

    const {
      scrollTop, maxScroll, itemsLength, items, activeItem,
    } = self;

    if (scrollTop >= maxScroll) {
      const newActiveItem = items[itemsLength - 1];

      if (activeItem !== newActiveItem) {
        activate(self, newActiveItem);
      }
      return;
    }

    const { offsets } = self;

    if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
      self.activeItem = null;
      clear(target);
      return;
    }

    items.forEach((item, i) => {
      if (activeItem !== item && scrollTop >= offsets[i]
        && (typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1])) {
        activate(self, item);
      }
    });
  }

  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    toggleSpyHandlers(this);
    super.dispose(scrollspyComponent);
  }
}

Object.assign(ScrollSpy, {
  selector: scrollspySelector,
  init: scrollspyInitCallback,
  getInstance: getScrollSpyInstance,
});

/**
 * A global namespace for aria-selected.
 * @type {string}
 */
const ariaSelected = 'aria-selected';

/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */

// TAB PRIVATE GC
// ================
const tabString = 'tab';
const tabComponent = 'Tab';
const tabSelector = `[${dataBsToggle}="${tabString}"]`;

/**
 * Static method which returns an existing `Tab` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Tab>}
 */
const getTabInstance = (element) => getInstance(element, tabComponent);

/**
 * A `Tab` initialization callback.
 * @type {BSN.InitCallback<Tab>}
 */
const tabInitCallback = (element) => new Tab(element);

// TAB CUSTOM EVENTS
// =================
/** @type {BSN.TabEvent.show} */
const showTabEvent = bootstrapCustomEvent(`show.bs.${tabString}`);
/** @type {BSN.TabEvent.shown} */
const shownTabEvent = bootstrapCustomEvent(`shown.bs.${tabString}`);
/** @type {BSN.TabEvent.hide} */
const hideTabEvent = bootstrapCustomEvent(`hide.bs.${tabString}`);
/** @type {BSN.TabEvent.hidden} */
const hiddenTabEvent = bootstrapCustomEvent(`hidden.bs.${tabString}`);

let nextTab;
let nextTabContent;
let nextTabHeight;
let activeTab;
let activeTabContent;
let tabContainerHeight;
let tabEqualContents;

// TAB PRIVATE METHODS
// ===================
/**
 * Executes after tab transition has finished.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabEnd(self) {
  const { tabContent, nav } = self;
  tabContent.style.height = '';
  removeClass(tabContent, collapsingClass);
  nav.isAnimating = false;
}

/**
 * Executes before showing the tab content.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabShow(self) {
  const { tabContent, nav } = self;

  if (tabContent) { // height animation
    if (tabEqualContents) {
      triggerTabEnd(self);
    } else {
      setTimeout(() => { // enables height animation
        tabContent.style.height = `${nextTabHeight}px`; // height animation
        reflow(tabContent);
        emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
      }, 50);
    }
  } else {
    nav.isAnimating = false;
  }
  shownTabEvent.relatedTarget = activeTab;
  nextTab.dispatchEvent(shownTabEvent);
}

/**
 * Executes before hiding the tab.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabHide(self) {
  const { tabContent } = self;
  if (tabContent) {
    activeTabContent.style.float = 'left';
    nextTabContent.style.float = 'left';
    tabContainerHeight = activeTabContent.scrollHeight;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = activeTab;
  hiddenTabEvent.relatedTarget = nextTab;
  nextTab.dispatchEvent(showTabEvent);
  if (showTabEvent.defaultPrevented) return;

  addClass(nextTabContent, activeClass);
  removeClass(activeTabContent, activeClass);

  if (tabContent) {
    nextTabHeight = nextTabContent.scrollHeight;
    tabEqualContents = nextTabHeight === tabContainerHeight;
    addClass(tabContent, collapsingClass);
    tabContent.style.height = `${tabContainerHeight}px`; // height animation
    reflow(tabContent);
    activeTabContent.style.float = '';
    nextTabContent.style.float = '';
  }

  if (hasClass(nextTabContent, fadeClass)) {
    setTimeout(() => {
      addClass(nextTabContent, showClass);
      emulateTransitionEnd(nextTabContent, () => {
        triggerTabShow(self);
      });
    }, 20);
  } else { triggerTabShow(self); }

  activeTab.dispatchEvent(hiddenTabEvent);
}

/**
 * Returns the current active tab.
 * @param {Tab} self the `Tab` instance
 * @returns {Element} the query result
 */
function getActiveTab({ nav }) {
  const activeTabs = nav.getElementsByClassName(activeClass);

  if (activeTabs.length === 1
    && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentNode, c))) {
    [activeTab] = activeTabs;
  } else if (activeTabs.length > 1) {
    activeTab = activeTabs[activeTabs.length - 1];
  }
  return activeTab;
}

/**
 * Returns the current active tab content.
 * @param {Tab} self the `Tab` instance
 * @returns {Element} the query result
 */
function getActiveTabContent(self) {
  activeTab = getActiveTab(self);
  return queryElement(activeTab.getAttribute('href')
    || activeTab.getAttribute(dataBsTarget));
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Tab} self the `Tab` instance
 * @returns {Element} the query result
 */
function toggleTabHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', tabClickHandler);
}

// TAB EVENT HANDLER
// =================
/**
 * Handles the `click` event listener.
 * @param {Event} e the `Event` object
 */
function tabClickHandler(e) {
  const self = getTabInstance(this);
  e.preventDefault();
  if (!self.nav.isAnimating) self.show();
}

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
class Tab extends BaseComponent {
  /**
   * @param {Element | string} target the target element
   */
  constructor(target) {
    super(target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // event targets
    /** @private @type {Element} */
    self.nav = element.closest('.nav');
    const { nav } = self;
    /** @private @type {Element} */
    self.dropdown = nav && queryElement(`.${dropdownMenuClasses[0]}-toggle`, nav);
    activeTabContent = getActiveTabContent(self);
    self.tabContent = supportTransition && activeTabContent.closest('.tab-content');
    tabContainerHeight = activeTabContent.scrollHeight;

    // set default animation state
    nav.isAnimating = false;

    // add event listener
    toggleTabHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */  
  get name() { return tabComponent; }
  /* eslint-enable */

  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() { // the tab we clicked is now the nextTab tab
    const self = this;
    const { element, nav, dropdown } = self;
    nextTab = element;
    if (!hasClass(nextTab, activeClass)) {
      // this is the actual object, the nextTab tab content to activate
      nextTabContent = queryElement(nextTab.getAttribute('href'));
      activeTab = getActiveTab({ nav });
      activeTabContent = getActiveTabContent({ nav });

      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = nextTab;
      activeTab.dispatchEvent(hideTabEvent);
      if (hideTabEvent.defaultPrevented) return;

      nav.isAnimating = true;
      removeClass(activeTab, activeClass);
      activeTab.setAttribute(ariaSelected, 'false');
      addClass(nextTab, activeClass);
      nextTab.setAttribute(ariaSelected, 'true');

      if (dropdown) {
        if (!hasClass(element.parentNode, dropdownMenuClass)) {
          if (hasClass(dropdown, activeClass)) removeClass(dropdown, activeClass);
        } else if (!hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
      }

      if (hasClass(activeTabContent, fadeClass)) {
        removeClass(activeTabContent, showClass);
        emulateTransitionEnd(activeTabContent, () => triggerTabHide(self));
      } else {
        triggerTabHide(self);
      }
    }
  }

  /** Removes the `Tab` component from the target element. */
  dispose() {
    toggleTabHandler(this);
    super.dispose();
  }
}

Object.assign(Tab, {
  selector: tabSelector,
  init: tabInitCallback,
  getInstance: getTabInstance,
});

/* Native JavaScript for Bootstrap 5 | Toast
-------------------------------------------- */

// TOAST PRIVATE GC
// ================
const toastString = 'toast';
const toastComponent = 'Toast';
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const showingClass = 'showing';
/** @deprecated */
const hideClass = 'hide';

const toastDefaults = {
  animation: true,
  autohide: true,
  delay: 500,
};

/**
 * Static method which returns an existing `Toast` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Toast>}
 */
const getToastInstance = (element) => getInstance(element, toastComponent);

/**
 * A `Toast` initialization callback.
 * @type {BSN.InitCallback<Toast>}
 */
const toastInitCallback = (element) => new Toast(element);

// TOAST CUSTOM EVENTS
// ===================
/** @type {BSN.ToastEvent.show} */
const showToastEvent = bootstrapCustomEvent(`show.bs.${toastString}`);
/** @type {BSN.ToastEvent.shown} */
const hideToastEvent = bootstrapCustomEvent(`hide.bs.${toastString}`);
/** @type {BSN.ToastEvent.hide} */
const shownToastEvent = bootstrapCustomEvent(`shown.bs.${toastString}`);
/** @type {BSN.ToastEvent.hidden} */
const hiddenToastEvent = bootstrapCustomEvent(`hidden.bs.${toastString}`);

// TOAST PRIVATE METHODS
// =====================
/**
 * Executes after the toast is shown to the user.
 * @param {Toast} self the `Toast` instance
 */
function showToastComplete(self) {
  const { element, options } = self;
  removeClass(element, showingClass);

  element.dispatchEvent(shownToastEvent);
  if (options.autohide) self.hide();
}

/**
 * Executes after the toast is hidden to the user.
 * @param {Toast} self the `Toast` instance
 */
function hideToastComplete(self) {
  const { element } = self;
  removeClass(element, showingClass);
  removeClass(element, showClass);
  addClass(element, hideClass); // B/C
  element.dispatchEvent(hiddenToastEvent);
}

/**
 * Executes before hiding the toast.
 * @param {Toast} self the `Toast` instance
 */
function hideToast(self) {
  const { element, options } = self;
  addClass(element, showingClass);

  if (options.animation) {
    reflow(element);
    emulateTransitionEnd(element, () => hideToastComplete(self));
  } else {
    hideToastComplete(self);
  }
}

/**
 * Executes before showing the toast.
 * @param {Toast} self the `Toast` instance
 */
function showToast(self) {
  const { element, options } = self;
  removeClass(element, hideClass); // B/C
  reflow(element);
  addClass(element, showClass);
  addClass(element, showingClass);

  if (options.animation) {
    emulateTransitionEnd(element, () => showToastComplete(self));
  } else {
    showToastComplete(self);
  }
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Toast} self the `Toast` instance
 * @param {boolean | number} add when `true`, it will add the listener
 */
function toggleToastHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  if (self.dismiss) {
    self.dismiss[action]('click', self.hide);
  }
}

// TOAST EVENT HANDLERS
// ====================
/**
 * Executes after the instance has been disposed.
 * @param {Toast} self the `Toast` instance
 */
function completeDisposeToast(self) {
  clearTimeout(self.timer);
  toggleToastHandler(self);
}

// TOAST DEFINITION
// ================
/** Creates a new `Toast` instance. */
class Toast extends BaseComponent {
  /**
   * @param {Element | string} target the target `.toast` element
   * @param {BSN.ToastOptions?} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;
    const { element, options } = self;

    // set fadeClass, the options.animation will override the markup
    if (options.animation && !hasClass(element, fadeClass)) addClass(element, fadeClass);
    else if (!options.animation && hasClass(element, fadeClass)) removeClass(element, fadeClass);
    // dismiss button
    /** @private @type {Element} */
    self.dismiss = queryElement(toastDismissSelector, element);

    // bind
    self.show = self.show.bind(self);
    self.hide = self.hide.bind(self);

    // add event listener
    toggleToastHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */  
  get name() { return toastComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */  
  get defaults() { return toastDefaults; }
  /* eslint-enable */

  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show() {
    const self = this;
    const { element } = self;
    if (element && !hasClass(element, showClass)) {
      element.dispatchEvent(showToastEvent);
      if (showToastEvent.defaultPrevented) return;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => showToast(self), 10);
    }
  }

  /** Hides the toast. */
  hide(noTimer) {
    const self = this;
    const { element, options } = self;

    if (element && hasClass(element, showClass)) {
      element.dispatchEvent(hideToastEvent);
      if (hideToastEvent.defaultPrevented) return;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => hideToast(self),
        noTimer ? 10 : options.delay);
    }
  }

  /** Removes the `Toast` component from the target element. */
  dispose() {
    const self = this;
    const { element } = self;

    if (hasClass(element, showClass)) {
      removeClass(element, showClass);
    }

    completeDisposeToast(self);

    super.dispose();
  }
}

Object.assign(Toast, {
  selector: toastSelector,
  init: toastInitCallback,
  getInstance: getToastInstance,
});

/**
 * Global namespace for `data-bs-title` attribute.
 */
const dataOriginalTitle = 'data-original-title';

/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */

// TOOLTIP PRIVATE GC
// ==================
const tooltipString = 'tooltip';
const tooltipComponent = 'Tooltip';
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = 'title';
const tooltipInnerClass = `${tooltipString}-inner`;
const tooltipDefaults = {
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  title: null, // string
  customClass: null, // string | null
  placement: 'top', // string
  sanitizeFn: null, // function
  animation: true, // bool
  delay: 200, // number
  container: null,
};

/**
 * Static method which returns an existing `Tooltip` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Tooltip>}
 */
const getTooltipInstance = (element) => getInstance(element, tooltipComponent);

/**
 * A `Tooltip` initialization callback.
 * @type {BSN.InitCallback<Tooltip>}
 */
const tooltipInitCallback = (element) => new Tooltip(element);

// TOOLTIP CUSTOM EVENTS
// =====================
/** @type {BSN.TooltipEvent.show} */
const showTooltipEvent = bootstrapCustomEvent(`show.bs.${tooltipString}`);
/** @type {BSN.TooltipEvent.shown} */
const shownTooltipEvent = bootstrapCustomEvent(`shown.bs.${tooltipString}`);
/** @type {BSN.TooltipEvent.hide} */
const hideTooltipEvent = bootstrapCustomEvent(`hide.bs.${tooltipString}`);
/** @type {BSN.TooltipEvent.hidden} */
const hiddenTooltipEvent = bootstrapCustomEvent(`hidden.bs.${tooltipString}`);

// TOOLTIP PRIVATE METHODS
// =======================
/**
 * Creates a new tooltip.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function createTooltip(self) {
  const { options, id } = self;
  const {
    title, template, customClass, animation, placement, sanitizeFn,
  } = options;
  const placementClass = `bs-${tooltipString}-${tipClassPositions[placement]}`;

  if (!title) return;

  // load template
  let tooltipTemplate;
  if (typeof template === 'object') {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = document.createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstChild;
  }

  // create tooltip
  self.tooltip = tooltipTemplate.cloneNode(true);
  const { tooltip } = self;
  // set title
  setHtml(queryElement(`.${tooltipInnerClass}`, tooltip), title, sanitizeFn);
  // set id & role attribute
  tooltip.setAttribute('id', id);
  tooltip.setAttribute('role', tooltipString);
  // set arrow
  self.arrow = queryElement(`.${tooltipString}-arrow`, tooltip);

  // set classes
  if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
  if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
  if (customClass && !hasClass(tooltip, customClass)) {
    addClass(tooltip, customClass);
  }
  if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
}

/**
 * Removes the tooltip from the DOM.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function removeTooltip(self) {
  const { element, tooltip } = self;
  element.removeAttribute(ariaDescribedBy);
  tooltip.remove();
  self.timer = null;
}

/**
 * Executes after the instance has been disposed.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function disposeTooltipComplete(self) {
  const { element } = self;
  toggleTooltipHandlers(self);
  if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
}

/**
 * Toggles on/off the special `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function toggleTooltipAction(self, add) {
  const action = add ? addEventListener : removeEventListener;

  document[action]('touchstart', tooltipTouchHandler, passiveHandler);

  if (!isMedia(self.element)) {
    window[action]('scroll', self.update, passiveHandler);
    window[action]('resize', self.update, passiveHandler);
  }
}

/**
 * Executes after the tooltip was shown to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipShownAction(self) {
  toggleTooltipAction(self, 1);
  self.element.dispatchEvent(shownTooltipEvent);
}

/**
 * Executes after the tooltip was hidden to the user.
 *
 * @param {Tooltip} self the `Tooltip` instance
 */
function tooltipHiddenAction(self) {
  toggleTooltipAction(self);
  removeTooltip(self);
  self.element.dispatchEvent(hiddenTooltipEvent);
}

/**
 * Toggles on/off the `Tooltip` event listeners.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {boolean | number} add when `true`, event listeners are added
 */
function toggleTooltipHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { element } = self;

  if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
  element[action]('mousedown', self.show);
  element[action]('mouseenter', self.show);
  element[action]('mouseleave', self.hide);
}

/**
 * Toggles the `title` and `data-original-title` attributes.
 *
 * @param {Tooltip} self the `Tooltip` instance
 * @param {string} content when `true`, event listeners are added
 */
function toggleTooltipTitle(self, content) {
  // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;

  element.setAttribute(titleAtt[content ? 0 : 1],
    (content || element.getAttribute(titleAtt[0])));
  element.removeAttribute(titleAtt[content ? 1 : 0]);
}

// TOOLTIP EVENT HANDLERS
// ======================
/**
 * Handles the `touchstart` event listener for `Tooltip`
 * @param {Event} e the `Event` object
 */
function tooltipTouchHandler({ target }) {
  const { tooltip, element } = this;
  if (tooltip.contains(target) || target === element || element.contains(target)) ; else {
    this.hide();
  }
}

// TOOLTIP DEFINITION
// ==================
/** Creates a new `Tooltip` instance. */
class Tooltip extends BaseComponent {
  /**
   * @param {Element | string} target the target element
   * @param {BSN.TooltipOptions?} config the instance options
   */
  constructor(target, config) {
    // initialization element
    const element = queryElement(target);
    tooltipDefaults[titleAttr] = element.getAttribute(titleAttr);
    tooltipDefaults.container = getTipContainer(element);
    super(element, config);

    // bind
    const self = this;

    // additional properties
    /** @private @type {Element} */
    self.tooltip = null;
    /** @private @type {Element} */
    self.arrow = null;
    /** @private @type {number} */
    self.timer = null;
    /** @private @type {boolean} */
    self.enabled = false;

    // instance options
    const { options } = self;

    // media elements only work with body as a container
    self.options.container = isMedia(element)
      ? tooltipDefaults.container
      : queryElement(options.container);

    // reset default options
    tooltipDefaults.container = null;
    tooltipDefaults[titleAttr] = null;

    // invalidate
    if (!options.title) return;

    // all functions bind
    tooltipTouchHandler.bind(self);
    self.update = self.update.bind(self);

    // set title attributes and add event listeners
    if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

    // create tooltip here
    self.id = `${tooltipString}-${getUID(element)}`;
    createTooltip(self);

    // set positions
    const { container } = self.options;
    const elementPosition = getComputedStyle(element).position;
    const containerPosition = getComputedStyle(container).position;
    const parentIsBody = container === document.body;
    const containerIsStatic = !parentIsBody && containerPosition === 'static';
    const containerIsRelative = !parentIsBody && containerPosition === 'relative';
    const relContainer = containerIsStatic && closestRelative(container);
    /** @private @type {Record<string, any>} */
    self.positions = {
      elementPosition,
      containerIsRelative,
      containerIsStatic,
      relContainer,
    };

    // attach events
    toggleTooltipHandlers(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return tooltipComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return tooltipDefaults; }
  /* eslint-enable */

  // TOOLTIP PUBLIC METHODS
  // ======================
  /**
   * Shows the tooltip.
   *
   * @param {Event?} e the `Event` object
   */
  show(e) {
    const self = e ? getTooltipInstance(this) : this;
    const {
      options, tooltip, element, id,
    } = self;
    const {
      container, animation,
    } = options;
    clearTimeout(self.timer);
    if (!isVisibleTip(tooltip, container)) {
      element.dispatchEvent(showTooltipEvent);
      if (showTooltipEvent.defaultPrevented) return;

      // append to container
      container.append(tooltip);
      element.setAttribute(ariaDescribedBy, id);

      self.update(e);
      if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
      if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(self));
      else tooltipShownAction(self);
    }
  }

  /**
   * Hides the tooltip.
   *
   * @param {Event?} e the `Event` object
   */
  hide(e) {
    const self = e ? getTooltipInstance(this) : this;
    const { options, tooltip, element } = self;

    clearTimeout(self.timer);
    self.timer = setTimeout(() => {
      if (isVisibleTip(tooltip, options.container)) {
        element.dispatchEvent(hideTooltipEvent);
        if (hideTooltipEvent.defaultPrevented) return;

        removeClass(tooltip, showClass);
        if (options.animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(self));
        else tooltipHiddenAction(self);
      }
    }, options.delay);
  }

  /**
   * Updates the tooltip position.
   *
   * @param {Event?} e the `Event` object
   */
  update(e) {
    styleTip(this, e);
  }

  /**
   * Toggles the tooltip visibility.
   *
   * @param {Event?} e the `Event` object
   */
  toggle(e) {
    const self = e ? getTooltipInstance(this) : this;
    const { tooltip, options } = self;
    if (!isVisibleTip(tooltip, options.container)) self.show();
    else self.hide();
  }

  /** Enables the tooltip. */
  enable() {
    const self = this;
    const { enabled } = self;
    if (!enabled) {
      toggleTooltipHandlers(self, 1);
      self.enabled = !enabled;
    }
  }

  /** Disables the tooltip. */
  disable() {
    const self = this;
    const { tooltip, options, enabled } = self;
    if (enabled) {
      if (!isVisibleTip(tooltip, options.container) && options.animation) {
        self.hide();

        setTimeout(
          () => toggleTooltipHandlers(self),
          getElementTransitionDuration(tooltip) + options.delay + 17,
        );
      } else {
        toggleTooltipHandlers(self);
      }
      self.enabled = !enabled;
    }
  }

  /** Toggles the `disabled` property. */
  toggleEnabled() {
    const self = this;
    if (!self.enabled) self.enable();
    else self.disable();
  }

  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const self = this;
    const { tooltip, options } = self;

    if (options.animation && isVisibleTip(tooltip, options.container)) {
      options.delay = 0; // reset delay
      self.hide();
      emulateTransitionEnd(tooltip, () => disposeTooltipComplete(self));
    } else {
      disposeTooltipComplete(self);
    }
    super.dispose();
  }
}

Object.assign(Tooltip, {
  selector: tooltipSelector,
  init: tooltipInitCallback,
  getInstance: getTooltipInstance,
});

const componentsList = {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
};

const componentsKeys = Object.keys(componentsList);

/**
 * Initialize all matched `Element`s for one component.
 * @param {function} callback the component callback
 * @param {HTMLCollection | NodeList} collection the matched collection
 */
function initComponentDataAPI(callback, collection) {
  Array.from(collection).forEach((x) => callback(x));
}

/**
 * Remove one component from a target container element or all in the page.
 * @param {string} component the component name
 * @param {Element | Document} context parent `Element`
 */
function removeComponentDataAPI(component, context) {
  Array.from(Data.getAllFor(component)).forEach((x) => {
    const [element, instance] = x;
    if (context.contains(element)) instance.dispose();
  });
}

/**
 * Initialize all BSN components for a target container.
 * @param {Element=} context parent `Element`
 */
function initCallback(context) {
  const lookUp = context instanceof Element ? context : document;

  componentsKeys.forEach((comp) => {
    const { init, selector } = componentsList[comp];
    initComponentDataAPI(init, lookUp.querySelectorAll(selector));
  });
}

/**
 * Remove all BSN components for a target container.
 * @param {Element=} context parent `Element`
 */
function removeDataAPI(context) {
  const lookUp = context instanceof Element ? context : document;

  componentsKeys.forEach((comp) => {
    removeComponentDataAPI(comp, lookUp);
  });
}

// bulk initialize all components
if (document.body) initCallback();
else {
  document.addEventListener('DOMContentLoaded', () => initCallback(), { once: true });
}

const BSN = {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,

  initCallback,
  removeDataAPI,
  Version,
};

export { BSN as default };
