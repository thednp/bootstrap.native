import { a3 as d, g as $, c as g, N as c, M as n, X as f, k as y, i as k } from "./shorty-f5e32a8f.js";
import { f as i } from "./fadeClass-0d50d035.js";
import { s } from "./showClass-f6a4d601.js";
import { m as l, o as m } from "./offcanvasString-ecc53af6.js";
import { resetScrollbar as C } from "./scrollbar.mjs";
import { appendPopup as O, removePopup as S } from "./popupContainer.mjs";
const v = "backdrop", e = `${l}-${v}`, p = `${m}-${v}`, h = `.${l}.${s}`, u = `.${m}.${s}`, o = d("div"), b = (a) => $(`${h},${u}`, g(a)), w = (a) => {
  const r = a ? e : p;
  [e, p].forEach((t) => {
    c(o, t);
  }), n(o, r);
}, E = (a, r, t) => {
  w(t), O(o, f(a)), r && n(o, i);
}, J = () => {
  y(o, s) || (n(o, s), k(o));
}, Q = () => {
  c(o, s);
}, T = (a) => {
  b(a) || (c(o, i), S(o, f(a)), C(a));
};
export {
  E as appendOverlay,
  b as getCurrentOpen,
  Q as hideOverlay,
  h as modalActiveSelector,
  e as modalBackdropClass,
  u as offcanvasActiveSelector,
  p as offcanvasBackdropClass,
  o as overlay,
  T as removeOverlay,
  J as showOverlay,
  w as toggleOverlayType
};
//# sourceMappingURL=backdrop.mjs.map
