import { B as l, Y as n, Q as a, a as c, j as g, m, t as u, Z as p, b as d } from "./base-component-Jx2aafTJ.mjs";
import { E as b, r as f } from "./event-listener-CUwvA4j6.mjs";
import { a as o } from "./activeClass-iqaD75Su.mjs";
import { d as h } from "./dataBsToggle-B84TS15h.mjs";
const v = "button", r = "Button", B = `[${h}="${v}"]`, A = (e) => u(e, r), C = (e) => new E(e);
class E extends l {
  static selector = B;
  static init = C;
  static getInstance = A;
  /**
   * @param target usually a `.btn` element
   */
  constructor(s) {
    super(s);
    const { element: t } = this;
    this.isActive = n(t, o), a(t, c, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return r;
  }
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (s) => {
    s && s.preventDefault();
    const { element: t, isActive: i } = this;
    !n(t, "disabled") && !g(t, "disabled") && ((i ? p : d)(t, o), a(t, c, i ? "false" : "true"), this.isActive = n(t, o));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (s) => {
    (s ? b : f)(this.element, m, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  E as default
};
//# sourceMappingURL=button.mjs.map
