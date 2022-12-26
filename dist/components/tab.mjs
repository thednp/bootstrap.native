import { W as w, d as $, g as j, M as g, F as C, G as p, k as l, r as h, Q as T, N as d, z as S, L as J, i as A, h as K, u as O, an as H } from "./shorty-f5e32a8f.js";
import { E as R, r as U } from "./event-listener-e555c4ba.js";
import { c as k } from "./collapsingClass-dc1ed922.js";
import { a as c } from "./activeClass-b231b21b.js";
import { f as b } from "./fadeClass-0d50d035.js";
import { s as v } from "./showClass-f6a4d601.js";
import { d as M } from "./dropdownClasses-66be00d3.js";
import { d as V } from "./dataBsToggle-330f300b.js";
import { g as P } from "./getTargetElement-bc4f0355.js";
import X from "./base-component.mjs";
const m = "tab", F = "Tab", D = `[${V}="${m}"]`, q = (s) => J(s, F), Y = (s) => new _(s), x = w(`show.bs.${m}`), I = w(`shown.bs.${m}`), E = w(`hide.bs.${m}`), z = w(`hidden.bs.${m}`), u = /* @__PURE__ */ new Map(), B = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, k) && (e.style.height = "", d(e, k)), t && p.clear(t);
}, G = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = h(i) && u.get(i) || { tab: null };
  if (t && n && l(n, b)) {
    const { currentHeight: a, nextHeight: r } = u.get(e) || { currentHeight: 0, nextHeight: 0 };
    a === r ? B(s) : setTimeout(() => {
      t.style.height = `${r}px`, A(t), S(t, () => B(s));
    }, 50);
  } else
    i && p.clear(i);
  I.relatedTarget = o, T(e, I);
}, L = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && u.get(i) || { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, b) && ([a, t].forEach((f) => {
    h(f) && g(f, "overflow-hidden");
  }), r = h(a) ? a.scrollHeight : 0), x.relatedTarget = o, z.relatedTarget = e, T(e, x), !x.defaultPrevented) {
    if (t && g(t, c), a && d(a, c), n && t && l(t, b)) {
      const f = t.scrollHeight;
      u.set(e, { currentHeight: r, nextHeight: f, tab: null, content: null }), g(n, k), n.style.height = `${r}px`, A(n), [a, t].forEach((y) => {
        y && d(y, "overflow-hidden");
      });
    }
    t && t && l(t, b) ? setTimeout(() => {
      g(t, v), S(t, () => {
        G(s);
      });
    }, 1) : (t && g(t, v), G(s)), o && T(o, z);
  }
}, N = (s) => {
  const { nav: e } = s;
  if (!h(e))
    return { tab: null, content: null };
  const t = K(c, e);
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
  (e ? R : U)(s.element, O, Z);
}, Z = (s) => {
  const e = q(s.target);
  e && (s.preventDefault(), e.show());
};
class _ extends X {
  static selector = D;
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
      const r = j(D, i), f = r && P(r);
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
      if (r && l(r, c) && d(r, c), n) {
        const f = () => {
          o && (d(o, c), C(o, H, "false")), i && !l(i, c) && g(i, c);
        };
        a && (l(a, b) || t && l(t, b)) ? p.set(n, f, 1) : f();
      }
      a && (d(a, v), l(a, b) ? S(a, () => L(this)) : L(this));
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
