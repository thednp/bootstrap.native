/*!
* Bootstrap Native Dropdown v5.1.10 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import PositionObserver from "@thednp/position-observer";

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
//#region src/interface/dropdown.d.ts
interface DropdownOptions extends BaseOptions {
  offset: number;
  display: string | "dynamic" | "static";
}
//#endregion
//#region src/components/dropdown.d.ts
/** Returns a new Dropdown instance. */
declare class Dropdown extends BaseComponent {
  static selector: string;
  static init: (element: Element) => Dropdown;
  static getInstance: (element: Element) => Dropdown | null;
  element: HTMLElement;
  options: DropdownOptions;
  open: boolean;
  parentElement: HTMLElement;
  menu: HTMLElement;
  _observer: PositionObserver;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(target: Element | string, config?: Partial<DropdownOptions>);
  /**
   * Returns component name string.
   */
  get name(): string;
  /**
   * Returns component default options.
   */
  get defaults(): {
    offset: number;
    display: string;
  };
  /** Shows/hides the dropdown menu to the user. */
  toggle(): void;
  /** Shows the dropdown menu to the user. */
  show(): void;
  /** Hides the dropdown menu from the user. */
  hide(): void;
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners: (add?: boolean) => void;
  /** Removes the `Dropdown` component from the target element. */
  dispose(): void;
}
//#endregion
export { Dropdown as default };
//# sourceMappingURL=dropdown.d.mts.map