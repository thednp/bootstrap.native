import { B as M, t as B, e as V, d as f, Z as c, m as h, q as m, u as X, S as j, F as O, $ as z, b as T, s as S, Y as D, a0 as y, a1 as P, Q as w, a2 as I, E as L, R as C, X as U, p as W, k as _, v as q, M as x, a3 as N, r as Q } from "./base-component-CQAH5ZXF.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { o as i, h as se } from "./popupContainer-BvxACdvn.mjs";
import { o as R, g as E, m as ae, a as l, b as oe, t as ne, s as ie, d as re, f as Y, h as Z, i as ce, r as le } from "./isVisible-D6KlD4UJ.mjs";
import { g as F } from "./getTargetElement-v_1VfmtN.mjs";
import { i as fe } from "./isDisabled-bThyhy2g.mjs";
const ge = `.${i}`, $ = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, p = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => B(a, R), me = (a) => new we(a), v = h(`show.bs.${i}`), G = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), J = h(`hidden.bs.${i}`), he = (a) => {
  const { element: e } = a, { clientHeight: s, scrollHeight: t } = j(e);
  re(e, s !== t);
}, K = (a, e) => {
  const s = e ? L : Q, t = f(a.element);
  s(t, W, Oe), s(t, q, be);
}, A = (a) => {
  const { element: e, options: s } = a;
  s.scroll || (he(a), O(z(e), { overflow: "hidden" })), T(e, p), T(e, n), O(e, { visibility: "visible" }), S(e, () => Te(a));
}, pe = (a) => {
  const { element: e, options: s } = a, t = E(e);
  e.blur(), !t && s.backdrop && c(l, n) && Z(), S(e, () => ye(a));
}, ue = (a) => {
  const e = _(a.target, $), s = e && F(e), t = s && g(s);
  t && (t.relatedTarget = e, t.toggle(), e?.tagName === "A" && a.preventDefault());
}, be = (a) => {
  const { target: e } = a, s = C(
    Y,
    f(e)
  );
  if (!s) return;
  const t = C(
    de,
    s
  ), o = g(s);
  if (!o) return;
  const { options: r, triggers: d } = o, { backdrop: k } = r, u = _(e, $), H = f(s).getSelection();
  l.contains(e) && k === "static" || (!(H && H.toString().length) && (!s.contains(e) && k && (!u || d.includes(e)) || t && t.contains(e)) && (o.relatedTarget = t && t.contains(e) ? t : void 0, o.hide()), u && u.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const s = C(
    Y,
    f(e)
  ), t = s && g(s);
  t && t.options.keyboard && a === U && (t.relatedTarget = void 0, t.hide());
}, Te = (a) => {
  const { element: e } = a;
  D(e, p), y(e, P), w(e, I, "true"), w(e, "role", "dialog"), m(e, G), K(a, !0), x(e), N(e);
}, ye = (a) => {
  const { element: e, triggers: s } = a;
  w(e, P, "true"), y(e, I), y(e, "role"), O(e, { visibility: "" });
  const t = v.relatedTarget || s.find(ce);
  t && x(t), le(e), m(e, J), D(e, p), N(e), E(e) || K(a);
};
class we extends M {
  static selector = ge;
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
      ...V(
        $,
        f(t)
      )
    ].filter(
      (o) => F(o) === t
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
    return ve;
  }
  toggle() {
    c(this.element, n) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, relatedTarget: t } = this;
    let o = 0;
    if (c(e, n) || (v.relatedTarget = t || void 0, G.relatedTarget = t || void 0, m(e, v), v.defaultPrevented)) return;
    const r = E(e);
    if (r && r !== e) {
      const d = g(r) || B(
        r,
        ae
      );
      d && d.hide();
    }
    s.backdrop ? (se(l) ? ne() : oe(e, !0), o = X(l), ie(), setTimeout(() => A(this), o)) : (A(this), r && c(l, n) && Z());
  }
  hide() {
    const { element: e, relatedTarget: s } = this;
    c(e, n) && (b.relatedTarget = s || void 0, J.relatedTarget = s || void 0, m(e, b), !b.defaultPrevented && (T(e, p), D(e, n), pe(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (e) => {
    const s = e ? L : Q;
    this.triggers.forEach((t) => {
      fe(t) || s(t, q, ue);
    });
  };
  dispose() {
    const { element: e } = this, s = c(e, n), t = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? S(e, t) : t();
  }
}
export {
  we as default
};
//# sourceMappingURL=offcanvas.mjs.map
