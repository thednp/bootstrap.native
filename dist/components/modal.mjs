import { B as W, R as F, e as j, d as S, Z as d, q as v, t as _, u as R, Y as x, Q as B, $ as I, s as m, m as y, S as X, U as ee, F as b, a0 as te, b as L, a1 as P, a2 as A, E as q, r as K, K as Q, a3 as U, v as Y, k as se, _ as oe, h as T, l as ae } from "./base-component-DAxvn9am.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { d as ie } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { h as le, m as r } from "./popupContainer-BxKTLA8g.mjs";
import { m as Z, g as w, a as de, t as ce, s as ge, h as z, b as he, c as me, o as h, d as fe, r as pe, i as ue, e as ve } from "./isVisible-BWjkLKSb.mjs";
import { g as G } from "./getTargetElement-C1k_p6ls.mjs";
import { i as be } from "./isDisabled-DRrRkHiq.mjs";
const Te = `.${r}`, Se = `[${ne}="${r}"]`, ye = `[${ie}="${r}"]`, J = `${r}-static`, De = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => _(s, Z), we = (s) => new He(s), u = y(
  `show.bs.${r}`
), E = y(
  `shown.bs.${r}`
), D = y(
  `hide.bs.${r}`
), $ = y(
  `hidden.bs.${r}`
), N = (s) => {
  const { element: e } = s, t = he(e), { clientHeight: o, scrollHeight: a } = X(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [ee(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  me(e, n || o !== a);
}, V = (s, e) => {
  const t = e ? q : K, { element: o } = s;
  t(o, Y, $e), t(S(o), se, Ee), e ? s._observer.observe(o) : s._observer.disconnect();
}, M = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  pe(t), b(t, { paddingRight: "", display: "" }), V(s);
  const a = u.relatedTarget || e.find(ue);
  a && Q(a), $.relatedTarget = o || void 0, v(t, $), U(t);
}, H = (s) => {
  const { element: e, relatedTarget: t } = s;
  Q(e), V(s, !0), E.relatedTarget = t || void 0, v(e, E), U(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), N(s), w(e) || b(te(e), { overflow: "hidden" }), L(e, i), I(e, P), B(e, A, "true"), t ? m(e, () => H(s)) : H(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(h, i) && !w(e) ? (z(), m(h, () => M(s))) : M(s);
};
function ke(s) {
  const e = G(this), t = e && f(e);
  be(this) || t && (this.tagName === "A" && s.preventDefault(), t.relatedTarget = this, t.toggle());
}
const Ee = ({ code: s, target: e }) => {
  const t = F(ve, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === oe && d(t, i) && (o.relatedTarget = null, o.hide());
}, $e = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), k = n && ae(n, ye);
  a && !p ? T.set(
    e,
    () => {
      L(e, J), m(l, () => Me(t));
    },
    17
  ) : (k || !g && !a && !p && c) && (t.relatedTarget = k || null, t.hide(), s.preventDefault());
}, Me = (s) => {
  const { element: e, modalDialog: t } = s, o = (R(t) || 0) + 17;
  x(e, J), T.set(e, () => T.clear(e), o);
};
class He extends W {
  static selector = Te;
  static init = we;
  static getInstance = f;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: o } = this, a = F(
      `.${r}-dialog`,
      o
    );
    a && (this.modalDialog = a, this.triggers = [
      ...j(
        Se,
        S(o)
      )
    ].filter(
      (l) => G(l) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = d(o, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Z;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return De;
  }
  toggle() {
    d(this.element, i) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, hasFade: o, relatedTarget: a } = this, { backdrop: l } = t;
    let c = 0;
    if (d(e, i) || (u.relatedTarget = a || void 0, v(e, u), u.defaultPrevented)) return;
    const n = w(e);
    if (n && n !== e) {
      const g = f(n) || _(
        n,
        fe
      );
      g && g.hide();
    }
    l ? (le(h) ? ce(!0) : de(e, o, !0), c = R(h), ge(), setTimeout(() => C(this), c)) : (C(this), n && d(h, i) && z());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (D.relatedTarget = o || void 0, v(e, D), !D.defaultPrevented && (x(e, i), B(e, P, "true"), I(e, A), t ? m(e, () => O(this)) : O(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    d(this.element, i) && N(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (e) => {
    const t = e ? q : K, { triggers: o } = this;
    o.length && o.forEach((a) => {
      t(a, Y, ke);
    });
  };
  dispose() {
    const e = { ...this }, { modalDialog: t, hasFade: o } = e, a = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), o ? m(t, a) : a();
  }
}
export {
  He as default
};
//# sourceMappingURL=modal.mjs.map
