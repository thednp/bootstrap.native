import { B as it, t as nt, U as E, G as ot, R as S, c as at, d as I, e as T, b as u, Y as $, Z as N, h as d, D as Z, N as B, m as Q, q as L, u as rt, f as ct, s as K, E as F, r as J, w as lt, A as dt, g as O, z as ht, I as ft, O as ut, i as gt, j as mt, k as V, l as W, v as j, n as U, o as _, p as pt } from "./base-component-CQAH5ZXF.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
import { d as q, g as tt } from "./getTargetElement-v_1VfmtN.mjs";
import { i as z } from "./isDisabled-bThyhy2g.mjs";
const P = "carousel", et = "Carousel", b = `[data-bs-ride="${P}"]`, h = `${P}-item`, R = "data-bs-slide-to", v = "data-bs-slide", x = "paused", G = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (i) => nt(i, et), vt = (i) => new Ct(i);
let A = 0, C = 0, H = 0;
const D = Q(`slide.bs.${P}`), X = Q(`slid.bs.${P}`), M = (i) => {
  const { index: s, direction: t, element: e, slides: o, options: a } = i;
  if (i.isAnimating) {
    const r = k(i), n = t === "left" ? "next" : "prev", l = t === "left" ? "start" : "end";
    u(o[s], g), $(o[s], `${h}-${n}`), $(o[s], `${h}-${l}`), $(o[r], g), $(o[r], `${h}-${l}`), L(e, X), d.clear(e, v), i.cycle && !I(e).hidden && a.interval && !i.isPaused && i.cycle();
  }
};
function xt() {
  const i = m(this);
  i && !i.isPaused && !d.get(this, x) && u(this, x);
}
function $t() {
  const i = m(this);
  i && i.isPaused && !d.get(this, x) && i.cycle();
}
function Pt(i) {
  i.preventDefault();
  const s = V(this, b) || tt(this), t = s && m(s);
  if (!t || t.isAnimating) return;
  const e = +(W(this, R) || 0);
  this && !N(this, g) && !Number.isNaN(e) && t.to(e);
}
function It(i) {
  i.preventDefault();
  const s = V(this, b) || tt(this), t = s && m(s);
  if (!t || t.isAnimating) return;
  const e = W(this, v);
  e === "next" ? t.next() : e === "prev" && t.prev();
}
const Tt = ({ code: i, target: s }) => {
  const t = I(s), [e] = [...T(b, t)].filter((l) => Z(l)), o = m(e);
  if (!o || o.isAnimating || /textarea|input|select/i.test(s.nodeName)) return;
  const a = E(e);
  i === (a ? _ : U) ? o.prev() : i === (a ? U : _) && o.next();
};
function Y(i) {
  const { target: s } = i, t = m(this);
  t && t.isTouch && (t.indicator && !t.indicator.contains(s) || !t.controls.includes(s)) && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
}
function yt(i) {
  const { target: s } = i, t = m(this);
  if (!t || t.isAnimating || t.isTouch) return;
  const { controls: e, indicators: o } = t;
  [...e, ...o].every(
    (a) => a === s || a.contains(s)
  ) || (A = i.pageX, this.contains(s) && (t.isTouch = !0, st(t, !0)));
}
const At = (i) => {
  C = i.pageX;
}, bt = (i) => {
  const { target: s } = i, t = I(s), e = [...T(b, t)].map((n) => m(n)).find((n) => n.isTouch);
  if (!e) return;
  const { element: o, index: a } = e, r = E(o);
  H = i.pageX, e.isTouch = !1, st(e), !t.getSelection()?.toString().length && o.contains(s) && Math.abs(A - H) > 120 && (C < A ? e.to(a + (r ? -1 : 1)) : C > A && e.to(a + (r ? 1 : -1))), A = 0, C = 0, H = 0;
}, w = (i, s) => {
  const { indicators: t } = i;
  [...t].forEach((e) => $(e, g)), i.indicators[s] && u(t[s], g);
}, st = (i, s) => {
  const { element: t } = i, e = s ? F : J;
  e(
    I(t),
    ht,
    At,
    O
  ), e(
    I(t),
    ft,
    bt,
    O
  );
}, k = (i) => {
  const { slides: s, element: t } = i, e = S(
    `.${h}.${g}`,
    t
  );
  return e ? [...s].indexOf(e) : -1;
};
class Ct extends it {
  static selector = b;
  static init = vt;
  static getInstance = m;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(s, t) {
    super(s, t);
    const { element: e } = this;
    this.direction = E(e) ? "right" : "left", this.isTouch = !1, this.slides = ot(h, e);
    const { slides: o } = this;
    if (o.length < 2) return;
    const a = k(this), r = [...o].find(
      (f) => at(f, `.${h}-next`)
    );
    this.index = a;
    const n = I(e);
    this.controls = [
      ...T(`[${v}]`, e),
      ...T(
        `[${v}][${q}="#${e.id}"]`,
        n
      )
    ].filter((f, p, c) => p === c.indexOf(f)), this.indicator = S(
      `.${P}-indicators`,
      e
    ), this.indicators = [
      ...this.indicator ? T(`[${R}]`, this.indicator) : [],
      ...T(
        `[${R}][${q}="#${e.id}"]`,
        n
      )
    ].filter((f, p, c) => p === c.indexOf(f));
    const { options: l } = this;
    this.options.interval = l.interval === !0 ? G.interval : l.interval, r ? this.index = [...o].indexOf(r) : a < 0 && (this.index = 0, u(o[0], g), this.indicators.length && w(this, 0)), this.indicators.length && w(this, this.index), this._toggleEventListeners(!0), l.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return et;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return G;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return N(this.element, x);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return S(
      `.${h}-next,.${h}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: s, options: t, isPaused: e, index: o } = this;
    d.clear(s, P), e && (d.clear(s, x), $(s, x)), d.set(
      s,
      () => {
        this.element && !this.isPaused && !this.isTouch && Z(s) && this.to(o + 1);
      },
      t.interval,
      P
    );
  }
  pause() {
    const { element: s, options: t } = this;
    this.isPaused || !t.interval || (u(s, x), d.set(
      s,
      () => {
      },
      1,
      x
    ));
  }
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(s) {
    const { element: t, slides: e, options: o } = this, a = k(this), r = E(t);
    let n = s;
    if (this.isAnimating || a === n || d.get(t, v)) return;
    a < n || a === 0 && n === e.length - 1 ? this.direction = r ? "right" : "left" : (a > n || a === e.length - 1 && n === 0) && (this.direction = r ? "left" : "right");
    const { direction: l } = this;
    n < 0 ? n = e.length - 1 : n >= e.length && (n = 0);
    const f = l === "left" ? "next" : "prev", p = l === "left" ? "start" : "end", c = {
      relatedTarget: e[n],
      from: a,
      to: n,
      direction: l
    };
    B(D, c), B(X, c), L(t, D), !D.defaultPrevented && (this.index = n, w(this, n), rt(e[n]) && N(t, "slide") ? d.set(
      t,
      () => {
        u(e[n], `${h}-${f}`), ct(e[n]), u(e[n], `${h}-${p}`), u(e[a], `${h}-${p}`), K(
          e[n],
          () => this.slides && this.slides.length && M(this)
        );
      },
      0,
      v
    ) : (u(e[n], g), $(e[a], g), d.set(
      t,
      () => {
        d.clear(t, v), t && o.interval && !this.isPaused && this.cycle(), L(t, X);
      },
      0,
      v
    )));
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (s) => {
    const { element: t, options: e, slides: o, controls: a, indicators: r } = this, { touch: n, pause: l, interval: f, keyboard: p } = e, c = s ? F : J;
    l && f && (c(t, lt, xt), c(t, dt, $t)), n && o.length > 2 && (c(
      t,
      ut,
      yt,
      O
    ), c(t, gt, Y, { passive: !1 }), c(t, mt, Y, { passive: !1 })), a.length && a.forEach((y) => {
      z(y) || c(y, j, It);
    }), r.length && r.forEach((y) => {
      z(y) || c(y, j, Pt);
    }), p && c(I(t), pt, Tt);
  };
  dispose() {
    const { isAnimating: s } = this, t = {
      ...this,
      isAnimating: s
    };
    this._toggleEventListeners(), super.dispose(), t.isAnimating && K(t.slides[t.index], () => {
      M(t);
    });
  }
}
export {
  Ct as default
};
//# sourceMappingURL=carousel.mjs.map
