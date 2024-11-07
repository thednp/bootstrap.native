const $n = "aria-describedby", we = "aria-expanded", ie = "aria-hidden", $e = "aria-modal", Es = "aria-pressed", _e = "aria-selected", os = "focus", is = "focusin", Tn = "focusout", Te = "keydown", Ro = "keyup", I = "click", yn = "mousedown", Bo = "hover", ye = "mouseenter", rs = "mouseleave", Fo = "pointerdown", Wo = "pointermove", jo = "pointerup", cs = "touchstart", zo = "dragstart", Vo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', Ke = "ArrowDown", qe = "ArrowUp", $s = "ArrowLeft", Ts = "ArrowRight", as = "Escape", Ko = "transitionDuration", qo = "transitionDelay", Oe = "transitionend", Cn = "transitionProperty", Xo = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Ee = () => {
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
}, et = (e, t) => e.getAttribute(t), te = (e, t) => e.hasAttribute(t), L = (e, t, s) => e.setAttribute(t, s), It = (e, t) => e.removeAttribute(t), h = (e, ...t) => {
  e.classList.add(...t);
}, v = (e, ...t) => {
  e.classList.remove(...t);
}, f = (e, t) => e.classList.contains(t), re = (e) => e != null && typeof e == "object" || !1, D = (e) => re(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, G = (e) => D(e) && e.nodeType === 1 || !1, Wt = /* @__PURE__ */ new Map(), Dt = {
  data: Wt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, s) => {
    G(e) && (Wt.has(t) || Wt.set(t, /* @__PURE__ */ new Map()), Wt.get(t).set(e, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => Wt.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!G(e) || !t) return null;
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
    !s || !G(e) || (s.delete(e), s.size === 0 && Wt.delete(t));
  }
}, j = (e, t) => Dt.get(e, t), ce = (e) => typeof e == "string" || !1, xn = (e) => re(e) && e.constructor.name === "Window" || !1, Sn = (e) => D(e) && e.nodeType === 9 || !1, w = (e) => Sn(e) ? e : D(e) ? e.ownerDocument : xn(e) ? e.document : globalThis.document, ct = (e, ...t) => Object.assign(e, ...t), vt = (e) => {
  if (!e) return;
  if (ce(e))
    return w().createElement(e);
  const { tagName: t } = e, s = vt(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, ct(s, n);
}, b = (e, t) => e.dispatchEvent(t), W = (e, t, s) => {
  const n = getComputedStyle(e, s), o = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(o);
}, Go = (e) => {
  const t = W(e, Cn), s = W(e, qo), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, ae = (e) => {
  const t = W(e, Cn), s = W(e, Ko), n = s.includes("ms") ? 1 : 1e3, o = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(o) ? 0 : o;
}, H = (e, t) => {
  let s = 0;
  const n = new Event(Oe), o = ae(e), i = Go(e);
  if (o) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(Oe, r), s = 1);
    };
    e.addEventListener(Oe, r), setTimeout(() => {
      s || b(e, n);
    }, o + i + 17);
  } else
    t.apply(e, [n]);
}, at = (e, t) => e.focus(t), ys = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, ue = (e) => Object.entries(e), Vt = (e) => e.toLowerCase(), Zo = (e, t, s, n) => {
  if (!G(e)) return t;
  const o = { ...s }, i = { ...e.dataset }, r = { ...t }, c = {}, a = "title";
  return ue(i).forEach(([l, d]) => {
    const g = typeof l == "string" && l.includes(n) ? l.replace(n, "").replace(
      /[A-Z]/g,
      (E) => Vt(E)
    ) : l;
    c[g] = ys(d);
  }), ue(o).forEach(([l, d]) => {
    o[l] = ys(d);
  }), ue(t).forEach(([l, d]) => {
    l in o ? r[l] = o[l] : l in c ? r[l] = c[l] : r[l] = l === a ? et(e, a) : d;
  }), r;
}, Cs = (e) => Object.keys(e), $ = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return re(t) && ct(s, t), s;
}, ee = { passive: !0 }, Ot = (e) => e.offsetHeight, P = (e, t) => {
  ue(t).forEach(([s, n]) => {
    if (n && ce(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const o = {};
      o[s] = n, ct(e.style, o);
    }
  });
}, Xe = (e) => re(e) && e.constructor.name === "Map" || !1, Qo = (e) => typeof e == "number" || !1, ut = /* @__PURE__ */ new Map(), u = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, s, n) => {
    G(e) && (n && n.length ? (ut.has(e) || ut.set(e, /* @__PURE__ */ new Map()), ut.get(e).set(n, setTimeout(t, s))) : ut.set(e, setTimeout(t, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!G(e)) return null;
    const s = ut.get(e);
    return t && s && Xe(s) ? s.get(t) || null : Qo(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!G(e)) return;
    const s = ut.get(e);
    t && t.length && Xe(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && ut.delete(e)) : (clearTimeout(s), ut.delete(e));
  }
}, U = (e, t) => (D(t) ? t : w()).querySelectorAll(e), Ye = /* @__PURE__ */ new Map();
function Jo(e) {
  const { shiftKey: t, code: s } = e, n = w(this), o = [
    ...U(Vo, this)
  ].filter(
    (c) => !te(c, "disabled") && !et(c, ie)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  s === "Tab" && (t && n.activeElement === i ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (i.focus(), e.preventDefault()));
}
const ti = (e) => Ye.has(e) === !0, Ce = (e) => {
  const t = ti(e);
  (t ? Uo : Yo)(e, "keydown", Jo), t ? Ye.delete(e) : Ye.set(e, !0);
}, C = (e) => G(e) && "offsetWidth" in e || !1, Et = (e, t) => {
  const { width: s, height: n, top: o, right: i, bottom: r, left: c } = e.getBoundingClientRect();
  let a = 1, l = 1;
  if (t && C(e)) {
    const { offsetWidth: d, offsetHeight: g } = e;
    a = d > 0 ? Math.round(s) / d : 1, l = g > 0 ? Math.round(n) / g : 1;
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
}, Tt = (e) => w(e).body, lt = (e) => w(e).documentElement, ei = (e) => {
  const t = xn(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, Hn = (e) => D(e) && e.constructor.name === "ShadowRoot" || !1, si = (e) => e.nodeName === "HTML" ? e : G(e) && e.assignedSlot || D(e) && e.parentNode || Hn(e) && e.host || lt(e), Pn = (e) => e ? Sn(e) ? e.defaultView : D(e) ? e?.ownerDocument?.defaultView : e : window, ni = (e) => D(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, Dn = (e, t) => e.matches(t), oi = (e) => {
  if (!C(e)) return !1;
  const { width: t, height: s } = Et(e), { offsetWidth: n, offsetHeight: o } = e;
  return Math.round(t) !== n || Math.round(s) !== o;
}, ii = (e, t, s) => {
  const n = C(t), o = Et(
    e,
    n && oi(t)
  ), i = { x: 0, y: 0 };
  if (n) {
    const r = Et(t, !0);
    i.x = r.x + t.clientLeft, i.y = r.y + t.clientTop;
  }
  return {
    x: o.left + s.x - i.x,
    y: o.top + s.y - i.y,
    width: o.width,
    height: o.height
  };
};
let xs = 0, Ss = 0;
const jt = /* @__PURE__ */ new Map(), An = (e, t) => {
  let s = t ? xs : Ss;
  if (t) {
    const n = An(e), o = jt.get(n) || /* @__PURE__ */ new Map();
    jt.has(n) || jt.set(n, o), Xe(o) && !o.has(t) ? (o.set(t, s), xs += 1) : s = o.get(t);
  } else {
    const n = e.id || e;
    jt.has(n) ? s = jt.get(n) : (jt.set(n, s), Ss += 1);
  }
  return s;
}, ri = (e) => Array.isArray(e) || !1, kn = (e) => {
  if (!D(e)) return !1;
  const { top: t, bottom: s } = Et(e), { clientHeight: n } = lt(e);
  return t <= n && s >= 0;
}, ci = (e) => typeof e == "function" || !1, ai = (e) => re(e) && e.constructor.name === "NodeList" || !1, $t = (e) => lt(e).dir === "rtl", _ = (e, t) => !e || !t ? null : e.closest(t) || _(e.getRootNode().host, t) || null, S = (e, t) => G(e) ? e : (G(t) ? t : w()).querySelector(e), ls = (e, t) => (D(t) ? t : w()).getElementsByTagName(
  e
), it = (e, t) => (t && D(t) ? t : w()).getElementsByClassName(
  e
), zt = {}, In = (e) => {
  const { type: t, currentTarget: s } = e;
  zt[t].forEach((n, o) => {
    s === o && n.forEach((i, r) => {
      r.apply(o, [e]), typeof i == "object" && i.once && M(o, t, r, i);
    });
  });
}, N = (e, t, s, n) => {
  zt[t] || (zt[t] = /* @__PURE__ */ new Map());
  const o = zt[t];
  o.has(e) || o.set(e, /* @__PURE__ */ new Map());
  const i = o.get(
    e
  ), { size: r } = i;
  i.set(s, n), r || e.addEventListener(
    t,
    In,
    n
  );
}, M = (e, t, s, n) => {
  const o = zt[t], i = o && o.get(e), r = i && i.get(s), c = r !== void 0 ? r : n;
  i && i.has(s) && i.delete(s), o && (!i || !i.size) && o.delete(e), (!o || !o.size) && delete zt[t], (!i || !i.size) && e.removeEventListener(
    t,
    In,
    c
  );
}, O = "fade", p = "show", xe = "data-bs-dismiss", Se = "alert", Ln = "Alert", li = "5.1.0", di = li;
class st {
  /**
   * @param target `Element` or selector string
   * @param config component instance options
   */
  constructor(t, s) {
    let n;
    try {
      if (G(t))
        n = t;
      else if (ce(t)) {
        if (n = S(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (i) {
      throw Error(`${this.name} Error: ${i.message}`);
    }
    const o = Dt.get(n, this.name);
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && Cs(this.defaults).length ? Zo(n, this.defaults, s || {}, "bs") : {}, Dt.set(n, this.name, this);
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
    Dt.remove(this.element, this.name), Cs(this).forEach((t) => {
      delete this[t];
    });
  }
}
const hi = `.${Se}`, fi = `[${xe}="${Se}"]`, gi = (e) => j(e, Ln), ui = (e) => new _n(e), Hs = $(
  `close.bs.${Se}`
), pi = $(
  `closed.bs.${Se}`
), Ps = (e) => {
  const { element: t } = e;
  b(t, pi), e._toggleEventListeners(), e.dispose(), t.remove();
};
class _n extends st {
  static selector = hi;
  static init = ui;
  static getInstance = gi;
  dismiss;
  constructor(t) {
    super(t), this.dismiss = S(
      fi,
      this.element
    ), this._toggleEventListeners(!0);
  }
  get name() {
    return Ln;
  }
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element: t } = this;
    t && f(t, p) && (b(t, Hs), Hs.defaultPrevented || (v(t, p), f(t, O) ? H(t, () => Ps(this)) : Ps(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? N : M, { dismiss: n, close: o } = this;
    n && s(n, I, o);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const T = "active", nt = "data-bs-toggle", mi = "button", On = "Button", vi = `[${nt}="${mi}"]`, bi = (e) => j(e, On), wi = (e) => new Nn(e);
class Nn extends st {
  static selector = vi;
  static init = wi;
  static getInstance = bi;
  /**
   * @param target usually a `.btn` element
   */
  constructor(t) {
    super(t);
    const { element: s } = this;
    this.isActive = f(s, T), L(s, Es, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return On;
  }
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (t) => {
    t && t.preventDefault();
    const { element: s, isActive: n } = this;
    !f(s, "disabled") && !et(s, "disabled") && ((n ? v : h)(s, T), L(s, Es, n ? "false" : "true"), this.isActive = f(s, T));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? N : M)(this.element, I, this.toggle);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Ue = "data-bs-target", At = "carousel", Mn = "Carousel", Ds = "data-bs-parent", Ei = "data-bs-container", q = (e) => {
  const t = [Ue, Ds, Ei, "href"], s = w(e);
  return t.map((n) => {
    const o = et(e, n);
    return o ? n === Ds ? _(e, o) : S(o, s) : null;
  }).filter((n) => n)[0];
}, le = `[data-bs-ride="${At}"]`, Y = `${At}-item`, Ge = "data-bs-slide-to", mt = "data-bs-slide", bt = "paused", As = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, dt = (e) => j(e, Mn), $i = (e) => new Bn(e);
let Jt = 0, pe = 0, Ne = 0;
const Me = $(`slide.bs.${At}`), Ze = $(`slid.bs.${At}`), ks = (e) => {
  const { index: t, direction: s, element: n, slides: o, options: i } = e;
  if (e.isAnimating) {
    const r = Qe(e), c = s === "left" ? "next" : "prev", a = s === "left" ? "start" : "end";
    h(o[t], T), v(o[t], `${Y}-${c}`), v(o[t], `${Y}-${a}`), v(o[r], T), v(o[r], `${Y}-${a}`), b(n, Ze), u.clear(n, mt), e.cycle && !w(n).hidden && i.interval && !e.isPaused && e.cycle();
  }
};
function Ti() {
  const e = dt(this);
  e && !e.isPaused && !u.get(this, bt) && h(this, bt);
}
function yi() {
  const e = dt(this);
  e && e.isPaused && !u.get(this, bt) && e.cycle();
}
function Ci(e) {
  e.preventDefault();
  const t = _(this, le) || q(this), s = dt(t);
  if (s && !s.isAnimating) {
    const n = +(et(this, Ge) || 0);
    this && !f(this, T) && !Number.isNaN(n) && s.to(n);
  }
}
function xi(e) {
  e.preventDefault();
  const t = _(this, le) || q(this), s = dt(t);
  if (s && !s.isAnimating) {
    const n = et(this, mt);
    n === "next" ? s.next() : n === "prev" && s.prev();
  }
}
const Si = ({ code: e, target: t }) => {
  const s = w(t), [n] = [...U(le, s)].filter((i) => kn(i)), o = dt(n);
  if (o && !o.isAnimating && !/textarea|input/i.test(t.nodeName)) {
    const i = $t(n);
    e === (i ? Ts : $s) ? o.prev() : e === (i ? $s : Ts) && o.next();
  }
};
function Is(e) {
  const { target: t } = e, s = dt(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(t) || !s.controls.includes(t)) && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
}
function Hi(e) {
  const { target: t } = e, s = dt(this);
  if (s && !s.isAnimating && !s.isTouch) {
    const { controls: n, indicators: o } = s;
    [...n, ...o].every(
      (i) => i === t || i.contains(t)
    ) || (Jt = e.pageX, this.contains(t) && (s.isTouch = !0, Rn(s, !0)));
  }
}
const Pi = (e) => {
  pe = e.pageX;
}, Di = (e) => {
  const { target: t } = e, s = w(t), n = [...U(le, s)].map((o) => dt(o)).find((o) => o.isTouch);
  if (n) {
    const { element: o, index: i } = n, r = $t(o);
    Ne = e.pageX, n.isTouch = !1, Rn(n), !s.getSelection()?.toString().length && o.contains(t) && Math.abs(Jt - Ne) > 120 && (pe < Jt ? n.to(i + (r ? -1 : 1)) : pe > Jt && n.to(i + (r ? 1 : -1))), Jt = 0, pe = 0, Ne = 0;
  }
}, Re = (e, t) => {
  const { indicators: s } = e;
  [...s].forEach((n) => v(n, T)), e.indicators[t] && h(s[t], T);
}, Rn = (e, t) => {
  const { element: s } = e, n = t ? N : M;
  n(
    w(s),
    Wo,
    Pi,
    ee
  ), n(
    w(s),
    jo,
    Di,
    ee
  );
}, Qe = (e) => {
  const { slides: t, element: s } = e, n = S(`.${Y}.${T}`, s);
  return C(n) ? [...t].indexOf(n) : -1;
};
class Bn extends st {
  static selector = le;
  static init = $i;
  static getInstance = dt;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.direction = $t(n) ? "right" : "left", this.isTouch = !1, this.slides = it(Y, n);
    const { slides: o } = this;
    if (o.length >= 2) {
      const i = Qe(this), r = [...o].find(
        (l) => Dn(l, `.${Y}-next,.${Y}-next`)
      );
      this.index = i;
      const c = w(n);
      this.controls = [
        ...U(`[${mt}]`, n),
        ...U(
          `[${mt}][${Ue}="#${n.id}"]`,
          c
        )
      ].filter((l, d, g) => d === g.indexOf(l)), this.indicator = S(
        `.${At}-indicators`,
        n
      ), this.indicators = [
        ...this.indicator ? U(`[${Ge}]`, this.indicator) : [],
        ...U(
          `[${Ge}][${Ue}="#${n.id}"]`,
          c
        )
      ].filter((l, d, g) => d === g.indexOf(l));
      const { options: a } = this;
      this.options.interval = a.interval === !0 ? As.interval : a.interval, r ? this.index = [...o].indexOf(r) : i < 0 && (this.index = 0, h(o[0], T), this.indicators.length && Re(this, 0)), this.indicators.length && Re(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Mn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return As;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return f(this.element, bt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return S(
      `.${Y}-next,.${Y}-prev`,
      this.element
    ) !== null;
  }
  cycle() {
    const { element: t, options: s, isPaused: n, index: o } = this;
    u.clear(t, At), n && (u.clear(t, bt), v(t, bt)), u.set(
      t,
      () => {
        this.element && !this.isPaused && !this.isTouch && kn(t) && this.to(o + 1);
      },
      s.interval,
      At
    );
  }
  pause() {
    const { element: t, options: s } = this;
    !this.isPaused && s.interval && (h(t, bt), u.set(
      t,
      () => {
      },
      1,
      bt
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
    const { element: s, slides: n, options: o } = this, i = Qe(this), r = $t(s);
    let c = t;
    if (!this.isAnimating && i !== c && !u.get(s, mt)) {
      i < c || i === 0 && c === n.length - 1 ? this.direction = r ? "right" : "left" : (i > c || i === n.length - 1 && c === 0) && (this.direction = r ? "left" : "right");
      const { direction: a } = this;
      c < 0 ? c = n.length - 1 : c >= n.length && (c = 0);
      const l = a === "left" ? "next" : "prev", d = a === "left" ? "start" : "end", g = {
        relatedTarget: n[c],
        from: i,
        to: c,
        direction: a
      };
      ct(Me, g), ct(Ze, g), b(s, Me), Me.defaultPrevented || (this.index = c, Re(this, c), ae(n[c]) && f(s, "slide") ? u.set(
        s,
        () => {
          h(n[c], `${Y}-${l}`), Ot(n[c]), h(n[c], `${Y}-${d}`), h(n[i], `${Y}-${d}`), H(
            n[c],
            () => this.slides && this.slides.length && ks(this)
          );
        },
        0,
        mt
      ) : (h(n[c], T), v(n[i], T), u.set(
        s,
        () => {
          u.clear(s, mt), s && o.interval && !this.isPaused && this.cycle(), b(s, Ze);
        },
        0,
        mt
      )));
    }
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (t) => {
    const { element: s, options: n, slides: o, controls: i, indicators: r } = this, { touch: c, pause: a, interval: l, keyboard: d } = n, g = t ? N : M;
    a && l && (g(s, ye, Ti), g(s, rs, yi)), c && o.length > 2 && (g(
      s,
      Fo,
      Hi,
      ee
    ), g(s, cs, Is, { passive: !1 }), g(s, zo, Is, { passive: !1 })), i.length && i.forEach((E) => {
      E && g(E, I, xi);
    }), r.length && r.forEach((E) => {
      g(E, I, Ci);
    }), d && g(w(s), Te, Si);
  };
  dispose() {
    const { isAnimating: t } = this, s = {
      ...this,
      isAnimating: t
    };
    this._toggleEventListeners(), super.dispose(), s.isAnimating && H(s.slides[s.index], () => {
      ks(s);
    });
  }
}
const Lt = "collapsing", K = "collapse", Fn = "Collapse", Ai = `.${K}`, Wn = `[${nt}="${K}"]`, ki = { parent: null }, me = (e) => j(e, Fn), Ii = (e) => new jn(e), Ls = $(`show.bs.${K}`), Li = $(`shown.bs.${K}`), _s = $(`hide.bs.${K}`), _i = $(`hidden.bs.${K}`), Oi = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, Ls), Ls.defaultPrevented || (u.set(t, Ee, 17), s && u.set(s, Ee, 17), h(t, Lt), v(t, K), P(t, { height: `${t.scrollHeight}px` }), H(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => L(o, we, "true")), v(t, Lt), h(t, K), h(t, p), P(t, { height: "" }), b(t, Li);
  }));
}, Os = (e) => {
  const { element: t, parent: s, triggers: n } = e;
  b(t, _s), _s.defaultPrevented || (u.set(t, Ee, 17), s && u.set(s, Ee, 17), P(t, { height: `${t.scrollHeight}px` }), v(t, K), v(t, p), h(t, Lt), Ot(t), P(t, { height: "0px" }), H(t, () => {
    u.clear(t), s && u.clear(s), n.forEach((o) => L(o, we, "false")), v(t, Lt), h(t, K), P(t, { height: "" }), b(t, _i);
  }));
}, Ni = (e) => {
  const { target: t } = e, s = t && _(t, Wn), n = s && q(s), o = n && me(n);
  o && o.toggle(), s && s.tagName === "A" && e.preventDefault();
};
class jn extends st {
  static selector = Ai;
  static init = Ii;
  static getInstance = me;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = w(n);
    this.triggers = [...U(Wn, i)].filter(
      (r) => q(r) === n
    ), this.parent = C(o.parent) ? o.parent : ce(o.parent) ? q(n) || S(o.parent, i) : null, this._toggleEventListeners(!0);
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
    return ki;
  }
  hide() {
    const { triggers: t, element: s } = this;
    u.get(s) || (Os(this), t.length && t.forEach((n) => h(n, `${K}d`)));
  }
  show() {
    const { element: t, parent: s, triggers: n } = this;
    let o, i;
    s && (o = [
      ...U(`.${K}.${p}`, s)
    ].find((r) => me(r)), i = o && me(o)), (!s || !u.get(s)) && !u.get(t) && (i && o !== t && (Os(i), i.triggers.forEach((r) => {
      h(r, `${K}d`);
    })), Oi(this), n.length && n.forEach((r) => v(r, `${K}d`)));
  }
  toggle() {
    f(this.element, p) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (t) => {
    const s = t ? N : M, { triggers: n } = this;
    n.length && n.forEach(
      (o) => s(o, I, Ni)
    );
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const _t = ["dropdown", "dropup", "dropstart", "dropend"], zn = "Dropdown", Vn = "dropdown-menu", Kn = (e) => {
  const t = _(e, "A");
  return e.tagName === "A" && te(e, "href") && et(e, "href").slice(-1) === "#" || t && te(t, "href") && et(t, "href").slice(-1) === "#";
}, [tt, Je, ts, es] = _t, qn = `[${nt}="${tt}"]`, Kt = (e) => j(e, zn), Mi = (e) => new Un(e), Ri = `${Vn}-end`, Ns = [tt, Je], Ms = [ts, es], Rs = ["A", "BUTTON"], Bi = {
  offset: 5,
  display: "dynamic"
}, Be = $(
  `show.bs.${tt}`
), Bs = $(
  `shown.bs.${tt}`
), Fe = $(
  `hide.bs.${tt}`
), Fs = $(`hidden.bs.${tt}`), Xn = $(`updated.bs.${tt}`), Yn = (e) => {
  const { element: t, menu: s, parentElement: n, options: o } = e, { offset: i } = o;
  if (W(s, "position") !== "static") {
    const r = $t(t), c = f(s, Ri);
    ["margin", "top", "bottom", "left", "right"].forEach((F) => {
      const xt = {};
      xt[F] = "", P(s, xt);
    });
    let l = _t.find(
      (F) => f(n, F)
    ) || tt;
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
    }, { offsetWidth: E, offsetHeight: k } = s, { clientWidth: z, clientHeight: B } = lt(t), {
      left: m,
      top: R,
      width: yt,
      height: Ct
    } = Et(t), x = m - E - i < 0, ht = m + E + yt + i >= z, ot = R + k + i >= B, J = R + k + Ct + i >= B, Mt = R - k - i < 0, y = (!r && c || r && !c) && m + yt - E < 0, V = (r && c || !r && !c) && m + E >= z;
    if (Ms.includes(l) && x && ht && (l = tt), l === ts && (r ? ht : x) && (l = es), l === es && (r ? x : ht) && (l = ts), l === Je && Mt && !J && (l = tt), l === tt && J && !Mt && (l = Je), Ms.includes(l) && ot && ct(g[l], {
      top: "auto",
      bottom: 0
    }), Ns.includes(l) && (y || V)) {
      let F = { left: "auto", right: "auto" };
      !y && V && !r && (F = { left: "auto", right: 0 }), y && !V && r && (F = { left: 0, right: "auto" }), F && ct(g[l], F);
    }
    const Rt = d[l];
    P(s, {
      ...g[l],
      margin: `${Rt.map((F) => F && `${F}px`).join(" ")}`
    }), Ns.includes(l) && c && c && P(s, g[!r && y || r && V ? "menuStart" : "menuEnd"]), b(n, Xn);
  }
}, Fi = (e) => Array.from(e.children).map((t) => {
  if (t && Rs.includes(t.tagName)) return t;
  const { firstElementChild: s } = t;
  return s && Rs.includes(s.tagName) ? s : null;
}).filter((t) => t), Ws = (e) => {
  const { element: t, options: s, menu: n } = e, o = e.open ? N : M, i = w(t);
  o(i, I, js), o(i, os, js), o(i, Te, ji), o(i, Ro, zi), s.display === "dynamic" && (e.open ? e._observer.observe(n) : e._observer.disconnect());
}, He = (e) => {
  const t = [..._t, "btn-group", "input-group"].map(
    (s) => it(`${s} ${p}`, w(e))
  ).find((s) => s.length);
  if (t && t.length)
    return [...t[0].children].find(
      (s) => _t.some((n) => n === et(s, nt))
    );
}, js = (e) => {
  const { target: t, type: s } = e;
  if (!C(t)) return;
  const n = He(t), o = n && Kt(n);
  if (!o) return;
  const { parentElement: i, menu: r } = o, c = i && i.contains(t) && (t.tagName === "form" || _(t, "form") !== null);
  [I, yn].includes(s) && Kn(t) && e.preventDefault(), !c && s !== os && t !== n && t !== r && o.hide();
}, Wi = (e) => {
  const { target: t } = e, s = t && _(t, qn), n = s && Kt(s);
  n && (e.stopPropagation(), n.toggle(), s && Kn(s) && e.preventDefault());
}, ji = (e) => {
  [Ke, qe].includes(e.code) && e.preventDefault();
};
function zi(e) {
  const { code: t } = e, s = He(this);
  if (!s) return;
  const n = Kt(s), { activeElement: o } = w(s);
  if (!n || !o) return;
  const { menu: i, open: r } = n, c = Fi(i);
  if (c && c.length && [Ke, qe].includes(t)) {
    let a = c.indexOf(o);
    o === s ? a = 0 : t === qe ? a = a > 1 ? a - 1 : 0 : t === Ke && (a = a < c.length - 1 ? a + 1 : a), c[a] && at(c[a]);
  }
  as === t && r && (n.toggle(), at(s));
}
function Vi(e) {
  const t = He(e), s = t && Kt(t);
  s && s.open && Yn(s);
}
class Un extends st {
  static selector = qn;
  static init = Mi;
  static getInstance = Kt;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { parentElement: n } = this.element, [o] = it(
      Vn,
      n
    );
    o && (this.parentElement = n, this.menu = o, this._observer = new IntersectionObserver(
      ([i]) => Vi(i.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
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
    return Bi;
  }
  toggle() {
    this.open ? this.hide() : this.show();
  }
  show() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    if (s) return;
    const i = He(t), r = i && Kt(i);
    r && r.hide(), [Be, Bs, Xn].forEach(
      (c) => {
        c.relatedTarget = t;
      }
    ), b(o, Be), !Be.defaultPrevented && (h(n, p), h(o, p), L(t, we, "true"), Yn(this), this.open = !s, at(t), Ws(this), b(o, Bs));
  }
  hide() {
    const { element: t, open: s, menu: n, parentElement: o } = this;
    s && ([Fe, Fs].forEach((i) => {
      i.relatedTarget = t;
    }), b(o, Fe), !Fe.defaultPrevented && (v(n, p), v(o, p), L(t, we, "false"), this.open = !s, Ws(this), b(o, Fs)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (t) => {
    (t ? N : M)(this.element, I, Wi);
  };
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const X = "modal", ds = "Modal", hs = "Offcanvas", Ki = "fixed-top", qi = "fixed-bottom", Gn = "sticky-top", Zn = "position-sticky", Qn = (e) => [
  ...it(Ki, e),
  ...it(qi, e),
  ...it(Gn, e),
  ...it(Zn, e),
  ...it("is-fixed", e)
], Xi = (e) => {
  const t = Tt(e);
  P(t, {
    paddingRight: "",
    overflow: ""
  });
  const s = Qn(t);
  s.length && s.forEach((n) => {
    P(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, Jn = (e) => {
  const { clientWidth: t } = lt(e), { innerWidth: s } = Pn(e);
  return Math.abs(s - t);
}, to = (e, t) => {
  const s = Tt(e), n = parseInt(W(s, "paddingRight"), 10), i = W(s, "overflow") === "hidden" && n ? 0 : Jn(e), r = Qn(s);
  t && (P(s, {
    overflow: "hidden",
    paddingRight: `${n + i}px`
  }), r.length && r.forEach((c) => {
    const a = W(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(a, 10) + i}px`, [Gn, Zn].some((l) => f(c, l))) {
      const l = W(c, "marginRight");
      c.style.marginRight = `${parseInt(l, 10) - i}px`;
    }
  }));
}, Z = "offcanvas", wt = vt({
  tagName: "div",
  className: "popup-container"
}), eo = (e, t) => {
  const s = D(t) && t.nodeName === "BODY", n = D(t) && !s ? t : wt, o = s ? t : Tt(e);
  D(e) && (n === wt && o.append(wt), n.append(e));
}, so = (e, t) => {
  const s = D(t) && t.nodeName === "BODY", n = D(t) && !s ? t : wt;
  D(e) && (e.remove(), n === wt && !wt.children.length && wt.remove());
}, fs = (e, t) => {
  const s = D(t) && t.nodeName !== "BODY" ? t : wt;
  return D(e) && s.contains(e);
}, no = "backdrop", zs = `${X}-${no}`, Vs = `${Z}-${no}`, oo = `.${X}.${p}`, gs = `.${Z}.${p}`, A = vt("div"), Nt = (e) => S(
  `${oo},${gs}`,
  w(e)
), us = (e) => {
  const t = e ? zs : Vs;
  [zs, Vs].forEach((s) => {
    v(A, s);
  }), h(A, t);
}, io = (e, t, s) => {
  us(s), eo(A, Tt(e)), t && h(A, O);
}, ro = () => {
  f(A, p) || (h(A, p), Ot(A));
}, Pe = () => {
  v(A, p);
}, co = (e) => {
  Nt(e) || (v(A, O), so(A, Tt(e)), Xi(e));
}, ao = (e) => C(e) && W(e, "visibility") !== "hidden" && e.offsetParent !== null, Yi = `.${X}`, lo = `[${nt}="${X}"]`, Ui = `[${xe}="${X}"]`, ho = `${X}-static`, Gi = {
  backdrop: !0,
  keyboard: !0
}, se = (e) => j(e, ds), Zi = (e) => new uo(e), ve = $(
  `show.bs.${X}`
), Ks = $(
  `shown.bs.${X}`
), We = $(
  `hide.bs.${X}`
), qs = $(
  `hidden.bs.${X}`
), fo = (e) => {
  const { element: t } = e, s = Jn(t), { clientHeight: n, scrollHeight: o } = lt(t), { clientHeight: i, scrollHeight: r } = t, c = i !== r;
  if (!c && s) {
    const l = { [$t(t) ? "paddingLeft" : "paddingRight"]: `${s}px` };
    P(t, l);
  }
  to(t, c || n !== o);
}, go = (e, t) => {
  const s = t ? N : M, { element: n } = e;
  s(n, I, tr), s(w(n), Te, Ji), t ? e._observer.observe(n) : e._observer.disconnect();
}, Xs = (e) => {
  const { triggers: t, element: s, relatedTarget: n } = e;
  co(s), P(s, { paddingRight: "", display: "" }), go(e);
  const o = ve.relatedTarget || t.find(ao);
  o && at(o), qs.relatedTarget = n || void 0, b(s, qs), Ce(s);
}, Ys = (e) => {
  const { element: t, relatedTarget: s } = e;
  at(t), go(e, !0), Ks.relatedTarget = s || void 0, b(t, Ks), Ce(t);
}, Us = (e) => {
  const { element: t, hasFade: s } = e;
  P(t, { display: "block" }), fo(e), Nt(t) || P(Tt(t), { overflow: "hidden" }), h(t, p), It(t, ie), L(t, $e, "true"), s ? H(t, () => Ys(e)) : Ys(e);
}, Gs = (e) => {
  const { element: t, options: s, hasFade: n } = e;
  s.backdrop && n && f(A, p) && !Nt(t) ? (Pe(), H(A, () => Xs(e))) : Xs(e);
}, Qi = (e) => {
  const { target: t } = e, s = t && _(t, lo), n = s && q(s), o = n && se(n);
  o && (s && s.tagName === "A" && e.preventDefault(), o.relatedTarget = s, o.toggle());
}, Ji = ({ code: e, target: t }) => {
  const s = S(oo, w(t)), n = s && se(s);
  if (!n) return;
  const { options: o } = n;
  o.keyboard && e === as && f(s, p) && (n.relatedTarget = null, n.hide());
}, tr = (e) => {
  const { currentTarget: t } = e, s = t && se(t);
  if (!s || !t || u.get(t)) return;
  const { options: n, isStatic: o, modalDialog: i } = s, { backdrop: r } = n, { target: c } = e, a = w(t)?.getSelection()?.toString().length, l = i.contains(c), d = c && _(c, Ui);
  o && !l ? u.set(
    t,
    () => {
      h(t, ho), H(i, () => er(s));
    },
    17
  ) : (d || !a && !o && !l && r) && (s.relatedTarget = d || null, s.hide(), e.preventDefault());
}, er = (e) => {
  const { element: t, modalDialog: s } = e, n = (ae(s) || 0) + 17;
  v(t, ho), u.set(t, () => u.clear(t), n);
};
class uo extends st {
  static selector = Yi;
  static init = Zi;
  static getInstance = se;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = S(
      `.${X}-dialog`,
      n
    );
    o && (this.modalDialog = o, this.triggers = [
      ...U(
        lo,
        w(n)
      )
    ].filter(
      (i) => q(i) === n
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = f(n, O), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return ds;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Gi;
  }
  toggle() {
    f(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, hasFade: n, relatedTarget: o } = this, { backdrop: i } = s;
    let r = 0;
    if (f(t, p) || (ve.relatedTarget = o || void 0, b(t, ve), ve.defaultPrevented)) return;
    const c = Nt(t);
    if (c && c !== t) {
      const a = se(c) || j(
        c,
        hs
      );
      a && a.hide();
    }
    i ? (fs(A) ? us(!0) : io(t, n, !0), r = ae(A), ro(), setTimeout(() => Us(this), r)) : (Us(this), c && f(A, p) && Pe());
  }
  hide() {
    const { element: t, hasFade: s, relatedTarget: n } = this;
    f(t, p) && (We.relatedTarget = n || void 0, b(t, We), !We.defaultPrevented && (v(t, p), L(t, ie, "true"), It(t, $e), s ? H(t, () => Gs(this)) : Gs(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    f(this.element, p) && fo(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? N : M, { triggers: n } = this;
    n.length && n.forEach((o) => s(o, I, Qi));
  };
  dispose() {
    const t = { ...this }, { modalDialog: s, hasFade: n } = t, o = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), n ? H(s, o) : o();
  }
}
const sr = `.${Z}`, ps = `[${nt}="${Z}"]`, nr = `[${xe}="${Z}"]`, De = `${Z}-toggling`, or = {
  backdrop: !0,
  keyboard: !0,
  scroll: !1
}, ne = (e) => j(e, hs), ir = (e) => new bo(e), be = $(`show.bs.${Z}`), po = $(`shown.bs.${Z}`), je = $(`hide.bs.${Z}`), mo = $(`hidden.bs.${Z}`), rr = (e) => {
  const { element: t } = e, { clientHeight: s, scrollHeight: n } = lt(t);
  to(t, s !== n);
}, vo = (e, t) => {
  const s = t ? N : M, n = w(e.element);
  s(n, Te, dr), s(n, I, lr);
}, Zs = (e) => {
  const { element: t, options: s } = e;
  s.scroll || (rr(e), P(Tt(t), { overflow: "hidden" })), h(t, De), h(t, p), P(t, { visibility: "visible" }), H(t, () => hr(e));
}, cr = (e) => {
  const { element: t, options: s } = e, n = Nt(t);
  t.blur(), !n && s.backdrop && f(A, p) && Pe(), H(t, () => fr(e));
}, ar = (e) => {
  const t = _(e.target, ps), s = t && q(t), n = s && ne(s);
  n && (n.relatedTarget = t, n.toggle(), t?.tagName === "A" && e.preventDefault());
}, lr = (e) => {
  const { target: t } = e, s = S(
    gs,
    w(t)
  );
  if (!s) return;
  const n = S(
    nr,
    s
  ), o = ne(s);
  if (!o) return;
  const { options: i, triggers: r } = o, { backdrop: c } = i, a = _(t, ps), l = w(s).getSelection();
  A.contains(t) && c === "static" || (!(l && l.toString().length) && (!s.contains(t) && c && (!a || r.includes(t)) || n && n.contains(t)) && (o.relatedTarget = n && n.contains(t) ? n : void 0, o.hide()), a && a.tagName === "A" && e.preventDefault());
}, dr = ({ code: e, target: t }) => {
  const s = S(
    gs,
    w(t)
  ), n = s && ne(s);
  n && n.options.keyboard && e === as && (n.relatedTarget = void 0, n.hide());
}, hr = (e) => {
  const { element: t } = e;
  v(t, De), It(t, ie), L(t, $e, "true"), L(t, "role", "dialog"), b(t, po), vo(e, !0), at(t), Ce(t);
}, fr = (e) => {
  const { element: t, triggers: s } = e;
  L(t, ie, "true"), It(t, $e), It(t, "role"), P(t, { visibility: "" });
  const n = be.relatedTarget || s.find(ao);
  n && at(n), co(t), b(t, mo), v(t, De), Ce(t), Nt(t) || vo(e);
};
class bo extends st {
  static selector = sr;
  static init = ir;
  static getInstance = ne;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this;
    this.triggers = [
      ...U(
        ps,
        w(n)
      )
    ].filter(
      (o) => q(o) === n
    ), this.relatedTarget = void 0, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return hs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return or;
  }
  toggle() {
    f(this.element, p) ? this.hide() : this.show();
  }
  show() {
    const { element: t, options: s, relatedTarget: n } = this;
    let o = 0;
    if (f(t, p) || (be.relatedTarget = n || void 0, po.relatedTarget = n || void 0, b(t, be), be.defaultPrevented)) return;
    const i = Nt(t);
    if (i && i !== t) {
      const r = ne(i) || j(
        i,
        ds
      );
      r && r.hide();
    }
    s.backdrop ? (fs(A) ? us() : io(t, !0), o = ae(A), ro(), setTimeout(() => Zs(this), o)) : (Zs(this), i && f(A, p) && Pe());
  }
  hide() {
    const { element: t, relatedTarget: s } = this;
    f(t, p) && (je.relatedTarget = s || void 0, mo.relatedTarget = s || void 0, b(t, je), !je.defaultPrevented && (h(t, De), v(t, p), cr(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (t) => {
    const s = t ? N : M;
    this.triggers.forEach(
      (n) => s(n, I, ar)
    );
  };
  dispose() {
    const { element: t } = this, s = f(t, p), n = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), s ? H(t, n) : n();
  }
}
const kt = "popover", ms = "Popover", rt = "tooltip", wo = (e) => {
  const t = e === rt, s = t ? `${e}-inner` : `${e}-body`, n = t ? "" : `<h3 class="${e}-header"></h3>`, o = `<div class="${e}-arrow"></div>`, i = `<div class="${s}"></div>`;
  return `<div class="${e}" role="${rt}">${n + o + i}</div>`;
}, Eo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ss = (e) => {
  requestAnimationFrame(() => {
    const t = /\b(top|bottom|start|end)+/, { element: s, tooltip: n, container: o, offsetParent: i, options: r, arrow: c } = e;
    if (!n) return;
    const a = $t(s), { x: l, y: d } = ei(i);
    P(n, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const { offsetWidth: g, offsetHeight: E } = n, { clientWidth: k, clientHeight: z, offsetWidth: B } = lt(s);
    let { placement: m } = r;
    const { clientWidth: R, offsetWidth: yt } = o, x = W(
      o,
      "position"
    ) === "fixed", ht = Math.abs(x ? R - yt : k - B), ot = a && x ? ht : 0, J = k - (a ? 0 : ht) - 1, Mt = e._observer.getEntry(s), {
      width: y,
      height: V,
      left: Rt,
      right: F,
      top: xt
    } = Mt?.boundingClientRect || Et(s, !0), {
      x: he,
      y: Bt
    } = ii(
      s,
      i,
      { x: l, y: d }
    );
    P(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let St = 0, Xt = "", ft = 0, Ae = "", Ft = "", fe = "", ke = "";
    const Ht = c.offsetWidth || 0, gt = c.offsetHeight || 0, Ie = Ht / 2;
    let Yt = xt - E - gt < 0, Ut = xt + E + V + gt >= z, Gt = Rt - g - Ht < ot, Zt = Rt + g + y + Ht >= J;
    const ge = ["left", "right"], Le = ["top", "bottom"];
    Yt = ge.includes(m) ? xt + V / 2 - E / 2 - gt < 0 : Yt, Ut = ge.includes(m) ? xt + E / 2 + V / 2 + gt >= z : Ut, Gt = Le.includes(m) ? Rt + y / 2 - g / 2 < ot : Gt, Zt = Le.includes(m) ? Rt + g / 2 + y / 2 >= J : Zt, m = ge.includes(m) && Gt && Zt ? "top" : m, m = m === "top" && Yt ? "bottom" : m, m = m === "bottom" && Ut ? "top" : m, m = m === "left" && Gt ? "right" : m, m = m === "right" && Zt ? "left" : m, n.className.includes(m) || (n.className = n.className.replace(
      t,
      Eo[m]
    )), ge.includes(m) ? (m === "left" ? ft = he - g - Ht : ft = he + y + Ht, Yt && Ut ? (St = 0, Xt = 0, Ft = Bt + V / 2 - gt / 2) : Yt ? (St = Bt, Xt = "", Ft = V / 2 - Ht) : Ut ? (St = Bt - E + V, Xt = "", Ft = E - V / 2 - Ht) : (St = Bt - E / 2 + V / 2, Ft = E / 2 - gt / 2)) : Le.includes(m) && (m === "top" ? St = Bt - E - gt : St = Bt + V + gt, Gt ? (ft = 0, fe = he + y / 2 - Ie) : Zt ? (ft = "auto", Ae = 0, ke = y / 2 + J - F - Ie) : (ft = he - g / 2 + y / 2, fe = g / 2 - Ie)), P(n, {
      top: `${St}px`,
      bottom: Xt === "" ? "" : `${Xt}px`,
      left: ft === "auto" ? ft : `${ft}px`,
      right: Ae !== "" ? `${Ae}px` : ""
    }), C(c) && (Ft !== "" && (c.style.top = `${Ft}px`), fe !== "" ? c.style.left = `${fe}px` : ke !== "" && (c.style.right = `${ke}px`));
    const Mo = $(
      `updated.bs.${Vt(e.name)}`
    );
    b(s, Mo);
  });
}, ns = {
  template: wo(rt),
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
}, gr = (e) => e != null && typeof e == "object" || !1, ur = (e) => gr(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, Qs = (e) => ur(e) && e.nodeType === 1 || !1, pr = (e) => typeof e == "function" || !1, mr = "1.0.2", Js = "PositionObserver Error";
class $o {
  entries;
  static version = mr;
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
    if (!pr(t))
      throw new Error(`${Js}: ${t} is not a function.`);
    this.entries = /* @__PURE__ */ new Map(), this._callback = t, this._root = Qs(s?.root) ? s.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   *
   * @param target an `Element` target
   */
  observe = (t) => {
    if (!Qs(t))
      throw new Error(
        `${Js}: ${t} is not an instance of Element.`
      );
    this._root.contains(t) && this._new(t).then((s) => {
      this.getEntry(t) || this.entries.set(t, s), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
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
          this._root.contains(o) && this._new(o).then(({ boundingClientRect: r, isVisible: c }) => {
            const { left: a, top: l, bottom: d, right: g } = r;
            if (i.top !== l || i.left !== a || i.right !== g || i.bottom !== d) {
              const E = { target: o, boundingClientRect: r, isVisible: c };
              this.entries.set(o, E), n.push(E);
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
  _new = (t) => {
    const { clientWidth: s, clientHeight: n } = this._root;
    return new Promise((o) => {
      new IntersectionObserver(
        ([{ boundingClientRect: i }], r) => {
          r.disconnect();
          const { left: c, top: a, bottom: l, right: d, width: g, height: E } = i, k = a > 1 - E && c > 1 - g && l <= n + E - 1 && d <= s + g - 1;
          o({
            target: t,
            isVisible: k,
            boundingClientRect: i
          });
        }
      ).observe(t);
    });
  };
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
const To = "data-original-title", Pt = "Tooltip", pt = (e, t, s) => {
  if (ce(t) && t.length) {
    let n = t.trim();
    ci(s) && (n = s(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    e.append(...i.body.childNodes);
  } else C(t) ? e.append(t) : (ai(t) || ri(t) && t.every(D)) && e.append(...t);
}, vr = (e) => {
  const t = e.name === Pt, { id: s, element: n, options: o } = e, {
    title: i,
    placement: r,
    template: c,
    animation: a,
    customClass: l,
    sanitizeFn: d,
    dismissible: g,
    content: E,
    btnClose: k
  } = o, z = t ? rt : kt, B = { ...Eo };
  let m = [], R = [];
  $t(n) && (B.left = "end", B.right = "start");
  const yt = `bs-${z}-${B[r]}`;
  let Ct;
  if (C(c))
    Ct = c;
  else {
    const y = vt("div");
    pt(y, c, d), Ct = y.firstChild;
  }
  if (!C(Ct)) return;
  e.tooltip = Ct.cloneNode(!0);
  const { tooltip: x } = e;
  L(x, "id", s), L(x, "role", rt);
  const ht = t ? `${rt}-inner` : `${kt}-body`, ot = t ? null : S(`.${kt}-header`, x), J = S(`.${ht}`, x);
  e.arrow = S(
    `.${z}-arrow`,
    x
  );
  const { arrow: Mt } = e;
  if (C(i)) m = [i.cloneNode(!0)];
  else {
    const y = vt("div");
    pt(y, i, d), m = [...y.childNodes];
  }
  if (C(E)) R = [E.cloneNode(!0)];
  else {
    const y = vt("div");
    pt(y, E, d), R = [...y.childNodes];
  }
  if (g)
    if (i)
      if (C(k))
        m = [...m, k.cloneNode(!0)];
      else {
        const y = vt("div");
        pt(y, k, d), m = [...m, y.firstChild];
      }
    else if (ot && ot.remove(), C(k))
      R = [...R, k.cloneNode(!0)];
    else {
      const y = vt("div");
      pt(y, k, d), R = [...R, y.firstChild];
    }
  t ? i && J && pt(J, i, d) : (i && ot && pt(ot, m, d), E && J && pt(J, R, d), e.btn = S(".btn-close", x) || void 0), h(x, "position-absolute"), h(Mt, "position-absolute"), f(x, z) || h(x, z), a && !f(x, O) && h(x, O), l && !f(x, l) && h(x, l), f(x, yt) || h(x, yt);
}, br = (e) => {
  const t = ["HTML", "BODY"], s = [];
  let { parentNode: n } = e;
  for (; n && !t.includes(n.nodeName); )
    n = si(n), Hn(n) || ni(n) || s.push(n);
  return s.find((o, i) => (W(o, "position") !== "relative" || W(o, "position") === "relative" && o.offsetHeight !== o.scrollHeight) && s.slice(i + 1).every(
    (r) => W(r, "position") === "static"
  ) ? o : null) || w(e).body;
}, wr = `[${nt}="${rt}"],[data-tip="${rt}"]`, yo = "title";
let tn = (e) => j(e, Pt);
const Er = (e) => new vs(e), $r = (e) => {
  const { element: t, tooltip: s, container: n } = e;
  It(t, $n), so(
    s,
    n
  );
}, Qt = (e) => {
  const { tooltip: t, container: s } = e;
  return t && fs(t, s);
}, Tr = (e, t) => {
  const { element: s } = e;
  e._toggleEventListeners(), te(s, To) && e.name === Pt && xo(e), t && t();
}, Co = (e, t) => {
  const s = t ? N : M, { element: n } = e;
  s(
    w(n),
    cs,
    e.handleTouch,
    ee
  );
}, en = (e) => {
  const { element: t } = e, s = $(
    `shown.bs.${Vt(e.name)}`
  );
  Co(e, !0), b(t, s), u.clear(t, "in");
}, sn = (e) => {
  const { element: t } = e, s = $(
    `hidden.bs.${Vt(e.name)}`
  );
  Co(e), $r(e), b(t, s), u.clear(t, "out");
}, nn = (e, t) => {
  const s = t ? N : M, { element: n, tooltip: o } = e, i = _(n, `.${X}`), r = _(n, `.${Z}`);
  t ? [n, o].forEach((c) => e._observer.observe(c)) : e._observer.disconnect(), i && s(i, `hide.bs.${X}`, e.handleHide), r && s(r, `hide.bs.${Z}`, e.handleHide);
}, xo = (e, t) => {
  const s = [To, yo], { element: n } = e;
  L(
    n,
    s[t ? 0 : 1],
    t || et(n, s[0]) || ""
  ), It(n, s[t ? 1 : 0]);
};
class vs extends st {
  static selector = wr;
  static init = Er;
  static getInstance = tn;
  static styleTip = ss;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n } = this, o = this.name === Pt, i = o ? rt : kt, r = o ? Pt : ms;
    tn = (d) => j(d, r), this.enabled = !0, this.id = `${i}-${An(n, i)}`;
    const { options: c } = this;
    if (!c.title && o || !o && !c.content)
      return;
    ct(ns, { titleAttr: "" }), te(n, yo) && o && typeof c.title == "string" && xo(this, c.title);
    const a = br(n), l = ["sticky", "fixed", "relative"].some(
      (d) => W(a, "position") === d
    ) ? a : Pn(n);
    this.container = a, this.offsetParent = l, vr(this), this.tooltip && (this._observer = new $o((d) => {
      d.some((g) => g.isVisible) && this.update();
    }), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Pt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ns;
  }
  handleFocus = () => at(this.element);
  handleShow = () => this.show();
  show() {
    const { options: t, tooltip: s, element: n, container: o, id: i } = this, { animation: r } = t, c = u.get(n, "out");
    u.clear(n, "out"), s && !c && !Qt(this) && u.set(
      n,
      () => {
        const a = $(
          `show.bs.${Vt(this.name)}`
        );
        b(n, a), a.defaultPrevented || (eo(s, o), L(n, $n, `#${i}`), this.update(), nn(this, !0), f(s, p) || h(s, p), r ? H(s, () => en(this)) : en(this));
      },
      17,
      "in"
    );
  }
  handleHide = () => this.hide();
  hide() {
    const { options: t, tooltip: s, element: n } = this, { animation: o, delay: i } = t;
    u.clear(n, "in"), s && Qt(this) && u.set(
      n,
      () => {
        const r = $(
          `hide.bs.${Vt(this.name)}`
        );
        b(n, r), r.defaultPrevented || (this.update(), v(s, p), nn(this), o ? H(s, () => sn(this)) : sn(this));
      },
      i + 17,
      "out"
    );
  }
  update = () => {
    ss(this);
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
    const s = t ? N : M, { element: n, options: o, btn: i } = this, { trigger: r } = o, a = !!(this.name !== Pt && o.dismissible);
    r.includes("manual") || (this.enabled = !!t, r.split(" ").forEach((d) => {
      d === Bo ? (s(n, yn, this.handleShow), s(n, ye, this.handleShow), a || (s(n, rs, this.handleHide), s(
        w(n),
        cs,
        this.handleTouch,
        ee
      ))) : d === I ? s(n, d, a ? this.handleShow : this.toggle) : d === os && (s(n, is, this.handleShow), a || s(n, Tn, this.handleHide), Xo() && s(n, I, this.handleFocus)), a && i && s(i, I, this.handleHide);
    }));
  };
  dispose() {
    const { tooltip: t, options: s } = this, n = { ...this, name: this.name }, o = () => setTimeout(
      () => Tr(n, () => super.dispose()),
      17
    );
    s.animation && Qt(n) ? (this.options.delay = 0, this.hide(), H(t, o)) : o();
  }
}
const yr = `[${nt}="${kt}"],[data-tip="${kt}"]`, Cr = ct({}, ns, {
  template: wo(kt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), xr = (e) => j(e, ms), Sr = (e) => new So(e);
class So extends vs {
  static selector = yr;
  static init = Sr;
  static getInstance = xr;
  static styleTip = ss;
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
    return ms;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Cr;
  }
  show = () => {
    super.show();
    const { options: t, btn: s } = this;
    t.dismissible && s && setTimeout(() => at(s), 17);
  };
}
const Hr = "scrollspy", Ho = "ScrollSpy", Pr = '[data-bs-spy="scroll"]', Dr = {
  offset: 10,
  target: void 0
}, Ar = (e) => j(e, Ho), kr = (e) => new Do(e), on = $(`activate.bs.${Hr}`), Ir = (e) => {
  const {
    target: t,
    scrollTarget: s,
    options: n,
    itemsLength: o,
    scrollHeight: i,
    element: r,
    _observer: c
  } = e, { offset: a } = n, l = s !== r, d = t && ls("A", t), g = w(r), E = s.scrollHeight;
  if (e.scrollTop = s.scrollTop, d && (E !== i || o !== d.length)) {
    let k, z, B, m;
    e.items = [], e.targets = [], e.offsets = [], e.scrollHeight = E, e.maxScroll = e.scrollHeight - _r(e), Array.from(d).forEach((R) => {
      k = et(R, "href"), z = k?.slice(1), B = z?.length ? g.getElementById(z) : null, B && (e.items.push(R), e.targets.push(B), m = c?.getEntry(B)?.boundingClientRect || Et(B), e.offsets.push(
        (l ? m.top + e.scrollTop : B.offsetTop) - a
      ));
    }), e.itemsLength = e.items.length;
  }
}, rn = ({ targets: e, scrollTarget: t, element: s, _observer: n }, o) => {
  o ? t === s ? e?.forEach((i) => n.observe(i)) : n.observe(s) : n.disconnect();
}, Lr = (e) => e.scrollHeight, _r = ({ element: e, scrollTarget: t }) => t !== e ? t.clientHeight : Et(e).height, Po = (e) => {
  Array.from(ls("A", e)).forEach(
    (t) => {
      f(t, T) && v(t, T);
    }
  );
}, cn = (e, t) => {
  const { target: s, element: n } = e;
  C(s) && Po(s), e.activeItem = t, h(t, T);
  const o = [];
  let i = t;
  for (; i !== Tt(n); )
    i = i.parentElement, (f(i, "nav") || f(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const c = r.previousElementSibling;
    c && !f(c, T) && h(c, T);
  }), on.relatedTarget = t, b(n, on);
};
class Do extends st {
  static selector = Pr;
  static init = kr;
  static getInstance = Ar;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this, i = S(
      o.target,
      w(n)
    );
    i && (this.target = i, this.scrollTarget = n.clientHeight < n.scrollHeight ? n : lt(n), this.scrollHeight = Lr(this.scrollTarget), this.refresh(), this._observer = new $o((r) => {
      requestAnimationFrame(() => {
        r.some((c) => c.isVisible) && this.refresh();
      });
    }, {
      root: this.scrollTarget
    }), rn(this, !0));
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
    return Dr;
  }
  refresh = () => {
    const { target: t } = this;
    if (!C(t) || t.offsetHeight === 0) return;
    Ir(this);
    const { scrollTop: s, maxScroll: n, itemsLength: o, items: i, activeItem: r } = this;
    if (s >= n) {
      const a = i[o - 1];
      r !== a && cn(this, a);
      return;
    }
    const { offsets: c } = this;
    if (r && s < c[0] && c[0] > 0) {
      this.activeItem = null, t && Po(t);
      return;
    }
    i.forEach((a, l) => {
      r !== a && s >= c[l] && (typeof c[l + 1] > "u" || s < c[l + 1]) && cn(this, a);
    });
  };
  dispose() {
    const t = { ...this };
    rn(t), super.dispose();
  }
}
const de = "tab", Ao = "Tab", an = `[${nt}="${de}"]`, ko = (e) => j(e, Ao), Or = (e) => new Io(e), ze = $(
  `show.bs.${de}`
), ln = $(
  `shown.bs.${de}`
), Ve = $(
  `hide.bs.${de}`
), dn = $(
  `hidden.bs.${de}`
), oe = /* @__PURE__ */ new Map(), hn = (e) => {
  const { tabContent: t, nav: s } = e;
  t && f(t, Lt) && (t.style.height = "", v(t, Lt)), s && u.clear(s);
}, fn = (e) => {
  const { element: t, tabContent: s, content: n, nav: o } = e, { tab: i } = C(o) && oe.get(o) || { tab: null };
  if (s && n && f(n, O)) {
    const { currentHeight: r, nextHeight: c } = oe.get(t) || { currentHeight: 0, nextHeight: 0 };
    r !== c ? setTimeout(() => {
      s.style.height = `${c}px`, Ot(s), H(s, () => hn(e));
    }, 50) : hn(e);
  } else o && u.clear(o);
  ln.relatedTarget = i, b(t, ln);
}, gn = (e) => {
  const { element: t, content: s, tabContent: n, nav: o } = e, { tab: i, content: r } = o && oe.get(o) || { tab: null, content: null };
  let c = 0;
  if (n && s && f(s, O) && ([r, s].forEach((a) => {
    a && h(a, "overflow-hidden");
  }), c = r ? r.scrollHeight : 0), ze.relatedTarget = i, dn.relatedTarget = t, b(t, ze), !ze.defaultPrevented) {
    if (s && h(s, T), r && v(r, T), n && s && f(s, O)) {
      const a = s.scrollHeight;
      oe.set(t, {
        currentHeight: c,
        nextHeight: a,
        tab: null,
        content: null
      }), h(n, Lt), n.style.height = `${c}px`, Ot(n), [r, s].forEach((l) => {
        l && v(l, "overflow-hidden");
      });
    }
    s && s && f(s, O) ? setTimeout(() => {
      h(s, p), H(s, () => {
        fn(e);
      });
    }, 1) : (s && h(s, p), fn(e)), i && b(i, dn);
  }
}, un = (e) => {
  const { nav: t } = e;
  if (!C(t))
    return { tab: null, content: null };
  const s = it(
    T,
    t
  );
  let n = null;
  s.length === 1 && !_t.some(
    (i) => f(s[0].parentElement, i)
  ) ? [n] = s : s.length > 1 && (n = s[s.length - 1]);
  const o = C(n) ? q(n) : null;
  return { tab: n, content: o };
}, pn = (e) => {
  if (!C(e)) return null;
  const t = _(e, `.${_t.join(",.")}`);
  return t ? S(`.${_t[0]}-toggle`, t) : null;
}, Nr = (e) => {
  const t = ko(e.target);
  e.preventDefault(), t && t.show();
};
class Io extends st {
  static selector = an;
  static init = Or;
  static getInstance = ko;
  constructor(t) {
    super(t);
    const { element: s } = this, n = q(s);
    if (!n) return;
    const o = _(s, ".nav"), i = _(
      n,
      ".tab-content"
    );
    this.nav = o, this.content = n, this.tabContent = i, this.dropdown = pn(s);
    const { tab: r } = un(this);
    if (o && !r) {
      const c = S(an, o), a = c && q(c);
      a && (h(c, T), h(a, p), h(a, T), L(s, _e, "true"));
    }
    this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ao;
  }
  show() {
    const { element: t, content: s, nav: n, dropdown: o } = this;
    if (n && u.get(n) || f(t, T)) return;
    const { tab: i, content: r } = un(this);
    if (n && i && oe.set(n, { tab: i, content: r, currentHeight: 0, nextHeight: 0 }), Ve.relatedTarget = t, !C(i) || (b(i, Ve), Ve.defaultPrevented)) return;
    h(t, T), L(t, _e, "true");
    const c = C(i) && pn(i);
    if (c && f(c, T) && v(c, T), n) {
      const a = () => {
        i && (v(i, T), L(i, _e, "false")), o && !f(o, T) && h(o, T);
      };
      r && (f(r, O) || s && f(s, O)) ? u.set(n, a, 1) : a();
    }
    r && (v(r, p), f(r, O) ? H(r, () => gn(this)) : gn(this));
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (t) => {
    (t ? N : M)(this.element, I, Nr);
  };
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const Q = "toast", Lo = "Toast", Mr = `.${Q}`, Rr = `[${xe}="${Q}"]`, _o = `[${nt}="${Q}"]`, qt = "showing", Oo = "hide", Br = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, bs = (e) => j(e, Lo), Fr = (e) => new No(e), mn = $(
  `show.bs.${Q}`
), Wr = $(
  `shown.bs.${Q}`
), vn = $(
  `hide.bs.${Q}`
), jr = $(
  `hidden.bs.${Q}`
), bn = (e) => {
  const { element: t, options: s } = e;
  v(t, qt), u.clear(t, qt), b(t, Wr), s.autohide && u.set(t, () => e.hide(), s.delay, Q);
}, wn = (e) => {
  const { element: t } = e;
  v(t, qt), v(t, p), h(t, Oo), u.clear(t, Q), b(t, jr);
}, zr = (e) => {
  const { element: t, options: s } = e;
  h(t, qt), s.animation ? (Ot(t), H(t, () => wn(e))) : wn(e);
}, Vr = (e) => {
  const { element: t, options: s } = e;
  u.set(
    t,
    () => {
      v(t, Oo), Ot(t), h(t, p), h(t, qt), s.animation ? H(t, () => bn(e)) : bn(e);
    },
    17,
    qt
  );
}, Kr = (e) => {
  const { target: t } = e, s = t && _(t, _o), n = s && q(s), o = n && bs(n);
  o && (s && s.tagName === "A" && e.preventDefault(), o.relatedTarget = s, o.show());
}, qr = (e) => {
  const t = e.target, s = bs(t), { type: n, relatedTarget: o } = e;
  !s || t === o || t.contains(o) || ([ye, is].includes(n) ? u.clear(t, Q) : u.set(t, () => s.hide(), s.options.delay, Q));
};
class No extends st {
  static selector = Mr;
  static init = Fr;
  static getInstance = bs;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(t, s) {
    super(t, s);
    const { element: n, options: o } = this;
    o.animation && !f(n, O) ? h(n, O) : !o.animation && f(n, O) && v(n, O), this.dismiss = S(Rr, n), this.triggers = [
      ...U(
        _o,
        w(n)
      )
    ].filter(
      (i) => q(i) === n
    ), this._toggleEventListeners(!0);
  }
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
    return Br;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return f(this.element, p);
  }
  show = () => {
    const { element: t, isShown: s } = this;
    !t || s || (b(t, mn), mn.defaultPrevented || Vr(this));
  };
  hide = () => {
    const { element: t, isShown: s } = this;
    !t || !s || (b(t, vn), vn.defaultPrevented || zr(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (t) => {
    const s = t ? N : M, { element: n, triggers: o, dismiss: i, options: r, hide: c } = this;
    i && s(i, I, c), r.autohide && [is, Tn, ye, rs].forEach(
      (a) => s(n, a, qr)
    ), o.length && o.forEach(
      (a) => s(a, I, Kr)
    );
  };
  dispose() {
    const { element: t, isShown: s } = this;
    this._toggleEventListeners(), u.clear(t, Q), s && v(t, p), super.dispose();
  }
}
const ws = /* @__PURE__ */ new Map();
[
  _n,
  Nn,
  Bn,
  jn,
  Un,
  uo,
  bo,
  So,
  Do,
  Io,
  No,
  vs
].forEach((e) => ws.set(e.prototype.name, e));
const Xr = (e, t) => {
  [...t].forEach((s) => e(s));
}, Yr = (e, t) => {
  const s = Dt.getAllFor(e);
  s && [...s].forEach(([n, o]) => {
    t.contains(n) && o.dispose();
  });
}, En = (e) => {
  const t = e && e.nodeName ? e : document, s = [...ls("*", t)];
  ws.forEach((n) => {
    const { init: o, selector: i } = n;
    Xr(
      o,
      s.filter((r) => Dn(r, i))
    );
  });
}, Ur = (e) => {
  const t = e && e.nodeName ? e : document;
  ws.forEach((s) => {
    Yr(s.prototype.name, t);
  });
};
document.body ? En() : N(document, "DOMContentLoaded", () => En(), {
  once: !0
});
export {
  _n as Alert,
  Nn as Button,
  Bn as Carousel,
  jn as Collapse,
  Un as Dropdown,
  uo as Modal,
  bo as Offcanvas,
  So as Popover,
  Do as ScrollSpy,
  Io as Tab,
  No as Toast,
  vs as Tooltip,
  En as initCallback,
  Ur as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
