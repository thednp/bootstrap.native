import { k as j, J as Q, l as T, B as Dt, t as Ct, G as it, d as O, K as $t, U as xt, Z as Y, F as H, S as yt, L as At, N as Z, q as u, m, b as z, Q as J, H as R, M as I, E as dt, r as at, x as Ht, v as W, P as Pt, T as ct, V as _, W as F, p as St, X as Tt, _ as It, Y as V } from "./base-component-CQAH5ZXF.mjs";
import { s as h } from "./showClass-C8hdJfjQ.mjs";
import { d as lt } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
import { i as _t } from "./isDisabled-bThyhy2g.mjs";
const pt = "Dropdown", ft = "dropdown-menu", ut = (n) => {
  const t = j(n, "A");
  return n.tagName === "A" && Q(n, "href") && T(n, "href")?.slice(-1) === "#" || t && Q(t, "href") && T(t, "href")?.slice(-1) === "#";
}, [p, L, M, N] = D, ht = `[${lt}="${p}"]`, f = (n) => Ct(n, pt), Ft = (n) => new Bt(n), Lt = `${ft}-end`, X = [p, L], tt = [M, N], et = ["A", "BUTTON"], Mt = {
  offset: 5,
  display: "dynamic"
}, P = m(
  `show.bs.${p}`
), nt = m(
  `shown.bs.${p}`
), S = m(
  `hide.bs.${p}`
), ot = m(`hidden.bs.${p}`), mt = m(`updated.bs.${p}`), gt = (n) => {
  const { element: t, menu: e, parentElement: r, options: s } = n, { offset: o } = s;
  if ($t(e, "position") !== "static") {
    const i = xt(t), d = Y(e, Lt);
    ["margin", "top", "bottom", "left", "right"].forEach((c) => {
      const K = {};
      K[c] = "", H(e, K);
    });
    let a = D.find(
      (c) => Y(r, c)
    ) || p;
    const wt = {
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
    }, { offsetWidth: w, offsetHeight: $ } = e, { clientWidth: k, clientHeight: B } = yt(t), {
      left: E,
      top: x,
      width: U,
      height: Et
    } = At(t), y = E - w - o < 0, A = E + w + U + o >= k, vt = x + $ + o >= B, q = x + $ + Et + o >= B, G = x - $ - o < 0, v = (!i && d || i && !d) && E + U - w < 0, b = (i && d || !i && !d) && E + w >= k;
    if (tt.includes(a) && y && A && (a = p), a === M && (i ? A : y) && (a = N), a === N && (i ? y : A) && (a = M), a === L && G && !q && (a = p), a === p && q && !G && (a = L), tt.includes(a) && vt && Z(g[a], {
      top: "auto",
      bottom: 0
    }), X.includes(a) && (v || b)) {
      let c = { left: "auto", right: "auto" };
      !v && b && !i && (c = { left: "auto", right: 0 }), v && !b && i && (c = { left: 0, right: "auto" }), c && Z(g[a], c);
    }
    const bt = wt[a];
    H(e, {
      ...g[a],
      margin: `${bt.map((c) => c && `${c}px`).join(" ")}`
    }), X.includes(a) && d && d && H(e, g[!i && v || i && b ? "menuStart" : "menuEnd"]), u(r, mt);
  }
}, Nt = (n) => Array.from(n.children).map((t) => {
  if (t && et.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && et.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: r } = n, s = n.open ? dt : at, o = O(t);
  s(o, W, rt), s(o, ct, rt), s(o, St, Ot), s(o, It, Wt), e.display === "dynamic" && (n.open ? n._observer.observe(r) : n._observer.disconnect());
}, C = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => it(`${e} ${h}`, O(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((r) => r === T(e, lt))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (!Ht(t)) return;
  const r = C(t), s = r && f(r);
  if (!s) return;
  const { parentElement: o, menu: i } = s, d = o && o.contains(t) && (t.tagName === "form" || j(t, "form") !== null);
  [W, Pt].includes(e) && ut(t) && n.preventDefault(), !d && e !== ct && t !== r && t !== i && s.hide();
}, jt = (n) => {
  const { target: t } = n, e = t && j(t, ht), r = e && f(e);
  r && (n.stopPropagation(), r.toggle(), e && ut(e) && n.preventDefault());
}, Ot = (n) => {
  [_, F].includes(n.code) && n.preventDefault();
};
function Wt(n) {
  const { code: t } = n, e = C(this);
  if (!e) return;
  const r = f(e), { activeElement: s } = O(e);
  if (!r || !s) return;
  const { menu: o, open: i } = r, d = Nt(o);
  if (d && d.length && [_, F].includes(t)) {
    let l = d.indexOf(s);
    s === e ? l = 0 : t === F ? l = l > 1 ? l - 1 : 0 : t === _ && (l = l < d.length - 1 ? l + 1 : l), d[l] && I(d[l]);
  }
  Tt === t && i && (r.toggle(), I(e));
}
function kt(n) {
  const t = C(n), e = t && f(t);
  e && e.open && gt(e);
}
class Bt extends Dt {
  static selector = ht;
  static init = Ft;
  static getInstance = f;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, e) {
    super(t, e);
    const { parentElement: r } = this.element, [s] = it(
      ft,
      r
    );
    s && (this.parentElement = r, this.menu = s, this._observer = new IntersectionObserver(
      ([o]) => kt(o.target),
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
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: r, parentElement: s } = this;
    if (e) return;
    const o = C(t), i = o && f(o);
    i && i.hide(), [P, nt, mt].forEach(
      (d) => {
        d.relatedTarget = t;
      }
    ), u(s, P), !P.defaultPrevented && (z(r, h), z(s, h), J(t, R, "true"), gt(this), this.open = !e, I(t), st(this), u(s, nt));
  }
  hide() {
    const { element: t, open: e, menu: r, parentElement: s } = this;
    e && ([S, ot].forEach((o) => {
      o.relatedTarget = t;
    }), u(s, S), !S.defaultPrevented && (V(r, h), V(s, h), J(t, R, "false"), this.open = !e, st(this), u(s, ot)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    const e = t ? dt : at;
    _t(this.element) || e(this.element, W, jt);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  Bt as default
};
//# sourceMappingURL=dropdown.mjs.map
