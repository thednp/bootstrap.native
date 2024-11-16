import { S as I, a4 as w, $ as d, K as c, G as i, F as f, Z as y, a5 as P, R as E, d as B, Y as g, b as h, f as M, x as T } from "./base-component-CQAH5ZXF.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { m as u, o as C, a as V, r as W } from "./popupContainer-BvxACdvn.mjs";
const N = "Modal", Q = "Offcanvas", A = "fixed-top", F = "fixed-bottom", R = "sticky-top", S = "position-sticky", x = (s) => [
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
  const o = x(a);
  o.length && o.forEach((e) => {
    f(e, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, Y = (s) => {
  const { clientWidth: a } = I(s), { innerWidth: o } = w(s);
  return Math.abs(o - a);
}, U = (s, a) => {
  const o = d(s), e = parseInt(c(o, "paddingRight"), 10), l = c(o, "overflow") === "hidden" && e ? 0 : Y(s), m = x(o);
  a && (f(o, {
    overflow: "hidden",
    paddingRight: `${e + l}px`
  }), m.length && m.forEach((n) => {
    const k = c(n, "paddingRight");
    if (n.style.paddingRight = `${parseInt(k, 10) + l}px`, [R, S].some((p) => y(n, p))) {
      const p = c(n, "marginRight");
      n.style.marginRight = `${parseInt(p, 10) - l}px`;
    }
  }));
}, O = "backdrop", v = `${u}-${O}`, b = `${C}-${O}`, Z = `.${u}.${r}`, q = `.${C}.${r}`, t = P("div"), K = (s) => E(
  `${Z},${q}`,
  B(s)
), j = (s) => {
  const a = s ? v : b;
  [v, b].forEach((o) => {
    g(t, o);
  }), h(t, a);
}, X = (s, a, o) => {
  j(o), V(t, d(s)), a && h(t, $);
}, _ = () => {
  y(t, r) || (h(t, r), M(t));
}, ss = () => {
  g(t, r);
}, os = (s) => {
  K(s) || (g(t, $), W(t, d(s)), G(s));
}, as = (s) => T(s) && c(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  t as a,
  X as b,
  Y as c,
  U as d,
  Z as e,
  q as f,
  K as g,
  ss as h,
  as as i,
  N as m,
  Q as o,
  os as r,
  _ as s,
  j as t
};
//# sourceMappingURL=isVisible-D6KlD4UJ.mjs.map
