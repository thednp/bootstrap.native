var jo = Object.defineProperty;
var zo = (t, s, e) => s in t ? jo(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var d = (t, s, e) => zo(t, typeof s != "symbol" ? s + "" : s, e);
const Mn = "aria-describedby", Ie = "aria-expanded", ve = "aria-hidden", Ne = "aria-modal", Ms = "aria-pressed", Je = "aria-selected", Vo = "DOMContentLoaded", $s = "focus", Ts = "focusin", _n = "focusout", Oe = "keydown", Xo = "keyup", N = "click", Bn = "mousedown", Ko = "hover", Me = "mouseenter", ys = "mouseleave", Yo = "pointerdown", Uo = "pointermove", qo = "pointerup", _e = "resize", Be = "scroll", Cs = "touchstart", Zo = "dragstart", Jo = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', rs = "ArrowDown", ls = "ArrowUp", _s = "ArrowLeft", Bs = "ArrowRight", xs = "Escape", Go = "transitionDuration", Qo = "transitionDelay", Ge = "transitionend", Rn = "transitionProperty", ti = navigator.userAgentData, Le = ti, { userAgent: ei } = navigator, ke = ei, Rs = /iPhone|iPad|iPod|Android/i;
// istanbul ignore else @preserve
Le ? Le.brands.some((t) => Rs.test(t.brand)) : Rs.test(ke);
const Fs = /(iPhone|iPod|iPad)/, si = Le ? Le.brands.some((t) => Fs.test(t.brand)) : (
  /* istanbul ignore next @preserve */
  Fs.test(ke)
);
ke && ke.includes("Firefox");
const { head: Re } = document;
["webkitPerspective", "perspective"].some((t) => t in Re.style);
const Fn = (t, s, e, n) => {
  const o = n || !1;
  t.addEventListener(s, e, o);
}, Wn = (t, s, e, n) => {
  const o = n || !1;
  t.removeEventListener(s, e, o);
}, ni = (t, s, e, n) => {
  const o = (i) => {
    /* istanbul ignore else @preserve */
    (i.target === t || i.currentTarget === t) && (e.apply(t, [i]), Wn(t, s, o, n));
  };
  Fn(t, s, o, n);
}, fe = () => {
};
(() => {
  let t = !1;
  try {
    const s = Object.defineProperty({}, "passive", {
      get: () => (t = !0, t)
    });
    // istanbul ignore next @preserve
    ni(document, Vo, fe, s);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in Re.style);
["webkitAnimation", "animation"].some((t) => t in Re.style);
["webkitTransition", "transition"].some((t) => t in Re.style);
const st = (t, s) => t.getAttribute(s), ge = (t, s) => t.hasAttribute(s), O = (t, s, e) => t.setAttribute(s, e), kt = (t, s) => t.removeAttribute(s), f = (t, ...s) => {
  t.classList.add(...s);
}, b = (t, ...s) => {
  t.classList.remove(...s);
}, g = (t, s) => t.classList.contains(s), be = (t) => t != null && typeof t == "object" || !1, D = (t) => be(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((s) => t.nodeType === s) || !1, T = (t) => D(t) && t.nodeType === 1 || !1, Wt = /* @__PURE__ */ new Map(), At = {
  data: Wt,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (t, s, e) => {
    if (!T(t)) return;
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
    if (!T(t) || !s) return null;
    const e = At.getAllFor(s);
    return t && e && e.get(t) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (t, s) => {
    const e = At.getAllFor(s);
    if (!e || !T(t)) return;
    e.delete(t);
    // istanbul ignore else @preserve
    e.size === 0 && Wt.delete(s);
  }
}, W = (t, s) => At.get(t, s), we = (t) => typeof t == "string" || !1, Hs = (t) => be(t) && t.constructor.name === "Window" || !1, jn = (t) => D(t) && t.nodeType === 9 || !1, E = (t) => Hs(t) ? t.document : jn(t) ? t : D(t) ? t.ownerDocument : window.document, dt = (t, ...s) => Object.assign(t, ...s), $t = (t) => {
  if (!t) return;
  if (we(t))
    return E().createElement(t);
  const { tagName: s } = t, e = $t(s);
  if (!e) return;
  const n = { ...t };
  return delete n.tagName, dt(e, n);
}, w = (t, s) => t.dispatchEvent(s), V = (t, s) => {
  const e = getComputedStyle(t), n = s.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return e.getPropertyValue(n);
}, oi = (t) => {
  const s = V(t, Rn), e = V(t, Qo), n = e.includes("ms") ? (
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
}, Ee = (t) => {
  const s = V(t, Rn), e = V(t, Go), n = e.includes("ms") ? (
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
}, A = (t, s) => {
  let e = 0;
  const n = new Event(Ge), o = Ee(t), i = oi(t);
  if (o) {
    const c = (a) => {
      // istanbul ignore else @preserve
      a.target === t && (s.apply(t, [a]), t.removeEventListener(Ge, c), e = 1);
    };
    t.addEventListener(Ge, c), setTimeout(() => {
      // istanbul ignore next @preserve
      e || w(t, n);
    }, o + i + 17);
  } else
    s.apply(t, [n]);
}, ht = (t, s) => t.focus(s), Ws = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, He = (t) => Object.entries(t), Xt = (t) => t.toLowerCase(), ii = (t, s, e, n) => {
  const o = { ...e }, i = { ...t.dataset }, c = { ...s }, a = {}, l = "title";
  return He(i).forEach(([r, h]) => {
    const p = typeof r == "string" && r.includes(n) ? r.replace(n, "").replace(/[A-Z]/g, (v) => Xt(v)) : (
      /* istanbul ignore next @preserve */
      r
    );
    a[p] = Ws(h);
  }), He(o).forEach(([r, h]) => {
    o[r] = Ws(h);
  }), He(s).forEach(([r, h]) => {
    // istanbul ignore else @preserve
    r in o ? c[r] = o[r] : r in a ? c[r] = a[r] : c[r] = r === l ? st(t, l) : h;
  }), c;
}, js = (t) => Object.keys(t), $ = (t, s) => {
  const e = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  // istanbul ignore else @preserve
  return be(s) && dt(e, s), e;
}, nt = { passive: !0 }, Mt = (t) => t.offsetHeight, I = (t, s) => {
  He(s).forEach(([e, n]) => {
    if (n && we(e) && e.includes("--"))
      t.style.setProperty(e, n);
    else {
      const o = {};
      o[e] = n, dt(t.style, o);
    }
  });
}, ds = (t) => be(t) && t.constructor.name === "Map" || !1, ci = (t) => typeof t == "number" || !1, bt = /* @__PURE__ */ new Map(), u = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (t, s, e, n) => {
    if (!T(t)) return;
    // istanbul ignore else @preserve
    if (n && n.length) {
      // istanbul ignore else @preserve
      bt.has(t) || bt.set(t, /* @__PURE__ */ new Map()), bt.get(t).set(n, setTimeout(s, e));
    } else
      bt.set(t, setTimeout(s, e));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (t, s) => {
    if (!T(t)) return null;
    const e = bt.get(t);
    return s && e && ds(e) ? e.get(s) || /* istanbul ignore next */
    null : ci(e) ? e : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (t, s) => {
    if (!T(t)) return;
    const e = bt.get(t);
    if (s && s.length && ds(e)) {
      clearTimeout(e.get(s)), e.delete(s);
      // istanbul ignore else @preserve
      e.size === 0 && bt.delete(t);
    } else
      clearTimeout(e), bt.delete(t);
  }
}, J = (t, s) => (D(s) ? s : E()).querySelectorAll(t), hs = /* @__PURE__ */ new Map();
function ai(t) {
  const { shiftKey: s, code: e } = t, n = E(this), o = [...J(Jo, this)].filter(
    (a) => !ge(a, "disabled") && !st(a, ve)
  );
  if (!o.length) return;
  const i = o[0], c = o[o.length - 1];
  // istanbul ignore else @preserve
  e === "Tab" && (s && n.activeElement === i ? (c.focus(), t.preventDefault()) : !s && n.activeElement === c && (i.focus(), t.preventDefault()));
}
const ri = (t) => hs.has(t) === !0, Fe = (t) => {
  const s = ri(t);
  (s ? Wn : Fn)(t, "keydown", ai), s ? hs.delete(t) : hs.set(t, !0);
}, $e = (t, s) => {
  const { width: e, height: n, top: o, right: i, bottom: c, left: a } = t.getBoundingClientRect();
  let l = 1, r = 1;
  if (s && T(t)) {
    const { offsetWidth: h, offsetHeight: p } = t;
    l = h > 0 ? Math.round(e) / h : (
      /* istanbul ignore next */
      1
    ), r = p > 0 ? Math.round(n) / p : (
      /* istanbul ignore next */
      1
    );
  }
  return {
    width: e / l,
    height: n / r,
    top: o / r,
    right: i / l,
    bottom: c / r,
    left: a / l,
    x: a / l,
    y: o / r
  };
}, xt = (t) => E(t).body, ft = (t) => E(t).documentElement, zn = (t) => D(t) && t.constructor.name === "ShadowRoot" || !1, li = (t) => t.nodeName === "HTML" ? t : T(t) && t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
D(t) && t.parentNode || // DOM Element detected
zn(t) && t.host || // ShadowRoot detected
ft(t);
let zs = 0, Vs = 0;
const jt = /* @__PURE__ */ new Map(), Vn = (t, s) => {
  let e = s ? zs : Vs;
  if (s) {
    const n = Vn(t), o = jt.get(n) || /* @__PURE__ */ new Map();
    jt.has(n) || jt.set(n, o), ds(o) && !o.has(s) ? (o.set(s, e), zs += 1) : e = o.get(s);
  } else {
    const n = t.id || t;
    jt.has(n) ? e = jt.get(n) : (jt.set(n, e), Vs += 1);
  }
  return e;
}, Ut = (t) => {
  var s;
  return t ? jn(t) ? t.defaultView : D(t) ? (s = t == null ? void 0 : t.ownerDocument) == null ? void 0 : s.defaultView : t : window;
}, di = (t) => Array.isArray(t) || !1, Xn = (t) => {
  if (!D(t)) return !1;
  const { top: s, bottom: e } = $e(t), { clientHeight: n } = ft(t);
  return s <= n && e >= 0;
}, hi = (t) => typeof t == "function" || !1, fi = (t) => be(t) && t.constructor.name === "NodeList" || !1, Ct = (t) => ft(t).dir === "rtl", gi = (t) => D(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, M = (t, s) => t ? t.closest(s) || // break out of `ShadowRoot`
M(t.getRootNode().host, s) : null, S = (t, s) => T(t) ? t : (D(s) ? s : E()).querySelector(t), Ss = (t, s) => (D(s) ? s : E()).getElementsByTagName(t), rt = (t, s) => (s && D(s) ? s : E()).getElementsByClassName(t), Kn = (t, s) => t.matches(s), Vt = {}, Yn = (t) => {
  const { type: s, currentTarget: e } = t;
  [...Vt[s]].forEach(([n, o]) => {
    /* istanbul ignore else @preserve */
    e === n && [...o].forEach(([i, c]) => {
      i.apply(n, [t]), typeof c == "object" && c.once && B(n, s, i, c);
    });
  });
}, _ = (t, s, e, n) => {
  /* istanbul ignore else @preserve */
  Vt[s] || (Vt[s] = /* @__PURE__ */ new Map());
  const o = Vt[s];
  /* istanbul ignore else @preserve */
  o.has(t) || o.set(t, /* @__PURE__ */ new Map());
  const i = o.get(t), { size: c } = i;
  i.set(e, n);
  /* istanbul ignore else @preserve */
  c || t.addEventListener(s, Yn, n);
}, B = (t, s, e, n) => {
  const o = Vt[s], i = o && o.get(t), c = i && i.get(e), a = c !== void 0 ? c : n;
  /* istanbul ignore else @preserve */
  i && i.has(e) && i.delete(e);
  /* istanbul ignore else @preserve */
  o && (!i || !i.size) && o.delete(t);
  /* istanbul ignore else @preserve */
  (!o || !o.size) && delete Vt[s];
  /* istanbul ignore else @preserve */
  (!i || !i.size) && t.removeEventListener(
    s,
    Yn,
    a
  );
}, R = "fade", m = "show", We = "data-bs-dismiss", je = "alert", Un = "Alert", pi = "5.0.15", ui = pi;
class ot {
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
      if (T(s))
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
    const o = At.get(n, this.name);
    // istanbul ignore else @preserve
    o && o._toggleEventListeners(), this.element = n, this.options = this.defaults && js(this.defaults).length ? ii(n, this.defaults, e || {}, "bs") : {}, At.set(n, this.name, this);
  }
  // istanbul ignore next @preserve
  get version() {
    return ui;
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
    At.remove(this.element, this.name), js(this).forEach((s) => {
      delete this[s];
    });
  }
}
const mi = `.${je}`, vi = `[${We}="${je}"]`, bi = (t) => W(t, Un), wi = (t) => new se(t), Xs = $(
  `close.bs.${je}`
), Ei = $(
  `closed.bs.${je}`
), Ks = (t) => {
  const { element: s } = t;
  w(s, Ei), t._toggleEventListeners(), t.dispose(), s.remove();
};
class se extends ot {
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
      e && g(e, m) && (w(e, Xs), Xs.defaultPrevented || (b(e, m), g(e, R) ? A(e, () => Ks(this)) : Ks(this)));
    });
    /**
     * Toggle on / off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { dismiss: o, close: i } = this;
      // istanbul ignore else @preserve
      o && n(o, N, i);
    });
    this.dismiss = S(vi, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return Un;
  }
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(se, "selector", mi), d(se, "init", wi), d(se, "getInstance", bi);
const C = "active", ct = "data-bs-toggle", $i = "button", qn = "Button", Ti = `[${ct}="${$i}"]`, yi = (t) => W(t, qn), Ci = (t) => new ne(t);
class ne extends ot {
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
      !g(n, "disabled") && !st(n, "disabled") && ((o ? b : f)(n, C), O(n, Ms, o ? "false" : "true"), this.isActive = g(n, C));
    });
    // BUTTON PRIVATE METHOD
    // =====================
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(this.element, N, this.toggle);
    });
    const { element: n } = this;
    this.isActive = g(n, C), O(n, Ms, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return qn;
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(ne, "selector", Ti), d(ne, "init", Ci), d(ne, "getInstance", yi);
const fs = "data-bs-target", It = "carousel", Zn = "Carousel", Ys = "data-bs-parent", xi = "data-bs-container", K = (t) => {
  const s = [fs, Ys, xi, "href"], e = E(t);
  return s.map((n) => {
    const o = st(t, n);
    return o ? n === Ys ? M(t, o) : S(o, e) : null;
  }).filter((n) => n)[0];
}, Te = `[data-bs-ride="${It}"]`, Z = `${It}-item`, gs = "data-bs-slide-to", Et = "data-bs-slide", Tt = "paused", Us = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, gt = (t) => W(t, Zn), Hi = (t) => new oe(t);
let ee = 0, Se = 0, Qe = 0;
const ts = $(`slide.bs.${It}`), ps = $(`slid.bs.${It}`), qs = (t) => {
  const { index: s, direction: e, element: n, slides: o, options: i } = t;
  // istanbul ignore else @preserve
  if (t.isAnimating) {
    const c = us(t), a = e === "left" ? "next" : "prev", l = e === "left" ? "start" : "end";
    f(o[s], C), b(o[s], `${Z}-${a}`), b(o[s], `${Z}-${l}`), b(o[c], C), b(o[c], `${Z}-${l}`), w(n, ps), u.clear(n, Et), t.cycle && !E(n).hidden && i.interval && !t.isPaused && t.cycle();
  }
};
function Si() {
  const t = gt(this);
  // istanbul ignore else @preserve
  t && !t.isPaused && !u.get(this, Tt) && f(this, Tt);
}
function Pi() {
  const t = gt(this);
  // istanbul ignore else @preserve
  t && t.isPaused && !u.get(this, Tt) && t.cycle();
}
function Di(t) {
  t.preventDefault();
  const s = M(this, Te) || K(this), e = gt(s);
  // istanbul ignore else @preserve
  if (e && !e.isAnimating) {
    const n = +(st(this, gs) || // istanbul ignore next @preserve
    0);
    // istanbul ignore else @preserve
    this && !g(this, C) && // event target is not active
    !Number.isNaN(n) && e.to(n);
  }
}
function Ai(t) {
  t.preventDefault();
  const s = M(this, Te) || K(this), e = gt(s);
  // istanbul ignore else @preserve
  if (e && !e.isAnimating) {
    const n = st(this, Et);
    // istanbul ignore else @preserve
    n === "next" ? e.next() : n === "prev" && e.prev();
  }
}
const Ii = ({ code: t, target: s }) => {
  const e = E(s), [n] = [...J(Te, e)].filter(
    (i) => Xn(i)
  ), o = gt(n);
  // istanbul ignore next @preserve
  if (o && !o.isAnimating && !/textarea|input/i.test(s.nodeName)) {
    const i = Ct(n), c = i ? _s : Bs, a = i ? Bs : _s;
    // istanbul ignore else @preserve
    t === a ? o.prev() : t === c && o.next();
  }
};
function Zs(t) {
  const { target: s } = t, e = gt(this);
  // istanbul ignore next @preserve
  e && e.isTouch && (e.indicator && !e.indicator.contains(s) || !e.controls.includes(s)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function Li(t) {
  const { target: s } = t, e = gt(this);
  // istanbul ignore else @preserve
  if (e && !e.isAnimating && !e.isTouch) {
    const { controls: n, indicators: o } = e;
    // istanbul ignore else @preserve
    if (![...n, ...o].every(
      (i) => i === s || i.contains(s)
    )) {
      ee = t.pageX;
      // istanbul ignore else @preserve
      this.contains(s) && (e.isTouch = !0, Jn(e, !0));
    }
  }
}
const ki = (t) => {
  Se = t.pageX;
}, Ni = (t) => {
  var o;
  const { target: s } = t, e = E(s), n = [...J(Te, e)].map((i) => gt(i)).find((i) => i.isTouch);
  // istanbul ignore else @preserve
  if (n) {
    const { element: i, index: c } = n, a = Ct(i);
    if (Qe = t.pageX, n.isTouch = !1, Jn(n), !((o = e.getSelection()) != null && o.toString().length) && i.contains(s) && Math.abs(ee - Qe) > 120) {
      // istanbul ignore else @preserve
      Se < ee ? n.to(c + (a ? -1 : 1)) : Se > ee && n.to(c + (a ? 1 : -1));
    }
    ee = 0, Se = 0, Qe = 0;
  }
}, es = (t, s) => {
  const { indicators: e } = t;
  [...e].forEach((n) => b(n, C));
  // istanbul ignore else @preserve
  t.indicators[s] && f(e[s], C);
}, Jn = (t, s) => {
  const { element: e } = t, n = s ? _ : B;
  n(
    E(e),
    Uo,
    ki,
    nt
  ), n(
    E(e),
    qo,
    Ni,
    nt
  );
}, us = (t) => {
  const { slides: s, element: e } = t, n = S(`.${Z}.${C}`, e);
  return T(n) ? [...s].indexOf(n) : -1;
};
class oe extends ot {
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
      const { element: n, options: o, slides: i, controls: c, indicators: a } = this, { touch: l, pause: r, interval: h, keyboard: p } = o, v = e ? _ : B;
      r && h && (v(n, Me, Si), v(n, ys, Pi)), l && i.length > 2 && (v(
        n,
        Yo,
        Li,
        nt
      ), v(n, Cs, Zs, { passive: !1 }), v(n, Zo, Zs, { passive: !1 }));
      // istanbul ignore else @preserve
      c.length && c.forEach((P) => {
        // istanbul ignore else @preserve
        P && v(P, N, Ai);
      });
      // istanbul ignore else @preserve
      a.length && a.forEach((P) => {
        v(P, N, Di);
      }), p && v(E(n), Oe, Ii);
    });
    const { element: o } = this;
    this.direction = Ct(o) ? "right" : "left", this.isTouch = !1, this.slides = rt(Z, o);
    const { slides: i } = this;
    if (i.length >= 2) {
      const c = us(this), a = [...i].find(
        (h) => Kn(h, `.${Z}-next,.${Z}-next`)
      );
      this.index = c;
      const l = E(o);
      this.controls = [
        ...J(`[${Et}]`, o),
        ...J(
          `[${Et}][${fs}="#${o.id}"]`,
          l
        )
      ].filter((h, p, v) => p === v.indexOf(h)), this.indicator = S(`.${It}-indicators`, o), this.indicators = [
        ...this.indicator ? J(`[${gs}]`, this.indicator) : [],
        ...J(
          `[${gs}][${fs}="#${o.id}"]`,
          l
        )
      ].filter((h, p, v) => p === v.indexOf(h));
      const { options: r } = this;
      this.options.interval = r.interval === !0 ? Us.interval : r.interval;
      // istanbul ignore next @preserve - impossible to test
      a ? this.index = [...i].indexOf(a) : c < 0 && (this.index = 0, f(i[0], C), this.indicators.length && es(this, 0));
      // istanbul ignore else @preserve
      this.indicators.length && es(this, this.index), this._toggleEventListeners(!0), r.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Zn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Us;
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
    u.clear(e, It), o && (u.clear(e, Tt), b(e, Tt)), u.set(
      e,
      () => {
        // istanbul ignore else @preserve
        this.element && !this.isPaused && !this.isTouch && Xn(e) && this.to(i + 1);
      },
      n.interval,
      It
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: e, options: n } = this;
    // istanbul ignore else @preserve
    !this.isPaused && n.interval && (f(e, Tt), u.set(
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
    const { element: n, slides: o, options: i } = this, c = us(this), a = Ct(n);
    let l = e;
    if (!this.isAnimating && c !== l && !u.get(n, Et)) {
      // istanbul ignore else @preserve
      c < l || c === 0 && l === o.length - 1 ? this.direction = a ? "right" : "left" : (c > l || c === o.length - 1 && l === 0) && (this.direction = a ? "left" : "right");
      const { direction: r } = this;
      l < 0 ? l = o.length - 1 : l >= o.length && (l = 0);
      const h = r === "left" ? "next" : "prev", p = r === "left" ? "start" : "end", v = {
        relatedTarget: o[l],
        from: c,
        to: l,
        direction: r
      };
      dt(ts, v), dt(ps, v), w(n, ts), ts.defaultPrevented || (this.index = l, es(this, l), Ee(o[l]) && g(n, "slide") ? u.set(
        n,
        () => {
          f(o[l], `${Z}-${h}`), Mt(o[l]), f(o[l], `${Z}-${p}`), f(o[c], `${Z}-${p}`), A(
            o[l],
            () => this.slides && this.slides.length && qs(this)
          );
        },
        0,
        Et
      ) : (f(o[l], C), b(o[c], C), u.set(
        n,
        () => {
          u.clear(n, Et);
          // istanbul ignore else @preserve
          n && i.interval && !this.isPaused && this.cycle(), w(n, ps);
        },
        0,
        Et
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
    // istanbul ignore next @preserve - impossible to test
    n.isAnimating && A(n.slides[n.index], () => {
      qs(n);
    });
  }
}
d(oe, "selector", Te), d(oe, "init", Hi), d(oe, "getInstance", gt);
const Nt = "collapsing", X = "collapse", Gn = "Collapse", Oi = `.${X}`, Qn = `[${ct}="${X}"]`, Mi = { parent: null }, Pe = (t) => W(t, Gn), _i = (t) => new ie(t), Js = $(`show.bs.${X}`), Bi = $(`shown.bs.${X}`), Gs = $(`hide.bs.${X}`), Ri = $(`hidden.bs.${X}`), Fi = (t) => {
  const { element: s, parent: e, triggers: n } = t;
  w(s, Js), Js.defaultPrevented || (u.set(s, fe, 17), e && u.set(e, fe, 17), f(s, Nt), b(s, X), I(s, { height: `${s.scrollHeight}px` }), A(s, () => {
    u.clear(s), e && u.clear(e), n.forEach((o) => O(o, Ie, "true")), b(s, Nt), f(s, X), f(s, m), I(s, { height: "" }), w(s, Bi);
  }));
}, Qs = (t) => {
  const { element: s, parent: e, triggers: n } = t;
  w(s, Gs), Gs.defaultPrevented || (u.set(s, fe, 17), e && u.set(e, fe, 17), I(s, { height: `${s.scrollHeight}px` }), b(s, X), b(s, m), f(s, Nt), Mt(s), I(s, { height: "0px" }), A(s, () => {
    u.clear(s);
    // istanbul ignore else @preserve
    e && u.clear(e), n.forEach((o) => O(o, Ie, "false")), b(s, Nt), f(s, X), I(s, { height: "" }), w(s, Ri);
  }));
}, Wi = (t) => {
  const { target: s } = t, e = s && M(s, Qn), n = e && K(e), o = n && Pe(n);
  // istanbul ignore else @preserve
  o && o.toggle(), e && e.tagName === "A" && t.preventDefault();
};
class ie extends ot {
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
      const n = e ? _ : B, { triggers: o } = this;
      // istanbul ignore else @preserve
      o.length && o.forEach(
        (i) => n(i, N, Wi)
      );
    });
    const { element: o, options: i } = this, c = E(o);
    this.triggers = [...J(Qn, c)].filter(
      (a) => K(a) === o
    ), this.parent = T(i.parent) ? i.parent : we(i.parent) ? K(o) || S(i.parent, c) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Gn;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Mi;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers: e, element: n } = this;
    // istanbul ignore else @preserve
    if (!u.get(n)) {
      Qs(this);
      // istanbul ignore else @preserve
      e.length && e.forEach((o) => f(o, `${X}d`));
    }
  }
  /** Shows the collapse. */
  show() {
    const { element: e, parent: n, triggers: o } = this;
    let i, c;
    if (n && (i = [
      ...J(`.${X}.${m}`, n)
    ].find((a) => Pe(a)), c = i && Pe(i)), (!n || !u.get(n)) && !u.get(e)) {
      c && i !== e && (Qs(c), c.triggers.forEach((a) => {
        f(a, `${X}d`);
      })), Fi(this);
      // istanbul ignore else @preserve
      o.length && o.forEach((a) => b(a, `${X}d`));
    }
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    g(this.element, m) ? this.hide() : this.show();
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(ie, "selector", Oi), d(ie, "init", _i), d(ie, "getInstance", Pe);
const Ot = ["dropdown", "dropup", "dropstart", "dropend"], to = "Dropdown", eo = "dropdown-menu", so = (t) => {
  const s = M(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  ge(t, "href") && st(t, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  s && ge(s, "href") && st(s, "href").slice(-1) === "#";
}, [et, ms, vs, bs] = Ot, no = `[${ct}="${et}"]`, Kt = (t) => W(t, to), ji = (t) => new ce(t), zi = `${eo}-end`, tn = [et, ms], en = [vs, bs], sn = ["A", "BUTTON"], Vi = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, ss = $(
  `show.bs.${et}`
), nn = $(
  `shown.bs.${et}`
), ns = $(
  `hide.bs.${et}`
), on = $(`hidden.bs.${et}`), oo = $(`updated.bs.${et}`), io = (t) => {
  const { element: s, menu: e, parentElement: n, options: o } = t, { offset: i } = o;
  // istanbul ignore else @preserve: this test requires a navbar
  if (V(e, "position") !== "static") {
    const c = Ct(s), a = g(e, zi);
    ["margin", "top", "bottom", "left", "right"].forEach((k) => {
      const ut = {};
      ut[k] = "", I(e, ut);
    });
    let r = Ot.find(
      (k) => g(n, k)
    ) || // istanbul ignore next @preserve: fallback position
    et;
    const h = {
      dropdown: [i, 0, 0],
      dropup: [0, 0, i],
      dropstart: c ? [-1, 0, 0, i] : [-1, i, 0],
      dropend: c ? [-1, i, 0] : [-1, 0, 0, i]
    }, p = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: c ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: c ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: c ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: c ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: v, offsetHeight: P } = e, { clientWidth: q, clientHeight: y } = ft(s), {
      left: j,
      top: Y,
      width: Bt,
      height: at
    } = $e(s), x = j - v - i < 0, tt = j + v + Bt + i >= q, it = Y + P + i >= y, F = Y + P + at + i >= y, z = Y - P - i < 0, H = (!c && a || c && !a) && j + Bt - v < 0, Rt = (c && a || !c && !a) && j + v >= q;
    if (en.includes(r) && x && tt && (r = et), r === vs && (c ? tt : x) && (r = bs), r === bs && (c ? x : tt) && (r = vs), r === ms && z && !F && (r = et), r === et && F && !z && (r = ms), en.includes(r) && it && dt(p[r], {
      top: "auto",
      bottom: 0
    }), tn.includes(r) && (H || Rt)) {
      let k = { left: "auto", right: "auto" };
      // istanbul ignore else @preserve
      !H && Rt && !c && (k = { left: "auto", right: 0 });
      // istanbul ignore else @preserve
      H && !Rt && c && (k = { left: 0, right: "auto" });
      // istanbul ignore else @preserve
      k && dt(p[r], k);
    }
    const pt = h[r];
    if (I(e, {
      ...p[r],
      margin: `${pt.map((k) => k && `${k}px`).join(" ")}`
    }), tn.includes(r) && a) {
      // istanbul ignore else @preserve
      a && I(e, p[!c && H || c && Rt ? "menuStart" : "menuEnd"]);
    }
    w(n, oo);
  }
}, Xi = (t) => [...t.children].map((s) => {
  if (s && sn.includes(s.tagName)) return s;
  const { firstElementChild: e } = s;
  return e && sn.includes(e.tagName) ? e : null;
}).filter((s) => s), cn = (t) => {
  const { element: s, options: e } = t, n = t.open ? _ : B, o = E(s);
  n(o, N, an), n(o, $s, an), n(o, Oe, Yi), n(o, Xo, Ui);
  // istanbul ignore else @preserve
  e.display === "dynamic" && [Be, _e].forEach((i) => {
    n(Ut(s), i, qi, nt);
  });
}, ze = (t) => {
  const s = [...Ot, "btn-group", "input-group"].map(
    (e) => rt(`${e} ${m}`, E(t))
  ).find((e) => e.length);
  if (s && s.length)
    return [...s[0].children].find(
      (e) => Ot.some((n) => n === st(e, ct))
    );
}, an = (t) => {
  const { target: s, type: e } = t;
  // istanbul ignore else @preserve
  if (s && T(s)) {
    const n = ze(s), o = n && Kt(n);
    // istanbul ignore else @preserve
    if (o) {
      const { parentElement: i, menu: c } = o, a = i && i.contains(s) && (s.tagName === "form" || M(s, "form") !== null);
      [N, Bn].includes(e) && so(s) && t.preventDefault();
      // istanbul ignore else @preserve
      !a && e !== $s && s !== n && s !== c && o.hide();
    }
  }
}, Ki = (t) => {
  const { target: s } = t, e = s && M(s, no), n = e && Kt(e);
  // istanbul ignore else @preserve
  if (n) {
    t.stopPropagation(), n.toggle();
    // istanbul ignore else @preserve
    e && so(e) && t.preventDefault();
  }
}, Yi = (t) => {
  // istanbul ignore else @preserve
  [rs, ls].includes(t.code) && t.preventDefault();
};
function Ui(t) {
  const { code: s } = t, e = ze(this), n = e && Kt(e), { activeElement: o } = e && E(e);
  // istanbul ignore else @preserve
  if (n && o) {
    const { menu: i, open: c } = n, a = Xi(i);
    if (a && a.length && [rs, ls].includes(s)) {
      let l = a.indexOf(o);
      // istanbul ignore else @preserve
      o === e ? l = 0 : s === ls ? l = l > 1 ? l - 1 : 0 : s === rs && (l = l < a.length - 1 ? l + 1 : l);
      // istanbul ignore else @preserve
      a[l] && ht(a[l]);
    }
    xs === s && c && (n.toggle(), ht(e));
  }
}
function qi() {
  const t = ze(this), s = t && Kt(t);
  // istanbul ignore else @preserve
  s && s.open && io(s);
}
class ce extends ot {
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
      (e ? _ : B)(this.element, N, Ki);
    });
    const { parentElement: o } = this.element, [i] = rt(
      eo,
      o
    );
    i && (this.parentElement = o, this.menu = i, this._toggleEventListeners(!0));
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
    return Vi;
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
      const c = ze(e), a = c && Kt(c);
      a && a.hide(), [ss, nn, oo].forEach(
        (l) => {
          l.relatedTarget = e;
        }
      ), w(i, ss), ss.defaultPrevented || (f(o, m), f(i, m), O(e, Ie, "true"), io(this), this.open = !n, ht(e), cn(this), w(i, nn));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: e, open: n, menu: o, parentElement: i } = this;
    // istanbul ignore else @preserve
    n && ([ns, on].forEach((c) => {
      c.relatedTarget = e;
    }), w(i, ns), ns.defaultPrevented || (b(o, m), b(i, m), O(e, Ie, "false"), this.open = !n, cn(this), w(i, on)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
d(ce, "selector", no), d(ce, "init", ji), d(ce, "getInstance", Kt);
const U = "modal", Ps = "Modal", Ds = "Offcanvas", Zi = "fixed-top", Ji = "fixed-bottom", co = "sticky-top", ao = "position-sticky", ro = (t) => [
  ...rt(Zi, t),
  ...rt(Ji, t),
  ...rt(co, t),
  ...rt(ao, t),
  ...rt("is-fixed", t)
], Gi = (t) => {
  const s = xt(t);
  I(s, {
    paddingRight: "",
    overflow: ""
  });
  const e = ro(s);
  // istanbul ignore else @preserve
  e.length && e.forEach((n) => {
    I(n, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, lo = (t) => {
  const { clientWidth: s } = ft(t), { innerWidth: e } = Ut(t);
  return Math.abs(e - s);
}, ho = (t, s) => {
  const e = xt(t), n = parseInt(V(e, "paddingRight"), 10), i = V(e, "overflow") === "hidden" && n ? 0 : lo(t), c = ro(e);
  // istanbul ignore else @preserve
  if (s) {
    I(e, {
      overflow: "hidden",
      paddingRight: `${n + i}px`
    });
    // istanbul ignore else @preserve
    c.length && c.forEach((a) => {
      const l = V(a, "paddingRight");
      a.style.paddingRight = `${parseInt(l, 10) + i}px`;
      // istanbul ignore else @preserve
      if ([co, ao].some((r) => g(a, r))) {
        const r = V(a, "marginRight");
        a.style.marginRight = `${parseInt(r, 10) - i}px`;
      }
    });
  }
}, G = "offcanvas", yt = $t({
  tagName: "div",
  className: "popup-container"
}), fo = (t, s) => {
  const e = D(s) && s.nodeName === "BODY", n = D(s) && !e ? s : yt, o = e ? s : xt(t);
  // istanbul ignore else @preserve
  D(t) && (n === yt && o.append(yt), n.append(t));
}, go = (t, s) => {
  const e = D(s) && s.nodeName === "BODY", n = D(s) && !e ? s : yt;
  // istanbul ignore else @preserve
  D(t) && (t.remove(), n === yt && !yt.children.length && yt.remove());
}, As = (t, s) => {
  const e = D(s) && s.nodeName !== "BODY" ? s : yt;
  return D(t) && e.contains(t);
}, po = "backdrop", rn = `${U}-${po}`, ln = `${G}-${po}`, uo = `.${U}.${m}`, Is = `.${G}.${m}`, L = $t("div"), _t = (t) => S(
  `${uo},${Is}`,
  E(t)
), Ls = (t) => {
  const s = t ? rn : ln;
  [rn, ln].forEach((e) => {
    b(L, e);
  }), f(L, s);
}, mo = (t, s, e) => {
  Ls(e), fo(L, xt(t)), s && f(L, R);
}, vo = () => {
  g(L, m) || (f(L, m), Mt(L));
}, Ve = () => {
  b(L, m);
}, bo = (t) => {
  _t(t) || (b(L, R), go(L, xt(t)), Gi(t));
}, wo = (t) => T(t) && V(t, "visibility") !== "hidden" && t.offsetParent !== null, Qi = `.${U}`, Eo = `[${ct}="${U}"]`, tc = `[${We}="${U}"]`, $o = `${U}-static`, ec = {
  backdrop: !0,
  keyboard: !0
}, pe = (t) => W(t, Ps), sc = (t) => new ae(t), De = $(
  `show.bs.${U}`
), dn = $(
  `shown.bs.${U}`
), os = $(
  `hide.bs.${U}`
), hn = $(
  `hidden.bs.${U}`
), To = (t) => {
  const { element: s } = t, e = lo(s), { clientHeight: n, scrollHeight: o } = ft(s), { clientHeight: i, scrollHeight: c } = s, a = i !== c;
  // istanbul ignore next @preserve: impossible to test?
  if (!a && e) {
    const r = { [Ct(s) ? "paddingLeft" : "paddingRight"]: `${e}px` };
    I(s, r);
  }
  ho(s, a || n !== o);
}, yo = (t, s) => {
  const e = s ? _ : B, { element: n, update: o } = t;
  e(n, N, ic), e(Ut(n), _e, o, nt), e(E(n), Oe, oc);
}, fn = (t) => {
  const { triggers: s, element: e, relatedTarget: n } = t;
  bo(e), I(e, { paddingRight: "", display: "" }), yo(t);
  const o = De.relatedTarget || s.find(wo);
  // istanbul ignore else @preserve
  o && ht(o), hn.relatedTarget = n, w(e, hn), Fe(e);
}, gn = (t) => {
  const { element: s, relatedTarget: e } = t;
  ht(s), yo(t, !0), dn.relatedTarget = e, w(s, dn), Fe(s);
}, pn = (t) => {
  const { element: s, hasFade: e } = t;
  I(s, { display: "block" }), To(t);
  // istanbul ignore else @preserve
  _t(s) || I(xt(s), { overflow: "hidden" }), f(s, m), kt(s, ve), O(s, Ne, "true"), e ? A(s, () => gn(t)) : gn(t);
}, un = (t) => {
  const { element: s, options: e, hasFade: n } = t;
  e.backdrop && n && g(L, m) && !_t(s) ? (Ve(), A(L, () => fn(t))) : fn(t);
}, nc = (t) => {
  const { target: s } = t, e = s && M(s, Eo), n = e && K(e), o = n && pe(n);
  // istanbul ignore else @preserve
  if (o) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && t.preventDefault(), o.relatedTarget = e, o.toggle();
  }
}, oc = ({ code: t, target: s }) => {
  const e = S(uo, E(s)), n = e && pe(e);
  // istanbul ignore else @preserve
  if (n) {
    const { options: o } = n;
    // istanbul ignore else @preserve
    o.keyboard && t === xs && // the keyboard option is enabled and the key is 27
    g(e, m) && (n.relatedTarget = null, n.hide());
  }
}, ic = (t) => {
  var n, o;
  const { currentTarget: s } = t, e = s && pe(s);
  // istanbul ignore else @preserve
  if (e && s && !u.get(s)) {
    const { options: i, isStatic: c, modalDialog: a } = e, { backdrop: l } = i, { target: r } = t, h = (o = (n = E(s)) == null ? void 0 : n.getSelection()) == null ? void 0 : o.toString().length, p = a.contains(r), v = r && M(r, tc);
    // istanbul ignore else @preserve
    c && !p ? u.set(
      s,
      () => {
        f(s, $o), A(a, () => cc(e));
      },
      17
    ) : (v || !h && !c && !p && l) && (e.relatedTarget = v || null, e.hide(), t.preventDefault());
  }
}, cc = (t) => {
  const { element: s, modalDialog: e } = t, n = (Ee(e) || 0) + 17;
  b(s, $o), u.set(s, () => u.clear(s), n);
};
class ae extends ot {
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
      g(this.element, m) && To(this);
    });
    /**
     * Toggles on/off the `click` event listener of the `Modal` instance.
     *
     * @param add when `true`, event listener(s) is/are added
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { triggers: o } = this;
      // istanbul ignore else @preserve
      o.length && o.forEach(
        (i) => n(i, N, nc)
      );
    });
    const { element: o } = this, i = S(`.${U}-dialog`, o);
    // istanbul ignore else @preserve
    i && (this.modalDialog = i, this.triggers = [
      ...J(Eo, E(o))
    ].filter(
      (c) => K(c) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = g(o, R), this.relatedTarget = null, this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ps;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ec;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    g(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: e, options: n, hasFade: o, relatedTarget: i } = this, { backdrop: c } = n;
    let a = 0;
    // istanbul ignore else @preserve
    if (!g(e, m) && (De.relatedTarget = i || void 0, w(e, De), !De.defaultPrevented)) {
      const l = _t(e);
      // istanbul ignore else @preserve
      if (l && l !== e) {
        const r = pe(l) || // istanbul ignore next @preserve
        W(
          l,
          Ds
        );
        // istanbul ignore else @preserve
        r && r.hide();
      }
      if (c)
        As(L) ? Ls(!0) : mo(e, o, !0), a = Ee(L), vo(), setTimeout(() => pn(this), a);
      else {
        pn(this);
        // istanbul ignore else @preserve
        l && g(L, m) && Ve();
      }
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element: e, hasFade: n, relatedTarget: o } = this;
    // istanbul ignore else @preserve
    if (g(e, m)) {
      os.relatedTarget = o || void 0, w(e, os);
      // istanbul ignore else @preserve
      os.defaultPrevented || (b(e, m), O(e, ve, "true"), kt(e, Ne), n ? A(e, () => un(this)) : un(this));
    }
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    const e = { ...this }, { modalDialog: n, hasFade: o } = e, i = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), o ? A(n, i) : i();
  }
}
d(ae, "selector", Qi), d(ae, "init", sc), d(ae, "getInstance", pe);
const ac = `.${G}`, ks = `[${ct}="${G}"]`, rc = `[${We}="${G}"]`, Xe = `${G}-toggling`, lc = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, ue = (t) => W(t, Ds), dc = (t) => new re(t), Ae = $(`show.bs.${G}`), Co = $(`shown.bs.${G}`), is = $(`hide.bs.${G}`), xo = $(`hidden.bs.${G}`), hc = (t) => {
  const { element: s } = t, { clientHeight: e, scrollHeight: n } = ft(s);
  ho(s, e !== n);
}, Ho = (t, s) => {
  const e = s ? _ : B, n = E(t.element);
  e(n, Oe, uc), e(n, N, pc);
}, mn = (t) => {
  const { element: s, options: e } = t;
  // istanbul ignore else @preserve
  e.scroll || (hc(t), I(xt(s), { overflow: "hidden" })), f(s, Xe), f(s, m), I(s, { visibility: "visible" }), A(s, () => mc(t));
}, fc = (t) => {
  const { element: s, options: e } = t, n = _t(s);
  s.blur(), !n && e.backdrop && g(L, m) && Ve(), A(s, () => vc(t));
}, gc = (t) => {
  const s = M(t.target, ks), e = s && K(s), n = e && ue(e);
  // istanbul ignore else @preserve
  if (n) {
    n.relatedTarget = s, n.toggle();
    // istanbul ignore else @preserve
    s && s.tagName === "A" && t.preventDefault();
  }
}, pc = (t) => {
  const { target: s } = t, e = S(
    Is,
    E(s)
  ), n = S(
    rc,
    e
  ), o = e && ue(e);
  // istanbul ignore else @preserve
  if (o) {
    const { options: i, triggers: c } = o, { backdrop: a } = i, l = M(s, ks), r = E(e).getSelection();
    // istanbul ignore else: a filter is required here @preserve
    if (!L.contains(s) || a !== "static") {
      // istanbul ignore else @preserve
      !(r && r.toString().length) && (!e.contains(s) && a && // istanbul ignore next @preserve
      (!l || c.includes(s)) || n && n.contains(s)) && (o.relatedTarget = n && n.contains(s) ? n : null, o.hide());
      // istanbul ignore next @preserve
      l && l.tagName === "A" && t.preventDefault();
    }
  }
}, uc = ({ code: t, target: s }) => {
  const e = S(
    Is,
    E(s)
  ), n = e && ue(e);
  // istanbul ignore else @preserve
  if (n) {
    // istanbul ignore else @preserve
    n.options.keyboard && t === xs && (n.relatedTarget = null, n.hide());
  }
}, mc = (t) => {
  const { element: s } = t;
  b(s, Xe), kt(s, ve), O(s, Ne, "true"), O(s, "role", "dialog"), w(s, Co), Ho(t, !0), ht(s), Fe(s);
}, vc = (t) => {
  const { element: s, triggers: e } = t;
  O(s, ve, "true"), kt(s, Ne), kt(s, "role"), I(s, { visibility: "" });
  const n = Ae.relatedTarget || e.find(wo);
  // istanbul ignore else @preserve
  n && ht(n), bo(s), w(s, xo), b(s, Xe), Fe(s), _t(s) || Ho(t);
};
class re extends ot {
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
      const n = e ? _ : B;
      this.triggers.forEach(
        (o) => n(o, N, gc)
      );
    });
    const { element: o } = this;
    this.triggers = [
      ...J(ks, E(o))
    ].filter(
      (i) => K(i) === o
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ds;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return lc;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    g(this.element, m) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: e, options: n, relatedTarget: o } = this;
    let i = 0;
    if (!g(e, m) && (Ae.relatedTarget = o || void 0, Co.relatedTarget = o || void 0, w(e, Ae), !Ae.defaultPrevented)) {
      const c = _t(e);
      if (c && c !== e) {
        const a = ue(c) || // istanbul ignore next @preserve
        W(
          c,
          Ps
        );
        // istanbul ignore else @preserve
        a && a.hide();
      }
      if (n.backdrop)
        As(L) ? Ls() : mo(e, !0), i = Ee(L), vo(), setTimeout(() => mn(this), i);
      else {
        mn(this);
        // istanbul ignore next @preserve - this test was done on Modal
        c && g(L, m) && Ve();
      }
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element: e, relatedTarget: n } = this;
    g(e, m) && (is.relatedTarget = n || void 0, xo.relatedTarget = n || void 0, w(e, is), is.defaultPrevented || (f(e, Xe), b(e, m), fc(this)));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element: e } = this, n = g(e, m), o = () => setTimeout(() => super.dispose(), 1);
    if (this.hide(), this._toggleEventListeners(), n) {
      A(e, o);
      // istanbul ignore next @preserve
    } else
      o();
  }
}
d(re, "selector", ac), d(re, "init", dc), d(re, "getInstance", ue);
const Lt = "popover", Ke = "Popover", lt = "tooltip", So = (t) => {
  const s = t === lt, e = s ? `${t}-inner` : `${t}-body`, n = s ? "" : `<h3 class="${t}-header"></h3>`, o = `<div class="${t}-arrow"></div>`, i = `<div class="${e}"></div>`;
  return `<div class="${t}" role="${lt}">${n + o + i}</div>`;
}, Po = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, ws = (t) => {
  const s = /\b(top|bottom|start|end)+/, { element: e, tooltip: n, container: o, options: i, arrow: c } = t;
  // istanbul ignore else @preserve
  if (n) {
    const a = { ...Po }, l = Ct(e);
    I(n, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const r = t.name === Ke, { offsetWidth: h, offsetHeight: p } = n, { clientWidth: v, clientHeight: P, offsetWidth: q } = ft(e);
    let { placement: y } = i;
    const { clientWidth: j, offsetWidth: Y } = o, at = V(
      o,
      "position"
    ) === "fixed", x = Math.abs(at ? j - Y : v - q), tt = l && at ? x : 0, it = v - (l ? 0 : x) - 1, {
      width: F,
      height: z,
      left: H,
      right: Rt,
      top: pt
    } = $e(e, !0), { x: k, y: ut } = {
      x: H,
      y: pt
    };
    I(c, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let Ht = 0, qt = "", mt = 0, Ye = "", Ft = "", Ce = "", Ue = "";
    const St = c.offsetWidth || 0, vt = c.offsetHeight || 0, qe = St / 2;
    let Zt = pt - p - vt < 0, Jt = pt + p + z + vt >= P, Gt = H - h - St < tt, Qt = H + h + F + St >= it;
    const xe = ["left", "right"], Ze = ["top", "bottom"];
    Zt = xe.includes(y) ? pt + z / 2 - p / 2 - vt < 0 : Zt, Jt = xe.includes(y) ? pt + p / 2 + z / 2 + vt >= P : Jt, Gt = Ze.includes(y) ? H + F / 2 - h / 2 < tt : Gt, Qt = Ze.includes(y) ? H + h / 2 + F / 2 >= it : Qt, y = xe.includes(y) && Gt && Qt ? "top" : y, y = y === "top" && Zt ? "bottom" : y, y = y === "bottom" && Jt ? "top" : y, y = y === "left" && Gt ? "right" : y, y = y === "right" && Qt ? "left" : y, n.className.includes(y) || (n.className = n.className.replace(
      s,
      a[y]
    ));
    // istanbul ignore else @preserve
    xe.includes(y) ? (y === "left" ? mt = k - h - (r ? St : 0) : mt = k + F + (r ? St : 0), Zt && Jt ? (Ht = 0, qt = 0, Ft = pt + z / 2 - vt / 2) : Zt ? (Ht = ut, qt = "", Ft = z / 2 - St) : Jt ? (Ht = ut - p + z, qt = "", Ft = p - z / 2 - St) : (Ht = ut - p / 2 + z / 2, Ft = p / 2 - vt / 2)) : Ze.includes(y) && (y === "top" ? Ht = ut - p - (r ? vt : 0) : Ht = ut + z + (r ? vt : 0), Gt ? (mt = 0, Ce = k + F / 2 - qe) : Qt ? (mt = "auto", Ye = 0, Ue = F / 2 + it - Rt - qe) : (mt = k - h / 2 + F / 2, Ce = h / 2 - qe)), I(n, {
      top: `${Ht}px`,
      bottom: qt === "" ? "" : `${qt}px`,
      left: mt === "auto" ? mt : `${mt}px`,
      right: Ye !== "" ? `${Ye}px` : ""
    });
    // istanbul ignore else @preserve
    T(c) && (Ft !== "" && (c.style.top = `${Ft}px`), Ce !== "" ? c.style.left = `${Ce}px` : Ue !== "" && (c.style.right = `${Ue}px`));
    const Wo = $(
      `updated.bs.${Xt(t.name)}`
    );
    w(e, Wo);
  }
}, Es = {
  template: So(lt),
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
}, Do = "data-original-title", Pt = "Tooltip", wt = (t, s, e) => {
  // istanbul ignore else @preserve
  if (we(s) && s.length) {
    let n = s.trim();
    hi(e) && (n = e(n));
    const i = new DOMParser().parseFromString(n, "text/html");
    t.append(...i.body.childNodes);
  } else T(s) ? t.append(s) : (fi(s) || di(s) && s.every(D)) && t.append(...s);
}, bc = (t) => {
  const s = t.name === Pt, { id: e, element: n, options: o } = t, {
    title: i,
    placement: c,
    template: a,
    animation: l,
    customClass: r,
    sanitizeFn: h,
    dismissible: p,
    content: v,
    btnClose: P
  } = o, q = s ? lt : Lt, y = { ...Po };
  let j = [], Y = [];
  Ct(n) && (y.left = "end", y.right = "start");
  const Bt = `bs-${q}-${y[c]}`;
  let at;
  if (T(a))
    at = a;
  else {
    const tt = $t("div");
    wt(tt, a, h), at = tt.firstChild;
  }
  t.tooltip = T(at) ? at.cloneNode(!0) : void 0;
  const { tooltip: x } = t;
  // istanbul ignore else @preserve
  if (x) {
    O(x, "id", e), O(x, "role", lt);
    const tt = s ? `${lt}-inner` : `${Lt}-body`, it = s ? null : S(`.${Lt}-header`, x), F = S(`.${tt}`, x);
    t.arrow = S(`.${q}-arrow`, x);
    const { arrow: z } = t;
    if (T(i)) j = [i.cloneNode(!0)];
    else {
      const H = $t("div");
      wt(H, i, h), j = [...H.childNodes];
    }
    if (T(v)) Y = [v.cloneNode(!0)];
    else {
      const H = $t("div");
      wt(H, v, h), Y = [...H.childNodes];
    }
    if (p)
      if (i)
        if (T(P))
          j = [...j, P.cloneNode(!0)];
        else {
          const H = $t("div");
          wt(H, P, h), j = [...j, H.firstChild];
        }
      else {
        // istanbul ignore else @preserve
        if (it && it.remove(), T(P))
          Y = [...Y, P.cloneNode(!0)];
        else {
          const H = $t("div");
          wt(H, P, h), Y = [...Y, H.firstChild];
        }
      }
    // istanbul ignore else @preserve
    if (s)
      i && F && wt(F, i, h);
    else {
      // istanbul ignore else @preserve
      i && it && wt(it, j, h);
      // istanbul ignore else @preserve
      v && F && wt(F, Y, h), t.btn = S(".btn-close", x) || void 0;
    }
    f(x, "position-fixed"), f(z, "position-absolute");
    // istanbul ignore else @preserve
    g(x, q) || f(x, q);
    // istanbul ignore else @preserve
    l && !g(x, R) && f(x, R);
    // istanbul ignore else @preserve
    r && !g(x, r) && f(x, r);
    // istanbul ignore else @preserve
    g(x, Bt) || f(x, Bt);
  }
}, wc = (t) => {
  const s = ["HTML", "BODY"], e = [];
  let { parentNode: n } = t;
  for (; n && !s.includes(n.nodeName); ) {
    n = li(n);
    // istanbul ignore else @preserve
    zn(n) || gi(n) || e.push(n);
  }
  return e.find((o, i) => V(o, "position") !== "relative" && e.slice(i + 1).every(
    (c) => V(c, "position") === "static"
  ) ? o : null) || // istanbul ignore next: optional guard
  E(t).body;
}, Ec = `[${ct}="${lt}"],[data-tip="${lt}"]`, Ao = "title";
let vn = (t) => W(t, Pt);
const $c = (t) => new Dt(t), Tc = (t) => {
  const { element: s, tooltip: e, container: n, offsetParent: o } = t;
  kt(s, Mn), go(
    e,
    n === o ? n : o
  );
}, te = (t) => {
  const { tooltip: s, container: e, offsetParent: n } = t;
  return s && As(s, e === n ? e : n);
}, yc = (t, s) => {
  const { element: e } = t;
  t._toggleEventListeners();
  // istanbul ignore else @preserve
  ge(e, Do) && t.name === Pt && Lo(t);
  // istanbul ignore else @preserve
  s && s();
}, Io = (t, s) => {
  const e = s ? _ : B, { element: n } = t;
  e(
    E(n),
    Cs,
    t.handleTouch,
    nt
  ), [Be, _e].forEach((o) => {
    e(Ut(n), o, t.update, nt);
  });
}, bn = (t) => {
  const { element: s } = t, e = $(
    `shown.bs.${Xt(t.name)}`
  );
  Io(t, !0), w(s, e), u.clear(s, "in");
}, wn = (t) => {
  const { element: s } = t, e = $(
    `hidden.bs.${Xt(t.name)}`
  );
  Io(t), Tc(t), w(s, e), u.clear(s, "out");
}, En = (t, s) => {
  const e = s ? _ : B, { element: n, container: o, offsetParent: i } = t, { offsetHeight: c, scrollHeight: a } = o, l = M(n, `.${U}`), r = M(n, `.${G}`);
  // istanbul ignore else @preserve
  const h = Ut(n), v = o === i && c !== a ? o : h;
  e(v, _e, t.update, nt), e(v, Be, t.update, nt), l && e(l, `hide.bs.${U}`, t.handleHide), r && e(r, `hide.bs.${G}`, t.handleHide);
}, Lo = (t, s) => {
  const e = [Do, Ao], { element: n } = t;
  O(
    n,
    e[s ? 0 : 1],
    s || st(n, e[0]) || // istanbul ignore next @preserve
    ""
  ), kt(n, e[s ? 1 : 0]);
};
class Dt extends ot {
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
      ws(this);
    });
    /** Toggles the tooltip visibility. */
    d(this, "toggle", () => {
      const { tooltip: e } = this;
      e && !te(this) ? this.show() : this.hide();
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
      const n = e ? _ : B, { element: o, options: i, btn: c } = this, { trigger: a } = i, r = !!(this.name !== Pt && i.dismissible);
      // istanbul ignore else @preserve
      a.includes("manual") || (this.enabled = !!e, a.split(" ").forEach((p) => {
        // istanbul ignore else @preserve
        if (p === Ko) {
          n(o, Bn, this.handleShow), n(o, Me, this.handleShow);
          // istanbul ignore else @preserve
          r || (n(o, ys, this.handleHide), n(
            E(o),
            Cs,
            this.handleTouch,
            nt
          ));
        } else if (p === N)
          n(o, p, r ? this.handleShow : this.toggle);
        else if (p === $s) {
          n(o, Ts, this.handleShow);
          // istanbul ignore else @preserve
          r || n(o, _n, this.handleHide);
          // istanbul ignore else @preserve
          si && n(o, N, this.handleFocus);
        }
        // istanbul ignore else @preserve
        r && c && n(c, N, this.handleHide);
      }));
    });
    const { element: o } = this, i = this.name === Pt, c = i ? lt : Lt, a = i ? Pt : Ke;
    // istanbul ignore next @preserve: this is to set Popover too
    vn = (r) => W(r, a), this.enabled = !0, this.id = `${c}-${Vn(o, c)}`;
    const { options: l } = this;
    if (!(!l.title && i || !i && !l.content)) {
      dt(Es, { titleAttr: "" });
      // istanbul ignore else @preserve
      ge(o, Ao) && i && typeof l.title == "string" && Lo(this, l.title), this.container = wc(o), this.offsetParent = ["sticky", "fixed"].some(
        (r) => V(this.container, "position") === r
      ) ? this.container : E(this.element).body, bc(this), this._toggleEventListeners(!0);
    }
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
    return Es;
  }
  show() {
    const { options: e, tooltip: n, element: o, container: i, offsetParent: c, id: a } = this, { animation: l } = e, r = u.get(o, "out"), h = i === c ? i : c;
    u.clear(o, "out"), n && !r && !te(this) && u.set(
      o,
      () => {
        const p = $(
          `show.bs.${Xt(this.name)}`
        );
        w(o, p);
        // istanbul ignore else @preserve
        if (!p.defaultPrevented) {
          fo(n, h), O(o, Mn, `#${a}`), this.update(), En(this, !0);
          // istanbul ignore else @preserve
          g(n, m) || f(n, m);
          // istanbul ignore else @preserve
          l ? A(n, () => bn(this)) : bn(this);
        }
      },
      17,
      "in"
    );
  }
  hide() {
    const { options: e, tooltip: n, element: o } = this, { animation: i, delay: c } = e;
    u.clear(o, "in");
    // istanbul ignore else @preserve
    n && te(this) && u.set(
      o,
      () => {
        const a = $(
          `hide.bs.${Xt(this.name)}`
        );
        w(o, a);
        // istanbul ignore else @preserve
        if (!a.defaultPrevented) {
          this.update(), b(n, m), En(this);
          // istanbul ignore else @preserve
          i ? A(n, () => wn(this)) : wn(this);
        }
      },
      c + 17,
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
    n && (e && te(this) && this.hide(), this._toggleEventListeners(), this.enabled = !n);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: e, options: n } = this, o = { ...this, name: this.name }, i = () => setTimeout(
      () => yc(o, () => super.dispose()),
      17
    );
    n.animation && te(o) ? (this.options.delay = 0, this.hide(), A(e, i)) : i();
  }
}
d(Dt, "selector", Ec), d(Dt, "init", $c), d(Dt, "getInstance", vn), d(Dt, "styleTip", ws);
const Cc = `[${ct}="${Lt}"],[data-tip="${Lt}"]`, xc = dt({}, Es, {
  template: So(Lt),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), Hc = (t) => W(t, Ke), Sc = (t) => new zt(t);
class zt extends Dt {
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
    return xc;
  }
}
d(zt, "selector", Cc), d(zt, "init", Sc), d(zt, "getInstance", Hc), d(zt, "styleTip", ws);
const Pc = "scrollspy", ko = "ScrollSpy", Dc = '[data-bs-spy="scroll"]', Ac = {
  offset: 10,
  target: null
}, Ic = (t) => W(t, ko), Lc = (t) => new le(t), $n = $(`activate.bs.${Pc}`), kc = (t) => {
  const { target: s, scrollTarget: e, options: n, itemsLength: o, scrollHeight: i, element: c } = t, { offset: a } = n, l = Hs(e), r = s && Ss("A", s), h = e ? No(e) : i;
  t.scrollTop = l ? e.scrollY : e.scrollTop;
  // istanbul ignore else @preserve
  if (r && (h !== i || o !== r.length)) {
    let p, v, P;
    t.items = [], t.offsets = [], t.scrollHeight = h, t.maxScroll = t.scrollHeight - Nc(t), [...r].forEach((q) => {
      p = st(q, "href"), v = p && p.charAt(0) === "#" && p.slice(-1) !== "#" && S(p, E(c)), v && (t.items.push(q), P = $e(v), t.offsets.push(
        (l ? P.top + t.scrollTop : v.offsetTop) - a
      ));
    }), t.itemsLength = t.items.length;
  }
}, No = (t) => T(t) ? t.scrollHeight : ft(t).scrollHeight, Nc = ({ element: t, scrollTarget: s }) => Hs(s) ? s.innerHeight : $e(t).height, Oo = (t) => {
  [...Ss("A", t)].forEach((s) => {
    g(s, C) && b(s, C);
  });
}, Tn = (t, s) => {
  const { target: e, element: n } = t;
  // istanbul ignore else @preserve
  T(e) && Oo(e), t.activeItem = s, f(s, C);
  const o = [];
  let i = s;
  for (; i !== xt(n); )
    i = i.parentElement, (g(i, "nav") || g(i, "dropdown-menu")) && o.push(i);
  o.forEach((c) => {
    const a = c.previousElementSibling;
    // istanbul ignore else @preserve
    a && !g(a, C) && f(a, C);
  }), $n.relatedTarget = s, w(n, $n);
};
class le extends ot {
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
      if (T(e) && e.offsetHeight > 0) {
        kc(this);
        const { scrollTop: n, maxScroll: o, itemsLength: i, items: c, activeItem: a } = this;
        if (n >= o) {
          const r = c[i - 1];
          // istanbul ignore else @preserve
          a !== r && Tn(this, r);
          return;
        }
        const { offsets: l } = this;
        // istanbul ignore else @preserve
        if (a && n < l[0] && l[0] > 0) {
          this.activeItem = null;
          // istanbul ignore else @preserve
          e && Oo(e);
          return;
        }
        c.forEach((r, h) => {
          a !== r && n >= l[h] && (typeof l[h + 1] > "u" || n < l[h + 1]) && Tn(this, r);
        });
      }
    });
    /**
     * Toggles on/off the component event listener.
     *
     * @param add when `true`, listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(
        this.scrollTarget,
        Be,
        this.refresh,
        nt
      );
    });
    const { element: o, options: i } = this;
    this.target = S(
      i.target,
      E(o)
    ), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : Ut(o), this.scrollHeight = No(this.scrollTarget), this._toggleEventListeners(!0), this.refresh());
  }
  /* eslint-disable */
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
    return Ac;
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(le, "selector", Dc), d(le, "init", Lc), d(le, "getInstance", Ic);
const ye = "tab", Mo = "Tab", yn = `[${ct}="${ye}"]`, _o = (t) => W(t, Mo), Oc = (t) => new de(t), cs = $(
  `show.bs.${ye}`
), Cn = $(
  `shown.bs.${ye}`
), as = $(
  `hide.bs.${ye}`
), xn = $(
  `hidden.bs.${ye}`
), me = /* @__PURE__ */ new Map(), Hn = (t) => {
  const { tabContent: s, nav: e } = t;
  // istanbul ignore else @preserve
  s && g(s, Nt) && (s.style.height = "", b(s, Nt));
  // istanbul ignore else @preserve
  e && u.clear(e);
}, Sn = (t) => {
  const { element: s, tabContent: e, content: n, nav: o } = t, { tab: i } = T(o) && me.get(o) || // istanbul ignore next @preserve
  { tab: null };
  // istanbul ignore else @preserve
  if (e && n && g(n, R)) {
    const { currentHeight: c, nextHeight: a } = me.get(s) || // istanbul ignore next @preserve
    { currentHeight: 0, nextHeight: 0 };
    // istanbul ignore else @preserve: vitest won't validate this branch
    c !== a ? setTimeout(() => {
      e.style.height = `${a}px`, Mt(e), A(e, () => Hn(t));
    }, 50) : Hn(t);
  } else o && u.clear(o);
  Cn.relatedTarget = i, w(s, Cn);
}, Pn = (t) => {
  const { element: s, content: e, tabContent: n, nav: o } = t, { tab: i, content: c } = o && me.get(o) || // istanbul ignore next @preserve
  { tab: null, content: null };
  let a = 0;
  // istanbul ignore else @preserve
  n && e && g(e, R) && ([c, e].forEach((l) => {
    // istanbul ignore else @preserve
    T(l) && f(l, "overflow-hidden");
  }), a = T(c) ? c.scrollHeight : 0), cs.relatedTarget = i, xn.relatedTarget = s, w(s, cs);
  // istanbul ignore else @preserve
  if (!cs.defaultPrevented) {
    // istanbul ignore else @preserve
    e && f(e, C);
    // istanbul ignore else @preserve
    c && b(c, C);
    // istanbul ignore else @preserve
    if (n && e && g(e, R)) {
      const l = e.scrollHeight;
      me.set(s, {
        currentHeight: a,
        nextHeight: l,
        tab: null,
        content: null
      }), f(n, Nt), n.style.height = `${a}px`, Mt(n), [c, e].forEach((r) => {
        // istanbul ignore else @preserve
        r && b(r, "overflow-hidden");
      });
    }
    if (e && e && g(e, R))
      setTimeout(() => {
        f(e, m), A(e, () => {
          Sn(t);
        });
      }, 1);
    else {
      // istanbul ignore else @preserve
      e && f(e, m), Sn(t);
    }
    // istanbul ignore else @preserve
    i && w(i, xn);
  }
}, Dn = (t) => {
  const { nav: s } = t;
  // istanbul ignore next @preserve
  if (!T(s))
    return { tab: null, content: null };
  const e = rt(C, s);
  let n = null;
  // istanbul ignore else @preserve
  e.length === 1 && !Ot.some(
    (i) => g(e[0].parentElement, i)
  ) ? [n] = e : e.length > 1 && (n = e[e.length - 1]);
  const o = T(n) ? K(n) : null;
  return { tab: n, content: o };
}, An = (t) => {
  // istanbul ignore next @preserve
  if (!T(t)) return null;
  const s = M(t, `.${Ot.join(",.")}`);
  return s ? S(`.${Ot[0]}-toggle`, s) : null;
}, Mc = (t) => {
  const s = _o(t.target);
  // istanbul ignore else @preserve
  s && (t.preventDefault(), s.show());
};
class de extends ot {
  /** @param target the target element */
  constructor(e) {
    super(e);
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, event listener is added
     */
    d(this, "_toggleEventListeners", (e) => {
      (e ? _ : B)(this.element, N, Mc);
    });
    const { element: n } = this, o = K(n);
    // istanbul ignore else @preserve
    if (o) {
      const i = M(n, ".nav"), c = M(o, ".tab-content");
      this.nav = i, this.content = o, this.tabContent = c, this.dropdown = An(n);
      const { tab: a } = Dn(this);
      if (i && !a) {
        const l = S(yn, i), r = l && K(l);
        // istanbul ignore else @preserve
        r && (f(l, C), f(r, m), f(r, C), O(n, Je, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Mo;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: e, content: n, nav: o, dropdown: i } = this;
    // istanbul ignore else @preserve
    if (!(o && u.get(o)) && !g(e, C)) {
      const { tab: c, content: a } = Dn(this);
      // istanbul ignore else @preserve
      o && me.set(o, { tab: c, content: a, currentHeight: 0, nextHeight: 0 }), as.relatedTarget = e;
      // istanbul ignore else @preserve
      if (T(c)) {
        w(c, as);
        // istanbul ignore else @preserve
        if (!as.defaultPrevented) {
          f(e, C), O(e, Je, "true");
          const l = T(c) && An(c);
          l && g(l, C) && b(l, C);
          // istanbul ignore else @preserve
          if (o) {
            const r = () => {
              // istanbul ignore else @preserve
              c && (b(c, C), O(c, Je, "false")), i && !g(i, C) && f(i, C);
            };
            a && (g(a, R) || n && g(n, R)) ? u.set(o, r, 1) : r();
          }
          // istanbul ignore else @preserve
          a && (b(a, m), g(a, R) ? A(a, () => Pn(this)) : Pn(this));
        }
      }
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
d(de, "selector", yn), d(de, "init", Oc), d(de, "getInstance", _o);
const Q = "toast", Bo = "Toast", _c = `.${Q}`, Bc = `[${We}="${Q}"]`, Ro = `[${ct}="${Q}"]`, Yt = "showing", Fo = "hide", Rc = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Ns = (t) => W(t, Bo), Fc = (t) => new he(t), In = $(
  `show.bs.${Q}`
), Wc = $(
  `shown.bs.${Q}`
), Ln = $(
  `hide.bs.${Q}`
), jc = $(
  `hidden.bs.${Q}`
), kn = (t) => {
  const { element: s, options: e } = t;
  b(s, Yt), u.clear(s, Yt), w(s, Wc);
  // istanbul ignore else @preserve
  e.autohide && u.set(s, () => t.hide(), e.delay, Q);
}, Nn = (t) => {
  const { element: s } = t;
  b(s, Yt), b(s, m), f(s, Fo), u.clear(s, Q), w(s, jc);
}, zc = (t) => {
  const { element: s, options: e } = t;
  f(s, Yt), e.animation ? (Mt(s), A(s, () => Nn(t))) : Nn(t);
}, Vc = (t) => {
  const { element: s, options: e } = t;
  u.set(
    s,
    () => {
      b(s, Fo), Mt(s), f(s, m), f(s, Yt), e.animation ? A(s, () => kn(t)) : kn(t);
    },
    17,
    Yt
  );
}, Xc = (t) => {
  const { target: s } = t, e = s && M(s, Ro), n = e && K(e), o = n && Ns(n);
  // istanbul ignore else @preserve
  if (o) {
    // istanbul ignore else @preserve
    e && e.tagName === "A" && t.preventDefault(), o.relatedTarget = e, o.show();
  }
}, Kc = (t) => {
  const s = t.target, e = Ns(s), { type: n, relatedTarget: o } = t;
  // istanbul ignore else @preserve: a solid filter is required
  e && s !== o && !s.contains(o) && ([Me, Ts].includes(n) ? u.clear(s, Q) : u.set(s, () => e.hide(), e.options.delay, Q));
};
class he extends ot {
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
      e && !n && (w(e, In), In.defaultPrevented || Vc(this));
    });
    /** Hides the toast. */
    d(this, "hide", () => {
      const { element: e, isShown: n } = this;
      // istanbul ignore else @preserve
      e && n && (w(e, Ln), Ln.defaultPrevented || zc(this));
    });
    /**
     * Toggles on/off the `click` event listener.
     *
     * @param add when `true`, it will add the listener
     */
    d(this, "_toggleEventListeners", (e) => {
      const n = e ? _ : B, { element: o, triggers: i, dismiss: c, options: a, hide: l } = this;
      // istanbul ignore else @preserve
      c && n(c, N, l);
      // istanbul ignore else @preserve
      a.autohide && [Ts, _n, Me, ys].forEach(
        (r) => n(o, r, Kc)
      );
      // istanbul ignore else @preserve
      i.length && i.forEach(
        (r) => n(r, N, Xc)
      );
    });
    const { element: o, options: i } = this;
    i.animation && !g(o, R) ? f(o, R) : !i.animation && g(o, R) && b(o, R), this.dismiss = S(Bc, o), this.triggers = [
      ...J(Ro, E(o))
    ].filter(
      (c) => K(c) === o
    ), this._toggleEventListeners(!0);
  }
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
    return Rc;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return g(this.element, m);
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: e, isShown: n } = this;
    this._toggleEventListeners(), u.clear(e, Q), n && b(e, m), super.dispose();
  }
}
d(he, "selector", _c), d(he, "init", Fc), d(he, "getInstance", Ns);
const Os = /* @__PURE__ */ new Map();
[
  se,
  ne,
  oe,
  ie,
  ce,
  ae,
  re,
  zt,
  le,
  de,
  he,
  Dt
].forEach((t) => Os.set(t.prototype.name, t));
const Yc = (t, s) => {
  [...s].forEach((e) => t(e));
}, Uc = (t, s) => {
  const e = At.getAllFor(t);
  e && [...e].forEach(([n, o]) => {
    s.contains(n) && o.dispose();
  });
}, On = (t) => {
  const s = t && t.nodeName ? t : document, e = [...Ss("*", s)];
  Os.forEach((n) => {
    const { init: o, selector: i } = n;
    Yc(
      o,
      e.filter((c) => Kn(c, i))
    );
  });
}, Zc = (t) => {
  const s = t && t.nodeName ? t : document;
  Os.forEach((e) => {
    Uc(e.prototype.name, s);
  });
};
document.body ? On() : _(document, "DOMContentLoaded", () => On(), {
  once: !0
});
export {
  se as Alert,
  ne as Button,
  oe as Carousel,
  ie as Collapse,
  ce as Dropdown,
  ae as Modal,
  re as Offcanvas,
  zt as Popover,
  le as ScrollSpy,
  de as Tab,
  he as Toast,
  Dt as Tooltip,
  On as initCallback,
  Zc as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
