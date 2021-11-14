declare class Toast extends BaseComponent {
    constructor(target: any, config: any);
    dismiss: any;
    show(): void;
    hide(noTimer: any): void;
}
declare namespace Toast {
    namespace init {
        export { toastComponent as component };
        export { toastSelector as selector };
        export { Toast as constructor };
    }
}
export default Toast;
import BaseComponent from "./base-component.js";
declare const toastComponent: "Toast";
declare const toastSelector: string;
