const Cn = "aria-describedby", Ee = "aria-expanded", re = "aria-hidden", $e = "aria-modal", ys = "aria-pressed", Le = "aria-selected", rs = "focus", cs = "focusin", xn = "focusout", ye = "keydown", Mo = "keyup", P = "click", Sn = "mousedown", Bo = "hover", Ce = "mouseenter", as = "mouseleave", Ro = "pointerdown", Fo = "pointermove", Wo = "pointerup", ls = "touchstart", jo = "dragstart", zo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', qe = "ArrowDown", Ye = "ArrowUp", Cs = "ArrowLeft", xs = "ArrowRight", ds = "Escape", Ko = "transitionDuration", Vo = "transitionDelay", Oe = "transitionend", _n = "transitionProperty", qo = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Te = () => {
}, Yo = (e, t, s, n) => {
  const o = n || !1;
  e.addEventListener(
    t,
    s,
    o
  );
}, Uo = (e, t, s, n) => {
  const o = n || !1;
  e.removeEventListener(
    t,
    s,
    o
  );
}, X = (e, t) => e.getAttribute(t), Jt = (e, t) => e.hasAttribute(t), I = (e, t, s) => e.setAttribute(t, s), Pt = (e, t) => e.removeAttribute(t), d = (e, ...t) => {
  e.classList.add(...t);
}, v = (e, ...t) => {
  e.classList.remove(...t);
}, h = (e, t) => e.classList.contains(t), ce = (e) => e != null && typeof e == "object" || !1, D = (e) => ce(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, U = (e) => D(e) && e.nodeType === 1 || !1, jt = /* @__PURE__ */ new Map(), At = {
  data: jt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, s) => {
    U(e) && (jt.has(t) || jt.set(t, /* @__PURE__ */ new Map()), jt.get(t).set(e, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => jt.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!U(e) || !t) return null;
    const s = At.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (e, t) => {
    const s = At.getAllFor(t);
    !s || !U(e) || (s.delete(e), s.size === 0 && jt.delete(t));
  }
}, F = (e, t) => At.get(e, t), Ss = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), ae = (e) => typeof e == "string" || !1, An = (e) => ce(e) && e.constructor.name === "Window" || !1, Dn = (e) => D(e) && e.nodeType === 9 || !1, w = (e) => Dn(e) ? e : D(e) ? e.ownerDocument : An(e) ? e.document : globalThis.document, at = (e, ...t) => Object.assign(e, ...t), bt = (e) => {
  if (!e) return;
  if (ae(e))
    return w().createElement(e);
  const { tagName: t } = e, s = bt(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, at(s, n);
}, b = (e, t) => e.dispatchEvent(t), R = (e, t, s) => {
  const n = getComputedStyle(e, s), o = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(o);
}, Xo = (e) => {
  const t = R(e, _n), s = R(e, Vo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (e) => {
  const t = R(e, _n), s = R(e, Ko), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, S = (e, t) => {
  let s = 0;
  const n = new Event(Oe), o = le(e), i = Xo(e);
  if (o) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(Oe, r), s = 1);
    };
    e.addEventListener(Oe, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, lt = (e, t) => e.focus(t), _s = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, pe = (e) => Object.entries(e), Go = (e, t, s, n) => {
  if (!U(e)) return t;
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, c = {}, a = "title";
  return pe(i).forEach(([l, f]) => {
    const u = typeof l == "string" && l.includes(n) ? Ss(l.replace(n, "")) : Ss(l);
    c[u] = _s(f);
  }), pe(o).forEach(([l, f]) => {
    o[l] = _s(f);
  }), pe(t).forEach(([l, f]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? X(e, a) : f;
  }), r;
}, As = (e) => Object.keys(e), E = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return ce(t) && at(s, t), s;
}, te = { passive: !0 }, Ot = (e) => e.offsetHeight, _ = (e, t) => {
  pe(t).forEach(([s, n]) => {
    if (n && ae(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, at(e.style, o);
    }
  });
}, Ue = (e) => ce(e) && e.constructor.name === "Map" || !1, Qo = (e) => typeof e == "number" || !1, pt = /* @__PURE__ */ new Map(), g = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, s, n) => {
    U(e) && (n && n.length ? (pt.has(e) || pt.set(e, /* @__PURE__ */ new Map()), pt.get(e).set(n, setTimeout(t, s))) : pt.set(e, setTimeout(t, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!U(e)) return null;
    const s = pt.get(e);
    return t && s && Ue(s) ? s.get(t) || null : Qo(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!U(e)) return;
    const s = pt.get(e);
    t && t.length && Ue(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && pt.delete(e)) : (clearTimeout(s), pt.delete(e));
  }
}, ee = (e) => e.toLowerCase(), Y = (e, t) => (D(t) ? t : w()).querySelectorAll(e), Xe = /* @__PURE__ */ new Map();
function Zo(e) {
  const { shiftKey: t, code: s } = e, n = w(this), o = [
    ...Y(zo, this)
  ].filter(
    (c) => !Jt(c, "disabled") && !X(c, re)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const Jo = (e) => Xe.has(e) === !0, xe = (e) => {
  const t = Jo(e);
  (t ? Uo : Yo)(e, "keydown", Zo), t ? Xe.delete(e) : Xe.set(e, !0);
}, A = (e) => U(e) && "offsetWidth" in e || !1, It = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = e.getBoundingClientRect();
  let a = 1, l = 1;
  if (t && A(e)) {
    const { offsetWidth: f, offsetHeight: u } = e;
    a = f > 0 ? Math.round(s) / f : 1, l = u > 0 ? Math.round(n) / u : 1;
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
}, Nt = (e) => w(e).body, dt = (e) => w(e).documentElement, ti = (e) => {
  const t = An(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, Hn = (e) => D(e) && e.constructor.name === "ShadowRoot" || !1, ei = (e) => e.nodeName === "HTML" ? e : U(e) && e.assignedSlot || D(e) && e.parentNode || Hn(e) && e.host || dt(e), Pn = (e) => e ? Dn(e) ? e.defaultView : D(e) ? e?.ownerDocument?.defaultView : e : window, si = (e) => D(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, In = (e, t) => e.matches(t), ni = (e) => {
  if (!A(e)) return !1;
  const { width: t, height: s } = It(e), { offsetWidth: n, offsetHeight: o } = e;
  return Math.round(t) !== n || Math.round(s) !== o;
}, oi = (e, t, s) => {
  const n = A(t), o = It(
    e,
    n && ni(t)
  ), i = { x: 0, y: 0 };
  if (n) {
    const r = It(t, !0);
    i.x = r.x + t.clientLeft, i.y = r.y + t.clientTop;
  }
  return {
    x: o.left + s.x - i.x,
    y: o.top + s.y - i.y,
    width: o.width,
    height: o.height
  };
};
let Ds = 0, Hs = 0;
const zt = /* @__PURE__ */ new Map(), kn = (e, t) => {
  let s = t ? Ds : Hs;
  if (t) {
    const n = kn(e), o = zt.get(n) || /* @__PURE__ */ new Map();
    zt.has(n) || zt.set(n, o), Ue(o) && !o.has(t) ? (o.set(t, s), Ds += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    zt.has(n) ? s = zt.get(n) : (zt.set(n, s), Hs += 1);
  }
  return s;
}, ii = (e) => Array.isArray(e) || !1, Ln = (e) => {
  if (!D(e)) return !1;
  const { top: t, bottom: s } = It(e), { clientHeight: n } = dt(e);
  return t <= n && s >= 0;
}, ri = (e) => typeof e == "function" || !1, ci = (e) => ce(e) && e.constructor.name === "NodeList" || !1, Tt = (e) => dt(e).dir === "rtl", M = (e, t) => !e || !t ? null : e.closest(t) || M(e.getRootNode().host, t) || null, x = (e, t) => U(e) ? e : (U(t) ? t : w()).querySelector(e), hs = (e, t) => (D(t) ? t : w()).getElementsByTagName(
  e
), ai = (e, t) => w(t).getElementById(e), rt = (e, t) => (t && D(t) ? t : w()).getElementsByClassName(
  e
), Kt = {}, On = (e) => {
  const { type: t, currentTarget: s } = e;
  Kt[t].forEach((n, o) => {
    s === o && n.forEach((i, r) => {
      r.apply(o, [e]), typeof i == "object" && i.once && L(o, t, r, i);
    });
  });
}, k = (e, t, s, n) => {
  Kt[t] || (Kt[t] = /* @__PURE__ */ new Map());
  const o = Kt[t];
  o.has(e) || o.set(e, /* @__PURE__ */ new Map());
  const i = o.get(
    e
  ), { size: r } = i;
  i.set(s, n), r || e.addEventListener(
    t,
    On,
    n
  );
}, L = (e, t, s, n) => {
  const o = Kt[t], i = o && o.get(e), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(e), (!o || !o.size) && delete Kt[t], (!i || !i.size) && e.removeEventListener(
    t,
    On,
    c
  );
}, O = "fade", p = "show", Se = "data-bs-dismiss", _e = "alert", Nn = "Alert", nt = (e) => h(e, "disabled") || X(e, "disabled") === "true", li = "5.1.0", di = li;
class st {
  /**
   * @param target `Element` or selector string
   * @param config component instance options
   */
  constructor(t, s) {
    let n;
    try {
      if (U(t))
        n = t;
      else if (ae(t)) {
        if (n = x(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (i) {
      throw Error(`${this.name} Error: ${i.message}`);
    }
    const o = At.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && As(this.defaults).length ? Go(n, this.defaults, s || {}, "bs") : {}, At.set(n, this.name, this);
  }
  get version() {
    return di;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  _toggleEventListeners = () => {
  };
  dispose() {
    At.remove(this.element, this.name), As(this).forEach((t) => {
      delete this[t];
    });
  }
}
const hi = `.${_e}`, fi = `[${Se}="${_e}"]`, ui = (e) => F(e, Nn), gi = (e) => new Mn(e), Ps = E(
  `close.bs.${_e}`
), pi = E(
  `closed.bs.${_e}`
), Is = (e) => {
  const { element: t } = e;
  b(t, pi), e._toggleEventListeners(), e.dispose(), t.remove();
};
class Mn extends st {
  static selector = hi;
  static init = gi;
  static getInstance = ui;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = x(
      fi,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Nn;
  }
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = (t) => {
    const { element: s, dismiss: n } = this;
    !s || !h(s, p) || t && n && nt(n) || (b(s, Ps), !Ps.defaultPrevented && (v(s, p), h(s, O) ? S(s, () => Is(this)) : Is(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? k : L, { dismiss: n, close: o } = this;
    n && s(n, P, o);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const T = "active", ot = "data-bs-toggle", mi = "button", Bn = "Button", vi = `[${ot}="${mi}"]`, bi = (e) => F(e, Bn), wi = (e) => new Rn(e);
class Rn extends st {
  static selector = vi;
  static init = wi;
  static getInstance = bi;
  /**
   * @param target usually a `.btn` element
   */
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = h(s, T), I(s, ys, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Bn;
  }
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (t) => {
    t && t.preventDefault();
    const { element: s, isActive: n } = this;
    if (nt(s)) return;
    (n ? v : d)(s, T), I(s, ys, n ? "false" : "true"), this.isActive = h(s, T);
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? k : L)(this.element, P, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Ge = "data-bs-target", Dt = "carousel", Fn = "Carousel", ks = "data-bs-parent", Ei = "data-bs-container", z = (e) => {
  const t = [Ge, ks, Ei, "href"], s = w(e);
  return t.map((n) => {
    const o = X(e, n);
    return o ? n === ks ? M(e, o) : x(o, s) : null;
  }).filter((n) => n)[0];
}, de = `[data-bs-ride="${Dt}"]`, tt = `${Dt}-item`, Qe = "data-bs-slide-to", vt = "data-bs-slide", wt = "paused", Ls = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (e) => F(e, Fn), Ti = (e) => new jn(e);
let Zt = 0, me = 0, Ne = 0;
const Me = E(`slide.bs.${Dt}`), Ze = E(`slid.bs.${Dt}`), Os = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = Je(e), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[t], T), v(o[t], `${tt}-${c}`), v(o[t], `${tt}-${a}`), v(o[r], T), v(o[r], `${tt}-${a}`), b(n, Ze), g.clear(n, vt), e.cycle && !w(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function $i() {
  const e = ht(this);
  e && !e.isPaused && !g.get(this, wt) && d(this, wt);
}
function yi() {
  const e = ht(this);
  e && e.isPaused && !g.get(this, wt) && e.cycle();
}
function Ci(e) {
  e.preventDefault();
  const t = M(this, de) || z(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = +(X(this, Qe) || 0);
  this && !h(this, T) && !Number.isNaN(n) && s.to(n);
}
function xi(e) {
  e.preventDefault();
  const t = M(this, de) || z(this), s = t && ht(t);
  if (nt(this) || !s || s.isAnimating) return;
  const n = X(this, vt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Si = ({ code: e, target: t }) => {
  const s = w(t), [n] = [...Y(de, s)].filter((a) => Ln(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input|select/i.test(t.nodeName)) return;
  const i = Tt(n);
  e === (i ? xs : Cs) ? o.prev() : e === (i ? Cs : xs) && o.next();
};
function Ns(e) {
  const { target: t } = e, s = ht(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(t) || !s.controls.includes(t)) && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
}
function _i(e) {
  const { target: t } = e, s = ht(this);
  if (!s || s.isAnimating || s.isTouch) return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].every(
    (i) => i === t || i.contains(t)
  ) || (Zt = e.pageX, this.contains(t) && (s.isTouch = !0, Wn(s, !0)));
}
const Ai = (e) => {
  me = e.pageX;
}, Di = (e) => {
  const { target: t } = e, s = w(t), n = [...Y(de, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n) return;
  const { element: o, index: i } = n, r = Tt(o);
  Ne = e.pageX, n.isTouch = !1, Wn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Zt - Ne) > 120 && (me < Zt ? n.to(i + (r ? -1 : 1)) : me > Zt && n.to(i + (r ? 1 : -1))), Zt = 0, me = 0, Ne = 0;
}, Be = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => v(n, T)), e.indicators[t] && d(s[t], T);
}, Wn = (e, t) => {
  const { element: s } = e, n = t ? k : L;
  n(
    w(s),
    Fo,
    Ai,
    te
  ), n(
    w(s),
    Wo,
    Di,
    te
  );
}, Je = (e) => {
  const { slides: t, element: s } = e, n = x(
    `.${tt}.${T}`,
    s
  );
  return n ? [...t].indexOf(n) : -1;
};
class jn extends st {
  static selector = de;
  static init = Ti;
  static getInstance = ht;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.direction = Tt(n) ? "right" : "left", this.isTouch = !1, this.slides = rt(tt, n);
    const { slides: o } = this;
    if (o.length < 2) return;
    const i = Je(this), r = [...o].find(
      (l) => In(l, `.${tt}-next`)
    );
    this.index = i;
    const c = w(n);
    this.controls = [
      ...Y(`[${vt}]`, n),
      ...Y(
        `[${vt}][${Ge}="#${n.id}"]`,
        c
      )
    ].filter((l, f, u) => f === u.indexOf(l)), this.indicator = x(
      `.${Dt}-indicators`,
      n
    ), this.indicators = [
      ...this.indicator ? Y(`[${Qe}]`, this.indicator) : [],
      ...Y(
        `[${Qe}][${Ge}="#${n.id}"]`,
        c
      )
    ].filter((l, f, u) => f === u.indexOf(l));
    const { options: a } = this;
    this.options.interval = a.interval === !0 ? Ls.interval : a.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, d(o[0], T), this.indicators.length && Be(this, 0)), this.indicators.length && Be(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Fn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ls;
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
    return x(
      `.${tt}-next,.${tt}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: t, options: s, isPaused: n, index: o } = this;
    g.clear(t, Dt), n && (g.clear(t, wt), v(t, wt)), g.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && Ln(t) && this.to(o + 1);
      },
      s.interval,
      Dt
    );
  }
  pause() {
    const { element: t, options: s } = this;
    this.isPaused || !s.interval || (d(t, wt), g.set(
      t,
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
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(t) {
    const { element: s, slides: n, options: o } = this, i = Je(this), r = Tt(s);
    let c = t;
    if (this.isAnimating || i === c || g.get(s, vt)) return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", f = a === "left" ? "start" : "end", u = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    at(Me, u), at(Ze, u), b(s, Me), !Me.defaultPrevented && (this.index = c, Be(this, c), le(n[c]) && h(s, "slide") ? g.set(
      s,
      () => {
        d(n[c], `${tt}-${l}`), Ot(n[c]), d(n[c], `${tt}-${f}`), d(n[i], `${tt}-${f}`), S(
          n[c],
          () => this.slides && this.slides.length && Os(this)
        );
      },
      0,
      vt
    ) : (d(n[c], T), v(n[i], T), g.set(
      s,
      () => {
        g.clear(s, vt), s && o.interval && !this.isPaused && this.cycle(), b(s, Ze);
      },
      0,
      vt
    )));
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (t) => {
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: c, pause: a, interval: l, keyboard: f } = n, u = t ? k : L;
    a && l && (u(s, Ce, $i), u(s, as, yi)), c && o.length > 2 && (u(
      s,
      Ro,
      _i,
      te
    ), u(s, ls, Ns, { passive: !1 }), u(s, jo, Ns, { passive: !1 })), i.length && i.forEach(($) => {
      u($, P, xi);
    }), r.length && r.forEach(($) => {
      u($, P, Ci);
    }), f && u(w(s), ye, Si);
  };
  dispose() {
    const { isAnimating: t } = this, s = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose(), s.isAnimating && S(s.slides[s.index], () => {
      Os(s);
    });
  }
}
const kt = "collapsing", j = "collapse", zn = "Collapse", Hi = `.${j}`, Kn = `[${ot}="${j}"]`, Pi = { parent: null }, ve = (e) => F(e, zn), Ii = (e) => new Vn(e), Ms = E(`show.bs.${j}`), ki = E(`shown.bs.${j}`), Bs = E(`hide.bs.${j}`), Li = E(`hidden.bs.${j}`), Oi = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Ms), Ms.defaultPrevented || (g.set(t, Te, 17), s && g.set(s, Te, 17), d(t, kt), v(t, j), _(t, { height: `${t.scrollHeight}px` }), S(t, () => {
    g.clear(t), s && g.clear(s), n.forEach((o) => I(o, Ee, "true")), v(t, kt), d(t, j), d(t, p), _(t, { height: "" }), b(t, ki);
  }));
}, Rs = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Bs), Bs.defaultPrevented || (g.set(t, Te, 17), s && g.set(s, Te, 17), _(t, { height: `${t.scrollHeight}px` }), v(t, j), v(t, p), d(t, kt), Ot(t), _(t, { height: "0px" }), S(t, () => {
    g.clear(t), s && g.clear(s), n.forEach((o) => I(o, Ee, "false")), v(t, kt), d(t, j), _(t, { height: "" }), b(t, Li);
  }));
}, Ni = (e) => {
  const { target: t } = e, s = t && M(t, Kn), n = s && z(s), o = n && ve(n);
  s && nt(s) || o && (o.toggle(), s?.tagName === "A" && e.preventDefault());
};
class Vn extends st {
  static selector = Hi;
  static init = Ii;
  static getInstance = ve;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...Y(Kn, i)].filter(
      (r) => z(r) === n
    ), this.parent = A(o.parent) ? o.parent : ae(o.parent) ? z(n) || x(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return zn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Pi;
  }
  hide() {
    const { triggers: t, element: s } = this;
    g.get(s) || (Rs(this), t.length && t.forEach((n) => d(n, `${j}d`)));
  }
  show() {
    const { element: t, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [
      ...Y(`.${j}.${p}`, s)
    ].find((r) => ve(r)), i = o && ve(o)), (!s || !g.get(s)) && !g.get(t) && (i && o !== t && (Rs(i), i.triggers.forEach((r) => {
      d(r, `${j}d`);
    })), Oi(this), n.length && n.forEach((r) => v(r, `${j}d`)));
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? k : L, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, P, Ni);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Mi = (e) => e != null && typeof e == "object" || !1, Bi = (e) => Mi(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, Fs = (e) => Bi(e) && e.nodeType === 1 || !1, Ri = (e) => typeof e == "function" || !1, Fi = "1.0.2", Ws = "PositionObserver Error";
class fs {
  entries;
  static version = Fi;
  _tick;
  _root;
  _callback;
  /**
   * The constructor takes two arguments, a `callback`, which is called
   * whenever the position of an observed element changes and an `options` object.
   * The callback function should take an array of `PositionObserverEntry` objects
   * as its only argument, but it's not required.
   *
   * @param callback the callback that applies to all targets of this observer
   * @param options the options of this observer
   */
  constructor(t, s) {
    if (!Ri(t))
      throw new Error(`${Ws}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._callback = t, this._root = Fs(s?.root) ? s.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   *
   * @param target an `Element` target
   */
  observe = (t) => {
    if (!Fs(t))
      throw new Error(
        `${Ws}: ${t} is not an instance of Element.`
      );
    this._root.contains(t) && this._new(t).then((s) => {
      s && !this.getEntry(t) && this.entries.set(t, s), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
    });
  };
  /**
   * Stop observing the position of the specified element.
   *
   * @param target an `HTMLElement` target
   */
  unobserve = (t) => {
    this.entries.has(t) && this.entries.delete(t);
  };
  /**
   * Private method responsible for all the heavy duty,
   * the observer's runtime.
   */
  _runCallback = () => {
    if (!this.entries.size) return;
    const t = new Promise((s) => {
      const n = [];
      this.entries.forEach(
        ({ target: o, boundingClientRect: i }) => {
          this._root.contains(o) && this._new(o).then(({ boundingClientRect: r, isIntersecting: c }) => {
            if (!c) return;
            const { left: a, top: l, bottom: f, right: u } = r;
            if (i.top !== l || i.left !== a || i.right !== u || i.bottom !== f) {
              const $ = { target: o, boundingClientRect: r };
              this.entries.set(o, $), n.push($);
            }
          });
        }
      ), s(n);
    });
    this._tick = requestAnimationFrame(async () => {
      const s = await t;
      s.length && this._callback(s, this), this._runCallback();
    });
  };
  /**
   * Calculate the target bounding box and determine
   * the value of `isVisible`.
   *
   * @param target an `Element` target
   */
  _new = (t) => new Promise((s) => {
    new IntersectionObserver(
      ([n], o) => {
        o.disconnect(), s(n);
      }
    ).observe(t);
  });
  /**
   * Find the entry for a given target.
   *
   * @param target an `HTMLElement` target
   */
  getEntry = (t) => this.entries.get(t);
  /**
   * Immediately stop observing all elements.
   */
  disconnect = () => {
    cancelAnimationFrame(this._tick), this.entries.clear(), this._tick = 0;
  };
}
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], qn = "Dropdown", Yn = "dropdown-menu", Un = (e) => {
  const t = M(e, "A");
  return e.tagName === "A" && Jt(e, "href") && X(e, "href")?.slice(-1) === "#" || t && Jt(t, "href") && X(t, "href")?.slice(-1) === "#";
}, [et, ts, es, ss] = Lt, Wi = `[${ot}="${et}"]`, se = (e) => F(e, qn), ji = (e) => new Gn(e), zi = `${Yn}-end`, js = [et, ts], zs = [es, ss], Ks = ["A", "BUTTON"], Ki = {
  offset: 5,
  display: "dynamic"
}, Re = E(
  `show.bs.${et}`
), Vs = E(
  `shown.bs.${et}`
), Fe = E(
  `hide.bs.${et}`
), qs = E(`hidden.bs.${et}`), Xn = E(`updated.bs.${et}`), Ys = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (R(s, "position") !== "static") {
    const r = Tt(t), c = h(s, zi);
    ["margin", "top", "bottom", "left", "right"].forEach((B) => {
      const Ct = {};
      Ct[B] = "", _(s, Ct);
    });
    let l = Lt.find(
      (B) => h(n, B)
    ) || et;
    const f = {
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
    }, { offsetWidth: $, offsetHeight: N } = s, { clientWidth: q, clientHeight: Z } = dt(t), {
      left: m,
      top: K,
      width: $t,
      height: yt
    } = It(t), C = m - $ - i < 0, ft = m + $ + $t + i >= q, it = K + N + i >= Z, J = K + N + yt + i >= Z, Bt = K - N - i < 0, y = (!r && c || r && !c) && m + $t - $ < 0, W = (r && c || !r && !c) && m + $ >= q;
    if (zs.includes(l) && C && ft && (l = et), l === es && (r ? ft : C) && (l = ss), l === ss && (r ? C : ft) && (l = es), l === ts && Bt && !J && (l = et), l === et && J && !Bt && (l = ts), zs.includes(l) && it && at(u[l], {
      top: "auto",
      bottom: 0
    }), js.includes(l) && (y || W)) {
      let B = { left: "auto", right: "auto" };
      !y && W && !r && (B = { left: "auto", right: 0 }), y && !W && r && (B = { left: 0, right: "auto" }), B && at(u[l], B);
    }
    const Rt = f[l];
    _(s, {
      ...u[l],
      margin: `${Rt.map((B) => B && `${B}px`).join(" ")}`
    }), js.includes(l) && c && c && _(s, u[!r && y || r && W ? "menuStart" : "menuEnd"]), b(n, Xn);
  }
}, Vi = (e) => Array.from(e.children).map((t) => {
  if (t && Ks.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && Ks.includes(s.tagName) ? s : null;
}).filter((t) => t), Us = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? k : L, i = w(t);
  o(i, P, Xs), o(i, rs, Xs), o(i, ye, Yi), o(i, Mo, Ui), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
}, us = (e) => {
  const t = [...Lt, "btn-group", "input-group"].map(
    (s) => rt(`${s} ${p}`, w(e))
  ).find((s) => s.length);
  if (t && t.length)
    return [...t[0].children].find(
      (s) => Lt.some((n) => n === X(s, ot))
    );
}, Xs = (e) => {
  const { target: t, type: s } = e;
  if (!A(t)) return;
  const n = us(t), o = n && se(n);
  if (!o) return;
  const { parentElement: i, menu: r } = o, c = i && i.contains(t) && (t.tagName === "form" || M(t, "form") !== null);
  [P, Sn].includes(s) && Un(t) && e.preventDefault(), !c && s !== rs && t !== n && t !== r && o.hide();
};
function qi(e) {
  const t = se(this);
  nt(this) || t && (e.stopPropagation(), t.toggle(), Un(this) && e.preventDefault());
}
const Yi = (e) => {
  [qe, Ye].includes(e.code) && e.preventDefault();
};
function Ui(e) {
  const { code: t } = e, s = us(this);
  if (!s) return;
  const n = se(s), { activeElement: o } = w(s);
  if (!n || !o) return;
  const { menu: i, open: r } = n, c = Vi(i);
  if (c && c.length && [qe, Ye].includes(t)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : t === Ye ? a = a > 1 ? a - 1 : 0 : t === qe && (a = a < c.length - 1 ? a + 1 : a), c[a] && lt(c[a]);
  }
  ds === t && r && (n.toggle(), lt(s));
}
class Gn extends st {
  static selector = Wi;
  static init = ji;
  static getInstance = se;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = rt(
      Yn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new fs(
      () => Ys(this)
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return qn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ki;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (s) return;
    const i = us(t), r = i && se(i);
    r && r.hide(), [Re, Vs, Xn].forEach(
      (c) => {
        c.relatedTarget = t;
      }
    ), b(o, Re), !Re.defaultPrevented && (d(n, p), d(o, p), I(t, Ee, "true"), Ys(this), this.open = !s, lt(t), Us(this), b(o, Vs));
  }
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([Fe, qs].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, Fe), !Fe.defaultPrevented && (v(n, p), v(o, p), I(t, Ee, "false"), this.open = !s, Us(this), b(o, qs)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    (t ? k : L)(this.element, P, qi);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const V = "modal", gs = "Modal", ps = "Offcanvas", Xi = "fixed-top", Gi = "fixed-bottom", Qn = "sticky-top", Zn = "position-sticky", Jn = (e) => [
  ...rt(Xi, e),
  ...rt(Gi, e),
  ...rt(Qn, e),
  ...rt(Zn, e),
  ...rt("is-fixed", e)
], Qi = (e) => {
  const t = Nt(e);
  _(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = Jn(t);
  s.length && s.forEach((n) => {
    _(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, to = (e) => {
  const { clientWidth: t } = dt(e), { innerWidth: s } = Pn(e);
  return Math.abs(s - t);
}, eo = (e, t) => {
  const s = Nt(e), n = parseInt(R(s, "paddingRight"), 10), i = R(s, "overflow") === "hidden" && n ? 0 : to(e), r = Jn(s);
  t && (_(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = R(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [Qn, Zn].some((l) => h(c, l))) {
      const l = R(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, G = "offcanvas", Et = bt({
  tagName: "div",
  className: "popup-container"
}), so = (e, t) => {
  const s = D(t) && t.nodeName === "BODY", n = D(t) && !s ? t : Et, o = s ? t : Nt(e);
  D(e) && (n === Et && o.append(Et), n.append(e));
}, no = (e, t) => {
  const s = D(t) && t.nodeName === "BODY", n = D(t) && !s ? t : Et;
  D(e) && (e.remove(), n === Et && !Et.children.length && Et.remove());
}, ms = (e, t) => {
  const s = D(t) && t.nodeName !== "BODY" ? t : Et;
  return D(e) && s.contains(e);
}, oo = "backdrop", Gs = `${V}-${oo}`, Qs = `${G}-${oo}`, io = `.${V}.${p}`, vs = `.${G}.${p}`, H = bt("div"), Mt = (e) => x(
  `${io},${vs}`,
  w(e)
), bs = (e) => {
  const t = e ? Gs : Qs;
  [Gs, Qs].forEach((s) => {
    v(H, s);
  }), d(H, t);
}, ro = (e, t, s) => {
  bs(s), so(H, Nt(e)), t && d(H, O);
}, co = () => {
  h(H, p) || (d(H, p), Ot(H));
}, Ae = () => {
  v(H, p);
}, ao = (e) => {
  Mt(e) || (v(H, O), no(H, Nt(e)), Qi(e));
}, lo = (e) => A(e) && R(e, "visibility") !== "hidden" && e.offsetParent !== null, Zi = `.${V}`, Ji = `[${ot}="${V}"]`, tr = `[${Se}="${V}"]`, ho = `${V}-static`, er = {
  backdrop: !0,
  keyboard: !0
}, ne = (e) => F(e, gs), sr = (e) => new go(e), be = E(
  `show.bs.${V}`
), Zs = E(
  `shown.bs.${V}`
), We = E(
  `hide.bs.${V}`
), Js = E(
  `hidden.bs.${V}`
), fo = (e) => {
  const { element: t } = e, s = to(t), { clientHeight: n, scrollHeight: o } = dt(t), { clientHeight: i, scrollHeight: r } = t, c = i !== r;
  if (!c && s) {
    const l = { [Tt(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    _(t, l);
  }
  eo(t, c || n !== o);
}, uo = (e, t) => {
  const s = t ? k : L, { element: n } = e;
  s(n, P, ir), s(w(n), ye, or), t ? e._observer.observe(n) : e._observer.disconnect();
}, tn = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  ao(s), _(s, { paddingRight: "", display: "" }), uo(e);
  const o = be.relatedTarget || t.find(lo);
  o && lt(o), Js.relatedTarget = n || void 0, b(s, Js), xe(s);
}, en = (e) => {
  const { element: t, relatedTarget: s } = e;
  lt(t), uo(e, !0), Zs.relatedTarget = s || void 0, b(t, Zs), xe(t);
}, sn = (e) => {
  const { element: t, hasFade: s } = e;
  _(t, { display: "block" }), fo(e), Mt(t) || _(Nt(t), { overflow: "hidden" }), d(t, p), Pt(t, re), I(t, $e, "true"), s ? S(t, () => en(e)) : en(e);
}, nn = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && h(H, p) && !Mt(t) ? (Ae(), S(H, () => tn(e))) : tn(e);
};
function nr(e) {
  const t = z(this), s = t && ne(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.toggle());
}
const or = ({ code: e, target: t }) => {
  const s = x(io, w(t)), n = s && ne(s);
  if (!n) return;
  const { options: o } = n;
  o.keyboard && e === ds && h(s, p) && (n.relatedTarget = null, n.hide());
}, ir = (e) => {
  const { currentTarget: t } = e, s = t && ne(t);
  if (!s || !t || g.get(t)) return;
  const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: c } = e, a = w(t)?.getSelection()?.toString().length, l = i.contains(c), f = c && M(c, tr);
  o && !l ? g.set(
    t,
    () => {
      d(t, ho), S(i, () => rr(s));
    },
    17
  ) : (f || !a && !o && !l && r) && (s.relatedTarget = f || null, s.hide(), e.preventDefault());
}, rr = (e) => {
  const { element: t, modalDialog: s } = e, n = (le(s) || 0) + 17;
  v(t, ho), g.set(t, () => g.clear(t), n);
};
class go extends st {
  static selector = Zi;
  static init = sr;
  static getInstance = ne;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = x(
      `.${V}-dialog`,
      n
    );
    o && (this.modalDialog = o, this.triggers = [
      ...Y(
        Ji,
        w(n)
      )
    ].filter(
      (i) => z(i) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, O), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return gs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return er;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (h(t, p) || (be.relatedTarget = o || void 0, b(t, be), be.defaultPrevented)) return;
    const c = Mt(t);
    if (c && c !== t) {
      const a = ne(c) || F(
        c,
        ps
      );
      a && a.hide();
    }
    i ? (ms(H) ? bs(!0) : ro(t, n, !0), r = le(H), co(), setTimeout(() => sn(this), r)) : (sn(this), c && h(H, p) && Ae());
  }
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    h(t, p) && (We.relatedTarget = n || void 0, b(t, We), !We.defaultPrevented && (v(t, p), I(t, re, "true"), Pt(t, $e), s ? S(t, () => nn(this)) : nn(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    h(this.element, p) && fo(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? k : L, { triggers: n } = this;
    n.length && n.forEach((o) => {
      s(o, P, nr);
    });
  };
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? S(s, o) : o();
  }
}
const cr = `.${G}`, po = `[${ot}="${G}"]`, ar = `[${Se}="${G}"]`, De = `${G}-toggling`, lr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, oe = (e) => F(e, ps), dr = (e) => new wo(e), we = E(`show.bs.${G}`), mo = E(`shown.bs.${G}`), je = E(`hide.bs.${G}`), vo = E(`hidden.bs.${G}`), hr = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = dt(t);
  eo(t, s !== n);
}, bo = (e, t) => {
  const s = t ? k : L, n = w(e.element);
  s(n, ye, pr), s(n, P, gr);
}, on = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (hr(e), _(Nt(t), { overflow: "hidden" })), d(t, De), d(t, p), _(t, { visibility: "visible" }), S(t, () => mr(e));
}, fr = (e) => {
  const { element: t, options: s } = e, n = Mt(t);
  t.blur(), !n && s.backdrop && h(H, p) && Ae(), S(t, () => vr(e));
};
function ur(e) {
  const t = z(this), s = t && oe(t);
  nt(this) || s && (s.relatedTarget = this, s.toggle(), this.tagName === "A" && e.preventDefault());
}
const gr = (e) => {
  const { target: t } = e, s = x(
    vs,
    w(t)
  );
  if (!s) return;
  const n = x(
    ar,
    s
  ), o = oe(s);
  if (!o) return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = M(t, po), l = w(s).getSelection();
  H.contains(t) && c === "static" || (!(l && l.toString().length) && (!s.contains(t) && c && (!a || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : void 0, o.hide()), a && a.tagName === "A" && e.preventDefault());
}, pr = ({ code: e, target: t }) => {
  const s = x(
    vs,
    w(t)
  ), n = s && oe(s);
  n && n.options.keyboard && e === ds && (n.relatedTarget = void 0, n.hide());
}, mr = (e) => {
  const { element: t } = e;
  v(t, De), Pt(t, re), I(t, $e, "true"), I(t, "role", "dialog"), b(t, mo), bo(e, !0), lt(t), xe(t);
}, vr = (e) => {
  const { element: t, triggers: s } = e;
  I(t, re, "true"), Pt(t, $e), Pt(t, "role"), _(t, { visibility: "" });
  const n = we.relatedTarget || s.find(lo);
  n && lt(n), ao(t), b(t, vo), v(t, De), xe(t), Mt(t) || bo(e);
};
class wo extends st {
  static selector = cr;
  static init = dr;
  static getInstance = oe;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.triggers = [
      ...Y(
        po,
        w(n)
      )
    ].filter(
      (o) => z(o) === n
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ps;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return lr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(t, p) || (we.relatedTarget = n || void 0, mo.relatedTarget = n || void 0, b(t, we), we.defaultPrevented)) return;
    const i = Mt(t);
    if (i && i !== t) {
      const r = oe(i) || F(
        i,
        gs
      );
      r && r.hide();
    }
    s.backdrop ? (ms(H) ? bs() : ro(t, !0), o = le(H), co(), setTimeout(() => on(this), o)) : (on(this), i && h(H, p) && Ae());
  }
  hide() {
    const { element: t, relatedTarget: s } = this;
    h(t, p) && (je.relatedTarget = s || void 0, vo.relatedTarget = s || void 0, b(t, je), !je.defaultPrevented && (d(t, De), v(t, p), fr(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? k : L;
    this.triggers.forEach((n) => {
      s(n, P, ur);
    });
  };
  dispose() {
    const { element: t } = this, s = h(t, p), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? S(t, n) : n();
  }
}
const Ht = "popover", ws = "Popover", ct = "tooltip", Eo = (e) => {
  const t = e === ct, s = t ? `${e}-inner` : `${e}-body`, n = t ? "" : `<h3 class="${e}-header"></h3>`, o = `<div class="${e}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${e}" role="${ct}">${n + o + i}</div>`;
}, To = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ns = (e) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, offsetParent: i, options: r, arrow: c } = e;
    if (!n) return;
    const a = Tt(s), { x: l, y: f } = ti(i);
    _(n, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: u, offsetHeight: $ } = n, { clientWidth: N, clientHeight: q, offsetWidth: Z } = dt(s);
    let { placement: m } = r;
    const { clientWidth: K, offsetWidth: $t } = o, C = R(
      o,
      "position"
    ) === "fixed", ft = Math.abs(C ? K - $t : N - Z), it = a && C ? ft : 0, J = N - (a ? 0 : ft) - 1, Bt = e._observer.getEntry(s), {
      width: y,
      height: W,
      left: Rt,
      right: B,
      top: Ct
    } = Bt?.boundingClientRect || It(s, !0), {
      x: fe,
      y: Ft
    } = oi(
      s,
      i,
      { x: l, y: f }
    );
    _(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let xt = 0, qt = "", ut = 0, He = "", Wt = "", ue = "", Pe = "";
    const St = c.offsetWidth || 0, gt = c.offsetHeight || 0, Ie = St / 2;
    let Yt = Ct - $ - gt < 0, Ut = Ct + $ + W + gt >= q, Xt = Rt - u - St < it, Gt = Rt + u + y + St >= J;
    const ge = ["left", "right"], ke = ["top", "bottom"];
    Yt = ge.includes(m) ? Ct + W / 2 - $ / 2 - gt < 0 : Yt, Ut = ge.includes(m) ? Ct + $ / 2 + W / 2 + gt >= q : Ut, Xt = ke.includes(m) ? Rt + y / 2 - u / 2 < it : Xt, Gt = ke.includes(m) ? Rt + u / 2 + y / 2 >= J : Gt, m = ge.includes(m) && Xt && Gt ? "top" : m, m = m === "top" && Yt ? "bottom" : m, m = m === "bottom" && Ut ? "top" : m, m = m === "left" && Xt ? "right" : m, m = m === "right" && Gt ? "left" : m, n.className.includes(m) || (n.className = n.className.replace(
      t,
      To[m]
    )), ge.includes(m) ? (m === "left" ? ut = fe - u - St : ut = fe + y + St, Yt && Ut ? (xt = 0, qt = 0, Wt = Ft + W / 2 - gt / 2) : Yt ? (xt = Ft, qt = "", Wt = W / 2 - St) : Ut ? (xt = Ft - $ + W, qt = "", Wt = $ - W / 2 - St) : (xt = Ft - $ / 2 + W / 2, Wt = $ / 2 - gt / 2)) : ke.includes(m) && (m === "top" ? xt = Ft - $ - gt : xt = Ft + W + gt, Xt ? (ut = 0, ue = fe + y / 2 - Ie) : Gt ? (ut = "auto", He = 0, Pe = y / 2 + J - B - Ie) : (ut = fe - u / 2 + y / 2, ue = u / 2 - Ie)), _(n, {
      top: `${xt}px`,
      bottom: qt === "" ? "" : `${qt}px`,
      left: ut === "auto" ? ut : `${ut}px`,
      right: He !== "" ? `${He}px` : ""
    }), A(c) && (Wt !== "" && (c.style.top = `${Wt}px`), ue !== "" ? c.style.left = `${ue}px` : Pe !== "" && (c.style.right = `${Pe}px`));
    const No = E(
      `updated.bs.${ee(e.name)}`
    );
    b(s, No);
  });
}, os = {
  template: Eo(ct),
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
}, $o = "data-original-title", _t = "Tooltip", mt = (e, t, s) => {
  if (ae(t) && t.length) {
    let n = t.trim();
    ri(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else A(t) ? e.append(t) : (ci(t) || ii(t) && t.every(D)) && e.append(...t);
}, br = (e) => {
  const t = e.name === _t, { id: s, element: n, options: o } = e, {
    title: i,
    placement: r,
    template: c,
    animation: a,
    customClass: l,
    sanitizeFn: f,
    dismissible: u,
    content: $,
    btnClose: N
  } = o, q = t ? ct : Ht, Z = { ...To };
  let m = [], K = [];
  Tt(n) && (Z.left = "end", Z.right = "start");
  const $t = `bs-${q}-${Z[r]}`;
  let yt;
  if (A(c))
    yt = c;
  else {
    const y = bt("div");
    mt(y, c, f), yt = y.firstChild;
  }
  if (!A(yt)) return;
  e.tooltip = yt.cloneNode(!0);
  const { tooltip: C } = e;
  I(C, "id", s), I(C, "role", ct);
  const ft = t ? `${ct}-inner` : `${Ht}-body`, it = t ? null : x(`.${Ht}-header`, C), J = x(`.${ft}`, C);
  e.arrow = x(
    `.${q}-arrow`,
    C
  );
  const { arrow: Bt } = e;
  if (A(i)) m = [i.cloneNode(!0)];
  else {
    const y = bt("div");
    mt(y, i, f), m = [...y.childNodes];
  }
  if (A($)) K = [$.cloneNode(!0)];
  else {
    const y = bt("div");
    mt(y, $, f), K = [...y.childNodes];
  }
  if (u)
    if (i)
      if (A(N))
        m = [...m, N.cloneNode(!0)];
      else {
        const y = bt("div");
        mt(y, N, f), m = [...m, y.firstChild];
      }
    else if (it && it.remove(), A(N))
      K = [...K, N.cloneNode(!0)];
    else {
      const y = bt("div");
      mt(y, N, f), K = [...K, y.firstChild];
    }
  t ? i && J && mt(J, i, f) : (i && it && mt(it, m, f), $ && J && mt(J, K, f), e.btn = x(".btn-close", C) || void 0), d(C, "position-absolute"), d(Bt, "position-absolute"), h(C, q) || d(C, q), a && !h(C, O) && d(C, O), l && !h(C, l) && d(C, l), h(C, $t) || d(C, $t);
}, wr = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = ei(n), Hn(n) || si(n) || s.push(n);
  return s.find((o, i) => (R(o, "position") !== "relative" || R(o, "position") === "relative" && o.offsetHeight !== o.scrollHeight) && s.slice(i + 1).every(
    (r) => R(r, "position") === "static"
  ) ? o : null) || w(e).body;
}, Er = `[${ot}="${ct}"],[data-tip="${ct}"]`, yo = "title";
let rn = (e) => F(e, _t);
const Tr = (e) => new Es(e), $r = (e) => {
  const { element: t, tooltip: s, container: n } = e;
  Pt(t, Cn), no(
    s,
    n
  );
}, Qt = (e) => {
  const { tooltip: t, container: s } = e;
  return t && ms(t, s);
}, yr = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), Jt(s, $o) && e.name === _t && xo(e), t && t();
}, Co = (e, t) => {
  const s = t ? k : L, { element: n } = e;
  s(
    w(n),
    ls,
    e.handleTouch,
    te
  );
}, cn = (e) => {
  const { element: t } = e, s = E(
    `shown.bs.${ee(e.name)}`
  );
  Co(e, !0), b(t, s), g.clear(t, "in");
}, an = (e) => {
  const { element: t } = e, s = E(
    `hidden.bs.${ee(e.name)}`
  );
  Co(e), $r(e), b(t, s), g.clear(t, "out");
}, ln = (e, t) => {
  const s = t ? k : L, { element: n, tooltip: o } = e, i = M(n, `.${V}`), r = M(n, `.${G}`);
  t ? [n, o].forEach((c) => e._observer.observe(c)) : e._observer.disconnect(), i && s(i, `hide.bs.${V}`, e.handleHide), r && s(r, `hide.bs.${G}`, e.handleHide);
}, xo = (e, t) => {
  const s = [$o, yo], { element: n } = e;
  I(
    n,
    s[t ? 0 : 1],
    t || X(n, s[0]) || ""
  ), Pt(n, s[t ? 1 : 0]);
};
class Es extends st {
  static selector = Er;
  static init = Tr;
  static getInstance = rn;
  static styleTip = ns;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === _t, i = o ? ct : Ht, r = o ? _t : ws;
    rn = (f) => F(f, r), this.enabled = !0, this.id = `${i}-${kn(n, i)}`;
    const { options: c } = this;
    if (!c.title && o || !o && !c.content)
      return;
    at(os, { titleAttr: "" }), Jt(n, yo) && o && typeof c.title == "string" && xo(this, c.title);
    const a = wr(n), l = ["sticky", "fixed", "relative"].some(
      (f) => R(a, "position") === f
    ) ? a : Pn(n);
    this.container = a, this.offsetParent = l, br(this), this.tooltip && (this._observer = new fs(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return _t;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return os;
  }
  handleFocus = () => lt(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: n, container: o, id: i } = this, { animation: r } = t, c = g.get(n, "out");
    g.clear(n, "out"), s && !c && !Qt(this) && g.set(
      n,
      () => {
        const a = E(
          `show.bs.${ee(this.name)}`
        );
        b(n, a), a.defaultPrevented || (so(s, o), I(n, Cn, `#${i}`), this.update(), ln(this, !0), h(s, p) || d(s, p), r ? S(s, () => cn(this)) : cn(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: n } = this, { animation: o, delay: i } = t;
    g.clear(n, "in"), s && Qt(this) && g.set(
      n,
      () => {
        const r = E(
          `hide.bs.${ee(this.name)}`
        );
        b(n, r), r.defaultPrevented || (this.update(), v(s, p), ln(this), o ? S(s, () => an(this)) : an(this));
      },
      i + 17,
      "out"
    );
  }
  update = () => {
    ns(this);
  };
  toggle = () => {
    const { tooltip: t } = this;
    t && !Qt(this) ? this.show() : this.hide();
  };
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, enabled: s } = this;
    s && (t && Qt(this) && this.hide(), this._toggleEventListeners(), this.enabled = !s);
  }
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /**
   * Handles the `touchstart` event listener for `Tooltip`
   *
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch = ({ target: t }) => {
    const { tooltip: s, element: n } = this;
    s && s.contains(t) || t === n || t && n.contains(t) || this.hide();
  };
  /**
   * Toggles on/off the `Tooltip` event listeners.
   *
   * @param add when `true`, event listeners are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? k : L, { element: n, options: o, btn: i } = this, { trigger: r } = o, a = !!(this.name !== _t && o.dismissible);
    r.includes("manual") || (this.enabled = !!t, r.split(" ").forEach((f) => {
      f === Bo ? (s(n, Sn, this.handleShow), s(n, Ce, this.handleShow), a || (s(n, as, this.handleHide), s(
        w(n),
        ls,
        this.handleTouch,
        te
      ))) : f === P ? s(n, f, a ? this.handleShow : this.toggle) : f === rs && (s(n, cs, this.handleShow), a || s(n, xn, this.handleHide), qo() && s(n, P, this.handleFocus)), a && i && s(i, P, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => yr(n, () => super.dispose()),
      17
    );
    s.animation && Qt(n) ? (this.options.delay = 0, this.hide(), S(t, o)) : o();
  }
}
const Cr = `[${ot}="${Ht}"],[data-tip="${Ht}"]`, xr = at({}, os, {
  template: Eo(Ht),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close position-absolute top-0 end-0 m-1" aria-label="Close"></button>'
}), Sr = (e) => F(e, ws), _r = (e) => new So(e);
class So extends Es {
  static selector = Cr;
  static init = _r;
  static getInstance = Sr;
  static styleTip = ns;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
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
    return xr;
  }
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => lt(s), 17);
  };
}
const Ar = "scrollspy", _o = "ScrollSpy", Dr = '[data-bs-spy="scroll"]', Hr = "[href]", Pr = {
  offset: 10,
  target: void 0
}, Ir = (e) => F(e, _o), kr = (e) => new Do(e), dn = E(`activate.bs.${Ar}`), Lr = (e) => {
  const {
    target: t,
    _itemsLength: s,
    _observables: n
  } = e, o = hs("A", t), i = w(t);
  !o.length || s === n.size || (n.clear(), Array.from(o).forEach((r) => {
    const c = X(r, "href")?.slice(1), a = c?.length ? i.getElementById(c) : null;
    a && !nt(r) && e._observables.set(a, r);
  }), e._itemsLength = e._observables.size);
}, Ao = (e) => {
  Array.from(hs("A", e)).forEach(
    (t) => {
      h(t, T) && v(t, T);
    }
  );
}, hn = (e, t) => {
  const { target: s, element: n } = e;
  Ao(s), e._activeItem = t, d(t, T);
  let o = t;
  for (; o !== s; )
    if (o = o.parentElement, ["nav", "dropdown-menu", "list-group"].some(
      (i) => h(o, i)
    )) {
      const i = o.previousElementSibling;
      i && !h(i, T) && d(i, T);
    }
  dn.relatedTarget = t, b(n, dn);
}, ze = (e, t) => {
  const { scrollTarget: s, element: n, options: o } = e;
  return (s !== n ? It(t).top + s.scrollTop : t.offsetTop) - (o.offset || 10);
};
class Do extends st {
  static selector = Dr;
  static init = kr;
  static getInstance = Ir;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = x(
      o.target,
      w(n)
    );
    i && (this.target = i, this.scrollTarget = n.clientHeight < n.scrollHeight ? n : dt(n), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new fs(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return _o;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Pr;
  }
  refresh = () => {
    const { target: t, scrollTarget: s } = this;
    if (!t || t.offsetHeight === 0) return;
    Lr(this);
    const { _itemsLength: n, _observables: o, _activeItem: i } = this;
    if (!n) return;
    const r = o.entries().toArray(), { scrollTop: c, scrollHeight: a, clientHeight: l } = s;
    if (c >= a - l) {
      const u = r[n - 1]?.[1];
      i !== u && hn(this, u);
      return;
    }
    const f = r[0]?.[0] ? ze(this, r[0][0]) : null;
    if (f !== null && c < f && f > 0) {
      this._activeItem = null, Ao(t);
      return;
    }
    for (let u = 0; u < n; u += 1) {
      const [$, N] = r[u], q = ze(this, $), Z = r[u + 1]?.[0], m = Z ? ze(this, Z) : null;
      if (i !== N && c >= q && (m === null || c < m)) {
        hn(this, N);
        break;
      }
    }
  };
  /**
   * This method provides an event handle
   * for scrollspy
   * @param e the event listener object
   */
  _scrollTo = (t) => {
    const s = M(t.target, Hr), n = s && X(s, "href")?.slice(1), o = n && ai(n, this.target);
    o && (this.scrollTarget.scrollTo({
      top: o.offsetTop,
      behavior: "smooth"
    }), t.preventDefault());
  };
  /**
   * Toggles on/off the component observer.
   *
   * @param self the ScrollSpy instance
   * @param add when `true`, listener is added
   */
  _toggleEventListeners = (t) => {
    const { target: s, _observables: n, _observer: o, _scrollTo: i } = this;
    (t ? k : L)(s, P, i), t ? n?.forEach((c, a) => o.observe(a)) : o.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const he = "tab", Ho = "Tab", is = `[${ot}="${he}"]`, Po = (e) => F(e, Ho), Or = (e) => new Io(e), Ke = E(
  `show.bs.${he}`
), fn = E(
  `shown.bs.${he}`
), Ve = E(
  `hide.bs.${he}`
), un = E(
  `hidden.bs.${he}`
), ie = /* @__PURE__ */ new Map(), gn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && h(t, kt) && (t.style.height = "", v(t, kt)), s && g.clear(s);
}, pn = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = A(o) && ie.get(o) || { tab: null };
  if (s && n && h(n, O)) {
    const { currentHeight: r, nextHeight: c } = ie.get(t) || { currentHeight: 0, nextHeight: 0 };
    r !== c ? setTimeout(() => {
      s.style.height = `${c}px`, Ot(s), S(s, () => gn(e));
    }, 50) : gn(e);
  } else o && g.clear(o);
  fn.relatedTarget = i, b(t, fn);
}, mn = (e) => {
  const { element: t, content: s, tabContent: n, nav: o } = e, { tab: i, content: r } = o && ie.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, O) && ([r, s].forEach((a) => {
    a && d(a, "overflow-hidden");
  }), c = r ? r.scrollHeight : 0), Ke.relatedTarget = i, un.relatedTarget = t, b(t, Ke), !Ke.defaultPrevented) {
    if (s && d(s, T), r && v(r, T), n && s && h(s, O)) {
      const a = s.scrollHeight;
      ie.set(t, {
        currentHeight: c,
        nextHeight: a,
        tab: null,
        content: null
      }), d(n, kt), n.style.height = `${c}px`, Ot(n), [r, s].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    s && s && h(s, O) ? setTimeout(() => {
      d(s, p), S(s, () => {
        pn(e);
      });
    }, 1) : (s && d(s, p), pn(e)), i && b(i, un);
  }
}, vn = (e) => {
  const { nav: t } = e;
  if (!A(t))
    return { tab: null, content: null };
  const s = rt(
    T,
    t
  );
  let n = null;
  s.length === 1 && !Lt.some(
    (i) => h(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = A(n) ? z(n) : null;
  return { tab: n, content: o };
}, bn = (e) => {
  if (!A(e)) return null;
  const t = M(e, `.${Lt.join(",.")}`);
  return t ? x(`.${Lt[0]}-toggle`, t) : null;
}, Nr = (e) => {
  const t = M(e.target, is), s = t && Po(t);
  s && (e.preventDefault(), s.show());
};
class Io extends st {
  static selector = is;
  static init = Or;
  static getInstance = Po;
  constructor(t) {
    super(t);
    const { element: s } = this, n = z(s);
    if (!n) return;
    const o = M(s, ".nav"), i = M(
      n,
      ".tab-content"
    );
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = bn(s);
    const { tab: r } = vn(this);
    if (o && !r) {
      const c = x(is, o), a = c && z(c);
      a && (d(c, T), d(a, p), d(a, T), I(s, Le, "true"));
    }
    this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ho;
  }
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (n && g.get(n) || h(t, T)) return;
    const { tab: i, content: r } = vn(this);
    if (n && i && ie.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ve.relatedTarget = t, !A(i) || (b(i, Ve), Ve.defaultPrevented)) return;
    d(t, T), I(t, Le, "true");
    const c = A(i) && bn(i);
    if (c && h(c, T) && v(c, T), n) {
      const a = () => {
        i && (v(i, T), I(i, Le, "false")), o && !h(o, T) && d(o, T);
      };
      r && (h(r, O) || s && h(s, O)) ? g.set(n, a, 1) : a();
    }
    r && (v(r, p), h(r, O) ? S(r, () => mn(this)) : mn(this));
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? k : L)(this.element, P, Nr);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Q = "toast", ko = "Toast", Mr = `.${Q}`, Br = `[${Se}="${Q}"]`, Rr = `[${ot}="${Q}"]`, Vt = "showing", Lo = "hide", Fr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Ts = (e) => F(e, ko), Wr = (e) => new Oo(e), wn = E(
  `show.bs.${Q}`
), jr = E(
  `shown.bs.${Q}`
), En = E(
  `hide.bs.${Q}`
), zr = E(
  `hidden.bs.${Q}`
), Tn = (e) => {
  const { element: t, options: s } = e;
  v(t, Vt), g.clear(t, Vt), b(t, jr), s.autohide && g.set(t, () => e.hide(), s.delay, Q);
}, $n = (e) => {
  const { element: t } = e;
  v(t, Vt), v(t, p), d(t, Lo), g.clear(t, Q), b(t, zr);
}, Kr = (e) => {
  const { element: t, options: s } = e;
  d(t, Vt), s.animation ? (Ot(t), S(t, () => $n(e))) : $n(e);
}, Vr = (e) => {
  const { element: t, options: s } = e;
  g.set(
    t,
    () => {
      v(t, Lo), Ot(t), d(t, p), d(t, Vt), s.animation ? S(t, () => Tn(e)) : Tn(e);
    },
    17,
    Vt
  );
};
function qr(e) {
  const t = z(this), s = t && Ts(t);
  nt(this) || s && (this.tagName === "A" && e.preventDefault(), s.relatedTarget = this, s.show());
}
const Yr = (e) => {
  const t = e.target, s = Ts(t), { type: n, relatedTarget: o } = e;
  !s || t === o || t.contains(o) || ([Ce, cs].includes(n) ? g.clear(t, Q) : g.set(t, () => s.hide(), s.options.delay, Q));
};
class Oo extends st {
  static selector = Mr;
  static init = Wr;
  static getInstance = Ts;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, O) ? d(n, O) : !o.animation && h(n, O) && v(n, O), this.dismiss = x(Br, n), this.triggers = [
      ...Y(
        Rr,
        w(n)
      )
    ].filter(
      (i) => z(i) === n
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ko;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Fr;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return h(this.element, p);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (b(t, wn), wn.defaultPrevented || Vr(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (b(t, En), En.defaultPrevented || Kr(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? k : L, { element: n, triggers: o, dismiss: i, options: r, hide: c } = this;
    i && s(i, P, c), r.autohide && [cs, xn, Ce, as].forEach(
      (a) => s(n, a, Yr)
    ), o.length && o.forEach((a) => {
      s(a, P, qr);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), g.clear(t, Q), s && v(t, p), super.dispose();
  }
}
const $s = /* @__PURE__ */ new Map();
[
  Mn,
  Rn,
  jn,
  Vn,
  Gn,
  go,
  wo,
  So,
  Do,
  Io,
  Oo,
  Es
].forEach((e) => $s.set(e.prototype.name, e));
const Ur = (e, t) => {
  [...t].forEach((s) => e(s));
}, Xr = (e, t) => {
  const s = At.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, yn = (e) => {
  const t = e && e.nodeName ? e : document, s = [...hs("*", t)];
  $s.forEach((n) => {
    const { init: o, selector: i } = n;
    Ur(
      o,
      s.filter((r) => In(r, i))
    );
  });
}, Gr = (e) => {
  const t = e && e.nodeName ? e : document;
  $s.forEach((s) => {
    Xr(s.prototype.name, t);
  });
};
document.body ? yn() : k(document, "DOMContentLoaded", () => yn(), {
  once: !0
});
export {
  Mn as Alert,
  Rn as Button,
  jn as Carousel,
  Vn as Collapse,
  Gn as Dropdown,
  go as Modal,
  wo as Offcanvas,
  So as Popover,
  Do as ScrollSpy,
  Io as Tab,
  Oo as Toast,
  Es as Tooltip,
  yn as initCallback,
  Gr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
