var A = Object.defineProperty;
var B = (n, e, t) => e in n ? A(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var p = (n, e, t) => B(n, typeof e != "symbol" ? e + "" : e, t);
import { createCustomEvent as $, getDocument as D, querySelectorAll as x, isHTMLElement as _, isString as q, querySelector as P, Timer as i, addClass as g, removeClass as h, hasClass as M, mouseclickEvent as N, getInstance as j, dispatchEvent as u, noop as E, setElementStyle as f, emulateTransitionEnd as T, setAttribute as I, ariaExpanded as H, reflow as z, closest as F } from "@thednp/shorty";
import { addListener as G, removeListener as J } from "@thednp/event-listener";
import { d as K } from "./dataBsToggle-B84TS15h.mjs";
import { c as C } from "./collapsingClass-BxKtDBMH.mjs";
import { s as v } from "./showClass-C8hdJfjQ.mjs";
import { g as w } from "./getTargetElement-DbfK8LsG.mjs";
import { B as O } from "./base-component-DHbs0JQk.mjs";
const l = "collapse", k = "Collapse", Q = `.${l}`, y = `[${K}="${l}"]`, R = { parent: null }, m = (n) => j(n, k), U = (n) => new d(n), S = $(`show.bs.${l}`), V = $(`shown.bs.${l}`), b = $(`hide.bs.${l}`), W = $(`hidden.bs.${l}`), X = (n) => {
  const { element: e, parent: t, triggers: o } = n;
  u(e, S), S.defaultPrevented || (i.set(e, E, 17), t && i.set(t, E, 17), g(e, C), h(e, l), f(e, { height: `${e.scrollHeight}px` }), T(e, () => {
    i.clear(e), t && i.clear(t), o.forEach((s) => I(s, H, "true")), h(e, C), g(e, l), g(e, v), f(e, { height: "" }), u(e, V);
  }));
}, L = (n) => {
  const { element: e, parent: t, triggers: o } = n;
  u(e, b), b.defaultPrevented || (i.set(e, E, 17), t && i.set(t, E, 17), f(e, { height: `${e.scrollHeight}px` }), h(e, l), h(e, v), g(e, C), z(e), f(e, { height: "0px" }), T(e, () => {
    i.clear(e);
    // istanbul ignore else @preserve
    t && i.clear(t), o.forEach((s) => I(s, H, "false")), h(e, C), g(e, l), f(e, { height: "" }), u(e, W);
  }));
}, Y = (n) => {
  const { target: e } = n, t = e && F(e, y), o = t && w(t), s = o && m(o);
  // istanbul ignore else @preserve
  s && s.toggle(), t && t.tagName === "A" && n.preventDefault();
};
class d extends O {
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(t, o) {
    super(t, o);
    /**
     * Toggles on/off the event listener(s) of the `Collapse` instance.
     *
     * @param add when `true`, the event listener is added
     */
    p(this, "_toggleEventListeners", (t) => {
      const o = t ? G : J, { triggers: s } = this;
      // istanbul ignore else @preserve
      s.length && s.forEach(
        (r) => o(r, N, Y)
      );
    });
    const { element: s, options: r } = this, a = D(s);
    this.triggers = [...x(y, a)].filter(
      (c) => w(c) === s
    ), this.parent = _(r.parent) ? r.parent : q(r.parent) ? w(s) || P(r.parent, a) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return k;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return R;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers: t, element: o } = this;
    // istanbul ignore else @preserve
    if (!i.get(o)) {
      L(this);
      // istanbul ignore else @preserve
      t.length && t.forEach((s) => g(s, `${l}d`));
    }
  }
  /** Shows the collapse. */
  show() {
    const { element: t, parent: o, triggers: s } = this;
    let r, a;
    if (o && (r = [
      ...x(`.${l}.${v}`, o)
    ].find((c) => m(c)), a = r && m(r)), (!o || !i.get(o)) && !i.get(t)) {
      a && r !== t && (L(a), a.triggers.forEach((c) => {
        g(c, `${l}d`);
      })), X(this);
      // istanbul ignore else @preserve
      s.length && s.forEach((c) => h(c, `${l}d`));
    }
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    M(this.element, v) ? this.hide() : this.show();
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
p(d, "selector", Q), p(d, "init", U), p(d, "getInstance", m);
export {
  d as default
};
//# sourceMappingURL=collapse.mjs.map
