const re = "aria-describedby", ie = "aria-expanded", le = "aria-hidden", ce = "aria-modal", ue = "aria-pressed", de = "aria-selected", R = "DOMContentLoaded", me = "focus", pe = "focusin", ge = "focusout", fe = "keydown", he = "keyup", ye = "click", be = "mousedown", we = "hover", ve = "mouseenter", Ae = "mouseleave", Ee = "mousemove", Ne = "pointerdown", Te = "pointermove", Le = "pointerup", ke = "resize", Me = "scroll", Pe = "touchstart", je = "ArrowDown", De = "ArrowUp", Ce = "ArrowLeft", Fe = "ArrowRight", He = "Escape", V = "transitionDuration", z = "transitionDelay", L = "transitionend", S = "transitionProperty", W = navigator.userAgentData, A = W, { userAgent: q } = navigator, E = q, j = /iPhone|iPad|iPod|Android/i;
A ? A.brands.some((e) => j.test(e.brand)) : j.test(E);
const D = /(iPhone|iPod|iPad)/, Se = A ? A.brands.some((e) => D.test(e.brand)) : D.test(E);
E && E.includes("Firefox");
const { head: T } = document;
["webkitPerspective", "perspective"].some((e) => e in T.style);
const U = (e, s, t, a) => {
  const n = a || !1;
  e.addEventListener(s, t, n);
}, G = (e, s, t, a) => {
  const n = a || !1;
  e.removeEventListener(s, t, n);
}, Z = (e, s, t, a) => {
  const n = (i) => {
    (i.target === e || i.currentTarget === e) && (t.apply(e, [i]), G(e, s, n, a));
  };
  U(e, s, n, a);
}, $ = () => {
};
(() => {
  let e = !1;
  try {
    const s = Object.defineProperty({}, "passive", {
      get: () => (e = !0, e)
    });
    Z(document, R, $, s);
  } catch {
  }
  return e;
})();
["webkitTransform", "transform"].some((e) => e in T.style);
["webkitAnimation", "animation"].some((e) => e in T.style);
["webkitTransition", "transition"].some((e) => e in T.style);
const I = (e, s) => e.getAttribute(s), Be = (e, s) => e.hasAttribute(s), J = (e, s, t) => e.setAttribute(s, t), Oe = (e, s) => e.removeAttribute(s), xe = (e, ...s) => {
  e.classList.add(...s);
}, Re = (e, ...s) => {
  e.classList.remove(...s);
}, Ve = (e, s) => e.classList.contains(s), b = (e) => e != null && typeof e == "object" || !1, r = (e) => b(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((s) => e.nodeType === s) || !1, u = (e) => r(e) && e.nodeType === 1 || !1, h = /* @__PURE__ */ new Map(), k = {
  set: (e, s, t) => {
    u(e) && (h.has(s) || h.set(s, /* @__PURE__ */ new Map()), h.get(s).set(e, t));
  },
  getAllFor: (e) => h.get(e) || null,
  get: (e, s) => {
    if (!u(e) || !s)
      return null;
    const t = k.getAllFor(s);
    return e && t && t.get(e) || null;
  },
  remove: (e, s) => {
    const t = k.getAllFor(s);
    !t || !u(e) || (t.delete(e), t.size === 0 && h.delete(s));
  }
}, ze = (e, s) => k.get(e, s), v = (e) => typeof e == "string" || !1, Q = (e) => b(e) && e.constructor.name === "Window" || !1, B = (e) => r(e) && e.nodeType === 9 || !1, g = (e) => Q(e) ? e.document : B(e) ? e : r(e) ? e.ownerDocument : window.document, y = (e) => Object.entries(e), Y = (e) => {
  if (!e)
    return;
  if (v(e))
    return g().createElement(e);
  const { tagName: s } = e, t = Y(s);
  if (!t)
    return;
  const a = { ...e };
  return delete a.tagName, y(a).forEach(([n, i]) => {
    v(n) && v(i) && J(t, n, i);
  }), t;
}, K = (e, s) => e.dispatchEvent(s), N = (e, s) => {
  const t = getComputedStyle(e), a = s.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return t.getPropertyValue(a);
}, X = (e) => {
  const s = N(e, S), t = N(e, z), a = t.includes("ms") ? 1 : 1e3, n = s && s !== "none" ? parseFloat(t) * a : 0;
  return Number.isNaN(n) ? 0 : n;
}, _ = (e) => {
  const s = N(e, S), t = N(e, V), a = t.includes("ms") ? 1 : 1e3, n = s && s !== "none" ? parseFloat(t) * a : 0;
  return Number.isNaN(n) ? 0 : n;
}, We = (e, s) => {
  let t = 0;
  const a = new Event(L), n = _(e), i = X(e);
  if (n) {
    const l = (c) => {
      c.target === e && (s.apply(e, [c]), e.removeEventListener(L, l), t = 1);
    };
    e.addEventListener(L, l), setTimeout(() => {
      t || K(e, a);
    }, n + i + 17);
  } else
    s.apply(e, [a]);
}, qe = (e, s) => e.focus(s), C = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, ee = (e) => e.toLowerCase(), Ue = (e, s, t, a) => {
  const n = { ...t }, i = { ...e.dataset }, l = { ...s }, c = {}, d = "title";
  return y(i).forEach(([o, m]) => {
    const w = a && typeof o == "string" && o.includes(a) ? o.replace(a, "").replace(/[A-Z]/g, (x) => ee(x)) : o;
    c[w] = C(m);
  }), y(n).forEach(([o, m]) => {
    n[o] = C(m);
  }), y(s).forEach(([o, m]) => {
    o in n ? l[o] = n[o] : o in c ? l[o] = c[o] : l[o] = o === d ? I(e, d) : m;
  }), l;
}, O = (e, ...s) => Object.assign(e, ...s), Ge = (e) => Object.keys(e), Ze = (e) => Object.values(e), $e = (e, s) => {
  const t = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return b(s) && O(t, s), t;
}, Ie = { passive: !0 }, Je = (e) => e.offsetHeight, Qe = (e, s) => {
  y(s).forEach(([t, a]) => {
    if (a && v(t) && t.includes("--"))
      e.style.setProperty(t, a);
    else {
      const n = {};
      n[t] = a, O(e.style, n);
    }
  });
}, M = (e) => b(e) && e.constructor.name === "Map" || !1, se = (e) => typeof e == "number" || !1, p = /* @__PURE__ */ new Map(), Ye = {
  set: (e, s, t, a) => {
    !u(e) || (a && a.length ? (p.has(e) || p.set(e, /* @__PURE__ */ new Map()), p.get(e).set(a, setTimeout(s, t))) : p.set(e, setTimeout(s, t)));
  },
  get: (e, s) => {
    if (!u(e))
      return null;
    const t = p.get(e);
    return s && t && M(t) ? t.get(s) || null : se(t) ? t : null;
  },
  clear: (e, s) => {
    if (!u(e))
      return;
    const t = p.get(e);
    s && s.length && M(t) ? (clearTimeout(t.get(s)), t.delete(s), t.size === 0 && p.delete(e)) : (clearTimeout(t), p.delete(e));
  }
}, te = (e, s) => {
  const { width: t, height: a, top: n, right: i, bottom: l, left: c } = e.getBoundingClientRect();
  let d = 1, o = 1;
  if (s && u(e)) {
    const { offsetWidth: m, offsetHeight: w } = e;
    d = m > 0 ? Math.round(t) / m : 1, o = w > 0 ? Math.round(a) / w : 1;
  }
  return {
    width: t / d,
    height: a / o,
    top: n / o,
    right: i / d,
    bottom: l / o,
    left: c / d,
    x: c / d,
    y: n / o
  };
}, Ke = (e) => g(e).body, P = (e) => g(e).documentElement, ae = (e) => r(e) && e.constructor.name === "ShadowRoot" || !1, Xe = (e) => e.nodeName === "HTML" ? e : u(e) && e.assignedSlot || r(e) && e.parentNode || ae(e) && e.host || P(e);
let F = 0, H = 0;
const f = /* @__PURE__ */ new Map(), ne = (e, s) => {
  let t = s ? F : H;
  if (s) {
    const a = ne(e), n = f.get(a) || /* @__PURE__ */ new Map();
    f.has(a) || f.set(a, n), M(n) && !n.has(s) ? (n.set(s, t), F += 1) : t = n.get(s);
  } else {
    const a = e.id || e;
    f.has(a) ? t = f.get(a) : (f.set(a, t), H += 1);
  }
  return t;
}, _e = (e) => {
  var s;
  return e ? B(e) ? e.defaultView : r(e) ? (s = e?.ownerDocument) == null ? void 0 : s.defaultView : e : window;
}, es = (e) => Array.isArray(e) || !1, ss = (e) => {
  if (!r(e))
    return !1;
  const { top: s, bottom: t } = te(e), { clientHeight: a } = P(e);
  return s <= a && t >= 0;
}, ts = (e) => typeof e == "function" || !1, as = (e) => r(e) && ["SVG", "Image", "Video", "Canvas"].some((s) => e.constructor.name.includes(s)) || !1, ns = (e) => b(e) && e.constructor.name === "NodeList" || !1, os = (e) => P(e).dir === "rtl", rs = (e) => r(e) && ["TABLE", "TD", "TH"].includes(e.nodeName) || !1, oe = (e, s) => e ? e.closest(s) || oe(e.getRootNode().host, s) : null, is = (e, s) => u(e) ? e : (r(s) ? s : g()).querySelector(e), ls = (e, s) => (r(s) ? s : g()).getElementsByTagName(e), cs = (e, s) => (r(s) ? s : g()).querySelectorAll(e), us = (e, s) => (s && r(s) ? s : g()).getElementsByClassName(
  e
), ds = (e, s) => e.matches(s);
export {
  _e as $,
  ue as A,
  qe as B,
  te as C,
  he as D,
  ie as E,
  J as F,
  Ye as G,
  Ue as H,
  Me as I,
  ke as J,
  je as K,
  ze as L,
  xe as M,
  Re as N,
  He as O,
  De as P,
  K as Q,
  Ie as R,
  Be as S,
  Le as T,
  Ge as U,
  Oe as V,
  $e as W,
  Ke as X,
  $ as Y,
  I as Z,
  me as _,
  v as a,
  le as a0,
  ce as a1,
  ts as a2,
  Y as a3,
  r as a4,
  as as a5,
  ne as a6,
  ee as a7,
  Ee as a8,
  we as a9,
  be as aa,
  Pe as ab,
  pe as ac,
  ge as ad,
  Se as ae,
  re as af,
  Xe as ag,
  ae as ah,
  rs as ai,
  ns as aj,
  es as ak,
  Q as al,
  ls as am,
  de as an,
  Ze as ao,
  ds as ap,
  k as b,
  g as c,
  oe as d,
  cs as e,
  ss as f,
  is as g,
  us as h,
  Je as i,
  Ae as j,
  Ve as k,
  Ne as l,
  ve as m,
  fe as n,
  _ as o,
  os as p,
  O as q,
  u as r,
  Te as s,
  Fe as t,
  ye as u,
  Ce as v,
  Qe as w,
  N as x,
  P as y,
  We as z
};
//# sourceMappingURL=shorty-f5e32a8f.js.map
