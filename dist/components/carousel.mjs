import { B as st, i as H, j as it, k as nt, l as T, n as y, q as D, f as u, h as L, T as h, r as $, o as U, O as X, d as k, p as ot, t as at, e as K, g as rt, c as J, u as ct, v as lt, w as dt, x as N, y as ht, z as ft, A as ut, m as q, C as gt, D as Q, b as V, E as mt, F as vt, G as M, H as _ } from "./base-component-ylZzLp-h.mjs";
import { E as W, r as Y } from "./event-listener-C1-Yf9Z5.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
import { d as j, g as Z } from "./getTargetElement-BFOUI7hP.mjs";
const E = "carousel", tt = "Carousel", A = `[data-bs-ride="${E}"]`, d = `${E}-item`, R = "data-bs-slide-to", p = "data-bs-slide", x = "paused", z = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (s) => rt(s, tt), pt = (s) => new It(s);
let C = 0, I = 0, b = 0;
const w = J(`slide.bs.${E}`), B = J(`slid.bs.${E}`), F = (s) => {
  const { index: i, direction: t, element: e, slides: n, options: o } = s;
  if (s.isAnimating) {
    const r = O(s), a = t === "left" ? "next" : "prev", l = t === "left" ? "start" : "end";
    u(n[i], g), $(n[i], `${d}-${a}`), $(n[i], `${d}-${l}`), $(n[r], g), $(n[r], `${d}-${l}`), k(e, B), h.clear(e, p), s.cycle && !T(e).hidden && o.interval && !s.isPaused && s.cycle();
  }
};
function xt() {
  const s = m(this);
  s && !s.isPaused && !h.get(this, x) && u(this, x);
}
function $t() {
  const s = m(this);
  s && s.isPaused && !h.get(this, x) && s.cycle();
}
function Et(s) {
  s.preventDefault();
  const i = Q(this, A) || Z(this), t = m(i);
  if (t && !t.isAnimating) {
    const e = +(V(this, R) || // istanbul ignore next @preserve
    0);
    this && !L(this, g) && // event target is not active
    !Number.isNaN(e) && t.to(e);
  }
}
function Tt(s) {
  s.preventDefault();
  const i = Q(this, A) || Z(this), t = m(i);
  if (t && !t.isAnimating) {
    const e = V(this, p);
    e === "next" ? t.next() : e === "prev" && t.prev();
  }
}
const yt = ({ code: s, target: i }) => {
  const t = T(i), [e] = [...y(A, t)].filter(
    (o) => U(o)
  ), n = m(e);
  if (n && !n.isAnimating && !/textarea|input/i.test(i.nodeName)) {
    const o = H(e);
    s === (o ? M : _) ? n.prev() : s === (o ? _ : M) && n.next();
  }
};
function G(s) {
  const { target: i } = s, t = m(this);
  t && t.isTouch && (t.indicator && !t.indicator.contains(i) || !t.controls.includes(i)) && (s.stopImmediatePropagation(), s.stopPropagation(), s.preventDefault());
}
function Ct(s) {
  const { target: i } = s, t = m(this);
  if (t && !t.isAnimating && !t.isTouch) {
    const { controls: e, indicators: n } = t;
    [...e, ...n].every(
      (o) => o === i || o.contains(i)
    ) || (C = s.pageX, this.contains(i) && (t.isTouch = !0, et(t, !0)));
  }
}
const At = (s) => {
  I = s.pageX;
}, Pt = (s) => {
  const { target: i } = s, t = T(i), e = [...y(A, t)].map((n) => m(n)).find((n) => n.isTouch);
  if (e) {
    const { element: n, index: o } = e, r = H(n);
    b = s.pageX, e.isTouch = !1, et(e), !t.getSelection()?.toString().length && n.contains(i) && Math.abs(C - b) > 120 && (I < C ? e.to(o + (r ? -1 : 1)) : I > C && e.to(o + (r ? 1 : -1))), C = 0, I = 0, b = 0;
  }
}, S = (s, i) => {
  const { indicators: t } = s;
  [...t].forEach((e) => $(e, g)), s.indicators[i] && u(t[i], g);
}, et = (s, i) => {
  const { element: t } = s, e = i ? W : Y;
  e(
    T(t),
    mt,
    At,
    N
  ), e(
    T(t),
    vt,
    Pt,
    N
  );
}, O = (s) => {
  const { slides: i, element: t } = s, e = D(`.${d}.${g}`, t);
  return ct(e) ? [...i].indexOf(e) : -1;
};
class It extends st {
  static selector = A;
  static init = pt;
  static getInstance = m;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(i, t) {
    super(i, t);
    const { element: e } = this;
    this.direction = H(e) ? "right" : "left", this.isTouch = !1, this.slides = it(d, e);
    const { slides: n } = this;
    if (n.length >= 2) {
      const o = O(this), r = [...n].find(
        (f) => nt(f, `.${d}-next,.${d}-next`)
      );
      this.index = o;
      const a = T(e);
      this.controls = [
        ...y(`[${p}]`, e),
        ...y(
          `[${p}][${j}="#${e.id}"]`,
          a
        )
      ].filter((f, v, c) => v === c.indexOf(f)), this.indicator = D(`.${E}-indicators`, e), this.indicators = [
        ...this.indicator ? y(`[${R}]`, this.indicator) : [],
        ...y(
          `[${R}][${j}="#${e.id}"]`,
          a
        )
      ].filter((f, v, c) => v === c.indexOf(f));
      const { options: l } = this;
      this.options.interval = l.interval === !0 ? z.interval : l.interval, r ? this.index = [...n].indexOf(r) : o < 0 && (this.index = 0, u(n[0], g), this.indicators.length && S(this, 0)), this.indicators.length && S(this, this.index), this._toggleEventListeners(!0), l.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return tt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return z;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return L(this.element, x);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return D(
      `.${d}-next,.${d}-prev`,
      this.element
    ) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: i, options: t, isPaused: e, index: n } = this;
    h.clear(i, E), e && (h.clear(i, x), $(i, x)), h.set(
      i,
      () => {
        this.element && !this.isPaused && !this.isTouch && U(i) && this.to(n + 1);
      },
      t.interval,
      E
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: i, options: t } = this;
    !this.isPaused && t.interval && (u(i, x), h.set(
      i,
      () => {
      },
      1,
      x
    ));
  }
  /** Slide to the next item. */
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  /** Slide to the previous item. */
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(i) {
    const { element: t, slides: e, options: n } = this, o = O(this), r = H(t);
    let a = i;
    if (!this.isAnimating && o !== a && !h.get(t, p)) {
      o < a || o === 0 && a === e.length - 1 ? this.direction = r ? "right" : "left" : (o > a || o === e.length - 1 && a === 0) && (this.direction = r ? "left" : "right");
      const { direction: l } = this;
      a < 0 ? a = e.length - 1 : a >= e.length && (a = 0);
      const f = l === "left" ? "next" : "prev", v = l === "left" ? "start" : "end", c = {
        relatedTarget: e[a],
        from: o,
        to: a,
        direction: l
      };
      X(w, c), X(B, c), k(t, w), w.defaultPrevented || (this.index = a, S(this, a), ot(e[a]) && L(t, "slide") ? h.set(
        t,
        () => {
          u(e[a], `${d}-${f}`), at(e[a]), u(e[a], `${d}-${v}`), u(e[o], `${d}-${v}`), K(
            e[a],
            () => this.slides && this.slides.length && F(this)
          );
        },
        0,
        p
      ) : (u(e[a], g), $(e[o], g), h.set(
        t,
        () => {
          h.clear(t, p), t && n.interval && !this.isPaused && this.cycle(), k(t, B);
        },
        0,
        p
      )));
    }
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (i) => {
    const { element: t, options: e, slides: n, controls: o, indicators: r } = this, { touch: a, pause: l, interval: f, keyboard: v } = e, c = i ? W : Y;
    l && f && (c(t, lt, xt), c(t, dt, $t)), a && n.length > 2 && (c(
      t,
      ht,
      Ct,
      N
    ), c(t, ft, G, { passive: !1 }), c(t, ut, G, { passive: !1 })), o.length && o.forEach((P) => {
      P && c(P, q, Tt);
    }), r.length && r.forEach((P) => {
      c(P, q, Et);
    }), v && c(T(t), gt, yt);
  };
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: i } = this, t = {
      ...this,
      isAnimating: i
    };
    this._toggleEventListeners(), super.dispose(), t.isAnimating && K(t.slides[t.index], () => {
      F(t);
    });
  }
}
export {
  It as default
};
//# sourceMappingURL=carousel.mjs.map
