/*!
  * Native JavaScript for Bootstrap - Popover v4.1.0alpha1 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2022 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * Shortcut for `HTMLElement.setAttribute()` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `HTMLElement.removeAttribute()` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 */
const removeAttribute = (element, attribute) => element.removeAttribute(attribute);

/**
 * Returns the `document` or the `#document` element.
 * @see https://github.com/floating-ui/floating-ui
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {Document}
 */
function getDocument(node) {
  if (node instanceof HTMLElement) return node.ownerDocument;
  if (node instanceof Window) return node.document;
  return window.document;
}

/**
 * Returns the `document.body` or the `<body>` element.
 *
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {HTMLElement | HTMLBodyElement}
 */
function getDocumentBody(node) {
  return getDocument(node).body;
}

/**
 * A global namespace for most scroll event listeners.
 * @type {Partial<AddEventListenerOptions>}
 */
const passiveHandler = { passive: true };

/**
 * Shortcut for the `Element.dispatchEvent(Event)` method.
 *
 * @param {HTMLElement | Element} element is the target
 * @param {Event} event is the `Event` object
 */
const dispatchEvent = (element, event) => element.dispatchEvent(event);

/**
 * A global namespace for 'transitionend' string.
 * @type {string}
 */
const transitionEndEvent = 'transitionend';

/**
 * A global namespace for 'transitionDelay' string.
 * @type {string}
 */
const transitionDelay = 'transitionDelay';

/**
 * A global namespace for:
 * * `transitionProperty` string for Firefox,
 * * `transition` property for all other browsers.
 *
 * @type {string}
 */
const transitionProperty = 'transitionProperty';

/**
 * Shortcut for `window.getComputedStyle(element).propertyName`
 * static method.
 *
 * * If `element` parameter is not an `HTMLElement`, `getComputedStyle`
 * throws a `ReferenceError`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} property the css property
 * @return {string} the css property value
 */
function getElementStyle(element, property) {
  const computedStyle = getComputedStyle(element);

  // @ts-ignore -- must use camelcase strings,
  // or non-camelcase strings with `getPropertyValue`
  return property in computedStyle ? computedStyle[property] : '';
}

/**
 * Utility to get the computed `transitionDelay`
 * from Element in miliseconds.
 *
 * @param {HTMLElement | Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDelay(element) {
  const propertyValue = getElementStyle(element, transitionProperty);
  const delayValue = getElementStyle(element, transitionDelay);

  const delayScale = delayValue.includes('ms') ? 1 : 1000;
  const duration = propertyValue && propertyValue !== 'none'
    ? parseFloat(delayValue) * delayScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * A global namespace for 'transitionDuration' string.
 * @type {string}
 */
const transitionDuration = 'transitionDuration';

/**
 * Utility to get the computed `transitionDuration`
 * from Element in miliseconds.
 *
 * @param {HTMLElement | Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDuration(element) {
  const propertyValue = getElementStyle(element, transitionProperty);
  const durationValue = getElementStyle(element, transitionDuration);
  const durationScale = durationValue.includes('ms') ? 1 : 1000;
  const duration = propertyValue && propertyValue !== 'none'
    ? parseFloat(durationValue) * durationScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * Add eventListener to an `Element` | `HTMLElement` | `Document` target.
 *
 * @param {HTMLElement | Element | Document | Window} element event.target
 * @param {string} eventName event.type
 * @param {EventListenerObject['handleEvent']} handler callback
 * @param {(EventListenerOptions | boolean)=} options other event options
 */
function on(element, eventName, handler, options) {
  const ops = options || false;
  element.addEventListener(eventName, handler, ops);
}

/**
 * Remove eventListener from an `Element` | `HTMLElement` | `Document` | `Window` target.
 *
 * @param {HTMLElement | Element | Document | Window} element event.target
 * @param {string} eventName event.type
 * @param {EventListenerObject['handleEvent']} handler callback
 * @param {(EventListenerOptions | boolean)=} options other event options
 */
function off(element, eventName, handler, options) {
  const ops = options || false;
  element.removeEventListener(eventName, handler, ops);
}

/**
 * Utility to make sure callbacks are consistently
 * called when transition ends.
 *
 * @param {HTMLElement | Element} element target
 * @param {EventListener} handler `transitionend` callback
 */
function emulateTransitionEnd(element, handler) {
  let called = 0;
  const endEvent = new Event(transitionEndEvent);
  const duration = getElementTransitionDuration(element);
  const delay = getElementTransitionDelay(element);

  if (duration) {
    /**
     * Wrap the handler in on -> off callback
     * @param {TransitionEvent} e Event object
     */
    const transitionEndWrapper = (e) => {
      if (e.target === element) {
        handler.apply(element, [e]);
        off(element, transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    };
    on(element, transitionEndEvent, transitionEndWrapper);
    setTimeout(() => {
      if (!called) element.dispatchEvent(endEvent);
    }, duration + delay + 17);
  } else {
    handler.apply(element, [endEvent]);
  }
}

/**
 * A global array of possible `ParentNode`.
 */
const parentNodes = [Document, Node, Element, HTMLElement];

/**
 * A global array with `Element` | `HTMLElement`.
 */
const elementNodes = [Element, HTMLElement];

/**
 * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
 * or find one that matches a selector.
 *
 * @param {HTMLElement | Element | string} selector the input selector or target element
 * @param {(HTMLElement | Element | Node | Document)=} parent optional node to look into
 * @return {(HTMLElement | Element)?} the `HTMLElement` or `querySelector` result
 */
function querySelector(selector, parent) {
  const selectorIsString = typeof selector === 'string';
  const lookUp = parent && parentNodes.some((x) => parent instanceof x)
    ? parent : getDocument();

  if (!selectorIsString && [...elementNodes].some((x) => selector instanceof x)) {
    return selector;
  }
  // @ts-ignore -- `ShadowRoot` is also a node
  return selectorIsString ? lookUp.querySelector(selector) : null;
}

/**
 * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
 * like `ShadowRoot` do not support `getElementsByClassName`.
 *
 * @param {string} selector the class name
 * @param {(HTMLElement | Element | Document)=} parent optional Element to look into
 * @return {HTMLCollectionOf<HTMLElement | Element>} the 'HTMLCollection'
 */
function getElementsByClassName(selector, parent) {
  const lookUp = parent && parentNodes.some((x) => parent instanceof x)
    ? parent : getDocument();
  return lookUp.getElementsByClassName(selector);
}

/**
 * Add class to `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to add
 */
function addClass(element, classNAME) {
  element.classList.add(classNAME);
}

/**
 * Check class in `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
 * @param {string} classNAME to check
 * @return {boolean}
 */
function hasClass(element, classNAME) {
  return element.classList.contains(classNAME);
}

/**
 * Remove class from `HTMLElement.classList`.
 *
 * @param {HTMLElement | Element} element target
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

/**
 * Shortcut for `Object.assign()` static method.
 * @param  {Record<string, any>} obj a target object
 * @param  {Record<string, any>} source a source object
 */
const ObjectAssign = (obj, source) => Object.assign(obj, source);

/** @type {Map<string, Map<HTMLElement | Element, Record<string, any>>>} */
const componentData = new Map();
/**
 * An interface for web components background data.
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  /**
   * Sets web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @param {Record<string, any>} instance the component instance
   */
  set: (target, component, instance) => {
    const element = querySelector(target);
    if (!element) return;

    if (!componentData.has(component)) {
      componentData.set(component, new Map());
    }

    const instanceMap = componentData.get(component);
    // @ts-ignore - not undefined, but defined right above
    instanceMap.set(element, instance);
  },

  /**
   * Returns all instances for specified component.
   * @param {string} component the component's name or a unique key
   * @returns {Map<HTMLElement | Element, Record<string, any>>?} all the component instances
   */
  getAllFor: (component) => {
    const instanceMap = componentData.get(component);

    return instanceMap || null;
  },

  /**
   * Returns the instance associated with the target.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @returns {Record<string, any>?} the instance
   */
  get: (target, component) => {
    const element = querySelector(target);
    const allForC = Data.getAllFor(component);
    const instance = element && allForC && allForC.get(element);

    return instance || null;
  },

  /**
   * Removes web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   */
  remove: (target, component) => {
    const element = querySelector(target);
    const instanceMap = componentData.get(component);
    if (!instanceMap || !element) return;

    instanceMap.delete(element);

    if (instanceMap.size === 0) {
      componentData.delete(component);
    }
  },
};

/**
 * An alias for `Data.get()`.
 * @type {SHORTER.getInstance<any>}
 */
const getInstance = (target, component) => Data.get(target, component);

/**
 * Checks if an element is an `<svg>` (or any type of SVG element),
 * `<img>` or `<video>`.
 *
 * *Tooltip* / *Popover* works different with media elements.
 * @param {any} element the target element
 * @returns {boolean} the query result
 */
const isMedia = (element) => element
  && [SVGElement, HTMLImageElement, HTMLVideoElement]
    .some((mediaType) => element instanceof mediaType);

// @ts-ignore
const { userAgentData: uaDATA } = navigator;

/**
 * A global namespace for `userAgentData` object.
 */
const userAgentData = uaDATA;

const { userAgent: userAgentString } = navigator;

/**
 * A global namespace for `navigator.userAgent` string.
 */
const userAgent = userAgentString;

const appleBrands = /(iPhone|iPod|iPad)/;

/**
 * A global `boolean` for Apple browsers.
 * @type {boolean}
 */
const isApple = !userAgentData ? appleBrands.test(userAgent)
  : userAgentData.brands.some((/** @type {Record<string, any>} */x) => appleBrands.test(x.brand));

/**
 * Returns the `document.documentElement` or the `<html>` element.
 *
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {HTMLElement | HTMLHtmlElement}
 */
function getDocumentElement(node) {
  return getDocument(node).documentElement;
}

/**
 * Checks if a page is Right To Left.
 * @param {(HTMLElement | Element)=} node the target
 * @returns {boolean} the query result
 */
const isRTL = (node) => getDocumentElement(node).dir === 'rtl';

/** @type {Map<HTMLElement | Element, any>} */
const TimeCache = new Map();
/**
 * An interface for one or more `TimerHandler`s per `Element`.
 * @see https://github.com/thednp/navbar.js/
 */
const Timer = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   * @param {HTMLElement | Element | string} target target element
   * @param {ReturnType<TimerHandler>} callback the callback
   * @param {number} delay the execution delay
   * @param {string=} key a unique
   */
  set: (target, callback, delay, key) => {
    const element = querySelector(target);

    if (!element) return;

    if (key && key.length) {
      if (!TimeCache.has(element)) {
        TimeCache.set(element, new Map());
      }
      const keyTimers = TimeCache.get(element);
      keyTimers.set(key, setTimeout(callback, delay));
    } else {
      TimeCache.set(element, setTimeout(callback, delay));
    }
  },

  /**
   * Returns the timer associated with the target.
   * @param {HTMLElement | Element | string} target target element
   * @param {string=} key a unique
   * @returns {number?} the timer
   */
  get: (target, key) => {
    const element = querySelector(target);

    if (!element) return null;
    const keyTimers = TimeCache.get(element);

    if (key && key.length && keyTimers && keyTimers.get) {
      return keyTimers.get(key) || null;
    }
    return keyTimers || null;
  },

  /**
   * Clears the element's timer.
   * @param {HTMLElement | Element | string} target target element
   * @param {string=} key a unique key
   */
  clear: (target, key) => {
    const element = querySelector(target);

    if (!element) return;

    if (key && key.length) {
      const keyTimers = TimeCache.get(element);

      if (keyTimers && keyTimers.get) {
        clearTimeout(keyTimers.get(key));
        keyTimers.delete(key);
        if (keyTimers.size === 0) {
          TimeCache.delete(element);
        }
      }
    } else {
      clearTimeout(TimeCache.get(element));
      TimeCache.delete(element);
    }
  },
};

let elementUID = 1;
const elementIDMap = new Map();

/**
 * Returns a unique identifier for popover, tooltip, scrollspy.
 *
 * @param {HTMLElement | Element} element target element
 * @param {string=} key predefined key
 * @returns {number} an existing or new unique ID
 */
function getUID(element, key) {
  elementUID += 1;
  let elMap = elementIDMap.get(element);
  let result = elementUID;

  if (elMap) {
    result = key && key.length && elMap.get && elMap.get(key)
      ? elMap.get(key) : elMap;
  } else if (key && key.length) {
    if (!elMap) {
      elementIDMap.set(element, new Map());
      elMap = elementIDMap.get(element);
    }
    elMap.set(key, result);
  } else {
    elementIDMap.set(element, result);
  }
  return result;
}

/**
 * A global namespace for `mousedown` event.
 * @type {string}
 */
const mousedownEvent = 'mousedown';

/**
 * A global namespace for `mouseenter` event.
 * @type {string}
 */
const mouseenterEvent = 'mouseenter';

/**
 * A global namespace for `mousemove` event.
 * @type {string}
 */
const mousemoveEvent = 'mousemove';

/**
 * A global namespace for `mouseleave` event.
 * @type {string}
 */
const mouseleaveEvent = 'mouseleave';

/**
 * A global namespace for `hover` event.
 * @type {string}
 */
const mousehoverEvent = 'hover';

/**
 * A global namespace for `click` event.
 * @type {string}
 */
const mouseclickEvent = 'click';

/**
 * A global namespace for `focus` event.
 * @type {string}
 */
const focusEvent = 'focus';

/**
 * A global namespace for `focusin` event.
 * @type {string}
 */
const focusinEvent = 'focusin';

/**
 * A global namespace for `focusout` event.
 * @type {string}
 */
const focusoutEvent = 'focusout';

/**
 * A global namespace for `touchstart` event.
 * @type {string}
 */
const touchstartEvent = 'touchstart';

/**
 * A global namespace for `scroll` event.
 * @type {string}
 */
const scrollEvent = 'scroll';

/**
 * A global namespace for `resize` event.
 * @type {string}
 */
const resizeEvent = 'resize';

/**
 * Returns the `Window` object of a target node.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {(Node | HTMLElement | Element | Window)=} node target node
 * @returns {globalThis}
 */
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (!(node instanceof Window)) {
    const { ownerDocument } = node;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  // @ts-ignore
  return node;
}

/**
 * Utility to focus an `HTMLElement` target.
 *
 * @param {HTMLElement | Element} element is the target
 */
// @ts-ignore -- `Element`s resulted from querySelector can focus too
const focus = (element) => element.focus();

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

/**
 * Returns a namespaced `CustomEvent` specific to each component.
 * @param {string} EventType Event.type
 * @param {Record<string, any>=} config Event.options | Event.properties
 * @returns {BSN.OriginalEvent} a new namespaced event
 */
function bootstrapCustomEvent(EventType, config) {
  const OriginalCustomEvent = new CustomEvent(EventType, { cancelable: true, bubbles: true });

  if (config instanceof Object) {
    ObjectAssign(OriginalCustomEvent, config);
  }
  return OriginalCustomEvent;
}

/** @type {Record<string, string>} */
var tipClassPositions = {
  top: 'top',
  bottom: 'bottom',
  left: 'start',
  right: 'end',
};

/**
 * @param {(HTMLElement | Element)?} tip target
 * @param {HTMLElement | ParentNode} container parent container
 * @returns {boolean}
 */
function isVisibleTip(tip, container) {
  return tip instanceof HTMLElement && container.contains(tip);
}

/**
 * A global boolean for Gecko browsers. When writing this file,
 * Gecko was not supporting `userAgentData`.
 */
const isFirefox = userAgent ? userAgent.includes('Firefox') : false;

/**
 * Check if an element is an `<svg>` or any other SVG element.
 * @param {any} element the target element
 * @returns {boolean} the query result
 */
const isSVGElement = (element) => element instanceof SVGElement;

/**
 * Returns the bounding client rect of a target `HTMLElement`.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Element} element event.target
 * @param {boolean=} includeScale when *true*, the target scale is also computed
 * @returns {SHORTER.BoundingClientRect} the bounding client rect object
 */
function getBoundingClientRect(element, includeScale) {
  const {
    width, height, top, right, bottom, left,
  } = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;

  if (includeScale && element instanceof HTMLElement) {
    const { offsetWidth, offsetHeight } = element;
    scaleX = offsetWidth > 0 ? Math.round(width) / offsetWidth || 1 : 1;
    scaleY = offsetHeight > 0 ? Math.round(height) / offsetHeight || 1 : 1;
  }

  return {
    width: width / scaleX,
    height: height / scaleY,
    top: top / scaleY,
    right: right / scaleX,
    bottom: bottom / scaleY,
    left: left / scaleX,
    x: left / scaleX,
    y: top / scaleY,
  };
}

/**
 * Returns an `{x,y}` object with the target
 * `HTMLElement` / `Node` scroll position.
 *
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Element | Window} element target node / element
 * @returns {{x: number, y: number}} the scroll tuple
 */
function getNodeScroll(element) {
  const isWin = 'scrollX' in element;
  const x = isWin ? element.scrollX : element.scrollLeft;
  const y = isWin ? element.scrollY : element.scrollTop;

  return { x, y };
}

/**
 * Checks if a target `HTMLElement` is affected by scale.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement} element target
 * @returns {boolean} the query result
 */
function isScaledElement(element) {
  const { width, height } = getBoundingClientRect(element);
  const { offsetWidth, offsetHeight } = element;
  return Math.round(width) !== offsetWidth
    || Math.round(height) !== offsetHeight;
}

/**
 * Returns the rect relative to an offset parent.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Element} element target
 * @param {HTMLElement | Element | Window} offsetParent the container / offset parent
 * @param {{x: number, y: number}} scroll
 * @returns {SHORTER.OffsetRect}
 */
function getRectRelativeToOffsetParent(element, offsetParent, scroll) {
  const isParentAnElement = offsetParent instanceof HTMLElement;
  const rect = getBoundingClientRect(element, isParentAnElement && isScaledElement(offsetParent));
  const offsets = { x: 0, y: 0 };

  if (isParentAnElement) {
    const offsetRect = getBoundingClientRect(offsetParent, true);
    offsets.x = offsetRect.x + offsetParent.clientLeft;
    offsets.y = offsetRect.y + offsetParent.clientTop;
  }

  return {
    x: rect.left + scroll.x - offsets.x,
    y: rect.top + scroll.y - offsets.y,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Shortcut for multiple uses of `HTMLElement.style.propertyName` method.
 * @param  {HTMLElement | Element} element target element
 * @param  {Partial<CSSStyleDeclaration>} styles attribute value
 */
// @ts-ignore
const setElementStyle = (element, styles) => { ObjectAssign(element.style, styles); };

/**
 * Style popovers and tooltips.
 * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
 * @param {PointerEvent=} e event object
 */
function styleTip(self, e) {
  const tipClasses = /\b(top|bottom|start|end)+/;
  // @ts-ignore
  const tip = self.tooltip || self.popover;
  const tipPositions = { ...tipClassPositions };

  // reset tip style (top: 0, left: 0 works best)
  setElementStyle(tip, { top: '0px', left: '0px', right: '' });

  // @ts-ignore
  const isPopover = !!self.popover;
  const tipWidth = tip.offsetWidth;
  const tipHeight = tip.offsetHeight;
  const {
    // @ts-ignore
    element, options, arrow, offsetParent,
  } = self;
  const RTL = isRTL(element);
  if (RTL) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }
  const documentElement = getDocumentElement(element);
  const windowWidth = documentElement.clientWidth;
  const windowHeight = documentElement.clientHeight;
  const { container } = options;
  let { placement } = options;
  const parentIsBody = container.tagName === 'BODY';
  const { left: parentLeft, right: parentRight } = getBoundingClientRect(container, true);
  const parentPosition = getElementStyle(container, 'position');
  // const absoluteParent = parentPosition === 'absolute';
  const fixedParent = parentPosition === 'fixed';
  const staticParent = parentPosition === 'static';
  const absoluteTarget = getElementStyle(element, 'position') === 'absolute';
  const leftBoundry = 0;
  const rightBoundry = container.clientWidth + parentLeft + (windowWidth - parentRight) - 1;
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemRectLeft,
    right: elemRectRight,
    top: elemRectTop,
  } = getBoundingClientRect(element, true);
  const scroll = getNodeScroll(parentIsBody || staticParent ? getWindow(element) : container);
  const isSVG = isSVGElement(element);
  const { x, y } = getRectRelativeToOffsetParent(element, offsetParent, scroll);

  // reset arrow style
  setElementStyle(arrow, { top: '', left: '', right: '' });
  let topPosition;
  let leftPosition;
  let rightPosition;
  let arrowTop;
  let arrowLeft;
  let arrowRight;

  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;

  // check placement
  let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
  let bottomExceed = elemRectTop + tipHeight + elemHeight
    + arrowHeight >= windowHeight;
  let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
  let rightExceed = elemRectLeft + tipWidth + elemWidth
    + arrowWidth >= rightBoundry;

  const horizontal = ['left', 'right'];
  const vertical = ['top', 'bottom'];
  topExceed = horizontal.includes(placement)
    ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0
    : topExceed;
  bottomExceed = horizontal.includes(placement)
    ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= windowHeight
    : bottomExceed;
  leftExceed = vertical.includes(placement)
    ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry
    : leftExceed;
  rightExceed = vertical.includes(placement)
    ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry
    : rightExceed;

  // recompute placement
  // first, when both left and right limits are exceeded, we fall back to top|bottom
  placement = (horizontal.includes(placement)) && leftExceed && rightExceed ? 'top' : placement;
  placement = placement === 'top' && topExceed ? 'bottom' : placement;
  placement = placement === 'bottom' && bottomExceed ? 'top' : placement;
  placement = placement === 'left' && leftExceed ? 'right' : placement;
  placement = placement === 'right' && rightExceed ? 'left' : placement;

  // update tooltip/popover class
  if (!tip.className.includes(placement)) {
    tip.className = tip.className.replace(tipClasses, tipPositions[placement]);
  }

  // compute tooltip / popover coordinates
  if (horizontal.includes(placement)) { // secondary|side positions
    if (placement === 'left') { // LEFT
      leftPosition = x - tipWidth - (isPopover ? arrowWidth : 0);
    } else { // RIGHT
      leftPosition = x + elemWidth + (isPopover ? arrowWidth : 0);
    }

    // adjust top and arrow
    if (topExceed) {
      topPosition = y;
      arrowTop = elemHeight / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = y - tipHeight + elemHeight;
      arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
    } else {
      topPosition = y - tipHeight / 2 + elemHeight / 2;
      arrowTop = tipHeight / 2 - arrowHeight / 2;
    }
  } else if (vertical.includes(placement)) {
    if (e && isMedia(element)) {
      let eX = 0;
      let eY = 0;

      if (parentIsBody || staticParent) {
        eX = e.pageX;
        eY = e.pageY;
      } else if (['sticky', 'fixed'].includes(parentPosition)) {
        eX = e.clientX + scroll.x;
        eY = e.clientY + scroll.y;
      // parentPosition === 'relative | static | absolute'
      } else {
        // @ts-ignore -- Firefix breaks here
        eX = e.layerX + ((isSVG && !isFirefox) || absoluteTarget ? x : 0);
        // @ts-ignore -- Firefix breaks here
        eY = e.layerY + ((isSVG && !isFirefox) || absoluteTarget ? y : 0);
      }
      // some weird RTL bug
      const scrollbarWidth = parentRight - container.clientWidth;
      eX -= RTL && fixedParent ? scrollbarWidth : 0;

      if (placement === 'top') {
        topPosition = eY - tipHeight - arrowWidth;
      } else {
        topPosition = eY + arrowWidth;
      }

      // adjust (left | right) and also the arrow
      if (e.clientX - tipWidth / 2 < leftBoundry) {
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e.clientX + tipWidth / 2 > rightBoundry) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = rightBoundry - eX - arrowAdjust;
      // normal top/bottom
      } else {
        leftPosition = eX - tipWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    } else {
      if (placement === 'top') {
        topPosition = y - tipHeight - (isPopover ? arrowHeight : 0);
      } else { // BOTTOM
        topPosition = y + elemHeight + (isPopover ? arrowHeight : 0);
      }

      // adjust left | right and also the arrow
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = x + elemWidth / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = 'auto';
        rightPosition = 0;
        arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
      } else {
        leftPosition = x - tipWidth / 2 + elemWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    }
  }

  // apply style to tooltip/popover
  setElementStyle(tip, {
    top: `${topPosition}px`,
    left: leftPosition === 'auto' ? leftPosition : `${leftPosition}px`,
    right: rightPosition !== undefined ? `${rightPosition}px` : '',
  });

  // update arrow placement
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
 * Check if target is a `ShadowRoot`.
 *
 * @param {any} element target
 * @returns {boolean} the query result
 */
const isShadowRoot = (element) => {
  const OwnElement = getWindow(element).ShadowRoot;
  return element instanceof OwnElement || element instanceof ShadowRoot;
};

/**
 * Returns the `parentNode` also going through `ShadowRoot`.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {Node | HTMLElement | Element} node the target node
 * @returns {Node | HTMLElement | Element} the apropriate parent node
 */
function getParentNode(node) {
  if (node.nodeName === 'HTML') {
    return node;
  }

  // this is a quicker (but less type safe) way to save quite some bytes from the bundle
  return (
    // @ts-ignore
    node.assignedSlot // step into the shadow DOM of the parent of a slotted node
    || node.parentNode // @ts-ignore DOM Element detected
    || (isShadowRoot(node) ? node.host : null) // ShadowRoot detected
    || getDocumentElement(node) // fallback
  );
}

/**
 * Check if a target element is a `<table>`, `<td>` or `<th>`.
 * @param {any} element the target element
 * @returns {boolean} the query result
 */
const isTableElement = (element) => ['TABLE', 'TD', 'TH'].includes(element.tagName);

/**
 * Returns an `HTMLElement` to be used as default value for *options.container*
 * for `Tooltip` / `Popover` components.
 *
 * When `getOffset` is *true*, it returns the `offsetParent` for tooltip/popover
 * offsets computation similar to **floating-ui**.
 * @see https://github.com/floating-ui/floating-ui
 *
 * @param {HTMLElement | Element} element the target
 * @param {boolean=} getOffset when *true* it will return an `offsetParent`
 * @returns {HTMLElement | HTMLBodyElement | Window} the query result
 */
function getElementContainer(element, getOffset) {
  const majorBlockTags = ['HTML', 'BODY'];

  if (getOffset) {
    /** @type {any} */
    let { offsetParent } = element;

    while (offsetParent && isTableElement(offsetParent)
      && getElementStyle(offsetParent, 'position') === 'static'
        && offsetParent instanceof HTMLElement
          && getElementStyle(offsetParent, 'position') !== 'fixed') {
      offsetParent = offsetParent.offsetParent;
    }

    if (!offsetParent || (offsetParent
      && (majorBlockTags.includes(offsetParent.tagName)
        && getElementStyle(offsetParent, 'position') === 'static'))) {
      offsetParent = getWindow(element);
    }
    return offsetParent;
  }

  /** @type {(HTMLElement)[]} */
  const containers = [];
  /** @type {any} */
  let { parentNode } = element;

  while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
    parentNode = getParentNode(parentNode);
    if (!(isShadowRoot(parentNode) || !!parentNode.shadowRoot
      || isTableElement(parentNode))) {
      containers.push(parentNode);
    }
  }

  return containers.find((c, i) => {
    if (getElementStyle(c, 'position') !== 'relative'
      && containers.slice(i + 1).every((r) => getElementStyle(r, 'position') === 'static')) {
      return c;
    }
    return null;
  }) || getDocumentBody(element);
}

/**
 * Append an existing `Element` to Popover / Tooltip component or HTML
 * markup string to be parsed & sanitized to be used as popover / tooltip content.
 *
 * @param {HTMLElement | Element} element target
 * @param {HTMLElement | Element | string} content the `Element` to append / string
 * @param {ReturnType<any>} sanitizeFn a function to sanitize string content
 */
function setHtml(element, content, sanitizeFn) {
  if (typeof content === 'string' && !content.length) return;

  if (typeof content === 'string') {
    let dirty = content.trim(); // fixing #233
    if (typeof sanitizeFn === 'function') dirty = sanitizeFn(dirty);

    const domParser = new DOMParser();
    const tempDocument = domParser.parseFromString(dirty, 'text/html');
    const { body } = tempDocument;
    const method = body.children.length ? 'innerHTML' : 'innerText';
    // @ts-ignore
    element[method] = body[method];
  } else if (content instanceof HTMLElement) {
    element.append(content);
  }
}

/**
 * The raw value or a given component option.
 *
 * @typedef {string | HTMLElement | Function | number | boolean | null} niceValue
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

  // string / function / HTMLElement / object
  return value;
}

/**
 * Shortcut for `Object.keys()` static method.
 * @param  {Record<string, any>} obj a target object
 * @returns {string[]}
 */
const ObjectKeys = (obj) => Object.keys(obj);

/**
 * Utility to normalize component options.
 *
 * @param {HTMLElement | Element} element target
 * @param {Record<string, any>} defaultOps component default options
 * @param {Record<string, any>} inputOps component instance options
 * @param {string=} ns component namespace
 * @return {Record<string, any>} normalized component options object
 */
function normalizeOptions(element, defaultOps, inputOps, ns) {
  // @ts-ignore -- our targets are always `HTMLElement`
  const data = { ...element.dataset };
  /** @type {Record<string, any>} */
  const normalOps = {};
  /** @type {Record<string, any>} */
  const dataOps = {};

  ObjectKeys(data).forEach((k) => {
    const key = ns && k.includes(ns)
      ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
      : k;

    dataOps[key] = normalizeValue(data[k]);
  });

  ObjectKeys(inputOps).forEach((k) => {
    inputOps[k] = normalizeValue(inputOps[k]);
  });

  ObjectKeys(defaultOps).forEach((k) => {
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

var version = "4.1.0alpha1";

const Version = version;

/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

/** Returns a new `BaseComponent` instance. */
class BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target `Element` or selector string
   * @param {BSN.ComponentOptions=} config component instance options
   */
  constructor(target, config) {
    const self = this;
    const element = querySelector(target);

    if (!element) {
      throw Error(`${self.name} Error: "${target}" is not a valid selector.`);
    }

    /** @static @type {BSN.ComponentOptions} */
    self.options = {};

    const prevInstance = Data.get(element, self.name);
    if (prevInstance) prevInstance.dispose();

    /** @type {HTMLElement | Element} */
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
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
  // @ts-ignore
  get defaults() { return this.constructor.defaults; }

  /**
   * Removes component from target element;
   */
  dispose() {
    const self = this;
    Data.remove(self.element, self.name);
    // @ts-ignore
    ObjectKeys(self).forEach((prop) => { self[prop] = null; });
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
  /** @type {string} */
  template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
  /** @type {string?} */
  title: null,
  /** @type {string?} */
  content: null,
  /** @type {string?} */
  customClass: null,
  /** @type {string} */
  trigger: 'hover',
  /** @type {string} */
  placement: 'top',
  /** @type {string} */
  btnClose: '<button class="btn-close" aria-label="Close"></button>',
  /** @type {ReturnType<string>} */
  sanitizeFn: null,
  /** @type {boolean} */
  dismissible: false,
  /** @type {boolean} */
  animation: true,
  /** @type {number} */
  delay: 200,
  /** @type {Element?} */
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
 * @param {TouchEvent} e the `TouchEvent` object
 */
function popoverTouchHandler({ target }) {
  const self = this;
  const { popover, element } = self;
  if ((popover && popover.contains(target)) // popover includes touch target
    || target === element // OR touch target is element
    // @ts-ignore
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
  const { id, element, options } = self;
  const {
    animation, customClass, sanitizeFn, placement, dismissible,
  } = options;
  let { title, content } = options;
  const { template, btnClose } = options;
  const tipPositions = { ...tipClassPositions };

  if (isRTL(element)) {
    tipPositions.left = 'end';
    tipPositions.right = 'start';
  }

  // set initial popover class
  const placementClass = `bs-${popoverString}-${tipPositions[placement]}`;

  // load template
  /** @type {(HTMLElement | Element)?} */
  let popoverTemplate;
  if ([Element, HTMLElement].some((x) => template instanceof x)) {
    popoverTemplate = template;
  } else {
    const htmlMarkup = getDocument(element).createElement('div');
    setHtml(htmlMarkup, template, sanitizeFn);
    popoverTemplate = htmlMarkup.firstElementChild;
  }

  // set popover markup
  self.popover = popoverTemplate && popoverTemplate.cloneNode(true);

  const { popover } = self;

  // set id and role attributes
  setAttribute(popover, 'id', id);
  setAttribute(popover, 'role', 'tooltip');

  const popoverHeader = querySelector(`.${popoverHeaderClass}`, popover);
  const popoverBody = querySelector(`.${popoverBodyClass}`, popover);

  // set arrow and enable access for styleTip
  self.arrow = querySelector(`.${popoverString}-arrow`, popover);

  // set dismissible button
  if (dismissible) {
    if (title) {
      if (title instanceof HTMLElement) setHtml(title, btnClose, sanitizeFn);
      else title += btnClose;
    } else {
      if (popoverHeader) popoverHeader.remove();
      if (content instanceof HTMLElement) setHtml(content, btnClose, sanitizeFn);
      else content += btnClose;
    }
  }

  // fill the template with content from options / data attributes
  // also sanitize title && content
  if (title && popoverHeader) setHtml(popoverHeader, title, sanitizeFn);
  if (content && popoverBody) setHtml(popoverBody, content, sanitizeFn);

  // set btn and enable access for styleTip
  [self.btn] = getElementsByClassName('btn-close', popover);

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
  removeAttribute(element, ariaDescribedBy);
  popover.remove();
}

/**
 * Toggles on/off the `Popover` event listeners.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function togglePopoverHandlers(self, add) {
  const action = add ? on : off;
  const { element, options } = self;
  const { trigger, dismissible } = options;
  self.enabled = !!add;

  if (trigger === mousehoverEvent) {
    action(element, mousedownEvent, self.show);
    action(element, mouseenterEvent, self.show);
    if (isMedia(element)) action(element, mousemoveEvent, self.update, passiveHandler);
    if (!dismissible) action(element, mouseleaveEvent, self.hide);
  } else if (trigger === mouseclickEvent) {
    action(element, trigger, self.toggle);
  } else if (trigger === focusEvent) {
    if (isApple) action(element, mouseclickEvent, () => focus(element));
    action(element, focusinEvent, self.show);
  }
}

/**
 * Toggles on/off the `Popover` event listeners that close popover.
 *
 * @param {Popover} self the `Popover` instance
 * @param {boolean=} add when `true`, event listeners are added
 */
function dismissHandlerToggle(self, add) {
  const action = add ? on : off;
  const { options, element, btn } = self;
  const { trigger, dismissible } = options;

  if (dismissible) {
    if (btn) action(btn, mouseclickEvent, self.hide);
  } else {
    if (trigger === focusEvent) action(element, focusoutEvent, self.hide);
    if (trigger === mousehoverEvent) {
      action(getDocument(element), touchstartEvent, popoverTouchHandler, passiveHandler);
    }
  }

  if (!isMedia(element)) {
    [scrollEvent, resizeEvent].forEach((ev) => {
      // @ts-ignore
      action(getWindow(element), ev, self.update, passiveHandler);
    });
  }
}

/**
 * Executes after popover was shown to the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverShowComplete(self) {
  const { element } = self;
  dispatchEvent(element, shownPopoverEvent);
  Timer.clear(element, 'in');
}

/**
 * Executes after popover was been hidden from the user.
 *
 * @param {Popover} self the `Popover` instance
 */
function popoverHideComplete(self) {
  removePopover(self);
  const { element } = self;
  dispatchEvent(element, hiddenPopoverEvent);
  Timer.clear(element, 'out');
}

// POPOVER DEFINITION
// ==================
/** Returns a new `Popover` instance. */
class Popover extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target element with `data-bs-toggle` attribute
   * @param {BSN.Options.Popover=} config instance options
   */
  constructor(target, config) {
    super(target, config);

    // bind
    const self = this;
    const { element } = self;

    // additional instance properties
    /** @type {any} */
    self.popover = {};
    /** @type {(HTMLElement | Element)?} */
    self.arrow = null;
    /** @type {(HTMLElement | Element)?} */
    self.btn = null;
    /** @type {any} */
    self.offsetParent = {};
    /** @type {boolean} */
    self.enabled = true;
    /**
     * Set a unique ID for `aria-describedby`.
     * @type {string}
     */
    self.id = `${popoverString}-${getUID(element, popoverString)}`;

    // set instance options
    const { options } = self;
    // invalidate when no content is set
    if (!options.content) return;

    const container = querySelector(options.container);
    const idealContainer = getElementContainer(element);

    // first set container
    // bypass container option when its position is static/relative
    self.options.container = !container || (container
      && ['static', 'relative'].includes(getElementStyle(container, 'position')))
      ? idealContainer
      : container || getDocumentBody(element);

    // crate popover
    createPopover(self);

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
   * Updates the position of the popover. Must use `Event` object.
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
   * Toggles visibility of the popover. Must use `Event` object.
   *
   * @param {Event=} e the `Event` object
   * @this {Popover}
   */
  toggle(e) {
    // @ts-ignore
    const self = e ? getPopoverInstance(this) : this;
    if (!self) return;
    const { popover, options } = self;
    if (!isVisibleTip(popover, options.container)) self.show();
    else self.hide();
  }

  /**
   * Shows the popover. Must use `Event` object.
   *
   * @param {Event=} e the `Event` object
   * @this {Popover}
   */
  show(e) {
    // @ts-ignore
    const self = e ? getPopoverInstance(this) : this;
    if (!self) return;
    const {
      element, popover, options, id,
    } = self;
    const { container, animation } = options;
    const outTimer = Timer.get(element, 'out');

    Timer.clear(element, 'out');

    if (popover && !outTimer && !isVisibleTip(popover, container)) {
      const showCallback = () => {
        dispatchEvent(element, showPopoverEvent);
        if (showPopoverEvent.defaultPrevented) return;

        // append to the container
        container.append(popover);
        setAttribute(element, ariaDescribedBy, `#${id}`);

        self.offsetParent = getElementContainer(popover, true);

        self.update(e);
        if (!hasClass(popover, showClass)) addClass(popover, showClass);
        dismissHandlerToggle(self, true);

        if (animation) emulateTransitionEnd(popover, () => popoverShowComplete(self));
        else popoverShowComplete(self);
      };
      Timer.set(element, showCallback, 17, 'in');
    }
  }

  /**
   * Hides the popover.
   *
   * @this {Popover}
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
        const dEl = dPopover && querySelector(`[${ariaDescribedBy}="#${dPopover.id}"]`);
        // @ts-ignore
        self = getPopoverInstance(dEl);
      }
    } else {
      self = this;
    }
    const { element, popover, options } = self;
    const { container, animation, delay } = options;

    Timer.clear(element, 'in');

    if (popover && isVisibleTip(popover, container)) {
      const hideCallback = () => {
        dispatchEvent(element, hidePopoverEvent);
        if (hidePopoverEvent.defaultPrevented) return;

        removeClass(popover, showClass);
        dismissHandlerToggle(self);

        if (animation) emulateTransitionEnd(popover, () => popoverHideComplete(self));
        else popoverHideComplete(self);
      };
      Timer.set(element, hideCallback, delay + 17, 'out');
    }
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
    const {
      element, enabled, popover, options,
    } = self;
    const { container, animation, delay } = options;

    if (enabled) {
      if (isVisibleTip(popover, container) && animation) {
        self.hide();
        Timer.set(element, () => {
          togglePopoverHandlers(self);
          Timer.clear(element, popoverString);
        }, getElementTransitionDuration(popover) + delay + 17, popoverString);
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

ObjectAssign(Popover, {
  selector: popoverSelector,
  init: popoverInitCallback,
  getInstance: getPopoverInstance,
  styleTip,
});

export { Popover as default };
