import { W as f, B as z, k as u, M as h, N as r, g as G, b as L, a as M, Q as m, L as P, c as E, z as S, G as i, u as w, ac as D, ad as Q, m as k, i as W, d as A } from "./base-component-215a274f.js";
import { E as j, d as q } from "./event-listener-097fdcc5.js";
import { f as l } from "./fadeClass-0d50d035.js";
import { s as g } from "./showClass-f6a4d601.js";
import { d as F } from "./dataBsDismiss-afbfbc79.js";
import { d as J } from "./dataBsToggle-330f300b.js";
import { g as y } from "./getTargetElement-bb362549.js";
const a = "toast", B = "Toast", K = `.${a}`, O = `[${F}="${a}"]`, H = `[${J}="${a}"]`, c = "showing", I = "hide", R = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, T = (s) => P(s, B), U = (s) => new et(s), C = f(`show.bs.${a}`), V = f(`shown.bs.${a}`), $ = f(`hide.bs.${a}`), X = f(`hidden.bs.${a}`), b = (s) => {
  const { element: t, options: e } = s;
  r(t, c), i.clear(t, c), m(t, V), e.autohide && i.set(t, () => s.hide(), e.delay, a);
}, v = (s) => {
  const { element: t } = s;
  r(t, c), r(t, g), h(t, I), i.clear(t, a), m(t, X);
}, Y = (s) => {
  const { element: t, options: e } = s;
  h(t, c), e.animation ? (E(t), S(t, () => v(s))) : v(s);
}, Z = (s) => {
  const { element: t, options: e } = s;
  i.set(
    t,
    () => {
      r(t, I), E(t), h(t, g), h(t, c), e.animation ? S(t, () => b(s)) : b(s);
    },
    17,
    c
  );
}, N = (s, t) => {
  const e = t ? j : q, { element: o, triggers: n, dismiss: d, options: x } = s;
  d && e(d, w, s.hide), x.autohide && [D, Q, k, W].forEach(
    (p) => e(o, p, st)
  ), n.length && n.forEach((p) => e(p, w, tt));
}, _ = (s) => {
  i.clear(s.element, a), N(s);
}, tt = (s) => {
  const { target: t } = s, e = t && A(t, H), o = e && y(e), n = o && T(o);
  !n || (e && e.tagName === "A" && s.preventDefault(), n.relatedTarget = e, n.show());
}, st = (s) => {
  const t = s.target, e = T(t), { type: o, relatedTarget: n } = s;
  !e || t === n || t.contains(n) || ([k, D].includes(o) ? i.clear(t, a) : i.set(t, () => e.hide(), e.options.delay, a));
};
class et extends z {
  static selector = K;
  static init = U;
  static getInstance = T;
  constructor(t, e) {
    super(t, e);
    const { element: o, options: n } = this;
    n.animation && !u(o, l) ? h(o, l) : !n.animation && u(o, l) && r(o, l), this.dismiss = G(O, o), this.triggers = [...L(H, M(o))].filter(
      (d) => y(d) === o
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
