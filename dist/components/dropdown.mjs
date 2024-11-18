import { k as it, J as K, l as T, B as bt, t as Dt, G as dt, K as Ct, U as $t, Z as Q, F as A, S as xt, L as yt, N as Y, q as u, m, d as N, b as Z, Q as z, H as J, M as H, E as at, r as ct, x as At, v as j, P as Pt, T as lt, V as _, W as F, p as St, X as Tt, _ as Ht, Y as R } from "./base-component-CQAH5ZXF.mjs";
import { v as _t } from "./index-DXF8ibvt.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as pt } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
import { i as Ft } from "./isDisabled-bThyhy2g.mjs";
const ut = "Dropdown", ft = "dropdown-menu", ht = (n) => {
  const t = it(n, "A");
  return n.tagName === "A" && K(n, "href") && T(n, "href")?.slice(-1) === "#" || t && K(t, "href") && T(t, "href")?.slice(-1) === "#";
}, [p, I, L, M] = D, It = `[${pt}="${p}"]`, h = (n) => Dt(n, ut), Lt = (n) => new Ot(n), Mt = `${ft}-end`, V = [p, I], X = [L, M], tt = ["A", "BUTTON"], Nt = {
  offset: 5,
  display: "dynamic"
}, P = m(
  `show.bs.${p}`
), et = m(
  `shown.bs.${p}`
), S = m(
  `hide.bs.${p}`
), nt = m(`hidden.bs.${p}`), mt = m(`updated.bs.${p}`), ot = (n) => {
  const { element: t, menu: e, parentElement: i, options: s } = n, { offset: o } = s;
  if (Ct(e, "position") !== "static") {
    const r = $t(t), d = Q(e, Mt);
    ["margin", "top", "bottom", "left", "right"].forEach((c) => {
      const G = {};
      G[c] = "", A(e, G);
    });
    let a = D.find(
      (c) => Q(i, c)
    ) || p;
    const gt = {
      dropdown: [o, 0, 0],
      dropup: [0, 0, o],
      dropstart: r ? [-1, 0, 0, o] : [-1, o, 0],
      dropend: r ? [-1, o, 0] : [-1, 0, 0, o]
    }, g = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: w, offsetHeight: C } = e, { clientWidth: k, clientHeight: B } = xt(t), {
      left: E,
      top: $,
      width: O,
      height: wt
    } = yt(t), x = E - w - o < 0, y = E + w + O + o >= k, Et = $ + C + o >= B, U = $ + C + wt + o >= B, q = $ - C - o < 0, v = (!r && d || r && !d) && E + O - w < 0, b = (r && d || !r && !d) && E + w >= k;
    if (X.includes(a) && x && y && (a = p), a === L && (r ? y : x) && (a = M), a === M && (r ? x : y) && (a = L), a === I && q && !U && (a = p), a === p && U && !q && (a = I), X.includes(a) && Et && Y(g[a], {
      top: "auto",
      bottom: 0
    }), V.includes(a) && (v || b)) {
      let c = { left: "auto", right: "auto" };
      !v && b && !r && (c = { left: "auto", right: 0 }), v && !b && r && (c = { left: 0, right: "auto" }), c && Y(g[a], c);
    }
    const vt = gt[a];
    A(e, {
      ...g[a],
      margin: `${vt.map((c) => c && `${c}px`).join(" ")}`
    }), V.includes(a) && d && d && A(e, g[!r && v || r && b ? "menuStart" : "menuEnd"]), u(i, mt);
  }
}, jt = (n) => Array.from(n.children).map((t) => {
  if (t && tt.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && tt.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: i } = n, s = n.open ? at : ct, o = N(t);
  s(o, j, rt), s(o, lt, rt), s(o, St, kt), s(o, Ht, Bt), e.display === "dynamic" && (n.open ? n._observer.observe(i) : n._observer.disconnect());
}, W = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => dt(`${e} ${f}`, N(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((i) => i === T(e, pt))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (!At(t)) return;
  const i = W(t), s = i && h(i);
  if (!s) return;
  const { parentElement: o, menu: r } = s, d = o && o.contains(t) && (t.tagName === "form" || it(t, "form") !== null);
  [j, Pt].includes(e) && ht(t) && n.preventDefault(), !d && e !== lt && t !== i && t !== r && s.hide();
};
function Wt(n) {
  const t = h(this);
  Ft(this) || t && (n.stopPropagation(), t.toggle(), ht(this) && n.preventDefault());
}
const kt = (n) => {
  [_, F].includes(n.code) && n.preventDefault();
};
function Bt(n) {
  const { code: t } = n, e = W(this);
  if (!e) return;
  const i = h(e), { activeElement: s } = N(e);
  if (!i || !s) return;
  const { menu: o, open: r } = i, d = jt(o);
  if (d && d.length && [_, F].includes(t)) {
    let l = d.indexOf(s);
    s === e ? l = 0 : t === F ? l = l > 1 ? l - 1 : 0 : t === _ && (l = l < d.length - 1 ? l + 1 : l), d[l] && H(d[l]);
  }
  Tt === t && r && (i.toggle(), H(e));
}
class Ot extends bt {
  static selector = It;
  static init = Lt;
  static getInstance = h;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, e) {
    super(t, e);
    const { parentElement: i } = this.element, [s] = dt(
      ft,
      i
    );
    s && (this.parentElement = i, this.menu = s, this._observer = new _t(
      () => ot(this)
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ut;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Nt;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    if (e) return;
    const o = W(t), r = o && h(o);
    r && r.hide(), [P, et, mt].forEach(
      (d) => {
        d.relatedTarget = t;
      }
    ), u(s, P), !P.defaultPrevented && (Z(i, f), Z(s, f), z(t, J, "true"), ot(this), this.open = !e, H(t), st(this), u(s, et));
  }
  hide() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    e && ([S, nt].forEach((o) => {
      o.relatedTarget = t;
    }), u(s, S), !S.defaultPrevented && (R(i, f), R(s, f), z(t, J, "false"), this.open = !e, st(this), u(s, nt)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    (t ? at : ct)(this.element, j, Wt);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  Ot as default
};
//# sourceMappingURL=dropdown.mjs.map
