import { q as p, v as i, L as n } from "./base-component-215a274f.js";
import { d as r } from "./dataBsToggle-330f300b.js";
import { T as l, s as c, p as a, a as e, g as m, t as u } from "./tooltip-d4e567a2.js";
import "./event-listener-097fdcc5.js";
import "./showClass-f6a4d601.js";
import "./popupContainer-26c3059d.js";
import "./fadeClass-0d50d035.js";
const b = `[${r}="${e}"],[data-tip="${e}"]`, f = p({}, u, {
  template: m(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), g = (t) => n(t, a), d = (t) => new v(t);
class v extends l {
  static selector = b;
  static init = d;
  static getInstance = g;
  static styleTip = c;
  constructor(s, o) {
    super(s, o);
  }
  get name() {
    return a;
  }
  get defaults() {
    return f;
  }
  show() {
    super.show();
    const { options: s, btn: o } = this;
    s.dismissible && o && setTimeout(() => i(o), 17);
  }
}
export {
  v as default
};
//# sourceMappingURL=popover.mjs.map
