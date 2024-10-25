var U = Object.defineProperty;
var W = (s, e, t) => e in s ? U(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var g = (s, e, t) => W(s, typeof e != "symbol" ? e + "" : e, t);
import { createCustomEvent as b, querySelectorAll as X, getDocument as m, hasClass as l, dispatchEvent as p, getInstance as I, getElementTransitionDuration as Y, addClass as O, removeClass as k, mouseclickEvent as P, emulateTransitionEnd as $, setElementStyle as C, getDocumentBody as Z, closest as _, removeAttribute as D, ariaHidden as q, setAttribute as w, ariaModal as x, focus as N, toggleFocusTrap as F, getDocumentElement as ee, keydownEvent as te, querySelector as S, keyEscape as se } from "@thednp/shorty";
import { addListener as K, removeListener as M } from "@thednp/event-listener";
import { d as oe } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as ne } from "./dataBsToggle-B84TS15h.mjs";
import { s as a } from "./showClass-C8hdJfjQ.mjs";
import { o as i, h as ae } from "./popupContainer-BitC465I.mjs";
import { o as V, g as H, m as ie, a as re, t as ce, b as d, s as le, h as j, i as fe, r as ge, d as de, f as z } from "./isVisible-w9jESiCU.mjs";
import { g as G } from "./getTargetElement-DbfK8LsG.mjs";
import { B as me } from "./base-component-nXu3wApu.mjs";
const ve = `.${i}`, A = `[${ne}="${i}"]`, he = `[${oe}="${i}"]`, T = `${i}-toggling`, ue = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, v = (s) => I(s, V), pe = (s) => new u(s), h = b(`show.bs.${i}`), J = b(`shown.bs.${i}`), E = b(`hide.bs.${i}`), Q = b(`hidden.bs.${i}`), be = (s) => {
  const { element: e } = s, { clientHeight: t, scrollHeight: o } = ee(e);
  de(e, t !== o);
}, R = (s, e) => {
  const t = e ? K : M, o = m(s.element);
  t(o, te, Oe), t(o, P, Ee);
}, L = (s) => {
  const { element: e, options: t } = s;
  // istanbul ignore else @preserve
  t.scroll || (be(s), C(Z(e), { overflow: "hidden" })), O(e, T), O(e, a), C(e, { visibility: "visible" }), $(e, () => Ce(s));
}, Te = (s) => {
  const { element: e, options: t } = s, o = H(e);
  e.blur(), !o && t.backdrop && l(d, a) && j(), $(e, () => De(s));
}, ye = (s) => {
  const e = _(s.target, A), t = e && G(e), o = t && v(t);
  // istanbul ignore else @preserve
  if (o) {
    o.relatedTarget = e, o.toggle();
    // istanbul ignore else @preserve
    e && e.tagName === "A" && s.preventDefault();
  }
}, Ee = (s) => {
  const { target: e } = s, t = S(z, m(e)), o = S(he, t), n = t && v(t);
  // istanbul ignore else @preserve
  if (n) {
    const { options: c, triggers: r } = n, { backdrop: f } = c, y = _(e, A), B = m(t).getSelection();
    // istanbul ignore else: a filter is required here @preserve
    if (!d.contains(e) || f !== "static") {
      // istanbul ignore else @preserve
      !(B && B.toString().length) && (!t.contains(e) && f && // istanbul ignore next @preserve
      (!y || r.includes(e)) || o && o.contains(e)) && (n.relatedTarget = o && o.contains(e) ? o : null, n.hide());
      // istanbul ignore next @preserve
      y && y.tagName === "A" && s.preventDefault();
    }
  }
}, Oe = ({ code: s, target: e }) => {
  const t = S(z, m(e)), o = t && v(t);
  // istanbul ignore else @preserve
  if (o) {
    // istanbul ignore else @preserve
    o.options.keyboard && s === se && (o.relatedTarget = null, o.hide());
  }
}, Ce = (s) => {
  const { element: e } = s;
  k(e, T), D(e, q), w(e, x, "true"), w(e, "role", "dialog"), p(e, J), R(s, !0), N(e), F(e);
}, De = (s) => {
  const { element: e, triggers: t } = s;
  w(e, q, "true"), D(e, x), D(e, "role"), C(e, { visibility: "" });
  const o = h.relatedTarget || t.find(fe);
  // istanbul ignore else @preserve
  o && N(o), ge(e), p(e, Q), k(e, T), F(e), H(e) || R(s);
};
class u extends me {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(t, o) {
    super(t, o);
    /**
     * Toggles on/off the `click` event listeners.
     *
     * @param self the `Offcanvas` instance
     * @param add when *true*, listeners are added
     */
    g(this, "_toggleEventListeners", (t) => {
      const o = t ? K : M;
      this.triggers.forEach((n) => o(n, P, ye));
    });
    const { element: n } = this;
    this.triggers = [...X(A, m(n))].filter(
      (c) => G(c) === n
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return V;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ue;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    l(this.element, a) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: t, options: o, relatedTarget: n } = this;
    let c = 0;
    if (!l(t, a) && (h.relatedTarget = n || void 0, J.relatedTarget = n || void 0, p(t, h), !h.defaultPrevented)) {
      const r = H(t);
      if (r && r !== t) {
        const f = v(r) || // istanbul ignore next @preserve
        I(r, ie);
        // istanbul ignore else @preserve
        f && f.hide();
      }
      if (o.backdrop)
        ae(d) ? ce() : re(t, !0), c = Y(d), le(), setTimeout(() => L(this), c);
      else {
        L(this);
        // istanbul ignore next @preserve - this test was done on Modal
        r && l(d, a) && j();
      }
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: t, relatedTarget: o } = this;
    l(t, a) && (E.relatedTarget = o || void 0, Q.relatedTarget = o || void 0, p(t, E), E.defaultPrevented || (O(t, T), k(t, a), Te(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element: t } = this, o = l(t, a), n = () => setTimeout(() => super.dispose(), 1);
    if (this.hide(), this._toggleEventListeners(), o) {
      $(t, n);
      // istanbul ignore next @preserve
    } else
      n();
  }
}
g(u, "selector", ve), g(u, "init", pe), g(u, "getInstance", v);
export {
  u as default
};
//# sourceMappingURL=offcanvas.mjs.map
