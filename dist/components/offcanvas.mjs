import { W as m, B as R, b as U, a as g, k as l, Q as h, L as I, o as Y, M as b, N as S, z as $, s as T, O as Z, K as y, S as M, F as w, V as P, v as z, X as _, x as ee, u as J, l as te, d as K, g as C, J as se } from "./base-component-215a274f.js";
import { E as L, d as V } from "./event-listener-097fdcc5.js";
import { d as ne } from "./dataBsDismiss-afbfbc79.js";
import { d as ae } from "./dataBsToggle-330f300b.js";
import { s as r } from "./showClass-f6a4d601.js";
import { h as oe, o } from "./popupContainer-26c3059d.js";
import { g as W } from "./getTargetElement-bb362549.js";
import { g as D, a as ie, t as re, s as ce, h as j, o as c, i as fe, r as le, b as ge, d as q } from "./isVisible-f75ee887.js";
import "./fadeClass-0d50d035.js";
const F = "Offcanvas", de = `.${o}`, E = `[${ae}="${o}"]`, ve = `[${ne}="${o}"]`, u = `${o}-toggling`, he = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, d = (n) => I(n, F), me = (n) => new ye(n), v = m(`show.bs.${o}`), Q = m(`shown.bs.${o}`), O = m(`hide.bs.${o}`), X = m(`hidden.bs.${o}`), ue = (n) => {
  const { element: e } = n, { clientHeight: t, scrollHeight: s } = ee(e);
  ge(e, t !== s);
}, B = (n, e) => {
  const t = e ? L : V;
  n.triggers.forEach((s) => t(s, J, pe));
}, G = (n, e) => {
  const t = e ? L : V, s = g(n.element);
  t(s, te, be), t(s, J, Oe);
}, A = (n) => {
  const { element: e, options: t } = n;
  t.scroll || (ue(n), T(Z(e), { overflow: "hidden" })), b(e, u), b(e, r), T(e, { visibility: "visible" }), $(e, () => Te(n));
}, N = (n, e) => {
  const { element: t, options: s } = n, a = D(t);
  t.blur(), !a && s.backdrop && l(c, r) ? (j(), $(c, () => x(n, e))) : x(n, e);
}, pe = (n) => {
  const e = K(n.target, E), t = e && W(e), s = t && d(t);
  s && (s.relatedTarget = e, s.toggle(), e && e.tagName === "A" && n.preventDefault());
}, Oe = (n) => {
  const { target: e } = n, t = C(q, g(e)), s = C(ve, t), a = t && d(t);
  if (!a)
    return;
  const { options: i, triggers: k } = a, { backdrop: f } = i, p = K(e, E), H = g(t).getSelection();
  c.contains(e) && f === "static" || (!(H && H.toString().length) && (!t.contains(e) && f && (!p || k.includes(e)) || s && s.contains(e)) && (a.relatedTarget = s && s.contains(e) ? s : null, a.hide()), p && p.tagName === "A" && n.preventDefault());
}, be = ({ code: n, target: e }) => {
  const t = C(q, g(e)), s = t && d(t);
  !s || s.options.keyboard && n === se && (s.relatedTarget = null, s.hide());
}, Te = (n) => {
  const { element: e } = n;
  S(e, u), y(e, M), w(e, P, "true"), w(e, "role", "dialog"), h(e, Q), G(n, !0), z(e);
}, x = (n, e) => {
  const { element: t, triggers: s } = n;
  w(t, M, "true"), y(t, P), y(t, "role"), T(t, { visibility: "" });
  const a = v.relatedTarget || s.find(fe);
  a && z(a), le(t), h(t, X), S(t, u), D(t) || G(n), _(e) && e();
};
class ye extends R {
  static selector = de;
  static init = me;
  static getInstance = d;
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [...U(E, g(s))].filter(
      (a) => W(a) === s
    ), this.relatedTarget = null, B(this, !0);
  }
  get name() {
    return F;
  }
  get defaults() {
    return he;
  }
  toggle() {
    l(this.element, r) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, relatedTarget: s } = this;
    let a = 0;
    if (l(e, r) || (v.relatedTarget = s || void 0, Q.relatedTarget = s || void 0, h(e, v), v.defaultPrevented))
      return;
    const i = D(e);
    if (i && i !== e) {
      const f = d(i) || I(i, "Modal");
      f && f.hide();
    }
    t.backdrop ? (oe(c) ? re() : ie(!0), a = Y(c), ce(), setTimeout(() => A(this), a)) : (A(this), i && l(c, r) && j());
  }
  hide(e) {
    const { element: t, relatedTarget: s } = this;
    !l(t, r) || (O.relatedTarget = s || void 0, X.relatedTarget = s || void 0, h(t, O), !O.defaultPrevented && (b(t, u), S(t, r), e ? N(this, e) : $(t, () => N(this, e))));
  }
  dispose() {
    B(this), this.hide(() => super.dispose());
  }
}
export {
  ye as default
};
//# sourceMappingURL=offcanvas.mjs.map
