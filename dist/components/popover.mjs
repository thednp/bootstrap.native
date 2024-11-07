import { N as i, I as p, t as n } from "./base-component-Jx2aafTJ.mjs";
import { d as r } from "./dataBsToggle-B84TS15h.mjs";
import { T as l, s as c, p as a, a as e, g as m, t as u } from "./tooltip-Cxy40RjE.mjs";
const b = `[${r}="${e}"],[data-tip="${e}"]`, f = i({}, u, {
  template: m(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), g = (t) => n(t, a), d = (t) => new T(t);
class T extends l {
  static selector = b;
  static init = d;
  static getInstance = g;
  static styleTip = c;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(o, s) {
    super(o, s);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return a;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return f;
  }
  show = () => {
    super.show();
    const { options: o, btn: s } = this;
    o.dismissible && s && setTimeout(() => p(s), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
