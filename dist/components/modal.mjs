var oe = Object.defineProperty;
var ae = (s, t, e) => t in s ? oe(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var h = (s, t, e) => ae(s, typeof t != "symbol" ? t + "" : t, e);
import { createCustomEvent as S, querySelector as B, querySelectorAll as ne, getDocument as D, hasClass as m, dispatchEvent as b, getInstance as I, getElementTransitionDuration as x, removeClass as P, setAttribute as R, ariaHidden as _, removeAttribute as q, ariaModal as W, emulateTransitionEnd as p, mouseclickEvent as z, getDocumentElement as ie, isRTL as le, setElementStyle as y, getDocumentBody as re, addClass as K, closest as N, focus as V, toggleFocusTrap as j, getWindow as ce, resizeEvent as de, passiveHandler as ge, keydownEvent as me, keyEscape as he, Timer as E } from "@thednp/shorty";
import { addListener as G, removeListener as J } from "@thednp/event-listener";
import { d as fe } from "./dataBsToggle-B84TS15h.mjs";
import { d as pe } from "./dataBsDismiss-DdNPQYa-.mjs";
import { f as ue } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { m as l, h as ve } from "./popupContainer-BitC465I.mjs";
import { m as Q, g as k, o as Te, a as be, t as ye, b as f, s as Ee, h as U, c as Se, d as De, r as we, i as ke, e as Ce } from "./isVisible-w9jESiCU.mjs";
import { g as X } from "./getTargetElement-DbfK8LsG.mjs";
import { B as He } from "./base-component-nXu3wApu.mjs";
const $e = `.${l}`, Y = `[${fe}="${l}"]`, Me = `[${pe}="${l}"]`, Z = `${l}-static`, Oe = {
  backdrop: !0,
  keyboard: !0
}, u = (s) => I(s, Q), Fe = (s) => new T(s), v = S(`show.bs.${l}`), $ = S(`shown.bs.${l}`), w = S(`hide.bs.${l}`), M = S(`hidden.bs.${l}`), ee = (s) => {
  const { element: t } = s, e = Se(t), { clientHeight: o, scrollHeight: a } = ie(t), { clientHeight: n, scrollHeight: r } = t, c = n !== r;
  // istanbul ignore next @preserve: impossible to test?
  if (!c && e) {
    const g = { [le(t) ? (
      // istanbul ignore next @preserve
      "paddingLeft"
    ) : "paddingRight"]: `${e}px` };
    y(t, g);
  }
  De(t, c || o !== a);
}, te = (s, t) => {
  const e = t ? G : J, { element: o, update: a } = s;
  e(o, z, Be), e(ce(o), de, a, ge), e(D(o), me, Ae);
}, O = (s) => {
  const { triggers: t, element: e, relatedTarget: o } = s;
  we(e), y(e, { paddingRight: "", display: "" }), te(s);
  const a = v.relatedTarget || t.find(ke);
  // istanbul ignore else @preserve
  a && V(a), M.relatedTarget = o, b(e, M), j(e);
}, F = (s) => {
  const { element: t, relatedTarget: e } = s;
  V(t), te(s, !0), $.relatedTarget = e, b(t, $), j(t);
}, L = (s) => {
  const { element: t, hasFade: e } = s;
  y(t, { display: "block" }), ee(s);
  // istanbul ignore else @preserve
  k(t) || y(re(t), { overflow: "hidden" }), K(t, i), q(t, _), R(t, W, "true"), e ? p(t, () => F(s)) : F(s);
}, A = (s) => {
  const { element: t, options: e, hasFade: o } = s;
  e.backdrop && o && m(f, i) && !k(t) ? (U(), p(f, () => O(s))) : O(s);
}, Le = (s) => {
  const { target: t } = s, e = t && N(t, Y), o = e && X(e), a = o && u(o);
  // istanbul ignore else @preserve
  if (a) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && s.preventDefault(), a.relatedTarget = e, a.toggle();
  }
}, Ae = ({ code: s, target: t }) => {
  const e = B(Ce, D(t)), o = e && u(e);
  // istanbul ignore else @preserve
  if (o) {
    const { options: a } = o;
    // istanbul ignore else @preserve
    a.keyboard && s === he && // the keyboard option is enabled and the key is 27
    m(e, i) && (o.relatedTarget = null, o.hide());
  }
}, Be = (s) => {
  var o, a;
  const { currentTarget: t } = s, e = t && u(t);
  // istanbul ignore else @preserve
  if (e && t && !E.get(t)) {
    const { options: n, isStatic: r, modalDialog: c } = e, { backdrop: d } = n, { target: g } = s, se = (a = (o = D(t)) == null ? void 0 : o.getSelection()) == null ? void 0 : a.toString().length, C = c.contains(g), H = g && N(g, Me);
    // istanbul ignore else @preserve
    r && !C ? E.set(
      t,
      () => {
        K(t, Z), p(c, () => Ie(e));
      },
      17
    ) : (H || !se && !r && !C && d) && (e.relatedTarget = H || null, e.hide(), s.preventDefault());
  }
}, Ie = (s) => {
  const { element: t, modalDialog: e } = s, o = (x(e) || 0) + 17;
  P(t, Z), E.set(t, () => E.clear(t), o);
};
class T extends He {
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
      m(this.element, i) && ee(this);
    });
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    h(this, "_toggleEventListeners", (e) => {
      const o = e ? G : J, { triggers: a } = this;
      // istanbul ignore else @preserve
      a.length && a.forEach((n) => o(n, z, Le));
    });
    const { element: a } = this, n = B(`.${l}-dialog`, a);
    // istanbul ignore else @preserve
    n && (this.modalDialog = n, this.triggers = [...ne(Y, D(a))].filter(
      (r) => X(r) === a
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = m(a, ue), this.relatedTarget = null, this._toggleEventListeners(!0));
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
    return Oe;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    m(this.element, i) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: o, hasFade: a, relatedTarget: n } = this, { backdrop: r } = o;
    let c = 0;
    // istanbul ignore else @preserve
    if (!m(e, i) && (v.relatedTarget = n || void 0, b(e, v), !v.defaultPrevented)) {
      const d = k(e);
      // istanbul ignore else @preserve
      if (d && d !== e) {
        const g = u(d) || // istanbul ignore next @preserve
        I(d, Te);
        // istanbul ignore else @preserve
        g && g.hide();
      }
      if (r)
        ve(f) ? ye(!0) : be(e, a, !0), c = x(f), Ee(), setTimeout(() => L(this), c);
      else {
        L(this);
        // istanbul ignore else @preserve
        d && m(f, i) && U();
      }
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: o, relatedTarget: a } = this;
    // istanbul ignore else @preserve
    if (m(e, i)) {
      w.relatedTarget = a || void 0, b(e, w);
      // istanbul ignore else @preserve
      w.defaultPrevented || (P(e, i), R(e, _, "true"), q(e, W), o ? p(e, () => A(this)) : A(this));
    }
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { modalDialog: o, hasFade: a } = e, n = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), a ? p(o, n) : n();
  }
}
h(T, "selector", $e), h(T, "init", Fe), h(T, "getInstance", u);
export {
  T as default
};
//# sourceMappingURL=modal.mjs.map
