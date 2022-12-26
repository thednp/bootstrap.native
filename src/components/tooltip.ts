/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import {
  ariaDescribedBy,
  focusoutEvent,
  focusinEvent,
  focusEvent,
  mousemoveEvent,
  mouseleaveEvent,
  mouseenterEvent,
  mousedownEvent,
  mouseclickEvent,
  closest,
  getUID,
  getDocument,
  getWindow,
  removeAttribute,
  getAttribute,
  setAttribute,
  hasAttribute,
  touchstartEvent,
  resizeEvent,
  scrollEvent,
  mousehoverEvent,
  toLowerCase,
  focus,
  Timer,
  emulateTransitionEnd,
  passiveHandler,
  dispatchEvent,
  isApple,
  isMedia,
  isFunction,
  getInstance,
  ObjectAssign,
  createCustomEvent,
  removeClass,
  hasClass,
  addClass,
  getElementStyle,
} from '@thednp/shorty';

import { addListener, removeListener } from '@thednp/event-listener';

import dataBsToggle from '../strings/dataBsToggle';
import dataOriginalTitle from '../strings/dataOriginalTitle';
import showClass from '../strings/showClass';
import tooltipString from '../strings/tooltipString';
import tooltipComponent from '../strings/tooltipComponent';
import popoverString from '../strings/popoverString';
import popoverComponent from '../strings/popoverComponent';
import modalString from '../strings/modalString';
import offcanvasString from '../strings/offcanvasString';

import styleTip from '../util/styleTip';
import createTip from '../util/createTip';
import { appendPopup, removePopup, hasPopup } from '../util/popupContainer';
import getElementContainer from '../util/getElementContainer';
import tooltipDefaults from '../util/tooltipDefaults';
import BaseComponent from './base-component';
import { TooltipOptions, TooltipEvent } from '../interface/tooltip';
import { PopoverOptions, PopoverEvent } from '../interface/popover';

// TOOLTIP PRIVATE GC
// ==================
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = 'title';

/**
 * Static method which returns an existing `Tooltip` instance associated
 * to a target `Element`.
 *
 */
let getTooltipInstance = (element: HTMLElement) => getInstance<Tooltip>(element, tooltipComponent);

/**
 * A `Tooltip` initialization callback.
 */
const tooltipInitCallback = (element: HTMLElement) => new Tooltip(element);

// TOOLTIP PRIVATE METHODS
// =======================
/**
 * Removes the tooltip from the DOM.
 *
 * @param self the `Tooltip` instance
 */
const removeTooltip = (self: Tooltip) => {
  const { element, tooltip, container, offsetParent } = self;
  removeAttribute(element, ariaDescribedBy);
  removePopup(tooltip, container === offsetParent ? container : undefined);
};

/**
 * Executes after the instance has been disposed.
 *
 * @param self the `Tooltip` instance
 * @param callback the parent dispose callback
 */
const disposeTooltipComplete = (self: Tooltip, callback?: () => void) => {
  const { element } = self;
  toggleTooltipHandlers(self);

  /* istanbul ignore else */
  if (hasAttribute(element, dataOriginalTitle) && self.name === tooltipComponent) {
    toggleTooltipTitle(self);
  }
  /* istanbul ignore else */
  if (callback) callback();
};

/**
 * Toggles on/off the special `Tooltip` event listeners.
 *
 * @param self the `Tooltip` instance
 * @param add when `true`, event listeners are added
 */
const toggleTooltipAction = (self: Tooltip, add?: boolean) => {
  const action = add ? addListener : removeListener;
  const { element } = self;

  action(getDocument(element), touchstartEvent, self.handleTouch as EventListener, passiveHandler);

  /* istanbul ignore else */
  if (!isMedia(element)) {
    [scrollEvent, resizeEvent].forEach(ev => {
      action(getWindow(element), ev, self.update, passiveHandler);
    });
  }
};

/**
 * Executes after the tooltip was shown to the user.
 *
 * @param self the `Tooltip` instance
 */
const tooltipShownAction = (self: Tooltip) => {
  const { element } = self;
  const shownTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`shown.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self, true);
  dispatchEvent(element, shownTooltipEvent);
  Timer.clear(element, 'in');
};

/**
 * Executes after the tooltip was hidden to the user.
 *
 * @param self the `Tooltip` instance
 * @param callback the dispose callback
 */
const tooltipHiddenAction = (self: Tooltip, callback?: () => any) => {
  const { element } = self;
  const hiddenTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`hidden.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self);
  removeTooltip(self);
  dispatchEvent(element, hiddenTooltipEvent);
  if (isFunction(callback)) callback();
  Timer.clear(element, 'out');
};

/**
 * Toggles on/off the `Tooltip` event listeners.
 *
 * @param self the `Tooltip` instance
 * @param add when `true`, event listeners are added
 */
const toggleTooltipHandlers = (self: Tooltip, add?: boolean) => {
  const action = add ? addListener : removeListener;
  // btn is only for dismissible popover
  const { element, options, btn } = self;
  const { trigger } = options;
  const isPopover = self.name !== tooltipComponent;
  const dismissible = isPopover && (options as PopoverOptions).dismissible ? true : false;

  if (trigger?.includes('manual')) return;

  self.enabled = !!add;

  const triggerOptions = trigger?.split(' ');
  const elemIsMedia = isMedia(element);

  if (elemIsMedia) {
    action(element, mousemoveEvent, self.update, passiveHandler);
  }

  triggerOptions?.forEach(tr => {
    /* istanbul ignore else */
    if (elemIsMedia || tr === mousehoverEvent) {
      action(element, mousedownEvent, self.show);
      action(element, mouseenterEvent, self.show);

      /* istanbul ignore else */
      if (dismissible && btn) {
        action(btn, mouseclickEvent, self.hide);
      } else {
        action(element, mouseleaveEvent, self.hide);
        action(getDocument(element), touchstartEvent, self.handleTouch as EventListener, passiveHandler);
      }
    } else if (tr === mouseclickEvent) {
      action(element, tr, !dismissible ? self.toggle : self.show);
    } else if (tr === focusEvent) {
      action(element, focusinEvent, self.show);
      /* istanbul ignore else */
      if (!dismissible) action(element, focusoutEvent, self.hide);
      /* istanbul ignore else */
      if (isApple) {
        action(element, mouseclickEvent, () => focus(element));
      }
    }
  });
};

/**
 * Toggles on/off the `Tooltip` event listeners that hide/update the tooltip.
 *
 * @param self the `Tooltip` instance
 * @param add when `true`, event listeners are added
 */
const toggleTooltipOpenHandlers = (self: Tooltip, add?: boolean) => {
  const action = add ? addListener : removeListener;
  const { element, container, offsetParent } = self;
  const { offsetHeight, scrollHeight } = container as HTMLElement;
  const parentModal = closest(element, `.${modalString}`);
  const parentOffcanvas = closest(element, `.${offcanvasString}`);

  /* istanbul ignore else */
  if (!isMedia(element)) {
    const win = getWindow(element);
    const overflow = offsetHeight !== scrollHeight;
    const scrollTarget = overflow && container === offsetParent ? container : win;
    action(scrollTarget, resizeEvent, self.update, passiveHandler);
    action(scrollTarget, scrollEvent, self.update, passiveHandler);
  }

  // dismiss tooltips inside modal / offcanvas
  if (parentModal) action(parentModal, `hide.bs.${modalString}`, self.hide);
  if (parentOffcanvas) action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.hide);
};

/**
 * Toggles the `title` and `data-original-title` attributes.
 *
 * @param self the `Tooltip` instance
 * @param content when `true`, event listeners are added
 */
const toggleTooltipTitle = (self: Tooltip, content?: string) => {
  // [0 - add, 1 - remove] | [0 - remove, 1 - add]
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;

  setAttribute(element, titleAtt[content ? 0 : 1], content || getAttribute(element, titleAtt[0]) || '');
  removeAttribute(element, titleAtt[content ? 1 : 0]);
};

// TOOLTIP DEFINITION
// ==================
/** Creates a new `Tooltip` instance. */
export default class Tooltip extends BaseComponent {
  static selector = tooltipSelector;
  static init = tooltipInitCallback;
  static getInstance = getTooltipInstance;
  static styleTip = styleTip;
  declare options: TooltipOptions;
  declare btn?: HTMLElement;
  declare tooltip?: HTMLElement;
  declare container: ParentNode;
  declare arrow?: HTMLElement;
  declare offsetParent?: HTMLElement;
  declare enabled: boolean;
  declare id: string;

  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target: HTMLElement | string, config?: Partial<TooltipOptions>) {
    super(target, config);

    const { element } = this;
    const isTooltip = this.name === tooltipComponent;
    const tipString = isTooltip ? tooltipString : popoverString;
    const tipComponent = isTooltip ? tooltipComponent : popoverComponent;

    /* istanbul ignore next: this is to set Popover too */
    getTooltipInstance = <T extends Tooltip>(elem: HTMLElement) => getInstance<T>(elem, tipComponent);

    // additional properties
    this.enabled = true;
    /** Set unique ID for `aria-describedby`. */
    this.id = `${tipString}-${getUID(element, tipString)}`;

    // instance options
    const { options } = this;

    // invalidate
    if ((!options.title && isTooltip) || (!isTooltip && !options.content)) {
      // throw Error(`${this.name} Error: target has no content set.`);
      return;
    }

    // reset default options
    ObjectAssign(tooltipDefaults, { titleAttr: '' });

    // all functions bind
    this.handleTouch = this.handleTouch.bind(this);
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);

    // set title attributes and add event listeners
    /* istanbul ignore else */
    if (hasAttribute(element, titleAttr) && isTooltip && typeof options.title === 'string') {
      toggleTooltipTitle(this, options.title);
    }

    // set containers
    this.container = getElementContainer(element);
    this.offsetParent = ['sticky', 'fixed'].some(
      position => getElementStyle(this.container as HTMLElement, 'position') === position,
    )
      ? (this.container as HTMLElement)
      : getDocument(this.element).body;

    // create tooltip here
    createTip(this);

    // attach events
    toggleTooltipHandlers(this, true);
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

  // TOOLTIP PUBLIC METHODS
  // ======================
  /**
   * Shows the tooltip.
   *
   * @param e the `Event` object
   */
  show(e?: Event) {
    const { options, tooltip, element, container, offsetParent, id } = this;
    const { animation } = options;
    const outTimer = Timer.get(element, 'out');

    Timer.clear(element, 'out');

    if (tooltip && !outTimer && !hasPopup(tooltip, container === offsetParent ? container : undefined)) {
      Timer.set(
        element,
        () => {
          const showTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`show.bs.${toLowerCase(this.name)}`);
          dispatchEvent(element, showTooltipEvent);
          if (showTooltipEvent.defaultPrevented) return;

          // append to container
          appendPopup(tooltip, container === offsetParent ? container : undefined);

          setAttribute(element, ariaDescribedBy, `#${id}`);

          this.update(e);
          toggleTooltipOpenHandlers(this, true);

          /* istanbul ignore else */
          if (!hasClass(tooltip, showClass)) addClass(tooltip, showClass);
          /* istanbul ignore else */
          if (animation) emulateTransitionEnd(tooltip, () => tooltipShownAction(this));
          else tooltipShownAction(this);
        },
        17,
        'in',
      );
    }
  }

  /**
   * Hides the tooltip.
   *
   * @param e the dispose callback
   * @param callback the dispose callback
   */
  hide(e?: Event, callback?: () => void) {
    const { options, tooltip, element, container, offsetParent } = this;
    const { animation, delay } = options;

    Timer.clear(element, 'in');

    /* istanbul ignore else */
    if (tooltip && hasPopup(tooltip, container === offsetParent ? container : undefined)) {
      Timer.set(
        element,
        () => {
          const hideTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`hide.bs.${toLowerCase(this.name)}`);
          dispatchEvent(element, hideTooltipEvent);

          if (hideTooltipEvent.defaultPrevented) return;

          this.update(e); // use Event
          removeClass(tooltip, showClass);
          toggleTooltipOpenHandlers(this);

          /* istanbul ignore else */
          if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(this, callback));
          else tooltipHiddenAction(this, callback);
        },
        delay + 17,
        'out',
      );
    }
  }

  /**
   * Updates the tooltip position.
   *
   * @param e the `Event` object
   */
  update(e?: Event) {
    styleTip<Tooltip>(this, e as (Event & PointerEvent) | undefined);
  }

  /**
   * Toggles the tooltip visibility.
   *
   * @param e the `Event` object
   */
  toggle(e?: Event) {
    const { tooltip, container, offsetParent } = this;

    if (tooltip && !hasPopup(tooltip, container === offsetParent ? container : undefined)) this.show(e);
    else this.hide();
  }

  /** Enables the tooltip. */
  enable() {
    const { enabled } = this;
    /* istanbul ignore else */
    if (!enabled) {
      toggleTooltipHandlers(this, true);
      this.enabled = !enabled;
    }
  }

  /** Disables the tooltip. */
  disable() {
    const { tooltip, container, offsetParent, options, enabled } = this;
    const { animation } = options;
    /* istanbul ignore else */
    if (enabled) {
      if (tooltip && hasPopup(tooltip, container === offsetParent ? container : undefined) && animation) {
        this.hide(undefined, () => toggleTooltipHandlers(this));
      } else {
        toggleTooltipHandlers(this);
      }
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
  handleTouch({ target }: TouchEvent) {
    const { tooltip, element } = this;

    /* istanbul ignore next */
    if (
      (tooltip && tooltip.contains(target as HTMLElement)) ||
      target === element ||
      (target && element.contains(target as HTMLElement))
    ) {
      // smile for ESLint
    } else {
      this.hide();
    }
  }

  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip, container, offsetParent, options } = this;
    const callback = () => disposeTooltipComplete(this, () => super.dispose());

    if (options.animation && tooltip && hasPopup(tooltip, container === offsetParent ? container : undefined)) {
      this.options.delay = 0; // reset delay
      this.hide(undefined, callback);
    } else {
      callback();
    }
  }
}
