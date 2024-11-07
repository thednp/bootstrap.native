import { B as J, R as F, c as ee, d as S, Y as d, q as v, t as _, i as I, Z as R, Q as x, X as B, r as h, v as y, S as te, U as se, F as b, _ as oe, b as L, $ as P, a0 as A, I as q, a1 as Q, m as U, o as ae, p as W, W as ne, y as T } from "./base-component-Jx2aafTJ.mjs";
import { E as Y, r as Z } from "./event-listener-CUwvA4j6.mjs";
import { d as ie } from "./dataBsToggle-B84TS15h.mjs";
import { d as re } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as le } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { h as de, m as r } from "./popupContainer-CgZsH2ur.mjs";
import { m as z, g as D, a as ce, t as ge, s as me, h as G, b as he, c as fe, o as m, d as pe, r as ue, i as ve, e as be } from "./isVisible-DLMDMGcf.mjs";
import { g as K } from "./getTargetElement-Bv0W3Fir.mjs";
const Te = `.${r}`, N = `[${ie}="${r}"]`, Se = `[${re}="${r}"]`, V = `${r}-static`, ye = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => _(s, z), we = (s) => new Me(s), u = y(
  `show.bs.${r}`
), k = y(
  `shown.bs.${r}`
), w = y(
  `hide.bs.${r}`
), E = y(
  `hidden.bs.${r}`
), X = (s) => {
  const { element: e } = s, t = he(e), { clientHeight: o, scrollHeight: a } = te(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [se(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  fe(e, n || o !== a);
}, j = (s, e) => {
  const t = e ? Y : Z, { element: o } = s;
  t(o, U, ke), t(S(o), ae, $e), e ? s._observer.observe(o) : s._observer.disconnect();
}, M = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  ue(t), b(t, { paddingRight: "", display: "" }), j(s);
  const a = u.relatedTarget || e.find(ve);
  a && q(a), E.relatedTarget = o || void 0, v(t, E), Q(t);
}, H = (s) => {
  const { element: e, relatedTarget: t } = s;
  q(e), j(s, !0), k.relatedTarget = t || void 0, v(e, k), Q(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), X(s), D(e) || b(oe(e), { overflow: "hidden" }), L(e, i), B(e, P), x(e, A, "true"), t ? h(e, () => H(s)) : H(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(m, i) && !D(e) ? (G(), h(m, () => M(s))) : M(s);
}, De = (s) => {
  const { target: e } = s, t = e && W(e, N), o = t && K(t), a = o && f(o);
  a && (t && t.tagName === "A" && s.preventDefault(), a.relatedTarget = t, a.toggle());
}, $e = ({ code: s, target: e }) => {
  const t = F(be, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === ne && d(t, i) && (o.relatedTarget = null, o.hide());
}, ke = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), $ = n && W(n, Se);
  a && !p ? T.set(
    e,
    () => {
      L(e, V), h(l, () => Ee(t));
    },
    17
  ) : ($ || !g && !a && !p && c) && (t.relatedTarget = $ || null, t.hide(), s.preventDefault());
}, Ee = (s) => {
  const { element: e, modalDialog: t } = s, o = (I(t) || 0) + 17;
  R(e, V), T.set(e, () => T.clear(e), o);
};
class Me extends J {
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
      ...ee(
        N,
        S(o)
      )
    ].filter(
      (l) => K(l) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = d(o, le), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return z;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ye;
  }
  toggle() {
    d(this.element, i) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, hasFade: o, relatedTarget: a } = this, { backdrop: l } = t;
    let c = 0;
    if (d(e, i) || (u.relatedTarget = a || void 0, v(e, u), u.defaultPrevented)) return;
    const n = D(e);
    if (n && n !== e) {
      const g = f(n) || _(
        n,
        pe
      );
      g && g.hide();
    }
    l ? (de(m) ? ge(!0) : ce(e, o, !0), c = I(m), me(), setTimeout(() => C(this), c)) : (C(this), n && d(m, i) && G());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (w.relatedTarget = o || void 0, v(e, w), !w.defaultPrevented && (R(e, i), x(e, P, "true"), B(e, A), t ? h(e, () => O(this)) : O(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    d(this.element, i) && X(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (e) => {
    const t = e ? Y : Z, { triggers: o } = this;
    o.length && o.forEach((a) => t(a, U, De));
  };
  dispose() {
    const e = { ...this }, { modalDialog: t, hasFade: o } = e, a = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), o ? h(t, a) : a();
  }
}
export {
  Me as default
};
//# sourceMappingURL=modal.mjs.map
