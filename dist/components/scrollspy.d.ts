import { default as default_2 } from '@thednp/position-observer';

/** Returns a new `BaseComponent` instance. */
declare class BaseComponent {
    element: HTMLElement;
    options?: BaseOptions;
    /**
     * @param target `HTMLElement` or selector string
     * @param config component instance options
     */
    constructor(target: HTMLElement | string, config?: BaseOptions);
    get version(): string;
    get name(): string;
    get defaults(): {};
    /** just to have something to extend from */
    _toggleEventListeners: () => void;
    /** Removes component from target element. */
    dispose(): void;
}

declare interface BaseOptions {
    [key: string]: unknown;
}

/** Returns a new `ScrollSpy` instance. */
declare class ScrollSpy extends BaseComponent {
    static selector: string;
    static init: (element: HTMLElement) => ScrollSpy;
    static getInstance: (element: HTMLElement) => ScrollSpy | null;
    options: ScrollSpyOptions;
    target: HTMLElement | null;
    scrollTarget: HTMLElement;
    scrollTop: number;
    maxScroll: number;
    scrollHeight: number;
    activeItem: HTMLElement | null;
    items: HTMLElement[];
    targets: HTMLElement[];
    itemsLength: number;
    offsets: number[];
    _observer: default_2;
    /**
     * @param target the target element
     * @param config the instance options
     */
    constructor(target: HTMLElement | string, config?: Partial<ScrollSpyOptions>);
    /**
     * Returns component name string.
     */
    get name(): string;
    /**
     * Returns component default options.
     */
    get defaults(): ScrollSpyOptions;
    /** Updates all items. */
    refresh: () => void;
    /** Removes `ScrollSpy` from the target element. */
    dispose(): void;
}
export default ScrollSpy;

declare interface ScrollSpyOptions extends BaseOptions {
    offset: number;
    target: HTMLElement | string | null;
}

export { }
