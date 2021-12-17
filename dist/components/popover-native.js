/*!
  * Native JavaScript for Bootstrap Popover v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Popover = factory());
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

  /**
   * A global namespace for aria-describedby.
   * @type {string}
   */
  const ariaDescribedBy = 'aria-describedby';

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
   * Checks if an element is an `<svg>`, `<img>` or `<video>`.
   * *Tooltip* / *Popover* works different with media elements.
   * @param {Element} element the target element
   * @returns {boolean} the query result
   */
  function isMedia(element) {
    return [SVGElement, HTMLImageElement, HTMLVideoElement]
      .some((mediaType) => element instanceof mediaType);
  }

  // @ts-ignore
  const { userAgentData } = navigator;
  const appleBrands = /(iPhone|iPod|iPad)/;

  /**
   * A global namespace for Apple browsers.
   * @type {boolean}
   */
  const isApple = !userAgentData ? appleBrands.test(navigator.userAgent)
    : userAgentData.brands.some((x) => appleBrands.test(x.brand));

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

  /**
   * Global namespace for most components `fade` class.
   */
  const fadeClass = 'fade';

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

  /** @type {Record<string, string>} */
  var tipClassPositions = {
    top: 'top', bottom: 'bottom', left: 'start', right: 'end',
  };

  function isVisibleTip(tip, container) {
    return container.contains(tip);
  }

  /**
   * Style popovers and tooltips.
   * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
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
    // @ts-ignore
    const isPopover = !!self.popover;
    let tipDimensions = { w: tip.offsetWidth, h: tip.offsetHeight };
    const windowWidth = (document.documentElement.clientWidth || document.body.clientWidth);
    const windowHeight = (document.documentElement.clientHeight || document.body.clientHeight);
    const {
      // @ts-ignore
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
    // @ts-ignore
    const elemDimensions = { w: element.offsetWidth, h: element.offsetHeight };
    // @ts-ignore
    const top = containerIsRelative ? element.offsetTop : targetRect.top;
    // @ts-ignore
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
          // @ts-ignore
          ? e.pageX : e.layerX + (absoluteTarget ? element.offsetLeft : 0);
        const eY = !containerIsRelative
          // @ts-ignore
          ? e.pageY : e.layerY + (absoluteTarget ? element.offsetTop : 0);

        if (placement === 'top') {
          topPosition = eY - tipDimensions.h - (isPopover ? arrowWidth : arrowHeight);
        } else {
          topPosition = eY + arrowHeight;
        }

        // adjust left | right and also the arrow
        // @ts-ignore
        if (e.clientX - tipDimensions.w / 2 < leftBoundry) { // when exceeds left
          leftPosition = 0;
          arrowLeft = eX - arrowAdjust;
        // @ts-ignore
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

  /**
   * Points the focus to a specific element.
   * @param {Element} element target
   */
  function setFocus(element) {
    element.focus();
  }

  let bsnUID = 1;

  /**
   * Returns a unique identifier for popover, tooltip, scrollspy.
   *
   * @param {Element} element target element
   * @param {string} key predefined key
   * @returns {number} an existing or new unique key
   */
  function getUID(element, key) {
    bsnUID += 1;
    // @ts-ignore
    return element[key] || bsnUID;
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
      // @ts-ignore
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

    if (isElement(content)) {
      element.append(content);
    } else {
      // @ts-ignore
      let dirty = content.trim(); // fixing #233

      if (typeof sanitizeFn === 'function') dirty = sanitizeFn(dirty);

      const domParser = new DOMParser();
      const tempDocument = domParser.parseFromString(dirty, 'text/html');
      const { body } = tempDocument;
      const method = body.children.length ? 'innerHTML' : 'innerText';
      // @ts-ignore
      element[method] = body[method];
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

  /* Native JavaScript for Bootstrap 5 | Popover
  ---------------------------------------------- */

  // POPOVER PRIVATE GC
  // ==================
  const popoverString = 'popover';
  const popoverComponent = 'Popover';
  const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
  const popoverHeaderClass = `${popoverString}-header`;
  const popoverBodyClass = `${popoverString}-body`;

  // POPOVER CUSTOM EVENTS
  // =====================
  const showPopoverEvent = bootstrapCustomEvent(`show.bs.${popoverString}`);
  const shownPopoverEvent = bootstrapCustomEvent(`shown.bs.${popoverString}`);
  const hidePopoverEvent = bootstrapCustomEvent(`hide.bs.${popoverString}`);
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
   * @this {Popover}
   * @param {{target: Element}} e the `Event` object
   */
  function popoverTouchHandler({ target }) {
    const self = this;
    // @ts-ignore
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
    // @ts-ignore
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
    // @ts-ignore
    self.popover = popoverTemplate.cloneNode(true);

    // @ts-ignore
    const { popover } = self;

    // set id and role attributes
    // @ts-ignore
    popover.setAttribute('id', id);
    // @ts-ignore
    popover.setAttribute('role', 'tooltip');

    // @ts-ignore
    const popoverHeader = queryElement(`.${popoverHeaderClass}`, popover);
    // @ts-ignore
    const popoverBody = queryElement(`.${popoverBodyClass}`, popover);

    // set arrow and enable access for styleTip
    // @ts-ignore
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
    // @ts-ignore
    [self.btn] = popover.getElementsByClassName('btn-close');

    // set popover animation and placement
    // @ts-ignore
    if (!hasClass(popover, popoverString)) addClass(popover, popoverString);
    // @ts-ignore
    if (animation && !hasClass(popover, fadeClass)) addClass(popover, fadeClass);
    // @ts-ignore
    if (customClass && !hasClass(popover, customClass)) {
      // @ts-ignore
      addClass(popover, customClass);
    }
    // @ts-ignore
    if (!hasClass(popover, placementClass)) addClass(popover, placementClass);
  }

  /**
   * Removes the popover from the DOM.
   *
   * @param {Popover} self the `Popover` instance
   */
  function removePopover(self) {
    // @ts-ignore
    const { element, popover } = self;
    element.removeAttribute(ariaDescribedBy);
    // @ts-ignore
    popover.remove();
    // @ts-ignore
    self.timer = null;
  }

  /**
   * Toggles on/off the `Popover` event listeners.
   *
   * @param {Popover} self the `Popover` instance
   * @param {boolean=} add when `true`, event listeners are added
   */
  function togglePopoverHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { element, options } = self;
    const { trigger, dismissible } = options;
    // @ts-ignore
    self.enabled = !!add;

    if (trigger === 'hover') {
      // @ts-ignore
      element[action]('mousedown', self.show);
      // @ts-ignore
      element[action]('mouseenter', self.show);
      // @ts-ignore
      if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
      // @ts-ignore
      if (!dismissible) element[action]('mouseleave', self.hide);
    } else if (trigger === 'click') {
      // @ts-ignore
      element[action](trigger, self.toggle);
    } else if (trigger === 'focus') {
      // @ts-ignore
      if (isApple) element[action]('click', () => setFocus(element));
      // @ts-ignore
      element[action]('focusin', self.show);
    }
  }

  /**
   * Toggles on/off the `Popover` event listeners that close popover.
   *
   * @param {Popover} self the `Popover` instance
   * @param {boolean=} add when `true`, event listeners are added
   */
  function dismissHandlerToggle(self, add) {
    const action = add ? addEventListener : removeEventListener;
    // @ts-ignore
    const { options, element, btn } = self;
    const { trigger, dismissible } = options;

    if (dismissible) {
      // @ts-ignore
      if (btn) btn[action]('click', self.hide);
    } else {
      // @ts-ignore
      if (trigger === 'focus') element[action]('focusout', self.hide);
      // @ts-ignore
      if (trigger === 'hover') document[action]('touchstart', popoverTouchHandler, passiveHandler);
    }

    if (!isMedia(element)) {
      // @ts-ignore
      window[action]('scroll', self.update, passiveHandler);
      // @ts-ignore
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
     * @param {BSN.Options.Popover=} config instance options
     */
    constructor(target, config) {
      const element = queryElement(target);
      // @ts-ignore
      popoverDefaults.container = getTipContainer(element);
      super(target, config);

      // bind
      const self = this;

      // additional instance properties
      /** @private @type {any?} */
      self.timer = null;
      /** @private @type {Element?} */
      self.popover = null;
      /** @private @type {Element?} */
      self.arrow = null;
      /** @private @type {Element?} */
      self.btn = null;
      /** @private @type {boolean} */
      self.enabled = true;
      // set unique ID for aria-describedby
      /** @private @type {string} */
      // @ts-ignore
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
      // @ts-ignore
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
      popoverTouchHandler.bind(self);
      self.update = self.update.bind(self);

      // attach event listeners
      togglePopoverHandlers(self, true);
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
     * @param {Event=} e the `Event` object
     */
    update(e) {
      // @ts-ignore
      styleTip(this, e);
    }

    // POPOVER PUBLIC METHODS
    // ======================
    /**
     * Toggles visibility of the popover.
     *
     * @param {Event=} e the `Event` object
     */
    toggle(e) {
      // @ts-ignore
      const self = e ? getPopoverInstance(this) : this;
      const { popover, options } = self;
      // @ts-ignore
      if (!isVisibleTip(popover, options.container)) self.show();
      else self.hide();
    }

    /**
     * Shows the popover.
     *
     * @param {Event=} e the `Event` object
     */
    show(e) {
      // @ts-ignore
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
        // @ts-ignore
        if (!hasClass(popover, showClass)) addClass(popover, showClass);
        dismissHandlerToggle(self, true);

        // @ts-ignore
        if (options.animation) emulateTransitionEnd(popover, () => popoverShowComplete(self));
        else popoverShowComplete(self);
      }
    }

    /**
     * Hides the popover.
     *
     * @this {Element | Popover}
     * @param {Event=} e the `Event` object
     */
    hide(e) {
      /** @type {Popover} */
      let self;
      if (e) {
        // @ts-ignore
        self = getPopoverInstance(this);
        if (!self) { // dismissible popover
          // @ts-ignore
          const dPopover = this.closest(`.${popoverString}`);
          const dEl = dPopover && queryElement(`[${ariaDescribedBy}="${dPopover.id}"]`);
          self = getPopoverInstance(dEl);
        }
      } else {
        // @ts-ignore
        self = this;
      }
      const { element, popover, options } = self;

      clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        if (isVisibleTip(popover, options.container)) {
          element.dispatchEvent(hidePopoverEvent);
          if (hidePopoverEvent.defaultPrevented) return;

          // @ts-ignore
          removeClass(popover, showClass);
          dismissHandlerToggle(self);

          // @ts-ignore
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
        togglePopoverHandlers(self, true);
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
            // @ts-ignore
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
        // @ts-ignore
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

  return Popover;

}));
