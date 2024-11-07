import { d as e, j as c, p as d, R as g } from "./base-component-Jx2aafTJ.mjs";
const i = "data-bs-target", s = "data-bs-parent", p = "data-bs-container", f = (a) => {
  const n = [i, s, p, "href"], o = e(a);
  return n.map((t) => {
    const r = c(a, t);
    return r ? t === s ? d(a, r) : g(r, o) : null;
  }).filter((t) => t)[0];
};
export {
  i as d,
  f as g
};
//# sourceMappingURL=getTargetElement-Bv0W3Fir.mjs.map
