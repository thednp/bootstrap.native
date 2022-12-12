import { x as w, $ as I, O as $, w as c, s as p, k as y, h as i, a0 as P, g as E, a as M, N as f, M as g, c as B, f as T } from "./base-component-215a274f.js";
import { f as b } from "./fadeClass-0d50d035.js";
import { s as r } from "./showClass-f6a4d601.js";
import { a as V, m as k, o as u, r as W } from "./popupContainer-26c3059d.js";
const A = "fixed-top", N = "fixed-bottom", C = "sticky-top", x = "position-sticky", O = (s) => [
  ...i(A, s),
  ...i(N, s),
  ...i(C, s),
  ...i(x, s),
  ...i("is-fixed", s)
], q = (s) => {
  const a = $(s);
  p(a, {
    paddingRight: "",
    overflow: ""
  });
  const o = O(a);
  o.length && o.forEach((e) => {
    p(e, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, F = (s) => {
  const { clientWidth: a } = w(s), { innerWidth: o } = I(s);
  return Math.abs(o - a);
}, U = (s, a) => {
  const o = $(s), e = parseInt(c(o, "paddingRight"), 10), d = c(o, "overflow") === "hidden" && e ? 0 : F(s), h = O(o);
  a && (p(o, {
    overflow: "hidden",
    paddingRight: `${e + d}px`
  }), h.length && h.forEach((n) => {
    const S = c(n, "paddingRight");
    if (n.style.paddingRight = `${parseInt(S, 10) + d}px`, [C, x].some((l) => y(n, l))) {
      const l = c(n, "marginRight");
      n.style.marginRight = `${parseInt(l, 10) - d}px`;
    }
  }));
}, R = "backdrop", m = `${k}-${R}`, v = `${u}-${R}`, J = `.${k}.${r}`, Q = `.${u}.${r}`, t = P("div"), j = (s) => E(`${J},${Q}`, M(s)), z = (s) => {
  const a = s ? m : v;
  [m, v].forEach((o) => {
    f(t, o);
  }), g(t, a);
}, X = (s, a) => {
  z(a), V(t), s && g(t, b);
}, Y = () => {
  y(t, r) || (g(t, r), B(t));
}, Z = () => {
  f(t, r);
}, _ = (s) => {
  j(s) || (f(t, b), W(t), q(s));
}, ss = (s) => T(s) && c(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  X as a,
  U as b,
  J as c,
  Q as d,
  j as g,
  Z as h,
  ss as i,
  F as m,
  t as o,
  _ as r,
  Y as s,
  z as t
};
//# sourceMappingURL=isVisible-f75ee887.js.map
