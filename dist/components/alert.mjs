import { W as f, g, d as A, k as i, Q as p, N as C, z as $, L as v, u as E } from "./shorty-f5e32a8f.js";
import { E as b, r as h } from "./event-listener-e555c4ba.js";
import { f as k } from "./fadeClass-0d50d035.js";
import { s as a } from "./showClass-f6a4d601.js";
import { d as I } from "./dataBsDismiss-afbfbc79.js";
import S from "./base-component.mjs";
const n = "alert", u = "Alert", l = `.${n}`, w = `[${I}="${n}"]`, c = (s) => v(s, u), x = (s) => new B(s), m = f(`close.bs.${n}`), z = f(`closed.bs.${n}`), d = (s) => {
  const { element: t } = s;
  r(s), p(t, z), s.dispose(), t.remove();
}, r = (s, t) => {
  const o = t ? b : h, { dismiss: e } = s;
  e && o(e, E, s.close);
};
class B extends S {
  static selector = l;
  static init = x;
  static getInstance = c;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = g(w, this.element), r(this, !0);
  }
  get name() {
    return u;
  }
  close(t) {
    const o = t ? c(A(t.target, l)) : this, { element: e } = o;
    if (e && i(e, a)) {
      if (p(e, m), m.defaultPrevented)
        return;
      C(e, a), i(e, k) ? $(e, () => d(o)) : d(o);
    }
  }
  dispose() {
    r(this), super.dispose();
  }
}
export {
  B as default
};
//# sourceMappingURL=alert.mjs.map
