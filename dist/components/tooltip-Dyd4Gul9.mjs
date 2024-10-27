var It = Object.defineProperty;
var jt = (e, i, o) => i in e ? It(e, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[i] = o;
var g = (e, i, o) => jt(e, typeof i != "symbol" ? i + "" : i, o);
import { isRTL as xt, setElementStyle as dt, getDocumentElement as zt, getElementStyle as ot, getBoundingClientRect as qt, isHTMLElement as x, createCustomEvent as J, toLowerCase as K, dispatchEvent as Q, isString as Ut, isFunction as Yt, isNodeList as Gt, isArray as Jt, isNode as Kt, createElement as q, setAttribute as it, querySelector as tt, addClass as B, hasClass as Y, getParentNode as Qt, isShadowRoot as Vt, isTableElement as Xt, getDocument as st, getInstance as Ht, getUID as Zt, ObjectAssign as te, hasAttribute as St, focus as ee, Timer as W, ariaDescribedBy as Nt, emulateTransitionEnd as ht, removeClass as oe, mousehoverEvent as ie, mousedownEvent as se, mouseenterEvent as ne, mouseleaveEvent as le, touchstartEvent as Lt, passiveHandler as At, mouseclickEvent as pt, focusEvent as ae, focusinEvent as re, focusoutEvent as ce, isApple as de, closest as gt, getAttribute as he, removeAttribute as Bt } from "@thednp/shorty";
import { addListener as ft, removeListener as ut } from "@thednp/event-listener";
import { D as pe } from "./index-CmM9Kopf.mjs";
import { d as me } from "./dataBsToggle-B84TS15h.mjs";
import { s as mt } from "./showClass-C8hdJfjQ.mjs";
import { a as fe, h as ue, m as bt, o as vt, r as ge } from "./popupContainer-BitC465I.mjs";
import { f as $t } from "./fadeClass-CLIYI_zn.mjs";
import { B as be } from "./base-component-DHbs0JQk.mjs";
const et = "popover", Wt = "Popover", E = "tooltip", ve = (e) => {
  const i = e === E, o = i ? `${e}-inner` : `${e}-body`, t = i ? "" : `<h3 class="${e}-header"></h3>`, s = `<div class="${e}-arrow"></div>`, n = `<div class="${o}"></div>`;
  return `<div class="${e}" role="${E}">${t + s + n}</div>`;
}, Dt = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, wt = (e) => {
  const i = /\b(top|bottom|start|end)+/, { element: o, tooltip: t, container: s, options: n, arrow: a } = e;
  // istanbul ignore else @preserve
  if (t) {
    const m = { ...Dt }, f = xt(o);
    dt(t, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const r = e.name === Wt, { offsetWidth: c, offsetHeight: d } = t, { clientWidth: H, clientHeight: v, offsetWidth: O } = zt(o);
    let { placement: l } = n;
    const { clientWidth: $, offsetWidth: w } = s, S = ot(
      s,
      "position"
    ) === "fixed", h = Math.abs(S ? $ - w : H - O), N = f && S ? h : 0, T = H - (f ? 0 : h) - 1, {
      width: u,
      height: b,
      left: p,
      right: kt,
      top: R
    } = qt(o, !0), { x: V, y: M } = {
      x: p,
      y: R
    };
    dt(a, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let L = 0, k = "", C = 0, lt = "", _ = "", X = "", at = "";
    const A = a.offsetWidth || 0, P = a.offsetHeight || 0, rt = A / 2;
    let F = R - d - P < 0, I = R + d + b + P >= v, j = p - c - A < N, z = p + c + u + A >= T;
    const Z = ["left", "right"], ct = ["top", "bottom"];
    F = Z.includes(l) ? R + b / 2 - d / 2 - P < 0 : F, I = Z.includes(l) ? R + d / 2 + b / 2 + P >= v : I, j = ct.includes(l) ? p + u / 2 - c / 2 < N : j, z = ct.includes(l) ? p + c / 2 + u / 2 >= T : z, l = Z.includes(l) && j && z ? "top" : l, l = l === "top" && F ? "bottom" : l, l = l === "bottom" && I ? "top" : l, l = l === "left" && j ? "right" : l, l = l === "right" && z ? "left" : l, t.className.includes(l) || (t.className = t.className.replace(
      i,
      m[l]
    ));
    // istanbul ignore else @preserve
    Z.includes(l) ? (l === "left" ? C = V - c - (r ? A : 0) : C = V + u + (r ? A : 0), F && I ? (L = 0, k = 0, _ = R + b / 2 - P / 2) : F ? (L = M, k = "", _ = b / 2 - A) : I ? (L = M - d + b, k = "", _ = d - b / 2 - A) : (L = M - d / 2 + b / 2, _ = d / 2 - P / 2)) : ct.includes(l) && (l === "top" ? L = M - d - (r ? P : 0) : L = M + b + (r ? P : 0), j ? (C = 0, X = V + u / 2 - rt) : z ? (C = "auto", lt = 0, at = u / 2 + T - kt - rt) : (C = V - c / 2 + u / 2, X = c / 2 - rt)), dt(t, {
      top: `${L}px`,
      bottom: k === "" ? "" : `${k}px`,
      left: C === "auto" ? C : `${C}px`,
      right: lt !== "" ? `${lt}px` : ""
    });
    // istanbul ignore else @preserve
    x(a) && (_ !== "" && (a.style.top = `${_}px`), X !== "" ? a.style.left = `${X}px` : at !== "" && (a.style.right = `${at}px`));
    const Ft = J(
      `updated.bs.${K(e.name)}`
    );
    Q(o, Ft);
  }
}, Et = {
  template: ve(E),
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
}, Ot = "data-original-title", D = "Tooltip", y = (e, i, o) => {
  // istanbul ignore else @preserve
  if (Ut(i) && i.length) {
    let t = i.trim();
    Yt(o) && (t = o(t));
    const n = new DOMParser().parseFromString(t, "text/html");
    e.append(...n.body.childNodes);
  } else x(i) ? e.append(i) : (Gt(i) || Jt(i) && i.every(Kt)) && e.append(...i);
}, $e = (e) => {
  const i = e.name === D, { id: o, element: t, options: s } = e, {
    title: n,
    placement: a,
    template: m,
    animation: f,
    customClass: r,
    sanitizeFn: c,
    dismissible: d,
    content: H,
    btnClose: v
  } = s, O = i ? E : et, l = { ...Dt };
  let $ = [], w = [];
  xt(t) && (l.left = "end", l.right = "start");
  const nt = `bs-${O}-${l[a]}`;
  let S;
  if (x(m))
    S = m;
  else {
    const N = q("div");
    y(N, m, c), S = N.firstChild;
  }
  e.tooltip = x(S) ? S.cloneNode(!0) : void 0;
  const { tooltip: h } = e;
  // istanbul ignore else @preserve
  if (h) {
    it(h, "id", o), it(h, "role", E);
    const N = i ? `${E}-inner` : `${et}-body`, T = i ? null : tt(`.${et}-header`, h), u = tt(`.${N}`, h);
    e.arrow = tt(`.${O}-arrow`, h);
    const { arrow: b } = e;
    if (x(n)) $ = [n.cloneNode(!0)];
    else {
      const p = q("div");
      y(p, n, c), $ = [...p.childNodes];
    }
    if (x(H)) w = [H.cloneNode(!0)];
    else {
      const p = q("div");
      y(p, H, c), w = [...p.childNodes];
    }
    if (d)
      if (n)
        if (x(v))
          $ = [...$, v.cloneNode(!0)];
        else {
          const p = q("div");
          y(p, v, c), $ = [...$, p.firstChild];
        }
      else {
        // istanbul ignore else @preserve
        if (T && T.remove(), x(v))
          w = [...w, v.cloneNode(!0)];
        else {
          const p = q("div");
          y(p, v, c), w = [...w, p.firstChild];
        }
      }
    // istanbul ignore else @preserve
    if (i)
      n && u && y(u, n, c);
    else {
      // istanbul ignore else @preserve
      n && T && y(T, $, c);
      // istanbul ignore else @preserve
      H && u && y(u, w, c), e.btn = tt(".btn-close", h) || void 0;
    }
    B(h, "position-fixed"), B(b, "position-absolute");
    // istanbul ignore else @preserve
    Y(h, O) || B(h, O);
    // istanbul ignore else @preserve
    f && !Y(h, $t) && B(h, $t);
    // istanbul ignore else @preserve
    r && !Y(h, r) && B(h, r);
    // istanbul ignore else @preserve
    Y(h, nt) || B(h, nt);
  }
}, we = (e) => {
  const i = ["HTML", "BODY"], o = [];
  let { parentNode: t } = e;
  for (; t && !i.includes(t.nodeName); ) {
    t = Qt(t);
    // istanbul ignore else @preserve
    Vt(t) || Xt(t) || o.push(t);
  }
  return o.find((s, n) => ot(s, "position") !== "relative" && o.slice(n + 1).every(
    (a) => ot(a, "position") === "static"
  ) ? s : null) || // istanbul ignore next: optional guard
  st(e).body;
}, Ee = `[${me}="${E}"],[data-tip="${E}"]`, Rt = "title";
let Tt = (e) => Ht(e, D);
const Te = (e) => new G(e), Ce = (e) => {
  const { element: i, tooltip: o, container: t, offsetParent: s } = e;
  Bt(i, Nt), ge(
    o,
    t === s ? t : s
  );
}, U = (e) => {
  const { tooltip: i, container: o, offsetParent: t } = e;
  return i && ue(i, o === t ? o : t);
}, Pe = (e, i) => {
  const { element: o } = e;
  e._toggleEventListeners();
  // istanbul ignore else @preserve
  St(o, Ot) && e.name === D && Mt(e);
  // istanbul ignore else @preserve
  i && i();
}, _t = (e, i) => {
  const o = i ? ft : ut, { element: t } = e;
  o(
    st(t),
    Lt,
    e.handleTouch,
    At
  );
}, Ct = (e) => {
  const { element: i } = e, o = J(
    `shown.bs.${K(e.name)}`
  );
  _t(e, !0), Q(i, o), W.clear(i, "in");
}, Pt = (e) => {
  const { element: i } = e, o = J(
    `hidden.bs.${K(e.name)}`
  );
  _t(e), Ce(e), Q(i, o), W.clear(i, "out");
}, yt = (e, i) => {
  const o = i ? ft : ut, { element: t } = e, s = gt(t, `.${bt}`), n = gt(t, `.${vt}`);
  i ? e._observer.observe(e.element) : e._observer.disconnect(), s && o(s, `hide.bs.${bt}`, e.handleHide), n && o(n, `hide.bs.${vt}`, e.handleHide);
}, Mt = (e, i) => {
  const o = [Ot, Rt], { element: t } = e;
  it(
    t,
    o[i ? 0 : 1],
    i || he(t, o[0]) || // istanbul ignore next @preserve
    ""
  ), Bt(t, o[i ? 1 : 0]);
};
class G extends be {
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
    g(this, "handleFocus", () => ee(this.element));
    /** Shows the tooltip. */
    g(this, "handleShow", () => this.show());
    /** Hides the tooltip. */
    g(this, "handleHide", () => this.hide());
    /** Updates the tooltip position. */
    g(this, "update", () => {
      wt(this);
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
      const t = o ? ft : ut, { element: s, options: n, btn: a } = this, { trigger: m } = n, r = !!(this.name !== D && n.dismissible);
      // istanbul ignore else @preserve
      m.includes("manual") || (this.enabled = !!o, m.split(" ").forEach((d) => {
        // istanbul ignore else @preserve
        if (d === ie) {
          t(s, se, this.handleShow), t(s, ne, this.handleShow);
          // istanbul ignore else @preserve
          r || (t(s, le, this.handleHide), t(
            st(s),
            Lt,
            this.handleTouch,
            At
          ));
        } else if (d === pt)
          t(s, d, r ? this.handleShow : this.toggle);
        else if (d === ae) {
          t(s, re, this.handleShow);
          // istanbul ignore else @preserve
          r || t(s, ce, this.handleHide);
          // istanbul ignore else @preserve
          de && t(s, pt, this.handleFocus);
        }
        // istanbul ignore else @preserve
        r && a && t(a, pt, this.handleHide);
      }));
    });
    const { element: s } = this, n = this.name === D, a = n ? E : et, m = n ? D : Wt;
    // istanbul ignore next @preserve: this is to set Popover too
    Tt = (r) => Ht(r, m), this.enabled = !0, this.id = `${a}-${Zt(s, a)}`;
    const { options: f } = this;
    if (!(!f.title && n || !n && !f.content)) {
      te(Et, { titleAttr: "" });
      // istanbul ignore else @preserve
      St(s, Rt) && n && typeof f.title == "string" && Mt(this, f.title), this.container = we(s), this.offsetParent = ["sticky", "fixed"].some(
        (r) => ot(this.container, "position") === r
      ) ? this.container : st(this.element).body, $e(this), this._observer = new pe(() => this.update()), this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return D;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Et;
  }
  show() {
    const { options: o, tooltip: t, element: s, container: n, offsetParent: a, id: m } = this, { animation: f } = o, r = W.get(s, "out"), c = n === a ? n : a;
    W.clear(s, "out"), t && !r && !U(this) && W.set(
      s,
      () => {
        const d = J(
          `show.bs.${K(this.name)}`
        );
        Q(s, d);
        // istanbul ignore else @preserve
        if (!d.defaultPrevented) {
          fe(t, c), it(s, Nt, `#${m}`), this.update(), yt(this, !0);
          // istanbul ignore else @preserve
          Y(t, mt) || B(t, mt);
          // istanbul ignore else @preserve
          f ? ht(t, () => Ct(this)) : Ct(this);
        }
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: o, tooltip: t, element: s } = this, { animation: n, delay: a } = o;
    W.clear(s, "in");
    // istanbul ignore else @preserve
    t && U(this) && W.set(
      s,
      () => {
        const m = J(
          `hide.bs.${K(this.name)}`
        );
        Q(s, m);
        // istanbul ignore else @preserve
        if (!m.defaultPrevented) {
          this.update(), oe(t, mt), yt(this);
          // istanbul ignore else @preserve
          n ? ht(t, () => Pt(this)) : Pt(this);
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
    const { tooltip: o, options: t } = this, s = { ...this, name: this.name }, n = () => setTimeout(
      () => Pe(s, () => super.dispose()),
      17
    );
    t.animation && U(s) ? (this.options.delay = 0, this.hide(), ht(o, n)) : n();
  }
}
g(G, "selector", Ee), g(G, "init", Te), g(G, "getInstance", Tt), g(G, "styleTip", wt);
export {
  G as T,
  et as a,
  ve as g,
  Wt as p,
  wt as s,
  Et as t
};
//# sourceMappingURL=tooltip-Dyd4Gul9.mjs.map
