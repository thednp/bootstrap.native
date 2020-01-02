/*!
  * Native JavaScript for Bootstrap v2.0.28 (https://thednp.github.io/bootstrap.native/)
  * Copyright 2015-2020 © dnp_theme
  * Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.BSN = factory());
}(this, (function () { 'use strict';

	// globals
	// const globalObject = typeof global !== 'undefined' ? global : window;
	// const BSN = globalObject.BSN = {};
	// export const supports = globalObject.BSN.supports = [];
	var supports =
	/*globalObject.BSN.supports =*/
	[];

	function addClass(element, classNAME) {
	  element.classList.add(classNAME);
	}
	function removeClass(element, classNAME) {
	  element.classList.remove(classNAME);
	}
	function hasClass(element, classNAME) {
	  return element.classList.contains(classNAME);
	}

	// event names
	var touchEvents = {
	  start: 'touchstart',
	  end: 'touchend',
	  move: 'touchmove',
	  cancel: 'touchcancel'
	};
	var mouseHover = 'onmouseleave' in document ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout']; // attach | detach handlers

	function on(element, event, handler, options) {
	  options = options || false;
	  element.addEventListener(event, handler, options);
	}
	function off(element, event, handler, options) {
	  options = options || false;
	  element.removeEventListener(event, handler, options);
	}
	function one(element, event, handler, options) {
	  on(element, event, function handlerWrapper(e) {
	    if (e.target === element) {
	      handler(e);
	      off(element, event, handlerWrapper, options);
	    }
	  }, options);
	} // custom events

	function bootstrapCustomEvent(eventName, componentName, related) {
	  var OriginalCustomEvent = new CustomEvent(eventName + '.bs.' + componentName, {
	    cancelable: true
	  });
	  OriginalCustomEvent.relatedTarget = related;
	  return OriginalCustomEvent;
	}
	function dispatchCustomEvent(customEvent) {
	  this.dispatchEvent(customEvent);
	} // determine support for passive events

	var supportPassive = function () {
	  // Test via a getter in the options object to see if the passive property is accessed
	  var result = false;

	  try {
	    var opts = Object.defineProperty({}, 'passive', {
	      get: function get() {
	        result = true;
	      }
	    });
	    one(window, null, null, opts);
	  } catch (e) {}

	  return result;
	}(); // event options
	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

	var passiveHandler = supportPassive ? {
	  passive: true
	} : false;

	function getElementsByClassName(element, classNAME) {
	  // returns Array
	  return [].slice.call(element.getElementsByClassName(classNAME));
	}
	function queryElement(selector, parent) {
	  var lookUp = parent ? parent : document;
	  return selector instanceof Element ? selector : lookUp.querySelector(selector);
	}

	var supportTransitions = 'webkitTransition' in document.body.style || 'transition' in document.body.style;
	var transitionEndEvent = 'webkitTransition' in document.body.style ? 'webkitTransitionEnd' : 'transitionend';
	var transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';
	function getTransitionDurationFromElement(element) {
	  var duration = supportTransitions ? window.getComputedStyle(element)[transitionDuration] : 0;
	  duration = parseFloat(duration);
	  duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
	  return duration; // we take a short offset to make sure we fire on the next frame after animation
	}
	function emulateTransitionEnd(element, handler) {
	  // emulateTransitionEnd since 2.0.4
	  var called = 0,
	      duration = getTransitionDurationFromElement(element);
	  duration ? one(element, transitionEndEvent, function (e) {
	    !called && handler(e), called = 1;
	  }) : setTimeout(function () {
	    !called && handler(), called = 1;
	  }, 17);
	}

	/* Native JavaScript for Bootstrap 4 | Alert
	-------------------------------------------- */
	/* ALERT DEFINITION
	// ================ */

	function Alert(element) {
	  element = queryElement(element); // initialization element

	  element.Alert && element.Alert.dispose(); // reset on re-init

	  /* CONSTANTS */

	  var self = this,
	      closeCustomEvent = bootstrapCustomEvent('close', 'alert'),
	      closedCustomEvent = bootstrapCustomEvent('closed', 'alert'),
	      triggerHandler = function triggerHandler() {
	    hasClass(alert, 'fade') ? emulateTransitionEnd(alert, transitionEndHandler) : transitionEndHandler();
	  },
	      clickHandler = function clickHandler(e) {
	    alert = e.target.closest(".alert");
	    element = queryElement("[data-dismiss=\"alert\"]", alert);
	    element && alert && (element === e.target || element.contains(e.target)) && self.close();
	  },
	      transitionEndHandler = function transitionEndHandler() {
	    off(element, 'click', clickHandler); // detach it's listener

	    alert.parentNode.removeChild(alert);
	    dispatchCustomEvent.call(alert, closedCustomEvent);
	  };
	  /* PUBLIC METHODS
	  -----------------*/


	  self.close = function () {
	    if (alert && element && hasClass(alert, 'show')) {
	      dispatchCustomEvent.call(alert, closeCustomEvent);
	      if (closeCustomEvent.defaultPrevented) return;
	      self.dispose();
	    }
	  };

	  self.dispose = function () {
	    alert && (removeClass(alert, 'show'), triggerHandler());
	    off(element, 'click', clickHandler);
	    delete element.Alert;
	  };
	  /* INIT
	  * prevent adding event handlers twice */


	  if (!element.Alert) {
	    // 
	    on(element, 'click', clickHandler);
	  }
	  /* find the parent alert */


	  var alert = element.closest(".alert");
	  /* store init object within target element */

	  self.element = element;
	  element.Alert = self;
	}
	/* ALERT DATA API
	 * ============== */

	supports.push(['Alert', Alert, '[data-dismiss="alert"]']);

	/* Native JavaScript for Bootstrap 4 | Button
	---------------------------------------------*/
	// ===================

	function Button(element) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Button && element.Button.dispose(); // constant

	  var toggled = false; // toggled makes sure to prevent triggering twice the change.bs.button events
	  // bind

	  var self = this,
	      // changeEvent
	  changeCustomEvent = bootstrapCustomEvent('change', 'button'),
	      // private methods
	  keyHandler = function keyHandler(e) {
	    var key = e.which || e.keyCode;
	    key === 32 && e.target === document.activeElement && toggle(e);
	  },
	      preventScroll = function preventScroll(e) {
	    var key = e.which || e.keyCode;
	    key === 32 && e.preventDefault();
	  },
	      toggle = function toggle(e) {
	    var label = e.target.tagName === 'LABEL' ? e.target : e.target.parentNode.tagName === 'LABEL' ? e.target.parentNode : null; // the .btn label

	    if (!label) return; //react if a label or its immediate child is clicked

	    var // all the button group buttons
	    labels = getElementsByClassName(label.parentNode, 'btn'),
	        input = label.getElementsByTagName('INPUT')[0];
	    if (!input) return; // return if no input found

	    dispatchCustomEvent.call(input, changeCustomEvent); // trigger the change for the input

	    dispatchCustomEvent.call(element, changeCustomEvent); // trigger the change for the btn-group
	    // manage the dom manipulation

	    if (input.type === 'checkbox') {
	      //checkboxes
	      if (changeCustomEvent.defaultPrevented) return; // discontinue when defaultPrevented is true

	      if (!input.checked) {
	        addClass(label, 'active');
	        input.getAttribute('checked');
	        input.setAttribute('checked', 'checked');
	        input.checked = true;
	      } else {
	        removeClass(label, 'active');
	        input.getAttribute('checked');
	        input.removeAttribute('checked');
	        input.checked = false;
	      }

	      if (!toggled) {
	        // prevent triggering the event twice
	        toggled = true;
	      }
	    }

	    if (input.type === 'radio' && !toggled) {
	      // radio buttons
	      if (changeCustomEvent.defaultPrevented) return; // don't trigger if already active (the OR condition is a hack to check if the buttons were selected with key press and NOT mouse click)

	      if (!input.checked || e.screenX === 0 && e.screenY == 0) {
	        addClass(label, 'active');
	        addClass(label, 'focus');
	        input.setAttribute('checked', 'checked');
	        input.checked = true;
	        toggled = true;

	        for (var i = 0, ll = labels.length; i < ll; i++) {
	          var otherLabel = labels[i],
	              otherInput = otherLabel.getElementsByTagName('INPUT')[0];

	          if (otherLabel !== label && hasClass(otherLabel, 'active')) {
	            dispatchCustomEvent.call(otherInput, changeCustomEvent); // trigger the change

	            removeClass(otherLabel, 'active');
	            otherInput.removeAttribute('checked');
	            otherInput.checked = false;
	          }
	        }
	      }
	    }

	    setTimeout(function () {
	      toggled = false;
	    }, 50);
	  },
	      focusHandler = function focusHandler(e) {
	    addClass(e.target.parentNode, 'focus');
	  },
	      blurHandler = function blurHandler(e) {
	    removeClass(e.target.parentNode, 'focus');
	  },
	      toggleEvents = function toggleEvents(action) {
	    action(element, 'click', toggle);
	    action(element, 'keyup', keyHandler), action(element, 'keydown', preventScroll);
	    var allBtns = getElementsByClassName(element, 'btn');

	    for (var i = 0; i < allBtns.length; i++) {
	      var input = allBtns[i].getElementsByTagName('INPUT')[0];
	      action(input, 'focus', focusHandler), action(input, 'blur', blurHandler);
	    }
	  }; // public method


	  self.dispose = function () {
	    toggleEvents(off);
	    delete element.Button;
	  }; // init


	  if (!element.Button) {
	    // prevent adding event handlers twice
	    toggleEvents(on);
	  } // activate items on load


	  var labelsToACtivate = getElementsByClassName(element, 'btn'),
	      lbll = labelsToACtivate.length;

	  for (var i = 0; i < lbll; i++) {
	    !hasClass(labelsToACtivate[i], 'active') && queryElement('input:checked', labelsToACtivate[i]) && addClass(labelsToACtivate[i], 'active');
	  } // associate target with init object


	  self.element = element;
	  element.Button = self;
	} // BUTTON DATA API
	// =================

	supports.push(['Button', Button, '[data-toggle="buttons"]']);

	/* Native JavaScript for Bootstrap 4 | Carousel
	----------------------------------------------*/
	// ===================

	function Carousel(element, options) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Carousel && element.Carousel.dispose(); // set options

	  options = options || {}; // bind

	  var self = this,
	      // DATA API
	  intervalAttribute = element.getAttribute('data-interval'),
	      intervalOption = options.interval,
	      intervalData = intervalAttribute === 'false' ? 0 : parseInt(intervalAttribute),
	      pauseData = element.getAttribute('data-pause') === 'hover' || false,
	      keyboardData = element.getAttribute('data-keyboard') === 'true' || false,
	      // carousel elements
	  slides = getElementsByClassName(element, 'carousel-item'),
	      total = slides.length,
	      leftArrow = getElementsByClassName(element, "carousel-control-prev")[0],
	      rightArrow = getElementsByClassName(element, "carousel-control-next")[0],
	      indicator = queryElement(".carousel-indicators", element),
	      indicators = indicator && indicator.getElementsByTagName("LI") || []; // invalidate when not enough items

	  if (total < 2) {
	    return;
	  } // set instance options


	  self.options = {};
	  self.options.keyboard = options.keyboard === true || keyboardData;
	  self.options.pause = options.pause === 'hover' || pauseData ? 'hover' : false; // false / hover

	  self.options.interval = typeof intervalOption === 'number' ? intervalOption : intervalOption === false || intervalData === 0 || intervalData === false ? 0 : isNaN(intervalData) ? 5000 // bootstrap carousel default interval
	  : intervalData; // vars, index, timer

	  var index = element.index = 0,
	      timer = element.timer = 0,
	      isSliding = false,
	      // isSliding prevents click event handlers when animation is running
	  // touch and event coordinates
	  isTouch = false,
	      startXPosition = null,
	      currentXPosition = null,
	      endXPosition = null,
	      slideDirection = self.direction = 'left',
	      // custom events
	  slideCustomEvent,
	      slidCustomEvent; // handlers

	  var pauseHandler = function pauseHandler() {
	    if (self.options.interval !== false && !hasClass(element, 'paused')) {
	      addClass(element, 'paused');
	      !isSliding && (clearInterval(timer), timer = null);
	    }
	  },
	      resumeHandler = function resumeHandler() {
	    if (self.options.interval !== false && hasClass(element, 'paused')) {
	      removeClass(element, 'paused');
	      !isSliding && (clearInterval(timer), timer = null);
	      !isSliding && self.cycle();
	    }
	  },
	      indicatorHandler = function indicatorHandler(e) {
	    e.preventDefault();
	    if (isSliding) return;
	    var eventTarget = e.target; // event target | the current active item

	    if (eventTarget && !hasClass(eventTarget, 'active') && eventTarget.getAttribute('data-slide-to')) {
	      index = parseInt(eventTarget.getAttribute('data-slide-to'), 10);
	    } else {
	      return false;
	    }

	    self.slideTo(index); //Do the slide
	  },
	      controlsHandler = function controlsHandler(e) {
	    e.preventDefault();
	    if (isSliding) return;
	    var eventTarget = e.currentTarget || e.srcElement;

	    if (eventTarget === rightArrow) {
	      index++;
	    } else if (eventTarget === leftArrow) {
	      index--;
	    }

	    self.slideTo(index); //Do the slide
	  },
	      keyHandler = function keyHandler(_ref) {
	    var which = _ref.which;
	    if (isSliding) return;

	    switch (which) {
	      case 39:
	        index++;
	        break;

	      case 37:
	        index--;
	        break;

	      default:
	        return;
	    }

	    self.slideTo(index); //Do the slide
	  },
	      toggleEvents = function toggleEvents(action) {
	    if (self.options.pause && self.options.interval) {
	      action(element, mouseHover[0], pauseHandler);
	      action(element, mouseHover[1], resumeHandler);
	      action(element, touchEvents.start, pauseHandler, passiveHandler);
	      action(element, touchEvents.end, resumeHandler, passiveHandler);
	    }

	    slides.length > 1 && action(element, touchEvents.start, touchDownHandler, passiveHandler);
	    rightArrow && action(rightArrow, 'click', controlsHandler);
	    leftArrow && action(leftArrow, 'click', controlsHandler);
	    indicator && action(indicator, 'click', indicatorHandler);
	    self.options.keyboard && action(window, 'keydown', keyHandler);
	  },
	      // touch events
	  toggleTouchEvents = function toggleTouchEvents(action) {
	    action(element, touchEvents.move, touchMoveHandler, passiveHandler);
	    action(element, touchEvents.end, touchEndHandler, passiveHandler);
	  },
	      touchDownHandler = function touchDownHandler(e) {
	    if (isTouch) {
	      return;
	    }

	    startXPosition = parseInt(e.touches[0].pageX);

	    if (element.contains(e.target)) {
	      isTouch = true;
	      toggleTouchEvents(on);
	    }
	  },
	      touchMoveHandler = function touchMoveHandler(e) {
	    if (!isTouch) {
	      e.preventDefault();
	      return;
	    }

	    currentXPosition = parseInt(e.touches[0].pageX); //cancel touch if more than one touches detected

	    if (e.type === 'touchmove' && e.touches.length > 1) {
	      e.preventDefault();
	      return false;
	    }
	  },
	      touchEndHandler = function touchEndHandler(e) {
	    if (!isTouch || isSliding) {
	      return;
	    }

	    endXPosition = currentXPosition || parseInt(e.touches[0].pageX);

	    if (isTouch) {
	      if ((!element.contains(e.target) || !element.contains(e.relatedTarget)) && Math.abs(startXPosition - endXPosition) < 75) {
	        return false;
	      } else {
	        if (currentXPosition < startXPosition) {
	          index++;
	        } else if (currentXPosition > startXPosition) {
	          index--;
	        }

	        isTouch = false;
	        self.slideTo(index);
	      }

	      toggleTouchEvents(off);
	    }
	  },
	      // private methods
	  isElementInScrollRange = function isElementInScrollRange() {
	    var rect = element.getBoundingClientRect(),
	        viewportHeight = window.innerHeight || document.documentElement.clientHeight;
	    return rect.top <= viewportHeight && rect.bottom >= 0; // bottom && top
	  },
	      setActivePage = function setActivePage(pageIndex) {
	    //indicators
	    for (var i = 0, icl = indicators.length; i < icl; i++) {
	      removeClass(indicators[i], 'active');
	    }

	    if (indicators[pageIndex]) addClass(indicators[pageIndex], 'active');
	  }; // public methods


	  self.cycle = function () {
	    if (timer) {
	      clearInterval(timer);
	      timer = null;
	    }

	    timer = setInterval(function () {
	      isElementInScrollRange() && (index++, self.slideTo(index));
	    }, self.options.interval);
	  };

	  self.slideTo = function (next) {
	    if (isSliding) return; // when controled via methods, make sure to check again      
	    // the current active and orientation

	    var activeItem = self.getActiveIndex(),
	        orientation; // first return if we're on the same item #227

	    if (activeItem === next) {
	      return; // or determine slideDirection
	    } else if (activeItem < next || activeItem === 0 && next === total - 1) {
	      slideDirection = self.direction = 'left'; // next
	    } else if (activeItem > next || activeItem === total - 1 && next === 0) {
	      slideDirection = self.direction = 'right'; // prev
	    } // find the right next index 


	    if (next < 0) {
	      next = total - 1;
	    } else if (next >= total) {
	      next = 0;
	    } // update index


	    index = next;
	    orientation = slideDirection === 'left' ? 'next' : 'prev'; // determine type

	    slideCustomEvent = bootstrapCustomEvent('slide', 'carousel', slides[next]);
	    slidCustomEvent = bootstrapCustomEvent('slid', 'carousel', slides[next]);
	    dispatchCustomEvent.call(element, slideCustomEvent); // here we go with the slide

	    if (slideCustomEvent.defaultPrevented) return; // discontinue when prevented

	    isSliding = true;
	    clearInterval(timer);
	    timer = null;
	    setActivePage(next);

	    if (supportTransitions && hasClass(element, 'slide')) {
	      addClass(slides[next], "carousel-item-".concat(orientation));
	      slides[next].offsetWidth;
	      addClass(slides[next], "carousel-item-".concat(slideDirection));
	      addClass(slides[activeItem], "carousel-item-".concat(slideDirection));
	      emulateTransitionEnd(slides[next], function (e) {
	        var timeout = e && e.target !== slides[next] ? e.elapsedTime * 1000 + 100 : 20;
	        isSliding && setTimeout(function () {
	          isSliding = false;
	          addClass(slides[next], 'active');
	          removeClass(slides[activeItem], 'active');
	          removeClass(slides[next], "carousel-item-".concat(orientation));
	          removeClass(slides[next], "carousel-item-".concat(slideDirection));
	          removeClass(slides[activeItem], "carousel-item-".concat(slideDirection));
	          dispatchCustomEvent.call(element, slidCustomEvent);

	          if (!document.hidden && self.options.interval && !hasClass(element, 'paused')) {
	            self.cycle();
	          }
	        }, timeout);
	      });
	    } else {
	      addClass(slides[next], 'active');
	      slides[next].offsetWidth;
	      removeClass(slides[activeItem], 'active');
	      setTimeout(function () {
	        isSliding = false;

	        if (self.options.interval && !hasClass(element, 'paused')) {
	          self.cycle();
	        }

	        dispatchCustomEvent.call(element, slidCustomEvent);
	      }, 100);
	    }
	  };

	  self.getActiveIndex = function () {
	    return slides.indexOf(getElementsByClassName(element, 'carousel-item active')[0]) || 0;
	  };

	  self.dispose = function () {
	    toggleEvents(off);
	    clearInterval(timer);
	    delete element.Carousel;
	  }; // init


	  if (!element.Carousel) {
	    // prevent adding event handlers twice
	    toggleEvents(on);
	  } // set first slide active if none


	  if (self.getActiveIndex() < 0) {
	    slides.length && addClass(slides[0], 'active');
	    indicators.length && setActivePage(0);
	  } // start to cycle if set


	  if (self.options.interval) {
	    self.cycle();
	  } // associate init object to target


	  self.element = element;
	  element.Carousel = self;
	}
	// =================

	supports.push(['Carousel', Carousel, '[data-ride="carousel"]']);

	/* Native JavaScript for Bootstrap 4 | Collapse
	-----------------------------------------------*/
	// ===================

	function Collapse(element, options) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Collapse && element.Collapse.dispose(); // set options

	  options = options || {}; // target practice

	  var accordion = null,
	      collapse = null,
	      activeCollapse,
	      activeElement; // bind, event targets and constants

	  var self = this,
	      // DATA API
	  accordionData = element.getAttribute('data-parent'),
	      // custom events
	  showCustomEvent = bootstrapCustomEvent('show', 'collapse'),
	      shownCustomEvent = bootstrapCustomEvent('shown', 'collapse'),
	      hideCustomEvent = bootstrapCustomEvent('hide', 'collapse'),
	      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'collapse'),
	      // private methods
	  openAction = function openAction(collapseElement, toggle) {
	    dispatchCustomEvent.call(collapseElement, showCustomEvent);
	    if (showCustomEvent.defaultPrevented) return;
	    collapseElement.isAnimating = true;
	    addClass(collapseElement, 'collapsing');
	    removeClass(collapseElement, 'collapse');
	    collapseElement.style.height = "".concat(collapseElement.scrollHeight, "px");
	    emulateTransitionEnd(collapseElement, function () {
	      collapseElement.isAnimating = false;
	      collapseElement.setAttribute('aria-expanded', 'true');
	      toggle.setAttribute('aria-expanded', 'true');
	      removeClass(collapseElement, 'collapsing');
	      addClass(collapseElement, 'collapse');
	      addClass(collapseElement, 'show');
	      collapseElement.style.height = '';
	      dispatchCustomEvent.call(collapseElement, shownCustomEvent);
	    });
	  },
	      closeAction = function closeAction(collapseElement, toggle) {
	    dispatchCustomEvent.call(collapseElement, hideCustomEvent);
	    if (hideCustomEvent.defaultPrevented) return;
	    collapseElement.isAnimating = true;
	    collapseElement.style.height = "".concat(collapseElement.scrollHeight, "px"); // set height first

	    removeClass(collapseElement, 'collapse');
	    removeClass(collapseElement, 'show');
	    addClass(collapseElement, 'collapsing');
	    collapseElement.offsetWidth; // force reflow to enable transition

	    collapseElement.style.height = '0px';
	    emulateTransitionEnd(collapseElement, function () {
	      collapseElement.isAnimating = false;
	      collapseElement.setAttribute('aria-expanded', 'false');
	      toggle.setAttribute('aria-expanded', 'false');
	      removeClass(collapseElement, 'collapsing');
	      addClass(collapseElement, 'collapse');
	      collapseElement.style.height = '';
	      dispatchCustomEvent.call(collapseElement, hiddenCustomEvent);
	    });
	  },
	      getTarget = function getTarget() {
	    var href = element.href && element.getAttribute('href'),
	        parent = element.getAttribute('data-target'),
	        id = href || parent && parent.charAt(0) === '#' && parent;
	    return id && queryElement(id);
	  }; // public methods


	  self.toggle = function (e) {
	    e.preventDefault();

	    if (!hasClass(collapse, 'show')) {
	      self.show();
	    } else {
	      self.hide();
	    }
	  };

	  self.hide = function () {
	    if (collapse.isAnimating) return;
	    closeAction(collapse, element);
	    addClass(element, 'collapsed');
	  };

	  self.show = function () {
	    if (accordion) {
	      activeCollapse = queryElement(".collapse.show", accordion);
	      activeElement = activeCollapse && (queryElement("[data-target=\"#".concat(activeCollapse.id, "\"]"), accordion) || queryElement("[href=\"#".concat(activeCollapse.id, "\"]"), accordion));
	    }

	    if (!collapse.isAnimating || activeCollapse && !activeCollapse.isAnimating) {
	      if (activeElement && activeCollapse !== collapse) {
	        closeAction(activeCollapse, activeElement);
	        addClass(activeElement, 'collapsed');
	      }

	      openAction(collapse, element);
	      removeClass(element, 'collapsed');
	    }
	  };

	  self.dispose = function () {
	    off(element, 'click', self.toggle);
	    delete element.Collapse;
	  }; // init
	  // prevent adding event handlers twice


	  if (!element.Collapse) {
	    on(element, 'click', self.toggle);
	  } // determine targets


	  collapse = getTarget();
	  collapse.isAnimating = false;
	  accordion = queryElement(options.parent) || accordionData && element.closest(accordionData); // associations

	  collapse && (self.collapse = collapse);
	  accordion && (self.options = {}, self.options.parent = accordion); // associate target to init object

	  self.element = element;
	  element.Collapse = self;
	}
	// =================

	supports.push(['Collapse', Collapse, '[data-toggle="collapse"]']);

	function setFocus(element) {
	  element.focus ? element.focus() : element.setActive();
	}
	function getScroll() {
	  // also Affix and ScrollSpy uses it
	  return {
	    y: window.pageYOffset || document.documentElement.scrollTop,
	    x: window.pageXOffset || document.documentElement.scrollLeft
	  };
	}
	var tipPositions = /\b(top|bottom|left|right)+/;
	function styleTip(link, element, position, parent) {
	  // both popovers and tooltips (target,tooltip,placement,elementToAppendTo)
	  var elementDimensions = {
	    w: element.offsetWidth,
	    h: element.offsetHeight
	  },
	      windowWidth = document.documentElement.clientWidth || document.body.clientWidth,
	      windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
	      rect = link.getBoundingClientRect(),
	      scroll = parent === document.body ? getScroll() : {
	    x: parent.offsetLeft + parent.scrollLeft,
	    y: parent.offsetTop + parent.scrollTop
	  },
	      linkDimensions = {
	    w: rect.right - rect.left,
	    h: rect.bottom - rect.top
	  },
	      isPopover = hasClass(element, 'popover'),
	      arrow = queryElement('.arrow', element),
	      halfTopExceed = rect.top + linkDimensions.h / 2 - elementDimensions.h / 2 < 0,
	      halfLeftExceed = rect.left + linkDimensions.w / 2 - elementDimensions.w / 2 < 0,
	      halfRightExceed = rect.left + elementDimensions.w / 2 + linkDimensions.w / 2 >= windowWidth,
	      halfBottomExceed = rect.top + elementDimensions.h / 2 + linkDimensions.h / 2 >= windowHeight,
	      topExceed = rect.top - elementDimensions.h < 0,
	      leftExceed = rect.left - elementDimensions.w < 0,
	      bottomExceed = rect.top + elementDimensions.h + linkDimensions.h >= windowHeight,
	      rightExceed = rect.left + elementDimensions.w + linkDimensions.w >= windowWidth; // recompute position

	  position = (position === 'left' || position === 'right') && leftExceed && rightExceed ? 'top' : position; // first, when both left and right limits are exceeded, we fall back to top|bottom

	  position = position === 'top' && topExceed ? 'bottom' : position;
	  position = position === 'bottom' && bottomExceed ? 'top' : position;
	  position = position === 'left' && leftExceed ? 'right' : position;
	  position = position === 'right' && rightExceed ? 'left' : position;
	  var topPosition, leftPosition, arrowTop, arrowLeft, arrowWidth, arrowHeight; // update tooltip/popover class

	  element.className.indexOf(position) === -1 && (element.className = element.className.replace(tipPositions, position)); // we check the computed width & height and update here

	  arrowWidth = arrow.offsetWidth;
	  arrowHeight = arrow.offsetHeight; // apply styling to tooltip or popover

	  if (position === 'left' || position === 'right') {
	    // secondary|side positions
	    if (position === 'left') {
	      // LEFT
	      leftPosition = rect.left + scroll.x - elementDimensions.w - (isPopover ? arrowWidth : 0);
	    } else {
	      // RIGHT
	      leftPosition = rect.left + scroll.x + linkDimensions.w;
	    } // adjust top and arrow


	    if (halfTopExceed) {
	      topPosition = rect.top + scroll.y;
	      arrowTop = linkDimensions.h / 2 - arrowWidth;
	    } else if (halfBottomExceed) {
	      topPosition = rect.top + scroll.y - elementDimensions.h + linkDimensions.h;
	      arrowTop = elementDimensions.h - linkDimensions.h / 2 - arrowWidth;
	    } else {
	      topPosition = rect.top + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2;
	      arrowTop = elementDimensions.h / 2 - (isPopover ? arrowHeight * 0.9 : arrowHeight / 2);
	    }
	  } else if (position === 'top' || position === 'bottom') {
	    // primary|vertical positions
	    if (position === 'top') {
	      // TOP
	      topPosition = rect.top + scroll.y - elementDimensions.h - (isPopover ? arrowHeight : 0);
	    } else {
	      // BOTTOM
	      topPosition = rect.top + scroll.y + linkDimensions.h;
	    } // adjust left | right and also the arrow


	    if (halfLeftExceed) {
	      leftPosition = 0;
	      arrowLeft = rect.left + linkDimensions.w / 2 - arrowWidth;
	    } else if (halfRightExceed) {
	      leftPosition = windowWidth - elementDimensions.w * 1.01;
	      arrowLeft = elementDimensions.w - (windowWidth - rect.left) + linkDimensions.w / 2 - arrowWidth / 2;
	    } else {
	      leftPosition = rect.left + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2;
	      arrowLeft = elementDimensions.w / 2 - (isPopover ? arrowWidth : arrowWidth / 2);
	    }
	  } // apply style to tooltip/popover and its arrow


	  element.style.top = topPosition + 'px';
	  element.style.left = leftPosition + 'px';
	  arrowTop && (arrow.style.top = arrowTop + 'px');
	  arrowLeft && (arrow.style.left = arrowLeft + 'px');
	}

	/* Native JavaScript for Bootstrap 4 | Dropdown
	----------------------------------------------*/
	// ===================

	function Dropdown(element, option) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Dropdown && element.Dropdown.dispose(); // custom events

	  var showCustomEvent,
	      shownCustomEvent,
	      hideCustomEvent,
	      hiddenCustomEvent,
	      relatedTarget = null; // constants

	  var self = this,
	      // targets
	  parent = element.parentNode,
	      menu = queryElement('.dropdown-menu', parent),
	      menuItems = function () {
	    var set = menu.children,
	        newSet = [];

	    for (var i = 0; i < set.length; i++) {
	      set[i].children.length && set[i].children[0].tagName === 'A' && newSet.push(set[i].children[0]);
	      set[i].tagName === 'A' && newSet.push(set[i]);
	    }

	    return newSet;
	  }(),
	      // preventDefault on empty anchor links
	  preventEmptyAnchor = function preventEmptyAnchor(anchor) {
	    (anchor.href && anchor.href.slice(-1) === '#' || anchor.parentNode && anchor.parentNode.href && anchor.parentNode.href.slice(-1) === '#') && this.preventDefault();
	  },
	      // toggle dismissible events
	  toggleDismiss = function toggleDismiss() {
	    var action = element.open ? on : off;
	    action(document, 'click', dismissHandler);
	    action(document, 'keydown', preventScroll);
	    action(document, 'keyup', keyHandler);
	    action(document, 'focus', dismissHandler, true);
	  },
	      // handlers
	  dismissHandler = function dismissHandler(e) {
	    var eventTarget = e.target,
	        hasData = eventTarget && (eventTarget.getAttribute('data-toggle') || eventTarget.parentNode && eventTarget.parentNode.getAttribute && eventTarget.parentNode.getAttribute('data-toggle'));

	    if (e.type === 'focus' && (eventTarget === element || eventTarget === menu || menu.contains(eventTarget))) {
	      return;
	    }

	    if ((eventTarget === menu || menu.contains(eventTarget)) && (self.options.persist || hasData)) {
	      return;
	    } else {
	      relatedTarget = eventTarget === element || element.contains(eventTarget) ? element : null;
	      hide();
	    }

	    preventEmptyAnchor.call(e, eventTarget);
	  },
	      clickHandler = function clickHandler(e) {
	    relatedTarget = element;
	    show();
	    preventEmptyAnchor.call(e, e.target);
	  },
	      preventScroll = function preventScroll(e) {
	    var key = e.which || e.keyCode;

	    if (key === 38 || key === 40) {
	      e.preventDefault();
	    }
	  },
	      keyHandler = function keyHandler(_ref) {
	    var which = _ref.which,
	        keyCode = _ref.keyCode;
	    var key = which || keyCode,
	        activeItem = document.activeElement,
	        isSameElement = activeItem === element,
	        isInsideMenu = menu.contains(activeItem),
	        isMenuItem = activeItem.parentNode === menu || activeItem.parentNode.parentNode === menu;
	    var idx = menuItems.indexOf(activeItem);

	    if (isMenuItem) {
	      // navigate up | down
	      idx = isSameElement ? 0 : key === 38 ? idx > 1 ? idx - 1 : 0 : key === 40 ? idx < menuItems.length - 1 ? idx + 1 : idx : idx;
	      menuItems[idx] && setFocus(menuItems[idx]);
	    }

	    if ((menuItems.length && isMenuItem // menu has items
	    || !menuItems.length && (isInsideMenu || isSameElement) // menu might be a form
	    || !isInsideMenu) && // or the focused element is not in the menu at all
	    element.open && key === 27 // menu must be open
	    ) {
	        self.toggle();
	        relatedTarget = null;
	      }
	  },
	      // private methods
	  show = function show() {
	    showCustomEvent = bootstrapCustomEvent('show', 'dropdown', relatedTarget);
	    dispatchCustomEvent.call(parent, showCustomEvent);
	    if (showCustomEvent.defaultPrevented) return;
	    addClass(menu, 'show');
	    addClass(parent, 'show');
	    element.setAttribute('aria-expanded', true);
	    element.open = true;
	    off(element, 'click', clickHandler);
	    setTimeout(function () {
	      setFocus(menu.getElementsByTagName('INPUT')[0] || element); // focus the first input item | element

	      toggleDismiss();
	      shownCustomEvent = bootstrapCustomEvent('shown', 'dropdown', relatedTarget);
	      dispatchCustomEvent.call(parent, shownCustomEvent);
	    }, 1);
	  },
	      hide = function hide() {
	    hideCustomEvent = bootstrapCustomEvent('hide', 'dropdown', relatedTarget);
	    dispatchCustomEvent.call(parent, hideCustomEvent);
	    if (hideCustomEvent.defaultPrevented) return;
	    removeClass(menu, 'show');
	    removeClass(parent, 'show');
	    element.setAttribute('aria-expanded', false);
	    element.open = false;
	    toggleDismiss();
	    setFocus(element);
	    setTimeout(function () {
	      on(element, 'click', clickHandler);
	    }, 1);
	    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'dropdown', relatedTarget);
	    dispatchCustomEvent.call(parent, hiddenCustomEvent);
	  }; // public methods


	  self.toggle = function () {
	    if (hasClass(parent, 'show') && element.open) {
	      hide();
	    } else {
	      show();
	    }
	  };

	  self.dispose = function () {
	    if (hasClass(parent, 'show') && element.open) {
	      hide();
	    }

	    off(element, 'click', clickHandler);
	    delete element.Dropdown;
	  }; // init


	  if (!element.Dropdown) {
	    // prevent adding event handlers twice
	    !('tabindex' in menu) && menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome | Safari

	    on(element, 'click', clickHandler);
	  } // set option


	  self.options = {};
	  self.options.persist = option === true || element.getAttribute('data-persist') === 'true' || false; // set initial state to closed

	  element.open = false; // associate element with init object 

	  self.element = element;
	  element.Dropdown = self;
	}
	// =================

	supports.push(['Dropdown', Dropdown, '[data-toggle="dropdown"]']);

	/* Native JavaScript for Bootstrap 4 | Modal
	-------------------------------------------*/
	// ================

	function Modal(element, options) {
	  // element can be the modal/triggering button
	  // the modal (both JavaScript / DATA API init) / triggering button element (DATA API)
	  element = queryElement(element); // custom events

	  var showCustomEvent,
	      shownCustomEvent,
	      hideCustomEvent,
	      hiddenCustomEvent,
	      // event targets and other
	  relatedTarget = null,
	      scrollBarWidth,
	      overlay,
	      overlayDelay; // bind

	  var self = this,
	      // determine modal, triggering element
	  btnCheck = element.getAttribute('data-target') || element.getAttribute('href'),
	      checkModal = queryElement(btnCheck),
	      modal = hasClass(element, 'modal') ? element : checkModal;

	  if (hasClass(element, 'modal')) {
	    element = null;
	  } // modal is now independent of it's triggering element


	  if (!modal) {
	    return;
	  } // invalidate
	  // reset on re-init


	  element && element.Modal && element.Modal.dispose();
	  modal.Modal && modal.Modal.dispose(); // set options

	  options = options || {};
	  self.options = {};
	  self.options.keyboard = options.keyboard === false || modal.getAttribute('data-keyboard') === 'false' ? false : true;
	  self.options.backdrop = options.backdrop === 'static' || modal.getAttribute('data-backdrop') === 'static' ? 'static' : true;
	  self.options.backdrop = options.backdrop === false || modal.getAttribute('data-backdrop') === 'false' ? false : self.options.backdrop;
	  self.options.animation = hasClass(modal, 'fade') ? true : false;
	  self.options.content = options.content; // JavaScript only
	  // set an initial state of the modal

	  modal.isAnimating = false; // also find fixed-top / fixed-bottom items

	  var fixedItems = getElementsByClassName(document.documentElement, 'fixed-top').concat(getElementsByClassName(document.documentElement, 'fixed-bottom')),
	      // private methods
	  setScrollbar = function setScrollbar() {
	    var openModal = hasClass(document.body, 'modal-open'),
	        bodyStyle = window.getComputedStyle(document.body),
	        bodyPad = parseInt(bodyStyle.paddingRight, 10);
	    var itemPad;
	    document.body.style.paddingRight = "".concat(bodyPad + (openModal ? 0 : scrollBarWidth), "px");
	    modal.style.paddingRight = scrollBarWidth ? "".concat(scrollBarWidth, "px") : '';

	    if (fixedItems.length) {
	      for (var i = 0; i < fixedItems.length; i++) {
	        itemPad = window.getComputedStyle(fixedItems[i]).paddingRight;
	        fixedItems[i].style.paddingRight = "".concat(parseInt(itemPad) + (openModal ? 0 : scrollBarWidth), "px");
	      }
	    }
	  },
	      resetScrollbar = function resetScrollbar() {
	    document.body.style.paddingRight = '';
	    modal.style.paddingRight = '';

	    if (fixedItems.length) {
	      for (var i = 0; i < fixedItems.length; i++) {
	        fixedItems[i].style.paddingRight = '';
	      }
	    }
	  },
	      measureScrollbar = function measureScrollbar() {
	    var scrollDiv = document.createElement('div');
	    var widthValue;
	    scrollDiv.className = 'modal-scrollbar-measure'; // this is here to stay

	    document.body.appendChild(scrollDiv);
	    widthValue = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	    document.body.removeChild(scrollDiv);
	    return widthValue;
	  },
	      checkScrollbar = function checkScrollbar() {
	    scrollBarWidth = measureScrollbar();
	  },
	      createOverlay = function createOverlay() {
	    var newOverlay = document.createElement('div');
	    overlay = queryElement('.modal-backdrop');

	    if (overlay === null) {
	      newOverlay.setAttribute('class', 'modal-backdrop' + (self.options.animation ? ' fade' : ''));
	      overlay = newOverlay;
	      document.body.appendChild(overlay);
	    }

	    return overlay;
	  },
	      removeOverlay = function removeOverlay() {
	    overlay = queryElement('.modal-backdrop');

	    if (overlay && !getElementsByClassName(document, 'modal show')[0]) {
	      document.body.removeChild(overlay);
	      overlay = null;
	    }

	    overlay === null && (removeClass(document.body, 'modal-open'), resetScrollbar());
	  },
	      toggleEvents = function toggleEvents(action) {
	    action(window, 'resize', self.update, passiveHandler);
	    action(modal, 'click', dismissHandler);
	    action(document, 'keydown', keyHandler);
	  },
	      // triggers
	  beforeShow = function beforeShow() {
	    modal.style.display = 'block';
	    checkScrollbar();
	    setScrollbar();
	    !getElementsByClassName(document, 'modal show')[0] && addClass(document.body, 'modal-open');
	    addClass(modal, 'show');
	    modal.setAttribute('aria-hidden', false);
	    hasClass(modal, 'fade') ? emulateTransitionEnd(modal, triggerShow) : triggerShow();
	  },
	      triggerShow = function triggerShow() {
	    setFocus(modal);
	    modal.isAnimating = false;
	    toggleEvents(on);
	    shownCustomEvent = bootstrapCustomEvent('shown', 'modal', relatedTarget);
	    dispatchCustomEvent.call(modal, shownCustomEvent);
	  },
	      triggerHide = function triggerHide() {
	    modal.style.display = '';
	    element && setFocus(element);
	    overlay = queryElement('.modal-backdrop');

	    if (overlay && hasClass(overlay, 'show') && !getElementsByClassName(document, 'modal show')[0]) {
	      removeClass(overlay, 'show');
	      emulateTransitionEnd(overlay, removeOverlay);
	    } else {
	      removeOverlay();
	    }

	    toggleEvents(off);
	    modal.isAnimating = false;
	    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'modal');
	    dispatchCustomEvent.call(modal, hiddenCustomEvent);
	  },
	      // handlers
	  clickHandler = function clickHandler(e) {
	    if (modal.isAnimating) return;
	    var clickTarget = e.target;
	    clickTarget = clickTarget.hasAttribute('data-target') || clickTarget.hasAttribute('href') ? clickTarget : clickTarget.parentNode;

	    if (clickTarget === element && !hasClass(modal, 'show')) {
	      modal.modalTrigger = element;
	      relatedTarget = element;
	      self.show();
	      e.preventDefault();
	    }
	  },
	      keyHandler = function keyHandler(_ref) {
	    var which = _ref.which;
	    if (modal.isAnimating) return;

	    if (self.options.keyboard && which == 27 && hasClass(modal, 'show')) {
	      self.hide();
	    }
	  },
	      dismissHandler = function dismissHandler(e) {
	    if (modal.isAnimating) return;
	    var clickTarget = e.target;

	    if (hasClass(modal, 'show') && (clickTarget.parentNode.getAttribute('data-dismiss') === 'modal' || clickTarget.getAttribute('data-dismiss') === 'modal' || clickTarget === modal && self.options.backdrop !== 'static')) {
	      self.hide();
	      relatedTarget = null;
	      e.preventDefault();
	    }
	  }; // public methods


	  self.toggle = function () {
	    if (hasClass(modal, 'show')) {
	      self.hide();
	    } else {
	      self.show();
	    }
	  };

	  self.show = function () {
	    if (hasClass(modal, 'show')) {
	      return;
	    }

	    showCustomEvent = bootstrapCustomEvent('show', 'modal', relatedTarget);
	    dispatchCustomEvent.call(modal, showCustomEvent);
	    if (showCustomEvent.defaultPrevented) return;
	    modal.isAnimating = true; // we elegantly hide any opened modal

	    var currentOpen = getElementsByClassName(document, 'modal show')[0];

	    if (currentOpen && currentOpen !== modal) {
	      currentOpen.modalTrigger && currentOpen.modalTrigger.Modal.hide();
	      currentOpen.Modal && currentOpen.Modal.hide();
	    }

	    if (self.options.backdrop) {
	      overlay = createOverlay();
	    }

	    if (overlay && !currentOpen && !hasClass(overlay, 'show')) {
	      overlay.offsetWidth; // force reflow to enable trasition

	      overlayDelay = getTransitionDurationFromElement(overlay);
	      addClass(overlay, 'show');
	    }

	    !currentOpen ? setTimeout(beforeShow, overlay && overlayDelay ? overlayDelay : 0) : beforeShow();
	  };

	  self.hide = function () {
	    if (!hasClass(modal, 'show')) {
	      return;
	    }

	    hideCustomEvent = bootstrapCustomEvent('hide', 'modal');
	    dispatchCustomEvent.call(modal, hideCustomEvent);
	    if (hideCustomEvent.defaultPrevented) return;
	    modal.isAnimating = true;
	    removeClass(modal, 'show');
	    modal.setAttribute('aria-hidden', true);
	    hasClass(modal, 'fade') ? emulateTransitionEnd(modal, triggerHide) : triggerHide();
	  };

	  self.setContent = function (content) {
	    queryElement('.modal-content', modal).innerHTML = content;
	  };

	  self.update = function () {
	    if (hasClass(modal, 'show')) {
	      checkScrollbar();
	      setScrollbar();
	    }
	  };

	  self.dispose = function () {
	    self.hide();

	    if (element) {
	      off(element, 'click', clickHandler);
	      delete element.Modal;
	    } else {
	      delete modal.Modal;
	    }
	  }; // init
	  // prevent adding event handlers over and over
	  // modal is independent of a triggering element


	  if (element && !element.Modal) {
	    on(element, 'click', clickHandler);
	  }

	  if (self.options.content) {
	    self.setContent(self.options.content.trim());
	  } // set associations


	  self.modal = modal;

	  if (element) {
	    modal.modalTrigger = element;
	    self.element = element;
	    element.Modal = self;
	  } else {
	    modal.Modal = self;
	  }
	}
	// =================

	supports.push(['Modal', Modal, '[data-toggle="modal"]']);

	/* Native JavaScript for Bootstrap 4 | Popover
	----------------------------------------------*/
	// ==================

	function Popover(element, options) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Popover && element.Popover.dispose(); // set instance options

	  options = options || {}; // popover and timer

	  var popover = null,
	      timer = 0,
	      // title and content
	  titleString,
	      contentString; // bind, popover and timer

	  var self = this,
	      // DATA API
	  triggerData = element.getAttribute('data-trigger'),
	      // click / hover / focus
	  animationData = element.getAttribute('data-animation'),
	      // true / false
	  placementData = element.getAttribute('data-placement'),
	      dismissibleData = element.getAttribute('data-dismissible'),
	      delayData = element.getAttribute('data-delay'),
	      containerData = element.getAttribute('data-container'),
	      // close btn for dissmissible popover
	  closeBtn = '<button type="button" class="close">×</button>',
	      // custom events
	  showCustomEvent = bootstrapCustomEvent('show', 'popover'),
	      shownCustomEvent = bootstrapCustomEvent('shown', 'popover'),
	      hideCustomEvent = bootstrapCustomEvent('hide', 'popover'),
	      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'popover'),
	      // check container
	  containerElement = queryElement(options.container),
	      containerDataElement = queryElement(containerData),
	      // maybe the element is inside a modal
	  modal = element.closest('.modal'),
	      // maybe the element is inside a fixed navbar
	  navbarFixedTop = element.closest('.fixed-top'),
	      navbarFixedBottom = element.closest('.fixed-bottom'); // set instance options

	  self.options = {};
	  self.options.template = options.template ? options.template : null; // JavaScript only

	  self.options.trigger = options.trigger ? options.trigger : triggerData || 'hover';
	  self.options.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
	  self.options.placement = options.placement ? options.placement : placementData || 'top';
	  self.options.delay = parseInt(options.delay || delayData) || 200;
	  self.options.dismissible = options.dismissible || dismissibleData === 'true' ? true : false;
	  self.options.container = containerElement ? containerElement : containerDataElement ? containerDataElement : navbarFixedTop ? navbarFixedTop : navbarFixedBottom ? navbarFixedBottom : modal ? modal : document.body; // set initial placement from option

	  var placementClass = "bs-popover-".concat(self.options.placement),
	      // handlers
	  dismissibleHandler = function dismissibleHandler(e) {
	    if (popover !== null && e.target === queryElement('.close', popover)) {
	      self.hide();
	    }
	  },
	      // private methods
	  getContents = function getContents() {
	    return {
	      0: options.title || element.getAttribute('data-title') || null,
	      1: options.content || element.getAttribute('data-content') || null
	    };
	  },
	      removePopover = function removePopover() {
	    self.options.container.removeChild(popover);
	    timer = null;
	    popover = null;
	  },
	      createPopover = function createPopover() {
	    titleString = getContents()[0] || null;
	    contentString = getContents()[1]; // fixing https://github.com/thednp/bootstrap.native/issues/233

	    contentString = !!contentString ? contentString.trim() : null;
	    popover = document.createElement('div'); // popover arrow

	    var popoverArrow = document.createElement('div');
	    addClass(popoverArrow, 'arrow');
	    popover.appendChild(popoverArrow);

	    if (contentString !== null && self.options.template === null) {
	      //create the popover from data attributes
	      popover.setAttribute('role', 'tooltip');

	      if (titleString !== null) {
	        var popoverTitle = document.createElement('h3');
	        addClass(popoverTitle, 'popover-header');
	        popoverTitle.innerHTML = self.options.dismissible ? titleString + closeBtn : titleString;
	        popover.appendChild(popoverTitle);
	      } //set popover content


	      var popoverBody = document.createElement('div');
	      addClass(popoverBody, 'popover-body');
	      popoverBody.innerHTML = self.options.dismissible && titleString === null ? contentString + closeBtn : contentString;
	      popover.appendChild(popoverBody);
	    } else {
	      // or create the popover from template
	      var popoverTemplate = document.createElement('div');
	      popoverTemplate.innerHTML = self.options.template.trim();
	      popover.className = popoverTemplate.firstChild.className;
	      popover.innerHTML = popoverTemplate.firstChild.innerHTML;

	      var popoverHeader = queryElement('.popover-header', popover),
	          _popoverBody = queryElement('.popover-body', popover); // fill the template with content from data attributes


	      titleString && popoverHeader && (popoverHeader.innerHTML = titleString.trim());
	      contentString && _popoverBody && (_popoverBody.innerHTML = contentString.trim());
	    } //append to the container


	    self.options.container.appendChild(popover);
	    popover.style.display = 'block';
	    !hasClass(popover, 'popover') && addClass(popover, 'popover');
	    !hasClass(popover, self.options.animation) && addClass(popover, self.options.animation);
	    !hasClass(popover, placementClass) && addClass(popover, placementClass);
	  },
	      showPopover = function showPopover() {
	    !hasClass(popover, 'show') && addClass(popover, 'show');
	  },
	      updatePopover = function updatePopover() {
	    styleTip(element, popover, self.options.placement, self.options.container);
	  },
	      toggleEvents = function toggleEvents(action) {
	    if (self.options.trigger === 'hover') {
	      action(element, mouseHover[0], self.show);

	      if (!self.options.dismissible) {
	        action(element, mouseHover[1], self.hide);
	      }
	    } else if ('click' == self.options.trigger || 'focus' == self.options.trigger) {
	      action(element, self.options.trigger, self.toggle);
	    }
	  },
	      // event toggle
	  dismissHandlerToggle = function dismissHandlerToggle(action) {
	    if ('click' == self.options.trigger || 'focus' == self.options.trigger) {
	      !self.options.dismissible && action(element, 'blur', self.hide);
	    }

	    self.options.dismissible && action(document, 'click', dismissibleHandler);
	    action(window, 'resize', self.hide, passiveHandler);
	  },
	      // triggers
	  showTrigger = function showTrigger() {
	    dismissHandlerToggle(on);
	    dispatchCustomEvent.call(element, shownCustomEvent);
	  },
	      hideTrigger = function hideTrigger() {
	    dismissHandlerToggle(off);
	    removePopover();
	    dispatchCustomEvent.call(element, hiddenCustomEvent);
	  }; // public methods / handlers


	  self.toggle = function () {
	    if (popover === null) {
	      self.show();
	    } else {
	      self.hide();
	    }
	  };

	  self.show = function () {
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      if (popover === null) {
	        dispatchCustomEvent.call(element, showCustomEvent);
	        if (showCustomEvent.defaultPrevented) return;
	        createPopover();
	        updatePopover();
	        showPopover();
	        !!self.options.animation ? emulateTransitionEnd(popover, showTrigger) : showTrigger();
	      }
	    }, 20);
	  };

	  self.hide = function () {
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      if (popover && popover !== null && hasClass(popover, 'show')) {
	        dispatchCustomEvent.call(element, hideCustomEvent);
	        if (hideCustomEvent.defaultPrevented) return;
	        removeClass(popover, 'show');
	        !!self.options.animation ? emulateTransitionEnd(popover, hideTrigger) : hideTrigger();
	      }
	    }, self.options.delay);
	  };

	  self.dispose = function () {
	    self.hide();
	    toggleEvents(off);
	    delete element.Popover;
	  }; // invalidate


	  titleString = getContents()[0];
	  contentString = getContents()[1];
	  if (!contentString && !self.options.template) return; // init

	  if (!element.Popover) {
	    // prevent adding event handlers twice
	    toggleEvents(on);
	  } // associate target to init object


	  self.element = element;
	  element.Popover = self;
	}
	// ================

	supports.push(['Popover', Popover, '[data-toggle="popover"],[data-tip="popover"]']);

	/* Native JavaScript for Bootstrap 4 | ScrollSpy
	-----------------------------------------------*/
	// ====================

	function ScrollSpy(element, options) {
	  // initialization element, the element we spy on
	  element = queryElement(element); // reset on re-init

	  element.ScrollSpy && element.ScrollSpy.dispose(); // set options

	  options = options || {}; // bind, event targets, constants

	  var self = this,
	      // DATA API
	  targetData = queryElement(element.getAttribute('data-target')),
	      offsetData = element.getAttribute('data-offset'),
	      spyTarget = options.target && queryElement(options.target) || targetData,
	      links = spyTarget && spyTarget.getElementsByTagName('A'),
	      offset = parseInt(options.offset || offsetData) || 10,
	      // determine which is the real scrollTarget
	  scrollTarget = element.offsetHeight < element.scrollHeight ? element : window,
	      isWindow = scrollTarget === window;
	  var items = [],
	      targetItems = [],
	      scrollOffset; // populate items and targets

	  for (var i = 0, il = links.length; i < il; i++) {
	    var href = links[i].getAttribute('href'),
	        targetItem = href && href.charAt(0) === '#' && href.slice(-1) !== '#' && queryElement(href);

	    if (targetItem) {
	      items.push(links[i]);
	      targetItems.push(targetItem);
	    }
	  } // set instance options


	  self.options = {};
	  self.options.target = spyTarget;
	  self.options.offset = offset; // private methods

	  var updateItem = function updateItem(index) {
	    var item = items[index],
	        // the menu item targets this element
	    targetItem = targetItems[index],
	        dropdown = item.parentNode.parentNode,
	        dropdownLink = hasClass(dropdown, 'dropdown') && dropdown.getElementsByTagName('A')[0],
	        targetRect = isWindow && targetItem.getBoundingClientRect(),
	        isActive = hasClass(item, 'active') || false,
	        topEdge = (isWindow ? targetRect.top + scrollOffset : targetItem.offsetTop) - self.options.offset,
	        bottomEdge = isWindow ? targetRect.bottom + scrollOffset - self.options.offset : targetItems[index + 1] ? targetItems[index + 1].offsetTop - self.options.offset : element.scrollHeight,
	        inside = scrollOffset >= topEdge && bottomEdge > scrollOffset;

	    if (!isActive && inside) {
	      if (!hasClass(item, 'active')) {
	        addClass(item, 'active');

	        if (dropdownLink && !hasClass(dropdownLink, 'active')) {
	          addClass(dropdownLink, 'active');
	        }

	        dispatchCustomEvent.call(element, bootstrapCustomEvent('activate', 'scrollspy', items[index]));
	      }
	    } else if (!inside) {
	      if (hasClass(item, 'active')) {
	        removeClass(item, 'active');

	        if (dropdownLink && hasClass(dropdownLink, 'active') && !getElementsByClassName(item.parentNode, 'active').length) {
	          removeClass(dropdownLink, 'active');
	        }
	      }
	    } else if (!inside && !isActive || isActive && inside) {
	      return;
	    }
	  },
	      toggleEvents = function toggleEvents(action) {
	    action(scrollTarget, 'scroll', self.refresh, passiveHandler);
	    action(window, 'resize', self.refresh, passiveHandler);
	  },
	      updateItems = function updateItems() {
	    scrollOffset = isWindow ? getScroll().y : element.scrollTop;

	    for (var _i = 0, itl = items.length; _i < itl; _i++) {
	      updateItem(_i);
	    }
	  }; // public method


	  self.refresh = function () {
	    updateItems();
	  };

	  self.dispose = function () {
	    toggleEvents(off);
	    delete element.ScrollSpy;
	  }; // invalidate


	  if (!self.options.target) {
	    return;
	  } // init


	  if (!element.ScrollSpy) {
	    // prevent adding event handlers twice
	    toggleEvents(on);
	  }

	  self.refresh(); // associate target with init object

	  self.element = element;
	  element.ScrollSpy = self;
	}
	// ==================

	supports.push(['ScrollSpy', ScrollSpy, '[data-spy="scroll"]']);

	/* Native JavaScript for Bootstrap 4 | Tab
	-----------------------------------------*/
	// ==============

	function Tab(element, options) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Tab && element.Tab.dispose(); // bind

	  var self = this,
	      // DATA API
	  heightData = element.getAttribute('data-height'),
	      // event targets
	  tabs = element.closest('.nav'),
	      dropdown = tabs && queryElement('.dropdown-toggle', tabs); // custom events

	  var showCustomEvent,
	      shownCustomEvent,
	      hideCustomEvent,
	      hiddenCustomEvent,
	      // more GC material
	  next,
	      tabsContentContainer = false,
	      activeTab,
	      activeContent,
	      nextContent,
	      containerHeight,
	      equalContents,
	      nextHeight; // set options

	  options = options || {};
	  self.options = {};
	  self.options.height = !supportTransitions || options.height === false || heightData === 'false' ? false : true; // triggers

	  var triggerEnd = function triggerEnd() {
	    tabsContentContainer.style.height = '';
	    removeClass(tabsContentContainer, 'collapsing');
	    tabs.isAnimating = false;
	  },
	      triggerShow = function triggerShow() {
	    if (tabsContentContainer) {
	      // height animation
	      if (equalContents) {
	        triggerEnd();
	      } else {
	        setTimeout(function () {
	          // enables height animation
	          tabsContentContainer.style.height = "".concat(nextHeight, "px"); // height animation

	          tabsContentContainer.offsetWidth;
	          emulateTransitionEnd(tabsContentContainer, triggerEnd);
	        }, 50);
	      }
	    } else {
	      tabs.isAnimating = false;
	    }

	    shownCustomEvent = bootstrapCustomEvent('shown', 'tab', activeTab);
	    dispatchCustomEvent.call(next, shownCustomEvent);
	  },
	      triggerHide = function triggerHide() {
	    if (tabsContentContainer) {
	      activeContent.style.float = 'left';
	      nextContent.style.float = 'left';
	      containerHeight = activeContent.scrollHeight;
	    }

	    showCustomEvent = bootstrapCustomEvent('show', 'tab', activeTab);
	    hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tab', next);
	    dispatchCustomEvent.call(next, showCustomEvent);
	    if (showCustomEvent.defaultPrevented) return;
	    addClass(nextContent, 'active');
	    removeClass(activeContent, 'active');

	    if (tabsContentContainer) {
	      nextHeight = nextContent.scrollHeight;
	      equalContents = nextHeight === containerHeight;
	      addClass(tabsContentContainer, 'collapsing');
	      tabsContentContainer.style.height = "".concat(containerHeight, "px"); // height animation

	      tabsContentContainer.offsetHeight;
	      activeContent.style.float = '';
	      nextContent.style.float = '';
	    }

	    if (hasClass(nextContent, 'fade')) {
	      setTimeout(function () {
	        addClass(nextContent, 'show');
	        emulateTransitionEnd(nextContent, triggerShow);
	      }, 20);
	    } else {
	      triggerShow();
	    }

	    dispatchCustomEvent.call(activeTab, hiddenCustomEvent);
	  },
	      // private methods
	  getActiveTab = function getActiveTab() {
	    var activeTabs = getElementsByClassName(tabs, 'active');
	    var activeTab;

	    if (activeTabs.length === 1 && !hasClass(activeTabs[0].parentNode, 'dropdown')) {
	      activeTab = activeTabs[0];
	    } else if (activeTabs.length > 1) {
	      activeTab = activeTabs[activeTabs.length - 1];
	    }

	    return activeTab;
	  },
	      getActiveContent = function getActiveContent() {
	    return queryElement(getActiveTab().getAttribute('href'));
	  },
	      // handler 
	  clickHandler = function clickHandler(e) {
	    e.preventDefault();
	    next = e.currentTarget;
	    !tabs.isAnimating && !hasClass(next, 'active') && self.show();
	  };
	  /* public method */


	  self.show = function () {
	    // the tab we clicked is now the next tab
	    next = next || element;
	    nextContent = queryElement(next.getAttribute('href')); // this is the actual object, the next tab content to activate

	    activeTab = getActiveTab();
	    activeContent = getActiveContent();
	    hideCustomEvent = bootstrapCustomEvent('hide', 'tab', next);
	    dispatchCustomEvent.call(activeTab, hideCustomEvent);
	    if (hideCustomEvent.defaultPrevented) return;
	    tabs.isAnimating = true;
	    removeClass(activeTab, 'active');
	    activeTab.setAttribute('aria-selected', 'false');
	    addClass(next, 'active');
	    next.setAttribute('aria-selected', 'true');

	    if (dropdown) {
	      if (!hasClass(element.parentNode, 'dropdown-menu')) {
	        if (hasClass(dropdown, 'active')) removeClass(dropdown, 'active');
	      } else {
	        if (!hasClass(dropdown, 'active')) addClass(dropdown, 'active');
	      }
	    }

	    if (hasClass(activeContent, 'fade')) {
	      removeClass(activeContent, 'show');
	      emulateTransitionEnd(activeContent, triggerHide);
	    } else {
	      triggerHide();
	    }
	  };

	  self.dispose = function () {
	    off(element, 'click', clickHandler);
	    delete element.Tab;
	  };
	  /* invalidate */


	  if (!tabs) return;
	  /* set default animation state */

	  tabs.isAnimating = false;
	  /* init */

	  if (!element.Tab) {
	    // prevent adding event handlers twice
	    on(element, 'click', clickHandler);
	  }

	  if (self.options.height) {
	    tabsContentContainer = getActiveContent().parentNode;
	  }
	  /* associate target with init object */


	  self.element = element;
	  element.Tab = self;
	}
	// ============

	supports.push(['Tab', Tab, '[data-toggle="tab"]']);

	/* Native JavaScript for Bootstrap 4 | Toast
	---------------------------------------------*/
	// ==================

	function Toast(element, options) {
	  // initialization element
	  element = queryElement(element); // reset on re-init

	  element.Toast && element.Toast.dispose(); // set options

	  options = options || {}; // toast, timer

	  var toast = element.closest('.toast'),
	      timer = 0; // bind, data api and events

	  var self = this,
	      // DATA API
	  animationData = element.getAttribute('data-animation'),
	      autohideData = element.getAttribute('data-autohide'),
	      delayData = element.getAttribute('data-delay'),
	      // custom events
	  showCustomEvent = bootstrapCustomEvent('show', 'toast'),
	      hideCustomEvent = bootstrapCustomEvent('hide', 'toast'),
	      shownCustomEvent = bootstrapCustomEvent('shown', 'toast'),
	      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'toast'); // set instance options

	  self.options = {};
	  self.options.animation = options.animation === false || animationData === 'false' ? 0 : 1; // true by default

	  self.options.autohide = options.autohide === false || autohideData === 'false' ? 0 : 1; // true by default

	  self.options.delay = parseInt(options.delay || delayData) || 500; // 500ms default
	  // private methods

	  var showComplete = function showComplete() {
	    removeClass(toast, 'showing');
	    addClass(toast, 'show');

	    if (self.options.autohide) {
	      self.hide();
	    }

	    dispatchCustomEvent.call(toast, shownCustomEvent);
	  },
	      hideComplete = function hideComplete() {
	    addClass(toast, 'hide');
	    dispatchCustomEvent.call(toast, hiddenCustomEvent);
	  },
	      close = function close() {
	    removeClass(toast, 'show');
	    self.options.animation ? emulateTransitionEnd(toast, hideComplete) : hideComplete();
	  };
	 // public methods


	  self.show = function () {
	    if (toast) {
	      dispatchCustomEvent.call(toast, showCustomEvent);
	      if (showCustomEvent.defaultPrevented) return;
	      self.options.animation && addClass(toast, 'fade');
	      removeClass(toast, 'hide');
	      addClass(toast, 'showing');
	      self.options.animation ? emulateTransitionEnd(toast, showComplete) : showComplete();
	    }
	  };

	  self.hide = function (noTimer) {
	    if (toast && hasClass(toast, 'show')) {
	      dispatchCustomEvent.call(toast, hideCustomEvent);
	      if (hideCustomEvent.defaultPrevented) return;

	      if (noTimer) {
	        close();
	      } else {
	        timer = setTimeout(close, self.options.delay);
	      }
	    }
	  };

	  self.dispose = function () {
	    if (toast && hasClass(toast, 'show')) {
	      close();
	      clearTimeout(timer);
	      off(element, 'click', self.hide);
	      delete element.Toast;
	    }
	  }; // init


	  if (!element.Toast) {
	    // prevent adding event handlers twice
	    on(element, 'click', self.hide);
	  } // associate targets to init object


	  self.toast = toast;
	  self.element = element;
	  element.Toast = self;
	}
	// =================

	supports.push(['Toast', Toast, '[data-dismiss="toast"]']);

	/* Native JavaScript for Bootstrap 4 | Tooltip
	--------------------------------------------*/
	// ==================

	function Tooltip(element, options) {
	  // initialization element
	  element = queryElement(element); // set options

	  options = options || {}; // reset on re-init

	  element.Tooltip && element.Tooltip.dispose(); // tooltip, timer, and title

	  var tooltip = null,
	      timer = 0,
	      titleString; // bind, 

	  var self = this,
	      // DATA API
	  animationData = element.getAttribute('data-animation'),
	      placementData = element.getAttribute('data-placement'),
	      delayData = element.getAttribute('data-delay'),
	      containerData = element.getAttribute('data-container'),
	      // custom events
	  showCustomEvent = bootstrapCustomEvent('show', 'tooltip'),
	      shownCustomEvent = bootstrapCustomEvent('shown', 'tooltip'),
	      hideCustomEvent = bootstrapCustomEvent('hide', 'tooltip'),
	      hiddenCustomEvent = bootstrapCustomEvent('hidden', 'tooltip'),
	      // check container
	  containerElement = queryElement(options.container),
	      containerDataElement = queryElement(containerData),
	      // maybe the element is inside a modal
	  modal = element.closest('.modal'),
	      // maybe the element is inside a fixed navbar
	  navbarFixedTop = element.closest('.fixed-top'),
	      navbarFixedBottom = element.closest('.fixed-bottom'); // set instance options

	  self.options = {};
	  self.options.animation = options.animation && options.animation !== 'fade' ? options.animation : animationData || 'fade';
	  self.options.placement = options.placement ? options.placement : placementData || 'top';
	  self.options.template = options.template ? options.template : null; // JavaScript only

	  self.options.delay = parseInt(options.delay || delayData) || 200;
	  self.options.container = containerElement ? containerElement : containerDataElement ? containerDataElement : navbarFixedTop ? navbarFixedTop : navbarFixedBottom ? navbarFixedBottom : modal ? modal : document.body; // set placement class

	  var placementClass = "bs-tooltip-".concat(self.options.placement),
	      // private methods
	  getTitle = function getTitle() {
	    return element.getAttribute('title') || element.getAttribute('data-title') || element.getAttribute('data-original-title');
	  },
	      removeToolTip = function removeToolTip() {
	    self.options.container.removeChild(tooltip);
	    tooltip = null;
	    timer = null;
	  },
	      createToolTip = function createToolTip() {
	    titleString = getTitle(); // read the title again

	    if (titleString) {
	      // invalidate, maybe markup changed
	      // create tooltip
	      tooltip = document.createElement('div'); // set markup

	      if (self.options.template) {
	        var tooltipMarkup = document.createElement('div');
	        tooltipMarkup.innerHTML = self.options.template.trim();
	        tooltip.className = tooltipMarkup.firstChild.className;
	        tooltip.innerHTML = tooltipMarkup.firstChild.innerHTML;
	        queryElement('.tooltip-inner', tooltip).innerHTML = titleString.trim();
	      } else {
	        // tooltip arrow
	        var tooltipArrow = document.createElement('div');
	        addClass(tooltipArrow, 'arrow');
	        tooltip.appendChild(tooltipArrow); // tooltip inner

	        var tooltipInner = document.createElement('div');
	        addClass(tooltipInner, 'tooltip-inner');
	        tooltip.appendChild(tooltipInner);
	        tooltipInner.innerHTML = titleString;
	      } // reset position


	      tooltip.style.left = '0';
	      tooltip.style.top = '0'; // set class and role attribute

	      tooltip.setAttribute('role', 'tooltip');
	      !hasClass(tooltip, 'tooltip') && addClass(tooltip, 'tooltip');
	      !hasClass(tooltip, self.options.animation) && addClass(tooltip, self.options.animation);
	      !hasClass(tooltip, placementClass) && addClass(tooltip, placementClass); // append to container

	      self.options.container.appendChild(tooltip);
	    }
	  },
	      updateTooltip = function updateTooltip() {
	    styleTip(element, tooltip, self.options.placement, self.options.container);
	  },
	      showTooltip = function showTooltip() {
	    !hasClass(tooltip, 'show') && addClass(tooltip, 'show');
	  },
	      // triggers
	  showAction = function showAction() {
	    on(window, 'resize', self.hide, passiveHandler);
	    dispatchCustomEvent.call(element, shownCustomEvent);
	  },
	      hideAction = function hideAction() {
	    off(window, 'resize', self.hide, passiveHandler);
	    removeToolTip();
	    dispatchCustomEvent.call(element, hiddenCustomEvent);
	  },
	      toggleEvents = function toggleEvents(action) {
	    action(element, mouseHover[0], self.show);
	    action(element, mouseHover[1], self.hide);
	  }; // public methods


	  self.show = function () {
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      if (tooltip === null) {
	        dispatchCustomEvent.call(element, showCustomEvent);
	        if (showCustomEvent.defaultPrevented) return; // if(createToolTip() == false) return;

	        if (createToolTip() !== false) {
	          updateTooltip();
	          showTooltip();
	          !!self.options.animation ? emulateTransitionEnd(tooltip, showAction) : showAction();
	        }
	      }
	    }, 20);
	  };

	  self.hide = function () {
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      if (tooltip && hasClass(tooltip, 'show')) {
	        dispatchCustomEvent.call(element, hideCustomEvent);
	        if (hideCustomEvent.defaultPrevented) return;
	        removeClass(tooltip, 'show');
	        !!self.options.animation ? emulateTransitionEnd(tooltip, hideAction) : hideAction();
	      }
	    }, self.options.delay);
	  };

	  self.toggle = function () {
	    if (!tooltip) {
	      self.show();
	    } else {
	      self.hide();
	    }
	  };

	  self.dispose = function () {
	    toggleEvents(off);
	    self.hide();
	    element.setAttribute('title', element.getAttribute('data-original-title'));
	    element.removeAttribute('data-original-title');
	    delete element.Tooltip;
	  };
	  /* invalidate */


	  titleString = getTitle();
	  if (!titleString) return;
	  /* init */

	  if (!element.Tooltip) {
	    // prevent adding event handlers twice
	    element.setAttribute('data-original-title', titleString);
	    element.removeAttribute('title');
	    toggleEvents(on);
	  } // associate target to init object


	  self.element = element;
	  element.Tooltip = self;
	}
	// =================

	supports.push(['Tooltip', Tooltip, '[data-toggle="tooltip"],[data-tip="tooltip"]']);

	/* Native JavaScript for Bootstrap | Initialize Data API
	--------------------------------------------------------*/

	var initCallback = function initCallback(lookUp) {
	  lookUp = lookUp || document;

	  var initializeDataAPI = function initializeDataAPI(Constructor, collection) {
	    for (var i = 0, cl = collection.length; i < cl; i++) {
	      new Constructor(collection[i]);
	    }
	  };

	  for (var j = 0, sl = supports.length; j < sl; j++) {
	    initializeDataAPI(supports[j][1], lookUp.querySelectorAll(supports[j][2]));
	  }
	};

	document.body ? initCallback() : on(document, 'DOMContentLoaded', initCallback);

	var index_umd = {
	  Alert: Alert,
	  Button: Button,
	  Carousel: Carousel,
	  Collapse: Collapse,
	  Dropdown: Dropdown,
	  Modal: Modal,
	  Popover: Popover,
	  ScrollSpy: ScrollSpy,
	  Tab: Tab,
	  Toast: Toast,
	  Tooltip: Tooltip
	};

	return index_umd;

})));
