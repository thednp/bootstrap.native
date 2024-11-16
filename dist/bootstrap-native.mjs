const yn = "aria-describedby", Ee = "aria-expanded", re = "aria-hidden", $e = "aria-modal", ys = "aria-pressed", Oe = "aria-selected", cs = "focus", as = "focusin", Cn = "focusout", ye = "keydown", Fo = "keyup", I = "click", xn = "mousedown", Wo = "hover", Ce = "mouseenter", ls = "mouseleave", jo = "pointerdown", zo = "pointermove", Ko = "pointerup", ds = "touchstart", Vo = "dragstart", qo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', Ye = "ArrowDown", Ue = "ArrowUp", Cs = "ArrowLeft", xs = "ArrowRight", hs = "Escape", Yo = "transitionDuration", Uo = "transitionDelay", Ne = "transitionend", Sn = "transitionProperty", Xo = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Te = () => {
}, Go = (e, t, s, n) => {
  const o = n || !1;
  e.addEventListener(
    t,
    s,
    o
  );
}, Qo = (e, t, s, n) => {
  const o = n || !1;
  e.removeEventListener(
    t,
    s,
    o
  );
}, X = (e, t) => e.getAttribute(t), te = (e, t) => e.hasAttribute(t), k = (e, t, s) => e.setAttribute(t, s), Pt = (e, t) => e.removeAttribute(t), d = (e, ...t) => {
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
).replace(/\s+/g, ""), ae = (e) => typeof e == "string" || !1, _n = (e) => ce(e) && e.constructor.name === "Window" || !1, An = (e) => D(e) && e.nodeType === 9 || !1, w = (e) => An(e) ? e : D(e) ? e.ownerDocument : _n(e) ? e.document : globalThis.document, at = (e, ...t) => Object.assign(e, ...t), bt = (e) => {
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
}, Zo = (e) => {
  const t = R(e, Sn), s = R(e, Uo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, le = (e) => {
  const t = R(e, Sn), s = R(e, Yo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, S = (e, t) => {
  let s = 0;
  const n = new Event(Ne), o = le(e), i = Zo(e);
  if (o) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(Ne, r), s = 1);
    };
    e.addEventListener(Ne, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, lt = (e, t) => e.focus(t), _s = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, pe = (e) => Object.entries(e), Jo = (e, t, s, n) => {
  if (!U(e)) return t;
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, c = {}, a = "title";
  return pe(i).forEach(([l, f]) => {
    const g = typeof l == "string" && l.includes(n) ? Ss(l.replace(n, "")) : Ss(l);
    c[g] = _s(f);
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
}, ee = { passive: !0 }, Ot = (e) => e.offsetHeight, _ = (e, t) => {
  pe(t).forEach(([s, n]) => {
    if (n && ae(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, at(e.style, o);
    }
  });
}, Xe = (e) => ce(e) && e.constructor.name === "Map" || !1, ti = (e) => typeof e == "number" || !1, pt = /* @__PURE__ */ new Map(), u = {
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
    return t && s && Xe(s) ? s.get(t) || null : ti(s) ? s : null;
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
    t && t.length && Xe(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && pt.delete(e)) : (clearTimeout(s), pt.delete(e));
  }
}, se = (e) => e.toLowerCase(), Y = (e, t) => (D(t) ? t : w()).querySelectorAll(e), Ge = /* @__PURE__ */ new Map();
function ei(e) {
  const { shiftKey: t, code: s } = e, n = w(this), o = [
    ...Y(qo, this)
  ].filter(
    (c) => !te(c, "disabled") && !X(c, re)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const si = (e) => Ge.has(e) === !0, xe = (e) => {
  const t = si(e);
  (t ? Qo : Go)(e, "keydown", ei), t ? Ge.delete(e) : Ge.set(e, !0);
}, A = (e) => U(e) && "offsetWidth" in e || !1, It = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = e.getBoundingClientRect();
  let a = 1, l = 1;
  if (t && A(e)) {
    const { offsetWidth: f, offsetHeight: g } = e;
    a = f > 0 ? Math.round(s) / f : 1, l = g > 0 ? Math.round(n) / g : 1;
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
}, Nt = (e) => w(e).body, dt = (e) => w(e).documentElement, ni = (e) => {
  const t = _n(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, Dn = (e) => D(e) && e.constructor.name === "ShadowRoot" || !1, oi = (e) => e.nodeName === "HTML" ? e : U(e) && e.assignedSlot || D(e) && e.parentNode || Dn(e) && e.host || dt(e), Hn = (e) => e ? An(e) ? e.defaultView : D(e) ? e?.ownerDocument?.defaultView : e : window, ii = (e) => D(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, Pn = (e, t) => e.matches(t), ri = (e) => {
  if (!A(e)) return !1;
  const { width: t, height: s } = It(e), { offsetWidth: n, offsetHeight: o } = e;
  return Math.round(t) !== n || Math.round(s) !== o;
}, ci = (e, t, s) => {
  const n = A(t), o = It(
    e,
    n && ri(t)
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
const zt = /* @__PURE__ */ new Map(), In = (e, t) => {
  let s = t ? Ds : Hs;
  if (t) {
    const n = In(e), o = zt.get(n) || /* @__PURE__ */ new Map();
    zt.has(n) || zt.set(n, o), Xe(o) && !o.has(t) ? (o.set(t, s), Ds += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    zt.has(n) ? s = zt.get(n) : (zt.set(n, s), Hs += 1);
  }
  return s;
}, ai = (e) => Array.isArray(e) || !1, kn = (e) => {
  if (!D(e)) return !1;
  const { top: t, bottom: s } = It(e), { clientHeight: n } = dt(e);
  return t <= n && s >= 0;
}, li = (e) => typeof e == "function" || !1, di = (e) => ce(e) && e.constructor.name === "NodeList" || !1, Tt = (e) => dt(e).dir === "rtl", P = (e, t) => !e || !t ? null : e.closest(t) || P(e.getRootNode().host, t) || null, x = (e, t) => U(e) ? e : (U(t) ? t : w()).querySelector(e), fs = (e, t) => (D(t) ? t : w()).getElementsByTagName(
  e
), hi = (e, t) => w(t).getElementById(e), rt = (e, t) => (t && D(t) ? t : w()).getElementsByClassName(
  e
), Kt = {}, Ln = (e) => {
  const { type: t, currentTarget: s } = e;
  Kt[t].forEach((n, o) => {
    s === o && n.forEach((i, r) => {
      r.apply(o, [e]), typeof i == "object" && i.once && O(o, t, r, i);
    });
  });
}, L = (e, t, s, n) => {
  Kt[t] || (Kt[t] = /* @__PURE__ */ new Map());
  const o = Kt[t];
  o.has(e) || o.set(e, /* @__PURE__ */ new Map());
  const i = o.get(
    e
  ), { size: r } = i;
  i.set(s, n), r || e.addEventListener(
    t,
    Ln,
    n
  );
}, O = (e, t, s, n) => {
  const o = Kt[t], i = o && o.get(e), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(e), (!o || !o.size) && delete Kt[t], (!i || !i.size) && e.removeEventListener(
    t,
    Ln,
    c
  );
}, N = "fade", p = "show", Se = "data-bs-dismiss", _e = "alert", On = "Alert", fi = "5.1.0", gi = fi;
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
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && As(this.defaults).length ? Jo(n, this.defaults, s || {}, "bs") : {}, At.set(n, this.name, this);
  }
  get version() {
    return gi;
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
const nt = (e) => h(e, "disabled") || X(e, "disabled") === "true", ui = `.${_e}`, pi = `[${Se}="${_e}"]`, mi = (e) => F(e, On), vi = (e) => new Nn(e), Ps = E(
  `close.bs.${_e}`
), bi = E(
  `closed.bs.${_e}`
), Is = (e) => {
  const { element: t } = e;
  b(t, bi), e._toggleEventListeners(), e.dispose(), t.remove();
};
class Nn extends st {
  static selector = ui;
  static init = vi;
  static getInstance = mi;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = x(
      pi,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return On;
  }
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element: t } = this;
    !t || !h(t, p) || (b(t, Ps), !Ps.defaultPrevented && (v(t, p), h(t, N) ? S(t, () => Is(this)) : Is(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { dismiss: n, close: o } = this;
    n && !nt(n) && s(n, I, o);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const $ = "active", ot = "data-bs-toggle", wi = "button", Mn = "Button", Ei = `[${ot}="${wi}"]`, Ti = (e) => F(e, Mn), $i = (e) => new Bn(e);
class Bn extends st {
  static selector = Ei;
  static init = $i;
  static getInstance = Ti;
  /**
   * @param target usually a `.btn` element
   */
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = h(s, $), k(s, ys, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Mn;
  }
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (t) => {
    t && t.preventDefault();
    const { element: s, isActive: n } = this;
    nt(s) || ((n ? v : d)(s, $), k(s, ys, n ? "false" : "true"), this.isActive = h(s, $));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, I, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Qe = "data-bs-target", Dt = "carousel", Rn = "Carousel", ks = "data-bs-parent", yi = "data-bs-container", z = (e) => {
  const t = [Qe, ks, yi, "href"], s = w(e);
  return t.map((n) => {
    const o = X(e, n);
    return o ? n === ks ? P(e, o) : x(o, s) : null;
  }).filter((n) => n)[0];
}, de = `[data-bs-ride="${Dt}"]`, tt = `${Dt}-item`, Ze = "data-bs-slide-to", vt = "data-bs-slide", wt = "paused", Ls = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (e) => F(e, Rn), Ci = (e) => new Wn(e);
let Jt = 0, me = 0, Me = 0;
const Be = E(`slide.bs.${Dt}`), Je = E(`slid.bs.${Dt}`), Os = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = ts(e), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    d(o[t], $), v(o[t], `${tt}-${c}`), v(o[t], `${tt}-${a}`), v(o[r], $), v(o[r], `${tt}-${a}`), b(n, Je), u.clear(n, vt), e.cycle && !w(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function xi() {
  const e = ht(this);
  e && !e.isPaused && !u.get(this, wt) && d(this, wt);
}
function Si() {
  const e = ht(this);
  e && e.isPaused && !u.get(this, wt) && e.cycle();
}
function _i(e) {
  e.preventDefault();
  const t = P(this, de) || z(this), s = t && ht(t);
  if (!s || s.isAnimating) return;
  const n = +(X(this, Ze) || 0);
  this && !h(this, $) && !Number.isNaN(n) && s.to(n);
}
function Ai(e) {
  e.preventDefault();
  const t = P(this, de) || z(this), s = t && ht(t);
  if (!s || s.isAnimating) return;
  const n = X(this, vt);
  n === "next" ? s.next() : n === "prev" && s.prev();
}
const Di = ({ code: e, target: t }) => {
  const s = w(t), [n] = [...Y(de, s)].filter((a) => kn(a)), o = ht(n);
  if (!o || o.isAnimating || /textarea|input|select/i.test(t.nodeName)) return;
  const i = Tt(n);
  e === (i ? xs : Cs) ? o.prev() : e === (i ? Cs : xs) && o.next();
};
function Ns(e) {
  const { target: t } = e, s = ht(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(t) || !s.controls.includes(t)) && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
}
function Hi(e) {
  const { target: t } = e, s = ht(this);
  if (!s || s.isAnimating || s.isTouch) return;
  const { controls: n, indicators: o } = s;
  [...n, ...o].every(
    (i) => i === t || i.contains(t)
  ) || (Jt = e.pageX, this.contains(t) && (s.isTouch = !0, Fn(s, !0)));
}
const Pi = (e) => {
  me = e.pageX;
}, Ii = (e) => {
  const { target: t } = e, s = w(t), n = [...Y(de, s)].map((c) => ht(c)).find((c) => c.isTouch);
  if (!n) return;
  const { element: o, index: i } = n, r = Tt(o);
  Me = e.pageX, n.isTouch = !1, Fn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Jt - Me) > 120 && (me < Jt ? n.to(i + (r ? -1 : 1)) : me > Jt && n.to(i + (r ? 1 : -1))), Jt = 0, me = 0, Me = 0;
}, Re = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => v(n, $)), e.indicators[t] && d(s[t], $);
}, Fn = (e, t) => {
  const { element: s } = e, n = t ? L : O;
  n(
    w(s),
    zo,
    Pi,
    ee
  ), n(
    w(s),
    Ko,
    Ii,
    ee
  );
}, ts = (e) => {
  const { slides: t, element: s } = e, n = x(
    `.${tt}.${$}`,
    s
  );
  return n ? [...t].indexOf(n) : -1;
};
class Wn extends st {
  static selector = de;
  static init = Ci;
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
    const i = ts(this), r = [...o].find(
      (l) => Pn(l, `.${tt}-next`)
    );
    this.index = i;
    const c = w(n);
    this.controls = [
      ...Y(`[${vt}]`, n),
      ...Y(
        `[${vt}][${Qe}="#${n.id}"]`,
        c
      )
    ].filter((l, f, g) => f === g.indexOf(l)), this.indicator = x(
      `.${Dt}-indicators`,
      n
    ), this.indicators = [
      ...this.indicator ? Y(`[${Ze}]`, this.indicator) : [],
      ...Y(
        `[${Ze}][${Qe}="#${n.id}"]`,
        c
      )
    ].filter((l, f, g) => f === g.indexOf(l));
    const { options: a } = this;
    this.options.interval = a.interval === !0 ? Ls.interval : a.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, d(o[0], $), this.indicators.length && Re(this, 0)), this.indicators.length && Re(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Rn;
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
    u.clear(t, Dt), n && (u.clear(t, wt), v(t, wt)), u.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && kn(t) && this.to(o + 1);
      },
      s.interval,
      Dt
    );
  }
  pause() {
    const { element: t, options: s } = this;
    this.isPaused || !s.interval || (d(t, wt), u.set(
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
    const { element: s, slides: n, options: o } = this, i = ts(this), r = Tt(s);
    let c = t;
    if (this.isAnimating || i === c || u.get(s, vt)) return;
    i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
    const { direction: a } = this;
    c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
    const l = a === "left" ? "next" : "prev", f = a === "left" ? "start" : "end", g = {
      relatedTarget: n[c],
      from: i,
      to: c,
      direction: a
    };
    at(Be, g), at(Je, g), b(s, Be), !Be.defaultPrevented && (this.index = c, Re(this, c), le(n[c]) && h(s, "slide") ? u.set(
      s,
      () => {
        d(n[c], `${tt}-${l}`), Ot(n[c]), d(n[c], `${tt}-${f}`), d(n[i], `${tt}-${f}`), S(
          n[c],
          () => this.slides && this.slides.length && Os(this)
        );
      },
      0,
      vt
    ) : (d(n[c], $), v(n[i], $), u.set(
      s,
      () => {
        u.clear(s, vt), s && o.interval && !this.isPaused && this.cycle(), b(s, Je);
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
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: c, pause: a, interval: l, keyboard: f } = n, g = t ? L : O;
    a && l && (g(s, Ce, xi), g(s, ls, Si)), c && o.length > 2 && (g(
      s,
      jo,
      Hi,
      ee
    ), g(s, ds, Ns, { passive: !1 }), g(s, Vo, Ns, { passive: !1 })), i.length && i.forEach((T) => {
      nt(T) || g(T, I, Ai);
    }), r.length && r.forEach((T) => {
      nt(T) || g(T, I, _i);
    }), f && g(w(s), ye, Di);
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
const kt = "collapsing", j = "collapse", jn = "Collapse", ki = `.${j}`, zn = `[${ot}="${j}"]`, Li = { parent: null }, ve = (e) => F(e, jn), Oi = (e) => new Kn(e), Ms = E(`show.bs.${j}`), Ni = E(`shown.bs.${j}`), Bs = E(`hide.bs.${j}`), Mi = E(`hidden.bs.${j}`), Bi = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Ms), Ms.defaultPrevented || (u.set(t, Te, 17), s && u.set(s, Te, 17), d(t, kt), v(t, j), _(t, { height: `${t.scrollHeight}px` }), S(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => k(o, Ee, "true")), v(t, kt), d(t, j), d(t, p), _(t, { height: "" }), b(t, Ni);
  }));
}, Rs = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Bs), Bs.defaultPrevented || (u.set(t, Te, 17), s && u.set(s, Te, 17), _(t, { height: `${t.scrollHeight}px` }), v(t, j), v(t, p), d(t, kt), Ot(t), _(t, { height: "0px" }), S(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => k(o, Ee, "false")), v(t, kt), d(t, j), _(t, { height: "" }), b(t, Mi);
  }));
}, Ri = (e) => {
  const { target: t } = e, s = t && P(t, zn), n = s && z(s), o = n && ve(n);
  o && (o.toggle(), s?.tagName === "A" && e.preventDefault());
};
class Kn extends st {
  static selector = ki;
  static init = Oi;
  static getInstance = ve;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...Y(zn, i)].filter(
      (r) => z(r) === n
    ), this.parent = A(o.parent) ? o.parent : ae(o.parent) ? z(n) || x(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return jn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Li;
  }
  hide() {
    const { triggers: t, element: s } = this;
    u.get(s) || (Rs(this), t.length && t.forEach((n) => d(n, `${j}d`)));
  }
  show() {
    const { element: t, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [
      ...Y(`.${j}.${p}`, s)
    ].find((r) => ve(r)), i = o && ve(o)), (!s || !u.get(s)) && !u.get(t) && (i && o !== t && (Rs(i), i.triggers.forEach((r) => {
      d(r, `${j}d`);
    })), Bi(this), n.length && n.forEach((r) => v(r, `${j}d`)));
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
    const s = t ? L : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      nt(o) || s(o, I, Ri);
    });
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], Vn = "Dropdown", qn = "dropdown-menu", Yn = (e) => {
  const t = P(e, "A");
  return e.tagName === "A" && te(e, "href") && X(e, "href")?.slice(-1) === "#" || t && te(t, "href") && X(t, "href")?.slice(-1) === "#";
}, [et, es, ss, ns] = Lt, Un = `[${ot}="${et}"]`, Vt = (e) => F(e, Vn), Fi = (e) => new Qn(e), Wi = `${qn}-end`, Fs = [et, es], Ws = [ss, ns], js = ["A", "BUTTON"], ji = {
  offset: 5,
  display: "dynamic"
}, Fe = E(
  `show.bs.${et}`
), zs = E(
  `shown.bs.${et}`
), We = E(
  `hide.bs.${et}`
), Ks = E(`hidden.bs.${et}`), Xn = E(`updated.bs.${et}`), Gn = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (R(s, "position") !== "static") {
    const r = Tt(t), c = h(s, Wi);
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
    }, g = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: T, offsetHeight: M } = s, { clientWidth: q, clientHeight: Z } = dt(t), {
      left: m,
      top: K,
      width: $t,
      height: yt
    } = It(t), C = m - T - i < 0, ft = m + T + $t + i >= q, it = K + M + i >= Z, J = K + M + yt + i >= Z, Bt = K - M - i < 0, y = (!r && c || r && !c) && m + $t - T < 0, W = (r && c || !r && !c) && m + T >= q;
    if (Ws.includes(l) && C && ft && (l = et), l === ss && (r ? ft : C) && (l = ns), l === ns && (r ? C : ft) && (l = ss), l === es && Bt && !J && (l = et), l === et && J && !Bt && (l = es), Ws.includes(l) && it && at(g[l], {
      top: "auto",
      bottom: 0
    }), Fs.includes(l) && (y || W)) {
      let B = { left: "auto", right: "auto" };
      !y && W && !r && (B = { left: "auto", right: 0 }), y && !W && r && (B = { left: 0, right: "auto" }), B && at(g[l], B);
    }
    const Rt = f[l];
    _(s, {
      ...g[l],
      margin: `${Rt.map((B) => B && `${B}px`).join(" ")}`
    }), Fs.includes(l) && c && c && _(s, g[!r && y || r && W ? "menuStart" : "menuEnd"]), b(n, Xn);
  }
}, zi = (e) => Array.from(e.children).map((t) => {
  if (t && js.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && js.includes(s.tagName) ? s : null;
}).filter((t) => t), Vs = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? L : O, i = w(t);
  o(i, I, qs), o(i, cs, qs), o(i, ye, Vi), o(i, Fo, qi), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
}, Ae = (e) => {
  const t = [...Lt, "btn-group", "input-group"].map(
    (s) => rt(`${s} ${p}`, w(e))
  ).find((s) => s.length);
  if (t && t.length)
    return [...t[0].children].find(
      (s) => Lt.some((n) => n === X(s, ot))
    );
}, qs = (e) => {
  const { target: t, type: s } = e;
  if (!A(t)) return;
  const n = Ae(t), o = n && Vt(n);
  if (!o) return;
  const { parentElement: i, menu: r } = o, c = i && i.contains(t) && (t.tagName === "form" || P(t, "form") !== null);
  [I, xn].includes(s) && Yn(t) && e.preventDefault(), !c && s !== cs && t !== n && t !== r && o.hide();
}, Ki = (e) => {
  const { target: t } = e, s = t && P(t, Un), n = s && Vt(s);
  n && (e.stopPropagation(), n.toggle(), s && Yn(s) && e.preventDefault());
}, Vi = (e) => {
  [Ye, Ue].includes(e.code) && e.preventDefault();
};
function qi(e) {
  const { code: t } = e, s = Ae(this);
  if (!s) return;
  const n = Vt(s), { activeElement: o } = w(s);
  if (!n || !o) return;
  const { menu: i, open: r } = n, c = zi(i);
  if (c && c.length && [Ye, Ue].includes(t)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : t === Ue ? a = a > 1 ? a - 1 : 0 : t === Ye && (a = a < c.length - 1 ? a + 1 : a), c[a] && lt(c[a]);
  }
  hs === t && r && (n.toggle(), lt(s));
}
function Yi(e) {
  const t = Ae(e), s = t && Vt(t);
  s && s.open && Gn(s);
}
class Qn extends st {
  static selector = Un;
  static init = Fi;
  static getInstance = Vt;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = rt(
      qn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new IntersectionObserver(
      ([i]) => Yi(i.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Vn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ji;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (s) return;
    const i = Ae(t), r = i && Vt(i);
    r && r.hide(), [Fe, zs, Xn].forEach(
      (c) => {
        c.relatedTarget = t;
      }
    ), b(o, Fe), !Fe.defaultPrevented && (d(n, p), d(o, p), k(t, Ee, "true"), Gn(this), this.open = !s, lt(t), Vs(this), b(o, zs));
  }
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([We, Ks].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, We), !We.defaultPrevented && (v(n, p), v(o, p), k(t, Ee, "false"), this.open = !s, Vs(this), b(o, Ks)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? L : O;
    nt(this.element) || s(this.element, I, Ki);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const V = "modal", gs = "Modal", us = "Offcanvas", Ui = "fixed-top", Xi = "fixed-bottom", Zn = "sticky-top", Jn = "position-sticky", to = (e) => [
  ...rt(Ui, e),
  ...rt(Xi, e),
  ...rt(Zn, e),
  ...rt(Jn, e),
  ...rt("is-fixed", e)
], Gi = (e) => {
  const t = Nt(e);
  _(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = to(t);
  s.length && s.forEach((n) => {
    _(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, eo = (e) => {
  const { clientWidth: t } = dt(e), { innerWidth: s } = Hn(e);
  return Math.abs(s - t);
}, so = (e, t) => {
  const s = Nt(e), n = parseInt(R(s, "paddingRight"), 10), i = R(s, "overflow") === "hidden" && n ? 0 : eo(e), r = to(s);
  t && (_(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = R(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [Zn, Jn].some((l) => h(c, l))) {
      const l = R(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, G = "offcanvas", Et = bt({
  tagName: "div",
  className: "popup-container"
}), no = (e, t) => {
  const s = D(t) && t.nodeName === "BODY", n = D(t) && !s ? t : Et, o = s ? t : Nt(e);
  D(e) && (n === Et && o.append(Et), n.append(e));
}, oo = (e, t) => {
  const s = D(t) && t.nodeName === "BODY", n = D(t) && !s ? t : Et;
  D(e) && (e.remove(), n === Et && !Et.children.length && Et.remove());
}, ps = (e, t) => {
  const s = D(t) && t.nodeName !== "BODY" ? t : Et;
  return D(e) && s.contains(e);
}, io = "backdrop", Ys = `${V}-${io}`, Us = `${G}-${io}`, ro = `.${V}.${p}`, ms = `.${G}.${p}`, H = bt("div"), Mt = (e) => x(
  `${ro},${ms}`,
  w(e)
), vs = (e) => {
  const t = e ? Ys : Us;
  [Ys, Us].forEach((s) => {
    v(H, s);
  }), d(H, t);
}, co = (e, t, s) => {
  vs(s), no(H, Nt(e)), t && d(H, N);
}, ao = () => {
  h(H, p) || (d(H, p), Ot(H));
}, De = () => {
  v(H, p);
}, lo = (e) => {
  Mt(e) || (v(H, N), oo(H, Nt(e)), Gi(e));
}, ho = (e) => A(e) && R(e, "visibility") !== "hidden" && e.offsetParent !== null, Qi = `.${V}`, fo = `[${ot}="${V}"]`, Zi = `[${Se}="${V}"]`, go = `${V}-static`, Ji = {
  backdrop: !0,
  keyboard: !0
}, ne = (e) => F(e, gs), tr = (e) => new mo(e), be = E(
  `show.bs.${V}`
), Xs = E(
  `shown.bs.${V}`
), je = E(
  `hide.bs.${V}`
), Gs = E(
  `hidden.bs.${V}`
), uo = (e) => {
  const { element: t } = e, s = eo(t), { clientHeight: n, scrollHeight: o } = dt(t), { clientHeight: i, scrollHeight: r } = t, c = i !== r;
  if (!c && s) {
    const l = { [Tt(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    _(t, l);
  }
  so(t, c || n !== o);
}, po = (e, t) => {
  const s = t ? L : O, { element: n } = e;
  s(n, I, nr), s(w(n), ye, sr), t ? e._observer.observe(n) : e._observer.disconnect();
}, Qs = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  lo(s), _(s, { paddingRight: "", display: "" }), po(e);
  const o = be.relatedTarget || t.find(ho);
  o && lt(o), Gs.relatedTarget = n || void 0, b(s, Gs), xe(s);
}, Zs = (e) => {
  const { element: t, relatedTarget: s } = e;
  lt(t), po(e, !0), Xs.relatedTarget = s || void 0, b(t, Xs), xe(t);
}, Js = (e) => {
  const { element: t, hasFade: s } = e;
  _(t, { display: "block" }), uo(e), Mt(t) || _(Nt(t), { overflow: "hidden" }), d(t, p), Pt(t, re), k(t, $e, "true"), s ? S(t, () => Zs(e)) : Zs(e);
}, tn = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && h(H, p) && !Mt(t) ? (De(), S(H, () => Qs(e))) : Qs(e);
}, er = (e) => {
  const { target: t } = e, s = t && P(t, fo), n = s && z(s), o = n && ne(n);
  o && (s && s.tagName === "A" && e.preventDefault(), o.relatedTarget = s, o.toggle());
}, sr = ({ code: e, target: t }) => {
  const s = x(ro, w(t)), n = s && ne(s);
  if (!n) return;
  const { options: o } = n;
  o.keyboard && e === hs && h(s, p) && (n.relatedTarget = null, n.hide());
}, nr = (e) => {
  const { currentTarget: t } = e, s = t && ne(t);
  if (!s || !t || u.get(t)) return;
  const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: c } = e, a = w(t)?.getSelection()?.toString().length, l = i.contains(c), f = c && P(c, Zi);
  o && !l ? u.set(
    t,
    () => {
      d(t, go), S(i, () => or(s));
    },
    17
  ) : (f || !a && !o && !l && r) && (s.relatedTarget = f || null, s.hide(), e.preventDefault());
}, or = (e) => {
  const { element: t, modalDialog: s } = e, n = (le(s) || 0) + 17;
  v(t, go), u.set(t, () => u.clear(t), n);
};
class mo extends st {
  static selector = Qi;
  static init = tr;
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
        fo,
        w(n)
      )
    ].filter(
      (i) => z(i) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = h(n, N), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
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
    return Ji;
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
        us
      );
      a && a.hide();
    }
    i ? (ps(H) ? vs(!0) : co(t, n, !0), r = le(H), ao(), setTimeout(() => Js(this), r)) : (Js(this), c && h(H, p) && De());
  }
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    h(t, p) && (je.relatedTarget = n || void 0, b(t, je), !je.defaultPrevented && (v(t, p), k(t, re, "true"), Pt(t, $e), s ? S(t, () => tn(this)) : tn(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    h(this.element, p) && uo(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { triggers: n } = this;
    n.length && n.forEach((o) => {
      nt(o) || s(o, I, er);
    });
  };
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? S(s, o) : o();
  }
}
const ir = `.${G}`, bs = `[${ot}="${G}"]`, rr = `[${Se}="${G}"]`, He = `${G}-toggling`, cr = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, oe = (e) => F(e, us), ar = (e) => new Eo(e), we = E(`show.bs.${G}`), vo = E(`shown.bs.${G}`), ze = E(`hide.bs.${G}`), bo = E(`hidden.bs.${G}`), lr = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = dt(t);
  so(t, s !== n);
}, wo = (e, t) => {
  const s = t ? L : O, n = w(e.element);
  s(n, ye, gr), s(n, I, fr);
}, en = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (lr(e), _(Nt(t), { overflow: "hidden" })), d(t, He), d(t, p), _(t, { visibility: "visible" }), S(t, () => ur(e));
}, dr = (e) => {
  const { element: t, options: s } = e, n = Mt(t);
  t.blur(), !n && s.backdrop && h(H, p) && De(), S(t, () => pr(e));
}, hr = (e) => {
  const t = P(e.target, bs), s = t && z(t), n = s && oe(s);
  n && (n.relatedTarget = t, n.toggle(), t?.tagName === "A" && e.preventDefault());
}, fr = (e) => {
  const { target: t } = e, s = x(
    ms,
    w(t)
  );
  if (!s) return;
  const n = x(
    rr,
    s
  ), o = oe(s);
  if (!o) return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = P(t, bs), l = w(s).getSelection();
  H.contains(t) && c === "static" || (!(l && l.toString().length) && (!s.contains(t) && c && (!a || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : void 0, o.hide()), a && a.tagName === "A" && e.preventDefault());
}, gr = ({ code: e, target: t }) => {
  const s = x(
    ms,
    w(t)
  ), n = s && oe(s);
  n && n.options.keyboard && e === hs && (n.relatedTarget = void 0, n.hide());
}, ur = (e) => {
  const { element: t } = e;
  v(t, He), Pt(t, re), k(t, $e, "true"), k(t, "role", "dialog"), b(t, vo), wo(e, !0), lt(t), xe(t);
}, pr = (e) => {
  const { element: t, triggers: s } = e;
  k(t, re, "true"), Pt(t, $e), Pt(t, "role"), _(t, { visibility: "" });
  const n = we.relatedTarget || s.find(ho);
  n && lt(n), lo(t), b(t, bo), v(t, He), xe(t), Mt(t) || wo(e);
};
class Eo extends st {
  static selector = ir;
  static init = ar;
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
        bs,
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
    return us;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return cr;
  }
  toggle() {
    h(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (h(t, p) || (we.relatedTarget = n || void 0, vo.relatedTarget = n || void 0, b(t, we), we.defaultPrevented)) return;
    const i = Mt(t);
    if (i && i !== t) {
      const r = oe(i) || F(
        i,
        gs
      );
      r && r.hide();
    }
    s.backdrop ? (ps(H) ? vs() : co(t, !0), o = le(H), ao(), setTimeout(() => en(this), o)) : (en(this), i && h(H, p) && De());
  }
  hide() {
    const { element: t, relatedTarget: s } = this;
    h(t, p) && (ze.relatedTarget = s || void 0, bo.relatedTarget = s || void 0, b(t, ze), !ze.defaultPrevented && (d(t, He), v(t, p), dr(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? L : O;
    this.triggers.forEach((n) => {
      nt(n) || s(n, I, hr);
    });
  };
  dispose() {
    const { element: t } = this, s = h(t, p), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? S(t, n) : n();
  }
}
const Ht = "popover", ws = "Popover", ct = "tooltip", To = (e) => {
  const t = e === ct, s = t ? `${e}-inner` : `${e}-body`, n = t ? "" : `<h3 class="${e}-header"></h3>`, o = `<div class="${e}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${e}" role="${ct}">${n + o + i}</div>`;
}, $o = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, os = (e) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, offsetParent: i, options: r, arrow: c } = e;
    if (!n) return;
    const a = Tt(s), { x: l, y: f } = ni(i);
    _(n, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: g, offsetHeight: T } = n, { clientWidth: M, clientHeight: q, offsetWidth: Z } = dt(s);
    let { placement: m } = r;
    const { clientWidth: K, offsetWidth: $t } = o, C = R(
      o,
      "position"
    ) === "fixed", ft = Math.abs(C ? K - $t : M - Z), it = a && C ? ft : 0, J = M - (a ? 0 : ft) - 1, Bt = e._observer.getEntry(s), {
      width: y,
      height: W,
      left: Rt,
      right: B,
      top: Ct
    } = Bt?.boundingClientRect || It(s, !0), {
      x: fe,
      y: Ft
    } = ci(
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
    let xt = 0, Yt = "", gt = 0, Pe = "", Wt = "", ge = "", Ie = "";
    const St = c.offsetWidth || 0, ut = c.offsetHeight || 0, ke = St / 2;
    let Ut = Ct - T - ut < 0, Xt = Ct + T + W + ut >= q, Gt = Rt - g - St < it, Qt = Rt + g + y + St >= J;
    const ue = ["left", "right"], Le = ["top", "bottom"];
    Ut = ue.includes(m) ? Ct + W / 2 - T / 2 - ut < 0 : Ut, Xt = ue.includes(m) ? Ct + T / 2 + W / 2 + ut >= q : Xt, Gt = Le.includes(m) ? Rt + y / 2 - g / 2 < it : Gt, Qt = Le.includes(m) ? Rt + g / 2 + y / 2 >= J : Qt, m = ue.includes(m) && Gt && Qt ? "top" : m, m = m === "top" && Ut ? "bottom" : m, m = m === "bottom" && Xt ? "top" : m, m = m === "left" && Gt ? "right" : m, m = m === "right" && Qt ? "left" : m, n.className.includes(m) || (n.className = n.className.replace(
      t,
      $o[m]
    )), ue.includes(m) ? (m === "left" ? gt = fe - g - St : gt = fe + y + St, Ut && Xt ? (xt = 0, Yt = 0, Wt = Ft + W / 2 - ut / 2) : Ut ? (xt = Ft, Yt = "", Wt = W / 2 - St) : Xt ? (xt = Ft - T + W, Yt = "", Wt = T - W / 2 - St) : (xt = Ft - T / 2 + W / 2, Wt = T / 2 - ut / 2)) : Le.includes(m) && (m === "top" ? xt = Ft - T - ut : xt = Ft + W + ut, Gt ? (gt = 0, ge = fe + y / 2 - ke) : Qt ? (gt = "auto", Pe = 0, Ie = y / 2 + J - B - ke) : (gt = fe - g / 2 + y / 2, ge = g / 2 - ke)), _(n, {
      top: `${xt}px`,
      bottom: Yt === "" ? "" : `${Yt}px`,
      left: gt === "auto" ? gt : `${gt}px`,
      right: Pe !== "" ? `${Pe}px` : ""
    }), A(c) && (Wt !== "" && (c.style.top = `${Wt}px`), ge !== "" ? c.style.left = `${ge}px` : Ie !== "" && (c.style.right = `${Ie}px`));
    const Ro = E(
      `updated.bs.${se(e.name)}`
    );
    b(s, Ro);
  });
}, is = {
  template: To(ct),
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
}, mr = (e) => e != null && typeof e == "object" || !1, vr = (e) => mr(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, sn = (e) => vr(e) && e.nodeType === 1 || !1, br = (e) => typeof e == "function" || !1, wr = "1.0.2", nn = "PositionObserver Error";
class yo {
  entries;
  static version = wr;
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
    if (!br(t))
      throw new Error(`${nn}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._callback = t, this._root = sn(s?.root) ? s.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   *
   * @param target an `Element` target
   */
  observe = (t) => {
    if (!sn(t))
      throw new Error(
        `${nn}: ${t} is not an instance of Element.`
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
            const { left: a, top: l, bottom: f, right: g } = r;
            if (i.top !== l || i.left !== a || i.right !== g || i.bottom !== f) {
              const T = { target: o, boundingClientRect: r };
              this.entries.set(o, T), n.push(T);
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
const Co = "data-original-title", _t = "Tooltip", mt = (e, t, s) => {
  if (ae(t) && t.length) {
    let n = t.trim();
    li(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else A(t) ? e.append(t) : (di(t) || ai(t) && t.every(D)) && e.append(...t);
}, Er = (e) => {
  const t = e.name === _t, { id: s, element: n, options: o } = e, {
    title: i,
    placement: r,
    template: c,
    animation: a,
    customClass: l,
    sanitizeFn: f,
    dismissible: g,
    content: T,
    btnClose: M
  } = o, q = t ? ct : Ht, Z = { ...$o };
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
  k(C, "id", s), k(C, "role", ct);
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
  if (A(T)) K = [T.cloneNode(!0)];
  else {
    const y = bt("div");
    mt(y, T, f), K = [...y.childNodes];
  }
  if (g)
    if (i)
      if (A(M))
        m = [...m, M.cloneNode(!0)];
      else {
        const y = bt("div");
        mt(y, M, f), m = [...m, y.firstChild];
      }
    else if (it && it.remove(), A(M))
      K = [...K, M.cloneNode(!0)];
    else {
      const y = bt("div");
      mt(y, M, f), K = [...K, y.firstChild];
    }
  t ? i && J && mt(J, i, f) : (i && it && mt(it, m, f), T && J && mt(J, K, f), e.btn = x(".btn-close", C) || void 0), d(C, "position-absolute"), d(Bt, "position-absolute"), h(C, q) || d(C, q), a && !h(C, N) && d(C, N), l && !h(C, l) && d(C, l), h(C, $t) || d(C, $t);
}, Tr = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = oi(n), Dn(n) || ii(n) || s.push(n);
  return s.find((o, i) => (R(o, "position") !== "relative" || R(o, "position") === "relative" && o.offsetHeight !== o.scrollHeight) && s.slice(i + 1).every(
    (r) => R(r, "position") === "static"
  ) ? o : null) || w(e).body;
}, $r = `[${ot}="${ct}"],[data-tip="${ct}"]`, xo = "title";
let on = (e) => F(e, _t);
const yr = (e) => new Es(e), Cr = (e) => {
  const { element: t, tooltip: s, container: n } = e;
  Pt(t, yn), oo(
    s,
    n
  );
}, Zt = (e) => {
  const { tooltip: t, container: s } = e;
  return t && ps(t, s);
}, xr = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), te(s, Co) && e.name === _t && _o(e), t && t();
}, So = (e, t) => {
  const s = t ? L : O, { element: n } = e;
  s(
    w(n),
    ds,
    e.handleTouch,
    ee
  );
}, rn = (e) => {
  const { element: t } = e, s = E(
    `shown.bs.${se(e.name)}`
  );
  So(e, !0), b(t, s), u.clear(t, "in");
}, cn = (e) => {
  const { element: t } = e, s = E(
    `hidden.bs.${se(e.name)}`
  );
  So(e), Cr(e), b(t, s), u.clear(t, "out");
}, an = (e, t) => {
  const s = t ? L : O, { element: n, tooltip: o } = e, i = P(n, `.${V}`), r = P(n, `.${G}`);
  t ? [n, o].forEach((c) => e._observer.observe(c)) : e._observer.disconnect(), i && s(i, `hide.bs.${V}`, e.handleHide), r && s(r, `hide.bs.${G}`, e.handleHide);
}, _o = (e, t) => {
  const s = [Co, xo], { element: n } = e;
  k(
    n,
    s[t ? 0 : 1],
    t || X(n, s[0]) || ""
  ), Pt(n, s[t ? 1 : 0]);
};
class Es extends st {
  static selector = $r;
  static init = yr;
  static getInstance = on;
  static styleTip = os;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === _t, i = o ? ct : Ht, r = o ? _t : ws;
    on = (f) => F(f, r), this.enabled = !0, this.id = `${i}-${In(n, i)}`;
    const { options: c } = this;
    if (!c.title && o || !o && !c.content)
      return;
    at(is, { titleAttr: "" }), te(n, xo) && o && typeof c.title == "string" && _o(this, c.title);
    const a = Tr(n), l = ["sticky", "fixed", "relative"].some(
      (f) => R(a, "position") === f
    ) ? a : Hn(n);
    this.container = a, this.offsetParent = l, Er(this), this.tooltip && (this._observer = new yo(() => this.update()), this._toggleEventListeners(!0));
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
    return is;
  }
  handleFocus = () => lt(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: n, container: o, id: i } = this, { animation: r } = t, c = u.get(n, "out");
    u.clear(n, "out"), s && !c && !Zt(this) && u.set(
      n,
      () => {
        const a = E(
          `show.bs.${se(this.name)}`
        );
        b(n, a), a.defaultPrevented || (no(s, o), k(n, yn, `#${i}`), this.update(), an(this, !0), h(s, p) || d(s, p), r ? S(s, () => rn(this)) : rn(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: n } = this, { animation: o, delay: i } = t;
    u.clear(n, "in"), s && Zt(this) && u.set(
      n,
      () => {
        const r = E(
          `hide.bs.${se(this.name)}`
        );
        b(n, r), r.defaultPrevented || (this.update(), v(s, p), an(this), o ? S(s, () => cn(this)) : cn(this));
      },
      i + 17,
      "out"
    );
  }
  update = () => {
    os(this);
  };
  toggle = () => {
    const { tooltip: t } = this;
    t && !Zt(this) ? this.show() : this.hide();
  };
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  disable() {
    const { tooltip: t, enabled: s } = this;
    s && (t && Zt(this) && this.hide(), this._toggleEventListeners(), this.enabled = !s);
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
    const s = t ? L : O, { element: n, options: o, btn: i } = this, { trigger: r } = o, a = !!(this.name !== _t && o.dismissible);
    r.includes("manual") || (this.enabled = !!t, r.split(" ").forEach((f) => {
      f === Wo ? (s(n, xn, this.handleShow), s(n, Ce, this.handleShow), a || (s(n, ls, this.handleHide), s(
        w(n),
        ds,
        this.handleTouch,
        ee
      ))) : f === I ? s(n, f, a ? this.handleShow : this.toggle) : f === cs && (s(n, as, this.handleShow), a || s(n, Cn, this.handleHide), Xo() && s(n, I, this.handleFocus)), a && i && s(i, I, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => xr(n, () => super.dispose()),
      17
    );
    s.animation && Zt(n) ? (this.options.delay = 0, this.hide(), S(t, o)) : o();
  }
}
const Sr = `[${ot}="${Ht}"],[data-tip="${Ht}"]`, _r = at({}, is, {
  template: To(Ht),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Ar = (e) => F(e, ws), Dr = (e) => new Ao(e);
class Ao extends Es {
  static selector = Sr;
  static init = Dr;
  static getInstance = Ar;
  static styleTip = os;
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
    return _r;
  }
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => lt(s), 17);
  };
}
const Hr = "scrollspy", Do = "ScrollSpy", Pr = '[data-bs-spy="scroll"]', Ir = "[href]", kr = {
  offset: 10,
  target: void 0
}, Lr = (e) => F(e, Do), Or = (e) => new Po(e), ln = E(`activate.bs.${Hr}`), Nr = (e) => {
  const {
    target: t,
    _itemsLength: s,
    _observables: n
  } = e, o = fs("A", t), i = w(t);
  !o.length || s === n.size || (n.clear(), Array.from(o).forEach((r) => {
    const c = X(r, "href")?.slice(1), a = c?.length ? i.getElementById(c) : null;
    a && !nt(r) && e._observables.set(a, r);
  }), e._itemsLength = e._observables.size);
}, Ho = (e) => {
  Array.from(fs("A", e)).forEach(
    (t) => {
      h(t, $) && v(t, $);
    }
  );
}, dn = (e, t) => {
  const { target: s, element: n } = e;
  Ho(s), e._activeItem = t, d(t, $);
  let o = t;
  for (; o !== s; )
    if (o = o.parentElement, ["nav", "dropdown-menu", "list-group"].some(
      (i) => h(o, i)
    )) {
      const i = o.previousElementSibling;
      i && !h(i, $) && d(i, $);
    }
  ln.relatedTarget = t, b(n, ln);
}, Ke = (e, t) => {
  const { scrollTarget: s, element: n, options: o } = e;
  return (s !== n ? It(t).top + s.scrollTop : t.offsetTop) - (o.offset || 10);
};
class Po extends st {
  static selector = Pr;
  static init = Or;
  static getInstance = Lr;
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
    i && (this.target = i, this.scrollTarget = n.clientHeight < n.scrollHeight ? n : dt(n), this._observables = /* @__PURE__ */ new Map(), this.refresh(), this._observer = new yo(() => {
      requestAnimationFrame(() => this.refresh());
    }, {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Do;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return kr;
  }
  refresh = () => {
    const { target: t, scrollTarget: s } = this;
    if (!t || t.offsetHeight === 0) return;
    Nr(this);
    const { _itemsLength: n, _observables: o, _activeItem: i } = this;
    if (!n) return;
    const r = o.entries().toArray(), { scrollTop: c, scrollHeight: a, clientHeight: l } = s;
    if (c >= a - l) {
      const g = r[n - 1]?.[1];
      i !== g && dn(this, g);
      return;
    }
    const f = r[0]?.[0] ? Ke(this, r[0][0]) : null;
    if (f !== null && c < f && f > 0) {
      this._activeItem = null, Ho(t);
      return;
    }
    for (let g = 0; g < n; g += 1) {
      const [T, M] = r[g], q = Ke(this, T), Z = r[g + 1]?.[0], m = Z ? Ke(this, Z) : null;
      if (i !== M && c >= q && (m === null || c < m)) {
        dn(this, M);
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
    const s = P(t.target, Ir), n = s && X(s, "href")?.slice(1), o = n && hi(n, this.target);
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
    (t ? L : O)(s, I, i), t ? n?.forEach((c, a) => o.observe(a)) : o.disconnect();
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const he = "tab", Io = "Tab", rs = `[${ot}="${he}"]`, ko = (e) => F(e, Io), Mr = (e) => new Lo(e), Ve = E(
  `show.bs.${he}`
), hn = E(
  `shown.bs.${he}`
), qe = E(
  `hide.bs.${he}`
), fn = E(
  `hidden.bs.${he}`
), ie = /* @__PURE__ */ new Map(), gn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && h(t, kt) && (t.style.height = "", v(t, kt)), s && u.clear(s);
}, un = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = A(o) && ie.get(o) || { tab: null };
  if (s && n && h(n, N)) {
    const { currentHeight: r, nextHeight: c } = ie.get(t) || { currentHeight: 0, nextHeight: 0 };
    r !== c ? setTimeout(() => {
      s.style.height = `${c}px`, Ot(s), S(s, () => gn(e));
    }, 50) : gn(e);
  } else o && u.clear(o);
  hn.relatedTarget = i, b(t, hn);
}, pn = (e) => {
  const { element: t, content: s, tabContent: n, nav: o } = e, { tab: i, content: r } = o && ie.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && h(s, N) && ([r, s].forEach((a) => {
    a && d(a, "overflow-hidden");
  }), c = r ? r.scrollHeight : 0), Ve.relatedTarget = i, fn.relatedTarget = t, b(t, Ve), !Ve.defaultPrevented) {
    if (s && d(s, $), r && v(r, $), n && s && h(s, N)) {
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
    s && s && h(s, N) ? setTimeout(() => {
      d(s, p), S(s, () => {
        un(e);
      });
    }, 1) : (s && d(s, p), un(e)), i && b(i, fn);
  }
}, mn = (e) => {
  const { nav: t } = e;
  if (!A(t))
    return { tab: null, content: null };
  const s = rt(
    $,
    t
  );
  let n = null;
  s.length === 1 && !Lt.some(
    (i) => h(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = A(n) ? z(n) : null;
  return { tab: n, content: o };
}, vn = (e) => {
  if (!A(e)) return null;
  const t = P(e, `.${Lt.join(",.")}`);
  return t ? x(`.${Lt[0]}-toggle`, t) : null;
}, Br = (e) => {
  const t = P(e.target, rs), s = t && ko(t);
  s && (e.preventDefault(), s.show());
};
class Lo extends st {
  static selector = rs;
  static init = Mr;
  static getInstance = ko;
  constructor(t) {
    super(t);
    const { element: s } = this, n = z(s);
    if (!n) return;
    const o = P(s, ".nav"), i = P(
      n,
      ".tab-content"
    );
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = vn(s);
    const { tab: r } = mn(this);
    if (o && !r) {
      const c = x(rs, o), a = c && z(c);
      a && (d(c, $), d(a, p), d(a, $), k(s, Oe, "true"));
    }
    this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Io;
  }
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (n && u.get(n) || h(t, $)) return;
    const { tab: i, content: r } = mn(this);
    if (n && i && ie.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), qe.relatedTarget = t, !A(i) || (b(i, qe), qe.defaultPrevented)) return;
    d(t, $), k(t, Oe, "true");
    const c = A(i) && vn(i);
    if (c && h(c, $) && v(c, $), n) {
      const a = () => {
        i && (v(i, $), k(i, Oe, "false")), o && !h(o, $) && d(o, $);
      };
      r && (h(r, N) || s && h(s, N)) ? u.set(n, a, 1) : a();
    }
    r && (v(r, p), h(r, N) ? S(r, () => pn(this)) : pn(this));
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? L : O)(this.element, I, Br);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Q = "toast", Oo = "Toast", Rr = `.${Q}`, Fr = `[${Se}="${Q}"]`, No = `[${ot}="${Q}"]`, qt = "showing", Mo = "hide", Wr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Ts = (e) => F(e, Oo), jr = (e) => new Bo(e), bn = E(
  `show.bs.${Q}`
), zr = E(
  `shown.bs.${Q}`
), wn = E(
  `hide.bs.${Q}`
), Kr = E(
  `hidden.bs.${Q}`
), En = (e) => {
  const { element: t, options: s } = e;
  v(t, qt), u.clear(t, qt), b(t, zr), s.autohide && u.set(t, () => e.hide(), s.delay, Q);
}, Tn = (e) => {
  const { element: t } = e;
  v(t, qt), v(t, p), d(t, Mo), u.clear(t, Q), b(t, Kr);
}, Vr = (e) => {
  const { element: t, options: s } = e;
  d(t, qt), s.animation ? (Ot(t), S(t, () => Tn(e))) : Tn(e);
}, qr = (e) => {
  const { element: t, options: s } = e;
  u.set(
    t,
    () => {
      v(t, Mo), Ot(t), d(t, p), d(t, qt), s.animation ? S(t, () => En(e)) : En(e);
    },
    17,
    qt
  );
}, Yr = (e) => {
  const { target: t } = e, s = t && P(t, No), n = s && z(s), o = n && Ts(n);
  o && (s && s.tagName === "A" && e.preventDefault(), o.relatedTarget = s, o.show());
}, Ur = (e) => {
  const t = e.target, s = Ts(t), { type: n, relatedTarget: o } = e;
  !s || t === o || t.contains(o) || ([Ce, as].includes(n) ? u.clear(t, Q) : u.set(t, () => s.hide(), s.options.delay, Q));
};
class Bo extends st {
  static selector = Rr;
  static init = jr;
  static getInstance = Ts;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !h(n, N) ? d(n, N) : !o.animation && h(n, N) && v(n, N), this.dismiss = x(Fr, n), this.triggers = [
      ...Y(
        No,
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
    return Oo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Wr;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return h(this.element, p);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (b(t, bn), bn.defaultPrevented || qr(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (b(t, wn), wn.defaultPrevented || Vr(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? L : O, { element: n, triggers: o, dismiss: i, options: r, hide: c } = this;
    i && s(i, I, c), r.autohide && [as, Cn, Ce, ls].forEach(
      (a) => s(n, a, Ur)
    ), o.length && o.forEach((a) => {
      nt(a) || s(a, I, Yr);
    });
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), u.clear(t, Q), s && v(t, p), super.dispose();
  }
}
const $s = /* @__PURE__ */ new Map();
[
  Nn,
  Bn,
  Wn,
  Kn,
  Qn,
  mo,
  Eo,
  Ao,
  Po,
  Lo,
  Bo,
  Es
].forEach((e) => $s.set(e.prototype.name, e));
const Xr = (e, t) => {
  [...t].forEach((s) => e(s));
}, Gr = (e, t) => {
  const s = At.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, $n = (e) => {
  const t = e && e.nodeName ? e : document, s = [...fs("*", t)];
  $s.forEach((n) => {
    const { init: o, selector: i } = n;
    Xr(
      o,
      s.filter((r) => Pn(r, i))
    );
  });
}, Qr = (e) => {
  const t = e && e.nodeName ? e : document;
  $s.forEach((s) => {
    Gr(s.prototype.name, t);
  });
};
document.body ? $n() : L(document, "DOMContentLoaded", () => $n(), {
  once: !0
});
export {
  Nn as Alert,
  Bn as Button,
  Wn as Carousel,
  Kn as Collapse,
  Qn as Dropdown,
  mo as Modal,
  Eo as Offcanvas,
  Ao as Popover,
  Po as ScrollSpy,
  Lo as Tab,
  Bo as Toast,
  Es as Tooltip,
  $n as initCallback,
  Qr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
