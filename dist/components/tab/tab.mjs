/*!
* Bootstrap Native Tab v5.1.9 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-Dt_AEB8H.mjs";
import { Data, ObjectKeys, Timer, addClass, ariaSelected, closest, createCustomEvent, dispatchEvent, emulateTransitionEnd, getAttribute, getDocument, getElementsByClassName, getInstance, hasClass, isElement, isHTMLElement, isString, mouseclickEvent, normalizeOptions, querySelector, reflow, removeClass, setAttribute } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
//#region src/strings/collapsingClass.ts
/**
* Global namespace for most components `collapsing` class.
* As used by `Collapse` / `Tab`.
*/
const collapsingClass = "collapsing";
//#endregion
//#region src/strings/activeClass.ts
/**
* Global namespace for most components active class.
*/
const activeClass = "active";
//#endregion
//#region src/strings/showClass.ts
/**
* Global namespace for most components `show` class.
*/
const showClass = "show";
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
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
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
export { Tab as default };

//# sourceMappingURL=tab.mjs.map