/* Native JavaScript for Bootstrap 5 | Tab
------------------------------------------ */
import {
  emulateTransitionEnd,
  dispatchEvent,
  removeClass,
  hasClass,
  addClass,
  querySelector,
  getElementsByClassName,
  closest,
  setAttribute,
  mouseclickEvent,
  createCustomEvent,
  Timer,
  getInstance,
  ariaSelected,
  reflow,
  isHTMLElement,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

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
import type { /* TabOptions, */ TabEvent } from '../interface/tab';

// TAB PRIVATE GC
// ================
const tabSelector = `[${dataBsToggle}="${tabString}"]`;

/**
 * Static method which returns an existing `Tab` instance associated
 * to a target `Element`.
 */
const getTabInstance = (element: HTMLElement) => getInstance<Tab>(element, tabComponent);

/** A `Tab` initialization callback. */
const tabInitCallback = (element: HTMLElement) => new Tab(element);

// TAB CUSTOM EVENTS
// =================
const showTabEvent = createCustomEvent<TabEvent>(`show.bs.${tabString}`);
const shownTabEvent = createCustomEvent<TabEvent>(`shown.bs.${tabString}`);
const hideTabEvent = createCustomEvent<TabEvent>(`hide.bs.${tabString}`);
const hiddenTabEvent = createCustomEvent<TabEvent>(`hidden.bs.${tabString}`);

interface TabPrivate {
  tab: HTMLElement | null;
  content: HTMLElement | null;
  currentHeight: number;
  nextHeight: number;
}

/**
 * Stores the current active tab and its content
 * for a given `.nav` element.
 */
const tabPrivate: Map<HTMLElement, TabPrivate> = new Map();

// TAB PRIVATE METHODS
// ===================
/**
 * Executes after tab transition has finished.
 *
 * @param self the `Tab` instance
 */
const triggerTabEnd = (self: Tab) => {
  const { tabContent, nav } = self;

  /* istanbul ignore else */
  if (tabContent && hasClass(tabContent, collapsingClass)) {
    tabContent.style.height = '';
    removeClass(tabContent, collapsingClass);
  }

  /* istanbul ignore else */
  if (nav) Timer.clear(nav);
};

/**
 * Executes before showing the tab content.
 *
 * @param self the `Tab` instance
 */
const triggerTabShow = (self: Tab) => {
  const { element, tabContent, content: nextContent, nav } = self;
  const { tab } = (isHTMLElement(nav) && tabPrivate.get(nav)) || /* istanbul ignore next */ { tab: null };

  /* istanbul ignore else */
  if (tabContent && nextContent && hasClass(nextContent, fadeClass)) {
    const { currentHeight, nextHeight } = tabPrivate.get(element) || /* istanbul ignore next */ {
      currentHeight: 0,
      nextHeight: 0,
    };
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

  shownTabEvent.relatedTarget = tab as HTMLElement | undefined;

  dispatchEvent(element, shownTabEvent);
};

/**
 * Executes before hiding the tab.
 *
 * @param self the `Tab` instance
 */
const triggerTabHide = (self: Tab) => {
  const { element, content: nextContent, tabContent, nav } = self;
  const { tab, content } = (nav && tabPrivate.get(nav)) || /* istanbul ignore next */ { tab: null, content: null };
  let currentHeight = 0;

  /* istanbul ignore else */
  if (tabContent && nextContent && hasClass(nextContent, fadeClass)) {
    [content, nextContent].forEach(c => {
      if (isHTMLElement(c)) addClass(c, 'overflow-hidden');
    });
    currentHeight = isHTMLElement(content) ? content.scrollHeight : /* istanbul ignore next */ 0;
  }

  // update relatedTarget and dispatch event
  showTabEvent.relatedTarget = tab as HTMLElement | undefined;
  hiddenTabEvent.relatedTarget = element;
  dispatchEvent(element, showTabEvent);

  if (!showTabEvent.defaultPrevented) {
    if (nextContent) addClass(nextContent, activeClass);
    if (content) removeClass(content, activeClass);

    /* istanbul ignore else */
    if (tabContent && nextContent && hasClass(nextContent, fadeClass)) {
      const nextHeight = nextContent.scrollHeight;
      tabPrivate.set(element, { currentHeight, nextHeight, tab: null, content: null });

      addClass(tabContent, collapsingClass);
      tabContent.style.height = `${currentHeight}px`;
      reflow(tabContent);
      [content, nextContent].forEach(c => {
        if (c) removeClass(c, 'overflow-hidden');
      });
    }

    if (nextContent && nextContent && hasClass(nextContent, fadeClass)) {
      setTimeout(() => {
        addClass(nextContent, showClass);
        emulateTransitionEnd(nextContent, () => {
          triggerTabShow(self);
        });
      }, 1);
    } else {
      if (nextContent) addClass(nextContent, showClass);
      triggerTabShow(self);
    }

    if (tab) dispatchEvent(tab, hiddenTabEvent);
  }
};

/**
 * Returns the current active tab and its target content.
 *
 * @param self the `Tab` instance
 * @returns the query result
 */
const getActiveTab = (self: Tab): { tab: HTMLElement | null; content: HTMLElement | null } => {
  const { nav } = self;
  /* istanbul ignore next */
  if (!isHTMLElement(nav as HTMLElement | undefined)) return { tab: null, content: null };

  const activeTabs = getElementsByClassName(activeClass, nav as HTMLElement);
  let tab: HTMLElement | null = null;
  /* istanbul ignore else */
  if (activeTabs.length === 1 && !dropdownClasses.some(c => hasClass(activeTabs[0].parentElement as HTMLElement, c))) {
    [tab] = activeTabs;
  } else if (activeTabs.length > 1) {
    tab = activeTabs[activeTabs.length - 1];
  }
  const content = isHTMLElement(tab as HTMLElement) ? getTargetElement(tab as HTMLElement) : null;
  return { tab, content };
};

/**
 * Returns a parent dropdown.
 *
 * @param element the `Tab` element
 * @returns the parent dropdown
 */
const getParentDropdown = (element?: HTMLElement): HTMLElement | null => {
  /* istanbul ignore next */
  if (!isHTMLElement(element)) return null;
  const dropdown = closest(element, `.${dropdownClasses.join(',.')}`);
  return dropdown ? querySelector(`.${dropdownClasses[0]}-toggle`, dropdown) : null;
};

// TAB EVENT HANDLER
// =================
/**
 * Handles the `click` event listener.
 *
 * @param e the `Event` object
 */
const tabClickHandler = (e: Event) => {
  const self = getTabInstance(e.target as HTMLElement);

  /* istanbul ignore else */
  if (self) {
    e.preventDefault();
    self.show();
  }
};

// TAB DEFINITION
// ==============
/** Creates a new `Tab` instance. */
export default class Tab extends BaseComponent {
  static selector = tabSelector;
  static init = tabInitCallback;
  static getInstance = getTabInstance;
  declare nav: HTMLElement | null;
  declare content: HTMLElement | null;
  declare tabContent: HTMLElement | null;
  declare nextContent: HTMLElement | null;
  declare dropdown: HTMLElement | null;

  /** @param target the target element */
  constructor(target: HTMLElement | string) {
    super(target);

    // initialization element
    const { element } = this;
    const content = getTargetElement(element);

    // no point initializing a tab without a corresponding content
    /* istanbul ignore else */
    if (content) {
      const nav = closest(element, '.nav');
      const container = closest(content, '.tab-content');

      this.nav = nav;
      this.content = content;
      this.tabContent = container;

      // event targets
      this.dropdown = getParentDropdown(element);

      // show first Tab instance of none is shown
      // suggested on #432
      const { tab } = getActiveTab(this);
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
      this._toggleEventListeners(true);
    }
  }

  /**
   * Returns component name string.
   */
  get name() {
    return tabComponent;
  }

  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element, content: nextContent, nav, dropdown } = this;

    /* istanbul ignore else */
    if (!(nav && Timer.get(nav)) && !hasClass(element, activeClass)) {
      const { tab, content } = getActiveTab(this);

      /* istanbul ignore else */
      if (nav) tabPrivate.set(nav, { tab, content, currentHeight: 0, nextHeight: 0 });

      // update relatedTarget and dispatch
      hideTabEvent.relatedTarget = element;

      /* istanbul ignore else */
      if (isHTMLElement(tab)) {
        dispatchEvent(tab as EventTarget, hideTabEvent);
        /* istanbul ignore else */
        if (!hideTabEvent.defaultPrevented) {
          addClass(element, activeClass);
          setAttribute(element, ariaSelected, 'true');

          const activeDropdown = isHTMLElement(tab) && getParentDropdown(tab);
          if (activeDropdown && hasClass(activeDropdown, activeClass)) {
            removeClass(activeDropdown, activeClass);
          }

          /* istanbul ignore else */
          if (nav) {
            const toggleTab = () => {
              if (tab) {
                removeClass(tab, activeClass);
                setAttribute(tab, ariaSelected, 'false');
              }
              if (dropdown && !hasClass(dropdown, activeClass)) addClass(dropdown, activeClass);
            };

            if (content && (hasClass(content, fadeClass) || (nextContent && hasClass(nextContent, fadeClass)))) {
              Timer.set(nav, toggleTab, 1);
            } else toggleTab();
          }

          if (content) {
            removeClass(content, showClass);
            if (hasClass(content, fadeClass)) {
              emulateTransitionEnd(content, () => triggerTabHide(this));
            } else {
              triggerTabHide(this);
            }
          }
        }
      }
    }
  }

  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    action(this.element, mouseclickEvent, tabClickHandler);
  };

  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners();
    super.dispose();
  }
}
