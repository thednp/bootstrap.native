import { q as r, B as i, L as a } from "./shorty-f5e32a8f.js";
import { d as m } from "./dataBsToggle-330f300b.js";
import { p as s } from "./createTip-c738ae49.js";
import { s as n, p } from "./styleTip-2726b8f9.js";
import l from "./getTipTemplate.mjs";
import c from "./tooltipDefaults.mjs";
import f from "./tooltip.mjs";
import "./tooltipString-23f00c61.js";
import "./fadeClass-0d50d035.js";
import "./tipClassPositions.mjs";
import "./setHtml.mjs";
import "./event-listener-e555c4ba.js";
import "./showClass-f6a4d601.js";
import "./offcanvasString-ecc53af6.js";
import "./popupContainer.mjs";
import "./getElementContainer.mjs";
import "./base-component.mjs";
const u = `[${m}="${s}"],[data-tip="${s}"]`, b = r({}, c, {
  template: l(s),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), d = (t) => a(t, p), g = (t) => new v(t);
class v extends f {
  static selector = u;
  static init = g;
  static getInstance = d;
  static styleTip = n;
  constructor(e, o) {
    super(e, o);
  }
  get name() {
    return p;
  }
  get defaults() {
    return b;
  }
  show() {
    super.show();
    const { options: e, btn: o } = this;
    e.dismissible && o && setTimeout(() => i(o), 17);
  }
}
export {
  v as default
};
//# sourceMappingURL=popover.mjs.map
