var qo = Object.defineProperty;
var Yo = (t, s, e) => s in t ? qo(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var d = (t, s, e) => Yo(t, typeof s != "symbol" ? s + "" : s, e);
const Rn = "aria-describedby", ke = "aria-expanded", ve = "aria-hidden", Ne = "aria-modal", Ns = "aria-pressed", Ge = "aria-selected", Uo = "DOMContentLoaded", Ts = "focus", ys = "focusin", Wn = "focusout", Me = "keydown", Zo = "keyup", _ = "click", jn = "mousedown", Jo = "hover", Be = "mouseenter", Cs = "mouseleave", Go = "pointerdown", Qo = "pointermove", ti = "pointerup", xs = "touchstart", ei = "dragstart", si = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', ls = "ArrowDown", ds = "ArrowUp", Ms = "ArrowLeft", Bs = "ArrowRight", Hs = "Escape", ni = "transitionDuration", oi = "transitionDelay", Qe = "transitionend", Vn = "transitionProperty", ii = navigator.userAgentData, Le = ii, { userAgent: ri } = navigator, Ie = ri, Fs = /iPhone|iPad|iPod|Android/i;
// istanbul ignore else @preserve
Le ? Le.brands.some((t) => Fs.test(t.brand)) : Fs.test(Ie);
const Rs = /(iPhone|iPod|iPad)/, ci = Le ? Le.brands.some(
  (t) => Rs.test(t.brand)
) : (
  /* istanbul ignore next @preserve */
  Rs.test(Ie)
);
Ie && Ie.includes("Firefox");
const { head: Fe } = document;
["webkitPerspective", "perspective"].some(
  (t) => t in Fe.style
);
const zn = (t, s, e, n) => {
  const o = n || !1;
  t.addEventListener(
    s,
    e,
    o
  );
}, Xn = (t, s, e, n) => {
  const o = n || !1;
  t.removeEventListener(
    s,
    e,
    o
  );
}, ai = (t, s, e, n) => {
  const o = (i) => {
    // istanbul ignore else @preserve
    (i.target === t || i.currentTarget === t) && (e.apply(t, [i]), Xn(t, s, o, n));
  };
  zn(t, s, o, n);
}, he = () => {
};
(() => {
  let t = !1;
  try {
    const s = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    // istanbul ignore next @preserve
    ai(document, Uo, he, s);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some(
  (t) => t in Fe.style
);
["webkitAnimation", "animation"].some(
  (t) => t in Fe.style
);
["webkitTransition", "transition"].some(
  (t) => t in Fe.style
);
const st = (t, s) => t.getAttribute(s), fe = (t, s) => t.hasAttribute(s), O = (t, s, e) => t.setAttribute(s, e), It = (t, s) => t.removeAttribute(s), f = (t, ...s) => {
  t.classList.add(...s);
}, b = (t, ...s) => {
  t.classList.remove(...s);
}, g = (t, s) => t.classList.contains(s), be = (t) => t != null && typeof t == "object" || !1, A = (t) => be(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (s) => t.nodeType === s
) || !1, y = (t) => A(t) && t.nodeType === 1 || !1, Wt = /* @__PURE__ */ new Map(), Dt = {
  data: Wt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (t, s, e) => {
    if (!y(t)) return;
    // istanbul ignore else @preserve
    Wt.has(s) || Wt.set(s, /* @__PURE__ */ new Map()), Wt.get(s).set(t, e);
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (t) => Wt.get(t) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (t, s) => {
    if (!y(t) || !s) return null;
    const e = Dt.getAllFor(s);
    return t && e && e.get(t) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (t, s) => {
    const e = Dt.getAllFor(s);
    if (!e || !y(t)) return;
    e.delete(t);
    // istanbul ignore else @preserve
    e.size === 0 && Wt.delete(s);
  }
}, z = (t, s) => Dt.get(t, s), we = (t) => typeof t == "string" || !1, li = (t) => be(t) && t.constructor.name === "Window" || !1, Kn = (t) => A(t) && t.nodeType === 9 || !1, E = (t) => li(t) ? t.document : Kn(t) ? t : A(t) ? t.ownerDocument : globalThis.document, dt = (t, ...s) => Object.assign(t, ...s), Et = (t) => {
  if (!t) return;
  if (we(t))
    return E().createElement(t);
  const { tagName: s } = t, e = Et(s);
  if (!e) return;
  const n = { ...t };
  return delete n.tagName, dt(e, n);
}, $ = (t, s) => t.dispatchEvent(s), K = (t, s) => {
  const e = getComputedStyle(t), n = s.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return e.getPropertyValue(n);
}, di = (t) => {
  const s = K(t, Vn), e = K(t, oi), n = e.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = s && s !== "none" ? parseFloat(e) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, $e = (t) => {
  const s = K(t, Vn), e = K(t, ni), n = e.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = s && s !== "none" ? parseFloat(e) * n : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, D = (t, s) => {
  let e = 0;
  const n = new Event(Qe), o = $e(t), i = di(t);
  if (o) {
    const r = (c) => {
      // istanbul ignore else @preserve
      c.target === t && (s.apply(t, [c]), t.removeEventListener(Qe, r), e = 1);
    };
    t.addEventListener(Qe, r), setTimeout(() => {
      // istanbul ignore next @preserve
      e || $(t, n);
    }, o + i + 17);
  } else
    s.apply(t, [n]);
}, ht = (t, s) => t.focus(s), Ws = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, He = (t) => Object.entries(t), Xt = (t) => t.toLowerCase(), hi = (t, s, e, n) => {
  const o = { ...e }, i = { ...t.dataset }, r = { ...s }, c = {}, l = "title";
  return He(i).forEach(([a, h]) => {
    const p = typeof a == "string" && a.includes(n) ? a.replace(n, "").replace(
      /[A-Z]/g,
      (u) => Xt(u)
    ) : (
      /* istanbul ignore next @preserve */
      a
    );
    c[p] = Ws(h);
  }), He(o).forEach(([a, h]) => {
    o[a] = Ws(h);
  }), He(s).forEach(([a, h]) => {
    // istanbul ignore else @preserve
    a in o ? r[a] = o[a] : a in c ? r[a] = c[a] : r[a] = a === l ? st(t, l) : h;
  }), r;
}, js = (t) => Object.keys(t), T = (t, s) => {
  const e = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  // istanbul ignore else @preserve
  return be(s) && dt(e, s), e;
}, ge = { passive: !0 }, Nt = (t) => t.offsetHeight, k = (t, s) => {
  He(s).forEach(([e, n]) => {
    if (n && we(e) && e.includes("--"))
      t.style.setProperty(e, n);
    else {
      const o = {};
      o[e] = n, dt(t.style, o);
    }
  });
}, hs = (t) => be(t) && t.constructor.name === "Map" || !1, fi = (t) => typeof t == "number" || !1, vt = /* @__PURE__ */ new Map(), m = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (t, s, e, n) => {
    if (!y(t)) return;
    // istanbul ignore else @preserve
    if (n && n.length) {
      // istanbul ignore else @preserve
      vt.has(t) || vt.set(t, /* @__PURE__ */ new Map()), vt.get(t).set(n, setTimeout(s, e));
    } else
      vt.set(t, setTimeout(s, e));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (t, s) => {
    if (!y(t)) return null;
    const e = vt.get(t);
    return s && e && hs(e) ? e.get(s) || /* istanbul ignore next @preserve */
    null : fi(e) ? e : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (t, s) => {
    if (!y(t)) return;
    const e = vt.get(t);
    if (s && s.length && hs(e)) {
      clearTimeout(e.get(s)), e.delete(s);
      // istanbul ignore else @preserve
      e.size === 0 && vt.delete(t);
    } else
      clearTimeout(e), vt.delete(t);
  }
}, J = (t, s) => (A(s) ? s : E()).querySelectorAll(t), fs = /* @__PURE__ */ new Map();
function gi(t) {
  const { shiftKey: s, code: e } = t, n = E(this), o = [
    ...J(si, this)
  ].filter(
    (c) => !fe(c, "disabled") && !st(c, ve)
  );
  if (!o.length) return;
  const i = o[0], r = o[o.length - 1];
  // istanbul ignore else @preserve
  e === "Tab" && (s && n.activeElement === i ? (r.focus(), t.preventDefault()) : !s && n.activeElement === r && (i.focus(), t.preventDefault()));
}
const pi = (t) => fs.has(t) === !0, Re = (t) => {
  const s = pi(t);
  (s ? Xn : zn)(t, "keydown", gi), s ? fs.delete(t) : fs.set(t, !0);
}, Ee = (t, s) => {
  const { width: e, height: n, top: o, right: i, bottom: r, left: c } = t.getBoundingClientRect();
  let l = 1, a = 1;
  if (s && y(t)) {
    const { offsetWidth: h, offsetHeight: p } = t;
    l = h > 0 ? Math.round(e) / h : (
      /* istanbul ignore next @preserve */
      1
    ), a = p > 0 ? Math.round(n) / p : (
      /* istanbul ignore next @preserve */
      1
    );
  }
  return {
    width: e / l,
    height: n / a,
    top: o / a,
    right: i / l,
    bottom: r / a,
    left: c / l,
    x: c / l,
    y: o / a
  };
}, xt = (t) => E(t).body, it = (t) => E(t).documentElement, qn = (t) => A(t) && t.constructor.name === "ShadowRoot" || !1, ui = (t) => t.nodeName === "HTML" ? t : y(t) && t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
A(t) && t.parentNode || // DOM Element detected
qn(t) && t.host || // ShadowRoot detected
it(t);
let Vs = 0, zs = 0;
const jt = /* @__PURE__ */ new Map(), Yn = (t, s) => {
  let e = s ? Vs : zs;
  if (s) {
    const n = Yn(t), o = jt.get(n) || /* @__PURE__ */ new Map();
    jt.has(n) || jt.set(n, o), hs(o) && !o.has(s) ? (o.set(s, e), Vs += 1) : e = o.get(s);
  } else {
    const n = t.id || t;
    jt.has(n) ? e = jt.get(n) : (jt.set(n, e), zs += 1);
  }
  return e;
}, mi = (t) => {
  var s;
  return t ? Kn(t) ? t.defaultView : A(t) ? (s = t == null ? void 0 : t.ownerDocument) == null ? void 0 : s.defaultView : t : window;
}, vi = (t) => Array.isArray(t) || !1, Un = (t) => {
  if (!A(t)) return !1;
  const { top: s, bottom: e } = Ee(t), { clientHeight: n } = it(t);
  return s <= n && e >= 0;
}, bi = (t) => typeof t == "function" || !1, wi = (t) => be(t) && t.constructor.name === "NodeList" || !1, Ct = (t) => it(t).dir === "rtl", $i = (t) => A(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, N = (t, s) => t ? t.closest(s) || // break out of `ShadowRoot`
N(t.getRootNode().host, s) : null, S = (t, s) => y(t) ? t : (A(s) ? s : E()).querySelector(t), Ps = (t, s) => (A(s) ? s : E()).getElementsByTagName(
  t
), at = (t, s) => (s && A(s) ? s : E()).getElementsByClassName(
  t
), Zn = (t, s) => t.matches(s), zt = {}, Jn = (t) => {
  const { type: s, currentTarget: e } = t;
  [...zt[s]].forEach(([n, o]) => {
    /* istanbul ignore else @preserve */
    e === n && [...o].forEach(([i, r]) => {
      i.apply(n, [t]), typeof r == "object" && r.once && R(n, s, i, r);
    });
  });
}, F = (t, s, e, n) => {
  /* istanbul ignore else @preserve */
  zt[s] || (zt[s] = /* @__PURE__ */ new Map());
  const o = zt[s];
  /* istanbul ignore else @preserve */
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: r } = i;
  i.set(e, n);
  /* istanbul ignore else @preserve */
  r || t.addEventListener(s, Jn, n);
}, R = (t, s, e, n) => {
  const o = zt[s], i = o && o.get(t), r = i && i.get(e), c = r !== void 0 ? r : n;
  /* istanbul ignore else @preserve */
  i && i.has(e) && i.delete(e);
  /* istanbul ignore else @preserve */
  o && (!i || !i.size) && o.delete(t);
  /* istanbul ignore else @preserve */
  (!o || !o.size) && delete zt[s];
  /* istanbul ignore else @preserve */
  (!i || !i.size) && t.removeEventListener(
    s,
    Jn,
    c
  );
}, B = "fade", v = "show", We = "data-bs-dismiss", je = "alert", Gn = "Alert", Ei = "5.0.15", Ti = Ei;
class nt {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(s, e) {
    /** just to have something to extend from */
    // istanbul ignore next @preserve coverage wise this isn't important
    d(this, "_toggleEventListeners", () => {
    });
    let n;
    try {
      if (y(s))
        n = s;
      else if (we(s)) {
        n = S(s);
        // istanbul ignore else @preserve
        if (!n) throw Error(`"${s}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (i) {
      throw Error(`${this.name} Error: ${i.message}`);
    }
    const o = Dt.get(n, this.name);
    // istanbul ignore else @preserve
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && js(this.defaults).length ? hi(n, this.defaults, e || {}, "bs") : {}, Dt.set(n, this.name, this);
  }
  // istanbul ignore next @preserve
  get version() {
    return Ti;
  }
  // istanbul ignore next @preserve
  get name() {
    return "BaseComponent";
  }
  // istanbul ignore next @preserve
  get defaults() {
    return {};
  }
  /** Removes component from target element. */
  dispose() {
    Dt.remove(this.element, this.name), js(this).forEach((s) => {
      delete this[s];
    });
  }
}
const yi = `.${je}`, Ci = `[${We}="${je}"]`, xi = (t) => z(t, Gn), Hi = (t) => new ee(t), Xs = T(
  `close.bs.${je}`
), Pi = T(
  `closed.bs.${je}`
), Ks = (t) => {
  const { element: s } = t;
  $(s, Pi), t._toggleEventListeners(), t.dispose(), s.remove();
};
class ee extends nt {
  constructor(e) {
    super(e);
    d(this, "dismiss");
    // ALERT PUBLIC METHODS
    // ====================
    /**
     * Public method that hides the `.alert` element from the user,
     * disposes the instance once animation is complete, then
     * removes the element from the DOM.
     */
    d(this, "close", () => {
      const { element: e } = this;
      // istanbul ignore else @preserve
      e && g(e, v) && ($(e, Xs), Xs.defaultPrevented || (b(e, v), g(e, B) ? D(e, () => Ks(this)) : Ks(this)));
    });
    /**
     * Toggle on / off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? F : R, { dismiss: o, close: i } = this;
      // istanbul ignore else @preserve
      o && n(o, _, i);
    });
    this.dismiss = S(Ci, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return Gn;
  }
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(ee, "selector", yi), d(ee, "init", Hi), d(ee, "getInstance", xi);
const x = "active", rt = "data-bs-toggle", Si = "button", Qn = "Button", Ai = `[${rt}="${Si}"]`, Di = (t) => z(t, Qn), ki = (t) => new se(t);
class se extends nt {
  /**
   * @param target usually a `.btn` element
   */
  constructor(e) {
    super(e);
    d(this, "isActive", !1);
    // BUTTON PUBLIC METHODS
    // =====================
    /**
     * Toggles the state of the target button.
     *
     * @param e usually `click` Event object
     */
    d(this, "toggle", (e) => {
      e && e.preventDefault();
      const { element: n, isActive: o } = this;
      !g(n, "disabled") && !st(n, "disabled") && ((o ? b : f)(n, x), O(n, Ns, o ? "false" : "true"), this.isActive = g(n, x));
    });
    // BUTTON PRIVATE METHOD
    // =====================
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? F : R)(this.element, _, this.toggle);
    });
    const { element: n } = this;
    this.isActive = g(n, x), O(n, Ns, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Qn;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(se, "selector", Ai), d(se, "init", ki), d(se, "getInstance", Di);
const gs = "data-bs-target", kt = "carousel", to = "Carousel", qs = "data-bs-parent", Li = "data-bs-container", Y = (t) => {
  const s = [gs, qs, Li, "href"], e = E(t);
  return s.map((n) => {
    const o = st(t, n);
    return o ? n === qs ? N(t, o) : S(o, e) : null;
  }).filter((n) => n)[0];
}, Te = `[data-bs-ride="${kt}"]`, Z = `${kt}-item`, ps = "data-bs-slide-to", $t = "data-bs-slide", Tt = "paused", Ys = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ft = (t) => z(t, to), Ii = (t) => new ne(t);
let te = 0, Pe = 0, ts = 0;
const es = T(`slide.bs.${kt}`), us = T(`slid.bs.${kt}`), Us = (t) => {
  const { index: s, direction: e, element: n, slides: o, options: i } = t;
  // istanbul ignore else @preserve
  if (t.isAnimating) {
    const r = ms(t), c = e === "left" ? "next" : "prev", l = e === "left" ? "start" : "end";
    f(o[s], x), b(o[s], `${Z}-${c}`), b(o[s], `${Z}-${l}`), b(o[r], x), b(o[r], `${Z}-${l}`), $(n, us), m.clear(n, $t), t.cycle && !E(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function _i() {
  const t = ft(this);
  // istanbul ignore else @preserve
  t && !t.isPaused && !m.get(this, Tt) && f(this, Tt);
}
function Oi() {
  const t = ft(this);
  // istanbul ignore else @preserve
  t && t.isPaused && !m.get(this, Tt) && t.cycle();
}
function Ni(t) {
  t.preventDefault();
  const s = N(this, Te) || Y(this), e = ft(s);
  // istanbul ignore else @preserve
  if (e && !e.isAnimating) {
    const n = +(st(this, ps) || // istanbul ignore next @preserve
    0);
    // istanbul ignore else @preserve
    this && !g(this, x) && // event target is not active
    !Number.isNaN(n) && e.to(n);
  }
}
function Mi(t) {
  t.preventDefault();
  const s = N(this, Te) || Y(this), e = ft(s);
  // istanbul ignore else @preserve
  if (e && !e.isAnimating) {
    const n = st(this, $t);
    // istanbul ignore else @preserve
    n === "next" ? e.next() : n === "prev" && e.prev();
  }
}
const Bi = ({ code: t, target: s }) => {
  const e = E(s), [n] = [...J(Te, e)].filter(
    (i) => Un(i)
  ), o = ft(n);
  // istanbul ignore next @preserve
  if (o && !o.isAnimating && !/textarea|input/i.test(s.nodeName)) {
    const i = Ct(n), r = i ? Ms : Bs, c = i ? Bs : Ms;
    // istanbul ignore else @preserve
    t === c ? o.prev() : t === r && o.next();
  }
};
function Zs(t) {
  const { target: s } = t, e = ft(this);
  // istanbul ignore next @preserve
  e && e.isTouch && (e.indicator && !e.indicator.contains(s) || !e.controls.includes(s)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function Fi(t) {
  const { target: s } = t, e = ft(this);
  // istanbul ignore else @preserve
  if (e && !e.isAnimating && !e.isTouch) {
    const { controls: n, indicators: o } = e;
    // istanbul ignore else @preserve
    if (![...n, ...o].every(
      (i) => i === s || i.contains(s)
    )) {
      te = t.pageX;
      // istanbul ignore else @preserve
      this.contains(s) && (e.isTouch = !0, eo(e, !0));
    }
  }
}
const Ri = (t) => {
  Pe = t.pageX;
}, Wi = (t) => {
  var o;
  const { target: s } = t, e = E(s), n = [...J(Te, e)].map((i) => ft(i)).find((i) => i.isTouch);
  // istanbul ignore else @preserve
  if (n) {
    const { element: i, index: r } = n, c = Ct(i);
    if (ts = t.pageX, n.isTouch = !1, eo(n), !((o = e.getSelection()) != null && o.toString().length) && i.contains(s) && Math.abs(te - ts) > 120) {
      // istanbul ignore else @preserve
      Pe < te ? n.to(r + (c ? -1 : 1)) : Pe > te && n.to(r + (c ? 1 : -1));
    }
    te = 0, Pe = 0, ts = 0;
  }
}, ss = (t, s) => {
  const { indicators: e } = t;
  [...e].forEach((n) => b(n, x));
  // istanbul ignore else @preserve
  t.indicators[s] && f(e[s], x);
}, eo = (t, s) => {
  const { element: e } = t, n = s ? F : R;
  n(
    E(e),
    Qo,
    Ri,
    ge
  ), n(
    E(e),
    ti,
    Wi,
    ge
  );
}, ms = (t) => {
  const { slides: s, element: e } = t, n = S(`.${Z}.${x}`, e);
  return y(n) ? [...s].indexOf(n) : -1;
};
class ne extends nt {
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles all event listeners for the `Carousel` instance.
     *
     * @param add when `TRUE` event listeners are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const { element: n, options: o, slides: i, controls: r, indicators: c } = this, { touch: l, pause: a, interval: h, keyboard: p } = o, u = e ? F : R;
      a && h && (u(n, Be, _i), u(n, Cs, Oi)), l && i.length > 2 && (u(
        n,
        Go,
        Fi,
        ge
      ), u(n, xs, Zs, { passive: !1 }), u(n, ei, Zs, { passive: !1 }));
      // istanbul ignore else @preserve
      r.length && r.forEach((C) => {
        // istanbul ignore else @preserve
        C && u(C, _, Mi);
      });
      // istanbul ignore else @preserve
      c.length && c.forEach((C) => {
        u(C, _, Ni);
      }), p && u(E(n), Me, Bi);
    });
    const { element: o } = this;
    this.direction = Ct(o) ? "right" : "left", this.isTouch = !1, this.slides = at(Z, o);
    const { slides: i } = this;
    if (i.length >= 2) {
      const r = ms(this), c = [...i].find(
        (h) => Zn(h, `.${Z}-next,.${Z}-next`)
      );
      this.index = r;
      const l = E(o);
      this.controls = [
        ...J(`[${$t}]`, o),
        ...J(
          `[${$t}][${gs}="#${o.id}"]`,
          l
        )
      ].filter((h, p, u) => p === u.indexOf(h)), this.indicator = S(`.${kt}-indicators`, o), this.indicators = [
        ...this.indicator ? J(`[${ps}]`, this.indicator) : [],
        ...J(
          `[${ps}][${gs}="#${o.id}"]`,
          l
        )
      ].filter((h, p, u) => p === u.indexOf(h));
      const { options: a } = this;
      this.options.interval = a.interval === !0 ? Ys.interval : a.interval;
      // istanbul ignore next @preserve - impossible to test
      c ? this.index = [...i].indexOf(c) : r < 0 && (this.index = 0, f(i[0], x), this.indicators.length && ss(this, 0));
      // istanbul ignore else @preserve
      this.indicators.length && ss(this, this.index), this._toggleEventListeners(!0), a.interval && this.cycle();
    }
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
    return Ys;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return g(this.element, Tt);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return S(
      `.${Z}-next,.${Z}-prev`,
      this.element
    ) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: e, options: n, isPaused: o, index: i } = this;
    m.clear(e, kt), o && (m.clear(e, Tt), b(e, Tt)), m.set(
      e,
      () => {
        // istanbul ignore else @preserve
        this.element && !this.isPaused && !this.isTouch && Un(e) && this.to(i + 1);
      },
      n.interval,
      kt
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: n } = this;
    // istanbul ignore else @preserve
    !this.isPaused && n.interval && (f(e, Tt), m.set(
      e,
      () => {
      },
      1,
      Tt
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
  to(e) {
    const { element: n, slides: o, options: i } = this, r = ms(this), c = Ct(n);
    let l = e;
    if (!this.isAnimating && r !== l && !m.get(n, $t)) {
      // istanbul ignore else @preserve
      r < l || r === 0 && l === o.length - 1 ? this.direction = c ? "right" : "left" : (r > l || r === o.length - 1 && l === 0) && (this.direction = c ? "left" : "right");
      const { direction: a } = this;
      l < 0 ? l = o.length - 1 : l >= o.length && (l = 0);
      const h = a === "left" ? "next" : "prev", p = a === "left" ? "start" : "end", u = {
        relatedTarget: o[l],
        from: r,
        to: l,
        direction: a
      };
      dt(es, u), dt(us, u), $(n, es), es.defaultPrevented || (this.index = l, ss(this, l), $e(o[l]) && g(n, "slide") ? m.set(
        n,
        () => {
          f(o[l], `${Z}-${h}`), Nt(o[l]), f(o[l], `${Z}-${p}`), f(o[r], `${Z}-${p}`), D(
            o[l],
            () => this.slides && this.slides.length && Us(this)
          );
        },
        0,
        $t
      ) : (f(o[l], x), b(o[r], x), m.set(
        n,
        () => {
          m.clear(n, $t);
          // istanbul ignore else @preserve
          n && i.interval && !this.isPaused && this.cycle(), $(n, us);
        },
        0,
        $t
      )));
    }
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating: e } = this, n = {
      ...this,
      isAnimating: e
    };
    this._toggleEventListeners(), super.dispose();
    // istanbul ignore next @preserve - impossible to test in playwright
    n.isAnimating && D(n.slides[n.index], () => {
      Us(n);
    });
  }
}
d(ne, "selector", Te), d(ne, "init", Ii), d(ne, "getInstance", ft);
const _t = "collapsing", q = "collapse", so = "Collapse", ji = `.${q}`, no = `[${rt}="${q}"]`, Vi = { parent: null }, Se = (t) => z(t, so), zi = (t) => new oe(t), Js = T(`show.bs.${q}`), Xi = T(`shown.bs.${q}`), Gs = T(`hide.bs.${q}`), Ki = T(`hidden.bs.${q}`), qi = (t) => {
  const { element: s, parent: e, triggers: n } = t;
  $(s, Js), Js.defaultPrevented || (m.set(s, he, 17), e && m.set(e, he, 17), f(s, _t), b(s, q), k(s, { height: `${s.scrollHeight}px` }), D(s, () => {
    m.clear(s), e && m.clear(e), n.forEach((o) => O(o, ke, "true")), b(s, _t), f(s, q), f(s, v), k(s, { height: "" }), $(s, Xi);
  }));
}, Qs = (t) => {
  const { element: s, parent: e, triggers: n } = t;
  $(s, Gs), Gs.defaultPrevented || (m.set(s, he, 17), e && m.set(e, he, 17), k(s, { height: `${s.scrollHeight}px` }), b(s, q), b(s, v), f(s, _t), Nt(s), k(s, { height: "0px" }), D(s, () => {
    m.clear(s);
    // istanbul ignore else @preserve
    e && m.clear(e), n.forEach((o) => O(o, ke, "false")), b(s, _t), f(s, q), k(s, { height: "" }), $(s, Ki);
  }));
}, Yi = (t) => {
  const { target: s } = t, e = s && N(s, no), n = e && Y(e), o = n && Se(n);
  // istanbul ignore else @preserve
  o && o.toggle(), e && e.tagName === "A" && t.preventDefault();
};
class oe extends nt {
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles on/off the event listener(s) of the `Collapse` instance.
     *
     * @param add when `true`, the event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? F : R, { triggers: o } = this;
      // istanbul ignore else @preserve
      o.length && o.forEach(
        (i) => n(i, _, Yi)
      );
    });
    const { element: o, options: i } = this, r = E(o);
    this.triggers = [...J(no, r)].filter(
      (c) => Y(c) === o
    ), this.parent = y(i.parent) ? i.parent : we(i.parent) ? Y(o) || S(i.parent, r) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return so;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Vi;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: n } = this;
    // istanbul ignore else @preserve
    if (!m.get(n)) {
      Qs(this);
      // istanbul ignore else @preserve
      e.length && e.forEach((o) => f(o, `${q}d`));
    }
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: n, triggers: o } = this;
    let i, r;
    if (n && (i = [
      ...J(`.${q}.${v}`, n)
    ].find((c) => Se(c)), r = i && Se(i)), (!n || !m.get(n)) && !m.get(e)) {
      r && i !== e && (Qs(r), r.triggers.forEach((c) => {
        f(c, `${q}d`);
      })), qi(this);
      // istanbul ignore else @preserve
      o.length && o.forEach((c) => b(c, `${q}d`));
    }
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    g(this.element, v) ? this.hide() : this.show();
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(oe, "selector", ji), d(oe, "init", zi), d(oe, "getInstance", Se);
const Ot = ["dropdown", "dropup", "dropstart", "dropend"], oo = "Dropdown", io = "dropdown-menu", ro = (t) => {
  const s = N(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  fe(t, "href") && st(t, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  s && fe(s, "href") && st(s, "href").slice(-1) === "#";
}, [et, vs, bs, ws] = Ot, co = `[${rt}="${et}"]`, Kt = (t) => z(t, oo), Ui = (t) => new ie(t), Zi = `${io}-end`, tn = [et, vs], en = [bs, ws], sn = ["A", "BUTTON"], Ji = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, ns = T(
  `show.bs.${et}`
), nn = T(
  `shown.bs.${et}`
), os = T(
  `hide.bs.${et}`
), on = T(`hidden.bs.${et}`), ao = T(`updated.bs.${et}`), lo = (t) => {
  const { element: s, menu: e, parentElement: n, options: o } = t, { offset: i } = o;
  // istanbul ignore else @preserve: this test requires a navbar
  if (K(e, "position") !== "static") {
    const r = Ct(s), c = g(e, Zi);
    ["margin", "top", "bottom", "left", "right"].forEach((I) => {
      const pt = {};
      pt[I] = "", k(e, pt);
    });
    let a = Ot.find(
      (I) => g(n, I)
    ) || // istanbul ignore next @preserve: fallback position
    et;
    const h = {
      dropdown: [i, 0, 0],
      dropup: [0, 0, i],
      dropstart: r ? [-1, 0, 0, i] : [-1, i, 0],
      dropend: r ? [-1, i, 0] : [-1, 0, 0, i]
    }, p = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: r ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: r ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: r ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: r ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: u, offsetHeight: C } = e, { clientWidth: j, clientHeight: w } = it(s), {
      left: M,
      top: W,
      width: Bt,
      height: ct
    } = Ee(s), H = M - u - i < 0, tt = M + u + Bt + i >= j, ot = W + C + i >= w, V = W + C + ct + i >= w, X = W - C - i < 0, P = (!r && c || r && !c) && M + Bt - u < 0, Ft = (r && c || !r && !c) && M + u >= j;
    if (en.includes(a) && H && tt && (a = et), a === bs && (r ? tt : H) && (a = ws), a === ws && (r ? H : tt) && (a = bs), a === vs && X && !V && (a = et), a === et && V && !X && (a = vs), en.includes(a) && ot && dt(p[a], {
      top: "auto",
      bottom: 0
    }), tn.includes(a) && (P || Ft)) {
      let I = { left: "auto", right: "auto" };
      // istanbul ignore else @preserve
      !P && Ft && !r && (I = { left: "auto", right: 0 });
      // istanbul ignore else @preserve
      P && !Ft && r && (I = { left: 0, right: "auto" });
      // istanbul ignore else @preserve
      I && dt(p[a], I);
    }
    const gt = h[a];
    if (k(e, {
      ...p[a],
      margin: `${gt.map((I) => I && `${I}px`).join(" ")}`
    }), tn.includes(a) && c) {
      // istanbul ignore else @preserve
      c && k(e, p[!r && P || r && Ft ? "menuStart" : "menuEnd"]);
    }
    $(n, ao);
  }
}, Gi = (t) => [...t.children].map((s) => {
  if (s && sn.includes(s.tagName)) return s;
  const { firstElementChild: e } = s;
  return e && sn.includes(e.tagName) ? e : null;
}).filter((s) => s), rn = (t) => {
  const { element: s, options: e, menu: n } = t, o = t.open ? F : R, i = E(s);
  o(i, _, cn), o(i, Ts, cn), o(i, Me, tr), o(i, Zo, er);
  // istanbul ignore else @preserve
  e.display === "dynamic" && (t.open ? t._observer.observe(n) : t._observer.disconnect());
}, Ve = (t) => {
  const s = [...Ot, "btn-group", "input-group"].map(
    (e) => at(`${e} ${v}`, E(t))
  ).find((e) => e.length);
  if (s && s.length)
    return [...s[0].children].find(
      (e) => Ot.some((n) => n === st(e, rt))
    );
}, cn = (t) => {
  const { target: s, type: e } = t;
  // istanbul ignore else @preserve
  if (s && y(s)) {
    const n = Ve(s), o = n && Kt(n);
    // istanbul ignore else @preserve
    if (o) {
      const { parentElement: i, menu: r } = o, c = i && i.contains(s) && (s.tagName === "form" || N(s, "form") !== null);
      [_, jn].includes(e) && ro(s) && t.preventDefault();
      // istanbul ignore else @preserve
      !c && e !== Ts && s !== n && s !== r && o.hide();
    }
  }
}, Qi = (t) => {
  const { target: s } = t, e = s && N(s, co), n = e && Kt(e);
  // istanbul ignore else @preserve
  if (n) {
    t.stopPropagation(), n.toggle();
    // istanbul ignore else @preserve
    e && ro(e) && t.preventDefault();
  }
}, tr = (t) => {
  // istanbul ignore else @preserve
  [ls, ds].includes(t.code) && t.preventDefault();
};
function er(t) {
  const { code: s } = t, e = Ve(this), n = e && Kt(e), { activeElement: o } = e && E(e);
  // istanbul ignore else @preserve
  if (n && o) {
    const { menu: i, open: r } = n, c = Gi(i);
    if (c && c.length && [ls, ds].includes(s)) {
      let l = c.indexOf(o);
      // istanbul ignore else @preserve
      o === e ? l = 0 : s === ds ? l = l > 1 ? l - 1 : 0 : s === ls && (l = l < c.length - 1 ? l + 1 : l);
      // istanbul ignore else @preserve
      c[l] && ht(c[l]);
    }
    Hs === s && r && (n.toggle(), ht(e));
  }
}
function sr(t) {
  const s = Ve(t), e = s && Kt(s);
  // istanbul ignore else @preserve
  e && e.open && lo(e);
}
class ie extends nt {
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles on/off the `click` event listener of the `Dropdown`.
     *
     * @param add when `true`, it will add the event listener
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? F : R)(this.element, _, Qi);
    });
    const { parentElement: o } = this.element, [i] = at(
      io,
      o
    );
    i && (this.parentElement = o, this.menu = i, this._observer = new IntersectionObserver(
      ([r]) => sr(r.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return oo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ji;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: e, open: n, menu: o, parentElement: i } = this;
    // istanbul ignore else @preserve
    if (!n) {
      const r = Ve(e), c = r && Kt(r);
      c && c.hide(), [ns, nn, ao].forEach(
        (l) => {
          l.relatedTarget = e;
        }
      ), $(i, ns), ns.defaultPrevented || (f(o, v), f(i, v), O(e, ke, "true"), lo(this), this.open = !n, ht(e), rn(this), $(i, nn));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: n, menu: o, parentElement: i } = this;
    // istanbul ignore else @preserve
    n && ([os, on].forEach((r) => {
      r.relatedTarget = e;
    }), $(i, os), os.defaultPrevented || (b(o, v), b(i, v), O(e, ke, "false"), this.open = !n, rn(this), $(i, on)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
d(ie, "selector", co), d(ie, "init", Ui), d(ie, "getInstance", Kt);
const U = "modal", Ss = "Modal", As = "Offcanvas", nr = "fixed-top", or = "fixed-bottom", ho = "sticky-top", fo = "position-sticky", go = (t) => [
  ...at(nr, t),
  ...at(or, t),
  ...at(ho, t),
  ...at(fo, t),
  ...at("is-fixed", t)
], ir = (t) => {
  const s = xt(t);
  k(s, {
    paddingRight: "",
    overflow: ""
  });
  const e = go(s);
  // istanbul ignore else @preserve
  e.length && e.forEach((n) => {
    k(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, po = (t) => {
  const { clientWidth: s } = it(t), { innerWidth: e } = mi(t);
  return Math.abs(e - s);
}, uo = (t, s) => {
  const e = xt(t), n = parseInt(K(e, "paddingRight"), 10), i = K(e, "overflow") === "hidden" && n ? 0 : po(t), r = go(e);
  // istanbul ignore else @preserve
  if (s) {
    k(e, {
      overflow: "hidden",
      paddingRight: `${n + i}px`
    });
    // istanbul ignore else @preserve
    r.length && r.forEach((c) => {
      const l = K(c, "paddingRight");
      c.style.paddingRight = `${parseInt(l, 10) + i}px`;
      // istanbul ignore else @preserve
      if ([ho, fo].some((a) => g(c, a))) {
        const a = K(c, "marginRight");
        c.style.marginRight = `${parseInt(a, 10) - i}px`;
      }
    });
  }
}, G = "offcanvas", yt = Et({
  tagName: "div",
  className: "popup-container"
}), mo = (t, s) => {
  const e = A(s) && s.nodeName === "BODY", n = A(s) && !e ? s : yt, o = e ? s : xt(t);
  // istanbul ignore else @preserve
  A(t) && (n === yt && o.append(yt), n.append(t));
}, vo = (t, s) => {
  const e = A(s) && s.nodeName === "BODY", n = A(s) && !e ? s : yt;
  // istanbul ignore else @preserve
  A(t) && (t.remove(), n === yt && !yt.children.length && yt.remove());
}, Ds = (t, s) => {
  const e = A(s) && s.nodeName !== "BODY" ? s : yt;
  return A(t) && e.contains(t);
}, bo = "backdrop", an = `${U}-${bo}`, ln = `${G}-${bo}`, wo = `.${U}.${v}`, ks = `.${G}.${v}`, L = Et("div"), Mt = (t) => S(
  `${wo},${ks}`,
  E(t)
), Ls = (t) => {
  const s = t ? an : ln;
  [an, ln].forEach((e) => {
    b(L, e);
  }), f(L, s);
}, $o = (t, s, e) => {
  Ls(e), mo(L, xt(t)), s && f(L, B);
}, Eo = () => {
  g(L, v) || (f(L, v), Nt(L));
}, ze = () => {
  b(L, v);
}, To = (t) => {
  Mt(t) || (b(L, B), vo(L, xt(t)), ir(t));
}, yo = (t) => y(t) && K(t, "visibility") !== "hidden" && t.offsetParent !== null, rr = `.${U}`, Co = `[${rt}="${U}"]`, cr = `[${We}="${U}"]`, xo = `${U}-static`, ar = {
  backdrop: !0,
  keyboard: !0
}, pe = (t) => z(t, Ss), lr = (t) => new re(t), Ae = T(
  `show.bs.${U}`
), dn = T(
  `shown.bs.${U}`
), is = T(
  `hide.bs.${U}`
), hn = T(
  `hidden.bs.${U}`
), Ho = (t) => {
  const { element: s } = t, e = po(s), { clientHeight: n, scrollHeight: o } = it(s), { clientHeight: i, scrollHeight: r } = s, c = i !== r;
  // istanbul ignore next @preserve: impossible to test?
  if (!c && e) {
    const a = { [Ct(s) ? "paddingLeft" : "paddingRight"]: `${e}px` };
    k(s, a);
  }
  uo(s, c || n !== o);
}, Po = (t, s) => {
  const e = s ? F : R, { element: n } = t;
  e(n, _, fr), e(E(n), Me, hr), s ? t._observer.observe(n) : t._observer.disconnect();
}, fn = (t) => {
  const { triggers: s, element: e, relatedTarget: n } = t;
  To(e), k(e, { paddingRight: "", display: "" }), Po(t);
  const o = Ae.relatedTarget || s.find(yo);
  // istanbul ignore else @preserve
  o && ht(o), hn.relatedTarget = n, $(e, hn), Re(e);
}, gn = (t) => {
  const { element: s, relatedTarget: e } = t;
  ht(s), Po(t, !0), dn.relatedTarget = e, $(s, dn), Re(s);
}, pn = (t) => {
  const { element: s, hasFade: e } = t;
  k(s, { display: "block" }), Ho(t);
  // istanbul ignore else @preserve
  Mt(s) || k(xt(s), { overflow: "hidden" }), f(s, v), It(s, ve), O(s, Ne, "true"), e ? D(s, () => gn(t)) : gn(t);
}, un = (t) => {
  const { element: s, options: e, hasFade: n } = t;
  e.backdrop && n && g(L, v) && !Mt(s) ? (ze(), D(L, () => fn(t))) : fn(t);
}, dr = (t) => {
  const { target: s } = t, e = s && N(s, Co), n = e && Y(e), o = n && pe(n);
  // istanbul ignore else @preserve
  if (o) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && t.preventDefault(), o.relatedTarget = e, o.toggle();
  }
}, hr = ({ code: t, target: s }) => {
  const e = S(wo, E(s)), n = e && pe(e);
  // istanbul ignore else @preserve
  if (n) {
    const { options: o } = n;
    // istanbul ignore else @preserve
    o.keyboard && t === Hs && // the keyboard option is enabled and the key is 27
    g(e, v) && (n.relatedTarget = null, n.hide());
  }
}, fr = (t) => {
  var n, o;
  const { currentTarget: s } = t, e = s && pe(s);
  // istanbul ignore else @preserve
  if (e && s && !m.get(s)) {
    const { options: i, isStatic: r, modalDialog: c } = e, { backdrop: l } = i, { target: a } = t, h = (o = (n = E(s)) == null ? void 0 : n.getSelection()) == null ? void 0 : o.toString().length, p = c.contains(a), u = a && N(a, cr);
    // istanbul ignore else @preserve
    r && !p ? m.set(
      s,
      () => {
        f(s, xo), D(c, () => gr(e));
      },
      17
    ) : (u || !h && !r && !p && l) && (e.relatedTarget = u || null, e.hide(), t.preventDefault());
  }
}, gr = (t) => {
  const { element: s, modalDialog: e } = t, n = ($e(e) || 0) + 17;
  b(s, xo), m.set(s, () => m.clear(s), n);
};
class re extends nt {
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Updates the modal layout.
     */
    d(this, "update", () => {
      // istanbul ignore else @preserve
      g(this.element, v) && Ho(this);
    });
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? F : R, { triggers: o } = this;
      // istanbul ignore else @preserve
      o.length && o.forEach(
        (i) => n(i, _, dr)
      );
    });
    const { element: o } = this, i = S(`.${U}-dialog`, o);
    // istanbul ignore else @preserve
    i && (this.modalDialog = i, this.triggers = [
      ...J(Co, E(o))
    ].filter(
      (r) => Y(r) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = g(o, B), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ss;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ar;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    g(this.element, v) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: n, hasFade: o, relatedTarget: i } = this, { backdrop: r } = n;
    let c = 0;
    // istanbul ignore else @preserve
    if (!g(e, v) && (Ae.relatedTarget = i || void 0, $(e, Ae), !Ae.defaultPrevented)) {
      const l = Mt(e);
      // istanbul ignore else @preserve
      if (l && l !== e) {
        const a = pe(l) || // istanbul ignore next @preserve
        z(
          l,
          As
        );
        // istanbul ignore else @preserve
        a && a.hide();
      }
      if (r)
        Ds(L) ? Ls(!0) : $o(e, o, !0), c = $e(L), Eo(), setTimeout(() => pn(this), c);
      else {
        pn(this);
        // istanbul ignore else @preserve
        l && g(L, v) && ze();
      }
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: n, relatedTarget: o } = this;
    // istanbul ignore else @preserve
    if (g(e, v)) {
      is.relatedTarget = o || void 0, $(e, is);
      // istanbul ignore else @preserve
      is.defaultPrevented || (b(e, v), O(e, ve, "true"), It(e, Ne), n ? D(e, () => un(this)) : un(this));
    }
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { modalDialog: n, hasFade: o } = e, i = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), o ? D(n, i) : i();
  }
}
d(re, "selector", rr), d(re, "init", lr), d(re, "getInstance", pe);
const pr = `.${G}`, Is = `[${rt}="${G}"]`, ur = `[${We}="${G}"]`, Xe = `${G}-toggling`, mr = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, ue = (t) => z(t, As), vr = (t) => new ce(t), De = T(`show.bs.${G}`), So = T(`shown.bs.${G}`), rs = T(`hide.bs.${G}`), Ao = T(`hidden.bs.${G}`), br = (t) => {
  const { element: s } = t, { clientHeight: e, scrollHeight: n } = it(s);
  uo(s, e !== n);
}, Do = (t, s) => {
  const e = s ? F : R, n = E(t.element);
  e(n, Me, Tr), e(n, _, Er);
}, mn = (t) => {
  const { element: s, options: e } = t;
  // istanbul ignore else @preserve
  e.scroll || (br(t), k(xt(s), { overflow: "hidden" })), f(s, Xe), f(s, v), k(s, { visibility: "visible" }), D(s, () => yr(t));
}, wr = (t) => {
  const { element: s, options: e } = t, n = Mt(s);
  s.blur(), !n && e.backdrop && g(L, v) && ze(), D(s, () => Cr(t));
}, $r = (t) => {
  const s = N(t.target, Is), e = s && Y(s), n = e && ue(e);
  // istanbul ignore else @preserve
  if (n) {
    n.relatedTarget = s, n.toggle();
    // istanbul ignore else @preserve
    s && s.tagName === "A" && t.preventDefault();
  }
}, Er = (t) => {
  const { target: s } = t, e = S(
    ks,
    E(s)
  ), n = S(
    ur,
    e
  ), o = e && ue(e);
  // istanbul ignore else @preserve
  if (o) {
    const { options: i, triggers: r } = o, { backdrop: c } = i, l = N(s, Is), a = E(e).getSelection();
    // istanbul ignore else: a filter is required here @preserve
    if (!L.contains(s) || c !== "static") {
      // istanbul ignore else @preserve
      !(a && a.toString().length) && (!e.contains(s) && c && // istanbul ignore next @preserve
      (!l || r.includes(s)) || n && n.contains(s)) && (o.relatedTarget = n && n.contains(s) ? n : null, o.hide());
      // istanbul ignore next @preserve
      l && l.tagName === "A" && t.preventDefault();
    }
  }
}, Tr = ({ code: t, target: s }) => {
  const e = S(
    ks,
    E(s)
  ), n = e && ue(e);
  // istanbul ignore else @preserve
  if (n) {
    // istanbul ignore else @preserve
    n.options.keyboard && t === Hs && (n.relatedTarget = null, n.hide());
  }
}, yr = (t) => {
  const { element: s } = t;
  b(s, Xe), It(s, ve), O(s, Ne, "true"), O(s, "role", "dialog"), $(s, So), Do(t, !0), ht(s), Re(s);
}, Cr = (t) => {
  const { element: s, triggers: e } = t;
  O(s, ve, "true"), It(s, Ne), It(s, "role"), k(s, { visibility: "" });
  const n = De.relatedTarget || e.find(yo);
  // istanbul ignore else @preserve
  n && ht(n), To(s), $(s, Ao), b(s, Xe), Re(s), Mt(s) || Do(t);
};
class ce extends nt {
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(e, n) {
    super(e, n);
    /**
     * Toggles on/off the `click` event listeners.
     *
     * @param self the `Offcanvas` instance
     * @param add when *true*, listeners are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? F : R;
      this.triggers.forEach(
        (o) => n(o, _, $r)
      );
    });
    const { element: o } = this;
    this.triggers = [
      ...J(Is, E(o))
    ].filter(
      (i) => Y(i) === o
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return As;
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
    g(this.element, v) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: n, relatedTarget: o } = this;
    let i = 0;
    if (!g(e, v) && (De.relatedTarget = o || void 0, So.relatedTarget = o || void 0, $(e, De), !De.defaultPrevented)) {
      const r = Mt(e);
      if (r && r !== e) {
        const c = ue(r) || // istanbul ignore next @preserve
        z(
          r,
          Ss
        );
        // istanbul ignore else @preserve
        c && c.hide();
      }
      if (n.backdrop)
        Ds(L) ? Ls() : $o(e, !0), i = $e(L), Eo(), setTimeout(() => mn(this), i);
      else {
        mn(this);
        // istanbul ignore next @preserve - this test was done on Modal
        r && g(L, v) && ze();
      }
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: e, relatedTarget: n } = this;
    g(e, v) && (rs.relatedTarget = n || void 0, Ao.relatedTarget = n || void 0, $(e, rs), rs.defaultPrevented || (f(e, Xe), b(e, v), wr(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element: e } = this, n = g(e, v), o = () => setTimeout(() => super.dispose(), 1);
    if (this.hide(), this._toggleEventListeners(), n) {
      D(e, o);
      // istanbul ignore next @preserve
    } else
      o();
  }
}
d(ce, "selector", pr), d(ce, "init", vr), d(ce, "getInstance", ue);
const Lt = "popover", Ke = "Popover", lt = "tooltip", ko = (t) => {
  const s = t === lt, e = s ? `${t}-inner` : `${t}-body`, n = s ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${e}"></div>`;
  return `<div class="${t}" role="${lt}">${n + o + i}</div>`;
}, Lo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, $s = (t) => {
  const s = /\b(top|bottom|start|end)+/, { element: e, tooltip: n, container: o, options: i, arrow: r } = t;
  // istanbul ignore else @preserve
  if (n) {
    const c = { ...Lo }, l = Ct(e);
    k(n, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const a = t.name === Ke, { offsetWidth: h, offsetHeight: p } = n, { clientWidth: u, clientHeight: C, offsetWidth: j } = it(e);
    let { placement: w } = i;
    const { clientWidth: M, offsetWidth: W } = o, ct = K(
      o,
      "position"
    ) === "fixed", H = Math.abs(ct ? M - W : u - j), tt = l && ct ? H : 0, ot = u - (l ? 0 : H) - 1, {
      width: V,
      height: X,
      left: P,
      right: Ft,
      top: gt
    } = Ee(e, !0), { x: I, y: pt } = {
      x: P,
      y: gt
    };
    k(r, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let Ht = 0, Yt = "", ut = 0, Ye = "", Rt = "", Ce = "", Ue = "";
    const Pt = r.offsetWidth || 0, mt = r.offsetHeight || 0, Ze = Pt / 2;
    let Ut = gt - p - mt < 0, Zt = gt + p + X + mt >= C, Jt = P - h - Pt < tt, Gt = P + h + V + Pt >= ot;
    const xe = ["left", "right"], Je = ["top", "bottom"];
    Ut = xe.includes(w) ? gt + X / 2 - p / 2 - mt < 0 : Ut, Zt = xe.includes(w) ? gt + p / 2 + X / 2 + mt >= C : Zt, Jt = Je.includes(w) ? P + V / 2 - h / 2 < tt : Jt, Gt = Je.includes(w) ? P + h / 2 + V / 2 >= ot : Gt, w = xe.includes(w) && Jt && Gt ? "top" : w, w = w === "top" && Ut ? "bottom" : w, w = w === "bottom" && Zt ? "top" : w, w = w === "left" && Jt ? "right" : w, w = w === "right" && Gt ? "left" : w, n.className.includes(w) || (n.className = n.className.replace(
      s,
      c[w]
    ));
    // istanbul ignore else @preserve
    xe.includes(w) ? (w === "left" ? ut = I - h - (a ? Pt : 0) : ut = I + V + (a ? Pt : 0), Ut && Zt ? (Ht = 0, Yt = 0, Rt = gt + X / 2 - mt / 2) : Ut ? (Ht = pt, Yt = "", Rt = X / 2 - Pt) : Zt ? (Ht = pt - p + X, Yt = "", Rt = p - X / 2 - Pt) : (Ht = pt - p / 2 + X / 2, Rt = p / 2 - mt / 2)) : Je.includes(w) && (w === "top" ? Ht = pt - p - (a ? mt : 0) : Ht = pt + X + (a ? mt : 0), Jt ? (ut = 0, Ce = I + V / 2 - Ze) : Gt ? (ut = "auto", Ye = 0, Ue = V / 2 + ot - Ft - Ze) : (ut = I - h / 2 + V / 2, Ce = h / 2 - Ze)), k(n, {
      top: `${Ht}px`,
      bottom: Yt === "" ? "" : `${Yt}px`,
      left: ut === "auto" ? ut : `${ut}px`,
      right: Ye !== "" ? `${Ye}px` : ""
    });
    // istanbul ignore else @preserve
    y(r) && (Rt !== "" && (r.style.top = `${Rt}px`), Ce !== "" ? r.style.left = `${Ce}px` : Ue !== "" && (r.style.right = `${Ue}px`));
    const Ko = T(
      `updated.bs.${Xt(t.name)}`
    );
    $(e, Ko);
  }
}, Es = {
  template: ko(lt),
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
};
var xr = Object.defineProperty, Hr = (t, s, e) => s in t ? xr(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e, bt = (t, s, e) => Hr(t, typeof s != "symbol" ? s + "" : s, e);
const Pr = "DOMContentLoaded", Sr = navigator.userAgentData, _e = Sr, { userAgent: Ar } = navigator, Oe = Ar, vn = /iPhone|iPad|iPod|Android/i;
// istanbul ignore else @preserve
_e ? _e.brands.some((t) => vn.test(t.brand)) : vn.test(Oe);
const bn = /(iPhone|iPod|iPad)/;
_e ? _e.brands.some(
  (t) => bn.test(t.brand)
) : (
  /* istanbul ignore next @preserve */
  bn.test(Oe)
);
Oe && Oe.includes("Firefox");
const { head: qe } = document;
["webkitPerspective", "perspective"].some(
  (t) => t in qe.style
);
const Dr = (t, s, e, n) => {
  const o = n || !1;
  t.addEventListener(
    s,
    e,
    o
  );
}, kr = (t, s, e, n) => {
  const o = n || !1;
  t.removeEventListener(
    s,
    e,
    o
  );
}, Lr = (t, s, e, n) => {
  const o = (i) => {
    // istanbul ignore else @preserve
    (i.target === t || i.currentTarget === t) && (e.apply(t, [i]), kr(t, s, o, n));
  };
  Dr(t, s, o, n);
}, Ir = () => {
};
(() => {
  let t = !1;
  try {
    const s = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    // istanbul ignore next @preserve
    Lr(document, Pr, Ir, s);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some(
  (t) => t in qe.style
);
["webkitAnimation", "animation"].some(
  (t) => t in qe.style
);
["webkitTransition", "transition"].some(
  (t) => t in qe.style
);
const _r = (t) => t != null && typeof t == "object" || !1, Or = (t) => _r(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (s) => t.nodeType === s
) || !1, Nr = (t) => Or(t) && t.nodeType === 1 || !1, wn = (t, s) => {
  const { width: e, height: n, top: o, right: i, bottom: r, left: c } = t.getBoundingClientRect();
  let l = 1, a = 1;
  return {
    width: e / l,
    height: n / a,
    top: o / a,
    right: i / l,
    bottom: r / a,
    left: c / l,
    x: c / l,
    y: o / a
  };
}, Mr = (t) => typeof t == "function" || !1, $n = "PositionObserver Error";
class Io {
  /**
   * The constructor takes a single argument, callback, which is called
   * whenever the position of an observed element changes. The callback function
   * should take an array of `PositionObserverEntry` objects as its only argument.
   *
   * @param callback the callback that applies to all targets of this observer
   */
  constructor(s, e) {
    if (bt(this, "entries"), bt(this, "_tick"), bt(this, "_root"), bt(this, "_callback"), bt(this, "observe", (n) => {
      if (!Nr(n))
        throw new Error(
          `${$n}: ${n} is not an instance of HTMLElement.`
        );
      const { clientWidth: o, clientHeight: i } = this._root, r = wn(n), { left: c, top: l, bottom: a, right: h, width: p, height: u } = r, C = l > 1 - u && c > 1 - p && a <= i + u - 1 && h <= o + p - 1;
      this.entries.push({ target: n, boundingBox: r, isVisible: C }), this._tick = requestAnimationFrame(this._runCallback);
    }), bt(this, "unobserve", (n) => {
      const o = this.entries.findIndex((i) => i.target === n);
      this.entries.splice(o, 1);
    }), bt(this, "_runCallback", () => {
      /* istanbul ignore if @preserve - a guard must be set */
      if (!this.entries.length) return;
      const n = [], { clientWidth: o, clientHeight: i } = this._root;
      this.entries.forEach((r, c) => {
        const { target: l, boundingBox: a } = r, h = wn(l), { left: p, top: u, bottom: C, right: j, width: w, height: M } = h;
        if (a.left !== p || a.top !== u || a.right !== j || a.bottom !== C) {
          const W = u > 1 - M && p > 1 - w && C <= i + M - 1 && j <= o + w - 1;
          this.entries[c].boundingBox = h, this.entries[c].isVisible = W, n.push({ target: l, boundingBox: h, isVisible: W });
        }
      }), n.length && this._callback(n), requestAnimationFrame(this._runCallback);
    }), bt(this, "disconnect", () => {
      cancelAnimationFrame(this._tick), this.entries.length = 0, this._tick = 0;
    }), !Mr(s))
      throw new Error(`${$n}: ${s} is not a function.`);
    this.entries = [], this._callback = s, this._root = (e == null ? void 0 : e.root) || (document == null ? void 0 : document.documentElement), this._tick = 0;
  }
}
const _o = "data-original-title", St = "Tooltip", wt = (t, s, e) => {
  // istanbul ignore else @preserve
  if (we(s) && s.length) {
    let n = s.trim();
    bi(e) && (n = e(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    t.append(...i.body.childNodes);
  } else y(s) ? t.append(s) : (wi(s) || vi(s) && s.every(A)) && t.append(...s);
}, Br = (t) => {
  const s = t.name === St, { id: e, element: n, options: o } = t, {
    title: i,
    placement: r,
    template: c,
    animation: l,
    customClass: a,
    sanitizeFn: h,
    dismissible: p,
    content: u,
    btnClose: C
  } = o, j = s ? lt : Lt, w = { ...Lo };
  let M = [], W = [];
  Ct(n) && (w.left = "end", w.right = "start");
  const Bt = `bs-${j}-${w[r]}`;
  let ct;
  if (y(c))
    ct = c;
  else {
    const tt = Et("div");
    wt(tt, c, h), ct = tt.firstChild;
  }
  t.tooltip = y(ct) ? ct.cloneNode(!0) : void 0;
  const { tooltip: H } = t;
  // istanbul ignore else @preserve
  if (H) {
    O(H, "id", e), O(H, "role", lt);
    const tt = s ? `${lt}-inner` : `${Lt}-body`, ot = s ? null : S(`.${Lt}-header`, H), V = S(`.${tt}`, H);
    t.arrow = S(`.${j}-arrow`, H);
    const { arrow: X } = t;
    if (y(i)) M = [i.cloneNode(!0)];
    else {
      const P = Et("div");
      wt(P, i, h), M = [...P.childNodes];
    }
    if (y(u)) W = [u.cloneNode(!0)];
    else {
      const P = Et("div");
      wt(P, u, h), W = [...P.childNodes];
    }
    if (p)
      if (i)
        if (y(C))
          M = [...M, C.cloneNode(!0)];
        else {
          const P = Et("div");
          wt(P, C, h), M = [...M, P.firstChild];
        }
      else {
        // istanbul ignore else @preserve
        if (ot && ot.remove(), y(C))
          W = [...W, C.cloneNode(!0)];
        else {
          const P = Et("div");
          wt(P, C, h), W = [...W, P.firstChild];
        }
      }
    // istanbul ignore else @preserve
    if (s)
      i && V && wt(V, i, h);
    else {
      // istanbul ignore else @preserve
      i && ot && wt(ot, M, h);
      // istanbul ignore else @preserve
      u && V && wt(V, W, h), t.btn = S(".btn-close", H) || void 0;
    }
    f(H, "position-fixed"), f(X, "position-absolute");
    // istanbul ignore else @preserve
    g(H, j) || f(H, j);
    // istanbul ignore else @preserve
    l && !g(H, B) && f(H, B);
    // istanbul ignore else @preserve
    a && !g(H, a) && f(H, a);
    // istanbul ignore else @preserve
    g(H, Bt) || f(H, Bt);
  }
}, Fr = (t) => {
  const s = ["HTML", "BODY"], e = [];
  let { parentNode: n } = t;
  for (; n && !s.includes(n.nodeName); ) {
    n = ui(n);
    // istanbul ignore else @preserve
    qn(n) || $i(n) || e.push(n);
  }
  return e.find((o, i) => K(o, "position") !== "relative" && e.slice(i + 1).every(
    (r) => K(r, "position") === "static"
  ) ? o : null) || // istanbul ignore next: optional guard
  E(t).body;
}, Rr = `[${rt}="${lt}"],[data-tip="${lt}"]`, Oo = "title";
let En = (t) => z(t, St);
const Wr = (t) => new At(t), jr = (t) => {
  const { element: s, tooltip: e, container: n, offsetParent: o } = t;
  It(s, Rn), vo(
    e,
    n === o ? n : o
  );
}, Qt = (t) => {
  const { tooltip: s, container: e, offsetParent: n } = t;
  return s && Ds(s, e === n ? e : n);
}, Vr = (t, s) => {
  const { element: e } = t;
  t._toggleEventListeners();
  // istanbul ignore else @preserve
  fe(e, _o) && t.name === St && Mo(t);
  // istanbul ignore else @preserve
  s && s();
}, No = (t, s) => {
  const e = s ? F : R, { element: n } = t;
  e(
    E(n),
    xs,
    t.handleTouch,
    ge
  );
}, Tn = (t) => {
  const { element: s } = t, e = T(
    `shown.bs.${Xt(t.name)}`
  );
  No(t, !0), $(s, e), m.clear(s, "in");
}, yn = (t) => {
  const { element: s } = t, e = T(
    `hidden.bs.${Xt(t.name)}`
  );
  No(t), jr(t), $(s, e), m.clear(s, "out");
}, Cn = (t, s) => {
  const e = s ? F : R, { element: n } = t, o = N(n, `.${U}`), i = N(n, `.${G}`);
  s ? t._observer.observe(t.element) : t._observer.disconnect(), o && e(o, `hide.bs.${U}`, t.handleHide), i && e(i, `hide.bs.${G}`, t.handleHide);
}, Mo = (t, s) => {
  const e = [_o, Oo], { element: n } = t;
  O(
    n,
    e[s ? 0 : 1],
    s || st(n, e[0]) || // istanbul ignore next @preserve
    ""
  ), It(n, e[s ? 1 : 0]);
};
class At extends nt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    // TOOLTIP PUBLIC METHODS
    // ======================
    /** Handles the focus event on iOS. */
    // istanbul ignore next @preserve - impossible to test without Apple device
    d(this, "handleFocus", () => ht(this.element));
    /** Shows the tooltip. */
    d(this, "handleShow", () => this.show());
    /** Hides the tooltip. */
    d(this, "handleHide", () => this.hide());
    /** Updates the tooltip position. */
    d(this, "update", () => {
      $s(this);
    });
    /** Toggles the tooltip visibility. */
    d(this, "toggle", () => {
      const { tooltip: e } = this;
      e && !Qt(this) ? this.show() : this.hide();
    });
    /**
     * Handles the `touchstart` event listener for `Tooltip`
     *
     * @this {Tooltip}
     * @param {TouchEvent} e the `Event` object
     */
    d(this, "handleTouch", ({ target: e }) => {
      const { tooltip: n, element: o } = this;
      // istanbul ignore if @preserve
      n && n.contains(e) || e === o || e && o.contains(e) || this.hide();
    });
    /**
     * Toggles on/off the `Tooltip` event listeners.
     *
     * @param add when `true`, event listeners are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? F : R, { element: o, options: i, btn: r } = this, { trigger: c } = i, a = !!(this.name !== St && i.dismissible);
      // istanbul ignore else @preserve
      c.includes("manual") || (this.enabled = !!e, c.split(" ").forEach((p) => {
        // istanbul ignore else @preserve
        if (p === Jo) {
          n(o, jn, this.handleShow), n(o, Be, this.handleShow);
          // istanbul ignore else @preserve
          a || (n(o, Cs, this.handleHide), n(
            E(o),
            xs,
            this.handleTouch,
            ge
          ));
        } else if (p === _)
          n(o, p, a ? this.handleShow : this.toggle);
        else if (p === Ts) {
          n(o, ys, this.handleShow);
          // istanbul ignore else @preserve
          a || n(o, Wn, this.handleHide);
          // istanbul ignore else @preserve
          ci && n(o, _, this.handleFocus);
        }
        // istanbul ignore else @preserve
        a && r && n(r, _, this.handleHide);
      }));
    });
    const { element: o } = this, i = this.name === St, r = i ? lt : Lt, c = i ? St : Ke;
    // istanbul ignore next @preserve: this is to set Popover too
    En = (a) => z(a, c), this.enabled = !0, this.id = `${r}-${Yn(o, r)}`;
    const { options: l } = this;
    if (!(!l.title && i || !i && !l.content)) {
      dt(Es, { titleAttr: "" });
      // istanbul ignore else @preserve
      fe(o, Oo) && i && typeof l.title == "string" && Mo(this, l.title), this.container = Fr(o), this.offsetParent = ["sticky", "fixed"].some(
        (a) => K(this.container, "position") === a
      ) ? this.container : E(this.element).body, Br(this), this._observer = new Io(() => this.update()), this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return St;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Es;
  }
  show() {
    const { options: e, tooltip: n, element: o, container: i, offsetParent: r, id: c } = this, { animation: l } = e, a = m.get(o, "out"), h = i === r ? i : r;
    m.clear(o, "out"), n && !a && !Qt(this) && m.set(
      o,
      () => {
        const p = T(
          `show.bs.${Xt(this.name)}`
        );
        $(o, p);
        // istanbul ignore else @preserve
        if (!p.defaultPrevented) {
          mo(n, h), O(o, Rn, `#${c}`), this.update(), Cn(this, !0);
          // istanbul ignore else @preserve
          g(n, v) || f(n, v);
          // istanbul ignore else @preserve
          l ? D(n, () => Tn(this)) : Tn(this);
        }
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: e, tooltip: n, element: o } = this, { animation: i, delay: r } = e;
    m.clear(o, "in");
    // istanbul ignore else @preserve
    n && Qt(this) && m.set(
      o,
      () => {
        const c = T(
          `hide.bs.${Xt(this.name)}`
        );
        $(o, c);
        // istanbul ignore else @preserve
        if (!c.defaultPrevented) {
          this.update(), b(n, v), Cn(this);
          // istanbul ignore else @preserve
          i ? D(n, () => yn(this)) : yn(this);
        }
      },
      r + 17,
      "out"
    );
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: e } = this;
    // istanbul ignore else @preserve
    e || (this._toggleEventListeners(!0), this.enabled = !e);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: e, enabled: n } = this;
    // istanbul ignore else @preserve
    n && (e && Qt(this) && this.hide(), this._toggleEventListeners(), this.enabled = !n);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: e, options: n } = this, o = { ...this, name: this.name }, i = () => setTimeout(
      () => Vr(o, () => super.dispose()),
      17
    );
    n.animation && Qt(o) ? (this.options.delay = 0, this.hide(), D(e, i)) : i();
  }
}
d(At, "selector", Rr), d(At, "init", Wr), d(At, "getInstance", En), d(At, "styleTip", $s);
const zr = `[${rt}="${Lt}"],[data-tip="${Lt}"]`, Xr = dt({}, Es, {
  template: ko(Lt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Kr = (t) => z(t, Ke), qr = (t) => new Vt(t);
class Vt extends At {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /* extend original `show()` */
    d(this, "show", () => {
      super.show();
      const { options: e, btn: n } = this;
      // istanbul ignore else @preserve
      e.dismissible && n && setTimeout(() => ht(n), 17);
    });
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ke;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Xr;
  }
}
d(Vt, "selector", zr), d(Vt, "init", qr), d(Vt, "getInstance", Kr), d(Vt, "styleTip", $s);
const Yr = "scrollspy", Bo = "ScrollSpy", Ur = '[data-bs-spy="scroll"]', Zr = {
  offset: 10,
  target: null
}, Jr = (t) => z(t, Bo), Gr = (t) => new ae(t), xn = T(`activate.bs.${Yr}`), Qr = (t) => {
  const { target: s, scrollTarget: e, options: n, itemsLength: o, scrollHeight: i, element: r } = t, { offset: c } = n, l = e !== r, a = s && Ps("A", s), h = E(r), p = e ? Fo(e) : i;
  t.scrollTop = e.scrollTop;
  // istanbul ignore else @preserve
  if (a && (p !== i || o !== a.length)) {
    let u, C, j;
    t.items = [], t.targets = [], t.offsets = [], t.scrollHeight = p, t.maxScroll = t.scrollHeight - tc(t), Array.from(a).forEach((w) => {
      u = st(w, "href"), C = u && u.charAt(0) === "#" && u.slice(-1) !== "#" && S(u, h), C && (t.items.push(w), t.targets.push(C), j = Ee(C), t.offsets.push(
        (l ? j.top + t.scrollTop : C.offsetTop) - c
      ));
    }), t.itemsLength = t.items.length;
  }
}, Fo = (t) => y(t) ? t.scrollHeight : it(t).scrollHeight, tc = ({ element: t, scrollTarget: s }) => s !== t ? s.clientHeight : Ee(t).height, Ro = (t) => {
  [...Ps("A", t)].forEach((s) => {
    g(s, x) && b(s, x);
  });
}, Hn = (t, s) => {
  const { target: e, element: n } = t;
  // istanbul ignore else @preserve
  y(e) && Ro(e), t.activeItem = s, f(s, x);
  const o = [];
  let i = s;
  for (; i !== xt(n); )
    i = i.parentElement, (g(i, "nav") || g(i, "dropdown-menu")) && o.push(i);
  o.forEach((r) => {
    const c = r.previousElementSibling;
    // istanbul ignore else @preserve
    c && !g(c, x) && f(c, x);
  }), xn.relatedTarget = s, $(n, xn);
};
class ae extends nt {
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    /* eslint-enable */
    // SCROLLSPY PUBLIC METHODS
    // ========================
    /** Updates all items. */
    d(this, "refresh", () => {
      const { target: e } = this;
      // istanbul ignore else @preserve
      if (y(e) && e.offsetHeight > 0) {
        Qr(this);
        const { scrollTop: n, maxScroll: o, itemsLength: i, items: r, activeItem: c } = this;
        if (n >= o) {
          const a = r[i - 1];
          // istanbul ignore else @preserve
          c !== a && Hn(this, a);
          return;
        }
        const { offsets: l } = this;
        // istanbul ignore else @preserve
        if (c && n < l[0] && l[0] > 0) {
          this.activeItem = null;
          // istanbul ignore else @preserve
          e && Ro(e);
          return;
        }
        r.forEach((a, h) => {
          c !== a && n >= l[h] && (typeof l[h + 1] > "u" || n < l[h + 1]) && Hn(this, a);
        });
      }
    });
    /**
     * Toggles on/off the component event listener.
     *
     * @param add when `true`, listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      e ? this.scrollTarget === this.element ? this.targets.forEach(
        (n) => this._observer.observe(n)
      ) : this._observer.observe(this.element) : this._observer.disconnect();
    });
    const { element: o, options: i } = this;
    this.target = S(
      i.target,
      E(o)
    ), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : it(o), this.scrollHeight = Fo(this.scrollTarget), this.refresh(), this._observer = new Io(() => this.refresh(), {
      root: this.scrollTarget
    }), this._toggleEventListeners(!0));
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return Bo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Zr;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(ae, "selector", Ur), d(ae, "init", Gr), d(ae, "getInstance", Jr);
const ye = "tab", Wo = "Tab", Pn = `[${rt}="${ye}"]`, jo = (t) => z(t, Wo), ec = (t) => new le(t), cs = T(
  `show.bs.${ye}`
), Sn = T(
  `shown.bs.${ye}`
), as = T(
  `hide.bs.${ye}`
), An = T(
  `hidden.bs.${ye}`
), me = /* @__PURE__ */ new Map(), Dn = (t) => {
  const { tabContent: s, nav: e } = t;
  // istanbul ignore else @preserve
  s && g(s, _t) && (s.style.height = "", b(s, _t));
  // istanbul ignore else @preserve
  e && m.clear(e);
}, kn = (t) => {
  const { element: s, tabContent: e, content: n, nav: o } = t, { tab: i } = y(o) && me.get(o) || // istanbul ignore next @preserve
  { tab: null };
  // istanbul ignore else @preserve
  if (e && n && g(n, B)) {
    const { currentHeight: r, nextHeight: c } = me.get(s) || // istanbul ignore next @preserve
    { currentHeight: 0, nextHeight: 0 };
    // istanbul ignore else @preserve: vitest won't validate this branch
    r !== c ? setTimeout(() => {
      e.style.height = `${c}px`, Nt(e), D(e, () => Dn(t));
    }, 50) : Dn(t);
  } else o && m.clear(o);
  Sn.relatedTarget = i, $(s, Sn);
}, Ln = (t) => {
  const { element: s, content: e, tabContent: n, nav: o } = t, { tab: i, content: r } = o && me.get(o) || // istanbul ignore next @preserve
  { tab: null, content: null };
  let c = 0;
  // istanbul ignore else @preserve
  n && e && g(e, B) && ([r, e].forEach((l) => {
    // istanbul ignore else @preserve
    y(l) && f(l, "overflow-hidden");
  }), c = y(r) ? r.scrollHeight : 0), cs.relatedTarget = i, An.relatedTarget = s, $(s, cs);
  // istanbul ignore else @preserve
  if (!cs.defaultPrevented) {
    // istanbul ignore else @preserve
    e && f(e, x);
    // istanbul ignore else @preserve
    r && b(r, x);
    // istanbul ignore else @preserve
    if (n && e && g(e, B)) {
      const l = e.scrollHeight;
      me.set(s, {
        currentHeight: c,
        nextHeight: l,
        tab: null,
        content: null
      }), f(n, _t), n.style.height = `${c}px`, Nt(n), [r, e].forEach((a) => {
        // istanbul ignore else @preserve
        a && b(a, "overflow-hidden");
      });
    }
    if (e && e && g(e, B))
      setTimeout(() => {
        f(e, v), D(e, () => {
          kn(t);
        });
      }, 1);
    else {
      // istanbul ignore else @preserve
      e && f(e, v), kn(t);
    }
    // istanbul ignore else @preserve
    i && $(i, An);
  }
}, In = (t) => {
  const { nav: s } = t;
  // istanbul ignore next @preserve
  if (!y(s))
    return { tab: null, content: null };
  const e = at(x, s);
  let n = null;
  // istanbul ignore else @preserve
  e.length === 1 && !Ot.some(
    (i) => g(e[0].parentElement, i)
  ) ? [n] = e : e.length > 1 && (n = e[e.length - 1]);
  const o = y(n) ? Y(n) : null;
  return { tab: n, content: o };
}, _n = (t) => {
  // istanbul ignore next @preserve
  if (!y(t)) return null;
  const s = N(t, `.${Ot.join(",.")}`);
  return s ? S(`.${Ot[0]}-toggle`, s) : null;
}, sc = (t) => {
  const s = jo(t.target);
  // istanbul ignore else @preserve
  s && (t.preventDefault(), s.show());
};
class le extends nt {
  /** @param target the target element */
  constructor(e) {
    super(e);
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? F : R)(this.element, _, sc);
    });
    const { element: n } = this, o = Y(n);
    // istanbul ignore else @preserve
    if (o) {
      const i = N(n, ".nav"), r = N(o, ".tab-content");
      this.nav = i, this.content = o, this.tabContent = r, this.dropdown = _n(n);
      const { tab: c } = In(this);
      if (i && !c) {
        const l = S(Pn, i), a = l && Y(l);
        // istanbul ignore else @preserve
        a && (f(l, x), f(a, v), f(a, x), O(n, Ge, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Wo;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: n, nav: o, dropdown: i } = this;
    // istanbul ignore else @preserve
    if (!(o && m.get(o)) && !g(e, x)) {
      const { tab: r, content: c } = In(this);
      // istanbul ignore else @preserve
      o && me.set(o, { tab: r, content: c, currentHeight: 0, nextHeight: 0 }), as.relatedTarget = e;
      // istanbul ignore else @preserve
      if (y(r)) {
        $(r, as);
        // istanbul ignore else @preserve
        if (!as.defaultPrevented) {
          f(e, x), O(e, Ge, "true");
          const l = y(r) && _n(r);
          l && g(l, x) && b(l, x);
          // istanbul ignore else @preserve
          if (o) {
            const a = () => {
              // istanbul ignore else @preserve
              r && (b(r, x), O(r, Ge, "false")), i && !g(i, x) && f(i, x);
            };
            c && (g(c, B) || n && g(n, B)) ? m.set(o, a, 1) : a();
          }
          // istanbul ignore else @preserve
          c && (b(c, v), g(c, B) ? D(c, () => Ln(this)) : Ln(this));
        }
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(le, "selector", Pn), d(le, "init", ec), d(le, "getInstance", jo);
const Q = "toast", Vo = "Toast", nc = `.${Q}`, oc = `[${We}="${Q}"]`, zo = `[${rt}="${Q}"]`, qt = "showing", Xo = "hide", ic = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, _s = (t) => z(t, Vo), rc = (t) => new de(t), On = T(
  `show.bs.${Q}`
), cc = T(
  `shown.bs.${Q}`
), Nn = T(
  `hide.bs.${Q}`
), ac = T(
  `hidden.bs.${Q}`
), Mn = (t) => {
  const { element: s, options: e } = t;
  b(s, qt), m.clear(s, qt), $(s, cc);
  // istanbul ignore else @preserve
  e.autohide && m.set(s, () => t.hide(), e.delay, Q);
}, Bn = (t) => {
  const { element: s } = t;
  b(s, qt), b(s, v), f(s, Xo), m.clear(s, Q), $(s, ac);
}, lc = (t) => {
  const { element: s, options: e } = t;
  f(s, qt), e.animation ? (Nt(s), D(s, () => Bn(t))) : Bn(t);
}, dc = (t) => {
  const { element: s, options: e } = t;
  m.set(
    s,
    () => {
      b(s, Xo), Nt(s), f(s, v), f(s, qt), e.animation ? D(s, () => Mn(t)) : Mn(t);
    },
    17,
    qt
  );
}, hc = (t) => {
  const { target: s } = t, e = s && N(s, zo), n = e && Y(e), o = n && _s(n);
  // istanbul ignore else @preserve
  if (o) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && t.preventDefault(), o.relatedTarget = e, o.show();
  }
}, fc = (t) => {
  const s = t.target, e = _s(s), { type: n, relatedTarget: o } = t;
  // istanbul ignore else @preserve: a solid filter is required
  e && s !== o && !s.contains(o) && ([Be, ys].includes(n) ? m.clear(s, Q) : m.set(s, () => e.hide(), e.options.delay, Q));
};
class de extends nt {
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(e, n) {
    super(e, n);
    // TOAST PUBLIC METHODS
    // ====================
    /** Shows the toast. */
    d(this, "show", () => {
      const { element: e, isShown: n } = this;
      // istanbul ignore else @preserve
      e && !n && ($(e, On), On.defaultPrevented || dc(this));
    });
    /** Hides the toast. */
    d(this, "hide", () => {
      const { element: e, isShown: n } = this;
      // istanbul ignore else @preserve
      e && n && ($(e, Nn), Nn.defaultPrevented || lc(this));
    });
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, it will add the listener
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? F : R, { element: o, triggers: i, dismiss: r, options: c, hide: l } = this;
      // istanbul ignore else @preserve
      r && n(r, _, l);
      // istanbul ignore else @preserve
      c.autohide && [ys, Wn, Be, Cs].forEach(
        (a) => n(o, a, fc)
      );
      // istanbul ignore else @preserve
      i.length && i.forEach(
        (a) => n(a, _, hc)
      );
    });
    const { element: o, options: i } = this;
    i.animation && !g(o, B) ? f(o, B) : !i.animation && g(o, B) && b(o, B), this.dismiss = S(oc, o), this.triggers = [
      ...J(zo, E(o))
    ].filter(
      (r) => Y(r) === o
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Vo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ic;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return g(this.element, v);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: n } = this;
    this._toggleEventListeners(), m.clear(e, Q), n && b(e, v), super.dispose();
  }
}
d(de, "selector", nc), d(de, "init", rc), d(de, "getInstance", _s);
const Os = /* @__PURE__ */ new Map();
[
  ee,
  se,
  ne,
  oe,
  ie,
  re,
  ce,
  Vt,
  ae,
  le,
  de,
  At
].forEach((t) => Os.set(t.prototype.name, t));
const gc = (t, s) => {
  [...s].forEach((e) => t(e));
}, pc = (t, s) => {
  const e = Dt.getAllFor(t);
  e && [...e].forEach(([n, o]) => {
    s.contains(n) && o.dispose();
  });
}, Fn = (t) => {
  const s = t && t.nodeName ? t : document, e = [...Ps("*", s)];
  Os.forEach((n) => {
    const { init: o, selector: i } = n;
    gc(
      o,
      e.filter((r) => Zn(r, i))
    );
  });
}, mc = (t) => {
  const s = t && t.nodeName ? t : document;
  Os.forEach((e) => {
    pc(e.prototype.name, s);
  });
};
document.body ? Fn() : F(document, "DOMContentLoaded", () => Fn(), {
  once: !0
});
export {
  ee as Alert,
  se as Button,
  ne as Carousel,
  oe as Collapse,
  ie as Dropdown,
  re as Modal,
  ce as Offcanvas,
  Vt as Popover,
  ae as ScrollSpy,
  le as Tab,
  de as Toast,
  At as Tooltip,
  Fn as initCallback,
  mc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
