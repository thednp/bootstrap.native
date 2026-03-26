/*!
* Bootstrap Native Collapse v5.1.10 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

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
//#region src/interface/collapse.d.ts
interface CollapseOptions extends BaseOptions {
  parent: string | HTMLElement | null;
}
//#endregion
//#region src/components/collapse.d.ts
/** Returns a new `Colapse` instance. */
declare class Collapse extends BaseComponent {
  static selector: string;
  static init: (element: Element) => Collapse;
  static getInstance: (element: Element) => Collapse | null;
  element: HTMLElement;
  options: CollapseOptions;
  parent: Element | null;
  triggers: Element[];
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(target: Element | string, config?: Partial<CollapseOptions>);
  /**
   * Returns component name string.
   */
  get name(): string;
  /**
   * Returns component default options.
   */
  get defaults(): {
    parent: null;
  };
  /** Hides the collapse. */
  hide(): void;
  /** Shows the collapse. */
  show(): void;
  /** Toggles the visibility of the collapse. */
  toggle(): void;
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners: (add?: boolean) => void;
  /** Remove the `Collapse` component from the target `Element`. */
  dispose(): void;
}
//#endregion
export { Collapse as default };
//# sourceMappingURL=collapse.d.mts.map