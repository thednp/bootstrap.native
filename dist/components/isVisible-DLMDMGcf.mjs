import { S as I, a2 as w, _ as d, J as c, F as f, Y as y, G as i, a3 as P, R as E, d as B, Z as g, b as h, e as M, f as T } from "./base-component-Jx2aafTJ.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { a as V, m as u, o as C, r as W } from "./popupContainer-CgZsH2ur.mjs";
const L = "Modal", N = "Offcanvas", A = "fixed-top", F = "fixed-bottom", R = "sticky-top", S = "position-sticky", O = (s) => [
  ...i(A, s),
  ...i(F, s),
  ...i(R, s),
  ...i(S, s),
  ...i("is-fixed", s)
], G = (s) => {
  const a = d(s);
  f(a, {
    paddingRight: "",
    overflow: ""
  });
  const o = O(a);
  o.length && o.forEach((e) => {
    f(e, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, Y = (s) => {
  const { clientWidth: a } = I(s), { innerWidth: o } = w(s);
  return Math.abs(o - a);
}, Q = (s, a) => {
  const o = d(s), e = parseInt(c(o, "paddingRight"), 10), l = c(o, "overflow") === "hidden" && e ? 0 : Y(s), m = O(o);
  a && (f(o, {
    overflow: "hidden",
    paddingRight: `${e + l}px`
  }), m.length && m.forEach((n) => {
    const x = c(n, "paddingRight");
    if (n.style.paddingRight = `${parseInt(x, 10) + l}px`, [R, S].some((p) => y(n, p))) {
      const p = c(n, "marginRight");
      n.style.marginRight = `${parseInt(p, 10) - l}px`;
    }
  }));
}, k = "backdrop", v = `${u}-${k}`, b = `${C}-${k}`, Z = `.${u}.${r}`, q = `.${C}.${r}`, t = P("div"), J = (s) => E(
  `${Z},${q}`,
  B(s)
), _ = (s) => {
  const a = s ? v : b;
  [v, b].forEach((o) => {
    g(t, o);
  }), h(t, a);
}, U = (s, a, o) => {
  _(o), V(t, d(s)), a && h(t, $);
}, X = () => {
  y(t, r) || (h(t, r), M(t));
}, ss = () => {
  g(t, r);
}, os = (s) => {
  J(s) || (g(t, $), W(t, d(s)), G(s));
}, as = (s) => T(s) && c(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  U as a,
  Y as b,
  Q as c,
  N as d,
  Z as e,
  q as f,
  J as g,
  ss as h,
  as as i,
  L as m,
  t as o,
  os as r,
  X as s,
  _ as t
};
//# sourceMappingURL=isVisible-DLMDMGcf.mjs.map
