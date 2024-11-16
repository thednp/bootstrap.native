import { B as D, t as L, d as S, e as v, x as T, y as _, R as q, h as l, q as f, m as u, C as d, F as h, Y as g, b as c, f as P, s as x, Q as k, H, Z as Q, E as R, r as Y, k as Z, v as y } from "./base-component-CQAH5ZXF.mjs";
import { d as A } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as C } from "./showClass-C8hdJfjQ.mjs";
import { g as E } from "./getTargetElement-v_1VfmtN.mjs";
import { i as F } from "./isDisabled-bThyhy2g.mjs";
const a = "collapse", I = "Collapse", N = `.${a}`, B = `[${A}="${a}"]`, O = { parent: null }, p = (n) => L(n, I), j = (n) => new M(n), $ = u(`show.bs.${a}`), z = u(`shown.bs.${a}`), w = u(`hide.bs.${a}`), G = u(`hidden.bs.${a}`), J = (n) => {
  const { element: e, parent: t, triggers: o } = n;
  f(e, $), $.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, a), h(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    l.clear(e), t && l.clear(t), o.forEach((s) => k(s, H, "true")), g(e, m), c(e, a), c(e, C), h(e, { height: "" }), f(e, z);
  }));
}, b = (n) => {
  const { element: e, parent: t, triggers: o } = n;
  f(e, w), w.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), h(e, { height: `${e.scrollHeight}px` }), g(e, a), g(e, C), c(e, m), P(e), h(e, { height: "0px" }), x(e, () => {
    l.clear(e), t && l.clear(t), o.forEach((s) => k(s, H, "false")), g(e, m), c(e, a), h(e, { height: "" }), f(e, G);
  }));
}, K = (n) => {
  const { target: e } = n, t = e && Z(e, B), o = t && E(t), s = o && p(o);
  s && (s.toggle(), t?.tagName === "A" && n.preventDefault());
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
    const { element: o, options: s } = this, i = S(o);
    this.triggers = [...v(B, i)].filter(
      (r) => E(r) === o
    ), this.parent = T(s.parent) ? s.parent : _(s.parent) ? E(o) || q(s.parent, i) : null, this._toggleEventListeners(!0);
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
    l.get(t) || (b(this), e.length && e.forEach((o) => c(o, `${a}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: o } = this;
    let s, i;
    t && (s = [
      ...v(`.${a}.${C}`, t)
    ].find((r) => p(r)), i = s && p(s)), (!t || !l.get(t)) && !l.get(e) && (i && s !== e && (b(i), i.triggers.forEach((r) => {
      c(r, `${a}d`);
    })), J(this), o.length && o.forEach((r) => g(r, `${a}d`)));
  }
  toggle() {
    Q(this.element, C) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (e) => {
    const t = e ? R : Y, { triggers: o } = this;
    o.length && o.forEach((s) => {
      F(s) || t(s, y, K);
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
