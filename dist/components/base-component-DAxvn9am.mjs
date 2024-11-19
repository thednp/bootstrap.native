const de = "aria-describedby", he = "aria-expanded", V = "aria-hidden", fe = "aria-modal", ge = "aria-pressed", me = "aria-selected", pe = "focus", ye = "focusin", we = "focusout", be = "keydown", ve = "keyup", Ee = "click", Ae = "mousedown", Le = "hover", Te = "mouseenter", Ne = "mouseleave", Me = "pointerdown", xe = "pointermove", De = "pointerup", ke = "touchstart", Ce = "dragstart", $ = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', je = "ArrowDown", ze = "ArrowUp", Be = "ArrowLeft", He = "ArrowRight", Pe = "Escape", I = "transitionDuration", q = "transitionDelay", T = "transitionend", F = "transitionProperty", Fe = () => {
  const e = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (t) => e.test(t.brand)
  ) || e.test(
    navigator?.userAgent
  ) || !1;
}, Se = () => {
}, G = (e, t, s, n) => {
  const a = n || !1;
  e.addEventListener(
    t,
    s,
    a
  );
}, Q = (e, t, s, n) => {
  const a = n || !1;
  e.removeEventListener(
    t,
    s,
    a
  );
}, S = (e, t) => e.getAttribute(t), U = (e, t) => e.hasAttribute(t), Oe = (e, t, s) => e.setAttribute(t, s), Re = (e, t) => e.removeAttribute(t), We = (e, ...t) => {
  e.classList.add(...t);
}, Ve = (e, ...t) => {
  e.classList.remove(...t);
}, $e = (e, t) => e.classList.contains(t), b = (e) => e != null && typeof e == "object" || !1, u = (e) => b(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => e.nodeType === t
) || !1, c = (e) => u(e) && e.nodeType === 1 || !1, m = /* @__PURE__ */ new Map(), y = {
  data: m,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, s) => {
    c(e) && (m.has(t) || m.set(t, /* @__PURE__ */ new Map()), m.get(t).set(e, s));
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
    if (!c(e) || !t) return null;
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
    !s || !c(e) || (s.delete(e), s.size === 0 && m.delete(t));
  }
}, Ie = (e, t) => y.get(e, t), j = (e) => e?.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (t, s) => s === 0 ? t.toLowerCase() : t.toUpperCase()
).replace(/\s+/g, ""), x = (e) => typeof e == "string" || !1, O = (e) => b(e) && e.constructor.name === "Window" || !1, R = (e) => u(e) && e.nodeType === 9 || !1, d = (e) => R(e) ? e : u(e) ? e.ownerDocument : O(e) ? e.document : globalThis.document, D = (e, ...t) => Object.assign(e, ...t), Y = (e) => {
  if (!e) return;
  if (x(e))
    return d().createElement(e);
  const { tagName: t } = e, s = Y(t);
  if (!s) return;
  const n = { ...e };
  return delete n.tagName, D(s, n);
}, Z = (e, t) => e.dispatchEvent(t), A = (e, t, s) => {
  const n = getComputedStyle(e, s), a = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(a);
}, J = (e) => {
  const t = A(e, F), s = A(e, q), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, K = (e) => {
  const t = A(e, F), s = A(e, I), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, qe = (e, t) => {
  let s = 0;
  const n = new Event(T), a = K(e), o = J(e);
  if (a) {
    const r = (l) => {
      l.target === e && (t.apply(e, [l]), e.removeEventListener(T, r), s = 1);
    };
    e.addEventListener(T, r), setTimeout(() => {
      s || Z(e, n);
    }, a + o + 17);
  } else
    t.apply(e, [n]);
}, Ge = (e, t) => e.focus(t), z = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, E = (e) => Object.entries(e), _ = (e, t, s, n) => {
  if (!c(e)) return t;
  const a = { ...s }, o = { ...e.dataset }, r = { ...t }, l = {}, h = "title";
  return E(o).forEach(([i, f]) => {
    const v = typeof i == "string" && i.includes(n) ? j(i.replace(n, "")) : j(i);
    l[v] = z(f);
  }), E(a).forEach(([i, f]) => {
    a[i] = z(f);
  }), E(t).forEach(([i, f]) => {
    i in a ? r[i] = a[i] : i in l ? r[i] = l[i] : r[i] = i === h ? S(e, h) : f;
  }), r;
}, B = (e) => Object.keys(e), Qe = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return b(t) && D(s, t), s;
}, Ue = { passive: !0 }, Ye = (e) => e.offsetHeight, Ze = (e, t) => {
  E(t).forEach(([s, n]) => {
    if (n && x(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const a = {};
      a[s] = n, D(e.style, a);
    }
  });
}, N = (e) => b(e) && e.constructor.name === "Map" || !1, X = (e) => typeof e == "number" || !1, g = /* @__PURE__ */ new Map(), Je = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, s, n) => {
    c(e) && (n && n.length ? (g.has(e) || g.set(e, /* @__PURE__ */ new Map()), g.get(e).set(n, setTimeout(t, s))) : g.set(e, setTimeout(t, s)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!c(e)) return null;
    const s = g.get(e);
    return t && s && N(s) ? s.get(t) || null : X(s) ? s : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!c(e)) return;
    const s = g.get(e);
    t && t.length && N(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && g.delete(e)) : (clearTimeout(s), g.delete(e));
  }
}, Ke = (e) => e.toLowerCase(), ee = (e, t) => (u(t) ? t : d()).querySelectorAll(e), M = /* @__PURE__ */ new Map();
function te(e) {
  const { shiftKey: t, code: s } = e, n = d(this), a = [
    ...ee($, this)
  ].filter(
    (l) => !U(l, "disabled") && !S(l, V)
  );
  if (!a.length) return;
  const o = a[0], r = a[a.length - 1];
  s === "Tab" && (t && n.activeElement === o ? (r.focus(), e.preventDefault()) : !t && n.activeElement === r && (o.focus(), e.preventDefault()));
}
const se = (e) => M.has(e) === !0, _e = (e) => {
  const t = se(e);
  (t ? Q : G)(e, "keydown", te), t ? M.delete(e) : M.set(e, !0);
}, k = (e) => c(e) && "offsetWidth" in e || !1, L = (e, t) => {
  const { width: s, height: n, top: a, right: o, bottom: r, left: l } = e.getBoundingClientRect();
  let h = 1, i = 1;
  if (t && k(e)) {
    const { offsetWidth: f, offsetHeight: v } = e;
    h = f > 0 ? Math.round(s) / f : 1, i = v > 0 ? Math.round(n) / v : 1;
  }
  return {
    width: s / h,
    height: n / i,
    top: a / i,
    right: o / h,
    bottom: r / i,
    left: l / h,
    x: l / h,
    y: a / i
  };
}, Xe = (e) => d(e).body, C = (e) => d(e).documentElement, et = (e) => {
  const t = O(e), s = t ? e.scrollX : e.scrollLeft, n = t ? e.scrollY : e.scrollTop;
  return { x: s, y: n };
}, ne = (e) => u(e) && e.constructor.name === "ShadowRoot" || !1, tt = (e) => e.nodeName === "HTML" ? e : c(e) && e.assignedSlot || u(e) && e.parentNode || ne(e) && e.host || C(e), st = (e) => e ? R(e) ? e.defaultView : u(e) ? e?.ownerDocument?.defaultView : e : window, nt = (e) => u(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, at = (e, t) => e.matches(t), ae = (e) => {
  if (!k(e)) return !1;
  const { width: t, height: s } = L(e), { offsetWidth: n, offsetHeight: a } = e;
  return Math.round(t) !== n || Math.round(s) !== a;
}, ot = (e, t, s) => {
  const n = k(t), a = L(
    e,
    n && ae(t)
  ), o = { x: 0, y: 0 };
  if (n) {
    const r = L(t, !0);
    o.x = r.x + t.clientLeft, o.y = r.y + t.clientTop;
  }
  return {
    x: a.left + s.x - o.x,
    y: a.top + s.y - o.y,
    width: a.width,
    height: a.height
  };
};
let H = 0, P = 0;
const p = /* @__PURE__ */ new Map(), oe = (e, t) => {
  let s = t ? H : P;
  if (t) {
    const n = oe(e), a = p.get(n) || /* @__PURE__ */ new Map();
    p.has(n) || p.set(n, a), N(a) && !a.has(t) ? (a.set(t, s), H += 1) : s = a.get(t);
  } else {
    const n = e.id || e;
    p.has(n) ? s = p.get(n) : (p.set(n, s), P += 1);
  }
  return s;
}, rt = (e) => Array.isArray(e) || !1, it = (e) => {
  if (!u(e)) return !1;
  const { top: t, bottom: s } = L(e), { clientHeight: n } = C(e);
  return t <= n && s >= 0;
}, lt = (e) => typeof e == "function" || !1, ct = (e) => b(e) && e.constructor.name === "NodeList" || !1, ut = (e) => C(e).dir === "rtl", re = (e, t) => !e || !t ? null : e.closest(t) || re(e.getRootNode().host, t) || null, ie = (e, t) => c(e) ? e : (c(t) ? t : d()).querySelector(e), dt = (e, t) => (u(t) ? t : d()).getElementsByTagName(
  e
), ht = (e, t) => d(t).getElementById(e), ft = (e, t) => (t && u(t) ? t : d()).getElementsByClassName(
  e
), w = {}, W = (e) => {
  const { type: t, currentTarget: s } = e;
  w[t].forEach((n, a) => {
    s === a && n.forEach((o, r) => {
      r.apply(a, [e]), typeof o == "object" && o.once && le(a, t, r, o);
    });
  });
}, gt = (e, t, s, n) => {
  w[t] || (w[t] = /* @__PURE__ */ new Map());
  const a = w[t];
  a.has(e) || a.set(e, /* @__PURE__ */ new Map());
  const o = a.get(
    e
  ), { size: r } = o;
  o.set(s, n), r || e.addEventListener(
    t,
    W,
    n
  );
}, le = (e, t, s, n) => {
  const a = w[t], o = a && a.get(e), r = o && o.get(s), l = r !== void 0 ? r : n;
  o && o.has(s) && o.delete(s), a && (!o || !o.size) && a.delete(e), (!a || !a.size) && delete w[t], (!o || !o.size) && e.removeEventListener(
    t,
    W,
    l
  );
}, ce = "5.1.0", ue = ce;
class mt {
  /**
   * @param target `Element` or selector string
   * @param config component instance options
   */
  constructor(t, s) {
    let n;
    try {
      if (c(t))
        n = t;
      else if (x(t)) {
        if (n = ie(t), !n) throw Error(`"${t}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (o) {
      throw Error(`${this.name} Error: ${o.message}`);
    }
    const a = y.get(n, this.name);
    a && a._toggleEventListeners(), this.element = n, this.options = this.defaults && B(this.defaults).length ? _(n, this.defaults, s || {}, "bs") : {}, y.set(n, this.name, this);
  }
  get version() {
    return ue;
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
    y.remove(this.element, this.name), B(this).forEach((t) => {
      delete this[t];
    });
  }
}
export {
  Re as $,
  Ne as A,
  mt as B,
  Se as C,
  it as D,
  gt as E,
  Ze as F,
  ft as G,
  he as H,
  De as I,
  U as J,
  Ge as K,
  A as L,
  L as M,
  D as N,
  Me as O,
  pe as P,
  Oe as Q,
  ie as R,
  C as S,
  ve as T,
  ut as U,
  Ae as V,
  je as W,
  ze as X,
  Ve as Y,
  $e as Z,
  Pe as _,
  ge as a,
  Xe as a0,
  V as a1,
  fe as a2,
  _e as a3,
  st as a4,
  Y as a5,
  ht as a6,
  dt as a7,
  me as a8,
  ye as a9,
  we as aa,
  et as ab,
  ot as ac,
  Ke as ad,
  lt as ae,
  ct as af,
  rt as ag,
  u as ah,
  tt as ai,
  ne as aj,
  nt as ak,
  oe as al,
  Le as am,
  Fe as an,
  de as ao,
  We as b,
  at as c,
  d,
  ee as e,
  Ye as f,
  Ue as g,
  Je as h,
  ke as i,
  Ce as j,
  be as k,
  re as l,
  Qe as m,
  S as n,
  He as o,
  Be as p,
  Z as q,
  le as r,
  qe as s,
  Ie as t,
  K as u,
  Ee as v,
  Te as w,
  k as x,
  x as y,
  xe as z
};
//# sourceMappingURL=base-component-DAxvn9am.mjs.map
