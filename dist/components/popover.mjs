import { N as p, t as i, M as n } from "./base-component-CQAH5ZXF.mjs";
import { d as r } from "./dataBsToggle-B84TS15h.mjs";
import { g as l, p as e, t as c, T as m, a, s as u } from "./tooltip-ClBo4cww.mjs";
const b = `[${r}="${e}"],[data-tip="${e}"]`, f = p({}, c, {
  template: l(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), g = (t) => i(t, a), d = (t) => new T(t);
class T extends m {
  static selector = b;
  static init = d;
  static getInstance = g;
  static styleTip = u;
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
    o.dismissible && s && setTimeout(() => n(s), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
