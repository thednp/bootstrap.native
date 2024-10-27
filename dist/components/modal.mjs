var oe = Object.defineProperty;
var ae = (s, t, e) => t in s ? oe(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var h = (s, t, e) => ae(s, typeof t != "symbol" ? t + "" : t, e);
import { createCustomEvent as S, querySelector as A, querySelectorAll as ne, getDocument as D, hasClass as g, dispatchEvent as T, getInstance as B, getElementTransitionDuration as I, removeClass as x, setAttribute as R, ariaHidden as P, removeAttribute as q, ariaModal as z, emulateTransitionEnd as p, mouseclickEvent as K, getDocumentElement as ie, isRTL as re, setElementStyle as y, getDocumentBody as le, addClass as N, closest as V, focus as W, toggleFocusTrap as j, keydownEvent as ce, keyEscape as de, Timer as E } from "@thednp/shorty";
import { addListener as G, removeListener as J } from "@thednp/event-listener";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { d as ge } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as he } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { m as r, h as fe } from "./popupContainer-BitC465I.mjs";
import { m as Q, g as k, o as pe, a as ue, t as ve, b as f, s as be, h as U, c as Te, d as ye, r as Ee, i as Se, e as De } from "./isVisible-DWDmVrra.mjs";
import { g as X } from "./getTargetElement-DbfK8LsG.mjs";
import { B as we } from "./base-component-DHbs0JQk.mjs";
const ke = `.${r}`, Y = `[${me}="${r}"]`, Ce = `[${ge}="${r}"]`, Z = `${r}-static`, He = {
  backdrop: !0,
  keyboard: !0
}, u = (s) => B(s, Q), $e = (s) => new b(s), v = S(
  `show.bs.${r}`
), $ = S(
  `shown.bs.${r}`
), w = S(
  `hide.bs.${r}`
), M = S(
  `hidden.bs.${r}`
), ee = (s) => {
  const { element: t } = s, e = Te(t), { clientHeight: o, scrollHeight: a } = ie(t), { clientHeight: n, scrollHeight: l } = t, c = n !== l;
  // istanbul ignore next @preserve: impossible to test?
  if (!c && e) {
    const m = { [re(t) ? "paddingLeft" : "paddingRight"]: `${e}px` };
    y(t, m);
  }
  ye(t, c || o !== a);
}, te = (s, t) => {
  const e = t ? G : J, { element: o } = s;
  e(o, K, Fe), e(D(o), ce, Oe), t ? s._observer.observe(o) : s._observer.disconnect();
}, O = (s) => {
  const { triggers: t, element: e, relatedTarget: o } = s;
  Ee(e), y(e, { paddingRight: "", display: "" }), te(s);
  const a = v.relatedTarget || t.find(Se);
  // istanbul ignore else @preserve
  a && W(a), M.relatedTarget = o, T(e, M), j(e);
}, F = (s) => {
  const { element: t, relatedTarget: e } = s;
  W(t), te(s, !0), $.relatedTarget = e, T(t, $), j(t);
}, L = (s) => {
  const { element: t, hasFade: e } = s;
  y(t, { display: "block" }), ee(s);
  // istanbul ignore else @preserve
  k(t) || y(le(t), { overflow: "hidden" }), N(t, i), q(t, P), R(t, z, "true"), e ? p(t, () => F(s)) : F(s);
}, _ = (s) => {
  const { element: t, options: e, hasFade: o } = s;
  e.backdrop && o && g(f, i) && !k(t) ? (U(), p(f, () => O(s))) : O(s);
}, Me = (s) => {
  const { target: t } = s, e = t && V(t, Y), o = e && X(e), a = o && u(o);
  // istanbul ignore else @preserve
  if (a) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && s.preventDefault(), a.relatedTarget = e, a.toggle();
  }
}, Oe = ({ code: s, target: t }) => {
  const e = A(De, D(t)), o = e && u(e);
  // istanbul ignore else @preserve
  if (o) {
    const { options: a } = o;
    // istanbul ignore else @preserve
    a.keyboard && s === de && // the keyboard option is enabled and the key is 27
    g(e, i) && (o.relatedTarget = null, o.hide());
  }
}, Fe = (s) => {
  var o, a;
  const { currentTarget: t } = s, e = t && u(t);
  // istanbul ignore else @preserve
  if (e && t && !E.get(t)) {
    const { options: n, isStatic: l, modalDialog: c } = e, { backdrop: d } = n, { target: m } = s, se = (a = (o = D(t)) == null ? void 0 : o.getSelection()) == null ? void 0 : a.toString().length, C = c.contains(m), H = m && V(m, Ce);
    // istanbul ignore else @preserve
    l && !C ? E.set(
      t,
      () => {
        N(t, Z), p(c, () => Le(e));
      },
      17
    ) : (H || !se && !l && !C && d) && (e.relatedTarget = H || null, e.hide(), s.preventDefault());
  }
}, Le = (s) => {
  const { element: t, modalDialog: e } = s, o = (I(e) || 0) + 17;
  x(t, Z), E.set(t, () => E.clear(t), o);
};
class b extends we {
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, o) {
    super(e, o);
    /**
     * Updates the modal layout.
     */
    h(this, "update", () => {
      // istanbul ignore else @preserve
      g(this.element, i) && ee(this);
    });
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    h(this, "_toggleEventListeners", (e) => {
      const o = e ? G : J, { triggers: a } = this;
      // istanbul ignore else @preserve
      a.length && a.forEach(
        (n) => o(n, K, Me)
      );
    });
    const { element: a } = this, n = A(`.${r}-dialog`, a);
    // istanbul ignore else @preserve
    n && (this.modalDialog = n, this.triggers = [
      ...ne(Y, D(a))
    ].filter(
      (l) => X(l) === a
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = g(a, he), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Q;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return He;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    g(this.element, i) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: o, hasFade: a, relatedTarget: n } = this, { backdrop: l } = o;
    let c = 0;
    // istanbul ignore else @preserve
    if (!g(e, i) && (v.relatedTarget = n || void 0, T(e, v), !v.defaultPrevented)) {
      const d = k(e);
      // istanbul ignore else @preserve
      if (d && d !== e) {
        const m = u(d) || // istanbul ignore next @preserve
        B(
          d,
          pe
        );
        // istanbul ignore else @preserve
        m && m.hide();
      }
      if (l)
        fe(f) ? ve(!0) : ue(e, a, !0), c = I(f), be(), setTimeout(() => L(this), c);
      else {
        L(this);
        // istanbul ignore else @preserve
        d && g(f, i) && U();
      }
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: o, relatedTarget: a } = this;
    // istanbul ignore else @preserve
    if (g(e, i)) {
      w.relatedTarget = a || void 0, T(e, w);
      // istanbul ignore else @preserve
      w.defaultPrevented || (x(e, i), R(e, P, "true"), q(e, z), o ? p(e, () => _(this)) : _(this));
    }
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { modalDialog: o, hasFade: a } = e, n = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), a ? p(o, n) : n();
  }
}
h(b, "selector", ke), h(b, "init", $e), h(b, "getInstance", u);
export {
  b as default
};
//# sourceMappingURL=modal.mjs.map
