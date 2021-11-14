declare class Popover extends BaseComponent {
    constructor(target: any, config: any);
    timer: any;
    popover: any;
    arrow: any;
    btn: any;
    enabled: boolean;
    id: string;
    positions: {
        elementPosition: string;
        containerIsRelative: boolean;
        containerIsStatic: boolean;
        relContainer: any;
    };
    update(e: any): void;
    toggle(e: any): void;
    show(e: any): void;
    hide(e: any): void;
    enable(): void;
    disable(): void;
    toggleEnabled(): void;
}
declare namespace Popover {
    namespace init {
        export { popoverComponent as component };
        export { popoverSelector as selector };
        export { Popover as constructor };
    }
}
export default Popover;
import BaseComponent from "./base-component.js";
declare const popoverComponent: "Popover";
declare const popoverSelector: string;
