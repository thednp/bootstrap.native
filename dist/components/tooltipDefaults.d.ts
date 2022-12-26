export interface BaseOptions {
	[key: string]: any;
}
export interface TooltipOptions extends BaseOptions {
	template: string | HTMLElement;
	title: string | HTMLElement;
	customClass: string;
	trigger: string;
	placement: "top" | "bottom" | "left" | "right";
	sanitizeFn?: (str: string) => string;
	animation: boolean;
	delay: number;
	content: string | HTMLElement;
	dismissible: boolean;
	btnClose: string | HTMLElement;
}
declare const tooltipDefaults: TooltipOptions;

export {
	tooltipDefaults as default,
};

export {};
