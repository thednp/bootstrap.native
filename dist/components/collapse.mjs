import { B as D, d as L, e as v, x as S, y as T, R as _, h as l, b as c, Y as g, Z as q, t as P, m as u, q as f, C as d, F as h, s as x, Q as k, H, f as Q, E as R, r as Y, v as Z, l as y } from "./base-component-DAxvn9am.mjs";
import { d as A } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as C } from "./showClass-C8hdJfjQ.mjs";
import { g as E } from "./getTargetElement-C1k_p6ls.mjs";
import { i as F } from "./isDisabled-DRrRkHiq.mjs";
const n = "collapse", I = "Collapse", N = `.${n}`, B = `[${A}="${n}"]`, O = { parent: null }, p = (a) => P(a, I), j = (a) => new M(a), $ = u(`show.bs.${n}`), z = u(`shown.bs.${n}`), b = u(`hide.bs.${n}`), G = u(`hidden.bs.${n}`), J = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, $), $.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, n), h(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => k(o, H, "true")), g(e, m), c(e, n), c(e, C), h(e, { height: "" }), f(e, z);
  }));
}, w = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, b), b.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), h(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, C), c(e, m), Q(e), h(e, { height: "0px" }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => k(o, H, "false")), g(e, m), c(e, n), h(e, { height: "" }), f(e, G);
  }));
}, K = (a) => {
  const { target: e } = a, t = e && y(e, B), s = t && E(t), o = s && p(s);
  t && F(t) || o && (o.toggle(), t?.tagName === "A" && a.preventDefault());
};
class M extends D {
  static selector = N;
  static init = j;
  static getInstance = p;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: s, options: o } = this, i = L(s);
    this.triggers = [...v(B, i)].filter(
      (r) => E(r) === s
    ), this.parent = S(o.parent) ? o.parent : T(o.parent) ? E(s) || _(o.parent, i) : null, this._toggleEventListeners(!0);
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
    return O;
  }
  hide() {
    const { triggers: e, element: t } = this;
    l.get(t) || (w(this), e.length && e.forEach((s) => c(s, `${n}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let o, i;
    t && (o = [
      ...v(`.${n}.${C}`, t)
    ].find((r) => p(r)), i = o && p(o)), (!t || !l.get(t)) && !l.get(e) && (i && o !== e && (w(i), i.triggers.forEach((r) => {
      c(r, `${n}d`);
    })), J(this), s.length && s.forEach((r) => g(r, `${n}d`)));
  }
  toggle() {
    q(this.element, C) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (e) => {
    const t = e ? R : Y, { triggers: s } = this;
    s.length && s.forEach((o) => {
      t(o, Z, K);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  M as default
};
//# sourceMappingURL=collapse.mjs.map
