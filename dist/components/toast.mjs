var P = Object.defineProperty;
var N = (s, t, e) => t in s ? P(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var a = (s, t, e) => N(s, typeof t != "symbol" ? t + "" : t, e);
import { createCustomEvent as v, hasClass as w, addClass as d, removeClass as c, querySelector as j, querySelectorAll as z, getDocument as F, dispatchEvent as u, mouseclickEvent as C, focusinEvent as D, focusoutEvent as G, mouseenterEvent as L, mouseleaveEvent as J, Timer as r, getInstance as K, reflow as B, emulateTransitionEnd as I, closest as M } from "@thednp/shorty";
import { addListener as O, removeListener as Q } from "@thednp/event-listener";
import { f } from "./fadeClass-CLIYI_zn.mjs";
import { s as p } from "./showClass-C8hdJfjQ.mjs";
import { d as R } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as U } from "./dataBsToggle-B84TS15h.mjs";
import { g as k } from "./getTargetElement-DbfK8LsG.mjs";
import { B as V } from "./base-component-nXu3wApu.mjs";
const i = "toast", _ = "Toast", W = `.${i}`, X = `[${R}="${i}"]`, q = `[${U}="${i}"]`, l = "showing", x = "hide", Y = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, T = (s) => K(s, _), Z = (s) => new g(s), S = v(`show.bs.${i}`), tt = v(`shown.bs.${i}`), $ = v(`hide.bs.${i}`), et = v(`hidden.bs.${i}`), y = (s) => {
  const { element: t, options: e } = s;
  c(t, l), r.clear(t, l), u(t, tt);
  // istanbul ignore else @preserve
  e.autohide && r.set(t, () => s.hide(), e.delay, i);
}, b = (s) => {
  const { element: t } = s;
  c(t, l), c(t, p), d(t, x), r.clear(t, i), u(t, et);
}, st = (s) => {
  const { element: t, options: e } = s;
  d(t, l), e.animation ? (B(t), I(t, () => b(s))) : b(s);
}, ot = (s) => {
  const { element: t, options: e } = s;
  r.set(
    t,
    () => {
      c(t, x), B(t), d(t, p), d(t, l), e.animation ? I(t, () => y(s)) : y(s);
    },
    17,
    l
  );
}, nt = (s) => {
  const { target: t } = s, e = t && M(t, q), o = e && k(e), n = o && T(o);
  // istanbul ignore else @preserve
  if (n) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && s.preventDefault(), n.relatedTarget = e, n.show();
  }
}, it = (s) => {
  const t = s.target, e = T(t), { type: o, relatedTarget: n } = s;
  // istanbul ignore else @preserve: a solid filter is required
  e && t !== n && !t.contains(n) && ([L, D].includes(o) ? r.clear(t, i) : r.set(t, () => e.hide(), e.options.delay, i));
};
class g extends V {
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(e, o) {
    super(e, o);
    // TOAST PUBLIC METHODS
    // ====================
    /** Shows the toast. */
    a(this, "show", () => {
      const { element: e, isShown: o } = this;
      // istanbul ignore else @preserve
      e && !o && (u(e, S), S.defaultPrevented || ot(this));
    });
    /** Hides the toast. */
    a(this, "hide", () => {
      const { element: e, isShown: o } = this;
      // istanbul ignore else @preserve
      e && o && (u(e, $), $.defaultPrevented || st(this));
    });
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, it will add the listener
     */
    a(this, "_toggleEventListeners", (e) => {
      const o = e ? O : Q, { element: n, triggers: m, dismiss: h, options: A, hide: H } = this;
      // istanbul ignore else @preserve
      h && o(h, C, H);
      // istanbul ignore else @preserve
      A.autohide && [D, G, L, J].forEach(
        (E) => o(n, E, it)
      );
      // istanbul ignore else @preserve
      m.length && m.forEach((E) => o(E, C, nt));
    });
    const { element: n, options: m } = this;
    m.animation && !w(n, f) ? d(n, f) : !m.animation && w(n, f) && c(n, f), this.dismiss = j(X, n), this.triggers = [...z(q, F(n))].filter(
      (h) => k(h) === n
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return _;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Y;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return w(this.element, p);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: o } = this;
    this._toggleEventListeners(), r.clear(e, i), o && c(e, p), super.dispose();
  }
}
a(g, "selector", W), a(g, "init", Z), a(g, "getInstance", T);
export {
  g as default
};
//# sourceMappingURL=toast.mjs.map
