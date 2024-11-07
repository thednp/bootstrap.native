import { B as R, R as q, d as I, S as B, f as b, t as k, v as O, a4 as w, j as Y, K as A, Y as p, Z, b as v, _ as j, q as D } from "./base-component-Jx2aafTJ.mjs";
import { E as F } from "./index-DinhT6Jq.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
const G = "scrollspy", C = "ScrollSpy", K = '[data-bs-spy="scroll"]', N = {
  offset: 10,
  target: void 0
}, V = (t) => k(t, C), _ = (t) => new M(t), H = O(`activate.bs.${G}`), $ = (t) => {
  const {
    target: e,
    scrollTarget: s,
    options: o,
    itemsLength: c,
    scrollHeight: r,
    element: i,
    _observer: n
  } = t, { offset: l } = o, h = s !== i, f = e && w("A", e), L = I(i), u = s.scrollHeight;
  if (t.scrollTop = s.scrollTop, f && (u !== r || c !== f.length)) {
    let d, m, a, y;
    t.items = [], t.targets = [], t.offsets = [], t.scrollHeight = u, t.maxScroll = t.scrollHeight - J(t), Array.from(f).forEach((S) => {
      d = Y(S, "href"), m = d?.slice(1), a = m?.length ? L.getElementById(m) : null, a && (t.items.push(S), t.targets.push(a), y = n?.getEntry(a)?.boundingClientRect || A(a), t.offsets.push(
        (h ? y.top + t.scrollTop : a.offsetTop) - l
      ));
    }), t.itemsLength = t.items.length;
  }
}, T = ({ targets: t, scrollTarget: e, element: s, _observer: o }, c) => {
  c ? e === s ? t?.forEach((r) => o.observe(r)) : o.observe(s) : o.disconnect();
}, z = (t) => t.scrollHeight, J = ({ element: t, scrollTarget: e }) => e !== t ? e.clientHeight : A(t).height, x = (t) => {
  Array.from(w("A", t)).forEach(
    (e) => {
      p(e, g) && Z(e, g);
    }
  );
}, E = (t, e) => {
  const { target: s, element: o } = t;
  b(s) && x(s), t.activeItem = e, v(e, g);
  const c = [];
  let r = e;
  for (; r !== j(o); )
    r = r.parentElement, (p(r, "nav") || p(r, "dropdown-menu")) && c.push(r);
  c.forEach((i) => {
    const n = i.previousElementSibling;
    n && !p(n, g) && v(n, g);
  }), H.relatedTarget = e, D(o, H);
};
class M extends R {
  static selector = K;
  static init = _;
  static getInstance = V;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: o, options: c } = this, r = q(
      c.target,
      I(o)
    );
    r && (this.target = r, this.scrollTarget = o.clientHeight < o.scrollHeight ? o : B(o), this.scrollHeight = z(this.scrollTarget), this.refresh(), this._observer = new F((i) => {
      requestAnimationFrame(() => {
        i.some((n) => n.isVisible) && this.refresh();
      });
    }, {
      root: this.scrollTarget
    }), T(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return C;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return N;
  }
  refresh = () => {
    const { target: e } = this;
    if (!b(e) || e.offsetHeight === 0) return;
    $(this);
    const { scrollTop: s, maxScroll: o, itemsLength: c, items: r, activeItem: i } = this;
    if (s >= o) {
      const l = r[c - 1];
      i !== l && E(this, l);
      return;
    }
    const { offsets: n } = this;
    if (i && s < n[0] && n[0] > 0) {
      this.activeItem = null, e && x(e);
      return;
    }
    r.forEach((l, h) => {
      i !== l && s >= n[h] && (typeof n[h + 1] > "u" || s < n[h + 1]) && E(this, l);
    });
  };
  dispose() {
    const e = { ...this };
    T(e), super.dispose();
  }
}
export {
  M as default
};
//# sourceMappingURL=scrollspy.mjs.map
