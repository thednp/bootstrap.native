import { B as l, t as g, Z as i, Q as a, a as c, Y as u, b as m, E as p, r as v, v as f } from "./base-component-CQAH5ZXF.mjs";
import { a as n } from "./activeClass-iqaD75Su.mjs";
import { d as h } from "./dataBsToggle-B84TS15h.mjs";
import { i as b } from "./isDisabled-bThyhy2g.mjs";
const d = "button", r = "Button", B = `[${h}="${d}"]`, A = (e) => g(e, r), C = (e) => new E(e);
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
    this.isActive = i(t, n), a(t, c, String(!!this.isActive)), this._toggleEventListeners(!0);
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
    const { element: t, isActive: o } = this;
    if (b(t)) return;
    (o ? u : m)(t, n), a(t, c, o ? "false" : "true"), this.isActive = i(t, n);
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (s) => {
    (s ? p : v)(this.element, f, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  E as default
};
//# sourceMappingURL=button.mjs.map
