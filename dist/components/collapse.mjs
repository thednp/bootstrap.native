import { B as D, l as H, n as v, u as k, I as q, q as y, T as n, f as c, r as g, h as A, g as B, c as E, d as f, J as d, K as p, e as S, s as T, L as b, t as _, m as P, D as J } from "./base-component-ylZzLp-h.mjs";
import { E as K, r as M } from "./event-listener-C1-Yf9Z5.mjs";
import { d as N } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as u } from "./showClass-C8hdJfjQ.mjs";
import { g as C } from "./getTargetElement-BFOUI7hP.mjs";
const o = "collapse", I = "Collapse", j = `.${o}`, L = `[${N}="${o}"]`, z = { parent: null }, h = (l) => B(l, I), F = (l) => new U(l), $ = E(`show.bs.${o}`), G = E(`shown.bs.${o}`), w = E(`hide.bs.${o}`), O = E(`hidden.bs.${o}`), Q = (l) => {
  const { element: e, parent: t, triggers: s } = l;
  f(e, $), $.defaultPrevented || (n.set(e, d, 17), t && n.set(t, d, 17), c(e, m), g(e, o), p(e, { height: `${e.scrollHeight}px` }), S(e, () => {
    n.clear(e), t && n.clear(t), s.forEach((a) => T(a, b, "true")), g(e, m), c(e, o), c(e, u), p(e, { height: "" }), f(e, G);
  }));
}, x = (l) => {
  const { element: e, parent: t, triggers: s } = l;
  f(e, w), w.defaultPrevented || (n.set(e, d, 17), t && n.set(t, d, 17), p(e, { height: `${e.scrollHeight}px` }), g(e, o), g(e, u), c(e, m), _(e), p(e, { height: "0px" }), S(e, () => {
    n.clear(e), t && n.clear(t), s.forEach((a) => T(a, b, "false")), g(e, m), c(e, o), p(e, { height: "" }), f(e, O);
  }));
}, R = (l) => {
  const { target: e } = l, t = e && J(e, L), s = t && C(t), a = s && h(s);
  a && a.toggle(), t && t.tagName === "A" && l.preventDefault();
};
class U extends D {
  static selector = j;
  static init = F;
  static getInstance = h;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: s, options: a } = this, r = H(s);
    this.triggers = [...v(L, r)].filter(
      (i) => C(i) === s
    ), this.parent = k(a.parent) ? a.parent : q(a.parent) ? C(s) || y(a.parent, r) : null, this._toggleEventListeners(!0);
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
    return z;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: t } = this;
    n.get(t) || (x(this), e.length && e.forEach((s) => c(s, `${o}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let a, r;
    t && (a = [
      ...v(`.${o}.${u}`, t)
    ].find((i) => h(i)), r = a && h(a)), (!t || !n.get(t)) && !n.get(e) && (r && a !== e && (x(r), r.triggers.forEach((i) => {
      c(i, `${o}d`);
    })), Q(this), s.length && s.forEach((i) => g(i, `${o}d`)));
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    A(this.element, u) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (e) => {
    const t = e ? K : M, { triggers: s } = this;
    s.length && s.forEach(
      (a) => t(a, P, R)
    );
  };
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=collapse.mjs.map
