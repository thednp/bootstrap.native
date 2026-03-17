import { I as e, L as t, P as n, R as r, ft as i, n as a, ot as o, pt as s, r as c, t as l, vt as u } from "./base-component-C7gLasBW.mjs";
import "./fadeClass-Bzjdr13Y.mjs";
import { t as d } from "./showClass-CH6sh0pm.mjs";
import { t as f } from "./dataBsDismiss-D_m2Bp4t.mjs";
import { t as p } from "./isDisabled-DCVGko_n.mjs";
//#region src/strings/alertString.ts
var m = "alert", h = "Alert", g = `.${m}`, _ = `[${f}="${m}"]`, v = (e) => s(e, h), y = (e) => new C(e), b = o(`close.bs.${m}`), x = o(`closed.bs.${m}`), S = (t) => {
	let { element: n } = t;
	e(n, x), t._toggleEventListeners(), t.dispose(), n.remove();
}, C = class extends l {
	static selector = g;
	static init = y;
	static getInstance = v;
	dismiss;
	constructor(e) {
		super(e), this.dismiss = n(_, this.element), this._toggleEventListeners(!0);
	}
	get name() {
		return h;
	}
	close = (n) => {
		let { element: a, dismiss: o } = this;
		!a || !r(a, "show") || n && o && p(o) || (e(a, b), !b.defaultPrevented && (t(a, d), r(a, "fade") ? i(a, () => S(this)) : S(this)));
	};
	_toggleEventListeners = (e) => {
		let t = e ? a : c, { dismiss: n, close: r } = this;
		n && t(n, u, r);
	};
	dispose() {
		this._toggleEventListeners(), super.dispose();
	}
};
//#endregion
export { C as default };

//# sourceMappingURL=alert.mjs.map