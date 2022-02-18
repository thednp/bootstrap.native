/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

import querySelector from 'shorter-js/src/selectors/querySelector';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import Data from 'shorter-js/src/misc/data';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import ObjectKeys from 'shorter-js/src/misc/ObjectKeys';
import Version from '../version';

/**
 * Static method which returns an existing `BaseComponent` instance associated
 * to a target `Element` or create it.
 *
 * @type {BSN.GetInstance<BaseComponent>}
 */
 const getOrCreateInstance = function (element, config = {}) {
  return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
}

/** Returns a new `BaseComponent` instance. */
export default class BaseComponent {
  /**
   * @param {HTMLElement | Element | string} target `Element` or selector string
   * @param {BSN.ComponentOptions=} config component instance options
   */
  constructor(target, config) {
    const self = this;
    const element = querySelector(target);

    if (!element) {
      throw Error(`${self.name} Error: "${target}" is not a valid selector.`);
    }

    /** @static @type {BSN.ComponentOptions} */
    self.options = {};

    const prevInstance = Data.get(element, self.name);
    if (prevInstance) prevInstance.dispose();

    /** @type {HTMLElement | Element} */
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
      self.options = normalizeOptions(element, self.defaults, (config || {}), 'bs');
    }

    Data.set(element, self.name, self);
  }

  /* eslint-disable */
  /** @static */
  get version() { return Version; }
  /* eslint-enable */

  /** @static */
  get name() { return this.constructor.name; }

  /** @static */
  // @ts-ignore
  get defaults() { return this.constructor.defaults; }

  /**
   * Removes component from target element;
   */
  dispose() {
    const self = this;
    Data.remove(self.element, self.name);
    // @ts-ignore
    ObjectKeys(self).forEach((prop) => { self[prop] = null; });
  }
}

ObjectAssign(BaseComponent, {
  getOrCreateInstance: getOrCreateInstance
});
