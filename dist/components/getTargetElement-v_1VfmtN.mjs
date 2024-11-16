import { d as e, l as c, k as d, R as g } from "./base-component-CQAH5ZXF.mjs";
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
//# sourceMappingURL=getTargetElement-v_1VfmtN.mjs.map
