/*!
* Bootstrap Native Dropdown v5.1.7 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-CXKGM9yY.mjs";
import { Data, ObjectAssign, ObjectKeys, addClass, ariaExpanded, closest, createCustomEvent, dispatchEvent, focus, focusEvent, getAttribute, getBoundingClientRect, getDocument, getDocumentElement, getElementStyle, getElementsByClassName, getInstance, hasAttribute, hasClass, isElement, isHTMLElement, isRTL, isString, keyArrowDown, keyArrowUp, keyEscape, keydownEvent, keyupEvent, mouseclickEvent, mousedownEvent, normalizeOptions, querySelector, removeClass, setAttribute, setElementStyle } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
import PositionObserver from "@thednp/position-observer";
//#region src/strings/showClass.ts
/**
* Global namespace for most components `show` class.
*/
const showClass = "show";
//#endregion
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
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
const Version = "5.1.7";
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
export { Dropdown as default };

//# sourceMappingURL=dropdown.mjs.map