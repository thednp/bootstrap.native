import { E as e, L as t, R as n, m as r, n as i, p as a, pt as o, r as s, t as c, vt as l } from "./base-component-Bm8KwB_I.mjs";
import { t as u } from "./isDisabled-CA05SUmE.mjs";
import { t as d } from "./activeClass-LUKCeUHG.mjs";
import { t as f } from "./dataBsToggle-CeJMDTHb.mjs";
//#region src/strings/buttonString.ts
var p = "button", m = "Button", h = `[${f}="${p}"]`, g = (e) => o(e, m), _ = (e) => new v(e), v = class extends c {
	static selector = h;
	static init = _;
	static getInstance = g;
	constructor(t) {
		super(t);
		let { element: r } = this;
		this.isActive = n(r, d), e(r, a, String(!!this.isActive)), this._toggleEventListeners(!0);
	}
	get name() {
		return m;
	}
	toggle = (i) => {
		i && i.preventDefault();
		let { element: o, isActive: s } = this;
		u(o) || ((s ? t : r)(o, d), e(o, a, s ? "false" : "true"), this.isActive = n(o, d));
	};
	_toggleEventListeners = (e) => {
		(e ? i : s)(this.element, l, this.toggle);
	};
	dispose() {
		this._toggleEventListeners(), super.dispose();
	}
};
//#endregion
export { v as default };

//# sourceMappingURL=button.mjs.map