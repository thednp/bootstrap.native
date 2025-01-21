import { B as X, c as Y, d as l, _ as c, Z as v, t as _, u as j, G as O, a as D, s as E, m as h, x as T, a0 as q, $ as y, a1 as A, Q as w, a2 as B, J as N, a3 as P, E as x, r as I, M as z, k as F, v as L, W as C, N as R, Y as U } from "./base-component-DdvmGdVr.mjs";
import { d as ee } from "./dataBsDismiss-DdNPQYa-.mjs";
import { d as te } from "./dataBsToggle-B84TS15h.mjs";
import { s as o } from "./showClass-C8hdJfjQ.mjs";
import { h as se, o as i } from "./popupContainer-tX_ZgWRQ.mjs";
import { d as G, g as S, a as ne, t as ae, s as oe, h as K, o as f, i as ie, r as re, m as ce, c as fe, f as Q } from "./isVisible-CSzcZ9NF.mjs";
import { g as W } from "./getTargetElement-PcSFNllf.mjs";
import { i as le } from "./isDisabled-C26LKsNR.mjs";
const de = `.${i}`, Z = `[${te}="${i}"]`, ge = `[${ee}="${i}"]`, u = `${i}-toggling`, me = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, d = (n) => _(n, G), ve = (n) => new we(n), m = h(`show.bs.${i}`), J = h(`shown.bs.${i}`), b = h(`hide.bs.${i}`), M = h(`hidden.bs.${i}`), he = (n) => {
  const { element: e } = n, { clientHeight: t, scrollHeight: s } = z(e);
  fe(e, t !== s);
}, V = (n, e) => {
  const t = e ? x : I, s = l(n.element);
  t(s, F, Oe), t(s, L, be);
}, H = (n) => {
  const { element: e, options: t } = n;
  t.scroll || (he(n), T(q(e), { overflow: "hidden" })), O(e, u), O(e, o), T(e, { visibility: "visible" }), E(e, () => Te(n));
}, ue = (n) => {
  const { element: e, options: t } = n, s = S(e);
  e.blur(), !s && t.backdrop && c(f, o) && K(), E(e, () => ye(n));
};
function pe(n) {
  const e = W(this), t = e && d(e);
  le(this) || t && (t.relatedTarget = this, t.toggle(), this.tagName === "A" && n.preventDefault());
}
const be = (n) => {
  const { target: e } = n, t = C(
    Q,
    l(e)
  );
  if (!t) return;
  const s = C(
    ge,
    t
  ), a = d(t);
  if (!a) return;
  const { options: r, triggers: g } = a, { backdrop: $ } = r, p = R(e, Z), k = l(t).getSelection();
  f.contains(e) && $ === "static" || (!(k && k.toString().length) && (!t.contains(e) && $ && (!p || g.includes(e)) || s && s.contains(e)) && (a.relatedTarget = s && s.contains(e) ? s : void 0, a.hide()), p && p.tagName === "A" && n.preventDefault());
}, Oe = ({ code: n, target: e }) => {
  const t = C(
    Q,
    l(e)
  ), s = t && d(t);
  s && s.options.keyboard && n === U && (s.relatedTarget = void 0, s.hide());
}, Te = (n) => {
  const { element: e } = n;
  D(e, u), y(e, A), w(e, B, "true"), w(e, "role", "dialog"), v(e, J), V(n, !0), N(e), P(e);
}, ye = (n) => {
  const { element: e, triggers: t } = n;
  w(e, A, "true"), y(e, B), y(e, "role"), T(e, { visibility: "" });
  const s = m.relatedTarget || t.find(ie);
  s && N(s), re(e), v(e, M), D(e, u), P(e), S(e) || V(n);
};
class we extends X {
  static selector = de;
  static init = ve;
  static getInstance = d;
  constructor(e, t) {
    super(e, t);
    const { element: s } = this;
    this.triggers = [
      ...Y(
        Z,
        l(s)
      )
    ].filter(
      (a) => W(a) === s
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  get name() {
    return G;
  }
  get defaults() {
    return me;
  }
  toggle() {
    c(this.element, o) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: t, relatedTarget: s } = this;
    let a = 0;
    if (c(e, o) || (m.relatedTarget = s || void 0, J.relatedTarget = s || void 0, v(e, m), m.defaultPrevented)) return;
    const r = S(e);
    if (r && r !== e) {
      const g = d(r) || _(
        r,
        ce
      );
      g && g.hide();
    }
    t.backdrop ? (se(f) ? ae() : ne(e, !0), a = j(f), oe(), setTimeout(() => H(this), a)) : (H(this), r && c(f, o) && K());
  }
  hide() {
    const { element: e, relatedTarget: t } = this;
    c(e, o) && (b.relatedTarget = t || void 0, M.relatedTarget = t || void 0, v(e, b), !b.defaultPrevented && (O(e, u), D(e, o), ue(this)));
  }
  _toggleEventListeners = (e) => {
    const t = e ? x : I;
    this.triggers.forEach((s) => {
      t(s, L, pe);
    });
  };
  dispose() {
    const { element: e } = this, t = c(e, o), s = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), t ? E(e, s) : s();
  }
}
export {
  we as default
};
//# sourceMappingURL=offcanvas.mjs.map
