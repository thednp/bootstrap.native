import { W as C, B as S, a as T, b as E, g as z, k as D, G as l, M as c, N as g, L as G, Q as f, Y as d, s as h, z as k, F as H, E as I, c as L, u as M, d as P } from "./base-component-215a274f.js";
import { E as Q, d as W } from "./event-listener-097fdcc5.js";
import { d as Y } from "./dataBsToggle-330f300b.js";
import { c as m } from "./collapsingClass-dc1ed922.js";
import { s as u } from "./showClass-f6a4d601.js";
import { g as $ } from "./getTargetElement-bb362549.js";
const n = "collapse", B = "Collapse", q = `.${n}`, N = `[${Y}="${n}"]`, A = { parent: null }, p = (a) => G(a, B), F = (a) => new O(a), v = C(`show.bs.${n}`), j = C(`shown.bs.${n}`), w = C(`hide.bs.${n}`), y = C(`hidden.bs.${n}`), J = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, v), !v.defaultPrevented && (l.set(e, d, 17), t && l.set(t, d, 17), c(e, m), g(e, n), h(e, { height: `${e.scrollHeight}px` }), k(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => H(o, I, "true")), g(e, m), c(e, n), c(e, u), h(e, { height: "" }), f(e, j);
  }));
}, b = (a) => {
  const { element: e, parent: t, triggers: s } = a;
  f(e, w), !w.defaultPrevented && (l.set(e, d, 17), t && l.set(t, d, 17), h(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, u), c(e, m), L(e), h(e, { height: "0px" }), k(e, () => {
    l.clear(e), t && l.clear(t), s.forEach((o) => H(o, I, "false")), g(e, m), c(e, n), h(e, { height: "" }), f(e, y);
  }));
}, x = (a, e) => {
  const t = e ? Q : W, { triggers: s } = a;
  s.length && s.forEach((o) => t(o, M, K));
}, K = (a) => {
  const { target: e } = a, t = e && P(e, N), s = t && $(t), o = s && p(s);
  o && o.toggle(), t && t.tagName === "A" && a.preventDefault();
};
class O extends S {
  static selector = q;
  static init = F;
  static getInstance = p;
  constructor(e, t) {
    super(e, t);
    const { element: s, options: o } = this, r = T(s);
    this.triggers = [...E(N, r)].filter((i) => $(i) === s), this.parent = z(o.parent, r) || $(s) || null, x(this, !0);
  }
  get name() {
    return B;
  }
  get defaults() {
    return A;
  }
  toggle() {
    D(this.element, u) ? this.hide() : this.show();
  }
  hide() {
    const { triggers: e, element: t } = this;
    l.get(t) || (b(this), e.length && e.forEach((s) => c(s, `${n}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let o, r;
    t && (o = [...E(`.${n}.${u}`, t)].find(
      (i) => p(i)
    ), r = o && p(o)), (!t || !l.get(t)) && !l.get(e) && (r && o !== e && (b(r), r.triggers.forEach((i) => {
      c(i, `${n}d`);
    })), J(this), s.length && s.forEach((i) => g(i, `${n}d`)));
  }
  dispose() {
    x(this), super.dispose();
  }
}
export {
  O as default
};
//# sourceMappingURL=collapse.mjs.map
