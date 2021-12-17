/*!
  * Native JavaScript for Bootstrap ScrollSpy v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory());
})(this, (function () { 'use strict';

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
  const activateScrollSpy = bootstrapCustomEvent(`activate.bs.${scrollspyString}`);

  // SCROLLSPY PRIVATE METHODS
  // =========================
  /**
   * Update the state of all items.
   * @param {ScrollSpy} self the `ScrollSpy` instance
   */
  function updateSpyTargets(self) {
    const {
      // @ts-ignore
      target, scrollTarget, isWindow, options, itemsLength, scrollHeight,
    } = self;
    const { offset } = options;
    // @ts-ignore
    const links = target.getElementsByTagName('A');

    // @ts-ignore
    self.scrollTop = isWindow ? scrollTarget.pageYOffset : scrollTarget.scrollTop;

    // only update items/offsets once or with each mutation

    if (itemsLength !== links.length || getScrollHeight(scrollTarget) !== scrollHeight) {
      let href;
      let targetItem;
      let rect;

      // reset arrays & update
      // @ts-ignore
      self.items = [];
      // @ts-ignore
      self.offsets = [];
      // @ts-ignore
      self.scrollHeight = getScrollHeight(scrollTarget);
      // @ts-ignore
      self.maxScroll = self.scrollHeight - getOffsetHeight(self);

      Array.from(links).forEach((link) => {
        href = link.getAttribute('href');
        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

        if (targetItem) {
          // @ts-ignore
          self.items.push(link);
          rect = targetItem.getBoundingClientRect();
          // @ts-ignore
          self.offsets.push((isWindow ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
        }
      });
      // @ts-ignore
      self.itemsLength = self.items.length;
    }
  }

  /**
   * Returns the `scrollHeight` property of the scrolling element.
   * @param {Element | Window} scrollTarget the `ScrollSpy` instance
   * @return {number} `scrollTarget` height
   */
  function getScrollHeight(scrollTarget) {
    // @ts-ignore
    return scrollTarget.scrollHeight || Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
  }

  /**
   * Returns the height property of the scrolling element.
   * @param {{element: Element, isWindow: boolean}} params the `ScrollSpy` instance
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
    // @ts-ignore
    const { target, element } = self;
    // @ts-ignore
    clear(target);
    // @ts-ignore
    self.activeItem = item;
    addClass(item, activeClass);

    // activate all parents
    const parents = [];
    let parentItem = item;
    while (parentItem !== document.body) {
      // @ts-ignore
      parentItem = parentItem.parentNode;
      if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
    }

    parents.forEach((menuItem) => {
      const parentLink = menuItem.previousElementSibling;

      if (parentLink && !hasClass(parentLink, activeClass)) {
        addClass(parentLink, activeClass);
      }
    });

    // dispatch
    element.dispatchEvent(activateScrollSpy);
  }

  /**
   * Toggles on/off the component event listener.
   * @param {ScrollSpy} self the `ScrollSpy` instance
   * @param {boolean=} add when `true`, listener is added
   */
  function toggleSpyHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    // @ts-ignore
    self.scrollTarget[action]('scroll', self.refresh, passiveHandler);
  }

  // SCROLLSPY DEFINITION
  // ====================
  /** Returns a new `ScrollSpy` instance. */
  class ScrollSpy extends BaseComponent {
    /**
     * @param {Element | string} target the target element
     * @param {BSN.Options.ScrollSpy=} config the instance options
     */
    constructor(target, config) {
      super(target, config);
      // bind
      const self = this;

      // initialization element & options
      const { element, options } = self;

      // additional properties
      /** @private @type {Element?} */
      self.target = queryElement(options.target);

      // invalidate
      if (!self.target) return;

      // set initial state
      /** @private @type {Element | Window} */
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
      /** @private @type {number} */
      self.itemsLength = 0;
      /** @private @type {number[]} */
      self.offsets = [];

      // bind events
      self.refresh = self.refresh.bind(self);

      // add event handlers
      toggleSpyHandlers(self, true);

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
      // @ts-ignore
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
        // @ts-ignore
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
      super.dispose();
    }
  }

  Object.assign(ScrollSpy, {
    selector: scrollspySelector,
    init: scrollspyInitCallback,
    getInstance: getScrollSpyInstance,
  });

  return ScrollSpy;

}));
