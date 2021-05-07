/* Native JavaScript for Bootstrap 5 | ScrollSpy
------------------------------------------------ */
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';

import activeClass from '../strings/activeClass.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent.js';
import BaseComponent from './base-component.js';

// SCROLLSPY PRIVATE GC
// ====================
const scrollspyString = 'scrollspy';
const scrollspyComponent = 'ScrollSpy';
const scrollspySelector = '[data-bs-spy="scroll"]';
const scrollSpyDefaultOptions = {
  offset: 10,
  target: null,
};

// SCROLLSPY CUSTOM EVENT
// ======================
const activateScrollSpy = bootstrapCustomEvent(`activate.bs.${scrollspyString}`);

// SCROLLSPY PRIVATE METHODS
// =========================
function updateSpyTargets(self) {
  const {
    target, scrollTarget, isWindow, options, itemsLength, scrollHeight,
  } = self;
  const { offset } = options;
  const links = target.getElementsByTagName('A');

  self.scrollTop = isWindow
    ? scrollTarget.pageYOffset
    : scrollTarget.scrollTop;

  // only update items/offsets once or with each mutation
  if (itemsLength !== links.length || getScrollHeight(scrollTarget) !== scrollHeight) {
    let href;
    let targetItem;
    let rect;

    // reset arrays & update
    self.items = [];
    self.offsets = [];
    self.scrollHeight = getScrollHeight(scrollTarget);
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);

    Array.from(links).forEach((link) => {
      href = link.getAttribute('href');
      targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

      if (targetItem) {
        self.items.push(link);
        rect = targetItem.getBoundingClientRect();
        self.offsets.push((isWindow ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
      }
    });
    self.itemsLength = self.items.length;
  }
}

function getScrollHeight(scrollTarget) {
  return scrollTarget.scrollHeight || Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );
}

function getOffsetHeight({ element, isWindow }) {
  if (!isWindow) return element.getBoundingClientRect().height;
  return window.innerHeight;
}

function clear(target) {
  Array.from(target.getElementsByTagName('A')).forEach((item) => {
    if (hasClass(item, activeClass)) removeClass(item, activeClass);
  });
}

function activate(self, item) {
  const { target, element } = self;
  clear(target);
  self.activeItem = item;
  addClass(item, activeClass);

  // activate all parents
  const parents = [];
  let parentItem = item;
  while (parentItem !== document.body) {
    parentItem = parentItem.parentNode;
    if (hasClass(parentItem, 'nav') || hasClass(parentItem, 'dropdown-menu')) parents.push(parentItem);
  }

  parents.forEach((menuItem) => {
    const parentLink = menuItem.previousElementSibling;

    if (parentLink && !hasClass(parentLink, activeClass)) {
      addClass(parentLink, activeClass);
    }
  });

  // update relatedTarget and dispatch
  activateScrollSpy.relatedTarget = item;
  element.dispatchEvent(activateScrollSpy);
}

function toggleSpyHandlers(self, add) {
  const action = add ? addEventListener : removeEventListener;
  self.scrollTarget[action]('scroll', self.refresh, passiveHandler);
}

// SCROLLSPY DEFINITION
// ====================
export default class ScrollSpy extends BaseComponent {
  constructor(target, config) {
    super(scrollspyComponent, target, scrollSpyDefaultOptions, config);
    // bind
    const self = this;

    // initialization element & options
    const { element, options } = self;

    // additional properties
    self.target = queryElement(options.target);

    // invalidate
    if (!self.target) return;

    // set initial state
    self.scrollTarget = element.clientHeight < element.scrollHeight ? element : window;
    self.isWindow = self.scrollTarget === window;
    self.scrollTop = 0;
    self.maxScroll = 0;
    self.scrollHeight = 0;
    self.activeItem = null;
    self.items = [];
    self.offsets = [];

    // bind events
    self.refresh = self.refresh.bind(self);

    // add event handlers
    toggleSpyHandlers(self, 1);

    self.refresh();
  }

  // SCROLLSPY PUBLIC METHODS
  // ========================
  refresh() {
    const self = this;
    const { target } = self;

    // check if target is visible and invalidate
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

  dispose() {
    toggleSpyHandlers(this);
    super.dispose(scrollspyComponent);
  }
}

ScrollSpy.init = {
  component: scrollspyComponent,
  selector: scrollspySelector,
  constructor: ScrollSpy,
};
