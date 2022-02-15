/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

import querySelector from 'shorter-js/src/selectors/querySelector';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import Data from 'shorter-js/src/misc/data';
import {getInstance as getBaseInstance} from 'shorter-js/src/misc/data';
import ObjectKeys from 'shorter-js/src/misc/ObjectKeys';

import Version from '../version';

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

  /** @static */
  static getInstance(element) {
    return getBaseInstance(element, this.name)
  }

  /** @static */
  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null)
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
