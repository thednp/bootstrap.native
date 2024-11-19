import { d as e, n as c, l as d, R as g } from "./base-component-DAxvn9am.mjs";
const i = "data-bs-target", s = "data-bs-parent", u = "data-bs-container", l = (a) => {
  const n = [i, s, u, "href"], o = e(a);
  return n.map((t) => {
    const r = c(a, t);
    return r ? t === s ? d(a, r) : g(r, o) : null;
  }).filter((t) => t)[0];
};
export {
  i as d,
  l as g
};
//# sourceMappingURL=getTargetElement-C1k_p6ls.mjs.map
