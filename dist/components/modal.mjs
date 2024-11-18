import { B as W, t as F, R as _, e as X, d as S, Z as d, m as y, q as v, u as R, F as b, S as j, U as ee, $ as te, b as x, a0 as B, a1 as I, Q as L, a2 as P, s as m, M as A, E as q, h as T, k as se, Y as Q, v as U, X as oe, p as ae, a3 as Y, r as Z } from "./base-component-CQAH5ZXF.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { d as ie } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as re } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { m as r, h as le } from "./popupContainer-BvxACdvn.mjs";
import { m as z, g as w, o as de, a as h, b as ce, t as ge, s as he, c as me, d as fe, e as pe, h as G, r as ue, i as ve } from "./isVisible-D6KlD4UJ.mjs";
import { g as J } from "./getTargetElement-v_1VfmtN.mjs";
import { i as be } from "./isDisabled-bThyhy2g.mjs";
const Te = `.${r}`, Se = `[${ne}="${r}"]`, ye = `[${ie}="${r}"]`, K = `${r}-static`, De = {
  backdrop: !0,
  keyboard: !0
}, f = (s) => F(s, z), we = (s) => new He(s), u = y(
  `show.bs.${r}`
), E = y(
  `shown.bs.${r}`
), D = y(
  `hide.bs.${r}`
), M = y(
  `hidden.bs.${r}`
), N = (s) => {
  const { element: e } = s, t = me(e), { clientHeight: o, scrollHeight: a } = j(e), { clientHeight: l, scrollHeight: c } = e, n = l !== c;
  if (!n && t) {
    const p = { [ee(e) ? "paddingLeft" : "paddingRight"]: `${t}px` };
    b(e, p);
  }
  fe(e, n || o !== a);
}, V = (s, e) => {
  const t = e ? q : Z, { element: o } = s;
  t(o, U, Me), t(S(o), ae, Ee), e ? s._observer.observe(o) : s._observer.disconnect();
}, $ = (s) => {
  const { triggers: e, element: t, relatedTarget: o } = s;
  ue(t), b(t, { paddingRight: "", display: "" }), V(s);
  const a = u.relatedTarget || e.find(ve);
  a && A(a), M.relatedTarget = o || void 0, v(t, M), Y(t);
}, H = (s) => {
  const { element: e, relatedTarget: t } = s;
  A(e), V(s, !0), E.relatedTarget = t || void 0, v(e, E), Y(e);
}, C = (s) => {
  const { element: e, hasFade: t } = s;
  b(e, { display: "block" }), N(s), w(e) || b(te(e), { overflow: "hidden" }), x(e, i), B(e, I), L(e, P, "true"), t ? m(e, () => H(s)) : H(s);
}, O = (s) => {
  const { element: e, options: t, hasFade: o } = s;
  t.backdrop && o && d(h, i) && !w(e) ? (G(), m(h, () => $(s))) : $(s);
};
function ke(s) {
  const e = J(this), t = e && f(e);
  be(this) || t && (this.tagName === "A" && s.preventDefault(), t.relatedTarget = this, t.toggle());
}
const Ee = ({ code: s, target: e }) => {
  const t = _(pe, S(e)), o = t && f(t);
  if (!o) return;
  const { options: a } = o;
  a.keyboard && s === oe && d(t, i) && (o.relatedTarget = null, o.hide());
}, Me = (s) => {
  const { currentTarget: e } = s, t = e && f(e);
  if (!t || !e || T.get(e)) return;
  const { options: o, isStatic: a, modalDialog: l } = t, { backdrop: c } = o, { target: n } = s, g = S(e)?.getSelection()?.toString().length, p = l.contains(n), k = n && se(n, ye);
  a && !p ? T.set(
    e,
    () => {
      x(e, K), m(l, () => $e(t));
    },
    17
  ) : (k || !g && !a && !p && c) && (t.relatedTarget = k || null, t.hide(), s.preventDefault());
}, $e = (s) => {
  const { element: e, modalDialog: t } = s, o = (R(t) || 0) + 17;
  Q(e, K), T.set(e, () => T.clear(e), o);
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
    const { element: o } = this, a = _(
      `.${r}-dialog`,
      o
    );
    a && (this.modalDialog = a, this.triggers = [
      ...X(
        Se,
        S(o)
      )
    ].filter(
      (l) => J(l) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = d(o, re), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
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
        de
      );
      g && g.hide();
    }
    l ? (le(h) ? ge(!0) : ce(e, o, !0), c = R(h), he(), setTimeout(() => C(this), c)) : (C(this), n && d(h, i) && G());
  }
  hide() {
    const { element: e, hasFade: t, relatedTarget: o } = this;
    d(e, i) && (D.relatedTarget = o || void 0, v(e, D), !D.defaultPrevented && (Q(e, i), L(e, I, "true"), B(e, P), t ? m(e, () => O(this)) : O(this)));
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
    const t = e ? q : Z, { triggers: o } = this;
    o.length && o.forEach((a) => {
      t(a, U, ke);
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
