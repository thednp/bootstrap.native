/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */
import { focus, getInstance, ObjectAssign } from "@thednp/shorty";

import dataBsToggle from "~/strings/dataBsToggle";
import popoverString from "~/strings/popoverString";
import popoverComponent from "~/strings/popoverComponent";

import getTipTemplate from "~/util/getTipTemplate";
import styleTip from "~/util/styleTip";
import tooltipDefaults from "~/util/tooltipDefaults";
import Tooltip from "./tooltip";

import type { PopoverOptions /* , PopoverEvent */ } from "~/interface/popover";

// POPOVER PRIVATE GC
// ==================
const popoverSelector =
  `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;

const popoverDefaults: PopoverOptions = ObjectAssign({}, tooltipDefaults, {
  template: getTipTemplate(popoverString),
  content: "",
  dismissible: false,
  btnClose:
    '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>',
});

/**
 * Static method which returns an existing `Popover` instance associated
 * to a target `Element`.
 */
const getPopoverInstance = (element: Element) =>
  getInstance<Popover>(element, popoverComponent);

/**
 * A `Popover` initialization callback.
 */
const popoverInitCallback = (element: Element) => new Popover(element);

// POPOVER DEFINITION
// ==================
/** Returns a new `Popover` instance. */
export default class Popover extends Tooltip {
  static selector = popoverSelector;
  static init = popoverInitCallback;
  static getInstance = getPopoverInstance;
  static styleTip = styleTip;
  declare options: PopoverOptions;

  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target: Element | string, config?: Partial<PopoverOptions>) {
    super(target, config);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return popoverComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return popoverDefaults;
  }

  /* extend original `show()` */
  show = () => {
    super.show();
    // btn only exists within dismissible popover
    const { options, btn } = this;
    // istanbul ignore else @preserve
    if (options.dismissible && btn) setTimeout(() => focus(btn), 17);
  };
}
