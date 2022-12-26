export declare const modalBackdropClass: string;
export declare const offcanvasBackdropClass: string;
export declare const modalActiveSelector: string;
export declare const offcanvasActiveSelector: string;
export declare const overlay: HTMLElement;
/**
 * Returns the current active modal / offcancas element.
 *
 * @param element the context element
 * @returns the requested element
 */
export declare const getCurrentOpen: (element?: HTMLElement) => HTMLElement | null;
/**
 * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
 *
 * @param isModal
 */
export declare const toggleOverlayType: (isModal?: boolean) => void;
/**
 * Append the overlay to DOM.
 *
 * @param element
 * @param hasFade
 * @param isModal
 */
export declare const appendOverlay: (element: HTMLElement, hasFade: boolean, isModal?: boolean) => void;
/**
 * Shows the overlay to the user.
 */
export declare const showOverlay: () => void;
/**
 * Hides the overlay from the user.
 */
export declare const hideOverlay: () => void;
/**
 * Removes the overlay from DOM.
 *
 * @param element
 */
export declare const removeOverlay: (element?: HTMLElement) => void;

export {};
