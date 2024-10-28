import { O as n, N as i, g as p } from "./base-component-ylZzLp-h.mjs";
import { d as r } from "./dataBsToggle-B84TS15h.mjs";
import { T as l, s as c, p as a, a as o, g as m, t as u } from "./tooltip-B5F6ZNW7.mjs";
const g = `[${r}="${o}"],[data-tip="${o}"]`, b = n({}, u, {
  template: m(o),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), f = (t) => p(t, a), d = (t) => new T(t);
class T extends l {
  static selector = g;
  static init = d;
  static getInstance = f;
  static styleTip = c;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
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
    return b;
  }
  /* extend original `show()` */
  show = () => {
    super.show();
    const { options: e, btn: s } = this;
    e.dismissible && s && setTimeout(() => i(s), 17);
  };
}
export {
  T as default
};
//# sourceMappingURL=popover.mjs.map
