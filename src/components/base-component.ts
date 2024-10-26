/* Native JavaScript for Bootstrap 5 | Base Component
----------------------------------------------------- */
import {
  Data,
  isHTMLElement,
  isString,
  normalizeOptions,
  ObjectKeys,
  querySelector,
} from "@thednp/shorty";

import type { BaseOptions } from "../interface/baseComponent";
import Version from "../version";

/** Returns a new `BaseComponent` instance. */
export default class BaseComponent {
  declare element: HTMLElement;
  declare options?: BaseOptions;

  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(target: HTMLElement | string, config?: BaseOptions) {
    let element: HTMLElement | null;

    try {
      if (isHTMLElement(target)) {
        element = target;
      } else if (isString(target)) {
        element = querySelector<HTMLElement>(target);
        // istanbul ignore else @preserve
        if (!element) throw Error(`"${target}" is not a valid selector.`);
      } else {
        throw Error(`your target is not an instance of HTMLElement.`);
      }
    } catch (e) {
      throw Error(`${this.name} Error: ${(e as Error).message}`);
    }

    const prevInstance = Data.get<typeof this>(element, this.name);
    // istanbul ignore else @preserve
    if (prevInstance) {
      // remove previously attached event listeners
      // to avoid memory leaks
      prevInstance._toggleEventListeners();
    }

    this.element = element;
    this.options = this.defaults && ObjectKeys(this.defaults).length
      ? normalizeOptions(element, this.defaults, config || {}, "bs")
      // istanbul ignore next @preserve
      : {};

    Data.set(element, this.name, this);
  }

  // istanbul ignore next @preserve
  get version() {
    return Version;
  }

  // istanbul ignore next @preserve
  get name() {
    return "BaseComponent";
  }

  // istanbul ignore next @preserve
  get defaults() {
    return {};
  }

  /** just to have something to extend from */
  // istanbul ignore next @preserve coverage wise this isn't important
  _toggleEventListeners = () => {
    // do something to please linters
  };

  /** Removes component from target element. */
  dispose() {
    Data.remove<typeof this>(this.element, this.name);
    ObjectKeys(this).forEach((prop) => {
      delete this[prop];
    });
  }
}
