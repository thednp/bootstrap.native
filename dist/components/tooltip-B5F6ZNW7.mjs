import { i as Pt, K as ct, Q as It, P as tt, R as kt, u as y, c as Q, a8 as U, d as V, I as Ft, a9 as jt, aa as zt, ab as qt, ac as Kt, a3 as z, s as et, q as J, f as L, h as K, ad as Qt, ae as Ut, af as Vt, l as st, B as Yt, g as yt, ag as Zt, O as Gt, M as xt, N as Jt, T as B, e as rt, r as Xt, ah as te, V as ee, v as se, w as oe, z as St, m as dt, S as ie, a6 as ne, a7 as ae, ai as le, D as ft, b as ce, Z as Ht, aj as Nt, x as At } from "./base-component-ylZzLp-h.mjs";
import { E as pt, r as mt } from "./event-listener-C1-Yf9Z5.mjs";
import { x as re } from "./index-gZuXW-3_.mjs";
import { d as de } from "./dataBsToggle-B84TS15h.mjs";
import { s as ht } from "./showClass-C8hdJfjQ.mjs";
import { a as he, h as pe, m as ut, o as gt, r as me } from "./popupContainer-ymf2oGcv.mjs";
import { f as bt } from "./fadeClass-CLIYI_zn.mjs";
const X = "popover", Lt = "Popover", w = "tooltip", fe = (o) => {
  const t = o === w, s = t ? `${o}-inner` : `${o}-body`, e = t ? "" : `<h3 class="${o}-header"></h3>`, i = `<div class="${o}-arrow"></div>`, n = `<div class="${s}"></div>`;
  return `<div class="${o}" role="${w}">${e + i + n}</div>`;
}, Bt = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, vt = (o) => {
  const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: e, container: i, options: n, arrow: c } = o;
  if (e) {
    const p = { ...Bt }, h = Pt(s);
    ct(e, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const f = o.name === Lt, { offsetWidth: l, offsetHeight: u } = e, { clientWidth: x, clientHeight: b, offsetWidth: O } = It(s);
    let { placement: a } = n;
    const { clientWidth: v, offsetWidth: T } = i, S = tt(
      i,
      "position"
    ) === "fixed", r = Math.abs(S ? v - T : x - O), H = h && S ? r : 0, $ = x - (h ? 0 : r) - 1, {
      width: m,
      height: g,
      left: d,
      right: Mt,
      top: R
    } = kt(s, !0), { x: Y, y: M } = {
      x: d,
      y: R
    };
    ct(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let N = 0, _ = "", E = 0, it = "", D = "", Z = "", nt = "";
    const A = c.offsetWidth || 0, C = c.offsetHeight || 0, at = A / 2;
    let I = R - u - C < 0, k = R + u + g + C >= b, F = d - l - A < H, j = d + l + m + A >= $;
    const G = ["left", "right"], lt = ["top", "bottom"];
    I = G.includes(a) ? R + g / 2 - u / 2 - C < 0 : I, k = G.includes(a) ? R + u / 2 + g / 2 + C >= b : k, F = lt.includes(a) ? d + m / 2 - l / 2 < H : F, j = lt.includes(a) ? d + l / 2 + m / 2 >= $ : j, a = G.includes(a) && F && j ? "top" : a, a = a === "top" && I ? "bottom" : a, a = a === "bottom" && k ? "top" : a, a = a === "left" && F ? "right" : a, a = a === "right" && j ? "left" : a, e.className.includes(a) || (e.className = e.className.replace(
      t,
      p[a]
    )), G.includes(a) ? (a === "left" ? E = Y - l - (f ? A : 0) : E = Y + m + (f ? A : 0), I && k ? (N = 0, _ = 0, D = R + g / 2 - C / 2) : I ? (N = M, _ = "", D = g / 2 - A) : k ? (N = M - u + g, _ = "", D = u - g / 2 - A) : (N = M - u / 2 + g / 2, D = u / 2 - C / 2)) : lt.includes(a) && (a === "top" ? N = M - u - (f ? C : 0) : N = M + g + (f ? C : 0), F ? (E = 0, Z = Y + m / 2 - at) : j ? (E = "auto", it = 0, nt = m / 2 + $ - Mt - at) : (E = Y - l / 2 + m / 2, Z = l / 2 - at)), ct(e, {
      top: `${N}px`,
      bottom: _ === "" ? "" : `${_}px`,
      left: E === "auto" ? E : `${E}px`,
      right: it !== "" ? `${it}px` : ""
    }), y(c) && (D !== "" && (c.style.top = `${D}px`), Z !== "" ? c.style.left = `${Z}px` : nt !== "" && (c.style.right = `${nt}px`));
    const _t = Q(
      `updated.bs.${U(o.name)}`
    );
    V(s, _t);
  }
}, Tt = {
  template: fe(w),
  title: "",
  customClass: "",
  trigger: "hover focus",
  placement: "top",
  sanitizeFn: void 0,
  animation: !0,
  delay: 200,
  container: document.body,
  content: "",
  dismissible: !1,
  btnClose: ""
}, Wt = "data-original-title", W = "Tooltip", P = (o, t, s) => {
  if (Ft(t) && t.length) {
    let e = t.trim();
    jt(s) && (e = s(e));
    const n = new DOMParser().parseFromString(e, "text/html");
    o.append(...n.body.childNodes);
  } else y(t) ? o.append(t) : (zt(t) || qt(t) && t.every(Kt)) && o.append(...t);
}, ue = (o) => {
  const t = o.name === W, { id: s, element: e, options: i } = o, {
    title: n,
    placement: c,
    template: p,
    animation: h,
    customClass: f,
    sanitizeFn: l,
    dismissible: u,
    content: x,
    btnClose: b
  } = i, O = t ? w : X, a = { ...Bt };
  let v = [], T = [];
  Pt(e) && (a.left = "end", a.right = "start");
  const ot = `bs-${O}-${a[c]}`;
  let S;
  if (y(p))
    S = p;
  else {
    const H = z("div");
    P(H, p, l), S = H.firstChild;
  }
  o.tooltip = y(S) ? S.cloneNode(!0) : void 0;
  const { tooltip: r } = o;
  if (r) {
    et(r, "id", s), et(r, "role", w);
    const H = t ? `${w}-inner` : `${X}-body`, $ = t ? null : J(`.${X}-header`, r), m = J(`.${H}`, r);
    o.arrow = J(`.${O}-arrow`, r);
    const { arrow: g } = o;
    if (y(n)) v = [n.cloneNode(!0)];
    else {
      const d = z("div");
      P(d, n, l), v = [...d.childNodes];
    }
    if (y(x)) T = [x.cloneNode(!0)];
    else {
      const d = z("div");
      P(d, x, l), T = [...d.childNodes];
    }
    if (u)
      if (n)
        if (y(b))
          v = [...v, b.cloneNode(!0)];
        else {
          const d = z("div");
          P(d, b, l), v = [...v, d.firstChild];
        }
      else if ($ && $.remove(), y(b))
        T = [...T, b.cloneNode(!0)];
      else {
        const d = z("div");
        P(d, b, l), T = [...T, d.firstChild];
      }
    t ? n && m && P(m, n, l) : (n && $ && P($, v, l), x && m && P(m, T, l), o.btn = J(".btn-close", r) || void 0), L(r, "position-fixed"), L(g, "position-absolute"), K(r, O) || L(r, O), h && !K(r, bt) && L(r, bt), f && !K(r, f) && L(r, f), K(r, ot) || L(r, ot);
  }
}, ge = (o) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: e } = o;
  for (; e && !t.includes(e.nodeName); )
    e = Qt(e), Ut(e) || Vt(e) || s.push(e);
  return s.find((i, n) => tt(i, "position") !== "relative" && s.slice(n + 1).every(
    (c) => tt(c, "position") === "static"
  ) ? i : null) || // istanbul ignore next: optional guard
  st(o).body;
}, be = `[${de}="${w}"],[data-tip="${w}"]`, Ot = "title";
let wt = (o) => yt(o, W);
const ve = (o) => new $e(o), Te = (o) => {
  const { element: t, tooltip: s, container: e, offsetParent: i } = o;
  Ht(t, Nt), me(
    s,
    e === i ? e : i
  );
}, q = (o) => {
  const { tooltip: t, container: s, offsetParent: e } = o;
  return t && pe(t, s === e ? s : e);
}, we = (o, t) => {
  const { element: s } = o;
  o._toggleEventListeners(), xt(s, Wt) && o.name === W && Dt(o), t && t();
}, Rt = (o, t) => {
  const s = t ? pt : mt, { element: e } = o;
  s(
    st(e),
    St,
    o.handleTouch,
    At
  );
}, $t = (o) => {
  const { element: t } = o, s = Q(
    `shown.bs.${U(o.name)}`
  );
  Rt(o, !0), V(t, s), B.clear(t, "in");
}, Et = (o) => {
  const { element: t } = o, s = Q(
    `hidden.bs.${U(o.name)}`
  );
  Rt(o), Te(o), V(t, s), B.clear(t, "out");
}, Ct = (o, t) => {
  const s = t ? pt : mt, { element: e } = o, i = ft(e, `.${ut}`), n = ft(e, `.${gt}`);
  t ? o._observer.observe(o.element) : o._observer.disconnect(), i && s(i, `hide.bs.${ut}`, o.handleHide), n && s(n, `hide.bs.${gt}`, o.handleHide);
}, Dt = (o, t) => {
  const s = [Wt, Ot], { element: e } = o;
  et(
    e,
    s[t ? 0 : 1],
    t || ce(e, s[0]) || // istanbul ignore next @preserve
    ""
  ), Ht(e, s[t ? 1 : 0]);
};
class $e extends Yt {
  static selector = be;
  static init = ve;
  static getInstance = wt;
  static styleTip = vt;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: e } = this, i = this.name === W, n = i ? w : X, c = i ? W : Lt;
    wt = (h) => yt(h, c), this.enabled = !0, this.id = `${n}-${Zt(e, n)}`;
    const { options: p } = this;
    !p.title && i || !i && !p.content || (Gt(Tt, { titleAttr: "" }), xt(e, Ot) && i && typeof p.title == "string" && Dt(this, p.title), this.container = ge(e), this.offsetParent = ["sticky", "fixed"].some(
      (h) => tt(this.container, "position") === h
    ) ? this.container : st(this.element).body, ue(this), this._observer = new re(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return W;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Tt;
  }
  // TOOLTIP PUBLIC METHODS
  // ======================
  /** Handles the focus event on iOS. */
  // istanbul ignore next @preserve - impossible to test without Apple device
  handleFocus = () => Jt(this.element);
  /** Shows the tooltip. */
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: e, container: i, offsetParent: n, id: c } = this, { animation: p } = t, h = B.get(e, "out"), f = i === n ? i : n;
    B.clear(e, "out"), s && !h && !q(this) && B.set(
      e,
      () => {
        const l = Q(
          `show.bs.${U(this.name)}`
        );
        V(e, l), l.defaultPrevented || (he(s, f), et(e, Nt, `#${c}`), this.update(), Ct(this, !0), K(s, ht) || L(s, ht), p ? rt(s, () => $t(this)) : $t(this));
      },
      17,
      "in"
    );
  }
  /** Hides the tooltip. */
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: e } = this, { animation: i, delay: n } = t;
    B.clear(e, "in"), s && q(this) && B.set(
      e,
      () => {
        const c = Q(
          `hide.bs.${U(this.name)}`
        );
        V(e, c), c.defaultPrevented || (this.update(), Xt(s, ht), Ct(this), i ? rt(s, () => Et(this)) : Et(this));
      },
      n + 17,
      "out"
    );
  }
  /** Updates the tooltip position. */
  update = () => {
    vt(this);
  };
  /** Toggles the tooltip visibility. */
  toggle = () => {
    const { tooltip: t } = this;
    t && !q(this) ? this.show() : this.hide();
  };
  /** Enables the tooltip. */
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: t, enabled: s } = this;
    s && (t && q(this) && this.hide(), this._toggleEventListeners(), this.enabled = !s);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /**
   * Handles the `touchstart` event listener for `Tooltip`
   *
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch = ({ target: t }) => {
    const { tooltip: s, element: e } = this;
    s && s.contains(t) || t === e || t && e.contains(t) || this.hide();
  };
  /**
   * Toggles on/off the `Tooltip` event listeners.
   *
   * @param add when `true`, event listeners are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? pt : mt, { element: e, options: i, btn: n } = this, { trigger: c } = i, h = !!(this.name !== W && i.dismissible);
    c.includes("manual") || (this.enabled = !!t, c.split(" ").forEach((l) => {
      l === te ? (s(e, ee, this.handleShow), s(e, se, this.handleShow), h || (s(e, oe, this.handleHide), s(
        st(e),
        St,
        this.handleTouch,
        At
      ))) : l === dt ? s(e, l, h ? this.handleShow : this.toggle) : l === ie && (s(e, ne, this.handleShow), h || s(e, ae, this.handleHide), le() && s(e, dt, this.handleFocus)), h && n && s(n, dt, this.handleHide);
    }));
  };
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: t, options: s } = this, e = { ...this, name: this.name }, i = () => setTimeout(
      () => we(e, () => super.dispose()),
      17
    );
    s.animation && q(e) ? (this.options.delay = 0, this.hide(), rt(t, i)) : i();
  }
}
export {
  $e as T,
  X as a,
  fe as g,
  Lt as p,
  vt as s,
  Tt as t
};
//# sourceMappingURL=tooltip-B5F6ZNW7.mjs.map
