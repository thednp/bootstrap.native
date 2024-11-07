const ue = "aria-describedby", ce = "aria-expanded", W = "aria-hidden", de = "aria-modal", he = "aria-pressed", fe = "aria-selected", ge = "focus", me = "focusin", pe = "focusout", ye = "keydown", we = "keyup", be = "click", ve = "mousedown", Ee = "hover", Ae = "mouseenter", Te = "mouseleave", Ne = "pointerdown", Le = "pointermove", xe = "pointerup", Me = "touchstart", De = "dragstart", O = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', ke = "ArrowDown", Ce = "ArrowUp", He = "ArrowLeft", Pe = "ArrowRight", Be = "Escape", V = "transitionDuration", $ = "transitionDelay", T = "transitionend", F = "transitionProperty", Fe = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Re = () => {
}, q = (e, t, s, n) => {
  const a = n || !1;
  e.addEventListener(
    t,
    s,
    a
  );
}, G = (e, t, s, n) => {
  const a = n || !1;
  e.removeEventListener(
    t,
    s,
    a
  );
}, R = (e, t) => e.getAttribute(t), Z = (e, t) => e.hasAttribute(t), Se = (e, t, s) => e.setAttribute(t, s), je = (e, t) => e.removeAttribute(t), ze = (e, ...t) => {
  e.classList.add(...t);
}, We = (e, ...t) => {
  e.classList.remove(...t);
}, Oe = (e, t) => e.classList.contains(t), w = (e) => e != null && typeof e == "object" || !1, c = (e) => w(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, u = (e) => c(e) && e.nodeType === 1 || !1, m = /* @__PURE__ */ new Map(), y = {
  data: m,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, s) => {
    u(e) && (m.has(t) || m.set(t, /* @__PURE__ */ new Map()), m.get(t).set(e, s));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => m.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!u(e) || !t) return null;
    const s = y.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (e, t) => {
    const s = y.getAllFor(t);
    !s || !u(e) || (s.delete(e), s.size === 0 && m.delete(t));
  }
}, Ve = (e, t) => y.get(e, t), x = (e) => typeof e == "string" || !1, S = (e) => w(e) && e.constructor.name === "Window" || !1, j = (e) => c(e) && e.nodeType === 9 || !1, g = (e) => j(e) ? e : c(e) ? e.ownerDocument : S(e) ? e.document : globalThis.document, M = (e, ...t) => Object.assign(e, ...t), _ = (e) => {
  if (!e) return;
  if (x(e))
    return g().createElement(e);
  const { tagName: t } = e, s = _(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, M(s, n);
}, K = (e, t) => e.dispatchEvent(t), E = (e, t, s) => {
  const n = getComputedStyle(e, s), a = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(a);
}, Q = (e) => {
  const t = E(e, F), s = E(e, $), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, U = (e) => {
  const t = E(e, F), s = E(e, V), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, $e = (e, t) => {
  let s = 0;
  const n = new Event(T), a = U(e), r = Q(e);
  if (a) {
    const i = (l) => {
      l.target === e && (t.apply(e, [l]), e.removeEventListener(T, i), s = 1);
    };
    e.addEventListener(T, i), setTimeout(() => {
      s || K(e, n);
    }, a + r + 17);
  } else
    t.apply(e, [n]);
}, qe = (e, t) => e.focus(t), C = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, v = (e) => Object.entries(e), Y = (e) => e.toLowerCase(), I = (e, t, s, n) => {
  if (!u(e)) return t;
  const a = { ...s }, r = { ...e.dataset }, i = { ...t }, l = {}, d = "title";
  return v(r).forEach(([o, h]) => {
    const b = typeof o == "string" && o.includes(n) ? o.replace(n, "").replace(
      /[A-Z]/g,
      (z) => Y(z)
    ) : o;
    l[b] = C(h);
  }), v(a).forEach(([o, h]) => {
    a[o] = C(h);
  }), v(t).forEach(([o, h]) => {
    o in a ? i[o] = a[o] : o in l ? i[o] = l[o] : i[o] = o === d ? R(e, d) : h;
  }), i;
}, H = (e) => Object.keys(e), Ge = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return w(t) && M(s, t), s;
}, Ze = { passive: !0 }, _e = (e) => e.offsetHeight, Ke = (e, t) => {
  v(t).forEach(([s, n]) => {
    if (n && x(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const a = {};
      a[s] = n, M(e.style, a);
    }
  });
}, N = (e) => w(e) && e.constructor.name === "Map" || !1, X = (e) => typeof e == "number" || !1, f = /* @__PURE__ */ new Map(), Qe = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, s, n) => {
    u(e) && (n && n.length ? (f.has(e) || f.set(e, /* @__PURE__ */ new Map()), f.get(e).set(n, setTimeout(t, s))) : f.set(e, setTimeout(t, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!u(e)) return null;
    const s = f.get(e);
    return t && s && N(s) ? s.get(t) || null : X(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!u(e)) return;
    const s = f.get(e);
    t && t.length && N(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && f.delete(e)) : (clearTimeout(s), f.delete(e));
  }
}, J = (e, t) => (c(t) ? t : g()).querySelectorAll(e), L = /* @__PURE__ */ new Map();
function ee(e) {
  const { shiftKey: t, code: s } = e, n = g(this), a = [
    ...J(O, this)
  ].filter(
    (l) => !Z(l, "disabled") && !R(l, W)
  );
  if (!a.length) return;
  const r = a[0], i = a[a.length - 1];
  s === "Tab" && (t && n.activeElement === r ? (i.focus(), e.preventDefault()) : !t && n.activeElement === i && (r.focus(), e.preventDefault()));
}
const te = (e) => L.has(e) === !0, Ue = (e) => {
  const t = te(e);
  (t ? G : q)(e, "keydown", ee), t ? L.delete(e) : L.set(e, !0);
}, D = (e) => u(e) && "offsetWidth" in e || !1, A = (e, t) => {
  const { width: s, height: n, top: a, right: r, bottom: i, left: l } = e.getBoundingClientRect();
  let d = 1, o = 1;
  if (t && D(e)) {
    const { offsetWidth: h, offsetHeight: b } = e;
    d = h > 0 ? Math.round(s) / h : 1, o = b > 0 ? Math.round(n) / b : 1;
  }
  return {
    width: s / d,
    height: n / o,
    top: a / o,
    right: r / d,
    bottom: i / o,
    left: l / d,
    x: l / d,
    y: a / o
  };
}, Ye = (e) => g(e).body, k = (e) => g(e).documentElement, Ie = (e) => {
  const t = S(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, se = (e) => c(e) && e.constructor.name === "ShadowRoot" || !1, Xe = (e) => e.nodeName === "HTML" ? e : u(e) && e.assignedSlot || c(e) && e.parentNode || se(e) && e.host || k(e), Je = (e) => e ? j(e) ? e.defaultView : c(e) ? e?.ownerDocument?.defaultView : e : window, et = (e) => c(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, tt = (e, t) => e.matches(t), ne = (e) => {
  if (!D(e)) return !1;
  const { width: t, height: s } = A(e), { offsetWidth: n, offsetHeight: a } = e;
  return Math.round(t) !== n || Math.round(s) !== a;
}, st = (e, t, s) => {
  const n = D(t), a = A(
    e,
    n && ne(t)
  ), r = { x: 0, y: 0 };
  if (n) {
    const i = A(t, !0);
    r.x = i.x + t.clientLeft, r.y = i.y + t.clientTop;
  }
  return {
    x: a.left + s.x - r.x,
    y: a.top + s.y - r.y,
    width: a.width,
    height: a.height
  };
};
let P = 0, B = 0;
const p = /* @__PURE__ */ new Map(), ae = (e, t) => {
  let s = t ? P : B;
  if (t) {
    const n = ae(e), a = p.get(n) || /* @__PURE__ */ new Map();
    p.has(n) || p.set(n, a), N(a) && !a.has(t) ? (a.set(t, s), P += 1) : s = a.get(t);
  } else {
    const n = e.id || e;
    p.has(n) ? s = p.get(n) : (p.set(n, s), B += 1);
  }
  return s;
}, nt = (e) => Array.isArray(e) || !1, at = (e) => {
  if (!c(e)) return !1;
  const { top: t, bottom: s } = A(e), { clientHeight: n } = k(e);
  return t <= n && s >= 0;
}, ot = (e) => typeof e == "function" || !1, rt = (e) => w(e) && e.constructor.name === "NodeList" || !1, it = (e) => k(e).dir === "rtl", oe = (e, t) => !e || !t ? null : e.closest(t) || oe(e.getRootNode().host, t) || null, re = (e, t) => u(e) ? e : (u(t) ? t : g()).querySelector(e), lt = (e, t) => (c(t) ? t : g()).getElementsByTagName(
  e
), ut = (e, t) => (t && c(t) ? t : g()).getElementsByClassName(
  e
), ie = "5.1.0", le = ie;
class ct {
  /**
   * @param target `Element` or selector string
   * @param config component instance options
   */
  constructor(t, s) {
    let n;
    try {
      if (u(t))
        n = t;
      else if (x(t)) {
        if (n = re(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (r) {
      throw Error(`${this.name} Error: ${r.message}`);
    }
    const a = y.get(n, this.name);
    a && a._toggleEventListeners(), this.element = n, this.options = this.defaults && H(this.defaults).length ? I(n, this.defaults, s || {}, "bs") : {}, y.set(n, this.name, this);
  }
  get version() {
    return le;
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
    y.remove(this.element, this.name), H(this).forEach((t) => {
      delete this[t];
    });
  }
}
export {
  W as $,
  x as A,
  ct as B,
  Re as C,
  at as D,
  tt as E,
  Ke as F,
  ut as G,
  Z as H,
  qe as I,
  E as J,
  A as K,
  ge as L,
  we as M,
  M as N,
  ce as O,
  ve as P,
  Se as Q,
  re as R,
  k as S,
  ke as T,
  it as U,
  Ce as V,
  Be as W,
  je as X,
  Oe as Y,
  We as Z,
  Ye as _,
  he as a,
  de as a0,
  Ue as a1,
  Je as a2,
  _ as a3,
  lt as a4,
  fe as a5,
  me as a6,
  pe as a7,
  Ie as a8,
  st as a9,
  Y as aa,
  ot as ab,
  rt as ac,
  nt as ad,
  c as ae,
  Xe as af,
  se as ag,
  et as ah,
  ae as ai,
  Ee as aj,
  Fe as ak,
  ue as al,
  ze as b,
  J as c,
  g as d,
  _e as e,
  D as f,
  Ae as g,
  Ze as h,
  U as i,
  R as j,
  Ne as k,
  Me as l,
  be as m,
  De as n,
  ye as o,
  oe as p,
  K as q,
  $e as r,
  Pe as s,
  Ve as t,
  He as u,
  Ge as v,
  Te as w,
  Le as x,
  Qe as y,
  xe as z
};
//# sourceMappingURL=base-component-Jx2aafTJ.mjs.map
