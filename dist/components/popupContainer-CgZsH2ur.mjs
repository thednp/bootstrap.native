import { a3 as c, ae as s, _ as f } from "./base-component-Jx2aafTJ.mjs";
const v = "modal", B = "offcanvas", a = c({
  tagName: "div",
  className: "popup-container"
}), i = (p, o) => {
  const n = s(o) && o.nodeName === "BODY", e = s(o) && !n ? o : a, d = n ? o : f(p);
  s(p) && (e === a && d.append(a), e.append(p));
}, N = (p, o) => {
  const n = s(o) && o.nodeName === "BODY", e = s(o) && !n ? o : a;
  s(p) && (p.remove(), e === a && !a.children.length && a.remove());
}, h = (p, o) => {
  const n = s(o) && o.nodeName !== "BODY" ? o : a;
  return s(p) && n.contains(p);
};
export {
  i as a,
  h,
  v as m,
  B as o,
  N as r
};
//# sourceMappingURL=popupContainer-CgZsH2ur.mjs.map
