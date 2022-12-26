import { W as h, e as R, c as l, k as f, Q as v, L as P, o as U, M as b, N as D, z as S, u as x, w as T, X as Y, d as z, V as y, a0 as L, F as w, a1 as M, B as V, a2 as Z, y as _, n as ee, g as C, O as te } from "./shorty-f5e32a8f.js";
import { E as W, r as j } from "./event-listener-e555c4ba.js";
import { d as se } from "./dataBsDismiss-afbfbc79.js";
import { d as oe } from "./dataBsToggle-330f300b.js";
import { s as i } from "./showClass-f6a4d601.js";
import { o as a } from "./offcanvasString-ecc53af6.js";
import { o as q, m as ne } from "./offcanvasComponent-9ef54707.js";
import { g as F } from "./getTargetElement-bc4f0355.js";
import ae from "./isVisible.mjs";
import { setScrollbar as re } from "./scrollbar.mjs";
import { hasPopup as ie } from "./popupContainer.mjs";
import { getCurrentOpen as $, appendOverlay as ce, toggleOverlayType as fe, showOverlay as le, hideOverlay as J, overlay as c, removeOverlay as ge, offcanvasActiveSelector as K } from "./backdrop.mjs";
import de from "./base-component.mjs";
import "./fadeClass-0d50d035.js";
const me = `.${a}`, E = `[${oe}="${a}"]`, ve = `[${se}="${a}"]`, p = `${a}-toggling`, he = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (o) => P(o, q), pe = (o) => new we(o), m = h(`show.bs.${a}`), Q = h(`shown.bs.${a}`), O = h(`hide.bs.${a}`), X = h(`hidden.bs.${a}`), ue = (o) => {
  const { element: e } = o, { clientHeight: t, scrollHeight: s } = _(e);
  re(e, t !== s);
}, B = (o, e) => {
  const t = e ? W : j;
  o.triggers.forEach((s) => t(s, x, Oe));
}, G = (o, e) => {
  const t = e ? W : j, s = l(o.element);
  t(s, ee, Te), t(s, x, be);
}, A = (o) => {
  const { element: e, options: t } = o;
  t.scroll || (ue(o), T(Y(e), { overflow: "hidden" })), b(e, p), b(e, i), T(e, { visibility: "visible" }), S(e, () => ye(o));
}, N = (o, e) => {
  const { element: t, options: s } = o, n = $(t);
  t.blur(), !n && s.backdrop && f(c, i) ? (J(), S(c, () => I(o, e))) : I(o, e);
}, Oe = (o) => {
  const e = z(o.target, E), t = e && F(e), s = t && g(t);
  s && (s.relatedTarget = e, s.toggle(), e && e.tagName === "A" && o.preventDefault());
}, be = (o) => {
  const { target: e } = o, t = C(K, l(e)), s = C(ve, t), n = t && g(t);
  if (!n)
    return;
  const { options: r, triggers: d } = n, { backdrop: k } = r, u = z(e, E), H = l(t).getSelection();
  c.contains(e) && k === "static" || (!(H && H.toString().length) && (!t.contains(e) && k && (!u || d.includes(e)) || s && s.contains(e)) && (n.relatedTarget = s && s.contains(e) ? s : null, n.hide()), u && u.tagName === "A" && o.preventDefault());
}, Te = ({ code: o, target: e }) => {
  const t = C(K, l(e)), s = t && g(t);
  s && s.options.keyboard && o === te && (s.relatedTarget = null, s.hide());
}, ye = (o) => {
  const { element: e } = o;
  D(e, p), y(e, L), w(e, M, "true"), w(e, "role", "dialog"), v(e, Q), G(o, !0), V(e);
}, I = (o, e) => {
  const { element: t, triggers: s } = o;
  w(t, L, "true"), y(t, M), y(t, "role"), T(t, { visibility: "" });
  const n = m.relatedTarget || s.find(ae);
  n && V(n), ge(t), v(t, X), D(t, p), $(t) || G(o), Z(e) && e();
};
class we extends de {
  static selector = me;
  static init = pe;
  static getInstance = g;
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [...R(E, l(s))].filter(
      (n) => F(n) === s
    ), this.relatedTarget = null, B(this, !0);
  }
  get name() {
    return q;
  }
  get defaults() {
    return he;
  }
  toggle() {
    f(this.element, i) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, relatedTarget: s } = this;
    let n = 0;
    if (f(e, i) || (m.relatedTarget = s || void 0, Q.relatedTarget = s || void 0, v(e, m), m.defaultPrevented))
      return;
    const r = $(e);
    if (r && r !== e) {
      const d = g(r) || P(r, ne);
      d && d.hide();
    }
    t.backdrop ? (ie(c) ? fe() : ce(e, !0), n = U(c), le(), setTimeout(() => A(this), n)) : (A(this), r && f(c, i) && J());
  }
  hide(e) {
    const { element: t, relatedTarget: s } = this;
    f(t, i) && (O.relatedTarget = s || void 0, X.relatedTarget = s || void 0, v(t, O), !O.defaultPrevented && (b(t, p), D(t, i), e ? N(this, e) : S(t, () => N(this, e))));
  }
  dispose() {
    B(this), this.hide(() => super.dispose());
  }
}
export {
  we as default
};
//# sourceMappingURL=offcanvas.mjs.map
