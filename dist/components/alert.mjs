import { B as f, t as g, R as u, Z as i, q as c, m, Y as v, s as h, E, r as A, v as C } from "./base-component-CQAH5ZXF.mjs";
import { f as $ } from "./fadeClass-CLIYI_zn.mjs";
import { s as r } from "./showClass-C8hdJfjQ.mjs";
import { d as b } from "./dataBsDismiss-DdNPQYa-.mjs";
import { i as L } from "./isDisabled-bThyhy2g.mjs";
const n = "alert", d = "Alert", _ = `.${n}`, B = `[${b}="${n}"]`, D = (s) => g(s, d), I = (s) => new w(s), a = m(
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
    super(t), this.dismiss = u(
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
    !e || !i(e, r) || t && o && L(o) || (c(e, a), !a.defaultPrevented && (v(e, r), i(e, $) ? h(e, () => l(this)) : l(this)));
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
