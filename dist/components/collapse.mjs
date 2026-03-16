import { $ as e, C as t, E as n, I as r, J as i, K as a, L as o, P as s, R as c, U as l, V as u, b as d, d as f, ft as p, m, n as h, ot as g, pt as _, q as v, r as y, t as b, vt as x, x as S } from "./base-component-Bm8KwB_I.mjs";
import { t as C } from "./showClass-CH6sh0pm.mjs";
import { t as w } from "./isDisabled-CA05SUmE.mjs";
import { t as T } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as E } from "./getTargetElement-CNLJ8Fpo.mjs";
import { t as D } from "./collapsingClass-uyOZrepn.mjs";
//#region src/strings/collapseString.ts
var O = "collapse", k = "Collapse", A = `.${O}`, j = `[${T}="${O}"]`, M = { parent: null }, N = (e) => _(e, k), P = (e) => new H(e), F = g(`show.bs.${O}`), I = g(`shown.bs.${O}`), L = g(`hide.bs.${O}`), R = g(`hidden.bs.${O}`), z = (a) => {
	let { element: s, parent: c, triggers: l } = a;
	r(s, F), F.defaultPrevented || (e.set(s, i, 17), c && e.set(c, i, 17), m(s, D), o(s, O), f(s, { height: `${s.scrollHeight}px` }), p(s, () => {
		e.clear(s), c && e.clear(c), l.forEach((e) => n(e, t, "true")), o(s, D), m(s, O), m(s, C), f(s, { height: "" }), r(s, I);
	}));
}, B = (a) => {
	let { element: s, parent: c, triggers: u } = a;
	r(s, L), L.defaultPrevented || (e.set(s, i, 17), c && e.set(c, i, 17), f(s, { height: `${s.scrollHeight}px` }), o(s, O), o(s, C), m(s, D), l(s), f(s, { height: "0px" }), p(s, () => {
		e.clear(s), c && e.clear(c), u.forEach((e) => n(e, t, "false")), o(s, D), m(s, O), f(s, { height: "" }), r(s, R);
	}));
}, V = (e) => {
	let { target: t } = e, n = t && S(t, j), r = n && E(n), i = r && N(r);
	n && w(n) || i && (i.toggle(), n?.tagName === "A" && e.preventDefault());
}, H = class extends b {
	static selector = A;
	static init = P;
	static getInstance = N;
	constructor(e, t) {
		super(e, t);
		let { element: n, options: r } = this, i = a(n);
		this.triggers = [...v(j, i)].filter((e) => E(e) === n), this.parent = u(r.parent) ? r.parent : d(r.parent) ? E(n) || s(r.parent, i) : null, this._toggleEventListeners(!0);
	}
	get name() {
		return k;
	}
	get defaults() {
		return M;
	}
	hide() {
		let { triggers: t, element: n } = this;
		e.get(n) || (B(this), t.length && t.forEach((e) => m(e, `${O}d`)));
	}
	show() {
		let { element: t, parent: n, triggers: r } = this, i, a;
		n && (i = [...v(`.${O}.${C}`, n)].find((e) => N(e)), a = i && N(i)), (!n || !e.get(n)) && !e.get(t) && (a && i !== t && (B(a), a.triggers.forEach((e) => {
			m(e, `${O}d`);
		})), z(this), r.length && r.forEach((e) => o(e, `${O}d`)));
	}
	toggle() {
		c(this.element, "show") ? this.hide() : this.show();
	}
	_toggleEventListeners = (e) => {
		let t = e ? h : y, { triggers: n } = this;
		n.length && n.forEach((e) => {
			t(e, x, V);
		});
	};
	dispose() {
		this._toggleEventListeners(), super.dispose();
	}
};
//#endregion
export { H as default };

//# sourceMappingURL=collapse.mjs.map