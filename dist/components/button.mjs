import { B as l, h as n, s as a, a as c, b as g, m as u, g as m, r as d, f as p } from "./base-component-ylZzLp-h.mjs";
import { E as v, r as b } from "./event-listener-C1-Yf9Z5.mjs";
import { a as i } from "./activeClass-iqaD75Su.mjs";
import { d as f } from "./dataBsToggle-B84TS15h.mjs";
const h = "button", r = "Button", A = `[${f}="${h}"]`, C = (e) => m(e, r), B = (e) => new E(e);
class E extends l {
  static selector = A;
  static init = B;
  static getInstance = C;
  isActive = !1;
  /**
   * @param target usually a `.btn` element
   */
  constructor(s) {
    super(s);
    const { element: t } = this;
    this.isActive = n(t, i), a(t, c, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return r;
  }
  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (s) => {
    s && s.preventDefault();
    const { element: t, isActive: o } = this;
    !n(t, "disabled") && !g(t, "disabled") && ((o ? d : p)(t, i), a(t, c, o ? "false" : "true"), this.isActive = n(t, i));
  };
  // BUTTON PRIVATE METHOD
  // =====================
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (s) => {
    (s ? v : b)(this.element, u, this.toggle);
  };
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  E as default
};
//# sourceMappingURL=button.mjs.map
