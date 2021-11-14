declare class Tab extends BaseComponent {
    constructor(target: any);
    nav: any;
    dropdown: any;
    tabContent: any;
    show(): void;
}
declare namespace Tab {
    namespace init {
        export { tabComponent as component };
        export { tabSelector as selector };
        export { Tab as constructor };
    }
}
export default Tab;
import BaseComponent from "./base-component.js";
declare const tabComponent: "Tab";
declare const tabSelector: string;
