import { W as T, B as Z, g as F, b as _, a as S, k as h, Q as u, L as x, o as B, N as I, F as L, K as R, z as M, x as tt, p as et, s as v, O as st, M as A, S as N, V as P, u as W, v as z, X as at, d as G, R as ot, D as nt, $ as it, l as rt, J as lt, G as b, f as dt } from "./base-component-215a274f.js";
import { E as J, d as K } from "./event-listener-097fdcc5.js";
import { d as ct } from "./dataBsToggle-330f300b.js";
import { d as ht } from "./dataBsDismiss-afbfbc79.js";
import { f as gt } from "./fadeClass-0d50d035.js";
import { s as i } from "./showClass-f6a4d601.js";
import { h as mt, m as r } from "./popupContainer-26c3059d.js";
import { g as V } from "./getTargetElement-bb362549.js";
import { g as $, a as ft, t as pt, s as ut, h as j, m as vt, b as bt, o as m, r as Tt, i as St, c as Mt } from "./isVisible-f75ee887.js";
const q = "Modal", yt = `.${r}`, Q = `[${ct}="${r}"]`, $t = `[${ht}="${r}"]`, X = `${r}-static`, wt = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => x(s, q), Dt = (s) => new Ct(s), p = T(`show.bs.${r}`), w = T(`shown.bs.${r}`), y = T(`hide.bs.${r}`), D = T(`hidden.bs.${r}`), U = (s) => {
  const { element: t } = s, e = vt(t), { clientHeight: a, scrollHeight: o } = tt(t), { clientHeight: l, scrollHeight: d } = t, n = l !== d;
  if (!n && e) {
    const g = et(t) ? "paddingLeft" : "paddingRight", c = {};
    c[g] = `${e}px`, v(t, c);
  }
  bt(t, n || a !== o);
}, Y = (s, t) => {
  const e = t ? J : K, { element: a } = s;
  e(a, W, Ot), e(it(a), nt, s.update, ot), e(S(a), rt, kt);
}, H = (s, t) => {
  const e = t ? J : K, { triggers: a } = s;
  a.length && a.forEach((o) => e(o, W, Ht));
}, k = (s, t) => {
  const { triggers: e, element: a, relatedTarget: o } = s;
  Tt(a), v(a, { paddingRight: "", display: "" }), Y(s);
  const l = p.relatedTarget || e.find(St);
  l && z(l), at(t) && t(), D.relatedTarget = o, u(a, D);
}, O = (s) => {
  const { element: t, relatedTarget: e } = s;
  z(t), Y(s, !0), w.relatedTarget = e, u(t, w);
}, E = (s) => {
  const { element: t, hasFade: e } = s;
  v(t, { display: "block" }), U(s), $(t) || v(st(t), { overflow: "hidden" }), A(t, i), R(t, N), L(t, P, "true"), e ? M(t, () => O(s)) : O(s);
}, C = (s, t) => {
  const { element: e, options: a, hasFade: o } = s;
  a.backdrop && !t && o && h(m, i) && !$(e) ? (j(), M(m, () => k(s))) : k(s, t);
}, Ht = (s) => {
  const { target: t } = s, e = t && G(t, Q), a = e && V(e), o = a && f(a);
  !o || (e && e.tagName === "A" && s.preventDefault(), o.relatedTarget = e, o.toggle());
}, kt = ({ code: s, target: t }) => {
  const e = F(Mt, S(t)), a = e && f(e);
  if (!a)
    return;
  const { options: o } = a;
  o.keyboard && s === lt && h(e, i) && (a.relatedTarget = null, a.hide());
};
function Ot(s) {
  const t = f(this);
  if (!t || b.get(this))
    return;
  const { options: e, isStatic: a, modalDialog: o } = t, { backdrop: l } = e, { target: d } = s, n = S(this)?.getSelection()?.toString().length, g = o?.contains(d), c = d && G(d, $t);
  a && !g ? b.set(
    this,
    () => {
      A(this, X), M(o, () => Et(t));
    },
    17
  ) : (c || !n && !a && !g && l) && (t.relatedTarget = c || null, t.hide(), s.preventDefault());
}
const Et = (s) => {
  const { element: t, modalDialog: e } = s, a = (dt(e) ? B(e) : 0) + 17;
  I(t, X), b.set(t, () => b.clear(t), a);
};
class Ct extends Z {
  static selector = yt;
  static init = Dt;
  static getInstance = f;
  constructor(t, e) {
    super(t, e);
    const { element: a } = this;
    this.modalDialog = F(`.${r}-dialog`, a), this.triggers = [..._(Q, S(a))].filter(
      (o) => V(o) === a
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(a, gt), this.relatedTarget = null, H(this, !0), this.update = this.update.bind(this);
  }
  get name() {
    return q;
  }
  get defaults() {
    return wt;
  }
  toggle() {
    h(this.element, i) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: e, hasFade: a, relatedTarget: o } = this, { backdrop: l } = e;
    let d = 0;
    if (h(t, i) || (p.relatedTarget = o || void 0, u(t, p), p.defaultPrevented))
      return;
    const n = $(t);
    if (n && n !== t) {
      const c = f(n) || x(n, "Offcanvas");
      c && c.hide();
    }
    l ? (mt(m) ? pt(!0) : ft(a, !0), d = B(m), ut(), setTimeout(() => E(this), d)) : (E(this), n && h(m, i) && j());
  }
  hide(t) {
    const { element: e, hasFade: a, relatedTarget: o } = this;
    !h(e, i) || (y.relatedTarget = o || void 0, u(e, y), !y.defaultPrevented && (I(e, i), L(e, N, "true"), R(e, P), a ? M(e, () => C(this, t)) : C(this, t)));
  }
  update() {
    h(this.element, i) && U(this);
  }
  dispose() {
    H(this), this.hide(() => super.dispose());
  }
}
export {
  Ct as default
};
//# sourceMappingURL=modal.mjs.map
