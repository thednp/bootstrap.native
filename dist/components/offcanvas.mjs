import { B as J, e as V, d as f, Z as c, q as m, t as A, u as j, b as O, Y as S, s as D, m as h, F as T, a0 as z, $ as y, a1 as B, Q as w, a2 as P, K as _, a3 as I, E as L, r as q, S as M, k as U, v as x, R as C, l as W, _ as X } from "./base-component-DAxvn9am.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { h as se, o as i } from "./popupContainer-BxKTLA8g.mjs";
import { d as K, g as E, a as ae, t as oe, s as ne, h as N, o as l, i as ie, r as re, m as ce, c as le, f as Q } from "./isVisible-BWjkLKSb.mjs";
import { g as R } from "./getTargetElement-C1k_p6ls.mjs";
import { i as fe } from "./isDisabled-DRrRkHiq.mjs";
const ge = `.${i}`, Y = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, u = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => A(a, K), me = (a) => new we(a), v = h(`show.bs.${i}`), Z = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), F = h(`hidden.bs.${i}`), he = (a) => {
  const { element: e } = a, { clientHeight: t, scrollHeight: s } = M(e);
  le(e, t !== s);
}, G = (a, e) => {
  const t = e ? L : q, s = f(a.element);
  t(s, U, Oe), t(s, x, be);
}, H = (a) => {
  const { element: e, options: t } = a;
  t.scroll || (he(a), T(z(e), { overflow: "hidden" })), O(e, u), O(e, n), T(e, { visibility: "visible" }), D(e, () => Te(a));
}, ue = (a) => {
  const { element: e, options: t } = a, s = E(e);
  e.blur(), !s && t.backdrop && c(l, n) && N(), D(e, () => ye(a));
};
function pe(a) {
  const e = R(this), t = e && g(e);
  fe(this) || t && (t.relatedTarget = this, t.toggle(), this.tagName === "A" && a.preventDefault());
}
const be = (a) => {
  const { target: e } = a, t = C(
    Q,
    f(e)
  );
  if (!t) return;
  const s = C(
    de,
    t
  ), o = g(t);
  if (!o) return;
  const { options: r, triggers: d } = o, { backdrop: $ } = r, p = W(e, Y), k = f(t).getSelection();
  l.contains(e) && $ === "static" || (!(k && k.toString().length) && (!t.contains(e) && $ && (!p || d.includes(e)) || s && s.contains(e)) && (o.relatedTarget = s && s.contains(e) ? s : void 0, o.hide()), p && p.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const t = C(
    Q,
    f(e)
  ), s = t && g(t);
  s && s.options.keyboard && a === X && (s.relatedTarget = void 0, s.hide());
}, Te = (a) => {
  const { element: e } = a;
  S(e, u), y(e, B), w(e, P, "true"), w(e, "role", "dialog"), m(e, Z), G(a, !0), _(e), I(e);
}, ye = (a) => {
  const { element: e, triggers: t } = a;
  w(e, B, "true"), y(e, P), y(e, "role"), T(e, { visibility: "" });
  const s = v.relatedTarget || t.find(ie);
  s && _(s), re(e), m(e, F), S(e, u), I(e), E(e) || G(a);
};
class we extends J {
  static selector = ge;
  static init = me;
  static getInstance = g;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [
      ...V(
        Y,
        f(s)
      )
    ].filter(
      (o) => R(o) === s
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return K;
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
    const { element: e, options: t, relatedTarget: s } = this;
    let o = 0;
    if (c(e, n) || (v.relatedTarget = s || void 0, Z.relatedTarget = s || void 0, m(e, v), v.defaultPrevented)) return;
    const r = E(e);
    if (r && r !== e) {
      const d = g(r) || A(
        r,
        ce
      );
      d && d.hide();
    }
    t.backdrop ? (se(l) ? oe() : ae(e, !0), o = j(l), ne(), setTimeout(() => H(this), o)) : (H(this), r && c(l, n) && N());
  }
  hide() {
    const { element: e, relatedTarget: t } = this;
    c(e, n) && (b.relatedTarget = t || void 0, F.relatedTarget = t || void 0, m(e, b), !b.defaultPrevented && (O(e, u), S(e, n), ue(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (e) => {
    const t = e ? L : q;
    this.triggers.forEach((s) => {
      t(s, x, pe);
    });
  };
  dispose() {
    const { element: e } = this, t = c(e, n), s = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), t ? D(e, s) : s();
  }
}
export {
  we as default
};
//# sourceMappingURL=offcanvas.mjs.map
