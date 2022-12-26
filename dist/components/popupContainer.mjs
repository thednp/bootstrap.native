import { a3 as l, a4 as o, X as B } from "./shorty-f5e32a8f.js";
const d = l({ tagName: "div" }), N = (e, p) => {
  const a = o(p) && p.nodeName !== "BODY" ? p : d, f = o(p) && p.nodeName === "BODY" ? p : B(e);
  o(e) && ((!p && !f.contains(d) || o(p) && p.nodeName === "BODY") && f.append(d), a.append(e));
}, O = (e, p) => {
  o(e) && (e.remove(), !p && !d.children.length && d.remove());
}, Y = (e, p) => (o(p) && p.nodeName !== "BODY" ? p : d).contains(e);
export {
  N as appendPopup,
  Y as hasPopup,
  d as popupContainer,
  O as removePopup
};
//# sourceMappingURL=popupContainer.mjs.map
