const Pt = {}, ms = (t) => {
  const { type: e, target: s, currentTarget: n } = t;
  [...Pt[e]].forEach(([o, i]) => {
    [n, s].includes(o) && [...i].forEach(([r, c]) => {
      r.apply(o, [t]), typeof c == "object" && c.once && I(o, e, r, c);
    });
  });
}, D = (t, e, s, n) => {
  Pt[e] || (Pt[e] = /* @__PURE__ */ new Map());
  const o = Pt[e];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: r } = i;
  i.set(s, n), r || t.addEventListener(e, ms, n);
}, I = (t, e, s, n) => {
  const o = Pt[e], i = o && o.get(t), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete Pt[e], (!i || !i.size) && t.removeEventListener(e, ms, c);
}, Zo = D, Jo = I, ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: D,
  globalListener: ms,
  off: Jo,
  on: Zo,
  registry: Pt,
  removeListener: I
}, Symbol.toStringTag, { value: "Module" })), Fn = "aria-describedby", He = "aria-expanded", Me = "aria-hidden", Oe = "aria-modal", Ds = "aria-pressed", _e = "aria-selected", ti = "DOMContentLoaded", vs = "focus", bs = "focusin", jn = "focusout", Ne = "keydown", ei = "keyup", O = "click", si = "mousedown", ni = "hover", Le = "mouseenter", ws = "mouseleave", oi = "mousemove", ii = "pointerdown", ri = "pointermove", ci = "pointerup", Be = "resize", Re = "scroll", zn = "touchstart", is = "ArrowDown", rs = "ArrowUp", Is = "ArrowLeft", ks = "ArrowRight", $s = "Escape", ai = "transitionDuration", li = "transitionDelay", Ge = "transitionend", Xn = "transitionProperty", di = navigator.userAgentData, xe = di, { userAgent: hi } = navigator, Pe = hi, Ms = /iPhone|iPad|iPod|Android/i;
xe ? xe.brands.some((t) => Ms.test(t.brand)) : Ms.test(Pe);
const Os = /(iPhone|iPod|iPad)/, fi = xe ? xe.brands.some((t) => Os.test(t.brand)) : Os.test(Pe);
Pe && Pe.includes("Firefox");
const { head: We } = document;
["webkitPerspective", "perspective"].some((t) => t in We.style);
const ui = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, pi = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, gi = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), pi(t, e, o, n));
  };
  ui(t, e, o, n);
}, re = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    gi(document, ti, re, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in We.style);
["webkitAnimation", "animation"].some((t) => t in We.style);
["webkitTransition", "transition"].some((t) => t in We.style);
const Bt = (t, e) => t.getAttribute(e), Ae = (t, e) => t.hasAttribute(e), M = (t, e, s) => t.setAttribute(e, s), Ot = (t, e) => t.removeAttribute(e), d = (t, ...e) => {
  t.classList.add(...e);
}, m = (t, ...e) => {
  t.classList.remove(...e);
}, h = (t, e) => t.classList.contains(e), he = (t) => t != null && typeof t == "object" || !1, U = (t) => he(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, T = (t) => U(t) && t.nodeType === 1 || !1, se = /* @__PURE__ */ new Map(), At = {
  set: (t, e, s) => {
    !T(t) || (se.has(e) || se.set(e, /* @__PURE__ */ new Map()), se.get(e).set(t, s));
  },
  getAllFor: (t) => se.get(t) || null,
  get: (t, e) => {
    if (!T(t) || !e)
      return null;
    const s = At.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  remove: (t, e) => {
    const s = At.getAllFor(e);
    !s || !T(t) || (s.delete(t), s.size === 0 && se.delete(e));
  }
}, R = (t, e) => At.get(t, e), Dt = (t) => typeof t == "string" || !1, Ts = (t) => he(t) && t.constructor.name === "Window" || !1, Vn = (t) => U(t) && t.nodeType === 9 || !1, w = (t) => Ts(t) ? t.document : Vn(t) ? t : U(t) ? t.ownerDocument : window.document, ie = (t) => Object.entries(t), wt = (t) => {
  if (!t)
    return;
  if (Dt(t))
    return w().createElement(t);
  const { tagName: e } = t, s = wt(e);
  if (!s)
    return;
  const n = { ...t };
  return delete n.tagName, ie(n).forEach(([o, i]) => {
    Dt(o) && Dt(i) && M(s, o, i);
  }), s;
}, b = (t, e) => t.dispatchEvent(e), tt = (t, e) => {
  const s = getComputedStyle(t), n = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, mi = (t) => {
  const e = tt(t, Xn), s = tt(t, li), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, fe = (t) => {
  const e = tt(t, Xn), s = tt(t, ai), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, N = (t, e) => {
  let s = 0;
  const n = new Event(Ge), o = fe(t), i = mi(t);
  if (o) {
    const r = (c) => {
      c.target === t && (e.apply(t, [c]), t.removeEventListener(Ge, r), s = 1);
    };
    t.addEventListener(Ge, r), setTimeout(() => {
      s || b(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, dt = (t, e) => t.focus(e), Ns = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, ce = (t) => t.toLowerCase(), vi = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, r = { ...e }, c = {}, a = "title";
  return ie(i).forEach(([l, g]) => {
    const u = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (S) => ce(S)) : l;
    c[u] = Ns(g);
  }), ie(o).forEach(([l, g]) => {
    o[l] = Ns(g);
  }), ie(e).forEach(([l, g]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Bt(t, a) : g;
  }), r;
}, yt = (t, ...e) => Object.assign(t, ...e), cs = (t) => Object.keys(t), bi = (t) => Object.values(t), $ = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return he(e) && yt(s, e), s;
}, q = { passive: !0 }, Rt = (t) => t.offsetHeight, x = (t, e) => {
  ie(e).forEach(([s, n]) => {
    if (n && Dt(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, yt(t.style, o);
    }
  });
}, as = (t) => he(t) && t.constructor.name === "Map" || !1, wi = (t) => typeof t == "number" || !1, mt = /* @__PURE__ */ new Map(), f = {
  set: (t, e, s, n) => {
    !T(t) || (n && n.length ? (mt.has(t) || mt.set(t, /* @__PURE__ */ new Map()), mt.get(t).set(n, setTimeout(e, s))) : mt.set(t, setTimeout(e, s)));
  },
  get: (t, e) => {
    if (!T(t))
      return null;
    const s = mt.get(t);
    return e && s && as(s) ? s.get(e) || null : wi(s) ? s : null;
  },
  clear: (t, e) => {
    if (!T(t))
      return;
    const s = mt.get(t);
    e && e.length && as(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && mt.delete(t)) : (clearTimeout(s), mt.delete(t));
  }
}, Ut = (t, e) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = t.getBoundingClientRect();
  let a = 1, l = 1;
  if (e && T(t)) {
    const { offsetWidth: g, offsetHeight: u } = t;
    a = g > 0 ? Math.round(s) / g : 1, l = u > 0 ? Math.round(n) / u : 1;
  }
  return {
    width: s / a,
    height: n / l,
    top: o / l,
    right: i / a,
    bottom: r / l,
    left: c / a,
    x: c / a,
    y: o / l
  };
}, _t = (t) => w(t).body, Ct = (t) => w(t).documentElement;
let Ls = 0, Bs = 0;
const Vt = /* @__PURE__ */ new Map(), Kn = (t, e) => {
  let s = e ? Ls : Bs;
  if (e) {
    const n = Kn(t), o = Vt.get(n) || /* @__PURE__ */ new Map();
    Vt.has(n) || Vt.set(n, o), as(o) && !o.has(e) ? (o.set(e, s), Ls += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    Vt.has(n) ? s = Vt.get(n) : (Vt.set(n, s), Bs += 1);
  }
  return s;
}, Wt = (t) => {
  var e;
  return t ? Vn(t) ? t.defaultView : U(t) ? (e = t?.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, $i = (t) => Array.isArray(t) || !1, Un = (t) => {
  if (!U(t))
    return !1;
  const { top: e, bottom: s } = Ut(t), { clientHeight: n } = Ct(t);
  return e <= n && s >= 0;
}, Fe = (t) => typeof t == "function" || !1, je = (t) => U(t) && ["SVG", "Image", "Video", "Canvas"].some((e) => t.constructor.name.includes(e)) || !1, Ti = (t) => he(t) && t.constructor.name === "NodeList" || !1, Et = (t) => Ct(t).dir === "rtl", A = (t, e) => t ? t.closest(e) || A(t.getRootNode().host, e) : null, H = (t, e) => T(t) ? t : (U(e) ? e : w()).querySelector(t), ys = (t, e) => (U(e) ? e : w()).getElementsByTagName(t), et = (t, e) => (U(e) ? e : w()).querySelectorAll(t), $t = (t, e) => (e && U(e) ? e : w()).getElementsByClassName(
  t
), yi = (t, e) => t.matches(e), L = "fade", p = "show", ze = "data-bs-dismiss", Xe = "alert", Yn = "Alert", Ei = "5.0.0-alpha1", Ci = Ei;
class st {
  element;
  options;
  constructor(e, s) {
    const n = H(e);
    if (!n)
      throw Dt(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = At.get(n, this.name);
    o && o.dispose(), this.element = n, this.defaults && cs(this.defaults).length && (this.options = vi(n, this.defaults, s || {}, "bs")), At.set(n, this.name, this);
  }
  get version() {
    return Ci;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    At.remove(this.element, this.name), cs(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Rs = `.${Xe}`, Si = `[${ze}="${Xe}"]`, Ws = (t) => R(t, Yn), Hi = (t) => new qn(t), Fs = $(`close.bs.${Xe}`), xi = $(`closed.bs.${Xe}`), js = (t) => {
  const { element: e } = t;
  ls(t), b(e, xi), t.dispose(), e.remove();
}, ls = (t, e) => {
  const s = e ? D : I, { dismiss: n } = t;
  n && s(n, O, t.close);
};
class qn extends st {
  static selector = Rs;
  static init = Hi;
  static getInstance = Ws;
  dismiss;
  constructor(e) {
    super(e), this.dismiss = H(Si, this.element), ls(this, !0);
  }
  get name() {
    return Yn;
  }
  close(e) {
    const s = e ? Ws(A(e.target, Rs)) : this, { element: n } = s;
    if (n && h(n, p)) {
      if (b(n, Fs), Fs.defaultPrevented)
        return;
      m(n, p), h(n, L) ? N(n, () => js(s)) : js(s);
    }
  }
  dispose() {
    ls(this), super.dispose();
  }
}
const y = "active", V = "data-bs-toggle", Pi = "button", _n = "Button", Ai = `[${V}="${Pi}"]`, zs = (t) => R(t, _n), Di = (t) => new Gn(t), Xs = (t, e) => {
  (e ? D : I)(t.element, O, t.toggle);
};
class Gn extends st {
  static selector = Ai;
  static init = Di;
  static getInstance = zs;
  isActive = !1;
  constructor(e) {
    super(e);
    const { element: s } = this;
    this.isActive = h(s, y), M(s, Ds, String(!!this.isActive)), Xs(this, !0);
  }
  get name() {
    return _n;
  }
  toggle(e) {
    e && e.preventDefault();
    const s = e ? zs(e.target) : this;
    if (!s.element)
      return;
    const { element: n, isActive: o } = s;
    if (h(n, "disabled"))
      return;
    (o ? m : d)(n, y), M(n, Ds, o ? "false" : "true"), s.isActive = h(n, y);
  }
  dispose() {
    Xs(this), super.dispose();
  }
}
const ds = "data-bs-target", It = "carousel", Qn = "Carousel", Vs = "data-bs-parent", Ii = "data-bs-container", j = (t) => {
  const e = [ds, Vs, Ii, "href"], s = w(t);
  return e.map((n) => {
    const o = Bt(t, n);
    return o ? n === Vs ? A(t, o) : H(o, s) : null;
  }).filter((n) => n)[0];
}, ue = `[data-bs-ride="${It}"]`, J = `${It}-item`, hs = "data-bs-slide-to", bt = "data-bs-slide", Tt = "paused", Ks = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (t) => R(t, Qn), ki = (t) => new Jn(t);
let Ht = 0, Kt = 0, ne = 0;
const Qe = $(`slide.bs.${It}`), fs = $(`slid.bs.${It}`), Mi = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating && ht(n)) {
    const r = us(t), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[e], y), m(o[e], `${J}-${c}`), m(o[e], `${J}-${a}`), m(o[r], y), m(o[r], `${J}-${a}`), b(n, fs), f.clear(n, bt), !w(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Oi() {
  const t = ht(this);
  t && !t.isPaused && !f.get(this, Tt) && d(this, Tt);
}
function Ni() {
  const t = ht(this);
  t && t.isPaused && !f.get(this, Tt) && t.cycle();
}
function Li(t) {
  t.preventDefault();
  const e = A(this, ue) || j(this), s = ht(e);
  if (!s || s.isAnimating)
    return;
  const n = +(Bt(this, hs) || 0);
  this && !h(this, y) && !Number.isNaN(n) && s.to(n);
}
function Bi(t) {
  t.preventDefault();
  const e = A(this, ue) || j(this), s = ht(e);
  if (!s || s.isAnimating)
    return;
  const n = Bt(this, bt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Ri = ({ code: t, target: e }) => {
  const s = w(e), [n] = [...et(ue, s)].filter((a) => Un(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input/i.test(e.nodeName))
    return;
  const i = Et(n);
  t === (i ? ks : Is) ? o.prev() : t === (i ? Is : ks) && o.next();
};
function Wi(t) {
  const { target: e } = t, s = ht(this);
  if (!s || s.isAnimating || s.isTouch)
    return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].some((i) => i === e || i.contains(e)) || (Ht = t.pageX, this.contains(e) && (s.isTouch = !0, Zn(s, !0)));
}
const Fi = (t) => {
  Kt = t.pageX;
}, ji = (t) => {
  const { target: e } = t, s = w(e), n = [...et(ue, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n)
    return;
  const { element: o, index: i } = n, r = Et(o);
  if (n.isTouch = !1, Zn(n), s.getSelection()?.toString().length) {
    Ht = 0, Kt = 0, ne = 0;
    return;
  }
  if (ne = t.pageX, !o.contains(e) || Math.abs(Ht - ne) < 120) {
    Ht = 0, Kt = 0, ne = 0;
    return;
  }
  Kt < Ht ? n.to(i + (r ? -1 : 1)) : Kt > Ht && n.to(i + (r ? 1 : -1)), Ht = 0, Kt = 0, ne = 0;
}, Ze = (t, e) => {
  const { indicators: s } = t;
  [...s].forEach((n) => m(n, y)), t.indicators[e] && d(s[e], y);
}, Zn = (t, e) => {
  const { element: s } = t, n = e ? D : I;
  n(w(s), ri, Fi, q), n(w(s), ci, ji, q);
}, Us = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: r } = t, { touch: c, pause: a, interval: l, keyboard: g } = n, u = e ? D : I;
  a && l && (u(s, Le, Oi), u(s, ws, Ni)), c && o.length > 2 && u(s, ii, Wi, q), i.length && i.forEach((S) => {
    S && u(S, O, Bi);
  }), r.length && r.forEach((S) => {
    u(S, O, Li);
  }), g && u(w(s), Ne, Ri);
}, us = (t) => {
  const { slides: e, element: s } = t, n = H(`.${J}.${y}`, s);
  return T(n) ? [...e].indexOf(n) : -1;
};
class Jn extends st {
  static selector = ue;
  static init = ki;
  static getInstance = ht;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.direction = Et(n) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = $t(J, n);
    const { slides: o } = this;
    if (o.length < 2)
      return;
    const i = w(n);
    this.controls = [
      ...et(`[${bt}]`, n),
      ...et(`[${bt}][${ds}="#${n.id}"]`, i)
    ], this.indicator = H(`.${It}-indicators`, n), this.indicators = [
      ...this.indicator ? et(`[${hs}]`, this.indicator) : [],
      ...et(`[${hs}][${ds}="#${n.id}"]`, i)
    ];
    const { options: r } = this;
    this.options.interval = r.interval === !0 ? Ks.interval : r.interval, us(this) < 0 && (d(o[0], y), this.indicators.length && Ze(this, 0)), Us(this, !0), r.interval && this.cycle();
  }
  get name() {
    return Qn;
  }
  get defaults() {
    return Ks;
  }
  get isPaused() {
    return h(this.element, Tt);
  }
  get isAnimating() {
    return H(`.${J}-next,.${J}-prev`, this.element) !== null;
  }
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    f.clear(e, It), n && (f.clear(e, Tt), m(e, Tt)), f.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && Un(e) && this.to(o + 1);
      },
      s.interval,
      It
    );
  }
  pause() {
    const { element: e, options: s } = this;
    !this.isPaused && s.interval && (d(e, Tt), f.set(
      e,
      () => {
      },
      1,
      Tt
    ));
  }
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  to(e) {
    const { element: s, slides: n, options: o } = this, i = us(this), r = Et(s);
    let c = e;
    if (this.isAnimating || i === c || f.get(s, bt))
      return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", g = a === "left" ? "start" : "end", u = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    yt(Qe, u), yt(fs, u), b(s, Qe), !Qe.defaultPrevented && (this.index = c, Ze(this, c), fe(n[c]) && h(s, "slide") ? f.set(
      s,
      () => {
        d(n[c], `${J}-${l}`), Rt(n[c]), d(n[c], `${J}-${g}`), d(n[i], `${J}-${g}`), N(n[c], () => Mi(this));
      },
      0,
      bt
    ) : (d(n[c], y), m(n[i], y), f.set(
      s,
      () => {
        f.clear(s, bt), s && o.interval && !this.isPaused && this.cycle(), b(s, fs);
      },
      0,
      bt
    )));
  }
  dispose() {
    const { slides: e } = this, s = ["start", "end", "prev", "next"];
    [...e].forEach((n, o) => {
      h(n, y) && Ze(this, o), s.forEach((i) => m(n, `${J}-${i}`));
    }), Us(this), super.dispose();
  }
}
const Nt = "collapsing", F = "collapse", to = "Collapse", zi = `.${F}`, eo = `[${V}="${F}"]`, Xi = { parent: null }, Ee = (t) => R(t, to), Vi = (t) => new so(t), Ys = $(`show.bs.${F}`), Ki = $(`shown.bs.${F}`), qs = $(`hide.bs.${F}`), Ui = $(`hidden.bs.${F}`), Yi = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  b(e, Ys), !Ys.defaultPrevented && (f.set(e, re, 17), s && f.set(s, re, 17), d(e, Nt), m(e, F), x(e, { height: `${e.scrollHeight}px` }), N(e, () => {
    f.clear(e), s && f.clear(s), n.forEach((o) => M(o, He, "true")), m(e, Nt), d(e, F), d(e, p), x(e, { height: "" }), b(e, Ki);
  }));
}, _s = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  b(e, qs), !qs.defaultPrevented && (f.set(e, re, 17), s && f.set(s, re, 17), x(e, { height: `${e.scrollHeight}px` }), m(e, F), m(e, p), d(e, Nt), Rt(e), x(e, { height: "0px" }), N(e, () => {
    f.clear(e), s && f.clear(s), n.forEach((o) => M(o, He, "false")), m(e, Nt), d(e, F), x(e, { height: "" }), b(e, Ui);
  }));
}, Gs = (t, e) => {
  const s = e ? D : I, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, O, qi));
}, qi = (t) => {
  const { target: e } = t, s = e && A(e, eo), n = s && j(s), o = n && Ee(n);
  o && o.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class so extends st {
  static selector = zi;
  static init = Vi;
  static getInstance = Ee;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...et(eo, i)].filter((r) => j(r) === n), this.parent = H(o.parent, i) || j(n) || null, Gs(this, !0);
  }
  get name() {
    return to;
  }
  get defaults() {
    return Xi;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  hide() {
    const { triggers: e, element: s } = this;
    f.get(s) || (_s(this), e.length && e.forEach((n) => d(n, `${F}d`)));
  }
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...et(`.${F}.${p}`, s)].find(
      (r) => Ee(r)
    ), i = o && Ee(o)), (!s || !f.get(s)) && !f.get(e) && (i && o !== e && (_s(i), i.triggers.forEach((r) => {
      d(r, `${F}d`);
    })), Yi(this), n.length && n.forEach((r) => m(r, `${F}d`)));
  }
  dispose() {
    Gs(this), super.dispose();
  }
}
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], no = "Dropdown", oo = "dropdown-menu", io = (t) => {
  const e = A(t, "A");
  return t.tagName === "A" && Ae(t, "href") && t.href.slice(-1) === "#" || e && Ae(e, "href") && e.href.slice(-1) === "#";
}, [ot, De, Ie, ke] = Lt, Es = `[${V}="${ot}"],[${V}="${De}"],[${V}="${ke}"],[${V}="${Ie}"]`, Yt = (t) => R(t, no), _i = (t) => new co(t), Gi = `${oo}-end`, Qs = [ot, De], Zs = [Ie, ke], Js = ["A", "BUTTON"], Qi = {
  offset: 5,
  display: "dynamic"
}, Je = $(`show.bs.${ot}`), tn = $(`shown.bs.${ot}`), ts = $(`hide.bs.${ot}`), en = $(`hidden.bs.${ot}`), ro = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (tt(s, "position") === "static")
    return;
  const r = Et(e), c = h(s, Gi);
  ["margin", "top", "bottom", "left", "right"].forEach((k) => {
    const ge = {};
    ge[k] = "", x(s, ge);
  });
  let l = Lt.find((k) => h(n, k)) || ot;
  const g = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
  }, u = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: S, offsetHeight: B } = s, { clientWidth: v, clientHeight: Q } = Ct(e), { left: W, top: z, width: it, height: ft } = Ut(e), E = W - S - i < 0, ut = W + S + it + i >= v, X = z + B + i >= Q, rt = z + B + ft + i >= Q, pt = z - B - i < 0, C = (!r && c || r && !c) && W + it - S < 0, Y = (r && c || !r && !c) && W + S >= v;
  if (Zs.includes(l) && E && ut && (l = ot), l === Ie && (r ? ut : E) && (l = ke), l === ke && (r ? E : ut) && (l = Ie), l === De && pt && !rt && (l = ot), l === ot && rt && !pt && (l = De), Zs.includes(l) && X && yt(u[l], {
    top: "auto",
    bottom: 0
  }), Qs.includes(l) && (C || Y)) {
    let k = { left: "auto", right: "auto" };
    !C && Y && !r && (k = { left: "auto", right: 0 }), C && !Y && r && (k = { left: 0, right: "auto" }), k && yt(u[l], k);
  }
  const nt = g[l];
  x(s, {
    ...u[l],
    margin: `${nt.map((k) => k && `${k}px`).join(" ")}`
  }), Qs.includes(l) && c && c && x(s, u[!r && C || r && Y ? "menuStart" : "menuEnd"]);
}, Zi = (t) => [...t.children].map((e) => {
  if (e && Js.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && Js.includes(s.tagName) ? s : null;
}).filter((e) => e), sn = (t) => {
  const { element: e, options: s } = t, n = t.open ? D : I, o = w(e);
  n(o, O, on), n(o, vs, on), n(o, Ne, tr), n(o, ei, er), s.display === "dynamic" && [Re, Be].forEach((i) => {
    n(Wt(e), i, sr, q);
  });
}, nn = (t, e) => {
  (e ? D : I)(t.element, O, Ji);
}, Ve = (t) => {
  const e = [...Lt, "btn-group", "input-group"].map((s) => $t(`${s} ${p}`, w(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Lt.some((n) => n === Bt(s, V))
    );
}, on = (t) => {
  const { target: e, type: s } = t;
  if (!e || !e.closest)
    return;
  const n = Ve(e), o = n && Yt(n);
  if (!o)
    return;
  const { parentElement: i, menu: r } = o, c = A(e, Es) !== null, a = i && i.contains(e) && (e.tagName === "form" || A(e, "form") !== null);
  s === O && io(e) && t.preventDefault(), !(s === vs && (e === n || e === r || r.contains(e))) && (a || c || o && o.hide());
}, Ji = (t) => {
  const { target: e } = t, s = e && A(e, Es), n = s && Yt(s);
  n && (t.stopImmediatePropagation(), n.toggle(), s && io(s) && t.preventDefault());
}, tr = (t) => {
  [is, rs].includes(t.code) && t.preventDefault();
};
function er(t) {
  const { code: e } = t, s = Ve(this), n = s && Yt(s), { activeElement: o } = s && w(s);
  if (!n || !o)
    return;
  const { menu: i, open: r } = n, c = Zi(i);
  if (c && c.length && [is, rs].includes(e)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : e === rs ? a = a > 1 ? a - 1 : 0 : e === is && (a = a < c.length - 1 ? a + 1 : a), c[a] && dt(c[a]);
  }
  $s === e && r && (n.toggle(), dt(s));
}
function sr() {
  const t = Ve(this), e = t && Yt(t);
  e && e.open && ro(e);
}
class co extends st {
  static selector = Es;
  static init = _i;
  static getInstance = Yt;
  constructor(e, s) {
    super(e, s);
    const { parentElement: n } = this.element;
    this.parentElement = n, this.menu = H(`.${oo}`, n), nn(this, !0);
  }
  get name() {
    return no;
  }
  get defaults() {
    return Qi;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    if (s)
      return;
    const i = Ve(e), r = i && Yt(i);
    r && r.hide(), [Je, tn].forEach((c) => {
      c.relatedTarget = e;
    }), b(o, Je), !Je.defaultPrevented && (d(n, p), d(o, p), M(e, He, "true"), ro(this), this.open = !s, dt(e), sn(this), b(o, tn));
  }
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    !s || ([ts, en].forEach((i) => {
      i.relatedTarget = e;
    }), b(o, ts), !ts.defaultPrevented && (m(n, p), m(o, p), M(e, He, "false"), this.open = !s, sn(this), b(o, en)));
  }
  dispose() {
    this.open && this.hide(), nn(this), super.dispose();
  }
}
const K = "modal", ao = "Modal", nr = "fixed-top", or = "fixed-bottom", lo = "sticky-top", ho = "position-sticky", fo = (t) => [
  ...$t(nr, t),
  ...$t(or, t),
  ...$t(lo, t),
  ...$t(ho, t),
  ...$t("is-fixed", t)
], ir = (t) => {
  const e = _t(t);
  x(e, {
    paddingRight: "",
    overflow: ""
  });
  const s = fo(e);
  s.length && s.forEach((n) => {
    x(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, uo = (t) => {
  const { clientWidth: e } = Ct(t), { innerWidth: s } = Wt(t);
  return Math.abs(s - e);
}, po = (t, e) => {
  const s = _t(t), n = parseInt(tt(s, "paddingRight"), 10), i = tt(s, "overflow") === "hidden" && n ? 0 : uo(t), r = fo(s);
  e && (x(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = tt(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [lo, ho].some((l) => h(c, l))) {
      const l = tt(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, _ = "offcanvas", at = wt({ tagName: "DIV" }), go = (t) => {
  const e = _t(t);
  U(t) && (e.contains(at) || e.append(at), at.append(t));
}, mo = (t) => {
  U(t) && (t.remove(), at.children.length || at.remove());
}, xt = (t) => at.contains(t), vo = "backdrop", rn = `${K}-${vo}`, cn = `${_}-${vo}`, bo = `.${K}.${p}`, Cs = `.${_}.${p}`, P = wt("div"), Ft = (t) => H(`${bo},${Cs}`, w(t)), Ss = (t) => {
  const e = t ? rn : cn;
  [rn, cn].forEach((s) => {
    m(P, s);
  }), d(P, e);
}, wo = (t, e) => {
  Ss(e), go(P), t && d(P, L);
}, $o = () => {
  h(P, p) || (d(P, p), Rt(P));
}, Ke = () => {
  m(P, p);
}, To = (t) => {
  Ft(t) || (m(P, L), mo(P), ir(t));
}, yo = (t) => T(t) && tt(t, "visibility") !== "hidden" && t.offsetParent !== null, rr = `.${K}`, Eo = `[${V}="${K}"]`, cr = `[${ze}="${K}"]`, Co = `${K}-static`, ar = {
  backdrop: !0,
  keyboard: !0
}, ae = (t) => R(t, ao), lr = (t) => new xo(t), Ce = $(`show.bs.${K}`), an = $(`shown.bs.${K}`), es = $(`hide.bs.${K}`), ln = $(`hidden.bs.${K}`), So = (t) => {
  const { element: e } = t, s = uo(e), { clientHeight: n, scrollHeight: o } = Ct(e), { clientHeight: i, scrollHeight: r } = e, c = i !== r;
  if (!c && s) {
    const a = Et(e) ? "paddingLeft" : "paddingRight", l = {};
    l[a] = `${s}px`, x(e, l);
  }
  po(e, c || n !== o);
}, Ho = (t, e) => {
  const s = e ? D : I, { element: n } = t;
  s(n, O, fr), s(Wt(n), Be, t.update, q), s(w(n), Ne, hr);
}, dn = (t, e) => {
  const s = e ? D : I, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, O, dr));
}, hn = (t, e) => {
  const { triggers: s, element: n, relatedTarget: o } = t;
  To(n), x(n, { paddingRight: "", display: "" }), Ho(t);
  const i = Ce.relatedTarget || s.find(yo);
  i && dt(i), Fe(e) && e(), ln.relatedTarget = o, b(n, ln);
}, fn = (t) => {
  const { element: e, relatedTarget: s } = t;
  dt(e), Ho(t, !0), an.relatedTarget = s, b(e, an);
}, un = (t) => {
  const { element: e, hasFade: s } = t;
  x(e, { display: "block" }), So(t), Ft(e) || x(_t(e), { overflow: "hidden" }), d(e, p), Ot(e, Me), M(e, Oe, "true"), s ? N(e, () => fn(t)) : fn(t);
}, pn = (t, e) => {
  const { element: s, options: n, hasFade: o } = t;
  n.backdrop && !e && o && h(P, p) && !Ft(s) ? (Ke(), N(P, () => hn(t))) : hn(t, e);
}, dr = (t) => {
  const { target: e } = t, s = e && A(e, Eo), n = s && j(s), o = n && ae(n);
  !o || (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, hr = ({ code: t, target: e }) => {
  const s = H(bo, w(e)), n = s && ae(s);
  if (!n)
    return;
  const { options: o } = n;
  o.keyboard && t === $s && h(s, p) && (n.relatedTarget = null, n.hide());
};
function fr(t) {
  const e = ae(this);
  if (!e || f.get(this))
    return;
  const { options: s, isStatic: n, modalDialog: o } = e, { backdrop: i } = s, { target: r } = t, c = w(this)?.getSelection()?.toString().length, a = o?.contains(r), l = r && A(r, cr);
  n && !a ? f.set(
    this,
    () => {
      d(this, Co), N(o, () => ur(e));
    },
    17
  ) : (l || !c && !n && !a && i) && (e.relatedTarget = l || null, e.hide(), t.preventDefault());
}
const ur = (t) => {
  const { element: e, modalDialog: s } = t, n = (T(s) ? fe(s) : 0) + 17;
  m(e, Co), f.set(e, () => f.clear(e), n);
};
class xo extends st {
  static selector = rr;
  static init = lr;
  static getInstance = ae;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.modalDialog = H(`.${K}-dialog`, n), this.triggers = [...et(Eo, w(n))].filter(
      (o) => j(o) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, L), this.relatedTarget = null, dn(this, !0), this.update = this.update.bind(this);
  }
  get name() {
    return ao;
  }
  get defaults() {
    return ar;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(e, p) || (Ce.relatedTarget = o || void 0, b(e, Ce), Ce.defaultPrevented))
      return;
    const c = Ft(e);
    if (c && c !== e) {
      const l = ae(c) || R(c, "Offcanvas");
      l && l.hide();
    }
    i ? (xt(P) ? Ss(!0) : wo(n, !0), r = fe(P), $o(), setTimeout(() => un(this), r)) : (un(this), c && h(P, p) && Ke());
  }
  hide(e) {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    !h(s, p) || (es.relatedTarget = o || void 0, b(s, es), !es.defaultPrevented && (m(s, p), M(s, Me, "true"), Ot(s, Oe), n ? N(s, () => pn(this, e)) : pn(this, e)));
  }
  update() {
    h(this.element, p) && So(this);
  }
  dispose() {
    dn(this), this.hide(() => super.dispose());
  }
}
const Po = "Offcanvas", pr = `.${_}`, Hs = `[${V}="${_}"]`, gr = `[${ze}="${_}"]`, Ue = `${_}-toggling`, mr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, le = (t) => R(t, Po), vr = (t) => new ko(t), Se = $(`show.bs.${_}`), Ao = $(`shown.bs.${_}`), ss = $(`hide.bs.${_}`), Do = $(`hidden.bs.${_}`), br = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = Ct(e);
  po(e, s !== n);
}, gn = (t, e) => {
  const s = e ? D : I;
  t.triggers.forEach((n) => s(n, O, wr));
}, Io = (t, e) => {
  const s = e ? D : I, n = w(t.element);
  s(n, Ne, Tr), s(n, O, $r);
}, mn = (t) => {
  const { element: e, options: s } = t;
  s.scroll || (br(t), x(_t(e), { overflow: "hidden" })), d(e, Ue), d(e, p), x(e, { visibility: "visible" }), N(e, () => yr(t));
}, vn = (t, e) => {
  const { element: s, options: n } = t, o = Ft(s);
  s.blur(), !o && n.backdrop && h(P, p) ? (Ke(), N(P, () => bn(t, e))) : bn(t, e);
}, wr = (t) => {
  const e = A(t.target, Hs), s = e && j(e), n = s && le(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, $r = (t) => {
  const { target: e } = t, s = H(Cs, w(e)), n = H(gr, s), o = s && le(s);
  if (!o)
    return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = A(e, Hs), l = w(s).getSelection();
  P.contains(e) && c === "static" || (!(l && l.toString().length) && (!s.contains(e) && c && (!a || r.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), a && a.tagName === "A" && t.preventDefault());
}, Tr = ({ code: t, target: e }) => {
  const s = H(Cs, w(e)), n = s && le(s);
  !n || n.options.keyboard && t === $s && (n.relatedTarget = null, n.hide());
}, yr = (t) => {
  const { element: e } = t;
  m(e, Ue), Ot(e, Me), M(e, Oe, "true"), M(e, "role", "dialog"), b(e, Ao), Io(t, !0), dt(e);
}, bn = (t, e) => {
  const { element: s, triggers: n } = t;
  M(s, Me, "true"), Ot(s, Oe), Ot(s, "role"), x(s, { visibility: "" });
  const o = Se.relatedTarget || n.find(yo);
  o && dt(o), To(s), b(s, Do), m(s, Ue), Ft(s) || Io(t), Fe(e) && e();
};
class ko extends st {
  static selector = pr;
  static init = vr;
  static getInstance = le;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...et(Hs, w(n))].filter(
      (o) => j(o) === n
    ), this.relatedTarget = null, gn(this, !0);
  }
  get name() {
    return Po;
  }
  get defaults() {
    return mr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(e, p) || (Se.relatedTarget = n || void 0, Ao.relatedTarget = n || void 0, b(e, Se), Se.defaultPrevented))
      return;
    const i = Ft(e);
    if (i && i !== e) {
      const c = le(i) || R(i, "Modal");
      c && c.hide();
    }
    s.backdrop ? (xt(P) ? Ss() : wo(!0), o = fe(P), $o(), setTimeout(() => mn(this), o)) : (mn(this), i && h(P, p) && Ke());
  }
  hide(e) {
    const { element: s, relatedTarget: n } = this;
    !h(s, p) || (ss.relatedTarget = n || void 0, Do.relatedTarget = n || void 0, b(s, ss), !ss.defaultPrevented && (d(s, Ue), m(s, p), e ? vn(this, e) : N(s, () => vn(this, e))));
  }
  dispose() {
    gn(this), this.hide(() => super.dispose());
  }
}
const kt = "popover", Ye = "Popover", lt = "tooltip", Mo = (t) => {
  const e = t === lt, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${lt}">${n + o + i}</div>`;
}, Oo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ps = (t, e) => {
  const s = /\b(top|bottom|start|end)+/, { element: n, tooltip: o, options: i, arrow: r } = t;
  if (!o)
    return;
  const c = { ...Oo }, a = Et(n);
  a && (c.left = "end", c.right = "start"), x(o, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const l = t.name === Ye, { offsetWidth: g, offsetHeight: u } = o, { clientWidth: S, clientHeight: B } = Ct(n);
  let { placement: v } = i;
  const { left: Q, right: W, top: z } = Ut(at, !0), { clientWidth: it, offsetWidth: ft } = at, E = Math.abs(it - ft), ut = tt(at, "position"), X = ut === "fixed", rt = ut === "static", pt = a && X ? E : 0, C = X ? it + Q + (a ? E : 0) : it + Q + (S - W) - 1, {
    width: Y,
    height: nt,
    left: k,
    right: ge,
    top: Gt
  } = Ut(n, !0), As = Wt(o), me = { x: As.scrollX, y: As.scrollY }, { x: ve, y: Qt } = { x: k + me.x, y: Gt + me.y };
  x(r, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let gt = 0, Z = 0, be = 0, Zt = 0, jt = 0, Jt = 0;
  const ct = r.offsetWidth || 0, St = r.offsetHeight || 0, zt = ct / 2;
  let we = Gt - u - St < 0, $e = Gt + u + nt + St >= B, te = k - g - ct < pt, ee = k + g + Y + ct >= C;
  const Te = ["left", "right"], qe = ["top", "bottom"];
  if (we = Te.includes(v) ? Gt + nt / 2 - u / 2 - St < 0 : we, $e = Te.includes(v) ? Gt + u / 2 + nt / 2 + St >= B : $e, te = qe.includes(v) ? k + Y / 2 - g / 2 < pt : te, ee = qe.includes(v) ? k + g / 2 + Y / 2 >= C : ee, v = Te.includes(v) && te && ee ? "top" : v, v = v === "top" && we ? "bottom" : v, v = v === "bottom" && $e ? "top" : v, v = v === "left" && te ? "right" : v, v = v === "right" && ee ? "left" : v, o.className.includes(v) || (o.className = o.className.replace(s, c[v])), Te.includes(v))
    v === "left" ? Z = ve - g - (l ? ct : 0) : Z = ve + Y + (l ? ct : 0), we ? (gt = Qt, Zt = nt / 2 - ct) : $e ? (gt = Qt - u + nt, Zt = u - nt / 2 - ct) : (gt = Qt - u / 2 + nt / 2, Zt = u / 2 - St / 2);
  else if (qe.includes(v))
    if (e && je(n)) {
      let Xt = 0, ye = 0;
      rt ? (Xt = e.pageX, ye = e.pageY) : (Xt = e.clientX - Q + (X ? me.x : 0), ye = e.clientY - z + (X ? me.y : 0)), Xt -= a && X && E ? E : 0, v === "top" ? gt = ye - u - ct : gt = ye + ct, e.clientX - g / 2 < pt ? (Z = 0, jt = Xt - zt) : e.clientX + g / 2 > C ? (Z = "auto", be = 0, Jt = C - Xt - zt, Jt -= X ? Q + (a ? E : 0) : 0) : (Z = Xt - g / 2, jt = g / 2 - zt);
    } else
      v === "top" ? gt = Qt - u - (l ? St : 0) : gt = Qt + nt + (l ? St : 0), te ? (Z = 0, jt = ve + Y / 2 - zt) : ee ? (Z = "auto", be = 0, Jt = Y / 2 + C - ge - zt) : (Z = ve - g / 2 + Y / 2, jt = g / 2 - zt);
  x(o, {
    top: `${gt}px`,
    left: Z === "auto" ? Z : `${Z}px`,
    right: be !== void 0 ? `${be}px` : ""
  }), T(r) && (Zt !== void 0 && (r.style.top = `${Zt}px`), jt !== void 0 ? r.style.left = `${jt}px` : Jt !== void 0 && (r.style.right = `${Jt}px`));
}, gs = {
  template: Mo(lt),
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
}, No = "data-original-title", Mt = "Tooltip", vt = (t, e, s) => {
  if (!(!T(t) || Dt(e) && !e.length))
    if (Dt(e)) {
      let n = e.trim();
      Fe(s) && (n = s(n));
      const i = new DOMParser().parseFromString(n, "text/html");
      t.append(...i.body.childNodes);
    } else
      T(e) ? t.append(e) : (Ti(e) || $i(e) && e.every(U)) && t.append(...e);
}, Er = (t) => {
  const e = t.name === Mt, { id: s, element: n, options: o } = t, { title: i, placement: r, template: c, animation: a, customClass: l, sanitizeFn: g, dismissible: u, content: S, btnClose: B } = o, v = e ? lt : kt, Q = { ...Oo };
  let W = [], z = [];
  Et(n) && (Q.left = "end", Q.right = "start");
  const it = `bs-${v}-${Q[r]}`;
  let ft;
  if (T(c))
    ft = c;
  else {
    const C = wt("div");
    vt(C, c, g), ft = C.firstChild;
  }
  t.tooltip = T(ft) ? ft.cloneNode(!0) : void 0;
  const { tooltip: E } = t;
  if (!E)
    return;
  M(E, "id", s), M(E, "role", lt);
  const ut = e ? `${lt}-inner` : `${kt}-body`, X = e ? null : H(`.${kt}-header`, E), rt = H(`.${ut}`, E);
  t.arrow = H(`.${v}-arrow`, E);
  const { arrow: pt } = t;
  if (T(i))
    W = [i.cloneNode(!0)];
  else {
    const C = wt("div");
    vt(C, i, g), W = [...C.childNodes];
  }
  if (T(S))
    z = [S.cloneNode(!0)];
  else {
    const C = wt("div");
    vt(C, S, g), z = [...C.childNodes];
  }
  if (u)
    if (i)
      if (T(B))
        W = [...W, B.cloneNode(!0)];
      else {
        const C = wt("div");
        vt(C, B, g), W = [...W, C.firstChild];
      }
    else if (X && X.remove(), T(B))
      z = [...z, B.cloneNode(!0)];
    else {
      const C = wt("div");
      vt(C, B, g), z = [...z, C.firstChild];
    }
  e ? i && rt && vt(rt, i, g) : (i && X && vt(X, W, g), S && rt && vt(rt, z, g), t.btn = H(".btn-close", E) || void 0), d(E, "position-absolute"), d(pt, "position-absolute"), h(E, v) || d(E, v), a && !h(E, L) && d(E, L), l && !h(E, l) && d(E, l), h(E, it) || d(E, it);
}, Cr = `[${V}="${lt}"],[data-tip="${lt}"]`, Lo = "title";
let wn = (t) => R(t, Mt);
const Sr = (t) => new xs(t), Hr = (t) => {
  const { element: e, tooltip: s } = t;
  Ot(e, Fn), mo(s);
}, xr = (t, e) => {
  const { element: s } = t;
  oe(t), Ae(s, No) && t.name === Mt && Ro(t), e && e();
}, Bo = (t, e) => {
  const s = e ? D : I, { element: n } = t;
  s(w(n), zn, t.handleTouch, q), je(n) || [Re, Be].forEach((o) => {
    s(Wt(n), o, t.update, q);
  });
}, $n = (t) => {
  const { element: e } = t, s = $(`shown.bs.${ce(t.name)}`);
  Bo(t, !0), b(e, s), f.clear(e, "in");
}, Tn = (t, e) => {
  const { element: s } = t, n = $(`hidden.bs.${ce(t.name)}`);
  Bo(t), Hr(t), b(s, n), Fe(e) && e(), f.clear(s, "out");
}, oe = (t, e) => {
  const s = e ? D : I, { element: n, options: o, btn: i } = t, { trigger: r } = o, a = !!(t.name !== Mt && o.dismissible);
  if (r?.includes("manual"))
    return;
  t.enabled = !!e;
  const l = r?.split(" "), g = je(n);
  g && s(n, oi, t.update, q), l?.forEach((u) => {
    g || u === ni ? (s(n, si, t.show), s(n, Le, t.show), a && i ? s(i, O, t.hide) : (s(n, ws, t.hide), s(w(n), zn, t.handleTouch, q))) : u === O ? s(n, u, a ? t.show : t.toggle) : u === vs && (s(n, bs, t.show), a || s(n, jn, t.hide), fi && s(n, O, () => dt(n)));
  });
}, yn = (t, e) => {
  const s = e ? D : I, { element: n } = t, o = A(n, `.${K}`), i = A(n, `.${_}`);
  if (!je(n)) {
    const r = Wt(n);
    s(r, Be, t.update, q), s(r, Re, t.update, q);
  }
  o && s(o, `hide.bs.${K}`, t.hide), i && s(i, `hide.bs.${_}`, t.hide);
}, Ro = (t, e) => {
  const s = [No, Lo], { element: n } = t;
  M(n, s[e ? 0 : 1], e || Bt(n, s[0]) || ""), Ot(n, s[e ? 1 : 0]);
};
class xs extends st {
  static selector = Cr;
  static init = Sr;
  static getInstance = wn;
  static styleTip = ps;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this, o = this.name === Mt, i = o ? lt : kt, r = o ? Mt : Ye;
    wn = (a) => R(a, r), this.enabled = !0, this.id = `${i}-${Kn(n, i)}`;
    const { options: c } = this;
    !c.title && o || !o && !c.content || (yt(gs, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), Ae(n, Lo) && o && Ro(this, c.title), Er(this), oe(this, !0));
  }
  get name() {
    return Mt;
  }
  get defaults() {
    return gs;
  }
  show(e) {
    const { options: s, tooltip: n, element: o, id: i } = this, { animation: r } = s, c = f.get(o, "out");
    f.clear(o, "out"), n && !c && !xt(n) && f.set(
      o,
      () => {
        const a = $(`show.bs.${ce(this.name)}`);
        b(o, a), !a.defaultPrevented && (go(n), M(o, Fn, `#${i}`), this.update(e), yn(this, !0), h(n, p) || d(n, p), r ? N(n, () => $n(this)) : $n(this));
      },
      17,
      "in"
    );
  }
  hide(e, s) {
    const { options: n, tooltip: o, element: i } = this, { animation: r, delay: c } = n;
    f.clear(i, "in"), o && xt(o) && f.set(
      i,
      () => {
        const a = $(`hide.bs.${ce(this.name)}`);
        b(i, a), !a.defaultPrevented && (this.update(e), m(o, p), yn(this), r ? N(o, () => Tn(this, s)) : Tn(this, s));
      },
      c + 17,
      "out"
    );
  }
  update(e) {
    ps(this, e);
  }
  toggle(e) {
    const { tooltip: s } = this;
    s && !xt(s) ? this.show(e) : this.hide();
  }
  enable() {
    const { enabled: e } = this;
    e || (oe(this, !0), this.enabled = !e);
  }
  disable() {
    const { tooltip: e, options: s, enabled: n } = this, { animation: o } = s;
    n && (e && xt(e) && o ? this.hide(void 0, () => oe(this)) : oe(this), this.enabled = !n);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch({ target: e }) {
    const { tooltip: s, element: n } = this;
    s && s.contains(e) || e === n || e && n.contains(e) || this.hide();
  }
  dispose() {
    const { tooltip: e, options: s } = this, n = () => xr(this, () => super.dispose());
    s.animation && e && xt(e) ? (this.options.delay = 0, this.hide(void 0, n)) : n();
  }
}
const Pr = `[${V}="${kt}"],[data-tip="${kt}"]`, Ar = yt({}, gs, {
  template: Mo(kt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Dr = (t) => R(t, Ye), Ir = (t) => new Wo(t);
class Wo extends xs {
  static selector = Pr;
  static init = Ir;
  static getInstance = Dr;
  static styleTip = ps;
  constructor(e, s) {
    super(e, s);
  }
  get name() {
    return Ye;
  }
  get defaults() {
    return Ar;
  }
  show() {
    super.show();
    const { options: e, btn: s } = this;
    e.dismissible && s && setTimeout(() => dt(s), 17);
  }
}
const kr = "scrollspy", Fo = "ScrollSpy", Mr = '[data-bs-spy="scroll"]', Or = {
  offset: 10,
  target: null
}, Nr = (t) => R(t, Fo), Lr = (t) => new zo(t), En = $(`activate.bs.${kr}`), Br = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: r } = t, { offset: c } = n, a = Ts(s), l = e && ys("A", e), g = s && Rr(s);
  if (t.scrollTop = a ? s.scrollY : s.scrollTop, l && (o !== l.length || g !== i)) {
    let u, S, B;
    t.items = [], t.offsets = [], t.scrollHeight = g, t.maxScroll = t.scrollHeight - Wr(t), [...l].forEach((v) => {
      u = Bt(v, "href"), S = u && u.charAt(0) === "#" && u.slice(-1) !== "#" && H(u, w(r)), S && (t.items.push(v), B = Ut(S), t.offsets.push((a ? B.top + t.scrollTop : S.offsetTop) - c));
    }), t.itemsLength = t.items.length;
  }
}, Rr = (t) => T(t) ? t.scrollHeight : Ct(t).scrollHeight, Wr = ({ element: t, scrollTarget: e }) => Ts(e) ? e.innerHeight : Ut(t).height, jo = (t) => {
  [...ys("A", t)].forEach((e) => {
    h(e, y) && m(e, y);
  });
}, Cn = (t, e) => {
  const { target: s, element: n } = t;
  T(s) && jo(s), t.activeItem = e, d(e, y);
  const o = [];
  let i = e;
  for (; i !== _t(n); )
    i = i.parentElement, (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const c = r.previousElementSibling;
    c && !h(c, y) && d(c, y);
  }), En.relatedTarget = e, b(n, En);
}, Sn = (t, e) => {
  (e ? D : I)(t.scrollTarget, Re, t.refresh, q);
};
class zo extends st {
  static selector = Mr;
  static init = Lr;
  static getInstance = Nr;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    this.target = H(o.target, w(n)), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : Wt(n), this.refresh = this.refresh.bind(this), Sn(this, !0), this.refresh());
  }
  get name() {
    return Fo;
  }
  get defaults() {
    return Or;
  }
  refresh() {
    const { target: e } = this;
    if (e?.offsetHeight === 0)
      return;
    Br(this);
    const { scrollTop: s, maxScroll: n, itemsLength: o, items: i, activeItem: r } = this;
    if (s >= n) {
      const a = i[o - 1];
      r !== a && Cn(this, a);
      return;
    }
    const { offsets: c } = this;
    if (r && s < c[0] && c[0] > 0) {
      this.activeItem = null, T(e) && jo(e);
      return;
    }
    i.forEach((a, l) => {
      r !== a && s >= c[l] && (typeof c[l + 1] > "u" || s < c[l + 1]) && Cn(this, a);
    });
  }
  dispose() {
    Sn(this), super.dispose();
  }
}
const pe = "tab", Xo = "Tab", Hn = `[${V}="${pe}"]`, Vo = (t) => R(t, Xo), Fr = (t) => new Ko(t), ns = $(`show.bs.${pe}`), xn = $(`shown.bs.${pe}`), os = $(`hide.bs.${pe}`), Pn = $(`hidden.bs.${pe}`), de = /* @__PURE__ */ new Map(), An = (t) => {
  const { tabContent: e, nav: s } = t;
  e && h(e, Nt) && (e.style.height = "", m(e, Nt)), s && f.clear(s);
}, Dn = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = T(o) && de.get(o) || { tab: null };
  if (s && n && h(n, L)) {
    const { currentHeight: r, nextHeight: c } = de.get(e) || { currentHeight: 0, nextHeight: 0 };
    r === c ? An(t) : setTimeout(() => {
      s.style.height = `${c}px`, Rt(s), N(s, () => An(t));
    }, 50);
  } else
    o && f.clear(o);
  xn.relatedTarget = i, b(e, xn);
}, In = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: r } = o && de.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, L) && ([r, s].forEach((a) => {
    T(a) && d(a, "overflow-hidden");
  }), c = T(r) ? r.scrollHeight : 0), ns.relatedTarget = i, Pn.relatedTarget = e, b(e, ns), !ns.defaultPrevented) {
    if (s && d(s, y), r && m(r, y), n && s && h(s, L)) {
      const a = s.scrollHeight;
      de.set(e, { currentHeight: c, nextHeight: a, tab: null, content: null }), d(n, Nt), n.style.height = `${c}px`, Rt(n), [r, s].forEach((l) => {
        l && m(l, "overflow-hidden");
      });
    }
    s && s && h(s, L) ? setTimeout(() => {
      d(s, p), N(s, () => {
        Dn(t);
      });
    }, 1) : (s && d(s, p), Dn(t)), i && b(i, Pn);
  }
}, kn = (t) => {
  const { nav: e } = t;
  if (!T(e))
    return { tab: null, content: null };
  const s = $t(y, e);
  let n = null;
  s.length === 1 && !Lt.some((i) => h(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = T(n) ? j(n) : null;
  return { tab: n, content: o };
}, Mn = (t) => {
  if (!T(t))
    return null;
  const e = A(t, `.${Lt.join(",.")}`);
  return e ? H(`.${Lt[0]}-toggle`, e) : null;
}, On = (t, e) => {
  (e ? D : I)(t.element, O, jr);
}, jr = (t) => {
  const e = Vo(t.target);
  !e || (t.preventDefault(), e.show());
};
class Ko extends st {
  static selector = Hn;
  static init = Fr;
  static getInstance = Vo;
  constructor(e) {
    super(e);
    const { element: s } = this, n = j(s);
    if (!n)
      return;
    const o = A(s, ".nav"), i = A(n, ".tab-content");
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = Mn(s);
    const { tab: r } = kn(this);
    if (o && !r) {
      const c = H(Hn, o), a = c && j(c);
      a && (d(c, y), d(a, p), d(a, y), M(s, _e, "true"));
    }
    On(this, !0);
  }
  get name() {
    return Xo;
  }
  show() {
    const { element: e, content: s, nav: n, dropdown: o } = this;
    if (!(n && f.get(n)) && !h(e, y)) {
      const { tab: i, content: r } = kn(this);
      if (n && de.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), os.relatedTarget = e, T(i) && b(i, os), os.defaultPrevented)
        return;
      d(e, y), M(e, _e, "true");
      const c = T(i) && Mn(i);
      if (c && h(c, y) && m(c, y), n) {
        const a = () => {
          i && (m(i, y), M(i, _e, "false")), o && !h(o, y) && d(o, y);
        };
        r && (h(r, L) || s && h(s, L)) ? f.set(n, a, 1) : a();
      }
      r && (m(r, p), h(r, L) ? N(r, () => In(this)) : In(this));
    }
  }
  dispose() {
    On(this), super.dispose();
  }
}
const G = "toast", Uo = "Toast", zr = `.${G}`, Xr = `[${ze}="${G}"]`, Yo = `[${V}="${G}"]`, qt = "showing", qo = "hide", Vr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Ps = (t) => R(t, Uo), Kr = (t) => new Go(t), Nn = $(`show.bs.${G}`), Ur = $(`shown.bs.${G}`), Ln = $(`hide.bs.${G}`), Yr = $(`hidden.bs.${G}`), Bn = (t) => {
  const { element: e, options: s } = t;
  m(e, qt), f.clear(e, qt), b(e, Ur), s.autohide && f.set(e, () => t.hide(), s.delay, G);
}, Rn = (t) => {
  const { element: e } = t;
  m(e, qt), m(e, p), d(e, qo), f.clear(e, G), b(e, Yr);
}, qr = (t) => {
  const { element: e, options: s } = t;
  d(e, qt), s.animation ? (Rt(e), N(e, () => Rn(t))) : Rn(t);
}, _r = (t) => {
  const { element: e, options: s } = t;
  f.set(
    e,
    () => {
      m(e, qo), Rt(e), d(e, p), d(e, qt), s.animation ? N(e, () => Bn(t)) : Bn(t);
    },
    17,
    qt
  );
}, _o = (t, e) => {
  const s = e ? D : I, { element: n, triggers: o, dismiss: i, options: r } = t;
  i && s(i, O, t.hide), r.autohide && [bs, jn, Le, ws].forEach(
    (c) => s(n, c, Zr)
  ), o.length && o.forEach((c) => s(c, O, Qr));
}, Gr = (t) => {
  f.clear(t.element, G), _o(t);
}, Qr = (t) => {
  const { target: e } = t, s = e && A(e, Yo), n = s && j(s), o = n && Ps(n);
  !o || (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, Zr = (t) => {
  const e = t.target, s = Ps(e), { type: n, relatedTarget: o } = t;
  !s || e === o || e.contains(o) || ([Le, bs].includes(n) ? f.clear(e, G) : f.set(e, () => s.hide(), s.options.delay, G));
};
class Go extends st {
  static selector = zr;
  static init = Kr;
  static getInstance = Ps;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, L) ? d(n, L) : !o.animation && h(n, L) && m(n, L), this.dismiss = H(Xr, n), this.triggers = [...et(Yo, w(n))].filter(
      (i) => j(i) === n
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), _o(this, !0);
  }
  get name() {
    return Uo;
  }
  get defaults() {
    return Vr;
  }
  get isShown() {
    return h(this.element, p);
  }
  show() {
    const { element: e, isShown: s } = this;
    if (e && !s) {
      if (b(e, Nn), Nn.defaultPrevented)
        return;
      _r(this);
    }
  }
  hide() {
    const { element: e, isShown: s } = this;
    if (e && s) {
      if (b(e, Ln), Ln.defaultPrevented)
        return;
      qr(this);
    }
  }
  dispose() {
    const { element: e, isShown: s } = this;
    s && m(e, p), Gr(this), super.dispose();
  }
}
const Qo = {
  Alert: qn,
  Button: Gn,
  Carousel: Jn,
  Collapse: so,
  Dropdown: co,
  Modal: xo,
  Offcanvas: ko,
  Popover: Wo,
  ScrollSpy: zo,
  Tab: Ko,
  Toast: Go,
  Tooltip: xs
}, Jr = (t, e) => {
  [...e].forEach((s) => t(s));
}, tc = (t, e) => {
  const s = At.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, Wn = (t) => {
  const e = t && t.nodeName ? t : document, s = [...ys("*", e)];
  bi(Qo).forEach((n) => {
    const { init: o, selector: i } = n;
    Jr(
      o,
      s.filter((r) => yi(r, i))
    );
  });
}, sc = (t) => {
  const e = t && t.nodeName ? t : document;
  cs(Qo).forEach((s) => {
    tc(s, e);
  });
};
document.body ? Wn() : D(document, "DOMContentLoaded", () => Wn(), { once: !0 });
export {
  qn as Alert,
  Gn as Button,
  Jn as Carousel,
  so as Collapse,
  co as Dropdown,
  ec as Listener,
  xo as Modal,
  ko as Offcanvas,
  Wo as Popover,
  zo as ScrollSpy,
  Ko as Tab,
  Go as Toast,
  xs as Tooltip,
  Wn as initCallback,
  sc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
