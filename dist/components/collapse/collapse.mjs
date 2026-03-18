/*!
* Bootstrap Native Collapse v5.1.8 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-CsOGbCdU.mjs";
import { Data, ObjectKeys, Timer, addClass, ariaExpanded, closest, createCustomEvent, dispatchEvent, emulateTransitionEnd, getAttribute, getDocument, getInstance, hasClass, isElement, isHTMLElement, isString, mouseclickEvent, noop, normalizeOptions, querySelector, querySelectorAll, reflow, removeClass, setAttribute, setElementStyle } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
//#endregion
//#region src/strings/collapsingClass.ts
/**
* Global namespace for most components `collapsing` class.
* As used by `Collapse` / `Tab`.
*/
const collapsingClass = "collapsing";
//#endregion
//#region src/strings/showClass.ts
/**
* Global namespace for most components `show` class.
*/
const showClass = "show";
//#endregion
//#region src/strings/collapseString.ts
/** @type {string} */
const collapseString = "collapse";
//#endregion
//#region src/strings/collapseComponent.ts
/** @type {string} */
const collapseComponent = "Collapse";
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
export { Collapse as default };

//# sourceMappingURL=collapse.mjs.map