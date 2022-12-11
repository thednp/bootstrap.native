/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */
import { querySelector, normalizeOptions, Data, ObjectKeys, isString } from '@thednp/shorty';

import type { BaseOptions } from '../interface/baseComponent';
import Version from '../version';

/** Returns a new `BaseComponent` instance. */
export default class BaseComponent {
  element: HTMLElement;
  options?: BaseOptions;

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

    const prevInstance = Data.get<this>(element, this.name);
    if (prevInstance) prevInstance.dispose();

    this.element = element;

    /* istanbul ignore else */
    if (this.defaults && ObjectKeys(this.defaults).length) {
      this.options = normalizeOptions(element, this.defaults, config || {}, 'bs');
    }

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

  /**
   * Removes component from target element;
   */
  dispose() {
    Data.remove(this.element, this.name);
    ObjectKeys(this).forEach(prop => {
      delete this[prop];
    });
  }
}
