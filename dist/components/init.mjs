import { am as s, ao as f, ap as c, U as l, b as d } from "./shorty-f5e32a8f.js";
import { E as u } from "./event-listener-e555c4ba.js";
import C from "./alert.mjs";
import D from "./button.mjs";
import A from "./carousel.mjs";
import E from "./collapse.mjs";
import b from "./dropdown.mjs";
import h from "./modal.mjs";
import v from "./offcanvas.mjs";
import P from "./popover.mjs";
import U from "./scrollspy.mjs";
import k from "./tab.mjs";
import y from "./toast.mjs";
import I from "./tooltip.mjs";
import "./fadeClass-0d50d035.js";
import "./showClass-f6a4d601.js";
import "./dataBsDismiss-afbfbc79.js";
import "./base-component.mjs";
import "./activeClass-b231b21b.js";
import "./dataBsToggle-330f300b.js";
import "./getTargetElement-bc4f0355.js";
import "./collapsingClass-dc1ed922.js";
import "./dropdownClasses-66be00d3.js";
import "./isEmptyAnchor.mjs";
import "./offcanvasString-ecc53af6.js";
import "./offcanvasComponent-9ef54707.js";
import "./scrollbar.mjs";
import "./backdrop.mjs";
import "./popupContainer.mjs";
import "./isVisible.mjs";
import "./createTip-c738ae49.js";
import "./tooltipString-23f00c61.js";
import "./tipClassPositions.mjs";
import "./setHtml.mjs";
import "./styleTip-2726b8f9.js";
import "./getTipTemplate.mjs";
import "./tooltipDefaults.mjs";
import "./getElementContainer.mjs";
const a = {
  Alert: C,
  Button: D,
  Carousel: A,
  Collapse: E,
  Dropdown: b,
  Modal: h,
  Offcanvas: v,
  Popover: P,
  ScrollSpy: U,
  Tab: k,
  Toast: y,
  Tooltip: I
}, L = (o, r) => {
  [...r].forEach((t) => o(t));
}, T = (o, r) => {
  const t = d.getAllFor(o);
  t && [...t].forEach(([m, i]) => {
    r.contains(m) && i.dispose();
  });
}, p = (o) => {
  const r = o && o.nodeName ? o : document, t = [...s("*", r)];
  f(a).forEach((m) => {
    const { init: i, selector: n } = m;
    L(
      i,
      t.filter((e) => c(e, n))
    );
  });
}, uo = (o) => {
  const r = o && o.nodeName ? o : document;
  l(a).forEach((t) => {
    T(t, r);
  });
};
document.body ? p() : u(document, "DOMContentLoaded", () => p(), { once: !0 });
export {
  p as initCallback,
  uo as removeDataAPI
};
//# sourceMappingURL=init.mjs.map
