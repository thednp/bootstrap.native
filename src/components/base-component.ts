/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */
import { querySelector, normalizeOptions, Data, ObjectKeys, isString } from '@thednp/shorty';

import type { BaseOptions } from '../interface/baseComponent';
import Version from '../version';

/** Returns a new `BaseComponent` instance. */
export default class BaseComponent {
  declare element: HTMLElement;
  declare options?: BaseOptions;

  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(target: HTMLElement | string, config?: BaseOptions) {
    const element = querySelector(target);

    if (!element) {
      if (isString(target)) {
        throw Error(`${this.name} Error: "${target}" is not a valid selector.`);
      } else {
        throw Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
      }
    }

    const prevInstance = Data.get<typeof this>(element, this.name);
    /* istanbul ignore else */
    if (prevInstance) {
      // remove previously attached event listeners
      // to avoid memory leaks
      prevInstance._toggleEventListeners();
    }

    this.element = element;
    this.options =
      this.defaults && ObjectKeys(this.defaults).length
        ? normalizeOptions(element, this.defaults, config || {}, 'bs')
        : {};

    Data.set(element, this.name, this);
  }

  /* istanbul ignore next */
  get version() {
    return Version;
  }

  /* istanbul ignore next */
  get name() {
    return 'BaseComponent';
  }

  /* istanbul ignore next */
  get defaults() {
    return {};
  }

  /** just to have something to extend from */
  _toggleEventListeners = () => {
    // do something to please linters
  };

  /** Removes component from target element. */
  dispose() {
    Data.remove<typeof this>(this.element, this.name);
    ObjectKeys(this).forEach(prop => {
      delete this[prop];
    });
  }
}
