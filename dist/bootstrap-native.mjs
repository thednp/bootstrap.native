const Pt = {}, ds = (t) => {
  const { type: e, currentTarget: s } = t;
  [...Pt[e]].forEach(([n, o]) => {
    s === n && [...o].forEach(([i, r]) => {
      i.apply(n, [t]), typeof r == "object" && r.once && I(n, e, i, r);
    });
  });
}, A = (t, e, s, n) => {
  Pt[e] || (Pt[e] = /* @__PURE__ */ new Map());
  const o = Pt[e];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: r } = i;
  i.set(s, n), r || t.addEventListener(e, ds, n);
}, I = (t, e, s, n) => {
  const o = Pt[e], i = o && o.get(t), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete Pt[e], (!i || !i.size) && t.removeEventListener(e, ds, c);
}, Uo = A, Xo = I, Qr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: A,
  globalListener: ds,
  off: Xo,
  on: Uo,
  registry: Pt,
  removeListener: I
}, Symbol.toStringTag, { value: "Module" })), Mn = "aria-describedby", be = "aria-expanded", He = "aria-hidden", Se = "aria-modal", Hs = "aria-pressed", Ke = "aria-selected", qo = "DOMContentLoaded", hs = "focus", fs = "focusin", Ln = "focusout", Pe = "keydown", _o = "keyup", M = "click", Go = "mousedown", Qo = "hover", xe = "mouseenter", us = "mouseleave", Zo = "pointerdown", Jo = "pointermove", ti = "pointerup", De = "resize", Ae = "scroll", Bn = "touchstart", Je = "ArrowDown", ts = "ArrowUp", Ss = "ArrowLeft", Ps = "ArrowRight", ps = "Escape", ei = "transitionDuration", si = "transitionDelay", Ve = "transitionend", Rn = "transitionProperty", ni = navigator.userAgentData, we = ni, { userAgent: oi } = navigator, $e = oi, xs = /iPhone|iPad|iPod|Android/i;
we ? we.brands.some((t) => xs.test(t.brand)) : xs.test($e);
const Ds = /(iPhone|iPod|iPad)/, ii = we ? we.brands.some((t) => Ds.test(t.brand)) : Ds.test($e);
$e && $e.includes("Firefox");
const { head: Ie } = document;
["webkitPerspective", "perspective"].some((t) => t in Ie.style);
const ri = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, ci = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, ai = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), ci(t, e, o, n));
  };
  ri(t, e, o, n);
}, ne = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    ai(document, qo, ne, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Ie.style);
["webkitAnimation", "animation"].some((t) => t in Ie.style);
["webkitTransition", "transition"].some((t) => t in Ie.style);
const Lt = (t, e) => t.getAttribute(e), Te = (t, e) => t.hasAttribute(e), N = (t, e, s) => t.setAttribute(e, s), Nt = (t, e) => t.removeAttribute(e), d = (t, ...e) => {
  t.classList.add(...e);
}, g = (t, ...e) => {
  t.classList.remove(...e);
}, h = (t, e) => t.classList.contains(e), ae = (t) => t != null && typeof t == "object" || !1, k = (t) => ae(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, T = (t) => k(t) && t.nodeType === 1 || !1, Jt = /* @__PURE__ */ new Map(), xt = {
  set: (t, e, s) => {
    T(t) && (Jt.has(e) || Jt.set(e, /* @__PURE__ */ new Map()), Jt.get(e).set(t, s));
  },
  getAllFor: (t) => Jt.get(t) || null,
  get: (t, e) => {
    if (!T(t) || !e)
      return null;
    const s = xt.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  remove: (t, e) => {
    const s = xt.getAllFor(e);
    !s || !T(t) || (s.delete(t), s.size === 0 && Jt.delete(e));
  }
}, F = (t, e) => xt.get(t, e), Dt = (t) => typeof t == "string" || !1, gs = (t) => ae(t) && t.constructor.name === "Window" || !1, Wn = (t) => k(t) && t.nodeType === 9 || !1, b = (t) => gs(t) ? t.document : Wn(t) ? t : k(t) ? t.ownerDocument : window.document, se = (t) => Object.entries(t), bt = (t) => {
  if (!t)
    return;
  if (Dt(t))
    return b().createElement(t);
  const { tagName: e } = t, s = bt(e);
  if (!s)
    return;
  const n = { ...t };
  return delete n.tagName, se(n).forEach(([o, i]) => {
    Dt(o) && Dt(i) && N(s, o, i);
  }), s;
}, v = (t, e) => t.dispatchEvent(e), K = (t, e) => {
  const s = getComputedStyle(t), n = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, li = (t) => {
  const e = K(t, Rn), s = K(t, si), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (t) => {
  const e = K(t, Rn), s = K(t, ei), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, L = (t, e) => {
  let s = 0;
  const n = new Event(Ve), o = le(t), i = li(t);
  if (o) {
    const r = (c) => {
      c.target === t && (e.apply(t, [c]), t.removeEventListener(Ve, r), s = 1);
    };
    t.addEventListener(Ve, r), setTimeout(() => {
      s || v(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, rt = (t, e) => t.focus(e), As = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, oe = (t) => t.toLowerCase(), di = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, r = { ...e }, c = {}, a = "title";
  return se(i).forEach(([l, p]) => {
    const m = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (E) => oe(E)) : l;
    c[m] = As(p);
  }), se(o).forEach(([l, p]) => {
    o[l] = As(p);
  }), se(e).forEach(([l, p]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Lt(t, a) : p;
  }), r;
}, Tt = (t, ...e) => Object.assign(t, ...e), es = (t) => Object.keys(t), hi = (t) => Object.values(t), w = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return ae(e) && Tt(s, e), s;
}, tt = { passive: !0 }, Bt = (t) => t.offsetHeight, P = (t, e) => {
  se(e).forEach(([s, n]) => {
    if (n && Dt(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, Tt(t.style, o);
    }
  });
}, ss = (t) => ae(t) && t.constructor.name === "Map" || !1, fi = (t) => typeof t == "number" || !1, gt = /* @__PURE__ */ new Map(), f = {
  set: (t, e, s, n) => {
    !T(t) || (n && n.length ? (gt.has(t) || gt.set(t, /* @__PURE__ */ new Map()), gt.get(t).set(n, setTimeout(e, s))) : gt.set(t, setTimeout(e, s)));
  },
  get: (t, e) => {
    if (!T(t))
      return null;
    const s = gt.get(t);
    return e && s && ss(s) ? s.get(e) || null : fi(s) ? s : null;
  },
  clear: (t, e) => {
    if (!T(t))
      return;
    const s = gt.get(t);
    e && e.length && ss(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && gt.delete(t)) : (clearTimeout(s), gt.delete(t));
  }
}, de = (t, e) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = t.getBoundingClientRect();
  let a = 1, l = 1;
  if (e && T(t)) {
    const { offsetWidth: p, offsetHeight: m } = t;
    a = p > 0 ? Math.round(s) / p : 1, l = m > 0 ? Math.round(n) / m : 1;
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
}, ct = (t) => b(t).body, at = (t) => b(t).documentElement, Fn = (t) => k(t) && t.constructor.name === "ShadowRoot" || !1, ui = (t) => t.nodeName === "HTML" ? t : T(t) && t.assignedSlot || k(t) && t.parentNode || Fn(t) && t.host || at(t);
let Is = 0, ks = 0;
const zt = /* @__PURE__ */ new Map(), jn = (t, e) => {
  let s = e ? Is : ks;
  if (e) {
    const n = jn(t), o = zt.get(n) || /* @__PURE__ */ new Map();
    zt.has(n) || zt.set(n, o), ss(o) && !o.has(e) ? (o.set(e, s), Is += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    zt.has(n) ? s = zt.get(n) : (zt.set(n, s), ks += 1);
  }
  return s;
}, Xt = (t) => {
  var e;
  return t ? Wn(t) ? t.defaultView : k(t) ? (e = t?.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, pi = (t) => Array.isArray(t) || !1, zn = (t) => {
  if (!k(t))
    return !1;
  const { top: e, bottom: s } = de(t), { clientHeight: n } = at(t);
  return e <= n && s >= 0;
}, ke = (t) => typeof t == "function" || !1, gi = (t) => ae(t) && t.constructor.name === "NodeList" || !1, yt = (t) => at(t).dir === "rtl", mi = (t) => k(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, D = (t, e) => t ? t.closest(e) || D(t.getRootNode().host, e) : null, S = (t, e) => T(t) ? t : (k(e) ? e : b()).querySelector(t), ms = (t, e) => (k(e) ? e : b()).getElementsByTagName(t), J = (t, e) => (k(e) ? e : b()).querySelectorAll(t), wt = (t, e) => (e && k(e) ? e : b()).getElementsByClassName(
  t
), vi = (t, e) => t.matches(e), B = "fade", u = "show", Ne = "data-bs-dismiss", Oe = "alert", Kn = "Alert", bi = "5.0.0-alpha2", wi = bi;
class et {
  element;
  options;
  constructor(e, s) {
    const n = S(e);
    if (!n)
      throw Dt(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = xt.get(n, this.name);
    o && o.dispose(), this.element = n, this.defaults && es(this.defaults).length && (this.options = di(n, this.defaults, s || {}, "bs")), xt.set(n, this.name, this);
  }
  get version() {
    return wi;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    xt.remove(this.element, this.name), es(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Ns = `.${Oe}`, $i = `[${Ne}="${Oe}"]`, Os = (t) => F(t, Kn), Ti = (t) => new Vn(t), Ms = w(`close.bs.${Oe}`), yi = w(`closed.bs.${Oe}`), Ls = (t) => {
  const { element: e } = t;
  ns(t), v(e, yi), t.dispose(), e.remove();
}, ns = (t, e) => {
  const s = e ? A : I, { dismiss: n } = t;
  n && s(n, M, t.close);
};
class Vn extends et {
  static selector = Ns;
  static init = Ti;
  static getInstance = Os;
  dismiss;
  constructor(e) {
    super(e), this.dismiss = S($i, this.element), ns(this, !0);
  }
  get name() {
    return Kn;
  }
  close(e) {
    const s = e ? Os(D(e.target, Ns)) : this, { element: n } = s;
    if (n && h(n, u)) {
      if (v(n, Ms), Ms.defaultPrevented)
        return;
      g(n, u), h(n, B) ? L(n, () => Ls(s)) : Ls(s);
    }
  }
  dispose() {
    ns(this), super.dispose();
  }
}
const y = "active", X = "data-bs-toggle", Ei = "button", Yn = "Button", Ci = `[${X}="${Ei}"]`, Bs = (t) => F(t, Yn), Hi = (t) => new Un(t), Rs = (t, e) => {
  (e ? A : I)(t.element, M, t.toggle);
};
class Un extends et {
  static selector = Ci;
  static init = Hi;
  static getInstance = Bs;
  isActive = !1;
  constructor(e) {
    super(e);
    const { element: s } = this;
    this.isActive = h(s, y), N(s, Hs, String(!!this.isActive)), Rs(this, !0);
  }
  get name() {
    return Yn;
  }
  toggle(e) {
    e && e.preventDefault();
    const s = e ? Bs(e.target) : this;
    if (!s.element)
      return;
    const { element: n, isActive: o } = s;
    if (h(n, "disabled"))
      return;
    (o ? g : d)(n, y), N(n, Hs, o ? "false" : "true"), s.isActive = h(n, y);
  }
  dispose() {
    Rs(this), super.dispose();
  }
}
const os = "data-bs-target", At = "carousel", Xn = "Carousel", Ws = "data-bs-parent", Si = "data-bs-container", Y = (t) => {
  const e = [os, Ws, Si, "href"], s = b(t);
  return e.map((n) => {
    const o = Lt(t, n);
    return o ? n === Ws ? D(t, o) : S(o, s) : null;
  }).filter((n) => n)[0];
}, he = `[data-bs-ride="${At}"]`, Z = `${At}-item`, is = "data-bs-slide-to", vt = "data-bs-slide", $t = "paused", Fs = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, lt = (t) => F(t, Xn), Pi = (t) => new _n(t);
let Ht = 0, Kt = 0, te = 0;
const Ye = w(`slide.bs.${At}`), rs = w(`slid.bs.${At}`), xi = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating && lt(n)) {
    const r = cs(t), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[e], y), g(o[e], `${Z}-${c}`), g(o[e], `${Z}-${a}`), g(o[r], y), g(o[r], `${Z}-${a}`), v(n, rs), f.clear(n, vt), !b(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Di() {
  const t = lt(this);
  t && !t.isPaused && !f.get(this, $t) && d(this, $t);
}
function Ai() {
  const t = lt(this);
  t && t.isPaused && !f.get(this, $t) && t.cycle();
}
function Ii(t) {
  t.preventDefault();
  const e = D(this, he) || Y(this), s = lt(e);
  if (!s || s.isAnimating)
    return;
  const n = +(Lt(this, is) || 0);
  this && !h(this, y) && !Number.isNaN(n) && s.to(n);
}
function ki(t) {
  t.preventDefault();
  const e = D(this, he) || Y(this), s = lt(e);
  if (!s || s.isAnimating)
    return;
  const n = Lt(this, vt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Ni = ({ code: t, target: e }) => {
  const s = b(e), [n] = [...J(he, s)].filter((a) => zn(a)), o = lt(n);
  if (!o || o.isAnimating || /textarea|input/i.test(e.nodeName))
    return;
  const i = yt(n);
  t === (i ? Ps : Ss) ? o.prev() : t === (i ? Ss : Ps) && o.next();
};
function Oi(t) {
  const { target: e } = t, s = lt(this);
  if (!s || s.isAnimating || s.isTouch)
    return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].some((i) => i === e || i.contains(e)) || (Ht = t.pageX, this.contains(e) && (s.isTouch = !0, qn(s, !0)));
}
const Mi = (t) => {
  Kt = t.pageX;
}, Li = (t) => {
  const { target: e } = t, s = b(e), n = [...J(he, s)].map((c) => lt(c)).find((c) => c.isTouch);
  if (!n)
    return;
  const { element: o, index: i } = n, r = yt(o);
  if (n.isTouch = !1, qn(n), s.getSelection()?.toString().length) {
    Ht = 0, Kt = 0, te = 0;
    return;
  }
  if (te = t.pageX, !o.contains(e) || Math.abs(Ht - te) < 120) {
    Ht = 0, Kt = 0, te = 0;
    return;
  }
  Kt < Ht ? n.to(i + (r ? -1 : 1)) : Kt > Ht && n.to(i + (r ? 1 : -1)), Ht = 0, Kt = 0, te = 0;
}, Ue = (t, e) => {
  const { indicators: s } = t;
  [...s].forEach((n) => g(n, y)), t.indicators[e] && d(s[e], y);
}, qn = (t, e) => {
  const { element: s } = t, n = e ? A : I;
  n(b(s), Jo, Mi, tt), n(b(s), ti, Li, tt);
}, js = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: r } = t, { touch: c, pause: a, interval: l, keyboard: p } = n, m = e ? A : I;
  a && l && (m(s, xe, Di), m(s, us, Ai)), c && o.length > 2 && m(s, Zo, Oi, tt), i.length && i.forEach((E) => {
    E && m(E, M, ki);
  }), r.length && r.forEach((E) => {
    m(E, M, Ii);
  }), p && m(b(s), Pe, Ni);
}, cs = (t) => {
  const { slides: e, element: s } = t, n = S(`.${Z}.${y}`, s);
  return T(n) ? [...e].indexOf(n) : -1;
};
class _n extends et {
  static selector = he;
  static init = Pi;
  static getInstance = lt;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.direction = yt(n) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = wt(Z, n);
    const { slides: o } = this;
    if (o.length < 2)
      return;
    const i = b(n);
    this.controls = [
      ...J(`[${vt}]`, n),
      ...J(`[${vt}][${os}="#${n.id}"]`, i)
    ], this.indicator = S(`.${At}-indicators`, n), this.indicators = [
      ...this.indicator ? J(`[${is}]`, this.indicator) : [],
      ...J(`[${is}][${os}="#${n.id}"]`, i)
    ];
    const { options: r } = this;
    this.options.interval = r.interval === !0 ? Fs.interval : r.interval, cs(this) < 0 && (d(o[0], y), this.indicators.length && Ue(this, 0)), js(this, !0), r.interval && this.cycle();
  }
  get name() {
    return Xn;
  }
  get defaults() {
    return Fs;
  }
  get isPaused() {
    return h(this.element, $t);
  }
  get isAnimating() {
    return S(`.${Z}-next,.${Z}-prev`, this.element) !== null;
  }
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    f.clear(e, At), n && (f.clear(e, $t), g(e, $t)), f.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && zn(e) && this.to(o + 1);
      },
      s.interval,
      At
    );
  }
  pause() {
    const { element: e, options: s } = this;
    !this.isPaused && s.interval && (d(e, $t), f.set(
      e,
      () => {
      },
      1,
      $t
    ));
  }
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  to(e) {
    const { element: s, slides: n, options: o } = this, i = cs(this), r = yt(s);
    let c = e;
    if (this.isAnimating || i === c || f.get(s, vt))
      return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", p = a === "left" ? "start" : "end", m = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    Tt(Ye, m), Tt(rs, m), v(s, Ye), !Ye.defaultPrevented && (this.index = c, Ue(this, c), le(n[c]) && h(s, "slide") ? f.set(
      s,
      () => {
        d(n[c], `${Z}-${l}`), Bt(n[c]), d(n[c], `${Z}-${p}`), d(n[i], `${Z}-${p}`), L(n[c], () => xi(this));
      },
      0,
      vt
    ) : (d(n[c], y), g(n[i], y), f.set(
      s,
      () => {
        f.clear(s, vt), s && o.interval && !this.isPaused && this.cycle(), v(s, rs);
      },
      0,
      vt
    )));
  }
  dispose() {
    const { slides: e } = this, s = ["start", "end", "prev", "next"];
    [...e].forEach((n, o) => {
      h(n, y) && Ue(this, o), s.forEach((i) => g(n, `${Z}-${i}`));
    }), js(this), super.dispose();
  }
}
const Ot = "collapsing", V = "collapse", Gn = "Collapse", Bi = `.${V}`, Qn = `[${X}="${V}"]`, Ri = { parent: null }, ge = (t) => F(t, Gn), Wi = (t) => new Zn(t), zs = w(`show.bs.${V}`), Fi = w(`shown.bs.${V}`), Ks = w(`hide.bs.${V}`), ji = w(`hidden.bs.${V}`), zi = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  v(e, zs), !zs.defaultPrevented && (f.set(e, ne, 17), s && f.set(s, ne, 17), d(e, Ot), g(e, V), P(e, { height: `${e.scrollHeight}px` }), L(e, () => {
    f.clear(e), s && f.clear(s), n.forEach((o) => N(o, be, "true")), g(e, Ot), d(e, V), d(e, u), P(e, { height: "" }), v(e, Fi);
  }));
}, Vs = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  v(e, Ks), !Ks.defaultPrevented && (f.set(e, ne, 17), s && f.set(s, ne, 17), P(e, { height: `${e.scrollHeight}px` }), g(e, V), g(e, u), d(e, Ot), Bt(e), P(e, { height: "0px" }), L(e, () => {
    f.clear(e), s && f.clear(s), n.forEach((o) => N(o, be, "false")), g(e, Ot), d(e, V), P(e, { height: "" }), v(e, ji);
  }));
}, Ys = (t, e) => {
  const s = e ? A : I, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, Ki));
}, Ki = (t) => {
  const { target: e } = t, s = e && D(e, Qn), n = s && Y(s), o = n && ge(n);
  o && o.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class Zn extends et {
  static selector = Bi;
  static init = Wi;
  static getInstance = ge;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this, i = b(n);
    this.triggers = [...J(Qn, i)].filter((r) => Y(r) === n), this.parent = S(o.parent, i) || Y(n) || null, Ys(this, !0);
  }
  get name() {
    return Gn;
  }
  get defaults() {
    return Ri;
  }
  toggle() {
    h(this.element, u) ? this.hide() : this.show();
  }
  hide() {
    const { triggers: e, element: s } = this;
    f.get(s) || (Vs(this), e.length && e.forEach((n) => d(n, `${V}d`)));
  }
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...J(`.${V}.${u}`, s)].find(
      (r) => ge(r)
    ), i = o && ge(o)), (!s || !f.get(s)) && !f.get(e) && (i && o !== e && (Vs(i), i.triggers.forEach((r) => {
      d(r, `${V}d`);
    })), zi(this), n.length && n.forEach((r) => g(r, `${V}d`)));
  }
  dispose() {
    Ys(this), super.dispose();
  }
}
const Mt = ["dropdown", "dropup", "dropstart", "dropend"], Jn = "Dropdown", to = "dropdown-menu", eo = (t) => {
  const e = D(t, "A");
  return t.tagName === "A" && Te(t, "href") && t.href.slice(-1) === "#" || e && Te(e, "href") && e.href.slice(-1) === "#";
}, [nt, ye, Ee, Ce] = Mt, vs = `[${X}="${nt}"],[${X}="${ye}"],[${X}="${Ce}"],[${X}="${Ee}"]`, Yt = (t) => F(t, Jn), Vi = (t) => new no(t), Yi = `${to}-end`, Us = [nt, ye], Xs = [Ee, Ce], qs = ["A", "BUTTON"], Ui = {
  offset: 5,
  display: "dynamic"
}, Xe = w(`show.bs.${nt}`), _s = w(`shown.bs.${nt}`), qe = w(`hide.bs.${nt}`), Gs = w(`hidden.bs.${nt}`), so = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (K(s, "position") === "static")
    return;
  const r = yt(e), c = h(s, Yi);
  ["margin", "top", "bottom", "left", "right"].forEach((O) => {
    const ft = {};
    ft[O] = "", P(s, ft);
  });
  let l = Mt.find((O) => h(n, O)) || nt;
  const p = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
  }, m = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: E, offsetHeight: R } = s, { clientWidth: _, clientHeight: $ } = at(e), { left: j, top: U, width: Wt, height: ot } = de(e), H = j - E - i < 0, dt = j + E + Wt + i >= _, st = U + R + i >= $, W = U + R + ot + i >= $, z = U - R - i < 0, C = (!r && c || r && !c) && j + Wt - E < 0, Ft = (r && c || !r && !c) && j + E >= _;
  if (Xs.includes(l) && H && dt && (l = nt), l === Ee && (r ? dt : H) && (l = Ce), l === Ce && (r ? H : dt) && (l = Ee), l === ye && z && !W && (l = nt), l === nt && W && !z && (l = ye), Xs.includes(l) && st && Tt(m[l], {
    top: "auto",
    bottom: 0
  }), Us.includes(l) && (C || Ft)) {
    let O = { left: "auto", right: "auto" };
    !C && Ft && !r && (O = { left: "auto", right: 0 }), C && !Ft && r && (O = { left: 0, right: "auto" }), O && Tt(m[l], O);
  }
  const ht = p[l];
  P(s, {
    ...m[l],
    margin: `${ht.map((O) => O && `${O}px`).join(" ")}`
  }), Us.includes(l) && c && c && P(s, m[!r && C || r && Ft ? "menuStart" : "menuEnd"]);
}, Xi = (t) => [...t.children].map((e) => {
  if (e && qs.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && qs.includes(s.tagName) ? s : null;
}).filter((e) => e), Qs = (t) => {
  const { element: e, options: s } = t, n = t.open ? A : I, o = b(e);
  n(o, M, Js), n(o, hs, Js), n(o, Pe, _i), n(o, _o, Gi), s.display === "dynamic" && [Ae, De].forEach((i) => {
    n(Xt(e), i, Qi, tt);
  });
}, Zs = (t, e) => {
  (e ? A : I)(t.element, M, qi);
}, Me = (t) => {
  const e = [...Mt, "btn-group", "input-group"].map((s) => wt(`${s} ${u}`, b(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Mt.some((n) => n === Lt(s, X))
    );
}, Js = (t) => {
  const { target: e, type: s } = t;
  if (!e || !e.closest)
    return;
  const n = Me(e), o = n && Yt(n);
  if (!o)
    return;
  const { parentElement: i, menu: r } = o, c = D(e, vs) !== null, a = i && i.contains(e) && (e.tagName === "form" || D(e, "form") !== null);
  s === M && eo(e) && t.preventDefault(), !(s === hs && (e === n || e === r || r.contains(e))) && (a || c || o && o.hide());
}, qi = (t) => {
  const { target: e } = t, s = e && D(e, vs), n = s && Yt(s);
  n && (t.stopImmediatePropagation(), n.toggle(), s && eo(s) && t.preventDefault());
}, _i = (t) => {
  [Je, ts].includes(t.code) && t.preventDefault();
};
function Gi(t) {
  const { code: e } = t, s = Me(this), n = s && Yt(s), { activeElement: o } = s && b(s);
  if (!n || !o)
    return;
  const { menu: i, open: r } = n, c = Xi(i);
  if (c && c.length && [Je, ts].includes(e)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : e === ts ? a = a > 1 ? a - 1 : 0 : e === Je && (a = a < c.length - 1 ? a + 1 : a), c[a] && rt(c[a]);
  }
  ps === e && r && (n.toggle(), rt(s));
}
function Qi() {
  const t = Me(this), e = t && Yt(t);
  e && e.open && so(e);
}
class no extends et {
  static selector = vs;
  static init = Vi;
  static getInstance = Yt;
  constructor(e, s) {
    super(e, s);
    const { parentElement: n } = this.element;
    this.parentElement = n, this.menu = S(`.${to}`, n), Zs(this, !0);
  }
  get name() {
    return Jn;
  }
  get defaults() {
    return Ui;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    if (s)
      return;
    const i = Me(e), r = i && Yt(i);
    r && r.hide(), [Xe, _s].forEach((c) => {
      c.relatedTarget = e;
    }), v(o, Xe), !Xe.defaultPrevented && (d(n, u), d(o, u), N(e, be, "true"), so(this), this.open = !s, rt(e), Qs(this), v(o, _s));
  }
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    s && ([qe, Gs].forEach((i) => {
      i.relatedTarget = e;
    }), v(o, qe), !qe.defaultPrevented && (g(n, u), g(o, u), N(e, be, "false"), this.open = !s, Qs(this), v(o, Gs)));
  }
  dispose() {
    this.open && this.hide(), Zs(this), super.dispose();
  }
}
const q = "modal", bs = "Modal", ws = "Offcanvas", Zi = "fixed-top", Ji = "fixed-bottom", oo = "sticky-top", io = "position-sticky", ro = (t) => [
  ...wt(Zi, t),
  ...wt(Ji, t),
  ...wt(oo, t),
  ...wt(io, t),
  ...wt("is-fixed", t)
], tr = (t) => {
  const e = ct(t);
  P(e, {
    paddingRight: "",
    overflow: ""
  });
  const s = ro(e);
  s.length && s.forEach((n) => {
    P(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, co = (t) => {
  const { clientWidth: e } = at(t), { innerWidth: s } = Xt(t);
  return Math.abs(s - e);
}, ao = (t, e) => {
  const s = ct(t), n = parseInt(K(s, "paddingRight"), 10), i = K(s, "overflow") === "hidden" && n ? 0 : co(t), r = ro(s);
  e && (P(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = K(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [oo, io].some((l) => h(c, l))) {
      const l = K(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, G = "offcanvas", Vt = bt({ tagName: "div" }), lo = (t, e) => {
  const s = k(e) && e.nodeName !== "BODY" ? e : Vt, n = k(e) && e.nodeName === "BODY" ? e : ct(t);
  k(t) && ((!e && !n.contains(Vt) || k(e) && e.nodeName === "BODY") && n.append(Vt), s.append(t));
}, ho = (t, e) => {
  k(t) && (t.remove(), !e && !Vt.children.length && Vt.remove());
}, St = (t, e) => (k(e) && e.nodeName !== "BODY" ? e : Vt).contains(t), fo = "backdrop", tn = `${q}-${fo}`, en = `${G}-${fo}`, uo = `.${q}.${u}`, $s = `.${G}.${u}`, x = bt("div"), Rt = (t) => S(`${uo},${$s}`, b(t)), Ts = (t) => {
  const e = t ? tn : en;
  [tn, en].forEach((s) => {
    g(x, s);
  }), d(x, e);
}, po = (t, e, s) => {
  Ts(s), lo(x, ct(t)), e && d(x, B);
}, go = () => {
  h(x, u) || (d(x, u), Bt(x));
}, Le = () => {
  g(x, u);
}, mo = (t) => {
  Rt(t) || (g(x, B), ho(x, ct(t)), tr(t));
}, vo = (t) => T(t) && K(t, "visibility") !== "hidden" && t.offsetParent !== null, er = `.${q}`, bo = `[${X}="${q}"]`, sr = `[${Ne}="${q}"]`, wo = `${q}-static`, nr = {
  backdrop: !0,
  keyboard: !0
}, ie = (t) => F(t, bs), or = (t) => new yo(t), me = w(`show.bs.${q}`), sn = w(`shown.bs.${q}`), _e = w(`hide.bs.${q}`), nn = w(`hidden.bs.${q}`), $o = (t) => {
  const { element: e } = t, s = co(e), { clientHeight: n, scrollHeight: o } = at(e), { clientHeight: i, scrollHeight: r } = e, c = i !== r;
  if (!c && s) {
    const a = yt(e) ? "paddingLeft" : "paddingRight", l = {};
    l[a] = `${s}px`, P(e, l);
  }
  ao(e, c || n !== o);
}, To = (t, e) => {
  const s = e ? A : I, { element: n } = t;
  s(n, M, cr), s(Xt(n), De, t.update, tt), s(b(n), Pe, rr);
}, on = (t, e) => {
  const s = e ? A : I, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, ir));
}, rn = (t, e) => {
  const { triggers: s, element: n, relatedTarget: o } = t;
  mo(n), P(n, { paddingRight: "", display: "" }), To(t);
  const i = me.relatedTarget || s.find(vo);
  i && rt(i), ke(e) && e(), nn.relatedTarget = o, v(n, nn);
}, cn = (t) => {
  const { element: e, relatedTarget: s } = t;
  rt(e), To(t, !0), sn.relatedTarget = s, v(e, sn);
}, an = (t) => {
  const { element: e, hasFade: s } = t;
  P(e, { display: "block" }), $o(t), Rt(e) || P(ct(e), { overflow: "hidden" }), d(e, u), Nt(e, He), N(e, Se, "true"), s ? L(e, () => cn(t)) : cn(t);
}, ln = (t, e) => {
  const { element: s, options: n, hasFade: o } = t;
  n.backdrop && !e && o && h(x, u) && !Rt(s) ? (Le(), L(x, () => rn(t))) : rn(t, e);
}, ir = (t) => {
  const { target: e } = t, s = e && D(e, bo), n = s && Y(s), o = n && ie(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, rr = ({ code: t, target: e }) => {
  const s = S(uo, b(e)), n = s && ie(s);
  if (!n)
    return;
  const { options: o } = n;
  o.keyboard && t === ps && h(s, u) && (n.relatedTarget = null, n.hide());
};
function cr(t) {
  const e = ie(this);
  if (!e || f.get(this))
    return;
  const { options: s, isStatic: n, modalDialog: o } = e, { backdrop: i } = s, { target: r } = t, c = b(this)?.getSelection()?.toString().length, a = o?.contains(r), l = r && D(r, sr);
  n && !a ? f.set(
    this,
    () => {
      d(this, wo), L(o, () => ar(e));
    },
    17
  ) : (l || !c && !n && !a && i) && (e.relatedTarget = l || null, e.hide(), t.preventDefault());
}
const ar = (t) => {
  const { element: e, modalDialog: s } = t, n = (T(s) ? le(s) : 0) + 17;
  g(e, wo), f.set(e, () => f.clear(e), n);
};
class yo extends et {
  static selector = er;
  static init = or;
  static getInstance = ie;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.modalDialog = S(`.${q}-dialog`, n), this.triggers = [...J(bo, b(n))].filter(
      (o) => Y(o) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, B), this.relatedTarget = null, on(this, !0), this.update = this.update.bind(this);
  }
  get name() {
    return bs;
  }
  get defaults() {
    return nr;
  }
  toggle() {
    h(this.element, u) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(e, u) || (me.relatedTarget = o || void 0, v(e, me), me.defaultPrevented))
      return;
    const c = Rt(e);
    if (c && c !== e) {
      const a = ie(c) || F(c, ws);
      a && a.hide();
    }
    i ? (St(x) ? Ts(!0) : po(e, n, !0), r = le(x), go(), setTimeout(() => an(this), r)) : (an(this), c && h(x, u) && Le());
  }
  hide(e) {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    h(s, u) && (_e.relatedTarget = o || void 0, v(s, _e), !_e.defaultPrevented && (g(s, u), N(s, He, "true"), Nt(s, Se), n ? L(s, () => ln(this, e)) : ln(this, e)));
  }
  update() {
    h(this.element, u) && $o(this);
  }
  dispose() {
    on(this), this.hide(() => super.dispose());
  }
}
const lr = `.${G}`, ys = `[${X}="${G}"]`, dr = `[${Ne}="${G}"]`, Be = `${G}-toggling`, hr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, re = (t) => F(t, ws), fr = (t) => new So(t), ve = w(`show.bs.${G}`), Eo = w(`shown.bs.${G}`), Ge = w(`hide.bs.${G}`), Co = w(`hidden.bs.${G}`), ur = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = at(e);
  ao(e, s !== n);
}, dn = (t, e) => {
  const s = e ? A : I;
  t.triggers.forEach((n) => s(n, M, pr));
}, Ho = (t, e) => {
  const s = e ? A : I, n = b(t.element);
  s(n, Pe, mr), s(n, M, gr);
}, hn = (t) => {
  const { element: e, options: s } = t;
  s.scroll || (ur(t), P(ct(e), { overflow: "hidden" })), d(e, Be), d(e, u), P(e, { visibility: "visible" }), L(e, () => vr(t));
}, fn = (t, e) => {
  const { element: s, options: n } = t, o = Rt(s);
  s.blur(), !o && n.backdrop && h(x, u) ? (Le(), L(x, () => un(t, e))) : un(t, e);
}, pr = (t) => {
  const e = D(t.target, ys), s = e && Y(e), n = s && re(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, gr = (t) => {
  const { target: e } = t, s = S($s, b(e)), n = S(dr, s), o = s && re(s);
  if (!o)
    return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = D(e, ys), l = b(s).getSelection();
  x.contains(e) && c === "static" || (!(l && l.toString().length) && (!s.contains(e) && c && (!a || r.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), a && a.tagName === "A" && t.preventDefault());
}, mr = ({ code: t, target: e }) => {
  const s = S($s, b(e)), n = s && re(s);
  n && n.options.keyboard && t === ps && (n.relatedTarget = null, n.hide());
}, vr = (t) => {
  const { element: e } = t;
  g(e, Be), Nt(e, He), N(e, Se, "true"), N(e, "role", "dialog"), v(e, Eo), Ho(t, !0), rt(e);
}, un = (t, e) => {
  const { element: s, triggers: n } = t;
  N(s, He, "true"), Nt(s, Se), Nt(s, "role"), P(s, { visibility: "" });
  const o = ve.relatedTarget || n.find(vo);
  o && rt(o), mo(s), v(s, Co), g(s, Be), Rt(s) || Ho(t), ke(e) && e();
};
class So extends et {
  static selector = lr;
  static init = fr;
  static getInstance = re;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...J(ys, b(n))].filter(
      (o) => Y(o) === n
    ), this.relatedTarget = null, dn(this, !0);
  }
  get name() {
    return ws;
  }
  get defaults() {
    return hr;
  }
  toggle() {
    h(this.element, u) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(e, u) || (ve.relatedTarget = n || void 0, Eo.relatedTarget = n || void 0, v(e, ve), ve.defaultPrevented))
      return;
    const i = Rt(e);
    if (i && i !== e) {
      const r = re(i) || F(i, bs);
      r && r.hide();
    }
    s.backdrop ? (St(x) ? Ts() : po(e, !0), o = le(x), go(), setTimeout(() => hn(this), o)) : (hn(this), i && h(x, u) && Le());
  }
  hide(e) {
    const { element: s, relatedTarget: n } = this;
    h(s, u) && (Ge.relatedTarget = n || void 0, Co.relatedTarget = n || void 0, v(s, Ge), !Ge.defaultPrevented && (d(s, Be), g(s, u), e ? fn(this, e) : L(s, () => fn(this, e))));
  }
  dispose() {
    dn(this), this.hide(() => super.dispose());
  }
}
const It = "popover", Re = "Popover", it = "tooltip", Po = (t) => {
  const e = t === it, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${it}">${n + o + i}</div>`;
}, xo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, as = (t) => {
  const e = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, options: i, arrow: r } = t;
  if (!n)
    return;
  const c = { ...xo }, a = yt(s);
  P(n, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const l = t.name === Re, { offsetWidth: p, offsetHeight: m } = n, { clientWidth: E, clientHeight: R, offsetWidth: _ } = at(s);
  let { placement: $ } = i;
  const { clientWidth: j, offsetWidth: U } = o, ot = K(o, "position") === "fixed", H = Math.abs(ot ? j - U : E - _), dt = a && ot ? H : 0, st = E - (a ? 0 : H) - 1, {
    width: W,
    height: z,
    left: C,
    right: Ft,
    top: ht
  } = de(s, !0), { x: O, y: ft } = {
    x: C,
    y: ht
  };
  P(r, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let Et = 0, qt = "", ut = 0, We = "", jt = "", ue = "", Fe = "";
  const Ct = r.offsetWidth || 0, pt = r.offsetHeight || 0, je = Ct / 2;
  let _t = ht - m - pt < 0, Gt = ht + m + z + pt >= R, Qt = C - p - Ct < dt, Zt = C + p + W + Ct >= st;
  const pe = ["left", "right"], ze = ["top", "bottom"];
  _t = pe.includes($) ? ht + z / 2 - m / 2 - pt < 0 : _t, Gt = pe.includes($) ? ht + m / 2 + z / 2 + pt >= R : Gt, Qt = ze.includes($) ? C + W / 2 - p / 2 < dt : Qt, Zt = ze.includes($) ? C + p / 2 + W / 2 >= st : Zt, $ = pe.includes($) && Qt && Zt ? "top" : $, $ = $ === "top" && _t ? "bottom" : $, $ = $ === "bottom" && Gt ? "top" : $, $ = $ === "left" && Qt ? "right" : $, $ = $ === "right" && Zt ? "left" : $, n.className.includes($) || (n.className = n.className.replace(e, c[$])), pe.includes($) ? ($ === "left" ? ut = O - p - (l ? Ct : 0) : ut = O + W + (l ? Ct : 0), _t && Gt ? (Et = 0, qt = 0, jt = ht + z / 2 - pt / 2) : _t ? (Et = ft, qt = "", jt = z / 2 - Ct) : Gt ? (Et = ft - m + z, qt = "", jt = m - z / 2 - Ct) : (Et = ft - m / 2 + z / 2, jt = m / 2 - pt / 2)) : ze.includes($) && ($ === "top" ? Et = ft - m - (l ? pt : 0) : Et = ft + z + (l ? pt : 0), Qt ? (ut = 0, ue = O + W / 2 - je) : Zt ? (ut = "auto", We = 0, Fe = W / 2 + st - Ft - je) : (ut = O - p / 2 + W / 2, ue = p / 2 - je)), P(n, {
    top: `${Et}px`,
    bottom: qt === "" ? "" : `${qt}px`,
    left: ut === "auto" ? ut : `${ut}px`,
    right: We !== "" ? `${We}px` : ""
  }), T(r) && (jt !== "" && (r.style.top = `${jt}px`), ue !== "" ? r.style.left = `${ue}px` : Fe !== "" && (r.style.right = `${Fe}px`));
}, ls = {
  template: Po(it),
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
}, Do = "data-original-title", kt = "Tooltip", mt = (t, e, s) => {
  if (!(!T(t) || Dt(e) && !e.length))
    if (Dt(e)) {
      let n = e.trim();
      ke(s) && (n = s(n));
      const i = new DOMParser().parseFromString(n, "text/html");
      t.append(...i.body.childNodes);
    } else
      T(e) ? t.append(e) : (gi(e) || pi(e) && e.every(k)) && t.append(...e);
}, br = (t) => {
  const e = t.name === kt, { id: s, element: n, options: o } = t, { title: i, placement: r, template: c, animation: a, customClass: l, sanitizeFn: p, dismissible: m, content: E, btnClose: R } = o, _ = e ? it : It, $ = { ...xo };
  let j = [], U = [];
  yt(n) && ($.left = "end", $.right = "start");
  const Wt = `bs-${_}-${$[r]}`;
  let ot;
  if (T(c))
    ot = c;
  else {
    const C = bt("div");
    mt(C, c, p), ot = C.firstChild;
  }
  t.tooltip = T(ot) ? ot.cloneNode(!0) : void 0;
  const { tooltip: H } = t;
  if (!H)
    return;
  N(H, "id", s), N(H, "role", it);
  const dt = e ? `${it}-inner` : `${It}-body`, st = e ? null : S(`.${It}-header`, H), W = S(`.${dt}`, H);
  t.arrow = S(`.${_}-arrow`, H);
  const { arrow: z } = t;
  if (T(i))
    j = [i.cloneNode(!0)];
  else {
    const C = bt("div");
    mt(C, i, p), j = [...C.childNodes];
  }
  if (T(E))
    U = [E.cloneNode(!0)];
  else {
    const C = bt("div");
    mt(C, E, p), U = [...C.childNodes];
  }
  if (m)
    if (i)
      if (T(R))
        j = [...j, R.cloneNode(!0)];
      else {
        const C = bt("div");
        mt(C, R, p), j = [...j, C.firstChild];
      }
    else if (st && st.remove(), T(R))
      U = [...U, R.cloneNode(!0)];
    else {
      const C = bt("div");
      mt(C, R, p), U = [...U, C.firstChild];
    }
  e ? i && W && mt(W, i, p) : (i && st && mt(st, j, p), E && W && mt(W, U, p), t.btn = S(".btn-close", H) || void 0), d(H, "position-fixed"), d(z, "position-absolute"), h(H, _) || d(H, _), a && !h(H, B) && d(H, B), l && !h(H, l) && d(H, l), h(H, Wt) || d(H, Wt);
}, wr = (t) => {
  const e = ["HTML", "BODY"], s = [];
  let { parentNode: n } = t;
  for (; n && !e.includes(n.nodeName); )
    n = ui(n), Fn(n) || mi(n) || s.push(n);
  return s.find((o, i) => K(o, "position") !== "relative" && s.slice(i + 1).every((r) => K(r, "position") === "static") ? o : null) || ct(t);
}, $r = `[${X}="${it}"],[data-tip="${it}"]`, Ao = "title";
let pn = (t) => F(t, kt);
const Tr = (t) => new Es(t), yr = (t) => {
  const { element: e, tooltip: s, container: n, offsetParent: o } = t;
  Nt(e, Mn), ho(s, n === o ? n : void 0);
}, Er = (t, e) => {
  const { element: s } = t;
  ee(t), Te(s, Do) && t.name === kt && ko(t), e && e();
}, Io = (t, e) => {
  const s = e ? A : I, { element: n } = t;
  s(b(n), Bn, t.handleTouch, tt), [Ae, De].forEach((o) => {
    s(Xt(n), o, t.update, tt);
  });
}, gn = (t) => {
  const { element: e } = t, s = w(`shown.bs.${oe(t.name)}`);
  Io(t, !0), v(e, s), f.clear(e, "in");
}, mn = (t) => {
  const { element: e, onHideComplete: s } = t, n = w(`hidden.bs.${oe(t.name)}`);
  Io(t), yr(t), v(e, n), ke(s) && (s(), t.onHideComplete = void 0), f.clear(e, "out");
}, ee = (t, e) => {
  const s = e ? A : I, { element: n, options: o, btn: i } = t, { trigger: r } = o, a = !!(t.name !== kt && o.dismissible);
  if (r?.includes("manual"))
    return;
  t.enabled = !!e, r?.split(" ")?.forEach((p) => {
    p === Qo ? (s(n, Go, t.show), s(n, xe, t.show), a && i ? s(i, M, t.hide) : (s(n, us, t.hide), s(b(n), Bn, t.handleTouch, tt))) : p === M ? s(n, p, a ? t.show : t.toggle) : p === hs && (s(n, fs, t.show), a || s(n, Ln, t.hide), ii && s(n, M, () => rt(n)));
  });
}, vn = (t, e) => {
  const s = e ? A : I, { element: n, container: o, offsetParent: i } = t, { offsetHeight: r, scrollHeight: c } = o, a = D(n, `.${q}`), l = D(n, `.${G}`), p = Xt(n), E = r !== c && o === i ? o : p;
  s(E, De, t.update, tt), s(E, Ae, t.update, tt), a && s(a, `hide.bs.${q}`, t.hide), l && s(l, `hide.bs.${G}`, t.hide);
}, ko = (t, e) => {
  const s = [Do, Ao], { element: n } = t;
  N(n, s[e ? 0 : 1], e || Lt(n, s[0]) || ""), Nt(n, s[e ? 1 : 0]);
};
class Es extends et {
  static selector = $r;
  static init = Tr;
  static getInstance = pn;
  static styleTip = as;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this, o = this.name === kt, i = o ? it : It, r = o ? kt : Re;
    pn = (a) => F(a, r), this.enabled = !0, this.id = `${i}-${jn(n, i)}`;
    const { options: c } = this;
    !c.title && o || !o && !c.content || (Tt(ls, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), Te(n, Ao) && o && typeof c.title == "string" && ko(this, c.title), this.container = wr(n), this.offsetParent = ["sticky", "fixed"].some(
      (a) => K(this.container, "position") === a
    ) ? this.container : b(this.element).body, br(this), ee(this, !0));
  }
  get name() {
    return kt;
  }
  get defaults() {
    return ls;
  }
  show() {
    const { options: e, tooltip: s, element: n, container: o, offsetParent: i, id: r } = this, { animation: c } = e, a = f.get(n, "out");
    f.clear(n, "out"), s && !a && !St(s, o === i ? o : void 0) && f.set(
      n,
      () => {
        const l = w(`show.bs.${oe(this.name)}`);
        v(n, l), !l.defaultPrevented && (lo(s, o === i ? o : void 0), N(n, Mn, `#${r}`), this.update(), vn(this, !0), h(s, u) || d(s, u), c ? L(s, () => gn(this)) : gn(this));
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: e, tooltip: s, element: n, container: o, offsetParent: i } = this, { animation: r, delay: c } = e;
    f.clear(n, "in"), s && St(s, o === i ? o : void 0) && f.set(
      n,
      () => {
        const a = w(`hide.bs.${oe(this.name)}`);
        v(n, a), !a.defaultPrevented && (this.update(), g(s, u), vn(this), r ? L(s, () => mn(this)) : mn(this));
      },
      c + 17,
      "out"
    );
  }
  update() {
    as(this);
  }
  toggle() {
    const { tooltip: e, container: s, offsetParent: n } = this;
    e && !St(e, s === n ? s : void 0) ? this.show() : this.hide();
  }
  enable() {
    const { enabled: e } = this;
    e || (ee(this, !0), this.enabled = !e);
  }
  disable() {
    const { tooltip: e, container: s, offsetParent: n, options: o, enabled: i } = this, { animation: r } = o;
    i && (e && St(e, s === n ? s : void 0) && r ? (this.onHideComplete = () => ee(this), this.hide()) : ee(this), this.enabled = !i);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch({ target: e }) {
    const { tooltip: s, element: n } = this;
    s && s.contains(e) || e === n || e && n.contains(e) || this.hide();
  }
  dispose() {
    const { tooltip: e, container: s, offsetParent: n, options: o } = this, i = () => Er(this, () => super.dispose());
    o.animation && e && St(e, s === n ? s : void 0) ? (this.options.delay = 0, this.onHideComplete = i, this.hide()) : i();
  }
}
const Cr = `[${X}="${It}"],[data-tip="${It}"]`, Hr = Tt({}, ls, {
  template: Po(It),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Sr = (t) => F(t, Re), Pr = (t) => new No(t);
class No extends Es {
  static selector = Cr;
  static init = Pr;
  static getInstance = Sr;
  static styleTip = as;
  constructor(e, s) {
    super(e, s);
  }
  get name() {
    return Re;
  }
  get defaults() {
    return Hr;
  }
  show() {
    super.show();
    const { options: e, btn: s } = this;
    e.dismissible && s && setTimeout(() => rt(s), 17);
  }
}
const xr = "scrollspy", Oo = "ScrollSpy", Dr = '[data-bs-spy="scroll"]', Ar = {
  offset: 10,
  target: null
}, Ir = (t) => F(t, Oo), kr = (t) => new Lo(t), bn = w(`activate.bs.${xr}`), Nr = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: r } = t, { offset: c } = n, a = gs(s), l = e && ms("A", e), p = s && Or(s);
  if (t.scrollTop = a ? s.scrollY : s.scrollTop, l && (o !== l.length || p !== i)) {
    let m, E, R;
    t.items = [], t.offsets = [], t.scrollHeight = p, t.maxScroll = t.scrollHeight - Mr(t), [...l].forEach((_) => {
      m = Lt(_, "href"), E = m && m.charAt(0) === "#" && m.slice(-1) !== "#" && S(m, b(r)), E && (t.items.push(_), R = de(E), t.offsets.push((a ? R.top + t.scrollTop : E.offsetTop) - c));
    }), t.itemsLength = t.items.length;
  }
}, Or = (t) => T(t) ? t.scrollHeight : at(t).scrollHeight, Mr = ({ element: t, scrollTarget: e }) => gs(e) ? e.innerHeight : de(t).height, Mo = (t) => {
  [...ms("A", t)].forEach((e) => {
    h(e, y) && g(e, y);
  });
}, wn = (t, e) => {
  const { target: s, element: n } = t;
  T(s) && Mo(s), t.activeItem = e, d(e, y);
  const o = [];
  let i = e;
  for (; i !== ct(n); )
    i = i.parentElement, (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const c = r.previousElementSibling;
    c && !h(c, y) && d(c, y);
  }), bn.relatedTarget = e, v(n, bn);
}, $n = (t, e) => {
  (e ? A : I)(t.scrollTarget, Ae, t.refresh, tt);
};
class Lo extends et {
  static selector = Dr;
  static init = kr;
  static getInstance = Ir;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    this.target = S(o.target, b(n)), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : Xt(n), this.refresh = this.refresh.bind(this), $n(this, !0), this.refresh());
  }
  get name() {
    return Oo;
  }
  get defaults() {
    return Ar;
  }
  refresh() {
    const { target: e } = this;
    if (e?.offsetHeight === 0)
      return;
    Nr(this);
    const { scrollTop: s, maxScroll: n, itemsLength: o, items: i, activeItem: r } = this;
    if (s >= n) {
      const a = i[o - 1];
      r !== a && wn(this, a);
      return;
    }
    const { offsets: c } = this;
    if (r && s < c[0] && c[0] > 0) {
      this.activeItem = null, T(e) && Mo(e);
      return;
    }
    i.forEach((a, l) => {
      r !== a && s >= c[l] && (typeof c[l + 1] > "u" || s < c[l + 1]) && wn(this, a);
    });
  }
  dispose() {
    $n(this), super.dispose();
  }
}
const fe = "tab", Bo = "Tab", Tn = `[${X}="${fe}"]`, Ro = (t) => F(t, Bo), Lr = (t) => new Wo(t), Qe = w(`show.bs.${fe}`), yn = w(`shown.bs.${fe}`), Ze = w(`hide.bs.${fe}`), En = w(`hidden.bs.${fe}`), ce = /* @__PURE__ */ new Map(), Cn = (t) => {
  const { tabContent: e, nav: s } = t;
  e && h(e, Ot) && (e.style.height = "", g(e, Ot)), s && f.clear(s);
}, Hn = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = T(o) && ce.get(o) || { tab: null };
  if (s && n && h(n, B)) {
    const { currentHeight: r, nextHeight: c } = ce.get(e) || { currentHeight: 0, nextHeight: 0 };
    r === c ? Cn(t) : setTimeout(() => {
      s.style.height = `${c}px`, Bt(s), L(s, () => Cn(t));
    }, 50);
  } else
    o && f.clear(o);
  yn.relatedTarget = i, v(e, yn);
}, Sn = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: r } = o && ce.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, B) && ([r, s].forEach((a) => {
    T(a) && d(a, "overflow-hidden");
  }), c = T(r) ? r.scrollHeight : 0), Qe.relatedTarget = i, En.relatedTarget = e, v(e, Qe), !Qe.defaultPrevented) {
    if (s && d(s, y), r && g(r, y), n && s && h(s, B)) {
      const a = s.scrollHeight;
      ce.set(e, { currentHeight: c, nextHeight: a, tab: null, content: null }), d(n, Ot), n.style.height = `${c}px`, Bt(n), [r, s].forEach((l) => {
        l && g(l, "overflow-hidden");
      });
    }
    s && s && h(s, B) ? setTimeout(() => {
      d(s, u), L(s, () => {
        Hn(t);
      });
    }, 1) : (s && d(s, u), Hn(t)), i && v(i, En);
  }
}, Pn = (t) => {
  const { nav: e } = t;
  if (!T(e))
    return { tab: null, content: null };
  const s = wt(y, e);
  let n = null;
  s.length === 1 && !Mt.some((i) => h(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = T(n) ? Y(n) : null;
  return { tab: n, content: o };
}, xn = (t) => {
  if (!T(t))
    return null;
  const e = D(t, `.${Mt.join(",.")}`);
  return e ? S(`.${Mt[0]}-toggle`, e) : null;
}, Dn = (t, e) => {
  (e ? A : I)(t.element, M, Br);
}, Br = (t) => {
  const e = Ro(t.target);
  e && (t.preventDefault(), e.show());
};
class Wo extends et {
  static selector = Tn;
  static init = Lr;
  static getInstance = Ro;
  constructor(e) {
    super(e);
    const { element: s } = this, n = Y(s);
    if (!n)
      return;
    const o = D(s, ".nav"), i = D(n, ".tab-content");
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = xn(s);
    const { tab: r } = Pn(this);
    if (o && !r) {
      const c = S(Tn, o), a = c && Y(c);
      a && (d(c, y), d(a, u), d(a, y), N(s, Ke, "true"));
    }
    Dn(this, !0);
  }
  get name() {
    return Bo;
  }
  show() {
    const { element: e, content: s, nav: n, dropdown: o } = this;
    if (!(n && f.get(n)) && !h(e, y)) {
      const { tab: i, content: r } = Pn(this);
      if (n && ce.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ze.relatedTarget = e, T(i) && v(i, Ze), Ze.defaultPrevented)
        return;
      d(e, y), N(e, Ke, "true");
      const c = T(i) && xn(i);
      if (c && h(c, y) && g(c, y), n) {
        const a = () => {
          i && (g(i, y), N(i, Ke, "false")), o && !h(o, y) && d(o, y);
        };
        r && (h(r, B) || s && h(s, B)) ? f.set(n, a, 1) : a();
      }
      r && (g(r, u), h(r, B) ? L(r, () => Sn(this)) : Sn(this));
    }
  }
  dispose() {
    Dn(this), super.dispose();
  }
}
const Q = "toast", Fo = "Toast", Rr = `.${Q}`, Wr = `[${Ne}="${Q}"]`, jo = `[${X}="${Q}"]`, Ut = "showing", zo = "hide", Fr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Cs = (t) => F(t, Fo), jr = (t) => new Vo(t), An = w(`show.bs.${Q}`), zr = w(`shown.bs.${Q}`), In = w(`hide.bs.${Q}`), Kr = w(`hidden.bs.${Q}`), kn = (t) => {
  const { element: e, options: s } = t;
  g(e, Ut), f.clear(e, Ut), v(e, zr), s.autohide && f.set(e, () => t.hide(), s.delay, Q);
}, Nn = (t) => {
  const { element: e } = t;
  g(e, Ut), g(e, u), d(e, zo), f.clear(e, Q), v(e, Kr);
}, Vr = (t) => {
  const { element: e, options: s } = t;
  d(e, Ut), s.animation ? (Bt(e), L(e, () => Nn(t))) : Nn(t);
}, Yr = (t) => {
  const { element: e, options: s } = t;
  f.set(
    e,
    () => {
      g(e, zo), Bt(e), d(e, u), d(e, Ut), s.animation ? L(e, () => kn(t)) : kn(t);
    },
    17,
    Ut
  );
}, Ko = (t, e) => {
  const s = e ? A : I, { element: n, triggers: o, dismiss: i, options: r } = t;
  i && s(i, M, t.hide), r.autohide && [fs, Ln, xe, us].forEach(
    (c) => s(n, c, qr)
  ), o.length && o.forEach((c) => s(c, M, Xr));
}, Ur = (t) => {
  f.clear(t.element, Q), Ko(t);
}, Xr = (t) => {
  const { target: e } = t, s = e && D(e, jo), n = s && Y(s), o = n && Cs(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, qr = (t) => {
  const e = t.target, s = Cs(e), { type: n, relatedTarget: o } = t;
  !s || e === o || e.contains(o) || ([xe, fs].includes(n) ? f.clear(e, Q) : f.set(e, () => s.hide(), s.options.delay, Q));
};
class Vo extends et {
  static selector = Rr;
  static init = jr;
  static getInstance = Cs;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, B) ? d(n, B) : !o.animation && h(n, B) && g(n, B), this.dismiss = S(Wr, n), this.triggers = [...J(jo, b(n))].filter(
      (i) => Y(i) === n
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), Ko(this, !0);
  }
  get name() {
    return Fo;
  }
  get defaults() {
    return Fr;
  }
  get isShown() {
    return h(this.element, u);
  }
  show() {
    const { element: e, isShown: s } = this;
    if (e && !s) {
      if (v(e, An), An.defaultPrevented)
        return;
      Yr(this);
    }
  }
  hide() {
    const { element: e, isShown: s } = this;
    if (e && s) {
      if (v(e, In), In.defaultPrevented)
        return;
      Vr(this);
    }
  }
  dispose() {
    const { element: e, isShown: s } = this;
    s && g(e, u), Ur(this), super.dispose();
  }
}
const Yo = {
  Alert: Vn,
  Button: Un,
  Carousel: _n,
  Collapse: Zn,
  Dropdown: no,
  Modal: yo,
  Offcanvas: So,
  Popover: No,
  ScrollSpy: Lo,
  Tab: Wo,
  Toast: Vo,
  Tooltip: Es
}, _r = (t, e) => {
  [...e].forEach((s) => t(s));
}, Gr = (t, e) => {
  const s = xt.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, On = (t) => {
  const e = t && t.nodeName ? t : document, s = [...ms("*", e)];
  hi(Yo).forEach((n) => {
    const { init: o, selector: i } = n;
    _r(
      o,
      s.filter((r) => vi(r, i))
    );
  });
}, Zr = (t) => {
  const e = t && t.nodeName ? t : document;
  es(Yo).forEach((s) => {
    Gr(s, e);
  });
};
document.body ? On() : A(document, "DOMContentLoaded", () => On(), { once: !0 });
export {
  Vn as Alert,
  Un as Button,
  _n as Carousel,
  Zn as Collapse,
  no as Dropdown,
  Qr as Listener,
  yo as Modal,
  So as Offcanvas,
  No as Popover,
  Lo as ScrollSpy,
  Wo as Tab,
  Vo as Toast,
  Es as Tooltip,
  On as initCallback,
  Zr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
