import { a3 as d, ac as s, _ as f } from "./base-component-ylZzLp-h.mjs";
const B = "modal", i = "offcanvas", a = d({
  tagName: "div",
  className: "popup-container"
}), m = (p, o) => {
  const e = s(o) && o.nodeName === "BODY", n = s(o) && !e ? o : a, c = e ? o : f(p);
  s(p) && (n === a && c.append(a), n.append(p));
}, v = (p, o) => {
  const e = s(o) && o.nodeName === "BODY", n = s(o) && !e ? o : a;
  s(p) && (p.remove(), n === a && !a.children.length && a.remove());
}, N = (p, o) => {
  const e = s(o) && o.nodeName !== "BODY" ? o : a;
  return s(p) && e.contains(p);
};
export {
  m as a,
  N as h,
  B as m,
  i as o,
  v as r
};
//# sourceMappingURL=popupContainer-ymf2oGcv.mjs.map
