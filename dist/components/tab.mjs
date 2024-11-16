import { B as A, t as F, k as p, x as d, R, G as z, Z as l, b as g, Q as E, a8 as x, h as v, m as C, q as T, Y as b, s as D, f as Y, E as J, r as K, v as N } from "./base-component-CQAH5ZXF.mjs";
import { c as k } from "./collapsingClass-BxKtDBMH.mjs";
import { a as c } from "./activeClass-iqaD75Su.mjs";
import { f as h } from "./fadeClass-CLIYI_zn.mjs";
import { s as w } from "./showClass-C8hdJfjQ.mjs";
import { d as P } from "./dropdownClasses-CdCdZ-PX.mjs";
import { d as O } from "./dataBsToggle-B84TS15h.mjs";
import { g as y } from "./getTargetElement-v_1VfmtN.mjs";
const m = "tab", Z = "Tab", B = `[${O}="${m}"]`, j = (s) => F(s, Z), U = (s) => new W(s), H = C(
  `show.bs.${m}`
), L = C(
  `shown.bs.${m}`
), $ = C(
  `hide.bs.${m}`
), S = C(
  `hidden.bs.${m}`
), u = /* @__PURE__ */ new Map(), _ = (s) => {
  const { tabContent: e, nav: t } = s;
  e && l(e, k) && (e.style.height = "", b(e, k)), t && v.clear(t);
}, q = (s) => {
  const { element: e, tabContent: t, content: n, nav: i } = s, { tab: o } = d(i) && u.get(i) || { tab: null };
  if (t && n && l(n, h)) {
    const { currentHeight: a, nextHeight: r } = u.get(e) || { currentHeight: 0, nextHeight: 0 };
    a !== r ? setTimeout(() => {
      t.style.height = `${r}px`, Y(t), D(t, () => _(s));
    }, 50) : _(s);
  } else i && v.clear(i);
  L.relatedTarget = o, T(e, L);
}, G = (s) => {
  const { element: e, content: t, tabContent: n, nav: i } = s, { tab: o, content: a } = i && u.get(i) || { tab: null, content: null };
  let r = 0;
  if (n && t && l(t, h) && ([a, t].forEach((f) => {
    f && g(f, "overflow-hidden");
  }), r = a ? a.scrollHeight : 0), H.relatedTarget = o, S.relatedTarget = e, T(e, H), !H.defaultPrevented) {
    if (t && g(t, c), a && b(a, c), n && t && l(t, h)) {
      const f = t.scrollHeight;
      u.set(e, {
        currentHeight: r,
        nextHeight: f,
        tab: null,
        content: null
      }), g(n, k), n.style.height = `${r}px`, Y(n), [a, t].forEach((I) => {
        I && b(I, "overflow-hidden");
      });
    }
    t && t && l(t, h) ? setTimeout(() => {
      g(t, w), D(t, () => {
        q(s);
      });
    }, 1) : (t && g(t, w), q(s)), o && T(o, S);
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
  const i = d(n) ? y(n) : null;
  return { tab: n, content: i };
}, Q = (s) => {
  if (!d(s)) return null;
  const e = p(s, `.${P.join(",.")}`);
  return e ? R(`.${P[0]}-toggle`, e) : null;
}, V = (s) => {
  const e = p(s.target, B), t = e && j(e);
  t && (s.preventDefault(), t.show());
};
class W extends A {
  static selector = B;
  static init = U;
  static getInstance = j;
  constructor(e) {
    super(e);
    const { element: t } = this, n = y(t);
    if (!n) return;
    const i = p(t, ".nav"), o = p(
      n,
      ".tab-content"
    );
    this.nav = i, this.content = n, this.tabContent = o, this.dropdown = Q(t);
    const { tab: a } = M(this);
    if (i && !a) {
      const r = R(B, i), f = r && y(r);
      f && (g(r, c), g(f, w), g(f, c), E(t, x, "true"));
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
    if (n && v.get(n) || l(e, c)) return;
    const { tab: o, content: a } = M(this);
    if (n && o && u.set(n, { tab: o, content: a, currentHeight: 0, nextHeight: 0 }), $.relatedTarget = e, !d(o) || (T(o, $), $.defaultPrevented)) return;
    g(e, c), E(e, x, "true");
    const r = d(o) && Q(o);
    if (r && l(r, c) && b(r, c), n) {
      const f = () => {
        o && (b(o, c), E(o, x, "false")), i && !l(i, c) && g(i, c);
      };
      a && (l(a, h) || t && l(t, h)) ? v.set(n, f, 1) : f();
    }
    a && (b(a, w), l(a, h) ? D(a, () => G(this)) : G(this));
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (e) => {
    (e ? J : K)(this.element, N, V);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  W as default
};
//# sourceMappingURL=tab.mjs.map
