/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration';
import reflow from 'shorter-js/src/misc/reflow';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import isElementInScrollRange from 'shorter-js/src/misc/isElementInScrollRange';
import queryElement from 'shorter-js/src/misc/queryElement';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import { getInstance } from 'shorter-js/src/misc/data';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent';
import activeClass from '../strings/activeClass';
import BaseComponent from './base-component';

// CAROUSEL PRIVATE GC
// ===================
const carouselString = 'carousel';
const carouselComponent = 'Carousel';
const carouselSelector = `[data-bs-ride="${carouselString}"]`;
const carouselControl = `${carouselString}-control`;
const carouselItem = `${carouselString}-item`;
const dataBsSlideTo = 'data-bs-slide-to';
const pausedClass = 'paused';

const carouselDefaults = {
  pause: 'hover',
  keyboard: false,
  touch: true,
  interval: 5000,
};

const CarouselEventProperties = {
  /** @type {Element} */
  relatedTarget: null,
  /** @type {string} */
  direction: 'left' || 'right',
  /** @type {number} */
  from: 0,
  /** @type {number} */
  to: 1,
};

/**
 * Static method which returns an existing `Carousel` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Carousel>}
 */
const getCarouselInstance = (element) => getInstance(element, carouselComponent);

/**
 * A `Carousel` initialization callback.
 * @type {BSN.InitCallback<Carousel>}
 */
const carouselInitCallback = (element) => new Carousel(element);

let startX = 0;
let currentX = 0;
let endX = 0;

// CAROUSEL CUSTOM EVENTS
// ======================
/** @type {BSN.CarouselEvent.slide} */
const carouselSlideEvent = bootstrapCustomEvent(`slide.bs.${carouselString}`, CarouselEventProperties);
/** @type {BSN.CarouselEvent.slid} */
const carouselSlidEvent = bootstrapCustomEvent(`slid.bs.${carouselString}`, CarouselEventProperties);

// CAROUSEL EVENT HANDLERS
// =======================
/**
 * The `transitionend` event listener of the `Carousel`.
 * @param {Carousel} self the `Carousel` instance
 */
function carouselTransitionEndHandler(self) {
  const {
    index, direction, element, slides, options, isAnimating,
  } = self;

  // discontinue disposed instances
  if (isAnimating && getCarouselInstance(element)) {
    const activeItem = getActiveIndex(self);
    const orientation = direction === 'left' ? 'next' : 'prev';
    const directionClass = direction === 'left' ? 'start' : 'end';
    self.isAnimating = false;

    addClass(slides[index], activeClass);
    removeClass(slides[activeItem], activeClass);

    removeClass(slides[index], `${carouselItem}-${orientation}`);
    removeClass(slides[index], `${carouselItem}-${directionClass}`);
    removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);

    element.dispatchEvent(carouselSlidEvent);

    // check for element, might have been disposed
    if (!document.hidden && options.interval
      && !hasClass(element, pausedClass)) {
      self.cycle();
    }
  }
}

/**
 * Handles the `mouseenter` / `touchstart` events when *options.pause*
 * is set to `hover`.
 *
 * @param {Event} e the `Event` object
 */
function carouselPauseHandler(e) {
  const eventTarget = e.target;
  const self = getCarouselInstance(eventTarget.closest(carouselSelector));
  const { element, isAnimating } = self;

  if (!hasClass(element, pausedClass)) {
    addClass(element, pausedClass);
    if (!isAnimating) {
      clearInterval(self.timer);
      self.timer = null;
    }
  }
}

/**
 * Handles the `mouseleave` / `touchsend` events when *options.pause*
 * is set to `hover`.
 *
 * @param {Event} e the `Event` object
 */
function carouselResumeHandler(e) {
  const { target } = e;
  const self = getCarouselInstance(target.closest(carouselSelector));
  const { isPaused, isAnimating, element } = self;

  if (!isPaused && hasClass(element, pausedClass)) {
    removeClass(element, pausedClass);

    if (!isAnimating) {
      clearInterval(self.timer);
      self.timer = null;
      self.cycle();
    }
  }
}

/**
 * Handles the `click` event for the `Carousel` indicators.
 *
 * @param {Event} e the `Event` object
 */
function carouselIndicatorHandler(e) {
  e.preventDefault();
  const { target } = e;
  const self = getCarouselInstance(target.closest(carouselSelector));

  if (self.isAnimating) return;

  const newIndex = target.getAttribute(dataBsSlideTo);

  if (target && !hasClass(target, activeClass) // event target is not active
    && newIndex) { // AND has the specific attribute
    self.to(+newIndex); // do the slide
  }
}

/**
 * Handles the `click` event for the `Carousel` arrows.
 *
 * @param {Event} e the `Event` object
 */
function carouselControlsHandler(e) {
  e.preventDefault();
  const that = this;
  const self = getCarouselInstance(that.closest(carouselSelector));

  const { controls } = self;

  if (controls[1] && that === controls[1]) {
    self.next();
  } else if (controls[1] && that === controls[0]) {
    self.prev();
  }
}

/**
 * Handles the keyboard `keydown` event for the visible `Carousel` elements.
 *
 * @param {Event} e the `Event` object
 */
function carouselKeyHandler({ which }) {
  const [element] = Array.from(document.querySelectorAll(carouselSelector))
    .filter((x) => isElementInScrollRange(x));

  if (!element) return;
  const self = getCarouselInstance(element);

  switch (which) {
    case 39:
      self.next();
      break;
    case 37:
      self.prev();
      break;
    default:
  }
}

// CAROUSEL TOUCH HANDLERS
// =======================
/**
 * Handles the `touchdown` event for the `Carousel` element.
 *
 * @param {Event} e the `Event` object
 */
function carouselTouchDownHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || self.isTouch) { return; }

  startX = e.changedTouches[0].pageX;

  if (element.contains(e.target)) {
    self.isTouch = true;
    toggleCarouselTouchHandlers(self, 1);
  }
}

/**
 * Handles the `touchmove` event for the `Carousel` element.
 *
 * @param {Event} e the `Event` object
 */
function carouselTouchMoveHandler(e) {
  const { changedTouches, type } = e;
  const self = getCarouselInstance(this);

  if (!self || !self.isTouch) { return; }

  currentX = changedTouches[0].pageX;

  // cancel touch if more than one changedTouches detected
  if (type === 'touchmove' && changedTouches.length > 1) {
    e.preventDefault();
  }
}

/**
 * Handles the `touchend` event for the `Carousel` element.
 *
 * @param {Event} e the `Event` object
 */
function carouselTouchEndHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || !self.isTouch) { return; }

  endX = currentX || e.changedTouches[0].pageX;

  if (self.isTouch) {
    // the event target is outside the carousel OR carousel doens't include the related target
    if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
      && Math.abs(startX - endX) < 75) { // AND swipe distance is less than 75px
      // when the above conditions are satisfied, no need to continue
      return;
    } // OR determine next index to slide to
    if (currentX < startX) {
      self.index += 1;
    } else if (currentX > startX) {
      self.index -= 1;
    }

    self.isTouch = false;
    self.to(self.index); // do the slide

    toggleCarouselTouchHandlers(self); // remove touch events handlers
  }
}

// CAROUSEL PRIVATE METHODS
// ========================
/**
 * Sets active indicator for the `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {number} pageIndex the index of the new active indicator
 */
function activateCarouselIndicator(self, pageIndex) {
  const { indicators } = self;
  Array.from(indicators).forEach((x) => removeClass(x, activeClass));
  if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
}

/**
 * Toggles the touch event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean | number} add when `TRUE` event listeners are added
 */
function toggleCarouselTouchHandlers(self, add) {
  const { element } = self;
  const action = add ? addEventListener : removeEventListener;
  element[action]('touchmove', carouselTouchMoveHandler, passiveHandler);
  element[action]('touchend', carouselTouchEndHandler, passiveHandler);
}

/**
 * Toggles all event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean | number} add when `TRUE` event listeners are added
 */
function toggleCarouselHandlers(self, add) {
  const {
    element, options, slides, controls, indicator,
  } = self;
  const {
    touch, pause, interval, keyboard,
  } = options;
  const action = add ? addEventListener : removeEventListener;

  if (pause && interval) {
    element[action]('mouseenter', carouselPauseHandler);
    element[action]('mouseleave', carouselResumeHandler);
    element[action]('touchstart', carouselPauseHandler, passiveHandler);
    element[action]('touchend', carouselResumeHandler, passiveHandler);
  }

  if (touch && slides.length > 1) {
    element[action]('touchstart', carouselTouchDownHandler, passiveHandler);
  }

  controls.forEach((arrow) => {
    if (arrow) arrow[action]('click', carouselControlsHandler);
  });

  if (indicator) indicator[action]('click', carouselIndicatorHandler);
  if (keyboard) window[action]('keydown', carouselKeyHandler);
}

/**
 * Returns the index of the current active item.
 * @param {Carousel} self the `Carousel` instance
 * @returns {number} the query result
 */
function getActiveIndex(self) {
  const { slides, element } = self;
  return Array.from(slides)
    .indexOf(element.getElementsByClassName(`${carouselItem} ${activeClass}`)[0]) || 0;
}

// CAROUSEL DEFINITION
// ===================
/**
 * Creates a new `Carousel` instance.
 */
export default class Carousel extends BaseComponent {
  /**
   *
   * @param {Element | string} target mostly a `.carousel` element
   * @param {BSN.CarouselOptions?} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // additional properties
    /** @private @type {number?} */
    self.timer = null;
    /** @private @type {string} */
    self.direction = 'left';
    /** @private @type {boolean} */
    self.isPaused = false;
    /** @private @type {boolean} */
    self.isAnimating = false;
    /** @private @type {number} */
    self.index = 0;
    /** @private @type {boolean} */
    self.isTouch = false;

    // initialization element
    const { element } = self;
    // carousel elements
    // a LIVE collection is prefferable
    /** @private @type {HTMLCollection} */
    self.slides = element.getElementsByClassName(carouselItem);
    const { slides } = self;

    // invalidate when not enough items
    // no need to go further
    if (slides.length < 2) { return; }

    /** @private @type {[?Element, ?Element]} */
    self.controls = [
      queryElement(`.${carouselControl}-prev`, element),
      queryElement(`.${carouselControl}-next`, element),
    ];

    // a LIVE collection is prefferable
    /** @private @type {Element?} */
    self.indicator = queryElement('.carousel-indicators', element);
    /** @private @type {NodeList | any[]} */
    self.indicators = (self.indicator && self.indicator.querySelectorAll(`[${dataBsSlideTo}]`)) || [];

    // set JavaScript and DATA API options
    const { options } = self;

    // don't use TRUE as interval, it's actually 0, use the default 5000ms better
    self.options.interval = options.interval === true
      ? carouselDefaults.interval
      : options.interval;

    // set first slide active if none
    if (getActiveIndex(self) < 0) {
      if (slides.length) addClass(slides[0], activeClass);
      if (self.indicators.length) activateCarouselIndicator(self, 0);
    }

    // attach event handlers
    toggleCarouselHandlers(self, 1);

    // start to cycle if interval is set
    if (options.interval) self.cycle();
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return carouselComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return carouselDefaults; }
  /* eslint-enable */

  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const self = this;
    const { isPaused, element, options } = self;
    if (self.timer) {
      clearInterval(self.timer);
      self.timer = null;
    }

    if (isPaused) {
      removeClass(element, pausedClass);
      self.isPaused = !isPaused;
    }

    self.timer = setInterval(() => {
      if (isElementInScrollRange(element)) {
        self.index += 1;
        self.to(self.index);
      }
    }, options.interval);
  }

  /** Pause the automatic cycle. */
  pause() {
    const self = this;
    const { element, options, isPaused } = self;
    if (options.interval && !isPaused) {
      clearInterval(self.timer);
      self.timer = null;
      addClass(element, pausedClass);
      self.isPaused = !isPaused;
    }
  }

  /** Slide to the next item. */
  next() {
    const self = this;
    if (!self.isAnimating) { self.index += 1; self.to(self.index); }
  }

  /** Slide to the previous item. */
  prev() {
    const self = this;
    if (!self.isAnimating) { self.index -= 1; self.to(self.index); }
  }

  /**
   * Jump to the item with the `idx` index.
   * @param {number} idx the index of the item to jump to
   */
  to(idx) {
    const self = this;
    const {
      element, isAnimating, slides, options,
    } = self;
    const activeItem = getActiveIndex(self);
    let next = idx;

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    if (isAnimating || activeItem === next) return;

    // determine transition direction
    if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
      self.direction = 'left'; // next
    } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
      self.direction = 'right'; // prev
    }
    const { direction } = self;

    // find the right next index
    if (next < 0) { next = slides.length - 1; } else if (next >= slides.length) { next = 0; }

    // orientation, class name, eventProperties
    const orientation = direction === 'left' ? 'next' : 'prev';
    const directionClass = direction === 'left' ? 'start' : 'end';

    const eventProperties = {
      relatedTarget: slides[next],
      from: activeItem,
      to: next,
      direction,
    };

    // update event properties
    Object.assign(carouselSlideEvent, eventProperties);
    Object.assign(carouselSlidEvent, eventProperties);

    // discontinue when prevented
    element.dispatchEvent(carouselSlideEvent);
    if (carouselSlideEvent.defaultPrevented) return;

    // update index
    self.index = next;

    clearInterval(self.timer);
    self.timer = null;

    self.isAnimating = true;
    activateCarouselIndicator(self, next);

    if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
      addClass(slides[next], `${carouselItem}-${orientation}`);
      reflow(slides[next]);
      addClass(slides[next], `${carouselItem}-${directionClass}`);
      addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

      emulateTransitionEnd(slides[next], () => carouselTransitionEndHandler(self));
    } else {
      addClass(slides[next], activeClass);
      removeClass(slides[activeItem], activeClass);

      setTimeout(() => {
        self.isAnimating = false;

        // check for element, might have been disposed
        if (element && options.interval && !hasClass(element, pausedClass)) {
          self.cycle();
        }

        element.dispatchEvent(carouselSlidEvent);
      }, 17);
    }
  }

  /** Remove `Carousel` component from target. */
  dispose() {
    const self = this;
    const { slides } = self;
    const itemClasses = ['start', 'end', 'prev', 'next'];

    Array.from(slides).forEach((slide, idx) => {
      if (hasClass(slide, activeClass)) activateCarouselIndicator(self, idx);
      itemClasses.forEach((c) => removeClass(slide, `${carouselItem}-${c}`));
    });

    toggleCarouselHandlers(self);
    clearInterval(self.timer);
    super.dispose();
  }
}

Object.assign(Carousel, {
  selector: carouselSelector,
  init: carouselInitCallback,
  getInstance: getCarouselInstance,
});
