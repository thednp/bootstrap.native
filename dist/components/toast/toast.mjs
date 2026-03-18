/*!
* Bootstrap Native Toast v5.1.8 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-CgEEppSx.mjs";
import { Data, ObjectKeys, Timer, addClass, closest, createCustomEvent, dispatchEvent, emulateTransitionEnd, focusinEvent, focusoutEvent, getAttribute, getDocument, getInstance, hasClass, isElement, isString, mouseclickEvent, mouseenterEvent, mouseleaveEvent, normalizeOptions, querySelector, querySelectorAll, reflow, removeClass } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
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
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
//#endregion
//#region src/strings/toastString.ts
/** @type {string} */
const toastString = "toast";
//#endregion
//#region src/strings/toastComponent.ts
/** @type {string} */
const toastComponent = "Toast";
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
export { Toast as default };

//# sourceMappingURL=toast.mjs.map