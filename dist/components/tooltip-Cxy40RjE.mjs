import { U as xt, a8 as Dt, F as ct, S as jt, J as q, K as zt, a9 as It, f as C, v as Y, aa as Q, q as U, A as qt, ab as Yt, ac as Qt, ad as Ut, ae as Vt, a3 as j, Q as st, R as et, b as N, Y as I, af as Zt, ag as Gt, ah as Jt, d as ft, B as Kt, t as Ht, ai as Xt, N as te, H as St, a2 as ee, I as oe, y as L, r as ht, Z as se, aj as ie, P as ne, g as ae, w as le, l as Nt, m as dt, L as re, a6 as ce, a7 as he, ak as de, p as gt, j as pe, X as Lt, al as Wt, h as At } from "./base-component-Jx2aafTJ.mjs";
import { E as mt, r as ut } from "./event-listener-CUwvA4j6.mjs";
import { E as fe } from "./index-DinhT6Jq.mjs";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { s as pt } from "./showClass-C8hdJfjQ.mjs";
import { a as ue, h as ge, m as bt, o as vt, r as be } from "./popupContainer-CgZsH2ur.mjs";
import { f as $t } from "./fadeClass-CLIYI_zn.mjs";
const ot = "popover", ve = "Popover", v = "tooltip", $e = (s) => {
  const t = s === v, e = t ? `${s}-inner` : `${s}-body`, o = t ? "" : `<h3 class="${s}-header"></h3>`, n = `<div class="${s}-arrow"></div>`, a = `<div class="${e}"></div>`;
  return `<div class="${s}" role="${v}">${o + n + a}</div>`;
}, Bt = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, wt = (s) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: e, tooltip: o, container: n, offsetParent: a, options: h, arrow: r } = s;
    if (!o) return;
    const p = xt(e), { x: $, y: c } = Dt(a);
    ct(o, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: m, offsetHeight: f } = o, { clientWidth: u, clientHeight: E, offsetWidth: O } = jt(e);
    let { placement: i } = h;
    const { clientWidth: g, offsetWidth: V } = n, d = q(
      n,
      "position"
    ) === "fixed", Z = Math.abs(d ? g - V : u - O), x = p && d ? Z : 0, w = u - (p ? 0 : Z) - 1, it = s._observer.getEntry(e), {
      width: l,
      height: b,
      left: G,
      right: Ft,
      top: J
    } = it?.boundingClientRect || zt(e, !0), {
      x: K,
      y: A
    } = It(
      e,
      a,
      { x: $, y: c }
    );
    ct(r, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let H = 0, _ = "", T = 0, nt = "", B = "", X = "", at = "";
    const S = r.offsetWidth || 0, y = r.offsetHeight || 0, lt = S / 2;
    let k = J - f - y < 0, F = J + f + b + y >= E, M = G - m - S < x, D = G + m + l + S >= w;
    const tt = ["left", "right"], rt = ["top", "bottom"];
    k = tt.includes(i) ? J + b / 2 - f / 2 - y < 0 : k, F = tt.includes(i) ? J + f / 2 + b / 2 + y >= E : F, M = rt.includes(i) ? G + l / 2 - m / 2 < x : M, D = rt.includes(i) ? G + m / 2 + l / 2 >= w : D, i = tt.includes(i) && M && D ? "top" : i, i = i === "top" && k ? "bottom" : i, i = i === "bottom" && F ? "top" : i, i = i === "left" && M ? "right" : i, i = i === "right" && D ? "left" : i, o.className.includes(i) || (o.className = o.className.replace(
      t,
      Bt[i]
    )), tt.includes(i) ? (i === "left" ? T = K - m - S : T = K + l + S, k && F ? (H = 0, _ = 0, B = A + b / 2 - y / 2) : k ? (H = A, _ = "", B = b / 2 - S) : F ? (H = A - f + b, _ = "", B = f - b / 2 - S) : (H = A - f / 2 + b / 2, B = f / 2 - y / 2)) : rt.includes(i) && (i === "top" ? H = A - f - y : H = A + b + y, M ? (T = 0, X = K + l / 2 - lt) : D ? (T = "auto", nt = 0, at = l / 2 + w - Ft - lt) : (T = K - m / 2 + l / 2, X = m / 2 - lt)), ct(o, {
      top: `${H}px`,
      bottom: _ === "" ? "" : `${_}px`,
      left: T === "auto" ? T : `${T}px`,
      right: nt !== "" ? `${nt}px` : ""
    }), C(r) && (B !== "" && (r.style.top = `${B}px`), X !== "" ? r.style.left = `${X}px` : at !== "" && (r.style.right = `${at}px`));
    const Mt = Y(
      `updated.bs.${Q(s.name)}`
    );
    U(e, Mt);
  });
}, Tt = {
  template: $e(v),
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
}, Ot = "data-original-title", W = "Tooltip", P = (s, t, e) => {
  if (qt(t) && t.length) {
    let o = t.trim();
    Yt(e) && (o = e(o));
    const a = new DOMParser().parseFromString(o, "text/html");
    s.append(...a.body.childNodes);
  } else C(t) ? s.append(t) : (Qt(t) || Ut(t) && t.every(Vt)) && s.append(...t);
}, we = (s) => {
  const t = s.name === W, { id: e, element: o, options: n } = s, {
    title: a,
    placement: h,
    template: r,
    animation: p,
    customClass: $,
    sanitizeFn: c,
    dismissible: m,
    content: f,
    btnClose: u
  } = n, E = t ? v : ot, O = { ...Bt };
  let i = [], g = [];
  xt(o) && (O.left = "end", O.right = "start");
  const V = `bs-${E}-${O[h]}`;
  let R;
  if (C(r))
    R = r;
  else {
    const l = j("div");
    P(l, r, c), R = l.firstChild;
  }
  if (!C(R)) return;
  s.tooltip = R.cloneNode(!0);
  const { tooltip: d } = s;
  st(d, "id", e), st(d, "role", v);
  const Z = t ? `${v}-inner` : `${ot}-body`, x = t ? null : et(`.${ot}-header`, d), w = et(`.${Z}`, d);
  s.arrow = et(
    `.${E}-arrow`,
    d
  );
  const { arrow: it } = s;
  if (C(a)) i = [a.cloneNode(!0)];
  else {
    const l = j("div");
    P(l, a, c), i = [...l.childNodes];
  }
  if (C(f)) g = [f.cloneNode(!0)];
  else {
    const l = j("div");
    P(l, f, c), g = [...l.childNodes];
  }
  if (m)
    if (a)
      if (C(u))
        i = [...i, u.cloneNode(!0)];
      else {
        const l = j("div");
        P(l, u, c), i = [...i, l.firstChild];
      }
    else if (x && x.remove(), C(u))
      g = [...g, u.cloneNode(!0)];
    else {
      const l = j("div");
      P(l, u, c), g = [...g, l.firstChild];
    }
  t ? a && w && P(w, a, c) : (a && x && P(x, i, c), f && w && P(w, g, c), s.btn = et(".btn-close", d) || void 0), N(d, "position-absolute"), N(it, "position-absolute"), I(d, E) || N(d, E), p && !I(d, $t) && N(d, $t), $ && !I(d, $) && N(d, $), I(d, V) || N(d, V);
}, Te = (s) => {
  const t = ["HTML", "BODY"], e = [];
  let { parentNode: o } = s;
  for (; o && !t.includes(o.nodeName); )
    o = Zt(o), Gt(o) || Jt(o) || e.push(o);
  return e.find((n, a) => (q(n, "position") !== "relative" || q(n, "position") === "relative" && n.offsetHeight !== n.scrollHeight) && e.slice(a + 1).every(
    (h) => q(h, "position") === "static"
  ) ? n : null) || ft(s).body;
}, ye = `[${me}="${v}"],[data-tip="${v}"]`, Rt = "title";
let yt = (s) => Ht(s, W);
const Pe = (s) => new xe(s), Ce = (s) => {
  const { element: t, tooltip: e, container: o } = s;
  Lt(t, Wt), be(
    e,
    o
  );
}, z = (s) => {
  const { tooltip: t, container: e } = s;
  return t && ge(t, e);
}, Ee = (s, t) => {
  const { element: e } = s;
  s._toggleEventListeners(), St(e, Ot) && s.name === W && kt(s), t && t();
}, _t = (s, t) => {
  const e = t ? mt : ut, { element: o } = s;
  e(
    ft(o),
    Nt,
    s.handleTouch,
    At
  );
}, Pt = (s) => {
  const { element: t } = s, e = Y(
    `shown.bs.${Q(s.name)}`
  );
  _t(s, !0), U(t, e), L.clear(t, "in");
}, Ct = (s) => {
  const { element: t } = s, e = Y(
    `hidden.bs.${Q(s.name)}`
  );
  _t(s), Ce(s), U(t, e), L.clear(t, "out");
}, Et = (s, t) => {
  const e = t ? mt : ut, { element: o, tooltip: n } = s, a = gt(o, `.${bt}`), h = gt(o, `.${vt}`);
  t ? [o, n].forEach((r) => s._observer.observe(r)) : s._observer.disconnect(), a && e(a, `hide.bs.${bt}`, s.handleHide), h && e(h, `hide.bs.${vt}`, s.handleHide);
}, kt = (s, t) => {
  const e = [Ot, Rt], { element: o } = s;
  st(
    o,
    e[t ? 0 : 1],
    t || pe(o, e[0]) || ""
  ), Lt(o, e[t ? 1 : 0]);
};
class xe extends Kt {
  static selector = ye;
  static init = Pe;
  static getInstance = yt;
  static styleTip = wt;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, e) {
    super(t, e);
    const { element: o } = this, n = this.name === W, a = n ? v : ot, h = n ? W : ve;
    yt = (c) => Ht(c, h), this.enabled = !0, this.id = `${a}-${Xt(o, a)}`;
    const { options: r } = this;
    if (!r.title && n || !n && !r.content)
      return;
    te(Tt, { titleAttr: "" }), St(o, Rt) && n && typeof r.title == "string" && kt(this, r.title);
    const p = Te(o), $ = ["sticky", "fixed", "relative"].some(
      (c) => q(p, "position") === c
    ) ? p : ee(o);
    this.container = p, this.offsetParent = $, we(this), this.tooltip && (this._observer = new fe((c) => {
      c.some((m) => m.isVisible) && this.update();
    }), this._toggleEventListeners(!0));
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
  handleFocus = () => oe(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: e, element: o, container: n, id: a } = this, { animation: h } = t, r = L.get(o, "out");
    L.clear(o, "out"), e && !r && !z(this) && L.set(
      o,
      () => {
        const p = Y(
          `show.bs.${Q(this.name)}`
        );
        U(o, p), p.defaultPrevented || (ue(e, n), st(o, Wt, `#${a}`), this.update(), Et(this, !0), I(e, pt) || N(e, pt), h ? ht(e, () => Pt(this)) : Pt(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: e, element: o } = this, { animation: n, delay: a } = t;
    L.clear(o, "in"), e && z(this) && L.set(
      o,
      () => {
        const h = Y(
          `hide.bs.${Q(this.name)}`
        );
        U(o, h), h.defaultPrevented || (this.update(), se(e, pt), Et(this), n ? ht(e, () => Ct(this)) : Ct(this));
      },
      a + 17,
      "out"
    );
  }
  update = () => {
    wt(this);
  };
  toggle = () => {
    const { tooltip: t } = this;
    t && !z(this) ? this.show() : this.hide();
  };
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, enabled: e } = this;
    e && (t && z(this) && this.hide(), this._toggleEventListeners(), this.enabled = !e);
  }
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
    const { tooltip: e, element: o } = this;
    e && e.contains(t) || t === o || t && o.contains(t) || this.hide();
  };
  /**
   * Toggles on/off the `Tooltip` event listeners.
   *
   * @param add when `true`, event listeners are added
   */
  _toggleEventListeners = (t) => {
    const e = t ? mt : ut, { element: o, options: n, btn: a } = this, { trigger: h } = n, p = !!(this.name !== W && n.dismissible);
    h.includes("manual") || (this.enabled = !!t, h.split(" ").forEach((c) => {
      c === ie ? (e(o, ne, this.handleShow), e(o, ae, this.handleShow), p || (e(o, le, this.handleHide), e(
        ft(o),
        Nt,
        this.handleTouch,
        At
      ))) : c === dt ? e(o, c, p ? this.handleShow : this.toggle) : c === re && (e(o, ce, this.handleShow), p || e(o, he, this.handleHide), de() && e(o, dt, this.handleFocus)), p && a && e(a, dt, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: e } = this, o = { ...this, name: this.name }, n = () => setTimeout(
      () => Ee(o, () => super.dispose()),
      17
    );
    e.animation && z(o) ? (this.options.delay = 0, this.hide(), ht(t, n)) : n();
  }
}
export {
  xe as T,
  ot as a,
  $e as g,
  ve as p,
  wt as s,
  Tt as t
};
//# sourceMappingURL=tooltip-Cxy40RjE.mjs.map
