declare class ScrollSpy extends BaseComponent {
    constructor(target: any, config: any);
    target: any;
    scrollTarget: any;
    isWindow: boolean;
    scrollTop: number;
    maxScroll: number;
    scrollHeight: number;
    activeItem: any;
    items: any[];
    offsets: any[];
    refresh(): void;
}
declare namespace ScrollSpy {
    namespace init {
        export { scrollspyComponent as component };
        export { scrollspySelector as selector };
        export { ScrollSpy as constructor };
    }
}
export default ScrollSpy;
import BaseComponent from "./base-component.js";
declare const scrollspyComponent: "ScrollSpy";
declare const scrollspySelector: "[data-bs-spy=\"scroll\"]";
