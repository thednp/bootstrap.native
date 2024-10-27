var x = Object.defineProperty;
var k = (t, e, s) => e in t ? x(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var h = (t, e, s) => k(t, typeof e != "symbol" ? e + "" : e, s);
import { createCustomEvent as q, querySelector as S, getDocument as C, getDocumentElement as L, isHTMLElement as d, getInstance as G, getElementsByTagName as _, getAttribute as M, getBoundingClientRect as A, hasClass as u, removeClass as N, addClass as T, getDocumentBody as O, dispatchEvent as R } from "@thednp/shorty";
import { D as W } from "./index-CmM9Kopf.mjs";
import { a as f } from "./activeClass-iqaD75Su.mjs";
import { B as $ } from "./base-component-DHbs0JQk.mjs";
const j = "scrollspy", w = "ScrollSpy", z = '[data-bs-spy="scroll"]', F = {
  offset: 10,
  target: null
}, J = (t) => G(t, w), K = (t) => new v(t), b = q(`activate.bs.${j}`), P = (t) => {
  const { target: e, scrollTarget: s, options: o, itemsLength: n, scrollHeight: r, element: l } = t, { offset: i } = o, a = s !== l, c = e && _("A", e), g = C(l), E = s ? B(s) : r;
  t.scrollTop = s.scrollTop;
  // istanbul ignore else @preserve
  if (c && (E !== r || n !== c.length)) {
    let p, m, H;
    t.items = [], t.targets = [], t.offsets = [], t.scrollHeight = E, t.maxScroll = t.scrollHeight - Q(t), Array.from(c).forEach((y) => {
      p = M(y, "href"), m = p && p.charAt(0) === "#" && p.slice(-1) !== "#" && S(p, g), m && (t.items.push(y), t.targets.push(m), H = A(m), t.offsets.push(
        (a ? H.top + t.scrollTop : m.offsetTop) - i
      ));
    }), t.itemsLength = t.items.length;
  }
}, B = (t) => d(t) ? t.scrollHeight : L(t).scrollHeight, Q = ({ element: t, scrollTarget: e }) => e !== t ? e.clientHeight : A(t).height, D = (t) => {
  [..._("A", t)].forEach((e) => {
    u(e, f) && N(e, f);
  });
}, I = (t, e) => {
  const { target: s, element: o } = t;
  // istanbul ignore else @preserve
  d(s) && D(s), t.activeItem = e, T(e, f);
  const n = [];
  let r = e;
  for (; r !== O(o); )
    r = r.parentElement, (u(r, "nav") || u(r, "dropdown-menu")) && n.push(r);
  n.forEach((l) => {
    const i = l.previousElementSibling;
    // istanbul ignore else @preserve
    i && !u(i, f) && T(i, f);
  }), b.relatedTarget = e, R(o, b);
};
class v extends $ {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(s, o) {
    super(s, o);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    h(this, "refresh", () => {
      const { target: s } = this;
      // istanbul ignore else @preserve
      if (d(s) && s.offsetHeight > 0) {
        P(this);
        const { scrollTop: o, maxScroll: n, itemsLength: r, items: l, activeItem: i } = this;
        if (o >= n) {
          const c = l[r - 1];
          // istanbul ignore else @preserve
          i !== c && I(this, c);
          return;
        }
        const { offsets: a } = this;
        // istanbul ignore else @preserve
        if (i && o < a[0] && a[0] > 0) {
          this.activeItem = null;
          // istanbul ignore else @preserve
          s && D(s);
          return;
        }
        l.forEach((c, g) => {
          i !== c && o >= a[g] && (typeof a[g + 1] > "u" || o < a[g + 1]) && I(this, c);
        });
      }
    });
    /**
     * Toggles on/off the component event listener.
     *
     * @param add when `true`, listener is added
     */
    h(this, "_toggleEventListeners", (s) => {
      s ? this.scrollTarget === this.element ? this.targets.forEach(
        (o) => this._observer.observe(o)
      ) : this._observer.observe(this.element) : this._observer.disconnect();
    });
    const { element: n, options: r } = this;
    this.target = S(
      r.target,
      C(n)
    ), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : L(n), this.scrollHeight = B(this.scrollTarget), this.refresh(), this._observer = new W(() => this.refresh(), {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return w;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return F;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
h(v, "selector", z), h(v, "init", K), h(v, "getInstance", J);
export {
  v as default
};
//# sourceMappingURL=scrollspy.mjs.map
