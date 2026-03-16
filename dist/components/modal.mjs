import { $ as e, A as t, E as n, F as r, I as i, K as a, L as o, P as s, R as c, T as l, X as u, a as d, d as f, ft as p, h as ee, ht as m, m as h, n as g, ot as _, pt as v, q as te, r as y, t as b, v as x, vt as S, x as C, yt as ne, z as w } from "./base-component-Bm8KwB_I.mjs";
import { t as re } from "./fadeClass-Bzjdr13Y.mjs";
import { t as T } from "./showClass-CH6sh0pm.mjs";
import { t as E } from "./dataBsDismiss-D_m2Bp4t.mjs";
import { t as D } from "./isDisabled-CA05SUmE.mjs";
import { t as O } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as k } from "./getTargetElement-CNLJ8Fpo.mjs";
import { a as A, n as ie } from "./popupContainer-cXLEqUgV.mjs";
import { a as ae, c as oe, d as se, f as ce, i as j, l as le, m as M, n as ue, r as N, s as P, t as F, u as I } from "./isVisible-Bwf_dI1N.mjs";
//#region src/components/modal.ts
var L = `.${A}`, R = `[${O}="${A}"]`, z = `[${E}="${A}"]`, B = `${A}-static`, V = {
	backdrop: !0,
	keyboard: !0
}, H = (e) => v(e, M), de = (e) => new $(e), U = _(`show.bs.${A}`), W = _(`shown.bs.${A}`), G = _(`hide.bs.${A}`), K = _(`hidden.bs.${A}`), q = (e) => {
	let { element: t } = e, n = se(t), { clientHeight: r, scrollHeight: i } = ne(t), { clientHeight: a, scrollHeight: o } = t, s = a !== o;
	!s && n && f(t, { [ee(t) ? "paddingLeft" : "paddingRight"]: `${n}px` }), ce(t, s || r !== i);
}, J = (e, t) => {
	let n = t ? g : y, { element: r } = e;
	n(r, S, me), n(a(r), u, pe), t ? e._observer.observe(r) : e._observer.disconnect();
}, Y = (e) => {
	let { triggers: t, element: n, relatedTarget: r } = e;
	oe(n), f(n, {
		paddingRight: "",
		display: ""
	}), J(e);
	let a = U.relatedTarget || t.find(F);
	a && w(a), K.relatedTarget = r || void 0, i(n, K), d(n);
}, X = (e) => {
	let { element: t, relatedTarget: n } = e;
	w(t), J(e, !0), W.relatedTarget = n || void 0, i(t, W), d(t);
}, Z = (e) => {
	let { element: i, hasFade: a } = e;
	f(i, { display: "block" }), q(e), N(i) || f(t(i), { overflow: "hidden" }), h(i, T), x(i, r), n(i, l, "true"), a ? p(i, () => X(e)) : X(e);
}, Q = (e) => {
	let { element: t, options: n, hasFade: r } = e;
	n.backdrop && r && c(P, "show") && !N(t) ? (j(), p(P, () => Y(e))) : Y(e);
};
function fe(e) {
	let t = k(this), n = t && H(t);
	D(this) || n && (this.tagName === "A" && e.preventDefault(), n.relatedTarget = this, n.toggle());
}
var pe = ({ code: e, target: t }) => {
	let n = s(ae, a(t)), r = n && H(n);
	if (!r) return;
	let { options: i } = r;
	i.keyboard && e === "Escape" && c(n, "show") && (r.relatedTarget = null, r.hide());
}, me = (t) => {
	let { currentTarget: n } = t, r = n && H(n);
	if (!r || !n || e.get(n)) return;
	let { options: i, isStatic: o, modalDialog: s } = r, { backdrop: c } = i, { target: l } = t, u = a(n)?.getSelection()?.toString().length, d = s.contains(l), f = l && C(l, z);
	o && !d ? e.set(n, () => {
		h(n, B), p(s, () => he(r));
	}, 17) : (f || !u && !o && !d && c) && (r.relatedTarget = f || null, r.hide(), t.preventDefault());
}, he = (t) => {
	let { element: n, modalDialog: r } = t, i = (m(r) || 0) + 17;
	o(n, B), e.set(n, () => e.clear(n), i);
}, $ = class extends b {
	static selector = L;
	static init = de;
	static getInstance = H;
	constructor(e, t) {
		super(e, t);
		let { element: n } = this, r = s(`.${A}-dialog`, n);
		r && (this.modalDialog = r, this.triggers = [...te(R, a(n))].filter((e) => k(e) === n), this.isStatic = this.options.backdrop === "static", this.hasFade = c(n, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
	}
	get name() {
		return M;
	}
	get defaults() {
		return V;
	}
	toggle() {
		c(this.element, "show") ? this.hide() : this.show();
	}
	show() {
		let { element: e, options: t, hasFade: n, relatedTarget: r } = this, { backdrop: a } = t, o = 0;
		if (c(e, "show") || (U.relatedTarget = r || void 0, i(e, U), U.defaultPrevented)) return;
		let s = N(e);
		if (s && s !== e) {
			let e = H(s) || v(s, "Offcanvas");
			e && e.hide();
		}
		a ? (ie(P) ? I(!0) : ue(e, n, !0), o = m(P), le(), setTimeout(() => Z(this), o)) : (Z(this), s && c(P, "show") && j());
	}
	hide() {
		let { element: e, hasFade: t, relatedTarget: a } = this;
		c(e, "show") && (G.relatedTarget = a || void 0, i(e, G), !G.defaultPrevented && (o(e, T), n(e, r, "true"), x(e, l), t ? p(e, () => Q(this)) : Q(this)));
	}
	update = () => {
		c(this.element, "show") && q(this);
	};
	_toggleEventListeners = (e) => {
		let t = e ? g : y, { triggers: n } = this;
		n.length && n.forEach((e) => {
			t(e, S, fe);
		});
	};
	dispose() {
		let { modalDialog: e, hasFade: t } = { ...this }, n = () => setTimeout(() => super.dispose(), 17);
		this.hide(), this._toggleEventListeners(), t ? p(e, n) : n();
	}
};
//#endregion
export { $ as default };

//# sourceMappingURL=modal.mjs.map