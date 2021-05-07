/* Native JavaScript for Bootstrap 4 | Carousel
----------------------------------------------- */
import mouseHoverEvents from 'shorter-js/src/strings/mouseHoverEvents.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler.js';
import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import isElementInScrollRange from 'shorter-js/src/misc/isElementInScrollRange.js';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import reflow from 'shorter-js/src/misc/reflow.js';

import bootstrapCustomEvent from '../util/bootstrapCustomEvent-v4.js';
import dispatchCustomEvent from '../util/dispatchCustomEvent.js';

// CAROUSEL DEFINITION
// ===================

export default function Carousel(elem, opsInput) {
  let element;

  // set options
  const options = opsInput || {};

  // bind
  const self = this;

  // internal variables
  let vars;
  let ops;

  // custom events
  let slideCustomEvent;
  let slidCustomEvent;

  // carousel elements
  let slides;
  let leftArrow;
  let rightArrow;
  let indicator;
  let indicators;

  // handlers
  function pauseHandler() {
    if (ops.interval !== false && !element.classList.contains('paused')) {
      element.classList.add('paused');
      if (!vars.isSliding) {
        clearInterval(vars.timer);
        vars.timer = null;
      }
    }
  }
  function resumeHandler() {
    if (ops.interval !== false && element.classList.contains('paused')) {
      element.classList.remove('paused');
      if (!vars.isSliding) {
        clearInterval(vars.timer);
        vars.timer = null;
        self.cycle();
      }
    }
  }
  function indicatorHandler(e) {
    e.preventDefault();
    if (vars.isSliding) return;

    const eventTarget = e.target; // event target | the current active item

    if (eventTarget && !eventTarget.classList.contains('active') && eventTarget.getAttribute('data-slide-to')) {
      vars.index = +(eventTarget.getAttribute('data-slide-to'));
    } else { return; }

    self.slideTo(vars.index); // Do the slide
  }
  function controlsHandler(e) {
    e.preventDefault();
    if (vars.isSliding) return;

    const eventTarget = e.currentTarget || e.srcElement;

    if (eventTarget === rightArrow) {
      vars.index += 1;
    } else if (eventTarget === leftArrow) {
      vars.index -= 1;
    }

    self.slideTo(vars.index); // Do the slide
  }
  function keyHandler({ which }) {
    if (vars.isSliding) return;
    switch (which) {
      case 39:
        vars.index += 1;
        break;
      case 37:
        vars.index -= 1;
        break;
      default: return;
    }
    self.slideTo(vars.index); // Do the slide
  }
  function toggleEvents(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    if (ops.pause && ops.interval) {
      element[action](mouseHoverEvents[0], pauseHandler, false);
      element[action](mouseHoverEvents[1], resumeHandler, false);
      element[action]('touchstart', pauseHandler, passiveHandler);
      element[action]('touchend', resumeHandler, passiveHandler);
    }

    if (ops.touch && slides.length > 1) element[action]('touchstart', touchDownHandler, passiveHandler);

    if (rightArrow) rightArrow[action]('click', controlsHandler, false);
    if (leftArrow) leftArrow[action]('click', controlsHandler, false);

    if (indicator) indicator[action]('click', indicatorHandler, false);
    if (ops.keyboard) window[action]('keydown', keyHandler, false);
  }
  // touch events
  function toggleTouchEvents(add) {
    const action = add ? 'addEventListener' : 'removeEventListener';
    element[action]('touchmove', touchMoveHandler, passiveHandler);
    element[action]('touchend', touchEndHandler, passiveHandler);
  }
  function touchDownHandler(e) {
    if (vars.isTouch) { return; }

    vars.touchPosition.startX = e.changedTouches[0].pageX;

    if (element.contains(e.target)) {
      vars.isTouch = true;
      toggleTouchEvents(1);
    }
  }
  function touchMoveHandler(e) {
    if (!vars.isTouch) { e.preventDefault(); return; }

    vars.touchPosition.currentX = e.changedTouches[0].pageX;

    // cancel touch if more than one changedTouches detected
    if (e.type === 'touchmove' && e.changedTouches.length > 1) {
      e.preventDefault();
    }
  }
  function touchEndHandler(e) {
    if (!vars.isTouch || vars.isSliding) { return; }

    vars.touchPosition.endX = vars.touchPosition.currentX || e.changedTouches[0].pageX;

    if (vars.isTouch) {
      if ((!element.contains(e.target) || !element.contains(e.relatedTarget))
          && Math.abs(vars.touchPosition.startX - vars.touchPosition.endX) < 75) {
        return;
      }
      if (vars.touchPosition.currentX < vars.touchPosition.startX) {
        vars.index += 1;
      } else if (vars.touchPosition.currentX > vars.touchPosition.startX) {
        vars.index -= 1;
      }
      vars.isTouch = false;
      self.slideTo(vars.index);

      toggleTouchEvents(); // remove
    }
  }
  // private methods
  function setActivePage(pageIndex) { // indicators
    Array.from(indicators).forEach((x) => x.classList.remove('active'));
    if (indicators[pageIndex]) indicators[pageIndex].classList.add('active');
  }
  function transitionEndHandler(e) {
    if (vars.touchPosition) {
      const next = vars.index;
      const timeout = e && e.target !== slides[next] ? e.elapsedTime * 1000 + 100 : 20;
      const activeItem = self.getActiveIndex();
      const orientation = vars.direction === 'left' ? 'next' : 'prev';

      if (vars.isSliding) {
        setTimeout(() => {
          if (vars.touchPosition) {
            vars.isSliding = false;

            slides[next].classList.add('active');
            slides[activeItem].classList.remove('active');

            slides[next].classList.remove(`carousel-item-${orientation}`);
            slides[next].classList.remove(`carousel-item-${vars.direction}`);
            slides[activeItem].classList.remove(`carousel-item-${vars.direction}`);

            dispatchCustomEvent.call(element, slidCustomEvent);
            // check for element, might have been disposed
            if (!document.hidden && ops.interval && !element.classList.contains('paused')) {
              self.cycle();
            }
          }
        }, timeout);
      }
    }
  }

  // public methods
  self.cycle = () => {
    if (vars.timer) {
      clearInterval(vars.timer);
      vars.timer = null;
    }

    vars.timer = setInterval(() => {
      let idx = vars.index || self.getActiveIndex();
      if (isElementInScrollRange(element)) {
        idx += 1;
        self.slideTo(idx);
      }
    }, ops.interval);
  };
  self.slideTo = (idx) => {
    if (vars.isSliding) return; // when controled via methods, make sure to check again

    // the current active, orientation, event eventProperties
    const activeItem = self.getActiveIndex();
    let next = idx;

    // first return if we're on the same item #227
    if (activeItem === next) {
      return;
    // or determine slide direction
    } if ((activeItem < next) || (activeItem === 0 && next === slides.length - 1)) {
      vars.direction = 'left'; // next
    } else if ((activeItem > next) || (activeItem === slides.length - 1 && next === 0)) {
      vars.direction = 'right'; // prev
    }

    // find the right next index
    if (next < 0) next = slides.length - 1;
    else if (next >= slides.length) next = 0;

    const orientation = vars.direction === 'left' ? 'next' : 'prev'; // determine type

    const eventProperties = {
      relatedTarget: slides[next], direction: vars.direction, from: activeItem, to: next,
    };
    slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', eventProperties);
    slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', eventProperties);
    dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide
    if (slideCustomEvent.defaultPrevented) return; // discontinue when prevented

    // update index
    vars.index = next;

    vars.isSliding = true;
    clearInterval(vars.timer);
    vars.timer = null;
    setActivePage(next);

    if (getElementTransitionDuration(slides[next]) && element.classList.contains('slide')) {
      slides[next].classList.add(`carousel-item-${orientation}`);
      reflow(slides[next]);
      slides[next].classList.add(`carousel-item-${vars.direction}`);
      slides[activeItem].classList.add(`carousel-item-${vars.direction}`);

      emulateTransitionEnd(slides[next], transitionEndHandler);
    } else {
      slides[next].classList.add('active');
      reflow(slides[next]);
      slides[activeItem].classList.remove('active');
      setTimeout(() => {
        vars.isSliding = false;
        // check for element, might have been disposed
        if (ops.interval && element && !element.classList.contains('paused')) {
          self.cycle();
        }
        dispatchCustomEvent.call(element, slidCustomEvent);
      }, 100);
    }
  };

  self.getActiveIndex = () => Array.from(slides).indexOf(element.getElementsByClassName('carousel-item active')[0]) || 0;

  self.dispose = () => {
    const itemClasses = ['left', 'right', 'prev', 'next'];

    Array.from(slides).forEach((slide, idx) => {
      if (slide.classList.contains('active')) setActivePage(idx);
      itemClasses.forEach((cls) => slide.classList.remove(`carousel-item-${cls}`));
    });
    clearInterval(vars.timer);

    toggleEvents();
    vars = {};
    ops = {};
    delete element.Carousel;
  };

  // init

  // initialization element
  element = queryElement(elem);

  // reset on re-init
  if (element.Carousel) element.Carousel.dispose();

  // carousel elements
  slides = element.getElementsByClassName('carousel-item');
  [leftArrow] = element.getElementsByClassName('carousel-control-prev');
  [rightArrow] = element.getElementsByClassName('carousel-control-next');
  [indicator] = element.getElementsByClassName('carousel-indicators');
  indicators = (indicator && indicator.getElementsByTagName('LI')) || [];

  // invalidate when not enough items
  if (slides.length < 2) { return; }

  // check options
  // DATA API
  const intervalAttribute = element.getAttribute('data-interval');
  const intervalData = intervalAttribute === 'false' ? 0 : +(intervalAttribute);
  const touchData = element.getAttribute('data-touch') === 'false' ? 0 : 1;
  const pauseData = element.getAttribute('data-pause') === 'hover' || false;
  const keyboardData = element.getAttribute('data-keyboard') === 'true' || false;

  // JS options
  const intervalOption = options.interval;
  const touchOption = options.touch;

  // set instance options
  ops = {};
  ops.keyboard = options.keyboard === true || keyboardData;
  ops.pause = (options.pause === 'hover' || pauseData) ? 'hover' : false; // false / hover
  ops.touch = touchOption || touchData;

  ops.interval = 5000; // bootstrap carousel default interval

  if (typeof intervalOption === 'number') ops.interval = intervalOption;
  else if (intervalOption === false || intervalData === 0 || intervalData === false) {
    ops.interval = 0;
  } else if (!Number.isNaN(intervalData)) ops.interval = intervalData;

  // set first slide active if none
  if (self.getActiveIndex() < 0) {
    if (slides.length) slides[0].classList.add('active');
    if (indicators.length) setActivePage(0);
  }

  // set initial state
  vars = {};
  vars.direction = 'left';
  vars.index = 0;
  vars.timer = null;
  vars.isSliding = false;
  vars.isTouch = false;
  vars.touchPosition = {
    startX: 0,
    currentX: 0,
    endX: 0,
  };

  // attach event handlers
  toggleEvents(1);

  // start to cycle if interval is set
  if (ops.interval) { self.cycle(); }

  // associate init object to target
  element.Carousel = self;
}
