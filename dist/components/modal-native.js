/*!
  * Native JavaScript for Bootstrap Modal v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Modal = factory());
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
   * A global namespace for aria-hidden.
   * @type {string}
   */
  const ariaHidden = 'aria-hidden';

  /**
   * A global namespace for aria-modal.
   * @type {string}
   */
  const ariaModal = 'aria-modal';

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
   * Global namespace for most components `dismiss` option.
   */
  const dataBsDismiss = 'data-bs-dismiss';

  /**
   * Global namespace for most components `fade` class.
   */
  const fadeClass = 'fade';

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

  return Modal;

}));
