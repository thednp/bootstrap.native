import { W as C, c as T, e as $, g as z, k as B, G as a, M as c, N as g, L as D, Q as f, Y as d, w as p, z as k, F as H, E as I, i as G, u as L, d as M } from "./shorty-f5e32a8f.js";
import { E as P, r as Q } from "./event-listener-e555c4ba.js";
import { d as W } from "./dataBsToggle-330f300b.js";
import { c as m } from "./collapsingClass-dc1ed922.js";
import { s as u } from "./showClass-f6a4d601.js";
import { g as E } from "./getTargetElement-bc4f0355.js";
import Y from "./base-component.mjs";
const n = "collapse", N = "Collapse", q = `.${n}`, S = `[${W}="${n}"]`, A = { parent: null }, h = (l) => D(l, N), F = (l) => new O(l), v = C(`show.bs.${n}`), j = C(`shown.bs.${n}`), w = C(`hide.bs.${n}`), y = C(`hidden.bs.${n}`), J = (l) => {
  const { element: e, parent: t, triggers: s } = l;
  f(e, v), !v.defaultPrevented && (a.set(e, d, 17), t && a.set(t, d, 17), c(e, m), g(e, n), p(e, { height: `${e.scrollHeight}px` }), k(e, () => {
    a.clear(e), t && a.clear(t), s.forEach((o) => H(o, I, "true")), g(e, m), c(e, n), c(e, u), p(e, { height: "" }), f(e, j);
  }));
}, b = (l) => {
  const { element: e, parent: t, triggers: s } = l;
  f(e, w), !w.defaultPrevented && (a.set(e, d, 17), t && a.set(t, d, 17), p(e, { height: `${e.scrollHeight}px` }), g(e, n), g(e, u), c(e, m), G(e), p(e, { height: "0px" }), k(e, () => {
    a.clear(e), t && a.clear(t), s.forEach((o) => H(o, I, "false")), g(e, m), c(e, n), p(e, { height: "" }), f(e, y);
  }));
}, x = (l, e) => {
  const t = e ? P : Q, { triggers: s } = l;
  s.length && s.forEach((o) => t(o, L, K));
}, K = (l) => {
  const { target: e } = l, t = e && M(e, S), s = t && E(t), o = s && h(s);
  o && o.toggle(), t && t.tagName === "A" && l.preventDefault();
};
class O extends Y {
  static selector = q;
  static init = F;
  static getInstance = h;
  constructor(e, t) {
    super(e, t);
    const { element: s, options: o } = this, r = T(s);
    this.triggers = [...$(S, r)].filter((i) => E(i) === s), this.parent = z(o.parent, r) || E(s) || null, x(this, !0);
  }
  get name() {
    return N;
  }
  get defaults() {
    return A;
  }
  toggle() {
    B(this.element, u) ? this.hide() : this.show();
  }
  hide() {
    const { triggers: e, element: t } = this;
    a.get(t) || (b(this), e.length && e.forEach((s) => c(s, `${n}d`)));
  }
  show() {
    const { element: e, parent: t, triggers: s } = this;
    let o, r;
    t && (o = [...$(`.${n}.${u}`, t)].find(
      (i) => h(i)
    ), r = o && h(o)), (!t || !a.get(t)) && !a.get(e) && (r && o !== e && (b(r), r.triggers.forEach((i) => {
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
