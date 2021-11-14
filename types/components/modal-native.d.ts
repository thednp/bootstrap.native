declare class Modal extends BaseComponent {
    constructor(target: any, config: any);
    modalDialog: any;
    triggers: Element[];
    isStatic: boolean;
    hasFade: any;
    isAnimating: boolean;
    scrollbarWidth: number;
    relatedTarget: any;
    update(): void;
    toggle(): void;
    show(): void;
    hide(force: any): void;
}
declare namespace Modal {
    namespace init {
        export { modalComponent as component };
        export { modalSelector as selector };
        export { Modal as constructor };
    }
}
export default Modal;
import BaseComponent from "./base-component.js";
declare const modalComponent: "Modal";
declare const modalSelector: string;
