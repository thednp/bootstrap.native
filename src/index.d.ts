type SelectorOrReference = string | Element;
type Placement = "top" | "bottom" | "left" | "right";

declare module "bootstrap.native/dist/components/alert-native.esm.js" {
    export default class Alert {
        constructor(element: SelectorOrReference)

        close(): void;

        dispose(): void;
    }
}

declare module "bootstrap.native/dist/components/button-native.esm.js" {
    export default class Button {
        constructor(element: SelectorOrReference);

        dispose(): void;
    }
}

declare module "bootstrap.native/dist/components/carousel-native.esm.js" {
    export default class Carousel {
        constructor(element: SelectorOrReference, options?: CarouselOptions);

        cycle(): void;

        slideTo(index: number): void;

        getActiveIndex(): number;

        dispose(): void;
    }

    export interface CarouselOptions {
        /** @default true */
        keyboard?: boolean;

        /** @default hover */
        pause?: boolean | "hover";

        /** @default true */
        touch?: boolean;

        /** @default 5000 */
        interval?: number;
    }
}

declare module "bootstrap.native/dist/components/collapse-native.esm.js" {
    export default class Collapse {
        constructor(element: SelectorOrReference, options?: CollapseOptions);

        show(): void;

        hide(): void;

        toggle(): void;

        dispose(): void;
    }

    export interface CollapseOptions {
        parent?: SelectorOrReference;
        target?: SelectorOrReference;
    }
}

declare module "bootstrap.native/dist/components/dropdown-native.esm.js" {
    export default class Dropdown {
        constructor(element: SelectorOrReference, persist?: boolean);

        toggle(): void;

        dispose(): void;
    }
}

declare module "bootstrap.native/dist/components/modal-native.esm.js" {
    export default class Modal {
        constructor(element: SelectorOrReference, options?: ModalOptions);

        show(): void;

        hide(): void;

        toggle(): void;

        setContent(content: string): void;

        update(): void;

        dispose(): void;
    }

    export interface ModalOptions {
        /** @default true */
        backdrop?: boolean | "static";

        /** @default true */
        keyboard?: boolean;

        content?: string;
    }
}

declare module "bootstrap.native/dist/components/popover-native.esm.js" {
    export default class Popover {
        constructor(element: SelectorOrReference, options?: PopoverOptions);

        show(): void;

        hide(): void;

        toggle(): void;

        dispose(): void;
    }

    export interface PopoverOptions {
        template?: string;

        content?: string;

        title?: string;

        /** @default false */
        dismissible?: boolean;

        /** @default hover */
        trigger?: string;

        /** @default fade */
        animation?: string;

        /** @default top */
        placement?: Placement;

        /** @default 200 */
        delay?: number;

        /** @default body */
        container?: SelectorOrReference;
    }
}

declare module "bootstrap.native/dist/components/scrollspy-native.esm.js" {
    export default class ScrollSpy {
        constructor(element: SelectorOrReference, options?: ScrollSpyOptions);

        show(): void;

        dispose(): void;
    }

    export interface ScrollSpyOptions {
        target?: SelectorOrReference;

        /** @default 10 */
        offset: number;
    }
}

declare module "bootstrap.native/dist/components/tab-native.esm.js" {
    export default class Tab {
        constructor(element: SelectorOrReference, options?: TabOptions);

        refresh(): void;

        dispose(): void;
    }

    export interface TabOptions {
        /** @default true */
        height?: boolean;
    }
}

declare module "bootstrap.native/dist/components/toast-native.esm.js" {
    export default class Toast {
        constructor(element: SelectorOrReference, options?: ToastOptions);

        show(): void;

        hide(): void;

        dispose(): void;
    }

    export interface ToastOptions {
        /** @default true */
        animation?: boolean;

        /** @default true */
        autohide?: boolean;

        /** @default 500 */
        delay?: number;
    }
}

declare module "bootstrap.native/dist/components/tooltip-native.esm.js" {
    export default class Tooltip {
        constructor(element: SelectorOrReference, options?: TooltipOptions);

        show(): void;

        hide(): void;

        toggle(): void;

        dispose(): void;
    }

    export interface TooltipOptions {
        template?: string;

        /** @default true */
        animation?: boolean;

        /** @default top */
        placement?: Placement;

        /** @default 200 */
        delay?: number;

        /** @default body */
        container?: SelectorOrReference;
    }
}

declare module "bootstrap.native" {
    import Alert from "bootstrap.native/dist/components/alert-native.esm.js";
    import Button from "bootstrap.native/dist/components/button-native.esm.js";
    import Carousel from "bootstrap.native/dist/components/carousel-native.esm.js";
    import Collapse from "bootstrap.native/dist/components/collapse-native.esm.js";
    import Dropdown from "bootstrap.native/dist/components/dropdown-native.esm.js";
    import Modal from "bootstrap.native/dist/components/modal-native.esm.js";
    import Popover from "bootstrap.native/dist/components/popover-native.esm.js";
    import ScrollSpy from "bootstrap.native/dist/components/scrollspy-native.esm.js";
    import Tab from "bootstrap.native/dist/components/tab-native.esm.js";
    import Toast from "bootstrap.native/dist/components/toast-native.esm.js";

    interface Components {
        Alert: typeof Alert;
        Button: typeof Button;
        Carousel: typeof Carousel;
        Collapse: typeof Collapse;
        Dropdown: typeof Dropdown;
        Modal: typeof Modal;
        Popover: typeof Popover;
        ScrollSpy: typeof ScrollSpy;
        Tab: typeof Tab;
        Toast: typeof Toast;
    }

    interface BSN extends Components {
        initCallback(
            /** @default document */
            element?: Element
        ): void;

        removeDataAPI(
            /** @default document */
            container?: Element
        ): void;

        Version: string;
        componentsInit: object;
    }

    const BSN: BSN;

    export default BSN;
}
