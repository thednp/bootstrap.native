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
export interface ModalOptions extends BaseOptions {
	backdrop: boolean | "static";
	keyboard: boolean;
}
/** Returns a new `Modal` instance. */
export default class Modal extends BaseComponent {
	static selector: string;
	static init: (element: HTMLElement) => Modal;
	static getInstance: (element: HTMLElement) => Modal | null;
	options: ModalOptions;
	modalDialog: HTMLElement | null;
	triggers: HTMLElement[];
	isStatic: boolean;
	hasFade: boolean;
	relatedTarget: HTMLElement | null;
	/**
	 * @param target usually the `.modal` element
	 * @param config instance options
	 */
	constructor(target: HTMLElement | string, config?: Partial<ModalOptions>);
	/**
	 * Returns component name string.
	 */
	get name(): string;
	/**
	 * Returns component default options.
	 */
	get defaults(): {
		backdrop: boolean;
		keyboard: boolean;
	};
	/** Toggles the visibility of the modal. */
	toggle(): void;
	/** Shows the modal to the user. */
	show(): void;
	/**
	 * Hide the modal from the user.
	 *
	 * @param callback when defined it will skip animation
	 */
	hide(callback?: () => void): void;
	/**
	 * Updates the modal layout.
	 */
	update(): void;
	/** Removes the `Modal` component from target element. */
	dispose(): void;
}

export {};
