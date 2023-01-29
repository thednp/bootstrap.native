const xt = {}, ds = (t) => {
  const { type: e, currentTarget: s } = t;
  [...xt[e]].forEach(([n, o]) => {
    s === n && [...o].forEach(([i, r]) => {
      i.apply(n, [t]), typeof r == "object" && r.once && k(n, e, i, r);
    });
  });
}, I = (t, e, s, n) => {
  xt[e] || (xt[e] = /* @__PURE__ */ new Map());
  const o = xt[e];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: r } = i;
  i.set(s, n), r || t.addEventListener(e, ds, n);
}, k = (t, e, s, n) => {
  const o = xt[e], i = o && o.get(t), r = i && i.get(s), a = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete xt[e], (!i || !i.size) && t.removeEventListener(e, ds, a);
}, Go = I, Qo = k, ea = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: I,
  globalListener: ds,
  off: Qo,
  on: Go,
  registry: xt,
  removeListener: k
}, Symbol.toStringTag, { value: "Module" })), Bn = "aria-describedby", be = "aria-expanded", He = "aria-hidden", Se = "aria-modal", Ss = "aria-pressed", Ke = "aria-selected", Zo = "DOMContentLoaded", hs = "focus", fs = "focusin", Rn = "focusout", Pe = "keydown", Jo = "keyup", M = "click", ti = "mousedown", ei = "hover", xe = "mouseenter", us = "mouseleave", si = "pointerdown", ni = "pointermove", oi = "pointerup", De = "resize", Ae = "scroll", ps = "touchstart", ii = "dragstart", Je = "ArrowDown", ts = "ArrowUp", Ps = "ArrowLeft", xs = "ArrowRight", gs = "Escape", ri = "transitionDuration", ai = "transitionDelay", Ve = "transitionend", Wn = "transitionProperty", ci = navigator.userAgentData, we = ci, { userAgent: li } = navigator, $e = li, Ds = /iPhone|iPad|iPod|Android/i;
we ? we.brands.some((t) => Ds.test(t.brand)) : Ds.test($e);
const As = /(iPhone|iPod|iPad)/, di = we ? we.brands.some((t) => As.test(t.brand)) : As.test($e);
$e && $e.includes("Firefox");
const { head: Ie } = document;
["webkitPerspective", "perspective"].some((t) => t in Ie.style);
const hi = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, fi = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, ui = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), fi(t, e, o, n));
  };
  hi(t, e, o, n);
}, oe = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    ui(document, Zo, oe, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Ie.style);
["webkitAnimation", "animation"].some((t) => t in Ie.style);
["webkitTransition", "transition"].some((t) => t in Ie.style);
const Bt = (t, e) => t.getAttribute(e), Te = (t, e) => t.hasAttribute(e), N = (t, e, s) => t.setAttribute(e, s), Ot = (t, e) => t.removeAttribute(e), d = (t, ...e) => {
  t.classList.add(...e);
}, m = (t, ...e) => {
  t.classList.remove(...e);
}, h = (t, e) => t.classList.contains(e), ce = (t) => t != null && typeof t == "object" || !1, P = (t) => ce(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, T = (t) => P(t) && t.nodeType === 1 || !1, te = /* @__PURE__ */ new Map(), Dt = {
  set: (t, e, s) => {
    T(t) && (te.has(e) || te.set(e, /* @__PURE__ */ new Map()), te.get(e).set(t, s));
  },
  getAllFor: (t) => te.get(t) || null,
  get: (t, e) => {
    if (!T(t) || !e)
      return null;
    const s = Dt.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  remove: (t, e) => {
    const s = Dt.getAllFor(e);
    !s || !T(t) || (s.delete(t), s.size === 0 && te.delete(e));
  }
}, j = (t, e) => Dt.get(t, e), At = (t) => typeof t == "string" || !1, ms = (t) => ce(t) && t.constructor.name === "Window" || !1, Fn = (t) => P(t) && t.nodeType === 9 || !1, b = (t) => ms(t) ? t.document : Fn(t) ? t : P(t) ? t.ownerDocument : window.document, ne = (t) => Object.entries(t), vt = (t) => {
  if (!t)
    return;
  if (At(t))
    return b().createElement(t);
  const { tagName: e } = t, s = vt(e);
  if (!s)
    return;
  const n = { ...t };
  return delete n.tagName, ne(n).forEach(([o, i]) => {
    At(o) && At(i) && N(s, o, i);
  }), s;
}, v = (t, e) => t.dispatchEvent(e), V = (t, e) => {
  const s = getComputedStyle(t), n = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, pi = (t) => {
  const e = V(t, Wn), s = V(t, ai), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (t) => {
  const e = V(t, Wn), s = V(t, ri), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, L = (t, e) => {
  let s = 0;
  const n = new Event(Ve), o = le(t), i = pi(t);
  if (o) {
    const r = (a) => {
      a.target === t && (e.apply(t, [a]), t.removeEventListener(Ve, r), s = 1);
    };
    t.addEventListener(Ve, r), setTimeout(() => {
      s || v(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, at = (t, e) => t.focus(e), Is = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, Xt = (t) => t.toLowerCase(), gi = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, r = { ...e }, a = {}, c = "title";
  return ne(i).forEach(([l, f]) => {
    const g = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (E) => Xt(E)) : l;
    a[g] = Is(f);
  }), ne(o).forEach(([l, f]) => {
    o[l] = Is(f);
  }), ne(e).forEach(([l, f]) => {
    l in o ? r[l] = o[l] : l in a ? r[l] = a[l] : r[l] = l === c ? Bt(t, c) : f;
  }), r;
}, Tt = (t, ...e) => Object.assign(t, ...e), es = (t) => Object.keys(t), mi = (t) => Object.values(t), w = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return ce(e) && Tt(s, e), s;
}, et = { passive: !0 }, Rt = (t) => t.offsetHeight, x = (t, e) => {
  ne(e).forEach(([s, n]) => {
    if (n && At(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, Tt(t.style, o);
    }
  });
}, ss = (t) => ce(t) && t.constructor.name === "Map" || !1, vi = (t) => typeof t == "number" || !1, pt = /* @__PURE__ */ new Map(), u = {
  set: (t, e, s, n) => {
    !T(t) || (n && n.length ? (pt.has(t) || pt.set(t, /* @__PURE__ */ new Map()), pt.get(t).set(n, setTimeout(e, s))) : pt.set(t, setTimeout(e, s)));
  },
  get: (t, e) => {
    if (!T(t))
      return null;
    const s = pt.get(t);
    return e && s && ss(s) ? s.get(e) || null : vi(s) ? s : null;
  },
  clear: (t, e) => {
    if (!T(t))
      return;
    const s = pt.get(t);
    e && e.length && ss(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && pt.delete(t)) : (clearTimeout(s), pt.delete(t));
  }
}, de = (t, e) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: a } = t.getBoundingClientRect();
  let c = 1, l = 1;
  if (e && T(t)) {
    const { offsetWidth: f, offsetHeight: g } = t;
    c = f > 0 ? Math.round(s) / f : 1, l = g > 0 ? Math.round(n) / g : 1;
  }
  return {
    width: s / c,
    height: n / l,
    top: o / l,
    right: i / c,
    bottom: r / l,
    left: a / c,
    x: a / c,
    y: o / l
  };
}, Et = (t) => b(t).body, ct = (t) => b(t).documentElement, jn = (t) => P(t) && t.constructor.name === "ShadowRoot" || !1, bi = (t) => t.nodeName === "HTML" ? t : T(t) && t.assignedSlot || P(t) && t.parentNode || jn(t) && t.host || ct(t);
let ks = 0, Ns = 0;
const Kt = /* @__PURE__ */ new Map(), zn = (t, e) => {
  let s = e ? ks : Ns;
  if (e) {
    const n = zn(t), o = Kt.get(n) || /* @__PURE__ */ new Map();
    Kt.has(n) || Kt.set(n, o), ss(o) && !o.has(e) ? (o.set(e, s), ks += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    Kt.has(n) ? s = Kt.get(n) : (Kt.set(n, s), Ns += 1);
  }
  return s;
}, _t = (t) => {
  var e;
  return t ? Fn(t) ? t.defaultView : P(t) ? (e = t?.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, wi = (t) => Array.isArray(t) || !1, Kn = (t) => {
  if (!P(t))
    return !1;
  const { top: e, bottom: s } = de(t), { clientHeight: n } = ct(t);
  return e <= n && s >= 0;
}, ke = (t) => typeof t == "function" || !1, $i = (t) => ce(t) && t.constructor.name === "NodeList" || !1, yt = (t) => ct(t).dir === "rtl", Ti = (t) => P(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, A = (t, e) => t ? t.closest(e) || A(t.getRootNode().host, e) : null, S = (t, e) => T(t) ? t : (P(e) ? e : b()).querySelector(t), vs = (t, e) => (P(e) ? e : b()).getElementsByTagName(t), J = (t, e) => (P(e) ? e : b()).querySelectorAll(t), bt = (t, e) => (e && P(e) ? e : b()).getElementsByClassName(
  t
), yi = (t, e) => t.matches(e), B = "fade", p = "show", Ne = "data-bs-dismiss", Oe = "alert", Vn = "Alert", Ei = "5.0.0-alpha5", Ci = Ei;
class st {
  element;
  options;
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, s) {
    const n = S(e);
    if (!n)
      throw At(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = Dt.get(n, this.name);
    o && o.dispose(), this.element = n, this.defaults && es(this.defaults).length && (this.options = gi(n, this.defaults, s || {}, "bs")), Dt.set(n, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return Ci;
  }
  /* istanbul ignore next */
  get name() {
    return "BaseComponent";
  }
  /* istanbul ignore next */
  get defaults() {
    return {};
  }
  /**
   * Removes component from target element;
   */
  dispose() {
    Dt.remove(this.element, this.name), es(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Os = `.${Oe}`, Hi = `[${Ne}="${Oe}"]`, Ms = (t) => j(t, Vn), Si = (t) => new Xn(t), Ls = w(`close.bs.${Oe}`), Pi = w(`closed.bs.${Oe}`), Bs = (t) => {
  const { element: e } = t;
  ns(t), v(e, Pi), t.dispose(), e.remove();
}, ns = (t, e) => {
  const s = e ? I : k, { dismiss: n } = t;
  n && s(n, M, t.close);
};
class Xn extends st {
  static selector = Os;
  static init = Si;
  static getInstance = Ms;
  dismiss;
  constructor(e) {
    super(e), this.dismiss = S(Hi, this.element), ns(this, !0);
  }
  /** Returns component name string. */
  get name() {
    return Vn;
  }
  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   *
   * @param e the `click` event
   */
  close(e) {
    const s = e ? Ms(A(e.target, Os)) : this, { element: n } = s;
    if (n && h(n, p)) {
      if (v(n, Ls), Ls.defaultPrevented)
        return;
      m(n, p), h(n, B) ? L(n, () => Bs(s)) : Bs(s);
    }
  }
  /** Remove the component from target element. */
  dispose() {
    ns(this), super.dispose();
  }
}
const y = "active", U = "data-bs-toggle", xi = "button", Yn = "Button", Di = `[${U}="${xi}"]`, Rs = (t) => j(t, Yn), Ai = (t) => new Un(t), Ws = (t, e) => {
  (e ? I : k)(t.element, M, t.toggle);
};
class Un extends st {
  static selector = Di;
  static init = Ai;
  static getInstance = Rs;
  isActive = !1;
  /**
   * @param target usually a `.btn` element
   */
  constructor(e) {
    super(e);
    const { element: s } = this;
    this.isActive = h(s, y), N(s, Ss, String(!!this.isActive)), Ws(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Yn;
  }
  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle(e) {
    e && e.preventDefault();
    const s = e ? Rs(e.target) : this;
    if (!s.element)
      return;
    const { element: n, isActive: o } = s;
    if (h(n, "disabled"))
      return;
    (o ? m : d)(n, y), N(n, Ss, o ? "false" : "true"), s.isActive = h(n, y);
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    Ws(this), super.dispose();
  }
}
const os = "data-bs-target", It = "carousel", _n = "Carousel", Fs = "data-bs-parent", Ii = "data-bs-container", F = (t) => {
  const e = [os, Fs, Ii, "href"], s = b(t);
  return e.map((n) => {
    const o = Bt(t, n);
    return o ? n === Fs ? A(t, o) : S(o, s) : null;
  }).filter((n) => n)[0];
}, he = `[data-bs-ride="${It}"]`, Z = `${It}-item`, is = "data-bs-slide-to", mt = "data-bs-slide", wt = "paused", js = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ot = (t) => j(t, _n), ki = (t) => new Gn(t);
let St = 0, Vt = 0, ee = 0;
const Xe = w(`slide.bs.${It}`), rs = w(`slid.bs.${It}`), Ni = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating && ot(n)) {
    const r = as(t), a = s === "left" ? "next" : "prev", c = s === "left" ? "start" : "end";
    d(o[e], y), m(o[e], `${Z}-${a}`), m(o[e], `${Z}-${c}`), m(o[r], y), m(o[r], `${Z}-${c}`), v(n, rs), u.clear(n, mt), !b(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Oi() {
  const t = ot(this);
  t && !t.isPaused && !u.get(this, wt) && d(this, wt);
}
function Mi() {
  const t = ot(this);
  t && t.isPaused && !u.get(this, wt) && t.cycle();
}
function Li(t) {
  t.preventDefault();
  const e = A(this, he) || F(this), s = ot(e);
  if (!s || s.isAnimating)
    return;
  const n = +(Bt(this, is) || /* istanbul ignore next */
  0);
  this && !h(this, y) && // event target is not active
  !Number.isNaN(n) && s.to(n);
}
function Bi(t) {
  t.preventDefault();
  const e = A(this, he) || F(this), s = ot(e);
  if (!s || s.isAnimating)
    return;
  const n = Bt(this, mt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Ri = ({ code: t, target: e }) => {
  const s = b(e), [n] = [...J(he, s)].filter((c) => Kn(c)), o = ot(n);
  if (!o || o.isAnimating || /textarea|input/i.test(e.nodeName))
    return;
  const i = yt(n);
  t === (i ? xs : Ps) ? o.prev() : t === (i ? Ps : xs) && o.next();
};
function zs(t) {
  const { target: e } = t, s = ot(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(e) || !s.controls.includes(e)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function Wi(t) {
  const { target: e } = t, s = ot(this);
  if (!s || s.isAnimating || s.isTouch)
    return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].some((i) => i === e || i.contains(e)) || (St = t.pageX, this.contains(e) && (s.isTouch = !0, qn(s, !0)));
}
const Fi = (t) => {
  Vt = t.pageX;
}, ji = (t) => {
  const { target: e } = t, s = b(e), n = [...J(he, s)].map((a) => ot(a)).find((a) => a.isTouch);
  if (!n)
    return;
  const { element: o, index: i } = n, r = yt(o);
  if (n.isTouch = !1, qn(n), s.getSelection()?.toString().length) {
    St = 0, Vt = 0, ee = 0;
    return;
  }
  if (ee = t.pageX, !o.contains(e) || Math.abs(St - ee) < 120) {
    St = 0, Vt = 0, ee = 0;
    return;
  }
  Vt < St ? n.to(i + (r ? -1 : 1)) : Vt > St && n.to(i + (r ? 1 : -1)), St = 0, Vt = 0, ee = 0;
}, Ye = (t, e) => {
  const { indicators: s } = t;
  [...s].forEach((n) => m(n, y)), t.indicators[e] && d(s[e], y);
}, qn = (t, e) => {
  const { element: s } = t, n = e ? I : k;
  n(b(s), ni, Fi, et), n(b(s), oi, ji, et);
}, Ks = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: r } = t, { touch: a, pause: c, interval: l, keyboard: f } = n, g = e ? I : k;
  c && l && (g(s, xe, Oi), g(s, us, Mi)), a && o.length > 2 && (g(s, si, Wi, et), g(s, ps, zs, { passive: !1 }), g(s, ii, zs, { passive: !1 })), i.length && i.forEach((E) => {
    E && g(E, M, Bi);
  }), r.length && r.forEach((E) => {
    g(E, M, Li);
  }), f && g(b(s), Pe, Ri);
}, as = (t) => {
  const { slides: e, element: s } = t, n = S(`.${Z}.${y}`, s);
  return T(n) ? [...e].indexOf(n) : -1;
};
class Gn extends st {
  static selector = he;
  static init = ki;
  static getInstance = ot;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.direction = yt(n) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = bt(Z, n);
    const { slides: o } = this;
    if (o.length < 2)
      return;
    const i = b(n);
    this.controls = [
      ...J(`[${mt}]`, n),
      ...J(`[${mt}][${os}="#${n.id}"]`, i)
    ], this.indicator = S(`.${It}-indicators`, n), this.indicators = [
      ...this.indicator ? J(`[${is}]`, this.indicator) : [],
      ...J(`[${is}][${os}="#${n.id}"]`, i)
    ];
    const { options: r } = this;
    this.options.interval = r.interval === !0 ? js.interval : r.interval, as(this) < 0 && (d(o[0], y), this.indicators.length && Ye(this, 0)), Ks(this, !0), r.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return _n;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return js;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return h(this.element, wt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return S(`.${Z}-next,.${Z}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    u.clear(e, It), n && (u.clear(e, wt), m(e, wt)), u.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && Kn(e) && this.to(o + 1);
      },
      s.interval,
      It
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: s } = this;
    !this.isPaused && s.interval && (d(e, wt), u.set(
      e,
      () => {
      },
      1,
      wt
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
  to(e) {
    const { element: s, slides: n, options: o } = this, i = as(this), r = yt(s);
    let a = e;
    if (this.isAnimating || i === a || u.get(s, mt))
      return;
    i < a || i === 0 && a === n.length - 1 ? this.direction = r ? "right" : "left" : (i > a || i === n.length - 1 && a === 0) && (this.direction = r ? "left" : "right");
    const { direction: c } = this;
    a < 0 ? a = n.length - 1 : a >= n.length && (a = 0);
    const l = c === "left" ? "next" : "prev", f = c === "left" ? "start" : "end", g = {
      relatedTarget: n[a],
      from: i,
      to: a,
      direction: c
    };
    Tt(Xe, g), Tt(rs, g), v(s, Xe), !Xe.defaultPrevented && (this.index = a, Ye(this, a), le(n[a]) && h(s, "slide") ? u.set(
      s,
      () => {
        d(n[a], `${Z}-${l}`), Rt(n[a]), d(n[a], `${Z}-${f}`), d(n[i], `${Z}-${f}`), L(n[a], () => Ni(this));
      },
      0,
      mt
    ) : (d(n[a], y), m(n[i], y), u.set(
      s,
      () => {
        u.clear(s, mt), s && o.interval && !this.isPaused && this.cycle(), v(s, rs);
      },
      0,
      mt
    )));
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { slides: e } = this, s = ["start", "end", "prev", "next"];
    [...e].forEach((n, o) => {
      h(n, y) && Ye(this, o), s.forEach((i) => m(n, `${Z}-${i}`));
    }), Ks(this), super.dispose();
  }
}
const Mt = "collapsing", X = "collapse", Qn = "Collapse", zi = `.${X}`, Zn = `[${U}="${X}"]`, Ki = { parent: null }, ge = (t) => j(t, Qn), Vi = (t) => new Jn(t), Vs = w(`show.bs.${X}`), Xi = w(`shown.bs.${X}`), Xs = w(`hide.bs.${X}`), Yi = w(`hidden.bs.${X}`), Ui = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  v(e, Vs), !Vs.defaultPrevented && (u.set(e, oe, 17), s && u.set(s, oe, 17), d(e, Mt), m(e, X), x(e, { height: `${e.scrollHeight}px` }), L(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => N(o, be, "true")), m(e, Mt), d(e, X), d(e, p), x(e, { height: "" }), v(e, Xi);
  }));
}, Ys = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  v(e, Xs), !Xs.defaultPrevented && (u.set(e, oe, 17), s && u.set(s, oe, 17), x(e, { height: `${e.scrollHeight}px` }), m(e, X), m(e, p), d(e, Mt), Rt(e), x(e, { height: "0px" }), L(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => N(o, be, "false")), m(e, Mt), d(e, X), x(e, { height: "" }), v(e, Yi);
  }));
}, Us = (t, e) => {
  const s = e ? I : k, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, _i));
}, _i = (t) => {
  const { target: e } = t, s = e && A(e, Zn), n = s && F(s), o = n && ge(n);
  o && o.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class Jn extends st {
  static selector = zi;
  static init = Vi;
  static getInstance = ge;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this, i = b(n);
    this.triggers = [...J(Zn, i)].filter((r) => F(r) === n), this.parent = S(o.parent, i) || F(n) || null, this.parent = F(n) || null, Us(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Qn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ki;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: s } = this;
    u.get(s) || (Ys(this), e.length && e.forEach((n) => d(n, `${X}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...J(`.${X}.${p}`, s)].find(
      (r) => ge(r)
    ), i = o && ge(o)), (!s || !u.get(s)) && !u.get(e) && (i && o !== e && (Ys(i), i.triggers.forEach((r) => {
      d(r, `${X}d`);
    })), Ui(this), n.length && n.forEach((r) => m(r, `${X}d`)));
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    Us(this), super.dispose();
  }
}
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], to = "Dropdown", eo = "dropdown-menu", so = (t) => {
  const e = A(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  Te(t, "href") && t.href.slice(-1) === "#" || // OR a child of an anchor with href starts with #
  e && Te(e, "href") && e.href.slice(-1) === "#";
}, [tt, ye, Ee, Ce] = Lt, bs = `[${U}="${tt}"],[${U}="${ye}"],[${U}="${Ce}"],[${U}="${Ee}"]`, Yt = (t) => j(t, to), qi = (t) => new io(t), Gi = `${eo}-end`, _s = [tt, ye], qs = [Ee, Ce], Gs = ["A", "BUTTON"], Qi = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, Ue = w(`show.bs.${tt}`), Qs = w(`shown.bs.${tt}`), _e = w(`hide.bs.${tt}`), Zs = w(`hidden.bs.${tt}`), no = w(`updated.bs.${tt}`), oo = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (V(s, "position") === "static")
    return;
  const r = yt(e), a = h(s, Gi);
  ["margin", "top", "bottom", "left", "right"].forEach((O) => {
    const ht = {};
    ht[O] = "", x(s, ht);
  });
  let l = Lt.find((O) => h(n, O)) || /* istanbul ignore next: fallback position */
  tt;
  const f = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
  }, g = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: E, offsetHeight: R } = s, { clientWidth: q, clientHeight: $ } = ct(e), { left: z, top: Y, width: Ft, height: it } = de(e), H = z - E - i < 0, lt = z + E + Ft + i >= q, nt = Y + R + i >= $, W = Y + R + it + i >= $, K = Y - R - i < 0, C = (!r && a || r && !a) && z + Ft - E < 0, jt = (r && a || !r && !a) && z + E >= q;
  if (qs.includes(l) && H && lt && (l = tt), l === Ee && (r ? lt : H) && (l = Ce), l === Ce && (r ? H : lt) && (l = Ee), l === ye && K && !W && (l = tt), l === tt && W && !K && (l = ye), qs.includes(l) && nt && Tt(g[l], {
    top: "auto",
    bottom: 0
  }), _s.includes(l) && (C || jt)) {
    let O = { left: "auto", right: "auto" };
    !C && jt && !r && (O = { left: "auto", right: 0 }), C && !jt && r && (O = { left: 0, right: "auto" }), O && Tt(g[l], O);
  }
  const dt = f[l];
  x(s, {
    ...g[l],
    margin: `${dt.map((O) => O && `${O}px`).join(" ")}`
  }), _s.includes(l) && a && a && x(s, g[!r && C || r && jt ? "menuStart" : (
    /* istanbul ignore next */
    "menuEnd"
  )]), v(n, no);
}, Zi = (t) => [...t.children].map((e) => {
  if (e && Gs.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && Gs.includes(s.tagName) ? s : null;
}).filter((e) => e), Js = (t) => {
  const { element: e, options: s } = t, n = t.open ? I : k, o = b(e);
  n(o, M, en), n(o, hs, en), n(o, Pe, tr), n(o, Jo, er), s.display === "dynamic" && [Ae, De].forEach((i) => {
    n(_t(e), i, sr, et);
  });
}, tn = (t, e) => {
  (e ? I : k)(t.element, M, Ji);
}, Me = (t) => {
  const e = [...Lt, "btn-group", "input-group"].map((s) => bt(`${s} ${p}`, b(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Lt.some((n) => n === Bt(s, U))
    );
}, en = (t) => {
  const { target: e, type: s } = t;
  if (!e || !e.closest)
    return;
  const n = Me(e), o = n && Yt(n);
  if (!o)
    return;
  const { parentElement: i, menu: r } = o, a = A(e, bs) !== null, c = i && i.contains(e) && (e.tagName === "form" || A(e, "form") !== null);
  s === M && so(e) && t.preventDefault(), !(s === hs && (e === n || e === r || r.contains(e))) && (c || a || o && o.hide());
}, Ji = (t) => {
  const { target: e } = t, s = e && A(e, bs), n = s && Yt(s);
  n && (t.stopImmediatePropagation(), n.toggle(), s && so(s) && t.preventDefault());
}, tr = (t) => {
  [Je, ts].includes(t.code) && t.preventDefault();
};
function er(t) {
  const { code: e } = t, s = Me(this), n = s && Yt(s), { activeElement: o } = s && b(s);
  if (!n || !o)
    return;
  const { menu: i, open: r } = n, a = Zi(i);
  if (a && a.length && [Je, ts].includes(e)) {
    let c = a.indexOf(o);
    o === s ? c = 0 : e === ts ? c = c > 1 ? c - 1 : 0 : e === Je && (c = c < a.length - 1 ? c + 1 : c), a[c] && at(a[c]);
  }
  gs === e && r && (n.toggle(), at(s));
}
function sr() {
  const t = Me(this), e = t && Yt(t);
  e && e.open && oo(e);
}
class io extends st {
  static selector = bs;
  static init = qi;
  static getInstance = Yt;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { parentElement: n } = this.element;
    this.parentElement = n, this.menu = S(`.${eo}`, n), tn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return to;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Qi;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    if (s)
      return;
    const i = Me(e), r = i && Yt(i);
    r && r.hide(), [Ue, Qs, no].forEach((a) => {
      a.relatedTarget = e;
    }), v(o, Ue), !Ue.defaultPrevented && (d(n, p), d(o, p), N(e, be, "true"), oo(this), this.open = !s, at(e), Js(this), v(o, Qs));
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    s && ([_e, Zs].forEach((i) => {
      i.relatedTarget = e;
    }), v(o, _e), !_e.defaultPrevented && (m(n, p), m(o, p), N(e, be, "false"), this.open = !s, Js(this), v(o, Zs)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), tn(this), super.dispose();
  }
}
const _ = "modal", ws = "Modal", $s = "Offcanvas", nr = "fixed-top", or = "fixed-bottom", ro = "sticky-top", ao = "position-sticky", co = (t) => [
  ...bt(nr, t),
  ...bt(or, t),
  ...bt(ro, t),
  ...bt(ao, t),
  ...bt("is-fixed", t)
], ir = (t) => {
  const e = Et(t);
  x(e, {
    paddingRight: "",
    overflow: ""
  });
  const s = co(e);
  s.length && s.forEach((n) => {
    x(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, lo = (t) => {
  const { clientWidth: e } = ct(t), { innerWidth: s } = _t(t);
  return Math.abs(s - e);
}, ho = (t, e) => {
  const s = Et(t), n = parseInt(V(s, "paddingRight"), 10), i = V(s, "overflow") === "hidden" && n ? 0 : lo(t), r = co(s);
  e && (x(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((a) => {
    const c = V(a, "paddingRight");
    if (a.style.paddingRight = `${parseInt(c, 10) + i}px`, [ro, ao].some((l) => h(a, l))) {
      const l = V(a, "marginRight");
      a.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, G = "offcanvas", $t = vt({ tagName: "div" }), fo = (t, e) => {
  const s = P(e) && e.nodeName === "BODY", n = P(e) && !s ? e : $t, o = s ? e : Et(t);
  P(t) && (n === $t && o.append($t), n.append(t));
}, uo = (t, e) => {
  const s = P(e) && e.nodeName === "BODY", n = P(e) && !s ? e : $t;
  P(t) && (t.remove(), n === $t && !$t.children.length && $t.remove());
}, Pt = (t, e) => {
  const s = P(e) && e.nodeName !== "BODY" ? e : $t;
  return P(t) && s.contains(t);
}, po = "backdrop", sn = `${_}-${po}`, nn = `${G}-${po}`, go = `.${_}.${p}`, Ts = `.${G}.${p}`, D = vt("div"), Wt = (t) => S(`${go},${Ts}`, b(t)), ys = (t) => {
  const e = t ? sn : nn;
  [sn, nn].forEach((s) => {
    m(D, s);
  }), d(D, e);
}, mo = (t, e, s) => {
  ys(s), fo(D, Et(t)), e && d(D, B);
}, vo = () => {
  h(D, p) || (d(D, p), Rt(D));
}, Le = () => {
  m(D, p);
}, bo = (t) => {
  Wt(t) || (m(D, B), uo(D, Et(t)), ir(t));
}, wo = (t) => T(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, rr = `.${_}`, $o = `[${U}="${_}"]`, ar = `[${Ne}="${_}"]`, To = `${_}-static`, cr = {
  backdrop: !0,
  keyboard: !0
}, ie = (t) => j(t, ws), lr = (t) => new Co(t), me = w(`show.bs.${_}`), on = w(`shown.bs.${_}`), qe = w(`hide.bs.${_}`), rn = w(`hidden.bs.${_}`), yo = (t) => {
  const { element: e } = t, s = lo(e), { clientHeight: n, scrollHeight: o } = ct(e), { clientHeight: i, scrollHeight: r } = e, a = i !== r;
  if (!a && s) {
    const c = yt(e) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", l = {};
    l[c] = `${s}px`, x(e, l);
  }
  ho(e, a || n !== o);
}, Eo = (t, e) => {
  const s = e ? I : k, { element: n } = t;
  s(n, M, fr), s(_t(n), De, t.update, et), s(b(n), Pe, hr);
}, an = (t, e) => {
  const s = e ? I : k, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, dr));
}, cn = (t, e) => {
  const { triggers: s, element: n, relatedTarget: o } = t;
  bo(n), x(n, { paddingRight: "", display: "" }), Eo(t);
  const i = me.relatedTarget || s.find(wo);
  i && at(i), ke(e) && e(), rn.relatedTarget = o, v(n, rn);
}, ln = (t) => {
  const { element: e, relatedTarget: s } = t;
  at(e), Eo(t, !0), on.relatedTarget = s, v(e, on);
}, dn = (t) => {
  const { element: e, hasFade: s } = t;
  x(e, { display: "block" }), yo(t), Wt(e) || x(Et(e), { overflow: "hidden" }), d(e, p), Ot(e, He), N(e, Se, "true"), s ? L(e, () => ln(t)) : ln(t);
}, hn = (t, e) => {
  const { element: s, options: n, hasFade: o } = t;
  n.backdrop && !e && o && h(D, p) && !Wt(s) ? (Le(), L(D, () => cn(t))) : cn(t, e);
}, dr = (t) => {
  const { target: e } = t, s = e && A(e, $o), n = s && F(s), o = n && ie(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, hr = ({ code: t, target: e }) => {
  const s = S(go, b(e)), n = s && ie(s);
  if (!n)
    return;
  const { options: o } = n;
  o.keyboard && t === gs && // the keyboard option is enabled and the key is 27
  h(s, p) && (n.relatedTarget = null, n.hide());
};
function fr(t) {
  const e = ie(this);
  if (!e || u.get(this))
    return;
  const { options: s, isStatic: n, modalDialog: o } = e, { backdrop: i } = s, { target: r } = t, a = b(this)?.getSelection()?.toString().length, c = o?.contains(r), l = r && A(r, ar);
  n && !c ? u.set(
    this,
    () => {
      d(this, To), L(o, () => ur(e));
    },
    17
  ) : (l || !a && !n && !c && i) && (e.relatedTarget = l || null, e.hide(), t.preventDefault());
}
const ur = (t) => {
  const { element: e, modalDialog: s } = t, n = (T(s) ? le(s) : (
    /* istanbul ignore next */
    0
  )) + 17;
  m(e, To), u.set(e, () => u.clear(e), n);
};
class Co extends st {
  static selector = rr;
  static init = lr;
  static getInstance = ie;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.modalDialog = S(`.${_}-dialog`, n), this.triggers = [...J($o, b(n))].filter(
      (o) => F(o) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, B), this.relatedTarget = null, an(this, !0), this.update = this.update.bind(this);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ws;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return cr;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(e, p) || (me.relatedTarget = o || void 0, v(e, me), me.defaultPrevented))
      return;
    const a = Wt(e);
    if (a && a !== e) {
      const c = ie(a) || /* istanbul ignore next */
      j(a, $s);
      c && c.hide();
    }
    i ? (Pt(D) ? ys(!0) : mo(e, n, !0), r = le(D), vo(), setTimeout(() => dn(this), r)) : (dn(this), a && h(D, p) && Le());
  }
  /**
   * Hide the modal from the user.
   *
   * @param callback when defined it will skip animation
   */
  hide(e) {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    h(s, p) && (qe.relatedTarget = o || void 0, v(s, qe), !qe.defaultPrevented && (m(s, p), N(s, He, "true"), Ot(s, Se), n ? L(s, () => hn(this, e)) : hn(this, e)));
  }
  /**
   * Updates the modal layout.
   */
  update() {
    h(this.element, p) && yo(this);
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    an(this), this.hide(() => super.dispose());
  }
}
const pr = `.${G}`, Es = `[${U}="${G}"]`, gr = `[${Ne}="${G}"]`, Be = `${G}-toggling`, mr = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, re = (t) => j(t, $s), vr = (t) => new xo(t), ve = w(`show.bs.${G}`), Ho = w(`shown.bs.${G}`), Ge = w(`hide.bs.${G}`), So = w(`hidden.bs.${G}`), br = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = ct(e);
  ho(e, s !== n);
}, fn = (t, e) => {
  const s = e ? I : k;
  t.triggers.forEach((n) => s(n, M, wr));
}, Po = (t, e) => {
  const s = e ? I : k, n = b(t.element);
  s(n, Pe, Tr), s(n, M, $r);
}, un = (t) => {
  const { element: e, options: s } = t;
  s.scroll || (br(t), x(Et(e), { overflow: "hidden" })), d(e, Be), d(e, p), x(e, { visibility: "visible" }), L(e, () => yr(t));
}, pn = (t, e) => {
  const { element: s, options: n } = t, o = Wt(s);
  s.blur(), !o && n.backdrop && h(D, p) ? (Le(), L(D, () => gn(t, e))) : gn(t, e);
}, wr = (t) => {
  const e = A(t.target, Es), s = e && F(e), n = s && re(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, $r = (t) => {
  const { target: e } = t, s = S(Ts, b(e)), n = S(gr, s), o = s && re(s);
  if (!o)
    return;
  const { options: i, triggers: r } = o, { backdrop: a } = i, c = A(e, Es), l = b(s).getSelection();
  D.contains(e) && a === "static" || (!(l && l.toString().length) && (!s.contains(e) && a && /* istanbul ignore next */
  (!c || r.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), c && c.tagName === "A" && t.preventDefault());
}, Tr = ({ code: t, target: e }) => {
  const s = S(Ts, b(e)), n = s && re(s);
  n && n.options.keyboard && t === gs && (n.relatedTarget = null, n.hide());
}, yr = (t) => {
  const { element: e } = t;
  m(e, Be), Ot(e, He), N(e, Se, "true"), N(e, "role", "dialog"), v(e, Ho), Po(t, !0), at(e);
}, gn = (t, e) => {
  const { element: s, triggers: n } = t;
  N(s, He, "true"), Ot(s, Se), Ot(s, "role"), x(s, { visibility: "" });
  const o = ve.relatedTarget || n.find(wo);
  o && at(o), bo(s), v(s, So), m(s, Be), Wt(s) || Po(t), ke(e) && e();
};
class xo extends st {
  static selector = pr;
  static init = vr;
  static getInstance = re;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...J(Es, b(n))].filter(
      (o) => F(o) === n
    ), this.relatedTarget = null, fn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return $s;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return mr;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(e, p) || (ve.relatedTarget = n || void 0, Ho.relatedTarget = n || void 0, v(e, ve), ve.defaultPrevented))
      return;
    const i = Wt(e);
    if (i && i !== e) {
      const r = re(i) || /* istanbul ignore next */
      j(i, ws);
      r && r.hide();
    }
    s.backdrop ? (Pt(D) ? ys() : mo(e, !0), o = le(D), vo(), setTimeout(() => un(this), o)) : (un(this), i && h(D, p) && Le());
  }
  /**
   * Hides the offcanvas from the user.
   *
   * @param callback when `true` it will skip animation
   */
  hide(e) {
    const { element: s, relatedTarget: n } = this;
    h(s, p) && (Ge.relatedTarget = n || void 0, So.relatedTarget = n || void 0, v(s, Ge), !Ge.defaultPrevented && (d(s, Be), m(s, p), e ? pn(this, e) : L(s, () => pn(this, e))));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    fn(this), this.hide(() => super.dispose());
  }
}
const kt = "popover", Re = "Popover", rt = "tooltip", Do = (t) => {
  const e = t === rt, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${rt}">${n + o + i}</div>`;
}, Ao = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, cs = (t) => {
  const e = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, options: i, arrow: r } = t;
  if (!n)
    return;
  const a = { ...Ao }, c = yt(s);
  x(n, {
    // top: '0px', left: '0px', right: '', bottom: '',
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const l = t.name === Re, { offsetWidth: f, offsetHeight: g } = n, { clientWidth: E, clientHeight: R, offsetWidth: q } = ct(s);
  let { placement: $ } = i;
  const { clientWidth: z, offsetWidth: Y } = o, it = V(o, "position") === "fixed", H = Math.abs(it ? z - Y : E - q), lt = c && it ? (
    /* istanbul ignore next */
    H
  ) : 0, nt = E - (c ? 0 : H) - 1, {
    width: W,
    height: K,
    left: C,
    right: jt,
    top: dt
  } = de(s, !0), { x: O, y: ht } = {
    x: C,
    y: dt
  };
  x(r, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let Ct = 0, qt = "", ft = 0, We = "", zt = "", ue = "", Fe = "";
  const Ht = r.offsetWidth || 0, ut = r.offsetHeight || 0, je = Ht / 2;
  let Gt = dt - g - ut < 0, Qt = dt + g + K + ut >= R, Zt = C - f - Ht < lt, Jt = C + f + W + Ht >= nt;
  const pe = ["left", "right"], ze = ["top", "bottom"];
  Gt = pe.includes($) ? dt + K / 2 - g / 2 - ut < 0 : Gt, Qt = pe.includes($) ? dt + g / 2 + K / 2 + ut >= R : Qt, Zt = ze.includes($) ? C + W / 2 - f / 2 < lt : Zt, Jt = ze.includes($) ? C + f / 2 + W / 2 >= nt : Jt, $ = pe.includes($) && Zt && Jt ? "top" : $, $ = $ === "top" && Gt ? "bottom" : $, $ = $ === "bottom" && Qt ? "top" : $, $ = $ === "left" && Zt ? "right" : $, $ = $ === "right" && Jt ? "left" : $, n.className.includes($) || (n.className = n.className.replace(e, a[$])), pe.includes($) ? ($ === "left" ? ft = O - f - (l ? Ht : 0) : ft = O + W + (l ? Ht : 0), Gt && Qt ? (Ct = 0, qt = 0, zt = dt + K / 2 - ut / 2) : Gt ? (Ct = ht, qt = "", zt = K / 2 - Ht) : Qt ? (Ct = ht - g + K, qt = "", zt = g - K / 2 - Ht) : (Ct = ht - g / 2 + K / 2, zt = g / 2 - ut / 2)) : ze.includes($) && ($ === "top" ? Ct = ht - g - (l ? ut : 0) : Ct = ht + K + (l ? ut : 0), Zt ? (ft = 0, ue = O + W / 2 - je) : Jt ? (ft = "auto", We = 0, Fe = W / 2 + nt - jt - je) : (ft = O - f / 2 + W / 2, ue = f / 2 - je)), x(n, {
    top: `${Ct}px`,
    bottom: qt === "" ? "" : `${qt}px`,
    left: ft === "auto" ? ft : `${ft}px`,
    right: We !== "" ? `${We}px` : ""
  }), T(r) && (zt !== "" && (r.style.top = `${zt}px`), ue !== "" ? r.style.left = `${ue}px` : Fe !== "" && (r.style.right = `${Fe}px`));
  const qo = w(`updated.bs.${Xt(t.name)}`);
  v(s, qo);
}, ls = {
  template: Do(rt),
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
}, Io = "data-original-title", Nt = "Tooltip", gt = (t, e, s) => {
  if (!(!T(t) || At(e) && !e.length))
    if (At(e)) {
      let n = e.trim();
      ke(s) && (n = s(n));
      const i = new DOMParser().parseFromString(n, "text/html");
      t.append(...i.body.childNodes);
    } else
      T(e) ? t.append(e) : ($i(e) || wi(e) && e.every(P)) && t.append(...e);
}, Er = (t) => {
  const e = t.name === Nt, { id: s, element: n, options: o } = t, { title: i, placement: r, template: a, animation: c, customClass: l, sanitizeFn: f, dismissible: g, content: E, btnClose: R } = o, q = e ? rt : kt, $ = { ...Ao };
  let z = [], Y = [];
  yt(n) && ($.left = "end", $.right = "start");
  const Ft = `bs-${q}-${$[r]}`;
  let it;
  if (T(a))
    it = a;
  else {
    const C = vt("div");
    gt(C, a, f), it = C.firstChild;
  }
  t.tooltip = T(it) ? it.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: H } = t;
  if (!H)
    return;
  N(H, "id", s), N(H, "role", rt);
  const lt = e ? `${rt}-inner` : `${kt}-body`, nt = e ? null : S(`.${kt}-header`, H), W = S(`.${lt}`, H);
  t.arrow = S(`.${q}-arrow`, H);
  const { arrow: K } = t;
  if (T(i))
    z = [i.cloneNode(!0)];
  else {
    const C = vt("div");
    gt(C, i, f), z = [...C.childNodes];
  }
  if (T(E))
    Y = [E.cloneNode(!0)];
  else {
    const C = vt("div");
    gt(C, E, f), Y = [...C.childNodes];
  }
  if (g)
    if (i)
      if (T(R))
        z = [...z, R.cloneNode(!0)];
      else {
        const C = vt("div");
        gt(C, R, f), z = [...z, C.firstChild];
      }
    else if (nt && nt.remove(), T(R))
      Y = [...Y, R.cloneNode(!0)];
    else {
      const C = vt("div");
      gt(C, R, f), Y = [...Y, C.firstChild];
    }
  e ? i && W && gt(W, i, f) : (i && nt && gt(nt, z, f), E && W && gt(W, Y, f), t.btn = S(".btn-close", H) || void 0), d(H, "position-fixed"), d(K, "position-absolute"), h(H, q) || d(H, q), c && !h(H, B) && d(H, B), l && !h(H, l) && d(H, l), h(H, Ft) || d(H, Ft);
}, Cr = (t) => {
  const e = ["HTML", "BODY"], s = [];
  let { parentNode: n } = t;
  for (; n && !e.includes(n.nodeName); )
    n = bi(n), jn(n) || Ti(n) || s.push(n);
  return s.find((o, i) => V(o, "position") !== "relative" && s.slice(i + 1).every((r) => V(r, "position") === "static") ? o : null) || /* istanbul ignore next: optional guard */
  b(t).body;
}, Hr = `[${U}="${rt}"],[data-tip="${rt}"]`, ko = "title";
let mn = (t) => j(t, Nt);
const Sr = (t) => new Cs(t), Pr = (t) => {
  const { element: e, tooltip: s, container: n, offsetParent: o } = t;
  Ot(e, Bn), uo(s, n === o ? n : o);
}, xr = (t, e) => {
  const { element: s } = t;
  se(t), Te(s, Io) && t.name === Nt && Oo(t), e && e();
}, No = (t, e) => {
  const s = e ? I : k, { element: n } = t;
  s(b(n), ps, t.handleTouch, et), [Ae, De].forEach((o) => {
    s(_t(n), o, t.update, et);
  });
}, vn = (t) => {
  const { element: e } = t, s = w(`shown.bs.${Xt(t.name)}`);
  No(t, !0), v(e, s), u.clear(e, "in");
}, bn = (t) => {
  const { element: e, onHideComplete: s } = t, n = w(`hidden.bs.${Xt(t.name)}`);
  No(t), Pr(t), v(e, n), ke(s) && (s(), t.onHideComplete = void 0), u.clear(e, "out");
}, se = (t, e) => {
  const s = e ? I : k, { element: n, options: o, btn: i } = t, { trigger: r } = o, c = !!(t.name !== Nt && o.dismissible);
  if (r.includes("manual"))
    return;
  t.enabled = !!e, r.split(" ").forEach((f) => {
    f === ei ? (s(n, ti, t.show), s(n, xe, t.show), c && i ? s(i, M, t.hide) : (s(n, us, t.hide), s(b(n), ps, t.handleTouch, et))) : f === M ? s(n, f, c ? t.show : t.toggle) : f === hs && (s(n, fs, t.show), c || s(n, Rn, t.hide), di && s(n, M, () => at(n)));
  });
}, wn = (t, e) => {
  const s = e ? I : k, { element: n, container: o, offsetParent: i } = t, { offsetHeight: r, scrollHeight: a } = o, c = A(n, `.${_}`), l = A(n, `.${G}`), f = _t(n), E = o === i && r !== a ? o : f;
  s(E, De, t.update, et), s(E, Ae, t.update, et), c && s(c, `hide.bs.${_}`, t.hide), l && s(l, `hide.bs.${G}`, t.hide);
}, Oo = (t, e) => {
  const s = [Io, ko], { element: n } = t;
  N(
    n,
    s[e ? 0 : 1],
    e || Bt(n, s[0]) || /* istanbul ignore next */
    ""
  ), Ot(n, s[e ? 1 : 0]);
};
class Cs extends st {
  static selector = Hr;
  static init = Sr;
  static getInstance = mn;
  static styleTip = cs;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n } = this, o = this.name === Nt, i = o ? rt : kt, r = o ? Nt : Re;
    mn = (c) => j(c, r), this.enabled = !0, this.id = `${i}-${zn(n, i)}`;
    const { options: a } = this;
    !a.title && o || !o && !a.content || (Tt(ls, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), Te(n, ko) && o && typeof a.title == "string" && Oo(this, a.title), this.container = Cr(n), this.offsetParent = ["sticky", "fixed"].some(
      (c) => V(this.container, "position") === c
    ) ? this.container : b(this.element).body, Er(this), se(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Nt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ls;
  }
  // TOOLTIP PUBLIC METHODS
  // ======================
  /** Shows the tooltip. */
  show() {
    const { options: e, tooltip: s, element: n, container: o, offsetParent: i, id: r } = this, { animation: a } = e, c = u.get(n, "out"), l = o === i ? o : i;
    u.clear(n, "out"), s && !c && !Pt(s, l) && u.set(
      n,
      () => {
        const f = w(`show.bs.${Xt(this.name)}`);
        v(n, f), !f.defaultPrevented && (fo(s, l), N(n, Bn, `#${r}`), this.update(), wn(this, !0), h(s, p) || d(s, p), a ? L(s, () => vn(this)) : vn(this));
      },
      17,
      "in"
    );
  }
  /** Hides the tooltip. */
  hide() {
    const { options: e, tooltip: s, element: n, container: o, offsetParent: i } = this, { animation: r, delay: a } = e;
    u.clear(n, "in"), s && Pt(s, o === i ? o : i) && u.set(
      n,
      () => {
        const c = w(`hide.bs.${Xt(this.name)}`);
        v(n, c), !c.defaultPrevented && (this.update(), m(s, p), wn(this), r ? L(s, () => bn(this)) : bn(this));
      },
      a + 17,
      "out"
    );
  }
  /** Updates the tooltip position. */
  update() {
    cs(this);
  }
  /** Toggles the tooltip visibility. */
  toggle() {
    const { tooltip: e, container: s, offsetParent: n } = this;
    e && !Pt(e, s === n ? s : n) ? this.show() : this.hide();
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: e } = this;
    e || (se(this, !0), this.enabled = !e);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: e, container: s, offsetParent: n, options: o, enabled: i } = this, { animation: r } = o;
    i && (e && Pt(e, s === n ? s : n) && r ? (this.onHideComplete = () => se(this), this.hide()) : se(this), this.enabled = !i);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /**
   * Handles the `touchstart` event listener for `Tooltip`
   *
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch({ target: e }) {
    const { tooltip: s, element: n } = this;
    s && s.contains(e) || e === n || e && n.contains(e) || this.hide();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: e, container: s, offsetParent: n, options: o } = this, i = () => xr(this, () => super.dispose());
    o.animation && e && Pt(e, s === n ? s : n) ? (this.options.delay = 0, this.onHideComplete = i, this.hide()) : i();
  }
}
const Dr = `[${U}="${kt}"],[data-tip="${kt}"]`, Ar = Tt({}, ls, {
  template: Do(kt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Ir = (t) => j(t, Re), kr = (t) => new Mo(t);
class Mo extends Cs {
  static selector = Dr;
  static init = kr;
  static getInstance = Ir;
  static styleTip = cs;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Re;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ar;
  }
  /* extend original `show()` */
  show() {
    super.show();
    const { options: e, btn: s } = this;
    e.dismissible && s && setTimeout(() => at(s), 17);
  }
}
const Nr = "scrollspy", Lo = "ScrollSpy", Or = '[data-bs-spy="scroll"]', Mr = {
  offset: 10,
  target: null
}, Lr = (t) => j(t, Lo), Br = (t) => new Wo(t), $n = w(`activate.bs.${Nr}`), Rr = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: r } = t, { offset: a } = n, c = ms(s), l = e && vs("A", e), f = s ? Bo(s) : (
    /* istanbul ignore next */
    i
  );
  if (t.scrollTop = c ? s.scrollY : s.scrollTop, l && (f !== i || o !== l.length)) {
    let g, E, R;
    t.items = [], t.offsets = [], t.scrollHeight = f, t.maxScroll = t.scrollHeight - Wr(t), [...l].forEach((q) => {
      g = Bt(q, "href"), E = g && g.charAt(0) === "#" && g.slice(-1) !== "#" && S(g, b(r)), E && (t.items.push(q), R = de(E), t.offsets.push((c ? R.top + t.scrollTop : E.offsetTop) - a));
    }), t.itemsLength = t.items.length;
  }
}, Bo = (t) => T(t) ? t.scrollHeight : ct(t).scrollHeight, Wr = ({ element: t, scrollTarget: e }) => ms(e) ? e.innerHeight : de(t).height, Ro = (t) => {
  [...vs("A", t)].forEach((e) => {
    h(e, y) && m(e, y);
  });
}, Tn = (t, e) => {
  const { target: s, element: n } = t;
  T(s) && Ro(s), t.activeItem = e, d(e, y);
  const o = [];
  let i = e;
  for (; i !== Et(n); )
    i = i.parentElement, (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const a = r.previousElementSibling;
    a && !h(a, y) && d(a, y);
  }), $n.relatedTarget = e, v(n, $n);
}, yn = (t, e) => {
  (e ? I : k)(t.scrollTarget, Ae, t.refresh, et);
};
class Wo extends st {
  static selector = Or;
  static init = Br;
  static getInstance = Lr;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    this.target = S(o.target, b(n)), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : _t(n), this.scrollHeight = Bo(this.scrollTarget), this.refresh = this.refresh.bind(this), yn(this, !0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return Lo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Mr;
  }
  /* eslint-enable */
  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh() {
    const { target: e } = this;
    if (e?.offsetHeight === 0)
      return;
    Rr(this);
    const { scrollTop: s, maxScroll: n, itemsLength: o, items: i, activeItem: r } = this;
    if (s >= n) {
      const c = i[o - 1];
      r !== c && Tn(this, c);
      return;
    }
    const { offsets: a } = this;
    if (r && s < a[0] && a[0] > 0) {
      this.activeItem = null, e && Ro(e);
      return;
    }
    i.forEach((c, l) => {
      r !== c && s >= a[l] && (typeof a[l + 1] > "u" || s < a[l + 1]) && Tn(this, c);
    });
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    yn(this), super.dispose();
  }
}
const fe = "tab", Fo = "Tab", En = `[${U}="${fe}"]`, jo = (t) => j(t, Fo), Fr = (t) => new zo(t), Qe = w(`show.bs.${fe}`), Cn = w(`shown.bs.${fe}`), Ze = w(`hide.bs.${fe}`), Hn = w(`hidden.bs.${fe}`), ae = /* @__PURE__ */ new Map(), Sn = (t) => {
  const { tabContent: e, nav: s } = t;
  e && h(e, Mt) && (e.style.height = "", m(e, Mt)), s && u.clear(s);
}, Pn = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = T(o) && ae.get(o) || /* istanbul ignore next */
  { tab: null };
  if (s && n && h(n, B)) {
    const { currentHeight: r, nextHeight: a } = ae.get(e) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    r === a ? Sn(t) : setTimeout(() => {
      s.style.height = `${a}px`, Rt(s), L(s, () => Sn(t));
    }, 50);
  } else
    o && u.clear(o);
  Cn.relatedTarget = i, v(e, Cn);
}, xn = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: r } = o && ae.get(o) || /* istanbul ignore next */
  { tab: null, content: null };
  let a = 0;
  if (n && s && h(s, B) && ([r, s].forEach((c) => {
    T(c) && d(c, "overflow-hidden");
  }), a = T(r) ? r.scrollHeight : (
    /* istanbul ignore next */
    0
  )), Qe.relatedTarget = i, Hn.relatedTarget = e, v(e, Qe), !Qe.defaultPrevented) {
    if (s && d(s, y), r && m(r, y), n && s && h(s, B)) {
      const c = s.scrollHeight;
      ae.set(e, { currentHeight: a, nextHeight: c, tab: null, content: null }), d(n, Mt), n.style.height = `${a}px`, Rt(n), [r, s].forEach((l) => {
        l && m(l, "overflow-hidden");
      });
    }
    s && s && h(s, B) ? setTimeout(() => {
      d(s, p), L(s, () => {
        Pn(t);
      });
    }, 1) : (s && d(s, p), Pn(t)), i && v(i, Hn);
  }
}, Dn = (t) => {
  const { nav: e } = t;
  if (!T(e))
    return { tab: null, content: null };
  const s = bt(y, e);
  let n = null;
  s.length === 1 && !Lt.some((i) => h(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = T(n) ? F(n) : null;
  return { tab: n, content: o };
}, An = (t) => {
  if (!T(t))
    return null;
  const e = A(t, `.${Lt.join(",.")}`);
  return e ? S(`.${Lt[0]}-toggle`, e) : null;
}, In = (t, e) => {
  (e ? I : k)(t.element, M, jr);
}, jr = (t) => {
  const e = jo(t.target);
  e && (t.preventDefault(), e.show());
};
class zo extends st {
  static selector = En;
  static init = Fr;
  static getInstance = jo;
  /** @param target the target element */
  constructor(e) {
    super(e);
    const { element: s } = this, n = F(s);
    if (!n)
      return;
    const o = A(s, ".nav"), i = A(n, ".tab-content");
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = An(s);
    const { tab: r } = Dn(this);
    if (o && !r) {
      const a = S(En, o), c = a && F(a);
      c && (d(a, y), d(c, p), d(c, y), N(s, Ke, "true"));
    }
    In(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Fo;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: s, nav: n, dropdown: o } = this;
    if (!(n && u.get(n)) && !h(e, y)) {
      const { tab: i, content: r } = Dn(this);
      if (n && ae.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ze.relatedTarget = e, T(i) && v(i, Ze), Ze.defaultPrevented)
        return;
      d(e, y), N(e, Ke, "true");
      const a = T(i) && An(i);
      if (a && h(a, y) && m(a, y), n) {
        const c = () => {
          i && (m(i, y), N(i, Ke, "false")), o && !h(o, y) && d(o, y);
        };
        r && (h(r, B) || s && h(s, B)) ? u.set(n, c, 1) : c();
      }
      r && (m(r, p), h(r, B) ? L(r, () => xn(this)) : xn(this));
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    In(this), super.dispose();
  }
}
const Q = "toast", Ko = "Toast", zr = `.${Q}`, Kr = `[${Ne}="${Q}"]`, Vo = `[${U}="${Q}"]`, Ut = "showing", Xo = "hide", Vr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Hs = (t) => j(t, Ko), Xr = (t) => new Uo(t), kn = w(`show.bs.${Q}`), Yr = w(`shown.bs.${Q}`), Nn = w(`hide.bs.${Q}`), Ur = w(`hidden.bs.${Q}`), On = (t) => {
  const { element: e, options: s } = t;
  m(e, Ut), u.clear(e, Ut), v(e, Yr), s.autohide && u.set(e, () => t.hide(), s.delay, Q);
}, Mn = (t) => {
  const { element: e } = t;
  m(e, Ut), m(e, p), d(e, Xo), u.clear(e, Q), v(e, Ur);
}, _r = (t) => {
  const { element: e, options: s } = t;
  d(e, Ut), s.animation ? (Rt(e), L(e, () => Mn(t))) : Mn(t);
}, qr = (t) => {
  const { element: e, options: s } = t;
  u.set(
    e,
    () => {
      m(e, Xo), Rt(e), d(e, p), d(e, Ut), s.animation ? L(e, () => On(t)) : On(t);
    },
    17,
    Ut
  );
}, Yo = (t, e) => {
  const s = e ? I : k, { element: n, triggers: o, dismiss: i, options: r } = t;
  i && s(i, M, t.hide), r.autohide && [fs, Rn, xe, us].forEach(
    (a) => s(n, a, Zr)
  ), o.length && o.forEach((a) => s(a, M, Qr));
}, Gr = (t) => {
  u.clear(t.element, Q), Yo(t);
}, Qr = (t) => {
  const { target: e } = t, s = e && A(e, Vo), n = s && F(s), o = n && Hs(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, Zr = (t) => {
  const e = t.target, s = Hs(e), { type: n, relatedTarget: o } = t;
  !s || e === o || e.contains(o) || ([xe, fs].includes(n) ? u.clear(e, Q) : u.set(e, () => s.hide(), s.options.delay, Q));
};
class Uo extends st {
  static selector = zr;
  static init = Xr;
  static getInstance = Hs;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, B) ? d(n, B) : !o.animation && h(n, B) && m(n, B), this.dismiss = S(Kr, n), this.triggers = [...J(Vo, b(n))].filter(
      (i) => F(i) === n
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), Yo(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ko;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Vr;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return h(this.element, p);
  }
  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show() {
    const { element: e, isShown: s } = this;
    if (e && !s) {
      if (v(e, kn), kn.defaultPrevented)
        return;
      qr(this);
    }
  }
  /** Hides the toast. */
  hide() {
    const { element: e, isShown: s } = this;
    if (e && s) {
      if (v(e, Nn), Nn.defaultPrevented)
        return;
      _r(this);
    }
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: s } = this;
    s && m(e, p), Gr(this), super.dispose();
  }
}
const _o = {
  Alert: Xn,
  Button: Un,
  Carousel: Gn,
  Collapse: Jn,
  Dropdown: io,
  Modal: Co,
  Offcanvas: xo,
  Popover: Mo,
  ScrollSpy: Wo,
  Tab: zo,
  Toast: Uo,
  Tooltip: Cs
}, Jr = (t, e) => {
  [...e].forEach((s) => t(s));
}, ta = (t, e) => {
  const s = Dt.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, Ln = (t) => {
  const e = t && t.nodeName ? t : document, s = [...vs("*", e)];
  mi(_o).forEach((n) => {
    const { init: o, selector: i } = n;
    Jr(
      o,
      s.filter((r) => yi(r, i))
    );
  });
}, sa = (t) => {
  const e = t && t.nodeName ? t : document;
  es(_o).forEach((s) => {
    ta(s, e);
  });
};
document.body ? Ln() : I(document, "DOMContentLoaded", () => Ln(), { once: !0 });
export {
  Xn as Alert,
  Un as Button,
  Gn as Carousel,
  Jn as Collapse,
  io as Dropdown,
  ea as Listener,
  Co as Modal,
  xo as Offcanvas,
  Mo as Popover,
  Wo as ScrollSpy,
  zo as Tab,
  Uo as Toast,
  Cs as Tooltip,
  Ln as initCallback,
  sa as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
