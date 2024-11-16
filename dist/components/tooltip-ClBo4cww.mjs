import { U as xt, ab as Dt, F as ct, S as jt, K as I, L as zt, ac as qt, x as C, m as Q, ad as Y, q as U, y as It, ae as Qt, af as Yt, ag as Ut, ah as Zt, a5 as j, Q as st, R as et, b as N, Z as q, ai as Gt, aj as Jt, ak as Kt, d as ft, B as Vt, t as Ht, al as Xt, N as te, J as St, l as ee, a0 as Nt, a4 as oe, M as se, h as A, am as At, k as gt, E as mt, s as ht, g as Lt, i as Wt, Y as ie, an as ne, r as ut, P as ae, w as le, A as re, v as dt, T as ce, a9 as he, aa as de, ao as pe } from "./base-component-CQAH5ZXF.mjs";
import { v as fe } from "./index-DXF8ibvt.mjs";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { s as pt } from "./showClass-C8hdJfjQ.mjs";
import { h as ue, a as ge, m as bt, o as vt, r as be } from "./popupContainer-BvxACdvn.mjs";
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
    const { clientWidth: g, offsetWidth: Z } = n, d = I(
      n,
      "position"
    ) === "fixed", G = Math.abs(d ? g - Z : u - O), x = p && d ? G : 0, w = u - (p ? 0 : G) - 1, it = s._observer.getEntry(e), {
      width: l,
      height: b,
      left: J,
      right: Mt,
      top: K
    } = it?.boundingClientRect || zt(e, !0), {
      x: V,
      y: W
    } = qt(
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
    let H = 0, R = "", T = 0, nt = "", B = "", X = "", at = "";
    const S = r.offsetWidth || 0, y = r.offsetHeight || 0, lt = S / 2;
    let _ = K - f - y < 0, M = K + f + b + y >= E, F = J - m - S < x, D = J + m + l + S >= w;
    const tt = ["left", "right"], rt = ["top", "bottom"];
    _ = tt.includes(i) ? K + b / 2 - f / 2 - y < 0 : _, M = tt.includes(i) ? K + f / 2 + b / 2 + y >= E : M, F = rt.includes(i) ? J + l / 2 - m / 2 < x : F, D = rt.includes(i) ? J + m / 2 + l / 2 >= w : D, i = tt.includes(i) && F && D ? "top" : i, i = i === "top" && _ ? "bottom" : i, i = i === "bottom" && M ? "top" : i, i = i === "left" && F ? "right" : i, i = i === "right" && D ? "left" : i, o.className.includes(i) || (o.className = o.className.replace(
      t,
      Bt[i]
    )), tt.includes(i) ? (i === "left" ? T = V - m - S : T = V + l + S, _ && M ? (H = 0, R = 0, B = W + b / 2 - y / 2) : _ ? (H = W, R = "", B = b / 2 - S) : M ? (H = W - f + b, R = "", B = f - b / 2 - S) : (H = W - f / 2 + b / 2, B = f / 2 - y / 2)) : rt.includes(i) && (i === "top" ? H = W - f - y : H = W + b + y, F ? (T = 0, X = V + l / 2 - lt) : D ? (T = "auto", nt = 0, at = l / 2 + w - Mt - lt) : (T = V - m / 2 + l / 2, X = m / 2 - lt)), ct(o, {
      top: `${H}px`,
      bottom: R === "" ? "" : `${R}px`,
      left: T === "auto" ? T : `${T}px`,
      right: nt !== "" ? `${nt}px` : ""
    }), C(r) && (B !== "" && (r.style.top = `${B}px`), X !== "" ? r.style.left = `${X}px` : at !== "" && (r.style.right = `${at}px`));
    const Ft = Q(
      `updated.bs.${Y(s.name)}`
    );
    U(e, Ft);
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
}, Ot = "data-original-title", L = "Tooltip", P = (s, t, e) => {
  if (It(t) && t.length) {
    let o = t.trim();
    Qt(e) && (o = e(o));
    const a = new DOMParser().parseFromString(o, "text/html");
    s.append(...a.body.childNodes);
  } else C(t) ? s.append(t) : (Yt(t) || Ut(t) && t.every(Zt)) && s.append(...t);
}, we = (s) => {
  const t = s.name === L, { id: e, element: o, options: n } = s, {
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
  const Z = `bs-${E}-${O[h]}`;
  let k;
  if (C(r))
    k = r;
  else {
    const l = j("div");
    P(l, r, c), k = l.firstChild;
  }
  if (!C(k)) return;
  s.tooltip = k.cloneNode(!0);
  const { tooltip: d } = s;
  st(d, "id", e), st(d, "role", v);
  const G = t ? `${v}-inner` : `${ot}-body`, x = t ? null : et(`.${ot}-header`, d), w = et(`.${G}`, d);
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
  t ? a && w && P(w, a, c) : (a && x && P(x, i, c), f && w && P(w, g, c), s.btn = et(".btn-close", d) || void 0), N(d, "position-absolute"), N(it, "position-absolute"), q(d, E) || N(d, E), p && !q(d, $t) && N(d, $t), $ && !q(d, $) && N(d, $), q(d, Z) || N(d, Z);
}, Te = (s) => {
  const t = ["HTML", "BODY"], e = [];
  let { parentNode: o } = s;
  for (; o && !t.includes(o.nodeName); )
    o = Gt(o), Jt(o) || Kt(o) || e.push(o);
  return e.find((n, a) => (I(n, "position") !== "relative" || I(n, "position") === "relative" && n.offsetHeight !== n.scrollHeight) && e.slice(a + 1).every(
    (h) => I(h, "position") === "static"
  ) ? n : null) || ft(s).body;
}, ye = `[${me}="${v}"],[data-tip="${v}"]`, kt = "title";
let yt = (s) => Ht(s, L);
const Pe = (s) => new xe(s), Ce = (s) => {
  const { element: t, tooltip: e, container: o } = s;
  Nt(t, At), be(
    e,
    o
  );
}, z = (s) => {
  const { tooltip: t, container: e } = s;
  return t && ue(t, e);
}, Ee = (s, t) => {
  const { element: e } = s;
  s._toggleEventListeners(), St(e, Ot) && s.name === L && _t(s), t && t();
}, Rt = (s, t) => {
  const e = t ? mt : ut, { element: o } = s;
  e(
    ft(o),
    Wt,
    s.handleTouch,
    Lt
  );
}, Pt = (s) => {
  const { element: t } = s, e = Q(
    `shown.bs.${Y(s.name)}`
  );
  Rt(s, !0), U(t, e), A.clear(t, "in");
}, Ct = (s) => {
  const { element: t } = s, e = Q(
    `hidden.bs.${Y(s.name)}`
  );
  Rt(s), Ce(s), U(t, e), A.clear(t, "out");
}, Et = (s, t) => {
  const e = t ? mt : ut, { element: o, tooltip: n } = s, a = gt(o, `.${bt}`), h = gt(o, `.${vt}`);
  t ? [o, n].forEach((r) => s._observer.observe(r)) : s._observer.disconnect(), a && e(a, `hide.bs.${bt}`, s.handleHide), h && e(h, `hide.bs.${vt}`, s.handleHide);
}, _t = (s, t) => {
  const e = [Ot, kt], { element: o } = s;
  st(
    o,
    e[t ? 0 : 1],
    t || ee(o, e[0]) || ""
  ), Nt(o, e[t ? 1 : 0]);
};
class xe extends Vt {
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
    const { element: o } = this, n = this.name === L, a = n ? v : ot, h = n ? L : ve;
    yt = (c) => Ht(c, h), this.enabled = !0, this.id = `${a}-${Xt(o, a)}`;
    const { options: r } = this;
    if (!r.title && n || !n && !r.content)
      return;
    te(Tt, { titleAttr: "" }), St(o, kt) && n && typeof r.title == "string" && _t(this, r.title);
    const p = Te(o), $ = ["sticky", "fixed", "relative"].some(
      (c) => I(p, "position") === c
    ) ? p : oe(o);
    this.container = p, this.offsetParent = $, we(this), this.tooltip && (this._observer = new fe(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return L;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Tt;
  }
  handleFocus = () => se(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: e, element: o, container: n, id: a } = this, { animation: h } = t, r = A.get(o, "out");
    A.clear(o, "out"), e && !r && !z(this) && A.set(
      o,
      () => {
        const p = Q(
          `show.bs.${Y(this.name)}`
        );
        U(o, p), p.defaultPrevented || (ge(e, n), st(o, At, `#${a}`), this.update(), Et(this, !0), q(e, pt) || N(e, pt), h ? ht(e, () => Pt(this)) : Pt(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: e, element: o } = this, { animation: n, delay: a } = t;
    A.clear(o, "in"), e && z(this) && A.set(
      o,
      () => {
        const h = Q(
          `hide.bs.${Y(this.name)}`
        );
        U(o, h), h.defaultPrevented || (this.update(), ie(e, pt), Et(this), n ? ht(e, () => Ct(this)) : Ct(this));
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
    const e = t ? mt : ut, { element: o, options: n, btn: a } = this, { trigger: h } = n, p = !!(this.name !== L && n.dismissible);
    h.includes("manual") || (this.enabled = !!t, h.split(" ").forEach((c) => {
      c === ne ? (e(o, ae, this.handleShow), e(o, le, this.handleShow), p || (e(o, re, this.handleHide), e(
        ft(o),
        Wt,
        this.handleTouch,
        Lt
      ))) : c === dt ? e(o, c, p ? this.handleShow : this.toggle) : c === ce && (e(o, he, this.handleShow), p || e(o, de, this.handleHide), pe() && e(o, dt, this.handleFocus)), p && a && e(a, dt, this.handleHide);
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
  ve as a,
  $e as g,
  ot as p,
  wt as s,
  Tt as t
};
//# sourceMappingURL=tooltip-ClBo4cww.mjs.map
