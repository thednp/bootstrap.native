import { W as C, g as E, c as T, $ as A, r as m, L as W, al as L, am as b, Z as $, C as k, y as M, k as f, N, M as y, X as R, Q as Z, R as B, I as D } from "./shorty-f5e32a8f.js";
import { E as G, r as J } from "./event-listener-e555c4ba.js";
import { a as p } from "./activeClass-b231b21b.js";
import O from "./base-component.mjs";
const Q = "scrollspy", w = "ScrollSpy", X = '[data-bs-spy="scroll"]', Y = {
  offset: 10,
  target: null
}, j = (t) => W(t, w), q = (t) => new P(t), H = C(`activate.bs.${Q}`), z = (t) => {
  const { target: s, scrollTarget: e, options: o, itemsLength: c, scrollHeight: r, element: a } = t, { offset: n } = o, i = L(e), l = s && b("A", s), u = e && F(e);
  if (t.scrollTop = i ? e.scrollY : e.scrollTop, l && (c !== l.length || u !== r)) {
    let h, g, S;
    t.items = [], t.offsets = [], t.scrollHeight = u, t.maxScroll = t.scrollHeight - K(t), [...l].forEach((d) => {
      h = $(d, "href"), g = h && h.charAt(0) === "#" && h.slice(-1) !== "#" && E(h, T(a)), g && (t.items.push(d), S = k(g), t.offsets.push((i ? S.top + t.scrollTop : g.offsetTop) - n));
    }), t.itemsLength = t.items.length;
  }
}, F = (t) => m(t) ? t.scrollHeight : M(t).scrollHeight, K = ({ element: t, scrollTarget: s }) => L(s) ? s.innerHeight : k(t).height, x = (t) => {
  [...b("A", t)].forEach((s) => {
    f(s, p) && N(s, p);
  });
}, I = (t, s) => {
  const { target: e, element: o } = t;
  m(e) && x(e), t.activeItem = s, y(s, p);
  const c = [];
  let r = s;
  for (; r !== R(o); )
    r = r.parentElement, (f(r, "nav") || f(r, "dropdown-menu")) && c.push(r);
  c.forEach((a) => {
    const n = a.previousElementSibling;
    n && !f(n, p) && y(n, p);
  }), H.relatedTarget = s, Z(o, H);
}, v = (t, s) => {
  (s ? G : J)(t.scrollTarget, D, t.refresh, B);
};
class P extends O {
  static selector = X;
  static init = q;
  static getInstance = j;
  constructor(s, e) {
    super(s, e);
    const { element: o, options: c } = this;
    this.target = E(c.target, T(o)), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : A(o), this.refresh = this.refresh.bind(this), v(this, !0), this.refresh());
  }
  get name() {
    return w;
  }
  get defaults() {
    return Y;
  }
  refresh() {
    const { target: s } = this;
    if (s?.offsetHeight === 0)
      return;
    z(this);
    const { scrollTop: e, maxScroll: o, itemsLength: c, items: r, activeItem: a } = this;
    if (e >= o) {
      const i = r[c - 1];
      a !== i && I(this, i);
      return;
    }
    const { offsets: n } = this;
    if (a && e < n[0] && n[0] > 0) {
      this.activeItem = null, m(s) && x(s);
      return;
    }
    r.forEach((i, l) => {
      a !== i && e >= n[l] && (typeof n[l + 1] > "u" || e < n[l + 1]) && I(this, i);
    });
  }
  dispose() {
    v(this), super.dispose();
  }
}
export {
  P as default
};
//# sourceMappingURL=scrollspy.mjs.map
