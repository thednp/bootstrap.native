import { B as q, t as x, Z as u, b as l, Y as r, R as H, e as P, d as R, q as f, m as p, h as i, f as S, s as b, E as Y, r as Z, v as T, a9 as D, aa as N, w as k, A as j, k as z } from "./base-component-CQAH5ZXF.mjs";
import { f as m } from "./fadeClass-CLIYI_zn.mjs";
import { s as g } from "./showClass-C8hdJfjQ.mjs";
import { d as F } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as G } from "./dataBsToggle-B84TS15h.mjs";
import { g as y } from "./getTargetElement-v_1VfmtN.mjs";
import { i as J } from "./isDisabled-bThyhy2g.mjs";
const a = "toast", B = "Toast", K = `.${a}`, M = `[${F}="${a}"]`, A = `[${G}="${a}"]`, c = "showing", I = "hide", O = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, w = (e) => x(e, B), Q = (e) => new et(e), v = p(
  `show.bs.${a}`
), U = p(
  `shown.bs.${a}`
), E = p(
  `hide.bs.${a}`
), V = p(
  `hidden.bs.${a}`
), C = (e) => {
  const { element: t, options: s } = e;
  r(t, c), i.clear(t, c), f(t, U), s.autohide && i.set(t, () => e.hide(), s.delay, a);
}, $ = (e) => {
  const { element: t } = e;
  r(t, c), r(t, g), l(t, I), i.clear(t, a), f(t, V);
}, W = (e) => {
  const { element: t, options: s } = e;
  l(t, c), s.animation ? (S(t), b(t, () => $(e))) : $(e);
}, X = (e) => {
  const { element: t, options: s } = e;
  i.set(
    t,
    () => {
      r(t, I), S(t), l(t, g), l(t, c), s.animation ? b(t, () => C(e)) : C(e);
    },
    17,
    c
  );
}, tt = (e) => {
  const { target: t } = e, s = t && z(t, A), o = s && y(s), n = o && w(o);
  n && (s && s.tagName === "A" && e.preventDefault(), n.relatedTarget = s, n.show());
}, st = (e) => {
  const t = e.target, s = w(t), { type: o, relatedTarget: n } = e;
  !s || t === n || t.contains(n) || ([k, D].includes(o) ? i.clear(t, a) : i.set(t, () => s.hide(), s.options.delay, a));
};
class et extends q {
  static selector = K;
  static init = Q;
  static getInstance = w;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: o, options: n } = this;
    n.animation && !u(o, m) ? l(o, m) : !n.animation && u(o, m) && r(o, m), this.dismiss = H(M, o), this.triggers = [
      ...P(
        A,
        R(o)
      )
    ].filter(
      (h) => y(h) === o
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return B;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return O;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return u(this.element, g);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (f(t, v), v.defaultPrevented || X(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (f(t, E), E.defaultPrevented || W(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? Y : Z, { element: o, triggers: n, dismiss: h, options: L, hide: _ } = this;
    h && s(h, T, _), L.autohide && [D, N, k, j].forEach(
      (d) => s(o, d, st)
    ), n.length && n.forEach((d) => {
      J(d) || s(d, T, tt);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), i.clear(t, a), s && r(t, g), super.dispose();
  }
}
export {
  et as default
};
//# sourceMappingURL=toast.mjs.map
