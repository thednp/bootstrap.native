import { B as k, t as q, Z as p, b as l, Y as r, R as x, e as H, d as P, q as m, m as g, h as a, f as b, s as S, E as R, r as Y, v as T, a9 as D, aa as Z, w as y, A as N } from "./base-component-CQAH5ZXF.mjs";
import { f as d } from "./fadeClass-CLIYI_zn.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as j } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as z } from "./dataBsToggle-B84TS15h.mjs";
import { g as B } from "./getTargetElement-v_1VfmtN.mjs";
import { i as F } from "./isDisabled-bThyhy2g.mjs";
const o = "toast", A = "Toast", G = `.${o}`, J = `[${j}="${o}"]`, K = `[${z}="${o}"]`, c = "showing", I = "hide", M = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, w = (e) => q(e, A), O = (e) => new st(e), v = g(
  `show.bs.${o}`
), Q = g(
  `shown.bs.${o}`
), E = g(
  `hide.bs.${o}`
), U = g(
  `hidden.bs.${o}`
), C = (e) => {
  const { element: t, options: s } = e;
  r(t, c), a.clear(t, c), m(t, Q), s.autohide && a.set(t, () => e.hide(), s.delay, o);
}, $ = (e) => {
  const { element: t } = e;
  r(t, c), r(t, f), l(t, I), a.clear(t, o), m(t, U);
}, V = (e) => {
  const { element: t, options: s } = e;
  l(t, c), s.animation ? (b(t), S(t, () => $(e))) : $(e);
}, W = (e) => {
  const { element: t, options: s } = e;
  a.set(
    t,
    () => {
      r(t, I), b(t), l(t, f), l(t, c), s.animation ? S(t, () => C(e)) : C(e);
    },
    17,
    c
  );
};
function X(e) {
  const t = B(this), s = t && w(t);
  F(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const tt = (e) => {
  const t = e.target, s = w(t), { type: n, relatedTarget: i } = e;
  !s || t === i || t.contains(i) || ([y, D].includes(n) ? a.clear(t, o) : a.set(t, () => s.hide(), s.options.delay, o));
};
class st extends k {
  static selector = G;
  static init = O;
  static getInstance = w;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: i } = this;
    i.animation && !p(n, d) ? l(n, d) : !i.animation && p(n, d) && r(n, d), this.dismiss = x(J, n), this.triggers = [
      ...H(
        K,
        P(n)
      )
    ].filter(
      (h) => B(h) === n
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return A;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return M;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return p(this.element, f);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (m(t, v), v.defaultPrevented || W(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (m(t, E), E.defaultPrevented || V(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? R : Y, { element: n, triggers: i, dismiss: h, options: L, hide: _ } = this;
    h && s(h, T, _), L.autohide && [D, Z, y, N].forEach(
      (u) => s(n, u, tt)
    ), i.length && i.forEach((u) => {
      s(u, T, X);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), a.clear(t, o), s && r(t, f), super.dispose();
  }
}
export {
  st as default
};
//# sourceMappingURL=toast.mjs.map
