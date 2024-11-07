import { B as A, p as $, R, b as g, Q as C, y as p, Y as l, f as d, q as v, Z as b, r as B, t as F, v as w, e as Y, G as z, a5 as E, m as J } from "./base-component-Jx2aafTJ.mjs";
import { E as K, r as N } from "./event-listener-CUwvA4j6.mjs";
import { c as y } from "./collapsingClass-BxKtDBMH.mjs";
import { a as c } from "./activeClass-iqaD75Su.mjs";
import { f as h } from "./fadeClass-CLIYI_zn.mjs";
import { s as T } from "./showClass-C8hdJfjQ.mjs";
import { d as P } from "./dropdownClasses-CdCdZ-PX.mjs";
import { d as O } from "./dataBsToggle-B84TS15h.mjs";
import { g as k } from "./getTargetElement-Bv0W3Fir.mjs";
const m = "tab", Z = "Tab", I = `[${O}="${m}"]`, j = (s) => F(s, Z), U = (s) => new W(s), H = w(
  `show.bs.${m}`
), L = w(
  `shown.bs.${m}`
), x = w(
  `hide.bs.${m}`
), S = w(
  `hidden.bs.${m}`
), u = /* @__PURE__ */ new Map(), _ = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, y) && (e.style.height = "", b(e, y)), t && p.clear(t);
}, q = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = d(i) && u.get(i) || { tab: null };
  if (t && n && l(n, h)) {
    const { currentHeight: a, nextHeight: r } = u.get(e) || { currentHeight: 0, nextHeight: 0 };
    a !== r ? setTimeout(() => {
      t.style.height = `${r}px`, Y(t), B(t, () => _(s));
    }, 50) : _(s);
  } else i && p.clear(i);
  L.relatedTarget = o, v(e, L);
}, G = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && u.get(i) || { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, h) && ([a, t].forEach((f) => {
    f && g(f, "overflow-hidden");
  }), r = a ? a.scrollHeight : 0), H.relatedTarget = o, S.relatedTarget = e, v(e, H), !H.defaultPrevented) {
    if (t && g(t, c), a && b(a, c), n && t && l(t, h)) {
      const f = t.scrollHeight;
      u.set(e, {
        currentHeight: r,
        nextHeight: f,
        tab: null,
        content: null
      }), g(n, y), n.style.height = `${r}px`, Y(n), [a, t].forEach((D) => {
        D && b(D, "overflow-hidden");
      });
    }
    t && t && l(t, h) ? setTimeout(() => {
      g(t, T), B(t, () => {
        q(s);
      });
    }, 1) : (t && g(t, T), q(s)), o && v(o, S);
  }
}, M = (s) => {
  const { nav: e } = s;
  if (!d(e))
    return { tab: null, content: null };
  const t = z(
    c,
    e
  );
  let n = null;
  t.length === 1 && !P.some(
    (o) => l(t[0].parentElement, o)
  ) ? [n] = t : t.length > 1 && (n = t[t.length - 1]);
  const i = d(n) ? k(n) : null;
  return { tab: n, content: i };
}, Q = (s) => {
  if (!d(s)) return null;
  const e = $(s, `.${P.join(",.")}`);
  return e ? R(`.${P[0]}-toggle`, e) : null;
}, V = (s) => {
  const e = j(s.target);
  s.preventDefault(), e && e.show();
};
class W extends A {
  static selector = I;
  static init = U;
  static getInstance = j;
  constructor(e) {
    super(e);
    const { element: t } = this, n = k(t);
    if (!n) return;
    const i = $(t, ".nav"), o = $(
      n,
      ".tab-content"
    );
    this.nav = i, this.content = n, this.tabContent = o, this.dropdown = Q(t);
    const { tab: a } = M(this);
    if (i && !a) {
      const r = R(I, i), f = r && k(r);
      f && (g(r, c), g(f, T), g(f, c), C(t, E, "true"));
    }
    this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Z;
  }
  show() {
    const { element: e, content: t, nav: n, dropdown: i } = this;
    if (n && p.get(n) || l(e, c)) return;
    const { tab: o, content: a } = M(this);
    if (n && o && u.set(n, { tab: o, content: a, currentHeight: 0, nextHeight: 0 }), x.relatedTarget = e, !d(o) || (v(o, x), x.defaultPrevented)) return;
    g(e, c), C(e, E, "true");
    const r = d(o) && Q(o);
    if (r && l(r, c) && b(r, c), n) {
      const f = () => {
        o && (b(o, c), C(o, E, "false")), i && !l(i, c) && g(i, c);
      };
      a && (l(a, h) || t && l(t, h)) ? p.set(n, f, 1) : f();
    }
    a && (b(a, T), l(a, h) ? B(a, () => G(this)) : G(this));
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (e) => {
    (e ? K : N)(this.element, J, V);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  W as default
};
//# sourceMappingURL=tab.mjs.map
