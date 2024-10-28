import { B, q as E, l as T, Q as L, u as I, g as D, c as R, a4 as C, b as k, R as b, h as f, r as q, f as y, _ as O, d as G } from "./base-component-ylZzLp-h.mjs";
import { x as M } from "./index-gZuXW-3_.mjs";
import { a as p } from "./activeClass-iqaD75Su.mjs";
const N = "scrollspy", A = "ScrollSpy", Q = '[data-bs-spy="scroll"]', $ = {
  offset: 10,
  target: null
}, j = (t) => D(t, A), z = (t) => new P(t), S = R(`activate.bs.${N}`), F = (t) => {
  const { target: e, scrollTarget: s, options: o, itemsLength: n, scrollHeight: r, element: a } = t, { offset: c } = o, i = s !== a, l = e && C("A", e), x = T(a), m = s.scrollHeight;
  if (t.scrollTop = s.scrollTop, l && (m !== r || n !== l.length)) {
    let h, g, u;
    t.items = [], t.targets = [], t.offsets = [], t.scrollHeight = m, t.maxScroll = t.scrollHeight - K(t), Array.from(l).forEach((d) => {
      h = k(d, "href"), g = h && h.charAt(0) === "#" && h.slice(-1) !== "#" && E(h, x), g && (t.items.push(d), t.targets.push(g), u = b(g), t.offsets.push(
        (i ? u.top + t.scrollTop : g.offsetTop) - c
      ));
    }), t.itemsLength = t.items.length;
  }
}, v = ({ targets: t, scrollTarget: e, element: s, _observer: o }, n) => {
  n ? e === s ? t.forEach((r) => o.observe(r)) : o.observe(s) : o.disconnect();
}, J = (t) => t.scrollHeight, K = ({ element: t, scrollTarget: e }) => e !== t ? e.clientHeight : b(t).height, w = (t) => {
  [...C("A", t)].forEach((e) => {
    f(e, p) && q(e, p);
  });
}, H = (t, e) => {
  const { target: s, element: o } = t;
  I(s) && w(s), t.activeItem = e, y(e, p);
  const n = [];
  let r = e;
  for (; r !== O(o); )
    r = r.parentElement, (f(r, "nav") || f(r, "dropdown-menu")) && n.push(r);
  n.forEach((a) => {
    const c = a.previousElementSibling;
    c && !f(c, p) && y(c, p);
  }), S.relatedTarget = e, G(o, S);
};
class P extends B {
  static selector = Q;
  static init = z;
  static getInstance = j;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: o, options: n } = this;
    this.target = E(
      n.target,
      T(o)
    ), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : L(o), this.scrollHeight = J(this.scrollTarget), this.refresh(), this._observer = new M(() => this.refresh(), {
      root: this.scrollTarget
    }), v(this, !0));
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
    return $;
  }
  /* eslint-enable */
  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh = () => {
    const { target: e } = this;
    if (I(e) && e.offsetHeight > 0) {
      F(this);
      const { scrollTop: s, maxScroll: o, itemsLength: n, items: r, activeItem: a } = this;
      if (s >= o) {
        const i = r[n - 1];
        a !== i && H(this, i);
        return;
      }
      const { offsets: c } = this;
      if (a && s < c[0] && c[0] > 0) {
        this.activeItem = null, e && w(e);
        return;
      }
      r.forEach((i, l) => {
        a !== i && s >= c[l] && (typeof c[l + 1] > "u" || s < c[l + 1]) && H(this, i);
      });
    }
  };
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    const e = { ...this };
    v(e), super.dispose();
  }
}
export {
  P as default
};
//# sourceMappingURL=scrollspy.mjs.map
