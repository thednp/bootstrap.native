var h = Object.defineProperty;
var m = (s, e, n) => e in s ? h(s, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[e] = n;
var i = (s, e, n) => m(s, typeof e != "symbol" ? e + "" : e, n);
import { isHTMLElement as c, isString as f, querySelector as u, Data as r, ObjectKeys as a, normalizeOptions as E } from "@thednp/shorty";
const g = "5.0.15", p = g;
class y {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, n) {
    /** just to have something to extend from */
    // istanbul ignore next @preserve coverage wise this isn't important
    i(this, "_toggleEventListeners", () => {
    });
    let t;
    try {
      if (c(e))
        t = e;
      else if (f(e)) {
        t = u(e);
        // istanbul ignore else @preserve
        if (!t) throw Error(`"${e}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (l) {
      throw Error(`${this.name} Error: ${l.message}`);
    }
    const o = r.get(t, this.name);
    // istanbul ignore else @preserve
    o && o._toggleEventListeners(), this.element = t, this.options = this.defaults && a(this.defaults).length ? E(t, this.defaults, n || {}, "bs") : (
      // istanbul ignore next @preserve
      {}
    ), r.set(t, this.name, this);
  }
  // istanbul ignore next @preserve
  get version() {
    return p;
  }
  // istanbul ignore next @preserve
  get name() {
    return "BaseComponent";
  }
  // istanbul ignore next @preserve
  get defaults() {
    return {};
  }
  /** Removes component from target element. */
  dispose() {
    r.remove(this.element, this.name), a(this).forEach((e) => {
      delete this[e];
    });
  }
}
export {
  y as B
};
//# sourceMappingURL=base-component-nXu3wApu.mjs.map
