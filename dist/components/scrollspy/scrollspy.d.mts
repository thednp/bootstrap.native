/*!
* Bootstrap Native Scrollspy v5.1.8 (https://thednp.github.io/bootstrap.native/)
* Copyright 2026 © thednp
* Licensed under MIT (https://github.com/thednp/bootstrap.native/blob/master/LICENSE)
*/
"use strict";

import { MouseEvent } from "@thednp/shorty";
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
//#region src/interface/scrollspy.d.ts
interface ScrollSpyOptions extends BaseOptions {
  offset: number;
  target: HTMLElement | string;
  threshold: number | number[];
  rootMargin: string;
}
//#endregion
//#region src/components/scrollspy.d.ts
/** Returns a new `ScrollSpy` instance. */
declare class ScrollSpy extends BaseComponent {
  static selector: string;
  static init: (element: Element) => ScrollSpy;
  static getInstance: (element: Element) => ScrollSpy | null;
  element: HTMLElement;
  options: ScrollSpyOptions;
  target: HTMLElement;
  scrollTarget: HTMLElement;
  _itemsLength: number;
  _activeItem: HTMLElement | null;
  _observables: Map<HTMLElement, HTMLElement>;
  _observer: PositionObserver;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target: Element | string, config?: Partial<ScrollSpyOptions>);
  /**
   * Returns component name string.
   */
  get name(): string;
  /**
   * Returns component default options.
   */
  get defaults(): Partial<ScrollSpyOptions>;
  /** Updates all items. */
  refresh: () => void;
  /**
   * This method provides an event handle
   * for scrollspy
   * @param e the event listener object
   */
  _scrollTo: (e: MouseEvent<HTMLAnchorElement>) => void;
  /**
   * Toggles on/off the component observer.
   *
   * @param self the ScrollSpy instance
   * @param add when `true`, listener is added
   */
  _toggleEventListeners: (add?: boolean) => void;
  /** Removes `ScrollSpy` from the target element. */
  dispose(): void;
}
//#endregion
export { ScrollSpy as default };
//# sourceMappingURL=scrollspy.d.mts.map