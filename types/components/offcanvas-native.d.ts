declare class Offcanvas extends BaseComponent {
    constructor(target: any, config: any);
    triggers: Element[];
    isAnimating: boolean;
    scrollbarWidth: number;
    toggle(): void;
    show(): void;
    hide(force: any): void;
}
declare namespace Offcanvas {
    namespace init {
        export { offcanvasComponent as component };
        export { OffcanvasSelector as selector };
        export { Offcanvas as constructor };
    }
}
export default Offcanvas;
import BaseComponent from "./base-component.js";
declare const offcanvasComponent: "Offcanvas";
declare const OffcanvasSelector: string;
