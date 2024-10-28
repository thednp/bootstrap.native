import { B as z, n as G, l as f, h as c, d as v, g as B, p as J, f as T, r as D, e as w, c as h, K as O, _ as R, Z as y, $ as I, s as E, a0 as _, N as q, a1 as L, Q as U, C as W, m as N, q as C, D as P, Y as X } from "./base-component-ylZzLp-h.mjs";
import { E as x, r as K } from "./event-listener-C1-Yf9Z5.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { h as se, o as i } from "./popupContainer-ymf2oGcv.mjs";
import { d as F, g as S, a as ae, t as oe, s as ne, h as M, o as l, i as ie, r as re, m as ce, c as le, f as Q } from "./isVisible-B3gs6dMb.mjs";
import { g as V } from "./getTargetElement-BFOUI7hP.mjs";
const fe = `.${i}`, k = `[${te}="${i}"]`, ge = `[${ee}="${i}"]`, u = `${i}-toggling`, de = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, g = (a) => B(a, F), me = (a) => new ye(a), m = h(`show.bs.${i}`), Y = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), Z = h(`hidden.bs.${i}`), ve = (a) => {
  const { element: e } = a, { clientHeight: s, scrollHeight: t } = U(e);
  le(e, s !== t);
}, j = (a, e) => {
  const s = e ? x : K, t = f(a.element);
  s(t, W, be), s(t, N, pe);
}, A = (a) => {
  const { element: e, options: s } = a;
  s.scroll || (ve(a), O(R(e), { overflow: "hidden" })), T(e, u), T(e, n), O(e, { visibility: "visible" }), w(e, () => Te(a));
}, he = (a) => {
  const { element: e, options: s } = a, t = S(e);
  e.blur(), !t && s.backdrop && c(l, n) && M(), w(e, () => Oe(a));
}, ue = (a) => {
  const e = P(a.target, k), s = e && V(e), t = s && g(s);
  t && (t.relatedTarget = e, t.toggle(), e && e.tagName === "A" && a.preventDefault());
}, pe = (a) => {
  const { target: e } = a, s = C(
    Q,
    f(e)
  ), t = C(
    ge,
    s
  ), o = s && g(s);
  if (o) {
    const { options: r, triggers: d } = o, { backdrop: $ } = r, p = P(e, k), H = f(s).getSelection();
    (!l.contains(e) || $ !== "static") && (!(H && H.toString().length) && (!s.contains(e) && $ && // istanbul ignore next @preserve
    (!p || d.includes(e)) || t && t.contains(e)) && (o.relatedTarget = t && t.contains(e) ? t : null, o.hide()), p && p.tagName === "A" && a.preventDefault());
  }
}, be = ({ code: a, target: e }) => {
  const s = C(
    Q,
    f(e)
  ), t = s && g(s);
  t && t.options.keyboard && a === X && (t.relatedTarget = null, t.hide());
}, Te = (a) => {
  const { element: e } = a;
  D(e, u), y(e, I), E(e, _, "true"), E(e, "role", "dialog"), v(e, Y), j(a, !0), q(e), L(e);
}, Oe = (a) => {
  const { element: e, triggers: s } = a;
  E(e, I, "true"), y(e, _), y(e, "role"), O(e, { visibility: "" });
  const t = m.relatedTarget || s.find(ie);
  t && q(t), re(e), v(e, Z), D(e, u), L(e), S(e) || j(a);
};
class ye extends z {
  static selector = fe;
  static init = me;
  static getInstance = g;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: t } = this;
    this.triggers = [
      ...G(k, f(t))
    ].filter(
      (o) => V(o) === t
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return F;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return de;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    c(this.element, n) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: s, relatedTarget: t } = this;
    let o = 0;
    if (!c(e, n) && (m.relatedTarget = t || void 0, Y.relatedTarget = t || void 0, v(e, m), !m.defaultPrevented)) {
      const r = S(e);
      if (r && r !== e) {
        const d = g(r) || // istanbul ignore next @preserve
        B(
          r,
          ce
        );
        d && d.hide();
      }
      s.backdrop ? (se(l) ? oe() : ae(e, !0), o = J(l), ne(), setTimeout(() => A(this), o)) : (A(this), r && c(l, n) && M());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: e, relatedTarget: s } = this;
    c(e, n) && (b.relatedTarget = s || void 0, Z.relatedTarget = s || void 0, v(e, b), b.defaultPrevented || (T(e, u), D(e, n), he(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (e) => {
    const s = e ? x : K;
    this.triggers.forEach(
      (t) => s(t, N, ue)
    );
  };
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element: e } = this, s = c(e, n), t = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? w(e, t) : t();
  }
}
export {
  ye as default
};
//# sourceMappingURL=offcanvas.mjs.map
