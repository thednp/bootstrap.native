import { B as W, c as X, d as f, Y as c, q as m, t as B, i as j, b as O, Z as S, r as $, v as h, F as T, _ as z, X as y, $ as I, Q as w, a0 as P, I as _, a1 as L, S as J, o as M, m as q, R as C, p as x, W as U } from "./base-component-Jx2aafTJ.mjs";
import { E as N, r as Q } from "./event-listener-CUwvA4j6.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { h as se, o as i } from "./popupContainer-CgZsH2ur.mjs";
import { d as R, g as D, a as oe, t as ae, s as ne, h as Y, o as l, i as ie, r as re, m as ce, c as le, f as Z } from "./isVisible-DLMDMGcf.mjs";
import { g as F } from "./getTargetElement-Bv0W3Fir.mjs";
const fe = `.${i}`, E = `[${te}="${i}"]`, ge = `[${ee}="${i}"]`, p = `${i}-toggling`, de = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (o) => B(o, R), ve = (o) => new ye(o), v = h(`show.bs.${i}`), G = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), K = h(`hidden.bs.${i}`), me = (o) => {
  const { element: e } = o, { clientHeight: s, scrollHeight: t } = J(e);
  le(e, s !== t);
}, V = (o, e) => {
  const s = e ? N : Q, t = f(o.element);
  s(t, M, be), s(t, q, ue);
}, A = (o) => {
  const { element: e, options: s } = o;
  s.scroll || (me(o), T(z(e), { overflow: "hidden" })), O(e, p), O(e, n), T(e, { visibility: "visible" }), $(e, () => Oe(o));
}, he = (o) => {
  const { element: e, options: s } = o, t = D(e);
  e.blur(), !t && s.backdrop && c(l, n) && Y(), $(e, () => Te(o));
}, pe = (o) => {
  const e = x(o.target, E), s = e && F(e), t = s && g(s);
  t && (t.relatedTarget = e, t.toggle(), e?.tagName === "A" && o.preventDefault());
}, ue = (o) => {
  const { target: e } = o, s = C(
    Z,
    f(e)
  );
  if (!s) return;
  const t = C(
    ge,
    s
  ), a = g(s);
  if (!a) return;
  const { options: r, triggers: d } = a, { backdrop: k } = r, u = x(e, E), H = f(s).getSelection();
  l.contains(e) && k === "static" || (!(H && H.toString().length) && (!s.contains(e) && k && (!u || d.includes(e)) || t && t.contains(e)) && (a.relatedTarget = t && t.contains(e) ? t : void 0, a.hide()), u && u.tagName === "A" && o.preventDefault());
}, be = ({ code: o, target: e }) => {
  const s = C(
    Z,
    f(e)
  ), t = s && g(s);
  t && t.options.keyboard && o === U && (t.relatedTarget = void 0, t.hide());
}, Oe = (o) => {
  const { element: e } = o;
  S(e, p), y(e, I), w(e, P, "true"), w(e, "role", "dialog"), m(e, G), V(o, !0), _(e), L(e);
}, Te = (o) => {
  const { element: e, triggers: s } = o;
  w(e, I, "true"), y(e, P), y(e, "role"), T(e, { visibility: "" });
  const t = v.relatedTarget || s.find(ie);
  t && _(t), re(e), m(e, K), S(e, p), L(e), D(e) || V(o);
};
class ye extends W {
  static selector = fe;
  static init = ve;
  static getInstance = g;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: t } = this;
    this.triggers = [
      ...X(
        E,
        f(t)
      )
    ].filter(
      (a) => F(a) === t
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return R;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return de;
  }
  toggle() {
    c(this.element, n) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, relatedTarget: t } = this;
    let a = 0;
    if (c(e, n) || (v.relatedTarget = t || void 0, G.relatedTarget = t || void 0, m(e, v), v.defaultPrevented)) return;
    const r = D(e);
    if (r && r !== e) {
      const d = g(r) || B(
        r,
        ce
      );
      d && d.hide();
    }
    s.backdrop ? (se(l) ? ae() : oe(e, !0), a = j(l), ne(), setTimeout(() => A(this), a)) : (A(this), r && c(l, n) && Y());
  }
  hide() {
    const { element: e, relatedTarget: s } = this;
    c(e, n) && (b.relatedTarget = s || void 0, K.relatedTarget = s || void 0, m(e, b), !b.defaultPrevented && (O(e, p), S(e, n), he(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (e) => {
    const s = e ? N : Q;
    this.triggers.forEach(
      (t) => s(t, q, pe)
    );
  };
  dispose() {
    const { element: e } = this, s = c(e, n), t = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? $(e, t) : t();
  }
}
export {
  ye as default
};
//# sourceMappingURL=offcanvas.mjs.map
