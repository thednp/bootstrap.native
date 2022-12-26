import { ag as l, ah as c, ai as u, x as o, X as p } from "./shorty-f5e32a8f.js";
const f = (t) => {
  const s = ["HTML", "BODY"], n = [];
  let { parentNode: e } = t;
  for (; e && !s.includes(e.nodeName); )
    e = l(e), c(e) || u(e) || n.push(e);
  return n.find((a, i) => o(a, "position") !== "relative" && n.slice(i + 1).every((r) => o(r, "position") === "static") ? a : null) || p(t);
};
export {
  f as default
};
//# sourceMappingURL=getElementContainer.mjs.map
