/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

import queryElement from 'shorter-js/src/misc/queryElement';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import Data from 'shorter-js/src/misc/data';
import isElement from 'shorter-js/src/misc/isElement';

import Version from '../version';

/**
 * Returns a new `BaseComponent` instance.
 */
export default class BaseComponent {
  /**
   * @param {Element | string} target Element or selector string
   * @param {BSN.ComponentOptions=} config component instance options
   */
  constructor(target, config) {
    const self = this;
    const element = queryElement(target);

    if (!isElement(element)) {
      throw TypeError(`${self.name} Error: "${target}" not a valid selector.`);
    }

    /** @type {BSN.ComponentOptions} */
    self.options = {};

    // @ts-ignore
    const prevInstance = Data.get(element, self.name);
    if (prevInstance) prevInstance.dispose();

    /** @type {Element} */
    // @ts-ignore
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
      /** @static @type {Record<string, any>} */
      // @ts-ignore
      self.options = normalizeOptions(element, self.defaults, (config || {}), 'bs');
    }

    // @ts-ignore
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
    // @ts-ignore
    Data.remove(self.element, self.name);
    // @ts-ignore
    Object.keys(self).forEach((prop) => { self[prop] = null; });
  }
}
