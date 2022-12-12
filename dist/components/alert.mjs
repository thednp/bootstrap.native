import { W as f, B as g, g as A, d as C, k as a, Q as p, N as $, z as v, L as E, u as b } from "./base-component-215a274f.js";
import { E as h, d as k } from "./event-listener-097fdcc5.js";
import { f as B } from "./fadeClass-0d50d035.js";
import { s as i } from "./showClass-f6a4d601.js";
import { d as I } from "./dataBsDismiss-afbfbc79.js";
const n = "alert", u = "Alert", l = `.${n}`, S = `[${I}="${n}"]`, c = (s) => E(s, u), w = (s) => new z(s), m = f(`close.bs.${n}`), x = f(`closed.bs.${n}`), d = (s) => {
  const { element: t } = s;
  r(s), p(t, x), s.dispose(), t.remove();
}, r = (s, t) => {
  const o = t ? h : k, { dismiss: e } = s;
  e && o(e, b, s.close);
};
class z extends g {
  static selector = l;
  static init = w;
  static getInstance = c;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = A(S, this.element), r(this, !0);
  }
  get name() {
    return u;
  }
  close(t) {
    const o = t ? c(C(t.target, l)) : this, { element: e } = o;
    if (e && a(e, i)) {
      if (p(e, m), m.defaultPrevented)
        return;
      $(e, i), a(e, B) ? v(e, () => d(o)) : d(o);
    }
  }
  dispose() {
    r(this), super.dispose();
  }
}
export {
  z as default
};
//# sourceMappingURL=alert.mjs.map
