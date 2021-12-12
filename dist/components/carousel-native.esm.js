/*!
  * Native JavaScript for Bootstrap Carousel v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
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
 * A global namespace for CSS3 transition support.
 * @type {boolean}
 */
const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

/**
 * A global namespace for 'transitionDuration' string.
 * @type {string}
 */
const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

/**
 * A global namespace for 'transitionProperty' string.
 * @type {string}
 */
const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

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
 * A global namespace for 'transitionend' string.
 * @type {string}
 */
const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

/**
 * A global namespace for 'transitionDelay' string.
 * @type {string}
 */
const transitionDelay = 'webkitTransition' in document.head.style ? 'webkitTransitionDelay' : 'transitionDelay';

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
 * Add class to Element.classList
 *
 * @param {Element} element target
 * @param {string} classNAME to add
 */
function addClass(element, classNAME) {
  element.classList.add(classNAME);
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
 * Global namespace for most components active class.
 */
const activeClass = 'active';

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
 * Returns a new `Carousel` instance.
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
  /**
   * A `Carousel` initialization callback.
   * @type {BSN.InitCallback<Carousel>}
   */
  callback: (element) => new Carousel(element),
  getInstance: getCarouselInstance,
});

export { Carousel as default };
