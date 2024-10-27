var p = Object.defineProperty;
var c = (t, s, e) => s in t ? p(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var o = (t, s, e) => c(t, typeof s != "symbol" ? s + "" : s, e);
import { ObjectAssign as r, focus as m, getInstance as u } from "@thednp/shorty";
import { d as g } from "./dataBsToggle-B84TS15h.mjs";
import { t as b, g as f, T as d, s as T, p as l, a as i } from "./tooltip-Dyd4Gul9.mjs";
const C = `[${g}="${i}"],[data-tip="${i}"]`, I = r({}, b, {
  template: f(i),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), h = (t) => u(t, l), v = (t) => new a(t);
class a extends d {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /* extend original `show()` */
    o(this, "show", () => {
      super.show();
      const { options: e, btn: n } = this;
      // istanbul ignore else @preserve
      e.dismissible && n && setTimeout(() => m(n), 17);
    });
  }
  /**
   * Returns component name string.
   */
  get name() {
    return l;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return I;
  }
}
o(a, "selector", C), o(a, "init", v), o(a, "getInstance", h), o(a, "styleTip", T);
export {
  a as default
};
//# sourceMappingURL=popover.mjs.map
