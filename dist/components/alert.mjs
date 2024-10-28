import { B as p, q as h, h as o, d as c, r as v, e as E, g as f, c as l, m as u } from "./base-component-ylZzLp-h.mjs";
import { E as C, r as A } from "./event-listener-C1-Yf9Z5.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { d as I } from "./dataBsDismiss-DdNPQYa-.mjs";
const e = "alert", m = "Alert", L = `.${e}`, S = `[${I}="${e}"]`, _ = (t) => f(t, m), b = (t) => new k(t), r = l(
  `close.bs.${e}`
), B = l(
  `closed.bs.${e}`
), a = (t) => {
  const { element: s } = t;
  c(s, B), t._toggleEventListeners(), t.dispose(), s.remove();
};
class k extends p {
  static selector = L;
  static init = b;
  static getInstance = _;
  dismiss;
  constructor(s) {
    super(s), this.dismiss = h(S, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return m;
  }
  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element: s } = this;
    s && o(s, i) && (c(s, r), r.defaultPrevented || (v(s, i), o(s, $) ? E(s, () => a(this)) : a(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (s) => {
    const d = s ? C : A, { dismiss: n, close: g } = this;
    n && d(n, u, g);
  };
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  k as default
};
//# sourceMappingURL=alert.mjs.map
