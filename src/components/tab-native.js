/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import ariaSelected from '@thednp/shorty/src/strings/ariaSelected';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import closest from '@thednp/shorty/src/selectors/closest';
import getElementsByClassName from '@thednp/shorty/src/selectors/getElementsByClassName';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import reflow from '@thednp/shorty/src/misc/reflow';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import { getInstance } from '@thednp/shorty/src/misc/data';
import Timer from '@thednp/shorty/src/misc/timer';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

import collapsingClass from '../strings/collapsingClass';
import activeClass from '../strings/activeClass';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dropdownClasses from '../strings/dropdownClasses';
import dataBsToggle from '../strings/dataBsToggle';
import tabString from '../strings/tabString';
import tabComponent from '../strings/tabComponent';

import getTargetElement from '../util/getTargetElement';
import BaseComponent from './base-component';

// TAB PRIVATE GC
// ================
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
const showTabEvent = OriginalEvent(`show.bs.${tabString}`);
const shownTabEvent = OriginalEvent(`shown.bs.${tabString}`);
const hideTabEvent = OriginalEvent(`hide.bs.${tabString}`);
const hiddenTabEvent = OriginalEvent(`hidden.bs.${tabString}`);

/**
 * Stores the current active tab and its content
 * for a given `.nav` element.
 * @type {Map<HTMLElement, any>}
 */
const tabPrivate = new Map();

// TAB PRIVATE METHODS
// ===================
/**
 * Executes after tab transition has finished.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabEnd(self) {
  const { tabContent, nav } = self;

  /* istanbul ignore else */
  if (tabContent && hasClass(tabContent, collapsingClass)) {
    tabContent.style.height = '';
    removeClass(tabContent, collapsingClass);
  }

  /* istanbul ignore else */
  if (nav) Timer.clear(nav);
}

/**
 * Executes before showing the tab content.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabShow(self) {
  const {
    element, tabContent, content: nextContent, nav,
  } = self;
  const { tab } = nav && tabPrivate.get(nav);

  /* istanbul ignore else */
  if (tabContent && hasClass(nextContent, fadeClass)) {
    const { currentHeight, nextHeight } = tabPrivate.get(element);
    if (currentHeight === nextHeight) {
      triggerTabEnd(self);
    } else {
      // enables height animation
      setTimeout(() => {
        tabContent.style.height = `${nextHeight}px`;
        reflow(tabContent);
        emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
      }, 50);
    }
  } else if (nav) Timer.clear(nav);

  shownTabEvent.relatedTarget = tab;
  dispatchEvent(element, shownTabEvent);
}

/**
 * Executes before hiding the tab.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabHide(self) {
  const {
    element, content: nextContent, tabContent, nav,
  } = self;
  const { tab, content } = nav && tabPrivate.get(nav);
  let currentHeight = 0;

  /* istanbul ignore else */
  if (tabContent && hasClass(nextContent, fadeClass)) {
    [content, nextContent].forEach((c) => {
      addClass(c, 'overflow-hidden');
    });
    currentHeight = content.scrollHeight || /* istanbul ignore next */0;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = tab;
  hiddenTabEvent.relatedTarget = element;
  dispatchEvent(element, showTabEvent);
  if (showTabEvent.defaultPrevented) return;

  addClass(nextContent, activeClass);
  removeClass(content, activeClass);

  /* istanbul ignore else */
  if (tabContent && hasClass(nextContent, fadeClass)) {
    const nextHeight = nextContent.scrollHeight;
    tabPrivate.set(element, { currentHeight, nextHeight });

    addClass(tabContent, collapsingClass);
    tabContent.style.height = `${currentHeight}px`;
    reflow(tabContent);
    [content, nextContent].forEach((c) => {
      removeClass(c, 'overflow-hidden');
    });
  }

  if (nextContent && hasClass(nextContent, fadeClass)) {
    setTimeout(() => {
      addClass(nextContent, showClass);
      emulateTransitionEnd(nextContent, () => {
        triggerTabShow(self);
      });
    }, 1);
  } else {
    addClass(nextContent, showClass);
    triggerTabShow(self);
  }

  dispatchEvent(tab, hiddenTabEvent);
}

/**
 * Returns the current active tab and its target content.
 * @param {Tab} self the `Tab` instance
 * @returns {Record<string, any>} the query result
 */
function getActiveTab(self) {
  const { nav } = self;

  const activeTabs = getElementsByClassName(activeClass, nav);
  /** @type {(HTMLElement)=} */
  let tab;
  /* istanbul ignore else */
  if (activeTabs.length === 1
    && !dropdownClasses.some((c) => hasClass(activeTabs[0].parentElement, c))) {
    [tab] = activeTabs;
  } else if (activeTabs.length > 1) {
    tab = activeTabs[activeTabs.length - 1];
  }
  const content = tab ? getTargetElement(tab) : null;
  return { tab, content };
}

/**
 * Returns a parent dropdown.
 * @param {HTMLElement} element the `Tab` element
 * @returns {HTMLElement?} the parent dropdown
 */
function getParentDropdown(element) {
  const dropdown = closest(element, `.${dropdownClasses.join(',.')}`);
  return dropdown ? querySelector(`.${dropdownClasses[0]}-toggle`, dropdown) : null;
}

/**
 * Toggles on/off the `click` event listener.
 * @param {Tab} self the `Tab` instance
 * @param {boolean=} add when `true`, event listener is added
 */
function toggleTabHandler(self, add) {
  const action = add ? addListener : removeListener;
  action(self.element, mouseclickEvent, tabClickHandler);
}

// TAB EVENT HANDLER
// =================
/**
 * Handles the `click` event listener.
 * @this {HTMLElement}
 * @param {MouseEvent} e the `Event` object
 */
function tabClickHandler(e) {
  const self = getTabInstance(this);
  /* istanbul ignore next: must filter */
  if (!self) return;
  e.preventDefault();

  self.show();
}

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
export default class Tab extends BaseComponent {
  /**
   * @param {HTMLElement | string} target the target element
   */
  constructor(target) {
    super(target);
    // bind
    const self = this;

    // initialization element
    const { element } = self;
    const content = getTargetElement(element);

    // no point initializing a tab without a corresponding content
    if (!content) return;

    const nav = closest(element, '.nav');
    const container = closest(content, '.tab-content');

    /** @type {HTMLElement?} */
    self.nav = nav;
    /** @type {HTMLElement} */
    self.content = content;
    /** @type {HTMLElement?} */
    self.tabContent = container;

    // event targets
    /** @type {HTMLElement?} */
    self.dropdown = getParentDropdown(element);

    // show first Tab instance of none is shown
    // suggested on #432
    const { tab } = getActiveTab(self);
    if (nav && !tab) {
      const firstTab = querySelector(tabSelector, nav);
      const firstTabContent = firstTab && getTargetElement(firstTab);

      /* istanbul ignore else */
      if (firstTabContent) {
        addClass(firstTab, activeClass);
        addClass(firstTabContent, showClass);
        addClass(firstTabContent, activeClass);
        setAttribute(element, ariaSelected, 'true');
      }
    }

    // add event listener
    toggleTabHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */  
  get name() { return tabComponent; }
  /* eslint-enable */

  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const self = this;
    const {
      element, content: nextContent, nav, dropdown,
    } = self;

    /* istanbul ignore else */
    if (!(nav && Timer.get(nav)) && !hasClass(element, activeClass)) {
      const { tab, content } = getActiveTab(self);

      /* istanbul ignore else */
      if (nav) tabPrivate.set(nav, { tab, content });

      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = element;

      dispatchEvent(tab, hideTabEvent);
      if (hideTabEvent.defaultPrevented) return;

      addClass(element, activeClass);
      setAttribute(element, ariaSelected, 'true');

      const activeDropdown = getParentDropdown(tab);
      if (activeDropdown && hasClass(activeDropdown, activeClass)) {
        removeClass(activeDropdown, activeClass);
      }

      /* istanbul ignore else */
      if (nav) {
        const toggleTab = () => {
          removeClass(tab, activeClass);
          setAttribute(tab, ariaSelected, 'false');
          if (dropdown && !hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
        };

        if (hasClass(content, fadeClass) || hasClass(nextContent, fadeClass)) {
          Timer.set(nav, toggleTab, 1);
        } else toggleTab();
      }

      removeClass(content, showClass);
      if (hasClass(content, fadeClass)) {
        emulateTransitionEnd(content, () => triggerTabHide(self));
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

ObjectAssign(Tab, {
  selector: tabSelector,
  init: tabInitCallback,
  getInstance: getTabInstance,
});
