const it = "aria-describedby", lt = "aria-expanded", R = "aria-hidden", ct = "aria-modal", ut = "aria-pressed", dt = "aria-selected", pt = "focus", gt = "focusin", ht = "focusout", ft = "keydown", mt = "keyup", Et = "click", yt = "mousedown", wt = "hover", vt = "mouseenter", bt = "mouseleave", Tt = "pointerdown", At = "pointermove", Dt = "pointerup", Nt = "touchstart", Lt = "dragstart", V = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', Mt = "ArrowDown", Ct = "ArrowUp", St = "ArrowLeft", Bt = "ArrowRight", Ot = "Escape", x = "transitionDuration", W = "transitionDelay", T = "transitionend", F = "transitionProperty", Ft = () => {
  const t = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (e) => t.test(e.brand)
  ) || /* istanbul ignore next @preserve */
  t.test(
    navigator?.userAgent
  ) || !1;
}, Ht = () => {
}, U = (t, e, s, a) => {
  const n = a || !1;
  t.addEventListener(
    e,
    s,
    n
  );
}, j = (t, e, s, a) => {
  const n = a || !1;
  t.removeEventListener(
    e,
    s,
    n
  );
}, H = (t, e) => t.getAttribute(e), q = (t, e) => t.hasAttribute(e), Pt = (t, e, s) => t.setAttribute(e, s), It = (t, e) => t.removeAttribute(e), Rt = (t, ...e) => {
  t.classList.add(...e);
}, Vt = (t, ...e) => {
  t.classList.remove(...e);
}, xt = (t, e) => t.classList.contains(e), y = (t) => t != null && typeof t == "object" || !1, l = (t) => y(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (e) => t.nodeType === e
) || !1, u = (t) => l(t) && t.nodeType === 1 || !1, f = /* @__PURE__ */ new Map(), E = {
  data: f,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (t, e, s) => {
    u(t) && (f.has(e) || f.set(e, /* @__PURE__ */ new Map()), f.get(e).set(t, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (t) => f.get(t) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (t, e) => {
    if (!u(t) || !e) return null;
    const s = E.getAllFor(e);
    return t && s && s.get(t) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (t, e) => {
    const s = E.getAllFor(e);
    !s || !u(t) || (s.delete(t), s.size === 0 && f.delete(e));
  }
}, Wt = (t, e) => E.get(t, e), N = (t) => typeof t == "string" || !1, z = (t) => y(t) && t.constructor.name === "Window" || !1, P = (t) => l(t) && t.nodeType === 9 || !1, h = (t) => z(t) ? t.document : P(t) ? t : l(t) ? t.ownerDocument : globalThis.document, L = (t, ...e) => Object.assign(t, ...e), $ = (t) => {
  if (!t) return;
  if (N(t))
    return h().createElement(t);
  const { tagName: e } = t, s = $(e);
  if (!s) return;
  const a = { ...t };
  return delete a.tagName, L(s, a);
}, K = (t, e) => t.dispatchEvent(e), b = (t, e) => {
  const s = getComputedStyle(t), a = e.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(a);
}, Z = (t) => {
  const e = b(t, F), s = b(t, W), a = s.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, n = e && e !== "none" ? parseFloat(s) * a : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(n) ? (
    /* istanbul ignore next */
    0
  ) : n;
}, _ = (t) => {
  const e = b(t, F), s = b(t, x), a = s.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, n = e && e !== "none" ? parseFloat(s) * a : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(n) ? (
    /* istanbul ignore next */
    0
  ) : n;
}, Ut = (t, e) => {
  let s = 0;
  const a = new Event(T), n = _(t), c = Z(t);
  if (n) {
    const o = (i) => {
      i.target === t && (e.apply(t, [i]), t.removeEventListener(T, o), s = 1);
    };
    t.addEventListener(T, o), setTimeout(() => {
      s || K(t, a);
    }, n + c + 17);
  } else
    e.apply(t, [a]);
}, jt = (t, e) => t.focus(e), C = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, v = (t) => Object.entries(t), X = (t) => t.toLowerCase(), Y = (t, e, s, a) => {
  const n = { ...s }, c = { ...t.dataset }, o = { ...e }, i = {}, d = "title";
  return v(c).forEach(([r, p]) => {
    const w = typeof r == "string" && r.includes(a) ? r.replace(a, "").replace(
      /[A-Z]/g,
      (I) => X(I)
    ) : (
      /* istanbul ignore next @preserve */
      r
    );
    i[w] = C(p);
  }), v(n).forEach(([r, p]) => {
    n[r] = C(p);
  }), v(e).forEach(([r, p]) => {
    r in n ? o[r] = n[r] : r in i ? o[r] = i[r] : o[r] = r === d ? H(t, d) : p;
  }), o;
}, S = (t) => Object.keys(t), qt = (t, e) => {
  const s = new CustomEvent(t, {
    cancelable: !0,
    bubbles: !0
  });
  return y(e) && L(s, e), s;
}, zt = { passive: !0 }, $t = (t) => t.offsetHeight, Kt = (t, e) => {
  v(e).forEach(([s, a]) => {
    if (a && N(s) && s.includes("--"))
      t.style.setProperty(s, a);
    else {
      const n = {};
      n[s] = a, L(t.style, n);
    }
  });
}, A = (t) => y(t) && t.constructor.name === "Map" || !1, G = (t) => typeof t == "number" || !1, g = /* @__PURE__ */ new Map(), Zt = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (t, e, s, a) => {
    u(t) && (a && a.length ? (g.has(t) || g.set(t, /* @__PURE__ */ new Map()), g.get(t).set(a, setTimeout(e, s))) : g.set(t, setTimeout(e, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (t, e) => {
    if (!u(t)) return null;
    const s = g.get(t);
    return e && s && A(s) ? s.get(e) || /* istanbul ignore next @preserve */
    null : G(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (t, e) => {
    if (!u(t)) return;
    const s = g.get(t);
    e && e.length && A(s) ? (clearTimeout(s.get(e)), s.delete(e), s.size === 0 && g.delete(t)) : (clearTimeout(s), g.delete(t));
  }
}, J = (t, e) => (l(e) ? e : h()).querySelectorAll(t), D = /* @__PURE__ */ new Map();
function Q(t) {
  const { shiftKey: e, code: s } = t, a = h(this), n = [
    ...J(V, this)
  ].filter(
    (i) => !q(i, "disabled") && !H(i, R)
  );
  if (!n.length) return;
  const c = n[0], o = n[n.length - 1];
  s === "Tab" && (e && a.activeElement === c ? (o.focus(), t.preventDefault()) : !e && a.activeElement === o && (c.focus(), t.preventDefault()));
}
const k = (t) => D.has(t) === !0, _t = (t) => {
  const e = k(t);
  (e ? j : U)(t, "keydown", Q), e ? D.delete(t) : D.set(t, !0);
}, tt = (t, e) => {
  const { width: s, height: a, top: n, right: c, bottom: o, left: i } = t.getBoundingClientRect();
  let d = 1, r = 1;
  if (e && u(t)) {
    const { offsetWidth: p, offsetHeight: w } = t;
    d = p > 0 ? Math.round(s) / p : (
      /* istanbul ignore next @preserve */
      1
    ), r = w > 0 ? Math.round(a) / w : (
      /* istanbul ignore next @preserve */
      1
    );
  }
  return {
    width: s / d,
    height: a / r,
    top: n / r,
    right: c / d,
    bottom: o / r,
    left: i / d,
    x: i / d,
    y: n / r
  };
}, Xt = (t) => h(t).body, M = (t) => h(t).documentElement, et = (t) => l(t) && t.constructor.name === "ShadowRoot" || !1, Yt = (t) => t.nodeName === "HTML" ? t : u(t) && t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
l(t) && t.parentNode || // DOM Element detected
et(t) && t.host || // ShadowRoot detected
M(t);
let B = 0, O = 0;
const m = /* @__PURE__ */ new Map(), st = (t, e) => {
  let s = e ? B : O;
  if (e) {
    const a = st(t), n = m.get(a) || /* @__PURE__ */ new Map();
    m.has(a) || m.set(a, n), A(n) && !n.has(e) ? (n.set(e, s), B += 1) : s = n.get(e);
  } else {
    const a = t.id || t;
    m.has(a) ? s = m.get(a) : (m.set(a, s), O += 1);
  }
  return s;
}, Gt = (t) => t ? P(t) ? t.defaultView : l(t) ? t?.ownerDocument?.defaultView : t : window, Jt = (t) => Array.isArray(t) || !1, Qt = (t) => {
  if (!l(t)) return !1;
  const { top: e, bottom: s } = tt(t), { clientHeight: a } = M(t);
  return e <= a && s >= 0;
}, kt = (t) => typeof t == "function" || !1, te = (t) => y(t) && t.constructor.name === "NodeList" || !1, ee = (t) => M(t).dir === "rtl", se = (t) => l(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, at = (t, e) => t ? t.closest(e) || // break out of `ShadowRoot`
at(t.getRootNode().host, e) : null, nt = (t, e) => u(t) ? t : (l(e) ? e : h()).querySelector(t), ae = (t, e) => (l(e) ? e : h()).getElementsByTagName(
  t
), ne = (t, e) => (e && l(e) ? e : h()).getElementsByClassName(
  t
), re = (t, e) => t.matches(e), rt = "5.1.0", ot = rt;
class oe {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(e, s) {
    let a;
    try {
      if (u(e))
        a = e;
      else if (N(e)) {
        if (a = nt(e), !a) throw Error(`"${e}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (c) {
      throw Error(`${this.name} Error: ${c.message}`);
    }
    const n = E.get(a, this.name);
    n && n._toggleEventListeners(), this.element = a, this.options = this.defaults && S(this.defaults).length ? Y(a, this.defaults, s || {}, "bs") : {}, E.set(a, this.name, this);
  }
  // istanbul ignore next @preserve
  get version() {
    return ot;
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
    E.remove(this.element, this.name), S(this).forEach((e) => {
      delete this[e];
    });
  }
}
export {
  R as $,
  Lt as A,
  oe as B,
  ft as C,
  at as D,
  At as E,
  Dt as F,
  Bt as G,
  St as H,
  N as I,
  Ht as J,
  Kt as K,
  lt as L,
  q as M,
  jt as N,
  L as O,
  b as P,
  M as Q,
  tt as R,
  pt as S,
  Zt as T,
  mt as U,
  yt as V,
  Mt as W,
  Ct as X,
  Ot as Y,
  It as Z,
  Xt as _,
  ut as a,
  ct as a0,
  _t as a1,
  Gt as a2,
  $ as a3,
  ae as a4,
  dt as a5,
  gt as a6,
  ht as a7,
  X as a8,
  kt as a9,
  te as aa,
  Jt as ab,
  l as ac,
  Yt as ad,
  et as ae,
  se as af,
  st as ag,
  wt as ah,
  Ft as ai,
  it as aj,
  H as b,
  qt as c,
  K as d,
  Ut as e,
  Rt as f,
  Wt as g,
  xt as h,
  ee as i,
  ne as j,
  re as k,
  h as l,
  Et as m,
  J as n,
  Qt as o,
  _ as p,
  nt as q,
  Vt as r,
  Pt as s,
  $t as t,
  u,
  vt as v,
  bt as w,
  zt as x,
  Tt as y,
  Nt as z
};
//# sourceMappingURL=base-component-ylZzLp-h.mjs.map
