import { W as y, g as Et, Q as D, M as Q, F as U, B as N, N as _, L as $t, x as Dt, p as Ct, k as G, w as M, y as vt, C as xt, q as V, c as A, u as B, _ as at, n as bt, D as yt, I as Ht, J as Pt, R as It, $ as St, h as Tt, Z as Mt, d as W, K as j, P as k, O as Ft, E as X } from "./shorty-f5e32a8f.js";
import { E as dt, r as ct } from "./event-listener-e555c4ba.js";
import { s as u } from "./showClass-f6a4d601.js";
import { d as m } from "./dataBsToggle-330f300b.js";
import { d as C } from "./dropdownClasses-66be00d3.js";
import lt from "./isEmptyAnchor.mjs";
import Lt from "./base-component.mjs";
const pt = "Dropdown", ft = "dropdown-menu", [p, v, x, b] = C, O = `[${m}="${p}"],[${m}="${v}"],[${m}="${b}"],[${m}="${x}"]`, f = (n) => $t(n, pt), Nt = (n) => new qt(n), Wt = `${ft}-end`, Y = [p, v], tt = [x, b], et = ["A", "BUTTON"], jt = {
  offset: 5,
  display: "dynamic"
}, F = y(`show.bs.${p}`), nt = y(`shown.bs.${p}`), L = y(`hide.bs.${p}`), ot = y(`hidden.bs.${p}`), ut = (n) => {
  const { element: t, menu: e, parentElement: o, options: r } = n, { offset: i } = r;
  if (Dt(e, "position") === "static")
    return;
  const s = Ct(t), a = G(e, Wt);
  ["margin", "top", "bottom", "left", "right"].forEach((l) => {
    const J = {};
    J[l] = "", M(e, J);
  });
  let d = C.find((l) => G(o, l)) || p;
  const mt = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: s ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: s ? [-1, i, 0] : [-1, 0, 0, i]
  }, h = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: s ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: s ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: s ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: s ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: g, offsetHeight: P } = e, { clientWidth: R, clientHeight: q } = vt(t), { left: w, top: I, width: K, height: ht } = xt(t), S = w - g - i < 0, T = w + g + K + i >= R, gt = I + P + i >= q, Z = I + P + ht + i >= q, z = I - P - i < 0, E = (!s && a || s && !a) && w + K - g < 0, $ = (s && a || !s && !a) && w + g >= R;
  if (tt.includes(d) && S && T && (d = p), d === x && (s ? T : S) && (d = b), d === b && (s ? S : T) && (d = x), d === v && z && !Z && (d = p), d === p && Z && !z && (d = v), tt.includes(d) && gt && V(h[d], {
    top: "auto",
    bottom: 0
  }), Y.includes(d) && (E || $)) {
    let l = { left: "auto", right: "auto" };
    !E && $ && !s && (l = { left: "auto", right: 0 }), E && !$ && s && (l = { left: 0, right: "auto" }), l && V(h[d], l);
  }
  const wt = mt[d];
  M(e, {
    ...h[d],
    margin: `${wt.map((l) => l && `${l}px`).join(" ")}`
  }), Y.includes(d) && a && a && M(e, h[!s && E || s && $ ? "menuStart" : "menuEnd"]);
}, kt = (n) => [...n.children].map((t) => {
  if (t && et.includes(t.tagName))
    return t;
  const { firstElementChild: e } = t;
  return e && et.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e } = n, o = n.open ? dt : ct, r = A(t);
  o(r, B, it), o(r, at, it), o(r, bt, Bt), o(r, yt, Ot), e.display === "dynamic" && [Ht, Pt].forEach((i) => {
    o(St(t), i, Rt, It);
  });
}, rt = (n, t) => {
  (t ? dt : ct)(n.element, B, At);
}, H = (n) => {
  const t = [...C, "btn-group", "input-group"].map((e) => Tt(`${e} ${u}`, A(n))).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => C.some((o) => o === Mt(e, m))
    );
}, it = (n) => {
  const { target: t, type: e } = n;
  if (!t || !t.closest)
    return;
  const o = H(t), r = o && f(o);
  if (!r)
    return;
  const { parentElement: i, menu: s } = r, a = W(t, O) !== null, c = i && i.contains(t) && (t.tagName === "form" || W(t, "form") !== null);
  e === B && lt(t) && n.preventDefault(), !(e === at && (t === o || t === s || s.contains(t))) && (c || a || r && r.hide());
}, At = (n) => {
  const { target: t } = n, e = t && W(t, O), o = e && f(e);
  o && (n.stopImmediatePropagation(), o.toggle(), e && lt(e) && n.preventDefault());
}, Bt = (n) => {
  [j, k].includes(n.code) && n.preventDefault();
};
function Ot(n) {
  const { code: t } = n, e = H(this), o = e && f(e), { activeElement: r } = e && A(e);
  if (!o || !r)
    return;
  const { menu: i, open: s } = o, a = kt(i);
  if (a && a.length && [j, k].includes(t)) {
    let c = a.indexOf(r);
    r === e ? c = 0 : t === k ? c = c > 1 ? c - 1 : 0 : t === j && (c = c < a.length - 1 ? c + 1 : c), a[c] && N(a[c]);
  }
  Ft === t && s && (o.toggle(), N(e));
}
function Rt() {
  const n = H(this), t = n && f(n);
  t && t.open && ut(t);
}
class qt extends Lt {
  static selector = O;
  static init = Nt;
  static getInstance = f;
  constructor(t, e) {
    super(t, e);
    const { parentElement: o } = this.element;
    this.parentElement = o, this.menu = Et(`.${ft}`, o), rt(this, !0);
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
    const i = H(t), s = i && f(i);
    s && s.hide(), [F, nt].forEach((a) => {
      a.relatedTarget = t;
    }), D(r, F), !F.defaultPrevented && (Q(o, u), Q(r, u), U(t, X, "true"), ut(this), this.open = !e, N(t), st(this), D(r, nt));
  }
  hide() {
    const { element: t, open: e, menu: o, parentElement: r } = this;
    e && ([L, ot].forEach((i) => {
      i.relatedTarget = t;
    }), D(r, L), !L.defaultPrevented && (_(o, u), _(r, u), U(t, X, "false"), this.open = !e, st(this), D(r, ot)));
  }
  dispose() {
    this.open && this.hide(), rt(this), super.dispose();
  }
}
export {
  qt as default
};
//# sourceMappingURL=dropdown.mjs.map
