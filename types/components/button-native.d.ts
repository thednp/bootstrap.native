declare class Button extends BaseComponent {
    constructor(target: any);
    isActive: any;
    toggle(e: any): void;
}
declare namespace Button {
    namespace init {
        export { buttonComponent as component };
        export { buttonSelector as selector };
        export { Button as constructor };
    }
}
export default Button;
import BaseComponent from "./base-component.js";
declare const buttonComponent: "Button";
declare const buttonSelector: string;
