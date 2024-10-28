import { B as x, h as p, f as l, r, q as A, n as H, l as P, d, a6 as $, a7 as N, v as y, w as j, T as i, g as z, c as g, t as D, e as b, m as T, D as F } from "./base-component-ylZzLp-h.mjs";
import { E as G, r as J } from "./event-listener-C1-Yf9Z5.mjs";
import { f as h } from "./fadeClass-CLIYI_zn.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as K } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as M } from "./dataBsToggle-B84TS15h.mjs";
import { g as B } from "./getTargetElement-BFOUI7hP.mjs";
const a = "toast", I = "Toast", O = `.${a}`, Q = `[${K}="${a}"]`, k = `[${M}="${a}"]`, c = "showing", q = "hide", R = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, v = (e) => z(e, I), U = (e) => new st(e), E = g(
  `show.bs.${a}`
), V = g(
  `shown.bs.${a}`
), w = g(
  `hide.bs.${a}`
), W = g(
  `hidden.bs.${a}`
), C = (e) => {
  const { element: t, options: s } = e;
  r(t, c), i.clear(t, c), d(t, V), s.autohide && i.set(t, () => e.hide(), s.delay, a);
}, S = (e) => {
  const { element: t } = e;
  r(t, c), r(t, f), l(t, q), i.clear(t, a), d(t, W);
}, X = (e) => {
  const { element: t, options: s } = e;
  l(t, c), s.animation ? (D(t), b(t, () => S(e))) : S(e);
}, Y = (e) => {
  const { element: t, options: s } = e;
  i.set(
    t,
    () => {
      r(t, q), D(t), l(t, f), l(t, c), s.animation ? b(t, () => C(e)) : C(e);
    },
    17,
    c
  );
}, Z = (e) => {
  const { target: t } = e, s = t && F(t, k), o = s && B(s), n = o && v(o);
  n && (s && s.tagName === "A" && e.preventDefault(), n.relatedTarget = s, n.show());
}, tt = (e) => {
  const t = e.target, s = v(t), { type: o, relatedTarget: n } = e;
  s && t !== n && !t.contains(n) && ([y, $].includes(o) ? i.clear(t, a) : i.set(t, () => s.hide(), s.options.delay, a));
};
class st extends x {
  static selector = O;
  static init = U;
  static getInstance = v;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: o, options: n } = this;
    n.animation && !p(o, h) ? l(o, h) : !n.animation && p(o, h) && r(o, h), this.dismiss = A(Q, o), this.triggers = [
      ...H(k, P(o))
    ].filter(
      (m) => B(m) === o
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return I;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return R;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return p(this.element, f);
  }
  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show = () => {
    const { element: t, isShown: s } = this;
    t && !s && (d(t, E), E.defaultPrevented || Y(this));
  };
  /** Hides the toast. */
  hide = () => {
    const { element: t, isShown: s } = this;
    t && s && (d(t, w), w.defaultPrevented || X(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? G : J, { element: o, triggers: n, dismiss: m, options: L, hide: _ } = this;
    m && s(m, T, _), L.autohide && [$, N, y, j].forEach(
      (u) => s(o, u, tt)
    ), n.length && n.forEach(
      (u) => s(u, T, Z)
    );
  };
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), i.clear(t, a), s && r(t, f), super.dispose();
  }
}
export {
  st as default
};
//# sourceMappingURL=toast.mjs.map
