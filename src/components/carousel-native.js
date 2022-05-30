/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */
import mouseenterEvent from '@thednp/shorty/src/strings/mouseenterEvent';
import mouseleaveEvent from '@thednp/shorty/src/strings/mouseleaveEvent';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import keydownEvent from '@thednp/shorty/src/strings/keydownEvent';
import keyArrowLeft from '@thednp/shorty/src/strings/keyArrowLeft';
import keyArrowRight from '@thednp/shorty/src/strings/keyArrowRight';
import pointerdownEvent from '@thednp/shorty/src/strings/pointerdownEvent';
import pointermoveEvent from '@thednp/shorty/src/strings/pointermoveEvent';
import pointerupEvent from '@thednp/shorty/src/strings/pointerupEvent';
import getDocument from '@thednp/shorty/src/get/getDocument';
import getElementTransitionDuration from '@thednp/shorty/src/get/getElementTransitionDuration';
import isElementInScrollRange from '@thednp/shorty/src/is/isElementInScrollRange';
import isRTL from '@thednp/shorty/src/is/isRTL';
import closest from '@thednp/shorty/src/selectors/closest';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import querySelectorAll from '@thednp/shorty/src/selectors/querySelectorAll';
import getElementsByClassName from '@thednp/shorty/src/selectors/getElementsByClassName';
import getAttribute from '@thednp/shorty/src/attr/getAttribute';
import Timer from '@thednp/shorty/src/misc/timer';
import reflow from '@thednp/shorty/src/misc/reflow';
import passiveHandler from '@thednp/shorty/src/misc/passiveHandler';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import { getInstance } from '@thednp/shorty/src/misc/data';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';

import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

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
  /* istanbul ignore else */
  if (self.isAnimating && getCarouselInstance(element)) {
    const activeItem = getActiveIndex(self);
    const orientation = direction === 'left' ? 'next' : 'prev';
    const directionClass = direction === 'left' ? 'start' : 'end';

    addClass(slides[index], activeClass);
    removeClass(slides[index], `${carouselItem}-${orientation}`);
    removeClass(slides[index], `${carouselItem}-${directionClass}`);

    removeClass(slides[activeItem], activeClass);
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
 * Handles the `mouseenter` events when *options.pause*
 * is set to `hover`.
 *
 * @this {HTMLElement}
 */
function carouselPauseHandler() {
  const element = this;
  const self = getCarouselInstance(element);
  /* istanbul ignore else */
  if (self && !self.isPaused && !Timer.get(element, pausedClass)) {
    addClass(element, pausedClass);
  }
}

/**
 * Handles the `mouseleave` events when *options.pause*
 * is set to `hover`.
 *
 * @this {HTMLElement}
 */
function carouselResumeHandler() {
  const element = this;
  const self = getCarouselInstance(element);
  /* istanbul ignore else */
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
  const self = getCarouselInstance(element);

  if (!self || self.isAnimating) return;

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
  const self = getCarouselInstance(element);

  if (!self || self.isAnimating) return;
  const orientation = getAttribute(control, dataBsSlide);

  /* istanbul ignore else */
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
function carouselKeyHandler({ code, target }) {
  const doc = getDocument(target);
  const [element] = [...querySelectorAll(carouselSelector, doc)]
    .filter((x) => isElementInScrollRange(x));
  const self = getCarouselInstance(element);

  /* istanbul ignore next */
  if (!self || self.isAnimating || /textarea|input/i.test(target.tagName)) return;
  const RTL = isRTL(element);
  const arrowKeyNext = !RTL ? keyArrowRight : keyArrowLeft;
  const arrowKeyPrev = !RTL ? keyArrowLeft : keyArrowRight;

  /* istanbul ignore else */
  if (code === arrowKeyPrev) self.prev();
  else if (code === arrowKeyNext) self.next();
}

// CAROUSEL TOUCH HANDLERS
// =======================
/**
 * Handles the `pointerdown` event for the `Carousel` element.
 *
 * @this {HTMLElement}
 * @param {PointerEvent} e the `Event` object
 */
function carouselPointerDownHandler(e) {
  const element = this;
  const { target } = e;
  const self = getCarouselInstance(element);

  // filter pointer event on controls & indicators
  const { controls, indicators } = self;
  if ([...controls, ...indicators].some((el) => (el === target || el.contains(target)))) {
    return;
  }

  if (!self || self.isAnimating || self.isTouch) { return; }

  startX = e.pageX;

  /* istanbul ignore else */
  if (element.contains(target)) {
    self.isTouch = true;
    toggleCarouselTouchHandlers(self, true);
  }
}

/**
 * Handles the `pointermove` event for the `Carousel` element.
 *
 * @this {HTMLElement}
 * @param {PointerEvent} e
 */
function carouselPointerMoveHandler(e) {
  // const self = getCarouselInstance(this);

  // if (!self || !self.isTouch) { return; }

  currentX = e.pageX;
}

/**
 * Handles the `pointerup` event for the `Carousel` element.
 *
 * @this {HTMLElement}

 * @param {PointerEvent} e
 */
function carouselPointerUpHandler(e) {
  const { target } = e;
  const doc = getDocument(target);
  const self = [...querySelectorAll(carouselSelector, doc)]
    .map((c) => getCarouselInstance(c)).find((i) => i.isTouch);

  // impossible to satisfy
  /* istanbul ignore next */
  if (!self) { return; }

  const { element, index } = self;
  const RTL = isRTL(target);

  self.isTouch = false;
  toggleCarouselTouchHandlers(self);

  if (doc.getSelection().toString().length) {
    // reset pointer position
    startX = 0; currentX = 0; endX = 0;
    return;
  }

  endX = e.pageX;

  // the event target is outside the carousel context
  // OR swipe distance is less than 120px
  /* istanbul ignore else */
  if (!element.contains(target) || Math.abs(startX - endX) < 120) {
    // reset pointer position
    startX = 0; currentX = 0; endX = 0;
    return;
  }
  // OR determine next index to slide to
  /* istanbul ignore else */
  if (currentX < startX) {
    self.to(index + (RTL ? -1 : 1));
  } else if (currentX > startX) {
    self.to(index + (RTL ? 1 : -1));
  }
  // reset pointer position
  startX = 0; currentX = 0; endX = 0;
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

  /* istanbul ignore else */
  if (self.indicators[pageIndex]) addClass(indicators[pageIndex], activeClass);
}

/**
 * Toggles the pointer event listeners for a given `Carousel` instance.
 * @param {Carousel} self the `Carousel` instance
 * @param {boolean=} add when `TRUE` event listeners are added
 */
function toggleCarouselTouchHandlers(self, add) {
  const { element } = self;
  const action = add ? addListener : removeListener;
  action(getDocument(element), pointermoveEvent, carouselPointerMoveHandler, passiveHandler);
  action(getDocument(element), pointerupEvent, carouselPointerUpHandler, passiveHandler);
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
  const action = add ? addListener : removeListener;

  if (pause && interval) {
    action(element, mouseenterEvent, carouselPauseHandler);
    action(element, mouseleaveEvent, carouselResumeHandler);
  }

  if (touch && slides.length > 2) {
    action(element, pointerdownEvent, carouselPointerDownHandler, passiveHandler);
  }

  /* istanbul ignore else */
  if (controls.length) {
    controls.forEach((arrow) => {
      /* istanbul ignore else */
      if (arrow) action(arrow, mouseclickEvent, carouselControlsHandler);
    });
  }

  /* istanbul ignore else */
  if (indicators.length) {
    indicators.forEach((indicator) => {
      action(indicator, mouseclickEvent, carouselIndicatorHandler);
    });
  }

  if (keyboard) action(getDocument(element), keydownEvent, carouselKeyHandler);
}

/**
 * Returns the index of the current active item.
 * @param {Carousel} self the `Carousel` instance
 * @returns {number} the query result
 */
function getActiveIndex(self) {
  const { slides, element } = self;
  const activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
  return [...slides].indexOf(activeItem);
}

// CAROUSEL DEFINITION
// ===================
/** Creates a new `Carousel` instance. */
export default class Carousel extends BaseComponent {
  /**
   * @param {HTMLElement | string} target mostly a `.carousel` element
   * @param {BSN.Options.Carousel=} config instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;
    // initialization element
    const { element } = self;

    // additional properties
    /** @type {string} */
    self.direction = isRTL(element) ? 'right' : 'left';
    /** @type {number} */
    self.index = 0;
    /** @type {boolean} */
    self.isTouch = false;

    // carousel elements
    // a LIVE collection is prefferable
    self.slides = getElementsByClassName(carouselItem, element);
    const { slides } = self;

    // invalidate when not enough items
    // no need to go further
    if (slides.length < 2) { return; }
    // external controls must be within same document context
    const doc = getDocument(element);

    self.controls = [
      ...querySelectorAll(`[${dataBsSlide}]`, element),
      ...querySelectorAll(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`, doc),
    ];

    /** @type {HTMLElement?} */
    self.indicator = querySelector(`.${carouselString}-indicators`, element);

    // a LIVE collection is prefferable
    /** @type {HTMLElement[]} */
    self.indicators = [
      ...(self.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, self.indicator) : []),
      ...querySelectorAll(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`, doc),
    ];

    // set JavaScript and DATA API options
    const { options } = self;

    // don't use TRUE as interval, it's actually 0, use the default 5000ms better
    self.options.interval = options.interval === true
      ? carouselDefaults.interval
      : options.interval;

    // set first slide active if none
    /* istanbul ignore else */
    if (getActiveIndex(self) < 0) {
      addClass(slides[0], activeClass);
      /* istanbul ignore else */
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
   */
  get name() { return carouselComponent; }
  /**
   * Returns component default options.
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
    const {
      element, options, isPaused, index,
    } = self;

    Timer.clear(element, carouselString);
    if (isPaused) {
      Timer.clear(element, pausedClass);
      removeClass(element, pausedClass);
    }

    Timer.set(element, () => {
      // it's very important to check self.element
      // where instance might have been disposed
      /* istanbul ignore else */
      if (self.element && !self.isPaused && !self.isTouch
        && isElementInScrollRange(element)) {
        self.to(index + 1);
      }
    }, options.interval, carouselString);
  }

  /** Pause the automatic cycle. */
  pause() {
    const self = this;
    const { element, options } = self;
    /* istanbul ignore else */
    if (!self.isPaused && options.interval) {
      addClass(element, pausedClass);
      Timer.set(element, () => {}, 1, pausedClass);
    }
  }

  /** Slide to the next item. */
  next() {
    const self = this;
    /* istanbul ignore else */
    if (!self.isAnimating) { self.to(self.index + 1); }
  }

  /** Slide to the previous item. */
  prev() {
    const self = this;
    /* istanbul ignore else */
    if (!self.isAnimating) { self.to(self.index - 1); }
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
    const RTL = isRTL(element);
    let next = idx;

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    // `to()` must be SPAM protected by Timer
    if (self.isAnimating || activeItem === next || Timer.get(element, dataBsSlide)) return;

    // determine transition direction
    /* istanbul ignore else */
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
      }, 0, dataBsSlide);
    } else {
      addClass(slides[next], activeClass);
      removeClass(slides[activeItem], activeClass);

      Timer.set(element, () => {
        Timer.clear(element, dataBsSlide);
        // check for element, might have been disposed
        /* istanbul ignore else */
        if (element && options.interval && !self.isPaused) {
          self.cycle();
        }

        dispatchEvent(element, carouselSlidEvent);
      }, 0, dataBsSlide);
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
