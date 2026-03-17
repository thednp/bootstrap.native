/*!
* Bootstrap Native Tab v5.1.8 (https://thednp.github.io/bootstrap.native/)
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
//#region src/components/tab.d.ts
/** Creates a new `Tab` instance. */
declare class Tab extends BaseComponent {
  static selector: string;
  static init: (element: Element) => Tab;
  static getInstance: (element: Element) => Tab | null;
  element: HTMLElement;
  nav: HTMLElement | null;
  content: HTMLElement | null;
  tabContent: HTMLElement | null;
  nextContent: HTMLElement | null;
  dropdown: HTMLElement | null;
  /** @param target the target element */
  constructor(target: Element | string);
  /**
   * Returns component name string.
   */
  get name(): string;
  /** Shows the tab to the user. */
  show(): void;
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners: (add?: boolean) => void;
  /** Removes the `Tab` component from the target element. */
  dispose(): void;
}
//#endregion
export { Tab as default };
//# sourceMappingURL=tab.d.mts.map