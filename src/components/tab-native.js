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
import dataBsTarget from '../strings/dataBsTarget';

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
  activeTab = getActiveTab(self);
  return queryElement(activeTab.getAttribute('href')
    || activeTab.getAttribute(dataBsTarget));
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
    /** @private @type {Element} */
    self.nav = element.closest('.nav');
    const { nav } = self;
    /** @private @type {Element} */
    self.dropdown = nav && queryElement(`.${dropdownClasses[0]}-toggle`, nav);
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
  init: tabInitCallback,
  getInstance: getTabInstance,
});
