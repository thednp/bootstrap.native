/*!
  * Native JavaScript for Bootstrap Dropdown v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Dropdown = factory());
})(this, (function () { 'use strict';

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
   * Global namespace for most components `show` class.
   */
  const showClass = 'show';

  /**
   * Global namespace for most components `toggle` option.
   */
  const dataBsToggle = 'data-bs-toggle';

  /**
   * Global namespace for `Dropdown` types / classes.
   */
  const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

  /**
   * Global namespace for `.dropdown-menu`.
   */
  const dropdownMenuClass = 'dropdown-menu';

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
   * Checks if an *event.target* or its parent has an `href="#"` value.
   * We need to prevent jumping around onclick, don't we?
   *
   * @param {Element} elem the target element
   * @returns {boolean} the query result
   */
  function isEmptyAnchor(elem) {
    const parentAnchor = elem.closest('A');
    // anchor href starts with #
    return elem && ((elem.hasAttribute('href') && elem.href.slice(-1) === '#')
      // OR a child of an anchor with href starts with #
      || (parentAnchor && parentAnchor.hasAttribute('href') && parentAnchor.href.slice(-1) === '#'));
  }

  /**
   * Points the focus to a specific element.
   * @param {Element} element target
   */
  function setFocus(element) {
    element.focus();
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

  /* Native JavaScript for Bootstrap 5 | Dropdown
  ----------------------------------------------- */

  // DROPDOWN PRIVATE GC
  // ===================
  const [dropdownString] = dropdownMenuClasses;
  const dropdownComponent = 'Dropdown';
  const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

  /**
   * Static method which returns an existing `Dropdown` instance associated
   * to a target `Element`.
   *
   * @type {BSN.GetInstance<Dropdown>}
   */
  const getDropdownInstance = (element) => getInstance(element, dropdownComponent);

  /**
   * A `Dropdown` initialization callback.
   * @type {BSN.InitCallback<Dropdown>}
   */
  const dropdownInitCallback = (element) => new Dropdown(element);

  // DROPDOWN PRIVATE GC
  // ===================
  const dropupString = dropdownMenuClasses[1];
  const dropstartString = dropdownMenuClasses[2];
  const dropendString = dropdownMenuClasses[3];
  const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
  const hideMenuClass = ['d-block', 'invisible'];
  const verticalClass = [dropdownString, dropupString];
  const horizontalClass = [dropstartString, dropendString];

  const dropdownDefaults = {
    offset: 5, // [number] 5(px)
    display: 'dynamic', // [dynamic|static]
  };

  // DROPDOWN CUSTOM EVENTS
  // ======================
  const showDropdownEvent = bootstrapCustomEvent(`show.bs.${dropdownString}`);
  const shownDropdownEvent = bootstrapCustomEvent(`shown.bs.${dropdownString}`);
  const hideDropdownEvent = bootstrapCustomEvent(`hide.bs.${dropdownString}`);
  const hiddenDropdownEvent = bootstrapCustomEvent(`hidden.bs.${dropdownString}`);

  // DROPDOWN PRIVATE METHODS
  // ========================
  /**
   * Apply specific style or class names to a `.dropdown-menu` to automatically
   * accomodate the layout and the page scroll.
   *
   * @param {Dropdown} self the `Dropdown` instance
   * @param {boolean=} show when `true` will have a different effect
   */
  function styleDropdown(self, show) {
    const {
      // @ts-ignore
      element, menu, originalClass, menuEnd, options,
    } = self;
    const { offset } = options;
    const parent = element.parentElement;

    // reset menu offset and position
    const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
    // @ts-ignore
    resetProps.forEach((p) => { menu.style[p] = ''; });
    // @ts-ignore
    removeClass(parent, 'position-static');

    if (!show) {
      const menuEndNow = hasClass(menu, dropdownMenuEndClass);
      // @ts-ignore
      parent.className = originalClass.join(' ');
      if (menuEndNow && !menuEnd) removeClass(menu, dropdownMenuEndClass);
      else if (!menuEndNow && menuEnd) addClass(menu, dropdownMenuEndClass);
      return;
    }

    // set initial position class
    // take into account .btn-group parent as .dropdown
    let positionClass = dropdownMenuClasses.find((c) => originalClass.includes(c)) || dropdownString;

    let dropdownMargin = {
      dropdown: [offset, 0, 0],
      dropup: [0, 0, offset],
      dropstart: [-1, offset, 0],
      dropend: [-1, 0, 0, offset],
    };

    const dropdownPosition = {
      dropdown: { top: '100%' },
      dropup: { top: 'auto', bottom: '100%' },
      dropstart: { left: 'auto', right: '100%' },
      dropend: { left: '100%', right: 'auto' },
      menuEnd: { right: 0, left: 'auto' },
    };

    // force showing the menu to calculate its size
    hideMenuClass.forEach((c) => addClass(menu, c));

    const dropdownRegex = new RegExp(`\\b(${dropdownString}|${dropupString}|${dropstartString}|${dropendString})+`);
    // @ts-ignore
    const elementDimensions = { w: element.offsetWidth, h: element.offsetHeight };
    // @ts-ignore
    const menuDimensions = { w: menu.offsetWidth, h: menu.offsetHeight };
    const HTML = document.documentElement;
    const BD = document.body;
    const windowWidth = (HTML.clientWidth || BD.clientWidth);
    const windowHeight = (HTML.clientHeight || BD.clientHeight);
    const targetBCR = element.getBoundingClientRect();
    // dropdownMenuEnd && [ dropdown | dropup ]
    const leftExceed = targetBCR.left + elementDimensions.w - menuDimensions.w < 0;
    // dropstart
    const leftFullExceed = targetBCR.left - menuDimensions.w < 0;
    // !dropdownMenuEnd && [ dropdown | dropup ]
    const rightExceed = targetBCR.left + menuDimensions.w >= windowWidth;
    // dropend
    const rightFullExceed = targetBCR.left + menuDimensions.w + elementDimensions.w >= windowWidth;
    // dropstart | dropend
    const bottomExceed = targetBCR.top + menuDimensions.h >= windowHeight;
    // dropdown
    const bottomFullExceed = targetBCR.top + menuDimensions.h + elementDimensions.h >= windowHeight;
    // dropup
    const topExceed = targetBCR.top - menuDimensions.h < 0;

    // recompute position
    if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
      positionClass = dropdownString;
    }
    if (horizontalClass.includes(positionClass) && bottomExceed) {
      positionClass = dropupString;
    }
    if (positionClass === dropstartString && leftFullExceed && !bottomExceed) {
      positionClass = dropendString;
    }
    if (positionClass === dropendString && rightFullExceed && !bottomExceed) {
      positionClass = dropstartString;
    }
    if (positionClass === dropupString && topExceed && !bottomFullExceed) {
      positionClass = dropdownString;
    }
    if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
      positionClass = dropupString;
    }

    // set spacing
    // @ts-ignore
    dropdownMargin = dropdownMargin[positionClass];
    // @ts-ignore
    menu.style.margin = `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`;
    // @ts-ignore
    Object.keys(dropdownPosition[positionClass]).forEach((position) => {
      // @ts-ignore
      menu.style[position] = dropdownPosition[positionClass][position];
    });

    // update dropdown position class
    // @ts-ignore
    if (!hasClass(parent, positionClass)) {
      // @ts-ignore
      parent.className = parent.className.replace(dropdownRegex, positionClass);
    }

    // update dropdown / dropup to handle parent btn-group element
    // as well as the dropdown-menu-end utility class
    if (verticalClass.includes(positionClass)) {
      if (!menuEnd && rightExceed) addClass(menu, dropdownMenuEndClass);
      else if (menuEnd && leftExceed) removeClass(menu, dropdownMenuEndClass);

      if (hasClass(menu, dropdownMenuEndClass)) {
        Object.keys(dropdownPosition.menuEnd).forEach((p) => {
          // @ts-ignore
          menu.style[p] = dropdownPosition.menuEnd[p];
        });
      }
    }

    // remove util classes from the menu, we have its size
    hideMenuClass.forEach((c) => removeClass(menu, c));
  }

  /**
   * Toggles on/off the listeners for the events that close the dropdown
   * as well as event that request a new position for the dropdown.
   *
   * @param {Dropdown} self the `Dropdown` instance
   */
  function toggleDropdownDismiss(self) {
    // @ts-ignore
    const action = self.open ? addEventListener : removeEventListener;

    // @ts-ignore
    document[action]('click', dropdownDismissHandler);
    // @ts-ignore
    document[action]('focus', dropdownDismissHandler);
    // @ts-ignore
    document[action]('keydown', dropdownPreventScroll);
    // @ts-ignore
    document[action]('keyup', dropdownKeyHandler);

    if (self.options.display === 'dynamic') {
      // @ts-ignore
      window[action]('scroll', dropdownLayoutHandler, passiveHandler);
      // @ts-ignore
      window[action]('resize', dropdownLayoutHandler, passiveHandler);
    }
  }

  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param {Dropdown} self the `Dropdown` instance
   * @param {boolean=} add when `true`, it will add the event listener
   */
  function toggleDropdownHandler(self, add) {
    const action = add ? addEventListener : removeEventListener;
    // @ts-ignore
    self.element[action]('click', dropdownClickHandler);
  }

  /**
   * Returns the currently open `.dropdown` element.
   *
   * @returns {Element?} the query result
   */
  function getCurrentOpenDropdown() {
    const currentParent = [...dropdownMenuClasses, 'btn-group', 'input-group']
      .map((c) => document.getElementsByClassName(`${c} ${showClass}`))
      .find((x) => x.length);

    if (currentParent && currentParent.length) {
      // @ts-ignore
      return Array.from(currentParent[0].children)
        .find((x) => x.hasAttribute(dataBsToggle));
    }
    return null;
  }

  // DROPDOWN EVENT HANDLERS
  // =======================
  /**
   * Handles the `click` event for the `Dropdown` instance.
   *
   * @param {Event} e event object
   */
  function dropdownDismissHandler(e) {
    const { target, type } = e;
    // @ts-ignore
    if (!target.closest) return; // some weird FF bug #409

    const element = getCurrentOpenDropdown();
    if (!element) return;

    const self = getDropdownInstance(element);
    const parent = element.parentNode;
    // @ts-ignore
    const menu = self && self.menu;

    // @ts-ignore
    const hasData = target.closest(dropdownSelector) !== null;
    // @ts-ignore
    const isForm = parent && parent.contains(target)
      // @ts-ignore
      && (target.tagName === 'form' || target.closest('form') !== null);

    // @ts-ignore
    if (type === 'click' && isEmptyAnchor(target)) {
      e.preventDefault();
    }
    if (type === 'focus' // @ts-ignore
      && (target === element || target === menu || menu.contains(target))) {
      return;
    }

    if (isForm || hasData) ; else if (self) {
      self.hide();
    }
  }

  /**
   * Handles `click` event listener for `Dropdown`.
   * @this {Element}
   * @param {Event} e event object
   */
  function dropdownClickHandler(e) {
    const element = this;
    const self = getDropdownInstance(element);
    self.toggle();

    // @ts-ignore
    if (isEmptyAnchor(e.target)) e.preventDefault();
  }

  /**
   * Prevents scroll when dropdown-menu is visible.
   * @param {Event} e event object
   */
  function dropdownPreventScroll(e) {
    // @ts-ignore
    if (e.which === 38 || e.which === 40) e.preventDefault();
  }

  /**
   * Handles keyboard `keydown` events for `Dropdown`.
   * @param {{which: number}} e keyboard key
   */
  function dropdownKeyHandler({ which }) {
    const element = getCurrentOpenDropdown();
    // @ts-ignore
    const self = getDropdownInstance(element);
    // @ts-ignore
    const { menu, menuItems, open } = self;
    const activeItem = document.activeElement;
    const isSameElement = activeItem === element;
    const isInsideMenu = menu.contains(activeItem);
    // @ts-ignore
    const isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;

    // @ts-ignore
    let idx = menuItems.indexOf(activeItem);

    if (isMenuItem) { // navigate up | down
      if (isSameElement) {
        idx = 0;
      } else if (which === 38) {
        idx = idx > 1 ? idx - 1 : 0;
      } else if (which === 40) {
        idx = idx < menuItems.length - 1 ? idx + 1 : idx;
      }

      if (menuItems[idx]) setFocus(menuItems[idx]);
    }

    if (((menuItems.length && isMenuItem) // menu has items
        || (!menuItems.length && (isInsideMenu || isSameElement)) // menu might be a form
        || !isInsideMenu) // or the focused element is not in the menu at all
        && open && which === 27 // menu must be open
    ) {
      self.toggle();
    }
  }

  /**
   * @returns {void}
   */
  function dropdownLayoutHandler() {
    const element = getCurrentOpenDropdown();
    const self = element && getDropdownInstance(element);

    // @ts-ignore
    if (self && self.open) styleDropdown(self, true);
  }

  // DROPDOWN DEFINITION
  // ===================
  /**
   * Returns a new Dropdown instance.
   * @implements {BaseComponent}
   */
  class Dropdown extends BaseComponent {
    /**
     * @param {Element | string} target Element or string selector
     * @param {BSN.Options.Dropdown=} config the instance options
     */
    constructor(target, config) {
      super(target, config);
      // bind
      const self = this;

      // initialization element
      const { element } = self;

      // set targets
      const { parentElement } = element;
      /** @private @type {Element} */
      // @ts-ignore
      self.menu = queryElement(`.${dropdownMenuClass}`, parentElement);
      const { menu } = self;

      /** @private @type {string[]} */
      // @ts-ignore
      self.originalClass = Array.from(parentElement.classList);

      // set original position
      /** @private @type {boolean} */
      self.menuEnd = hasClass(menu, dropdownMenuEndClass);

      /** @private @type {Element[]} */
      self.menuItems = [];

      Array.from(menu.children).forEach((child) => {
        if (child.children.length && (child.children[0].tagName === 'A')) self.menuItems.push(child.children[0]);
        if (child.tagName === 'A') self.menuItems.push(child);
      });

      // set initial state to closed
      /** @private @type {boolean} */
      self.open = false;

      // add event listener
      toggleDropdownHandler(self, true);
    }

    /* eslint-disable */
    /**
     * Returns component name string.
     * @readonly @static
     */
    get name() { return dropdownComponent; }
    /**
     * Returns component default options.
     * @readonly @static
     */
    get defaults() { return dropdownDefaults; }
    /* eslint-enable */

    // DROPDOWN PUBLIC METHODS
    // =======================
    /** Shows/hides the dropdown menu to the user. */
    toggle() {
      const self = this;

      if (self.open) self.hide();
      else self.show();
    }

    /** Shows the dropdown menu to the user. */
    show() {
      const self = this;
      const currentParent = queryElement(dropdownMenuClasses.concat('btn-group', 'input-group').map((c) => `.${c}.${showClass}`).join(','));
      const currentElement = currentParent && queryElement(dropdownSelector, currentParent);

      if (currentElement) getDropdownInstance(currentElement).hide();

      const { element, menu, open } = self;
      const { parentElement } = element;

      // dispatch
      [showDropdownEvent, shownDropdownEvent].forEach((e) => { e.relatedTarget = element; });

      // @ts-ignore
      parentElement.dispatchEvent(showDropdownEvent);
      if (showDropdownEvent.defaultPrevented) return;

      // change menu position
      styleDropdown(self, true);

      addClass(menu, showClass);
      // @ts-ignore
      addClass(parentElement, showClass);

      element.setAttribute(ariaExpanded, 'true');
      self.open = !open;

      setTimeout(() => {
        setFocus(element); // focus the element
        toggleDropdownDismiss(self);
        // @ts-ignore
        parentElement.dispatchEvent(shownDropdownEvent);
      }, 1);
    }

    /** Hides the dropdown menu from the user. */
    hide() {
      const self = this;
      const { element, menu, open } = self;
      const { parentElement } = element;
      // @ts-ignore
      [hideDropdownEvent, hiddenDropdownEvent].forEach((e) => { e.relatedTarget = element; });

      // @ts-ignore
      parentElement.dispatchEvent(hideDropdownEvent);
      if (hideDropdownEvent.defaultPrevented) return;

      removeClass(menu, showClass);
      // @ts-ignore
      removeClass(parentElement, showClass);

      // revert to original position
      styleDropdown(self);

      element.setAttribute(ariaExpanded, 'false');
      self.open = !open;

      // only re-attach handler if the instance is not disposed
      setTimeout(() => toggleDropdownDismiss(self), 1);

      // @ts-ignore
      parentElement.dispatchEvent(hiddenDropdownEvent);
    }

    /** Removes the `Dropdown` component from the target element. */
    dispose() {
      const self = this;
      const { element } = self;

      // @ts-ignore
      if (hasClass(element.parentNode, showClass) && self.open) self.hide();

      toggleDropdownHandler(self);

      super.dispose();
    }
  }

  Object.assign(Dropdown, {
    selector: dropdownSelector,
    init: dropdownInitCallback,
    getInstance: getDropdownInstance,
  });

  return Dropdown;

}));
