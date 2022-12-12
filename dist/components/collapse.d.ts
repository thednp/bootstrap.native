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
export interface CollapseOptions extends BaseOptions {
	parent: HTMLElement | null;
}
/** Returns a new `Colapse` instance. */
export default class Collapse extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Collapse;
	static getInstance: (element: HTMLElement) => Collapse | null;
	options: CollapseOptions;
	parent: HTMLElement | null;
	triggers: HTMLElement[];
	/**
	 * @param target and `Element` that matches the selector
	 * @param config instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<CollapseOptions>);
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
	/** Toggles the visibility of the collapse. */
	toggle(): void;
	/** Hides the collapse. */
	hide(): void;
	/** Shows the collapse. */
	show(): void;
	/** Remove the `Collapse` component from the target `Element`. */
	dispose(): void;
}

export {};
