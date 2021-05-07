/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import supportTransition from 'shorter-js/src/boolean/supportTransition.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import reflow from 'shorter-js/src/misc/reflow.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import ariaSelected from '../strings/ariaSelected.js';
import collapsingClass from '../strings/collapsingClass.js';
import activeClass from '../strings/activeClass.js';
import fadeClass from '../strings/fadeClass.js';
import showClass from '../strings/showClass.js';
import dropdownClasses from '../strings/dropdownClasses.js';
import dropdownMenuClass from '../strings/dropdownMenuClass.js';
import dataBsToggle from '../strings/dataBsToggle.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import BaseComponent from './base-component.js';

// TAB PRIVATE GC
// ================
const tabString = 'tab';
const tabComponent = 'Tab';
const tabSelector = `[${dataBsToggle}="${tabString}"]`;

// TAB CUSTOM EVENTS
// =================
const showTabEvent = bootstrapCustomEvent(`show.bs.${tabString}`);
const shownTabEvent = bootstrapCustomEvent(`shown.bs.${tabString}`);
const hideTabEvent = bootstrapCustomEvent(`hide.bs.${tabString}`);
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
function triggerTabEnd(self) {
  const { tabContent, nav } = self;
  tabContent.style.height = '';
  removeClass(tabContent, collapsingClass);
  nav.isAnimating = false;
}

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

function getActiveTabContent(self) {
  return queryElement(getActiveTab(self).getAttribute('href'));
}

function toggleTabHandler(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.element[action]('click', tabClickHandler);
}

// TAB EVENT HANDLER
// =================
function tabClickHandler(e) {
  const self = this[tabComponent];
  e.preventDefault();
  if (!self.nav.isAnimating) self.show();
}

// TAB DEFINITION
// ==============
export default class Tab extends BaseComponent {
  constructor(target) {
    super(tabComponent, target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;

    // event targets
    self.nav = element.closest('.nav');
    const { nav } = self;
    self.dropdown = nav && queryElement(`.${dropdownClasses[0]}-toggle`, nav);
    activeTabContent = getActiveTabContent(self);
    self.tabContent = supportTransition && activeTabContent.closest('.tab-content');
    tabContainerHeight = activeTabContent.scrollHeight;

    // set default animation state
    nav.isAnimating = false;

    // add event listener
    toggleTabHandler(self, 1);
  }

  // TAB PUBLIC METHODS
  // ==================
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

  dispose() {
    toggleTabHandler(this);
    super.dispose(tabComponent);
  }
}

Tab.init = {
  component: tabComponent,
  selector: tabSelector,
  constructor: Tab,
};
