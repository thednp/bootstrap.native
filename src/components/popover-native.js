/* Native JavaScript for Bootstrap 5 | Popover
---------------------------------------------- */
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import focus from '@thednp/shorty/src/misc/focus';
import { getInstance } from '@thednp/shorty/src/misc/data';

import dataBsToggle from '../strings/dataBsToggle';
import popoverString from '../strings/popoverString';
import popoverComponent from '../strings/popoverComponent';

import getTipTemplate from '../util/getTipTemplate';
import styleTip from '../util/styleTip';
import tooltipDefaults from '../util/tooltipDefaults';
import Tooltip from './tooltip-native';

// POPOVER PRIVATE GC
// ==================
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;

const popoverDefaults = {
  ...tooltipDefaults,
  /** @type {string} */
  template: getTipTemplate(popoverString),
  /** @type {string} */
  btnClose: '<button class="btn-close" aria-label="Close"></button>',
  /** @type {boolean} */
  dismissible: false,
  /** @type {string?} */
  content: null,
};

// POPOVER DEFINITION
// ==================
/** Returns a new `Popover` instance. */
export default class Popover extends Tooltip {
  /* eslint-disable -- we want to specify Popover Options */
  /**
   * @param {HTMLElement | string} target the target element
   * @param {BSN.Options.Popover=} config the instance options
   */
  constructor(target, config) {
    super(target, config);
  }
  /**
   * Returns component name string.
   * @readonly @static
   */ 
  get name() { return popoverComponent; }
  /**
   * Returns component default options.
   * @readonly @static
   */
  get defaults() { return popoverDefaults; }
  /* eslint-enable */

  /* extend original `show()` */
  show() {
    super.show();
    // btn only exists within dismissible popover
    const { options, btn } = this;
    /* istanbul ignore else */
    if (options.dismissible && btn) setTimeout(() => focus(btn), 17);
  }
}

/**
 * Static method which returns an existing `Popover` instance associated
 * to a target `Element`.
 *
 * @type {BSN.GetInstance<Popover>}
 */
const getPopoverInstance = (element) => getInstance(element, popoverComponent);

/**
 * A `Popover` initialization callback.
 * @type {BSN.InitCallback<Popover>}
 */
const popoverInitCallback = (element) => new Popover(element);

ObjectAssign(Popover, {
  selector: popoverSelector,
  init: popoverInitCallback,
  getInstance: getPopoverInstance,
  styleTip,
});
