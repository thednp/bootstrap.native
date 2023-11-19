/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import {
  getDocumentBody,
  getDocumentElement,
  getDocument,
  getWindow,
  removeClass,
  hasClass,
  addClass,
  getElementsByTagName,
  getAttribute,
  querySelector,
  isHTMLElement,
  isWindow,
  createCustomEvent,
  getInstance,
  scrollEvent,
  passiveHandler,
  dispatchEvent,
  getBoundingClientRect,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import activeClass from '../strings/activeClass';
import scrollspyString from '../strings/scrollspyString';
import scrollspyComponent from '../strings/scrollspyComponent';

import BaseComponent from './base-component';
import { ScrollSpyOptions, ScrollSpyEvent } from '../interface/scrollspy';

// SCROLLSPY PRIVATE GC
// ====================
const scrollspySelector = '[data-bs-spy="scroll"]';

const scrollspyDefaults: ScrollSpyOptions = {
  offset: 10,
  target: null,
};

/**
 * Static method which returns an existing `ScrollSpy` instance associated
 * to a target `Element`.
 */
const getScrollSpyInstance = (element: HTMLElement) => getInstance<ScrollSpy>(element, scrollspyComponent);

/**
 * A `ScrollSpy` initialization callback.
 */
const scrollspyInitCallback = (element: HTMLElement) => new ScrollSpy(element);

// SCROLLSPY CUSTOM EVENT
// ======================
const activateScrollSpy = createCustomEvent<ScrollSpyEvent>(`activate.bs.${scrollspyString}`);

// SCROLLSPY PRIVATE METHODS
// =========================
/**
 * Update the state of all items.
 *
 * @param self the `ScrollSpy` instance
 */
const updateSpyTargets = (self: ScrollSpy) => {
  const { target, scrollTarget, options, itemsLength, scrollHeight, element } = self;
  const { offset } = options;
  const isWin = isWindow(scrollTarget as Node | Window);

  const links = target && getElementsByTagName('A', target);
  const scrollHEIGHT = scrollTarget ? getScrollHeight(scrollTarget) : /* istanbul ignore next */ scrollHeight;

  self.scrollTop = isWin ? (scrollTarget as Window).scrollY : (scrollTarget as HTMLElement).scrollTop;

  // only update items/offsets once or with each mutation
  /* istanbul ignore else */
  if (links && (scrollHEIGHT !== scrollHeight || itemsLength !== links.length)) {
    let href;
    let targetItem;
    let rect;

    // reset arrays & update
    self.items = [];
    self.offsets = [];
    self.scrollHeight = scrollHEIGHT;
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);

    [...links].forEach(link => {
      href = getAttribute(link, 'href');
      targetItem =
        href && href.charAt(0) === '#' && href.slice(-1) !== '#' && querySelector(href, getDocument(element));

      if (targetItem) {
        self.items.push(link);
        rect = getBoundingClientRect(targetItem);
        self.offsets.push((isWin ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
      }
    });
    self.itemsLength = self.items.length;
  }
};

/**
 * Returns the `scrollHeight` property of the scrolling element.
 *
 * @param scrollTarget the `ScrollSpy` instance
 * @return `scrollTarget` height
 */
const getScrollHeight = (scrollTarget: Node | Window) => {
  return isHTMLElement(scrollTarget as Node)
    ? (scrollTarget as HTMLElement).scrollHeight
    : getDocumentElement(scrollTarget as Node).scrollHeight;
};

/**
 * Returns the height property of the scrolling element.
 *
 * @param params the `ScrollSpy` instance
 */
const getOffsetHeight = ({ element, scrollTarget }: ScrollSpy) => {
  return isWindow(scrollTarget as Node) ? (scrollTarget as Window).innerHeight : getBoundingClientRect(element).height;
};

/**
 * Clear all items of the target.
 *
 * @param target a single item
 */
const clear = (target: HTMLElement) => {
  [...getElementsByTagName('A', target)].forEach(item => {
    if (hasClass(item, activeClass)) removeClass(item, activeClass);
  });
};

/**
 * Activates a new item.
 *
 * @param self the `ScrollSpy` instance
 * @param item a single item
 */
const activate = (self: ScrollSpy, item: HTMLElement) => {
  const { target, element } = self;
  if (isHTMLElement(target)) clear(target);
  self.activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  const parents: HTMLElement[] = [];
  let parentItem = item;
  while (parentItem !== getDocumentBody(element)) {
    parentItem = parentItem.parentElement as HTMLElement;
    if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
  }

  parents.forEach(menuItem => {
    const parentLink = menuItem.previousElementSibling as HTMLElement | null;

    /* istanbul ignore else */
    if (parentLink && !hasClass(parentLink, activeClass)) {
      addClass(parentLink, activeClass);
    }
  });

  // dispatch
  activateScrollSpy.relatedTarget = item;
  dispatchEvent(element, activateScrollSpy);
};

// SCROLLSPY DEFINITION
// ====================
/** Returns a new `ScrollSpy` instance. */
export default class ScrollSpy extends BaseComponent {
  static selector = scrollspySelector;
  static init = scrollspyInitCallback;
  static getInstance = getScrollSpyInstance;
  declare options: ScrollSpyOptions;
  declare target: HTMLElement | null;
  declare scrollTarget: HTMLElement | Window;
  declare scrollTop: number;
  declare maxScroll: number;
  declare scrollHeight: number;
  declare activeItem: HTMLElement | null;
  declare items: HTMLElement[];
  declare itemsLength: number;
  declare offsets: number[];

  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<ScrollSpyOptions>) {
    super(target, config);

    // initialization element & options
    const { element, options } = this;

    // additional properties
    this.target = querySelector(options.target as HTMLElement | string, getDocument(element));

    // invalidate
    if (this.target) {
      // set initial state
      this.scrollTarget = element.clientHeight < element.scrollHeight ? element : getWindow(element);
      this.scrollHeight = getScrollHeight(this.scrollTarget);

      // add event handlers
      this._toggleEventListeners(true);

      this.refresh();
    }
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return scrollspyComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return scrollspyDefaults;
  }
  /* eslint-enable */

  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh = () => {
    const { target } = this;

    // check if target is visible and invalidate
    /* istanbul ignore else */
    if (isHTMLElement(target) && target.offsetHeight > 0) {
      updateSpyTargets(this);

      const { scrollTop, maxScroll, itemsLength, items, activeItem } = this;

      if (scrollTop >= maxScroll) {
        const newActiveItem = items[itemsLength - 1];

        /* istanbul ignore else */
        if (activeItem !== newActiveItem) {
          activate(this, newActiveItem);
        }
        return;
      }

      const { offsets } = this;

      if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
        this.activeItem = null;
        if (target) clear(target);
        return;
      }

      items.forEach((item, i) => {
        if (
          activeItem !== item &&
          scrollTop >= offsets[i] &&
          (typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1])
        ) {
          activate(this, item);
        }
      });
    }
  };

  /**
   * Toggles on/off the component event listener.
   *
   * @param add when `true`, listener is added
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    action(this.scrollTarget as EventTarget, scrollEvent, this.refresh, passiveHandler);
  };

  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners();
    super.dispose();
  }
}
