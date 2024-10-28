import { B as J, D as $, q as N, f, s as w, T as p, h as l, u as h, d as v, r as b, e as D, g as K, c as C, t as z, j as O, a5 as E, m as Q } from "./base-component-ylZzLp-h.mjs";
import { E as R, r as U } from "./event-listener-C1-Yf9Z5.mjs";
import { c as y } from "./collapsingClass-BxKtDBMH.mjs";
import { a as c } from "./activeClass-iqaD75Su.mjs";
import { f as d } from "./fadeClass-CLIYI_zn.mjs";
import { s as T } from "./showClass-C8hdJfjQ.mjs";
import { d as S } from "./dropdownClasses-CdCdZ-PX.mjs";
import { d as V } from "./dataBsToggle-B84TS15h.mjs";
import { g as B } from "./getTargetElement-BFOUI7hP.mjs";
const u = "tab", F = "Tab", L = `[${V}="${u}"]`, G = (s) => K(s, F), W = (s) => new Y(s), H = C(
  `show.bs.${u}`
), P = C(
  `shown.bs.${u}`
), x = C(
  `hide.bs.${u}`
), k = C(
  `hidden.bs.${u}`
), m = /* @__PURE__ */ new Map(), M = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, y) && (e.style.height = "", b(e, y)), t && p.clear(t);
}, _ = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = h(i) && m.get(i) || // istanbul ignore next @preserve
  { tab: null };
  if (t && n && l(n, d)) {
    const { currentHeight: a, nextHeight: r } = m.get(e) || // istanbul ignore next @preserve
    { currentHeight: 0, nextHeight: 0 };
    a !== r ? setTimeout(() => {
      t.style.height = `${r}px`, z(t), D(t, () => M(s));
    }, 50) : M(s);
  } else i && p.clear(i);
  P.relatedTarget = o, v(e, P);
}, j = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && m.get(i) || // istanbul ignore next @preserve
  { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, d) && ([a, t].forEach((g) => {
    h(g) && f(g, "overflow-hidden");
  }), r = h(a) ? a.scrollHeight : 0), H.relatedTarget = o, k.relatedTarget = e, v(e, H), !H.defaultPrevented) {
    if (t && f(t, c), a && b(a, c), n && t && l(t, d)) {
      const g = t.scrollHeight;
      m.set(e, {
        currentHeight: r,
        nextHeight: g,
        tab: null,
        content: null
      }), f(n, y), n.style.height = `${r}px`, z(n), [a, t].forEach((I) => {
        I && b(I, "overflow-hidden");
      });
    }
    t && t && l(t, d) ? setTimeout(() => {
      f(t, T), D(t, () => {
        _(s);
      });
    }, 1) : (t && f(t, T), _(s)), o && v(o, k);
  }
}, q = (s) => {
  const { nav: e } = s;
  if (!h(e))
    return { tab: null, content: null };
  const t = O(c, e);
  let n = null;
  t.length === 1 && !S.some(
    (o) => l(t[0].parentElement, o)
  ) ? [n] = t : t.length > 1 && (n = t[t.length - 1]);
  const i = h(n) ? B(n) : null;
  return { tab: n, content: i };
}, A = (s) => {
  if (!h(s)) return null;
  const e = $(s, `.${S.join(",.")}`);
  return e ? N(`.${S[0]}-toggle`, e) : null;
}, X = (s) => {
  const e = G(s.target);
  e && (s.preventDefault(), e.show());
};
class Y extends J {
  static selector = L;
  static init = W;
  static getInstance = G;
  /** @param target the target element */
  constructor(e) {
    super(e);
    const { element: t } = this, n = B(t);
    if (n) {
      const i = $(t, ".nav"), o = $(n, ".tab-content");
      this.nav = i, this.content = n, this.tabContent = o, this.dropdown = A(t);
      const { tab: a } = q(this);
      if (i && !a) {
        const r = N(L, i), g = r && B(r);
        g && (f(r, c), f(g, T), f(g, c), w(t, E, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return F;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: t, nav: n, dropdown: i } = this;
    if (!(n && p.get(n)) && !l(e, c)) {
      const { tab: o, content: a } = q(this);
      if (n && m.set(n, { tab: o, content: a, currentHeight: 0, nextHeight: 0 }), x.relatedTarget = e, h(o) && (v(o, x), !x.defaultPrevented)) {
        f(e, c), w(e, E, "true");
        const r = h(o) && A(o);
        if (r && l(r, c) && b(r, c), n) {
          const g = () => {
            o && (b(o, c), w(o, E, "false")), i && !l(i, c) && f(i, c);
          };
          a && (l(a, d) || t && l(t, d)) ? p.set(n, g, 1) : g();
        }
        a && (b(a, T), l(a, d) ? D(a, () => j(this)) : j(this));
      }
    }
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (e) => {
    (e ? R : U)(this.element, Q, X);
  };
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  Y as default
};
//# sourceMappingURL=tab.mjs.map
