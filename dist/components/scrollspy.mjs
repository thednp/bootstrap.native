import { B as H, R as x, d as T, S as C, l as k, n as S, a6 as q, t as B, m as D, a7 as d, Z as p, Y as O, b, q as j, M as z, E as M, r as R, v as Y } from "./base-component-DAxvn9am.mjs";
import { v as Z } from "./index-DXF8ibvt.mjs";
import { a as f } from "./activeClass-iqaD75Su.mjs";
import { i as F } from "./isDisabled-DRrRkHiq.mjs";
const N = "scrollspy", I = "ScrollSpy", $ = '[data-bs-spy="scroll"]', G = "[href]", J = {
  offset: 10,
  target: void 0
}, K = (o) => B(o, I), P = (o) => new U(o), _ = D(`activate.bs.${N}`), Q = (o) => {
  const {
    target: t,
    _itemsLength: r,
    _observables: e
  } = o, s = d("A", t), n = T(t);
  !s.length || r === e.size || (e.clear(), Array.from(s).forEach((l) => {
    const c = S(l, "href")?.slice(1), i = c?.length ? n.getElementById(c) : null;
    i && !F(l) && o._observables.set(i, l);
  }), o._itemsLength = o._observables.size);
}, E = (o) => {
  Array.from(d("A", o)).forEach(
    (t) => {
      p(t, f) && O(t, f);
    }
  );
}, y = (o, t) => {
  const { target: r, element: e } = o;
  E(r), o._activeItem = t, b(t, f);
  let s = t;
  for (; s !== r; )
    if (s = s.parentElement, ["nav", "dropdown-menu", "list-group"].some(
      (n) => p(s, n)
    )) {
      const n = s.previousElementSibling;
      n && !p(n, f) && b(n, f);
    }
  _.relatedTarget = t, j(e, _);
}, g = (o, t) => {
  const { scrollTarget: r, element: e, options: s } = o;
  return (r !== e ? z(t).top + r.scrollTop : t.offsetTop) - (s.offset || 10);
};
class U extends H {
  static selector = $;
  static init = P;
  static getInstance = K;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, r) {
    super(t, r);
    const { element: e, options: s } = this, n = x(
      s.target,
      T(e)
    );
    n && (this.target = n, this.scrollTarget = e.clientHeight < e.scrollHeight ? e : C(e), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new Z(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return I;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return J;
  }
  refresh = () => {
    const { target: t, scrollTarget: r } = this;
    if (!t || t.offsetHeight === 0) return;
    Q(this);
    const { _itemsLength: e, _observables: s, _activeItem: n } = this;
    if (!e) return;
    const l = s.entries().toArray(), { scrollTop: c, scrollHeight: i, clientHeight: A } = r;
    if (c >= i - A) {
      const a = l[e - 1]?.[1];
      n !== a && y(this, a);
      return;
    }
    const h = l[0]?.[0] ? g(this, l[0][0]) : null;
    if (h !== null && c < h && h > 0) {
      this._activeItem = null, E(t);
      return;
    }
    for (let a = 0; a < e; a += 1) {
      const [w, m] = l[a], L = g(this, w), u = l[a + 1]?.[0], v = u ? g(this, u) : null;
      if (n !== m && c >= L && (v === null || c < v)) {
        y(this, m);
        break;
      }
    }
  };
  /**
   * This method provides an event handle
   * for scrollspy
   * @param e the event listener object
   */
  _scrollTo = (t) => {
    const r = k(t.target, G), e = r && S(r, "href")?.slice(1), s = e && q(e, this.target);
    s && (this.scrollTarget.scrollTo({
      top: s.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  /**
   * Toggles on/off the component observer.
   *
   * @param self the ScrollSpy instance
   * @param add when `true`, listener is added
   */
  _toggleEventListeners = (t) => {
    const { target: r, _observables: e, _observer: s, _scrollTo: n } = this;
    (t ? M : R)(r, Y, n), t ? e?.forEach((c, i) => s.observe(i)) : s.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  U as default
};
//# sourceMappingURL=scrollspy.mjs.map
