/**
 * Removes *padding* and *overflow* from the `<body>`
 * and all spacing from fixed items.
 *
 * @param element the target modal/offcanvas
 */
export declare const resetScrollbar: (element?: HTMLElement) => void;
/**
 * Returns the scrollbar width if the body does overflow
 * the window.
 *
 * @param element target element
 * @returns the scrollbar width value
 */
export declare const measureScrollbar: (element: HTMLElement) => number;
/**
 * Sets the `<body>` and fixed items style when modal / offcanvas
 * is shown to the user.
 *
 * @param element the target modal/offcanvas
 * @param overflow body does overflow or not
 */
export declare const setScrollbar: (element: HTMLElement, overflow?: boolean) => void;

export {};
