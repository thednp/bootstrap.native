/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import {
  addClass,
  createCustomEvent,
  dispatchEvent,
  getAttribute,
  getBoundingClientRect,
  getDocument,
  getDocumentBody,
  getDocumentElement,
  getElementsByTagName,
  getInstance,
  hasClass,
  isHTMLElement,
  querySelector,
  removeClass,
} from "@thednp/shorty";

import PositionObserver from "@thednp/position-observer";

import activeClass from "../strings/activeClass";
import scrollspyString from "../strings/scrollspyString";
import scrollspyComponent from "../strings/scrollspyComponent";

import BaseComponent from "./base-component";
import { ScrollSpyEvent, ScrollSpyOptions } from "../interface/scrollspy";

// SCROLLSPY PRIVATE GC
// ====================
const scrollspySelector = '[data-bs-spy="scroll"]';

const scrollspyDefaults: Partial<ScrollSpyOptions> = {
  offset: 10,
  target: undefined,
};

type ScrollSpyEventProps = {
  relatedTarget: HTMLElement;
};

/**
 * Static method which returns an existing `ScrollSpy` instance associated
 * to a target `Element`.
 */
const getScrollSpyInstance = (element: Element) =>
  getInstance<ScrollSpy>(element, scrollspyComponent);

/**
 * A `ScrollSpy` initialization callback.
 */
const scrollspyInitCallback = (element: Element) => new ScrollSpy(element);

// SCROLLSPY CUSTOM EVENT
// ======================
const activateScrollSpy = createCustomEvent<
  ScrollSpyEventProps,
  ScrollSpyEvent
>(`activate.bs.${scrollspyString}`);

// SCROLLSPY PRIVATE METHODS
// =========================
/**
 * Update the state of all items.
 *
 * @param self the `ScrollSpy` instance
 */
const updateSpyTargets = (self: ScrollSpy) => {
  const {
    target,
    scrollTarget,
    options,
    itemsLength,
    scrollHeight,
    element,
    _observer,
  } = self;
  const { offset } = options;
  const isRoot = scrollTarget !== element;

  const links = target && getElementsByTagName<HTMLAnchorElement>("A", target);
  const doc = getDocument(element);
  const scrollHEIGHT = scrollTarget.scrollHeight;

  self.scrollTop = scrollTarget.scrollTop;

  // only update items/offsets once or with each mutation
  // istanbul ignore else @preserve
  if (
    links && (scrollHEIGHT !== scrollHeight || itemsLength !== links.length)
  ) {
    let href: string | null;
    let ref: string | undefined;
    let targetItem: HTMLElement | null;
    let rect;

    // reset arrays & update
    self.items = [];
    self.targets = [];
    self.offsets = [];
    self.scrollHeight = scrollHEIGHT;
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);

    Array.from(links).forEach((link) => {
      href = getAttribute(link, "href");
      ref = href?.slice(1);
      targetItem = ref?.length ? doc.getElementById(ref) : null;

      if (targetItem) {
        self.items.push(link);
        self.targets.push(targetItem);
        rect = _observer?.getEntry(targetItem)?.boundingClientRect ||
          getBoundingClientRect(targetItem);
        self.offsets.push(
          (isRoot ? rect.top + self.scrollTop : targetItem.offsetTop) - offset,
        );
      }
    });
    self.itemsLength = self.items.length;
  }
};

/**
 * Toggles on/off the component observer.
 *
 * @param self the ScrollSpy instance
 * @param add when `true`, listener is added
 */
const toggleObservers = (
  { targets, scrollTarget, element, _observer }: ScrollSpy,
  add?: boolean,
) => {
  if (add) {
    if (scrollTarget === element) {
      targets?.forEach((targetItem) => _observer.observe(targetItem));
    } else {
      _observer.observe(element);
    }
  } else _observer.disconnect();
};

/**
 * Returns the `scrollHeight` property of the scrolling element.
 *
 * @param scrollTarget the `ScrollSpy` instance
 * @return `scrollTarget` height
 */
const getScrollHeight = (scrollTarget: Element) => {
  return scrollTarget.scrollHeight;
};

/**
 * Returns the height property of the scrolling element.
 *
 * @param params the `ScrollSpy` instance
 */
const getOffsetHeight = ({ element, scrollTarget }: ScrollSpy) => {
  return scrollTarget !== element
    ? scrollTarget.clientHeight
    : getBoundingClientRect(element).height;
};

/**
 * Clear all items of the target.
 *
 * @param target a single item
 */
const clear = (target: Element) => {
  Array.from(getElementsByTagName<HTMLAnchorElement>("A", target)).forEach(
    (item) => {
      if (hasClass(item, activeClass)) removeClass(item, activeClass);
    },
  );
};

/**
 * Activates a new item.
 *
 * @param self the `ScrollSpy` instance
 * @param item a single item
 */
const activate = (self: ScrollSpy, item: HTMLElement) => {
  const { target, element } = self;

  // istanbul ignore else @preserve
  if (isHTMLElement(target)) clear(target);

  self.activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  const parents: HTMLElement[] = [];
  let parentItem = item;
  while (parentItem !== getDocumentBody(element)) {
    parentItem = parentItem.parentElement as HTMLElement;
    if (hasClass(parentItem, "nav") || hasClass(parentItem, "dropdown-menu")) {
      parents.push(parentItem);
    }
  }

  parents.forEach((menuItem) => {
    const parentLink = menuItem.previousElementSibling as HTMLElement | null;

    // istanbul ignore else @preserve
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
  declare element: HTMLElement;
  declare options: ScrollSpyOptions;
  declare target: HTMLElement | null;
  declare scrollTarget: HTMLElement;
  declare scrollTop: number;
  declare maxScroll: number;
  declare scrollHeight: number;
  declare activeItem: HTMLElement | null;
  declare items: HTMLElement[];
  declare targets: HTMLElement[];
  declare itemsLength: number;
  declare offsets: number[];
  declare _observer: PositionObserver;

  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(
    target: Element | string,
    config?: Partial<ScrollSpyOptions>,
  ) {
    super(target, config);

    // initialization element & options
    const { element, options } = this;

    // get target
    const spyTarget = querySelector(
      options.target,
      getDocument(element),
    );

    // invalidate
    if (!spyTarget) return;
    this.target = spyTarget;

    // set initial state
    this.scrollTarget = element.clientHeight < element.scrollHeight
      ? element
      : getDocumentElement(element);
    this.scrollHeight = getScrollHeight(this.scrollTarget);

    // run an initial burst, we need to know the targets
    this.refresh();

    // create observer
    this._observer = new PositionObserver((entries) => {
      requestAnimationFrame(() => {
        // istanbul ignore else @preserve
        if (entries.some((entry) => entry.isVisible)) {
          this.refresh();
        }
      });
    }, {
      root: this.scrollTarget,
    });

    // add event handlers
    toggleObservers(this, true);
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
    // istanbul ignore if @preserve
    if (!isHTMLElement(target) || target.offsetHeight === 0) return;

    updateSpyTargets(this);

    const { scrollTop, maxScroll, itemsLength, items, activeItem } = this;

    if (scrollTop >= maxScroll) {
      const newActiveItem = items[itemsLength - 1];

      // istanbul ignore else @preserve
      if (activeItem !== newActiveItem) activate(this, newActiveItem);
      return;
    }

    const { offsets } = this;

    // istanbul ignore else @preserve
    if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
      this.activeItem = null;
      // istanbul ignore else @preserve
      if (target) clear(target);
      return;
    }

    items.forEach((item, i) => {
      if (
        activeItem !== item &&
        scrollTop >= offsets[i] &&
        (typeof offsets[i + 1] === "undefined" || scrollTop < offsets[i + 1])
      ) {
        activate(this, item);
      }
    });
  };

  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    const clone = { ...this };
    toggleObservers(clone);
    super.dispose();
  }
}
