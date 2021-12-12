/*!
  * Native JavaScript for Bootstrap Offcanvas v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Offcanvas = factory());
})(this, (function () { 'use strict';

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
   * Add class to Element.classList
   *
   * @param {Element} element target
   * @param {string} classNAME to add
   */
  function addClass(element, classNAME) {
    element.classList.add(classNAME);
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
   * Global namespace for most components `dismiss` option.
   */
  const dataBsDismiss = 'data-bs-dismiss';

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

  /**
   * Points the focus to a specific element.
   * @param {Element} element target
   */
  function setFocus(element) {
    element.focus();
  }

  function isVisible(element) {
    return getComputedStyle(element).visibility !== 'hidden'
      && element.offsetParent !== null;
  }

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
   * Global namespace for most components `fade` class.
   */
  const fadeClass = 'fade';

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

  /**
   * Static method which returns an existing `Offcanvas` instance associated
   * to a target `Element`.
   *
   * @type {BSN.GetInstance<Offcanvas>}
   */
  const getOffcanvasInstance = (element) => getInstance(element, offcanvasComponent);

  const offcanvasDefaults = {
    backdrop: true, // boolean
    keyboard: true, // boolean
    scroll: false, // boolean
  };

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
    /**
     * An `Offcanvas` initialization callback.
     * @type {BSN.InitCallback<Offcanvas>}
     */
    callback: (element) => new Offcanvas(element),
    getInstance: getOffcanvasInstance,
  });

  return Offcanvas;

}));
