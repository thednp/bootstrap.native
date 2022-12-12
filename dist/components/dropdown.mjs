import { d as v, t as Q, W as H, B as $t, g as Dt, Q as D, M as U, F as _, v as L, N as G, L as vt, w as Ct, p as xt, k as V, s as M, x as bt, y as yt, q as X, a as k, C as Ht, D as Pt, $ as At, h as It, Z as St, E as Y, u as B, _ as dt, l as Tt, H as Mt, R as Nt, I as W, P as j, J as Ft } from "./base-component-215a274f.js";
import { E as ct, d as lt } from "./event-listener-097fdcc5.js";
import { s as u } from "./showClass-f6a4d601.js";
import { d as h } from "./dataBsToggle-330f300b.js";
import { d as C } from "./dropdownClasses-66be00d3.js";
const pt = "Dropdown", ft = "dropdown-menu", ut = (n) => {
  const t = v(n, "A");
  return n.tagName === "A" && Q(n, "href") && n.href.slice(-1) === "#" || t && Q(t, "href") && t.href.slice(-1) === "#";
}, [p, x, b, y] = C, O = `[${h}="${p}"],[${h}="${x}"],[${h}="${y}"],[${h}="${b}"]`, f = (n) => vt(n, pt), Lt = (n) => new Zt(n), Wt = `${ft}-end`, tt = [p, x], et = [b, y], nt = ["A", "BUTTON"], jt = {
  offset: 5,
  display: "dynamic"
}, N = H(`show.bs.${p}`), ot = H(`shown.bs.${p}`), F = H(`hide.bs.${p}`), st = H(`hidden.bs.${p}`), ht = (n) => {
  const { element: t, menu: e, parentElement: o, options: r } = n, { offset: i } = r;
  if (Ct(e, "position") === "static")
    return;
  const s = xt(t), a = V(e, Wt);
  ["margin", "top", "bottom", "left", "right"].forEach((l) => {
    const K = {};
    K[l] = "", M(e, K);
  });
  let d = C.find((l) => V(o, l)) || p;
  const mt = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: s ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: s ? [-1, i, 0] : [-1, 0, 0, i]
  }, m = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: s ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: s ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: s ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: s ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: g, offsetHeight: A } = e, { clientWidth: R, clientHeight: q } = bt(t), { left: w, top: I, width: Z, height: gt } = yt(t), S = w - g - i < 0, T = w + g + Z + i >= R, wt = I + A + i >= q, z = I + A + gt + i >= q, J = I - A - i < 0, E = (!s && a || s && !a) && w + Z - g < 0, $ = (s && a || !s && !a) && w + g >= R;
  if (et.includes(d) && S && T && (d = p), d === b && (s ? T : S) && (d = y), d === y && (s ? S : T) && (d = b), d === x && J && !z && (d = p), d === p && z && !J && (d = x), et.includes(d) && wt && X(m[d], {
    top: "auto",
    bottom: 0
  }), tt.includes(d) && (E || $)) {
    let l = { left: "auto", right: "auto" };
    !E && $ && !s && (l = { left: "auto", right: 0 }), E && !$ && s && (l = { left: 0, right: "auto" }), l && X(m[d], l);
  }
  const Et = mt[d];
  M(e, {
    ...m[d],
    margin: `${Et.map((l) => l && `${l}px`).join(" ")}`
  }), tt.includes(d) && a && a && M(e, m[!s && E || s && $ ? "menuStart" : "menuEnd"]);
}, kt = (n) => [...n.children].map((t) => {
  if (t && nt.includes(t.tagName))
    return t;
  const { firstElementChild: e } = t;
  return e && nt.includes(e.tagName) ? e : null;
}).filter((t) => t), rt = (n) => {
  const { element: t, options: e } = n, o = n.open ? ct : lt, r = k(t);
  o(r, B, at), o(r, dt, at), o(r, Tt, Ot), o(r, Mt, Rt), e.display === "dynamic" && [Ht, Pt].forEach((i) => {
    o(At(t), i, qt, Nt);
  });
}, it = (n, t) => {
  (t ? ct : lt)(n.element, B, Bt);
}, P = (n) => {
  const t = [...C, "btn-group", "input-group"].map((e) => It(`${e} ${u}`, k(n))).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => C.some((o) => o === St(e, h))
    );
}, at = (n) => {
  const { target: t, type: e } = n;
  if (!t || !t.closest)
    return;
  const o = P(t), r = o && f(o);
  if (!r)
    return;
  const { parentElement: i, menu: s } = r, a = v(t, O) !== null, c = i && i.contains(t) && (t.tagName === "form" || v(t, "form") !== null);
  e === B && ut(t) && n.preventDefault(), !(e === dt && (t === o || t === s || s.contains(t))) && (c || a || r && r.hide());
}, Bt = (n) => {
  const { target: t } = n, e = t && v(t, O), o = e && f(e);
  o && (n.stopImmediatePropagation(), o.toggle(), e && ut(e) && n.preventDefault());
}, Ot = (n) => {
  [W, j].includes(n.code) && n.preventDefault();
};
function Rt(n) {
  const { code: t } = n, e = P(this), o = e && f(e), { activeElement: r } = e && k(e);
  if (!o || !r)
    return;
  const { menu: i, open: s } = o, a = kt(i);
  if (a && a.length && [W, j].includes(t)) {
    let c = a.indexOf(r);
    r === e ? c = 0 : t === j ? c = c > 1 ? c - 1 : 0 : t === W && (c = c < a.length - 1 ? c + 1 : c), a[c] && L(a[c]);
  }
  Ft === t && s && (o.toggle(), L(e));
}
function qt() {
  const n = P(this), t = n && f(n);
  t && t.open && ht(t);
}
class Zt extends $t {
  static selector = O;
  static init = Lt;
  static getInstance = f;
  constructor(t, e) {
    super(t, e);
    const { parentElement: o } = this.element;
    this.parentElement = o, this.menu = Dt(`.${ft}`, o), it(this, !0);
  }
  get name() {
    return pt;
  }
  get defaults() {
    return jt;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: o, parentElement: r } = this;
    if (e)
      return;
    const i = P(t), s = i && f(i);
    s && s.hide(), [N, ot].forEach((a) => {
      a.relatedTarget = t;
    }), D(r, N), !N.defaultPrevented && (U(o, u), U(r, u), _(t, Y, "true"), ht(this), this.open = !e, L(t), rt(this), D(r, ot));
  }
  hide() {
    const { element: t, open: e, menu: o, parentElement: r } = this;
    !e || ([F, st].forEach((i) => {
      i.relatedTarget = t;
    }), D(r, F), !F.defaultPrevented && (G(o, u), G(r, u), _(t, Y, "false"), this.open = !e, rt(this), D(r, st)));
  }
  dispose() {
    this.open && this.hide(), it(this), super.dispose();
  }
}
export {
  Zt as default
};
//# sourceMappingURL=dropdown.mjs.map
