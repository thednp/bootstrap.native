/* Native JavaScript for Bootstrap 5 | Tooltip
---------------------------------------------- */
import {
  ariaDescribedBy,
  focusoutEvent,
  focusinEvent,
  focusEvent,
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
  removePopup(tooltip as HTMLElement, container === offsetParent ? container : offsetParent);
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

  [scrollEvent, resizeEvent].forEach(ev => {
    action(getWindow(element), ev, self.update, passiveHandler);
  });
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
 */
const tooltipHiddenAction = (self: Tooltip) => {
  const { element, onHideComplete } = self;
  const hiddenTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`hidden.bs.${toLowerCase(self.name)}`);

  toggleTooltipAction(self);
  removeTooltip(self);
  dispatchEvent(element, hiddenTooltipEvent);
  if (isFunction(onHideComplete)) {
    onHideComplete();
    self.onHideComplete = undefined;
  }
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

  if (trigger.includes('manual')) return;

  self.enabled = !!add;

  const triggerOptions = trigger.split(' ');

  triggerOptions.forEach(tr => {
    /* istanbul ignore else */
    if (tr === mousehoverEvent) {
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
  const win = getWindow(element);
  const overflow = offsetHeight !== scrollHeight;
  const scrollTarget = container === offsetParent && overflow ? container : win;
  action(scrollTarget, resizeEvent, self.update, passiveHandler);
  action(scrollTarget, scrollEvent, self.update, passiveHandler);

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

  setAttribute(
    element,
    titleAtt[content ? 0 : 1],
    content || getAttribute(element, titleAtt[0]) || /* istanbul ignore next */ '',
  );
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
  declare onHideComplete?: () => void;

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
  /** Shows the tooltip. */
  show = () => this._show();
  _show() {
    const { options, tooltip, element, container, offsetParent, id } = this;
    const { animation } = options;
    const outTimer = Timer.get(element, 'out');
    const tipContainer = container === offsetParent ? container : offsetParent;

    Timer.clear(element, 'out');

    if (tooltip && !outTimer && !hasPopup(tooltip, tipContainer)) {
      Timer.set(
        element,
        () => {
          const showTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`show.bs.${toLowerCase(this.name)}`);
          dispatchEvent(element, showTooltipEvent);
          if (showTooltipEvent.defaultPrevented) return;

          // append to container
          appendPopup(tooltip, tipContainer);

          setAttribute(element, ariaDescribedBy, `#${id}`);

          this.update();
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

  /** Hides the tooltip. */
  hide = () => {
    const { options, tooltip, element, container, offsetParent } = this;
    const { animation, delay } = options;

    Timer.clear(element, 'in');

    /* istanbul ignore else */
    if (tooltip && hasPopup(tooltip, container === offsetParent ? container : offsetParent)) {
      Timer.set(
        element,
        () => {
          const hideTooltipEvent = createCustomEvent<TooltipEvent | PopoverEvent>(`hide.bs.${toLowerCase(this.name)}`);
          dispatchEvent(element, hideTooltipEvent);

          if (hideTooltipEvent.defaultPrevented) return;

          this.update();
          removeClass(tooltip, showClass);
          toggleTooltipOpenHandlers(this);

          /* istanbul ignore else */
          if (animation) emulateTransitionEnd(tooltip, () => tooltipHiddenAction(this));
          else tooltipHiddenAction(this);
        },
        delay + 17,
        'out',
      );
    }
  };

  /** Updates the tooltip position. */
  update = () => {
    styleTip<Tooltip>(this);
  };

  /** Toggles the tooltip visibility. */
  toggle = () => {
    const { tooltip, container, offsetParent } = this;

    if (tooltip && !hasPopup(tooltip, container === offsetParent ? container : offsetParent)) this.show();
    else this.hide();
  };

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
      if (tooltip && hasPopup(tooltip, container === offsetParent ? container : offsetParent) && animation) {
        this.onHideComplete = () => toggleTooltipHandlers(this);
        this.hide();
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
  handleTouch = ({ target }: TouchEvent) => {
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
  };

  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip, container, offsetParent, options } = this;
    const callback = () => disposeTooltipComplete(this, () => super.dispose());

    if (options.animation && tooltip && hasPopup(tooltip, container === offsetParent ? container : offsetParent)) {
      this.options.delay = 0; // reset delay
      this.onHideComplete = callback;
      this.hide();
    } else {
      callback();
    }
  }
}
