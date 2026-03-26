/*!
* Bootstrap Native Button v5.1.10 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import { PointerEvent } from "@thednp/shorty";

//#region src/interface/baseComponent.d.ts
interface BaseOptions {
  [key: string]: unknown;
}
//#endregion
//#region src/components/base-component.d.ts
/** Returns a new `BaseComponent` instance. */
declare class BaseComponent {
  element: Element;
  options?: BaseOptions;
  /**
   * @param target `Element` or selector string
   * @param config component instance options
   */
  constructor(target: Element | string, config?: BaseOptions);
  get version(): string;
  get name(): string;
  get defaults(): {};
  /** just to have something to extend from */
  _toggleEventListeners: () => void;
  /** Removes component from target element. */
  dispose(): void;
}
//#endregion
//#region src/components/button.d.ts
/** Creates a new `Button` instance. */
declare class Button extends BaseComponent {
  static selector: string;
  static init: (element: Element) => Button;
  static getInstance: (element: Element) => Button | null;
  isActive: boolean;
  element: HTMLElement;
  /**
   * @param target usually a `.btn` element
   */
  constructor(target: Element | string);
  /**
   * Returns component name string.
   */
  get name(): string;
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle: (e?: PointerEvent<HTMLElement>) => void;
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners: (add?: boolean) => void;
  /** Removes the `Button` component from the target element. */
  dispose(): void;
}
//#endregion
export { Button as default };
//# sourceMappingURL=button.d.mts.map