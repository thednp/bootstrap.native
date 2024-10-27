var Dt = Object.defineProperty;
var At = (n, e, t) => e in n ? Dt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var f = (n, e, t) => At(n, typeof e != "symbol" ? e + "" : e, t);
import { closest as F, hasAttribute as J, getAttribute as k, createCustomEvent as g, getElementsByClassName as ct, dispatchEvent as m, addClass as Q, setAttribute as V, ariaExpanded as X, focus as P, removeClass as Y, mouseclickEvent as O, getInstance as $t, getElementStyle as xt, isRTL as St, hasClass as Z, setElementStyle as H, getDocumentElement as Tt, getBoundingClientRect as Ht, ObjectAssign as tt, getDocument as W, focusEvent as lt, keydownEvent as It, keyupEvent as Lt, isHTMLElement as kt, mousedownEvent as Pt, keyArrowDown as B, keyArrowUp as M, keyEscape as Bt } from "@thednp/shorty";
import { addListener as at, removeListener as pt } from "@thednp/event-listener";
import { s as h } from "./showClass-C8hdJfjQ.mjs";
import { d as ut } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
import { B as Mt } from "./base-component-DHbs0JQk.mjs";
const ft = "Dropdown", mt = "dropdown-menu", ht = (n) => {
  const e = F(n, "A");
  return n.tagName === "A" && // anchor href starts with #
  J(n, "href") && k(n, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  e && J(e, "href") && k(e, "href").slice(-1) === "#";
}, [p, N, _, j] = D, gt = `[${ut}="${p}"]`, u = (n) => $t(n, ft), Nt = (n) => new y(n), _t = `${mt}-end`, et = [p, N], nt = [_, j], ot = ["A", "BUTTON"], jt = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, I = g(
  `show.bs.${p}`
), st = g(
  `shown.bs.${p}`
), L = g(
  `hide.bs.${p}`
), rt = g(`hidden.bs.${p}`), Et = g(`updated.bs.${p}`), wt = (n) => {
  const { element: e, menu: t, parentElement: r, options: i } = n, { offset: o } = i;
  // istanbul ignore else @preserve: this test requires a navbar
  if (xt(t, "position") !== "static") {
    const s = St(e), d = Z(t, _t);
    ["margin", "top", "bottom", "left", "right"].forEach((a) => {
      const G = {};
      G[a] = "", H(t, G);
    });
    let c = D.find(
      (a) => Z(r, a)
    ) || // istanbul ignore next @preserve: fallback position
    p;
    const vt = {
      dropdown: [o, 0, 0],
      dropup: [0, 0, o],
      dropstart: s ? [-1, 0, 0, o] : [-1, o, 0],
      dropend: s ? [-1, o, 0] : [-1, 0, 0, o]
    }, E = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: s ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: s ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: s ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: s ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: w, offsetHeight: $ } = t, { clientWidth: R, clientHeight: U } = Tt(e), {
      left: v,
      top: x,
      width: z,
      height: bt
    } = Ht(e), S = v - w - o < 0, T = v + w + z + o >= R, Ct = x + $ + o >= U, K = x + $ + bt + o >= U, q = x - $ - o < 0, b = (!s && d || s && !d) && v + z - w < 0, C = (s && d || !s && !d) && v + w >= R;
    if (nt.includes(c) && S && T && (c = p), c === _ && (s ? T : S) && (c = j), c === j && (s ? S : T) && (c = _), c === N && q && !K && (c = p), c === p && K && !q && (c = N), nt.includes(c) && Ct && tt(E[c], {
      top: "auto",
      bottom: 0
    }), et.includes(c) && (b || C)) {
      let a = { left: "auto", right: "auto" };
      // istanbul ignore else @preserve
      !b && C && !s && (a = { left: "auto", right: 0 });
      // istanbul ignore else @preserve
      b && !C && s && (a = { left: 0, right: "auto" });
      // istanbul ignore else @preserve
      a && tt(E[c], a);
    }
    const yt = vt[c];
    if (H(t, {
      ...E[c],
      margin: `${yt.map((a) => a && `${a}px`).join(" ")}`
    }), et.includes(c) && d) {
      // istanbul ignore else @preserve
      d && H(t, E[!s && b || s && C ? "menuStart" : "menuEnd"]);
    }
    m(r, Et);
  }
}, Ft = (n) => [...n.children].map((e) => {
  if (e && ot.includes(e.tagName)) return e;
  const { firstElementChild: t } = e;
  return t && ot.includes(t.tagName) ? t : null;
}).filter((e) => e), it = (n) => {
  const { element: e, options: t, menu: r } = n, i = n.open ? at : pt, o = W(e);
  i(o, O, dt), i(o, lt, dt), i(o, It, Wt), i(o, Lt, Rt);
  // istanbul ignore else @preserve
  t.display === "dynamic" && (n.open ? n._observer.observe(r) : n._observer.disconnect());
}, A = (n) => {
  const e = [...D, "btn-group", "input-group"].map(
    (t) => ct(`${t} ${h}`, W(n))
  ).find((t) => t.length);
  if (e && e.length)
    return [...e[0].children].find(
      (t) => D.some((r) => r === k(t, ut))
    );
}, dt = (n) => {
  const { target: e, type: t } = n;
  // istanbul ignore else @preserve
  if (e && kt(e)) {
    const r = A(e), i = r && u(r);
    // istanbul ignore else @preserve
    if (i) {
      const { parentElement: o, menu: s } = i, d = o && o.contains(e) && (e.tagName === "form" || F(e, "form") !== null);
      [O, Pt].includes(t) && ht(e) && n.preventDefault();
      // istanbul ignore else @preserve
      !d && t !== lt && e !== r && e !== s && i.hide();
    }
  }
}, Ot = (n) => {
  const { target: e } = n, t = e && F(e, gt), r = t && u(t);
  // istanbul ignore else @preserve
  if (r) {
    n.stopPropagation(), r.toggle();
    // istanbul ignore else @preserve
    t && ht(t) && n.preventDefault();
  }
}, Wt = (n) => {
  // istanbul ignore else @preserve
  [B, M].includes(n.code) && n.preventDefault();
};
function Rt(n) {
  const { code: e } = n, t = A(this), r = t && u(t), { activeElement: i } = t && W(t);
  // istanbul ignore else @preserve
  if (r && i) {
    const { menu: o, open: s } = r, d = Ft(o);
    if (d && d.length && [B, M].includes(e)) {
      let l = d.indexOf(i);
      // istanbul ignore else @preserve
      i === t ? l = 0 : e === M ? l = l > 1 ? l - 1 : 0 : e === B && (l = l < d.length - 1 ? l + 1 : l);
      // istanbul ignore else @preserve
      d[l] && P(d[l]);
    }
    Bt === e && s && (r.toggle(), P(t));
  }
}
function Ut(n) {
  const e = A(n), t = e && u(e);
  // istanbul ignore else @preserve
  t && t.open && wt(t);
}
class y extends Mt {
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, r) {
    super(t, r);
    /**
     * Toggles on/off the `click` event listener of the `Dropdown`.
     *
     * @param add when `true`, it will add the event listener
     */
    f(this, "_toggleEventListeners", (t) => {
      (t ? at : pt)(this.element, O, Ot);
    });
    const { parentElement: i } = this.element, [o] = ct(
      mt,
      i
    );
    o && (this.parentElement = i, this.menu = o, this._observer = new IntersectionObserver(
      ([s]) => Ut(s.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ft;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return jt;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: t, open: r, menu: i, parentElement: o } = this;
    // istanbul ignore else @preserve
    if (!r) {
      const s = A(t), d = s && u(s);
      d && d.hide(), [I, st, Et].forEach(
        (l) => {
          l.relatedTarget = t;
        }
      ), m(o, I), I.defaultPrevented || (Q(i, h), Q(o, h), V(t, X, "true"), wt(this), this.open = !r, P(t), it(this), m(o, st));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: t, open: r, menu: i, parentElement: o } = this;
    // istanbul ignore else @preserve
    r && ([L, rt].forEach((s) => {
      s.relatedTarget = t;
    }), m(o, L), L.defaultPrevented || (Y(i, h), Y(o, h), V(t, X, "false"), this.open = !r, it(this), m(o, rt)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
f(y, "selector", gt), f(y, "init", Nt), f(y, "getInstance", u);
export {
  y as default
};
//# sourceMappingURL=dropdown.mjs.map
