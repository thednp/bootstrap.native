/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */
import mouseenterEvent from 'shorter-js/src/strings/mouseenterEvent';
import mouseleaveEvent from 'shorter-js/src/strings/mouseleaveEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import touchmoveEvent from 'shorter-js/src/strings/touchmoveEvent';
import touchendEvent from 'shorter-js/src/strings/touchendEvent';
import touchstartEvent from 'shorter-js/src/strings/touchstartEvent';
import keyArrowLeft from 'shorter-js/src/strings/keyArrowLeft';
import keyArrowRight from 'shorter-js/src/strings/keyArrowRight';
import on from 'shorter-js/src/event/on';
import off from 'shorter-js/src/event/off';
import getWindow from 'shorter-js/src/get/getWindow';
import getDocument from 'shorter-js/src/get/getDocument';
import getElementTransitionDuration from 'shorter-js/src/get/getElementTransitionDuration';
import isElementInScrollRange from 'shorter-js/src/is/isElementInScrollRange';
import isRTL from 'shorter-js/src/is/isRTL';
import closest from 'shorter-js/src/selectors/closest';
import querySelector from 'shorter-js/src/selectors/querySelector';
import querySelectorAll from 'shorter-js/src/selectors/querySelectorAll';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import getAttribute from 'shorter-js/src/attr/getAttribute';
import Timer from 'shorter-js/src/misc/timer';
import reflow from 'shorter-js/src/misc/reflow';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import { getInstance } from 'shorter-js/src/misc/data';
import OriginalEvent from 'shorter-js/src/misc/OriginalEvent';

import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';

import activeClass from '../strings/activeClass';
import dataBsTarget from '../strings/dataBsTarget';
import carouselString from '../strings/carouselString';
import carouselComponent from '../strings/carouselComponent';
import getTargetElement from '../util/getTargetElement';
import BaseComponent from './base-component';

// CAROUSEL PRIVATE GC
// ===================
const carouselSelector = `[data-bs-ride="${carouselString}"]`;
const carouselItem = `${carouselString}-item`;
const dataBsSlideTo = 'data-bs-slide-to';
const dataBsSlide = 'data-bs-slide';

const pausedClass = 'paused';

const carouselDefaults = {
  pause: 'hover',
  keyboard: false,
  touch: true,
  interval: 5000,
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
const carouselSlideEvent = OriginalEvent(`slide.bs.${carouselString}`);
const carouselSlidEvent = OriginalEvent(`slid.bs.${carouselString}`);

// CAROUSEL EVENT HANDLERS
// =======================
/**
 * The `transitionend` event listener of the `Carousel`.
 * @param {Carousel} self the `Carousel` instance
 */
function carouselTransitionEndHandler(self) {
  const {
    index, direction, element, slides, options,
  } = self;

  // discontinue disposed instances
  if (self.isAnimating && getCarouselInstance(element)) {
    const activeItem = getActiveIndex(self);
    const orientation = direction === 'left' ? 'next' : 'prev';
    const directionClass = direction === 'left' ? 'start' : 'end';

    addClass(slides[index], activeClass);
    removeClass(slides[activeItem], activeClass);

    removeClass(slides[index], `${carouselItem}-${orientation}`);
    removeClass(slides[index], `${carouselItem}-${directionClass}`);
    removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);

    dispatchEvent(element, carouselSlidEvent);
    Timer.clear(element, dataBsSlide);

    // check for element, might have been disposed
    if (!getDocument(element).hidden && options.interval
      && !self.isPaused) {
      self.cycle();
    }
  }
}

/**
 * Handles the `mouseenter` / `touchstart` events when *options.pause*
 * is set to `hover`.
 *
 * @this {HTMLElement | Element}
 */
function carouselPauseHandler() {
  const element = this;
  const self = getCarouselInstance(element);

  if (self && !self.isPaused && !Timer.get(element, pausedClass)) {
    addClass(element, pausedClass);
  }
}

/**
 * Handles the `mouseleave` / `touchend` events when *options.pause*
 * is set to `hover`.
 *
 * @this {HTMLElement | Element}
 */
function carouselResumeHandler() {
  const element = this;
  const self = getCarouselInstance(element);

  if (self && self.isPaused && !Timer.get(element, pausedClass)) {
    self.cycle();
  }
}

/**
 * Handles the `click` event for the `Carousel` indicators.
 *
 * @this {HTMLElement}
 * @param {MouseEvent} e the `Event` object
 */
function carouselIndicatorHandler(e) {
  e.preventDefault();
  const indicator = this;
  const element = closest(indicator, carouselSelector) || getTargetElement(indicator);
  if (!element) return;
  const self = getCarouselInstance(element);

  if (!self || self.isAnimating) return;

  // @ts-ignore
  const newIndex = +getAttribute(indicator, dataBsSlideTo);

  if (indicator && !hasClass(indicator, activeClass) // event target is not active
    && !Number.isNaN(newIndex)) { // AND has the specific attribute
    self.to(newIndex); // do the slide
  }
}

/**
 * Handles the `click` event for the `Carousel` arrows.
 *
 * @this {HTMLElement}
 * @param {MouseEvent} e the `Event` object
 */
function carouselControlsHandler(e) {
  e.preventDefault();
  const control = this;
  const element = closest(control, carouselSelector) || getTargetElement(control);
  const self = element && getCarouselInstance(element);
  if (!self || self.isAnimating) return;
  const orientation = getAttribute(control, dataBsSlide);

  if (orientation === 'next') {
    self.next();
  } else if (orientation === 'prev') {
    self.prev();
  }
}

/**
 * Handles the keyboard `keydown` event for the visible `Carousel` elements.
 *
 * @param {KeyboardEvent} e the `Event` object
 */
function carouselKeyHandler({ code }) {
  const [element] = [...querySelectorAll(carouselSelector)]
    .filter((x) => isElementInScrollRange(x));

  const self = getCarouselInstance(element);
  if (!self) return;
  const RTL = isRTL();
  const arrowKeyNext = !RTL ? keyArrowRight : keyArrowLeft;
  const arrowKeyPrev = !RTL ? keyArrowLeft : keyArrowRight;

  if (code === arrowKeyPrev) self.prev();
  else if (code === arrowKeyNext) self.next();
}

// CAROUSEL TOUCH HANDLERS
// =======================
/**
 * Handles the `touchdown` event for the `Carousel` element.
 *
 * @this {HTMLElement | Element}
 * @param {TouchEvent} e the `Event` object
 */
function carouselTouchDownHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || self.isTouch) { return; }

  startX = e.changedTouches[0].pageX;

  // @ts-ignore
  if (element.contains(e.target)) {
    self.isTouch = true;
    toggleCarouselTouchHandlers(self, true);
  }
}

/**
 * Handles the `touchmove` event for the `Carousel` element.
 *
 * @this {HTMLElement | Element}
 * @param {TouchEvent} e
 */
function carouselTouchMoveHandler(e) {
  const { changedTouches, type } = e;
  const self = getCarouselInstance(this);

  if (!self || !self.isTouch) { return; }

  currentX = changedTouches[0].pageX;

  // cancel touch if more than one changedTouches detected
  if (type === touchmoveEvent && changedTouches.length > 1) {
    e.preventDefault();
  }
}

/**
 * Handles the `touchend` event for the `Carousel` element.
 *
 * @this {HTMLElement | Element}

 * @param {TouchEvent} e
 */
function carouselTouchEndHandler(e) {
  const element = this;
  const self = getCarouselInstance(element);

  if (!self || !self.isTouch) { return; }

  endX = currentX || e.changedTouches[0].pageX;

  if (self.isTouch) {
    // the event target is outside the carousel OR carousel doens't include the related target
    // @ts-ignore
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
  [...indicators].forEach((x) => removeClass(x, activeClass));

  if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
}

/**
 * Toggles the touch event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean=} add when `TRUE` event listeners are added
 */
function toggleCarouselTouchHandlers(self, add) {
  const { element } = self;
  const action = add ? on : off;
  action(element, touchmoveEvent, carouselTouchMoveHandler, passiveHandler);
  action(element, touchendEvent, carouselTouchEndHandler, passiveHandler);
}

/**
 * Toggles all event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean=} add when `TRUE` event listeners are added
 */
function toggleCarouselHandlers(self, add) {
  const {
    element, options, slides, controls, indicators,
  } = self;
  const {
    touch, pause, interval, keyboard,
  } = options;
  const action = add ? on : off;

  if (pause && interval) {
    action(element, mouseenterEvent, carouselPauseHandler);
    action(element, mouseleaveEvent, carouselResumeHandler);
    action(element, touchstartEvent, carouselPauseHandler, passiveHandler);
    action(element, touchendEvent, carouselResumeHandler, passiveHandler);
  }

  if (touch && slides.length > 1) {
    action(element, touchstartEvent, carouselTouchDownHandler, passiveHandler);
  }

  if (controls.length) {
    controls.forEach((arrow) => {
      if (arrow) action(arrow, mouseclickEvent, carouselControlsHandler);
    });
  }

  if (indicators.length) {
    indicators.forEach((indicator) => {
      action(indicator, mouseclickEvent, carouselIndicatorHandler);
    });
  }
  // @ts-ignore
  if (keyboard) action(getWindow(element), keydownEvent, carouselKeyHandler);
}

/**
 * Returns the index of the current active item.
 * @param {Carousel} self the `Carousel` instance
 * @returns {number} the query result
 */
function getActiveIndex(self) {
  const { slides, element } = self;
  const activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
  // @ts-ignore
  return [...slides].indexOf(activeItem);
}

// CAROUSEL DEFINITION
// ===================
/** Creates a new `Carousel` instance. */
export default class Carousel extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target mostly a `.carousel` element
   * @param {BSN.Options.Carousel=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // additional properties
    /** @type {string} */
    self.direction = isRTL() ? 'right' : 'left';
    /** @type {number} */
    self.index = 0;
    /** @type {boolean} */
    self.isTouch = false;

    // initialization element
    const { element } = self;
    // carousel elements
    // a LIVE collection is prefferable
    self.slides = getElementsByClassName(carouselItem, element);
    const { slides } = self;

    // invalidate when not enough items
    // no need to go further
    if (slides.length < 2) { return; }

    self.controls = [
      ...querySelectorAll(`[${dataBsSlide}]`, element),
      ...querySelectorAll(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`),
    ];

    /** @type {(HTMLElement | Element)?} */
    self.indicator = querySelector(`.${carouselString}-indicators`, element);

    // a LIVE collection is prefferable
    /** @type {(HTMLElement | Element)[]} */
    self.indicators = [
      ...(self.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, self.indicator) : []),
      ...querySelectorAll(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`),
    ];

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
    toggleCarouselHandlers(self, true);

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

  /**
   * Check if instance is paused.
   * @returns {boolean}
  */
  get isPaused() {
    return hasClass(this.element, pausedClass);
  }

  /**
   * Check if instance is animating.
   * @returns {boolean}
  */
  get isAnimating() {
    return querySelector(`.${carouselItem}-next,.${carouselItem}-prev`, this.element) !== null;
  }

  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const self = this;
    const { element, options, isPaused } = self;

    Timer.clear(element, carouselString);
    if (isPaused) {
      Timer.clear(element, pausedClass);
      removeClass(element, pausedClass);
    }

    Timer.set(element, () => {
      if (!self.isPaused && isElementInScrollRange(element)) {
        self.index += 1;
        self.to(self.index);
      }
    }, options.interval, carouselString);
  }

  /** Pause the automatic cycle. */
  pause() {
    const self = this;
    const { element, options } = self;
    if (!self.isPaused && options.interval) {
      addClass(element, pausedClass);
      Timer.set(element, () => {}, 1, pausedClass);
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
      element, slides, options,
    } = self;
    const activeItem = getActiveIndex(self);
    const RTL = isRTL();
    let next = idx;

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    if (self.isAnimating || activeItem === next) return;

    // determine transition direction
    if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
      self.direction = RTL ? 'right' : 'left'; // next
    } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
      self.direction = RTL ? 'left' : 'right'; // prev
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
    ObjectAssign(carouselSlideEvent, eventProperties);
    ObjectAssign(carouselSlidEvent, eventProperties);

    // discontinue when prevented
    dispatchEvent(element, carouselSlideEvent);
    if (carouselSlideEvent.defaultPrevented) return;

    // update index
    self.index = next;
    activateCarouselIndicator(self, next);

    if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
      Timer.set(element, () => {
        addClass(slides[next], `${carouselItem}-${orientation}`);
        reflow(slides[next]);
        addClass(slides[next], `${carouselItem}-${directionClass}`);
        addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

        emulateTransitionEnd(slides[next], () => carouselTransitionEndHandler(self));
      }, 17, dataBsSlide);
    } else {
      addClass(slides[next], activeClass);
      removeClass(slides[activeItem], activeClass);

      Timer.set(element, () => {
        Timer.clear(element, dataBsSlide);
        // check for element, might have been disposed
        if (element && options.interval && !self.isPaused) {
          self.cycle();
        }

        dispatchEvent(element, carouselSlidEvent);
      }, 17, dataBsSlide);
    }
  }

  /** Remove `Carousel` component from target. */
  dispose() {
    const self = this;
    const { slides } = self;
    const itemClasses = ['start', 'end', 'prev', 'next'];

    [...slides].forEach((slide, idx) => {
      if (hasClass(slide, activeClass)) activateCarouselIndicator(self, idx);
      itemClasses.forEach((c) => removeClass(slide, `${carouselItem}-${c}`));
    });

    toggleCarouselHandlers(self);
    super.dispose();
  }
}

ObjectAssign(Carousel, {
  selector: carouselSelector,
  init: carouselInitCallback,
  getInstance: getCarouselInstance,
});
