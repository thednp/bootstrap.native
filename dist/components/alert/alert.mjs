/*!
* Bootstrap Native Alert v5.1.10 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import { Data, ObjectKeys, createCustomEvent, dispatchEvent, emulateTransitionEnd, getAttribute, getInstance, hasClass, isElement, isString, mouseclickEvent, normalizeOptions, querySelector, removeClass } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
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
const Version = "5.1.10";
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
export { Alert as default };

//# sourceMappingURL=alert.mjs.map