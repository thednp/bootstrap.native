declare class Tooltip extends BaseComponent {
    constructor(target: any, config: any);
    tooltip: any;
    arrow: any;
    timer: any;
    enabled: boolean;
    update(e: any): void;
    id: string;
    positions: {
        elementPosition: string;
        containerIsRelative: boolean;
        containerIsStatic: boolean;
        relContainer: any;
    };
    show(e: any): void;
    hide(e: any): void;
    toggle(): void;
    enable(): void;
    disable(): void;
    toggleEnabled(): void;
}
declare namespace Tooltip {
    namespace init {
        export { tooltipComponent as component };
        export { tooltipSelector as selector };
        export { Tooltip as constructor };
    }
}
export default Tooltip;
import BaseComponent from "./base-component.js";
declare const tooltipComponent: "Tooltip";
declare const tooltipSelector: string;
