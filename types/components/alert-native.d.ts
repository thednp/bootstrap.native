declare class Alert extends BaseComponent {
    constructor(target: any);
    dismiss: any;
    relatedTarget: any;
    close(e: any): void;
}
declare namespace Alert {
    namespace init {
        export { alertComponent as component };
        export { alertSelector as selector };
        export { Alert as constructor };
    }
}
export default Alert;
import BaseComponent from "./base-component.js";
declare const alertComponent: "Alert";
declare const alertSelector: string;
