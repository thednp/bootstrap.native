import { N as it, C as R, K as S, B as bt, j as dt, Z as p, G as U, Q as Z, J as T, a as z, t as Dt, m, L as Ct, H as yt, _ as J, x as A, M as $t, P as xt, T as V, E as at, r as ct, d as M, y as X, v as F, R as lt, k as At, S as Ht, o as Pt, U as St, V as _, X as N, Y as Tt } from "./base-component-DdvmGdVr.mjs";
import { y as _t } from "./index-CqJ2yo-u.mjs";
import { s as f } from "./showClass-C8hdJfjQ.mjs";
import { d as ut } from "./dataBsToggle-B84TS15h.mjs";
import { d as D } from "./dropdownClasses-CdCdZ-PX.mjs";
import { i as Nt } from "./isDisabled-C26LKsNR.mjs";
const pt = "Dropdown", ft = "dropdown-menu", ht = (n) => {
  const t = it(n, "A");
  return n.tagName === "A" && R(n, "href") && S(n, "href")?.slice(-1) === "#" || t && R(t, "href") && S(t, "href")?.slice(-1) === "#";
}, [u, j, I, L] = D, jt = `[${ut}="${u}"]`, h = (n) => Dt(n, pt), It = (n) => new kt(n), Lt = `${ft}-end`, Y = [u, j], q = [I, L], tt = ["A", "BUTTON"], Mt = {
  offset: 5,
  display: "dynamic"
}, H = m(
  `show.bs.${u}`
), et = m(
  `shown.bs.${u}`
), P = m(
  `hide.bs.${u}`
), nt = m(`hidden.bs.${u}`), mt = m(`updated.bs.${u}`), ot = (n) => {
  const { element: t, menu: e, parentElement: i, options: s } = n, { offset: o } = s;
  if (Ct(e, "position") === "static") return;
  const r = yt(t), d = J(e, Lt);
  ["margin", "top", "bottom", "left", "right"].forEach((c) => {
    const Q = {};
    Q[c] = "", A(e, Q);
  });
  let a = D.find((c) => J(i, c)) || u;
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
  }, { offsetWidth: w, offsetHeight: C } = e, { clientWidth: O, clientHeight: W } = $t(t), {
    left: E,
    top: y,
    width: k,
    height: wt
  } = xt(t), $ = E - w - o < 0, x = E + w + k + o >= O, Et = y + C + o >= W, G = y + C + wt + o >= W, K = y - C - o < 0, v = (!r && d || r && !d) && E + k - w < 0, b = (r && d || !r && !d) && E + w >= O;
  if (q.includes(a) && $ && x && (a = u), a === I && (r ? x : $) && (a = L), a === L && (r ? $ : x) && (a = I), a === j && K && !G && (a = u), a === u && G && !K && (a = j), q.includes(a) && Et && V(g[a], {
    top: "auto",
    bottom: 0
  }), Y.includes(a) && (v || b)) {
    let c = { left: "auto", right: "auto" };
    !v && b && !r && (c = { left: "auto", right: 0 }), v && !b && r && (c = { left: 0, right: "auto" }), c && V(g[a], c);
  }
  const vt = gt[a];
  A(e, {
    ...g[a],
    margin: `${vt.map((c) => c && `${c}px`).join(" ")}`
  }), Y.includes(a) && d && d && A(e, g[!r && v || r && b ? "menuStart" : "menuEnd"]), p(i, mt);
}, Ft = (n) => Array.from(n.children).map((t) => {
  if (t && tt.includes(t.tagName)) return t;
  const { firstElementChild: e } = t;
  return e && tt.includes(e.tagName) ? e : null;
}).filter((t) => t), st = (n) => {
  const { element: t, options: e, menu: i } = n, s = n.open ? at : ct, o = M(t);
  s(o, F, rt), s(o, lt, rt), s(o, At, Ot), s(o, Ht, Wt), e.display === "dynamic" && (n.open ? n._observer.observe(i) : n._observer.disconnect());
}, B = (n) => {
  const t = [...D, "btn-group", "input-group"].map(
    (e) => dt(`${e} ${f}`, M(n))
  ).find((e) => e.length);
  if (t && t.length)
    return [...t[0].children].find(
      (e) => D.some((i) => i === S(e, ut))
    );
}, rt = (n) => {
  const { target: t, type: e } = n;
  if (!Pt(t)) return;
  const i = B(t), s = i && h(i);
  if (!s) return;
  const { parentElement: o, menu: r } = s, d = o && o.contains(t) && (t.tagName === "form" || it(t, "form") !== null);
  [F, St].includes(e) && ht(t) && n.preventDefault(), !d && e !== lt && t !== i && t !== r && s.hide();
};
function Bt(n) {
  const t = h(this);
  Nt(this) || t && (n.stopPropagation(), t.toggle(), ht(this) && n.preventDefault());
}
const Ot = (n) => {
  [_, N].includes(n.code) && n.preventDefault();
};
function Wt(n) {
  const { code: t } = n, e = B(this);
  if (!e) return;
  const i = h(e), { activeElement: s } = M(e);
  if (!i || !s) return;
  const { menu: o, open: r } = i, d = Ft(o);
  if (d && d.length && [_, N].includes(t)) {
    let l = d.indexOf(s);
    s === e ? l = 0 : t === N ? l = l > 1 ? l - 1 : 0 : t === _ && (l = l < d.length - 1 ? l + 1 : l), d[l] && T(d[l]);
  }
  Tt === t && r && (i.toggle(), T(e));
}
class kt extends bt {
  static selector = jt;
  static init = It;
  static getInstance = h;
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
  get name() {
    return pt;
  }
  get defaults() {
    return Mt;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    if (e) return;
    const o = B(t), r = o && h(o);
    r && r.hide(), [H, et, mt].forEach(
      (d) => {
        d.relatedTarget = t;
      }
    ), p(s, H), !H.defaultPrevented && (U(i, f), U(s, f), Z(t, X, "true"), ot(this), this.open = !e, T(t), st(this), p(s, et));
  }
  hide() {
    const { element: t, open: e, menu: i, parentElement: s } = this;
    e && ([P, nt].forEach((o) => {
      o.relatedTarget = t;
    }), p(s, P), !P.defaultPrevented && (z(i, f), z(s, f), Z(t, X, "false"), this.open = !e, st(this), p(s, nt)));
  }
  _toggleEventListeners = (t) => {
    (t ? at : ct)(this.element, F, Bt);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
export {
  kt as default
};
//# sourceMappingURL=dropdown.mjs.map
