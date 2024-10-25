var ot = Object.defineProperty;
var at = (s, n, t) => n in s ? ot(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var P = (s, n, t) => at(s, typeof n != "symbol" ? n + "" : n, t);
import { createCustomEvent as V, isRTL as S, getElementsByClassName as ct, matches as rt, getDocument as y, querySelectorAll as A, querySelector as R, addClass as g, hasClass as B, Timer as h, removeClass as E, isElementInScrollRange as W, ObjectAssign as _, dispatchEvent as N, getElementTransitionDuration as lt, reflow as dt, emulateTransitionEnd as q, mouseenterEvent as ht, mouseleaveEvent as ft, pointerdownEvent as ut, passiveHandler as X, touchstartEvent as gt, dragstartEvent as mt, mouseclickEvent as j, keydownEvent as vt, getInstance as pt, closest as Y, getAttribute as Z, pointermoveEvent as xt, pointerupEvent as $t, isHTMLElement as Et, keyArrowRight as U, keyArrowLeft as z } from "@thednp/shorty";
import { addListener as tt, removeListener as et } from "@thednp/event-listener";
import { a as m } from "./activeClass-iqaD75Su.mjs";
import { d as F, g as st } from "./getTargetElement-DbfK8LsG.mjs";
import { B as Tt } from "./base-component-nXu3wApu.mjs";
const T = "carousel", it = "Carousel", C = `[data-bs-ride="${T}"]`, d = `${T}-item`, O = "data-bs-slide-to", x = "data-bs-slide", $ = "paused", G = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, v = (s) => pt(s, it), yt = (s) => new L(s);
let I = 0, b = 0, w = 0;
const D = V(`slide.bs.${T}`), K = V(`slid.bs.${T}`), J = (s) => {
  const { index: n, direction: t, element: e, slides: i, options: o } = s;
  // istanbul ignore else @preserve
  if (s.isAnimating) {
    const c = M(s), r = t === "left" ? "next" : "prev", a = t === "left" ? "start" : "end";
    g(i[n], m), E(i[n], `${d}-${r}`), E(i[n], `${d}-${a}`), E(i[c], m), E(i[c], `${d}-${a}`), N(e, K), h.clear(e, x), s.cycle && !y(e).hidden && o.interval && !s.isPaused && s.cycle();
  }
};
function At() {
  const s = v(this);
  // istanbul ignore else @preserve
  s && !s.isPaused && !h.get(this, $) && g(this, $);
}
function Pt() {
  const s = v(this);
  // istanbul ignore else @preserve
  s && s.isPaused && !h.get(this, $) && s.cycle();
}
function It(s) {
  s.preventDefault();
  const n = Y(this, C) || st(this), t = v(n);
  // istanbul ignore else @preserve
  if (t && !t.isAnimating) {
    const e = +(Z(this, O) || // istanbul ignore next @preserve
    0);
    // istanbul ignore else @preserve
    this && !B(this, m) && // event target is not active
    !Number.isNaN(e) && t.to(e);
  }
}
function Ct(s) {
  s.preventDefault();
  const n = Y(this, C) || st(this), t = v(n);
  // istanbul ignore else @preserve
  if (t && !t.isAnimating) {
    const e = Z(this, x);
    // istanbul ignore else @preserve
    e === "next" ? t.next() : e === "prev" && t.prev();
  }
}
const Ht = ({ code: s, target: n }) => {
  const t = y(n), [e] = [...A(C, t)].filter((o) => W(o)), i = v(e);
  // istanbul ignore next @preserve
  if (i && !i.isAnimating && !/textarea|input/i.test(n.nodeName)) {
    const o = S(e), c = o ? z : U, r = o ? U : z;
    // istanbul ignore else @preserve
    s === r ? i.prev() : s === c && i.next();
  }
};
function Q(s) {
  const { target: n } = s, t = v(this);
  // istanbul ignore next @preserve
  t && t.isTouch && (t.indicator && !t.indicator.contains(n) || !t.controls.includes(n)) && (s.stopImmediatePropagation(), s.stopPropagation(), s.preventDefault());
}
function bt(s) {
  const { target: n } = s, t = v(this);
  // istanbul ignore else @preserve
  if (t && !t.isAnimating && !t.isTouch) {
    const { controls: e, indicators: i } = t;
    // istanbul ignore else @preserve
    if (![...e, ...i].every((o) => o === n || o.contains(n))) {
      I = s.pageX;
      // istanbul ignore else @preserve
      this.contains(n) && (t.isTouch = !0, nt(t, !0));
    }
  }
}
const Lt = (s) => {
  b = s.pageX;
}, St = (s) => {
  var i;
  const { target: n } = s, t = y(n), e = [...A(C, t)].map((o) => v(o)).find((o) => o.isTouch);
  // istanbul ignore else @preserve
  if (e) {
    const { element: o, index: c } = e, r = S(o);
    if (w = s.pageX, e.isTouch = !1, nt(e), !((i = t.getSelection()) != null && i.toString().length) && o.contains(n) && Math.abs(I - w) > 120) {
      // istanbul ignore else @preserve
      b < I ? e.to(c + (r ? -1 : 1)) : b > I && e.to(c + (r ? 1 : -1));
    }
    I = 0, b = 0, w = 0;
  }
}, k = (s, n) => {
  const { indicators: t } = s;
  [...t].forEach((e) => E(e, m));
  // istanbul ignore else @preserve
  s.indicators[n] && g(t[n], m);
}, nt = (s, n) => {
  const { element: t } = s, e = n ? tt : et;
  e(y(t), xt, Lt, X), e(y(t), $t, St, X);
}, M = (s) => {
  const { slides: n, element: t } = s, e = R(`.${d}.${m}`, t);
  return Et(e) ? [...n].indexOf(e) : -1;
};
class L extends Tt {
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(t, e) {
    super(t, e);
    /**
     * Toggles all event listeners for the `Carousel` instance.
     *
     * @param add when `TRUE` event listeners are added
     */
    P(this, "_toggleEventListeners", (t) => {
      const { element: e, options: i, slides: o, controls: c, indicators: r } = this, { touch: a, pause: f, interval: u, keyboard: p } = i, l = t ? tt : et;
      f && u && (l(e, ht, At), l(e, ft, Pt)), a && o.length > 2 && (l(e, ut, bt, X), l(e, gt, Q, { passive: !1 }), l(e, mt, Q, { passive: !1 }));
      // istanbul ignore else @preserve
      c.length && c.forEach((H) => {
        // istanbul ignore else @preserve
        H && l(H, j, Ct);
      });
      // istanbul ignore else @preserve
      r.length && r.forEach((H) => {
        l(H, j, It);
      }), p && l(y(e), vt, Ht);
    });
    const { element: i } = this;
    this.direction = S(i) ? "right" : "left", this.isTouch = !1, this.slides = ct(d, i);
    const { slides: o } = this;
    if (o.length >= 2) {
      const c = M(this), r = [...o].find((u) => rt(u, `.${d}-next,.${d}-next`));
      this.index = c;
      const a = y(i);
      this.controls = [
        ...A(`[${x}]`, i),
        ...A(`[${x}][${F}="#${i.id}"]`, a)
      ].filter((u, p, l) => p === l.indexOf(u)), this.indicator = R(`.${T}-indicators`, i), this.indicators = [
        ...this.indicator ? A(`[${O}]`, this.indicator) : (
          // istanbul ignore next @preserve
          []
        ),
        ...A(`[${O}][${F}="#${i.id}"]`, a)
      ].filter((u, p, l) => p === l.indexOf(u));
      const { options: f } = this;
      this.options.interval = f.interval === !0 ? G.interval : f.interval;
      // istanbul ignore next @preserve - impossible to test
      r ? this.index = [...o].indexOf(r) : c < 0 && (this.index = 0, g(o[0], m), this.indicators.length && k(this, 0));
      // istanbul ignore else @preserve
      this.indicators.length && k(this, this.index), this._toggleEventListeners(!0), f.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return it;
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
    return B(this.element, $);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return R(`.${d}-next,.${d}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: t, options: e, isPaused: i, index: o } = this;
    h.clear(t, T), i && (h.clear(t, $), E(t, $)), h.set(
      t,
      () => {
        // istanbul ignore else @preserve
        this.element && !this.isPaused && !this.isTouch && W(t) && this.to(o + 1);
      },
      e.interval,
      T
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: t, options: e } = this;
    // istanbul ignore else @preserve
    !this.isPaused && e.interval && (g(t, $), h.set(
      t,
      () => {
      },
      1,
      $
    ));
  }
  /** Slide to the next item. */
  next() {
    // istanbul ignore else @preserve
    this.isAnimating || this.to(this.index + 1);
  }
  /** Slide to the previous item. */
  prev() {
    // istanbul ignore else @preserve
    this.isAnimating || this.to(this.index - 1);
  }
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(t) {
    const { element: e, slides: i, options: o } = this, c = M(this), r = S(e);
    let a = t;
    if (!this.isAnimating && c !== a && !h.get(e, x)) {
      // istanbul ignore else @preserve
      c < a || c === 0 && a === i.length - 1 ? this.direction = r ? "right" : "left" : (c > a || c === i.length - 1 && a === 0) && (this.direction = r ? "left" : "right");
      const { direction: f } = this;
      a < 0 ? a = i.length - 1 : a >= i.length && (a = 0);
      const u = f === "left" ? "next" : "prev", p = f === "left" ? "start" : "end", l = {
        relatedTarget: i[a],
        from: c,
        to: a,
        direction: f
      };
      _(D, l), _(K, l), N(e, D), D.defaultPrevented || (this.index = a, k(this, a), lt(i[a]) && B(e, "slide") ? h.set(
        e,
        () => {
          g(i[a], `${d}-${u}`), dt(i[a]), g(i[a], `${d}-${p}`), g(i[c], `${d}-${p}`), q(
            i[a],
            () => this.slides && this.slides.length && J(this)
          );
        },
        0,
        x
      ) : (g(i[a], m), E(i[c], m), h.set(
        e,
        () => {
          h.clear(e, x);
          // istanbul ignore else @preserve
          e && o.interval && !this.isPaused && this.cycle(), N(e, K);
        },
        0,
        x
      )));
    }
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: t } = this, e = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose();
    // istanbul ignore next @preserve - impossible to test
    e.isAnimating && q(e.slides[e.index], () => {
      J(e);
    });
  }
}
P(L, "selector", C), P(L, "init", yt), P(L, "getInstance", v);
export {
  L as default
};
//# sourceMappingURL=carousel.mjs.map
