/* Native JavaScript for Bootstrap 5 | Dropdown
----------------------------------------------- */
import {
  ariaExpanded,
  focusEvent,
  keydownEvent,
  setAttribute,
  keyEscape,
  keyArrowDown,
  keyArrowUp,
  mouseclickEvent,
  resizeEvent,
  scrollEvent,
  keyupEvent,
  dispatchEvent,
  setElementStyle,
  getInstance,
  ObjectAssign,
  passiveHandler,
  getElementsByClassName,
  closest,
  getAttribute,
  getDocument,
  getBoundingClientRect,
  getDocumentElement,
  getElementStyle,
  isRTL,
  removeClass,
  hasClass,
  addClass,
  createCustomEvent,
  focus,
  getWindow,
  CSS4Declaration,
  isHTMLElement,
  mousedownEvent,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import showClass from '../strings/showClass';
import dataBsToggle from '../strings/dataBsToggle';
import dropdownClasses from '../strings/dropdownClasses';
import dropdownComponent from '../strings/dropdownComponent';
import dropdownMenuClass from '../strings/dropdownMenuClass';

import isEmptyAnchor from '../util/isEmptyAnchor';
import BaseComponent from './base-component';
import type { DropdownEvent, DropdownOptions } from '../interface/dropdown';

// DROPDOWN PRIVATE GC
// ===================
const [dropdownString, dropupString, dropstartString, dropendString] = dropdownClasses;
const dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`;

/**
 * Static method which returns an existing `Dropdown` instance associated
 * to a target `Element`.
 */
const getDropdownInstance = (element: HTMLElement) => getInstance<Dropdown>(element, dropdownComponent);

/**
 * A `Dropdown` initialization callback.
 */
const dropdownInitCallback = (element: HTMLElement) => new Dropdown(element);

// DROPDOWN PRIVATE GC
// ===================
// const dropdownMenuStartClass = `${dropdownMenuClass}-start`;
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
const showDropdownEvent = createCustomEvent<DropdownEvent>(`show.bs.${dropdownString}`);
const shownDropdownEvent = createCustomEvent<DropdownEvent>(`shown.bs.${dropdownString}`);
const hideDropdownEvent = createCustomEvent<DropdownEvent>(`hide.bs.${dropdownString}`);
const hiddenDropdownEvent = createCustomEvent<DropdownEvent>(`hidden.bs.${dropdownString}`);
const updatedDropdownEvent = createCustomEvent<DropdownEvent>(`updated.bs.${dropdownString}`);

// DROPDOWN PRIVATE METHODS
// ========================
/**
 * Apply specific style or class names to a `.dropdown-menu` to automatically
 * accomodate the layout and the page scroll.
 *
 * @param self the `Dropdown` instance
 */
const styleDropdown = (self: Dropdown) => {
  const { element, menu, parentElement, options } = self;
  const { offset } = options;

  // don't apply any style on mobile view
  /* istanbul ignore else: this test requires a navbar */
  if (getElementStyle(menu, 'position') !== 'static') {
    const RTL = isRTL(element);
    // const menuStart = hasClass(menu, dropdownMenuStartClass);
    const menuEnd = hasClass(menu, dropdownMenuEndClass);

    // reset menu offset and position
    const resetProps = ['margin', 'top', 'bottom', 'left', 'right'];
    resetProps.forEach(p => {
      // menu.style[p] = '';
      const style: { [key: string]: string } = {};
      style[p] = '';
      setElementStyle(menu, style);
    });

    // set initial position class
    // take into account .btn-group parent as .dropdown
    // this requires navbar/btn-group/input-group
    let positionClass =
      dropdownClasses.find(c => hasClass(parentElement, c)) ||
      /* istanbul ignore next: fallback position */ dropdownString;

    const dropdownMargin: { [key: string]: number[] } = {
      dropdown: [offset, 0, 0],
      dropup: [0, 0, offset],
      dropstart: RTL ? [-1, 0, 0, offset] : [-1, offset, 0],
      dropend: RTL ? [-1, offset, 0] : [-1, 0, 0, offset],
    };

    const dropdownPosition: { [key: string]: Partial<CSS4Declaration> } = {
      dropdown: { top: '100%' },
      dropup: { top: 'auto', bottom: '100%' },
      dropstart: RTL ? { left: '100%', right: 'auto' } : { left: 'auto', right: '100%' },
      dropend: RTL ? { left: 'auto', right: '100%' } : { left: '100%', right: 'auto' },
      menuStart: RTL ? { right: '0', left: 'auto' } : { right: 'auto', left: '0' },
      menuEnd: RTL ? { right: 'auto', left: '0' } : { right: '0', left: 'auto' },
    };

    const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu;

    const { clientWidth, clientHeight } = getDocumentElement(element);
    const {
      left: targetLeft,
      top: targetTop,
      width: targetWidth,
      height: targetHeight,
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
    const leftExceed = ((!RTL && menuEnd) || (RTL && !menuEnd)) && targetLeft + targetWidth - menuWidth < 0;
    const rightExceed = ((RTL && menuEnd) || (!RTL && !menuEnd)) && targetLeft + menuWidth >= clientWidth;

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
        top: 'auto',
        bottom: 0,
      });
    }

    // override position for vertical classes
    if (verticalClass.includes(positionClass) && (leftExceed || rightExceed)) {
      // don't realign when menu is wider than window
      // in both RTL and non-RTL readability is KING
      let posAjust: { left: 'auto' | number; right: 'auto' | number } | undefined = { left: 'auto', right: 'auto' };
      if (!leftExceed && rightExceed && !RTL) posAjust = { left: 'auto', right: 0 };
      if (leftExceed && !rightExceed && RTL) posAjust = { left: 0, right: 'auto' };
      if (posAjust) ObjectAssign(dropdownPosition[positionClass], posAjust);
    }

    const margins: number[] = dropdownMargin[positionClass];
    setElementStyle(menu, {
      ...dropdownPosition[positionClass],
      margin: `${margins.map(x => (x ? `${x}px` : x)).join(' ')}`,
    });

    // override dropdown-menu-start | dropdown-menu-end
    if (verticalClass.includes(positionClass) && menuEnd) {
      /* istanbul ignore else */
      if (menuEnd) {
        const endAdjust =
          (!RTL && leftExceed) || (RTL && rightExceed) ? 'menuStart' : /* istanbul ignore next */ 'menuEnd';
        setElementStyle(menu, dropdownPosition[endAdjust]);
      }
    }
    // trigger updated event
    dispatchEvent(parentElement, updatedDropdownEvent);
  }
};

/**
 * Returns an `Array` of focusable items in the given dropdown-menu.
 *
 * @param menu the target menu
 * @returns all children of the dropdown menu
 */
const getMenuItems = (menu: HTMLElement) => {
  return [...menu.children]
    .map(c => {
      if (c && menuFocusTags.includes(c.tagName)) return c;
      const { firstElementChild } = c;
      if (firstElementChild && menuFocusTags.includes(firstElementChild.tagName)) {
        return firstElementChild;
      }
      return null;
    })
    .filter(c => c);
};

/**
 * Toggles on/off the listeners for the events that close the dropdown
 * as well as event that request a new position for the dropdown.
 *
 * @param {Dropdown} self the `Dropdown` instance
 */
const toggleDropdownDismiss = (self: Dropdown) => {
  const { element, options } = self;
  const action = self.open ? addListener : removeListener;
  const doc = getDocument(element);

  action(doc, mouseclickEvent, dropdownDismissHandler);
  action(doc, focusEvent, dropdownDismissHandler);
  action(doc, keydownEvent, dropdownPreventScroll);
  action(doc, keyupEvent, dropdownKeyHandler);

  /* istanbul ignore else */
  if (options.display === 'dynamic') {
    [scrollEvent, resizeEvent].forEach(ev => {
      action(getWindow(element), ev, dropdownLayoutHandler, passiveHandler);
    });
  }
};

/**
 * Returns the currently open `.dropdown` element.
 *
 * @param element target
 * @returns the query result
 */
const getCurrentOpenDropdown = (element: HTMLElement): HTMLElement | undefined => {
  const currentParent = [...dropdownClasses, 'btn-group', 'input-group']
    .map(c => getElementsByClassName(`${c} ${showClass}`, getDocument(element)))
    .find(x => x.length);

  if (currentParent && currentParent.length) {
    return [...(currentParent[0].children as HTMLCollectionOf<HTMLElement>)].find(x =>
      dropdownClasses.some(c => c === getAttribute(x, dataBsToggle)),
    );
  }
  return undefined;
};

// DROPDOWN EVENT HANDLERS
// =======================
/**
 * Handles the `click` event for the `Dropdown` instance.
 *
 * @param e event object
 */
const dropdownDismissHandler = (e: MouseEvent) => {
  const { target, type } = e;

  /* istanbul ignore else */
  if (target && isHTMLElement(target)) {
    // some weird FF bug #409
    const element = getCurrentOpenDropdown(target);
    const self = element && getDropdownInstance(element);

    /* istanbul ignore else */
    if (self) {
      const { parentElement, menu } = self;

      const isForm =
        parentElement &&
        parentElement.contains(target) &&
        (target.tagName === 'form' || closest(target, 'form') !== null);

      if ([mouseclickEvent, mousedownEvent].includes(type) && isEmptyAnchor(target)) {
        e.preventDefault();
      }

      /* istanbul ignore else */
      if (!isForm && type !== focusEvent && target !== element && target !== menu) {
        self.hide();
      }
    }
  }
};

/**
 * Handles `click` event listener for `Dropdown`.
 *
 * @param e event object
 */
const dropdownClickHandler = (e: MouseEvent) => {
  const { target } = e;
  const element = target && closest(target as HTMLElement, dropdownSelector);
  const self = element && getDropdownInstance(element);

  /* istanbul ignore else */
  if (self) {
    e.stopPropagation();
    self.toggle();
    /* istanbul ignore else */
    if (element && isEmptyAnchor(element)) e.preventDefault();
  }
};

/**
 * Prevents scroll when dropdown-menu is visible.
 *
 * @param e event object
 */
const dropdownPreventScroll = (e: KeyboardEvent) => {
  /* istanbul ignore else */
  if ([keyArrowDown, keyArrowUp].includes(e.code)) e.preventDefault();
};

/**
 * Handles keyboard `keydown` events for `Dropdown`.
 *
 * @param e keyboard key
 */
function dropdownKeyHandler(this: HTMLElement, e: KeyboardEvent) {
  const { code } = e;
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);
  const { activeElement } = (element && getDocument(element)) as Document;

  /* istanbul ignore else */
  if (self && activeElement) {
    const { menu, open } = self;
    const menuItems = getMenuItems(menu);

    // arrow up & down
    if (menuItems && menuItems.length && [keyArrowDown, keyArrowUp].includes(code)) {
      let idx = menuItems.indexOf(activeElement);
      /* istanbul ignore else */
      if (activeElement === element) {
        idx = 0;
      } else if (code === keyArrowUp) {
        idx = idx > 1 ? idx - 1 : 0;
      } else if (code === keyArrowDown) {
        idx = idx < menuItems.length - 1 ? idx + 1 : idx;
      }
      /* istanbul ignore else */
      if (menuItems[idx]) focus(menuItems[idx] as HTMLElement);
    }

    if (keyEscape === code && open) {
      self.toggle();
      focus(element);
    }
  }
}

/** Handles dropdown layout changes during resize / scroll. */
function dropdownLayoutHandler(this: HTMLElement) {
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);

  /* istanbul ignore else */
  if (self && self.open) styleDropdown(self);
}

// DROPDOWN DEFINITION
// ===================
/** Returns a new Dropdown instance. */
export default class Dropdown extends BaseComponent {
  static selector = dropdownSelector;
  static init = dropdownInitCallback;
  static getInstance = getDropdownInstance;
  declare options: DropdownOptions;
  declare open: boolean;
  declare parentElement: HTMLElement;
  declare menu: HTMLElement;

  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<DropdownOptions>) {
    super(target, config);

    // initialization element
    const { parentElement } = this.element;
    const [menu] = getElementsByClassName(dropdownMenuClass, parentElement as ParentNode);

    // invalidate when dropdown-menu is missing
    if (menu) {
      // set targets
      this.parentElement = parentElement as HTMLElement;
      this.menu = menu;

      // add event listener
      this._toggleEventListeners(true);
    }
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

  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    if (this.open) this.hide();
    else this.show();
  }

  /** Shows the dropdown menu to the user. */
  show() {
    const { element, open, menu, parentElement } = this;

    /* istanbul ignore else */
    if (!open) {
      const currentElement = getCurrentOpenDropdown(element);
      const currentInstance = currentElement && getDropdownInstance(currentElement);
      if (currentInstance) currentInstance.hide();

      // dispatch event
      [showDropdownEvent, shownDropdownEvent, updatedDropdownEvent].forEach(e => {
        e.relatedTarget = element;
      });

      dispatchEvent(parentElement, showDropdownEvent);
      if (!showDropdownEvent.defaultPrevented) {
        addClass(menu, showClass);
        addClass(parentElement, showClass);
        setAttribute(element, ariaExpanded, 'true');

        // change menu position
        styleDropdown(this);

        this.open = !open;

        focus(element); // focus the element
        toggleDropdownDismiss(this);
        dispatchEvent(parentElement, shownDropdownEvent);
      }
    }
  }

  /** Hides the dropdown menu from the user. */
  hide() {
    const { element, open, menu, parentElement } = this;

    /* istanbul ignore else */
    if (open) {
      [hideDropdownEvent, hiddenDropdownEvent].forEach(e => {
        e.relatedTarget = element;
      });

      dispatchEvent(parentElement, hideDropdownEvent);
      if (!hideDropdownEvent.defaultPrevented) {
        removeClass(menu, showClass);
        removeClass(parentElement, showClass);
        setAttribute(element, ariaExpanded, 'false');

        this.open = !open;
        // only re-attach handler if the instance is not disposed
        toggleDropdownDismiss(this);
        dispatchEvent(parentElement, hiddenDropdownEvent);
      }
    }
  }

  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (add?: boolean) => {
    const action = add ? addListener : removeListener;
    action(this.element, mouseclickEvent, dropdownClickHandler);
  };

  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    if (this.open) this.hide();

    this._toggleEventListeners();
    super.dispose();
  }
}
