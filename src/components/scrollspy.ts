/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import {
  addClass,
  closest,
  createCustomEvent,
  dispatchEvent,
  getAttribute,
  getBoundingClientRect,
  getDocument,
  getDocumentElement,
  getElementById,
  getElementsByTagName,
  getInstance,
  hasClass,
  mouseclickEvent,
  MouseEvent,
  querySelector,
  removeClass,
} from "@thednp/shorty";

import PositionObserver from "@thednp/position-observer";
import { addListener, removeListener } from "@thednp/event-listener";

import activeClass from "~/strings/activeClass";
import scrollspyString from "~/strings/scrollspyString";
import scrollspyComponent from "~/strings/scrollspyComponent";
import isDisabled from "~/util/isDisabled";
import BaseComponent from "./base-component";
import { ScrollSpyEvent, ScrollSpyOptions } from "~/interface/scrollspy";

// SCROLLSPY PRIVATE GC
// ====================
const scrollspySelector = '[data-bs-spy="scroll"]';
const scrollSpyAnchorSelector = "[href]";

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
    _itemsLength,
    _observables,
  } = self;

  const links = getElementsByTagName<HTMLAnchorElement>("A", target);
  const doc = getDocument(target);

  // only update items once or with each mutation
  // istanbul ignore else @preserve
  if (!links.length || _itemsLength === _observables.size) return;
  // reset arrays & update
  _observables.clear();

  Array.from(links).forEach((link) => {
    const hash = getAttribute(link, "href")?.slice(1);
    const targetItem = hash?.length ? doc.getElementById(hash) : null;

    if (targetItem && !isDisabled(link)) {
      self._observables.set(targetItem, link);
    }
  });
  self._itemsLength = self._observables.size;
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
  clear(target);

  self._activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  let parentItem = item;
  while (parentItem !== target) {
    parentItem = parentItem.parentElement as HTMLElement;
    if (
      ["nav", "dropdown-menu", "list-group"].some((c) =>
        hasClass(parentItem, c)
      )
    ) {
      const parentLink = parentItem.previousElementSibling as
        | HTMLElement
        | null;

      // istanbul ignore else @preserve
      if (parentLink && !hasClass(parentLink, activeClass)) {
        addClass(parentLink, activeClass);
      }
    }
  }

  // dispatch
  activateScrollSpy.relatedTarget = item;
  dispatchEvent(element, activateScrollSpy);
};

const getOffset = (self: ScrollSpy, target: HTMLElement) => {
  const { scrollTarget, element, options } = self;

  return (scrollTarget !== element
    ? getBoundingClientRect(target).top + scrollTarget.scrollTop
    : target.offsetTop) - (options.offset as number || 10);
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
  declare target: HTMLElement;
  declare scrollTarget: HTMLElement;
  declare _itemsLength: number;
  declare _activeItem: HTMLElement | null;
  declare _observables: Map<HTMLElement, HTMLElement>;
  declare _observer: PositionObserver; //| IntersectionObserver;

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
    this._observables = new Map();

    // run an initial burst, we need to know the targets
    this.refresh();
    // updateSpyTargets(this);

    // create observer
    this._observer = new PositionObserver(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget,
    });

    // add event handlers
    this._toggleEventListeners(true);
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
    const { target, scrollTarget } = this;
    // check if target is visible and invalidate
    // istanbul ignore if @preserve
    if (!target || target.offsetHeight === 0) return;

    updateSpyTargets(this);
    const { _itemsLength, _observables, _activeItem } = this;

    // istanbul ignore if @preserve
    if (!_itemsLength) return;
    const entries = _observables.entries().toArray();

    const { scrollTop, scrollHeight, clientHeight } = scrollTarget;

    if (scrollTop >= scrollHeight - clientHeight) {
      const newActiveItem = entries[_itemsLength - 1]?.[1];

      // istanbul ignore else @preserve
      if (_activeItem !== newActiveItem) activate(this, newActiveItem);
      return;
    }

    const firstOffset = entries[0]?.[0]
      ? getOffset(this, entries[0][0])
      : /* istanbul ignore next */ null;
    if (
      firstOffset !== null && scrollTop < firstOffset &&
      firstOffset > 0
    ) {
      this._activeItem = null;
      clear(target);
      return;
    }

    for (let i = 0; i < _itemsLength; i += 1) {
      const [targetItem, item] = entries[i];
      const offsetTop = getOffset(this, targetItem);
      const nextTarget = entries[i + 1]?.[0];
      const nextOffsetTop = nextTarget
        ? getOffset(this, nextTarget)
        : /* istanbul ignore next */ null;

      // istanbul ignore else @preserve
      if (
        _activeItem !== item &&
        scrollTop >= offsetTop &&
        (nextOffsetTop === null || scrollTop < nextOffsetTop)
      ) {
        activate(this, item);
        break;
      }
    }
  };

  /**
   * This method provides an event handle
   * for scrollspy
   * @param e the event listener object
   */
  _scrollTo = (e: MouseEvent<HTMLAnchorElement>) => {
    const item = closest(e.target, scrollSpyAnchorSelector);
    const hash = item && getAttribute(item, "href")?.slice(1);
    const targetItem = hash && getElementById(hash, this.target);

    // istanbul ignore else @preserve
    if (targetItem) {
      this.scrollTarget.scrollTo({
        top: targetItem.offsetTop,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  };

  /**
   * Toggles on/off the component observer.
   *
   * @param self the ScrollSpy instance
   * @param add when `true`, listener is added
   */
  _toggleEventListeners = (
    add?: boolean,
  ) => {
    const { target, _observables, _observer, _scrollTo } = this;
    const action = add ? addListener : removeListener;
    action(target, mouseclickEvent, _scrollTo);

    if (add) {
      _observables?.forEach((_, targetItem) => _observer.observe(targetItem));
    } else _observer.disconnect();
  };

  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners();
    super.dispose();
  }
}
