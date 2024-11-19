import { B as f, R as g, Z as i, q as c, Y as u, s as v, t as h, m, E, r as A, v as C } from "./base-component-DAxvn9am.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { d as b } from "./dataBsDismiss-DdNPQYa-.mjs";
import { i as L } from "./isDisabled-DRrRkHiq.mjs";
const n = "alert", d = "Alert", _ = `.${n}`, B = `[${b}="${n}"]`, D = (s) => h(s, d), I = (s) => new w(s), a = m(
  `close.bs.${n}`
), S = m(
  `closed.bs.${n}`
), l = (s) => {
  const { element: t } = s;
  c(t, S), s._toggleEventListeners(), s.dispose(), t.remove();
};
class w extends f {
  static selector = _;
  static init = I;
  static getInstance = D;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = g(
      B,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return d;
  }
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = (t) => {
    const { element: e, dismiss: o } = this;
    !e || !i(e, r) || t && o && L(o) || (c(e, a), !a.defaultPrevented && (u(e, r), i(e, $) ? v(e, () => l(this)) : l(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    const e = t ? E : A, { dismiss: o, close: p } = this;
    o && e(o, C, p);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
export {
  w as default
};
//# sourceMappingURL=alert.mjs.map
