import { $ as e, B as t, I as n, K as r, L as i, P as a, R as o, U as s, bt as c, ft as l, m as u, n as d, o as f, ot as p, pt as m, q as h, r as g, t as _, tt as v, vt as y } from "./base-component-Bm8KwB_I.mjs";
import { t as b } from "./fadeClass-Bzjdr13Y.mjs";
import { t as x } from "./showClass-CH6sh0pm.mjs";
import { t as S } from "./dataBsDismiss-D_m2Bp4t.mjs";
import { t as C } from "./isDisabled-CA05SUmE.mjs";
import { t as w } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as T } from "./getTargetElement-CNLJ8Fpo.mjs";
//#region src/strings/toastString.ts
var E = "toast", D = "Toast", O = `.${E}`, k = `[${S}="${E}"]`, A = `[${w}="${E}"]`, j = "showing", M = "hide", N = {
	animation: !0,
	autohide: !0,
	delay: 5e3
}, P = (e) => m(e, D), F = (e) => new K(e), I = p(`show.bs.${E}`), L = p(`shown.bs.${E}`), R = p(`hide.bs.${E}`), z = p(`hidden.bs.${E}`), B = (t) => {
	let { element: r, options: a } = t;
	i(r, j), e.clear(r, j), n(r, L), a.autohide && e.set(r, () => t.hide(), a.delay, E);
}, V = (t) => {
	let { element: r } = t;
	i(r, j), i(r, x), u(r, M), e.clear(r, E), n(r, z);
}, H = (e) => {
	let { element: t, options: n } = e;
	u(t, j), n.animation ? (s(t), l(t, () => V(e))) : V(e);
}, U = (t) => {
	let { element: n, options: r } = t;
	e.set(n, () => {
		i(n, M), s(n), u(n, x), u(n, j), r.animation ? l(n, () => B(t)) : B(t);
	}, 17, j);
};
function W(e) {
	let t = T(this), n = t && P(t);
	C(this) || n && (this.tagName === "A" && e.preventDefault(), n.relatedTarget = this, n.show());
}
var G = (t) => {
	let n = t.target, r = P(n), { type: i, relatedTarget: a } = t;
	!r || n === a || n.contains(a) || (["mouseenter", "focusin"].includes(i) ? e.clear(n, E) : e.set(n, () => r.hide(), r.options.delay, E));
}, K = class extends _ {
	static selector = O;
	static init = F;
	static getInstance = P;
	constructor(e, t) {
		super(e, t);
		let { element: n, options: s } = this;
		s.animation && !o(n, "fade") ? u(n, b) : !s.animation && o(n, "fade") && i(n, b), this.dismiss = a(k, n), this.triggers = [...h(A, r(n))].filter((e) => T(e) === n), this._toggleEventListeners(!0);
	}
	get name() {
		return D;
	}
	get defaults() {
		return N;
	}
	get isShown() {
		return o(this.element, x);
	}
	show = () => {
		let { element: e, isShown: t } = this;
		!e || t || (n(e, I), I.defaultPrevented || U(this));
	};
	hide = () => {
		let { element: e, isShown: t } = this;
		!e || !t || (n(e, R), R.defaultPrevented || H(this));
	};
	_toggleEventListeners = (e) => {
		let n = e ? d : g, { element: r, triggers: i, dismiss: a, options: o, hide: s } = this;
		a && n(a, y, s), o.autohide && [
			t,
			v,
			c,
			f
		].forEach((e) => n(r, e, G)), i.length && i.forEach((e) => {
			n(e, y, W);
		});
	};
	dispose() {
		let { element: t, isShown: n } = this;
		this._toggleEventListeners(), e.clear(t, E), n && i(t, x), super.dispose();
	}
};
//#endregion
export { K as default };

//# sourceMappingURL=toast.mjs.map