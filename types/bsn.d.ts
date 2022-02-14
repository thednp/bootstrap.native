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
declare module "bootstrap.native/src/strings/alertString" {
    export default alertString;
    /** @type {string} */
    const alertString: string;
}
declare module "bootstrap.native/src/strings/alertComponent" {
    export default alertComponent;
    /** @type {string} */
    const alertComponent: string;
}
declare module "bootstrap.native/src/version" {
    export default Version;
    const Version: string;
}
declare module "bootstrap.native/src/components/base-component" {
    /** Returns a new `BaseComponent` instance. */
    export default class BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target `Element` or selector string
         * @param {BSN.ComponentOptions=} config component instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.ComponentOptions | undefined);
        /** @static @type {BSN.ComponentOptions} */
        options: BSN.ComponentOptions;
        /** @type {HTMLElement | Element} */
        element: HTMLElement | Element;
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
        /** @param {HTMLElement | Element | string} target element or selector */
        constructor(target: HTMLElement | Element | string);
        /** @static @type {(HTMLElement | Element)?} */
        dismiss: (HTMLElement | Element) | null;
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
declare module "bootstrap.native/src/strings/buttonString" {
    export default buttonString;
    /** @type {string} */
    const buttonString: string;
}
declare module "bootstrap.native/src/strings/buttonComponent" {
    export default buttonComponent;
    /** @type {string} */
    const buttonComponent: string;
}
declare module "bootstrap.native/src/components/button-native" {
    /** Creates a new `Button` instance. */
    export default class Button extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target usually a `.btn` element
         */
        constructor(target: HTMLElement | Element | string);
        /** @type {boolean} */
        isActive: boolean;
        /**
         * Toggles the state of the target button.
         * @param {MouseEvent} e usually `click` Event object
         */
        toggle(e: MouseEvent): void;
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
declare module "bootstrap.native/src/strings/carouselString" {
    export default carouselString;
    /** @type {string} */
    const carouselString: string;
}
declare module "bootstrap.native/src/strings/carouselComponent" {
    export default carouselComponent;
    /** @type {string} */
    const carouselComponent: string;
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
     * @param {HTMLElement | Element} element the target element
     * @returns {(HTMLElement | Element)?} the query result
     */
    export default function getTargetElement(element: HTMLElement | Element): (HTMLElement | Element) | null;
}
declare module "bootstrap.native/src/components/carousel-native" {
    /** Creates a new `Carousel` instance. */
    export default class Carousel extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target mostly a `.carousel` element
         * @param {BSN.Options.Carousel=} config instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Carousel | undefined);
        /** @type {string} */
        direction: string;
        /** @type {number} */
        index: number;
        /** @type {boolean} */
        isTouch: boolean;
        slides: HTMLCollectionOf<Element | HTMLElement>;
        controls: Element[];
        /** @type {(HTMLElement | Element)?} */
        indicator: (HTMLElement | Element) | null;
        /** @type {(HTMLElement | Element)[]} */
        indicators: (HTMLElement | Element)[];
        /**
         * Check if instance is paused.
         * @returns {boolean}
        */
        get isPaused(): boolean;
        /**
         * Check if instance is animating.
         * @returns {boolean}
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
declare module "bootstrap.native/src/strings/collapseString" {
    export default collapseString;
    /** @type {string} */
    const collapseString: string;
}
declare module "bootstrap.native/src/strings/collapseComponent" {
    export default collapseComponent;
    /** @type {string} */
    const collapseComponent: string;
}
declare module "bootstrap.native/src/components/collapse-native" {
    /** Returns a new `Colapse` instance. */
    export default class Collapse extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target and `Element` that matches the selector
         * @param {BSN.Options.Collapse=} config instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Collapse | undefined);
        /** @type {(HTMLElement | Element)[]} */
        triggers: (HTMLElement | Element)[];
        /** @type {(HTMLElement | Element)?} */
        parent: (HTMLElement | Element) | null;
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
declare module "bootstrap.native/src/strings/dropdownComponent" {
    export default dropdownComponent;
    /** @type {string} */
    const dropdownComponent: string;
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
     * @param {HTMLElement | HTMLAnchorElement | EventTarget} element the target element
     * @returns {boolean} the query result
     */
    export default function isEmptyAnchor(element: HTMLElement | HTMLAnchorElement | EventTarget): boolean;
}
declare module "bootstrap.native/src/components/dropdown-native" {
    /** Returns a new Dropdown instance. */
    export default class Dropdown extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target Element or string selector
         * @param {BSN.Options.Dropdown=} config the instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Dropdown | undefined);
        /** @type {(Element | HTMLElement)} */
        parentElement: (Element | HTMLElement);
        /** @type {(Element | HTMLElement)} */
        menu: (Element | HTMLElement);
        /** @type {boolean} */
        open: boolean;
        /** Shows/hides the dropdown menu to the user. */
        toggle(): void;
        /** Shows the dropdown menu to the user. */
        show(): void;
        /** Hides the dropdown menu from the user. */
        hide(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/modalString" {
    export default modalString;
    /** @type {string} */
    const modalString: string;
}
declare module "bootstrap.native/src/strings/modalComponent" {
    export default modalComponent;
    /** @type {string} */
    const modalComponent: string;
}
declare module "bootstrap.native/src/util/getElementContainer" {
    /**
     * Returns an `HTMLElement` to be used as default value for *options.container*
     * for `Tooltip` / `Popover` components.
     *
     * When `getOffset` is *true*, it returns the `offsetParent` for tooltip/popover
     * offsets computation similar to **floating-ui**.
     * @see https://github.com/floating-ui/floating-ui
     *
     * @param {HTMLElement | Element} element the target
     * @param {boolean=} getOffset when *true* it will return an `offsetParent`
     * @returns {HTMLElement | HTMLBodyElement | Window | globalThis} the query result
     */
    export default function getElementContainer(element: HTMLElement | Element, getOffset?: boolean | undefined): HTMLElement | HTMLBodyElement | Window | typeof globalThis;
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
declare module "bootstrap.native/src/strings/positionStickyClass" {
    export default positionStickyClass;
    /**
     * Global namespace for components `position-sticky` class.
     */
    const positionStickyClass: "position-sticky";
}
declare module "bootstrap.native/src/util/scrollbar" {
    /**
     * Removes *padding* and *overflow* from the `<body>`
     * and all spacing from fixed items.
     * @param {(HTMLElement | Element)=} element the target modal/offcanvas
     */
    export function resetScrollbar(element?: (HTMLElement | Element) | undefined): void;
    /**
     * Returns the scrollbar width if the body does overflow
     * the window.
     * @param {(HTMLElement | Element)=} element
     * @returns {number} the value
     */
    export function measureScrollbar(element?: (HTMLElement | Element) | undefined): number;
    /**
     * Sets the `<body>` and fixed items style when modal / offcanvas
     * is shown to the user.
     *
     * @param {HTMLElement | Element} element the target modal/offcanvas
     * @param {boolean=} overflow body does overflow or not
     */
    export function setScrollbar(element: HTMLElement | Element, overflow?: boolean | undefined): void;
}
declare module "bootstrap.native/src/strings/offcanvasString" {
    export default offcanvasString;
    /** @type {string} */
    const offcanvasString: string;
}
declare module "bootstrap.native/src/util/backdrop" {
    export const overlay: HTMLDivElement;
    export const offcanvasBackdropClass: string;
    export const modalBackdropClass: string;
    export const modalActiveSelector: string;
    export const offcanvasActiveSelector: string;
    /**
     * Toogles from a Modal overlay to an Offcanvas, or vice-versa.
     * @param {boolean=} isModal
     */
    export function toggleOverlayType(isModal?: boolean | undefined): void;
    /**
     * Append the overlay to DOM.
     * @param {HTMLElement | Element} container
     * @param {boolean} hasFade
     * @param {boolean=} isModal
     */
    export function appendOverlay(container: HTMLElement | Element, hasFade: boolean, isModal?: boolean | undefined): void;
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
     * @param {(HTMLElement | Element)=} element the context element
     * @returns {(HTMLElement | Element)?} the requested element
     */
    export function getCurrentOpen(element?: (HTMLElement | Element) | undefined): (HTMLElement | Element) | null;
    /**
     * Removes the overlay from DOM.
     * @param {(HTMLElement | Element)=} element
     */
    export function removeOverlay(element?: (HTMLElement | Element) | undefined): void;
}
declare module "bootstrap.native/src/util/isVisible" {
    /**
     * @param {HTMLElement | Element} element target
     * @returns {boolean}
     */
    export default function isVisible(element: HTMLElement | Element): boolean;
}
declare module "bootstrap.native/src/components/modal-native" {
    /** Returns a new `Modal` instance. */
    export default class Modal extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target usually the `.modal` element
         * @param {BSN.Options.Modal=} config instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Modal | undefined);
        /** @type {(HTMLElement | Element)} */
        modalDialog: (HTMLElement | Element);
        /** @type {(HTMLElement | Element)[]} */
        triggers: (HTMLElement | Element)[];
        /** @type {boolean} */
        isStatic: boolean;
        /** @type {boolean} */
        hasFade: boolean;
        /** @type {(HTMLElement | Element)?} */
        relatedTarget: (HTMLElement | Element) | null;
        /** @type {HTMLBodyElement | HTMLElement | Element} */
        container: HTMLBodyElement | HTMLElement | Element;
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
declare module "bootstrap.native/src/strings/offcanvasComponent" {
    export default offcanvasComponent;
    /** @type {string} */
    const offcanvasComponent: string;
}
declare module "bootstrap.native/src/components/offcanvas-native" {
    /** Returns a new `Offcanvas` instance. */
    export default class Offcanvas extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target usually an `.offcanvas` element
         * @param {BSN.Options.Offcanvas=} config instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Offcanvas | undefined);
        /** @type {(HTMLElement | Element)[]} */
        triggers: (HTMLElement | Element)[];
        /** @type {HTMLBodyElement | HTMLElement | Element} */
        container: HTMLBodyElement | HTMLElement | Element;
        /** @type {(HTMLElement | Element)?} */
        relatedTarget: (HTMLElement | Element) | null;
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
declare module "bootstrap.native/src/strings/popoverString" {
    export default popoverString;
    /** @type {string} */
    const popoverString: string;
}
declare module "bootstrap.native/src/strings/popoverComponent" {
    export default popoverComponent;
    /** @type {string} */
    const popoverComponent: string;
}
declare module "bootstrap.native/src/strings/tooltipString" {
    export default tooltipString;
    /** @type {string} */
    const tooltipString: string;
}
declare module "bootstrap.native/src/util/getTipTemplate" {
    /**
     * Returns a template for Popover / Tooltip.
     *
     * @param {string} tipType the expected markup type
     * @returns {string} the template markup
     */
    export default function getTipTemplate(tipType: string): string;
}
declare module "bootstrap.native/src/util/tipClassPositions" {
    var _default: Record<string, string>;
    export default _default;
}
declare module "bootstrap.native/src/util/styleTip" {
    /**
     * Style popovers and tooltips.
     * @param {BSN.Tooltip | BSN.Popover} self the `Popover` / `Tooltip` instance
     * @param {PointerEvent=} e event object
     */
    export default function styleTip(self: BSN.Tooltip | BSN.Popover, e?: PointerEvent | undefined): void;
}
declare module "bootstrap.native/src/util/tooltipDefaults" {
    export default tooltipDefaults;
    namespace tooltipDefaults {
        const template: string;
        const title: string | null;
        const customClass: string | null;
        const trigger: string;
        const placement: string | null;
        const sanitizeFn: ((c: string) => string) | null;
        const animation: boolean;
        const delay: number;
        const container: (HTMLElement | Element) | null;
    }
}
declare module "bootstrap.native/src/strings/dataOriginalTitle" {
    export default dataOriginalTitle;
    /**
     * Global namespace for `data-bs-title` attribute.
     */
    const dataOriginalTitle: "data-original-title";
}
declare module "bootstrap.native/src/strings/tooltipComponent" {
    export default tooltipComponent;
    /** @type {string} */
    const tooltipComponent: string;
}
declare module "bootstrap.native/src/util/setHtml" {
    /**
     * Append an existing `Element` to Popover / Tooltip component or HTML
     * markup string to be parsed & sanitized to be used as popover / tooltip content.
     *
     * @param {HTMLElement | Element} element target
     * @param {HTMLElement | Element | string} content the `Element` to append / string
     * @param {ReturnType<any>} sanitizeFn a function to sanitize string content
     */
    export default function setHtml(element: HTMLElement | Element, content: HTMLElement | Element | string, sanitizeFn: ReturnType<any>): void;
}
declare module "bootstrap.native/src/util/createTip" {
    /**
     * Creates a new tooltip / popover.
     *
     * @param {BSN.Popover | BSN.Tooltip} self the `Popover` instance
     */
    export default function createTip(self: BSN.Popover | BSN.Tooltip): void;
}
declare module "bootstrap.native/src/util/isVisibleTip" {
    /**
     * @param {(HTMLElement | Element)?} tip target
     * @param {HTMLElement | ParentNode} container parent container
     * @returns {boolean}
     */
    export default function isVisibleTip(tip: (HTMLElement | Element) | null, container: HTMLElement | ParentNode): boolean;
}
declare module "bootstrap.native/src/components/tooltip-native" {
    /** Creates a new `Tooltip` instance. */
    export default class Tooltip extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target the target element
         * @param {BSN.Options.Tooltip=} config the instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Tooltip | undefined);
        /** @type {any} */
        tooltip: any;
        /** @type {any} */
        arrow: any;
        /** @type {any} */
        offsetParent: any;
        /** @type {boolean} */
        enabled: boolean;
        /** @type {string} Set unique ID for `aria-describedby`. */
        id: string;
        /**
         * Handles the `touchstart` event listener for `Tooltip`
         * @this {Tooltip}
         * @param {TouchEvent} e the `Event` object
         */
        handleTouch({ target }: TouchEvent): void;
        /**
         * Updates the tooltip position.
         *
         * @param {Event=} e the `Event` object
         * @this {Tooltip} the `Tooltip` instance
         */
        update(e?: Event | undefined): void;
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
         * @this {Tooltip}
         */
        hide(): void;
        /**
         * Toggles the tooltip visibility.
         *
         * @param {Event=} e the `Event` object
         * @this {Tooltip} the instance
         */
        toggle(e?: Event | undefined): void;
        /** Enables the tooltip. */
        enable(): void;
        /** Disables the tooltip. */
        disable(): void;
        /** Toggles the `disabled` property. */
        toggleEnabled(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/components/popover-native" {
    /** Returns a new `Popover` instance. */
    export default class Popover extends Tooltip {
        /**
         * @param {HTMLElement | Element | string} target the target element
         * @param {BSN.Options.Popover=} config the instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Popover | undefined);
    }
    import Tooltip from "bootstrap.native/src/components/tooltip-native";
}
declare module "bootstrap.native/src/strings/scrollspyString" {
    export default scrollspyString;
    /** @type {string} */
    const scrollspyString: string;
}
declare module "bootstrap.native/src/strings/scrollspyComponent" {
    export default scrollspyComponent;
    /** @type {string} */
    const scrollspyComponent: string;
}
declare module "bootstrap.native/src/components/scrollspy-native" {
    /** Returns a new `ScrollSpy` instance. */
    export default class ScrollSpy extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target the target element
         * @param {BSN.Options.ScrollSpy=} config the instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.ScrollSpy | undefined);
        /** @type {(HTMLElement | Element)?} */
        target: (HTMLElement | Element) | null;
        /** @type {HTMLElement | Element | Window | globalThis} */
        scrollTarget: HTMLElement | Element | Window | typeof globalThis;
        /** @type {number} */
        scrollTop: number;
        /** @type {number} */
        maxScroll: number;
        /** @type {number} */
        scrollHeight: number;
        /** @type {(HTMLElement | Element)?} */
        activeItem: (HTMLElement | Element) | null;
        /** @type {(HTMLElement | Element)[]} */
        items: (HTMLElement | Element)[];
        /** @type {number} */
        itemsLength: number;
        /** @type {number[]} */
        offsets: number[];
        /** Updates all items. */
        refresh(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/tabString" {
    export default tabString;
    /** @type {string} */
    const tabString: string;
}
declare module "bootstrap.native/src/strings/tabComponent" {
    export default tabComponent;
    /** @type {string} */
    const tabComponent: string;
}
declare module "bootstrap.native/src/components/tab-native" {
    /** Creates a new `Tab` instance. */
    export default class Tab extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target the target element
         */
        constructor(target: HTMLElement | Element | string);
        /** @type {(HTMLElement | Element)?} */
        nav: (HTMLElement | Element) | null;
        /** @type {HTMLElement | Element} */
        content: HTMLElement | Element;
        /** @type {(HTMLElement | Element)?} */
        tabContent: (HTMLElement | Element) | null;
        /** @type {(HTMLElement | Element)?} */
        dropdown: (HTMLElement | Element) | null;
        /** Shows the tab to the user. */
        show(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/strings/toastString" {
    export default toastString;
    /** @type {string} */
    const toastString: string;
}
declare module "bootstrap.native/src/strings/toastComponent" {
    export default toastComponent;
    /** @type {string} */
    const toastComponent: string;
}
declare module "bootstrap.native/src/components/toast-native" {
    /** Creates a new `Toast` instance. */
    export default class Toast extends BaseComponent {
        /**
         * @param {HTMLElement | Element | string} target the target `.toast` element
         * @param {BSN.Options.Toast=} config the instance options
         */
        constructor(target: HTMLElement | Element | string, config?: BSN.Options.Toast | undefined);
        /** @type {(HTMLElement | Element)?} */
        dismiss: (HTMLElement | Element) | null;
        /** Shows the toast. */
        show(): void;
        /** Hides the toast. */
        hide(): void;
    }
    import BaseComponent from "bootstrap.native/src/components/base-component";
}
declare module "bootstrap.native/src/util/init" {
    /**
     * Initialize all BSN components for a target container.
     * @param {(Element | HTMLElement | Document)=} context parent `Element`
     */
    export function initCallback(context?: (Element | HTMLElement | Document) | undefined): void;
    /**
     * Remove all BSN components for a target container.
     * @param {(Element | HTMLElement | Document)=} context parent `Element`
     */
    export function removeDataAPI(context?: (Element | HTMLElement | Document) | undefined): void;
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
