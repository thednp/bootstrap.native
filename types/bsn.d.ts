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
     * @param {string} namespacedEventType Event.type
     * @param {AddEventListenerOptions | boolean} eventProperties Event.options | Event.properties
     * @returns {CustomEvent} a new namespaced event
     */
    export default function bootstrapCustomEvent(namespacedEventType: string, eventProperties: AddEventListenerOptions | boolean): CustomEvent;
}
declare module "bootstrap.native/src/version" {
    export default Version;
    const Version: string;
}
declare module "bootstrap.native/src/components/base-component" {
    /**
     * Returns a new `BaseComponent` instance.
     */
    export default class BaseComponent {
        /**
         * @param {Element | string} target Element or selector string
         * @param {BSN.ComponentOptions?} config
         */
        constructor(target: Element | string, config: BSN.ComponentOptions | null);
        /** @private */
        private element;
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
        /** @param {Element | string} target element or selector */
        constructor(target: Element | string);
        /** @private */
        private dismiss;
        /** @private */
        private relatedTarget;
        /**
         * Private method that:
         * * Hides the `.alert` element from the user,
         * * Destroy the instance once animation is complete,
         * * Removes the element from the DOM.
         *
         * @param {Event} e most likely the `click` event
         * @returns {void}
         */
        close(e: Event): void;
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
         * @param {Element | string} target usually a `.btn` element
         */
        constructor(target: Element | string);
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
declare module "bootstrap.native/src/components/carousel-native" {
    /**
     * Returns a new `Carousel` instance.
     */
    export default class Carousel extends BaseComponent {
        /**
         *
         * @param {Element | string} target mostly a `.carousel` element
         * @param {BSN.CarouselOptions?} config instance options
         */
        constructor(target: Element | string, config: BSN.CarouselOptions | null);
        /** @private @type {number?} */
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
        /** @private @type {HTMLCollection} */
        private slides;
        /** @private @type {[?Element, ?Element]} */
        private controls;
        /** @private @type {Element?} */
        private indicator;
        /** @private @type {NodeList | any[]} */
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
     * @param {Element} element the target element
     * @returns {?Element} the query result
     */
    export default function getTargetElement(element: Element): Element | null;
}
declare module "bootstrap.native/src/components/collapse-native" {
    /** Returns a new `Colapse` instance. */
    export default class Collapse extends BaseComponent {
        /**
         * @param {Element | string} target and `Element` that matches the selector
         * @param {BSN.CollapseOptions?} config instance options
         */
        constructor(target: Element | string, config: BSN.CollapseOptions | null);
        /** @private @type {Element[]} */
        private triggers;
        /** @private @type {Element?} */
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
     * @param {Element} elem the target element
     * @returns {boolean} the query result
     */
    export default function isEmptyAnchor(elem: Element): boolean;
}
declare module "bootstrap.native/src/util/setFocus" {
    /**
     * Points the focus to a specific element.
     * @param {Element} element target
     */
    export default function setFocus(element: Element): void;
}
declare module "bootstrap.native/src/components/dropdown-native" {
    /**
     * Returns a new Dropdown instance.
     * @implements {BaseComponent}
     */
    export default class Dropdown extends BaseComponent implements BaseComponent {
        /**
         * @param {Element | string} target Element or string selector
         * @param {BSN.DropdownOptions?} config the instance options
         */
        constructor(target: Element | string, config: BSN.DropdownOptions | null);
        /** @private @type {Element} */
        private menu;
        /** @private @type {string} */
        private originalClass;
        /** @private @type {boolean} */
        private menuEnd;
        /** @private @type {Element[]} */
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
     * @param {boolean | number} isModal
     */
    export function toggleOverlayType(isModal: boolean | number): void;
    /**
     * Append the overlay to DOM.
     * @param {boolean | number} hasFade
     * @param {boolean | number} isModal
     */
    export function appendOverlay(hasFade: boolean | number, isModal: boolean | number): void;
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
     * @returns {Element} the requested element
     */
    export function getCurrentOpen(): Element;
    /**
     * Removes the overlay from DOM.
     */
    export function removeOverlay(): void;
}
declare module "bootstrap.native/src/util/isVisible" {
    export default function isVisible(element: any): boolean;
}
declare module "bootstrap.native/src/components/modal-native" {
    /** Returns a new `Modal` instance. */
    export default class Modal extends BaseComponent {
        /**
         * @param {Element | string} target usually the `.modal` element
         * @param {BSN.ModalOptions?} config instance options
         */
        constructor(target: Element | string, config: BSN.ModalOptions | null);
        /** @private @type {Element} */
        private modalDialog;
        /** @private @type {Element[]} */
        private triggers;
        /** @private @type {boolean} */
        private isStatic;
        /** @private @type {boolean} */
        private hasFade;
        /** @private @type {boolean} */
        private isAnimating;
        /** @private @type {number} */
        private scrollbarWidth;
        /** @private @type {number} */
        private relatedTarget;
        /** Updates the modal layout. */
        update(): void;
        /** Toggles the visibility of the modal. */
        toggle(): void;
        /** Shows the modal to the user. */
        show(): void;
        /**
         * Hide the modal from the user.
         * @param {boolean | number} force when `true` it will skip animation
         */
        hide(force: boolean | number): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/offcanvas-native" {
    /** Returns a new `Offcanvas` instance. */
    export default class Offcanvas extends BaseComponent {
        /**
         * @param {Element | string} target usually an `.offcanvas` element
         * @param {BSN.OffcanvasOptions?} config instance options
         */
        constructor(target: Element | string, config: BSN.OffcanvasOptions | null);
        /** @private @type {Element[]} */
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
         * @param {boolean | number} force when `true` it will skip animation
         */
        hide(force: boolean | number): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/util/tipClassPositions" {
    namespace _default {
        const top: string;
        const bottom: string;
        const left: string;
        const right: string;
    }
    export default _default;
}
declare module "bootstrap.native/src/util/isVisibleTip" {
    export default function isVisibleTip(tip: any, container: any): any;
}
declare module "bootstrap.native/src/util/styleTip" {
    /**
     * Style popovers and tooltips.
     * @param {BSN.Tooltip | BSN.Popover} self the Popover / Tooltip instance
     * @param {Event=} e event object
     */
    export default function styleTip(self: BSN.Tooltip | BSN.Popover, e?: Event | undefined): void;
}
declare module "bootstrap.native/src/util/getUID" {
    /**
     * Returns a unique identifier for popover, tooltip, scrollspy.
     *
     * @param {Element} element target element
     * @param {number} key predefined key
     * @returns {number} an existing or new unique key
     */
    export default function getUID(element: Element, key: number): number;
}
declare module "bootstrap.native/src/util/getTipContainer" {
    /**
     * Returns an `Element` to be used as *options.container*
     * for `Tooltip` / `Popover` components when the target is included inside
     * a modal or a fixed navbar.
     *
     * @param {Element} element the target
     * @returns {Element} the query result
     */
    export default function getTipContainer(element: Element): Element;
}
declare module "bootstrap.native/src/util/closestRelative" {
    /**
     * Returns the closest parentElement with `position: relative`.
     * @param {Element} element target element
     * @returns {?Element} the closest match
     */
    export default function closestRelative(element: Element): Element | null;
}
declare module "bootstrap.native/src/util/setHtml" {
    /**
     * Append an existing `Element` to Popover / Tooltip component or HTML
     * markup string to be parsed & sanitized to be used as popover / tooltip content.
     *
     * @param {Element} element target
     * @param {Element | string} content the `Element` to append / string
     * @param {function} sanitizeFn a function to sanitize string content
     */
    export default function setHtml(element: Element, content: Element | string, sanitizeFn: Function): void;
}
declare module "bootstrap.native/src/components/popover-native" {
    /** Returns a new `Popover` instance. */
    export default class Popover extends BaseComponent {
        /**
         * @param {Element | string} target usualy an element with `data-bs-toggle` attribute
         * @param {BSN.PopoverOptions?} config instance options
         */
        constructor(target: Element | string, config: BSN.PopoverOptions | null);
        /** @private @type {number} */
        private timer;
        /** @private @type {Element} */
        private popover;
        /** @private @type {Element} */
        private arrow;
        /** @private @type {Element} */
        private btn;
        /** @private @type {boolean} */
        private enabled;
        /** @private @type {string} */
        private id;
        /** @private @type {Record<string, any>} */
        private positions;
        /**
         * Updates the position of the popover.
         *
         * @param {Event?} e the `Event` object
         */
        update(e: Event | null): void;
        /**
         * Toggles visibility of the popover.
         *
         * @param {Event?} e the `Event` object
         */
        toggle(e: Event | null): void;
        /**
         * Shows the popover.
         *
         * @param {Event?} e the `Event` object
         */
        show(e: Event | null): void;
        /**
         * Hides the popover.
         *
         * @param {Event?} e the `Event` object
         */
        hide(e: Event | null): void;
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
         * @param {Element | string} target the target element
         * @param {BSN.ScrollspyOptions?} config the instance options
         */
        constructor(target: Element | string, config: BSN.ScrollspyOptions | null);
        /** @private @type {Element} */
        private target;
        /** @private @type {Element} */
        private scrollTarget;
        /** @private @type {boolean} */
        private isWindow;
        /** @private @type {number} */
        private scrollTop;
        /** @private @type {number} */
        private maxScroll;
        /** @private @type {number} */
        private scrollHeight;
        /** @private @type {Element?} */
        private activeItem;
        /** @private @type {Element[]} */
        private items;
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
         * @param {Element | string} target the target element
         */
        constructor(target: Element | string);
        /** @private @type {Element} */
        private nav;
        /** @private @type {Element} */
        private dropdown;
        tabContent: false | Element | null;
        /** Shows the tab to the user. */
        show(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/toast-native" {
    /** Creates a new `Toast` instance. */
    export default class Toast extends BaseComponent {
        /**
         * @param {Element | string} target the target `.toast` element
         * @param {BSN.ToastOptions?} config the instance options
         */
        constructor(target: Element | string, config: BSN.ToastOptions | null);
        /** @private @type {Element} */
        private dismiss;
        /** Shows the toast. */
        show(): void;
        /** Hides the toast. */
        hide(noTimer: any): void;
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
         * @param {Element | string} target the target element
         * @param {BSN.TooltipOptions?} config the instance options
         */
        constructor(target: Element | string, config: BSN.TooltipOptions | null);
        /** @private @type {Element} */
        private tooltip;
        /** @private @type {Element} */
        private arrow;
        /** @private @type {number} */
        private timer;
        /** @private @type {boolean} */
        private enabled;
        /**
         * Updates the tooltip position.
         *
         * @param {Event?} e the `Event` object
         */
        update(e: Event | null): void;
        id: string;
        /** @private @type {Record<string, any>} */
        private positions;
        /**
         * Shows the tooltip.
         *
         * @param {Event?} e the `Event` object
         */
        show(e: Event | null): void;
        /**
         * Hides the tooltip.
         *
         * @param {Event?} e the `Event` object
         */
        hide(e: Event | null): void;
        /**
         * Toggles the tooltip visibility.
         *
         * @param {Event?} e the `Event` object
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
     * @param {Element=} context parent `Element`
     */
    export function initCallback(context?: Element | undefined): void;
    /**
     * Remove all BSN components for a target container.
     * @param {Element=} context parent `Element`
     */
    export function removeDataAPI(context?: Element | undefined): void;
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
