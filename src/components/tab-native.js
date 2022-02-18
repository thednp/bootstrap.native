/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import ariaSelected from 'shorter-js/src/strings/ariaSelected';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import closest from 'shorter-js/src/selectors/closest';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import querySelector from 'shorter-js/src/selectors/querySelector';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import reflow from 'shorter-js/src/misc/reflow';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import { getInstance } from 'shorter-js/src/misc/data';
import Timer from 'shorter-js/src/misc/timer';
import OriginalEvent from 'shorter-js/src/misc/OriginalEvent';

import { addListener, removeListener } from 'event-listener.js';

import collapsingClass from '../strings/collapsingClass';
import activeClass from '../strings/activeClass';
import fadeClass from '../strings/fadeClass';
import showClass from '../strings/showClass';
import dropdownClasses from '../strings/dropdownClasses';
import dropdownMenuClass from '../strings/dropdownMenuClass';
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
 * @type {Map<(HTMLElement | Element), any>}
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

  if (tabContent) {
    // @ts-ignore
    if (hasClass(tabContent, collapsingClass)) {
      tabContent.style.height = '';
      removeClass(tabContent, collapsingClass);
    }
  }

  if (nav) Timer.clear(nav);
}

/**
 * Executes before showing the tab content.
 * @param {Tab} self the `Tab` instance
 */
function triggerTabShow(self) {
  const { element, tabContent, nav } = self;
  const { currentHeight, nextHeight } = tabPrivate.get(element);
  const { tab, content } = nav && tabPrivate.get(nav);

  if (tabContent && !hasClass(content, fadeClass)) { // height animation if no fade class
    if (currentHeight === nextHeight) {
      triggerTabEnd(self);
    } else {
      setTimeout(() => { // enables height animation
        // @ts-ignore
        tabContent.style.height = `${nextHeight}px`; // height animation
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

  if (tabContent) {
    [content, nextContent].forEach((c) => addClass(c, 'overflow-hidden'));
    currentHeight = content.scrollHeight;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = tab;
  hiddenTabEvent.relatedTarget = element;
  dispatchEvent(element, showTabEvent);
  if (showTabEvent.defaultPrevented) return;

  addClass(nextContent, activeClass);
  removeClass(content, activeClass);

  if (tabContent) {
    const nextHeight = nextContent.scrollHeight;
    tabPrivate.set(element, { currentHeight, nextHeight });

    // Height animation if no fade animation
    if(!hasClass(content, fadeClass)) {
      addClass(tabContent, collapsingClass);
      // @ts-ignore -- height animation
      tabContent.style.height = `${currentHeight}px`;
      reflow(tabContent);
    }
  
    [content, nextContent].forEach((c) => removeClass(c, 'overflow-hidden'));
  }

  if (nextContent && hasClass(nextContent, fadeClass)) {
    setTimeout(() => {
      addClass(nextContent, showClass);
      emulateTransitionEnd(nextContent, () => {
        triggerTabShow(self);
      });
    }, 17);
  } else { triggerTabShow(self); }

  dispatchEvent(tab, hiddenTabEvent);
}

/**
 * Returns the current active tab and its target content.
 * @param {Tab} self the `Tab` instance
 * @returns {Record<string, any>} the query result
 */
function getActiveTab(self) {
  const { nav } = self;

  // @ts-ignore
  const activeTabs = getElementsByClassName(activeClass, nav);
  /** @type {(HTMLElement | Element)=} */
  let tab;
  if (activeTabs.length === 1
    // @ts-ignore
    && !dropdownClasses.some((c) => hasClass(activeTabs[0].parentElement, c))) {
    [tab] = activeTabs;
  } else if (activeTabs.length > 1) {
    tab = activeTabs[activeTabs.length - 1];
  }
  const content = tab ? getTargetElement(tab) : null;
  // @ts-ignore
  return { tab, content };
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
 * @this {HTMLElement | Element}
 * @param {MouseEvent} e the `Event` object
 */
function tabClickHandler(e) {
  const self = getTabInstance(this);
  if (!self) return;
  e.preventDefault();

  self.show();
}

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
export default class Tab extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target the target element
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

    /** @type {(HTMLElement | Element)?} */
    self.nav = nav;
    /** @type {HTMLElement | Element} */
    self.content = content;
    /** @type {(HTMLElement | Element)?} */
    self.tabContent = container;

    // event targets
    /** @type {(HTMLElement | Element)?} */
    self.dropdown = nav && querySelector(`.${dropdownClasses[0]}-toggle`, nav);

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
  show() {
    const self = this;
    const { element, nav, dropdown } = self;

    if (!(nav && Timer.get(nav)) && !hasClass(element, activeClass)) {
      const { tab, content } = getActiveTab(self);

      if (nav) tabPrivate.set(nav, { tab, content });

      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = element;
      dispatchEvent(tab, hideTabEvent);
      if (hideTabEvent.defaultPrevented) return;

      if (nav) Timer.set(nav, () => {}, 17);
      removeClass(tab, activeClass);
      setAttribute(tab, ariaSelected, 'false');
      addClass(element, activeClass);
      setAttribute(element, ariaSelected, 'true');

      if (dropdown) {
        // @ts-ignore
        if (!hasClass(element.parentNode, dropdownMenuClass)) {
          if (hasClass(dropdown, activeClass)) removeClass(dropdown, activeClass);
        } else if (!hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
      }

      if (hasClass(content, fadeClass)) {
        removeClass(content, showClass);
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
});
