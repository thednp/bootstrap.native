declare module "bootstrap.native/src/strings/fadeClass" {
    export default fadeClass;
    /**
     * Global namespace for most components `fade` class.
     */
    const fadeClass: "fade";
}
declare module "bootstrap.native/src/strings/showClass" {
    export default showClass;
    /**
     * Global namespace for most components `show` class.
     */
    const showClass: "show";
}
declare module "bootstrap.native/src/strings/dataBsDismiss" {
    export default dataBsDismiss;
    /**
     * Global namespace for most components `dismiss` option.
     */
    const dataBsDismiss: "data-bs-dismiss";
}
declare module "bootstrap.native/src/util/bootstrapCustomEvent" {
    /**
     * Returns a namespaced `CustomEvent` specific to each component.
     * @param {string} EventType Event.type
     * @param {Record<string, any>=} config Event.options | Event.properties
     * @returns {BSN.OriginalEvent} a new namespaced event
     */
    export default function bootstrapCustomEvent(EventType: string, config?: Record<string, any> | undefined): BSN.OriginalEvent;
}
declare module "bootstrap.native/src/version" {
    export default Version;
    const Version: string;
}
declare module "bootstrap.native/src/components/base-component" {
    /** Returns a new `BaseComponent` instance. */
    export default class BaseComponent {
        /**
         * @param {HTMLElement | string} target Element or selector string
         * @param {BSN.ComponentOptions=} config component instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.ComponentOptions | undefined);
        /** @static @type {BSN.ComponentOptions} */
        options: BSN.ComponentOptions;
        /** @type {HTMLElement} */
        element: HTMLElement;
        /** @static */
        get version(): string;
        /** @static */
        get name(): string;
        /** @static */
        get defaults(): any;
        /**
         * Removes component from target element;
         */
        dispose(): void;
    }
}
declare module "bootstrap.native/src/components/alert-native" {
    /** Creates a new Alert instance. */
    export default class Alert extends BaseComponent {
        /** @param {HTMLElement | string} target element or selector */
        constructor(target: HTMLElement | string);
        /** @static @type {HTMLElement?} */
        dismiss: HTMLElement | null;
        /**
         * Public method that hides the `.alert` element from the user,
         * disposes the instance once animation is complete, then
         * removes the element from the DOM.
         *
         * @param {Event=} e most likely the `click` event
         * @this {Alert} the `Alert` instance or `EventTarget`
         */
        close(e?: Event | undefined): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/activeClass" {
    export default activeClass;
    /**
     * Global namespace for most components active class.
     */
    const activeClass: "active";
}
declare module "bootstrap.native/src/strings/dataBsToggle" {
    export default dataBsToggle;
    /**
     * Global namespace for most components `toggle` option.
     */
    const dataBsToggle: "data-bs-toggle";
}
declare module "bootstrap.native/src/components/button-native" {
    /** Creates a new `Button` instance. */
    export default class Button extends BaseComponent {
        /**
         * @param {HTMLElement | string} target usually a `.btn` element
         */
        constructor(target: HTMLElement | string);
        /** @private @type {boolean} */
        private isActive;
        /**
         * Toggles the state of the target button.
         * @param {Event} e usually `click` Event object
         */
        toggle(e: Event): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/dataBsTarget" {
    export default dataBsTarget;
    /**
     * Global namespace for most components `target` option.
     */
    const dataBsTarget: "data-bs-target";
}
declare module "bootstrap.native/src/strings/dataBsParent" {
    export default dataBsParent;
    /**
     * Global namespace for most components `parent` option.
     */
    const dataBsParent: "data-bs-parent";
}
declare module "bootstrap.native/src/strings/dataBsContainer" {
    export default dataBsContainer;
    /**
     * Global namespace for most components `container` option.
     */
    const dataBsContainer: "data-bs-container";
}
declare module "bootstrap.native/src/util/getTargetElement" {
    /**
     * Returns the `Element` that THIS one targets
     * via `data-bs-target`, `href`, `data-bs-parent` or `data-bs-container`.
     *
     * @param {HTMLElement} element the target element
     * @returns {HTMLElement?} the query result
     */
    export default function getTargetElement(element: HTMLElement): HTMLElement | null;
}
declare module "bootstrap.native/src/components/carousel-native" {
    /** Creates a new `Carousel` instance. */
    export default class Carousel extends BaseComponent {
        /**
         * @param {HTMLElement | string} target mostly a `.carousel` element
         * @param {BSN.Options.Carousel=} config instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Carousel | undefined);
        /** @private @type {any?} */
        private timer;
        /** @private @type {string} */
        private direction;
        /** @private @type {boolean} */
        private isPaused;
        /** @private @type {boolean} */
        private isAnimating;
        /** @private @type {number} */
        private index;
        /** @private @type {boolean} */
        private isTouch;
        slides: HTMLCollectionOf<HTMLElement>;
        controls: HTMLElement[];
        /** @private @type {HTMLElement?} */
        private indicator;
        /** @private @type {Node[]} */
        private indicators;
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
         * @param {number} idx the index of the item to jump to
         */
        to(idx: number): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/collapsingClass" {
    export default collapsingClass;
    /**
     * Global namespace for most components `collapsing` class.
     * As used by `Collapse` / `Tab`.
     */
    const collapsingClass: "collapsing";
}
declare module "bootstrap.native/src/components/collapse-native" {
    /** Returns a new `Colapse` instance. */
    export default class Collapse extends BaseComponent {
        /**
         * @param {HTMLElement | string} target and `Element` that matches the selector
         * @param {BSN.Options.Collapse=} config instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Collapse | undefined);
        /** @private @type {HTMLElement[]} */
        private triggers;
        /** @private @type {HTMLElement?} */
        private parent;
        /** @private @type {boolean} */
        private isAnimating;
        /** Toggles the visibility of the collapse. */
        toggle(): void;
        /** Hides the collapse. */
        hide(): void;
        /** Shows the collapse. */
        show(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/dropdownClasses" {
    export default dropdownMenuClasses;
    /**
     * Global namespace for `Dropdown` types / classes.
     */
    const dropdownMenuClasses: string[];
}
declare module "bootstrap.native/src/strings/dropdownMenuClass" {
    export default dropdownMenuClass;
    /**
     * Global namespace for `.dropdown-menu`.
     */
    const dropdownMenuClass: "dropdown-menu";
}
declare module "bootstrap.native/src/util/isEmptyAnchor" {
    /**
     * Checks if an *event.target* or its parent has an `href="#"` value.
     * We need to prevent jumping around onclick, don't we?
     *
     * @param {HTMLElement} element the target element
     * @returns {boolean} the query result
     */
    export default function isEmptyAnchor(element: HTMLElement): boolean;
}
declare module "bootstrap.native/src/util/setFocus" {
    /**
     * Points the focus to a specific element.
     * @param {HTMLElement} element target
     */
    export default function setFocus(element: HTMLElement): void;
}
declare module "bootstrap.native/src/components/dropdown-native" {
    /** Returns a new Dropdown instance. */
    export default class Dropdown extends BaseComponent {
        /**
         * @param {HTMLElement | string} target Element or string selector
         * @param {BSN.Options.Dropdown=} config the instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Dropdown | undefined);
        /** @private @type {HTMLElement} */
        private menu;
        /** @private @type {string[]} */
        private originalClass;
        /** @private @type {boolean} */
        private menuEnd;
        /** @private @type {HTMLElement[]} */
        private menuItems;
        /** @private @type {boolean} */
        private open;
        /** Shows/hides the dropdown menu to the user. */
        toggle(): void;
        /** Shows the dropdown menu to the user. */
        show(): void;
        /** Hides the dropdown menu from the user. */
        hide(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/fixedTopClass" {
    export default fixedTopClass;
    /**
     * Global namespace for components `fixed-top` class.
     */
    const fixedTopClass: "fixed-top";
}
declare module "bootstrap.native/src/strings/fixedBottomClass" {
    export default fixedBottomClass;
    /**
     * Global namespace for components `fixed-bottom` class.
     */
    const fixedBottomClass: "fixed-bottom";
}
declare module "bootstrap.native/src/strings/stickyTopClass" {
    export default stickyTopClass;
    /**
     * Global namespace for components `sticky-top` class.
     */
    const stickyTopClass: "sticky-top";
}
declare module "bootstrap.native/src/util/scrollbar" {
    /**
     * Removes *padding* and *overflow* from the `<body>`
     * and all spacing from fixed items.
     */
    export function resetScrollbar(): void;
    /**
     * Returns the scrollbar width if the body does overflow
     * the window.
     * @returns {number} the value
     */
    export function measureScrollbar(): number;
    /**
     * Sets the `<body>` and fixed items style when modal / offcanvas
     * is shown to the user.
     *
     * @param {number} scrollbarWidth the previously measured scrollbar width
     * @param {boolean | number} overflow body does overflow or not
     */
    export function setScrollbar(scrollbarWidth: number, overflow: boolean | number): void;
}
declare module "bootstrap.native/src/util/backdrop" {
    export const overlay: HTMLDivElement;
    export const offcanvasBackdropClass: "offcanvas-backdrop";
    export const modalBackdropClass: "modal-backdrop";
    export const modalActiveSelector: string;
    export const offcanvasActiveSelector: string;
    /**
     * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
     * @param {boolean=} isModal
     */
    export function toggleOverlayType(isModal?: boolean | undefined): void;
    /**
     * Append the overlay to DOM.
     * @param {boolean} hasFade
     * @param {boolean=} isModal
     */
    export function appendOverlay(hasFade: boolean, isModal?: boolean | undefined): void;
    /**
     * Shows the overlay to the user.
     */
    export function showOverlay(): void;
    /**
     * Hides the overlay from the user.
     */
    export function hideOverlay(): void;
    /**
     * Returns the current active modal / offcancas element.
     * @returns {HTMLElement?} the requested element
     */
    export function getCurrentOpen(): HTMLElement | null;
    /**
     * Removes the overlay from DOM.
     */
    export function removeOverlay(): void;
}
declare module "bootstrap.native/src/util/isVisible" {
    /**
     * @param {HTMLElement} element target
     * @returns {boolean}
     */
    export default function isVisible(element: HTMLElement): boolean;
}
declare module "bootstrap.native/src/components/modal-native" {
    /** Returns a new `Modal` instance. */
    export default class Modal extends BaseComponent {
        /**
         * @param {HTMLElement | string} target usually the `.modal` element
         * @param {BSN.Options.Modal=} config instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Modal | undefined);
        /** @private @type {HTMLElement?} */
        private modalDialog;
        /** @private @type {HTMLElement[]} */
        private triggers;
        /** @private @type {boolean} */
        private isStatic;
        /** @private @type {boolean} */
        private hasFade;
        /** @private @type {boolean} */
        private isAnimating;
        /** @private @type {Element?} */
        private relatedTarget;
        /** Updates the modal layout. */
        update(): void;
        /** Toggles the visibility of the modal. */
        toggle(): void;
        /** Shows the modal to the user. */
        show(): void;
        /**
         * Hide the modal from the user.
         * @param {boolean=} force when `true` it will skip animation
         */
        hide(force?: boolean | undefined): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/offcanvas-native" {
    /** Returns a new `Offcanvas` instance. */
    export default class Offcanvas extends BaseComponent {
        /**
         * @param {HTMLElement | string} target usually an `.offcanvas` element
         * @param {BSN.Options.Offcanvas=} config instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Offcanvas | undefined);
        /** @private @type {HTMLElement[]} */
        private triggers;
        /** @private @type {boolean} */
        private isAnimating;
        /** @private @type {number} */
        private scrollbarWidth;
        /** Shows or hides the offcanvas from the user. */
        toggle(): void;
        /** Shows the offcanvas to the user. */
        show(): void;
        /**
         * Hides the offcanvas from the user.
         * @param {boolean=} force when `true` it will skip animation
         */
        hide(force?: boolean | undefined): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/util/tipClassPositions" {
    var _default: Record<string, string>;
    export default _default;
}
declare module "bootstrap.native/src/util/isVisibleTip" {
    /**
     * @param {HTMLElement?} tip target
     * @param {HTMLElement | ParentNode} container parent container
     * @returns {boolean}
     */
    export default function isVisibleTip(tip: HTMLElement | null, container: HTMLElement | ParentNode): boolean;
}
declare module "bootstrap.native/src/util/styleTip" {
    /**
     * Style popovers and tooltips.
     * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
     * @param {(MouseEvent)=} e event object
     */
    export default function styleTip(self: BSN.Tooltip | BSN.Popover, e?: (MouseEvent) | undefined): void;
}
declare module "bootstrap.native/src/util/getUID" {
    /**
     * Returns a unique identifier for popover, tooltip, scrollspy.
     *
     * @param {Element} element target element
     * @param {string} key predefined key
     * @returns {number} an existing or new unique key
     */
    export default function getUID(element: Element, key: string): number;
}
declare module "bootstrap.native/src/util/closestRelative" {
    /**
     * Returns the closest parentElement with `position: relative`.
     * @param {HTMLElement} element target element
     * @returns {?HTMLElement} the closest match
     */
    export default function closestRelative(element: HTMLElement): HTMLElement | null;
}
declare module "bootstrap.native/src/util/getTipContainer" {
    /**
     * Returns an `Element` to be used as *options.container*
     * for `Tooltip` / `Popover` components when the target is included inside
     * a modal or a fixed navbar.
     *
     * @param {HTMLElement} element the target
     * @returns {HTMLElement} the query result
     */
    export default function getTipContainer(element: HTMLElement): HTMLElement;
}
declare module "bootstrap.native/src/util/setHtml" {
    /**
     * Append an existing `Element` to Popover / Tooltip component or HTML
     * markup string to be parsed & sanitized to be used as popover / tooltip content.
     *
     * @param {HTMLElement} element target
     * @param {HTMLElement | string} content the `Element` to append / string
     * @param {ReturnType<any>} sanitizeFn a function to sanitize string content
     */
    export default function setHtml(element: HTMLElement, content: HTMLElement | string, sanitizeFn: ReturnType<any>): void;
}
declare module "bootstrap.native/src/components/popover-native" {
    /** Returns a new `Popover` instance. */
    export default class Popover extends BaseComponent {
        /**
         * @param {HTMLElement | string} target usualy an element with `data-bs-toggle` attribute
         * @param {BSN.Options.Popover=} config instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Popover | undefined);
        /** @private @type {any?} */
        private timer;
        /** @private @type {HTMLElement?} */
        private popover;
        /** @private @type {HTMLElement?} */
        private arrow;
        /** @private @type {HTMLElement?} */
        private btn;
        /** @private @type {boolean} */
        private enabled;
        /** @private @type {string} */
        private id;
        /**
         * Updates the position of the popover.
         *
         * @param {Event=} e the `Event` object
         */
        update(e?: Event | undefined): void;
        /**
         * Toggles visibility of the popover.
         *
         * @param {Event=} e the `Event` object
         * @this {Popover}
         */
        toggle(e?: Event | undefined): void;
        /**
         * Shows the popover.
         *
         * @param {Event=} e the `Event` object
         * @this {Popover}
         */
        show(e?: Event | undefined): void;
        /**
         * Hides the popover.
         *
         * @this {Element | Popover}
         * @param {Event=} e the `Event` object
         */
        hide(e?: Event | undefined): void;
        /** Disables the popover. */
        enable(): void;
        /** Enables the popover. */
        disable(): void;
        /** Toggles the `enabled` property. */
        toggleEnabled(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/scrollspy-native" {
    /** Returns a new `ScrollSpy` instance. */
    export default class ScrollSpy extends BaseComponent {
        /**
         * @param {HTMLElement | string} target the target element
         * @param {BSN.Options.ScrollSpy=} config the instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.ScrollSpy | undefined);
        /** @private @type {HTMLElement?} */
        private target;
        /** @private @type {HTMLElement | Window} */
        private scrollTarget;
        /** @private @type {boolean} */
        private isWindow;
        /** @private @type {number} */
        private scrollTop;
        /** @private @type {number} */
        private maxScroll;
        /** @private @type {number} */
        private scrollHeight;
        /** @private @type {HTMLElement?} */
        private activeItem;
        /** @private @type {HTMLElement[]} */
        private items;
        /** @private @type {number} */
        private itemsLength;
        /** @private @type {number[]} */
        private offsets;
        /** Updates all items. */
        refresh(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/tab-native" {
    /** Creates a new `Tab` instance. */
    export default class Tab extends BaseComponent {
        /**
         * @param {HTMLElement | string} target the target element
         */
        constructor(target: HTMLElement | string);
        /** @private @type {HTMLElement?} */
        private nav;
        /** @private @type {HTMLElement?} */
        private dropdown;
        /** @private @type {HTMLElement?} */
        private tabContent;
        /** Shows the tab to the user. */
        show(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/toast-native" {
    /** Creates a new `Toast` instance. */
    export default class Toast extends BaseComponent {
        /**
         * @param {HTMLElement | string} target the target `.toast` element
         * @param {BSN.Options.Toast=} config the instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Toast | undefined);
        /** @private @type {any} */
        private timer;
        /** @private @type {Element?} */
        private dismiss;
        /** Shows the toast. */
        show(): void;
        /** Hides the toast. */
        hide(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/dataOriginalTitle" {
    export default dataOriginalTitle;
    /**
     * Global namespace for `data-bs-title` attribute.
     */
    const dataOriginalTitle: "data-original-title";
}
declare module "bootstrap.native/src/components/tooltip-native" {
    /** Creates a new `Tooltip` instance. */
    export default class Tooltip extends BaseComponent {
        /**
         * @param {HTMLElement | string} target the target element
         * @param {BSN.Options.Tooltip=} config the instance options
         */
        constructor(target: HTMLElement | string, config?: BSN.Options.Tooltip | undefined);
        /** @private @type {HTMLElement?} */
        private tooltip: HTMLElement | null;
        /** @private @type {HTMLElement?} */
        private arrow;
        /** @private @type {ReturnType<any>?} */
        private timer;
        /** @private @type {boolean} */
        private enabled;
        /**
         * Updates the tooltip position.
         *
         * @param {Event=} e the `Event` object
         * @this {Tooltip} the `Tooltip` instance
         */
        update(e?: Event | undefined): Promise<void>;
        id: string;
        /**
         * Shows the tooltip.
         *
         * @param {Event=} e the `Event` object
         * @this {Tooltip}
         */
        show(e?: Event | undefined): void;
        /**
         * Hides the tooltip.
         *
         * @param {Event=} e the `Event` object
         * @this {Tooltip}
         */
        hide(e?: Event | undefined): void;
        /**
         * Toggles the tooltip visibility.
         *
         * @param {Event?} e the `Event` object
         * @this {Tooltip} the instance
         */
        toggle(e: Event | null): void;
        /** Enables the tooltip. */
        enable(): void;
        /** Disables the tooltip. */
        disable(): void;
        /** Toggles the `disabled` property. */
        toggleEnabled(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/util/init" {
    /**
     * Initialize all BSN components for a target container.
     * @param {HTMLElement=} context parent `Element`
     */
    export function initCallback(context?: HTMLElement | undefined): void;
    /**
     * Remove all BSN components for a target container.
     * @param {HTMLElement=} context parent `Element`
     */
    export function removeDataAPI(context?: HTMLElement | undefined): void;
}
declare module "bootstrap.native/types/more/bsn" {
    export { default as Alert } from "bootstrap.native/src/components/alert-native";
    export { default as Button } from "bootstrap.native/src/components/button-native";
    export { default as Carousel } from "bootstrap.native/src/components/carousel-native";
    export { default as Collapse } from "bootstrap.native/src/components/collapse-native";
    export { default as Dropdown } from "bootstrap.native/src/components/dropdown-native";
    export { default as Modal } from "bootstrap.native/src/components/modal-native";
    export { default as Offcanvas } from "bootstrap.native/src/components/offcanvas-native";
    export { default as Popover } from "bootstrap.native/src/components/popover-native";
    export { default as ScrollSpy } from "bootstrap.native/src/components/scrollspy-native";
    export { default as Tab } from "bootstrap.native/src/components/tab-native";
    export { default as Toast } from "bootstrap.native/src/components/toast-native";
    export { default as Tooltip } from "bootstrap.native/src/components/tooltip-native";
    export { initCallback, removeDataAPI } from "bootstrap.native/src/util/init";
    export { default as Version } from "bootstrap.native/src/version";
}
