import { B as g, k as o, F as c, A as r, L as p, u as f, N as d, M as b } from "./base-component-215a274f.js";
import { E as v, d as A } from "./event-listener-097fdcc5.js";
import { a as i } from "./activeClass-b231b21b.js";
import { d as B } from "./dataBsToggle-330f300b.js";
const h = "button", m = "Button", C = `[${B}="${h}"]`, u = (e) => p(e, m), k = (e) => new I(e), l = (e, t) => {
  (t ? v : A)(e.element, f, e.toggle);
};
class I extends g {
  static selector = C;
  static init = k;
  static getInstance = u;
  isActive = !1;
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = o(s, i), c(s, r, String(!!this.isActive)), l(this, !0);
  }
  get name() {
    return m;
  }
  toggle(t) {
    t && t.preventDefault();
    const s = t ? u(t.target) : this;
    if (!s.element)
      return;
    const { element: n, isActive: a } = s;
    if (o(n, "disabled"))
      return;
    (a ? d : b)(n, i), c(n, r, a ? "false" : "true"), s.isActive = o(n, i);
  }
  dispose() {
    l(this), super.dispose();
  }
}
export {
  I as default
};
//# sourceMappingURL=button.mjs.map
