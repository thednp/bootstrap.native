var D = Object.defineProperty;
var W = (t, e, s) => e in t ? D(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var h = (t, e, s) => W(t, typeof e != "symbol" ? e + "" : e, s);
import { createCustomEvent as _, querySelector as L, getDocument as S, getWindow as k, isHTMLElement as v, scrollEvent as q, passiveHandler as G, getInstance as M, isWindow as C, getElementsByTagName as w, getAttribute as N, getBoundingClientRect as b, getDocumentElement as O, hasClass as u, removeClass as R, addClass as y, getDocumentBody as Y, dispatchEvent as $ } from "@thednp/shorty";
import { addListener as j, removeListener as z } from "@thednp/event-listener";
import { a as m } from "./activeClass-iqaD75Su.mjs";
import { B as F } from "./base-component-DHbs0JQk.mjs";
const J = "scrollspy", A = "ScrollSpy", K = '[data-bs-spy="scroll"]', P = {
  offset: 10,
  target: null
}, Q = (t) => M(t, A), U = (t) => new d(t), I = _(`activate.bs.${J}`), V = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: r, scrollHeight: o, element: a } = t, { offset: i } = n, l = C(s), c = e && w("A", e), g = s ? B(s) : o;
  t.scrollTop = l ? s.scrollY : s.scrollTop;
  // istanbul ignore else @preserve
  if (c && (g !== o || r !== c.length)) {
    let p, f, E;
    t.items = [], t.offsets = [], t.scrollHeight = g, t.maxScroll = t.scrollHeight - X(t), [...c].forEach((H) => {
      p = N(H, "href"), f = p && p.charAt(0) === "#" && p.slice(-1) !== "#" && L(p, S(a)), f && (t.items.push(H), E = b(f), t.offsets.push(
        (l ? E.top + t.scrollTop : f.offsetTop) - i
      ));
    }), t.itemsLength = t.items.length;
  }
}, B = (t) => v(t) ? t.scrollHeight : O(t).scrollHeight, X = ({ element: t, scrollTarget: e }) => C(e) ? e.innerHeight : b(t).height, x = (t) => {
  [...w("A", t)].forEach((e) => {
    u(e, m) && R(e, m);
  });
}, T = (t, e) => {
  const { target: s, element: n } = t;
  // istanbul ignore else @preserve
  v(s) && x(s), t.activeItem = e, y(e, m);
  const r = [];
  let o = e;
  for (; o !== Y(n); )
    o = o.parentElement, (u(o, "nav") || u(o, "dropdown-menu")) && r.push(o);
  r.forEach((a) => {
    const i = a.previousElementSibling;
    // istanbul ignore else @preserve
    i && !u(i, m) && y(i, m);
  }), I.relatedTarget = e, $(n, I);
};
class d extends F {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, n) {
    super(s, n);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    h(this, "refresh", () => {
      const { target: s } = this;
      // istanbul ignore else @preserve
      if (v(s) && s.offsetHeight > 0) {
        V(this);
        const { scrollTop: n, maxScroll: r, itemsLength: o, items: a, activeItem: i } = this;
        if (n >= r) {
          const c = a[o - 1];
          // istanbul ignore else @preserve
          i !== c && T(this, c);
          return;
        }
        const { offsets: l } = this;
        // istanbul ignore else @preserve
        if (i && n < l[0] && l[0] > 0) {
          this.activeItem = null;
          // istanbul ignore else @preserve
          s && x(s);
          return;
        }
        a.forEach((c, g) => {
          i !== c && n >= l[g] && (typeof l[g + 1] > "u" || n < l[g + 1]) && T(this, c);
        });
      }
    });
    /**
     * Toggles on/off the component event listener.
     *
     * @param add when `true`, listener is added
     */
    h(this, "_toggleEventListeners", (s) => {
      (s ? j : z)(
        this.scrollTarget,
        q,
        this.refresh,
        G
      );
    });
    const { element: r, options: o } = this;
    this.target = L(
      o.target,
      S(r)
    ), this.target && (this.scrollTarget = r.clientHeight < r.scrollHeight ? r : k(r), this.scrollHeight = B(this.scrollTarget), this._toggleEventListeners(!0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return A;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return P;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
h(d, "selector", K), h(d, "init", U), h(d, "getInstance", Q);
export {
  d as default
};
//# sourceMappingURL=scrollspy.mjs.map
