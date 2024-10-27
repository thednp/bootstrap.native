var A = Object.defineProperty, T = (t, e, n) => e in t ? A(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, h = (t, e, n) => T(t, typeof e != "symbol" ? e + "" : e, n);
const B = "DOMContentLoaded", C = navigator.userAgentData, g = C, { userAgent: F } = navigator, f = F, w = /iPhone|iPad|iPod|Android/i;
// istanbul ignore else @preserve
g ? g.brands.some((t) => w.test(t.brand)) : w.test(f);
const P = /(iPhone|iPod|iPad)/;
g ? g.brands.some(
  (t) => P.test(t.brand)
) : (
  /* istanbul ignore next @preserve */
  P.test(f)
);
f && f.includes("Firefox");
const { head: p } = document;
["webkitPerspective", "perspective"].some(
  (t) => t in p.style
);
const L = (t, e, n, i) => {
  const o = i || !1;
  t.addEventListener(
    e,
    n,
    o
  );
}, O = (t, e, n, i) => {
  const o = i || !1;
  t.removeEventListener(
    e,
    n,
    o
  );
}, $ = (t, e, n, i) => {
  const o = (s) => {
    // istanbul ignore else @preserve
    (s.target === t || s.currentTarget === t) && (n.apply(t, [s]), O(t, e, o, i));
  };
  L(t, e, o, i);
}, j = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    // istanbul ignore next @preserve
    $(document, B, j, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some(
  (t) => t in p.style
);
["webkitAnimation", "animation"].some(
  (t) => t in p.style
);
["webkitTransition", "transition"].some(
  (t) => t in p.style
);
const H = (t) => t != null && typeof t == "object" || !1, V = (t) => H(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (e) => t.nodeType === e
) || !1, D = (t) => V(t) && t.nodeType === 1 || !1, x = (t, e) => {
  const { width: n, height: i, top: o, right: s, bottom: l, left: a } = t.getBoundingClientRect();
  let c = 1, r = 1;
  return {
    width: n / c,
    height: i / r,
    top: o / r,
    right: s / c,
    bottom: l / r,
    left: a / c,
    x: a / c,
    y: o / r
  };
}, q = (t) => typeof t == "function" || !1, E = "PositionObserver Error";
class M {
  /**
   * The constructor takes a single argument, callback, which is called
   * whenever the position of an observed element changes. The callback function
   * should take an array of `PositionObserverEntry` objects as its only argument.
   *
   * @param callback the callback that applies to all targets of this observer
   */
  constructor(e, n) {
    if (h(this, "entries"), h(this, "_tick"), h(this, "_root"), h(this, "_callback"), h(this, "observe", (i) => {
      if (!D(i))
        throw new Error(
          `${E}: ${i} is not an instance of HTMLElement.`
        );
      const { clientWidth: o, clientHeight: s } = this._root, l = x(i), { left: a, top: c, bottom: r, right: d, width: b, height: u } = l, m = c > 1 - u && a > 1 - b && r <= s + u - 1 && d <= o + b - 1;
      this.entries.push({ target: i, boundingBox: l, isVisible: m }), this._tick = requestAnimationFrame(this._runCallback);
    }), h(this, "unobserve", (i) => {
      const o = this.entries.findIndex((s) => s.target === i);
      this.entries.splice(o, 1);
    }), h(this, "_runCallback", () => {
      /* istanbul ignore if @preserve - a guard must be set */
      if (!this.entries.length) return;
      const i = [], { clientWidth: o, clientHeight: s } = this._root;
      this.entries.forEach((l, a) => {
        const { target: c, boundingBox: r } = l, d = x(c), { left: b, top: u, bottom: m, right: v, width: y, height: k } = d;
        if (r.left !== b || r.top !== u || r.right !== v || r.bottom !== m) {
          const _ = u > 1 - k && b > 1 - y && m <= s + k - 1 && v <= o + y - 1;
          this.entries[a].boundingBox = d, this.entries[a].isVisible = _, i.push({ target: c, boundingBox: d, isVisible: _ });
        }
      }), i.length && this._callback(i), requestAnimationFrame(this._runCallback);
    }), h(this, "disconnect", () => {
      cancelAnimationFrame(this._tick), this.entries.length = 0, this._tick = 0;
    }), !q(e))
      throw new Error(`${E}: ${e} is not a function.`);
    this.entries = [], this._callback = e, this._root = (n == null ? void 0 : n.root) || (document == null ? void 0 : document.documentElement), this._tick = 0;
  }
}
export {
  M as D
};
//# sourceMappingURL=index-CmM9Kopf.mjs.map
