import { W as f, k as u, M as h, N as r, g as z, e as G, c as L, Q as m, L as M, i as E, z as S, G as a, u as w, ac as D, ad as P, m as k, j as Q, d as W } from "./shorty-f5e32a8f.js";
import { E as j, r as A } from "./event-listener-e555c4ba.js";
import { f as d } from "./fadeClass-0d50d035.js";
import { s as g } from "./showClass-f6a4d601.js";
import { d as q } from "./dataBsDismiss-afbfbc79.js";
import { d as F } from "./dataBsToggle-330f300b.js";
import { g as y } from "./getTargetElement-bc4f0355.js";
import J from "./base-component.mjs";
const i = "toast", B = "Toast", K = `.${i}`, O = `[${q}="${i}"]`, H = `[${F}="${i}"]`, c = "showing", I = "hide", R = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, T = (s) => M(s, B), U = (s) => new et(s), C = f(`show.bs.${i}`), V = f(`shown.bs.${i}`), $ = f(`hide.bs.${i}`), X = f(`hidden.bs.${i}`), b = (s) => {
  const { element: t, options: e } = s;
  r(t, c), a.clear(t, c), m(t, V), e.autohide && a.set(t, () => s.hide(), e.delay, i);
}, v = (s) => {
  const { element: t } = s;
  r(t, c), r(t, g), h(t, I), a.clear(t, i), m(t, X);
}, Y = (s) => {
  const { element: t, options: e } = s;
  h(t, c), e.animation ? (E(t), S(t, () => v(s))) : v(s);
}, Z = (s) => {
  const { element: t, options: e } = s;
  a.set(
    t,
    () => {
      r(t, I), E(t), h(t, g), h(t, c), e.animation ? S(t, () => b(s)) : b(s);
    },
    17,
    c
  );
}, N = (s, t) => {
  const e = t ? j : A, { element: o, triggers: n, dismiss: l, options: x } = s;
  l && e(l, w, s.hide), x.autohide && [D, P, k, Q].forEach(
    (p) => e(o, p, st)
  ), n.length && n.forEach((p) => e(p, w, tt));
}, _ = (s) => {
  a.clear(s.element, i), N(s);
}, tt = (s) => {
  const { target: t } = s, e = t && W(t, H), o = e && y(e), n = o && T(o);
  n && (e && e.tagName === "A" && s.preventDefault(), n.relatedTarget = e, n.show());
}, st = (s) => {
  const t = s.target, e = T(t), { type: o, relatedTarget: n } = s;
  !e || t === n || t.contains(n) || ([k, D].includes(o) ? a.clear(t, i) : a.set(t, () => e.hide(), e.options.delay, i));
};
class et extends J {
  static selector = K;
  static init = U;
  static getInstance = T;
  constructor(t, e) {
    super(t, e);
    const { element: o, options: n } = this;
    n.animation && !u(o, d) ? h(o, d) : !n.animation && u(o, d) && r(o, d), this.dismiss = z(O, o), this.triggers = [...G(H, L(o))].filter(
      (l) => y(l) === o
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), N(this, !0);
  }
  get name() {
    return B;
  }
  get defaults() {
    return R;
  }
  get isShown() {
    return u(this.element, g);
  }
  show() {
    const { element: t, isShown: e } = this;
    if (t && !e) {
      if (m(t, C), C.defaultPrevented)
        return;
      Z(this);
    }
  }
  hide() {
    const { element: t, isShown: e } = this;
    if (t && e) {
      if (m(t, $), $.defaultPrevented)
        return;
      Y(this);
    }
  }
  dispose() {
    const { element: t, isShown: e } = this;
    e && r(t, g), _(this), super.dispose();
  }
}
export {
  et as default
};
//# sourceMappingURL=toast.mjs.map
