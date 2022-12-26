import { W as Z, p as I, h as tt, c as T, e as C, g as w, M as f, k as E, G as c, N as v, f as j, q as B, Q as R, o as et, i as st, z as it, L as nt, m as ot, j as at, R as X, l as rt, u as D, n as ct, r as lt, d as q, Z as F, s as dt, T as ht, t as z, v as G } from "./shorty-f5e32a8f.js";
import { E as O, r as J } from "./event-listener-e555c4ba.js";
import { a as h } from "./activeClass-b231b21b.js";
import { d as Q, g as V } from "./getTargetElement-bc4f0355.js";
import ut from "./base-component.mjs";
const x = "carousel", Y = "Carousel", b = `[data-bs-ride="${x}"]`, l = `${x}-item`, K = "data-bs-slide-to", g = "data-bs-slide", p = "paused", U = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (s) => nt(s, Y), ft = (s) => new yt(s);
let $ = 0, P = 0, y = 0;
const S = Z(`slide.bs.${x}`), L = Z(`slid.bs.${x}`), mt = (s) => {
  const { index: i, direction: e, element: t, slides: a, options: o } = s;
  if (s.isAnimating && m(t)) {
    const r = M(s), n = e === "left" ? "next" : "prev", d = e === "left" ? "start" : "end";
    f(a[i], h), v(a[i], `${l}-${n}`), v(a[i], `${l}-${d}`), v(a[r], h), v(a[r], `${l}-${d}`), R(t, L), c.clear(t, g), !T(t).hidden && o.interval && !s.isPaused && s.cycle();
  }
};
function gt() {
  const s = m(this);
  s && !s.isPaused && !c.get(this, p) && f(this, p);
}
function pt() {
  const s = m(this);
  s && s.isPaused && !c.get(this, p) && s.cycle();
}
function vt(s) {
  s.preventDefault();
  const i = q(this, b) || V(this), e = m(i);
  if (!e || e.isAnimating)
    return;
  const t = +(F(this, K) || 0);
  this && !E(this, h) && !Number.isNaN(t) && e.to(t);
}
function $t(s) {
  s.preventDefault();
  const i = q(this, b) || V(this), e = m(i);
  if (!e || e.isAnimating)
    return;
  const t = F(this, g);
  t === "next" ? e.next() : t === "prev" && e.prev();
}
const xt = ({ code: s, target: i }) => {
  const e = T(i), [t] = [...C(b, e)].filter((d) => j(d)), a = m(t);
  if (!a || a.isAnimating || /textarea|input/i.test(i.nodeName))
    return;
  const o = I(t);
  s === (o ? z : G) ? a.prev() : s === (o ? G : z) && a.next();
};
function Tt(s) {
  const { target: i } = s, e = m(this);
  if (!e || e.isAnimating || e.isTouch)
    return;
  const { controls: t, indicators: a } = e;
  [...t, ...a].some((o) => o === i || o.contains(i)) || ($ = s.pageX, this.contains(i) && (e.isTouch = !0, _(e, !0)));
}
const Pt = (s) => {
  P = s.pageX;
}, Ct = (s) => {
  const { target: i } = s, e = T(i), t = [...C(b, e)].map((n) => m(n)).find((n) => n.isTouch);
  if (!t)
    return;
  const { element: a, index: o } = t, r = I(a);
  if (t.isTouch = !1, _(t), e.getSelection()?.toString().length) {
    $ = 0, P = 0, y = 0;
    return;
  }
  if (y = s.pageX, !a.contains(i) || Math.abs($ - y) < 120) {
    $ = 0, P = 0, y = 0;
    return;
  }
  P < $ ? t.to(o + (r ? -1 : 1)) : P > $ && t.to(o + (r ? 1 : -1)), $ = 0, P = 0, y = 0;
}, k = (s, i) => {
  const { indicators: e } = s;
  [...e].forEach((t) => v(t, h)), s.indicators[i] && f(e[i], h);
}, _ = (s, i) => {
  const { element: e } = s, t = i ? O : J;
  t(T(e), dt, Pt, X), t(T(e), ht, Ct, X);
}, W = (s, i) => {
  const { element: e, options: t, slides: a, controls: o, indicators: r } = s, { touch: n, pause: d, interval: N, keyboard: H } = t, u = i ? O : J;
  d && N && (u(e, ot, gt), u(e, at, pt)), n && a.length > 2 && u(e, rt, Tt, X), o.length && o.forEach((A) => {
    A && u(A, D, $t);
  }), r.length && r.forEach((A) => {
    u(A, D, vt);
  }), H && u(T(e), ct, xt);
}, M = (s) => {
  const { slides: i, element: e } = s, t = w(`.${l}.${h}`, e);
  return lt(t) ? [...i].indexOf(t) : -1;
};
class yt extends ut {
  static selector = b;
  static init = ft;
  static getInstance = m;
  constructor(i, e) {
    super(i, e);
    const { element: t } = this;
    this.direction = I(t) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = tt(l, t);
    const { slides: a } = this;
    if (a.length < 2)
      return;
    const o = T(t);
    this.controls = [
      ...C(`[${g}]`, t),
      ...C(`[${g}][${Q}="#${t.id}"]`, o)
    ], this.indicator = w(`.${x}-indicators`, t), this.indicators = [
      ...this.indicator ? C(`[${K}]`, this.indicator) : [],
      ...C(`[${K}][${Q}="#${t.id}"]`, o)
    ];
    const { options: r } = this;
    this.options.interval = r.interval === !0 ? U.interval : r.interval, M(this) < 0 && (f(a[0], h), this.indicators.length && k(this, 0)), W(this, !0), r.interval && this.cycle();
  }
  get name() {
    return Y;
  }
  get defaults() {
    return U;
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
    const { element: e, slides: t, options: a } = this, o = M(this), r = I(e);
    let n = i;
    if (this.isAnimating || o === n || c.get(e, g))
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
    B(S, u), B(L, u), R(e, S), !S.defaultPrevented && (this.index = n, k(this, n), et(t[n]) && E(e, "slide") ? c.set(
      e,
      () => {
        f(t[n], `${l}-${N}`), st(t[n]), f(t[n], `${l}-${H}`), f(t[o], `${l}-${H}`), it(t[n], () => mt(this));
      },
      0,
      g
    ) : (f(t[n], h), v(t[o], h), c.set(
      e,
      () => {
        c.clear(e, g), e && a.interval && !this.isPaused && this.cycle(), R(e, L);
      },
      0,
      g
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
  yt as default
};
//# sourceMappingURL=carousel.mjs.map
