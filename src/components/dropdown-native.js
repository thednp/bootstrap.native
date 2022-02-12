/* Native JavaScript for Bootstrap 5 | Dropdown
----------------------------------------------- */
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import focusEvent from 'shorter-js/src/strings/focusEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import keyupEvent from 'shorter-js/src/strings/keyupEvent';
import scrollEvent from 'shorter-js/src/strings/scrollEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keyArrowUp from 'shorter-js/src/strings/keyArrowUp';
import keyArrowDown from 'shorter-js/src/strings/keyArrowDown';
import keyEscape from 'shorter-js/src/strings/keyEscape';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import hasAttribute from 'shorter-js/src/attr/hasAttribute';
import closest from 'shorter-js/src/selectors/closest';
import querySelector from 'shorter-js/src/selectors/querySelector';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import { getInstance } from 'shorter-js/src/misc/data';
import setElementStyle from 'shorter-js/src/misc/setElementStyle';
import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import focus from 'shorter-js/src/misc/focus';
import OriginalEvent from 'shorter-js/src/misc/OriginalEvent';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import isRTL from 'shorter-js/src/is/isRTL';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import getDocumentElement from 'shorter-js/src/get/getDocumentElement';
import getBoundingClientRect from 'shorter-js/src/get/getBoundingClientRect';
import getDocument from 'shorter-js/src/get/getDocument';
import getWindow from 'shorter-js/src/get/getWindow';

import { addListener, removeListener } from 'event-listener.js';

import showClass from '../strings/showClass';
import dataBsToggle from '../strings/dataBsToggle';
import dropdownClasses from '../strings/dropdownClasses';
import dropdownComponent from '../strings/dropdownComponent';
import dropdownMenuClass from '../strings/dropdownMenuClass';

import isEmptyAnchor from '../util/isEmptyAnchor';
import BaseComponent from './base-component';

// DROPDOWN PRIVATE GC
// ===================
const [
  dropdownString,
  dropupString,
  dropstartString,
  dropendString,
] = dropdownClasses;
const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

/**
 * Static method which returns an existing `Dropdown` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Dropdown>}
 */
const getDropdownInstance = (element) => getInstance(element, dropdownComponent);

/**
 * A `Dropdown` initialization callback.
 * @type {BSN.InitCallback<Dropdown>}
 */
const dropdownInitCallback = (element) => new Dropdown(element);

// DROPDOWN PRIVATE GC
// ===================
const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
const verticalClass = [dropdownString, dropupString];
const horizontalClass = [dropstartString, dropendString];
const menuFocusTags = ['A', 'BUTTON'];

const dropdownDefaults = {
  offset: 5, // [number] 5(px)
  display: 'dynamic', // [dynamic|static]
};

// DROPDOWN CUSTOM EVENTS
// ======================
const showDropdownEvent = OriginalEvent(`show.bs.${dropdownString}`);
const shownDropdownEvent = OriginalEvent(`shown.bs.${dropdownString}`);
const hideDropdownEvent = OriginalEvent(`hide.bs.${dropdownString}`);
const hiddenDropdownEvent = OriginalEvent(`hidden.bs.${dropdownString}`);

// DROPDOWN PRIVATE METHODS
// ========================
/**
 * Apply specific style or class names to a `.dropdown-menu` to automatically
 * accomodate the layout and the page scroll.
 *
 * @param {Dropdown} self the `Dropdown` instance
 */
function styleDropdown(self) {
  const {
    element, menu, parentElement, options,
  } = self;
  const { offset } = options;

  // don't apply any style on mobile view
  if (getElementStyle(menu, 'position') === 'static') return;

  const RTL = isRTL(element);
  const menuEnd = hasClass(parentElement, dropdownMenuEndClass);

  // reset menu offset and position
  const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
  // @ts-ignore
  resetProps.forEach((p) => { menu.style[p] = ''; });

  // set initial position class
  // take into account .btn-group parent as .dropdown
  let positionClass = dropdownClasses.find((c) => hasClass(parentElement, c)) || dropdownString;

  /** @type {Record<string, Record<string, any>>} */
  let dropdownMargin = {
    dropdown: [offset, 0, 0],
    dropup: [0, 0, offset],
    dropstart: RTL ? [-1, 0, 0, offset] : [-1, offset, 0],
    dropend: RTL ? [-1, offset, 0] : [-1, 0, 0, offset],
  };

  /** @type {Record<string, Record<string, any>>} */
  const dropdownPosition = {
    dropdown: { top: '100%' },
    dropup: { top: 'auto', bottom: '100%' },
    dropstart: RTL ? { left: '100%', right: 'auto' } : { left: 'auto', right: '100%' },
    dropend: RTL ? { left: 'auto', right: '100%' } : { left: '100%', right: 'auto' },
    menuEnd: RTL ? { right: 'auto', left: 0 } : { right: 0, left: 'auto' },
  };

  // @ts-ignore
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu;

  const { clientWidth, clientHeight } = getDocumentElement(element);
  const {
    left: targetLeft, top: targetTop,
    width: targetWidth, height: targetHeight,
  } = getBoundingClientRect(element);

  // dropstart | dropend
  const leftFullExceed = targetLeft - menuWidth - offset < 0;
  // dropend
  const rightFullExceed = targetLeft + menuWidth + targetWidth + offset >= clientWidth;
  // dropstart | dropend
  const bottomExceed = targetTop + menuHeight + offset >= clientHeight;
  // dropdown
  const bottomFullExceed = targetTop + menuHeight + targetHeight + offset >= clientHeight;
  // dropup
  const topExceed = targetTop - menuHeight - offset < 0;
  // dropdown / dropup
  const leftExceed = ((!RTL && menuEnd) || (RTL && !menuEnd))
    && targetLeft + targetWidth - menuWidth < 0;
  const rightExceed = ((RTL && menuEnd) || (!RTL && !menuEnd))
    && targetLeft + menuWidth >= clientWidth;

  // recompute position
  // handle RTL as well
  if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropstartString && (!RTL ? leftFullExceed : rightFullExceed)) {
    positionClass = dropendString;
  }
  if (positionClass === dropendString && (RTL ? leftFullExceed : rightFullExceed)) {
    positionClass = dropstartString;
  }
  if (positionClass === dropupString && topExceed && !bottomFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
    positionClass = dropupString;
  }
  // override position for horizontal classes
  if (horizontalClass.includes(positionClass) && bottomExceed) {
    ObjectAssign(dropdownPosition[positionClass], {
      top: 'auto', bottom: 0,
    });
  }
  // override position for vertical classes
  if (verticalClass.includes(positionClass) && (leftExceed || rightExceed)) {
    // don't realign when menu is wider than window
    // in both RTL and non-RTL readability is KING
    if (targetLeft + targetWidth + Math.abs(menuWidth - targetWidth) + offset < clientWidth) {
      ObjectAssign(dropdownPosition[positionClass],
        leftExceed ? { left: 0, right: 'auto' } : { left: 'auto', right: 0 });
    }
  }

  dropdownMargin = dropdownMargin[positionClass];
  // @ts-ignore
  menu.style.margin = `${dropdownMargin.map((x) => (x ? `${x}px` : x)).join(' ')}`;

  setElementStyle(menu, dropdownPosition[positionClass]);

  // update dropdown-menu-end
  if (hasClass(menu, dropdownMenuEndClass)) {
    setElementStyle(menu, dropdownPosition.menuEnd);
  }
}

/**
 * Returns an `Array` of focusable items in the given dropdown-menu.
 * @param {HTMLElement | Element} menu
 * @returns {(HTMLElement | Element)[]}
 */
function getMenuItems(menu) {
  // @ts-ignore
  return [...menu.children].map((c) => {
    if (c && menuFocusTags.includes(c.tagName)) return c;
    const { firstElementChild } = c;
    if (firstElementChild && menuFocusTags.includes(firstElementChild.tagName)) {
      return firstElementChild;
    }
    return null;
  }).filter((c) => c);
}

/**
 * Toggles on/off the listeners for the events that close the dropdown
 * as well as event that request a new position for the dropdown.
 *
 * @param {Dropdown} self the `Dropdown` instance
 */
function toggleDropdownDismiss(self) {
  const { element } = self;
  const action = self.open ? addListener : removeListener;
  const doc = getDocument(element);

  action(doc, mouseclickEvent, dropdownDismissHandler);
  action(doc, focusEvent, dropdownDismissHandler);
  action(doc, keydownEvent, dropdownPreventScroll);
  action(doc, keyupEvent, dropdownKeyHandler);

  if (self.options.display === 'dynamic') {
    [scrollEvent, resizeEvent].forEach((ev) => {
      // @ts-ignore
      action(getWindow(element), ev, dropdownLayoutHandler, passiveHandler);
    });
  }
}

/**
 * Toggles on/off the `click` event listener of the `Dropdown`.
 *
 * @param {Dropdown} self the `Dropdown` instance
 * @param {boolean=} add when `true`, it will add the event listener
 */
function toggleDropdownHandler(self, add) {
  const action = add ? addListener : removeListener;
  action(self.element, mouseclickEvent, dropdownClickHandler);
}

/**
 * Returns the currently open `.dropdown` element.
 *
 * @param {(Document | HTMLElement | Element | globalThis)=} element target
 * @returns {HTMLElement?} the query result
 */
function getCurrentOpenDropdown(element) {
  const currentParent = [...dropdownClasses, 'btn-group', 'input-group']
    .map((c) => getElementsByClassName(`${c} ${showClass}`), getDocument(element))
    .find((x) => x.length);

  if (currentParent && currentParent.length) {
    // @ts-ignore -- HTMLElement is also Element
    return [...currentParent[0].children]
      .find((x) => hasAttribute(x, dataBsToggle));
  }
  return null;
}

// DROPDOWN EVENT HANDLERS
// =======================
/**
 * Handles the `click` event for the `Dropdown` instance.
 *
 * @param {MouseEvent} e event object
 * @this {Document}
 */
function dropdownDismissHandler(e) {
  const { target, type } = e;
  // @ts-ignore
  if (!target || !target.closest) return; // some weird FF bug #409

  // @ts-ignore
  const element = getCurrentOpenDropdown(target);
  if (!element) return;

  const self = getDropdownInstance(element);
  if (!self) return;

  const { parentElement, menu } = self;

  // @ts-ignore
  const hasData = closest(target, dropdownSelector) !== null;
  // @ts-ignore
  const isForm = parentElement && parentElement.contains(target)
    // @ts-ignore
    && (target.tagName === 'form' || closest(target, 'form') !== null);

  // @ts-ignore
  if (type === mouseclickEvent && isEmptyAnchor(target)) {
    e.preventDefault();
  }
  if (type === focusEvent // @ts-ignore
    && (target === element || target === menu || menu.contains(target))) {
    return;
  }

  if (isForm || hasData) {
    // smile to ESLint
  } else if (self) {
    self.hide();
  }
}

/**
 * Handles `click` event listener for `Dropdown`.
 * @this {HTMLElement | Element}
 * @param {MouseEvent} e event object
 */
function dropdownClickHandler(e) {
  const element = this;
  const { target } = e;
  const self = getDropdownInstance(element);

  if (self) {
    self.toggle();
    if (target && isEmptyAnchor(target)) e.preventDefault();
  }
}

/**
 * Prevents scroll when dropdown-menu is visible.
 * @param {KeyboardEvent} e event object
 */
function dropdownPreventScroll(e) {
  if ([keyArrowDown, keyArrowUp].includes(e.code)) e.preventDefault();
}

/**
 * Handles keyboard `keydown` events for `Dropdown`.
 * @param {KeyboardEvent} e keyboard key
 * @this {Document}
 */
function dropdownKeyHandler(e) {
  const { code } = e;
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);
  const activeItem = element && getDocument(element).activeElement;
  if (!self || !activeItem) return;
  const { menu, open } = self;
  const menuItems = getMenuItems(menu);

  // arrow up & down
  if (menuItems && menuItems.length && [keyArrowDown, keyArrowUp].includes(code)) {
    let idx = menuItems.indexOf(activeItem);
    if (activeItem === element) {
      idx = 0;
    } else if (code === keyArrowUp) {
      idx = idx > 1 ? idx - 1 : 0;
    } else if (code === keyArrowDown) {
      idx = idx < menuItems.length - 1 ? idx + 1 : idx;
    }
    if (menuItems[idx]) focus(menuItems[idx]);
  }

  if (keyEscape === code && open) {
    self.toggle();
    focus(element);
  }
}

/**
 * @this {globalThis}
 * @returns {void}
 */
function dropdownLayoutHandler() {
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);

  if (self && self.open) styleDropdown(self);
}

// DROPDOWN DEFINITION
// ===================
/** Returns a new Dropdown instance. */
export default class Dropdown extends BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target Element or string selector
   * @param {BSN.Options.Dropdown=} config the instance options
   */
  constructor(target, config) {
    super(target, config);
    // bind
    const self = this;

    // initialization element
    const { element } = self;
    const { parentElement } = element;

    // set targets
    /** @type {(Element | HTMLElement)} */
    // @ts-ignore
    self.parentElement = parentElement;
    /** @type {(Element | HTMLElement)} */
    // @ts-ignore
    self.menu = querySelector(`.${dropdownMenuClass}`, parentElement);

    // set initial state to closed
    /** @type {boolean} */
    self.open = false;

    // add event listener
    toggleDropdownHandler(self, true);
  }

  /* eslint-disable */
  /**
   * Returns component name string.
   * @readonly @static
   */
  get name() { return dropdownComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return dropdownDefaults; }
  /* eslint-enable */

  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    const self = this;

    if (self.open) self.hide();
    else self.show();
  }

  /** Shows the dropdown menu to the user. */
  show() {
    const self = this;
    const {
      element, open, menu, parentElement,
    } = self;

    const currentElement = getCurrentOpenDropdown(element);
    const currentInstance = currentElement && getDropdownInstance(currentElement);
    if (currentInstance) currentInstance.hide();

    // dispatch
    [showDropdownEvent, shownDropdownEvent].forEach((e) => { e.relatedTarget = element; });
    dispatchEvent(parentElement, showDropdownEvent);
    if (showDropdownEvent.defaultPrevented) return;

    addClass(menu, showClass);
    addClass(parentElement, showClass);
    setAttribute(element, ariaExpanded, 'true');

    // change menu position
    styleDropdown(self);

    self.open = !open;

    setTimeout(() => {
      focus(element); // focus the element
      toggleDropdownDismiss(self);
      dispatchEvent(parentElement, shownDropdownEvent);
    }, 1);
  }

  /** Hides the dropdown menu from the user. */
  hide() {
    const self = this;
    const {
      element, open, menu, parentElement,
    } = self;
    [hideDropdownEvent, hiddenDropdownEvent].forEach((e) => { e.relatedTarget = element; });

    dispatchEvent(parentElement, hideDropdownEvent);
    if (hideDropdownEvent.defaultPrevented) return;

    removeClass(menu, showClass);
    removeClass(parentElement, showClass);
    setAttribute(element, ariaExpanded, 'false');

    self.open = !open;

    // only re-attach handler if the instance is not disposed
    setTimeout(() => toggleDropdownDismiss(self), 1);

    dispatchEvent(parentElement, hiddenDropdownEvent);
  }

  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    const self = this;
    const { parentElement } = self;

    if (hasClass(parentElement, showClass) && self.open) self.hide();

    toggleDropdownHandler(self);

    super.dispose();
  }
}

ObjectAssign(Dropdown, {
  selector: dropdownSelector,
  init: dropdownInitCallback,
  getInstance: getDropdownInstance,
});
