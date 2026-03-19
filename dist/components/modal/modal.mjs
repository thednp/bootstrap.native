/*!
* Bootstrap Native Modal v5.1.9 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-B6bRbd03.mjs";
import { Data, ObjectKeys, Timer, addClass, ariaHidden, ariaModal, closest, createCustomEvent, createElement, dispatchEvent, emulateTransitionEnd, focus, getAttribute, getDocument, getDocumentBody, getDocumentElement, getElementStyle, getElementTransitionDuration, getElementsByClassName, getInstance, getWindow, hasClass, isElement, isHTMLElement, isNode, isRTL, isString, keyEscape, keydownEvent, mouseclickEvent, normalizeOptions, querySelector, querySelectorAll, reflow, removeAttribute, removeClass, setAttribute, setElementStyle, toggleFocusTrap } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
//#endregion
//#region src/strings/dataBsDismiss.ts
/**
* Global namespace for most components `dismiss` option.
*/
const dataBsDismiss = "data-bs-dismiss";
//#endregion
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
//#region src/strings/modalString.ts
/** @type {string} */
const modalString = "modal";
//#endregion
//#region src/strings/modalComponent.ts
/** @type {string} */
const modalComponent = "Modal";
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
export { Modal as default };

//# sourceMappingURL=modal.mjs.map