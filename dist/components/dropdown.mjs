import { D as B, M as Q, b as I, B as Dt, j as it, d as f, f as V, s as X, N as P, r as Y, g as Ct, c as h, P as yt, i as At, h as q, K as S, Q as $t, R as xt, O as G, l as O, L as J, m as _, S as at, C as St, U as Tt, u as Ht, V as It, W as k, X as L, Y as Pt } from "./base-component-ylZzLp-h.mjs";
import { E as dt, r as ct } from "./event-listener-C1-Yf9Z5.mjs";
import { s as m } from "./showClass-C8hdJfjQ.mjs";
import { d as lt } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
const pt = "Dropdown", ut = "dropdown-menu", ft = (n) => {
  const t = B(n, "A");
  return n.tagName === "A" && // anchor href starts with #
  Q(n, "href") && I(n, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  t && Q(t, "href") && I(t, "href").slice(-1) === "#";
}, [p, M, N, j] = D, mt = `[${lt}="${p}"]`, u = (n) => Ct(n, pt), kt = (n) => new Ft(n), Lt = `${ut}-end`, Z = [p, M], tt = [N, j], et = ["A", "BUTTON"], Mt = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, T = h(
  `show.bs.${p}`
), nt = h(
  `shown.bs.${p}`
), H = h(
  `hide.bs.${p}`
), ot = h(`hidden.bs.${p}`), ht = h(`updated.bs.${p}`), gt = (n) => {
  const { element: t, menu: e, parentElement: r, options: s } = n, { offset: o } = s;
  if (yt(e, "position") !== "static") {
    const i = At(t), a = q(e, Lt);
    ["margin", "top", "bottom", "left", "right"].forEach((c) => {
      const z = {};
      z[c] = "", S(e, z);
    });
    let d = D.find(
      (c) => q(r, c)
    ) || // istanbul ignore next @preserve: fallback position
    p;
    const Et = {
      dropdown: [o, 0, 0],
      dropup: [0, 0, o],
      dropstart: i ? [-1, 0, 0, o] : [-1, o, 0],
      dropend: i ? [-1, o, 0] : [-1, 0, 0, o]
    }, g = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: i ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: i ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: i ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: i ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: E, offsetHeight: y } = e, { clientWidth: F, clientHeight: W } = $t(t), {
      left: w,
      top: A,
      width: R,
      height: wt
    } = xt(t), $ = w - E - o < 0, x = w + E + R + o >= F, vt = A + y + o >= W, U = A + y + wt + o >= W, K = A - y - o < 0, v = (!i && a || i && !a) && w + R - E < 0, b = (i && a || !i && !a) && w + E >= F;
    if (tt.includes(d) && $ && x && (d = p), d === N && (i ? x : $) && (d = j), d === j && (i ? $ : x) && (d = N), d === M && K && !U && (d = p), d === p && U && !K && (d = M), tt.includes(d) && vt && G(g[d], {
      top: "auto",
      bottom: 0
    }), Z.includes(d) && (v || b)) {
      let c = { left: "auto", right: "auto" };
      !v && b && !i && (c = { left: "auto", right: 0 }), v && !b && i && (c = { left: 0, right: "auto" }), c && G(g[d], c);
    }
    const bt = Et[d];
    S(e, {
      ...g[d],
      margin: `${bt.map((c) => c && `${c}px`).join(" ")}`
    }), Z.includes(d) && a && a && S(e, g[!i && v || i && b ? "menuStart" : "menuEnd"]), f(r, ht);
  }
}, Nt = (n) => [...n.children].map((t) => {
  if (t && et.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && et.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: r } = n, s = n.open ? dt : ct, o = O(t);
  s(o, _, rt), s(o, at, rt), s(o, St, Bt), s(o, Tt, Ot), e.display === "dynamic" && (n.open ? n._observer.observe(r) : n._observer.disconnect());
}, C = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => it(`${e} ${m}`, O(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((r) => r === I(e, lt))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (t && Ht(t)) {
    const r = C(t), s = r && u(r);
    if (s) {
      const { parentElement: o, menu: i } = s, a = o && o.contains(t) && (t.tagName === "form" || B(t, "form") !== null);
      [_, It].includes(e) && ft(t) && n.preventDefault(), !a && e !== at && t !== r && t !== i && s.hide();
    }
  }
}, jt = (n) => {
  const { target: t } = n, e = t && B(t, mt), r = e && u(e);
  r && (n.stopPropagation(), r.toggle(), e && ft(e) && n.preventDefault());
}, Bt = (n) => {
  [k, L].includes(n.code) && n.preventDefault();
};
function Ot(n) {
  const { code: t } = n, e = C(this), r = e && u(e), { activeElement: s } = e && O(e);
  if (r && s) {
    const { menu: o, open: i } = r, a = Nt(o);
    if (a && a.length && [k, L].includes(t)) {
      let l = a.indexOf(s);
      s === e ? l = 0 : t === L ? l = l > 1 ? l - 1 : 0 : t === k && (l = l < a.length - 1 ? l + 1 : l), a[l] && P(a[l]);
    }
    Pt === t && i && (r.toggle(), P(e));
  }
}
function _t(n) {
  const t = C(n), e = t && u(t);
  e && e.open && gt(e);
}
class Ft extends Dt {
  static selector = mt;
  static init = kt;
  static getInstance = u;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, e) {
    super(t, e);
    const { parentElement: r } = this.element, [s] = it(
      ut,
      r
    );
    s && (this.parentElement = r, this.menu = s, this._observer = new IntersectionObserver(
      ([o]) => _t(o.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return pt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Mt;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: t, open: e, menu: r, parentElement: s } = this;
    if (!e) {
      const o = C(t), i = o && u(o);
      i && i.hide(), [T, nt, ht].forEach(
        (a) => {
          a.relatedTarget = t;
        }
      ), f(s, T), T.defaultPrevented || (V(r, m), V(s, m), X(t, J, "true"), gt(this), this.open = !e, P(t), st(this), f(s, nt));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: t, open: e, menu: r, parentElement: s } = this;
    e && ([H, ot].forEach((o) => {
      o.relatedTarget = t;
    }), f(s, H), H.defaultPrevented || (Y(r, m), Y(s, m), X(t, J, "false"), this.open = !e, st(this), f(s, ot)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    (t ? dt : ct)(this.element, _, jt);
  };
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  Ft as default
};
//# sourceMappingURL=dropdown.mjs.map
