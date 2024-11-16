import { B as j, t as F, R as _, e as ee, d as S, Z as d, m as y, q as v, u as R, F as b, S as te, U as se, $ as oe, b as x, a0 as B, a1 as I, Q as L, a2 as P, s as h, M as A, E as q, h as T, k as Q, Y as U, v as Y, X as ae, p as ne, a3 as Z, r as z } from "./base-component-CQAH5ZXF.mjs";
import { d as ie } from "./dataBsToggle-B84TS15h.mjs";
import { d as re } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as le } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { m as r, h as de } from "./popupContainer-BvxACdvn.mjs";
import { m as G, g as w, o as ce, a as m, b as ge, t as me, s as he, c as fe, d as pe, e as ue, h as J, r as ve, i as be } from "./isVisible-D6KlD4UJ.mjs";
import { g as K } from "./getTargetElement-v_1VfmtN.mjs";
import { i as Te } from "./isDisabled-bThyhy2g.mjs";
const Se = `.${r}`, N = `[${ie}="${r}"]`, ye = `[${re}="${r}"]`, V = `${r}-static`, De = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => F(s, G), we = (s) => new He(s), u = y(
  `show.bs.${r}`
), E = y(
  `shown.bs.${r}`
), D = y(
  `hide.bs.${r}`
), M = y(
  `hidden.bs.${r}`
), W = (s) => {
  const { element: e } = s, t = fe(e), { clientHeight: o, scrollHeight: a } = te(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [se(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  pe(e, n || o !== a);
}, X = (s, e) => {
  const t = e ? q : z, { element: o } = s;
  t(o, Y, Me), t(S(o), ne, Ee), e ? s._observer.observe(o) : s._observer.disconnect();
}, $ = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  ve(t), b(t, { paddingRight: "", display: "" }), X(s);
  const a = u.relatedTarget || e.find(be);
  a && A(a), M.relatedTarget = o || void 0, v(t, M), Z(t);
}, H = (s) => {
  const { element: e, relatedTarget: t } = s;
  A(e), X(s, !0), E.relatedTarget = t || void 0, v(e, E), Z(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), W(s), w(e) || b(oe(e), { overflow: "hidden" }), x(e, i), B(e, I), L(e, P, "true"), t ? h(e, () => H(s)) : H(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(m, i) && !w(e) ? (J(), h(m, () => $(s))) : $(s);
}, ke = (s) => {
  const { target: e } = s, t = e && Q(e, N), o = t && K(t), a = o && f(o);
  a && (t && t.tagName === "A" && s.preventDefault(), a.relatedTarget = t, a.toggle());
}, Ee = ({ code: s, target: e }) => {
  const t = _(ue, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === ae && d(t, i) && (o.relatedTarget = null, o.hide());
}, Me = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), k = n && Q(n, ye);
  a && !p ? T.set(
    e,
    () => {
      x(e, V), h(l, () => $e(t));
    },
    17
  ) : (k || !g && !a && !p && c) && (t.relatedTarget = k || null, t.hide(), s.preventDefault());
}, $e = (s) => {
  const { element: e, modalDialog: t } = s, o = (R(t) || 0) + 17;
  U(e, V), T.set(e, () => T.clear(e), o);
};
class He extends j {
  static selector = Se;
  static init = we;
  static getInstance = f;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, t) {
    super(e, t);
    const { element: o } = this, a = _(
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
    return G;
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
      const g = f(n) || F(
        n,
        ce
      );
      g && g.hide();
    }
    l ? (de(m) ? me(!0) : ge(e, o, !0), c = R(m), he(), setTimeout(() => C(this), c)) : (C(this), n && d(m, i) && J());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (D.relatedTarget = o || void 0, v(e, D), !D.defaultPrevented && (U(e, i), L(e, I, "true"), B(e, P), t ? h(e, () => O(this)) : O(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    d(this.element, i) && W(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (e) => {
    const t = e ? q : z, { triggers: o } = this;
    o.length && o.forEach((a) => {
      Te(a) || t(a, Y, ke);
    });
  };
  dispose() {
    const e = { ...this }, { modalDialog: t, hasFade: o } = e, a = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), o ? h(t, a) : a();
  }
}
export {
  He as default
};
//# sourceMappingURL=modal.mjs.map
