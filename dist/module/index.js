/*!
* Bootstrap Native ESM v5.1.8 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-DloxD7_C.js";
import { Data, ObjectAssign, ObjectKeys, Timer, addClass, ariaDescribedBy, ariaExpanded, ariaHidden, ariaModal, ariaPressed, ariaSelected, closest, createCustomEvent, createElement, dispatchEvent, dragstartEvent, emulateTransitionEnd, focus, focusEvent, focusinEvent, focusoutEvent, getAttribute, getBoundingClientRect, getDocument, getDocumentBody, getDocumentElement, getElementById, getElementStyle, getElementTransitionDuration, getElementsByClassName, getElementsByTagName, getInstance, getNodeScroll, getParentNode, getRectRelativeToOffsetParent, getUID, getWindow, hasAttribute, hasClass, isApple, isArray, isElement, isElementInScrollRange, isFunction, isHTMLElement, isNode, isNodeList, isRTL, isShadowRoot, isString, isTableElement, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyEscape, keydownEvent, keyupEvent, matches, mouseclickEvent, mousedownEvent, mouseenterEvent, mousehoverEvent, mouseleaveEvent, noop, normalizeOptions, passiveHandler, pointerdownEvent, pointermoveEvent, pointerupEvent, querySelector, querySelectorAll, reflow, removeAttribute, removeClass, setAttribute, setElementStyle, toLowerCase, toggleFocusTrap, touchstartEvent } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
import PositionObserver from "@thednp/position-observer";
//#region src/strings/fadeClass.ts
/**
* Global namespace for most components `fade` class.
*/
const fadeClass = "fade";
//#endregion
//#region src/strings/showClass.ts
/**
* Global namespace for most components `show` class.
*/
const showClass = "show";
//#endregion
//#region src/strings/dataBsDismiss.ts
/**
* Global namespace for most components `dismiss` option.
*/
const dataBsDismiss = "data-bs-dismiss";
//#endregion
//#region src/strings/alertString.ts
/** @type {string} */
const alertString = "alert";
//#endregion
//#region src/strings/alertComponent.ts
/** @type {string} */
const alertComponent = "Alert";
//#endregion
//#region src/util/isDisabled.ts
/**
* Check if interactive element is disabled.
* @param target either a `<button>` or an `<a>`
* @returns whether the target is disabled
*/
const isDisabled = (target) => {
	return hasClass(target, "disabled") || getAttribute(target, "disabled") === "true";
};
//#endregion
//#region src/version.ts
const Version = "5.1.8";
//#endregion
//#region src/components/base-component.ts
/** Returns a new `BaseComponent` instance. */
var BaseComponent = class {
	/**
	* @param target `Element` or selector string
	* @param config component instance options
	*/
	constructor(target, config) {
		let element;
		try {
			if (isElement(target)) element = target;
			else if (isString(target)) {
				element = querySelector(target);
				if (!element) throw Error(`"${target}" is not a valid selector.`);
			} else throw Error(`your target is not an instance of HTMLElement.`);
		} catch (e) {
			throw Error(`${this.name} Error: ${e.message}`);
		}
		const prevInstance = Data.get(element, this.name);
		if (prevInstance) prevInstance._toggleEventListeners();
		this.element = element;
		this.options = this.defaults && ObjectKeys(this.defaults).length ? normalizeOptions(element, this.defaults, config || {}, "bs") : {};
		Data.set(element, this.name, this);
	}
	get version() {
		return Version;
	}
	get name() {
		return "BaseComponent";
	}
	get defaults() {
		return {};
	}
	/** just to have something to extend from */
	_toggleEventListeners = () => {};
	/** Removes component from target element. */
	dispose() {
		Data.remove(this.element, this.name);
		ObjectKeys(this).forEach((prop) => {
			delete this[prop];
		});
	}
};
//#endregion
//#region src/components/alert.ts
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;
/**
* Static method which returns an existing `Alert` instance associated
* to a target `Element`.
*/
const getAlertInstance = (element) => getInstance(element, alertComponent);
/**
* An `Alert` initialization callback.
*/
const alertInitCallback = (element) => new Alert(element);
const closeAlertEvent = createCustomEvent(`close.bs.${alertString}`);
const closedAlertEvent = createCustomEvent(`closed.bs.${alertString}`);
/**
* Alert `transitionend` callback.
*
* @param that target Alert instance
*/
const alertTransitionEnd = (self) => {
	const { element } = self;
	dispatchEvent(element, closedAlertEvent);
	self._toggleEventListeners();
	self.dispose();
	element.remove();
};
/** Creates a new Alert instance. */
var Alert = class extends BaseComponent {
	static selector = alertSelector;
	static init = alertInitCallback;
	static getInstance = getAlertInstance;
	dismiss;
	constructor(target) {
		super(target);
		this.dismiss = querySelector(alertDismissSelector, this.element);
		this._toggleEventListeners(true);
	}
	/** Returns component name string. */
	get name() {
		return alertComponent;
	}
	/**
	* Public method that hides the `.alert` element from the user,
	* disposes the instance once animation is complete, then
	* removes the element from the DOM.
	*/
	close = (e) => {
		const { element, dismiss } = this;
		if (!element || !hasClass(element, "show")) return;
		if (e && dismiss && isDisabled(dismiss)) return;
		dispatchEvent(element, closeAlertEvent);
		if (closeAlertEvent.defaultPrevented) return;
		removeClass(element, showClass);
		if (hasClass(element, "fade")) emulateTransitionEnd(element, () => alertTransitionEnd(this));
		else alertTransitionEnd(this);
	};
	/**
	* Toggle on / off the `click` event listener.
	*
	* @param add when `true`, event listener is added
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		const { dismiss, close } = this;
		if (dismiss) action(dismiss, mouseclickEvent, close);
	};
	/** Remove the component from target element. */
	dispose() {
		this._toggleEventListeners();
		super.dispose();
	}
};
//#endregion
//#region src/strings/activeClass.ts
/**
* Global namespace for most components active class.
*/
const activeClass = "active";
//#endregion
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
//#endregion
//#region src/strings/buttonString.ts
/** @type {string} */
const buttonString = "button";
//#endregion
//#region src/strings/buttonComponent.ts
/** @type {string} */
const buttonComponent = "Button";
//#endregion
//#region src/components/button.ts
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;
/**
* Static method which returns an existing `Button` instance associated
* to a target `Element`.
*/
const getButtonInstance = (element) => getInstance(element, buttonComponent);
/** A `Button` initialization callback. */
const buttonInitCallback = (element) => new Button(element);
/** Creates a new `Button` instance. */
var Button = class extends BaseComponent {
	static selector = buttonSelector;
	static init = buttonInitCallback;
	static getInstance = getButtonInstance;
	/**
	* @param target usually a `.btn` element
	*/
	constructor(target) {
		super(target);
		const { element } = this;
		this.isActive = hasClass(element, activeClass);
		setAttribute(element, ariaPressed, String(!!this.isActive));
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return buttonComponent;
	}
	/**
	* Toggles the state of the target button.
	*
	* @param e usually `click` Event object
	*/
	toggle = (e) => {
		if (e) e.preventDefault();
		const { element, isActive } = this;
		if (isDisabled(element)) return;
		(isActive ? removeClass : addClass)(element, activeClass);
		setAttribute(element, ariaPressed, isActive ? "false" : "true");
		this.isActive = hasClass(element, activeClass);
	};
	/**
	* Toggles on/off the `click` event listener.
	*
	* @param add when `true`, event listener is added
	*/
	_toggleEventListeners = (add) => {
		(add ? addListener : removeListener)(this.element, mouseclickEvent, this.toggle);
	};
	/** Removes the `Button` component from the target element. */
	dispose() {
		this._toggleEventListeners();
		super.dispose();
	}
};
//#endregion
//#region src/strings/dataBsTarget.ts
/**
* Global namespace for most components `target` option.
*/
const dataBsTarget = "data-bs-target";
//#endregion
//#region src/strings/carouselString.ts
/** @type {string} */
const carouselString = "carousel";
//#endregion
//#region src/strings/carouselComponent.ts
/** @type {string} */
const carouselComponent = "Carousel";
//#endregion
//#region src/strings/dataBsParent.ts
/**
* Global namespace for most components `parent` option.
*/
const dataBsParent = "data-bs-parent";
//#endregion
//#region src/strings/dataBsContainer.ts
/**
* Global namespace for most components `container` option.
*/
const dataBsContainer = "data-bs-container";
//#endregion
//#region src/util/getTargetElement.ts
/**
* Returns the `Element` that THIS one targets
* via `data-bs-target`, `href`, `data-bs-parent` or `data-bs-container`.
*
* @param element the target element
* @returns the query result
*/
const getTargetElement = (element) => {
	const targetAttr = [
		dataBsTarget,
		dataBsParent,
		dataBsContainer,
		"href"
	];
	const doc = getDocument(element);
	return targetAttr.map((att) => {
		const attValue = getAttribute(element, att);
		if (attValue) return att === "data-bs-parent" ? closest(element, attValue) : querySelector(attValue, doc);
		return null;
	}).filter((x) => x)[0];
};
//#endregion
//#region src/components/carousel.ts
const carouselSelector = `[data-bs-ride="${carouselString}"]`;
const carouselItem = `${carouselString}-item`;
const dataBsSlideTo = "data-bs-slide-to";
const dataBsSlide = "data-bs-slide";
const pausedClass = "paused";
const carouselDefaults = {
	pause: "hover",
	keyboard: false,
	touch: true,
	interval: 5e3
};
/**
* Static method which returns an existing `Carousel` instance associated
* to a target `Element`.
*/
const getCarouselInstance = (element) => getInstance(element, carouselComponent);
/**
* A `Carousel` initialization callback.
*/
const carouselInitCallback = (element) => new Carousel(element);
let startX = 0;
let currentX = 0;
let endX = 0;
const carouselSlideEvent = createCustomEvent(`slide.bs.${carouselString}`);
const carouselSlidEvent = createCustomEvent(`slid.bs.${carouselString}`);
/**
* The `transitionend` event listener of the `Carousel`.
*
* @param self the `Carousel` instance
*/
const carouselTransitionEndHandler = (self) => {
	const { index, direction, element, slides, options } = self;
	if (self.isAnimating) {
		const activeItem = getActiveIndex(self);
		const orientation = direction === "left" ? "next" : "prev";
		const directionClass = direction === "left" ? "start" : "end";
		addClass(slides[index], activeClass);
		removeClass(slides[index], `${carouselItem}-${orientation}`);
		removeClass(slides[index], `${carouselItem}-${directionClass}`);
		removeClass(slides[activeItem], activeClass);
		removeClass(slides[activeItem], `${carouselItem}-${directionClass}`);
		dispatchEvent(element, carouselSlidEvent);
		Timer.clear(element, dataBsSlide);
		if (self.cycle && !getDocument(element).hidden && options.interval && !self.isPaused) self.cycle();
	}
};
/**
* Handles the `mouseenter` events when *options.pause*
* is set to `hover`.
*/
function carouselPauseHandler() {
	const self = getCarouselInstance(this);
	if (self && !self.isPaused && !Timer.get(this, pausedClass)) addClass(this, pausedClass);
}
/**
* Handles the `mouseleave` events when *options.pause*
* is set to `hover`.
*/
function carouselResumeHandler() {
	const self = getCarouselInstance(this);
	if (self && self.isPaused && !Timer.get(this, pausedClass)) self.cycle();
}
/**
* Handles the `click` event for the `Carousel` indicators.
*
* @param e the `Event` object
*/
function carouselIndicatorHandler(e) {
	e.preventDefault();
	const element = closest(this, carouselSelector) || getTargetElement(this);
	const self = element && getCarouselInstance(element);
	if (isDisabled(this)) return;
	if (!self || self.isAnimating) return;
	const newIndex = Number(getAttribute(this, dataBsSlideTo) || 0);
	if (this && !hasClass(this, "active") && !Number.isNaN(newIndex)) self.to(newIndex);
}
/**
* Handles the `click` event for the `Carousel` arrows.
*
* @param e the `Event` object
*/
function carouselControlsHandler(e) {
	e.preventDefault();
	const element = closest(this, carouselSelector) || getTargetElement(this);
	const self = element && getCarouselInstance(element);
	if (isDisabled(this)) return;
	if (!self || self.isAnimating) return;
	const orientation = getAttribute(this, dataBsSlide);
	if (orientation === "next") self.next();
	else if (orientation === "prev") self.prev();
}
/**
* Handles the keyboard `keydown` event for the visible `Carousel` elements.
*
* @param e the `Event` object
*/
const carouselKeyHandler = ({ code, target }) => {
	const [element] = [...querySelectorAll(carouselSelector, getDocument(target))].filter((x) => isElementInScrollRange(x));
	const self = getCarouselInstance(element);
	if (!self || self.isAnimating || /textarea|input|select/i.test(target.nodeName)) return;
	const RTL = isRTL(element);
	const arrowKeyNext = !RTL ? keyArrowRight : keyArrowLeft;
	if (code === (!RTL ? keyArrowLeft : keyArrowRight)) self.prev();
	else if (code === arrowKeyNext) self.next();
};
/**
* Prevents the `touchstart` and `dragstart` events for the `Carousel` element.
*
* @param e the `Event` object
*/
function carouselDragHandler(e) {
	const { target } = e;
	const self = getCarouselInstance(this);
	if (self && self.isTouch && !self.controls.includes(target) && !self.controls.includes(target?.parentElement) && (!self.indicator || !self.indicator.contains(target))) e.preventDefault();
}
/**
* Handles the `pointerdown` event for the `Carousel` element.
*
* @param e the `Event` object
*/
function carouselPointerDownHandler(e) {
	const { target } = e;
	const self = getCarouselInstance(this);
	if (!self || self.isAnimating || self.isTouch) return;
	const { controls, indicator } = self;
	if (![...controls, indicator].every((el) => el && (el === target || el.contains(target))) && this.contains(target)) {
		startX = e.pageX;
		self.isTouch = true;
		toggleCarouselTouchHandlers(self, true);
	}
}
/**
* Handles the `pointermove` event for the `Carousel` element.
*
* @param e
*/
const carouselPointerMoveHandler = (e) => {
	currentX = e.pageX;
};
/**
* Handles the `pointerup` event for the `Carousel` element.
*
* @param e
*/
const carouselPointerUpHandler = (e) => {
	const { target } = e;
	const doc = getDocument(target);
	const self = [...querySelectorAll(carouselSelector, doc)].map((c) => getCarouselInstance(c)).find((i) => i.isTouch);
	if (!self) return;
	const { element, index } = self;
	const RTL = isRTL(element);
	endX = e.pageX;
	self.isTouch = false;
	toggleCarouselTouchHandlers(self);
	if (!doc.getSelection()?.toString().length && element.contains(target) && Math.abs(startX - endX) > 120) {
		if (currentX < startX) self.to(index + (RTL ? -1 : 1));
		else if (currentX > startX) self.to(index + (RTL ? 1 : -1));
	}
	startX = 0;
	currentX = 0;
	endX = 0;
};
/**
* Sets active indicator for the `Carousel` instance.
*
* @param self the `Carousel` instance
* @param index the index of the new active indicator
*/
const activateCarouselIndicator = (self, index) => {
	const { indicators } = self;
	[...indicators].forEach((x) => removeClass(x, activeClass));
	if (self.indicators[index]) addClass(indicators[index], activeClass);
};
/**
* Toggles the pointer event listeners for a given `Carousel` instance.
*
* @param self the `Carousel` instance
* @param add when `TRUE` event listeners are added
*/
const toggleCarouselTouchHandlers = (self, add) => {
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
const getActiveIndex = (self) => {
	const { slides, element } = self;
	const activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
	return activeItem ? [...slides].indexOf(activeItem) : -1;
};
/** Creates a new `Carousel` instance. */
var Carousel = class extends BaseComponent {
	static selector = carouselSelector;
	static init = carouselInitCallback;
	static getInstance = getCarouselInstance;
	/**
	* @param target mostly a `.carousel` element
	* @param config instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element } = this;
		this.direction = isRTL(element) ? "right" : "left";
		this.isTouch = false;
		this.slides = getElementsByClassName(carouselItem, element);
		const { slides } = this;
		if (slides.length < 2) return;
		const activeIndex = getActiveIndex(this);
		const transitionItem = [...slides].find((s) => matches(s, `.${carouselItem}-next`));
		this.index = activeIndex;
		const doc = getDocument(element);
		this.controls = [...querySelectorAll(`[${dataBsSlide}]`, element), ...querySelectorAll(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`, doc)].filter((c, i, ar) => i === ar.indexOf(c));
		this.indicator = querySelector(`.${carouselString}-indicators`, element);
		this.indicators = [...this.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, this.indicator) : [], ...querySelectorAll(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`, doc)].filter((c, i, ar) => i === ar.indexOf(c));
		const { options } = this;
		this.options.interval = options.interval === true ? carouselDefaults.interval : options.interval;
		if (transitionItem) this.index = [...slides].indexOf(transitionItem);
		else if (activeIndex < 0) {
			this.index = 0;
			addClass(slides[0], activeClass);
			if (this.indicators.length) activateCarouselIndicator(this, 0);
		}
		if (this.indicators.length) activateCarouselIndicator(this, this.index);
		this._toggleEventListeners(true);
		if (options.interval) this.cycle();
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
	/** Slide automatically through items. */
	cycle() {
		const { element, options, isPaused, index } = this;
		Timer.clear(element, carouselString);
		if (isPaused) {
			Timer.clear(element, pausedClass);
			removeClass(element, pausedClass);
		}
		Timer.set(element, () => {
			if (this.element && !this.isPaused && !this.isTouch && isElementInScrollRange(element)) this.to(index + 1);
		}, options.interval, carouselString);
	}
	/** Pause the automatic cycle. */
	pause() {
		const { element, options } = this;
		if (this.isPaused || !options.interval) return;
		addClass(element, pausedClass);
		Timer.set(element, () => {}, 1, pausedClass);
	}
	/** Slide to the next item. */
	next() {
		if (!this.isAnimating) this.to(this.index + 1);
	}
	/** Slide to the previous item. */
	prev() {
		if (!this.isAnimating) this.to(this.index - 1);
	}
	/**
	* Jump to the item with the `idx` index.
	*
	* @param idx the index of the item to jump to
	*/
	to(idx) {
		const { element, slides, options } = this;
		const activeItem = getActiveIndex(this);
		const RTL = isRTL(element);
		let next = idx;
		if (this.isAnimating || activeItem === next || Timer.get(element, dataBsSlide)) return;
		if (activeItem < next || activeItem === 0 && next === slides.length - 1) this.direction = RTL ? "right" : "left";
		else if (activeItem > next || activeItem === slides.length - 1 && next === 0) this.direction = RTL ? "left" : "right";
		const { direction } = this;
		if (next < 0) next = slides.length - 1;
		else if (next >= slides.length) next = 0;
		const orientation = direction === "left" ? "next" : "prev";
		const directionClass = direction === "left" ? "start" : "end";
		const eventProperties = {
			relatedTarget: slides[next],
			from: activeItem,
			to: next,
			direction
		};
		ObjectAssign(carouselSlideEvent, eventProperties);
		ObjectAssign(carouselSlidEvent, eventProperties);
		dispatchEvent(element, carouselSlideEvent);
		if (carouselSlideEvent.defaultPrevented) return;
		this.index = next;
		activateCarouselIndicator(this, next);
		if (getElementTransitionDuration(slides[next]) && hasClass(element, "slide")) Timer.set(element, () => {
			addClass(slides[next], `${carouselItem}-${orientation}`);
			reflow(slides[next]);
			addClass(slides[next], `${carouselItem}-${directionClass}`);
			addClass(slides[activeItem], `${carouselItem}-${directionClass}`);
			emulateTransitionEnd(slides[next], () => this.slides && this.slides.length && carouselTransitionEndHandler(this));
		}, 0, dataBsSlide);
		else {
			addClass(slides[next], activeClass);
			removeClass(slides[activeItem], activeClass);
			Timer.set(element, () => {
				Timer.clear(element, dataBsSlide);
				if (element && options.interval && !this.isPaused) this.cycle();
				dispatchEvent(element, carouselSlidEvent);
			}, 0, dataBsSlide);
		}
	}
	/**
	* Toggles all event listeners for the `Carousel` instance.
	*
	* @param add when `TRUE` event listeners are added
	*/
	_toggleEventListeners = (add) => {
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
		if (controls.length) controls.forEach((arrow) => {
			action(arrow, mouseclickEvent, carouselControlsHandler);
		});
		if (indicators.length) indicators.forEach((indicator) => {
			action(indicator, mouseclickEvent, carouselIndicatorHandler);
		});
		if (keyboard) action(getDocument(element), keydownEvent, carouselKeyHandler);
	};
	/** Remove `Carousel` component from target. */
	dispose() {
		const { isAnimating } = this;
		const clone = {
			...this,
			isAnimating
		};
		this._toggleEventListeners();
		super.dispose();
		if (clone.isAnimating) emulateTransitionEnd(clone.slides[clone.index], () => {
			carouselTransitionEndHandler(clone);
		});
	}
};
//#endregion
//#region src/strings/collapsingClass.ts
/**
* Global namespace for most components `collapsing` class.
* As used by `Collapse` / `Tab`.
*/
const collapsingClass = "collapsing";
//#endregion
//#region src/strings/collapseString.ts
/** @type {string} */
const collapseString = "collapse";
//#endregion
//#region src/strings/collapseComponent.ts
/** @type {string} */
const collapseComponent = "Collapse";
//#endregion
//#region src/components/collapse.ts
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;
const collapseDefaults = { parent: null };
/**
* Static method which returns an existing `Collapse` instance associated
* to a target `Element`.
*/
const getCollapseInstance = (element) => getInstance(element, collapseComponent);
/**
* A `Collapse` initialization callback.
*/
const collapseInitCallback = (element) => new Collapse(element);
const showCollapseEvent = createCustomEvent(`show.bs.${collapseString}`);
const shownCollapseEvent = createCustomEvent(`shown.bs.${collapseString}`);
const hideCollapseEvent = createCustomEvent(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = createCustomEvent(`hidden.bs.${collapseString}`);
/**
* Expand the designated `Element`.
*
* @param self the `Collapse` instance
*/
const expandCollapse = (self) => {
	const { element, parent, triggers } = self;
	dispatchEvent(element, showCollapseEvent);
	if (!showCollapseEvent.defaultPrevented) {
		Timer.set(element, noop, 17);
		if (parent) Timer.set(parent, noop, 17);
		addClass(element, collapsingClass);
		removeClass(element, collapseString);
		setElementStyle(element, { height: `${element.scrollHeight}px` });
		emulateTransitionEnd(element, () => {
			Timer.clear(element);
			if (parent) Timer.clear(parent);
			triggers.forEach((btn) => setAttribute(btn, ariaExpanded, "true"));
			removeClass(element, collapsingClass);
			addClass(element, collapseString);
			addClass(element, showClass);
			setElementStyle(element, { height: "" });
			dispatchEvent(element, shownCollapseEvent);
		});
	}
};
/**
* Collapse the designated `Element`.
*
* @param self the `Collapse` instance
*/
const collapseContent = (self) => {
	const { element, parent, triggers } = self;
	dispatchEvent(element, hideCollapseEvent);
	if (!hideCollapseEvent.defaultPrevented) {
		Timer.set(element, noop, 17);
		if (parent) Timer.set(parent, noop, 17);
		setElementStyle(element, { height: `${element.scrollHeight}px` });
		removeClass(element, collapseString);
		removeClass(element, showClass);
		addClass(element, collapsingClass);
		reflow(element);
		setElementStyle(element, { height: "0px" });
		emulateTransitionEnd(element, () => {
			Timer.clear(element);
			if (parent) Timer.clear(parent);
			triggers.forEach((btn) => setAttribute(btn, ariaExpanded, "false"));
			removeClass(element, collapsingClass);
			addClass(element, collapseString);
			setElementStyle(element, { height: "" });
			dispatchEvent(element, hiddenCollapseEvent);
		});
	}
};
/**
* Handles the `click` event for the `Collapse` instance.
*
* @param e the `Event` object
*/
const collapseClickHandler = (e) => {
	const { target } = e;
	const trigger = target && closest(target, collapseToggleSelector);
	const element = trigger && getTargetElement(trigger);
	const self = element && getCollapseInstance(element);
	if (trigger && isDisabled(trigger)) return;
	if (!self) return;
	self.toggle();
	if (trigger?.tagName === "A") e.preventDefault();
};
/** Returns a new `Colapse` instance. */
var Collapse = class extends BaseComponent {
	static selector = collapseSelector;
	static init = collapseInitCallback;
	static getInstance = getCollapseInstance;
	/**
	* @param target and `Element` that matches the selector
	* @param config instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element, options } = this;
		const doc = getDocument(element);
		this.triggers = [...querySelectorAll(collapseToggleSelector, doc)].filter((btn) => getTargetElement(btn) === element);
		this.parent = isHTMLElement(options.parent) ? options.parent : isString(options.parent) ? getTargetElement(element) || querySelector(options.parent, doc) : null;
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return collapseComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return collapseDefaults;
	}
	/** Hides the collapse. */
	hide() {
		const { triggers, element } = this;
		if (!Timer.get(element)) {
			collapseContent(this);
			if (triggers.length) triggers.forEach((btn) => addClass(btn, `${collapseString}d`));
		}
	}
	/** Shows the collapse. */
	show() {
		const { element, parent, triggers } = this;
		let activeCollapse;
		let activeCollapseInstance;
		if (parent) {
			activeCollapse = [...querySelectorAll(`.${collapseString}.${showClass}`, parent)].find((i) => getCollapseInstance(i));
			activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse);
		}
		if ((!parent || !Timer.get(parent)) && !Timer.get(element)) {
			if (activeCollapseInstance && activeCollapse !== element) {
				collapseContent(activeCollapseInstance);
				activeCollapseInstance.triggers.forEach((btn) => {
					addClass(btn, `${collapseString}d`);
				});
			}
			expandCollapse(this);
			if (triggers.length) triggers.forEach((btn) => removeClass(btn, `${collapseString}d`));
		}
	}
	/** Toggles the visibility of the collapse. */
	toggle() {
		if (!hasClass(this.element, "show")) this.show();
		else this.hide();
	}
	/**
	* Toggles on/off the event listener(s) of the `Collapse` instance.
	*
	* @param add when `true`, the event listener is added
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		const { triggers } = this;
		if (triggers.length) triggers.forEach((btn) => {
			action(btn, mouseclickEvent, collapseClickHandler);
		});
	};
	/** Remove the `Collapse` component from the target `Element`. */
	dispose() {
		this._toggleEventListeners();
		super.dispose();
	}
};
//#endregion
//#region src/strings/dropdownClasses.ts
/**
* Global namespace for `Dropdown` types / classes.
*/
const dropdownMenuClasses = [
	"dropdown",
	"dropup",
	"dropstart",
	"dropend"
];
//#endregion
//#region src/strings/dropdownComponent.ts
/** @type {string} */
const dropdownComponent = "Dropdown";
//#endregion
//#region src/strings/dropdownMenuClass.ts
/**
* Global namespace for `.dropdown-menu`.
*/
const dropdownMenuClass = "dropdown-menu";
//#endregion
//#region src/util/isEmptyAnchor.ts
/**
* Checks if an *event.target* or its parent has an `href="#"` value.
* We need to prevent jumping around onclick, don't we?
*
* @param element the target element
* @returns the query result
*/
const isEmptyAnchor = (element) => {
	const parentAnchor = closest(element, "A");
	return element.tagName === "A" && hasAttribute(element, "href") && getAttribute(element, "href")?.slice(-1) === "#" || parentAnchor && hasAttribute(parentAnchor, "href") && getAttribute(parentAnchor, "href")?.slice(-1) === "#";
};
//#endregion
//#region src/components/dropdown.ts
const [dropdownString, dropupString, dropstartString, dropendString] = dropdownMenuClasses;
const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;
/**
* Static method which returns an existing `Dropdown` instance associated
* to a target `Element`.
*/
const getDropdownInstance = (element) => getInstance(element, dropdownComponent);
/**
* A `Dropdown` initialization callback.
*/
const dropdownInitCallback = (element) => new Dropdown(element);
const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
const verticalClass = [dropdownString, dropupString];
const horizontalClass = [dropstartString, dropendString];
const menuFocusTags = ["A", "BUTTON"];
const dropdownDefaults = {
	offset: 5,
	display: "dynamic"
};
const showDropdownEvent = createCustomEvent(`show.bs.${dropdownString}`);
const shownDropdownEvent = createCustomEvent(`shown.bs.${dropdownString}`);
const hideDropdownEvent = createCustomEvent(`hide.bs.${dropdownString}`);
const hiddenDropdownEvent = createCustomEvent(`hidden.bs.${dropdownString}`);
const updatedDropdownEvent = createCustomEvent(`updated.bs.${dropdownString}`);
/**
* Apply specific style or class names to a `.dropdown-menu` to automatically
* accomodate the layout and the page scroll.
*
* @param self the `Dropdown` instance
*/
const styleDropdown = (self) => {
	const { element, menu, parentElement, options } = self;
	const { offset } = options;
	if (getElementStyle(menu, "position") === "static") return;
	const RTL = isRTL(element);
	const menuEnd = hasClass(menu, dropdownMenuEndClass);
	[
		"margin",
		"top",
		"bottom",
		"left",
		"right"
	].forEach((p) => {
		const style = {};
		style[p] = "";
		setElementStyle(menu, style);
	});
	let positionClass = dropdownMenuClasses.find((c) => hasClass(parentElement, c)) || dropdownString;
	const dropdownMargin = {
		dropdown: [
			offset,
			0,
			0
		],
		dropup: [
			0,
			0,
			offset
		],
		dropstart: RTL ? [
			-1,
			0,
			0,
			offset
		] : [
			-1,
			offset,
			0
		],
		dropend: RTL ? [
			-1,
			offset,
			0
		] : [
			-1,
			0,
			0,
			offset
		]
	};
	const dropdownPosition = {
		dropdown: { top: "100%" },
		dropup: {
			top: "auto",
			bottom: "100%"
		},
		dropstart: RTL ? {
			left: "100%",
			right: "auto"
		} : {
			left: "auto",
			right: "100%"
		},
		dropend: RTL ? {
			left: "auto",
			right: "100%"
		} : {
			left: "100%",
			right: "auto"
		},
		menuStart: RTL ? {
			right: "0",
			left: "auto"
		} : {
			right: "auto",
			left: "0"
		},
		menuEnd: RTL ? {
			right: "auto",
			left: "0"
		} : {
			right: "0",
			left: "auto"
		}
	};
	const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu;
	const { clientWidth, clientHeight } = getDocumentElement(element);
	const { left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight } = getBoundingClientRect(element);
	const leftFullExceed = targetLeft - menuWidth - offset < 0;
	const rightFullExceed = targetLeft + menuWidth + targetWidth + offset >= clientWidth;
	const bottomExceed = targetTop + menuHeight + offset >= clientHeight;
	const bottomFullExceed = targetTop + menuHeight + targetHeight + offset >= clientHeight;
	const topExceed = targetTop - menuHeight - offset < 0;
	const leftExceed = (!RTL && menuEnd || RTL && !menuEnd) && targetLeft + targetWidth - menuWidth < 0;
	const rightExceed = (RTL && menuEnd || !RTL && !menuEnd) && targetLeft + menuWidth >= clientWidth;
	if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) positionClass = dropdownString;
	if (positionClass === dropstartString && (!RTL ? leftFullExceed : rightFullExceed)) positionClass = dropendString;
	if (positionClass === dropendString && (RTL ? leftFullExceed : rightFullExceed)) positionClass = dropstartString;
	if (positionClass === dropupString && topExceed && !bottomFullExceed) positionClass = dropdownString;
	if (positionClass === dropdownString && bottomFullExceed && !topExceed) positionClass = dropupString;
	if (horizontalClass.includes(positionClass) && bottomExceed) ObjectAssign(dropdownPosition[positionClass], {
		top: "auto",
		bottom: 0
	});
	if (verticalClass.includes(positionClass) && (leftExceed || rightExceed)) {
		let posAjust = {
			left: "auto",
			right: "auto"
		};
		if (!leftExceed && rightExceed && !RTL) posAjust = {
			left: "auto",
			right: 0
		};
		if (leftExceed && !rightExceed && RTL) posAjust = {
			left: 0,
			right: "auto"
		};
		if (posAjust) ObjectAssign(dropdownPosition[positionClass], posAjust);
	}
	const margins = dropdownMargin[positionClass];
	setElementStyle(menu, {
		...dropdownPosition[positionClass],
		margin: `${margins.map((x) => x ? `${x}px` : x).join(" ")}`
	});
	if (verticalClass.includes(positionClass) && menuEnd) {
		if (menuEnd) setElementStyle(menu, dropdownPosition[!RTL && leftExceed || RTL && rightExceed ? "menuStart" : "menuEnd"]);
	}
	dispatchEvent(parentElement, updatedDropdownEvent);
};
/**
* Returns an `Array` of focusable items in the given dropdown-menu.
*
* @param menu the target menu
* @returns all children of the dropdown menu
*/
const getMenuItems = (menu) => {
	return Array.from(menu.children).map((c) => {
		if (c && menuFocusTags.includes(c.tagName)) return c;
		const { firstElementChild } = c;
		if (firstElementChild && menuFocusTags.includes(firstElementChild.tagName)) return firstElementChild;
		return null;
	}).filter((c) => c);
};
/**
* Toggles on/off the listeners for the events that close the dropdown
* as well as event that request a new position for the dropdown.
*
* @param {Dropdown} self the `Dropdown` instance
*/
const toggleDropdownDismiss = (self) => {
	const { element, options, menu } = self;
	const action = self.open ? addListener : removeListener;
	const doc = getDocument(element);
	action(doc, mouseclickEvent, dropdownDismissHandler);
	action(doc, focusEvent, dropdownDismissHandler);
	action(doc, keydownEvent, dropdownPreventScroll);
	action(doc, keyupEvent, dropdownKeyHandler);
	if (options.display === "dynamic") if (self.open) self._observer.observe(menu);
	else self._observer.disconnect();
};
/**
* Returns the currently open `.dropdown` element.
*
* @param element target
* @returns the query result
*/
const getCurrentOpenDropdown = (element) => {
	const currentParent = [
		...dropdownMenuClasses,
		"btn-group",
		"input-group"
	].map((c) => getElementsByClassName(`${c} ${showClass}`, getDocument(element))).find((x) => x.length);
	if (currentParent && currentParent.length) return [...currentParent[0].children].find((x) => dropdownMenuClasses.some((c) => c === getAttribute(x, dataBsToggle)));
};
/**
* Handles the `click` event for the `Dropdown` instance.
*
* @param e event object
*/
const dropdownDismissHandler = (e) => {
	const { target, type } = e;
	if (!isHTMLElement(target)) return;
	const element = getCurrentOpenDropdown(target);
	const self = element && getDropdownInstance(element);
	if (!self) return;
	const { parentElement, menu } = self;
	const isForm = parentElement && parentElement.contains(target) && (target.tagName === "form" || closest(target, "form") !== null);
	if ([mouseclickEvent, mousedownEvent].includes(type) && isEmptyAnchor(target)) e.preventDefault();
	if (!isForm && type !== focusEvent && target !== element && target !== menu) self.hide();
};
/**
* Handles `click` event listener for `Dropdown`.
*
* @param e event object
*/
function dropdownClickHandler(e) {
	const self = getDropdownInstance(this);
	if (isDisabled(this)) return;
	if (!self) return;
	e.stopPropagation();
	self.toggle();
	if (isEmptyAnchor(this)) e.preventDefault();
}
/**
* Prevents scroll when dropdown-menu is visible.
*
* @param e event object
*/
const dropdownPreventScroll = (e) => {
	if ([keyArrowDown, keyArrowUp].includes(e.code)) e.preventDefault();
};
/**
* Handles keyboard `keydown` events for `Dropdown`.
*
* @param e keyboard key
*/
function dropdownKeyHandler(e) {
	const { code } = e;
	const element = getCurrentOpenDropdown(this);
	if (!element) return;
	const self = getDropdownInstance(element);
	const { activeElement } = getDocument(element);
	if (!self || !activeElement) return;
	const { menu, open } = self;
	const menuItems = getMenuItems(menu);
	if (menuItems && menuItems.length && [keyArrowDown, keyArrowUp].includes(code)) {
		let idx = menuItems.indexOf(activeElement);
		if (activeElement === element) idx = 0;
		else if (code === keyArrowUp) idx = idx > 1 ? idx - 1 : 0;
		else if (code === keyArrowDown) idx = idx < menuItems.length - 1 ? idx + 1 : idx;
		if (menuItems[idx]) focus(menuItems[idx]);
	}
	if (keyEscape === code && open) {
		self.toggle();
		focus(element);
	}
}
/** Returns a new Dropdown instance. */
var Dropdown = class extends BaseComponent {
	static selector = dropdownSelector;
	static init = dropdownInitCallback;
	static getInstance = getDropdownInstance;
	/**
	* @param target Element or string selector
	* @param config the instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { parentElement } = this.element;
		const [menu] = getElementsByClassName(dropdownMenuClass, parentElement);
		if (!menu) return;
		this.parentElement = parentElement;
		this.menu = menu;
		this._observer = new PositionObserver(() => styleDropdown(this));
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return dropdownComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return dropdownDefaults;
	}
	/** Shows/hides the dropdown menu to the user. */
	toggle() {
		if (this.open) this.hide();
		else this.show();
	}
	/** Shows the dropdown menu to the user. */
	show() {
		const { element, open, menu, parentElement } = this;
		if (open) return;
		const currentElement = getCurrentOpenDropdown(element);
		const currentInstance = currentElement && getDropdownInstance(currentElement);
		if (currentInstance) currentInstance.hide();
		[
			showDropdownEvent,
			shownDropdownEvent,
			updatedDropdownEvent
		].forEach((e) => {
			e.relatedTarget = element;
		});
		dispatchEvent(parentElement, showDropdownEvent);
		if (showDropdownEvent.defaultPrevented) return;
		addClass(menu, showClass);
		addClass(parentElement, showClass);
		setAttribute(element, ariaExpanded, "true");
		styleDropdown(this);
		this.open = !open;
		focus(element);
		toggleDropdownDismiss(this);
		dispatchEvent(parentElement, shownDropdownEvent);
	}
	/** Hides the dropdown menu from the user. */
	hide() {
		const { element, open, menu, parentElement } = this;
		if (!open) return;
		[hideDropdownEvent, hiddenDropdownEvent].forEach((e) => {
			e.relatedTarget = element;
		});
		dispatchEvent(parentElement, hideDropdownEvent);
		if (hideDropdownEvent.defaultPrevented) return;
		removeClass(menu, showClass);
		removeClass(parentElement, showClass);
		setAttribute(element, ariaExpanded, "false");
		this.open = !open;
		toggleDropdownDismiss(this);
		dispatchEvent(parentElement, hiddenDropdownEvent);
	}
	/**
	* Toggles on/off the `click` event listener of the `Dropdown`.
	*
	* @param add when `true`, it will add the event listener
	*/
	_toggleEventListeners = (add) => {
		(add ? addListener : removeListener)(this.element, mouseclickEvent, dropdownClickHandler);
	};
	/** Removes the `Dropdown` component from the target element. */
	dispose() {
		if (this.open) this.hide();
		this._toggleEventListeners();
		super.dispose();
	}
};
//#endregion
//#region src/strings/modalString.ts
/** @type {string} */
const modalString = "modal";
//#endregion
//#region src/strings/modalComponent.ts
/** @type {string} */
const modalComponent = "Modal";
//#endregion
//#region src/strings/offcanvasComponent.ts
/** @type {string} */
const offcanvasComponent = "Offcanvas";
//#endregion
//#region src/strings/fixedTopClass.ts
/**
* Global namespace for components `fixed-top` class.
*/
const fixedTopClass = "fixed-top";
//#endregion
//#region src/strings/fixedBottomClass.ts
/**
* Global namespace for components `fixed-bottom` class.
*/
const fixedBottomClass = "fixed-bottom";
//#endregion
//#region src/strings/stickyTopClass.ts
/**
* Global namespace for components `sticky-top` class.
*/
const stickyTopClass = "sticky-top";
//#endregion
//#region src/strings/positionStickyClass.ts
/**
* Global namespace for components `position-sticky` class.
*/
const positionStickyClass = "position-sticky";
//#endregion
//#region src/util/scrollbar.ts
const getFixedItems = (parent) => [
	...getElementsByClassName(fixedTopClass, parent),
	...getElementsByClassName(fixedBottomClass, parent),
	...getElementsByClassName(stickyTopClass, parent),
	...getElementsByClassName(positionStickyClass, parent),
	...getElementsByClassName("is-fixed", parent)
];
/**
* Removes *padding* and *overflow* from the `<body>`
* and all spacing from fixed items.
*
* @param element the target modal/offcanvas
*/
const resetScrollbar = (element) => {
	const bd = getDocumentBody(element);
	setElementStyle(bd, {
		paddingRight: "",
		overflow: ""
	});
	const fixedItems = getFixedItems(bd);
	if (fixedItems.length) fixedItems.forEach((fixed) => {
		setElementStyle(fixed, {
			paddingRight: "",
			marginRight: ""
		});
	});
};
/**
* Returns the scrollbar width if the body does overflow
* the window.
*
* @param element target element
* @returns the scrollbar width value
*/
const measureScrollbar = (element) => {
	const { clientWidth } = getDocumentElement(element);
	const { innerWidth } = getWindow(element);
	return Math.abs(innerWidth - clientWidth);
};
/**
* Sets the `<body>` and fixed items style when modal / offcanvas
* is shown to the user.
*
* @param element the target modal/offcanvas
* @param overflow body does overflow or not
*/
const setScrollbar = (element, overflow) => {
	const bd = getDocumentBody(element);
	const bodyPad = parseInt(getElementStyle(bd, "paddingRight"), 10);
	const sbWidth = getElementStyle(bd, "overflow") === "hidden" && bodyPad ? 0 : measureScrollbar(element);
	const fixedItems = getFixedItems(bd);
	if (!overflow) return;
	setElementStyle(bd, {
		overflow: "hidden",
		paddingRight: `${bodyPad + sbWidth}px`
	});
	if (!fixedItems.length) return;
	fixedItems.forEach((fixed) => {
		const itemPadValue = getElementStyle(fixed, "paddingRight");
		fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
		if (["sticky-top", "position-sticky"].some((c) => hasClass(fixed, c))) {
			const itemMValue = getElementStyle(fixed, "marginRight");
			fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
		}
	});
};
//#endregion
//#region src/strings/offcanvasString.ts
/** @type {string} */
const offcanvasString = "offcanvas";
//#endregion
//#region src/util/popupContainer.ts
const popupContainer = createElement({
	tagName: "div",
	className: "popup-container"
});
const appendPopup = (target, customContainer) => {
	const containerIsBody = isNode(customContainer) && customContainer.nodeName === "BODY";
	const lookup = isNode(customContainer) && !containerIsBody ? customContainer : popupContainer;
	const BODY = containerIsBody ? customContainer : getDocumentBody(target);
	if (isNode(target)) {
		if (lookup === popupContainer) BODY.append(popupContainer);
		lookup.append(target);
	}
};
const removePopup = (target, customContainer) => {
	const containerIsBody = isNode(customContainer) && customContainer.nodeName === "BODY";
	const lookup = isNode(customContainer) && !containerIsBody ? customContainer : popupContainer;
	if (isNode(target)) {
		target.remove();
		if (lookup === popupContainer && !popupContainer.children.length) popupContainer.remove();
	}
};
const hasPopup = (target, customContainer) => {
	const lookup = isNode(customContainer) && customContainer.nodeName !== "BODY" ? customContainer : popupContainer;
	return isNode(target) && lookup.contains(target);
};
//#endregion
//#region src/util/backdrop.ts
const backdropString = "backdrop";
const modalBackdropClass = `${modalString}-${backdropString}`;
const offcanvasBackdropClass = `${offcanvasString}-${backdropString}`;
const modalActiveSelector = `.${modalString}.${showClass}`;
const offcanvasActiveSelector = `.${offcanvasString}.${showClass}`;
const overlay = createElement("div");
/**
* Returns the current active modal / offcancas element.
*
* @param element the context element
* @returns the requested element
*/
const getCurrentOpen = (element) => {
	return querySelector(`${modalActiveSelector},${offcanvasActiveSelector}`, getDocument(element));
};
/**
* Toogles from a Modal overlay to an Offcanvas, or vice-versa.
*
* @param isModal
*/
const toggleOverlayType = (isModal) => {
	const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
	[modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
		removeClass(overlay, c);
	});
	addClass(overlay, targetClass);
};
/**
* Append the overlay to DOM.
*
* @param element
* @param hasFade
* @param isModal
*/
const appendOverlay = (element, hasFade, isModal) => {
	toggleOverlayType(isModal);
	appendPopup(overlay, getDocumentBody(element));
	if (hasFade) addClass(overlay, fadeClass);
};
/**
* Shows the overlay to the user.
*/
const showOverlay = () => {
	if (!hasClass(overlay, "show")) {
		addClass(overlay, showClass);
		reflow(overlay);
	}
};
/**
* Hides the overlay from the user.
*/
const hideOverlay = () => {
	removeClass(overlay, showClass);
};
/**
* Removes the overlay from DOM.
*
* @param element
*/
const removeOverlay = (element) => {
	if (!getCurrentOpen(element)) {
		removeClass(overlay, fadeClass);
		removePopup(overlay, getDocumentBody(element));
		resetScrollbar(element);
	}
};
//#endregion
//#region src/util/isVisible.ts
/**
* @param element target
* @returns the check result
*/
const isVisible = (element) => {
	return isHTMLElement(element) && getElementStyle(element, "visibility") !== "hidden" && element.offsetParent !== null;
};
//#endregion
//#region src/components/modal.ts
const modalSelector = `.${modalString}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;
const modalDefaults = {
	backdrop: true,
	keyboard: true
};
/**
* Static method which returns an existing `Modal` instance associated
* to a target `Element`.
*/
const getModalInstance = (element) => getInstance(element, modalComponent);
/**
* A `Modal` initialization callback.
*/
const modalInitCallback = (element) => new Modal(element);
const showModalEvent = createCustomEvent(`show.bs.${modalString}`);
const shownModalEvent = createCustomEvent(`shown.bs.${modalString}`);
const hideModalEvent = createCustomEvent(`hide.bs.${modalString}`);
const hiddenModalEvent = createCustomEvent(`hidden.bs.${modalString}`);
/**
* Applies special style for the `<body>` and fixed elements
* when a modal instance is shown to the user.
*
* @param self the `Modal` instance
*/
const setModalScrollbar = (self) => {
	const { element } = self;
	const scrollbarWidth = measureScrollbar(element);
	const { clientHeight, scrollHeight } = getDocumentElement(element);
	const { clientHeight: modalHeight, scrollHeight: modalScrollHeight } = element;
	const modalOverflow = modalHeight !== modalScrollHeight;
	if (!modalOverflow && scrollbarWidth) setElementStyle(element, { [!isRTL(element) ? "paddingRight" : "paddingLeft"]: `${scrollbarWidth}px` });
	setScrollbar(element, modalOverflow || clientHeight !== scrollHeight);
};
/**
* Toggles on/off the listeners of events that close the modal.
*
* @param self the `Modal` instance
* @param add when `true`, event listeners are added
*/
const toggleModalDismiss = (self, add) => {
	const action = add ? addListener : removeListener;
	const { element } = self;
	action(element, mouseclickEvent, modalDismissHandler);
	action(getDocument(element), keydownEvent, modalKeyHandler);
	if (add) self._observer.observe(element);
	else self._observer.disconnect();
};
/**
* Executes after a modal is hidden to the user.
*
* @param self the `Modal` instance
*/
const afterModalHide = (self) => {
	const { triggers, element, relatedTarget } = self;
	removeOverlay(element);
	setElementStyle(element, {
		paddingRight: "",
		display: ""
	});
	toggleModalDismiss(self);
	const focusElement = showModalEvent.relatedTarget || triggers.find(isVisible);
	if (focusElement) focus(focusElement);
	hiddenModalEvent.relatedTarget = relatedTarget || void 0;
	dispatchEvent(element, hiddenModalEvent);
	toggleFocusTrap(element);
};
/**
* Executes after a modal is shown to the user.
*
* @param self the `Modal` instance
*/
const afterModalShow = (self) => {
	const { element, relatedTarget } = self;
	focus(element);
	toggleModalDismiss(self, true);
	shownModalEvent.relatedTarget = relatedTarget || void 0;
	dispatchEvent(element, shownModalEvent);
	toggleFocusTrap(element);
};
/**
* Executes before a modal is shown to the user.
*
* @param self the `Modal` instance
*/
const beforeModalShow = (self) => {
	const { element, hasFade } = self;
	setElementStyle(element, { display: "block" });
	setModalScrollbar(self);
	if (!getCurrentOpen(element)) setElementStyle(getDocumentBody(element), { overflow: "hidden" });
	addClass(element, showClass);
	removeAttribute(element, ariaHidden);
	setAttribute(element, ariaModal, "true");
	if (hasFade) emulateTransitionEnd(element, () => afterModalShow(self));
	else afterModalShow(self);
};
/**
* Executes before a modal is hidden to the user.
*
* @param self the `Modal` instance
*/
const beforeModalHide = (self) => {
	const { element, options, hasFade } = self;
	if (options.backdrop && hasFade && hasClass(overlay, "show") && !getCurrentOpen(element)) {
		hideOverlay();
		emulateTransitionEnd(overlay, () => afterModalHide(self));
	} else afterModalHide(self);
};
/**
* Handles the `click` event listener for modal.
*
* @param e the `Event` object
*/
function modalClickHandler(e) {
	const element = getTargetElement(this);
	const self = element && getModalInstance(element);
	if (isDisabled(this)) return;
	if (!self) return;
	if (this.tagName === "A") e.preventDefault();
	self.relatedTarget = this;
	self.toggle();
}
/**
* Handles the `keydown` event listener for modal
* to hide the modal when user type the `ESC` key.
*
* @param e the `Event` object
*/
const modalKeyHandler = ({ code, target }) => {
	const element = querySelector(modalActiveSelector, getDocument(target));
	const self = element && getModalInstance(element);
	if (!self) return;
	const { options } = self;
	if (options.keyboard && code === keyEscape && hasClass(element, "show")) {
		self.relatedTarget = null;
		self.hide();
	}
};
/**
* Handles the `click` event listeners that hide the modal.
*
* @param e the `Event` object
*/
const modalDismissHandler = (e) => {
	const { currentTarget } = e;
	const self = currentTarget && getModalInstance(currentTarget);
	if (!self || !currentTarget || Timer.get(currentTarget)) return;
	const { options, isStatic, modalDialog } = self;
	const { backdrop } = options;
	const { target } = e;
	const selectedText = getDocument(currentTarget)?.getSelection()?.toString().length;
	const targetInsideDialog = modalDialog.contains(target);
	const dismiss = target && closest(target, modalDismissSelector);
	if (isStatic && !targetInsideDialog) Timer.set(currentTarget, () => {
		addClass(currentTarget, modalStaticClass);
		emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
	}, 17);
	else if (dismiss || !selectedText && !isStatic && !targetInsideDialog && backdrop) {
		self.relatedTarget = dismiss || null;
		self.hide();
		e.preventDefault();
	}
};
/**
* Handles the `transitionend` event listeners for `Modal`.
*
* @param self the `Modal` instance
*/
const staticTransitionEnd = (self) => {
	const { element, modalDialog } = self;
	const duration = (getElementTransitionDuration(modalDialog) || 0) + 17;
	removeClass(element, modalStaticClass);
	Timer.set(element, () => Timer.clear(element), duration);
};
/** Returns a new `Modal` instance. */
var Modal = class extends BaseComponent {
	static selector = modalSelector;
	static init = modalInitCallback;
	static getInstance = getModalInstance;
	/**
	* @param target usually the `.modal` element
	* @param config instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element } = this;
		const modalDialog = querySelector(`.${modalString}-dialog`, element);
		if (!modalDialog) return;
		this.modalDialog = modalDialog;
		this.triggers = [...querySelectorAll(modalToggleSelector, getDocument(element))].filter((btn) => getTargetElement(btn) === element);
		this.isStatic = this.options.backdrop === "static";
		this.hasFade = hasClass(element, fadeClass);
		this.relatedTarget = null;
		this._observer = new ResizeObserver(() => this.update());
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return modalComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return modalDefaults;
	}
	/** Toggles the visibility of the modal. */
	toggle() {
		if (hasClass(this.element, "show")) this.hide();
		else this.show();
	}
	/** Shows the modal to the user. */
	show() {
		const { element, options, hasFade, relatedTarget } = this;
		const { backdrop } = options;
		let overlayDelay = 0;
		if (hasClass(element, "show")) return;
		showModalEvent.relatedTarget = relatedTarget || void 0;
		dispatchEvent(element, showModalEvent);
		if (showModalEvent.defaultPrevented) return;
		const currentOpen = getCurrentOpen(element);
		if (currentOpen && currentOpen !== element) {
			const that = getModalInstance(currentOpen) || getInstance(currentOpen, "Offcanvas");
			if (that) that.hide();
		}
		if (backdrop) {
			if (!hasPopup(overlay)) appendOverlay(element, hasFade, true);
			else toggleOverlayType(true);
			overlayDelay = getElementTransitionDuration(overlay);
			showOverlay();
			setTimeout(() => beforeModalShow(this), overlayDelay);
		} else {
			beforeModalShow(this);
			if (currentOpen && hasClass(overlay, "show")) hideOverlay();
		}
	}
	/** Hide the modal from the user. */
	hide() {
		const { element, hasFade, relatedTarget } = this;
		if (!hasClass(element, "show")) return;
		hideModalEvent.relatedTarget = relatedTarget || void 0;
		dispatchEvent(element, hideModalEvent);
		if (hideModalEvent.defaultPrevented) return;
		removeClass(element, showClass);
		setAttribute(element, ariaHidden, "true");
		removeAttribute(element, ariaModal);
		if (hasFade) emulateTransitionEnd(element, () => beforeModalHide(this));
		else beforeModalHide(this);
	}
	/**
	* Updates the modal layout.
	*/
	update = () => {
		if (hasClass(this.element, "show")) setModalScrollbar(this);
	};
	/**
	* Toggles on/off the `click` event listener of the `Modal` instance.
	*
	* @param add when `true`, event listener(s) is/are added
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		const { triggers } = this;
		if (!triggers.length) return;
		triggers.forEach((btn) => {
			action(btn, mouseclickEvent, modalClickHandler);
		});
	};
	/** Removes the `Modal` component from target element. */
	dispose() {
		const { modalDialog, hasFade } = { ...this };
		const callback = () => setTimeout(() => super.dispose(), 17);
		this.hide();
		this._toggleEventListeners();
		if (hasFade) emulateTransitionEnd(modalDialog, callback);
		else callback();
	}
};
//#endregion
//#region src/components/offcanvas.ts
const offcanvasSelector = `.${offcanvasString}`;
const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
const offcanvasTogglingClass = `${offcanvasString}-toggling`;
const offcanvasDefaults = {
	backdrop: true,
	keyboard: true,
	scroll: false
};
/**
* Static method which returns an existing `Offcanvas` instance associated
* to a target `Element`.
*/
const getOffcanvasInstance = (element) => getInstance(element, offcanvasComponent);
/**
* An `Offcanvas` initialization callback.
*/
const offcanvasInitCallback = (element) => new Offcanvas(element);
const showOffcanvasEvent = createCustomEvent(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = createCustomEvent(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = createCustomEvent(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = createCustomEvent(`hidden.bs.${offcanvasString}`);
/**
* Sets additional style for the `<body>` and other elements
* when showing an offcanvas to the user.
*
* @param self the `Offcanvas` instance
*/
const setOffCanvasScrollbar = (self) => {
	const { element } = self;
	const { clientHeight, scrollHeight } = getDocumentElement(element);
	setScrollbar(element, clientHeight !== scrollHeight);
};
/**
* Toggles on/off the listeners of the events that close the offcanvas.
*
* @param self the `Offcanvas` instance
* @param add when *true* listeners are added
*/
const toggleOffCanvasDismiss = (self, add) => {
	const action = add ? addListener : removeListener;
	const doc = getDocument(self.element);
	action(doc, keydownEvent, offcanvasKeyDismissHandler);
	action(doc, mouseclickEvent, offcanvasDismissHandler);
};
/**
* Executes before showing the offcanvas.
*
* @param self the `Offcanvas` instance
*/
const beforeOffcanvasShow = (self) => {
	const { element, options } = self;
	if (!options.scroll) {
		setOffCanvasScrollbar(self);
		setElementStyle(getDocumentBody(element), { overflow: "hidden" });
	}
	addClass(element, offcanvasTogglingClass);
	addClass(element, showClass);
	setElementStyle(element, { visibility: "visible" });
	emulateTransitionEnd(element, () => showOffcanvasComplete(self));
};
/**
* Executes before hiding the offcanvas.
*
* @param self the `Offcanvas` instance
*/
const beforeOffcanvasHide = (self) => {
	const { element, options } = self;
	const currentOpen = getCurrentOpen(element);
	element.blur();
	if (!currentOpen && options.backdrop && hasClass(overlay, "show")) hideOverlay();
	emulateTransitionEnd(element, () => hideOffcanvasComplete(self));
};
/**
* Handles the `click` event listeners.
*
* @param e the `Event` object
*/
function offcanvasTriggerHandler(e) {
	const element = getTargetElement(this);
	const self = element && getOffcanvasInstance(element);
	if (isDisabled(this)) return;
	if (!self) return;
	self.relatedTarget = this;
	self.toggle();
	if (this.tagName === "A") e.preventDefault();
}
/**
* Handles the event listeners that close the offcanvas.
*
* @param e the `Event` object
*/
const offcanvasDismissHandler = (e) => {
	const { target } = e;
	const element = querySelector(offcanvasActiveSelector, getDocument(target));
	if (!element) return;
	const offCanvasDismiss = querySelector(offcanvasDismissSelector, element);
	const self = getOffcanvasInstance(element);
	if (!self) return;
	const { options, triggers } = self;
	const { backdrop } = options;
	const trigger = closest(target, offcanvasToggleSelector);
	const selection = getDocument(element).getSelection();
	if (overlay.contains(target) && backdrop === "static") return;
	const isOwnTrigger = triggers.includes(target);
	const isOwnTarget = offCanvasDismiss?.contains(target) || false;
	if (!(selection && selection.toString().length) && (!element.contains(target) && backdrop && (!trigger || isOwnTrigger) || isOwnTarget)) {
		self.relatedTarget = offCanvasDismiss && isOwnTarget ? offCanvasDismiss : void 0;
		self.hide();
	}
	if (trigger && trigger.tagName === "A") e.preventDefault();
};
/**
* Handles the `keydown` event listener for offcanvas
* to hide it when user type the `ESC` key.
*
* @param e the `Event` object
*/
const offcanvasKeyDismissHandler = ({ code, target }) => {
	const element = querySelector(offcanvasActiveSelector, getDocument(target));
	const self = element && getOffcanvasInstance(element);
	if (!self) return;
	if (self.options.keyboard && code === keyEscape) {
		self.relatedTarget = void 0;
		self.hide();
	}
};
/**
* Handles the `transitionend` when showing the offcanvas.
*
* @param self the `Offcanvas` instance
*/
const showOffcanvasComplete = (self) => {
	const { element } = self;
	removeClass(element, offcanvasTogglingClass);
	removeAttribute(element, ariaHidden);
	setAttribute(element, ariaModal, "true");
	setAttribute(element, "role", "dialog");
	dispatchEvent(element, shownOffcanvasEvent);
	toggleOffCanvasDismiss(self, true);
	focus(element);
	toggleFocusTrap(element);
};
/**
* Handles the `transitionend` when hiding the offcanvas.
*
* @param self the `Offcanvas` instance
*/
const hideOffcanvasComplete = (self) => {
	const { element, triggers } = self;
	setAttribute(element, ariaHidden, "true");
	removeAttribute(element, ariaModal);
	removeAttribute(element, "role");
	setElementStyle(element, { visibility: "" });
	const visibleTrigger = showOffcanvasEvent.relatedTarget || triggers.find(isVisible);
	if (visibleTrigger) focus(visibleTrigger);
	removeOverlay(element);
	dispatchEvent(element, hiddenOffcanvasEvent);
	removeClass(element, offcanvasTogglingClass);
	toggleFocusTrap(element);
	if (!getCurrentOpen(element)) toggleOffCanvasDismiss(self);
};
/** Returns a new `Offcanvas` instance. */
var Offcanvas = class extends BaseComponent {
	static selector = offcanvasSelector;
	static init = offcanvasInitCallback;
	static getInstance = getOffcanvasInstance;
	/**
	* @param target usually an `.offcanvas` element
	* @param config instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element } = this;
		this.triggers = [...querySelectorAll(offcanvasToggleSelector, getDocument(element))].filter((btn) => getTargetElement(btn) === element);
		this.relatedTarget = void 0;
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return offcanvasComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return offcanvasDefaults;
	}
	/** Shows or hides the offcanvas from the user. */
	toggle() {
		if (hasClass(this.element, "show")) this.hide();
		else this.show();
	}
	/** Shows the offcanvas to the user. */
	show() {
		const { element, options, relatedTarget } = this;
		let overlayDelay = 0;
		if (hasClass(element, "show")) return;
		showOffcanvasEvent.relatedTarget = relatedTarget || void 0;
		shownOffcanvasEvent.relatedTarget = relatedTarget || void 0;
		dispatchEvent(element, showOffcanvasEvent);
		if (showOffcanvasEvent.defaultPrevented) return;
		const currentOpen = getCurrentOpen(element);
		if (currentOpen && currentOpen !== element) {
			const that = getOffcanvasInstance(currentOpen) || getInstance(currentOpen, "Modal");
			if (that) that.hide();
		}
		if (options.backdrop) {
			if (!hasPopup(overlay)) appendOverlay(element, true);
			else toggleOverlayType();
			overlayDelay = getElementTransitionDuration(overlay);
			showOverlay();
			setTimeout(() => beforeOffcanvasShow(this), overlayDelay);
		} else {
			beforeOffcanvasShow(this);
			if (currentOpen && hasClass(overlay, "show")) hideOverlay();
		}
	}
	/** Hides the offcanvas from the user. */
	hide() {
		const { element, relatedTarget } = this;
		if (!hasClass(element, "show")) return;
		hideOffcanvasEvent.relatedTarget = relatedTarget || void 0;
		hiddenOffcanvasEvent.relatedTarget = relatedTarget || void 0;
		dispatchEvent(element, hideOffcanvasEvent);
		if (hideOffcanvasEvent.defaultPrevented) return;
		addClass(element, offcanvasTogglingClass);
		removeClass(element, showClass);
		beforeOffcanvasHide(this);
	}
	/**
	* Toggles on/off the `click` event listeners.
	*
	* @param self the `Offcanvas` instance
	* @param add when *true*, listeners are added
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		this.triggers.forEach((btn) => {
			action(btn, mouseclickEvent, offcanvasTriggerHandler);
		});
	};
	/** Removes the `Offcanvas` from the target element. */
	dispose() {
		const { element } = this;
		const isOpen = hasClass(element, showClass);
		const callback = () => setTimeout(() => super.dispose(), 1);
		this.hide();
		this._toggleEventListeners();
		if (isOpen) emulateTransitionEnd(element, callback);
		else callback();
	}
};
//#endregion
//#region src/strings/popoverString.ts
/** @type {string} */
const popoverString = "popover";
//#endregion
//#region src/strings/popoverComponent.ts
/** @type {string} */
const popoverComponent = "Popover";
//#endregion
//#region src/strings/tooltipString.ts
/** @type {string} */
const tooltipString = "tooltip";
//#endregion
//#region src/util/getTipTemplate.ts
/**
* Returns a template for Popover / Tooltip.
*
* @param tipType the expected markup type
* @returns the template markup
*/
const getTipTemplate = (tipType) => {
	const isTooltip = tipType === tooltipString;
	const bodyClass = isTooltip ? `${tipType}-inner` : `${tipType}-body`;
	const header = !isTooltip ? `<h3 class="${tipType}-header"></h3>` : "";
	const arrow = `<div class="${tipType}-arrow"></div>`;
	const body = `<div class="${bodyClass}"></div>`;
	return `<div class="${tipType}" role="${tooltipString}">${header + arrow + body}</div>`;
};
//#endregion
//#region src/util/tipClassPositions.ts
const tipClassPositions = {
	top: "top",
	bottom: "bottom",
	left: "start",
	right: "end"
};
//#endregion
//#region src/util/styleTip.ts
/**
* Style popovers and tooltips.
*
* @param self the `Popover` / `Tooltip` instance
*/
const styleTip = (self) => {
	requestAnimationFrame(() => {
		const tipClasses = /\b(top|bottom|start|end)+/;
		const { element, tooltip, container, offsetParent, options, arrow } = self;
		if (!tooltip) return;
		const RTL = isRTL(element);
		const { x: scrollLeft, y: scrollTop } = getNodeScroll(offsetParent);
		setElementStyle(tooltip, {
			top: "",
			left: "",
			right: "",
			bottom: ""
		});
		const { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip;
		const { clientWidth: htmlcw, clientHeight: htmlch, offsetWidth: htmlow } = getDocumentElement(element);
		let { placement } = options;
		const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = container;
		const fixedParent = getElementStyle(container, "position") === "fixed";
		const scrollbarWidth = fixedParent ? Math.abs(parentCWidth - parentOWidth) : Math.abs(htmlcw - htmlow);
		const leftBoundry = RTL && fixedParent ? scrollbarWidth : 0;
		const rightBoundry = htmlcw - (!RTL ? scrollbarWidth : 0) - 1;
		const { width: elemWidth, height: elemHeight, left: elemRectLeft, right: elemRectRight, top: elemRectTop } = self._observer.getEntry(element)?.boundingClientRect || getBoundingClientRect(element, true);
		const { x: elemOffsetLeft, y: elemOffsetTop } = getRectRelativeToOffsetParent(element, offsetParent, {
			x: scrollLeft,
			y: scrollTop
		});
		setElementStyle(arrow, {
			top: "",
			left: "",
			right: "",
			bottom: ""
		});
		let topPosition = 0;
		let bottomPosition = "";
		let leftPosition = 0;
		let rightPosition = "";
		let arrowTop = "";
		let arrowLeft = "";
		let arrowRight = "";
		const arrowWidth = arrow.offsetWidth || 0;
		const arrowHeight = arrow.offsetHeight || 0;
		const arrowAdjust = arrowWidth / 2;
		let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
		let bottomExceed = elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch;
		let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
		let rightExceed = elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;
		const horizontals = ["left", "right"];
		const verticals = ["top", "bottom"];
		topExceed = horizontals.includes(placement) ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0 : topExceed;
		bottomExceed = horizontals.includes(placement) ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch : bottomExceed;
		leftExceed = verticals.includes(placement) ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry : leftExceed;
		rightExceed = verticals.includes(placement) ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry : rightExceed;
		placement = horizontals.includes(placement) && leftExceed && rightExceed ? "top" : placement;
		placement = placement === "top" && topExceed ? "bottom" : placement;
		placement = placement === "bottom" && bottomExceed ? "top" : placement;
		placement = placement === "left" && leftExceed ? "right" : placement;
		placement = placement === "right" && rightExceed ? "left" : placement;
		if (!tooltip.className.includes(placement)) tooltip.className = tooltip.className.replace(tipClasses, tipClassPositions[placement]);
		if (horizontals.includes(placement)) {
			if (placement === "left") leftPosition = elemOffsetLeft - tipWidth - arrowWidth;
			else leftPosition = elemOffsetLeft + elemWidth + arrowWidth;
			if (topExceed && bottomExceed) {
				topPosition = 0;
				bottomPosition = 0;
				arrowTop = elemOffsetTop + elemHeight / 2 - arrowHeight / 2;
			} else if (topExceed) {
				topPosition = elemOffsetTop;
				bottomPosition = "";
				arrowTop = elemHeight / 2 - arrowWidth;
			} else if (bottomExceed) {
				topPosition = elemOffsetTop - tipHeight + elemHeight;
				bottomPosition = "";
				arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
			} else {
				topPosition = elemOffsetTop - tipHeight / 2 + elemHeight / 2;
				arrowTop = tipHeight / 2 - arrowHeight / 2;
			}
		} else if (verticals.includes(placement)) {
			if (placement === "top") topPosition = elemOffsetTop - tipHeight - arrowHeight;
			else topPosition = elemOffsetTop + elemHeight + arrowHeight;
			if (leftExceed) {
				leftPosition = 0;
				arrowLeft = elemOffsetLeft + elemWidth / 2 - arrowAdjust;
			} else if (rightExceed) {
				leftPosition = "auto";
				rightPosition = 0;
				arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
			} else {
				leftPosition = elemOffsetLeft - tipWidth / 2 + elemWidth / 2;
				arrowLeft = tipWidth / 2 - arrowAdjust;
			}
		}
		setElementStyle(tooltip, {
			top: `${topPosition}px`,
			bottom: bottomPosition === "" ? "" : `${bottomPosition}px`,
			left: leftPosition === "auto" ? leftPosition : `${leftPosition}px`,
			right: rightPosition !== "" ? `${rightPosition}px` : ""
		});
		if (isHTMLElement(arrow)) {
			if (arrowTop !== "") arrow.style.top = `${arrowTop}px`;
			if (arrowLeft !== "") arrow.style.left = `${arrowLeft}px`;
			else if (arrowRight !== "") arrow.style.right = `${arrowRight}px`;
		}
		dispatchEvent(element, createCustomEvent(`updated.bs.${toLowerCase(self.name)}`));
	});
};
//#endregion
//#region src/util/tooltipDefaults.ts
const tooltipDefaults = {
	template: getTipTemplate(tooltipString),
	title: "",
	customClass: "",
	trigger: "hover focus",
	placement: "top",
	sanitizeFn: void 0,
	animation: true,
	delay: 200,
	container: document.body,
	content: "",
	dismissible: false,
	btnClose: ""
};
//#endregion
//#region src/strings/dataOriginalTitle.ts
/**
* Global namespace for `data-bs-title` attribute.
*/
const dataOriginalTitle = "data-original-title";
//#endregion
//#region src/strings/tooltipComponent.ts
/** @type {string} */
const tooltipComponent = "Tooltip";
//#endregion
//#region src/util/setHtml.ts
/**
* Append an existing `Element` to Popover / Tooltip component or HTML
* markup string to be parsed & sanitized to be used as popover / tooltip content.
*
* @param element target
* @param content the `Element` to append / string
* @param sanitizeFn a function to sanitize string content
*/
const setHtml = (element, content, sanitizeFn) => {
	if (isString(content) && content.length) {
		let dirty = content.trim();
		if (isFunction(sanitizeFn)) dirty = sanitizeFn(dirty);
		const tempDocument = new DOMParser().parseFromString(dirty, "text/html");
		element.append(...[...tempDocument.body.childNodes]);
	} else if (isHTMLElement(content)) element.append(content);
	else if (isNodeList(content) || isArray(content) && content.every(isNode)) element.append(...[...content]);
};
//#endregion
//#region src/util/createTip.ts
/**
* Creates a new tooltip / popover.
*
* @param self the `Tooltip` / `Popover` instance
*/
const createTip = (self) => {
	const isTooltip = self.name === tooltipComponent;
	const { id, element, options } = self;
	const { title, placement, template, animation, customClass, sanitizeFn, dismissible, content, btnClose } = options;
	const tipString = isTooltip ? tooltipString : popoverString;
	const tipPositions = { ...tipClassPositions };
	let titleParts = [];
	let contentParts = [];
	if (isRTL(element)) {
		tipPositions.left = "end";
		tipPositions.right = "start";
	}
	const placementClass = `bs-${tipString}-${tipPositions[placement]}`;
	let tooltipTemplate;
	if (isHTMLElement(template)) tooltipTemplate = template;
	else {
		const htmlMarkup = createElement("div");
		setHtml(htmlMarkup, template, sanitizeFn);
		tooltipTemplate = htmlMarkup.firstChild;
	}
	if (!isHTMLElement(tooltipTemplate)) return;
	self.tooltip = tooltipTemplate.cloneNode(true);
	const { tooltip } = self;
	setAttribute(tooltip, "id", id);
	setAttribute(tooltip, "role", tooltipString);
	const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`;
	const tooltipHeader = isTooltip ? null : querySelector(`.${popoverString}-header`, tooltip);
	const tooltipBody = querySelector(`.${bodyClass}`, tooltip);
	self.arrow = querySelector(`.${tipString}-arrow`, tooltip);
	const { arrow } = self;
	if (isHTMLElement(title)) titleParts = [title.cloneNode(true)];
	else {
		const tempTitle = createElement("div");
		setHtml(tempTitle, title, sanitizeFn);
		titleParts = [...[...tempTitle.childNodes]];
	}
	if (isHTMLElement(content)) contentParts = [content.cloneNode(true)];
	else {
		const tempContent = createElement("div");
		setHtml(tempContent, content, sanitizeFn);
		contentParts = [...[...tempContent.childNodes]];
	}
	if (dismissible) if (title) if (isHTMLElement(btnClose)) titleParts = [...titleParts, btnClose.cloneNode(true)];
	else {
		const tempBtn = createElement("div");
		setHtml(tempBtn, btnClose, sanitizeFn);
		titleParts = [...titleParts, tempBtn.firstChild];
	}
	else {
		if (tooltipHeader) tooltipHeader.remove();
		if (isHTMLElement(btnClose)) contentParts = [...contentParts, btnClose.cloneNode(true)];
		else {
			const tempBtn = createElement("div");
			setHtml(tempBtn, btnClose, sanitizeFn);
			contentParts = [...contentParts, tempBtn.firstChild];
		}
	}
	if (!isTooltip) {
		if (title && tooltipHeader) setHtml(tooltipHeader, titleParts, sanitizeFn);
		if (content && tooltipBody) setHtml(tooltipBody, contentParts, sanitizeFn);
		self.btn = querySelector(".btn-close", tooltip) || void 0;
	} else if (title && tooltipBody) setHtml(tooltipBody, title, sanitizeFn);
	addClass(tooltip, "position-absolute");
	addClass(arrow, "position-absolute");
	if (!hasClass(tooltip, tipString)) addClass(tooltip, tipString);
	if (animation && !hasClass(tooltip, "fade")) addClass(tooltip, fadeClass);
	if (customClass && !hasClass(tooltip, customClass)) addClass(tooltip, customClass);
	if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
};
//#endregion
//#region src/util/getElementContainer.ts
/**
* Returns an `HTMLElement` to be used as default value for *options.container*
* for `Tooltip` / `Popover` components.
*
* @see https://github.com/floating-ui/floating-ui
*
* @param element the target
* @returns the query result
*/
const getElementContainer = (element) => {
	const majorBlockTags = ["HTML", "BODY"];
	const containers = [];
	let { parentNode } = element;
	while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
		parentNode = getParentNode(parentNode);
		if (!(isShadowRoot(parentNode) || isTableElement(parentNode))) containers.push(parentNode);
	}
	return containers.find((c, i) => {
		if ((getElementStyle(c, "position") !== "relative" || getElementStyle(c, "position") === "relative" && c.offsetHeight !== c.scrollHeight) && containers.slice(i + 1).every((r) => getElementStyle(r, "position") === "static")) return c;
		return null;
	}) || getDocument(element).body;
};
//#endregion
//#region src/components/tooltip.ts
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = "title";
/**
* Static method which returns an existing `Tooltip` instance associated
* to a target `Element`.
*/
let getTooltipInstance = (element) => getInstance(element, tooltipComponent);
/**
* A `Tooltip` initialization callback.
*/
const tooltipInitCallback = (element) => new Tooltip(element);
/**
* Removes the tooltip from the DOM.
*
* @param self the `Tooltip` instance
*/
const removeTooltip = (self) => {
	const { element, tooltip, container } = self;
	removeAttribute(element, ariaDescribedBy);
	removePopup(tooltip, container);
};
/**
* Check if container contains the tooltip.
*
* @param self Tooltip
*/
const hasTip = (self) => {
	const { tooltip, container } = self;
	return tooltip && hasPopup(tooltip, container);
};
/**
* Executes after the instance has been disposed.
*
* @param self the `Tooltip` instance
* @param callback the parent dispose callback
*/
const disposeTooltipComplete = (self, callback) => {
	const { element } = self;
	self._toggleEventListeners();
	if (hasAttribute(element, "data-original-title") && self.name === "Tooltip") toggleTooltipTitle(self);
	if (callback) callback();
};
/**
* Toggles on/off the special `Tooltip` event listeners.
*
* @param self the `Tooltip` instance
* @param add when `true`, event listeners are added
*/
const toggleTooltipAction = (self, add) => {
	const action = add ? addListener : removeListener;
	const { element } = self;
	action(getDocument(element), touchstartEvent, self.handleTouch, passiveHandler);
};
/**
* Executes after the tooltip was shown to the user.
*
* @param self the `Tooltip` instance
*/
const tooltipShownAction = (self) => {
	const { element } = self;
	const shownTooltipEvent = createCustomEvent(`shown.bs.${toLowerCase(self.name)}`);
	toggleTooltipAction(self, true);
	dispatchEvent(element, shownTooltipEvent);
	Timer.clear(element, "in");
};
/**
* Executes after the tooltip was hidden to the user.
*
* @param self the `Tooltip` instance
*/
const tooltipHiddenAction = (self) => {
	const { element } = self;
	const hiddenTooltipEvent = createCustomEvent(`hidden.bs.${toLowerCase(self.name)}`);
	toggleTooltipAction(self);
	removeTooltip(self);
	dispatchEvent(element, hiddenTooltipEvent);
	Timer.clear(element, "out");
};
/**
* Toggles on/off the `Tooltip` event listeners that hide/update the tooltip.
*
* @param self the `Tooltip` instance
* @param add when `true`, event listeners are added
*/
const toggleTooltipOpenHandlers = (self, add) => {
	const action = add ? addListener : removeListener;
	const { element, tooltip } = self;
	const parentModal = closest(element, `.${modalString}`);
	const parentOffcanvas = closest(element, `.${offcanvasString}`);
	if (add) [element, tooltip].forEach((target) => self._observer.observe(target));
	else self._observer.disconnect();
	if (parentModal) action(parentModal, `hide.bs.${modalString}`, self.handleHide);
	if (parentOffcanvas) action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.handleHide);
};
/**
* Toggles the `title` and `data-original-title` attributes.
*
* @param self the `Tooltip` instance
* @param content when `true`, event listeners are added
*/
const toggleTooltipTitle = (self, content) => {
	const titleAtt = [dataOriginalTitle, titleAttr];
	const { element } = self;
	setAttribute(element, titleAtt[content ? 0 : 1], content || getAttribute(element, titleAtt[0]) || "");
	removeAttribute(element, titleAtt[content ? 1 : 0]);
};
/** Creates a new `Tooltip` instance. */
var Tooltip = class extends BaseComponent {
	static selector = tooltipSelector;
	static init = tooltipInitCallback;
	static getInstance = getTooltipInstance;
	static styleTip = styleTip;
	/**
	* @param target the target element
	* @param config the instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element } = this;
		const isTooltip = this.name === tooltipComponent;
		const tipString = isTooltip ? tooltipString : popoverString;
		const tipComponent = isTooltip ? tooltipComponent : popoverComponent;
		getTooltipInstance = (elem) => getInstance(elem, tipComponent);
		this.enabled = true;
		/** Set unique ID for `aria-describedby`. */
		this.id = `${tipString}-${getUID(element, tipString)}`;
		const { options } = this;
		if (!options.title && isTooltip || !isTooltip && !options.content) return;
		ObjectAssign(tooltipDefaults, { titleAttr: "" });
		if (hasAttribute(element, titleAttr) && isTooltip && typeof options.title === "string") toggleTooltipTitle(this, options.title);
		const container = getElementContainer(element);
		const offsetParent = [
			"sticky",
			"fixed",
			"relative"
		].some((position) => getElementStyle(container, "position") === position) ? container : getWindow(element);
		this.container = container;
		this.offsetParent = offsetParent;
		createTip(this);
		if (!this.tooltip) return;
		this._observer = new PositionObserver(() => this.update());
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return tooltipComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return tooltipDefaults;
	}
	/** Handles the focus event on iOS. */
	handleFocus = () => focus(this.element);
	/** Shows the tooltip. */
	handleShow = () => this.show();
	show() {
		const { options, tooltip, element, container, id } = this;
		const { animation } = options;
		const outTimer = Timer.get(element, "out");
		Timer.clear(element, "out");
		if (tooltip && !outTimer && !hasTip(this)) Timer.set(element, () => {
			const showTooltipEvent = createCustomEvent(`show.bs.${toLowerCase(this.name)}`);
			dispatchEvent(element, showTooltipEvent);
			if (!showTooltipEvent.defaultPrevented) {
				appendPopup(tooltip, container);
				setAttribute(element, ariaDescribedBy, `#${id}`);
				this.update();
				toggleTooltipOpenHandlers(this, true);
				if (!hasClass(tooltip, "show")) addClass(tooltip, showClass);
				if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(this));
				else tooltipShownAction(this);
			}
		}, 17, "in");
	}
	/** Hides the tooltip. */
	handleHide = () => this.hide();
	hide() {
		const { options, tooltip, element } = this;
		const { animation, delay } = options;
		Timer.clear(element, "in");
		if (tooltip && hasTip(this)) Timer.set(element, () => {
			const hideTooltipEvent = createCustomEvent(`hide.bs.${toLowerCase(this.name)}`);
			dispatchEvent(element, hideTooltipEvent);
			if (!hideTooltipEvent.defaultPrevented) {
				this.update();
				removeClass(tooltip, showClass);
				toggleTooltipOpenHandlers(this);
				if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(this));
				else tooltipHiddenAction(this);
			}
		}, delay + 17, "out");
	}
	/** Updates the tooltip position. */
	update = () => {
		styleTip(this);
	};
	/** Toggles the tooltip visibility. */
	toggle = () => {
		const { tooltip } = this;
		if (tooltip && !hasTip(this)) this.show();
		else this.hide();
	};
	/** Enables the tooltip. */
	enable() {
		const { enabled } = this;
		if (!enabled) {
			this._toggleEventListeners(true);
			this.enabled = !enabled;
		}
	}
	/** Disables the tooltip. */
	disable() {
		const { tooltip, enabled } = this;
		if (enabled) {
			if (tooltip && hasTip(this)) this.hide();
			this._toggleEventListeners();
			this.enabled = !enabled;
		}
	}
	/** Toggles the `disabled` property. */
	toggleEnabled() {
		if (!this.enabled) this.enable();
		else this.disable();
	}
	/**
	* Handles the `touchstart` event listener for `Tooltip`
	*
	* @this {Tooltip}
	* @param {TouchEvent} e the `Event` object
	*/
	handleTouch = ({ target }) => {
		const { tooltip, element } = this;
		if (tooltip && tooltip.contains(target) || target === element || target && element.contains(target)) {} else this.hide();
	};
	/**
	* Toggles on/off the `Tooltip` event listeners.
	*
	* @param add when `true`, event listeners are added
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		const { element, options, btn } = this;
		const { trigger } = options;
		const dismissible = this.name !== "Tooltip" && options.dismissible ? true : false;
		if (!trigger.includes("manual")) {
			this.enabled = !!add;
			trigger.split(" ").forEach((tr) => {
				if (tr === mousehoverEvent) {
					action(element, mousedownEvent, this.handleShow);
					action(element, mouseenterEvent, this.handleShow);
					if (!dismissible) {
						action(element, mouseleaveEvent, this.handleHide);
						action(getDocument(element), touchstartEvent, this.handleTouch, passiveHandler);
					}
				} else if (tr === mouseclickEvent) action(element, tr, !dismissible ? this.toggle : this.handleShow);
				else if (tr === focusEvent) {
					action(element, focusinEvent, this.handleShow);
					if (!dismissible) action(element, focusoutEvent, this.handleHide);
					if (isApple()) action(element, mouseclickEvent, this.handleFocus);
				}
				if (dismissible && btn) action(btn, mouseclickEvent, this.handleHide);
			});
		}
	};
	/** Removes the `Tooltip` from the target element. */
	dispose() {
		const { tooltip, options } = this;
		const clone = {
			...this,
			name: this.name
		};
		const callback = () => setTimeout(() => disposeTooltipComplete(clone, () => super.dispose()), 17);
		if (options.animation && hasTip(clone)) {
			this.options.delay = 0;
			this.hide();
			emulateTransitionEnd(tooltip, callback);
		} else callback();
	}
};
//#endregion
//#region src/components/popover.ts
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
const popoverDefaults = ObjectAssign({}, tooltipDefaults, {
	template: getTipTemplate(popoverString),
	content: "",
	dismissible: false,
	btnClose: "<button class=\"btn-close position-absolute top-0 end-0 m-1\" aria-label=\"Close\"></button>"
});
/**
* Static method which returns an existing `Popover` instance associated
* to a target `Element`.
*/
const getPopoverInstance = (element) => getInstance(element, popoverComponent);
/**
* A `Popover` initialization callback.
*/
const popoverInitCallback = (element) => new Popover(element);
/** Returns a new `Popover` instance. */
var Popover = class extends Tooltip {
	static selector = popoverSelector;
	static init = popoverInitCallback;
	static getInstance = getPopoverInstance;
	static styleTip = styleTip;
	/**
	* @param target the target element
	* @param config the instance options
	*/
	constructor(target, config) {
		super(target, config);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return popoverComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return popoverDefaults;
	}
	show = () => {
		super.show();
		const { options, btn } = this;
		if (options.dismissible && btn) setTimeout(() => focus(btn), 17);
	};
};
//#endregion
//#region src/strings/scrollspyString.ts
/** @type {string} */
const scrollspyString = "scrollspy";
//#endregion
//#region src/strings/scrollspyComponent.ts
/** @type {string} */
const scrollspyComponent = "ScrollSpy";
//#endregion
//#region src/components/scrollspy.ts
const scrollspySelector = "[data-bs-spy=\"scroll\"]";
const scrollSpyAnchorSelector = "[href]";
const scrollspyDefaults = {
	offset: 10,
	target: void 0
};
/**
* Static method which returns an existing `ScrollSpy` instance associated
* to a target `Element`.
*/
const getScrollSpyInstance = (element) => getInstance(element, scrollspyComponent);
/**
* A `ScrollSpy` initialization callback.
*/
const scrollspyInitCallback = (element) => new ScrollSpy(element);
const activateScrollSpy = createCustomEvent(`activate.bs.${scrollspyString}`);
/**
* Update the state of all items.
*
* @param self the `ScrollSpy` instance
*/
const updateSpyTargets = (self) => {
	const { target, _itemsLength, _observables } = self;
	const links = getElementsByTagName("A", target);
	const doc = getDocument(target);
	if (!links.length || _itemsLength === _observables.size) return;
	_observables.clear();
	Array.from(links).forEach((link) => {
		const hash = getAttribute(link, "href")?.slice(1);
		const targetItem = hash?.length ? doc.getElementById(hash) : null;
		if (targetItem && !isDisabled(link)) self._observables.set(targetItem, link);
	});
	self._itemsLength = self._observables.size;
};
/**
* Clear all items of the target.
*
* @param target a single item
*/
const clear = (target) => {
	Array.from(getElementsByTagName("A", target)).forEach((item) => {
		if (hasClass(item, "active")) removeClass(item, activeClass);
	});
};
/**
* Activates a new item.
*
* @param self the `ScrollSpy` instance
* @param item a single item
*/
const activate = (self, item) => {
	const { target, element } = self;
	clear(target);
	self._activeItem = item;
	addClass(item, activeClass);
	let parentItem = item;
	while (parentItem !== target) {
		parentItem = parentItem.parentElement;
		if ([
			"nav",
			"dropdown-menu",
			"list-group"
		].some((c) => hasClass(parentItem, c))) {
			const parentLink = parentItem.previousElementSibling;
			if (parentLink && !hasClass(parentLink, "active")) addClass(parentLink, activeClass);
		}
	}
	activateScrollSpy.relatedTarget = item;
	dispatchEvent(element, activateScrollSpy);
};
const getOffset = (self, target) => {
	const { scrollTarget, element, options } = self;
	return (scrollTarget !== element ? getBoundingClientRect(target).top + scrollTarget.scrollTop : target.offsetTop) - (options.offset || 10);
};
/** Returns a new `ScrollSpy` instance. */
var ScrollSpy = class extends BaseComponent {
	static selector = scrollspySelector;
	static init = scrollspyInitCallback;
	static getInstance = getScrollSpyInstance;
	/**
	* @param target the target element
	* @param config the instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element, options } = this;
		const spyTarget = querySelector(options.target, getDocument(element));
		if (!spyTarget) return;
		this.target = spyTarget;
		this.scrollTarget = element.clientHeight < element.scrollHeight ? element : getDocumentElement(element);
		this._observables = /* @__PURE__ */ new Map();
		this.refresh();
		this._observer = new PositionObserver(() => {
			requestAnimationFrame(() => this.refresh?.());
		}, { root: this.scrollTarget });
		this._toggleEventListeners(true);
	}
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
	/** Updates all items. */
	refresh = () => {
		const { target, scrollTarget } = this;
		if (!target || target.offsetHeight === 0) return;
		updateSpyTargets(this);
		const { _itemsLength, _observables, _activeItem } = this;
		if (!_itemsLength) return;
		const entries = _observables.entries().toArray();
		const { scrollTop, scrollHeight, clientHeight } = scrollTarget;
		if (scrollTop >= scrollHeight - clientHeight) {
			const newActiveItem = entries[_itemsLength - 1]?.[1];
			if (_activeItem !== newActiveItem) activate(this, newActiveItem);
			return;
		}
		const firstOffset = entries[0]?.[0] ? getOffset(this, entries[0][0]) : null;
		if (firstOffset !== null && scrollTop < firstOffset && firstOffset > 0) {
			this._activeItem = null;
			clear(target);
			return;
		}
		for (let i = 0; i < _itemsLength; i += 1) {
			const [targetItem, item] = entries[i];
			const offsetTop = getOffset(this, targetItem);
			const nextTarget = entries[i + 1]?.[0];
			const nextOffsetTop = nextTarget ? getOffset(this, nextTarget) : null;
			if (_activeItem !== item && scrollTop >= offsetTop && (nextOffsetTop === null || scrollTop < nextOffsetTop)) {
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
	_scrollTo = (e) => {
		const item = closest(e.target, scrollSpyAnchorSelector);
		const hash = item && getAttribute(item, "href")?.slice(1);
		const targetItem = hash && getElementById(hash, this.target);
		if (targetItem) {
			this.scrollTarget.scrollTo({
				top: targetItem.offsetTop,
				behavior: "smooth"
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
	_toggleEventListeners = (add) => {
		const { target, _observables, _observer, _scrollTo } = this;
		(add ? addListener : removeListener)(target, mouseclickEvent, _scrollTo);
		if (add) _observables?.forEach((_, targetItem) => _observer.observe(targetItem));
		else _observer.disconnect();
	};
	/** Removes `ScrollSpy` from the target element. */
	dispose() {
		this._toggleEventListeners();
		super.dispose();
	}
};
//#endregion
//#region src/components/tab.ts
const tabSelector = `[${dataBsToggle}="tab"]`;
/**
* Static method which returns an existing `Tab` instance associated
* to a target `Element`.
*/
const getTabInstance = (element) => getInstance(element, "Tab");
/** A `Tab` initialization callback. */
const tabInitCallback = (element) => new Tab(element);
const showTabEvent = createCustomEvent(`show.bs.tab`);
const shownTabEvent = createCustomEvent(`shown.bs.tab`);
const hideTabEvent = createCustomEvent(`hide.bs.tab`);
const hiddenTabEvent = createCustomEvent(`hidden.bs.tab`);
/**
* Stores the current active tab and its content
* for a given `.nav` element.
*/
const tabPrivate = /* @__PURE__ */ new Map();
/**
* Executes after tab transition has finished.
*
* @param self the `Tab` instance
*/
const triggerTabEnd = (self) => {
	const { tabContent, nav } = self;
	if (tabContent && hasClass(tabContent, "collapsing")) {
		tabContent.style.height = "";
		removeClass(tabContent, collapsingClass);
	}
	if (nav) Timer.clear(nav);
};
/**
* Executes before showing the tab content.
*
* @param self the `Tab` instance
*/
const triggerTabShow = (self) => {
	const { element, tabContent, content: nextContent, nav } = self;
	const { tab } = isHTMLElement(nav) && tabPrivate.get(nav) || { tab: null };
	if (tabContent && nextContent && hasClass(nextContent, "fade")) {
		const { currentHeight, nextHeight } = tabPrivate.get(element) || {
			currentHeight: 0,
			nextHeight: 0
		};
		if (currentHeight !== nextHeight) setTimeout(() => {
			tabContent.style.height = `${nextHeight}px`;
			reflow(tabContent);
			emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
		}, 50);
		else triggerTabEnd(self);
	} else if (nav) Timer.clear(nav);
	shownTabEvent.relatedTarget = tab;
	dispatchEvent(element, shownTabEvent);
};
/**
* Executes before hiding the tab.
*
* @param self the `Tab` instance
*/
const triggerTabHide = (self) => {
	const { element, content: nextContent, tabContent, nav } = self;
	const { tab, content } = nav && tabPrivate.get(nav) || {
		tab: null,
		content: null
	};
	let currentHeight = 0;
	if (tabContent && nextContent && hasClass(nextContent, "fade")) {
		[content, nextContent].forEach((c) => {
			if (c) addClass(c, "overflow-hidden");
		});
		currentHeight = content ? content.scrollHeight : 0;
	}
	showTabEvent.relatedTarget = tab;
	hiddenTabEvent.relatedTarget = element;
	dispatchEvent(element, showTabEvent);
	if (showTabEvent.defaultPrevented) return;
	if (nextContent) addClass(nextContent, activeClass);
	if (content) removeClass(content, activeClass);
	if (tabContent && nextContent && hasClass(nextContent, "fade")) {
		const nextHeight = nextContent.scrollHeight;
		tabPrivate.set(element, {
			currentHeight,
			nextHeight,
			tab: null,
			content: null
		});
		addClass(tabContent, collapsingClass);
		tabContent.style.height = `${currentHeight}px`;
		reflow(tabContent);
		[content, nextContent].forEach((c) => {
			if (c) removeClass(c, "overflow-hidden");
		});
	}
	if (nextContent && nextContent && hasClass(nextContent, "fade")) setTimeout(() => {
		addClass(nextContent, showClass);
		emulateTransitionEnd(nextContent, () => {
			triggerTabShow(self);
		});
	}, 1);
	else {
		if (nextContent) addClass(nextContent, showClass);
		triggerTabShow(self);
	}
	if (tab) dispatchEvent(tab, hiddenTabEvent);
};
/**
* Returns the current active tab and its target content.
*
* @param self the `Tab` instance
* @returns the query result
*/
const getActiveTab = (self) => {
	const { nav } = self;
	if (!isHTMLElement(nav)) return {
		tab: null,
		content: null
	};
	const activeTabs = getElementsByClassName(activeClass, nav);
	let tab = null;
	if (activeTabs.length === 1 && !dropdownMenuClasses.some((c) => hasClass(activeTabs[0].parentElement, c))) [tab] = activeTabs;
	else if (activeTabs.length > 1) tab = activeTabs[activeTabs.length - 1];
	const content = isHTMLElement(tab) ? getTargetElement(tab) : null;
	return {
		tab,
		content
	};
};
/**
* Returns a parent dropdown.
*
* @param element the `Tab` element
* @returns the parent dropdown
*/
const getParentDropdown = (element) => {
	if (!isHTMLElement(element)) return null;
	const dropdown = closest(element, `.${dropdownMenuClasses.join(",.")}`);
	return dropdown ? querySelector(`.${dropdownMenuClasses[0]}-toggle`, dropdown) : null;
};
/**
* Handles the `click` event listener.
*
* @param e the `Event` object
*/
const tabClickHandler = (e) => {
	const element = closest(e.target, tabSelector);
	const self = element && getTabInstance(element);
	if (!self) return;
	e.preventDefault();
	self.show();
};
/** Creates a new `Tab` instance. */
var Tab = class extends BaseComponent {
	static selector = tabSelector;
	static init = tabInitCallback;
	static getInstance = getTabInstance;
	/** @param target the target element */
	constructor(target) {
		super(target);
		const { element } = this;
		const content = getTargetElement(element);
		if (!content) return;
		const nav = closest(element, ".nav");
		const container = closest(content, ".tab-content");
		this.nav = nav;
		this.content = content;
		this.tabContent = container;
		this.dropdown = getParentDropdown(element);
		const { tab } = getActiveTab(this);
		if (nav && !tab) {
			const firstTab = querySelector(tabSelector, nav);
			const firstTabContent = firstTab && getTargetElement(firstTab);
			if (firstTabContent) {
				addClass(firstTab, activeClass);
				addClass(firstTabContent, showClass);
				addClass(firstTabContent, activeClass);
				setAttribute(element, ariaSelected, "true");
			}
		}
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return "Tab";
	}
	/** Shows the tab to the user. */
	show() {
		const { element, content: nextContent, nav, dropdown } = this;
		if (nav && Timer.get(nav) || hasClass(element, "active")) return;
		const { tab, content } = getActiveTab(this);
		if (nav && tab) tabPrivate.set(nav, {
			tab,
			content,
			currentHeight: 0,
			nextHeight: 0
		});
		hideTabEvent.relatedTarget = element;
		if (!isHTMLElement(tab)) return;
		dispatchEvent(tab, hideTabEvent);
		if (hideTabEvent.defaultPrevented) return;
		addClass(element, activeClass);
		setAttribute(element, ariaSelected, "true");
		const activeDropdown = isHTMLElement(tab) && getParentDropdown(tab);
		if (activeDropdown && hasClass(activeDropdown, "active")) removeClass(activeDropdown, activeClass);
		if (nav) {
			const toggleTab = () => {
				if (tab) {
					removeClass(tab, activeClass);
					setAttribute(tab, ariaSelected, "false");
				}
				if (dropdown && !hasClass(dropdown, "active")) addClass(dropdown, activeClass);
			};
			if (content && (hasClass(content, "fade") || nextContent && hasClass(nextContent, "fade"))) Timer.set(nav, toggleTab, 1);
			else toggleTab();
		}
		if (content) {
			removeClass(content, showClass);
			if (hasClass(content, "fade")) emulateTransitionEnd(content, () => triggerTabHide(this));
			else triggerTabHide(this);
		}
	}
	/**
	* Toggles on/off the `click` event listener.
	*
	* @param add when `true`, event listener is added
	*/
	_toggleEventListeners = (add) => {
		(add ? addListener : removeListener)(this.element, mouseclickEvent, tabClickHandler);
	};
	/** Removes the `Tab` component from the target element. */
	dispose() {
		this._toggleEventListeners();
		super.dispose();
	}
};
//#endregion
//#region src/strings/toastString.ts
/** @type {string} */
const toastString = "toast";
//#endregion
//#region src/strings/toastComponent.ts
/** @type {string} */
const toastComponent = "Toast";
//#endregion
//#region src/components/toast.ts
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const toastToggleSelector = `[${dataBsToggle}="${toastString}"]`;
const showingClass = "showing";
/** @deprecated */
const hideClass = "hide";
const toastDefaults = {
	animation: true,
	autohide: true,
	delay: 5e3
};
/**
* Static method which returns an existing `Toast` instance associated
* to a target `Element`.
*/
const getToastInstance = (element) => getInstance(element, toastComponent);
/**
* A `Toast` initialization callback.
*/
const toastInitCallback = (element) => new Toast(element);
const showToastEvent = createCustomEvent(`show.bs.${toastString}`);
const shownToastEvent = createCustomEvent(`shown.bs.${toastString}`);
const hideToastEvent = createCustomEvent(`hide.bs.${toastString}`);
const hiddenToastEvent = createCustomEvent(`hidden.bs.${toastString}`);
/**
* Executes after the toast is shown to the user.
*
* @param self the `Toast` instance
*/
const showToastComplete = (self) => {
	const { element, options } = self;
	removeClass(element, showingClass);
	Timer.clear(element, showingClass);
	dispatchEvent(element, shownToastEvent);
	if (options.autohide) Timer.set(element, () => self.hide(), options.delay, toastString);
};
/**
* Executes after the toast is hidden to the user.
*
* @param self the `Toast` instance
*/
const hideToastComplete = (self) => {
	const { element } = self;
	removeClass(element, showingClass);
	removeClass(element, showClass);
	addClass(element, hideClass);
	Timer.clear(element, toastString);
	dispatchEvent(element, hiddenToastEvent);
};
/**
* Executes before hiding the toast.
*
* @param self the `Toast` instance
*/
const hideToast = (self) => {
	const { element, options } = self;
	addClass(element, showingClass);
	if (options.animation) {
		reflow(element);
		emulateTransitionEnd(element, () => hideToastComplete(self));
	} else hideToastComplete(self);
};
/**
* Executes before showing the toast.
*
* @param self the `Toast` instance
*/
const showToast = (self) => {
	const { element, options } = self;
	Timer.set(element, () => {
		removeClass(element, hideClass);
		reflow(element);
		addClass(element, showClass);
		addClass(element, showingClass);
		if (options.animation) emulateTransitionEnd(element, () => showToastComplete(self));
		else showToastComplete(self);
	}, 17, showingClass);
};
/**
* Handles the `click` event listener for toast.
*
* @param e the `Event` object
*/
function toastClickHandler(e) {
	const element = getTargetElement(this);
	const self = element && getToastInstance(element);
	if (isDisabled(this)) return;
	if (!self) return;
	if (this.tagName === "A") e.preventDefault();
	self.relatedTarget = this;
	self.show();
}
/**
* Executes when user interacts with the toast without closing it,
* usually by hovering or focusing it.
*
* @param e the `Toast` instance
*/
const interactiveToastHandler = (e) => {
	const element = e.target;
	const self = getToastInstance(element);
	const { type, relatedTarget } = e;
	if (!self || element === relatedTarget || element.contains(relatedTarget)) return;
	if ([mouseenterEvent, focusinEvent].includes(type)) Timer.clear(element, toastString);
	else Timer.set(element, () => self.hide(), self.options.delay, toastString);
};
/** Creates a new `Toast` instance. */
var Toast = class extends BaseComponent {
	static selector = toastSelector;
	static init = toastInitCallback;
	static getInstance = getToastInstance;
	/**
	* @param target the target `.toast` element
	* @param config the instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element, options } = this;
		if (options.animation && !hasClass(element, "fade")) addClass(element, fadeClass);
		else if (!options.animation && hasClass(element, "fade")) removeClass(element, fadeClass);
		this.dismiss = querySelector(toastDismissSelector, element);
		this.triggers = [...querySelectorAll(toastToggleSelector, getDocument(element))].filter((btn) => getTargetElement(btn) === element);
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return toastComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return toastDefaults;
	}
	/**
	* Returns *true* when toast is visible.
	*/
	get isShown() {
		return hasClass(this.element, showClass);
	}
	/** Shows the toast. */
	show = () => {
		const { element, isShown } = this;
		if (!element || isShown) return;
		dispatchEvent(element, showToastEvent);
		if (!showToastEvent.defaultPrevented) showToast(this);
	};
	/** Hides the toast. */
	hide = () => {
		const { element, isShown } = this;
		if (!element || !isShown) return;
		dispatchEvent(element, hideToastEvent);
		if (!hideToastEvent.defaultPrevented) hideToast(this);
	};
	/**
	* Toggles on/off the `click` event listener.
	*
	* @param add when `true`, it will add the listener
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		const { element, triggers, dismiss, options, hide } = this;
		if (dismiss) action(dismiss, mouseclickEvent, hide);
		if (options.autohide) [
			focusinEvent,
			focusoutEvent,
			mouseenterEvent,
			mouseleaveEvent
		].forEach((e) => action(element, e, interactiveToastHandler));
		if (triggers.length) triggers.forEach((btn) => {
			action(btn, mouseclickEvent, toastClickHandler);
		});
	};
	/** Removes the `Toast` component from the target element. */
	dispose() {
		const { element, isShown } = this;
		this._toggleEventListeners();
		Timer.clear(element, toastString);
		if (isShown) removeClass(element, showClass);
		super.dispose();
	}
};
//#endregion
//#region src/util/init.ts
const componentsList = /* @__PURE__ */ new Map();
[
	Alert,
	Button,
	Carousel,
	Collapse,
	Dropdown,
	Modal,
	Offcanvas,
	Popover,
	ScrollSpy,
	Tab,
	Toast,
	Tooltip
].forEach((c) => componentsList.set(c.prototype.name, c));
/**
* Initialize all matched `Element`s for one component.
*
* @param callback
* @param collection
*/
const initComponentDataAPI = (callback, collection) => {
	[...collection].forEach((x) => callback(x));
};
/**
* Remove one component from a target container element or all in the page.
*
* @param component the component name
* @param context parent `Node`
*/
const removeComponentDataAPI = (component, context) => {
	const compData = Data.getAllFor(component);
	if (compData) [...compData].forEach(([element, instance]) => {
		if (context.contains(element)) instance.dispose();
	});
};
/**
* Initialize all BSN components for a target container.
*
* @param context parent `Node`
*/
const initCallback = (context) => {
	const elemCollection = [...getElementsByTagName("*", context && context.nodeName ? context : document)];
	componentsList.forEach((cs) => {
		const { init, selector } = cs;
		initComponentDataAPI(init, elemCollection.filter((item) => matches(item, selector)));
	});
};
/**
* Remove all BSN components for a target container.
*
* @param context parent `Node`
*/
const removeDataAPI = (context) => {
	const lookUp = context && context.nodeName ? context : document;
	componentsList.forEach((comp) => {
		removeComponentDataAPI(comp.prototype.name, lookUp);
	});
};
if (document.body) initCallback();
else addListener(document, "DOMContentLoaded", () => initCallback(), { once: true });
//#endregion
export { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip, initCallback, removeDataAPI };

//# sourceMappingURL=index.js.map