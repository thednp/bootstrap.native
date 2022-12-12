import { a0 as p, O as c, a1 as s } from "./base-component-215a274f.js";
const t = "modal", i = "offcanvas", o = p({ tagName: "DIV" }), r = (a) => {
  const n = c(a);
  s(a) && (n.contains(o) || n.append(o), o.append(a));
}, f = (a) => {
  s(a) && (a.remove(), o.children.length || o.remove());
}, m = (a) => o.contains(a);
export {
  r as a,
  m as h,
  t as m,
  i as o,
  o as p,
  f as r
};
//# sourceMappingURL=popupContainer-26c3059d.js.map
