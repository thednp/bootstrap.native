const ue = "aria-describedby", de = "aria-expanded", me = "aria-hidden", pe = "aria-modal", ge = "aria-pressed", he = "aria-selected", $ = "DOMContentLoaded", fe = "focus", ye = "focusin", be = "focusout", we = "keydown", ve = "keyup", Ee = "click", Ae = "mousedown", Ne = "hover", Le = "mouseenter", Te = "mouseleave", Me = "mousemove", ke = "pointerdown", Pe = "pointermove", Ce = "pointerup", Be = "resize", De = "scroll", je = "touchstart", Fe = "ArrowDown", He = "ArrowUp", Ve = "ArrowLeft", xe = "ArrowRight", Oe = "Escape", z = "transitionDuration", R = "transitionDelay", M = "transitionend", H = "transitionProperty", W = navigator.userAgentData, A = W, { userAgent: q } = navigator, N = q, P = /iPhone|iPad|iPod|Android/i;
A ? A.brands.some((e) => P.test(e.brand)) : P.test(N);
const C = /(iPhone|iPod|iPad)/, Se = A ? A.brands.some((e) => C.test(e.brand)) : C.test(N);
N && N.includes("Firefox");
const { head: T } = document;
["webkitPerspective", "perspective"].some((e) => e in T.style);
const U = (e, t, s, n) => {
  const a = n || !1;
  e.addEventListener(t, s, a);
}, G = (e, t, s, n) => {
  const a = n || !1;
  e.removeEventListener(t, s, a);
}, I = (e, t, s, n) => {
  const a = (r) => {
    (r.target === e || r.currentTarget === e) && (s.apply(e, [r]), G(e, t, a, n));
  };
  U(e, t, a, n);
}, Z = () => {
};
(() => {
  let e = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: () => (e = !0, e)
    });
    I(document, $, Z, t);
  } catch {
  }
  return e;
})();
["webkitTransform", "transform"].some((e) => e in T.style);
["webkitAnimation", "animation"].some((e) => e in T.style);
["webkitTransition", "transition"].some((e) => e in T.style);
const J = (e, t) => e.getAttribute(t), $e = (e, t) => e.hasAttribute(t), Q = (e, t, s) => e.setAttribute(t, s), ze = (e, t) => e.removeAttribute(t), Re = (e, ...t) => {
  e.classList.add(...t);
}, We = (e, ...t) => {
  e.classList.remove(...t);
}, qe = (e, t) => e.classList.contains(t), v = (e) => e != null && typeof e == "object" || !1, i = (e) => v(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => e.nodeType === t) || !1, p = (e) => i(e) && e.nodeType === 1 || !1, y = /* @__PURE__ */ new Map(), f = {
  set: (e, t, s) => {
    !p(e) || (y.has(t) || y.set(t, /* @__PURE__ */ new Map()), y.get(t).set(e, s));
  },
  getAllFor: (e) => y.get(e) || null,
  get: (e, t) => {
    if (!p(e) || !t)
      return null;
    const s = f.getAllFor(t);
    return e && s && s.get(e) || null;
  },
  remove: (e, t) => {
    const s = f.getAllFor(t);
    !s || !p(e) || (s.delete(e), s.size === 0 && y.delete(t));
  }
}, Ue = (e, t) => f.get(e, t), b = (e) => typeof e == "string" || !1, K = (e) => v(e) && e.constructor.name === "Window" || !1, V = (e) => i(e) && e.nodeType === 9 || !1, g = (e) => K(e) ? e.document : V(e) ? e : i(e) ? e.ownerDocument : window.document, w = (e) => Object.entries(e), X = (e) => {
  if (!e)
    return;
  if (b(e))
    return g().createElement(e);
  const { tagName: t } = e, s = X(t);
  if (!s)
    return;
  const n = { ...e };
  return delete n.tagName, w(n).forEach(([a, r]) => {
    b(a) && b(r) && Q(s, a, r);
  }), s;
}, Y = (e, t) => e.dispatchEvent(t), L = (e, t) => {
  const s = getComputedStyle(e), n = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(n);
}, _ = (e) => {
  const t = L(e, H), s = L(e, R), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, ee = (e) => {
  const t = L(e, H), s = L(e, z), n = s.includes("ms") ? 1 : 1e3, a = t && t !== "none" ? parseFloat(s) * n : 0;
  return Number.isNaN(a) ? 0 : a;
}, Ge = (e, t) => {
  let s = 0;
  const n = new Event(M), a = ee(e), r = _(e);
  if (a) {
    const l = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(M, l), s = 1);
    };
    e.addEventListener(M, l), setTimeout(() => {
      s || Y(e, n);
    }, a + r + 17);
  } else
    t.apply(e, [n]);
}, Ie = (e, t) => e.focus(t), B = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, te = (e) => e.toLowerCase(), se = (e, t, s, n) => {
  const a = { ...s }, r = { ...e.dataset }, l = { ...t }, c = {}, u = "title";
  return w(r).forEach(([o, d]) => {
    const E = n && typeof o == "string" && o.includes(n) ? o.replace(n, "").replace(/[A-Z]/g, (S) => te(S)) : o;
    c[E] = B(d);
  }), w(a).forEach(([o, d]) => {
    a[o] = B(d);
  }), w(t).forEach(([o, d]) => {
    o in a ? l[o] = a[o] : o in c ? l[o] = c[o] : l[o] = o === u ? J(e, u) : d;
  }), l;
}, x = (e, ...t) => Object.assign(e, ...t), D = (e) => Object.keys(e), Ze = (e, t) => {
  const s = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return v(t) && x(s, t), s;
}, Je = { passive: !0 }, Qe = (e) => e.offsetHeight, Ke = (e, t) => {
  w(t).forEach(([s, n]) => {
    if (n && b(s) && s.includes("--"))
      e.style.setProperty(s, n);
    else {
      const a = {};
      a[s] = n, x(e.style, a);
    }
  });
}, k = (e) => v(e) && e.constructor.name === "Map" || !1, ne = (e) => typeof e == "number" || !1, m = /* @__PURE__ */ new Map(), Xe = {
  set: (e, t, s, n) => {
    !p(e) || (n && n.length ? (m.has(e) || m.set(e, /* @__PURE__ */ new Map()), m.get(e).set(n, setTimeout(t, s))) : m.set(e, setTimeout(t, s)));
  },
  get: (e, t) => {
    if (!p(e))
      return null;
    const s = m.get(e);
    return t && s && k(s) ? s.get(t) || null : ne(s) ? s : null;
  },
  clear: (e, t) => {
    if (!p(e))
      return;
    const s = m.get(e);
    t && t.length && k(s) ? (clearTimeout(s.get(t)), s.delete(t), s.size === 0 && m.delete(e)) : (clearTimeout(s), m.delete(e));
  }
}, ae = (e, t) => {
  const { width: s, height: n, top: a, right: r, bottom: l, left: c } = e.getBoundingClientRect();
  let u = 1, o = 1;
  if (t && p(e)) {
    const { offsetWidth: d, offsetHeight: E } = e;
    u = d > 0 ? Math.round(s) / d : 1, o = E > 0 ? Math.round(n) / E : 1;
  }
  return {
    width: s / u,
    height: n / o,
    top: a / o,
    right: r / u,
    bottom: l / o,
    left: c / u,
    x: c / u,
    y: a / o
  };
}, Ye = (e) => g(e).body, O = (e) => g(e).documentElement;
let j = 0, F = 0;
const h = /* @__PURE__ */ new Map(), oe = (e, t) => {
  let s = t ? j : F;
  if (t) {
    const n = oe(e), a = h.get(n) || /* @__PURE__ */ new Map();
    h.has(n) || h.set(n, a), k(a) && !a.has(t) ? (a.set(t, s), j += 1) : s = a.get(t);
  } else {
    const n = e.id || e;
    h.has(n) ? s = h.get(n) : (h.set(n, s), F += 1);
  }
  return s;
}, _e = (e) => {
  var t;
  return e ? V(e) ? e.defaultView : i(e) ? (t = e?.ownerDocument) == null ? void 0 : t.defaultView : e : window;
}, et = (e) => Array.isArray(e) || !1, tt = (e) => {
  if (!i(e))
    return !1;
  const { top: t, bottom: s } = ae(e), { clientHeight: n } = O(e);
  return t <= n && s >= 0;
}, st = (e) => typeof e == "function" || !1, nt = (e) => i(e) && ["SVG", "Image", "Video", "Canvas"].some((t) => e.constructor.name.includes(t)) || !1, at = (e) => v(e) && e.constructor.name === "NodeList" || !1, ot = (e) => O(e).dir === "rtl", re = (e, t) => e ? e.closest(t) || re(e.getRootNode().host, t) : null, ie = (e, t) => p(e) ? e : (i(t) ? t : g()).querySelector(e), rt = (e, t) => (i(t) ? t : g()).getElementsByTagName(e), it = (e, t) => (i(t) ? t : g()).querySelectorAll(e), lt = (e, t) => (t && i(t) ? t : g()).getElementsByClassName(
  e
), le = "5.0.0-alpha1", ce = le;
class ct {
  element;
  options;
  constructor(t, s) {
    const n = ie(t);
    if (!n)
      throw b(t) ? Error(`${this.name} Error: "${t}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const a = f.get(n, this.name);
    a && a.dispose(), this.element = n, this.defaults && D(this.defaults).length && (this.options = se(n, this.defaults, s || {}, "bs")), f.set(n, this.name, this);
  }
  get version() {
    return ce;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    f.remove(this.element, this.name), D(this).forEach((t) => {
      delete this[t];
    });
  }
}
export {
  _e as $,
  ge as A,
  ct as B,
  De as C,
  Be as D,
  de as E,
  Q as F,
  Xe as G,
  ve as H,
  Fe as I,
  Oe as J,
  ze as K,
  Ue as L,
  Re as M,
  We as N,
  Ye as O,
  He as P,
  Y as Q,
  Je as R,
  me as S,
  Ce as T,
  Ve as U,
  pe as V,
  Ze as W,
  st as X,
  Z as Y,
  J as Z,
  fe as _,
  g as a,
  X as a0,
  i as a1,
  nt as a2,
  b as a3,
  at as a4,
  et as a5,
  oe as a6,
  te as a7,
  Me as a8,
  Ne as a9,
  Ae as aa,
  je as ab,
  ye as ac,
  be as ad,
  Se as ae,
  ue as af,
  K as ag,
  rt as ah,
  he as ai,
  it as b,
  Qe as c,
  re as d,
  tt as e,
  p as f,
  ie as g,
  lt as h,
  Te as i,
  ke as j,
  qe as k,
  we as l,
  Le as m,
  Pe as n,
  ee as o,
  ot as p,
  x as q,
  xe as r,
  Ke as s,
  $e as t,
  Ee as u,
  Ie as v,
  L as w,
  O as x,
  ae as y,
  Ge as z
};
//# sourceMappingURL=base-component-215a274f.js.map
