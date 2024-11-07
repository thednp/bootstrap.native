import { B as g, R as f, Y as n, q as l, Z as v, r as h, t as E, v as c, m as u } from "./base-component-Jx2aafTJ.mjs";
import { E as A, r as C } from "./event-listener-CUwvA4j6.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { d as L } from "./dataBsDismiss-DdNPQYa-.mjs";
const e = "alert", m = "Alert", _ = `.${e}`, b = `[${L}="${e}"]`, B = (t) => E(t, m), I = (t) => new w(t), r = c(
  `close.bs.${e}`
), S = c(
  `closed.bs.${e}`
), a = (t) => {
  const { element: s } = t;
  l(s, S), t._toggleEventListeners(), t.dispose(), s.remove();
};
class w extends g {
  static selector = _;
  static init = I;
  static getInstance = B;
  dismiss;
  constructor(s) {
    super(s), this.dismiss = f(
      b,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return m;
  }
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element: s } = this;
    s && n(s, i) && (l(s, r), r.defaultPrevented || (v(s, i), n(s, $) ? h(s, () => a(this)) : a(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (s) => {
    const d = s ? A : C, { dismiss: o, close: p } = this;
    o && d(o, u, p);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  w as default
};
//# sourceMappingURL=alert.mjs.map
