declare class Carousel extends BaseComponent {
    constructor(target: any, config: any);
    timer: NodeJS.Timer | null;
    direction: string;
    isPaused: boolean;
    isAnimating: boolean;
    index: number;
    isTouch: boolean;
    slides: any;
    controls: any[];
    indicator: any;
    indicators: any;
    cycle(): void;
    pause(): void;
    next(): void;
    prev(): void;
    to(idx: any): void;
}
declare namespace Carousel {
    namespace init {
        export { carouselComponent as component };
        export { carouselSelector as selector };
        export { Carousel as constructor };
    }
}
export default Carousel;
import BaseComponent from "./base-component.js";
declare const carouselComponent: "Carousel";
declare const carouselSelector: string;
