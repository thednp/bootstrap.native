/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import queryElement from 'shorter-js/src/misc/queryElement';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import { getInstance } from 'shorter-js/src/misc/data';

import activeClass from '../strings/activeClass';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import BaseComponent from './base-component';

// console.log(typeof addEventListener)

// SCROLLSPY PRIVATE GC
// ====================
const scrollspyString = 'scrollspy';
const scrollspyComponent = 'ScrollSpy';
const scrollspySelector = '[data-bs-spy="scroll"]';

const scrollspyDefaults = {
  offset: 10,
  target: null,
};

/**
 * Static method which returns an existing `ScrollSpy` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<ScrollSpy>}
 */
const getScrollSpyInstance = (element) => getInstance(element, scrollspyComponent);

/**
 * A `ScrollSpy` initialization callback.
 * @type {BSN.InitCallback<ScrollSpy>}
 */
const scrollspyInitCallback = (element) => new ScrollSpy(element);

// SCROLLSPY CUSTOM EVENT
// ======================
const activateScrollSpy = bootstrapCustomEvent(`activate.bs.${scrollspyString}`);

// SCROLLSPY PRIVATE METHODS
// =========================
/**
 * Update the state of all items.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 */
function updateSpyTargets(self) {
  const {
    // @ts-ignore
    target, scrollTarget, isWindow, options, itemsLength, scrollHeight,
  } = self;
  const { offset } = options;
  // @ts-ignore
  const links = target.getElementsByTagName('A');

  // @ts-ignore
  self.scrollTop = isWindow ? scrollTarget.pageYOffset : scrollTarget.scrollTop;

  // only update items/offsets once or with each mutation

  if (itemsLength !== links.length || getScrollHeight(scrollTarget) !== scrollHeight) {
    let href;
    let targetItem;
    let rect;

    // reset arrays & update
    // @ts-ignore
    self.items = [];
    // @ts-ignore
    self.offsets = [];
    // @ts-ignore
    self.scrollHeight = getScrollHeight(scrollTarget);
    // @ts-ignore
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);

    Array.from(links).forEach((link) => {
      href = link.getAttribute('href');
      targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

      if (targetItem) {
        // @ts-ignore
        self.items.push(link);
        rect = targetItem.getBoundingClientRect();
        // @ts-ignore
        self.offsets.push((isWindow ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
      }
    });
    // @ts-ignore
    self.itemsLength = self.items.length;
  }
}

/**
 * Returns the `scrollHeight` property of the scrolling element.
 * @param {Element | Window} scrollTarget the `ScrollSpy` instance
 * @return {number} `scrollTarget` height
 */
function getScrollHeight(scrollTarget) {
  // @ts-ignore
  return scrollTarget.scrollHeight || Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
}

/**
 * Returns the height property of the scrolling element.
 * @param {{element: Element, isWindow: boolean}} params the `ScrollSpy` instance
 */
function getOffsetHeight({ element, isWindow }) {
  if (!isWindow) return element.getBoundingClientRect().height;
  return window.innerHeight;
}

/**
 * Clear all items of the target.
 * @param {Element} target a single item
 */
function clear(target) {
  Array.from(target.getElementsByTagName('A')).forEach((item) => {
    if (hasClass(item, activeClass)) removeClass(item, activeClass);
  });
}

/**
 * Activates a new item.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 * @param {Element} item a single item
 */
function activate(self, item) {
  // @ts-ignore
  const { target, element } = self;
  // @ts-ignore
  clear(target);
  // @ts-ignore
  self.activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  const parents = [];
  let parentItem = item;
  while (parentItem !== document.body) {
    // @ts-ignore
    parentItem = parentItem.parentNode;
    if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
  }

  parents.forEach((menuItem) => {
    const parentLink = menuItem.previousElementSibling;

    if (parentLink && !hasClass(parentLink, activeClass)) {
      addClass(parentLink, activeClass);
    }
  });

  // dispatch
  element.dispatchEvent(activateScrollSpy);
}

/**
 * Toggles on/off the component event listener.
 * @param {ScrollSpy} self the `ScrollSpy` instance
 * @param {boolean=} add when `true`, listener is added
 */
function toggleSpyHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  // @ts-ignore
  self.scrollTarget[action]('scroll', self.refresh, passiveHandler);
}

// SCROLLSPY DEFINITION
// ====================
/** Returns a new `ScrollSpy` instance. */
export default class ScrollSpy extends BaseComponent {
  /**
   * @param {Element | string} target the target element
   * @param {BSN.Options.ScrollSpy=} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element & options
    const { element, options } = self;

    // additional properties
    /** @private @type {Element?} */
    self.target = queryElement(options.target);

    // invalidate
    if (!self.target) return;

    // set initial state
    /** @private @type {Element | Window} */
    self.scrollTarget = element.clientHeight < element.scrollHeight ? element : window;
    /** @private @type {boolean} */
    self.isWindow = self.scrollTarget === window;
    /** @private @type {number} */
    self.scrollTop = 0;
    /** @private @type {number} */
    self.maxScroll = 0;
    /** @private @type {number} */
    self.scrollHeight = 0;
    /** @private @type {Element?} */
    self.activeItem = null;
    /** @private @type {Element[]} */
    self.items = [];
    /** @private @type {number} */
    self.itemsLength = 0;
    /** @private @type {number[]} */
    self.offsets = [];

    // bind events
    self.refresh = self.refresh.bind(self);

    // add event handlers
    toggleSpyHandlers(self, true);

    self.refresh();
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return scrollspyComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return scrollspyDefaults; }
  /* eslint-enable */

  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh() {
    const self = this;
    const { target } = self;

    // check if target is visible and invalidate
    // @ts-ignore
    if (target.offsetHeight === 0) return;

    updateSpyTargets(self);

    const {
      scrollTop, maxScroll, itemsLength, items, activeItem,
    } = self;

    if (scrollTop >= maxScroll) {
      const newActiveItem = items[itemsLength - 1];

      if (activeItem !== newActiveItem) {
        activate(self, newActiveItem);
      }
      return;
    }

    const { offsets } = self;

    if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
      self.activeItem = null;
      // @ts-ignore
      clear(target);
      return;
    }

    items.forEach((item, i) => {
      if (activeItem !== item && scrollTop >= offsets[i]
        && (typeof offsets[i + 1] === 'undefined' || scrollTop < offsets[i + 1])) {
        activate(self, item);
      }
    });
  }

  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    toggleSpyHandlers(this);
    super.dispose();
  }
}

Object.assign(ScrollSpy, {
  selector: scrollspySelector,
  init: scrollspyInitCallback,
  getInstance: getScrollSpyInstance,
});
