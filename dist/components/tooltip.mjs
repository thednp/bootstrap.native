import { L as N, a6 as U, q as X, S as R, x as Y, c as E, G as p, W as b, a7 as T, Q as v, F as W, k as tt, M as ot, z as x, N as it, a2 as et, a5 as C, R as m, a8 as st, a9 as nt, aa as at, m as ht, u as w, j as rt, ab as Z, _ as ct, ac as lt, ad as pt, ae as dt, B as mt, d as B, $ as j, J as q, I as D, Z as ft, V as F, af as J } from "./shorty-f5e32a8f.js";
import { E as S, r as y } from "./event-listener-e555c4ba.js";
import { d as ut } from "./dataBsToggle-330f300b.js";
import { s as $ } from "./showClass-f6a4d601.js";
import { t as P } from "./tooltipString-23f00c61.js";
import { t as d, c as gt, p as bt } from "./createTip-c738ae49.js";
import { s as H, p as Tt } from "./styleTip-2726b8f9.js";
import { m as I, o as M } from "./offcanvasString-ecc53af6.js";
import { hasPopup as u, appendPopup as vt, removePopup as wt } from "./popupContainer.mjs";
import $t from "./getElementContainer.mjs";
import O from "./tooltipDefaults.mjs";
import Pt from "./base-component.mjs";
import "./fadeClass-0d50d035.js";
import "./tipClassPositions.mjs";
import "./setHtml.mjs";
import "./getTipTemplate.mjs";
const Q = "data-original-title", Et = `[${ut}="${P}"],[data-tip="${P}"]`, V = "title";
let L = (i) => N(i, d);
const Ct = (i) => new At(i), St = (i) => {
  const { element: e, tooltip: o, container: t, offsetParent: s } = i;
  F(e, J), wt(o, t === s ? t : void 0);
}, yt = (i, e) => {
  const { element: o } = i;
  g(i), R(o, Q) && i.name === d && K(i), e && e();
}, _ = (i, e) => {
  const o = e ? S : y, { element: t } = i;
  o(E(t), Z, i.handleTouch, m), C(t) || [D, q].forEach((s) => {
    o(j(t), s, i.update, m);
  });
}, k = (i) => {
  const { element: e } = i, o = b(`shown.bs.${T(i.name)}`);
  _(i, !0), v(e, o), p.clear(e, "in");
}, z = (i, e) => {
  const { element: o } = i, t = b(`hidden.bs.${T(i.name)}`);
  _(i), St(i), v(o, t), et(e) && e(), p.clear(o, "out");
}, g = (i, e) => {
  const o = e ? S : y, { element: t, options: s, btn: n } = i, { trigger: a } = s, h = !!(i.name !== d && s.dismissible);
  if (a?.includes("manual"))
    return;
  i.enabled = !!e;
  const l = a?.split(" "), c = C(t);
  c && o(t, st, i.update, m), l?.forEach((f) => {
    c || f === nt ? (o(t, at, i.show), o(t, ht, i.show), h && n ? o(n, w, i.hide) : (o(t, rt, i.hide), o(E(t), Z, i.handleTouch, m))) : f === w ? o(t, f, h ? i.show : i.toggle) : f === ct && (o(t, lt, i.show), h || o(t, pt, i.hide), dt && o(t, w, () => mt(t)));
  });
}, G = (i, e) => {
  const o = e ? S : y, { element: t, container: s, offsetParent: n } = i, { offsetHeight: a, scrollHeight: r } = s, h = B(t, `.${I}`), l = B(t, `.${M}`);
  if (!C(t)) {
    const c = j(t), A = a !== r && s === n ? s : c;
    o(A, q, i.update, m), o(A, D, i.update, m);
  }
  h && o(h, `hide.bs.${I}`, i.hide), l && o(l, `hide.bs.${M}`, i.hide);
}, K = (i, e) => {
  const o = [Q, V], { element: t } = i;
  W(t, o[e ? 0 : 1], e || ft(t, o[0]) || ""), F(t, o[e ? 1 : 0]);
};
class At extends Pt {
  static selector = Et;
  static init = Ct;
  static getInstance = L;
  static styleTip = H;
  constructor(e, o) {
    super(e, o);
    const { element: t } = this, s = this.name === d, n = s ? P : bt, a = s ? d : Tt;
    L = (h) => N(h, a), this.enabled = !0, this.id = `${n}-${U(t, n)}`;
    const { options: r } = this;
    !r.title && s || !s && !r.content || (X(O, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), R(t, V) && s && typeof r.title == "string" && K(this, r.title), this.container = $t(t), this.offsetParent = ["sticky", "fixed"].some(
      (h) => Y(this.container, "position") === h
    ) ? this.container : E(this.element).body, gt(this), g(this, !0));
  }
  get name() {
    return d;
  }
  get defaults() {
    return O;
  }
  show(e) {
    const { options: o, tooltip: t, element: s, container: n, offsetParent: a, id: r } = this, { animation: h } = o, l = p.get(s, "out");
    p.clear(s, "out"), t && !l && !u(t, n === a ? n : void 0) && p.set(
      s,
      () => {
        const c = b(`show.bs.${T(this.name)}`);
        v(s, c), !c.defaultPrevented && (vt(t, n === a ? n : void 0), W(s, J, `#${r}`), this.update(e), G(this, !0), tt(t, $) || ot(t, $), h ? x(t, () => k(this)) : k(this));
      },
      17,
      "in"
    );
  }
  hide(e, o) {
    const { options: t, tooltip: s, element: n, container: a, offsetParent: r } = this, { animation: h, delay: l } = t;
    p.clear(n, "in"), s && u(s, a === r ? a : void 0) && p.set(
      n,
      () => {
        const c = b(`hide.bs.${T(this.name)}`);
        v(n, c), !c.defaultPrevented && (this.update(e), it(s, $), G(this), h ? x(s, () => z(this, o)) : z(this, o));
      },
      l + 17,
      "out"
    );
  }
  update(e) {
    H(this, e);
  }
  toggle(e) {
    const { tooltip: o, container: t, offsetParent: s } = this;
    o && !u(o, t === s ? t : void 0) ? this.show(e) : this.hide();
  }
  enable() {
    const { enabled: e } = this;
    e || (g(this, !0), this.enabled = !e);
  }
  disable() {
    const { tooltip: e, container: o, offsetParent: t, options: s, enabled: n } = this, { animation: a } = s;
    n && (e && u(e, o === t ? o : void 0) && a ? this.hide(void 0, () => g(this)) : g(this), this.enabled = !n);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch({ target: e }) {
    const { tooltip: o, element: t } = this;
    o && o.contains(e) || e === t || e && t.contains(e) || this.hide();
  }
  dispose() {
    const { tooltip: e, container: o, offsetParent: t, options: s } = this, n = () => yt(this, () => super.dispose());
    s.animation && e && u(e, o === t ? o : void 0) ? (this.options.delay = 0, this.hide(void 0, n)) : n();
  }
}
export {
  At as default
};
//# sourceMappingURL=tooltip.mjs.map
