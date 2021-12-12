/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */

import queryElement from 'shorter-js/src/misc/queryElement';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import Data, { getInstance } from 'shorter-js/src/misc/data';

import Version from '../version';

/**
 * Returns a new `BaseComponent` instance.
 */
export default class BaseComponent {
  /**
   * @param {Element | string} target Element or selector string
   * @param {BSN.ComponentOptions?} config
   */
  constructor(target, config) {
    const self = this;
    const element = queryElement(target);

    if (!element) return;

    const prevInstance = getInstance(element, self.name);
    if (prevInstance) prevInstance.dispose();

    /** @private */
    self.element = element;

    if (self.defaults && Object.keys(self.defaults).length) {
      /** @private */
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
  get defaults() { return this.constructor.defaults; }

  /**
   * Removes component from target element;
   */
  dispose() {
    const self = this;
    Data.remove(self.element, self.name);
    Object.keys(self).forEach((prop) => { self[prop] = null; });
  }
}
