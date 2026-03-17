import { j as e, pt as t, z as n } from "./base-component-C7gLasBW.mjs";
import { t as r } from "./dataBsToggle-CeJMDTHb.mjs";
import "./dist-BwSus0tm.mjs";
import "./popupContainer-CsyRS4ZX.mjs";
import { a as i, i as a, n as o, o as s, r as c, t as l } from "./tooltip-BRGJMZYA.mjs";
//#region src/components/popover.ts
var u = `[${r}="${s}"],[data-tip="${s}"]`, d = e({}, o, {
	template: a(s),
	content: "",
	dismissible: !1,
	btnClose: "<button class=\"btn-close position-absolute top-0 end-0 m-1\" aria-label=\"Close\"></button>"
}), f = (e) => t(e, i), p = (e) => new m(e), m = class extends l {
	static selector = u;
	static init = p;
	static getInstance = f;
	static styleTip = c;
	constructor(e, t) {
		super(e, t);
	}
	get name() {
		return i;
	}
	get defaults() {
		return d;
	}
	show = () => {
		super.show();
		let { options: e, btn: t } = this;
		e.dismissible && t && setTimeout(() => n(t), 17);
	};
};
//#endregion
export { m as default };

//# sourceMappingURL=popover.mjs.map