/*!
  * Native JavaScript for Bootstrap Alert v4.1.0 (https://thednp.github.io/bootstrap.native/)
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
 * Checks if an element is an `Element`.
 *
 * @param {any} element the target element
 * @returns {boolean} the query result
 */
function isElement(element) {
  return element instanceof Element;
}

/**
 * Utility to check if target is typeof Element
 * or find one that matches a selector.
 *
 * @param {Element | string} selector the input selector or target element
 * @param {Element=} parent optional Element to look into
 * @return {Element?} the Element or `querySelector` result
 */
function queryElement(selector, parent) {
  const lookUp = parent && isElement(parent) ? parent : document;
  // @ts-ignore
  return isElement(selector) ? selector : lookUp.querySelector(selector);
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
   * @param {Element | string} element target element
   * @param {string} component the component's name or a unique key
   * @param {any} instance the component instance
   */
  set: (element, component, instance) => {
    const ELEMENT = queryElement(element);
    if (!isElement(ELEMENT)) return;

    if (!componentData.has(component)) {
      componentData.set(component, new Map());
    }

    const instanceMap = componentData.get(component);
    instanceMap.set(ELEMENT, instance);
  },

  /**
   * Returns all instances for specified component.
   * @param {string} component the component's name or a unique key
   * @returns {any?} all the component instances
   */
  getAllFor: (component) => {
    if (componentData.has(component)) {
      return componentData.get(component);
    }
    return null;
  },

  /**
   * Returns the instance associated with the target.
   * @param {Element | string} element target element
   * @param {string} component the component's name or a unique key
   * @returns {any?} the instance
   */
  get: (element, component) => {
    const ELEMENT = queryElement(element);

    const allForC = Data.getAllFor(component);
    if (allForC && isElement(ELEMENT) && allForC.has(ELEMENT)) {
      return allForC.get(ELEMENT);
    }
    return null;
  },

  /**
   * Removes web components data.
   * @param {Element} element target element
   * @param {string} component the component's name or a unique key
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
 * An alias for `Data.get()`.
 * @param {Element | string} element target element
 * @param {string} component the component's name or a unique key
 * @returns {any} the request result
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

/** Returns an original event for Bootstrap Native components. */
class OriginalEvent extends CustomEvent {
  /**
   * @param {string} EventType event.type
   * @param {Record<string, any>=} config Event.options | Event.properties
   */
  constructor(EventType, config) {
    super(EventType, config);
    /** @type {EventTarget?} */
    this.relatedTarget = null;
  }
}

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} EventType Event.type
 * @param {Record<string, any>=} config Event.options | Event.properties
 * @returns {OriginalEvent} a new namespaced event
 */
function bootstrapCustomEvent(EventType, config) {
  const OriginalCustomEvent = new OriginalEvent(EventType, { cancelable: true, bubbles: true });

  if (config instanceof Object) {
    Object.assign(OriginalCustomEvent, config);
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
   * @param {BSN.ComponentOptions=} config component instance options
   */
  constructor(target, config) {
    const self = this;
    const element = queryElement(target);

    if (!isElement(element)) {
      throw TypeError(`${self.name} Error: "${target}" not a valid selector.`);
    }

    /** @type {BSN.ComponentOptions} */
    self.options = {};

    // @ts-ignore
    const prevInstance = Data.get(element, self.name);
    if (prevInstance) prevInstance.dispose();

    /** @type {Element} */
    // @ts-ignore
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
      /** @static @type {Record<string, any>} */
      // @ts-ignore
      self.options = normalizeOptions(element, self.defaults, (config || {}), 'bs');
    }

    // @ts-ignore
    Data.set(element, self.name, self);
  }

  /* eslint-disable */
  /** @static */
  get version() { return Version; }
  /* eslint-enable */

  /** @static */
  get name() { return this.constructor.name; }

  /** @static */
  // @ts-ignore
  get defaults() { return this.constructor.defaults; }

  /**
   * Removes component from target element;
   */
  dispose() {
    const self = this;
    // @ts-ignore
    Data.remove(self.element, self.name);
    // @ts-ignore
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
const closeAlertEvent = bootstrapCustomEvent(`close.bs.${alertString}`);
const closedAlertEvent = bootstrapCustomEvent(`closed.bs.${alertString}`);

// ALERT EVENT HANDLER
// ===================
/**
 * Alert `transitionend` callback.
 * @param {Alert} self target Alert instance
 */
function alertTransitionEnd(self) {
  const { element } = self;
  toggleAlertHandler(self);

  element.dispatchEvent(closedAlertEvent);

  self.dispose();
  element.remove();
}

// ALERT PRIVATE METHOD
// ====================
/**
 * Toggle on / off the `click` event listener.
 * @param {Alert} self the target alert instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleAlertHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  if (isElement(self.dismiss)) self.dismiss[action]('click', self.close);
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
    /** @static @type {Element?} */
    // @ts-ignore
    self.dismiss = queryElement(alertDismissSelector, element);
    /** @static @type {Element?} */
    self.relatedTarget = null;

    // add event listener
    toggleAlertHandler(self, true);
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
    // @ts-ignore
    const self = e ? getAlertInstance(target.closest(alertSelector)) : this;
    const { element } = self;

    if (self && element && hasClass(element, showClass)) {
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

export { Alert as default };
