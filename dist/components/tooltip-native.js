/*!
  * Native JavaScript for Bootstrap Tooltip v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tooltip = factory());
})(this, (function () { 'use strict';

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

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for `data-bs-title` attribute.
   */
  const dataOriginalTitle = 'data-original-title';

  /**
   * Global namespace for most components `fade` class.
   */
  const fadeClass = 'fade';

  /**
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

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

  function isVisibleTip(tip, container) {
    return container.contains(tip);
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
  const showTooltipEvent = bootstrapCustomEvent(`show.bs.${tooltipString}`);
  const shownTooltipEvent = bootstrapCustomEvent(`shown.bs.${tooltipString}`);
  const hideTooltipEvent = bootstrapCustomEvent(`hide.bs.${tooltipString}`);
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
    // @ts-ignore
    self.tooltip = tooltipTemplate.cloneNode(true);
    // @ts-ignore
    const { tooltip } = self;
    // set title
    // @ts-ignore
    setHtml(queryElement(`.${tooltipInnerClass}`, tooltip), title, sanitizeFn);
    // set id & role attribute
    // @ts-ignore
    tooltip.setAttribute('id', id);
    // @ts-ignore
    tooltip.setAttribute('role', tooltipString);
    // set arrow
    // @ts-ignore
    self.arrow = queryElement(`.${tooltipString}-arrow`, tooltip);

    // set classes
    // @ts-ignore
    if (!hasClass(tooltip, tooltipString)) addClass(tooltip, tooltipString);
    // @ts-ignore
    if (animation && !hasClass(tooltip, fadeClass)) addClass(tooltip, fadeClass);
    // @ts-ignore
    if (customClass && !hasClass(tooltip, customClass)) {
      // @ts-ignore
      addClass(tooltip, customClass);
    }
    // @ts-ignore
    if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
  }

  /**
   * Removes the tooltip from the DOM.
   *
   * @param {Tooltip} self the `Tooltip` instance
   */
  function removeTooltip(self) {
    // @ts-ignore
    const { element, tooltip } = self;
    element.removeAttribute(ariaDescribedBy);
    // @ts-ignore
    tooltip.remove();
    // @ts-ignore
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
    // @ts-ignore
    if (element.hasAttribute(dataOriginalTitle)) toggleTooltipTitle(self);
  }

  /**
   * Toggles on/off the special `Tooltip` event listeners.
   *
   * @param {Tooltip} self the `Tooltip` instance
   * @param {boolean=} add when `true`, event listeners are added
   */
  function toggleTooltipAction(self, add) {
    const action = add ? addEventListener : removeEventListener;

    // @ts-ignore
    document[action]('touchstart', tooltipTouchHandler, passiveHandler);

    if (!isMedia(self.element)) {
      // @ts-ignore
      window[action]('scroll', self.update, passiveHandler);
      // @ts-ignore
      window[action]('resize', self.update, passiveHandler);
    }
  }

  /**
   * Executes after the tooltip was shown to the user.
   *
   * @param {Tooltip} self the `Tooltip` instance
   */
  function tooltipShownAction(self) {
    toggleTooltipAction(self, true);
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
   * @param {boolean=} add when `true`, event listeners are added
   */
  function toggleTooltipHandlers(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { element } = self;

    // @ts-ignore
    if (isMedia(element)) element[action]('mousemove', self.update, passiveHandler);
    // @ts-ignore
    element[action]('mousedown', self.show);
    // @ts-ignore
    element[action]('mouseenter', self.show);
    // @ts-ignore
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
      // @ts-ignore
      (content || element.getAttribute(titleAtt[0])));
    element.removeAttribute(titleAtt[content ? 1 : 0]);
  }

  // TOOLTIP EVENT HANDLERS
  // ======================
  /**
   * Handles the `touchstart` event listener for `Tooltip`
   * @this {Tooltip}
   * @param {{target: Element}} e the `Event` object
   */
  function tooltipTouchHandler({ target }) {
    // @ts-ignore
    const { tooltip, element } = this;
    // @ts-ignore
    if (tooltip.contains(target) || target === element || element.contains(target)) ; else {
      // @ts-ignore
      this.hide();
    }
  }

  // TOOLTIP DEFINITION
  // ==================
  /** Creates a new `Tooltip` instance. */
  class Tooltip extends BaseComponent {
    /**
     * @param {Element | string} target the target element
     * @param {BSN.Options.Tooltip=} config the instance options
     */
    constructor(target, config) {
      // initialization element
      const element = queryElement(target);
      // @ts-ignore
      tooltipDefaults[titleAttr] = element.getAttribute(titleAttr);
      // @ts-ignore
      tooltipDefaults.container = getTipContainer(element);
      super(target, config);

      // bind
      const self = this;

      // additional properties
      /** @private @type {Element?} */
      self.tooltip = null;
      /** @private @type {Element?} */
      self.arrow = null;
      /** @private @type {number?} */
      self.timer = null;
      /** @private @type {boolean} */
      self.enabled = true;

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
      // @ts-ignore
      if (element.hasAttribute(titleAttr)) toggleTooltipTitle(self, options.title);

      // create tooltip here
      // @ts-ignore
      self.id = `${tooltipString}-${getUID(element)}`;
      createTooltip(self);

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

      // attach events
      toggleTooltipHandlers(self, true);
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
      // @ts-ignore
      const self = e ? getTooltipInstance(this) : this;
      const {
        options, tooltip, element, id,
      } = self;
      const {
        container, animation,
      } = options;
      // @ts-ignore
      clearTimeout(self.timer);
      if (!isVisibleTip(tooltip, container)) {
        element.dispatchEvent(showTooltipEvent);
        if (showTooltipEvent.defaultPrevented) return;

        // append to container
        container.append(tooltip);
        element.setAttribute(ariaDescribedBy, id);

        self.update(e);
        // @ts-ignore
        if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
        // @ts-ignore
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
      // @ts-ignore
      const self = e ? getTooltipInstance(this) : this;
      const { options, tooltip, element } = self;

      // @ts-ignore
      clearTimeout(self.timer);
      // @ts-ignore
      self.timer = setTimeout(() => {
        if (isVisibleTip(tooltip, options.container)) {
          element.dispatchEvent(hideTooltipEvent);
          if (hideTooltipEvent.defaultPrevented) return;

          // @ts-ignore
          removeClass(tooltip, showClass);
          // @ts-ignore
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
      // @ts-ignore
      styleTip(this, e);
    }

    /**
     * Toggles the tooltip visibility.
     *
     * @param {Event?} e the `Event` object
     */
    toggle(e) {
      // @ts-ignore
      const self = e ? getTooltipInstance(this) : this;
      const { tooltip, options } = self;
      // @ts-ignore
      if (!isVisibleTip(tooltip, options.container)) self.show();
      // @ts-ignore
      else self.hide();
    }

    /** Enables the tooltip. */
    enable() {
      const self = this;
      const { enabled } = self;
      if (!enabled) {
        toggleTooltipHandlers(self, true);
        self.enabled = !enabled;
      }
    }

    /** Disables the tooltip. */
    disable() {
      const self = this;
      const { tooltip, options, enabled } = self;
      if (enabled) {
        if (!isVisibleTip(tooltip, options.container) && options.animation) {
          // @ts-ignore
          self.hide();

          setTimeout(
            () => toggleTooltipHandlers(self),
            // @ts-ignore
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
        // @ts-ignore
        self.hide();
        // @ts-ignore
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

  return Tooltip;

}));
