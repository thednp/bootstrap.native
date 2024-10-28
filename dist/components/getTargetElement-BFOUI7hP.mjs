import { l as o, b as c, D as d, q as g } from "./base-component-ylZzLp-h.mjs";
const u = "data-bs-target", s = "data-bs-parent", i = "data-bs-container", b = (a) => {
  const e = [u, s, i, "href"], n = o(a);
  return e.map((t) => {
    const r = c(a, t);
    return r ? t === s ? d(a, r) : g(r, n) : null;
  }).filter((t) => t)[0];
};
export {
  u as d,
  b as g
};
//# sourceMappingURL=getTargetElement-BFOUI7hP.mjs.map
