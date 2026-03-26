/*!
* Bootstrap Native Scrollspy v5.1.10 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import { Data, ObjectKeys, addClass, closest, createCustomEvent, dispatchEvent, getAttribute, getBoundingClientRect, getDocument, getDocumentElement, getElementById, getElementsByTagName, getInstance, hasClass, isElement, isString, mouseclickEvent, normalizeOptions, querySelector, removeClass } from "@thednp/shorty";
import PositionObserver from "@thednp/position-observer";
import { addListener, removeListener } from "@thednp/event-listener";
//#region src/strings/activeClass.ts
/**
* Global namespace for most components active class.
*/
const activeClass = "active";
//#endregion
//#region src/strings/scrollspyString.ts
/** @type {string} */
const scrollspyString = "scrollspy";
//#endregion
//#region src/strings/scrollspyComponent.ts
/** @type {string} */
const scrollspyComponent = "ScrollSpy";
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
export { ScrollSpy as default };

//# sourceMappingURL=scrollspy.mjs.map