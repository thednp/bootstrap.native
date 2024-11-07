import { B as x, Y as u, b as l, Z as r, R as H, c as P, d as R, q as d, a6 as S, a7 as Y, g as y, w as Z, y as i, t as A, v as f, e as b, r as B, m as T, p as N } from "./base-component-Jx2aafTJ.mjs";
import { E as j, r as z } from "./event-listener-CUwvA4j6.mjs";
import { f as m } from "./fadeClass-CLIYI_zn.mjs";
import { s as g } from "./showClass-C8hdJfjQ.mjs";
import { d as F } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as G } from "./dataBsToggle-B84TS15h.mjs";
import { g as D } from "./getTargetElement-Bv0W3Fir.mjs";
const a = "toast", k = "Toast", J = `.${a}`, K = `[${F}="${a}"]`, I = `[${G}="${a}"]`, c = "showing", L = "hide", M = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, w = (e) => A(e, k), O = (e) => new st(e), v = f(
  `show.bs.${a}`
), Q = f(
  `shown.bs.${a}`
), E = f(
  `hide.bs.${a}`
), U = f(
  `hidden.bs.${a}`
), C = (e) => {
  const { element: t, options: s } = e;
  r(t, c), i.clear(t, c), d(t, Q), s.autohide && i.set(t, () => e.hide(), s.delay, a);
}, $ = (e) => {
  const { element: t } = e;
  r(t, c), r(t, g), l(t, L), i.clear(t, a), d(t, U);
}, V = (e) => {
  const { element: t, options: s } = e;
  l(t, c), s.animation ? (b(t), B(t, () => $(e))) : $(e);
}, W = (e) => {
  const { element: t, options: s } = e;
  i.set(
    t,
    () => {
      r(t, L), b(t), l(t, g), l(t, c), s.animation ? B(t, () => C(e)) : C(e);
    },
    17,
    c
  );
}, X = (e) => {
  const { target: t } = e, s = t && N(t, I), o = s && D(s), n = o && w(o);
  n && (s && s.tagName === "A" && e.preventDefault(), n.relatedTarget = s, n.show());
}, tt = (e) => {
  const t = e.target, s = w(t), { type: o, relatedTarget: n } = e;
  !s || t === n || t.contains(n) || ([y, S].includes(o) ? i.clear(t, a) : i.set(t, () => s.hide(), s.options.delay, a));
};
class st extends x {
  static selector = J;
  static init = O;
  static getInstance = w;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: o, options: n } = this;
    n.animation && !u(o, m) ? l(o, m) : !n.animation && u(o, m) && r(o, m), this.dismiss = H(K, o), this.triggers = [
      ...P(
        I,
        R(o)
      )
    ].filter(
      (h) => D(h) === o
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return k;
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
    return u(this.element, g);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (d(t, v), v.defaultPrevented || W(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (d(t, E), E.defaultPrevented || V(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? j : z, { element: o, triggers: n, dismiss: h, options: _, hide: q } = this;
    h && s(h, T, q), _.autohide && [S, Y, y, Z].forEach(
      (p) => s(o, p, tt)
    ), n.length && n.forEach(
      (p) => s(p, T, X)
    );
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), i.clear(t, a), s && r(t, g), super.dispose();
  }
}
export {
  st as default
};
//# sourceMappingURL=toast.mjs.map
