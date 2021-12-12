/*!
  * Native JavaScript for Bootstrap Tab v4.1.0 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2021 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
/**
 * A global namespace for CSS3 transition support.
 * @type {boolean}
 */
const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

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
 * A global namespace for aria-selected.
 * @type {string}
 */
const ariaSelected = 'aria-selected';

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
 * Global namespace for most components `collapsing` class.
 * As used by `Collapse` / `Tab`.
 */
const collapsingClass = 'collapsing';

/**
 * Global namespace for most components active class.
 */
const activeClass = 'active';

/**
 * Global namespace for most components `fade` class.
 */
const fadeClass = 'fade';

/**
 * Global namespace for most components `show` class.
 */
const showClass = 'show';

/**
 * Global namespace for `Dropdown` types / classes.
 */
const dropdownMenuClasses = ['dropdown', 'dropup', 'dropstart', 'dropend'];

/**
 * Global namespace for `.dropdown-menu`.
 */
const dropdownMenuClass = 'dropdown-menu';

/**
 * Global namespace for most components `toggle` option.
 */
const dataBsToggle = 'data-bs-toggle';

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

/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */

// TAB PRIVATE GC
// ================
const tabString = 'tab';
const tabComponent = 'Tab';
const tabSelector = `[${dataBsToggle}="${tabString}"]`;

/**
 * Static method which returns an existing `Tab` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Tab>}
 */
const getTabInstance = (element) => getInstance(element, tabComponent);

// TAB CUSTOM EVENTS
// =================
/** @type {BSN.TabEvent.show} */
const showTabEvent = bootstrapCustomEvent(`show.bs.${tabString}`);
/** @type {BSN.TabEvent.shown} */
const shownTabEvent = bootstrapCustomEvent(`shown.bs.${tabString}`);
/** @type {BSN.TabEvent.hide} */
const hideTabEvent = bootstrapCustomEvent(`hide.bs.${tabString}`);
/** @type {BSN.TabEvent.hidden} */
const hiddenTabEvent = bootstrapCustomEvent(`hidden.bs.${tabString}`);

let nextTab;
let nextTabContent;
let nextTabHeight;
let activeTab;
let activeTabContent;
let tabContainerHeight;
let tabEqualContents;

// TAB PRIVATE METHODS
// ===================
/**
 * Executes after tab transition has finished.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabEnd(self) {
  const { tabContent, nav } = self;
  tabContent.style.height = '';
  removeClass(tabContent, collapsingClass);
  nav.isAnimating = false;
}

/**
 * Executes before showing the tab content.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabShow(self) {
  const { tabContent, nav } = self;

  if (tabContent) { // height animation
    if (tabEqualContents) {
      triggerTabEnd(self);
    } else {
      setTimeout(() => { // enables height animation
        tabContent.style.height = `${nextTabHeight}px`; // height animation
        reflow(tabContent);
        emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
      }, 50);
    }
  } else {
    nav.isAnimating = false;
  }
  shownTabEvent.relatedTarget = activeTab;
  nextTab.dispatchEvent(shownTabEvent);
}

/**
 * Executes before hiding the tab.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabHide(self) {
  const { tabContent } = self;
  if (tabContent) {
    activeTabContent.style.float = 'left';
    nextTabContent.style.float = 'left';
    tabContainerHeight = activeTabContent.scrollHeight;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = activeTab;
  hiddenTabEvent.relatedTarget = nextTab;
  nextTab.dispatchEvent(showTabEvent);
  if (showTabEvent.defaultPrevented) return;

  addClass(nextTabContent, activeClass);
  removeClass(activeTabContent, activeClass);

  if (tabContent) {
    nextTabHeight = nextTabContent.scrollHeight;
    tabEqualContents = nextTabHeight === tabContainerHeight;
    addClass(tabContent, collapsingClass);
    tabContent.style.height = `${tabContainerHeight}px`; // height animation
    reflow(tabContent);
    activeTabContent.style.float = '';
    nextTabContent.style.float = '';
  }

  if (hasClass(nextTabContent, fadeClass)) {
    setTimeout(() => {
      addClass(nextTabContent, showClass);
      emulateTransitionEnd(nextTabContent, () => {
        triggerTabShow(self);
      });
    }, 20);
  } else { triggerTabShow(self); }

  activeTab.dispatchEvent(hiddenTabEvent);
}

/**
 * Returns the current active tab.
 * @param {Tab} self the `Tab` instance
 * @returns {Element} the query result
 */
function getActiveTab({ nav }) {
  const activeTabs = nav.getElementsByClassName(activeClass);

  if (activeTabs.length === 1
    && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentNode, c))) {
    [activeTab] = activeTabs;
  } else if (activeTabs.length > 1) {
    activeTab = activeTabs[activeTabs.length - 1];
  }
  return activeTab;
}

/**
 * Returns the current active tab content.
 * @param {Tab} self the `Tab` instance
 * @returns {Element} the query result
 */
function getActiveTabContent(self) {
  return queryElement(getActiveTab(self).getAttribute('href')
    || getActiveTab(self).getAttribute(dataBsToggle));
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Tab} self the `Tab` instance
 * @returns {Element} the query result
 */
function toggleTabHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', tabClickHandler);
}

// TAB EVENT HANDLER
// =================
/**
 * Handles the `click` event listener.
 * @param {Event} e the `Event` object
 */
function tabClickHandler(e) {
  const self = getTabInstance(this);
  e.preventDefault();
  if (!self.nav.isAnimating) self.show();
}

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
class Tab extends BaseComponent {
  /**
   * @param {Element | string} target the target element
   */
  constructor(target) {
    super(target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // event targets
    /** @private @type {Element} */
    self.nav = element.closest('.nav');
    const { nav } = self;
    /** @private @type {Element} */
    self.dropdown = nav && queryElement(`.${dropdownMenuClasses[0]}-toggle`, nav);
    activeTabContent = getActiveTabContent(self);
    self.tabContent = supportTransition && activeTabContent.closest('.tab-content');
    tabContainerHeight = activeTabContent.scrollHeight;

    // set default animation state
    nav.isAnimating = false;

    // add event listener
    toggleTabHandler(self, 1);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */  
  get name() { return tabComponent; }
  /* eslint-enable */

  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() { // the tab we clicked is now the nextTab tab
    const self = this;
    const { element, nav, dropdown } = self;
    nextTab = element;
    if (!hasClass(nextTab, activeClass)) {
      // this is the actual object, the nextTab tab content to activate
      nextTabContent = queryElement(nextTab.getAttribute('href'));
      activeTab = getActiveTab({ nav });
      activeTabContent = getActiveTabContent({ nav });

      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = nextTab;
      activeTab.dispatchEvent(hideTabEvent);
      if (hideTabEvent.defaultPrevented) return;

      nav.isAnimating = true;
      removeClass(activeTab, activeClass);
      activeTab.setAttribute(ariaSelected, 'false');
      addClass(nextTab, activeClass);
      nextTab.setAttribute(ariaSelected, 'true');

      if (dropdown) {
        if (!hasClass(element.parentNode, dropdownMenuClass)) {
          if (hasClass(dropdown, activeClass)) removeClass(dropdown, activeClass);
        } else if (!hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
      }

      if (hasClass(activeTabContent, fadeClass)) {
        removeClass(activeTabContent, showClass);
        emulateTransitionEnd(activeTabContent, () => triggerTabHide(self));
      } else {
        triggerTabHide(self);
      }
    }
  }

  /** Removes the `Tab` component from the target element. */
  dispose() {
    toggleTabHandler(this);
    super.dispose();
  }
}

Object.assign(Tab, {
  selector: tabSelector,
  /**
   * A `Tab` initialization callback.
   * @type {BSN.InitCallback<Tab>}
   */
  callback: (element) => new Tab(element),
  getInstance: getTabInstance,
});

export { Tab as default };
