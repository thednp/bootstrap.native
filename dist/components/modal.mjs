import { W as T, g as F, e as Z, c as S, k as c, Q as u, L as B, o as x, N as I, F as L, V as R, z as y, y as _, p as tt, w as v, u as A, X as et, M as N, a0 as P, a1 as W, d as z, B as G, a2 as st, R as ot, J as at, $ as nt, n as it, O as rt, G as b, r as lt } from "./shorty-f5e32a8f.js";
import { E as J, r as V } from "./event-listener-e555c4ba.js";
import { d as dt } from "./dataBsToggle-330f300b.js";
import { d as ct } from "./dataBsDismiss-afbfbc79.js";
import { f as mt } from "./fadeClass-0d50d035.js";
import { s as i } from "./showClass-f6a4d601.js";
import { m as r } from "./offcanvasString-ecc53af6.js";
import { m as j, o as gt } from "./offcanvasComponent-9ef54707.js";
import { g as q } from "./getTargetElement-bc4f0355.js";
import { measureScrollbar as ht, setScrollbar as ft } from "./scrollbar.mjs";
import { getCurrentOpen as M, appendOverlay as pt, toggleOverlayType as ut, showOverlay as vt, hideOverlay as K, overlay as h, removeOverlay as bt, modalActiveSelector as Tt } from "./backdrop.mjs";
import St from "./isVisible.mjs";
import yt from "./base-component.mjs";
import { hasPopup as wt } from "./popupContainer.mjs";
const Mt = `.${r}`, Q = `[${dt}="${r}"]`, $t = `[${ct}="${r}"]`, X = `${r}-static`, Dt = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => B(s, j), Ht = (s) => new Ft(s), p = T(`show.bs.${r}`), $ = T(`shown.bs.${r}`), w = T(`hide.bs.${r}`), D = T(`hidden.bs.${r}`), U = (s) => {
  const { element: t } = s, e = ht(t), { clientHeight: o, scrollHeight: a } = _(t), { clientHeight: l, scrollHeight: d } = t, n = l !== d;
  if (!n && e) {
    const m = tt(t) ? "paddingLeft" : "paddingRight", g = {};
    g[m] = `${e}px`, v(t, g);
  }
  ft(t, n || o !== a);
}, Y = (s, t) => {
  const e = t ? J : V, { element: o } = s;
  e(o, A, Et), e(nt(o), at, s.update, ot), e(S(o), it, Ct);
}, H = (s, t) => {
  const e = t ? J : V, { triggers: o } = s;
  o.length && o.forEach((a) => e(a, A, kt));
}, k = (s, t) => {
  const { triggers: e, element: o, relatedTarget: a } = s;
  bt(o), v(o, { paddingRight: "", display: "" }), Y(s);
  const l = p.relatedTarget || e.find(St);
  l && G(l), st(t) && t(), D.relatedTarget = a, u(o, D);
}, C = (s) => {
  const { element: t, relatedTarget: e } = s;
  G(t), Y(s, !0), $.relatedTarget = e, u(t, $);
}, E = (s) => {
  const { element: t, hasFade: e } = s;
  v(t, { display: "block" }), U(s), M(t) || v(et(t), { overflow: "hidden" }), N(t, i), R(t, P), L(t, W, "true"), e ? y(t, () => C(s)) : C(s);
}, O = (s, t) => {
  const { element: e, options: o, hasFade: a } = s;
  o.backdrop && !t && a && c(h, i) && !M(e) ? (K(), y(h, () => k(s))) : k(s, t);
}, kt = (s) => {
  const { target: t } = s, e = t && z(t, Q), o = e && q(e), a = o && f(o);
  a && (e && e.tagName === "A" && s.preventDefault(), a.relatedTarget = e, a.toggle());
}, Ct = ({ code: s, target: t }) => {
  const e = F(Tt, S(t)), o = e && f(e);
  if (!o)
    return;
  const { options: a } = o;
  a.keyboard && s === rt && c(e, i) && (o.relatedTarget = null, o.hide());
};
function Et(s) {
  const t = f(this);
  if (!t || b.get(this))
    return;
  const { options: e, isStatic: o, modalDialog: a } = t, { backdrop: l } = e, { target: d } = s, n = S(this)?.getSelection()?.toString().length, m = a?.contains(d), g = d && z(d, $t);
  o && !m ? b.set(
    this,
    () => {
      N(this, X), y(a, () => Ot(t));
    },
    17
  ) : (g || !n && !o && !m && l) && (t.relatedTarget = g || null, t.hide(), s.preventDefault());
}
const Ot = (s) => {
  const { element: t, modalDialog: e } = s, o = (lt(e) ? x(e) : 0) + 17;
  I(t, X), b.set(t, () => b.clear(t), o);
};
class Ft extends yt {
  static selector = Mt;
  static init = Ht;
  static getInstance = f;
  constructor(t, e) {
    super(t, e);
    const { element: o } = this;
    this.modalDialog = F(`.${r}-dialog`, o), this.triggers = [...Z(Q, S(o))].filter(
      (a) => q(a) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = c(o, mt), this.relatedTarget = null, H(this, !0), this.update = this.update.bind(this);
  }
  get name() {
    return j;
  }
  get defaults() {
    return Dt;
  }
  toggle() {
    c(this.element, i) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: e, hasFade: o, relatedTarget: a } = this, { backdrop: l } = e;
    let d = 0;
    if (c(t, i) || (p.relatedTarget = a || void 0, u(t, p), p.defaultPrevented))
      return;
    const n = M(t);
    if (n && n !== t) {
      const m = f(n) || B(n, gt);
      m && m.hide();
    }
    l ? (wt(h) ? ut(!0) : pt(t, o, !0), d = x(h), vt(), setTimeout(() => E(this), d)) : (E(this), n && c(h, i) && K());
  }
  hide(t) {
    const { element: e, hasFade: o, relatedTarget: a } = this;
    c(e, i) && (w.relatedTarget = a || void 0, u(e, w), !w.defaultPrevented && (I(e, i), L(e, P, "true"), R(e, W), o ? y(e, () => O(this, t)) : O(this, t)));
  }
  update() {
    c(this.element, i) && U(this);
  }
  dispose() {
    H(this), this.hide(() => super.dispose());
  }
}
export {
  Ft as default
};
//# sourceMappingURL=modal.mjs.map
