import { p as Mt, s as ft, x as Ut, y as Ct, w as Vt, $ as vt, a2 as ht, f as T, a3 as Pt, X as Xt, a4 as to, a5 as oo, a1 as eo, a0 as K, F as ct, g as at, M as H, k as _, B as io, L as Ot, a6 as so, q as no, t as zt, G as B, W as rt, a7 as dt, Q as pt, z as xt, N as ao, a8 as lo, a9 as co, aa as ro, m as po, u as ut, i as ho, ab as Dt, a as It, _ as mo, ac as fo, ad as uo, ae as go, d as yt, D as Yt, C as kt, Z as bo, K as Ft, af as qt, R as D, v as vo } from "./base-component-215a274f.js";
import { E as $t, d as wt } from "./event-listener-097fdcc5.js";
import { d as $o } from "./dataBsToggle-330f300b.js";
import { s as gt } from "./showClass-f6a4d601.js";
import { p as bt, h as Q, a as wo, m as Et, o as Nt, r as To } from "./popupContainer-26c3059d.js";
import { f as Wt } from "./fadeClass-0d50d035.js";
const lt = "popover", Gt = "Popover", C = "tooltip", Co = (o) => {
  const t = o === C, i = t ? `${o}-inner` : `${o}-body`, e = t ? "" : `<h3 class="${o}-header"></h3>`, s = `<div class="${o}-arrow"></div>`, a = `<div class="${i}"></div>`;
  return `<div class="${o}" role="${C}">${e + s + a}</div>`;
}, Zt = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, Ht = (o, t) => {
  const i = /\b(top|bottom|start|end)+/, { element: e, tooltip: s, options: a, arrow: r } = o;
  if (!s)
    return;
  const m = { ...Zt }, p = Mt(e);
  p && (m.left = "end", m.right = "start"), ft(s, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const g = o.name === Gt, { offsetWidth: l, offsetHeight: h } = s, { clientWidth: S, clientHeight: b } = Ut(e);
  let { placement: n } = a;
  const { left: P, right: v, top: $ } = Ct(bt, !0), { clientWidth: A, offsetWidth: L } = bt, c = Math.abs(A - L), U = Vt(bt, "position"), f = U === "fixed", M = U === "static", I = p && f ? c : 0, d = f ? A + P + (p ? c : 0) : A + P + (S - v) - 1, {
    width: N,
    height: x,
    left: Y,
    right: Jt,
    top: k
  } = Ct(e, !0), Tt = vt(s), V = { x: Tt.scrollX, y: Tt.scrollY }, { x: tt, y: F } = { x: Y + V.x, y: k + V.y };
  ft(r, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let y = 0, u = 0, ot = 0, q = 0, X = 0, G = 0;
  const w = r.offsetWidth || 0, W = r.offsetHeight || 0, O = w / 2;
  let et = k - h - W < 0, it = k + h + x + W >= b, Z = Y - l - w < I, j = Y + l + N + w >= d;
  const st = ["left", "right"], mt = ["top", "bottom"];
  if (et = st.includes(n) ? k + x / 2 - h / 2 - W < 0 : et, it = st.includes(n) ? k + h / 2 + x / 2 + W >= b : it, Z = mt.includes(n) ? Y + N / 2 - l / 2 < I : Z, j = mt.includes(n) ? Y + l / 2 + N / 2 >= d : j, n = st.includes(n) && Z && j ? "top" : n, n = n === "top" && et ? "bottom" : n, n = n === "bottom" && it ? "top" : n, n = n === "left" && Z ? "right" : n, n = n === "right" && j ? "left" : n, s.className.includes(n) || (s.className = s.className.replace(i, m[n])), st.includes(n))
    n === "left" ? u = tt - l - (g ? w : 0) : u = tt + N + (g ? w : 0), et ? (y = F, q = x / 2 - w) : it ? (y = F - h + x, q = h - x / 2 - w) : (y = F - h / 2 + x / 2, q = h / 2 - W / 2);
  else if (mt.includes(n))
    if (t && ht(e)) {
      let z = 0, nt = 0;
      M ? (z = t.pageX, nt = t.pageY) : (z = t.clientX - P + (f ? V.x : 0), nt = t.clientY - $ + (f ? V.y : 0)), z -= p && f && c ? c : 0, n === "top" ? y = nt - h - w : y = nt + w, t.clientX - l / 2 < I ? (u = 0, X = z - O) : t.clientX + l / 2 > d ? (u = "auto", ot = 0, G = d - z - O, G -= f ? P + (p ? c : 0) : 0) : (u = z - l / 2, X = l / 2 - O);
    } else
      n === "top" ? y = F - h - (g ? W : 0) : y = F + x + (g ? W : 0), Z ? (u = 0, X = tt + N / 2 - O) : j ? (u = "auto", ot = 0, G = N / 2 + d - Jt - O) : (u = tt - l / 2 + N / 2, X = l / 2 - O);
  ft(s, {
    top: `${y}px`,
    left: u === "auto" ? u : `${u}px`,
    right: ot !== void 0 ? `${ot}px` : ""
  }), T(r) && (q !== void 0 && (r.style.top = `${q}px`), X !== void 0 ? r.style.left = `${X}px` : G !== void 0 && (r.style.right = `${G}px`));
}, Bt = {
  template: Co(C),
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
}, jt = "data-original-title", R = "Tooltip", E = (o, t, i) => {
  if (!(!T(o) || Pt(t) && !t.length))
    if (Pt(t)) {
      let e = t.trim();
      Xt(i) && (e = i(e));
      const a = new DOMParser().parseFromString(e, "text/html");
      o.append(...a.body.childNodes);
    } else
      T(t) ? o.append(t) : (to(t) || oo(t) && t.every(eo)) && o.append(...t);
}, Po = (o) => {
  const t = o.name === R, { id: i, element: e, options: s } = o, { title: a, placement: r, template: m, animation: p, customClass: g, sanitizeFn: l, dismissible: h, content: S, btnClose: b } = s, n = t ? C : lt, P = { ...Zt };
  let v = [], $ = [];
  Mt(e) && (P.left = "end", P.right = "start");
  const A = `bs-${n}-${P[r]}`;
  let L;
  if (T(m))
    L = m;
  else {
    const d = K("div");
    E(d, m, l), L = d.firstChild;
  }
  o.tooltip = T(L) ? L.cloneNode(!0) : void 0;
  const { tooltip: c } = o;
  if (!c)
    return;
  ct(c, "id", i), ct(c, "role", C);
  const U = t ? `${C}-inner` : `${lt}-body`, f = t ? null : at(`.${lt}-header`, c), M = at(`.${U}`, c);
  o.arrow = at(`.${n}-arrow`, c);
  const { arrow: I } = o;
  if (T(a))
    v = [a.cloneNode(!0)];
  else {
    const d = K("div");
    E(d, a, l), v = [...d.childNodes];
  }
  if (T(S))
    $ = [S.cloneNode(!0)];
  else {
    const d = K("div");
    E(d, S, l), $ = [...d.childNodes];
  }
  if (h)
    if (a)
      if (T(b))
        v = [...v, b.cloneNode(!0)];
      else {
        const d = K("div");
        E(d, b, l), v = [...v, d.firstChild];
      }
    else if (f && f.remove(), T(b))
      $ = [...$, b.cloneNode(!0)];
    else {
      const d = K("div");
      E(d, b, l), $ = [...$, d.firstChild];
    }
  t ? a && M && E(M, a, l) : (a && f && E(f, v, l), S && M && E(M, $, l), o.btn = at(".btn-close", c) || void 0), H(c, "position-absolute"), H(I, "position-absolute"), _(c, n) || H(c, n), p && !_(c, Wt) && H(c, Wt), g && !_(c, g) && H(c, g), _(c, A) || H(c, A);
}, xo = `[${$o}="${C}"],[data-tip="${C}"]`, Kt = "title";
let Rt = (o) => Ot(o, R);
const yo = (o) => new Wo(o), Eo = (o) => {
  const { element: t, tooltip: i } = o;
  Ft(t, qt), To(i);
}, No = (o, t) => {
  const { element: i } = o;
  J(o), zt(i, jt) && o.name === R && _t(o), t && t();
}, Qt = (o, t) => {
  const i = t ? $t : wt, { element: e } = o;
  i(It(e), Dt, o.handleTouch, D), ht(e) || [kt, Yt].forEach((s) => {
    i(vt(e), s, o.update, D);
  });
}, St = (o) => {
  const { element: t } = o, i = rt(`shown.bs.${dt(o.name)}`);
  Qt(o, !0), pt(t, i), B.clear(t, "in");
}, At = (o, t) => {
  const { element: i } = o, e = rt(`hidden.bs.${dt(o.name)}`);
  Qt(o), Eo(o), pt(i, e), Xt(t) && t(), B.clear(i, "out");
}, J = (o, t) => {
  const i = t ? $t : wt, { element: e, options: s, btn: a } = o, { trigger: r } = s, p = !!(o.name !== R && s.dismissible);
  if (r?.includes("manual"))
    return;
  o.enabled = !!t;
  const g = r?.split(" "), l = ht(e);
  l && i(e, lo, o.update, D), g?.forEach((h) => {
    l || h === co ? (i(e, ro, o.show), i(e, po, o.show), p && a ? i(a, ut, o.hide) : (i(e, ho, o.hide), i(It(e), Dt, o.handleTouch, D))) : h === ut ? i(e, h, p ? o.show : o.toggle) : h === mo && (i(e, fo, o.show), p || i(e, uo, o.hide), go && i(e, ut, () => vo(e)));
  });
}, Lt = (o, t) => {
  const i = t ? $t : wt, { element: e } = o, s = yt(e, `.${Et}`), a = yt(e, `.${Nt}`);
  if (!ht(e)) {
    const r = vt(e);
    i(r, Yt, o.update, D), i(r, kt, o.update, D);
  }
  s && i(s, `hide.bs.${Et}`, o.hide), a && i(a, `hide.bs.${Nt}`, o.hide);
}, _t = (o, t) => {
  const i = [jt, Kt], { element: e } = o;
  ct(e, i[t ? 0 : 1], t || bo(e, i[0]) || ""), Ft(e, i[t ? 1 : 0]);
};
class Wo extends io {
  static selector = xo;
  static init = yo;
  static getInstance = Rt;
  static styleTip = Ht;
  constructor(t, i) {
    super(t, i);
    const { element: e } = this, s = this.name === R, a = s ? C : lt, r = s ? R : Gt;
    Rt = (p) => Ot(p, r), this.enabled = !0, this.id = `${a}-${so(e, a)}`;
    const { options: m } = this;
    !m.title && s || !s && !m.content || (no(Bt, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), zt(e, Kt) && s && _t(this, m.title), Po(this), J(this, !0));
  }
  get name() {
    return R;
  }
  get defaults() {
    return Bt;
  }
  show(t) {
    const { options: i, tooltip: e, element: s, id: a } = this, { animation: r } = i, m = B.get(s, "out");
    B.clear(s, "out"), e && !m && !Q(e) && B.set(
      s,
      () => {
        const p = rt(`show.bs.${dt(this.name)}`);
        pt(s, p), !p.defaultPrevented && (wo(e), ct(s, qt, `#${a}`), this.update(t), Lt(this, !0), _(e, gt) || H(e, gt), r ? xt(e, () => St(this)) : St(this));
      },
      17,
      "in"
    );
  }
  hide(t, i) {
    const { options: e, tooltip: s, element: a } = this, { animation: r, delay: m } = e;
    B.clear(a, "in"), s && Q(s) && B.set(
      a,
      () => {
        const p = rt(`hide.bs.${dt(this.name)}`);
        pt(a, p), !p.defaultPrevented && (this.update(t), ao(s, gt), Lt(this), r ? xt(s, () => At(this, i)) : At(this, i));
      },
      m + 17,
      "out"
    );
  }
  update(t) {
    Ht(this, t);
  }
  toggle(t) {
    const { tooltip: i } = this;
    i && !Q(i) ? this.show(t) : this.hide();
  }
  enable() {
    const { enabled: t } = this;
    t || (J(this, !0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, options: i, enabled: e } = this, { animation: s } = i;
    e && (t && Q(t) && s ? this.hide(void 0, () => J(this)) : J(this), this.enabled = !e);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch({ target: t }) {
    const { tooltip: i, element: e } = this;
    i && i.contains(t) || t === e || t && e.contains(t) || this.hide();
  }
  dispose() {
    const { tooltip: t, options: i } = this, e = () => No(this, () => super.dispose());
    i.animation && t && Q(t) ? (this.options.delay = 0, this.hide(void 0, e)) : e();
  }
}
export {
  Wo as T,
  lt as a,
  Co as g,
  Gt as p,
  Ht as s,
  Bt as t
};
//# sourceMappingURL=tooltip-d4e567a2.js.map
