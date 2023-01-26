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
  const o = xt[e], i = o && o.get(t), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete xt[e], (!i || !i.size) && t.removeEventListener(e, ds, c);
}, _o = I, Go = k, Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: I,
  globalListener: ds,
  off: Go,
  on: _o,
  registry: xt,
  removeListener: k
}, Symbol.toStringTag, { value: "Module" })), Mn = "aria-describedby", be = "aria-expanded", He = "aria-hidden", Se = "aria-modal", Hs = "aria-pressed", Ke = "aria-selected", Qo = "DOMContentLoaded", hs = "focus", fs = "focusin", Ln = "focusout", Pe = "keydown", Zo = "keyup", M = "click", Jo = "mousedown", ti = "hover", xe = "mouseenter", us = "mouseleave", ei = "pointerdown", si = "pointermove", ni = "pointerup", De = "resize", Ae = "scroll", Bn = "touchstart", Je = "ArrowDown", ts = "ArrowUp", Ss = "ArrowLeft", Ps = "ArrowRight", ps = "Escape", oi = "transitionDuration", ii = "transitionDelay", Ve = "transitionend", Rn = "transitionProperty", ri = navigator.userAgentData, we = ri, { userAgent: ci } = navigator, $e = ci, xs = /iPhone|iPad|iPod|Android/i;
we ? we.brands.some((t) => xs.test(t.brand)) : xs.test($e);
const Ds = /(iPhone|iPod|iPad)/, ai = we ? we.brands.some((t) => Ds.test(t.brand)) : Ds.test($e);
$e && $e.includes("Firefox");
const { head: Ie } = document;
["webkitPerspective", "perspective"].some((t) => t in Ie.style);
const li = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, di = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, hi = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), di(t, e, o, n));
  };
  li(t, e, o, n);
}, oe = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    hi(document, Qo, oe, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Ie.style);
["webkitAnimation", "animation"].some((t) => t in Ie.style);
["webkitTransition", "transition"].some((t) => t in Ie.style);
const Bt = (t, e) => t.getAttribute(e), Te = (t, e) => t.hasAttribute(e), N = (t, e, s) => t.setAttribute(e, s), Ot = (t, e) => t.removeAttribute(e), d = (t, ...e) => {
  t.classList.add(...e);
}, g = (t, ...e) => {
  t.classList.remove(...e);
}, h = (t, e) => t.classList.contains(e), ae = (t) => t != null && typeof t == "object" || !1, P = (t) => ae(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, T = (t) => P(t) && t.nodeType === 1 || !1, te = /* @__PURE__ */ new Map(), Dt = {
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
}, j = (t, e) => Dt.get(t, e), At = (t) => typeof t == "string" || !1, gs = (t) => ae(t) && t.constructor.name === "Window" || !1, Wn = (t) => P(t) && t.nodeType === 9 || !1, b = (t) => gs(t) ? t.document : Wn(t) ? t : P(t) ? t.ownerDocument : window.document, ne = (t) => Object.entries(t), vt = (t) => {
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
}, fi = (t) => {
  const e = V(t, Rn), s = V(t, ii), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (t) => {
  const e = V(t, Rn), s = V(t, oi), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, L = (t, e) => {
  let s = 0;
  const n = new Event(Ve), o = le(t), i = fi(t);
  if (o) {
    const r = (c) => {
      c.target === t && (e.apply(t, [c]), t.removeEventListener(Ve, r), s = 1);
    };
    t.addEventListener(Ve, r), setTimeout(() => {
      s || v(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, rt = (t, e) => t.focus(e), As = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, Ut = (t) => t.toLowerCase(), ui = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, r = { ...e }, c = {}, a = "title";
  return ne(i).forEach(([l, f]) => {
    const m = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (E) => Ut(E)) : l;
    c[m] = As(f);
  }), ne(o).forEach(([l, f]) => {
    o[l] = As(f);
  }), ne(e).forEach(([l, f]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Bt(t, a) : f;
  }), r;
}, Tt = (t, ...e) => Object.assign(t, ...e), es = (t) => Object.keys(t), pi = (t) => Object.values(t), w = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return ae(e) && Tt(s, e), s;
}, et = { passive: !0 }, Rt = (t) => t.offsetHeight, x = (t, e) => {
  ne(e).forEach(([s, n]) => {
    if (n && At(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, Tt(t.style, o);
    }
  });
}, ss = (t) => ae(t) && t.constructor.name === "Map" || !1, gi = (t) => typeof t == "number" || !1, pt = /* @__PURE__ */ new Map(), u = {
  set: (t, e, s, n) => {
    !T(t) || (n && n.length ? (pt.has(t) || pt.set(t, /* @__PURE__ */ new Map()), pt.get(t).set(n, setTimeout(e, s))) : pt.set(t, setTimeout(e, s)));
  },
  get: (t, e) => {
    if (!T(t))
      return null;
    const s = pt.get(t);
    return e && s && ss(s) ? s.get(e) || null : gi(s) ? s : null;
  },
  clear: (t, e) => {
    if (!T(t))
      return;
    const s = pt.get(t);
    e && e.length && ss(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && pt.delete(t)) : (clearTimeout(s), pt.delete(t));
  }
}, de = (t, e) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = t.getBoundingClientRect();
  let a = 1, l = 1;
  if (e && T(t)) {
    const { offsetWidth: f, offsetHeight: m } = t;
    a = f > 0 ? Math.round(s) / f : 1, l = m > 0 ? Math.round(n) / m : 1;
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
}, Et = (t) => b(t).body, ct = (t) => b(t).documentElement, Fn = (t) => P(t) && t.constructor.name === "ShadowRoot" || !1, mi = (t) => t.nodeName === "HTML" ? t : T(t) && t.assignedSlot || P(t) && t.parentNode || Fn(t) && t.host || ct(t);
let Is = 0, ks = 0;
const Kt = /* @__PURE__ */ new Map(), jn = (t, e) => {
  let s = e ? Is : ks;
  if (e) {
    const n = jn(t), o = Kt.get(n) || /* @__PURE__ */ new Map();
    Kt.has(n) || Kt.set(n, o), ss(o) && !o.has(e) ? (o.set(e, s), Is += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    Kt.has(n) ? s = Kt.get(n) : (Kt.set(n, s), ks += 1);
  }
  return s;
}, qt = (t) => {
  var e;
  return t ? Wn(t) ? t.defaultView : P(t) ? (e = t?.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, vi = (t) => Array.isArray(t) || !1, zn = (t) => {
  if (!P(t))
    return !1;
  const { top: e, bottom: s } = de(t), { clientHeight: n } = ct(t);
  return e <= n && s >= 0;
}, ke = (t) => typeof t == "function" || !1, bi = (t) => ae(t) && t.constructor.name === "NodeList" || !1, yt = (t) => ct(t).dir === "rtl", wi = (t) => P(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, A = (t, e) => t ? t.closest(e) || A(t.getRootNode().host, e) : null, S = (t, e) => T(t) ? t : (P(e) ? e : b()).querySelector(t), ms = (t, e) => (P(e) ? e : b()).getElementsByTagName(t), J = (t, e) => (P(e) ? e : b()).querySelectorAll(t), bt = (t, e) => (e && P(e) ? e : b()).getElementsByClassName(
  t
), $i = (t, e) => t.matches(e), B = "fade", p = "show", Ne = "data-bs-dismiss", Oe = "alert", Kn = "Alert", Ti = "5.0.0-alpha3", yi = Ti;
class st {
  element;
  options;
  constructor(e, s) {
    const n = S(e);
    if (!n)
      throw At(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = Dt.get(n, this.name);
    o && o.dispose(), this.element = n, this.defaults && es(this.defaults).length && (this.options = ui(n, this.defaults, s || {}, "bs")), Dt.set(n, this.name, this);
  }
  get version() {
    return yi;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    Dt.remove(this.element, this.name), es(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Ns = `.${Oe}`, Ei = `[${Ne}="${Oe}"]`, Os = (t) => j(t, Kn), Ci = (t) => new Vn(t), Ms = w(`close.bs.${Oe}`), Hi = w(`closed.bs.${Oe}`), Ls = (t) => {
  const { element: e } = t;
  ns(t), v(e, Hi), t.dispose(), e.remove();
}, ns = (t, e) => {
  const s = e ? I : k, { dismiss: n } = t;
  n && s(n, M, t.close);
};
class Vn extends st {
  static selector = Ns;
  static init = Ci;
  static getInstance = Os;
  dismiss;
  constructor(e) {
    super(e), this.dismiss = S(Ei, this.element), ns(this, !0);
  }
  get name() {
    return Kn;
  }
  close(e) {
    const s = e ? Os(A(e.target, Ns)) : this, { element: n } = s;
    if (n && h(n, p)) {
      if (v(n, Ms), Ms.defaultPrevented)
        return;
      g(n, p), h(n, B) ? L(n, () => Ls(s)) : Ls(s);
    }
  }
  dispose() {
    ns(this), super.dispose();
  }
}
const y = "active", X = "data-bs-toggle", Si = "button", Un = "Button", Pi = `[${X}="${Si}"]`, Bs = (t) => j(t, Un), xi = (t) => new Yn(t), Rs = (t, e) => {
  (e ? I : k)(t.element, M, t.toggle);
};
class Yn extends st {
  static selector = Pi;
  static init = xi;
  static getInstance = Bs;
  isActive = !1;
  constructor(e) {
    super(e);
    const { element: s } = this;
    this.isActive = h(s, y), N(s, Hs, String(!!this.isActive)), Rs(this, !0);
  }
  get name() {
    return Un;
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
const os = "data-bs-target", It = "carousel", Xn = "Carousel", Ws = "data-bs-parent", Di = "data-bs-container", F = (t) => {
  const e = [os, Ws, Di, "href"], s = b(t);
  return e.map((n) => {
    const o = Bt(t, n);
    return o ? n === Ws ? A(t, o) : S(o, s) : null;
  }).filter((n) => n)[0];
}, he = `[data-bs-ride="${It}"]`, Z = `${It}-item`, is = "data-bs-slide-to", mt = "data-bs-slide", wt = "paused", Fs = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, at = (t) => j(t, Xn), Ai = (t) => new _n(t);
let St = 0, Vt = 0, ee = 0;
const Ue = w(`slide.bs.${It}`), rs = w(`slid.bs.${It}`), Ii = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating && at(n)) {
    const r = cs(t), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[e], y), g(o[e], `${Z}-${c}`), g(o[e], `${Z}-${a}`), g(o[r], y), g(o[r], `${Z}-${a}`), v(n, rs), u.clear(n, mt), !b(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function ki() {
  const t = at(this);
  t && !t.isPaused && !u.get(this, wt) && d(this, wt);
}
function Ni() {
  const t = at(this);
  t && t.isPaused && !u.get(this, wt) && t.cycle();
}
function Oi(t) {
  t.preventDefault();
  const e = A(this, he) || F(this), s = at(e);
  if (!s || s.isAnimating)
    return;
  const n = +(Bt(this, is) || 0);
  this && !h(this, y) && !Number.isNaN(n) && s.to(n);
}
function Mi(t) {
  t.preventDefault();
  const e = A(this, he) || F(this), s = at(e);
  if (!s || s.isAnimating)
    return;
  const n = Bt(this, mt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Li = ({ code: t, target: e }) => {
  const s = b(e), [n] = [...J(he, s)].filter((a) => zn(a)), o = at(n);
  if (!o || o.isAnimating || /textarea|input/i.test(e.nodeName))
    return;
  const i = yt(n);
  t === (i ? Ps : Ss) ? o.prev() : t === (i ? Ss : Ps) && o.next();
};
function Bi(t) {
  const { target: e } = t, s = at(this);
  if (!s || s.isAnimating || s.isTouch)
    return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].some((i) => i === e || i.contains(e)) || (St = t.pageX, this.contains(e) && (s.isTouch = !0, qn(s, !0)));
}
const Ri = (t) => {
  Vt = t.pageX;
}, Wi = (t) => {
  const { target: e } = t, s = b(e), n = [...J(he, s)].map((c) => at(c)).find((c) => c.isTouch);
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
  [...s].forEach((n) => g(n, y)), t.indicators[e] && d(s[e], y);
}, qn = (t, e) => {
  const { element: s } = t, n = e ? I : k;
  n(b(s), si, Ri, et), n(b(s), ni, Wi, et);
}, js = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: r } = t, { touch: c, pause: a, interval: l, keyboard: f } = n, m = e ? I : k;
  a && l && (m(s, xe, ki), m(s, us, Ni)), c && o.length > 2 && m(s, ei, Bi, et), i.length && i.forEach((E) => {
    E && m(E, M, Mi);
  }), r.length && r.forEach((E) => {
    m(E, M, Oi);
  }), f && m(b(s), Pe, Li);
}, cs = (t) => {
  const { slides: e, element: s } = t, n = S(`.${Z}.${y}`, s);
  return T(n) ? [...e].indexOf(n) : -1;
};
class _n extends st {
  static selector = he;
  static init = Ai;
  static getInstance = at;
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
    this.options.interval = r.interval === !0 ? Fs.interval : r.interval, cs(this) < 0 && (d(o[0], y), this.indicators.length && Ye(this, 0)), js(this, !0), r.interval && this.cycle();
  }
  get name() {
    return Xn;
  }
  get defaults() {
    return Fs;
  }
  get isPaused() {
    return h(this.element, wt);
  }
  get isAnimating() {
    return S(`.${Z}-next,.${Z}-prev`, this.element) !== null;
  }
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    u.clear(e, It), n && (u.clear(e, wt), g(e, wt)), u.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && zn(e) && this.to(o + 1);
      },
      s.interval,
      It
    );
  }
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
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  to(e) {
    const { element: s, slides: n, options: o } = this, i = cs(this), r = yt(s);
    let c = e;
    if (this.isAnimating || i === c || u.get(s, mt))
      return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", f = a === "left" ? "start" : "end", m = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    Tt(Ue, m), Tt(rs, m), v(s, Ue), !Ue.defaultPrevented && (this.index = c, Ye(this, c), le(n[c]) && h(s, "slide") ? u.set(
      s,
      () => {
        d(n[c], `${Z}-${l}`), Rt(n[c]), d(n[c], `${Z}-${f}`), d(n[i], `${Z}-${f}`), L(n[c], () => Ii(this));
      },
      0,
      mt
    ) : (d(n[c], y), g(n[i], y), u.set(
      s,
      () => {
        u.clear(s, mt), s && o.interval && !this.isPaused && this.cycle(), v(s, rs);
      },
      0,
      mt
    )));
  }
  dispose() {
    const { slides: e } = this, s = ["start", "end", "prev", "next"];
    [...e].forEach((n, o) => {
      h(n, y) && Ye(this, o), s.forEach((i) => g(n, `${Z}-${i}`));
    }), js(this), super.dispose();
  }
}
const Mt = "collapsing", U = "collapse", Gn = "Collapse", Fi = `.${U}`, Qn = `[${X}="${U}"]`, ji = { parent: null }, ge = (t) => j(t, Gn), zi = (t) => new Zn(t), zs = w(`show.bs.${U}`), Ki = w(`shown.bs.${U}`), Ks = w(`hide.bs.${U}`), Vi = w(`hidden.bs.${U}`), Ui = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  v(e, zs), !zs.defaultPrevented && (u.set(e, oe, 17), s && u.set(s, oe, 17), d(e, Mt), g(e, U), x(e, { height: `${e.scrollHeight}px` }), L(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => N(o, be, "true")), g(e, Mt), d(e, U), d(e, p), x(e, { height: "" }), v(e, Ki);
  }));
}, Vs = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  v(e, Ks), !Ks.defaultPrevented && (u.set(e, oe, 17), s && u.set(s, oe, 17), x(e, { height: `${e.scrollHeight}px` }), g(e, U), g(e, p), d(e, Mt), Rt(e), x(e, { height: "0px" }), L(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => N(o, be, "false")), g(e, Mt), d(e, U), x(e, { height: "" }), v(e, Vi);
  }));
}, Us = (t, e) => {
  const s = e ? I : k, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, Yi));
}, Yi = (t) => {
  const { target: e } = t, s = e && A(e, Qn), n = s && F(s), o = n && ge(n);
  o && o.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class Zn extends st {
  static selector = Fi;
  static init = zi;
  static getInstance = ge;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this, i = b(n);
    this.triggers = [...J(Qn, i)].filter((r) => F(r) === n), this.parent = S(o.parent, i) || F(n) || null, this.parent = F(n) || null, Us(this, !0);
  }
  get name() {
    return Gn;
  }
  get defaults() {
    return ji;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  hide() {
    const { triggers: e, element: s } = this;
    u.get(s) || (Vs(this), e.length && e.forEach((n) => d(n, `${U}d`)));
  }
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...J(`.${U}.${p}`, s)].find(
      (r) => ge(r)
    ), i = o && ge(o)), (!s || !u.get(s)) && !u.get(e) && (i && o !== e && (Vs(i), i.triggers.forEach((r) => {
      d(r, `${U}d`);
    })), Ui(this), n.length && n.forEach((r) => g(r, `${U}d`)));
  }
  dispose() {
    Us(this), super.dispose();
  }
}
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], Jn = "Dropdown", to = "dropdown-menu", eo = (t) => {
  const e = A(t, "A");
  return t.tagName === "A" && Te(t, "href") && t.href.slice(-1) === "#" || e && Te(e, "href") && e.href.slice(-1) === "#";
}, [tt, ye, Ee, Ce] = Lt, vs = `[${X}="${tt}"],[${X}="${ye}"],[${X}="${Ce}"],[${X}="${Ee}"]`, Yt = (t) => j(t, Jn), Xi = (t) => new oo(t), qi = `${to}-end`, Ys = [tt, ye], Xs = [Ee, Ce], qs = ["A", "BUTTON"], _i = {
  offset: 5,
  display: "dynamic"
}, Xe = w(`show.bs.${tt}`), _s = w(`shown.bs.${tt}`), qe = w(`hide.bs.${tt}`), Gs = w(`hidden.bs.${tt}`), so = w(`updated.bs.${tt}`), no = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (V(s, "position") === "static")
    return;
  const r = yt(e), c = h(s, qi);
  ["margin", "top", "bottom", "left", "right"].forEach((O) => {
    const ht = {};
    ht[O] = "", x(s, ht);
  });
  let l = Lt.find((O) => h(n, O)) || tt;
  const f = {
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
  }, { offsetWidth: E, offsetHeight: R } = s, { clientWidth: _, clientHeight: $ } = ct(e), { left: z, top: Y, width: Ft, height: ot } = de(e), H = z - E - i < 0, lt = z + E + Ft + i >= _, nt = Y + R + i >= $, W = Y + R + ot + i >= $, K = Y - R - i < 0, C = (!r && c || r && !c) && z + Ft - E < 0, jt = (r && c || !r && !c) && z + E >= _;
  if (Xs.includes(l) && H && lt && (l = tt), l === Ee && (r ? lt : H) && (l = Ce), l === Ce && (r ? H : lt) && (l = Ee), l === ye && K && !W && (l = tt), l === tt && W && !K && (l = ye), Xs.includes(l) && nt && Tt(m[l], {
    top: "auto",
    bottom: 0
  }), Ys.includes(l) && (C || jt)) {
    let O = { left: "auto", right: "auto" };
    !C && jt && !r && (O = { left: "auto", right: 0 }), C && !jt && r && (O = { left: 0, right: "auto" }), O && Tt(m[l], O);
  }
  const dt = f[l];
  x(s, {
    ...m[l],
    margin: `${dt.map((O) => O && `${O}px`).join(" ")}`
  }), Ys.includes(l) && c && c && x(s, m[!r && C || r && jt ? "menuStart" : "menuEnd"]), v(n, so);
}, Gi = (t) => [...t.children].map((e) => {
  if (e && qs.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && qs.includes(s.tagName) ? s : null;
}).filter((e) => e), Qs = (t) => {
  const { element: e, options: s } = t, n = t.open ? I : k, o = b(e);
  n(o, M, Js), n(o, hs, Js), n(o, Pe, Zi), n(o, Zo, Ji), s.display === "dynamic" && [Ae, De].forEach((i) => {
    n(qt(e), i, tr, et);
  });
}, Zs = (t, e) => {
  (e ? I : k)(t.element, M, Qi);
}, Me = (t) => {
  const e = [...Lt, "btn-group", "input-group"].map((s) => bt(`${s} ${p}`, b(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Lt.some((n) => n === Bt(s, X))
    );
}, Js = (t) => {
  const { target: e, type: s } = t;
  if (!e || !e.closest)
    return;
  const n = Me(e), o = n && Yt(n);
  if (!o)
    return;
  const { parentElement: i, menu: r } = o, c = A(e, vs) !== null, a = i && i.contains(e) && (e.tagName === "form" || A(e, "form") !== null);
  s === M && eo(e) && t.preventDefault(), !(s === hs && (e === n || e === r || r.contains(e))) && (a || c || o && o.hide());
}, Qi = (t) => {
  const { target: e } = t, s = e && A(e, vs), n = s && Yt(s);
  n && (t.stopImmediatePropagation(), n.toggle(), s && eo(s) && t.preventDefault());
}, Zi = (t) => {
  [Je, ts].includes(t.code) && t.preventDefault();
};
function Ji(t) {
  const { code: e } = t, s = Me(this), n = s && Yt(s), { activeElement: o } = s && b(s);
  if (!n || !o)
    return;
  const { menu: i, open: r } = n, c = Gi(i);
  if (c && c.length && [Je, ts].includes(e)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : e === ts ? a = a > 1 ? a - 1 : 0 : e === Je && (a = a < c.length - 1 ? a + 1 : a), c[a] && rt(c[a]);
  }
  ps === e && r && (n.toggle(), rt(s));
}
function tr() {
  const t = Me(this), e = t && Yt(t);
  e && e.open && no(e);
}
class oo extends st {
  static selector = vs;
  static init = Xi;
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
    return _i;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    if (s)
      return;
    const i = Me(e), r = i && Yt(i);
    r && r.hide(), [Xe, _s, so].forEach((c) => {
      c.relatedTarget = e;
    }), v(o, Xe), !Xe.defaultPrevented && (d(n, p), d(o, p), N(e, be, "true"), no(this), this.open = !s, rt(e), Qs(this), v(o, _s));
  }
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    s && ([qe, Gs].forEach((i) => {
      i.relatedTarget = e;
    }), v(o, qe), !qe.defaultPrevented && (g(n, p), g(o, p), N(e, be, "false"), this.open = !s, Qs(this), v(o, Gs)));
  }
  dispose() {
    this.open && this.hide(), Zs(this), super.dispose();
  }
}
const q = "modal", bs = "Modal", ws = "Offcanvas", er = "fixed-top", sr = "fixed-bottom", io = "sticky-top", ro = "position-sticky", co = (t) => [
  ...bt(er, t),
  ...bt(sr, t),
  ...bt(io, t),
  ...bt(ro, t),
  ...bt("is-fixed", t)
], nr = (t) => {
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
}, ao = (t) => {
  const { clientWidth: e } = ct(t), { innerWidth: s } = qt(t);
  return Math.abs(s - e);
}, lo = (t, e) => {
  const s = Et(t), n = parseInt(V(s, "paddingRight"), 10), i = V(s, "overflow") === "hidden" && n ? 0 : ao(t), r = co(s);
  e && (x(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = V(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [io, ro].some((l) => h(c, l))) {
      const l = V(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, G = "offcanvas", $t = vt({ tagName: "div" }), ho = (t, e) => {
  const s = P(e) && e.nodeName === "BODY", n = P(e) && !s ? e : $t, o = s ? e : Et(t);
  P(t) && (n === $t && o.append($t), n.append(t));
}, fo = (t, e) => {
  const s = P(e) && e.nodeName === "BODY", n = P(e) && !s ? e : $t;
  P(t) && (t.remove(), n === $t && !$t.children.length && $t.remove());
}, Pt = (t, e) => {
  const s = P(e) && e.nodeName !== "BODY" ? e : $t;
  return P(t) && s.contains(t);
}, uo = "backdrop", tn = `${q}-${uo}`, en = `${G}-${uo}`, po = `.${q}.${p}`, $s = `.${G}.${p}`, D = vt("div"), Wt = (t) => S(`${po},${$s}`, b(t)), Ts = (t) => {
  const e = t ? tn : en;
  [tn, en].forEach((s) => {
    g(D, s);
  }), d(D, e);
}, go = (t, e, s) => {
  Ts(s), ho(D, Et(t)), e && d(D, B);
}, mo = () => {
  h(D, p) || (d(D, p), Rt(D));
}, Le = () => {
  g(D, p);
}, vo = (t) => {
  Wt(t) || (g(D, B), fo(D, Et(t)), nr(t));
}, bo = (t) => T(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, or = `.${q}`, wo = `[${X}="${q}"]`, ir = `[${Ne}="${q}"]`, $o = `${q}-static`, rr = {
  backdrop: !0,
  keyboard: !0
}, ie = (t) => j(t, bs), cr = (t) => new Eo(t), me = w(`show.bs.${q}`), sn = w(`shown.bs.${q}`), _e = w(`hide.bs.${q}`), nn = w(`hidden.bs.${q}`), To = (t) => {
  const { element: e } = t, s = ao(e), { clientHeight: n, scrollHeight: o } = ct(e), { clientHeight: i, scrollHeight: r } = e, c = i !== r;
  if (!c && s) {
    const a = yt(e) ? "paddingLeft" : "paddingRight", l = {};
    l[a] = `${s}px`, x(e, l);
  }
  lo(e, c || n !== o);
}, yo = (t, e) => {
  const s = e ? I : k, { element: n } = t;
  s(n, M, dr), s(qt(n), De, t.update, et), s(b(n), Pe, lr);
}, on = (t, e) => {
  const s = e ? I : k, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, ar));
}, rn = (t, e) => {
  const { triggers: s, element: n, relatedTarget: o } = t;
  vo(n), x(n, { paddingRight: "", display: "" }), yo(t);
  const i = me.relatedTarget || s.find(bo);
  i && rt(i), ke(e) && e(), nn.relatedTarget = o, v(n, nn);
}, cn = (t) => {
  const { element: e, relatedTarget: s } = t;
  rt(e), yo(t, !0), sn.relatedTarget = s, v(e, sn);
}, an = (t) => {
  const { element: e, hasFade: s } = t;
  x(e, { display: "block" }), To(t), Wt(e) || x(Et(e), { overflow: "hidden" }), d(e, p), Ot(e, He), N(e, Se, "true"), s ? L(e, () => cn(t)) : cn(t);
}, ln = (t, e) => {
  const { element: s, options: n, hasFade: o } = t;
  n.backdrop && !e && o && h(D, p) && !Wt(s) ? (Le(), L(D, () => rn(t))) : rn(t, e);
}, ar = (t) => {
  const { target: e } = t, s = e && A(e, wo), n = s && F(s), o = n && ie(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, lr = ({ code: t, target: e }) => {
  const s = S(po, b(e)), n = s && ie(s);
  if (!n)
    return;
  const { options: o } = n;
  o.keyboard && t === ps && h(s, p) && (n.relatedTarget = null, n.hide());
};
function dr(t) {
  const e = ie(this);
  if (!e || u.get(this))
    return;
  const { options: s, isStatic: n, modalDialog: o } = e, { backdrop: i } = s, { target: r } = t, c = b(this)?.getSelection()?.toString().length, a = o?.contains(r), l = r && A(r, ir);
  n && !a ? u.set(
    this,
    () => {
      d(this, $o), L(o, () => hr(e));
    },
    17
  ) : (l || !c && !n && !a && i) && (e.relatedTarget = l || null, e.hide(), t.preventDefault());
}
const hr = (t) => {
  const { element: e, modalDialog: s } = t, n = (T(s) ? le(s) : 0) + 17;
  g(e, $o), u.set(e, () => u.clear(e), n);
};
class Eo extends st {
  static selector = or;
  static init = cr;
  static getInstance = ie;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.modalDialog = S(`.${q}-dialog`, n), this.triggers = [...J(wo, b(n))].filter(
      (o) => F(o) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, B), this.relatedTarget = null, on(this, !0), this.update = this.update.bind(this);
  }
  get name() {
    return bs;
  }
  get defaults() {
    return rr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(e, p) || (me.relatedTarget = o || void 0, v(e, me), me.defaultPrevented))
      return;
    const c = Wt(e);
    if (c && c !== e) {
      const a = ie(c) || j(c, ws);
      a && a.hide();
    }
    i ? (Pt(D) ? Ts(!0) : go(e, n, !0), r = le(D), mo(), setTimeout(() => an(this), r)) : (an(this), c && h(D, p) && Le());
  }
  hide(e) {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    h(s, p) && (_e.relatedTarget = o || void 0, v(s, _e), !_e.defaultPrevented && (g(s, p), N(s, He, "true"), Ot(s, Se), n ? L(s, () => ln(this, e)) : ln(this, e)));
  }
  update() {
    h(this.element, p) && To(this);
  }
  dispose() {
    on(this), this.hide(() => super.dispose());
  }
}
const fr = `.${G}`, ys = `[${X}="${G}"]`, ur = `[${Ne}="${G}"]`, Be = `${G}-toggling`, pr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, re = (t) => j(t, ws), gr = (t) => new Po(t), ve = w(`show.bs.${G}`), Co = w(`shown.bs.${G}`), Ge = w(`hide.bs.${G}`), Ho = w(`hidden.bs.${G}`), mr = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = ct(e);
  lo(e, s !== n);
}, dn = (t, e) => {
  const s = e ? I : k;
  t.triggers.forEach((n) => s(n, M, vr));
}, So = (t, e) => {
  const s = e ? I : k, n = b(t.element);
  s(n, Pe, wr), s(n, M, br);
}, hn = (t) => {
  const { element: e, options: s } = t;
  s.scroll || (mr(t), x(Et(e), { overflow: "hidden" })), d(e, Be), d(e, p), x(e, { visibility: "visible" }), L(e, () => $r(t));
}, fn = (t, e) => {
  const { element: s, options: n } = t, o = Wt(s);
  s.blur(), !o && n.backdrop && h(D, p) ? (Le(), L(D, () => un(t, e))) : un(t, e);
}, vr = (t) => {
  const e = A(t.target, ys), s = e && F(e), n = s && re(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, br = (t) => {
  const { target: e } = t, s = S($s, b(e)), n = S(ur, s), o = s && re(s);
  if (!o)
    return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = A(e, ys), l = b(s).getSelection();
  D.contains(e) && c === "static" || (!(l && l.toString().length) && (!s.contains(e) && c && (!a || r.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), a && a.tagName === "A" && t.preventDefault());
}, wr = ({ code: t, target: e }) => {
  const s = S($s, b(e)), n = s && re(s);
  n && n.options.keyboard && t === ps && (n.relatedTarget = null, n.hide());
}, $r = (t) => {
  const { element: e } = t;
  g(e, Be), Ot(e, He), N(e, Se, "true"), N(e, "role", "dialog"), v(e, Co), So(t, !0), rt(e);
}, un = (t, e) => {
  const { element: s, triggers: n } = t;
  N(s, He, "true"), Ot(s, Se), Ot(s, "role"), x(s, { visibility: "" });
  const o = ve.relatedTarget || n.find(bo);
  o && rt(o), vo(s), v(s, Ho), g(s, Be), Wt(s) || So(t), ke(e) && e();
};
class Po extends st {
  static selector = fr;
  static init = gr;
  static getInstance = re;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...J(ys, b(n))].filter(
      (o) => F(o) === n
    ), this.relatedTarget = null, dn(this, !0);
  }
  get name() {
    return ws;
  }
  get defaults() {
    return pr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(e, p) || (ve.relatedTarget = n || void 0, Co.relatedTarget = n || void 0, v(e, ve), ve.defaultPrevented))
      return;
    const i = Wt(e);
    if (i && i !== e) {
      const r = re(i) || j(i, bs);
      r && r.hide();
    }
    s.backdrop ? (Pt(D) ? Ts() : go(e, !0), o = le(D), mo(), setTimeout(() => hn(this), o)) : (hn(this), i && h(D, p) && Le());
  }
  hide(e) {
    const { element: s, relatedTarget: n } = this;
    h(s, p) && (Ge.relatedTarget = n || void 0, Ho.relatedTarget = n || void 0, v(s, Ge), !Ge.defaultPrevented && (d(s, Be), g(s, p), e ? fn(this, e) : L(s, () => fn(this, e))));
  }
  dispose() {
    dn(this), this.hide(() => super.dispose());
  }
}
const kt = "popover", Re = "Popover", it = "tooltip", xo = (t) => {
  const e = t === it, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${it}">${n + o + i}</div>`;
}, Do = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, as = (t) => {
  const e = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, options: i, arrow: r } = t;
  if (!n)
    return;
  const c = { ...Do }, a = yt(s);
  x(n, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const l = t.name === Re, { offsetWidth: f, offsetHeight: m } = n, { clientWidth: E, clientHeight: R, offsetWidth: _ } = ct(s);
  let { placement: $ } = i;
  const { clientWidth: z, offsetWidth: Y } = o, ot = V(o, "position") === "fixed", H = Math.abs(ot ? z - Y : E - _), lt = a && ot ? H : 0, nt = E - (a ? 0 : H) - 1, {
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
  let Ct = 0, _t = "", ft = 0, We = "", zt = "", ue = "", Fe = "";
  const Ht = r.offsetWidth || 0, ut = r.offsetHeight || 0, je = Ht / 2;
  let Gt = dt - m - ut < 0, Qt = dt + m + K + ut >= R, Zt = C - f - Ht < lt, Jt = C + f + W + Ht >= nt;
  const pe = ["left", "right"], ze = ["top", "bottom"];
  Gt = pe.includes($) ? dt + K / 2 - m / 2 - ut < 0 : Gt, Qt = pe.includes($) ? dt + m / 2 + K / 2 + ut >= R : Qt, Zt = ze.includes($) ? C + W / 2 - f / 2 < lt : Zt, Jt = ze.includes($) ? C + f / 2 + W / 2 >= nt : Jt, $ = pe.includes($) && Zt && Jt ? "top" : $, $ = $ === "top" && Gt ? "bottom" : $, $ = $ === "bottom" && Qt ? "top" : $, $ = $ === "left" && Zt ? "right" : $, $ = $ === "right" && Jt ? "left" : $, n.className.includes($) || (n.className = n.className.replace(e, c[$])), pe.includes($) ? ($ === "left" ? ft = O - f - (l ? Ht : 0) : ft = O + W + (l ? Ht : 0), Gt && Qt ? (Ct = 0, _t = 0, zt = dt + K / 2 - ut / 2) : Gt ? (Ct = ht, _t = "", zt = K / 2 - Ht) : Qt ? (Ct = ht - m + K, _t = "", zt = m - K / 2 - Ht) : (Ct = ht - m / 2 + K / 2, zt = m / 2 - ut / 2)) : ze.includes($) && ($ === "top" ? Ct = ht - m - (l ? ut : 0) : Ct = ht + K + (l ? ut : 0), Zt ? (ft = 0, ue = O + W / 2 - je) : Jt ? (ft = "auto", We = 0, Fe = W / 2 + nt - jt - je) : (ft = O - f / 2 + W / 2, ue = f / 2 - je)), x(n, {
    top: `${Ct}px`,
    bottom: _t === "" ? "" : `${_t}px`,
    left: ft === "auto" ? ft : `${ft}px`,
    right: We !== "" ? `${We}px` : ""
  }), T(r) && (zt !== "" && (r.style.top = `${zt}px`), ue !== "" ? r.style.left = `${ue}px` : Fe !== "" && (r.style.right = `${Fe}px`));
  const qo = w(`updated.bs.${Ut(t.name)}`);
  v(s, qo);
}, ls = {
  template: xo(it),
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
}, Ao = "data-original-title", Nt = "Tooltip", gt = (t, e, s) => {
  if (!(!T(t) || At(e) && !e.length))
    if (At(e)) {
      let n = e.trim();
      ke(s) && (n = s(n));
      const i = new DOMParser().parseFromString(n, "text/html");
      t.append(...i.body.childNodes);
    } else
      T(e) ? t.append(e) : (bi(e) || vi(e) && e.every(P)) && t.append(...e);
}, Tr = (t) => {
  const e = t.name === Nt, { id: s, element: n, options: o } = t, { title: i, placement: r, template: c, animation: a, customClass: l, sanitizeFn: f, dismissible: m, content: E, btnClose: R } = o, _ = e ? it : kt, $ = { ...Do };
  let z = [], Y = [];
  yt(n) && ($.left = "end", $.right = "start");
  const Ft = `bs-${_}-${$[r]}`;
  let ot;
  if (T(c))
    ot = c;
  else {
    const C = vt("div");
    gt(C, c, f), ot = C.firstChild;
  }
  t.tooltip = T(ot) ? ot.cloneNode(!0) : void 0;
  const { tooltip: H } = t;
  if (!H)
    return;
  N(H, "id", s), N(H, "role", it);
  const lt = e ? `${it}-inner` : `${kt}-body`, nt = e ? null : S(`.${kt}-header`, H), W = S(`.${lt}`, H);
  t.arrow = S(`.${_}-arrow`, H);
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
  if (m)
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
  e ? i && W && gt(W, i, f) : (i && nt && gt(nt, z, f), E && W && gt(W, Y, f), t.btn = S(".btn-close", H) || void 0), d(H, "position-fixed"), d(K, "position-absolute"), h(H, _) || d(H, _), a && !h(H, B) && d(H, B), l && !h(H, l) && d(H, l), h(H, Ft) || d(H, Ft);
}, yr = (t) => {
  const e = ["HTML", "BODY"], s = [];
  let { parentNode: n } = t;
  for (; n && !e.includes(n.nodeName); )
    n = mi(n), Fn(n) || wi(n) || s.push(n);
  return s.find((o, i) => V(o, "position") !== "relative" && s.slice(i + 1).every((r) => V(r, "position") === "static") ? o : null) || b(t).body;
}, Er = `[${X}="${it}"],[data-tip="${it}"]`, Io = "title";
let pn = (t) => j(t, Nt);
const Cr = (t) => new Es(t), Hr = (t) => {
  const { element: e, tooltip: s, container: n, offsetParent: o } = t;
  Ot(e, Mn), fo(s, n === o ? n : o);
}, Sr = (t, e) => {
  const { element: s } = t;
  se(t), Te(s, Ao) && t.name === Nt && No(t), e && e();
}, ko = (t, e) => {
  const s = e ? I : k, { element: n } = t;
  s(b(n), Bn, t.handleTouch, et), [Ae, De].forEach((o) => {
    s(qt(n), o, t.update, et);
  });
}, gn = (t) => {
  const { element: e } = t, s = w(`shown.bs.${Ut(t.name)}`);
  ko(t, !0), v(e, s), u.clear(e, "in");
}, mn = (t) => {
  const { element: e, onHideComplete: s } = t, n = w(`hidden.bs.${Ut(t.name)}`);
  ko(t), Hr(t), v(e, n), ke(s) && (s(), t.onHideComplete = void 0), u.clear(e, "out");
}, se = (t, e) => {
  const s = e ? I : k, { element: n, options: o, btn: i } = t, { trigger: r } = o, a = !!(t.name !== Nt && o.dismissible);
  if (r.includes("manual"))
    return;
  t.enabled = !!e, r.split(" ").forEach((f) => {
    f === ti ? (s(n, Jo, t.show), s(n, xe, t.show), a && i ? s(i, M, t.hide) : (s(n, us, t.hide), s(b(n), Bn, t.handleTouch, et))) : f === M ? s(n, f, a ? t.show : t.toggle) : f === hs && (s(n, fs, t.show), a || s(n, Ln, t.hide), ai && s(n, M, () => rt(n)));
  });
}, vn = (t, e) => {
  const s = e ? I : k, { element: n, container: o, offsetParent: i } = t, { offsetHeight: r, scrollHeight: c } = o, a = A(n, `.${q}`), l = A(n, `.${G}`), f = qt(n), E = o === i && r !== c ? o : f;
  s(E, De, t.update, et), s(E, Ae, t.update, et), a && s(a, `hide.bs.${q}`, t.hide), l && s(l, `hide.bs.${G}`, t.hide);
}, No = (t, e) => {
  const s = [Ao, Io], { element: n } = t;
  N(
    n,
    s[e ? 0 : 1],
    e || Bt(n, s[0]) || ""
  ), Ot(n, s[e ? 1 : 0]);
};
class Es extends st {
  static selector = Er;
  static init = Cr;
  static getInstance = pn;
  static styleTip = as;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this, o = this.name === Nt, i = o ? it : kt, r = o ? Nt : Re;
    pn = (a) => j(a, r), this.enabled = !0, this.id = `${i}-${jn(n, i)}`;
    const { options: c } = this;
    !c.title && o || !o && !c.content || (Tt(ls, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), Te(n, Io) && o && typeof c.title == "string" && No(this, c.title), this.container = yr(n), this.offsetParent = ["sticky", "fixed"].some(
      (a) => V(this.container, "position") === a
    ) ? this.container : b(this.element).body, Tr(this), se(this, !0));
  }
  get name() {
    return Nt;
  }
  get defaults() {
    return ls;
  }
  show() {
    const { options: e, tooltip: s, element: n, container: o, offsetParent: i, id: r } = this, { animation: c } = e, a = u.get(n, "out"), l = o === i ? o : i;
    u.clear(n, "out"), s && !a && !Pt(s, l) && u.set(
      n,
      () => {
        const f = w(`show.bs.${Ut(this.name)}`);
        v(n, f), !f.defaultPrevented && (ho(s, l), N(n, Mn, `#${r}`), this.update(), vn(this, !0), h(s, p) || d(s, p), c ? L(s, () => gn(this)) : gn(this));
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: e, tooltip: s, element: n, container: o, offsetParent: i } = this, { animation: r, delay: c } = e;
    u.clear(n, "in"), s && Pt(s, o === i ? o : i) && u.set(
      n,
      () => {
        const a = w(`hide.bs.${Ut(this.name)}`);
        v(n, a), !a.defaultPrevented && (this.update(), g(s, p), vn(this), r ? L(s, () => mn(this)) : mn(this));
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
    e && !Pt(e, s === n ? s : n) ? this.show() : this.hide();
  }
  enable() {
    const { enabled: e } = this;
    e || (se(this, !0), this.enabled = !e);
  }
  disable() {
    const { tooltip: e, container: s, offsetParent: n, options: o, enabled: i } = this, { animation: r } = o;
    i && (e && Pt(e, s === n ? s : n) && r ? (this.onHideComplete = () => se(this), this.hide()) : se(this), this.enabled = !i);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch({ target: e }) {
    const { tooltip: s, element: n } = this;
    s && s.contains(e) || e === n || e && n.contains(e) || this.hide();
  }
  dispose() {
    const { tooltip: e, container: s, offsetParent: n, options: o } = this, i = () => Sr(this, () => super.dispose());
    o.animation && e && Pt(e, s === n ? s : n) ? (this.options.delay = 0, this.onHideComplete = i, this.hide()) : i();
  }
}
const Pr = `[${X}="${kt}"],[data-tip="${kt}"]`, xr = Tt({}, ls, {
  template: xo(kt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Dr = (t) => j(t, Re), Ar = (t) => new Oo(t);
class Oo extends Es {
  static selector = Pr;
  static init = Ar;
  static getInstance = Dr;
  static styleTip = as;
  constructor(e, s) {
    super(e, s);
  }
  get name() {
    return Re;
  }
  get defaults() {
    return xr;
  }
  show() {
    super.show();
    const { options: e, btn: s } = this;
    e.dismissible && s && setTimeout(() => rt(s), 17);
  }
}
const Ir = "scrollspy", Mo = "ScrollSpy", kr = '[data-bs-spy="scroll"]', Nr = {
  offset: 10,
  target: null
}, Or = (t) => j(t, Mo), Mr = (t) => new Ro(t), bn = w(`activate.bs.${Ir}`), Lr = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: r } = t, { offset: c } = n, a = gs(s), l = e && ms("A", e), f = s ? Lo(s) : i;
  if (t.scrollTop = a ? s.scrollY : s.scrollTop, l && (f !== i || o !== l.length)) {
    let m, E, R;
    t.items = [], t.offsets = [], t.scrollHeight = f, t.maxScroll = t.scrollHeight - Br(t), [...l].forEach((_) => {
      m = Bt(_, "href"), E = m && m.charAt(0) === "#" && m.slice(-1) !== "#" && S(m, b(r)), E && (t.items.push(_), R = de(E), t.offsets.push((a ? R.top + t.scrollTop : E.offsetTop) - c));
    }), t.itemsLength = t.items.length;
  }
}, Lo = (t) => T(t) ? t.scrollHeight : ct(t).scrollHeight, Br = ({ element: t, scrollTarget: e }) => gs(e) ? e.innerHeight : de(t).height, Bo = (t) => {
  [...ms("A", t)].forEach((e) => {
    h(e, y) && g(e, y);
  });
}, wn = (t, e) => {
  const { target: s, element: n } = t;
  T(s) && Bo(s), t.activeItem = e, d(e, y);
  const o = [];
  let i = e;
  for (; i !== Et(n); )
    i = i.parentElement, (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const c = r.previousElementSibling;
    c && !h(c, y) && d(c, y);
  }), bn.relatedTarget = e, v(n, bn);
}, $n = (t, e) => {
  (e ? I : k)(t.scrollTarget, Ae, t.refresh, et);
};
class Ro extends st {
  static selector = kr;
  static init = Mr;
  static getInstance = Or;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    this.target = S(o.target, b(n)), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : qt(n), this.scrollHeight = Lo(this.scrollTarget), this.refresh = this.refresh.bind(this), $n(this, !0), this.refresh());
  }
  get name() {
    return Mo;
  }
  get defaults() {
    return Nr;
  }
  refresh() {
    const { target: e } = this;
    if (e?.offsetHeight === 0)
      return;
    Lr(this);
    const { scrollTop: s, maxScroll: n, itemsLength: o, items: i, activeItem: r } = this;
    if (s >= n) {
      const a = i[o - 1];
      r !== a && wn(this, a);
      return;
    }
    const { offsets: c } = this;
    if (r && s < c[0] && c[0] > 0) {
      this.activeItem = null, e && Bo(e);
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
const fe = "tab", Wo = "Tab", Tn = `[${X}="${fe}"]`, Fo = (t) => j(t, Wo), Rr = (t) => new jo(t), Qe = w(`show.bs.${fe}`), yn = w(`shown.bs.${fe}`), Ze = w(`hide.bs.${fe}`), En = w(`hidden.bs.${fe}`), ce = /* @__PURE__ */ new Map(), Cn = (t) => {
  const { tabContent: e, nav: s } = t;
  e && h(e, Mt) && (e.style.height = "", g(e, Mt)), s && u.clear(s);
}, Hn = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = T(o) && ce.get(o) || { tab: null };
  if (s && n && h(n, B)) {
    const { currentHeight: r, nextHeight: c } = ce.get(e) || {
      currentHeight: 0,
      nextHeight: 0
    };
    r === c ? Cn(t) : setTimeout(() => {
      s.style.height = `${c}px`, Rt(s), L(s, () => Cn(t));
    }, 50);
  } else
    o && u.clear(o);
  yn.relatedTarget = i, v(e, yn);
}, Sn = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: r } = o && ce.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, B) && ([r, s].forEach((a) => {
    T(a) && d(a, "overflow-hidden");
  }), c = T(r) ? r.scrollHeight : 0), Qe.relatedTarget = i, En.relatedTarget = e, v(e, Qe), !Qe.defaultPrevented) {
    if (s && d(s, y), r && g(r, y), n && s && h(s, B)) {
      const a = s.scrollHeight;
      ce.set(e, { currentHeight: c, nextHeight: a, tab: null, content: null }), d(n, Mt), n.style.height = `${c}px`, Rt(n), [r, s].forEach((l) => {
        l && g(l, "overflow-hidden");
      });
    }
    s && s && h(s, B) ? setTimeout(() => {
      d(s, p), L(s, () => {
        Hn(t);
      });
    }, 1) : (s && d(s, p), Hn(t)), i && v(i, En);
  }
}, Pn = (t) => {
  const { nav: e } = t;
  if (!T(e))
    return { tab: null, content: null };
  const s = bt(y, e);
  let n = null;
  s.length === 1 && !Lt.some((i) => h(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = T(n) ? F(n) : null;
  return { tab: n, content: o };
}, xn = (t) => {
  if (!T(t))
    return null;
  const e = A(t, `.${Lt.join(",.")}`);
  return e ? S(`.${Lt[0]}-toggle`, e) : null;
}, Dn = (t, e) => {
  (e ? I : k)(t.element, M, Wr);
}, Wr = (t) => {
  const e = Fo(t.target);
  e && (t.preventDefault(), e.show());
};
class jo extends st {
  static selector = Tn;
  static init = Rr;
  static getInstance = Fo;
  constructor(e) {
    super(e);
    const { element: s } = this, n = F(s);
    if (!n)
      return;
    const o = A(s, ".nav"), i = A(n, ".tab-content");
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = xn(s);
    const { tab: r } = Pn(this);
    if (o && !r) {
      const c = S(Tn, o), a = c && F(c);
      a && (d(c, y), d(a, p), d(a, y), N(s, Ke, "true"));
    }
    Dn(this, !0);
  }
  get name() {
    return Wo;
  }
  show() {
    const { element: e, content: s, nav: n, dropdown: o } = this;
    if (!(n && u.get(n)) && !h(e, y)) {
      const { tab: i, content: r } = Pn(this);
      if (n && ce.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ze.relatedTarget = e, T(i) && v(i, Ze), Ze.defaultPrevented)
        return;
      d(e, y), N(e, Ke, "true");
      const c = T(i) && xn(i);
      if (c && h(c, y) && g(c, y), n) {
        const a = () => {
          i && (g(i, y), N(i, Ke, "false")), o && !h(o, y) && d(o, y);
        };
        r && (h(r, B) || s && h(s, B)) ? u.set(n, a, 1) : a();
      }
      r && (g(r, p), h(r, B) ? L(r, () => Sn(this)) : Sn(this));
    }
  }
  dispose() {
    Dn(this), super.dispose();
  }
}
const Q = "toast", zo = "Toast", Fr = `.${Q}`, jr = `[${Ne}="${Q}"]`, Ko = `[${X}="${Q}"]`, Xt = "showing", Vo = "hide", zr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Cs = (t) => j(t, zo), Kr = (t) => new Yo(t), An = w(`show.bs.${Q}`), Vr = w(`shown.bs.${Q}`), In = w(`hide.bs.${Q}`), Ur = w(`hidden.bs.${Q}`), kn = (t) => {
  const { element: e, options: s } = t;
  g(e, Xt), u.clear(e, Xt), v(e, Vr), s.autohide && u.set(e, () => t.hide(), s.delay, Q);
}, Nn = (t) => {
  const { element: e } = t;
  g(e, Xt), g(e, p), d(e, Vo), u.clear(e, Q), v(e, Ur);
}, Yr = (t) => {
  const { element: e, options: s } = t;
  d(e, Xt), s.animation ? (Rt(e), L(e, () => Nn(t))) : Nn(t);
}, Xr = (t) => {
  const { element: e, options: s } = t;
  u.set(
    e,
    () => {
      g(e, Vo), Rt(e), d(e, p), d(e, Xt), s.animation ? L(e, () => kn(t)) : kn(t);
    },
    17,
    Xt
  );
}, Uo = (t, e) => {
  const s = e ? I : k, { element: n, triggers: o, dismiss: i, options: r } = t;
  i && s(i, M, t.hide), r.autohide && [fs, Ln, xe, us].forEach(
    (c) => s(n, c, Gr)
  ), o.length && o.forEach((c) => s(c, M, _r));
}, qr = (t) => {
  u.clear(t.element, Q), Uo(t);
}, _r = (t) => {
  const { target: e } = t, s = e && A(e, Ko), n = s && F(s), o = n && Cs(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, Gr = (t) => {
  const e = t.target, s = Cs(e), { type: n, relatedTarget: o } = t;
  !s || e === o || e.contains(o) || ([xe, fs].includes(n) ? u.clear(e, Q) : u.set(e, () => s.hide(), s.options.delay, Q));
};
class Yo extends st {
  static selector = Fr;
  static init = Kr;
  static getInstance = Cs;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, B) ? d(n, B) : !o.animation && h(n, B) && g(n, B), this.dismiss = S(jr, n), this.triggers = [...J(Ko, b(n))].filter(
      (i) => F(i) === n
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), Uo(this, !0);
  }
  get name() {
    return zo;
  }
  get defaults() {
    return zr;
  }
  get isShown() {
    return h(this.element, p);
  }
  show() {
    const { element: e, isShown: s } = this;
    if (e && !s) {
      if (v(e, An), An.defaultPrevented)
        return;
      Xr(this);
    }
  }
  hide() {
    const { element: e, isShown: s } = this;
    if (e && s) {
      if (v(e, In), In.defaultPrevented)
        return;
      Yr(this);
    }
  }
  dispose() {
    const { element: e, isShown: s } = this;
    s && g(e, p), qr(this), super.dispose();
  }
}
const Xo = {
  Alert: Vn,
  Button: Yn,
  Carousel: _n,
  Collapse: Zn,
  Dropdown: oo,
  Modal: Eo,
  Offcanvas: Po,
  Popover: Oo,
  ScrollSpy: Ro,
  Tab: jo,
  Toast: Yo,
  Tooltip: Es
}, Qr = (t, e) => {
  [...e].forEach((s) => t(s));
}, Zr = (t, e) => {
  const s = Dt.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, On = (t) => {
  const e = t && t.nodeName ? t : document, s = [...ms("*", e)];
  pi(Xo).forEach((n) => {
    const { init: o, selector: i } = n;
    Qr(
      o,
      s.filter((r) => $i(r, i))
    );
  });
}, tc = (t) => {
  const e = t && t.nodeName ? t : document;
  es(Xo).forEach((s) => {
    Zr(s, e);
  });
};
document.body ? On() : I(document, "DOMContentLoaded", () => On(), { once: !0 });
export {
  Vn as Alert,
  Yn as Button,
  _n as Carousel,
  Zn as Collapse,
  oo as Dropdown,
  Jr as Listener,
  Eo as Modal,
  Po as Offcanvas,
  Oo as Popover,
  Ro as ScrollSpy,
  jo as Tab,
  Yo as Toast,
  Es as Tooltip,
  On as initCallback,
  tc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
