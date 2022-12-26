import { X as r, w as g, y as b, $ as x, x as c, k as R, h as n } from "./shorty-f5e32a8f.js";
const y = "fixed-top", k = "fixed-bottom", l = "sticky-top", p = "position-sticky", f = (t) => [
  ...n(y, t),
  ...n(k, t),
  ...n(l, t),
  ...n(p, t),
  ...n("is-fixed", t)
], w = (t) => {
  const o = r(t);
  g(o, {
    paddingRight: "",
    overflow: ""
  });
  const s = f(o);
  s.length && s.forEach((a) => {
    g(a, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, I = (t) => {
  const { clientWidth: o } = b(t), { innerWidth: s } = x(t);
  return Math.abs(s - o);
}, C = (t, o) => {
  const s = r(t), a = parseInt(c(s, "paddingRight"), 10), d = c(s, "overflow") === "hidden" && a ? 0 : I(t), h = f(s);
  o && (g(s, {
    overflow: "hidden",
    paddingRight: `${a + d}px`
  }), h.length && h.forEach((i) => {
    const m = c(i, "paddingRight");
    if (i.style.paddingRight = `${parseInt(m, 10) + d}px`, [l, p].some((e) => R(i, e))) {
      const e = c(i, "marginRight");
      i.style.marginRight = `${parseInt(e, 10) - d}px`;
    }
  }));
};
export {
  I as measureScrollbar,
  w as resetScrollbar,
  C as setScrollbar
};
//# sourceMappingURL=scrollbar.mjs.map
