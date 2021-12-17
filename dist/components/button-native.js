/*!
  * Native JavaScript for Bootstrap Button v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Button = factory());
})(this, (function () { 'use strict';

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
   * A global namespace for aria-pressed.
   * @type {string}
   */
  const ariaPressed = 'aria-pressed';

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
   * Global namespace for most components active class.
   */
  const activeClass = 'active';

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

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
  /**
   * Toggles on/off the `click` event listener.
   * @param {Button} self the `Button` instance
   * @param {boolean=} add when `true`, event listener is added
   */
  function toggleButtonHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    // @ts-ignore
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
      element.setAttribute(ariaPressed, `${!!self.isActive}`);

      // add event listener
      toggleButtonHandler(self, true);
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
      // @ts-ignore
      const self = e ? getButtonInstance(this) : this;
      const { element } = self;

      if (hasClass(element, 'disabled')) return;
      self.isActive = hasClass(element, activeClass);
      const { isActive } = self;

      const action = isActive ? removeClass : addClass;

      action(element, activeClass);
      element.setAttribute(ariaPressed, isActive ? 'false' : 'true');
    }

    /** Removes the `Button` component from the target element. */
    dispose() {
      toggleButtonHandler(this);
      super.dispose();
    }
  }

  Object.assign(Button, {
    selector: buttonSelector,
    init: buttonInitCallback,
    getInstance: getButtonInstance,
  });

  return Button;

}));
