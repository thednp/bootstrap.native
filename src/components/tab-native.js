/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import supportTransition from 'shorter-js/src/boolean/supportTransition';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import reflow from 'shorter-js/src/misc/reflow';
import queryElement from 'shorter-js/src/misc/queryElement';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import ariaSelected from 'shorter-js/src/strings/ariaSelected';
import { getInstance } from 'shorter-js/src/misc/data';

import collapsingClass from '../strings/collapsingClass';
import activeClass from '../strings/activeClass';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dropdownClasses from '../strings/dropdownClasses';
import dropdownMenuClass from '../strings/dropdownMenuClass';
import dataBsToggle from '../strings/dataBsToggle';
// import dataBsTarget from '../strings/dataBsTarget';
import getTargetElement from '../util/getTargetElement';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import BaseComponent from './base-component';

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

/**
 * A `Tab` initialization callback.
 * @type {BSN.InitCallback<Tab>}
 */
const tabInitCallback = (element) => new Tab(element);

// TAB CUSTOM EVENTS
// =================
const showTabEvent = bootstrapCustomEvent(`show.bs.${tabString}`);
const shownTabEvent = bootstrapCustomEvent(`shown.bs.${tabString}`);
const hideTabEvent = bootstrapCustomEvent(`hide.bs.${tabString}`);
const hiddenTabEvent = bootstrapCustomEvent(`hidden.bs.${tabString}`);

/** @type {Element} */
let nextTab;
/** @type {Element} */
let nextTabContent;
/** @type {number} */
let nextTabHeight;
/** @type {Element} */
let activeTab;
/** @type {Element} */
let activeTabContent;
/** @type {number} */
let tabContainerHeight;
/** @type {boolean} */
let tabEqualContents;

// TAB PRIVATE METHODS
// ===================
/**
 * Executes after tab transition has finished.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabEnd(self) {
  // @ts-ignore
  const { tabContent, nav } = self;
  // @ts-ignore
  tabContent.style.height = '';
  // @ts-ignore
  removeClass(tabContent, collapsingClass);
  // @ts-ignore
  nav.isAnimating = false;
}

/**
 * Executes before showing the tab content.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabShow(self) {
  // @ts-ignore
  const { tabContent, nav } = self;

  if (tabContent) { // height animation
    if (tabEqualContents) {
      triggerTabEnd(self);
    } else {
      setTimeout(() => { // enables height animation
        // @ts-ignore
        tabContent.style.height = `${nextTabHeight}px`; // height animation
        reflow(tabContent);
        emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
      }, 50);
    }
  } else {
    // @ts-ignore
    nav.isAnimating = false;
  }
  // @ts-ignore
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
    // @ts-ignore
    activeTabContent.style.float = 'left';
    // @ts-ignore
    nextTabContent.style.float = 'left';
    tabContainerHeight = activeTabContent.scrollHeight;
  }

  // update relatedTarget and dispatch event
  // @ts-ignore
  showTabEvent.relatedTarget = activeTab;
  // @ts-ignore
  hiddenTabEvent.relatedTarget = nextTab;
  nextTab.dispatchEvent(showTabEvent);
  if (showTabEvent.defaultPrevented) return;

  addClass(nextTabContent, activeClass);
  removeClass(activeTabContent, activeClass);

  if (tabContent) {
    nextTabHeight = nextTabContent.scrollHeight;
    tabEqualContents = nextTabHeight === tabContainerHeight;
    addClass(tabContent, collapsingClass);
    // @ts-ignore
    tabContent.style.height = `${tabContainerHeight}px`; // height animation
    reflow(tabContent);
    // @ts-ignore
    activeTabContent.style.float = '';
    // @ts-ignore
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
 * @param {{nav: Element}} self the `Tab` instance
 * @returns {Element} the query result
 */
function getActiveTab({ nav }) {
  const activeTabs = nav.getElementsByClassName(activeClass);

  if (activeTabs.length === 1
    // @ts-ignore
    && !dropdownClasses.some((c) => hasClass(activeTabs[0].parentNode, c))) {
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
  // @ts-ignore
  activeTab = getActiveTab(self);
  // return queryElement(activeTab.getAttribute('href')
  //   || activeTab.getAttribute(dataBsTarget));
  // @ts-ignore
  return getTargetElement(activeTab);
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Tab} self the `Tab` instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleTabHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  self.element[action]('click', tabClickHandler);
}

// TAB EVENT HANDLER
// =================
/**
 * Handles the `click` event listener.
 * @this {Element}
 * @param {Event} e the `Event` object
 */
function tabClickHandler(e) {
  const self = getTabInstance(this);
  e.preventDefault();
  // @ts-ignore
  if (!self.nav.isAnimating) self.show();
}

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
export default class Tab extends BaseComponent {
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
    /** @private @type {Element?} */
    self.nav = element.closest('.nav');
    const { nav } = self;
    /** @private @type {Element?} */
    self.dropdown = nav && queryElement(`.${dropdownClasses[0]}-toggle`, nav);
    activeTabContent = getActiveTabContent(self);
    self.tabContent = supportTransition && activeTabContent.closest('.tab-content');
    tabContainerHeight = activeTabContent.scrollHeight;

    // set default animation state
    // @ts-ignore
    nav.isAnimating = false;

    // add event listener
    toggleTabHandler(self, true);
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
      // @ts-ignore
      nextTabContent = queryElement(nextTab.getAttribute('href'));
      // @ts-ignore
      activeTab = getActiveTab({ nav });
      // @ts-ignore
      activeTabContent = getActiveTabContent({ nav });

      // update relatedTarget and dispatch
      // @ts-ignore
      hideTabEvent.relatedTarget = nextTab;
      activeTab.dispatchEvent(hideTabEvent);
      if (hideTabEvent.defaultPrevented) return;

      // @ts-ignore
      nav.isAnimating = true;
      removeClass(activeTab, activeClass);
      activeTab.setAttribute(ariaSelected, 'false');
      addClass(nextTab, activeClass);
      nextTab.setAttribute(ariaSelected, 'true');

      if (dropdown) {
        // @ts-ignore
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
  init: tabInitCallback,
  getInstance: getTabInstance,
});
