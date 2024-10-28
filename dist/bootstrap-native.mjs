const bn = "aria-describedby", me = "aria-expanded", se = "aria-hidden", be = "aria-modal", vs = "aria-pressed", Le = "aria-selected", ss = "focus", ns = "focusin", En = "focusout", Ee = "keydown", No = "keyup", N = "click", wn = "mousedown", Oo = "hover", we = "mouseenter", os = "mouseleave", ko = "pointerdown", _o = "pointermove", Mo = "pointerup", is = "touchstart", Bo = "dragstart", Ro = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', je = "ArrowDown", ze = "ArrowUp", bs = "ArrowLeft", Es = "ArrowRight", rs = "Escape", Fo = "transitionDuration", Wo = "transitionDelay", Ne = "transitionend", Tn = "transitionProperty", Vo = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || /* istanbul ignore next @preserve */
  e.test(
    navigator?.userAgent
  ) || !1;
}, ve = () => {
}, jo = (e, t, s, n) => {
  const o = n || !1;
  e.addEventListener(
    t,
    s,
    o
  );
}, zo = (e, t, s, n) => {
  const o = n || !1;
  e.removeEventListener(
    t,
    s,
    o
  );
}, et = (e, t) => e.getAttribute(t), Gt = (e, t) => e.hasAttribute(t), O = (e, t, s) => e.setAttribute(t, s), Pt = (e, t) => e.removeAttribute(t), h = (e, ...t) => {
  e.classList.add(...t);
}, m = (e, ...t) => {
  e.classList.remove(...t);
}, f = (e, t) => e.classList.contains(t), ne = (e) => e != null && typeof e == "object" || !1, H = (e) => ne(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, T = (e) => H(e) && e.nodeType === 1 || !1, Bt = /* @__PURE__ */ new Map(), Dt = {
  data: Bt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, s) => {
    T(e) && (Bt.has(t) || Bt.set(t, /* @__PURE__ */ new Map()), Bt.get(t).set(e, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => Bt.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!T(e) || !t) return null;
    const s = Dt.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (e, t) => {
    const s = Dt.getAllFor(t);
    !s || !T(e) || (s.delete(e), s.size === 0 && Bt.delete(t));
  }
}, W = (e, t) => Dt.get(e, t), oe = (e) => typeof e == "string" || !1, Ko = (e) => ne(e) && e.constructor.name === "Window" || !1, $n = (e) => H(e) && e.nodeType === 9 || !1, E = (e) => Ko(e) ? e.document : $n(e) ? e : H(e) ? e.ownerDocument : globalThis.document, ct = (e, ...t) => Object.assign(e, ...t), Et = (e) => {
  if (!e) return;
  if (oe(e))
    return E().createElement(e);
  const { tagName: t } = e, s = Et(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, ct(s, n);
}, b = (e, t) => e.dispatchEvent(t), z = (e, t) => {
  const s = getComputedStyle(e), n = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, Uo = (e) => {
  const t = z(e, Tn), s = z(e, Wo), n = s.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = t && t !== "none" ? parseFloat(s) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, ie = (e) => {
  const t = z(e, Tn), s = z(e, Fo), n = s.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = t && t !== "none" ? parseFloat(s) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, A = (e, t) => {
  let s = 0;
  const n = new Event(Ne), o = ie(e), i = Uo(e);
  if (o) {
    const r = (a) => {
      a.target === e && (t.apply(e, [a]), e.removeEventListener(Ne, r), s = 1);
    };
    e.addEventListener(Ne, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, lt = (e, t) => e.focus(t), ws = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, he = (e) => Object.entries(e), Wt = (e) => e.toLowerCase(), Xo = (e, t, s, n) => {
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, a = {}, c = "title";
  return he(i).forEach(([l, d]) => {
    const g = typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(
      /[A-Z]/g,
      (y) => Wt(y)
    ) : (
      /* istanbul ignore next @preserve */
      l
    );
    a[g] = ws(d);
  }), he(o).forEach(([l, d]) => {
    o[l] = ws(d);
  }), he(t).forEach(([l, d]) => {
    l in o ? r[l] = o[l] : l in a ? r[l] = a[l] : r[l] = l === c ? et(e, c) : d;
  }), r;
}, Ts = (e) => Object.keys(e), w = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return ne(t) && ct(s, t), s;
}, Jt = { passive: !0 }, Nt = (e) => e.offsetHeight, P = (e, t) => {
  he(t).forEach(([s, n]) => {
    if (n && oe(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, ct(e.style, o);
    }
  });
}, Ke = (e) => ne(e) && e.constructor.name === "Map" || !1, qo = (e) => typeof e == "number" || !1, mt = /* @__PURE__ */ new Map(), p = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, s, n) => {
    T(e) && (n && n.length ? (mt.has(e) || mt.set(e, /* @__PURE__ */ new Map()), mt.get(e).set(n, setTimeout(t, s))) : mt.set(e, setTimeout(t, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!T(e)) return null;
    const s = mt.get(e);
    return t && s && Ke(s) ? s.get(t) || /* istanbul ignore next @preserve */
    null : qo(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!T(e)) return;
    const s = mt.get(e);
    t && t.length && Ke(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && mt.delete(e)) : (clearTimeout(s), mt.delete(e));
  }
}, Z = (e, t) => (H(t) ? t : E()).querySelectorAll(e), Ue = /* @__PURE__ */ new Map();
function Yo(e) {
  const { shiftKey: t, code: s } = e, n = E(this), o = [
    ...Z(Ro, this)
  ].filter(
    (a) => !Gt(a, "disabled") && !et(a, se)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const Zo = (e) => Ue.has(e) === !0, Te = (e) => {
  const t = Zo(e);
  (t ? zo : jo)(e, "keydown", Yo), t ? Ue.delete(e) : Ue.set(e, !0);
}, re = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: a } = e.getBoundingClientRect();
  let c = 1, l = 1;
  if (t && T(e)) {
    const { offsetWidth: d, offsetHeight: g } = e;
    c = d > 0 ? Math.round(s) / d : (
      /* istanbul ignore next @preserve */
      1
    ), l = g > 0 ? Math.round(n) / g : (
      /* istanbul ignore next @preserve */
      1
    );
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
}, yt = (e) => E(e).body, dt = (e) => E(e).documentElement, yn = (e) => H(e) && e.constructor.name === "ShadowRoot" || !1, Go = (e) => e.nodeName === "HTML" ? e : T(e) && e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
H(e) && e.parentNode || // DOM Element detected
yn(e) && e.host || // ShadowRoot detected
dt(e);
let $s = 0, ys = 0;
const Rt = /* @__PURE__ */ new Map(), Cn = (e, t) => {
  let s = t ? $s : ys;
  if (t) {
    const n = Cn(e), o = Rt.get(n) || /* @__PURE__ */ new Map();
    Rt.has(n) || Rt.set(n, o), Ke(o) && !o.has(t) ? (o.set(t, s), $s += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    Rt.has(n) ? s = Rt.get(n) : (Rt.set(n, s), ys += 1);
  }
  return s;
}, Jo = (e) => e ? $n(e) ? e.defaultView : H(e) ? e?.ownerDocument?.defaultView : e : window, Qo = (e) => Array.isArray(e) || !1, Sn = (e) => {
  if (!H(e)) return !1;
  const { top: t, bottom: s } = re(e), { clientHeight: n } = dt(e);
  return t <= n && s >= 0;
}, ti = (e) => typeof e == "function" || !1, ei = (e) => ne(e) && e.constructor.name === "NodeList" || !1, $t = (e) => dt(e).dir === "rtl", si = (e) => H(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, k = (e, t) => e ? e.closest(t) || // break out of `ShadowRoot`
k(e.getRootNode().host, t) : null, D = (e, t) => T(e) ? e : (H(t) ? t : E()).querySelector(e), as = (e, t) => (H(t) ? t : E()).getElementsByTagName(
  e
), rt = (e, t) => (t && H(t) ? t : E()).getElementsByClassName(
  e
), xn = (e, t) => e.matches(t), Ft = {}, Dn = (e) => {
  const { type: t, currentTarget: s } = e;
  [...Ft[t]].forEach(([n, o]) => {
    s === n && [...o].forEach(([i, r]) => {
      i.apply(n, [e]), typeof r == "object" && r.once && B(n, t, i, r);
    });
  });
}, M = (e, t, s, n) => {
  Ft[t] || (Ft[t] = /* @__PURE__ */ new Map());
  const o = Ft[t];
  o.has(e) || o.set(e, /* @__PURE__ */ new Map());
  const i = o.get(e), { size: r } = i;
  i.set(s, n);
  r || e.addEventListener(t, Dn, n);
}, B = (e, t, s, n) => {
  const o = Ft[t], i = o && o.get(e), r = i && i.get(s), a = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s);
  o && (!i || !i.size) && o.delete(e);
  (!o || !o.size) && delete Ft[t];
  (!i || !i.size) && e.removeEventListener(
    t,
    Dn,
    a
  );
}, _ = "fade", u = "show", $e = "data-bs-dismiss", ye = "alert", Hn = "Alert", ni = "5.1.0", oi = ni;
class st {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(t, s) {
    let n;
    try {
      if (T(t))
        n = t;
      else if (oe(t)) {
        if (n = D(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (i) {
      throw Error(`${this.name} Error: ${i.message}`);
    }
    const o = Dt.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && Ts(this.defaults).length ? Xo(n, this.defaults, s || {}, "bs") : {}, Dt.set(n, this.name, this);
  }
  // istanbul ignore next @preserve
  get version() {
    return oi;
  }
  // istanbul ignore next @preserve
  get name() {
    return "BaseComponent";
  }
  // istanbul ignore next @preserve
  get defaults() {
    return {};
  }
  /** just to have something to extend from */
  // istanbul ignore next @preserve coverage wise this isn't important
  _toggleEventListeners = () => {
  };
  /** Removes component from target element. */
  dispose() {
    Dt.remove(this.element, this.name), Ts(this).forEach((t) => {
      delete this[t];
    });
  }
}
const ii = `.${ye}`, ri = `[${$e}="${ye}"]`, ai = (e) => W(e, Hn), ci = (e) => new An(e), Cs = w(
  `close.bs.${ye}`
), li = w(
  `closed.bs.${ye}`
), Ss = (e) => {
  const { element: t } = e;
  b(t, li), e._toggleEventListeners(), e.dispose(), t.remove();
};
class An extends st {
  static selector = ii;
  static init = ci;
  static getInstance = ai;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = D(ri, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return Hn;
  }
  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element: t } = this;
    t && f(t, u) && (b(t, Cs), Cs.defaultPrevented || (m(t, u), f(t, _) ? A(t, () => Ss(this)) : Ss(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? M : B, { dismiss: n, close: o } = this;
    n && s(n, N, o);
  };
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const $ = "active", ot = "data-bs-toggle", di = "button", Pn = "Button", hi = `[${ot}="${di}"]`, fi = (e) => W(e, Pn), gi = (e) => new In(e);
class In extends st {
  static selector = hi;
  static init = gi;
  static getInstance = fi;
  isActive = !1;
  /**
   * @param target usually a `.btn` element
   */
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = f(s, $), O(s, vs, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Pn;
  }
  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (t) => {
    t && t.preventDefault();
    const { element: s, isActive: n } = this;
    !f(s, "disabled") && !et(s, "disabled") && ((n ? m : h)(s, $), O(s, vs, n ? "false" : "true"), this.isActive = f(s, $));
  };
  // BUTTON PRIVATE METHOD
  // =====================
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? M : B)(this.element, N, this.toggle);
  };
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Xe = "data-bs-target", Ht = "carousel", Ln = "Carousel", xs = "data-bs-parent", pi = "data-bs-container", U = (e) => {
  const t = [Xe, xs, pi, "href"], s = E(e);
  return t.map((n) => {
    const o = et(e, n);
    return o ? n === xs ? k(e, o) : D(o, s) : null;
  }).filter((n) => n)[0];
}, ae = `[data-bs-ride="${Ht}"]`, Y = `${Ht}-item`, qe = "data-bs-slide-to", bt = "data-bs-slide", wt = "paused", Ds = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ht = (e) => W(e, Ln), ui = (e) => new On(e);
let Zt = 0, fe = 0, Oe = 0;
const ke = w(`slide.bs.${Ht}`), Ye = w(`slid.bs.${Ht}`), Hs = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = Ze(e), a = s === "left" ? "next" : "prev", c = s === "left" ? "start" : "end";
    h(o[t], $), m(o[t], `${Y}-${a}`), m(o[t], `${Y}-${c}`), m(o[r], $), m(o[r], `${Y}-${c}`), b(n, Ye), p.clear(n, bt), e.cycle && !E(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function mi() {
  const e = ht(this);
  e && !e.isPaused && !p.get(this, wt) && h(this, wt);
}
function vi() {
  const e = ht(this);
  e && e.isPaused && !p.get(this, wt) && e.cycle();
}
function bi(e) {
  e.preventDefault();
  const t = k(this, ae) || U(this), s = ht(t);
  if (s && !s.isAnimating) {
    const n = +(et(this, qe) || // istanbul ignore next @preserve
    0);
    this && !f(this, $) && // event target is not active
    !Number.isNaN(n) && s.to(n);
  }
}
function Ei(e) {
  e.preventDefault();
  const t = k(this, ae) || U(this), s = ht(t);
  if (s && !s.isAnimating) {
    const n = et(this, bt);
    n === "next" ? s.next() : n === "prev" && s.prev();
  }
}
const wi = ({ code: e, target: t }) => {
  const s = E(t), [n] = [...Z(ae, s)].filter(
    (i) => Sn(i)
  ), o = ht(n);
  if (o && !o.isAnimating && !/textarea|input/i.test(t.nodeName)) {
    const i = $t(n);
    e === (i ? Es : bs) ? o.prev() : e === (i ? bs : Es) && o.next();
  }
};
function As(e) {
  const { target: t } = e, s = ht(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(t) || !s.controls.includes(t)) && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
}
function Ti(e) {
  const { target: t } = e, s = ht(this);
  if (s && !s.isAnimating && !s.isTouch) {
    const { controls: n, indicators: o } = s;
    [...n, ...o].every(
      (i) => i === t || i.contains(t)
    ) || (Zt = e.pageX, this.contains(t) && (s.isTouch = !0, Nn(s, !0)));
  }
}
const $i = (e) => {
  fe = e.pageX;
}, yi = (e) => {
  const { target: t } = e, s = E(t), n = [...Z(ae, s)].map((o) => ht(o)).find((o) => o.isTouch);
  if (n) {
    const { element: o, index: i } = n, r = $t(o);
    Oe = e.pageX, n.isTouch = !1, Nn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Zt - Oe) > 120 && (fe < Zt ? n.to(i + (r ? -1 : 1)) : fe > Zt && n.to(i + (r ? 1 : -1))), Zt = 0, fe = 0, Oe = 0;
  }
}, _e = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => m(n, $)), e.indicators[t] && h(s[t], $);
}, Nn = (e, t) => {
  const { element: s } = e, n = t ? M : B;
  n(
    E(s),
    _o,
    $i,
    Jt
  ), n(
    E(s),
    Mo,
    yi,
    Jt
  );
}, Ze = (e) => {
  const { slides: t, element: s } = e, n = D(`.${Y}.${$}`, s);
  return T(n) ? [...t].indexOf(n) : -1;
};
class On extends st {
  static selector = ae;
  static init = ui;
  static getInstance = ht;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.direction = $t(n) ? "right" : "left", this.isTouch = !1, this.slides = rt(Y, n);
    const { slides: o } = this;
    if (o.length >= 2) {
      const i = Ze(this), r = [...o].find(
        (l) => xn(l, `.${Y}-next,.${Y}-next`)
      );
      this.index = i;
      const a = E(n);
      this.controls = [
        ...Z(`[${bt}]`, n),
        ...Z(
          `[${bt}][${Xe}="#${n.id}"]`,
          a
        )
      ].filter((l, d, g) => d === g.indexOf(l)), this.indicator = D(`.${Ht}-indicators`, n), this.indicators = [
        ...this.indicator ? Z(`[${qe}]`, this.indicator) : [],
        ...Z(
          `[${qe}][${Xe}="#${n.id}"]`,
          a
        )
      ].filter((l, d, g) => d === g.indexOf(l));
      const { options: c } = this;
      this.options.interval = c.interval === !0 ? Ds.interval : c.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, h(o[0], $), this.indicators.length && _e(this, 0)), this.indicators.length && _e(this, this.index), this._toggleEventListeners(!0), c.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ln;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ds;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return f(this.element, wt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return D(
      `.${Y}-next,.${Y}-prev`,
      this.element
    ) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: t, options: s, isPaused: n, index: o } = this;
    p.clear(t, Ht), n && (p.clear(t, wt), m(t, wt)), p.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && Sn(t) && this.to(o + 1);
      },
      s.interval,
      Ht
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: t, options: s } = this;
    !this.isPaused && s.interval && (h(t, wt), p.set(
      t,
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
  to(t) {
    const { element: s, slides: n, options: o } = this, i = Ze(this), r = $t(s);
    let a = t;
    if (!this.isAnimating && i !== a && !p.get(s, bt)) {
      i < a || i === 0 && a === n.length - 1 ? this.direction = r ? "right" : "left" : (i > a || i === n.length - 1 && a === 0) && (this.direction = r ? "left" : "right");
      const { direction: c } = this;
      a < 0 ? a = n.length - 1 : a >= n.length && (a = 0);
      const l = c === "left" ? "next" : "prev", d = c === "left" ? "start" : "end", g = {
        relatedTarget: n[a],
        from: i,
        to: a,
        direction: c
      };
      ct(ke, g), ct(Ye, g), b(s, ke), ke.defaultPrevented || (this.index = a, _e(this, a), ie(n[a]) && f(s, "slide") ? p.set(
        s,
        () => {
          h(n[a], `${Y}-${l}`), Nt(n[a]), h(n[a], `${Y}-${d}`), h(n[i], `${Y}-${d}`), A(
            n[a],
            () => this.slides && this.slides.length && Hs(this)
          );
        },
        0,
        bt
      ) : (h(n[a], $), m(n[i], $), p.set(
        s,
        () => {
          p.clear(s, bt), s && o.interval && !this.isPaused && this.cycle(), b(s, Ye);
        },
        0,
        bt
      )));
    }
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (t) => {
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: a, pause: c, interval: l, keyboard: d } = n, g = t ? M : B;
    c && l && (g(s, we, mi), g(s, os, vi)), a && o.length > 2 && (g(
      s,
      ko,
      Ti,
      Jt
    ), g(s, is, As, { passive: !1 }), g(s, Bo, As, { passive: !1 })), i.length && i.forEach((y) => {
      y && g(y, N, Ei);
    }), r.length && r.forEach((y) => {
      g(y, N, bi);
    }), d && g(E(s), Ee, wi);
  };
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: t } = this, s = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose(), s.isAnimating && A(s.slides[s.index], () => {
      Hs(s);
    });
  }
}
const It = "collapsing", K = "collapse", kn = "Collapse", Ci = `.${K}`, _n = `[${ot}="${K}"]`, Si = { parent: null }, ge = (e) => W(e, kn), xi = (e) => new Mn(e), Ps = w(`show.bs.${K}`), Di = w(`shown.bs.${K}`), Is = w(`hide.bs.${K}`), Hi = w(`hidden.bs.${K}`), Ai = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Ps), Ps.defaultPrevented || (p.set(t, ve, 17), s && p.set(s, ve, 17), h(t, It), m(t, K), P(t, { height: `${t.scrollHeight}px` }), A(t, () => {
    p.clear(t), s && p.clear(s), n.forEach((o) => O(o, me, "true")), m(t, It), h(t, K), h(t, u), P(t, { height: "" }), b(t, Di);
  }));
}, Ls = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Is), Is.defaultPrevented || (p.set(t, ve, 17), s && p.set(s, ve, 17), P(t, { height: `${t.scrollHeight}px` }), m(t, K), m(t, u), h(t, It), Nt(t), P(t, { height: "0px" }), A(t, () => {
    p.clear(t), s && p.clear(s), n.forEach((o) => O(o, me, "false")), m(t, It), h(t, K), P(t, { height: "" }), b(t, Hi);
  }));
}, Pi = (e) => {
  const { target: t } = e, s = t && k(t, _n), n = s && U(s), o = n && ge(n);
  o && o.toggle(), s && s.tagName === "A" && e.preventDefault();
};
class Mn extends st {
  static selector = Ci;
  static init = xi;
  static getInstance = ge;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = E(n);
    this.triggers = [...Z(_n, i)].filter(
      (r) => U(r) === n
    ), this.parent = T(o.parent) ? o.parent : oe(o.parent) ? U(n) || D(o.parent, i) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return kn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Si;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers: t, element: s } = this;
    p.get(s) || (Ls(this), t.length && t.forEach((n) => h(n, `${K}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: t, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [
      ...Z(`.${K}.${u}`, s)
    ].find((r) => ge(r)), i = o && ge(o)), (!s || !p.get(s)) && !p.get(t) && (i && o !== t && (Ls(i), i.triggers.forEach((r) => {
      h(r, `${K}d`);
    })), Ai(this), n.length && n.forEach((r) => m(r, `${K}d`)));
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    f(this.element, u) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? M : B, { triggers: n } = this;
    n.length && n.forEach(
      (o) => s(o, N, Pi)
    );
  };
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Lt = ["dropdown", "dropup", "dropstart", "dropend"], Bn = "Dropdown", Rn = "dropdown-menu", Fn = (e) => {
  const t = k(e, "A");
  return e.tagName === "A" && // anchor href starts with #
  Gt(e, "href") && et(e, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  t && Gt(t, "href") && et(t, "href").slice(-1) === "#";
}, [tt, Ge, Je, Qe] = Lt, Wn = `[${ot}="${tt}"]`, Vt = (e) => W(e, Bn), Ii = (e) => new zn(e), Li = `${Rn}-end`, Ns = [tt, Ge], Os = [Je, Qe], ks = ["A", "BUTTON"], Ni = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, Me = w(
  `show.bs.${tt}`
), _s = w(
  `shown.bs.${tt}`
), Be = w(
  `hide.bs.${tt}`
), Ms = w(`hidden.bs.${tt}`), Vn = w(`updated.bs.${tt}`), jn = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (z(s, "position") !== "static") {
    const r = $t(t), a = f(s, Li);
    ["margin", "top", "bottom", "left", "right"].forEach((L) => {
      const gt = {};
      gt[L] = "", P(s, gt);
    });
    let l = Lt.find(
      (L) => f(n, L)
    ) || // istanbul ignore next @preserve: fallback position
    tt;
    const d = {
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
    }, { offsetWidth: y, offsetHeight: S } = s, { clientWidth: R, clientHeight: v } = dt(t), {
      left: V,
      top: X,
      width: kt,
      height: it
    } = re(t), C = V - y - i < 0, Q = V + y + kt + i >= R, nt = X + S + i >= v, F = X + S + it + i >= v, j = X - S - i < 0, x = (!r && a || r && !a) && V + kt - y < 0, _t = (r && a || !r && !a) && V + y >= R;
    if (Os.includes(l) && C && Q && (l = tt), l === Je && (r ? Q : C) && (l = Qe), l === Qe && (r ? C : Q) && (l = Je), l === Ge && j && !F && (l = tt), l === tt && F && !j && (l = Ge), Os.includes(l) && nt && ct(g[l], {
      top: "auto",
      bottom: 0
    }), Ns.includes(l) && (x || _t)) {
      let L = { left: "auto", right: "auto" };
      !x && _t && !r && (L = { left: "auto", right: 0 }), x && !_t && r && (L = { left: 0, right: "auto" }), L && ct(g[l], L);
    }
    const ft = d[l];
    P(s, {
      ...g[l],
      margin: `${ft.map((L) => L && `${L}px`).join(" ")}`
    }), Ns.includes(l) && a && a && P(s, g[!r && x || r && _t ? "menuStart" : "menuEnd"]), b(n, Vn);
  }
}, Oi = (e) => [...e.children].map((t) => {
  if (t && ks.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && ks.includes(s.tagName) ? s : null;
}).filter((t) => t), Bs = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? M : B, i = E(t);
  o(i, N, Rs), o(i, ss, Rs), o(i, Ee, _i), o(i, No, Mi), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
}, Ce = (e) => {
  const t = [...Lt, "btn-group", "input-group"].map(
    (s) => rt(`${s} ${u}`, E(e))
  ).find((s) => s.length);
  if (t && t.length)
    return [...t[0].children].find(
      (s) => Lt.some((n) => n === et(s, ot))
    );
}, Rs = (e) => {
  const { target: t, type: s } = e;
  if (t && T(t)) {
    const n = Ce(t), o = n && Vt(n);
    if (o) {
      const { parentElement: i, menu: r } = o, a = i && i.contains(t) && (t.tagName === "form" || k(t, "form") !== null);
      [N, wn].includes(s) && Fn(t) && e.preventDefault(), !a && s !== ss && t !== n && t !== r && o.hide();
    }
  }
}, ki = (e) => {
  const { target: t } = e, s = t && k(t, Wn), n = s && Vt(s);
  n && (e.stopPropagation(), n.toggle(), s && Fn(s) && e.preventDefault());
}, _i = (e) => {
  [je, ze].includes(e.code) && e.preventDefault();
};
function Mi(e) {
  const { code: t } = e, s = Ce(this), n = s && Vt(s), { activeElement: o } = s && E(s);
  if (n && o) {
    const { menu: i, open: r } = n, a = Oi(i);
    if (a && a.length && [je, ze].includes(t)) {
      let c = a.indexOf(o);
      o === s ? c = 0 : t === ze ? c = c > 1 ? c - 1 : 0 : t === je && (c = c < a.length - 1 ? c + 1 : c), a[c] && lt(a[c]);
    }
    rs === t && r && (n.toggle(), lt(s));
  }
}
function Bi(e) {
  const t = Ce(e), s = t && Vt(t);
  s && s.open && jn(s);
}
class zn extends st {
  static selector = Wn;
  static init = Ii;
  static getInstance = Vt;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = rt(
      Rn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new IntersectionObserver(
      ([i]) => Bi(i.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Bn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ni;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (!s) {
      const i = Ce(t), r = i && Vt(i);
      r && r.hide(), [Me, _s, Vn].forEach(
        (a) => {
          a.relatedTarget = t;
        }
      ), b(o, Me), Me.defaultPrevented || (h(n, u), h(o, u), O(t, me, "true"), jn(this), this.open = !s, lt(t), Bs(this), b(o, _s));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([Be, Ms].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, Be), Be.defaultPrevented || (m(n, u), m(o, u), O(t, me, "false"), this.open = !s, Bs(this), b(o, Ms)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    (t ? M : B)(this.element, N, ki);
  };
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const q = "modal", cs = "Modal", ls = "Offcanvas", Ri = "fixed-top", Fi = "fixed-bottom", Kn = "sticky-top", Un = "position-sticky", Xn = (e) => [
  ...rt(Ri, e),
  ...rt(Fi, e),
  ...rt(Kn, e),
  ...rt(Un, e),
  ...rt("is-fixed", e)
], Wi = (e) => {
  const t = yt(e);
  P(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = Xn(t);
  s.length && s.forEach((n) => {
    P(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, qn = (e) => {
  const { clientWidth: t } = dt(e), { innerWidth: s } = Jo(e);
  return Math.abs(s - t);
}, Yn = (e, t) => {
  const s = yt(e), n = parseInt(z(s, "paddingRight"), 10), i = z(s, "overflow") === "hidden" && n ? 0 : qn(e), r = Xn(s);
  t && (P(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((a) => {
    const c = z(a, "paddingRight");
    if (a.style.paddingRight = `${parseInt(c, 10) + i}px`, [Kn, Un].some((l) => f(a, l))) {
      const l = z(a, "marginRight");
      a.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, G = "offcanvas", Tt = Et({
  tagName: "div",
  className: "popup-container"
}), Zn = (e, t) => {
  const s = H(t) && t.nodeName === "BODY", n = H(t) && !s ? t : Tt, o = s ? t : yt(e);
  H(e) && (n === Tt && o.append(Tt), n.append(e));
}, Gn = (e, t) => {
  const s = H(t) && t.nodeName === "BODY", n = H(t) && !s ? t : Tt;
  H(e) && (e.remove(), n === Tt && !Tt.children.length && Tt.remove());
}, ds = (e, t) => {
  const s = H(t) && t.nodeName !== "BODY" ? t : Tt;
  return H(e) && s.contains(e);
}, Jn = "backdrop", Fs = `${q}-${Jn}`, Ws = `${G}-${Jn}`, Qn = `.${q}.${u}`, hs = `.${G}.${u}`, I = Et("div"), Ot = (e) => D(
  `${Qn},${hs}`,
  E(e)
), fs = (e) => {
  const t = e ? Fs : Ws;
  [Fs, Ws].forEach((s) => {
    m(I, s);
  }), h(I, t);
}, to = (e, t, s) => {
  fs(s), Zn(I, yt(e)), t && h(I, _);
}, eo = () => {
  f(I, u) || (h(I, u), Nt(I));
}, Se = () => {
  m(I, u);
}, so = (e) => {
  Ot(e) || (m(I, _), Gn(I, yt(e)), Wi(e));
}, no = (e) => T(e) && z(e, "visibility") !== "hidden" && e.offsetParent !== null, Vi = `.${q}`, oo = `[${ot}="${q}"]`, ji = `[${$e}="${q}"]`, io = `${q}-static`, zi = {
  backdrop: !0,
  keyboard: !0
}, Qt = (e) => W(e, cs), Ki = (e) => new co(e), pe = w(
  `show.bs.${q}`
), Vs = w(
  `shown.bs.${q}`
), Re = w(
  `hide.bs.${q}`
), js = w(
  `hidden.bs.${q}`
), ro = (e) => {
  const { element: t } = e, s = qn(t), { clientHeight: n, scrollHeight: o } = dt(t), { clientHeight: i, scrollHeight: r } = t, a = i !== r;
  if (!a && s) {
    const l = { [$t(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    P(t, l);
  }
  Yn(t, a || n !== o);
}, ao = (e, t) => {
  const s = t ? M : B, { element: n } = e;
  s(n, N, qi), s(E(n), Ee, Xi), t ? e._observer.observe(n) : e._observer.disconnect();
}, zs = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  so(s), P(s, { paddingRight: "", display: "" }), ao(e);
  const o = pe.relatedTarget || t.find(no);
  o && lt(o), js.relatedTarget = n, b(s, js), Te(s);
}, Ks = (e) => {
  const { element: t, relatedTarget: s } = e;
  lt(t), ao(e, !0), Vs.relatedTarget = s, b(t, Vs), Te(t);
}, Us = (e) => {
  const { element: t, hasFade: s } = e;
  P(t, { display: "block" }), ro(e), Ot(t) || P(yt(t), { overflow: "hidden" }), h(t, u), Pt(t, se), O(t, be, "true"), s ? A(t, () => Ks(e)) : Ks(e);
}, Xs = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && f(I, u) && !Ot(t) ? (Se(), A(I, () => zs(e))) : zs(e);
}, Ui = (e) => {
  const { target: t } = e, s = t && k(t, oo), n = s && U(s), o = n && Qt(n);
  o && (s && s.tagName === "A" && e.preventDefault(), o.relatedTarget = s, o.toggle());
}, Xi = ({ code: e, target: t }) => {
  const s = D(Qn, E(t)), n = s && Qt(s);
  if (n) {
    const { options: o } = n;
    o.keyboard && e === rs && // the keyboard option is enabled and the key is 27
    f(s, u) && (n.relatedTarget = null, n.hide());
  }
}, qi = (e) => {
  const { currentTarget: t } = e, s = t && Qt(t);
  if (s && t && !p.get(t)) {
    const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: a } = e, c = E(t)?.getSelection()?.toString().length, l = i.contains(a), d = a && k(a, ji);
    o && !l ? p.set(
      t,
      () => {
        h(t, io), A(i, () => Yi(s));
      },
      17
    ) : (d || !c && !o && !l && r) && (s.relatedTarget = d || null, s.hide(), e.preventDefault());
  }
}, Yi = (e) => {
  const { element: t, modalDialog: s } = e, n = (ie(s) || 0) + 17;
  m(t, io), p.set(t, () => p.clear(t), n);
};
class co extends st {
  static selector = Vi;
  static init = Ki;
  static getInstance = Qt;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = D(`.${q}-dialog`, n);
    o && (this.modalDialog = o, this.triggers = [
      ...Z(oo, E(n))
    ].filter(
      (i) => U(i) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = f(n, _), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return cs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return zi;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    f(this.element, u) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: t, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (!f(t, u) && (pe.relatedTarget = o || void 0, b(t, pe), !pe.defaultPrevented)) {
      const a = Ot(t);
      if (a && a !== t) {
        const c = Qt(a) || // istanbul ignore next @preserve
        W(
          a,
          ls
        );
        c && c.hide();
      }
      i ? (ds(I) ? fs(!0) : to(t, n, !0), r = ie(I), eo(), setTimeout(() => Us(this), r)) : (Us(this), a && f(I, u) && Se());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    f(t, u) && (Re.relatedTarget = n || void 0, b(t, Re), Re.defaultPrevented || (m(t, u), O(t, se, "true"), Pt(t, be), s ? A(t, () => Xs(this)) : Xs(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    f(this.element, u) && ro(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? M : B, { triggers: n } = this;
    n.length && n.forEach(
      (o) => s(o, N, Ui)
    );
  };
  /** Removes the `Modal` component from target element. */
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? A(s, o) : o();
  }
}
const Zi = `.${G}`, gs = `[${ot}="${G}"]`, Gi = `[${$e}="${G}"]`, xe = `${G}-toggling`, Ji = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, te = (e) => W(e, ls), Qi = (e) => new go(e), ue = w(`show.bs.${G}`), lo = w(`shown.bs.${G}`), Fe = w(`hide.bs.${G}`), ho = w(`hidden.bs.${G}`), tr = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = dt(t);
  Yn(t, s !== n);
}, fo = (e, t) => {
  const s = t ? M : B, n = E(e.element);
  s(n, Ee, or), s(n, N, nr);
}, qs = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (tr(e), P(yt(t), { overflow: "hidden" })), h(t, xe), h(t, u), P(t, { visibility: "visible" }), A(t, () => ir(e));
}, er = (e) => {
  const { element: t, options: s } = e, n = Ot(t);
  t.blur(), !n && s.backdrop && f(I, u) && Se(), A(t, () => rr(e));
}, sr = (e) => {
  const t = k(e.target, gs), s = t && U(t), n = s && te(s);
  n && (n.relatedTarget = t, n.toggle(), t && t.tagName === "A" && e.preventDefault());
}, nr = (e) => {
  const { target: t } = e, s = D(
    hs,
    E(t)
  ), n = D(
    Gi,
    s
  ), o = s && te(s);
  if (o) {
    const { options: i, triggers: r } = o, { backdrop: a } = i, c = k(t, gs), l = E(s).getSelection();
    (!I.contains(t) || a !== "static") && (!(l && l.toString().length) && (!s.contains(t) && a && // istanbul ignore next @preserve
    (!c || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : null, o.hide()), c && c.tagName === "A" && e.preventDefault());
  }
}, or = ({ code: e, target: t }) => {
  const s = D(
    hs,
    E(t)
  ), n = s && te(s);
  n && n.options.keyboard && e === rs && (n.relatedTarget = null, n.hide());
}, ir = (e) => {
  const { element: t } = e;
  m(t, xe), Pt(t, se), O(t, be, "true"), O(t, "role", "dialog"), b(t, lo), fo(e, !0), lt(t), Te(t);
}, rr = (e) => {
  const { element: t, triggers: s } = e;
  O(t, se, "true"), Pt(t, be), Pt(t, "role"), P(t, { visibility: "" });
  const n = ue.relatedTarget || s.find(no);
  n && lt(n), so(t), b(t, ho), m(t, xe), Te(t), Ot(t) || fo(e);
};
class go extends st {
  static selector = Zi;
  static init = Qi;
  static getInstance = te;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.triggers = [
      ...Z(gs, E(n))
    ].filter(
      (o) => U(o) === n
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ls;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ji;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    f(this.element, u) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (!f(t, u) && (ue.relatedTarget = n || void 0, lo.relatedTarget = n || void 0, b(t, ue), !ue.defaultPrevented)) {
      const i = Ot(t);
      if (i && i !== t) {
        const r = te(i) || // istanbul ignore next @preserve
        W(
          i,
          cs
        );
        r && r.hide();
      }
      s.backdrop ? (ds(I) ? fs() : to(t, !0), o = ie(I), eo(), setTimeout(() => qs(this), o)) : (qs(this), i && f(I, u) && Se());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: t, relatedTarget: s } = this;
    f(t, u) && (Fe.relatedTarget = s || void 0, ho.relatedTarget = s || void 0, b(t, Fe), Fe.defaultPrevented || (h(t, xe), m(t, u), er(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? M : B;
    this.triggers.forEach(
      (n) => s(n, N, sr)
    );
  };
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element: t } = this, s = f(t, u), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? A(t, n) : n();
  }
}
const At = "popover", De = "Popover", at = "tooltip", po = (e) => {
  const t = e === at, s = t ? `${e}-inner` : `${e}-body`, n = t ? "" : `<h3 class="${e}-header"></h3>`, o = `<div class="${e}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${e}" role="${at}">${n + o + i}</div>`;
}, uo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ts = (e) => {
  const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, options: i, arrow: r } = e;
  if (n) {
    const a = { ...uo }, c = $t(s);
    P(n, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const l = e.name === De, { offsetWidth: d, offsetHeight: g } = n, { clientWidth: y, clientHeight: S, offsetWidth: R } = dt(s);
    let { placement: v } = i;
    const { clientWidth: V, offsetWidth: X } = o, it = z(
      o,
      "position"
    ) === "fixed", C = Math.abs(it ? V - X : y - R), Q = c && it ? C : 0, nt = y - (c ? 0 : C) - 1, {
      width: F,
      height: j,
      left: x,
      right: _t,
      top: ft
    } = re(s, !0), { x: L, y: gt } = {
      x,
      y: ft
    };
    P(r, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let Ct = 0, zt = "", pt = 0, He = "", Mt = "", le = "", Ae = "";
    const St = r.offsetWidth || 0, ut = r.offsetHeight || 0, Pe = St / 2;
    let Kt = ft - g - ut < 0, Ut = ft + g + j + ut >= S, Xt = x - d - St < Q, qt = x + d + F + St >= nt;
    const de = ["left", "right"], Ie = ["top", "bottom"];
    Kt = de.includes(v) ? ft + j / 2 - g / 2 - ut < 0 : Kt, Ut = de.includes(v) ? ft + g / 2 + j / 2 + ut >= S : Ut, Xt = Ie.includes(v) ? x + F / 2 - d / 2 < Q : Xt, qt = Ie.includes(v) ? x + d / 2 + F / 2 >= nt : qt, v = de.includes(v) && Xt && qt ? "top" : v, v = v === "top" && Kt ? "bottom" : v, v = v === "bottom" && Ut ? "top" : v, v = v === "left" && Xt ? "right" : v, v = v === "right" && qt ? "left" : v, n.className.includes(v) || (n.className = n.className.replace(
      t,
      a[v]
    )), de.includes(v) ? (v === "left" ? pt = L - d - (l ? St : 0) : pt = L + F + (l ? St : 0), Kt && Ut ? (Ct = 0, zt = 0, Mt = ft + j / 2 - ut / 2) : Kt ? (Ct = gt, zt = "", Mt = j / 2 - St) : Ut ? (Ct = gt - g + j, zt = "", Mt = g - j / 2 - St) : (Ct = gt - g / 2 + j / 2, Mt = g / 2 - ut / 2)) : Ie.includes(v) && (v === "top" ? Ct = gt - g - (l ? ut : 0) : Ct = gt + j + (l ? ut : 0), Xt ? (pt = 0, le = L + F / 2 - Pe) : qt ? (pt = "auto", He = 0, Ae = F / 2 + nt - _t - Pe) : (pt = L - d / 2 + F / 2, le = d / 2 - Pe)), P(n, {
      top: `${Ct}px`,
      bottom: zt === "" ? "" : `${zt}px`,
      left: pt === "auto" ? pt : `${pt}px`,
      right: He !== "" ? `${He}px` : ""
    }), T(r) && (Mt !== "" && (r.style.top = `${Mt}px`), le !== "" ? r.style.left = `${le}px` : Ae !== "" && (r.style.right = `${Ae}px`));
    const Lo = w(
      `updated.bs.${Wt(e.name)}`
    );
    b(s, Lo);
  }
}, es = {
  template: po(at),
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
}, ar = (e) => e != null && typeof e == "object" || !1, cr = (e) => ar(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, Ys = (e) => cr(e) && e.nodeType === 1 || !1, lr = (e) => typeof e == "function" || !1, Zs = "PositionObserver Error";
class mo {
  entries;
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
    if (!lr(t))
      throw new Error(`${Zs}: ${t} is not a function.`);
    this.entries = [], this._callback = t, this._root = Ys(s?.root) ? s.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   * @param target
   */
  observe = (t) => {
    if (!Ys(t))
      throw new Error(
        `${Zs}: ${t} is not an instance of HTMLElement.`
      );
    if (!this._root.contains(t)) return;
    const { clientWidth: s, clientHeight: n } = this._root, o = t.getBoundingClientRect(), { left: i, top: r, bottom: a, right: c, width: l, height: d } = o, g = r > 1 - d && i > 1 - l && a <= n + d - 1 && c <= s + l - 1;
    this.entries.push({ target: t, boundingBox: o, isVisible: g }), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
  };
  /**
   * Stop observing the position of the specified element.
   * @param target
   */
  unobserve = (t) => {
    const s = this.entries.findIndex((n) => n.target === t);
    this.entries.splice(s, 1);
  };
  /**
   * Private method responsible for all the heavy duty.
   */
  _runCallback = () => {
    if (!this.entries.length) return;
    const t = [], { clientWidth: s, clientHeight: n } = this._root;
    this.entries.forEach((o, i) => {
      const { target: r, boundingBox: a } = o, c = r.getBoundingClientRect(), { left: l, top: d, bottom: g, right: y, width: S, height: R } = c;
      if (a.left !== l || a.top !== d || a.right !== y || a.bottom !== g) {
        const v = d > 1 - R && l > 1 - S && g <= n + R - 1 && y <= s + S - 1;
        this.entries[i].boundingBox = c, this.entries[i].isVisible = v, t.push({ target: r, boundingBox: c, isVisible: v });
      }
    }), t.length && this._callback(t), requestAnimationFrame(this._runCallback);
  };
  /**
   * Immediately stop observing all elements.
   */
  disconnect = () => {
    cancelAnimationFrame(this._tick), this.entries.length = 0, this._tick = 0;
  };
}
const vo = "data-original-title", xt = "Tooltip", vt = (e, t, s) => {
  if (oe(t) && t.length) {
    let n = t.trim();
    ti(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else T(t) ? e.append(t) : (ei(t) || Qo(t) && t.every(H)) && e.append(...t);
}, dr = (e) => {
  const t = e.name === xt, { id: s, element: n, options: o } = e, {
    title: i,
    placement: r,
    template: a,
    animation: c,
    customClass: l,
    sanitizeFn: d,
    dismissible: g,
    content: y,
    btnClose: S
  } = o, R = t ? at : At, v = { ...uo };
  let V = [], X = [];
  $t(n) && (v.left = "end", v.right = "start");
  const kt = `bs-${R}-${v[r]}`;
  let it;
  if (T(a))
    it = a;
  else {
    const Q = Et("div");
    vt(Q, a, d), it = Q.firstChild;
  }
  e.tooltip = T(it) ? it.cloneNode(!0) : void 0;
  const { tooltip: C } = e;
  if (C) {
    O(C, "id", s), O(C, "role", at);
    const Q = t ? `${at}-inner` : `${At}-body`, nt = t ? null : D(`.${At}-header`, C), F = D(`.${Q}`, C);
    e.arrow = D(`.${R}-arrow`, C);
    const { arrow: j } = e;
    if (T(i)) V = [i.cloneNode(!0)];
    else {
      const x = Et("div");
      vt(x, i, d), V = [...x.childNodes];
    }
    if (T(y)) X = [y.cloneNode(!0)];
    else {
      const x = Et("div");
      vt(x, y, d), X = [...x.childNodes];
    }
    if (g)
      if (i)
        if (T(S))
          V = [...V, S.cloneNode(!0)];
        else {
          const x = Et("div");
          vt(x, S, d), V = [...V, x.firstChild];
        }
      else if (nt && nt.remove(), T(S))
        X = [...X, S.cloneNode(!0)];
      else {
        const x = Et("div");
        vt(x, S, d), X = [...X, x.firstChild];
      }
    t ? i && F && vt(F, i, d) : (i && nt && vt(nt, V, d), y && F && vt(F, X, d), e.btn = D(".btn-close", C) || void 0), h(C, "position-fixed"), h(j, "position-absolute"), f(C, R) || h(C, R), c && !f(C, _) && h(C, _), l && !f(C, l) && h(C, l), f(C, kt) || h(C, kt);
  }
}, hr = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = Go(n), yn(n) || si(n) || s.push(n);
  return s.find((o, i) => z(o, "position") !== "relative" && s.slice(i + 1).every(
    (r) => z(r, "position") === "static"
  ) ? o : null) || // istanbul ignore next: optional guard
  E(e).body;
}, fr = `[${ot}="${at}"],[data-tip="${at}"]`, bo = "title";
let Gs = (e) => W(e, xt);
const gr = (e) => new ps(e), pr = (e) => {
  const { element: t, tooltip: s, container: n, offsetParent: o } = e;
  Pt(t, bn), Gn(
    s,
    n === o ? n : o
  );
}, Yt = (e) => {
  const { tooltip: t, container: s, offsetParent: n } = e;
  return t && ds(t, s === n ? s : n);
}, ur = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), Gt(s, vo) && e.name === xt && wo(e), t && t();
}, Eo = (e, t) => {
  const s = t ? M : B, { element: n } = e;
  s(
    E(n),
    is,
    e.handleTouch,
    Jt
  );
}, Js = (e) => {
  const { element: t } = e, s = w(
    `shown.bs.${Wt(e.name)}`
  );
  Eo(e, !0), b(t, s), p.clear(t, "in");
}, Qs = (e) => {
  const { element: t } = e, s = w(
    `hidden.bs.${Wt(e.name)}`
  );
  Eo(e), pr(e), b(t, s), p.clear(t, "out");
}, tn = (e, t) => {
  const s = t ? M : B, { element: n } = e, o = k(n, `.${q}`), i = k(n, `.${G}`);
  t ? e._observer.observe(e.element) : e._observer.disconnect(), o && s(o, `hide.bs.${q}`, e.handleHide), i && s(i, `hide.bs.${G}`, e.handleHide);
}, wo = (e, t) => {
  const s = [vo, bo], { element: n } = e;
  O(
    n,
    s[t ? 0 : 1],
    t || et(n, s[0]) || // istanbul ignore next @preserve
    ""
  ), Pt(n, s[t ? 1 : 0]);
};
class ps extends st {
  static selector = fr;
  static init = gr;
  static getInstance = Gs;
  static styleTip = ts;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === xt, i = o ? at : At, r = o ? xt : De;
    Gs = (c) => W(c, r), this.enabled = !0, this.id = `${i}-${Cn(n, i)}`;
    const { options: a } = this;
    !a.title && o || !o && !a.content || (ct(es, { titleAttr: "" }), Gt(n, bo) && o && typeof a.title == "string" && wo(this, a.title), this.container = hr(n), this.offsetParent = ["sticky", "fixed"].some(
      (c) => z(this.container, "position") === c
    ) ? this.container : E(this.element).body, dr(this), this._observer = new mo(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return xt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return es;
  }
  // TOOLTIP PUBLIC METHODS
  // ======================
  /** Handles the focus event on iOS. */
  // istanbul ignore next @preserve - impossible to test without Apple device
  handleFocus = () => lt(this.element);
  /** Shows the tooltip. */
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: n, container: o, offsetParent: i, id: r } = this, { animation: a } = t, c = p.get(n, "out"), l = o === i ? o : i;
    p.clear(n, "out"), s && !c && !Yt(this) && p.set(
      n,
      () => {
        const d = w(
          `show.bs.${Wt(this.name)}`
        );
        b(n, d), d.defaultPrevented || (Zn(s, l), O(n, bn, `#${r}`), this.update(), tn(this, !0), f(s, u) || h(s, u), a ? A(s, () => Js(this)) : Js(this));
      },
      17,
      "in"
    );
  }
  /** Hides the tooltip. */
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: n } = this, { animation: o, delay: i } = t;
    p.clear(n, "in"), s && Yt(this) && p.set(
      n,
      () => {
        const r = w(
          `hide.bs.${Wt(this.name)}`
        );
        b(n, r), r.defaultPrevented || (this.update(), m(s, u), tn(this), o ? A(s, () => Qs(this)) : Qs(this));
      },
      i + 17,
      "out"
    );
  }
  /** Updates the tooltip position. */
  update = () => {
    ts(this);
  };
  /** Toggles the tooltip visibility. */
  toggle = () => {
    const { tooltip: t } = this;
    t && !Yt(this) ? this.show() : this.hide();
  };
  /** Enables the tooltip. */
  enable() {
    const { enabled: t } = this;
    t || (this._toggleEventListeners(!0), this.enabled = !t);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: t, enabled: s } = this;
    s && (t && Yt(this) && this.hide(), this._toggleEventListeners(), this.enabled = !s);
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
    const s = t ? M : B, { element: n, options: o, btn: i } = this, { trigger: r } = o, c = !!(this.name !== xt && o.dismissible);
    r.includes("manual") || (this.enabled = !!t, r.split(" ").forEach((d) => {
      d === Oo ? (s(n, wn, this.handleShow), s(n, we, this.handleShow), c || (s(n, os, this.handleHide), s(
        E(n),
        is,
        this.handleTouch,
        Jt
      ))) : d === N ? s(n, d, c ? this.handleShow : this.toggle) : d === ss && (s(n, ns, this.handleShow), c || s(n, En, this.handleHide), Vo() && s(n, N, this.handleFocus)), c && i && s(i, N, this.handleHide);
    }));
  };
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => ur(n, () => super.dispose()),
      17
    );
    s.animation && Yt(n) ? (this.options.delay = 0, this.hide(), A(t, o)) : o();
  }
}
const mr = `[${ot}="${At}"],[data-tip="${At}"]`, vr = ct({}, es, {
  template: po(At),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), br = (e) => W(e, De), Er = (e) => new To(e);
class To extends ps {
  static selector = mr;
  static init = Er;
  static getInstance = br;
  static styleTip = ts;
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
    return De;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return vr;
  }
  /* extend original `show()` */
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => lt(s), 17);
  };
}
const wr = "scrollspy", $o = "ScrollSpy", Tr = '[data-bs-spy="scroll"]', $r = {
  offset: 10,
  target: null
}, yr = (e) => W(e, $o), Cr = (e) => new Co(e), en = w(`activate.bs.${wr}`), Sr = (e) => {
  const { target: t, scrollTarget: s, options: n, itemsLength: o, scrollHeight: i, element: r } = e, { offset: a } = n, c = s !== r, l = t && as("A", t), d = E(r), g = s.scrollHeight;
  if (e.scrollTop = s.scrollTop, l && (g !== i || o !== l.length)) {
    let y, S, R;
    e.items = [], e.targets = [], e.offsets = [], e.scrollHeight = g, e.maxScroll = e.scrollHeight - Dr(e), Array.from(l).forEach((v) => {
      y = et(v, "href"), S = y && y.charAt(0) === "#" && y.slice(-1) !== "#" && D(y, d), S && (e.items.push(v), e.targets.push(S), R = re(S), e.offsets.push(
        (c ? R.top + e.scrollTop : S.offsetTop) - a
      ));
    }), e.itemsLength = e.items.length;
  }
}, sn = ({ targets: e, scrollTarget: t, element: s, _observer: n }, o) => {
  o ? t === s ? e.forEach((i) => n.observe(i)) : n.observe(s) : n.disconnect();
}, xr = (e) => e.scrollHeight, Dr = ({ element: e, scrollTarget: t }) => t !== e ? t.clientHeight : re(e).height, yo = (e) => {
  [...as("A", e)].forEach((t) => {
    f(t, $) && m(t, $);
  });
}, nn = (e, t) => {
  const { target: s, element: n } = e;
  T(s) && yo(s), e.activeItem = t, h(t, $);
  const o = [];
  let i = t;
  for (; i !== yt(n); )
    i = i.parentElement, (f(i, "nav") || f(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const a = r.previousElementSibling;
    a && !f(a, $) && h(a, $);
  }), en.relatedTarget = t, b(n, en);
};
class Co extends st {
  static selector = Tr;
  static init = Cr;
  static getInstance = yr;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    this.target = D(
      o.target,
      E(n)
    ), this.target && (this.scrollTarget = n.clientHeight < n.scrollHeight ? n : dt(n), this.scrollHeight = xr(this.scrollTarget), this.refresh(), this._observer = new mo(() => this.refresh(), {
      root: this.scrollTarget
    }), sn(this, !0));
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return $o;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return $r;
  }
  /* eslint-enable */
  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh = () => {
    const { target: t } = this;
    if (T(t) && t.offsetHeight > 0) {
      Sr(this);
      const { scrollTop: s, maxScroll: n, itemsLength: o, items: i, activeItem: r } = this;
      if (s >= n) {
        const c = i[o - 1];
        r !== c && nn(this, c);
        return;
      }
      const { offsets: a } = this;
      if (r && s < a[0] && a[0] > 0) {
        this.activeItem = null, t && yo(t);
        return;
      }
      i.forEach((c, l) => {
        r !== c && s >= a[l] && (typeof a[l + 1] > "u" || s < a[l + 1]) && nn(this, c);
      });
    }
  };
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    const t = { ...this };
    sn(t), super.dispose();
  }
}
const ce = "tab", So = "Tab", on = `[${ot}="${ce}"]`, xo = (e) => W(e, So), Hr = (e) => new Do(e), We = w(
  `show.bs.${ce}`
), rn = w(
  `shown.bs.${ce}`
), Ve = w(
  `hide.bs.${ce}`
), an = w(
  `hidden.bs.${ce}`
), ee = /* @__PURE__ */ new Map(), cn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && f(t, It) && (t.style.height = "", m(t, It)), s && p.clear(s);
}, ln = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = T(o) && ee.get(o) || // istanbul ignore next @preserve
  { tab: null };
  if (s && n && f(n, _)) {
    const { currentHeight: r, nextHeight: a } = ee.get(t) || // istanbul ignore next @preserve
    { currentHeight: 0, nextHeight: 0 };
    r !== a ? setTimeout(() => {
      s.style.height = `${a}px`, Nt(s), A(s, () => cn(e));
    }, 50) : cn(e);
  } else o && p.clear(o);
  rn.relatedTarget = i, b(t, rn);
}, dn = (e) => {
  const { element: t, content: s, tabContent: n, nav: o } = e, { tab: i, content: r } = o && ee.get(o) || // istanbul ignore next @preserve
  { tab: null, content: null };
  let a = 0;
  if (n && s && f(s, _) && ([r, s].forEach((c) => {
    T(c) && h(c, "overflow-hidden");
  }), a = T(r) ? r.scrollHeight : 0), We.relatedTarget = i, an.relatedTarget = t, b(t, We), !We.defaultPrevented) {
    if (s && h(s, $), r && m(r, $), n && s && f(s, _)) {
      const c = s.scrollHeight;
      ee.set(t, {
        currentHeight: a,
        nextHeight: c,
        tab: null,
        content: null
      }), h(n, It), n.style.height = `${a}px`, Nt(n), [r, s].forEach((l) => {
        l && m(l, "overflow-hidden");
      });
    }
    s && s && f(s, _) ? setTimeout(() => {
      h(s, u), A(s, () => {
        ln(e);
      });
    }, 1) : (s && h(s, u), ln(e)), i && b(i, an);
  }
}, hn = (e) => {
  const { nav: t } = e;
  if (!T(t))
    return { tab: null, content: null };
  const s = rt($, t);
  let n = null;
  s.length === 1 && !Lt.some(
    (i) => f(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = T(n) ? U(n) : null;
  return { tab: n, content: o };
}, fn = (e) => {
  if (!T(e)) return null;
  const t = k(e, `.${Lt.join(",.")}`);
  return t ? D(`.${Lt[0]}-toggle`, t) : null;
}, Ar = (e) => {
  const t = xo(e.target);
  t && (e.preventDefault(), t.show());
};
class Do extends st {
  static selector = on;
  static init = Hr;
  static getInstance = xo;
  /** @param target the target element */
  constructor(t) {
    super(t);
    const { element: s } = this, n = U(s);
    if (n) {
      const o = k(s, ".nav"), i = k(n, ".tab-content");
      this.nav = o, this.content = n, this.tabContent = i, this.dropdown = fn(s);
      const { tab: r } = hn(this);
      if (o && !r) {
        const a = D(on, o), c = a && U(a);
        c && (h(a, $), h(c, u), h(c, $), O(s, Le, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return So;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (!(n && p.get(n)) && !f(t, $)) {
      const { tab: i, content: r } = hn(this);
      if (n && ee.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ve.relatedTarget = t, T(i) && (b(i, Ve), !Ve.defaultPrevented)) {
        h(t, $), O(t, Le, "true");
        const a = T(i) && fn(i);
        if (a && f(a, $) && m(a, $), n) {
          const c = () => {
            i && (m(i, $), O(i, Le, "false")), o && !f(o, $) && h(o, $);
          };
          r && (f(r, _) || s && f(s, _)) ? p.set(n, c, 1) : c();
        }
        r && (m(r, u), f(r, _) ? A(r, () => dn(this)) : dn(this));
      }
    }
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? M : B)(this.element, N, Ar);
  };
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const J = "toast", Ho = "Toast", Pr = `.${J}`, Ir = `[${$e}="${J}"]`, Ao = `[${ot}="${J}"]`, jt = "showing", Po = "hide", Lr = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, us = (e) => W(e, Ho), Nr = (e) => new Io(e), gn = w(
  `show.bs.${J}`
), Or = w(
  `shown.bs.${J}`
), pn = w(
  `hide.bs.${J}`
), kr = w(
  `hidden.bs.${J}`
), un = (e) => {
  const { element: t, options: s } = e;
  m(t, jt), p.clear(t, jt), b(t, Or), s.autohide && p.set(t, () => e.hide(), s.delay, J);
}, mn = (e) => {
  const { element: t } = e;
  m(t, jt), m(t, u), h(t, Po), p.clear(t, J), b(t, kr);
}, _r = (e) => {
  const { element: t, options: s } = e;
  h(t, jt), s.animation ? (Nt(t), A(t, () => mn(e))) : mn(e);
}, Mr = (e) => {
  const { element: t, options: s } = e;
  p.set(
    t,
    () => {
      m(t, Po), Nt(t), h(t, u), h(t, jt), s.animation ? A(t, () => un(e)) : un(e);
    },
    17,
    jt
  );
}, Br = (e) => {
  const { target: t } = e, s = t && k(t, Ao), n = s && U(s), o = n && us(n);
  o && (s && s.tagName === "A" && e.preventDefault(), o.relatedTarget = s, o.show());
}, Rr = (e) => {
  const t = e.target, s = us(t), { type: n, relatedTarget: o } = e;
  s && t !== o && !t.contains(o) && ([we, ns].includes(n) ? p.clear(t, J) : p.set(t, () => s.hide(), s.options.delay, J));
};
class Io extends st {
  static selector = Pr;
  static init = Nr;
  static getInstance = us;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !f(n, _) ? h(n, _) : !o.animation && f(n, _) && m(n, _), this.dismiss = D(Ir, n), this.triggers = [
      ...Z(Ao, E(n))
    ].filter(
      (i) => U(i) === n
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ho;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Lr;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return f(this.element, u);
  }
  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show = () => {
    const { element: t, isShown: s } = this;
    t && !s && (b(t, gn), gn.defaultPrevented || Mr(this));
  };
  /** Hides the toast. */
  hide = () => {
    const { element: t, isShown: s } = this;
    t && s && (b(t, pn), pn.defaultPrevented || _r(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? M : B, { element: n, triggers: o, dismiss: i, options: r, hide: a } = this;
    i && s(i, N, a), r.autohide && [ns, En, we, os].forEach(
      (c) => s(n, c, Rr)
    ), o.length && o.forEach(
      (c) => s(c, N, Br)
    );
  };
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), p.clear(t, J), s && m(t, u), super.dispose();
  }
}
const ms = /* @__PURE__ */ new Map();
[
  An,
  In,
  On,
  Mn,
  zn,
  co,
  go,
  To,
  Co,
  Do,
  Io,
  ps
].forEach((e) => ms.set(e.prototype.name, e));
const Fr = (e, t) => {
  [...t].forEach((s) => e(s));
}, Wr = (e, t) => {
  const s = Dt.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, vn = (e) => {
  const t = e && e.nodeName ? e : document, s = [...as("*", t)];
  ms.forEach((n) => {
    const { init: o, selector: i } = n;
    Fr(
      o,
      s.filter((r) => xn(r, i))
    );
  });
}, Vr = (e) => {
  const t = e && e.nodeName ? e : document;
  ms.forEach((s) => {
    Wr(s.prototype.name, t);
  });
};
document.body ? vn() : M(document, "DOMContentLoaded", () => vn(), {
  once: !0
});
export {
  An as Alert,
  In as Button,
  On as Carousel,
  Mn as Collapse,
  zn as Dropdown,
  co as Modal,
  go as Offcanvas,
  To as Popover,
  Co as ScrollSpy,
  Do as Tab,
  Io as Toast,
  ps as Tooltip,
  vn as initCallback,
  Vr as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
