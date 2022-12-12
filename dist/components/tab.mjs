import { W as w, B as J, d as $, g as j, M as g, F as C, G as p, k as l, f as h, Q as T, N as b, z as S, L as K, c as A, h as O, ai as H, u as R } from "./base-component-215a274f.js";
import { E as U, d as V } from "./event-listener-097fdcc5.js";
import { c as k } from "./collapsingClass-dc1ed922.js";
import { a as c } from "./activeClass-b231b21b.js";
import { f as d } from "./fadeClass-0d50d035.js";
import { s as v } from "./showClass-f6a4d601.js";
import { d as M } from "./dropdownClasses-66be00d3.js";
import { d as X } from "./dataBsToggle-330f300b.js";
import { g as P } from "./getTargetElement-bb362549.js";
const m = "tab", F = "Tab", B = `[${X}="${m}"]`, q = (s) => K(s, F), Y = (s) => new _(s), x = w(`show.bs.${m}`), D = w(`shown.bs.${m}`), E = w(`hide.bs.${m}`), I = w(`hidden.bs.${m}`), u = /* @__PURE__ */ new Map(), z = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, k) && (e.style.height = "", b(e, k)), t && p.clear(t);
}, G = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = h(i) && u.get(i) || { tab: null };
  if (t && n && l(n, d)) {
    const { currentHeight: a, nextHeight: r } = u.get(e) || { currentHeight: 0, nextHeight: 0 };
    a === r ? z(s) : setTimeout(() => {
      t.style.height = `${r}px`, A(t), S(t, () => z(s));
    }, 50);
  } else
    i && p.clear(i);
  D.relatedTarget = o, T(e, D);
}, L = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && u.get(i) || { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, d) && ([a, t].forEach((f) => {
    h(f) && g(f, "overflow-hidden");
  }), r = h(a) ? a.scrollHeight : 0), x.relatedTarget = o, I.relatedTarget = e, T(e, x), !x.defaultPrevented) {
    if (t && g(t, c), a && b(a, c), n && t && l(t, d)) {
      const f = t.scrollHeight;
      u.set(e, { currentHeight: r, nextHeight: f, tab: null, content: null }), g(n, k), n.style.height = `${r}px`, A(n), [a, t].forEach((y) => {
        y && b(y, "overflow-hidden");
      });
    }
    t && t && l(t, d) ? setTimeout(() => {
      g(t, v), S(t, () => {
        G(s);
      });
    }, 1) : (t && g(t, v), G(s)), o && T(o, I);
  }
}, N = (s) => {
  const { nav: e } = s;
  if (!h(e))
    return { tab: null, content: null };
  const t = O(c, e);
  let n = null;
  t.length === 1 && !M.some((o) => l(t[0].parentElement, o)) ? [n] = t : t.length > 1 && (n = t[t.length - 1]);
  const i = h(n) ? P(n) : null;
  return { tab: n, content: i };
}, Q = (s) => {
  if (!h(s))
    return null;
  const e = $(s, `.${M.join(",.")}`);
  return e ? j(`.${M[0]}-toggle`, e) : null;
}, W = (s, e) => {
  (e ? U : V)(s.element, R, Z);
}, Z = (s) => {
  const e = q(s.target);
  !e || (s.preventDefault(), e.show());
};
class _ extends J {
  static selector = B;
  static init = Y;
  static getInstance = q;
  constructor(e) {
    super(e);
    const { element: t } = this, n = P(t);
    if (!n)
      return;
    const i = $(t, ".nav"), o = $(n, ".tab-content");
    this.nav = i, this.content = n, this.tabContent = o, this.dropdown = Q(t);
    const { tab: a } = N(this);
    if (i && !a) {
      const r = j(B, i), f = r && P(r);
      f && (g(r, c), g(f, v), g(f, c), C(t, H, "true"));
    }
    W(this, !0);
  }
  get name() {
    return F;
  }
  show() {
    const { element: e, content: t, nav: n, dropdown: i } = this;
    if (!(n && p.get(n)) && !l(e, c)) {
      const { tab: o, content: a } = N(this);
      if (n && u.set(n, { tab: o, content: a, currentHeight: 0, nextHeight: 0 }), E.relatedTarget = e, h(o) && T(o, E), E.defaultPrevented)
        return;
      g(e, c), C(e, H, "true");
      const r = h(o) && Q(o);
      if (r && l(r, c) && b(r, c), n) {
        const f = () => {
          o && (b(o, c), C(o, H, "false")), i && !l(i, c) && g(i, c);
        };
        a && (l(a, d) || t && l(t, d)) ? p.set(n, f, 1) : f();
      }
      a && (b(a, v), l(a, d) ? S(a, () => L(this)) : L(this));
    }
  }
  dispose() {
    W(this), super.dispose();
  }
}
export {
  _ as default
};
//# sourceMappingURL=tab.mjs.map
