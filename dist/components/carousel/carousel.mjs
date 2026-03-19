/*!
* Bootstrap Native Carousel v5.1.9 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-CbtzKIxd.mjs";
import { Data, ObjectAssign, ObjectKeys, Timer, addClass, closest, createCustomEvent, dispatchEvent, dragstartEvent, emulateTransitionEnd, getAttribute, getDocument, getElementTransitionDuration, getElementsByClassName, getInstance, hasClass, isElement, isElementInScrollRange, isRTL, isString, keyArrowLeft, keyArrowRight, keydownEvent, matches, mouseclickEvent, mouseenterEvent, mouseleaveEvent, normalizeOptions, passiveHandler, pointerdownEvent, pointermoveEvent, pointerupEvent, querySelector, querySelectorAll, reflow, removeClass, touchstartEvent } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
//#region src/strings/activeClass.ts
/**
* Global namespace for most components active class.
*/
const activeClass = "active";
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
const Version = "5.1.9";
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
export { Carousel as default };

//# sourceMappingURL=carousel.mjs.map