/*!
  * Native JavaScript for Bootstrap Collapse v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Collapse = factory());
})(this, (function () { 'use strict';

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
   * A global namespace for aria-expanded.
   * @type {string}
   */
  const ariaExpanded = 'aria-expanded';

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
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for most components `collapsing` class.
   * As used by `Collapse` / `Tab`.
   */
  const collapsingClass = 'collapsing';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

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
    /**
     * A `Collapse` initialization callback.
     * @type {BSN.InitCallback<Collapse>}
     */
    callback: (element) => new Collapse(element),
    getInstance: getCollapseInstance,
  });

  return Collapse;

}));
