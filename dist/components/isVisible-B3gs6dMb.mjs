import { Q as x, a2 as w, _ as l, P as i, K as p, h as C, j as n, a3 as I, q as P, l as B, r as g, f as m, t as M, u as T } from "./base-component-ylZzLp-h.mjs";
import { f as u } from "./fadeClass-CLIYI_zn.mjs";
import { s as c } from "./showClass-C8hdJfjQ.mjs";
import { a as W, m as b, o as $, r as D } from "./popupContainer-ymf2oGcv.mjs";
const J = "Modal", U = "Offcanvas", V = "fixed-top", q = "fixed-bottom", S = "sticky-top", E = "position-sticky", O = (s) => [
  ...n(V, s),
  ...n(q, s),
  ...n(S, s),
  ...n(E, s),
  ...n("is-fixed", s)
], A = (s) => {
  const o = l(s);
  p(o, {
    paddingRight: "",
    overflow: ""
  });
  const t = O(o);
  t.length && t.forEach((r) => {
    p(r, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, j = (s) => {
  const { clientWidth: o } = x(s), { innerWidth: t } = w(s);
  return Math.abs(t - o);
}, X = (s, o) => {
  const t = l(s), r = parseInt(i(t, "paddingRight"), 10), d = i(t, "overflow") === "hidden" && r ? 0 : j(s), h = O(t);
  o && (p(t, {
    overflow: "hidden",
    paddingRight: `${r + d}px`
  }), h.length && h.forEach((e) => {
    const k = i(e, "paddingRight");
    if (e.style.paddingRight = `${parseInt(k, 10) + d}px`, [S, E].some((f) => C(e, f))) {
      const f = i(e, "marginRight");
      e.style.marginRight = `${parseInt(f, 10) - d}px`;
    }
  }));
}, R = "backdrop", v = `${b}-${R}`, y = `${$}-${R}`, F = `.${b}.${c}`, H = `.${$}.${c}`, a = I("div"), K = (s) => P(
  `${F},${H}`,
  B(s)
), L = (s) => {
  const o = s ? v : y;
  [v, y].forEach((t) => {
    g(a, t);
  }), m(a, o);
}, Y = (s, o, t) => {
  L(t), W(a, l(s)), o && m(a, u);
}, Z = () => {
  C(a, c) || (m(a, c), M(a));
}, ss = () => {
  g(a, c);
}, ts = (s) => {
  K(s) || (g(a, u), D(a, l(s)), A(s));
}, os = (s) => T(s) && i(s, "visibility") !== "hidden" && s.offsetParent !== null;
export {
  Y as a,
  j as b,
  X as c,
  U as d,
  F as e,
  H as f,
  K as g,
  ss as h,
  os as i,
  J as m,
  a as o,
  ts as r,
  Z as s,
  L as t
};
//# sourceMappingURL=isVisible-B3gs6dMb.mjs.map
