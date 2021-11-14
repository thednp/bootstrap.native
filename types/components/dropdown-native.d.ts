declare class Dropdown extends BaseComponent {
    constructor(target: any, config: any);
    menu: any;
    originalClass: any[];
    menuEnd: any;
    menuItems: any[];
    open: any;
    toggle(related: any): void;
    show(related: any): void;
    hide(related: any): void;
}
declare namespace Dropdown {
    namespace init {
        export { dropdownComponent as component };
        export { dropdownSelector as selector };
        export { Dropdown as constructor };
    }
}
export default Dropdown;
import BaseComponent from "./base-component.js";
declare const dropdownComponent: "Dropdown";
declare const dropdownSelector: string;
