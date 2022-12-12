export interface BaseOptions {
	[key: string]: any;
}
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
	/**
	 * Removes component from target element;
	 */
	dispose(): void;
}
/** Creates a new `Tab` instance. */
export default class Tab extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Tab;
	static getInstance: (element: HTMLElement) => Tab | null;
	nav: HTMLElement | null;
	content: HTMLElement | null;
	tabContent: HTMLElement | null;
	nextContent: HTMLElement | null;
	dropdown: HTMLElement | null;
	/** @param target the target element */
	constructor(target: HTMLElement | string);
	/**
	 * Returns component name string.
	 */
	get name(): string;
	/** Shows the tab to the user. */
	show(): void;
	/** Removes the `Tab` component from the target element. */
	dispose(): void;
}

export {};
