import { A as e, E as t, F as n, I as r, K as i, L as a, P as o, R as s, T as c, X as l, a as u, d, ft as f, ht as p, m, n as h, ot as g, pt as _, q as ee, r as v, t as te, v as y, vt as b, x, yt as ne, z as S } from "./base-component-Bm8KwB_I.mjs";
import { t as C } from "./showClass-CH6sh0pm.mjs";
import { t as w } from "./dataBsDismiss-D_m2Bp4t.mjs";
import { t as T } from "./isDisabled-CA05SUmE.mjs";
import { t as E } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as D } from "./getTargetElement-CNLJ8Fpo.mjs";
import { i as O, n as k } from "./popupContainer-cXLEqUgV.mjs";
import { c as A, f as j, i as M, l as re, n as ie, o as N, p as P, r as F, s as I, t as L, u as R } from "./isVisible-Bwf_dI1N.mjs";
//#region src/components/offcanvas.ts
var z = `.${O}`, B = `[${E}="${O}"]`, V = `[${w}="${O}"]`, H = `${O}-toggling`, U = {
	backdrop: !0,
	keyboard: !0,
	scroll: !1
}, W = (e) => _(e, P), G = (e) => new $(e), K = g(`show.bs.${O}`), q = g(`shown.bs.${O}`), J = g(`hide.bs.${O}`), Y = g(`hidden.bs.${O}`), ae = (e) => {
	let { element: t } = e, { clientHeight: n, scrollHeight: r } = ne(t);
	j(t, n !== r);
}, X = (e, t) => {
	let n = t ? h : v, r = i(e.element);
	n(r, l, le), n(r, b, ce);
}, Z = (t) => {
	let { element: n, options: r } = t;
	r.scroll || (ae(t), d(e(n), { overflow: "hidden" })), m(n, H), m(n, C), d(n, { visibility: "visible" }), f(n, () => ue(t));
}, oe = (e) => {
	let { element: t, options: n } = e, r = F(t);
	t.blur(), !r && n.backdrop && s(I, "show") && M(), f(t, () => Q(e));
};
function se(e) {
	let t = D(this), n = t && W(t);
	T(this) || n && (n.relatedTarget = this, n.toggle(), this.tagName === "A" && e.preventDefault());
}
var ce = (e) => {
	let { target: t } = e, n = o(N, i(t));
	if (!n) return;
	let r = o(V, n), a = W(n);
	if (!a) return;
	let { options: s, triggers: c } = a, { backdrop: l } = s, u = x(t, B), d = i(n).getSelection();
	I.contains(t) && l === "static" || (!(d && d.toString().length) && (!n.contains(t) && l && (!u || c.includes(t)) || r && r.contains(t)) && (a.relatedTarget = r && r.contains(t) ? r : void 0, a.hide()), u && u.tagName === "A" && e.preventDefault());
}, le = ({ code: e, target: t }) => {
	let n = o(N, i(t)), r = n && W(n);
	r && r.options.keyboard && e === "Escape" && (r.relatedTarget = void 0, r.hide());
}, ue = (e) => {
	let { element: i } = e;
	a(i, H), y(i, n), t(i, c, "true"), t(i, "role", "dialog"), r(i, q), X(e, !0), S(i), u(i);
}, Q = (e) => {
	let { element: i, triggers: o } = e;
	t(i, n, "true"), y(i, c), y(i, "role"), d(i, { visibility: "" });
	let s = K.relatedTarget || o.find(L);
	s && S(s), A(i), r(i, Y), a(i, H), u(i), F(i) || X(e);
}, $ = class extends te {
	static selector = z;
	static init = G;
	static getInstance = W;
	constructor(e, t) {
		super(e, t);
		let { element: n } = this;
		this.triggers = [...ee(B, i(n))].filter((e) => D(e) === n), this.relatedTarget = void 0, this._toggleEventListeners(!0);
	}
	get name() {
		return P;
	}
	get defaults() {
		return U;
	}
	toggle() {
		s(this.element, "show") ? this.hide() : this.show();
	}
	show() {
		let { element: e, options: t, relatedTarget: n } = this, i = 0;
		if (s(e, "show") || (K.relatedTarget = n || void 0, q.relatedTarget = n || void 0, r(e, K), K.defaultPrevented)) return;
		let a = F(e);
		if (a && a !== e) {
			let e = W(a) || _(a, "Modal");
			e && e.hide();
		}
		t.backdrop ? (k(I) ? R() : ie(e, !0), i = p(I), re(), setTimeout(() => Z(this), i)) : (Z(this), a && s(I, "show") && M());
	}
	hide() {
		let { element: e, relatedTarget: t } = this;
		s(e, "show") && (J.relatedTarget = t || void 0, Y.relatedTarget = t || void 0, r(e, J), !J.defaultPrevented && (m(e, H), a(e, C), oe(this)));
	}
	_toggleEventListeners = (e) => {
		let t = e ? h : v;
		this.triggers.forEach((e) => {
			t(e, b, se);
		});
	};
	dispose() {
		let { element: e } = this, t = s(e, C), n = () => setTimeout(() => super.dispose(), 1);
		this.hide(), this._toggleEventListeners(), t ? f(e, n) : n();
	}
};
//#endregion
export { $ as default };

//# sourceMappingURL=offcanvas.mjs.map