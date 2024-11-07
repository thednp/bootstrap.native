import { B as st, U as A, G as it, E as nt, d as y, c as T, R as S, b as u, Y as N, y as h, Z as $, D as Y, N as K, q as R, i as ot, e as at, r as O, t as ct, v as Z, f as rt, g as lt, w as dt, h as L, k as ht, l as ft, n as ut, m as U, o as gt, p as F, j as J, x as mt, z as pt, s as _, u as j } from "./base-component-Jx2aafTJ.mjs";
import { E as Q, r as V } from "./event-listener-CUwvA4j6.mjs";
import { a as g } from "./activeClass-iqaD75Su.mjs";
import { d as q, g as W } from "./getTargetElement-Bv0W3Fir.mjs";
const P = "carousel", tt = "Carousel", I = `[data-bs-ride="${P}"]`, d = `${P}-item`, X = "data-bs-slide-to", v = "data-bs-slide", x = "paused", z = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, m = (s) => ct(s, tt), vt = (s) => new bt(s);
let E = 0, b = 0, H = 0;
const D = Z(`slide.bs.${P}`), k = Z(`slid.bs.${P}`), G = (s) => {
  const { index: i, direction: t, element: e, slides: n, options: o } = s;
  if (s.isAnimating) {
    const c = B(s), a = t === "left" ? "next" : "prev", l = t === "left" ? "start" : "end";
    u(n[i], g), $(n[i], `${d}-${a}`), $(n[i], `${d}-${l}`), $(n[c], g), $(n[c], `${d}-${l}`), R(e, k), h.clear(e, v), s.cycle && !y(e).hidden && o.interval && !s.isPaused && s.cycle();
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
function Pt(s) {
  s.preventDefault();
  const i = F(this, I) || W(this), t = m(i);
  if (t && !t.isAnimating) {
    const e = +(J(this, X) || 0);
    this && !N(this, g) && !Number.isNaN(e) && t.to(e);
  }
}
function yt(s) {
  s.preventDefault();
  const i = F(this, I) || W(this), t = m(i);
  if (t && !t.isAnimating) {
    const e = J(this, v);
    e === "next" ? t.next() : e === "prev" && t.prev();
  }
}
const Tt = ({ code: s, target: i }) => {
  const t = y(i), [e] = [...T(I, t)].filter((o) => Y(o)), n = m(e);
  if (n && !n.isAnimating && !/textarea|input/i.test(i.nodeName)) {
    const o = A(e);
    s === (o ? _ : j) ? n.prev() : s === (o ? j : _) && n.next();
  }
};
function M(s) {
  const { target: i } = s, t = m(this);
  t && t.isTouch && (t.indicator && !t.indicator.contains(i) || !t.controls.includes(i)) && (s.stopImmediatePropagation(), s.stopPropagation(), s.preventDefault());
}
function Et(s) {
  const { target: i } = s, t = m(this);
  if (t && !t.isAnimating && !t.isTouch) {
    const { controls: e, indicators: n } = t;
    [...e, ...n].every(
      (o) => o === i || o.contains(i)
    ) || (E = s.pageX, this.contains(i) && (t.isTouch = !0, et(t, !0)));
  }
}
const It = (s) => {
  b = s.pageX;
}, Ct = (s) => {
  const { target: i } = s, t = y(i), e = [...T(I, t)].map((n) => m(n)).find((n) => n.isTouch);
  if (e) {
    const { element: n, index: o } = e, c = A(n);
    H = s.pageX, e.isTouch = !1, et(e), !t.getSelection()?.toString().length && n.contains(i) && Math.abs(E - H) > 120 && (b < E ? e.to(o + (c ? -1 : 1)) : b > E && e.to(o + (c ? 1 : -1))), E = 0, b = 0, H = 0;
  }
}, w = (s, i) => {
  const { indicators: t } = s;
  [...t].forEach((e) => $(e, g)), s.indicators[i] && u(t[i], g);
}, et = (s, i) => {
  const { element: t } = s, e = i ? Q : V;
  e(
    y(t),
    mt,
    It,
    L
  ), e(
    y(t),
    pt,
    Ct,
    L
  );
}, B = (s) => {
  const { slides: i, element: t } = s, e = S(`.${d}.${g}`, t);
  return rt(e) ? [...i].indexOf(e) : -1;
};
class bt extends st {
  static selector = I;
  static init = vt;
  static getInstance = m;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(i, t) {
    super(i, t);
    const { element: e } = this;
    this.direction = A(e) ? "right" : "left", this.isTouch = !1, this.slides = it(d, e);
    const { slides: n } = this;
    if (n.length >= 2) {
      const o = B(this), c = [...n].find(
        (f) => nt(f, `.${d}-next,.${d}-next`)
      );
      this.index = o;
      const a = y(e);
      this.controls = [
        ...T(`[${v}]`, e),
        ...T(
          `[${v}][${q}="#${e.id}"]`,
          a
        )
      ].filter((f, p, r) => p === r.indexOf(f)), this.indicator = S(
        `.${P}-indicators`,
        e
      ), this.indicators = [
        ...this.indicator ? T(`[${X}]`, this.indicator) : [],
        ...T(
          `[${X}][${q}="#${e.id}"]`,
          a
        )
      ].filter((f, p, r) => p === r.indexOf(f));
      const { options: l } = this;
      this.options.interval = l.interval === !0 ? z.interval : l.interval, c ? this.index = [...n].indexOf(c) : o < 0 && (this.index = 0, u(n[0], g), this.indicators.length && w(this, 0)), this.indicators.length && w(this, this.index), this._toggleEventListeners(!0), l.interval && this.cycle();
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
    return N(this.element, x);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return S(
      `.${d}-next,.${d}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: i, options: t, isPaused: e, index: n } = this;
    h.clear(i, P), e && (h.clear(i, x), $(i, x)), h.set(
      i,
      () => {
        this.element && !this.isPaused && !this.isTouch && Y(i) && this.to(n + 1);
      },
      t.interval,
      P
    );
  }
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
  to(i) {
    const { element: t, slides: e, options: n } = this, o = B(this), c = A(t);
    let a = i;
    if (!this.isAnimating && o !== a && !h.get(t, v)) {
      o < a || o === 0 && a === e.length - 1 ? this.direction = c ? "right" : "left" : (o > a || o === e.length - 1 && a === 0) && (this.direction = c ? "left" : "right");
      const { direction: l } = this;
      a < 0 ? a = e.length - 1 : a >= e.length && (a = 0);
      const f = l === "left" ? "next" : "prev", p = l === "left" ? "start" : "end", r = {
        relatedTarget: e[a],
        from: o,
        to: a,
        direction: l
      };
      K(D, r), K(k, r), R(t, D), D.defaultPrevented || (this.index = a, w(this, a), ot(e[a]) && N(t, "slide") ? h.set(
        t,
        () => {
          u(e[a], `${d}-${f}`), at(e[a]), u(e[a], `${d}-${p}`), u(e[o], `${d}-${p}`), O(
            e[a],
            () => this.slides && this.slides.length && G(this)
          );
        },
        0,
        v
      ) : (u(e[a], g), $(e[o], g), h.set(
        t,
        () => {
          h.clear(t, v), t && n.interval && !this.isPaused && this.cycle(), R(t, k);
        },
        0,
        v
      )));
    }
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (i) => {
    const { element: t, options: e, slides: n, controls: o, indicators: c } = this, { touch: a, pause: l, interval: f, keyboard: p } = e, r = i ? Q : V;
    l && f && (r(t, lt, xt), r(t, dt, $t)), a && n.length > 2 && (r(
      t,
      ht,
      Et,
      L
    ), r(t, ft, M, { passive: !1 }), r(t, ut, M, { passive: !1 })), o.length && o.forEach((C) => {
      C && r(C, U, yt);
    }), c.length && c.forEach((C) => {
      r(C, U, Pt);
    }), p && r(y(t), gt, Tt);
  };
  dispose() {
    const { isAnimating: i } = this, t = {
      ...this,
      isAnimating: i
    };
    this._toggleEventListeners(), super.dispose(), t.isAnimating && O(t.slides[t.index], () => {
      G(t);
    });
  }
}
export {
  bt as default
};
//# sourceMappingURL=carousel.mjs.map
