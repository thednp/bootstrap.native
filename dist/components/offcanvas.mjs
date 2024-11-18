import { B as K, t as A, e as M, d as f, Z as c, m as h, q as m, u as V, S as X, F as O, $ as j, b as T, s as S, Y as D, a0 as y, a1 as B, Q as w, a2 as P, E as I, R as C, X as z, p as U, k as W, v as L, M as _, a3 as q, r as x } from "./base-component-CQAH5ZXF.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as n } from "./showClass-C8hdJfjQ.mjs";
import { o as i, h as se } from "./popupContainer-BvxACdvn.mjs";
import { o as N, g as E, m as ae, a as l, b as oe, t as ne, s as ie, d as re, f as Q, h as R, i as ce, r as le } from "./isVisible-D6KlD4UJ.mjs";
import { g as Y } from "./getTargetElement-v_1VfmtN.mjs";
import { i as fe } from "./isDisabled-bThyhy2g.mjs";
const ge = `.${i}`, Z = `[${te}="${i}"]`, de = `[${ee}="${i}"]`, u = `${i}-toggling`, ve = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, g = (a) => A(a, N), me = (a) => new we(a), v = h(`show.bs.${i}`), F = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), G = h(`hidden.bs.${i}`), he = (a) => {
  const { element: e } = a, { clientHeight: t, scrollHeight: s } = X(e);
  re(e, t !== s);
}, J = (a, e) => {
  const t = e ? I : x, s = f(a.element);
  t(s, U, Oe), t(s, L, be);
}, H = (a) => {
  const { element: e, options: t } = a;
  t.scroll || (he(a), O(j(e), { overflow: "hidden" })), T(e, u), T(e, n), O(e, { visibility: "visible" }), S(e, () => Te(a));
}, ue = (a) => {
  const { element: e, options: t } = a, s = E(e);
  e.blur(), !s && t.backdrop && c(l, n) && R(), S(e, () => ye(a));
};
function pe(a) {
  const e = Y(this), t = e && g(e);
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
  const { options: r, triggers: d } = o, { backdrop: $ } = r, p = W(e, Z), k = f(t).getSelection();
  l.contains(e) && $ === "static" || (!(k && k.toString().length) && (!t.contains(e) && $ && (!p || d.includes(e)) || s && s.contains(e)) && (o.relatedTarget = s && s.contains(e) ? s : void 0, o.hide()), p && p.tagName === "A" && a.preventDefault());
}, Oe = ({ code: a, target: e }) => {
  const t = C(
    Q,
    f(e)
  ), s = t && g(t);
  s && s.options.keyboard && a === z && (s.relatedTarget = void 0, s.hide());
}, Te = (a) => {
  const { element: e } = a;
  D(e, u), y(e, B), w(e, P, "true"), w(e, "role", "dialog"), m(e, F), J(a, !0), _(e), q(e);
}, ye = (a) => {
  const { element: e, triggers: t } = a;
  w(e, B, "true"), y(e, P), y(e, "role"), O(e, { visibility: "" });
  const s = v.relatedTarget || t.find(ce);
  s && _(s), le(e), m(e, G), D(e, u), q(e), E(e) || J(a);
};
class we extends K {
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
      ...M(
        Z,
        f(s)
      )
    ].filter(
      (o) => Y(o) === s
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return N;
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
    if (c(e, n) || (v.relatedTarget = s || void 0, F.relatedTarget = s || void 0, m(e, v), v.defaultPrevented)) return;
    const r = E(e);
    if (r && r !== e) {
      const d = g(r) || A(
        r,
        ae
      );
      d && d.hide();
    }
    t.backdrop ? (se(l) ? ne() : oe(e, !0), o = V(l), ie(), setTimeout(() => H(this), o)) : (H(this), r && c(l, n) && R());
  }
  hide() {
    const { element: e, relatedTarget: t } = this;
    c(e, n) && (b.relatedTarget = t || void 0, G.relatedTarget = t || void 0, m(e, b), !b.defaultPrevented && (T(e, u), D(e, n), ue(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (e) => {
    const t = e ? I : x;
    this.triggers.forEach((s) => {
      t(s, L, pe);
    });
  };
  dispose() {
    const { element: e } = this, t = c(e, n), s = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), t ? S(e, s) : s();
  }
}
export {
  we as default
};
//# sourceMappingURL=offcanvas.mjs.map
