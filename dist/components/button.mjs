import { k as o, F as c, A as r, L as g, u as p, N as f, M as d } from "./shorty-f5e32a8f.js";
import { E as b, r as v } from "./event-listener-e555c4ba.js";
import { a as i } from "./activeClass-b231b21b.js";
import { d as A } from "./dataBsToggle-330f300b.js";
import h from "./base-component.mjs";
const B = "button", m = "Button", C = `[${A}="${B}"]`, u = (e) => g(e, m), k = (e) => new I(e), l = (e, t) => {
  (t ? b : v)(e.element, p, e.toggle);
};
class I extends h {
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
    (a ? f : d)(n, i), c(n, r, a ? "false" : "true"), s.isActive = o(n, i);
  }
  dispose() {
    l(this), super.dispose();
  }
}
export {
  I as default
};
//# sourceMappingURL=button.mjs.map
