/* Native JavaScript for Bootstrap 5 | Carousel
----------------------------------------------- */
import {
  createCustomEvent,
  getInstance,
  dispatchEvent,
  ObjectAssign,
  emulateTransitionEnd,
  passiveHandler,
  reflow,
  Timer,
  getAttribute,
  getElementsByClassName,
  querySelectorAll,
  querySelector,
  closest,
  isHTMLElement,
  isRTL,
  isElementInScrollRange,
  getElementTransitionDuration,
  getDocument,
  pointerupEvent,
  pointermoveEvent,
  pointerdownEvent,
  keyArrowRight,
  keyArrowLeft,
  keydownEvent,
  mouseclickEvent,
  mouseleaveEvent,
  mouseenterEvent,
  touchstartEvent,
  dragstartEvent,
  addClass,
  hasClass,
  removeClass,
  matches,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import activeClass from '../strings/activeClass';
import dataBsTarget from '../strings/dataBsTarget';
import carouselString from '../strings/carouselString';
import carouselComponent from '../strings/carouselComponent';
import getTargetElement from '../util/getTargetElement';
import BaseComponent from './base-component';
import type { CarouselEvent, CarouselOptions } from '../interface/carousel';

// CAROUSEL PRIVATE GC
// ===================
const carouselSelector = `[data-bs-ride="${carouselString}"]`;
const carouselItem = `${carouselString}-item`;
const dataBsSlideTo = 'data-bs-slide-to';
const dataBsSlide = 'data-bs-slide';
const pausedClass = 'paused';

const carouselDefaults: CarouselOptions = {
  pause: 'hover',
  keyboard: false,
  touch: true,
  interval: 5000,
};

/**
 * Static method which returns an existing `Carousel` instance associated
 * to a target `Element`.
 */
const getCarouselInstance = (element: HTMLElement) => getInstance<Carousel>(element, carouselComponent);

/**
 * A `Carousel` initialization callback.
 */
const carouselInitCallback = (element: HTMLElement) => new Carousel(element);

let startX = 0;
let currentX = 0;
let endX = 0;

// CAROUSEL CUSTOM EVENTS
// ======================
const carouselSlideEvent = createCustomEvent<CarouselEvent>(`slide.bs.${carouselString}`);
const carouselSlidEvent = createCustomEvent<CarouselEvent>(`slid.bs.${carouselString}`);

// CAROUSEL EVENT HANDLERS
// =======================
/**
 * The `transitionend` event listener of the `Carousel`.
 *
 * @param self the `Carousel` instance
 */
const carouselTransitionEndHandler = (self: Carousel) => {
  const { index, direction, element, slides, options } = self;

  /* istanbul ignore else */
  if (self.isAnimating) {
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

    // must check if a previous instance is disposed
    if (self.cycle && !getDocument(element).hidden && options.interval && !self.isPaused) {
      self.cycle();
    }
  }
};

/**
 * Handles the `mouseenter` events when *options.pause*
 * is set to `hover`.
 */
function carouselPauseHandler(this: HTMLElement) {
  // const element = this;
  const self = getCarouselInstance(this);
  /* istanbul ignore else */
  if (self && !self.isPaused && !Timer.get(this, pausedClass)) {
    addClass(this, pausedClass);
  }
}

/**
 * Handles the `mouseleave` events when *options.pause*
 * is set to `hover`.
 *
 */
function carouselResumeHandler(this: HTMLElement) {
  // const element = this;
  const self = getCarouselInstance(this);
  /* istanbul ignore else */
  if (self && self.isPaused && !Timer.get(this, pausedClass)) {
    self.cycle();
  }
}

/**
 * Handles the `click` event for the `Carousel` indicators.
 *
 * @param e the `Event` object
 */
function carouselIndicatorHandler(this: HTMLElement, e: MouseEvent) {
  e.preventDefault();
  // const indicator = this;
  const element = (closest(this, carouselSelector) || getTargetElement(this)) as HTMLElement;
  const self = getCarouselInstance(element);

  if (self && !self.isAnimating) {
    const newIndex = +(getAttribute(this, dataBsSlideTo) || /* istanbul ignore next */ 0);

    if (
      this &&
      !hasClass(this, activeClass) && // event target is not active
      !Number.isNaN(newIndex)
    ) {
      // AND has the specific attribute
      self.to(newIndex); // do the slide
    }
  }
}

/**
 * Handles the `click` event for the `Carousel` arrows.
 *
 * @param e the `Event` object
 */
function carouselControlsHandler(this: HTMLElement, e: MouseEvent) {
  e.preventDefault();
  const element = closest(this, carouselSelector) || (getTargetElement(this) as HTMLElement);
  const self = getCarouselInstance(element);

  if (self && !self.isAnimating) {
    const orientation = getAttribute(this, dataBsSlide);

    /* istanbul ignore else */
    if (orientation === 'next') {
      self.next();
    } else if (orientation === 'prev') {
      self.prev();
    }
  }
}

/**
 * Handles the keyboard `keydown` event for the visible `Carousel` elements.
 *
 * @param e the `Event` object
 */
const carouselKeyHandler = ({ code, target }: KeyboardEvent & { target: Node }) => {
  const doc = getDocument(target);
  const [element] = [...querySelectorAll(carouselSelector, doc)].filter(x => isElementInScrollRange(x));
  const self = getCarouselInstance(element);

  /* istanbul ignore next */
  if (self && !self.isAnimating && !/textarea|input/i.test(target.nodeName)) {
    const RTL = isRTL(element);
    const arrowKeyNext = !RTL ? keyArrowRight : keyArrowLeft;
    const arrowKeyPrev = !RTL ? keyArrowLeft : keyArrowRight;

    /* istanbul ignore else */
    if (code === arrowKeyPrev) self.prev();
    else if (code === arrowKeyNext) self.next();
  }
};

// CAROUSEL TOUCH HANDLERS
// =======================
/**
 * Prevents the `touchstart` and `dragstart` events for the `Carousel` element.
 *
 * @param e the `Event` object
 */
function carouselDragHandler(this: HTMLElement, e: DragEvent | TouchEvent) {
  const { target } = e;
  const self = getCarouselInstance(this);

  /* istanbul ignore next */
  if (
    self &&
    self.isTouch &&
    ((self.indicator && !self.indicator.contains(target as Node)) || !self.controls.includes(target as HTMLElement))
  ) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  }
}

// CAROUSEL POINTER HANDLERS
// =========================
/**
 * Handles the `pointerdown` event for the `Carousel` element.
 *
 * @param e the `Event` object
 */
function carouselPointerDownHandler(this: HTMLElement, e: PointerEvent) {
  const { target } = e;
  const self = getCarouselInstance(this);

  if (self && !self.isAnimating && !self.isTouch) {
    // filter pointer event on controls & indicators
    const { controls, indicators } = self;
    if (![...controls, ...indicators].every(el => el === target || el.contains(target as Node))) {
      startX = e.pageX;

      /* istanbul ignore else */
      if (this.contains(target as Node)) {
        self.isTouch = true;
        toggleCarouselTouchHandlers(self, true);
      }
    }
  }
}

/**
 * Handles the `pointermove` event for the `Carousel` element.
 *
 * @param e
 */
const carouselPointerMoveHandler = (e: PointerEvent) => {
  currentX = e.pageX;
};

/**
 * Handles the `pointerup` event for the `Carousel` element.
 *
 * @param e
 */
const carouselPointerUpHandler = (e: PointerEvent) => {
  const { target } = e;
  const doc = getDocument(target as Node);
  const self = [...querySelectorAll(carouselSelector, doc)]
    .map(c => getCarouselInstance(c) as Carousel)
    .find(i => i.isTouch) as Carousel;

  // impossible to satisfy
  /* istanbul ignore else */
  if (self) {
    const { element, index } = self;
    const RTL = isRTL(element);
    endX = e.pageX;

    self.isTouch = false;
    toggleCarouselTouchHandlers(self);

    if (
      !doc.getSelection()?.toString().length &&
      element.contains(target as HTMLElement) &&
      Math.abs(startX - endX) > 120
    ) {
      // determine next index to slide to
      /* istanbul ignore else */
      if (currentX < startX) {
        self.to(index + (RTL ? -1 : 1));
      } else if (currentX > startX) {
        self.to(index + (RTL ? 1 : -1));
      }
    }

    // reset pointer position
    startX = 0;
    currentX = 0;
    endX = 0;
  }
};

// CAROUSEL PRIVATE METHODS
// ========================
/**
 * Sets active indicator for the `Carousel` instance.
 *
 * @param self the `Carousel` instance
 * @param index the index of the new active indicator
 */
const activateCarouselIndicator = (self: Carousel, index: number) => {
  const { indicators } = self;
  [...indicators].forEach(x => removeClass(x, activeClass));

  /* istanbul ignore else */
  if (self.indicators[index]) addClass(indicators[index], activeClass);
};

/**
 * Toggles the pointer event listeners for a given `Carousel` instance.
 *
 * @param self the `Carousel` instance
 * @param add when `TRUE` event listeners are added
 */
const toggleCarouselTouchHandlers = (self: Carousel, add?: boolean) => {
  const { element } = self;
  const action = add ? addListener : removeListener;
  action(getDocument(element), pointermoveEvent, carouselPointerMoveHandler, passiveHandler);
  action(getDocument(element), pointerupEvent, carouselPointerUpHandler, passiveHandler);
};

/**
 * Returns the index of the current active item.
 *
 * @param self the `Carousel` instance
 * @returns the query result
 */
const getActiveIndex = (self: Carousel) => {
  const { slides, element } = self;
  const activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
  return isHTMLElement(activeItem) ? [...slides].indexOf(activeItem) : -1;
};

// CAROUSEL DEFINITION
// ===================
/** Creates a new `Carousel` instance. */
export default class Carousel extends BaseComponent {
  static selector = carouselSelector;
  static init = carouselInitCallback;
  static getInstance = getCarouselInstance;
  declare options: CarouselOptions;
  declare direction: 'right' | 'left';
  declare index: number;
  declare isTouch: boolean;
  declare slides: HTMLCollectionOf<HTMLElement>;
  declare controls: HTMLElement[];
  declare indicator: HTMLElement | null;
  declare indicators: HTMLElement[];

  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<CarouselOptions>) {
    super(target, config);

    // initialization element
    const { element } = this;

    // additional properties
    this.direction = isRTL(element) ? 'right' : 'left';
    this.isTouch = false;

    // carousel elements
    // a LIVE collection is prefferable
    this.slides = getElementsByClassName(carouselItem, element);
    const { slides } = this;

    // invalidate when not enough items
    // no need to go further
    if (slides.length >= 2) {
      const activeIndex = getActiveIndex(this);
      // recover item from disposed instance
      const transitionItem = [...slides].find(s => matches(s, `.${carouselItem}-next,.${carouselItem}-next`));
      this.index = activeIndex;

      // external controls must be within same document context
      const doc = getDocument(element);

      this.controls = [
        ...querySelectorAll(`[${dataBsSlide}]`, element),
        ...querySelectorAll(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`, doc),
      ].filter((c, i, ar) => i === ar.indexOf(c));

      this.indicator = querySelector(`.${carouselString}-indicators`, element);

      // a LIVE collection is prefferable
      this.indicators = [
        ...(this.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, this.indicator) : []),
        ...querySelectorAll(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`, doc),
      ].filter((c, i, ar) => i === ar.indexOf(c));

      // set JavaScript and DATA API options
      const { options } = this;

      // don't use TRUE as interval, it's actually 0, use the default 5000ms better
      this.options.interval = options.interval === true ? carouselDefaults.interval : options.interval;

      // set first slide active if none
      /* istanbul ignore next - impossible to test with cypress */
      if (transitionItem) {
        this.index = [...slides].indexOf(transitionItem);
      } else if (activeIndex < 0) {
        this.index = 0;
        addClass(slides[0], activeClass);
        if (this.indicators.length) activateCarouselIndicator(this, 0);
      }

      /* istanbul ignore else */
      if (this.indicators.length) activateCarouselIndicator(this, this.index);

      // attach event handlers
      this._toggleEventListeners(true);

      // start to cycle if interval is set
      if (options.interval) this.cycle();
    }
  }

  /**
   * Returns component name string.
   */
  get name() {
    return carouselComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return carouselDefaults;
  }

  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return hasClass(this.element, pausedClass);
  }

  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return querySelector(`.${carouselItem}-next,.${carouselItem}-prev`, this.element) !== null;
  }

  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element, options, isPaused, index } = this;

    Timer.clear(element, carouselString);
    if (isPaused) {
      Timer.clear(element, pausedClass);
      removeClass(element, pausedClass);
    }

    Timer.set(
      element,
      () => {
        // it's very important to check self.element
        // where instance might have been disposed
        /* istanbul ignore else */
        if (this.element && !this.isPaused && !this.isTouch && isElementInScrollRange(element)) {
          this.to(index + 1);
        }
      },
      options.interval as number,
      carouselString,
    );
  }

  /** Pause the automatic cycle. */
  pause() {
    const { element, options } = this;
    /* istanbul ignore else */
    if (!this.isPaused && options.interval) {
      addClass(element, pausedClass);
      Timer.set(
        element,
        () => {
          /* ESLint is now happy */
        },
        1,
        pausedClass,
      );
    }
  }

  /** Slide to the next item. */
  next() {
    /* istanbul ignore else */
    if (!this.isAnimating) {
      this.to(this.index + 1);
    }
  }

  /** Slide to the previous item. */
  prev() {
    /* istanbul ignore else */
    if (!this.isAnimating) {
      this.to(this.index - 1);
    }
  }

  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(idx: number) {
    const { element, slides, options } = this;
    const activeItem = getActiveIndex(this);
    const RTL = isRTL(element);
    let next = idx;

    // when controled via methods, make sure to check again
    // first return if we're on the same item #227
    // `to()` must be SPAM protected by Timer
    if (!this.isAnimating && activeItem !== next && !Timer.get(element, dataBsSlide)) {
      // determine transition direction
      /* istanbul ignore else */
      if (activeItem < next || (activeItem === 0 && next === slides.length - 1)) {
        this.direction = RTL ? 'right' : 'left'; // next
      } else if (activeItem > next || (activeItem === slides.length - 1 && next === 0)) {
        this.direction = RTL ? 'left' : 'right'; // prev
      }
      const { direction } = this;

      // find the right next index
      if (next < 0) {
        next = slides.length - 1;
      } else if (next >= slides.length) {
        next = 0;
      }

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
      if (!carouselSlideEvent.defaultPrevented) {
        // update index
        this.index = next;
        activateCarouselIndicator(this, next);

        if (getElementTransitionDuration(slides[next]) && hasClass(element, 'slide')) {
          Timer.set(
            element,
            () => {
              addClass(slides[next], `${carouselItem}-${orientation}`);
              reflow(slides[next]);
              addClass(slides[next], `${carouselItem}-${directionClass}`);
              addClass(slides[activeItem], `${carouselItem}-${directionClass}`);

              // the instance might get diposed mid-animation
              emulateTransitionEnd(
                slides[next],
                () => this.slides && this.slides.length && carouselTransitionEndHandler(this),
              );
            },
            0,
            dataBsSlide,
          );
        } else {
          addClass(slides[next], activeClass);
          removeClass(slides[activeItem], activeClass);

          Timer.set(
            element,
            () => {
              Timer.clear(element, dataBsSlide);
              // check for element, might have been disposed
              /* istanbul ignore else */
              if (element && options.interval && !this.isPaused) {
                this.cycle();
              }

              dispatchEvent(element, carouselSlidEvent);
            },
            0,
            dataBsSlide,
          );
        }
      }
    }
  }

  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (add?: boolean) => {
    const { element, options, slides, controls, indicators } = this;
    const { touch, pause, interval, keyboard } = options;
    const action = add ? addListener : removeListener;

    if (pause && interval) {
      action(element, mouseenterEvent, carouselPauseHandler);
      action(element, mouseleaveEvent, carouselResumeHandler);
    }

    if (touch && slides.length > 2) {
      action(element, pointerdownEvent, carouselPointerDownHandler, passiveHandler);
      action(element, touchstartEvent, carouselDragHandler, { passive: false });
      action(element, dragstartEvent, carouselDragHandler, { passive: false });
    }

    /* istanbul ignore else */
    if (controls.length) {
      controls.forEach(arrow => {
        /* istanbul ignore else */
        if (arrow) action(arrow, mouseclickEvent, carouselControlsHandler);
      });
    }

    /* istanbul ignore else */
    if (indicators.length) {
      indicators.forEach(indicator => {
        action(indicator, mouseclickEvent, carouselIndicatorHandler);
      });
    }

    if (keyboard) action(getDocument(element), keydownEvent, carouselKeyHandler);
  };

  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating } = this;

    const clone = {
      ...this,
      isAnimating,
    };
    this._toggleEventListeners();
    super.dispose();

    // istanbul ignore next - impossible to test with cypress
    if (clone.isAnimating) {
      emulateTransitionEnd(clone.slides[clone.index], () => {
        carouselTransitionEndHandler(clone);
      });
    }
  }
}
