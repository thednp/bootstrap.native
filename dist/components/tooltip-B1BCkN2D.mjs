var qt = Object.defineProperty;
var Ut = (e, i, o) => i in e ? qt(e, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[i] = o;
var g = (e, i, o) => Ut(e, typeof i != "symbol" ? i + "" : i, o);
import { isRTL as xt, setElementStyle as ht, getDocumentElement as Yt, getElementStyle as it, getBoundingClientRect as Gt, isHTMLElement as x, createCustomEvent as J, toLowerCase as K, dispatchEvent as Q, isString as Jt, isFunction as Kt, isNodeList as Qt, isArray as Vt, isNode as Xt, createElement as q, setAttribute as st, querySelector as et, addClass as W, hasClass as Y, getParentNode as Zt, isShadowRoot as te, isTableElement as ee, getDocument as nt, getInstance as St, getUID as oe, ObjectAssign as ie, hasAttribute as Nt, focus as se, Timer as B, ariaDescribedBy as Lt, emulateTransitionEnd as pt, removeClass as ne, mousehoverEvent as le, mousedownEvent as ae, mouseenterEvent as ce, mouseleaveEvent as re, touchstartEvent as At, passiveHandler as V, mouseclickEvent as mt, focusEvent as de, focusinEvent as he, focusoutEvent as pe, isApple as me, closest as vt, getWindow as Wt, resizeEvent as Bt, scrollEvent as Ot, getAttribute as fe, removeAttribute as Rt } from "@thednp/shorty";
import { addListener as ut, removeListener as gt } from "@thednp/event-listener";
import { d as ue } from "./dataBsToggle-B84TS15h.mjs";
import { s as ft } from "./showClass-C8hdJfjQ.mjs";
import { a as ge, h as ve, m as bt, o as wt, r as be } from "./popupContainer-BitC465I.mjs";
import { f as Et } from "./fadeClass-CLIYI_zn.mjs";
import { B as we } from "./base-component-nXu3wApu.mjs";
const ot = "popover", Dt = "Popover", T = "tooltip", Ee = (e) => {
  const i = e === T, o = i ? `${e}-inner` : `${e}-body`, t = i ? "" : `<h3 class="${e}-header"></h3>`, s = `<div class="${e}-arrow"></div>`, n = `<div class="${o}"></div>`;
  return `<div class="${e}" role="${T}">${t + s + n}</div>`;
}, Mt = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, $t = (e) => {
  const i = /\b(top|bottom|start|end)+/, { element: o, tooltip: t, container: s, options: n, arrow: a } = e;
  // istanbul ignore else @preserve
  if (t) {
    const p = { ...Mt }, f = xt(o);
    ht(t, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const c = e.name === Dt, { offsetWidth: r, offsetHeight: d } = t, { clientWidth: b, clientHeight: w, offsetWidth: R } = Yt(o);
    let { placement: l } = n;
    const { clientWidth: E, offsetWidth: $ } = s, S = it(s, "position") === "fixed", h = Math.abs(S ? E - $ : b - R), N = f && S ? (
      // istanbul ignore next @preserve
      h
    ) : 0, C = b - (f ? 0 : h) - 1, {
      width: u,
      height: v,
      left: m,
      right: jt,
      top: D
    } = Gt(o, !0), { x: X, y: k } = {
      x: m,
      y: D
    };
    ht(a, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let L = 0, F = "", P = 0, at = "", M = "", Z = "", ct = "";
    const A = a.offsetWidth || 0, y = a.offsetHeight || 0, rt = A / 2;
    let I = D - d - y < 0, _ = D + d + v + y >= w, j = m - r - A < N, z = m + r + u + A >= C;
    const tt = ["left", "right"], dt = ["top", "bottom"];
    I = tt.includes(l) ? D + v / 2 - d / 2 - y < 0 : I, _ = tt.includes(l) ? D + d / 2 + v / 2 + y >= w : _, j = dt.includes(l) ? m + u / 2 - r / 2 < N : j, z = dt.includes(l) ? m + r / 2 + u / 2 >= C : z, l = tt.includes(l) && j && z ? "top" : l, l = l === "top" && I ? "bottom" : l, l = l === "bottom" && _ ? "top" : l, l = l === "left" && j ? "right" : l, l = l === "right" && z ? "left" : (
      // istanbul ignore next @preserve
      l
    ), t.className.includes(l) || (t.className = t.className.replace(i, p[l]));
    // istanbul ignore else @preserve
    tt.includes(l) ? (l === "left" ? P = X - r - (c ? A : 0) : P = X + u + (c ? A : 0), I && _ ? (L = 0, F = 0, M = D + v / 2 - y / 2) : I ? (L = k, F = "", M = v / 2 - A) : _ ? (L = k - d + v, F = "", M = d - v / 2 - A) : (L = k - d / 2 + v / 2, M = d / 2 - y / 2)) : dt.includes(l) && (l === "top" ? L = k - d - (c ? y : 0) : L = k + v + (c ? y : 0), j ? (P = 0, Z = X + u / 2 - rt) : z ? (P = "auto", at = 0, ct = u / 2 + C - jt - rt) : (P = X - r / 2 + u / 2, Z = r / 2 - rt)), ht(t, {
      top: `${L}px`,
      bottom: F === "" ? "" : `${F}px`,
      left: P === "auto" ? P : `${P}px`,
      right: at !== "" ? `${at}px` : ""
    });
    // istanbul ignore else @preserve
    x(a) && (M !== "" && (a.style.top = `${M}px`), Z !== "" ? a.style.left = `${Z}px` : ct !== "" && (a.style.right = `${ct}px`));
    const zt = J(
      `updated.bs.${K(e.name)}`
    );
    Q(o, zt);
  }
}, Tt = {
  template: Ee(T),
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
}, kt = "data-original-title", O = "Tooltip", H = (e, i, o) => {
  // istanbul ignore else @preserve
  if (Jt(i) && i.length) {
    let t = i.trim();
    Kt(o) && (t = o(t));
    const n = new DOMParser().parseFromString(t, "text/html");
    e.append(...n.body.childNodes);
  } else x(i) ? e.append(i) : (Qt(i) || Vt(i) && i.every(Xt)) && e.append(...i);
}, $e = (e) => {
  const i = e.name === O, { id: o, element: t, options: s } = e, { title: n, placement: a, template: p, animation: f, customClass: c, sanitizeFn: r, dismissible: d, content: b, btnClose: w } = s, R = i ? T : ot, l = { ...Mt };
  let E = [], $ = [];
  xt(t) && (l.left = "end", l.right = "start");
  const lt = `bs-${R}-${l[a]}`;
  let S;
  if (x(p))
    S = p;
  else {
    const N = q("div");
    H(N, p, r), S = N.firstChild;
  }
  e.tooltip = x(S) ? S.cloneNode(!0) : (
    // istanbul ignore next @preserve
    void 0
  );
  const { tooltip: h } = e;
  // istanbul ignore else @preserve
  if (h) {
    st(h, "id", o), st(h, "role", T);
    const N = i ? `${T}-inner` : `${ot}-body`, C = i ? null : et(`.${ot}-header`, h), u = et(`.${N}`, h);
    e.arrow = et(`.${R}-arrow`, h);
    const { arrow: v } = e;
    if (x(n)) E = [n.cloneNode(!0)];
    else {
      const m = q("div");
      H(m, n, r), E = [...m.childNodes];
    }
    if (x(b)) $ = [b.cloneNode(!0)];
    else {
      const m = q("div");
      H(m, b, r), $ = [...m.childNodes];
    }
    if (d)
      if (n)
        if (x(w))
          E = [...E, w.cloneNode(!0)];
        else {
          const m = q("div");
          H(m, w, r), E = [...E, m.firstChild];
        }
      else {
        // istanbul ignore else @preserve
        if (C && C.remove(), x(w))
          $ = [...$, w.cloneNode(!0)];
        else {
          const m = q("div");
          H(m, w, r), $ = [...$, m.firstChild];
        }
      }
    // istanbul ignore else @preserve
    if (i)
      n && u && H(u, n, r);
    else {
      // istanbul ignore else @preserve
      n && C && H(C, E, r);
      // istanbul ignore else @preserve
      b && u && H(u, $, r), e.btn = et(".btn-close", h) || void 0;
    }
    W(h, "position-fixed"), W(v, "position-absolute");
    // istanbul ignore else @preserve
    Y(h, R) || W(h, R);
    // istanbul ignore else @preserve
    f && !Y(h, Et) && W(h, Et);
    // istanbul ignore else @preserve
    c && !Y(h, c) && W(h, c);
    // istanbul ignore else @preserve
    Y(h, lt) || W(h, lt);
  }
}, Te = (e) => {
  const i = ["HTML", "BODY"], o = [];
  let { parentNode: t } = e;
  for (; t && !i.includes(t.nodeName); ) {
    t = Zt(t);
    // istanbul ignore else @preserve
    te(t) || ee(t) || o.push(t);
  }
  return o.find((s, n) => it(s, "position") !== "relative" && o.slice(n + 1).every((a) => it(a, "position") === "static") ? s : null) || // istanbul ignore next: optional guard
  nt(e).body;
}, Ce = `[${ue}="${T}"],[data-tip="${T}"]`, Ft = "title";
let Ct = (e) => St(e, O);
const Pe = (e) => new G(e), ye = (e) => {
  const { element: i, tooltip: o, container: t, offsetParent: s } = e;
  Rt(i, Lt), be(o, t === s ? t : s);
}, U = (e) => {
  const { tooltip: i, container: o, offsetParent: t } = e;
  return i && ve(i, o === t ? o : t);
}, He = (e, i) => {
  const { element: o } = e;
  e._toggleEventListeners();
  // istanbul ignore else @preserve
  Nt(o, kt) && e.name === O && _t(e);
  // istanbul ignore else @preserve
  i && i();
}, It = (e, i) => {
  const o = i ? ut : gt, { element: t } = e;
  o(nt(t), At, e.handleTouch, V), [Ot, Bt].forEach((s) => {
    o(Wt(t), s, e.update, V);
  });
}, Pt = (e) => {
  const { element: i } = e, o = J(
    `shown.bs.${K(e.name)}`
  );
  It(e, !0), Q(i, o), B.clear(i, "in");
}, yt = (e) => {
  const { element: i } = e, o = J(
    `hidden.bs.${K(e.name)}`
  );
  It(e), ye(e), Q(i, o), B.clear(i, "out");
}, Ht = (e, i) => {
  const o = i ? ut : gt, { element: t, container: s, offsetParent: n } = e, { offsetHeight: a, scrollHeight: p } = s, f = vt(t, `.${bt}`), c = vt(t, `.${wt}`);
  // istanbul ignore else @preserve
  const r = Wt(t), b = s === n && a !== p ? s : r;
  o(b, Bt, e.update, V), o(b, Ot, e.update, V), f && o(f, `hide.bs.${bt}`, e.handleHide), c && o(c, `hide.bs.${wt}`, e.handleHide);
}, _t = (e, i) => {
  const o = [kt, Ft], { element: t } = e;
  st(
    t,
    o[i ? 0 : 1],
    i || fe(t, o[0]) || // istanbul ignore next @preserve
    ""
  ), Rt(t, o[i ? 1 : 0]);
};
class G extends we {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(o, t) {
    super(o, t);
    // TOOLTIP PUBLIC METHODS
    // ======================
    /** Handles the focus event on iOS. */
    // istanbul ignore next @preserve - impossible to test without Apple device
    g(this, "handleFocus", () => se(this.element));
    /** Shows the tooltip. */
    g(this, "handleShow", () => this.show());
    /** Hides the tooltip. */
    g(this, "handleHide", () => this.hide());
    /** Updates the tooltip position. */
    g(this, "update", () => {
      $t(this);
    });
    /** Toggles the tooltip visibility. */
    g(this, "toggle", () => {
      const { tooltip: o } = this;
      o && !U(this) ? this.show() : this.hide();
    });
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    g(this, "handleTouch", ({ target: o }) => {
      const { tooltip: t, element: s } = this;
      // istanbul ignore if @preserve
      t && t.contains(o) || o === s || o && s.contains(o) || this.hide();
    });
    /**
     * Toggles on/off the `Tooltip` event listeners.
     *
     * @param add when `true`, event listeners are added
     */
    g(this, "_toggleEventListeners", (o) => {
      const t = o ? ut : gt, { element: s, options: n, btn: a } = this, { trigger: p } = n, c = !!(this.name !== O && n.dismissible);
      // istanbul ignore else @preserve
      p.includes("manual") || (this.enabled = !!o, p.split(" ").forEach((d) => {
        // istanbul ignore else @preserve
        if (d === le) {
          t(s, ae, this.handleShow), t(s, ce, this.handleShow);
          // istanbul ignore else @preserve
          c || (t(s, re, this.handleHide), t(nt(s), At, this.handleTouch, V));
        } else if (d === mt)
          t(s, d, c ? this.handleShow : this.toggle);
        else if (d === de) {
          t(s, he, this.handleShow);
          // istanbul ignore else @preserve
          c || t(s, pe, this.handleHide);
          // istanbul ignore else @preserve
          me && t(s, mt, this.handleFocus);
        }
        // istanbul ignore else @preserve
        c && a && t(a, mt, this.handleHide);
      }));
    });
    const { element: s } = this, n = this.name === O, a = n ? T : ot, p = n ? O : Dt;
    // istanbul ignore next @preserve: this is to set Popover too
    Ct = (c) => St(c, p), this.enabled = !0, this.id = `${a}-${oe(s, a)}`;
    const { options: f } = this;
    if (!(!f.title && n || !n && !f.content)) {
      ie(Tt, { titleAttr: "" });
      // istanbul ignore else @preserve
      Nt(s, Ft) && n && typeof f.title == "string" && _t(this, f.title), this.container = Te(s), this.offsetParent = ["sticky", "fixed"].some(
        (c) => it(this.container, "position") === c
      ) ? this.container : nt(this.element).body, $e(this), this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return O;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Tt;
  }
  show() {
    const { options: o, tooltip: t, element: s, container: n, offsetParent: a, id: p } = this, { animation: f } = o, c = B.get(s, "out"), r = n === a ? n : a;
    B.clear(s, "out"), t && !c && !U(this) && B.set(
      s,
      () => {
        const d = J(
          `show.bs.${K(this.name)}`
        );
        Q(s, d);
        // istanbul ignore else @preserve
        if (!d.defaultPrevented) {
          ge(t, r), st(s, Lt, `#${p}`), this.update(), Ht(this, !0);
          // istanbul ignore else @preserve
          Y(t, ft) || W(t, ft);
          // istanbul ignore else @preserve
          f ? pt(t, () => Pt(this)) : Pt(this);
        }
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: o, tooltip: t, element: s } = this, { animation: n, delay: a } = o;
    B.clear(s, "in");
    // istanbul ignore else @preserve
    t && U(this) && B.set(
      s,
      () => {
        const p = J(
          `hide.bs.${K(this.name)}`
        );
        Q(s, p);
        // istanbul ignore else @preserve
        if (!p.defaultPrevented) {
          this.update(), ne(t, ft), Ht(this);
          // istanbul ignore else @preserve
          n ? pt(t, () => yt(this)) : yt(this);
        }
      },
      a + 17,
      "out"
    );
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: o } = this;
    // istanbul ignore else @preserve
    o || (this._toggleEventListeners(!0), this.enabled = !o);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: o, enabled: t } = this;
    // istanbul ignore else @preserve
    t && (o && U(this) && this.hide(), this._toggleEventListeners(), this.enabled = !t);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: o, options: t } = this, s = { ...this, name: this.name }, n = () => setTimeout(() => He(s, () => super.dispose()), 17);
    t.animation && U(s) ? (this.options.delay = 0, this.hide(), pt(o, n)) : n();
  }
}
g(G, "selector", Ce), g(G, "init", Pe), g(G, "getInstance", Ct), g(G, "styleTip", $t);
export {
  G as T,
  ot as a,
  Ee as g,
  Dt as p,
  $t as s,
  Tt as t
};
//# sourceMappingURL=tooltip-B1BCkN2D.mjs.map
