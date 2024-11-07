const f = (e) => e != null && typeof e == "object" || !1, d = (e) => f(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, u = (e) => d(e) && e.nodeType === 1 || !1, k = (e) => typeof e == "function" || !1, w = "1.0.2", m = "PositionObserver Error";
class p {
  entries;
  static version = w;
  _tick;
  _root;
  _callback;
  /**
   * The constructor takes two arguments, a `callback`, which is called
   * whenever the position of an observed element changes and an `options` object.
   * The callback function should take an array of `PositionObserverEntry` objects
   * as its only argument, but it's not required.
   *
   * @param callback the callback that applies to all targets of this observer
   * @param options the options of this observer
   */
  constructor(t, i) {
    if (!k(t))
      throw new Error(`${m}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._callback = t, this._root = u(i?.root) ? i.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   *
   * @param target an `Element` target
   */
  observe = (t) => {
    if (!u(t))
      throw new Error(
        `${m}: ${t} is not an instance of Element.`
      );
    this._root.contains(t) && this._new(t).then((i) => {
      this.getEntry(t) || this.entries.set(t, i), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
    });
  };
  /**
   * Stop observing the position of the specified element.
   *
   * @param target an `HTMLElement` target
   */
  unobserve = (t) => {
    this.entries.has(t) && this.entries.delete(t);
  };
  /**
   * Private method responsible for all the heavy duty,
   * the observer's runtime.
   */
  _runCallback = () => {
    if (!this.entries.size) return;
    const t = new Promise((i) => {
      const r = [];
      this.entries.forEach(
        ({ target: s, boundingClientRect: n }) => {
          this._root.contains(s) && this._new(s).then(({ boundingClientRect: c, isVisible: a }) => {
            const { left: l, top: b, bottom: _, right: h } = c;
            if (n.top !== b || n.left !== l || n.right !== h || n.bottom !== _) {
              const o = { target: s, boundingClientRect: c, isVisible: a };
              this.entries.set(s, o), r.push(o);
            }
          });
        }
      ), i(r);
    });
    this._tick = requestAnimationFrame(async () => {
      const i = await t;
      i.length && this._callback(i, this), this._runCallback();
    });
  };
  /**
   * Calculate the target bounding box and determine
   * the value of `isVisible`.
   *
   * @param target an `Element` target
   */
  _new = (t) => {
    const { clientWidth: i, clientHeight: r } = this._root;
    return new Promise((s) => {
      new IntersectionObserver(
        ([{ boundingClientRect: n }], c) => {
          c.disconnect();
          const { left: a, top: l, bottom: b, right: _, width: h, height: o } = n, g = l > 1 - o && a > 1 - h && b <= r + o - 1 && _ <= i + h - 1;
          s({
            target: t,
            isVisible: g,
            boundingClientRect: n
          });
        }
      ).observe(t);
    });
  };
  /**
   * Find the entry for a given target.
   *
   * @param target an `HTMLElement` target
   */
  getEntry = (t) => this.entries.get(t);
  /**
   * Immediately stop observing all elements.
   */
  disconnect = () => {
    cancelAnimationFrame(this._tick), this.entries.clear(), this._tick = 0;
  };
}
export {
  p as E
};
//# sourceMappingURL=index-DinhT6Jq.mjs.map
