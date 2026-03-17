/*!
* Bootstrap Native Carousel v5.1.7 (https://thednp.github.io/bootstrap.native/)
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
//#region src/interface/carousel.d.ts
interface CarouselOptions extends BaseOptions {
  pause: boolean | "hover";
  keyboard: boolean;
  touch: boolean;
  interval: number | boolean;
}
//#endregion
//#region src/components/carousel.d.ts
/** Creates a new `Carousel` instance. */
declare class Carousel extends BaseComponent {
  static selector: string;
  static init: (element: Element) => Carousel;
  static getInstance: (element: Element) => Carousel | null;
  element: HTMLElement;
  options: CarouselOptions;
  direction: "right" | "left";
  index: number;
  isTouch: boolean;
  slides: HTMLCollectionOf<HTMLElement>;
  controls: HTMLElement[];
  indicator: HTMLElement | null;
  indicators: HTMLElement[];
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(target: Element | string, config?: Partial<CarouselOptions>);
  /**
   * Returns component name string.
   */
  get name(): string;
  /**
   * Returns component default options.
   */
  get defaults(): CarouselOptions;
  /**
   * Check if instance is paused.
   */
  get isPaused(): boolean;
  /**
   * Check if instance is animating.
   */
  get isAnimating(): boolean;
  /** Slide automatically through items. */
  cycle(): void;
  /** Pause the automatic cycle. */
  pause(): void;
  /** Slide to the next item. */
  next(): void;
  /** Slide to the previous item. */
  prev(): void;
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(idx: number): void;
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners: (add?: boolean) => void;
  /** Remove `Carousel` component from target. */
  dispose(): void;
}
//#endregion
export { Carousel as default };
//# sourceMappingURL=carousel.d.mts.map