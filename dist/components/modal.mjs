import { B as X, q as F, n as ee, l as y, h as c, d as v, g as _, p as A, r as B, s as I, Z as L, e as h, c as E, Q as te, i as se, K as b, _ as ae, f as x, $ as R, a0 as q, N as P, a1 as K, m as N, C as oe, D as z, Y as ne, T } from "./base-component-ylZzLp-h.mjs";
import { E as Q, r as V } from "./event-listener-C1-Yf9Z5.mjs";
import { d as ie } from "./dataBsToggle-B84TS15h.mjs";
import { d as le } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { h as ce, m as l } from "./popupContainer-ymf2oGcv.mjs";
import { m as W, g as D, a as de, t as ge, s as me, h as Y, b as he, c as fe, o as m, d as pe, r as ue, i as ve, e as be } from "./isVisible-B3gs6dMb.mjs";
import { g as Z } from "./getTargetElement-BFOUI7hP.mjs";
const Te = `.${l}`, j = `[${ie}="${l}"]`, ye = `[${le}="${l}"]`, G = `${l}-static`, Ee = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => _(s, W), Se = (s) => new Me(s), u = E(
  `show.bs.${l}`
), k = E(
  `shown.bs.${l}`
), S = E(
  `hide.bs.${l}`
), C = E(
  `hidden.bs.${l}`
), J = (s) => {
  const { element: e } = s, t = he(e), { clientHeight: a, scrollHeight: o } = te(e), { clientHeight: r, scrollHeight: d } = e, n = r !== d;
  if (!n && t) {
    const p = { [se(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  fe(e, n || a !== o);
}, U = (s, e) => {
  const t = e ? Q : V, { element: a } = s;
  t(a, N, ke), t(y(a), oe, we), e ? s._observer.observe(a) : s._observer.disconnect();
}, M = (s) => {
  const { triggers: e, element: t, relatedTarget: a } = s;
  ue(t), b(t, { paddingRight: "", display: "" }), U(s);
  const o = u.relatedTarget || e.find(ve);
  o && P(o), C.relatedTarget = a, v(t, C), K(t);
}, $ = (s) => {
  const { element: e, relatedTarget: t } = s;
  P(e), U(s, !0), k.relatedTarget = t, v(e, k), K(e);
}, H = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), J(s), D(e) || b(ae(e), { overflow: "hidden" }), x(e, i), L(e, R), I(e, q, "true"), t ? h(e, () => $(s)) : $(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: a } = s;
  t.backdrop && a && c(m, i) && !D(e) ? (Y(), h(m, () => M(s))) : M(s);
}, De = (s) => {
  const { target: e } = s, t = e && z(e, j), a = t && Z(t), o = a && f(a);
  o && (t && t.tagName === "A" && s.preventDefault(), o.relatedTarget = t, o.toggle());
}, we = ({ code: s, target: e }) => {
  const t = F(be, y(e)), a = t && f(t);
  if (a) {
    const { options: o } = a;
    o.keyboard && s === ne && // the keyboard option is enabled and the key is 27
    c(t, i) && (a.relatedTarget = null, a.hide());
  }
}, ke = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (t && e && !T.get(e)) {
    const { options: a, isStatic: o, modalDialog: r } = t, { backdrop: d } = a, { target: n } = s, g = y(e)?.getSelection()?.toString().length, p = r.contains(n), w = n && z(n, ye);
    o && !p ? T.set(
      e,
      () => {
        x(e, G), h(r, () => Ce(t));
      },
      17
    ) : (w || !g && !o && !p && d) && (t.relatedTarget = w || null, t.hide(), s.preventDefault());
  }
}, Ce = (s) => {
  const { element: e, modalDialog: t } = s, a = (A(t) || 0) + 17;
  B(e, G), T.set(e, () => T.clear(e), a);
};
class Me extends X {
  static selector = Te;
  static init = Se;
  static getInstance = f;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: a } = this, o = F(`.${l}-dialog`, a);
    o && (this.modalDialog = o, this.triggers = [
      ...ee(j, y(a))
    ].filter(
      (r) => Z(r) === a
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = c(a, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return W;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ee;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    c(this.element, i) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: t, hasFade: a, relatedTarget: o } = this, { backdrop: r } = t;
    let d = 0;
    if (!c(e, i) && (u.relatedTarget = o || void 0, v(e, u), !u.defaultPrevented)) {
      const n = D(e);
      if (n && n !== e) {
        const g = f(n) || // istanbul ignore next @preserve
        _(
          n,
          pe
        );
        g && g.hide();
      }
      r ? (ce(m) ? ge(!0) : de(e, a, !0), d = A(m), me(), setTimeout(() => H(this), d)) : (H(this), n && c(m, i) && Y());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: t, relatedTarget: a } = this;
    c(e, i) && (S.relatedTarget = a || void 0, v(e, S), S.defaultPrevented || (B(e, i), I(e, R, "true"), L(e, q), t ? h(e, () => O(this)) : O(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    c(this.element, i) && J(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (e) => {
    const t = e ? Q : V, { triggers: a } = this;
    a.length && a.forEach(
      (o) => t(o, N, De)
    );
  };
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { modalDialog: t, hasFade: a } = e, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), a ? h(t, o) : o();
  }
}
export {
  Me as default
};
//# sourceMappingURL=modal.mjs.map
