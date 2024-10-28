const p = (e) => e != null && typeof e == "object" || !1, k = (e) => p(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, f = (e) => k(e) && e.nodeType === 1 || !1, x = (e) => typeof e == "function" || !1, m = "PositionObserver Error";
class B {
  entries;
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
    if (!x(t))
      throw new Error(`${m}: ${t} is not a function.`);
    this.entries = [], this._callback = t, this._root = f(i?.root) ? i.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   * @param target
   */
  observe = (t) => {
    if (!f(t))
      throw new Error(
        `${m}: ${t} is not an instance of HTMLElement.`
      );
    if (!this._root.contains(t)) return;
    const { clientWidth: i, clientHeight: o } = this._root, h = t.getBoundingClientRect(), { left: l, top: a, bottom: n, right: s, width: r, height: c } = h, u = a > 1 - c && l > 1 - r && n <= o + c - 1 && s <= i + r - 1;
    this.entries.push({ target: t, boundingBox: h, isVisible: u }), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
  };
  /**
   * Stop observing the position of the specified element.
   * @param target
   */
  unobserve = (t) => {
    const i = this.entries.findIndex((o) => o.target === t);
    this.entries.splice(i, 1);
  };
  /**
   * Private method responsible for all the heavy duty.
   */
  _runCallback = () => {
    if (!this.entries.length) return;
    const t = [], { clientWidth: i, clientHeight: o } = this._root;
    this.entries.forEach((h, l) => {
      const { target: a, boundingBox: n } = h, s = a.getBoundingClientRect(), { left: r, top: c, bottom: u, right: g, width: b, height: d } = s;
      if (n.left !== r || n.top !== c || n.right !== g || n.bottom !== u) {
        const _ = c > 1 - d && r > 1 - b && u <= o + d - 1 && g <= i + b - 1;
        this.entries[l].boundingBox = s, this.entries[l].isVisible = _, t.push({ target: a, boundingBox: s, isVisible: _ });
      }
    }), t.length && this._callback(t), requestAnimationFrame(this._runCallback);
  };
  /**
   * Immediately stop observing all elements.
   */
  disconnect = () => {
    cancelAnimationFrame(this._tick), this.entries.length = 0, this._tick = 0;
  };
}
export {
  B as x
};
//# sourceMappingURL=index-gZuXW-3_.mjs.map
