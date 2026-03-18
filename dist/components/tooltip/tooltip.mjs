/*!
* Bootstrap Native Tooltip v5.1.8 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import "./chunk-DB0UiEx_.mjs";
import { Data, ObjectAssign, ObjectKeys, Timer, addClass, ariaDescribedBy, closest, createCustomEvent, createElement, dispatchEvent, emulateTransitionEnd, focus, focusEvent, focusinEvent, focusoutEvent, getAttribute, getBoundingClientRect, getDocument, getDocumentBody, getDocumentElement, getElementStyle, getInstance, getNodeScroll, getParentNode, getRectRelativeToOffsetParent, getUID, getWindow, hasAttribute, hasClass, isApple, isArray, isElement, isFunction, isHTMLElement, isNode, isNodeList, isRTL, isShadowRoot, isString, isTableElement, mouseclickEvent, mousedownEvent, mouseenterEvent, mousehoverEvent, mouseleaveEvent, normalizeOptions, passiveHandler, querySelector, removeAttribute, removeClass, setAttribute, setElementStyle, toLowerCase, touchstartEvent } from "@thednp/shorty";
import { addListener, removeListener } from "@thednp/event-listener";
import PositionObserver from "@thednp/position-observer";
//#region src/strings/dataBsToggle.ts
/**
* Global namespace for most components `toggle` option.
*/
const dataBsToggle = "data-bs-toggle";
//#endregion
//#region src/strings/dataOriginalTitle.ts
/**
* Global namespace for `data-bs-title` attribute.
*/
const dataOriginalTitle = "data-original-title";
//#endregion
//#region src/strings/showClass.ts
/**
* Global namespace for most components `show` class.
*/
const showClass = "show";
//#endregion
//#region src/strings/tooltipString.ts
/** @type {string} */
const tooltipString = "tooltip";
//#endregion
//#region src/strings/tooltipComponent.ts
/** @type {string} */
const tooltipComponent = "Tooltip";
//#endregion
//#region src/strings/popoverString.ts
/** @type {string} */
const popoverString = "popover";
//#endregion
//#region src/strings/popoverComponent.ts
/** @type {string} */
const popoverComponent = "Popover";
//#endregion
//#region src/strings/modalString.ts
/** @type {string} */
const modalString = "modal";
//#endregion
//#region src/strings/offcanvasString.ts
/** @type {string} */
const offcanvasString = "offcanvas";
//#endregion
//#region src/util/tipClassPositions.ts
const tipClassPositions = {
	top: "top",
	bottom: "bottom",
	left: "start",
	right: "end"
};
//#endregion
//#region src/util/styleTip.ts
/**
* Style popovers and tooltips.
*
* @param self the `Popover` / `Tooltip` instance
*/
const styleTip = (self) => {
	requestAnimationFrame(() => {
		const tipClasses = /\b(top|bottom|start|end)+/;
		const { element, tooltip, container, offsetParent, options, arrow } = self;
		if (!tooltip) return;
		const RTL = isRTL(element);
		const { x: scrollLeft, y: scrollTop } = getNodeScroll(offsetParent);
		setElementStyle(tooltip, {
			top: "",
			left: "",
			right: "",
			bottom: ""
		});
		const { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip;
		const { clientWidth: htmlcw, clientHeight: htmlch, offsetWidth: htmlow } = getDocumentElement(element);
		let { placement } = options;
		const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = container;
		const fixedParent = getElementStyle(container, "position") === "fixed";
		const scrollbarWidth = fixedParent ? Math.abs(parentCWidth - parentOWidth) : Math.abs(htmlcw - htmlow);
		const leftBoundry = RTL && fixedParent ? scrollbarWidth : 0;
		const rightBoundry = htmlcw - (!RTL ? scrollbarWidth : 0) - 1;
		const { width: elemWidth, height: elemHeight, left: elemRectLeft, right: elemRectRight, top: elemRectTop } = self._observer.getEntry(element)?.boundingClientRect || getBoundingClientRect(element, true);
		const { x: elemOffsetLeft, y: elemOffsetTop } = getRectRelativeToOffsetParent(element, offsetParent, {
			x: scrollLeft,
			y: scrollTop
		});
		setElementStyle(arrow, {
			top: "",
			left: "",
			right: "",
			bottom: ""
		});
		let topPosition = 0;
		let bottomPosition = "";
		let leftPosition = 0;
		let rightPosition = "";
		let arrowTop = "";
		let arrowLeft = "";
		let arrowRight = "";
		const arrowWidth = arrow.offsetWidth || 0;
		const arrowHeight = arrow.offsetHeight || 0;
		const arrowAdjust = arrowWidth / 2;
		let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
		let bottomExceed = elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch;
		let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
		let rightExceed = elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;
		const horizontals = ["left", "right"];
		const verticals = ["top", "bottom"];
		topExceed = horizontals.includes(placement) ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0 : topExceed;
		bottomExceed = horizontals.includes(placement) ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch : bottomExceed;
		leftExceed = verticals.includes(placement) ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry : leftExceed;
		rightExceed = verticals.includes(placement) ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry : rightExceed;
		placement = horizontals.includes(placement) && leftExceed && rightExceed ? "top" : placement;
		placement = placement === "top" && topExceed ? "bottom" : placement;
		placement = placement === "bottom" && bottomExceed ? "top" : placement;
		placement = placement === "left" && leftExceed ? "right" : placement;
		placement = placement === "right" && rightExceed ? "left" : placement;
		if (!tooltip.className.includes(placement)) tooltip.className = tooltip.className.replace(tipClasses, tipClassPositions[placement]);
		if (horizontals.includes(placement)) {
			if (placement === "left") leftPosition = elemOffsetLeft - tipWidth - arrowWidth;
			else leftPosition = elemOffsetLeft + elemWidth + arrowWidth;
			if (topExceed && bottomExceed) {
				topPosition = 0;
				bottomPosition = 0;
				arrowTop = elemOffsetTop + elemHeight / 2 - arrowHeight / 2;
			} else if (topExceed) {
				topPosition = elemOffsetTop;
				bottomPosition = "";
				arrowTop = elemHeight / 2 - arrowWidth;
			} else if (bottomExceed) {
				topPosition = elemOffsetTop - tipHeight + elemHeight;
				bottomPosition = "";
				arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
			} else {
				topPosition = elemOffsetTop - tipHeight / 2 + elemHeight / 2;
				arrowTop = tipHeight / 2 - arrowHeight / 2;
			}
		} else if (verticals.includes(placement)) {
			if (placement === "top") topPosition = elemOffsetTop - tipHeight - arrowHeight;
			else topPosition = elemOffsetTop + elemHeight + arrowHeight;
			if (leftExceed) {
				leftPosition = 0;
				arrowLeft = elemOffsetLeft + elemWidth / 2 - arrowAdjust;
			} else if (rightExceed) {
				leftPosition = "auto";
				rightPosition = 0;
				arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
			} else {
				leftPosition = elemOffsetLeft - tipWidth / 2 + elemWidth / 2;
				arrowLeft = tipWidth / 2 - arrowAdjust;
			}
		}
		setElementStyle(tooltip, {
			top: `${topPosition}px`,
			bottom: bottomPosition === "" ? "" : `${bottomPosition}px`,
			left: leftPosition === "auto" ? leftPosition : `${leftPosition}px`,
			right: rightPosition !== "" ? `${rightPosition}px` : ""
		});
		if (isHTMLElement(arrow)) {
			if (arrowTop !== "") arrow.style.top = `${arrowTop}px`;
			if (arrowLeft !== "") arrow.style.left = `${arrowLeft}px`;
			else if (arrowRight !== "") arrow.style.right = `${arrowRight}px`;
		}
		dispatchEvent(element, createCustomEvent(`updated.bs.${toLowerCase(self.name)}`));
	});
};
//#endregion
//#region src/strings/fadeClass.ts
/**
* Global namespace for most components `fade` class.
*/
const fadeClass = "fade";
//#endregion
//#region src/util/setHtml.ts
/**
* Append an existing `Element` to Popover / Tooltip component or HTML
* markup string to be parsed & sanitized to be used as popover / tooltip content.
*
* @param element target
* @param content the `Element` to append / string
* @param sanitizeFn a function to sanitize string content
*/
const setHtml = (element, content, sanitizeFn) => {
	if (isString(content) && content.length) {
		let dirty = content.trim();
		if (isFunction(sanitizeFn)) dirty = sanitizeFn(dirty);
		const tempDocument = new DOMParser().parseFromString(dirty, "text/html");
		element.append(...[...tempDocument.body.childNodes]);
	} else if (isHTMLElement(content)) element.append(content);
	else if (isNodeList(content) || isArray(content) && content.every(isNode)) element.append(...[...content]);
};
//#endregion
//#region src/util/createTip.ts
/**
* Creates a new tooltip / popover.
*
* @param self the `Tooltip` / `Popover` instance
*/
const createTip = (self) => {
	const isTooltip = self.name === tooltipComponent;
	const { id, element, options } = self;
	const { title, placement, template, animation, customClass, sanitizeFn, dismissible, content, btnClose } = options;
	const tipString = isTooltip ? tooltipString : popoverString;
	const tipPositions = { ...tipClassPositions };
	let titleParts = [];
	let contentParts = [];
	if (isRTL(element)) {
		tipPositions.left = "end";
		tipPositions.right = "start";
	}
	const placementClass = `bs-${tipString}-${tipPositions[placement]}`;
	let tooltipTemplate;
	if (isHTMLElement(template)) tooltipTemplate = template;
	else {
		const htmlMarkup = createElement("div");
		setHtml(htmlMarkup, template, sanitizeFn);
		tooltipTemplate = htmlMarkup.firstChild;
	}
	if (!isHTMLElement(tooltipTemplate)) return;
	self.tooltip = tooltipTemplate.cloneNode(true);
	const { tooltip } = self;
	setAttribute(tooltip, "id", id);
	setAttribute(tooltip, "role", tooltipString);
	const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`;
	const tooltipHeader = isTooltip ? null : querySelector(`.${popoverString}-header`, tooltip);
	const tooltipBody = querySelector(`.${bodyClass}`, tooltip);
	self.arrow = querySelector(`.${tipString}-arrow`, tooltip);
	const { arrow } = self;
	if (isHTMLElement(title)) titleParts = [title.cloneNode(true)];
	else {
		const tempTitle = createElement("div");
		setHtml(tempTitle, title, sanitizeFn);
		titleParts = [...[...tempTitle.childNodes]];
	}
	if (isHTMLElement(content)) contentParts = [content.cloneNode(true)];
	else {
		const tempContent = createElement("div");
		setHtml(tempContent, content, sanitizeFn);
		contentParts = [...[...tempContent.childNodes]];
	}
	if (dismissible) if (title) if (isHTMLElement(btnClose)) titleParts = [...titleParts, btnClose.cloneNode(true)];
	else {
		const tempBtn = createElement("div");
		setHtml(tempBtn, btnClose, sanitizeFn);
		titleParts = [...titleParts, tempBtn.firstChild];
	}
	else {
		if (tooltipHeader) tooltipHeader.remove();
		if (isHTMLElement(btnClose)) contentParts = [...contentParts, btnClose.cloneNode(true)];
		else {
			const tempBtn = createElement("div");
			setHtml(tempBtn, btnClose, sanitizeFn);
			contentParts = [...contentParts, tempBtn.firstChild];
		}
	}
	if (!isTooltip) {
		if (title && tooltipHeader) setHtml(tooltipHeader, titleParts, sanitizeFn);
		if (content && tooltipBody) setHtml(tooltipBody, contentParts, sanitizeFn);
		self.btn = querySelector(".btn-close", tooltip) || void 0;
	} else if (title && tooltipBody) setHtml(tooltipBody, title, sanitizeFn);
	addClass(tooltip, "position-absolute");
	addClass(arrow, "position-absolute");
	if (!hasClass(tooltip, tipString)) addClass(tooltip, tipString);
	if (animation && !hasClass(tooltip, "fade")) addClass(tooltip, fadeClass);
	if (customClass && !hasClass(tooltip, customClass)) addClass(tooltip, customClass);
	if (!hasClass(tooltip, placementClass)) addClass(tooltip, placementClass);
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
//#region src/util/getElementContainer.ts
/**
* Returns an `HTMLElement` to be used as default value for *options.container*
* for `Tooltip` / `Popover` components.
*
* @see https://github.com/floating-ui/floating-ui
*
* @param element the target
* @returns the query result
*/
const getElementContainer = (element) => {
	const majorBlockTags = ["HTML", "BODY"];
	const containers = [];
	let { parentNode } = element;
	while (parentNode && !majorBlockTags.includes(parentNode.nodeName)) {
		parentNode = getParentNode(parentNode);
		if (!(isShadowRoot(parentNode) || isTableElement(parentNode))) containers.push(parentNode);
	}
	return containers.find((c, i) => {
		if ((getElementStyle(c, "position") !== "relative" || getElementStyle(c, "position") === "relative" && c.offsetHeight !== c.scrollHeight) && containers.slice(i + 1).every((r) => getElementStyle(r, "position") === "static")) return c;
		return null;
	}) || getDocument(element).body;
};
//#endregion
//#region src/util/getTipTemplate.ts
/**
* Returns a template for Popover / Tooltip.
*
* @param tipType the expected markup type
* @returns the template markup
*/
const getTipTemplate = (tipType) => {
	const isTooltip = tipType === tooltipString;
	const bodyClass = isTooltip ? `${tipType}-inner` : `${tipType}-body`;
	const header = !isTooltip ? `<h3 class="${tipType}-header"></h3>` : "";
	const arrow = `<div class="${tipType}-arrow"></div>`;
	const body = `<div class="${bodyClass}"></div>`;
	return `<div class="${tipType}" role="${tooltipString}">${header + arrow + body}</div>`;
};
//#endregion
//#region src/util/tooltipDefaults.ts
const tooltipDefaults = {
	template: getTipTemplate(tooltipString),
	title: "",
	customClass: "",
	trigger: "hover focus",
	placement: "top",
	sanitizeFn: void 0,
	animation: true,
	delay: 200,
	container: document.body,
	content: "",
	dismissible: false,
	btnClose: ""
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
//#region src/components/tooltip.ts
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = "title";
/**
* Static method which returns an existing `Tooltip` instance associated
* to a target `Element`.
*/
let getTooltipInstance = (element) => getInstance(element, tooltipComponent);
/**
* A `Tooltip` initialization callback.
*/
const tooltipInitCallback = (element) => new Tooltip(element);
/**
* Removes the tooltip from the DOM.
*
* @param self the `Tooltip` instance
*/
const removeTooltip = (self) => {
	const { element, tooltip, container } = self;
	removeAttribute(element, ariaDescribedBy);
	removePopup(tooltip, container);
};
/**
* Check if container contains the tooltip.
*
* @param self Tooltip
*/
const hasTip = (self) => {
	const { tooltip, container } = self;
	return tooltip && hasPopup(tooltip, container);
};
/**
* Executes after the instance has been disposed.
*
* @param self the `Tooltip` instance
* @param callback the parent dispose callback
*/
const disposeTooltipComplete = (self, callback) => {
	const { element } = self;
	self._toggleEventListeners();
	if (hasAttribute(element, "data-original-title") && self.name === "Tooltip") toggleTooltipTitle(self);
	if (callback) callback();
};
/**
* Toggles on/off the special `Tooltip` event listeners.
*
* @param self the `Tooltip` instance
* @param add when `true`, event listeners are added
*/
const toggleTooltipAction = (self, add) => {
	const action = add ? addListener : removeListener;
	const { element } = self;
	action(getDocument(element), touchstartEvent, self.handleTouch, passiveHandler);
};
/**
* Executes after the tooltip was shown to the user.
*
* @param self the `Tooltip` instance
*/
const tooltipShownAction = (self) => {
	const { element } = self;
	const shownTooltipEvent = createCustomEvent(`shown.bs.${toLowerCase(self.name)}`);
	toggleTooltipAction(self, true);
	dispatchEvent(element, shownTooltipEvent);
	Timer.clear(element, "in");
};
/**
* Executes after the tooltip was hidden to the user.
*
* @param self the `Tooltip` instance
*/
const tooltipHiddenAction = (self) => {
	const { element } = self;
	const hiddenTooltipEvent = createCustomEvent(`hidden.bs.${toLowerCase(self.name)}`);
	toggleTooltipAction(self);
	removeTooltip(self);
	dispatchEvent(element, hiddenTooltipEvent);
	Timer.clear(element, "out");
};
/**
* Toggles on/off the `Tooltip` event listeners that hide/update the tooltip.
*
* @param self the `Tooltip` instance
* @param add when `true`, event listeners are added
*/
const toggleTooltipOpenHandlers = (self, add) => {
	const action = add ? addListener : removeListener;
	const { element, tooltip } = self;
	const parentModal = closest(element, `.${modalString}`);
	const parentOffcanvas = closest(element, `.${offcanvasString}`);
	if (add) [element, tooltip].forEach((target) => self._observer.observe(target));
	else self._observer.disconnect();
	if (parentModal) action(parentModal, `hide.bs.${modalString}`, self.handleHide);
	if (parentOffcanvas) action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.handleHide);
};
/**
* Toggles the `title` and `data-original-title` attributes.
*
* @param self the `Tooltip` instance
* @param content when `true`, event listeners are added
*/
const toggleTooltipTitle = (self, content) => {
	const titleAtt = [dataOriginalTitle, titleAttr];
	const { element } = self;
	setAttribute(element, titleAtt[content ? 0 : 1], content || getAttribute(element, titleAtt[0]) || "");
	removeAttribute(element, titleAtt[content ? 1 : 0]);
};
/** Creates a new `Tooltip` instance. */
var Tooltip = class extends BaseComponent {
	static selector = tooltipSelector;
	static init = tooltipInitCallback;
	static getInstance = getTooltipInstance;
	static styleTip = styleTip;
	/**
	* @param target the target element
	* @param config the instance options
	*/
	constructor(target, config) {
		super(target, config);
		const { element } = this;
		const isTooltip = this.name === tooltipComponent;
		const tipString = isTooltip ? tooltipString : popoverString;
		const tipComponent = isTooltip ? tooltipComponent : popoverComponent;
		getTooltipInstance = (elem) => getInstance(elem, tipComponent);
		this.enabled = true;
		/** Set unique ID for `aria-describedby`. */
		this.id = `${tipString}-${getUID(element, tipString)}`;
		const { options } = this;
		if (!options.title && isTooltip || !isTooltip && !options.content) return;
		ObjectAssign(tooltipDefaults, { titleAttr: "" });
		if (hasAttribute(element, titleAttr) && isTooltip && typeof options.title === "string") toggleTooltipTitle(this, options.title);
		const container = getElementContainer(element);
		const offsetParent = [
			"sticky",
			"fixed",
			"relative"
		].some((position) => getElementStyle(container, "position") === position) ? container : getWindow(element);
		this.container = container;
		this.offsetParent = offsetParent;
		createTip(this);
		if (!this.tooltip) return;
		this._observer = new PositionObserver(() => this.update());
		this._toggleEventListeners(true);
	}
	/**
	* Returns component name string.
	*/
	get name() {
		return tooltipComponent;
	}
	/**
	* Returns component default options.
	*/
	get defaults() {
		return tooltipDefaults;
	}
	/** Handles the focus event on iOS. */
	handleFocus = () => focus(this.element);
	/** Shows the tooltip. */
	handleShow = () => this.show();
	show() {
		const { options, tooltip, element, container, id } = this;
		const { animation } = options;
		const outTimer = Timer.get(element, "out");
		Timer.clear(element, "out");
		if (tooltip && !outTimer && !hasTip(this)) Timer.set(element, () => {
			const showTooltipEvent = createCustomEvent(`show.bs.${toLowerCase(this.name)}`);
			dispatchEvent(element, showTooltipEvent);
			if (!showTooltipEvent.defaultPrevented) {
				appendPopup(tooltip, container);
				setAttribute(element, ariaDescribedBy, `#${id}`);
				this.update();
				toggleTooltipOpenHandlers(this, true);
				if (!hasClass(tooltip, "show")) addClass(tooltip, showClass);
				if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(this));
				else tooltipShownAction(this);
			}
		}, 17, "in");
	}
	/** Hides the tooltip. */
	handleHide = () => this.hide();
	hide() {
		const { options, tooltip, element } = this;
		const { animation, delay } = options;
		Timer.clear(element, "in");
		if (tooltip && hasTip(this)) Timer.set(element, () => {
			const hideTooltipEvent = createCustomEvent(`hide.bs.${toLowerCase(this.name)}`);
			dispatchEvent(element, hideTooltipEvent);
			if (!hideTooltipEvent.defaultPrevented) {
				this.update();
				removeClass(tooltip, showClass);
				toggleTooltipOpenHandlers(this);
				if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(this));
				else tooltipHiddenAction(this);
			}
		}, delay + 17, "out");
	}
	/** Updates the tooltip position. */
	update = () => {
		styleTip(this);
	};
	/** Toggles the tooltip visibility. */
	toggle = () => {
		const { tooltip } = this;
		if (tooltip && !hasTip(this)) this.show();
		else this.hide();
	};
	/** Enables the tooltip. */
	enable() {
		const { enabled } = this;
		if (!enabled) {
			this._toggleEventListeners(true);
			this.enabled = !enabled;
		}
	}
	/** Disables the tooltip. */
	disable() {
		const { tooltip, enabled } = this;
		if (enabled) {
			if (tooltip && hasTip(this)) this.hide();
			this._toggleEventListeners();
			this.enabled = !enabled;
		}
	}
	/** Toggles the `disabled` property. */
	toggleEnabled() {
		if (!this.enabled) this.enable();
		else this.disable();
	}
	/**
	* Handles the `touchstart` event listener for `Tooltip`
	*
	* @this {Tooltip}
	* @param {TouchEvent} e the `Event` object
	*/
	handleTouch = ({ target }) => {
		const { tooltip, element } = this;
		if (tooltip && tooltip.contains(target) || target === element || target && element.contains(target)) {} else this.hide();
	};
	/**
	* Toggles on/off the `Tooltip` event listeners.
	*
	* @param add when `true`, event listeners are added
	*/
	_toggleEventListeners = (add) => {
		const action = add ? addListener : removeListener;
		const { element, options, btn } = this;
		const { trigger } = options;
		const dismissible = this.name !== "Tooltip" && options.dismissible ? true : false;
		if (!trigger.includes("manual")) {
			this.enabled = !!add;
			trigger.split(" ").forEach((tr) => {
				if (tr === mousehoverEvent) {
					action(element, mousedownEvent, this.handleShow);
					action(element, mouseenterEvent, this.handleShow);
					if (!dismissible) {
						action(element, mouseleaveEvent, this.handleHide);
						action(getDocument(element), touchstartEvent, this.handleTouch, passiveHandler);
					}
				} else if (tr === mouseclickEvent) action(element, tr, !dismissible ? this.toggle : this.handleShow);
				else if (tr === focusEvent) {
					action(element, focusinEvent, this.handleShow);
					if (!dismissible) action(element, focusoutEvent, this.handleHide);
					if (isApple()) action(element, mouseclickEvent, this.handleFocus);
				}
				if (dismissible && btn) action(btn, mouseclickEvent, this.handleHide);
			});
		}
	};
	/** Removes the `Tooltip` from the target element. */
	dispose() {
		const { tooltip, options } = this;
		const clone = {
			...this,
			name: this.name
		};
		const callback = () => setTimeout(() => disposeTooltipComplete(clone, () => super.dispose()), 17);
		if (options.animation && hasTip(clone)) {
			this.options.delay = 0;
			this.hide();
			emulateTransitionEnd(tooltip, callback);
		} else callback();
	}
};
//#endregion
export { Tooltip as default };

//# sourceMappingURL=tooltip.mjs.map