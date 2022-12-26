import { d as h, S as a } from "./shorty-f5e32a8f.js";
const c = (r) => {
  const s = h(r, "A");
  return r.tagName === "A" && a(r, "href") && r.href.slice(-1) === "#" || s && a(s, "href") && s.href.slice(-1) === "#";
};
export {
  c as default
};
//# sourceMappingURL=isEmptyAnchor.mjs.map
