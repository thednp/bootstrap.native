import { N as p, t as i, M as n } from "./base-component-CQAH5ZXF.mjs";
import { d as l } from "./dataBsToggle-B84TS15h.mjs";
import { g as r, p as e, t as c, T as m, a, s as u } from "./tooltip-ClBo4cww.mjs";
const b = `[${l}="${e}"],[data-tip="${e}"]`, d = p({}, c, {
  template: r(e),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), f = (t) => i(t, a), g = (t) => new T(t);
class T extends m {
  static selector = b;
  static init = g;
  static getInstance = f;
  static styleTip = u;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, o) {
    super(s, o);
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
    return d;
  }
  show = () => {
    super.show();
    const { options: s, btn: o } = this;
    s.dismissible && o && setTimeout(() => n(o), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
