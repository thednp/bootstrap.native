const Dt = {}, fs = (t) => {
  const { type: e, currentTarget: s } = t;
  [...Dt[e]].forEach(([n, o]) => {
    s === n && [...o].forEach(([i, r]) => {
      i.apply(n, [t]), typeof r == "object" && r.once && N(n, e, i, r);
    });
  });
}, I = (t, e, s, n) => {
  Dt[e] || (Dt[e] = /* @__PURE__ */ new Map());
  const o = Dt[e];
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: r } = i;
  i.set(s, n), r || t.addEventListener(e, fs, n);
}, N = (t, e, s, n) => {
  const o = Dt[e], i = o && o.get(t), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(t), (!o || !o.size) && delete Dt[e], (!i || !i.size) && t.removeEventListener(e, fs, c);
}, _o = I, Go = N, ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: I,
  globalListener: fs,
  off: Go,
  on: _o,
  registry: Dt,
  removeListener: N
}, Symbol.toStringTag, { value: "Module" })), Rn = "aria-describedby", $e = "aria-expanded", Pe = "aria-hidden", xe = "aria-modal", xs = "aria-pressed", Ye = "aria-selected", Qo = "DOMContentLoaded", us = "focus", ps = "focusin", Wn = "focusout", De = "keydown", Zo = "keyup", M = "click", Jo = "mousedown", ti = "hover", Ae = "mouseenter", gs = "mouseleave", ei = "mousemove", si = "pointerdown", ni = "pointermove", oi = "pointerup", Ie = "resize", Ne = "scroll", Fn = "touchstart", es = "ArrowDown", ss = "ArrowUp", Ds = "ArrowLeft", As = "ArrowRight", ms = "Escape", ii = "transitionDuration", ri = "transitionDelay", Ke = "transitionend", jn = "transitionProperty", ci = navigator.userAgentData, Te = ci, { userAgent: ai } = navigator, ye = ai, Is = /iPhone|iPad|iPod|Android/i;
Te ? Te.brands.some((t) => Is.test(t.brand)) : Is.test(ye);
const Ns = /(iPhone|iPod|iPad)/, li = Te ? Te.brands.some((t) => Ns.test(t.brand)) : Ns.test(ye);
ye && ye.includes("Firefox");
const { head: ke } = document;
["webkitPerspective", "perspective"].some((t) => t in ke.style);
const di = (t, e, s, n) => {
  const o = n || !1;
  t.addEventListener(e, s, o);
}, hi = (t, e, s, n) => {
  const o = n || !1;
  t.removeEventListener(e, s, o);
}, fi = (t, e, s, n) => {
  const o = (i) => {
    (i.target === t || i.currentTarget === t) && (s.apply(t, [i]), hi(t, e, o, n));
  };
  di(t, e, o, n);
}, ne = () => {
};
(() => {
  let t = !1;
  try {
    const e = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    fi(document, Qo, ne, e);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in ke.style);
["webkitAnimation", "animation"].some((t) => t in ke.style);
["webkitTransition", "transition"].some((t) => t in ke.style);
const Rt = (t, e) => t.getAttribute(e), Ee = (t, e) => t.hasAttribute(e), O = (t, e, s) => t.setAttribute(e, s), Mt = (t, e) => t.removeAttribute(e), d = (t, ...e) => {
  t.classList.add(...e);
}, m = (t, ...e) => {
  t.classList.remove(...e);
}, h = (t, e) => t.classList.contains(e), ae = (t) => t != null && typeof t == "object" || !1, D = (t) => ae(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e) => t.nodeType === e) || !1, y = (t) => D(t) && t.nodeType === 1 || !1, Jt = /* @__PURE__ */ new Map(), At = {
  set: (t, e, s) => {
    y(t) && (Jt.has(e) || Jt.set(e, /* @__PURE__ */ new Map()), Jt.get(e).set(t, s));
  },
  getAllFor: (t) => Jt.get(t) || null,
  get: (t, e) => {
    if (!y(t) || !e)
      return null;
    const s = At.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  remove: (t, e) => {
    const s = At.getAllFor(e);
    !s || !y(t) || (s.delete(t), s.size === 0 && Jt.delete(e));
  }
}, W = (t, e) => At.get(t, e), It = (t) => typeof t == "string" || !1, vs = (t) => ae(t) && t.constructor.name === "Window" || !1, zn = (t) => D(t) && t.nodeType === 9 || !1, $ = (t) => vs(t) ? t.document : zn(t) ? t : D(t) ? t.ownerDocument : window.document, se = (t) => Object.entries(t), vt = (t) => {
  if (!t)
    return;
  if (It(t))
    return $().createElement(t);
  const { tagName: e } = t, s = vt(e);
  if (!s)
    return;
  const n = { ...t };
  return delete n.tagName, se(n).forEach(([o, i]) => {
    It(o) && It(i) && O(s, o, i);
  }), s;
}, w = (t, e) => t.dispatchEvent(e), F = (t, e) => {
  const s = getComputedStyle(t), n = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, ui = (t) => {
  const e = F(t, jn), s = F(t, ri), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (t) => {
  const e = F(t, jn), s = F(t, ii), n = s.includes("ms") ? 1 : 1e3, o = e && e !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, L = (t, e) => {
  let s = 0;
  const n = new Event(Ke), o = le(t), i = ui(t);
  if (o) {
    const r = (c) => {
      c.target === t && (e.apply(t, [c]), t.removeEventListener(Ke, r), s = 1);
    };
    t.addEventListener(Ke, r), setTimeout(() => {
      s || w(t, n);
    }, o + i + 17);
  } else
    e.apply(t, [n]);
}, at = (t, e) => t.focus(e), ks = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, oe = (t) => t.toLowerCase(), pi = (t, e, s, n) => {
  const o = { ...s }, i = { ...t.dataset }, r = { ...e }, c = {}, a = "title";
  return se(i).forEach(([l, p]) => {
    const f = n && typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(/[A-Z]/g, (b) => oe(b)) : l;
    c[f] = ks(p);
  }), se(o).forEach(([l, p]) => {
    o[l] = ks(p);
  }), se(e).forEach(([l, p]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? Rt(t, a) : p;
  }), r;
}, $t = (t, ...e) => Object.assign(t, ...e), ns = (t) => Object.keys(t), gi = (t) => Object.values(t), T = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return ae(e) && $t(s, e), s;
}, G = { passive: !0 }, Wt = (t) => t.offsetHeight, P = (t, e) => {
  se(e).forEach(([s, n]) => {
    if (n && It(s) && s.includes("--"))
      t.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, $t(t.style, o);
    }
  });
}, os = (t) => ae(t) && t.constructor.name === "Map" || !1, mi = (t) => typeof t == "number" || !1, pt = /* @__PURE__ */ new Map(), u = {
  set: (t, e, s, n) => {
    !y(t) || (n && n.length ? (pt.has(t) || pt.set(t, /* @__PURE__ */ new Map()), pt.get(t).set(n, setTimeout(e, s))) : pt.set(t, setTimeout(e, s)));
  },
  get: (t, e) => {
    if (!y(t))
      return null;
    const s = pt.get(t);
    return e && s && os(s) ? s.get(e) || null : mi(s) ? s : null;
  },
  clear: (t, e) => {
    if (!y(t))
      return;
    const s = pt.get(t);
    e && e.length && os(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && pt.delete(t)) : (clearTimeout(s), pt.delete(t));
  }
}, de = (t, e) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = t.getBoundingClientRect();
  let a = 1, l = 1;
  if (e && y(t)) {
    const { offsetWidth: p, offsetHeight: f } = t;
    a = p > 0 ? Math.round(s) / p : 1, l = f > 0 ? Math.round(n) / f : 1;
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
}, lt = (t) => $(t).body, dt = (t) => $(t).documentElement, Vn = (t) => D(t) && t.constructor.name === "ShadowRoot" || !1, vi = (t) => t.nodeName === "HTML" ? t : y(t) && t.assignedSlot || D(t) && t.parentNode || Vn(t) && t.host || dt(t);
let Os = 0, Ms = 0;
const zt = /* @__PURE__ */ new Map(), Xn = (t, e) => {
  let s = e ? Os : Ms;
  if (e) {
    const n = Xn(t), o = zt.get(n) || /* @__PURE__ */ new Map();
    zt.has(n) || zt.set(n, o), os(o) && !o.has(e) ? (o.set(e, s), Os += 1) : s = o.get(e);
  } else {
    const n = t.id || t;
    zt.has(n) ? s = zt.get(n) : (zt.set(n, s), Ms += 1);
  }
  return s;
}, Ut = (t) => {
  var e;
  return t ? zn(t) ? t.defaultView : D(t) ? (e = t?.ownerDocument) == null ? void 0 : e.defaultView : t : window;
}, bi = (t) => Array.isArray(t) || !1, Yn = (t) => {
  if (!D(t))
    return !1;
  const { top: e, bottom: s } = de(t), { clientHeight: n } = dt(t);
  return e <= n && s >= 0;
}, Oe = (t) => typeof t == "function" || !1, Me = (t) => D(t) && ["SVG", "Image", "Video", "Canvas"].some((e) => t.constructor.name.includes(e)) || !1, wi = (t) => ae(t) && t.constructor.name === "NodeList" || !1, Tt = (t) => dt(t).dir === "rtl", $i = (t) => D(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, A = (t, e) => t ? t.closest(e) || A(t.getRootNode().host, e) : null, H = (t, e) => y(t) ? t : (D(e) ? e : $()).querySelector(t), bs = (t, e) => (D(e) ? e : $()).getElementsByTagName(t), et = (t, e) => (D(e) ? e : $()).querySelectorAll(t), bt = (t, e) => (e && D(e) ? e : $()).getElementsByClassName(
  t
), Ti = (t, e) => t.matches(e), B = "fade", g = "show", Le = "data-bs-dismiss", Be = "alert", Kn = "Alert", yi = "5.0.0-alpha1", Ei = yi;
class st {
  element;
  options;
  constructor(e, s) {
    const n = H(e);
    if (!n)
      throw It(e) ? Error(`${this.name} Error: "${e}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const o = At.get(n, this.name);
    o && o.dispose(), this.element = n, this.defaults && ns(this.defaults).length && (this.options = pi(n, this.defaults, s || {}, "bs")), At.set(n, this.name, this);
  }
  get version() {
    return Ei;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    At.remove(this.element, this.name), ns(this).forEach((e) => {
      delete this[e];
    });
  }
}
const Ls = `.${Be}`, Ci = `[${Le}="${Be}"]`, Bs = (t) => W(t, Kn), Si = (t) => new Un(t), Rs = T(`close.bs.${Be}`), Hi = T(`closed.bs.${Be}`), Ws = (t) => {
  const { element: e } = t;
  is(t), w(e, Hi), t.dispose(), e.remove();
}, is = (t, e) => {
  const s = e ? I : N, { dismiss: n } = t;
  n && s(n, M, t.close);
};
class Un extends st {
  static selector = Ls;
  static init = Si;
  static getInstance = Bs;
  dismiss;
  constructor(e) {
    super(e), this.dismiss = H(Ci, this.element), is(this, !0);
  }
  get name() {
    return Kn;
  }
  close(e) {
    const s = e ? Bs(A(e.target, Ls)) : this, { element: n } = s;
    if (n && h(n, g)) {
      if (w(n, Rs), Rs.defaultPrevented)
        return;
      m(n, g), h(n, B) ? L(n, () => Ws(s)) : Ws(s);
    }
  }
  dispose() {
    is(this), super.dispose();
  }
}
const E = "active", K = "data-bs-toggle", Pi = "button", qn = "Button", xi = `[${K}="${Pi}"]`, Fs = (t) => W(t, qn), Di = (t) => new _n(t), js = (t, e) => {
  (e ? I : N)(t.element, M, t.toggle);
};
class _n extends st {
  static selector = xi;
  static init = Di;
  static getInstance = Fs;
  isActive = !1;
  constructor(e) {
    super(e);
    const { element: s } = this;
    this.isActive = h(s, E), O(s, xs, String(!!this.isActive)), js(this, !0);
  }
  get name() {
    return qn;
  }
  toggle(e) {
    e && e.preventDefault();
    const s = e ? Fs(e.target) : this;
    if (!s.element)
      return;
    const { element: n, isActive: o } = s;
    if (h(n, "disabled"))
      return;
    (o ? m : d)(n, E), O(n, xs, o ? "false" : "true"), s.isActive = h(n, E);
  }
  dispose() {
    js(this), super.dispose();
  }
}
const rs = "data-bs-target", Nt = "carousel", Gn = "Carousel", zs = "data-bs-parent", Ai = "data-bs-container", z = (t) => {
  const e = [rs, zs, Ai, "href"], s = $(t);
  return e.map((n) => {
    const o = Rt(t, n);
    return o ? n === zs ? A(t, o) : H(o, s) : null;
  }).filter((n) => n)[0];
}, he = `[data-bs-ride="${Nt}"]`, tt = `${Nt}-item`, cs = "data-bs-slide-to", mt = "data-bs-slide", wt = "paused", Vs = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (t) => W(t, Gn), Ii = (t) => new Zn(t);
let Pt = 0, Vt = 0, te = 0;
const Ue = T(`slide.bs.${Nt}`), as = T(`slid.bs.${Nt}`), Ni = (t) => {
  const { index: e, direction: s, element: n, slides: o, options: i } = t;
  if (t.isAnimating && ht(n)) {
    const r = ls(t), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[e], E), m(o[e], `${tt}-${c}`), m(o[e], `${tt}-${a}`), m(o[r], E), m(o[r], `${tt}-${a}`), w(n, as), u.clear(n, mt), !$(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function ki() {
  const t = ht(this);
  t && !t.isPaused && !u.get(this, wt) && d(this, wt);
}
function Oi() {
  const t = ht(this);
  t && t.isPaused && !u.get(this, wt) && t.cycle();
}
function Mi(t) {
  t.preventDefault();
  const e = A(this, he) || z(this), s = ht(e);
  if (!s || s.isAnimating)
    return;
  const n = +(Rt(this, cs) || 0);
  this && !h(this, E) && !Number.isNaN(n) && s.to(n);
}
function Li(t) {
  t.preventDefault();
  const e = A(this, he) || z(this), s = ht(e);
  if (!s || s.isAnimating)
    return;
  const n = Rt(this, mt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Bi = ({ code: t, target: e }) => {
  const s = $(e), [n] = [...et(he, s)].filter((a) => Yn(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input/i.test(e.nodeName))
    return;
  const i = Tt(n);
  t === (i ? As : Ds) ? o.prev() : t === (i ? Ds : As) && o.next();
};
function Ri(t) {
  const { target: e } = t, s = ht(this);
  if (!s || s.isAnimating || s.isTouch)
    return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].some((i) => i === e || i.contains(e)) || (Pt = t.pageX, this.contains(e) && (s.isTouch = !0, Qn(s, !0)));
}
const Wi = (t) => {
  Vt = t.pageX;
}, Fi = (t) => {
  const { target: e } = t, s = $(e), n = [...et(he, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n)
    return;
  const { element: o, index: i } = n, r = Tt(o);
  if (n.isTouch = !1, Qn(n), s.getSelection()?.toString().length) {
    Pt = 0, Vt = 0, te = 0;
    return;
  }
  if (te = t.pageX, !o.contains(e) || Math.abs(Pt - te) < 120) {
    Pt = 0, Vt = 0, te = 0;
    return;
  }
  Vt < Pt ? n.to(i + (r ? -1 : 1)) : Vt > Pt && n.to(i + (r ? 1 : -1)), Pt = 0, Vt = 0, te = 0;
}, qe = (t, e) => {
  const { indicators: s } = t;
  [...s].forEach((n) => m(n, E)), t.indicators[e] && d(s[e], E);
}, Qn = (t, e) => {
  const { element: s } = t, n = e ? I : N;
  n($(s), ni, Wi, G), n($(s), oi, Fi, G);
}, Xs = (t, e) => {
  const { element: s, options: n, slides: o, controls: i, indicators: r } = t, { touch: c, pause: a, interval: l, keyboard: p } = n, f = e ? I : N;
  a && l && (f(s, Ae, ki), f(s, gs, Oi)), c && o.length > 2 && f(s, si, Ri, G), i.length && i.forEach((b) => {
    b && f(b, M, Li);
  }), r.length && r.forEach((b) => {
    f(b, M, Mi);
  }), p && f($(s), De, Bi);
}, ls = (t) => {
  const { slides: e, element: s } = t, n = H(`.${tt}.${E}`, s);
  return y(n) ? [...e].indexOf(n) : -1;
};
class Zn extends st {
  static selector = he;
  static init = Ii;
  static getInstance = ht;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.direction = Tt(n) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = bt(tt, n);
    const { slides: o } = this;
    if (o.length < 2)
      return;
    const i = $(n);
    this.controls = [
      ...et(`[${mt}]`, n),
      ...et(`[${mt}][${rs}="#${n.id}"]`, i)
    ], this.indicator = H(`.${Nt}-indicators`, n), this.indicators = [
      ...this.indicator ? et(`[${cs}]`, this.indicator) : [],
      ...et(`[${cs}][${rs}="#${n.id}"]`, i)
    ];
    const { options: r } = this;
    this.options.interval = r.interval === !0 ? Vs.interval : r.interval, ls(this) < 0 && (d(o[0], E), this.indicators.length && qe(this, 0)), Xs(this, !0), r.interval && this.cycle();
  }
  get name() {
    return Gn;
  }
  get defaults() {
    return Vs;
  }
  get isPaused() {
    return h(this.element, wt);
  }
  get isAnimating() {
    return H(`.${tt}-next,.${tt}-prev`, this.element) !== null;
  }
  cycle() {
    const { element: e, options: s, isPaused: n, index: o } = this;
    u.clear(e, Nt), n && (u.clear(e, wt), m(e, wt)), u.set(
      e,
      () => {
        this.element && !this.isPaused && !this.isTouch && Yn(e) && this.to(o + 1);
      },
      s.interval,
      Nt
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
    const { element: s, slides: n, options: o } = this, i = ls(this), r = Tt(s);
    let c = e;
    if (this.isAnimating || i === c || u.get(s, mt))
      return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", p = a === "left" ? "start" : "end", f = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    $t(Ue, f), $t(as, f), w(s, Ue), !Ue.defaultPrevented && (this.index = c, qe(this, c), le(n[c]) && h(s, "slide") ? u.set(
      s,
      () => {
        d(n[c], `${tt}-${l}`), Wt(n[c]), d(n[c], `${tt}-${p}`), d(n[i], `${tt}-${p}`), L(n[c], () => Ni(this));
      },
      0,
      mt
    ) : (d(n[c], E), m(n[i], E), u.set(
      s,
      () => {
        u.clear(s, mt), s && o.interval && !this.isPaused && this.cycle(), w(s, as);
      },
      0,
      mt
    )));
  }
  dispose() {
    const { slides: e } = this, s = ["start", "end", "prev", "next"];
    [...e].forEach((n, o) => {
      h(n, E) && qe(this, o), s.forEach((i) => m(n, `${tt}-${i}`));
    }), Xs(this), super.dispose();
  }
}
const Lt = "collapsing", j = "collapse", Jn = "Collapse", ji = `.${j}`, to = `[${K}="${j}"]`, zi = { parent: null }, ve = (t) => W(t, Jn), Vi = (t) => new eo(t), Ys = T(`show.bs.${j}`), Xi = T(`shown.bs.${j}`), Ks = T(`hide.bs.${j}`), Yi = T(`hidden.bs.${j}`), Ki = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  w(e, Ys), !Ys.defaultPrevented && (u.set(e, ne, 17), s && u.set(s, ne, 17), d(e, Lt), m(e, j), P(e, { height: `${e.scrollHeight}px` }), L(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => O(o, $e, "true")), m(e, Lt), d(e, j), d(e, g), P(e, { height: "" }), w(e, Xi);
  }));
}, Us = (t) => {
  const { element: e, parent: s, triggers: n } = t;
  w(e, Ks), !Ks.defaultPrevented && (u.set(e, ne, 17), s && u.set(s, ne, 17), P(e, { height: `${e.scrollHeight}px` }), m(e, j), m(e, g), d(e, Lt), Wt(e), P(e, { height: "0px" }), L(e, () => {
    u.clear(e), s && u.clear(s), n.forEach((o) => O(o, $e, "false")), m(e, Lt), d(e, j), P(e, { height: "" }), w(e, Yi);
  }));
}, qs = (t, e) => {
  const s = e ? I : N, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, Ui));
}, Ui = (t) => {
  const { target: e } = t, s = e && A(e, to), n = s && z(s), o = n && ve(n);
  o && o.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class eo extends st {
  static selector = ji;
  static init = Vi;
  static getInstance = ve;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this, i = $(n);
    this.triggers = [...et(to, i)].filter((r) => z(r) === n), this.parent = H(o.parent, i) || z(n) || null, qs(this, !0);
  }
  get name() {
    return Jn;
  }
  get defaults() {
    return zi;
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  hide() {
    const { triggers: e, element: s } = this;
    u.get(s) || (Us(this), e.length && e.forEach((n) => d(n, `${j}d`)));
  }
  show() {
    const { element: e, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [...et(`.${j}.${g}`, s)].find(
      (r) => ve(r)
    ), i = o && ve(o)), (!s || !u.get(s)) && !u.get(e) && (i && o !== e && (Us(i), i.triggers.forEach((r) => {
      d(r, `${j}d`);
    })), Ki(this), n.length && n.forEach((r) => m(r, `${j}d`)));
  }
  dispose() {
    qs(this), super.dispose();
  }
}
const Bt = ["dropdown", "dropup", "dropstart", "dropend"], so = "Dropdown", no = "dropdown-menu", oo = (t) => {
  const e = A(t, "A");
  return t.tagName === "A" && Ee(t, "href") && t.href.slice(-1) === "#" || e && Ee(e, "href") && e.href.slice(-1) === "#";
}, [it, Ce, Se, He] = Bt, ws = `[${K}="${it}"],[${K}="${Ce}"],[${K}="${He}"],[${K}="${Se}"]`, Yt = (t) => W(t, so), qi = (t) => new ro(t), _i = `${no}-end`, _s = [it, Ce], Gs = [Se, He], Qs = ["A", "BUTTON"], Gi = {
  offset: 5,
  display: "dynamic"
}, _e = T(`show.bs.${it}`), Zs = T(`shown.bs.${it}`), Ge = T(`hide.bs.${it}`), Js = T(`hidden.bs.${it}`), io = (t) => {
  const { element: e, menu: s, parentElement: n, options: o } = t, { offset: i } = o;
  if (F(s, "position") === "static")
    return;
  const r = Tt(e), c = h(s, _i);
  ["margin", "top", "bottom", "left", "right"].forEach((k) => {
    const Ct = {};
    Ct[k] = "", P(s, Ct);
  });
  let l = Bt.find((k) => h(n, k)) || it;
  const p = {
    dropdown: [i, 0, 0],
    dropup: [0, 0, i],
    dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
    dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
  }, f = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: b, offsetHeight: R } = s, { clientWidth: V, clientHeight: ft } = dt(e), { left: v, top: X, width: yt, height: Et } = de(e), S = v - b - i < 0, q = v + b + yt + i >= V, nt = X + R + i >= ft, Y = X + R + Et + i >= ft, _ = X - R - i < 0, C = (!r && c || r && !c) && v + yt - b < 0, ot = (r && c || !r && !c) && v + b >= V;
  if (Gs.includes(l) && S && q && (l = it), l === Se && (r ? q : S) && (l = He), l === He && (r ? S : q) && (l = Se), l === Ce && _ && !Y && (l = it), l === it && Y && !_ && (l = Ce), Gs.includes(l) && nt && $t(f[l], {
    top: "auto",
    bottom: 0
  }), _s.includes(l) && (C || ot)) {
    let k = { left: "auto", right: "auto" };
    !C && ot && !r && (k = { left: "auto", right: 0 }), C && !ot && r && (k = { left: 0, right: "auto" }), k && $t(f[l], k);
  }
  const ze = p[l];
  P(s, {
    ...f[l],
    margin: `${ze.map((k) => k && `${k}px`).join(" ")}`
  }), _s.includes(l) && c && c && P(s, f[!r && C || r && ot ? "menuStart" : "menuEnd"]);
}, Qi = (t) => [...t.children].map((e) => {
  if (e && Qs.includes(e.tagName))
    return e;
  const { firstElementChild: s } = e;
  return s && Qs.includes(s.tagName) ? s : null;
}).filter((e) => e), tn = (t) => {
  const { element: e, options: s } = t, n = t.open ? I : N, o = $(e);
  n(o, M, sn), n(o, us, sn), n(o, De, Ji), n(o, Zo, tr), s.display === "dynamic" && [Ne, Ie].forEach((i) => {
    n(Ut(e), i, er, G);
  });
}, en = (t, e) => {
  (e ? I : N)(t.element, M, Zi);
}, Re = (t) => {
  const e = [...Bt, "btn-group", "input-group"].map((s) => bt(`${s} ${g}`, $(t))).find((s) => s.length);
  if (e && e.length)
    return [...e[0].children].find(
      (s) => Bt.some((n) => n === Rt(s, K))
    );
}, sn = (t) => {
  const { target: e, type: s } = t;
  if (!e || !e.closest)
    return;
  const n = Re(e), o = n && Yt(n);
  if (!o)
    return;
  const { parentElement: i, menu: r } = o, c = A(e, ws) !== null, a = i && i.contains(e) && (e.tagName === "form" || A(e, "form") !== null);
  s === M && oo(e) && t.preventDefault(), !(s === us && (e === n || e === r || r.contains(e))) && (a || c || o && o.hide());
}, Zi = (t) => {
  const { target: e } = t, s = e && A(e, ws), n = s && Yt(s);
  n && (t.stopImmediatePropagation(), n.toggle(), s && oo(s) && t.preventDefault());
}, Ji = (t) => {
  [es, ss].includes(t.code) && t.preventDefault();
};
function tr(t) {
  const { code: e } = t, s = Re(this), n = s && Yt(s), { activeElement: o } = s && $(s);
  if (!n || !o)
    return;
  const { menu: i, open: r } = n, c = Qi(i);
  if (c && c.length && [es, ss].includes(e)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : e === ss ? a = a > 1 ? a - 1 : 0 : e === es && (a = a < c.length - 1 ? a + 1 : a), c[a] && at(c[a]);
  }
  ms === e && r && (n.toggle(), at(s));
}
function er() {
  const t = Re(this), e = t && Yt(t);
  e && e.open && io(e);
}
class ro extends st {
  static selector = ws;
  static init = qi;
  static getInstance = Yt;
  constructor(e, s) {
    super(e, s);
    const { parentElement: n } = this.element;
    this.parentElement = n, this.menu = H(`.${no}`, n), en(this, !0);
  }
  get name() {
    return so;
  }
  get defaults() {
    return Gi;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    if (s)
      return;
    const i = Re(e), r = i && Yt(i);
    r && r.hide(), [_e, Zs].forEach((c) => {
      c.relatedTarget = e;
    }), w(o, _e), !_e.defaultPrevented && (d(n, g), d(o, g), O(e, $e, "true"), io(this), this.open = !s, at(e), tn(this), w(o, Zs));
  }
  hide() {
    const { element: e, open: s, menu: n, parentElement: o } = this;
    s && ([Ge, Js].forEach((i) => {
      i.relatedTarget = e;
    }), w(o, Ge), !Ge.defaultPrevented && (m(n, g), m(o, g), O(e, $e, "false"), this.open = !s, tn(this), w(o, Js)));
  }
  dispose() {
    this.open && this.hide(), en(this), super.dispose();
  }
}
const U = "modal", $s = "Modal", Ts = "Offcanvas", sr = "fixed-top", nr = "fixed-bottom", co = "sticky-top", ao = "position-sticky", lo = (t) => [
  ...bt(sr, t),
  ...bt(nr, t),
  ...bt(co, t),
  ...bt(ao, t),
  ...bt("is-fixed", t)
], or = (t) => {
  const e = lt(t);
  P(e, {
    paddingRight: "",
    overflow: ""
  });
  const s = lo(e);
  s.length && s.forEach((n) => {
    P(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, ho = (t) => {
  const { clientWidth: e } = dt(t), { innerWidth: s } = Ut(t);
  return Math.abs(s - e);
}, fo = (t, e) => {
  const s = lt(t), n = parseInt(F(s, "paddingRight"), 10), i = F(s, "overflow") === "hidden" && n ? 0 : ho(t), r = lo(s);
  e && (P(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = F(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [co, ao].some((l) => h(c, l))) {
      const l = F(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, Q = "offcanvas", Xt = vt({ tagName: "div" }), uo = (t, e) => {
  const s = D(e) && e.nodeName !== "BODY" ? e : Xt, n = D(e) && e.nodeName === "BODY" ? e : lt(t);
  D(t) && ((!e && !n.contains(Xt) || D(e) && e.nodeName === "BODY") && n.append(Xt), s.append(t));
}, po = (t, e) => {
  D(t) && (t.remove(), !e && !Xt.children.length && Xt.remove());
}, xt = (t, e) => (D(e) && e.nodeName !== "BODY" ? e : Xt).contains(t), go = "backdrop", nn = `${U}-${go}`, on = `${Q}-${go}`, mo = `.${U}.${g}`, ys = `.${Q}.${g}`, x = vt("div"), Ft = (t) => H(`${mo},${ys}`, $(t)), Es = (t) => {
  const e = t ? nn : on;
  [nn, on].forEach((s) => {
    m(x, s);
  }), d(x, e);
}, vo = (t, e, s) => {
  Es(s), uo(x, lt(t)), e && d(x, B);
}, bo = () => {
  h(x, g) || (d(x, g), Wt(x));
}, We = () => {
  m(x, g);
}, wo = (t) => {
  Ft(t) || (m(x, B), po(x, lt(t)), or(t));
}, $o = (t) => y(t) && F(t, "visibility") !== "hidden" && t.offsetParent !== null, ir = `.${U}`, To = `[${K}="${U}"]`, rr = `[${Le}="${U}"]`, yo = `${U}-static`, cr = {
  backdrop: !0,
  keyboard: !0
}, ie = (t) => W(t, $s), ar = (t) => new So(t), be = T(`show.bs.${U}`), rn = T(`shown.bs.${U}`), Qe = T(`hide.bs.${U}`), cn = T(`hidden.bs.${U}`), Eo = (t) => {
  const { element: e } = t, s = ho(e), { clientHeight: n, scrollHeight: o } = dt(e), { clientHeight: i, scrollHeight: r } = e, c = i !== r;
  if (!c && s) {
    const a = Tt(e) ? "paddingLeft" : "paddingRight", l = {};
    l[a] = `${s}px`, P(e, l);
  }
  fo(e, c || n !== o);
}, Co = (t, e) => {
  const s = e ? I : N, { element: n } = t;
  s(n, M, hr), s(Ut(n), Ie, t.update, G), s($(n), De, dr);
}, an = (t, e) => {
  const s = e ? I : N, { triggers: n } = t;
  n.length && n.forEach((o) => s(o, M, lr));
}, ln = (t, e) => {
  const { triggers: s, element: n, relatedTarget: o } = t;
  wo(n), P(n, { paddingRight: "", display: "" }), Co(t);
  const i = be.relatedTarget || s.find($o);
  i && at(i), Oe(e) && e(), cn.relatedTarget = o, w(n, cn);
}, dn = (t) => {
  const { element: e, relatedTarget: s } = t;
  at(e), Co(t, !0), rn.relatedTarget = s, w(e, rn);
}, hn = (t) => {
  const { element: e, hasFade: s } = t;
  P(e, { display: "block" }), Eo(t), Ft(e) || P(lt(e), { overflow: "hidden" }), d(e, g), Mt(e, Pe), O(e, xe, "true"), s ? L(e, () => dn(t)) : dn(t);
}, fn = (t, e) => {
  const { element: s, options: n, hasFade: o } = t;
  n.backdrop && !e && o && h(x, g) && !Ft(s) ? (We(), L(x, () => ln(t))) : ln(t, e);
}, lr = (t) => {
  const { target: e } = t, s = e && A(e, To), n = s && z(s), o = n && ie(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.toggle());
}, dr = ({ code: t, target: e }) => {
  const s = H(mo, $(e)), n = s && ie(s);
  if (!n)
    return;
  const { options: o } = n;
  o.keyboard && t === ms && h(s, g) && (n.relatedTarget = null, n.hide());
};
function hr(t) {
  const e = ie(this);
  if (!e || u.get(this))
    return;
  const { options: s, isStatic: n, modalDialog: o } = e, { backdrop: i } = s, { target: r } = t, c = $(this)?.getSelection()?.toString().length, a = o?.contains(r), l = r && A(r, rr);
  n && !a ? u.set(
    this,
    () => {
      d(this, yo), L(o, () => fr(e));
    },
    17
  ) : (l || !c && !n && !a && i) && (e.relatedTarget = l || null, e.hide(), t.preventDefault());
}
const fr = (t) => {
  const { element: e, modalDialog: s } = t, n = (y(s) ? le(s) : 0) + 17;
  m(e, yo), u.set(e, () => u.clear(e), n);
};
class So extends st {
  static selector = ir;
  static init = ar;
  static getInstance = ie;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.modalDialog = H(`.${U}-dialog`, n), this.triggers = [...et(To, $(n))].filter(
      (o) => z(o) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, B), this.relatedTarget = null, an(this, !0), this.update = this.update.bind(this);
  }
  get name() {
    return $s;
  }
  get defaults() {
    return cr;
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(e, g) || (be.relatedTarget = o || void 0, w(e, be), be.defaultPrevented))
      return;
    const c = Ft(e);
    if (c && c !== e) {
      const a = ie(c) || W(c, Ts);
      a && a.hide();
    }
    i ? (xt(x) ? Es(!0) : vo(e, n, !0), r = le(x), bo(), setTimeout(() => hn(this), r)) : (hn(this), c && h(x, g) && We());
  }
  hide(e) {
    const { element: s, hasFade: n, relatedTarget: o } = this;
    h(s, g) && (Qe.relatedTarget = o || void 0, w(s, Qe), !Qe.defaultPrevented && (m(s, g), O(s, Pe, "true"), Mt(s, xe), n ? L(s, () => fn(this, e)) : fn(this, e)));
  }
  update() {
    h(this.element, g) && Eo(this);
  }
  dispose() {
    an(this), this.hide(() => super.dispose());
  }
}
const ur = `.${Q}`, Cs = `[${K}="${Q}"]`, pr = `[${Le}="${Q}"]`, Fe = `${Q}-toggling`, gr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, re = (t) => W(t, Ts), mr = (t) => new Do(t), we = T(`show.bs.${Q}`), Ho = T(`shown.bs.${Q}`), Ze = T(`hide.bs.${Q}`), Po = T(`hidden.bs.${Q}`), vr = (t) => {
  const { element: e } = t, { clientHeight: s, scrollHeight: n } = dt(e);
  fo(e, s !== n);
}, un = (t, e) => {
  const s = e ? I : N;
  t.triggers.forEach((n) => s(n, M, br));
}, xo = (t, e) => {
  const s = e ? I : N, n = $(t.element);
  s(n, De, $r), s(n, M, wr);
}, pn = (t) => {
  const { element: e, options: s } = t;
  s.scroll || (vr(t), P(lt(e), { overflow: "hidden" })), d(e, Fe), d(e, g), P(e, { visibility: "visible" }), L(e, () => Tr(t));
}, gn = (t, e) => {
  const { element: s, options: n } = t, o = Ft(s);
  s.blur(), !o && n.backdrop && h(x, g) ? (We(), L(x, () => mn(t, e))) : mn(t, e);
}, br = (t) => {
  const e = A(t.target, Cs), s = e && z(e), n = s && re(s);
  n && (n.relatedTarget = e, n.toggle(), e && e.tagName === "A" && t.preventDefault());
}, wr = (t) => {
  const { target: e } = t, s = H(ys, $(e)), n = H(pr, s), o = s && re(s);
  if (!o)
    return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = A(e, Cs), l = $(s).getSelection();
  x.contains(e) && c === "static" || (!(l && l.toString().length) && (!s.contains(e) && c && (!a || r.includes(e)) || n && n.contains(e)) && (o.relatedTarget = n && n.contains(e) ? n : null, o.hide()), a && a.tagName === "A" && t.preventDefault());
}, $r = ({ code: t, target: e }) => {
  const s = H(ys, $(e)), n = s && re(s);
  n && n.options.keyboard && t === ms && (n.relatedTarget = null, n.hide());
}, Tr = (t) => {
  const { element: e } = t;
  m(e, Fe), Mt(e, Pe), O(e, xe, "true"), O(e, "role", "dialog"), w(e, Ho), xo(t, !0), at(e);
}, mn = (t, e) => {
  const { element: s, triggers: n } = t;
  O(s, Pe, "true"), Mt(s, xe), Mt(s, "role"), P(s, { visibility: "" });
  const o = we.relatedTarget || n.find($o);
  o && at(o), wo(s), w(s, Po), m(s, Fe), Ft(s) || xo(t), Oe(e) && e();
};
class Do extends st {
  static selector = ur;
  static init = mr;
  static getInstance = re;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this;
    this.triggers = [...et(Cs, $(n))].filter(
      (o) => z(o) === n
    ), this.relatedTarget = null, un(this, !0);
  }
  get name() {
    return Ts;
  }
  get defaults() {
    return gr;
  }
  toggle() {
    h(this.element, g) ? this.hide() : this.show();
  }
  show() {
    const { element: e, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(e, g) || (we.relatedTarget = n || void 0, Ho.relatedTarget = n || void 0, w(e, we), we.defaultPrevented))
      return;
    const i = Ft(e);
    if (i && i !== e) {
      const r = re(i) || W(i, $s);
      r && r.hide();
    }
    s.backdrop ? (xt(x) ? Es() : vo(e, !0), o = le(x), bo(), setTimeout(() => pn(this), o)) : (pn(this), i && h(x, g) && We());
  }
  hide(e) {
    const { element: s, relatedTarget: n } = this;
    h(s, g) && (Ze.relatedTarget = n || void 0, Po.relatedTarget = n || void 0, w(s, Ze), !Ze.defaultPrevented && (d(s, Fe), m(s, g), e ? gn(this, e) : L(s, () => gn(this, e))));
  }
  dispose() {
    un(this), this.hide(() => super.dispose());
  }
}
const kt = "popover", je = "Popover", ct = "tooltip", Ao = (t) => {
  const e = t === ct, s = e ? `${t}-inner` : `${t}-body`, n = e ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${ct}">${n + o + i}</div>`;
}, Io = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ds = (t, e) => {
  const s = /\b(top|bottom|start|end)+/, { element: n, tooltip: o, container: i, options: r, arrow: c } = t;
  if (!o)
    return;
  const a = { ...Io }, l = Tt(n);
  P(o, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const p = t.name === je, { offsetWidth: f, offsetHeight: b } = o, { clientWidth: R, clientHeight: V, offsetWidth: ft } = dt(n);
  let { placement: v } = r;
  const { clientWidth: X, offsetWidth: yt } = i, S = F(i, "position") === "fixed", q = Math.abs(S ? X - yt : R - ft), nt = l && S ? q : 0, Y = R - (l ? 0 : q) - 1, {
    width: _,
    height: C,
    left: ot,
    right: ze,
    top: k
  } = de(n, !0), { x: Ct, y: qt } = {
    x: ot,
    y: k
  };
  P(c, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let ut = 0, J = 0, ue = "", _t = "", St = "", Gt = "";
  const rt = c.offsetWidth || 0, Ht = c.offsetHeight || 0, jt = rt / 2;
  let pe = k - b - Ht < 0, ge = k + b + C + Ht >= V, Qt = ot - f - rt < nt, Zt = ot + f + _ + rt >= Y;
  const me = ["left", "right"], Ve = ["top", "bottom"];
  if (pe = me.includes(v) ? k + C / 2 - b / 2 - Ht < 0 : pe, ge = me.includes(v) ? k + b / 2 + C / 2 + Ht >= V : ge, Qt = Ve.includes(v) ? ot + _ / 2 - f / 2 < nt : Qt, Zt = Ve.includes(v) ? ot + f / 2 + _ / 2 >= Y : Zt, v = me.includes(v) && Qt && Zt ? "top" : v, v = v === "top" && pe ? "bottom" : v, v = v === "bottom" && ge ? "top" : v, v = v === "left" && Qt ? "right" : v, v = v === "right" && Zt ? "left" : v, o.className.includes(v) || (o.className = o.className.replace(s, a[v])), me.includes(v))
    v === "left" ? J = Ct - f - (p ? rt : 0) : J = Ct + _ + (p ? rt : 0), pe ? (ut = qt, _t = C / 2 - rt) : ge ? (ut = qt - b + C, _t = b - C / 2 - rt) : (ut = qt - b / 2 + C / 2, _t = b / 2 - Ht / 2);
  else if (Ve.includes(v))
    if (e && Me(n)) {
      const Xe = e.clientX, Ps = e.clientY;
      v === "top" ? ut = Ps - b - rt : ut = Ps + rt, e.clientX - f / 2 < nt ? (J = l ? q : 0, St = Xe - jt, St -= S && l ? q : 0) : e.clientX + f / 2 > Y ? (J = "auto", ue = l ? 0 : q, Gt = Y - Xe - jt, Gt += S && l ? q : 0) : (J = Xe - f / 2, St = f / 2 - jt);
    } else
      v === "top" ? ut = qt - b - (p ? Ht : 0) : ut = qt + C + (p ? Ht : 0), Qt ? (J = 0, St = Ct + _ / 2 - jt) : Zt ? (J = "auto", ue = 0, Gt = _ / 2 + Y - ze - jt) : (J = Ct - f / 2 + _ / 2, St = f / 2 - jt);
  P(o, {
    top: `${ut}px`,
    left: J === "auto" ? J : `${J}px`,
    right: ue !== "" ? `${ue}px` : ""
  }), y(c) && (_t !== "" && (c.style.top = `${_t}px`), St !== "" ? c.style.left = `${St}px` : Gt !== "" && (c.style.right = `${Gt}px`));
}, hs = {
  template: Ao(ct),
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
}, No = "data-original-title", Ot = "Tooltip", gt = (t, e, s) => {
  if (!(!y(t) || It(e) && !e.length))
    if (It(e)) {
      let n = e.trim();
      Oe(s) && (n = s(n));
      const i = new DOMParser().parseFromString(n, "text/html");
      t.append(...i.body.childNodes);
    } else
      y(e) ? t.append(e) : (wi(e) || bi(e) && e.every(D)) && t.append(...e);
}, yr = (t) => {
  const e = t.name === Ot, { id: s, element: n, options: o } = t, { title: i, placement: r, template: c, animation: a, customClass: l, sanitizeFn: p, dismissible: f, content: b, btnClose: R } = o, V = e ? ct : kt, ft = { ...Io };
  let v = [], X = [];
  Tt(n) && (ft.left = "end", ft.right = "start");
  const yt = `bs-${V}-${ft[r]}`;
  let Et;
  if (y(c))
    Et = c;
  else {
    const C = vt("div");
    gt(C, c, p), Et = C.firstChild;
  }
  t.tooltip = y(Et) ? Et.cloneNode(!0) : void 0;
  const { tooltip: S } = t;
  if (!S)
    return;
  O(S, "id", s), O(S, "role", ct);
  const q = e ? `${ct}-inner` : `${kt}-body`, nt = e ? null : H(`.${kt}-header`, S), Y = H(`.${q}`, S);
  t.arrow = H(`.${V}-arrow`, S);
  const { arrow: _ } = t;
  if (y(i))
    v = [i.cloneNode(!0)];
  else {
    const C = vt("div");
    gt(C, i, p), v = [...C.childNodes];
  }
  if (y(b))
    X = [b.cloneNode(!0)];
  else {
    const C = vt("div");
    gt(C, b, p), X = [...C.childNodes];
  }
  if (f)
    if (i)
      if (y(R))
        v = [...v, R.cloneNode(!0)];
      else {
        const C = vt("div");
        gt(C, R, p), v = [...v, C.firstChild];
      }
    else if (nt && nt.remove(), y(R))
      X = [...X, R.cloneNode(!0)];
    else {
      const C = vt("div");
      gt(C, R, p), X = [...X, C.firstChild];
    }
  e ? i && Y && gt(Y, i, p) : (i && nt && gt(nt, v, p), b && Y && gt(Y, X, p), t.btn = H(".btn-close", S) || void 0), d(S, "position-fixed"), d(_, "position-absolute"), h(S, V) || d(S, V), a && !h(S, B) && d(S, B), l && !h(S, l) && d(S, l), h(S, yt) || d(S, yt);
}, Er = (t) => {
  const e = ["HTML", "BODY"], s = [];
  let { parentNode: n } = t;
  for (; n && !e.includes(n.nodeName); )
    n = vi(n), Vn(n) || $i(n) || s.push(n);
  return s.find((o, i) => F(o, "position") !== "relative" && s.slice(i + 1).every((r) => F(r, "position") === "static") ? o : null) || lt(t);
}, Cr = `[${K}="${ct}"],[data-tip="${ct}"]`, ko = "title";
let vn = (t) => W(t, Ot);
const Sr = (t) => new Ss(t), Hr = (t) => {
  const { element: e, tooltip: s, container: n, offsetParent: o } = t;
  Mt(e, Rn), po(s, n === o ? n : void 0);
}, Pr = (t, e) => {
  const { element: s } = t;
  ee(t), Ee(s, No) && t.name === Ot && Mo(t), e && e();
}, Oo = (t, e) => {
  const s = e ? I : N, { element: n } = t;
  s($(n), Fn, t.handleTouch, G), Me(n) || [Ne, Ie].forEach((o) => {
    s(Ut(n), o, t.update, G);
  });
}, bn = (t) => {
  const { element: e } = t, s = T(`shown.bs.${oe(t.name)}`);
  Oo(t, !0), w(e, s), u.clear(e, "in");
}, wn = (t, e) => {
  const { element: s } = t, n = T(`hidden.bs.${oe(t.name)}`);
  Oo(t), Hr(t), w(s, n), Oe(e) && e(), u.clear(s, "out");
}, ee = (t, e) => {
  const s = e ? I : N, { element: n, options: o, btn: i } = t, { trigger: r } = o, a = !!(t.name !== Ot && o.dismissible);
  if (r?.includes("manual"))
    return;
  t.enabled = !!e;
  const l = r?.split(" "), p = Me(n);
  p && s(n, ei, t.update, G), l?.forEach((f) => {
    p || f === ti ? (s(n, Jo, t.show), s(n, Ae, t.show), a && i ? s(i, M, t.hide) : (s(n, gs, t.hide), s($(n), Fn, t.handleTouch, G))) : f === M ? s(n, f, a ? t.show : t.toggle) : f === us && (s(n, ps, t.show), a || s(n, Wn, t.hide), li && s(n, M, () => at(n)));
  });
}, $n = (t, e) => {
  const s = e ? I : N, { element: n, container: o, offsetParent: i } = t, { offsetHeight: r, scrollHeight: c } = o, a = A(n, `.${U}`), l = A(n, `.${Q}`);
  if (!Me(n)) {
    const p = Ut(n), b = r !== c && o === i ? o : p;
    s(b, Ie, t.update, G), s(b, Ne, t.update, G);
  }
  a && s(a, `hide.bs.${U}`, t.hide), l && s(l, `hide.bs.${Q}`, t.hide);
}, Mo = (t, e) => {
  const s = [No, ko], { element: n } = t;
  O(n, s[e ? 0 : 1], e || Rt(n, s[0]) || ""), Mt(n, s[e ? 1 : 0]);
};
class Ss extends st {
  static selector = Cr;
  static init = Sr;
  static getInstance = vn;
  static styleTip = ds;
  constructor(e, s) {
    super(e, s);
    const { element: n } = this, o = this.name === Ot, i = o ? ct : kt, r = o ? Ot : je;
    vn = (a) => W(a, r), this.enabled = !0, this.id = `${i}-${Xn(n, i)}`;
    const { options: c } = this;
    !c.title && o || !o && !c.content || ($t(hs, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), Ee(n, ko) && o && typeof c.title == "string" && Mo(this, c.title), this.container = Er(n), this.offsetParent = ["sticky", "fixed"].some(
      (a) => F(this.container, "position") === a
    ) ? this.container : $(this.element).body, yr(this), ee(this, !0));
  }
  get name() {
    return Ot;
  }
  get defaults() {
    return hs;
  }
  show(e) {
    const { options: s, tooltip: n, element: o, container: i, offsetParent: r, id: c } = this, { animation: a } = s, l = u.get(o, "out");
    u.clear(o, "out"), n && !l && !xt(n, i === r ? i : void 0) && u.set(
      o,
      () => {
        const p = T(`show.bs.${oe(this.name)}`);
        w(o, p), !p.defaultPrevented && (uo(n, i === r ? i : void 0), O(o, Rn, `#${c}`), this.update(e), $n(this, !0), h(n, g) || d(n, g), a ? L(n, () => bn(this)) : bn(this));
      },
      17,
      "in"
    );
  }
  hide(e, s) {
    const { options: n, tooltip: o, element: i, container: r, offsetParent: c } = this, { animation: a, delay: l } = n;
    u.clear(i, "in"), o && xt(o, r === c ? r : void 0) && u.set(
      i,
      () => {
        const p = T(`hide.bs.${oe(this.name)}`);
        w(i, p), !p.defaultPrevented && (this.update(e), m(o, g), $n(this), a ? L(o, () => wn(this, s)) : wn(this, s));
      },
      l + 17,
      "out"
    );
  }
  update(e) {
    ds(this, e);
  }
  toggle(e) {
    const { tooltip: s, container: n, offsetParent: o } = this;
    s && !xt(s, n === o ? n : void 0) ? this.show(e) : this.hide();
  }
  enable() {
    const { enabled: e } = this;
    e || (ee(this, !0), this.enabled = !e);
  }
  disable() {
    const { tooltip: e, container: s, offsetParent: n, options: o, enabled: i } = this, { animation: r } = o;
    i && (e && xt(e, s === n ? s : void 0) && r ? this.hide(void 0, () => ee(this)) : ee(this), this.enabled = !i);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  handleTouch({ target: e }) {
    const { tooltip: s, element: n } = this;
    s && s.contains(e) || e === n || e && n.contains(e) || this.hide();
  }
  dispose() {
    const { tooltip: e, container: s, offsetParent: n, options: o } = this, i = () => Pr(this, () => super.dispose());
    o.animation && e && xt(e, s === n ? s : void 0) ? (this.options.delay = 0, this.hide(void 0, i)) : i();
  }
}
const xr = `[${K}="${kt}"],[data-tip="${kt}"]`, Dr = $t({}, hs, {
  template: Ao(kt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Ar = (t) => W(t, je), Ir = (t) => new Lo(t);
class Lo extends Ss {
  static selector = xr;
  static init = Ir;
  static getInstance = Ar;
  static styleTip = ds;
  constructor(e, s) {
    super(e, s);
  }
  get name() {
    return je;
  }
  get defaults() {
    return Dr;
  }
  show() {
    super.show();
    const { options: e, btn: s } = this;
    e.dismissible && s && setTimeout(() => at(s), 17);
  }
}
const Nr = "scrollspy", Bo = "ScrollSpy", kr = '[data-bs-spy="scroll"]', Or = {
  offset: 10,
  target: null
}, Mr = (t) => W(t, Bo), Lr = (t) => new Wo(t), Tn = T(`activate.bs.${Nr}`), Br = (t) => {
  const { target: e, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: r } = t, { offset: c } = n, a = vs(s), l = e && bs("A", e), p = s && Rr(s);
  if (t.scrollTop = a ? s.scrollY : s.scrollTop, l && (o !== l.length || p !== i)) {
    let f, b, R;
    t.items = [], t.offsets = [], t.scrollHeight = p, t.maxScroll = t.scrollHeight - Wr(t), [...l].forEach((V) => {
      f = Rt(V, "href"), b = f && f.charAt(0) === "#" && f.slice(-1) !== "#" && H(f, $(r)), b && (t.items.push(V), R = de(b), t.offsets.push((a ? R.top + t.scrollTop : b.offsetTop) - c));
    }), t.itemsLength = t.items.length;
  }
}, Rr = (t) => y(t) ? t.scrollHeight : dt(t).scrollHeight, Wr = ({ element: t, scrollTarget: e }) => vs(e) ? e.innerHeight : de(t).height, Ro = (t) => {
  [...bs("A", t)].forEach((e) => {
    h(e, E) && m(e, E);
  });
}, yn = (t, e) => {
  const { target: s, element: n } = t;
  y(s) && Ro(s), t.activeItem = e, d(e, E);
  const o = [];
  let i = e;
  for (; i !== lt(n); )
    i = i.parentElement, (h(i, "nav") || h(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const c = r.previousElementSibling;
    c && !h(c, E) && d(c, E);
  }), Tn.relatedTarget = e, w(n, Tn);
}, En = (t, e) => {
  (e ? I : N)(t.scrollTarget, Ne, t.refresh, G);
};
class Wo extends st {
  static selector = kr;
  static init = Lr;
  static getInstance = Mr;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    this.target = H(o.target, $(n)), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : Ut(n), this.refresh = this.refresh.bind(this), En(this, !0), this.refresh());
  }
  get name() {
    return Bo;
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
      r !== a && yn(this, a);
      return;
    }
    const { offsets: c } = this;
    if (r && s < c[0] && c[0] > 0) {
      this.activeItem = null, y(e) && Ro(e);
      return;
    }
    i.forEach((a, l) => {
      r !== a && s >= c[l] && (typeof c[l + 1] > "u" || s < c[l + 1]) && yn(this, a);
    });
  }
  dispose() {
    En(this), super.dispose();
  }
}
const fe = "tab", Fo = "Tab", Cn = `[${K}="${fe}"]`, jo = (t) => W(t, Fo), Fr = (t) => new zo(t), Je = T(`show.bs.${fe}`), Sn = T(`shown.bs.${fe}`), ts = T(`hide.bs.${fe}`), Hn = T(`hidden.bs.${fe}`), ce = /* @__PURE__ */ new Map(), Pn = (t) => {
  const { tabContent: e, nav: s } = t;
  e && h(e, Lt) && (e.style.height = "", m(e, Lt)), s && u.clear(s);
}, xn = (t) => {
  const { element: e, tabContent: s, content: n, nav: o } = t, { tab: i } = y(o) && ce.get(o) || { tab: null };
  if (s && n && h(n, B)) {
    const { currentHeight: r, nextHeight: c } = ce.get(e) || { currentHeight: 0, nextHeight: 0 };
    r === c ? Pn(t) : setTimeout(() => {
      s.style.height = `${c}px`, Wt(s), L(s, () => Pn(t));
    }, 50);
  } else
    o && u.clear(o);
  Sn.relatedTarget = i, w(e, Sn);
}, Dn = (t) => {
  const { element: e, content: s, tabContent: n, nav: o } = t, { tab: i, content: r } = o && ce.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, B) && ([r, s].forEach((a) => {
    y(a) && d(a, "overflow-hidden");
  }), c = y(r) ? r.scrollHeight : 0), Je.relatedTarget = i, Hn.relatedTarget = e, w(e, Je), !Je.defaultPrevented) {
    if (s && d(s, E), r && m(r, E), n && s && h(s, B)) {
      const a = s.scrollHeight;
      ce.set(e, { currentHeight: c, nextHeight: a, tab: null, content: null }), d(n, Lt), n.style.height = `${c}px`, Wt(n), [r, s].forEach((l) => {
        l && m(l, "overflow-hidden");
      });
    }
    s && s && h(s, B) ? setTimeout(() => {
      d(s, g), L(s, () => {
        xn(t);
      });
    }, 1) : (s && d(s, g), xn(t)), i && w(i, Hn);
  }
}, An = (t) => {
  const { nav: e } = t;
  if (!y(e))
    return { tab: null, content: null };
  const s = bt(E, e);
  let n = null;
  s.length === 1 && !Bt.some((i) => h(s[0].parentElement, i)) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = y(n) ? z(n) : null;
  return { tab: n, content: o };
}, In = (t) => {
  if (!y(t))
    return null;
  const e = A(t, `.${Bt.join(",.")}`);
  return e ? H(`.${Bt[0]}-toggle`, e) : null;
}, Nn = (t, e) => {
  (e ? I : N)(t.element, M, jr);
}, jr = (t) => {
  const e = jo(t.target);
  e && (t.preventDefault(), e.show());
};
class zo extends st {
  static selector = Cn;
  static init = Fr;
  static getInstance = jo;
  constructor(e) {
    super(e);
    const { element: s } = this, n = z(s);
    if (!n)
      return;
    const o = A(s, ".nav"), i = A(n, ".tab-content");
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = In(s);
    const { tab: r } = An(this);
    if (o && !r) {
      const c = H(Cn, o), a = c && z(c);
      a && (d(c, E), d(a, g), d(a, E), O(s, Ye, "true"));
    }
    Nn(this, !0);
  }
  get name() {
    return Fo;
  }
  show() {
    const { element: e, content: s, nav: n, dropdown: o } = this;
    if (!(n && u.get(n)) && !h(e, E)) {
      const { tab: i, content: r } = An(this);
      if (n && ce.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), ts.relatedTarget = e, y(i) && w(i, ts), ts.defaultPrevented)
        return;
      d(e, E), O(e, Ye, "true");
      const c = y(i) && In(i);
      if (c && h(c, E) && m(c, E), n) {
        const a = () => {
          i && (m(i, E), O(i, Ye, "false")), o && !h(o, E) && d(o, E);
        };
        r && (h(r, B) || s && h(s, B)) ? u.set(n, a, 1) : a();
      }
      r && (m(r, g), h(r, B) ? L(r, () => Dn(this)) : Dn(this));
    }
  }
  dispose() {
    Nn(this), super.dispose();
  }
}
const Z = "toast", Vo = "Toast", zr = `.${Z}`, Vr = `[${Le}="${Z}"]`, Xo = `[${K}="${Z}"]`, Kt = "showing", Yo = "hide", Xr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Hs = (t) => W(t, Vo), Yr = (t) => new Uo(t), kn = T(`show.bs.${Z}`), Kr = T(`shown.bs.${Z}`), On = T(`hide.bs.${Z}`), Ur = T(`hidden.bs.${Z}`), Mn = (t) => {
  const { element: e, options: s } = t;
  m(e, Kt), u.clear(e, Kt), w(e, Kr), s.autohide && u.set(e, () => t.hide(), s.delay, Z);
}, Ln = (t) => {
  const { element: e } = t;
  m(e, Kt), m(e, g), d(e, Yo), u.clear(e, Z), w(e, Ur);
}, qr = (t) => {
  const { element: e, options: s } = t;
  d(e, Kt), s.animation ? (Wt(e), L(e, () => Ln(t))) : Ln(t);
}, _r = (t) => {
  const { element: e, options: s } = t;
  u.set(
    e,
    () => {
      m(e, Yo), Wt(e), d(e, g), d(e, Kt), s.animation ? L(e, () => Mn(t)) : Mn(t);
    },
    17,
    Kt
  );
}, Ko = (t, e) => {
  const s = e ? I : N, { element: n, triggers: o, dismiss: i, options: r } = t;
  i && s(i, M, t.hide), r.autohide && [ps, Wn, Ae, gs].forEach(
    (c) => s(n, c, Zr)
  ), o.length && o.forEach((c) => s(c, M, Qr));
}, Gr = (t) => {
  u.clear(t.element, Z), Ko(t);
}, Qr = (t) => {
  const { target: e } = t, s = e && A(e, Xo), n = s && z(s), o = n && Hs(n);
  o && (s && s.tagName === "A" && t.preventDefault(), o.relatedTarget = s, o.show());
}, Zr = (t) => {
  const e = t.target, s = Hs(e), { type: n, relatedTarget: o } = t;
  !s || e === o || e.contains(o) || ([Ae, ps].includes(n) ? u.clear(e, Z) : u.set(e, () => s.hide(), s.options.delay, Z));
};
class Uo extends st {
  static selector = zr;
  static init = Yr;
  static getInstance = Hs;
  constructor(e, s) {
    super(e, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, B) ? d(n, B) : !o.animation && h(n, B) && m(n, B), this.dismiss = H(Vr, n), this.triggers = [...et(Xo, $(n))].filter(
      (i) => z(i) === n
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), Ko(this, !0);
  }
  get name() {
    return Vo;
  }
  get defaults() {
    return Xr;
  }
  get isShown() {
    return h(this.element, g);
  }
  show() {
    const { element: e, isShown: s } = this;
    if (e && !s) {
      if (w(e, kn), kn.defaultPrevented)
        return;
      _r(this);
    }
  }
  hide() {
    const { element: e, isShown: s } = this;
    if (e && s) {
      if (w(e, On), On.defaultPrevented)
        return;
      qr(this);
    }
  }
  dispose() {
    const { element: e, isShown: s } = this;
    s && m(e, g), Gr(this), super.dispose();
  }
}
const qo = {
  Alert: Un,
  Button: _n,
  Carousel: Zn,
  Collapse: eo,
  Dropdown: ro,
  Modal: So,
  Offcanvas: Do,
  Popover: Lo,
  ScrollSpy: Wo,
  Tab: zo,
  Toast: Uo,
  Tooltip: Ss
}, Jr = (t, e) => {
  [...e].forEach((s) => t(s));
}, tc = (t, e) => {
  const s = At.getAllFor(t);
  s && [...s].forEach(([n, o]) => {
    e.contains(n) && o.dispose();
  });
}, Bn = (t) => {
  const e = t && t.nodeName ? t : document, s = [...bs("*", e)];
  gi(qo).forEach((n) => {
    const { init: o, selector: i } = n;
    Jr(
      o,
      s.filter((r) => Ti(r, i))
    );
  });
}, sc = (t) => {
  const e = t && t.nodeName ? t : document;
  ns(qo).forEach((s) => {
    tc(s, e);
  });
};
document.body ? Bn() : I(document, "DOMContentLoaded", () => Bn(), { once: !0 });
export {
  Un as Alert,
  _n as Button,
  Zn as Carousel,
  eo as Collapse,
  ro as Dropdown,
  ec as Listener,
  So as Modal,
  Do as Offcanvas,
  Lo as Popover,
  Wo as ScrollSpy,
  zo as Tab,
  Uo as Toast,
  Ss as Tooltip,
  Bn as initCallback,
  sc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
