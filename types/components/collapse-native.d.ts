declare class Collapse extends BaseComponent {
    constructor(target: any, config: any);
    triggers: Element[];
    parent: any;
    isAnimating: boolean;
    toggle(related: any): void;
    hide(): void;
    show(): void;
}
declare namespace Collapse {
    namespace init {
        export { collapseComponent as component };
        export { collapseSelector as selector };
        export { Collapse as constructor };
    }
}
export default Collapse;
import BaseComponent from "./base-component.js";
declare const collapseComponent: "Collapse";
declare const collapseSelector: string;
