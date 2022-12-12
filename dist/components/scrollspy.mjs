import { W as C, B as A, g as E, a as T, $ as W, f as m, L as $, ag as x, ah as L, Z as B, y as b, x as M, k as f, N, M as y, O, Q as R, C as Z, R as D } from "./base-component-215a274f.js";
import { E as G, d as J } from "./event-listener-097fdcc5.js";
import { a as p } from "./activeClass-b231b21b.js";
const Q = "scrollspy", k = "ScrollSpy", Y = '[data-bs-spy="scroll"]', j = {
  offset: 10,
  target: null
}, q = (t) => $(t, k), z = (t) => new U(t), H = C(`activate.bs.${Q}`), F = (t) => {
  const { target: s, scrollTarget: e, options: o, itemsLength: c, scrollHeight: r, element: i } = t, { offset: n } = o, a = x(e), l = s && L("A", s), u = e && K(e);
  if (t.scrollTop = a ? e.scrollY : e.scrollTop, l && (c !== l.length || u !== r)) {
    let h, g, d;
    t.items = [], t.offsets = [], t.scrollHeight = u, t.maxScroll = t.scrollHeight - P(t), [...l].forEach((S) => {
      h = B(S, "href"), g = h && h.charAt(0) === "#" && h.slice(-1) !== "#" && E(h, T(i)), g && (t.items.push(S), d = b(g), t.offsets.push((a ? d.top + t.scrollTop : g.offsetTop) - n));
    }), t.itemsLength = t.items.length;
  }
}, K = (t) => m(t) ? t.scrollHeight : M(t).scrollHeight, P = ({ element: t, scrollTarget: s }) => x(s) ? s.innerHeight : b(t).height, w = (t) => {
  [...L("A", t)].forEach((s) => {
    f(s, p) && N(s, p);
  });
}, v = (t, s) => {
  const { target: e, element: o } = t;
  m(e) && w(e), t.activeItem = s, y(s, p);
  const c = [];
  let r = s;
  for (; r !== O(o); )
    r = r.parentElement, (f(r, "nav") || f(r, "dropdown-menu")) && c.push(r);
  c.forEach((i) => {
    const n = i.previousElementSibling;
    n && !f(n, p) && y(n, p);
  }), H.relatedTarget = s, R(o, H);
}, I = (t, s) => {
  (s ? G : J)(t.scrollTarget, Z, t.refresh, D);
};
class U extends A {
  static selector = Y;
  static init = z;
  static getInstance = q;
  constructor(s, e) {
    super(s, e);
    const { element: o, options: c } = this;
    this.target = E(c.target, T(o)), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : W(o), this.refresh = this.refresh.bind(this), I(this, !0), this.refresh());
  }
  get name() {
    return k;
  }
  get defaults() {
    return j;
  }
  refresh() {
    const { target: s } = this;
    if (s?.offsetHeight === 0)
      return;
    F(this);
    const { scrollTop: e, maxScroll: o, itemsLength: c, items: r, activeItem: i } = this;
    if (e >= o) {
      const a = r[c - 1];
      i !== a && v(this, a);
      return;
    }
    const { offsets: n } = this;
    if (i && e < n[0] && n[0] > 0) {
      this.activeItem = null, m(s) && w(s);
      return;
    }
    r.forEach((a, l) => {
      i !== a && e >= n[l] && (typeof n[l + 1] > "u" || e < n[l + 1]) && v(this, a);
    });
  }
  dispose() {
    I(this), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=scrollspy.mjs.map
