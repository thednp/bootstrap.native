/*!
* Bootstrap Native Button v5.1.8 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-D709uj-t.mjs";
import { Data, ObjectKeys, addClass, ariaPressed, getAttribute, getInstance, hasClass, isElement, isString, mouseclickEvent, normalizeOptions, querySelector, removeClass, setAttribute } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
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
export { Button as default };

//# sourceMappingURL=button.mjs.map