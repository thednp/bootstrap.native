var O = Object.defineProperty;
var Q = (n, e, t) => e in n ? O(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var u = (n, e, t) => Q(n, typeof e != "symbol" ? e + "" : e, t);
import { createCustomEvent as H, closest as S, querySelector as F, addClass as g, setAttribute as x, ariaSelected as $, Timer as C, hasClass as f, isHTMLElement as d, dispatchEvent as w, removeClass as b, emulateTransitionEnd as k, mouseclickEvent as R, getInstance as U, reflow as G, getElementsByClassName as V } from "@thednp/shorty";
import { addListener as W, removeListener as X } from "@thednp/event-listener";
import { c as B } from "./collapsingClass-BxKtDBMH.mjs";
import { a as l } from "./activeClass-iqaD75Su.mjs";
import { f as m } from "./fadeClass-CLIYI_zn.mjs";
import { s as E } from "./showClass-C8hdJfjQ.mjs";
import { d as I } from "./dropdownClasses-CdCdZ-PX.mjs";
import { d as Y } from "./dataBsToggle-B84TS15h.mjs";
import { g as P } from "./getTargetElement-DbfK8LsG.mjs";
import { B as Z } from "./base-component-DHbs0JQk.mjs";
const v = "tab", J = "Tab", D = `[${Y}="${v}"]`, K = (n) => U(n, J), tt = (n) => new T(n), L = H(
  `show.bs.${v}`
), M = H(
  `shown.bs.${v}`
), y = H(
  `hide.bs.${v}`
), _ = H(
  `hidden.bs.${v}`
), p = /* @__PURE__ */ new Map(), A = (n) => {
  const { tabContent: e, nav: t } = n;
  // istanbul ignore else @preserve
  e && f(e, B) && (e.style.height = "", b(e, B));
  // istanbul ignore else @preserve
  t && C.clear(t);
}, j = (n) => {
  const { element: e, tabContent: t, content: s, nav: o } = n, { tab: r } = d(o) && p.get(o) || // istanbul ignore next @preserve
  { tab: null };
  // istanbul ignore else @preserve
  if (t && s && f(s, m)) {
    const { currentHeight: i, nextHeight: a } = p.get(e) || // istanbul ignore next @preserve
    { currentHeight: 0, nextHeight: 0 };
    // istanbul ignore else @preserve: vitest won't validate this branch
    i !== a ? setTimeout(() => {
      t.style.height = `${a}px`, G(t), k(t, () => A(n));
    }, 50) : A(n);
  } else o && C.clear(o);
  M.relatedTarget = r, w(e, M);
}, q = (n) => {
  const { element: e, content: t, tabContent: s, nav: o } = n, { tab: r, content: i } = o && p.get(o) || // istanbul ignore next @preserve
  { tab: null, content: null };
  let a = 0;
  // istanbul ignore else @preserve
  s && t && f(t, m) && ([i, t].forEach((c) => {
    // istanbul ignore else @preserve
    d(c) && g(c, "overflow-hidden");
  }), a = d(i) ? i.scrollHeight : 0), L.relatedTarget = r, _.relatedTarget = e, w(e, L);
  // istanbul ignore else @preserve
  if (!L.defaultPrevented) {
    // istanbul ignore else @preserve
    t && g(t, l);
    // istanbul ignore else @preserve
    i && b(i, l);
    // istanbul ignore else @preserve
    if (s && t && f(t, m)) {
      const c = t.scrollHeight;
      p.set(e, {
        currentHeight: a,
        nextHeight: c,
        tab: null,
        content: null
      }), g(s, B), s.style.height = `${a}px`, G(s), [i, t].forEach((h) => {
        // istanbul ignore else @preserve
        h && b(h, "overflow-hidden");
      });
    }
    if (t && t && f(t, m))
      setTimeout(() => {
        g(t, E), k(t, () => {
          j(n);
        });
      }, 1);
    else {
      // istanbul ignore else @preserve
      t && g(t, E), j(n);
    }
    // istanbul ignore else @preserve
    r && w(r, _);
  }
}, N = (n) => {
  const { nav: e } = n;
  // istanbul ignore next @preserve
  if (!d(e))
    return { tab: null, content: null };
  const t = V(l, e);
  let s = null;
  // istanbul ignore else @preserve
  t.length === 1 && !I.some(
    (r) => f(t[0].parentElement, r)
  ) ? [s] = t : t.length > 1 && (s = t[t.length - 1]);
  const o = d(s) ? P(s) : null;
  return { tab: s, content: o };
}, z = (n) => {
  // istanbul ignore next @preserve
  if (!d(n)) return null;
  const e = S(n, `.${I.join(",.")}`);
  return e ? F(`.${I[0]}-toggle`, e) : null;
}, et = (n) => {
  const e = K(n.target);
  // istanbul ignore else @preserve
  e && (n.preventDefault(), e.show());
};
class T extends Z {
  /** @param target the target element */
  constructor(t) {
    super(t);
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    u(this, "_toggleEventListeners", (t) => {
      (t ? W : X)(this.element, R, et);
    });
    const { element: s } = this, o = P(s);
    // istanbul ignore else @preserve
    if (o) {
      const r = S(s, ".nav"), i = S(o, ".tab-content");
      this.nav = r, this.content = o, this.tabContent = i, this.dropdown = z(s);
      const { tab: a } = N(this);
      if (r && !a) {
        const c = F(D, r), h = c && P(c);
        // istanbul ignore else @preserve
        h && (g(c, l), g(h, E), g(h, l), x(s, $, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return J;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: t, content: s, nav: o, dropdown: r } = this;
    // istanbul ignore else @preserve
    if (!(o && C.get(o)) && !f(t, l)) {
      const { tab: i, content: a } = N(this);
      // istanbul ignore else @preserve
      o && p.set(o, { tab: i, content: a, currentHeight: 0, nextHeight: 0 }), y.relatedTarget = t;
      // istanbul ignore else @preserve
      if (d(i)) {
        w(i, y);
        // istanbul ignore else @preserve
        if (!y.defaultPrevented) {
          g(t, l), x(t, $, "true");
          const c = d(i) && z(i);
          c && f(c, l) && b(c, l);
          // istanbul ignore else @preserve
          if (o) {
            const h = () => {
              // istanbul ignore else @preserve
              i && (b(i, l), x(i, $, "false")), r && !f(r, l) && g(r, l);
            };
            a && (f(a, m) || s && f(s, m)) ? C.set(o, h, 1) : h();
          }
          // istanbul ignore else @preserve
          a && (b(a, E), f(a, m) ? k(a, () => q(this)) : q(this));
        }
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
u(T, "selector", D), u(T, "init", tt), u(T, "getInstance", K);
export {
  T as default
};
//# sourceMappingURL=tab.mjs.map
