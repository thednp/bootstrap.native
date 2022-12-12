import { W as Z, B as tt, p as I, h as et, a as T, b as C, g as w, M as f, k as E, G as c, N as v, e as j, q as M, Q as R, o as st, c as it, z as nt, L as ot, f as at, m as rt, i as ct, R as X, j as lt, u as D, l as dt, d as q, Z as F, n as ht, T as ut, r as U, U as z } from "./base-component-215a274f.js";
import { E as O, d as J } from "./event-listener-097fdcc5.js";
import { a as h } from "./activeClass-b231b21b.js";
import { d as G, g as V } from "./getTargetElement-bb362549.js";
const x = "carousel", Y = "Carousel", y = `[data-bs-ride="${x}"]`, l = `${x}-item`, B = "data-bs-slide-to", m = "data-bs-slide", p = "paused", Q = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, g = (s) => ot(s, Y), ft = (s) => new bt(s);
let $ = 0, P = 0, b = 0;
const S = Z(`slide.bs.${x}`), K = Z(`slid.bs.${x}`), gt = (s) => {
  const { index: i, direction: e, element: t, slides: a, options: o } = s;
  if (s.isAnimating && g(t)) {
    const r = L(s), n = e === "left" ? "next" : "prev", d = e === "left" ? "start" : "end";
    f(a[i], h), v(a[i], `${l}-${n}`), v(a[i], `${l}-${d}`), v(a[r], h), v(a[r], `${l}-${d}`), R(t, K), c.clear(t, m), !T(t).hidden && o.interval && !s.isPaused && s.cycle();
  }
};
function mt() {
  const s = g(this);
  s && !s.isPaused && !c.get(this, p) && f(this, p);
}
function pt() {
  const s = g(this);
  s && s.isPaused && !c.get(this, p) && s.cycle();
}
function vt(s) {
  s.preventDefault();
  const i = q(this, y) || V(this), e = g(i);
  if (!e || e.isAnimating)
    return;
  const t = +(F(this, B) || 0);
  this && !E(this, h) && !Number.isNaN(t) && e.to(t);
}
function $t(s) {
  s.preventDefault();
  const i = q(this, y) || V(this), e = g(i);
  if (!e || e.isAnimating)
    return;
  const t = F(this, m);
  t === "next" ? e.next() : t === "prev" && e.prev();
}
const xt = ({ code: s, target: i }) => {
  const e = T(i), [t] = [...C(y, e)].filter((d) => j(d)), a = g(t);
  if (!a || a.isAnimating || /textarea|input/i.test(i.nodeName))
    return;
  const o = I(t);
  s === (o ? U : z) ? a.prev() : s === (o ? z : U) && a.next();
};
function Tt(s) {
  const { target: i } = s, e = g(this);
  if (!e || e.isAnimating || e.isTouch)
    return;
  const { controls: t, indicators: a } = e;
  [...t, ...a].some((o) => o === i || o.contains(i)) || ($ = s.pageX, this.contains(i) && (e.isTouch = !0, _(e, !0)));
}
const Pt = (s) => {
  P = s.pageX;
}, Ct = (s) => {
  const { target: i } = s, e = T(i), t = [...C(y, e)].map((n) => g(n)).find((n) => n.isTouch);
  if (!t)
    return;
  const { element: a, index: o } = t, r = I(a);
  if (t.isTouch = !1, _(t), e.getSelection()?.toString().length) {
    $ = 0, P = 0, b = 0;
    return;
  }
  if (b = s.pageX, !a.contains(i) || Math.abs($ - b) < 120) {
    $ = 0, P = 0, b = 0;
    return;
  }
  P < $ ? t.to(o + (r ? -1 : 1)) : P > $ && t.to(o + (r ? 1 : -1)), $ = 0, P = 0, b = 0;
}, k = (s, i) => {
  const { indicators: e } = s;
  [...e].forEach((t) => v(t, h)), s.indicators[i] && f(e[i], h);
}, _ = (s, i) => {
  const { element: e } = s, t = i ? O : J;
  t(T(e), ht, Pt, X), t(T(e), ut, Ct, X);
}, W = (s, i) => {
  const { element: e, options: t, slides: a, controls: o, indicators: r } = s, { touch: n, pause: d, interval: N, keyboard: H } = t, u = i ? O : J;
  d && N && (u(e, rt, mt), u(e, ct, pt)), n && a.length > 2 && u(e, lt, Tt, X), o.length && o.forEach((A) => {
    A && u(A, D, $t);
  }), r.length && r.forEach((A) => {
    u(A, D, vt);
  }), H && u(T(e), dt, xt);
}, L = (s) => {
  const { slides: i, element: e } = s, t = w(`.${l}.${h}`, e);
  return at(t) ? [...i].indexOf(t) : -1;
};
class bt extends tt {
  static selector = y;
  static init = ft;
  static getInstance = g;
  constructor(i, e) {
    super(i, e);
    const { element: t } = this;
    this.direction = I(t) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = et(l, t);
    const { slides: a } = this;
    if (a.length < 2)
      return;
    const o = T(t);
    this.controls = [
      ...C(`[${m}]`, t),
      ...C(`[${m}][${G}="#${t.id}"]`, o)
    ], this.indicator = w(`.${x}-indicators`, t), this.indicators = [
      ...this.indicator ? C(`[${B}]`, this.indicator) : [],
      ...C(`[${B}][${G}="#${t.id}"]`, o)
    ];
    const { options: r } = this;
    this.options.interval = r.interval === !0 ? Q.interval : r.interval, L(this) < 0 && (f(a[0], h), this.indicators.length && k(this, 0)), W(this, !0), r.interval && this.cycle();
  }
  get name() {
    return Y;
  }
  get defaults() {
    return Q;
  }
  get isPaused() {
    return E(this.element, p);
  }
  get isAnimating() {
    return w(`.${l}-next,.${l}-prev`, this.element) !== null;
  }
  cycle() {
    const { element: i, options: e, isPaused: t, index: a } = this;
    c.clear(i, x), t && (c.clear(i, p), v(i, p)), c.set(
      i,
      () => {
        this.element && !this.isPaused && !this.isTouch && j(i) && this.to(a + 1);
      },
      e.interval,
      x
    );
  }
  pause() {
    const { element: i, options: e } = this;
    !this.isPaused && e.interval && (f(i, p), c.set(
      i,
      () => {
      },
      1,
      p
    ));
  }
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  to(i) {
    const { element: e, slides: t, options: a } = this, o = L(this), r = I(e);
    let n = i;
    if (this.isAnimating || o === n || c.get(e, m))
      return;
    o < n || o === 0 && n === t.length - 1 ? this.direction = r ? "right" : "left" : (o > n || o === t.length - 1 && n === 0) && (this.direction = r ? "left" : "right");
    const { direction: d } = this;
    n < 0 ? n = t.length - 1 : n >= t.length && (n = 0);
    const N = d === "left" ? "next" : "prev", H = d === "left" ? "start" : "end", u = {
      relatedTarget: t[n],
      from: o,
      to: n,
      direction: d
    };
    M(S, u), M(K, u), R(e, S), !S.defaultPrevented && (this.index = n, k(this, n), st(t[n]) && E(e, "slide") ? c.set(
      e,
      () => {
        f(t[n], `${l}-${N}`), it(t[n]), f(t[n], `${l}-${H}`), f(t[o], `${l}-${H}`), nt(t[n], () => gt(this));
      },
      0,
      m
    ) : (f(t[n], h), v(t[o], h), c.set(
      e,
      () => {
        c.clear(e, m), e && a.interval && !this.isPaused && this.cycle(), R(e, K);
      },
      0,
      m
    )));
  }
  dispose() {
    const { slides: i } = this, e = ["start", "end", "prev", "next"];
    [...i].forEach((t, a) => {
      E(t, h) && k(this, a), e.forEach((o) => v(t, `${l}-${o}`));
    }), W(this), super.dispose();
  }
}
export {
  bt as default
};
//# sourceMappingURL=carousel.mjs.map
