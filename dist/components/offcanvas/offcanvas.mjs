/*!
* Bootstrap Native Offcanvas v5.1.9 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-w7NPGiUi.mjs";
import { Data, ObjectKeys, addClass, ariaHidden, ariaModal, closest, createCustomEvent, createElement, dispatchEvent, emulateTransitionEnd, focus, getAttribute, getDocument, getDocumentBody, getDocumentElement, getElementStyle, getElementTransitionDuration, getElementsByClassName, getInstance, getWindow, hasClass, isElement, isHTMLElement, isNode, isString, keyEscape, keydownEvent, mouseclickEvent, normalizeOptions, querySelector, querySelectorAll, reflow, removeAttribute, removeClass, setAttribute, setElementStyle, toggleFocusTrap } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
//#region src/strings/dataBsDismiss.ts
/**
* Global namespace for most components `dismiss` option.
*/
const dataBsDismiss = "data-bs-dismiss";
//#endregion
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
//#endregion
//#region src/strings/showClass.ts
/**
* Global namespace for most components `show` class.
*/
const showClass = "show";
//#endregion
//#region src/strings/offcanvasString.ts
/** @type {string} */
const offcanvasString = "offcanvas";
//#endregion
//#region src/strings/offcanvasComponent.ts
/** @type {string} */
const offcanvasComponent = "Offcanvas";
//#endregion
//#region src/strings/dataBsTarget.ts
/**
* Global namespace for most components `target` option.
*/
const dataBsTarget = "data-bs-target";
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
//#region src/util/isVisible.ts
/**
* @param element target
* @returns the check result
*/
const isVisible = (element) => {
	return isHTMLElement(element) && getElementStyle(element, "visibility") !== "hidden" && element.offsetParent !== null;
};
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
//#region src/strings/fadeClass.ts
/**
* Global namespace for most components `fade` class.
*/
const fadeClass = "fade";
//#endregion
//#region src/strings/modalString.ts
/** @type {string} */
const modalString = "modal";
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
export { Offcanvas as default };

//# sourceMappingURL=offcanvas.mjs.map