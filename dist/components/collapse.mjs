import { B as L, d as S, c as v, f as T, A as _, R as q, y as l, b as c, Z as g, Y as y, t as A, v as E, q as f, C as d, F as p, r as x, Q as k, O as I, e as D, m as O, p as P } from "./base-component-Jx2aafTJ.mjs";
import { E as Q, r as R } from "./event-listener-CUwvA4j6.mjs";
import { d as Y } from "./dataBsToggle-B84TS15h.mjs";
import { c as m } from "./collapsingClass-BxKtDBMH.mjs";
import { s as C } from "./showClass-C8hdJfjQ.mjs";
import { g as u } from "./getTargetElement-Bv0W3Fir.mjs";
const n = "collapse", B = "Collapse", Z = `.${n}`, H = `[${Y}="${n}"]`, F = { parent: null }, h = (a) => A(a, B), N = (a) => new K(a), $ = E(`show.bs.${n}`), j = E(`shown.bs.${n}`), w = E(`hide.bs.${n}`), z = E(`hidden.bs.${n}`), G = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, $), $.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, n), p(e, { height: `${e.scrollHeight}px` }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => k(o, I, "true")), g(e, m), c(e, n), c(e, C), p(e, { height: "" }), f(e, j);
  }));
}, b = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, w), w.defaultPrevented || (l.set(e, d, 17), t && l.set(t, d, 17), p(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, C), c(e, m), D(e), p(e, { height: "0px" }), x(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => k(o, I, "false")), g(e, m), c(e, n), p(e, { height: "" }), f(e, z);
  }));
}, J = (a) => {
  const { target: e } = a, t = e && P(e, H), s = t && u(t), o = s && h(s);
  o && o.toggle(), t && t.tagName === "A" && a.preventDefault();
};
class K extends L {
  static selector = Z;
  static init = N;
  static getInstance = h;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: s, options: o } = this, r = S(s);
    this.triggers = [...v(H, r)].filter(
      (i) => u(i) === s
    ), this.parent = T(o.parent) ? o.parent : _(o.parent) ? u(s) || q(o.parent, r) : null, this._toggleEventListeners(!0);
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
    return F;
  }
  hide() {
    const { triggers: e, element: t } = this;
    l.get(t) || (b(this), e.length && e.forEach((s) => c(s, `${n}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let o, r;
    t && (o = [
      ...v(`.${n}.${C}`, t)
    ].find((i) => h(i)), r = o && h(o)), (!t || !l.get(t)) && !l.get(e) && (r && o !== e && (b(r), r.triggers.forEach((i) => {
      c(i, `${n}d`);
    })), G(this), s.length && s.forEach((i) => g(i, `${n}d`)));
  }
  toggle() {
    y(this.element, C) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (e) => {
    const t = e ? Q : R, { triggers: s } = this;
    s.length && s.forEach(
      (o) => t(o, O, J)
    );
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  K as default
};
//# sourceMappingURL=collapse.mjs.map
