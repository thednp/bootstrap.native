import { B as g, t as f, R as v, Z as n, q as l, m as c, Y as h, s as u, E, r as A, v as C } from "./base-component-CQAH5ZXF.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as i } from "./showClass-C8hdJfjQ.mjs";
import { d as b } from "./dataBsDismiss-DdNPQYa-.mjs";
import { i as L } from "./isDisabled-bThyhy2g.mjs";
const e = "alert", m = "Alert", _ = `.${e}`, B = `[${b}="${e}"]`, D = (t) => f(t, m), I = (t) => new w(t), r = c(
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
  static getInstance = D;
  dismiss;
  constructor(s) {
    super(s), this.dismiss = v(
      B,
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
    !s || !n(s, i) || (l(s, r), !r.defaultPrevented && (h(s, i), n(s, $) ? u(s, () => a(this)) : a(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (s) => {
    const d = s ? E : A, { dismiss: o, close: p } = this;
    o && !L(o) && d(o, C, p);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  w as default
};
//# sourceMappingURL=alert.mjs.map
