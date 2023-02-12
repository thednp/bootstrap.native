function er(t, n) {
  for (var s = 0; s < n.length; s++) {
    const o = n[s];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const a in o)
        if (a !== "default" && !(a in t)) {
          const r = Object.getOwnPropertyDescriptor(o, a);
          r && Object.defineProperty(t, a, r.get ? r : {
            enumerable: !0,
            get: () => o[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }));
}
var C = {};
(function(t) {
  Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
  const n = {}, s = (c) => {
    const { type: m, currentTarget: h } = c;
    [...n[m]].forEach(([p, v]) => {
      h === p && [...v].forEach(([E, S]) => {
        E.apply(p, [c]), typeof S == "object" && S.once && a(p, m, E, S);
      });
    });
  }, o = (c, m, h, p) => {
    n[m] || (n[m] = /* @__PURE__ */ new Map());
    const v = n[m];
    v.has(c) || v.set(c, /* @__PURE__ */ new Map());
    const E = v.get(c), { size: S } = E;
    E.set(h, p), S || c.addEventListener(m, s, p);
  }, a = (c, m, h, p) => {
    const v = n[m], E = v && v.get(c), S = E && E.get(h), B = S !== void 0 ? S : p;
    E && E.has(h) && E.delete(h), v && (!E || !E.size) && v.delete(c), (!v || !v.size) && delete n[m], (!E || !E.size) && c.removeEventListener(m, s, B);
  }, r = o, d = a;
  t.addListener = o, t.globalListener = s, t.off = d, t.on = r, t.registry = n, t.removeListener = a;
})(C);
const Nl = /* @__PURE__ */ er({
  __proto__: null,
  default: C
}, [C]);
var e = {};
(function(t) {
  Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
  const n = "aria-checked", s = "aria-description", o = "aria-describedby", a = "aria-expanded", r = "aria-haspopup", d = "aria-hidden", c = "aria-label", m = "aria-labelledby", h = "aria-modal", p = "aria-pressed", v = "aria-selected", E = "aria-valuemin", S = "aria-valuemax", B = "aria-valuenow", y = "aria-valuetext", N = "abort", R = "beforeunload", ae = "blur", U = "change", A = "contextmenu", K = "DOMContentLoaded", j = "DOMMouseScroll", I = "error", M = "focus", w = "focusin", re = "focusout", G = "gesturechange", $ = "gestureend", _ = "gesturestart", se = "keydown", he = "keypress", J = "keyup", Be = "load", le = "click", Ae = "dblclick", Re = "mousedown", oe = "mouseup", Z = "hover", ze = "mouseenter", ge = "mouseleave", fe = "mousein", ve = "mouseout", pe = "mouseover", De = "mousemove", We = "mousewheel", st = "move", xt = "orientationchange", en = "pointercancel", tn = "pointerdown", nn = "pointerleave", sn = "pointermove", on = "pointerup", an = "readystatechange", rn = "reset", ln = "resize", cn = "select", dn = "selectend", un = "selectstart", mn = "scroll", hn = "submit", gn = "touchstart", fn = "touchmove", vn = "touchcancel", pn = "touchend", En = "unload", ei = { DOMContentLoaded: K, DOMMouseScroll: j, abort: N, beforeunload: R, blur: ae, change: U, click: le, contextmenu: A, dblclick: Ae, error: I, focus: M, focusin: w, focusout: re, gesturechange: G, gestureend: $, gesturestart: _, hover: Z, keydown: se, keypress: he, keyup: J, load: Be, mousedown: Re, mousemove: De, mousein: fe, mouseout: ve, mouseenter: ze, mouseleave: ge, mouseover: pe, mouseup: oe, mousewheel: We, move: st, orientationchange: xt, pointercancel: en, pointerdown: tn, pointerleave: nn, pointermove: sn, pointerup: on, readystatechange: an, reset: rn, resize: ln, scroll: mn, select: cn, selectend: dn, selectstart: un, submit: hn, touchcancel: vn, touchend: pn, touchmove: fn, touchstart: gn, unload: En }, ti = "drag", ni = "dragstart", si = "dragenter", oi = "dragleave", ii = "dragover", ai = "dragend", ri = "loadstart", li = { start: "mousedown", end: "mouseup", move: "mousemove", cancel: "mouseleave" }, ci = { down: "mousedown", up: "mouseup" }, di = "onmouseleave" in document ? ["mouseenter", "mouseleave"] : ["mouseover", "mouseout"], ui = { start: "touchstart", end: "touchend", move: "touchmove", cancel: "touchcancel" }, mi = { in: "focusin", out: "focusout" }, hi = { Backspace: "Backspace", Tab: "Tab", Enter: "Enter", Shift: "Shift", Control: "Control", Alt: "Alt", Pause: "Pause", CapsLock: "CapsLock", Escape: "Escape", Scape: "Space", ArrowLeft: "ArrowLeft", ArrowUp: "ArrowUp", ArrowRight: "ArrowRight", ArrowDown: "ArrowDown", Insert: "Insert", Delete: "Delete", Meta: "Meta", ContextMenu: "ContextMenu", ScrollLock: "ScrollLock" }, gi = "Alt", fi = "ArrowDown", vi = "ArrowUp", pi = "ArrowLeft", Ei = "ArrowRight", bi = "Backspace", Ci = "CapsLock", yi = "Control", Ti = "Delete", wi = "Enter", Si = "Escape", Ai = "Insert", Di = "Meta", $i = "Pause", Hi = "ScrollLock", Li = "Shift", ki = "Space", Ii = "Tab", bn = "animationDuration", Cn = "animationDelay", yt = "animationName", ot = "animationend", yn = "transitionDuration", Tn = "transitionDelay", it = "transitionend", Tt = "transitionProperty", Pi = "addEventListener", Ni = "removeEventListener", Mi = { linear: "linear", easingSinusoidalIn: "cubic-bezier(0.47,0,0.745,0.715)", easingSinusoidalOut: "cubic-bezier(0.39,0.575,0.565,1)", easingSinusoidalInOut: "cubic-bezier(0.445,0.05,0.55,0.95)", easingQuadraticIn: "cubic-bezier(0.550,0.085,0.680,0.530)", easingQuadraticOut: "cubic-bezier(0.250,0.460,0.450,0.940)", easingQuadraticInOut: "cubic-bezier(0.455,0.030,0.515,0.955)", easingCubicIn: "cubic-bezier(0.55,0.055,0.675,0.19)", easingCubicOut: "cubic-bezier(0.215,0.61,0.355,1)", easingCubicInOut: "cubic-bezier(0.645,0.045,0.355,1)", easingQuarticIn: "cubic-bezier(0.895,0.03,0.685,0.22)", easingQuarticOut: "cubic-bezier(0.165,0.84,0.44,1)", easingQuarticInOut: "cubic-bezier(0.77,0,0.175,1)", easingQuinticIn: "cubic-bezier(0.755,0.05,0.855,0.06)", easingQuinticOut: "cubic-bezier(0.23,1,0.32,1)", easingQuinticInOut: "cubic-bezier(0.86,0,0.07,1)", easingExponentialIn: "cubic-bezier(0.95,0.05,0.795,0.035)", easingExponentialOut: "cubic-bezier(0.19,1,0.22,1)", easingExponentialInOut: "cubic-bezier(1,0,0,1)", easingCircularIn: "cubic-bezier(0.6,0.04,0.98,0.335)", easingCircularOut: "cubic-bezier(0.075,0.82,0.165,1)", easingCircularInOut: "cubic-bezier(0.785,0.135,0.15,0.86)", easingBackIn: "cubic-bezier(0.6,-0.28,0.735,0.045)", easingBackOut: "cubic-bezier(0.175,0.885,0.32,1.275)", easingBackInOut: "cubic-bezier(0.68,-0.55,0.265,1.55)" }, Oi = "offsetHeight", Bi = "offsetWidth", Ri = "scrollHeight", zi = "scrollWidth", Wi = "tabindex", qi = navigator.userAgentData, Ke = qi, { userAgent: ji } = navigator, Qe = ji, wn = /iPhone|iPad|iPod|Android/i;
  let wt = !1;
  Ke ? wt = Ke.brands.some((i) => wn.test(i.brand)) : wt = wn.test(Qe);
  const Fi = wt, Sn = /(iPhone|iPod|iPad)/, Vi = Ke ? Ke.brands.some((i) => Sn.test(i.brand)) : Sn.test(Qe), Ui = Qe ? Qe.includes("Firefox") : !1, { head: Xe } = document, Ki = ["webkitPerspective", "perspective"].some((i) => i in Xe.style), An = (i, l, u, g) => {
    const f = g || !1;
    i.addEventListener(l, u, f);
  }, Dn = (i, l, u, g) => {
    const f = g || !1;
    i.removeEventListener(l, u, f);
  }, $n = (i, l, u, g) => {
    const f = (D) => {
      (D.target === i || D.currentTarget === i) && (u.apply(i, [D]), Dn(i, l, f, g));
    };
    An(i, l, f, g);
  }, Hn = () => {
  }, Qi = (() => {
    let i = !1;
    try {
      const l = Object.defineProperty({}, "passive", { get: () => (i = !0, i) });
      $n(document, K, Hn, l);
    } catch {
    }
    return i;
  })(), Xi = ["webkitTransform", "transform"].some((i) => i in Xe.style), Yi = "ontouchstart" in window || "msMaxTouchPoints" in navigator, Gi = ["webkitAnimation", "animation"].some((i) => i in Xe.style), _i = ["webkitTransition", "transition"].some((i) => i in Xe.style), Ln = (i, l) => i.getAttribute(l), Ji = (i, l, u) => l.getAttributeNS(i, u), Zi = (i, l) => i.hasAttribute(l), xi = (i, l, u) => l.hasAttributeNS(i, u), St = (i, l, u) => i.setAttribute(l, u), ea = (i, l, u, g) => l.setAttributeNS(i, u, g), ta = (i, l) => i.removeAttribute(l), na = (i, l, u) => l.removeAttributeNS(i, u), sa = (i, ...l) => {
    i.classList.add(...l);
  }, oa = (i, ...l) => {
    i.classList.remove(...l);
  }, ia = (i, l) => i.classList.contains(l), { body: aa } = document, { documentElement: ra } = document, la = (i) => Array.from(i), ce = (i) => i != null && typeof i == "object" || !1, P = (i) => ce(i) && typeof i.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((l) => i.nodeType === l) || !1, z = (i) => P(i) && i.nodeType === 1 || !1, Ye = /* @__PURE__ */ new Map(), at = { set: (i, l, u) => {
    z(i) && (Ye.has(l) || Ye.set(l, /* @__PURE__ */ new Map()), Ye.get(l).set(i, u));
  }, getAllFor: (i) => Ye.get(i) || null, get: (i, l) => {
    if (!z(i) || !l)
      return null;
    const u = at.getAllFor(l);
    return i && u && u.get(i) || null;
  }, remove: (i, l) => {
    const u = at.getAllFor(l);
    !u || !z(i) || (u.delete(i), u.size === 0 && Ye.delete(l));
  } }, ca = (i, l) => at.get(i, l), de = (i) => typeof i == "string" || !1, At = (i) => ce(i) && i.constructor.name === "Window" || !1, Dt = (i) => P(i) && i.nodeType === 9 || !1, x = (i) => At(i) ? i.document : Dt(i) ? i : P(i) ? i.ownerDocument : window.document, $e = (i) => Object.entries(i), kn = (i) => {
    if (!i)
      return;
    if (de(i))
      return x().createElement(i);
    const { tagName: l } = i, u = kn(l);
    if (!u)
      return;
    const g = { ...i };
    return delete g.tagName, $e(g).forEach(([f, D]) => {
      de(f) && de(D) && St(u, f, D);
    }), u;
  }, In = (i, l) => {
    if (!i || !l)
      return;
    if (de(l))
      return x().createElementNS(i, l);
    const { tagName: u } = l, g = In(i, u);
    if (!g)
      return;
    const f = { ...l };
    return delete f.tagName, $e(f).forEach(([D, k]) => {
      de(D) && de(k) && St(g, D, k);
    }), g;
  }, $t = (i, l) => i.dispatchEvent(l), da = (i, l, u) => u.indexOf(i) === l, ue = (i, l) => {
    const u = getComputedStyle(i), g = l.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
    return u.getPropertyValue(g);
  }, Pn = (i) => {
    const l = ue(i, yt), u = ue(i, Cn), g = u.includes("ms") ? 1 : 1e3, f = l && l !== "none" ? parseFloat(u) * g : 0;
    return Number.isNaN(f) ? 0 : f;
  }, Nn = (i) => {
    const l = ue(i, yt), u = ue(i, bn), g = u.includes("ms") ? 1 : 1e3, f = l && l !== "none" ? parseFloat(u) * g : 0;
    return Number.isNaN(f) ? 0 : f;
  }, ua = (i, l) => {
    let u = 0;
    const g = new Event(ot), f = Nn(i), D = Pn(i);
    if (f) {
      const k = (Q) => {
        Q.target === i && (l.apply(i, [Q]), i.removeEventListener(ot, k), u = 1);
      };
      i.addEventListener(ot, k), setTimeout(() => {
        u || $t(i, g);
      }, f + D + 17);
    } else
      l.apply(i, [g]);
  }, Mn = (i) => {
    const l = ue(i, Tt), u = ue(i, Tn), g = u.includes("ms") ? 1 : 1e3, f = l && l !== "none" ? parseFloat(u) * g : 0;
    return Number.isNaN(f) ? 0 : f;
  }, On = (i) => {
    const l = ue(i, Tt), u = ue(i, yn), g = u.includes("ms") ? 1 : 1e3, f = l && l !== "none" ? parseFloat(u) * g : 0;
    return Number.isNaN(f) ? 0 : f;
  }, ma = (i, l) => {
    let u = 0;
    const g = new Event(it), f = On(i), D = Mn(i);
    if (f) {
      const k = (Q) => {
        Q.target === i && (l.apply(i, [Q]), i.removeEventListener(it, k), u = 1);
      };
      i.addEventListener(it, k), setTimeout(() => {
        u || $t(i, g);
      }, f + D + 17);
    } else
      l.apply(i, [g]);
  }, ha = (i) => Float32Array.from(Array.from(i)), ga = (i) => Float64Array.from(Array.from(i)), fa = (i, l) => i.focus(l), Ht = (i) => ["true", !0].includes(i) ? !0 : ["false", !1].includes(i) ? !1 : ["null", "", null, void 0].includes(i) ? null : i !== "" && !Number.isNaN(+i) ? +i : i, Bn = (i) => i.toLowerCase(), va = (i, l, u, g) => {
    const f = { ...u }, D = { ...i.dataset }, k = { ...l }, Q = {}, be = "title";
    return $e(D).forEach(([H, Ce]) => {
      const lt = g && typeof H == "string" && H.includes(g) ? H.replace(g, "").replace(/[A-Z]/g, (xa) => Bn(xa)) : H;
      Q[lt] = Ht(Ce);
    }), $e(f).forEach(([H, Ce]) => {
      f[H] = Ht(Ce);
    }), $e(l).forEach(([H, Ce]) => {
      H in f ? k[H] = f[H] : H in Q ? k[H] = Q[H] : k[H] = H === be ? Ln(i, be) : Ce;
    }), k;
  }, Lt = (i, ...l) => Object.assign(i, ...l), pa = (i, l) => ce(i) && (Object.hasOwn(i, l) || l in i), Ea = (i) => Object.keys(i), ba = (i) => Object.values(i), Ca = (i, l) => {
    const u = new CustomEvent(i, { cancelable: !0, bubbles: !0 });
    return ce(l) && Lt(u, l), u;
  }, ya = { passive: !0 }, Ta = (i) => i.offsetHeight, wa = (i, l) => {
    $e(l).forEach(([u, g]) => {
      if (g && de(u) && u.includes("--"))
        i.style.setProperty(u, g);
      else {
        const f = {};
        f[u] = g, Lt(i.style, f);
      }
    });
  }, rt = (i) => ce(i) && i.constructor.name === "Map" || !1, Rn = (i) => typeof i == "number" || !1, Ee = /* @__PURE__ */ new Map(), Sa = { set: (i, l, u, g) => {
    !z(i) || (g && g.length ? (Ee.has(i) || Ee.set(i, /* @__PURE__ */ new Map()), Ee.get(i).set(g, setTimeout(l, u))) : Ee.set(i, setTimeout(l, u)));
  }, get: (i, l) => {
    if (!z(i))
      return null;
    const u = Ee.get(i);
    return l && u && rt(u) ? u.get(l) || null : Rn(u) ? u : null;
  }, clear: (i, l) => {
    if (!z(i))
      return;
    const u = Ee.get(i);
    l && l.length && rt(u) ? (clearTimeout(u.get(l)), u.delete(l), u.size === 0 && Ee.delete(i)) : (clearTimeout(u), Ee.delete(i));
  } }, Aa = (i) => i.toUpperCase(), qe = (i, l) => {
    const { width: u, height: g, top: f, right: D, bottom: k, left: Q } = i.getBoundingClientRect();
    let be = 1, H = 1;
    if (l && z(i)) {
      const { offsetWidth: Ce, offsetHeight: lt } = i;
      be = Ce > 0 ? Math.round(u) / Ce : 1, H = lt > 0 ? Math.round(g) / lt : 1;
    }
    return { width: u / be, height: g / H, top: f / H, right: D / be, bottom: k / H, left: Q / be, x: Q / be, y: f / H };
  }, Da = (i) => x(i).body, Ge = (i) => x(i).documentElement, $a = (i) => x(i).head, Ha = (i) => {
    const l = At(i), u = l ? i.scrollX : i.scrollLeft, g = l ? i.scrollY : i.scrollTop;
    return { x: u, y: g };
  }, zn = (i) => P(i) && i.constructor.name === "ShadowRoot" || !1, La = (i) => i.nodeName === "HTML" ? i : z(i) && i.assignedSlot || P(i) && i.parentNode || zn(i) && i.host || Ge(i), Wn = (i) => {
    if (!z(i))
      return !1;
    const { width: l, height: u } = qe(i), { offsetWidth: g, offsetHeight: f } = i;
    return Math.round(l) !== g || Math.round(u) !== f;
  }, ka = (i, l, u) => {
    const g = z(l), f = qe(i, g && Wn(l)), D = { x: 0, y: 0 };
    if (g) {
      const k = qe(l, !0);
      D.x = k.x + l.clientLeft, D.y = k.y + l.clientTop;
    }
    return { x: f.left + u.x - D.x, y: f.top + u.y - D.y, width: f.width, height: f.height };
  };
  let qn = 0, jn = 0;
  const je = /* @__PURE__ */ new Map(), Fn = (i, l) => {
    let u = l ? qn : jn;
    if (l) {
      const g = Fn(i), f = je.get(g) || /* @__PURE__ */ new Map();
      je.has(g) || je.set(g, f), rt(f) && !f.has(l) ? (f.set(l, u), qn += 1) : u = f.get(l);
    } else {
      const g = i.id || i;
      je.has(g) ? u = je.get(g) : (je.set(g, u), jn += 1);
    }
    return u;
  }, Ia = (i) => {
    var l;
    return i ? Dt(i) ? i.defaultView : P(i) ? (l = i?.ownerDocument) == null ? void 0 : l.defaultView : i : window;
  }, Vn = (i) => Array.isArray(i) || !1, Pa = (i) => P(i) && i.nodeName === "CANVAS" || !1, Un = (i) => z(i) && !!i.shadowRoot || !1, Na = (i) => P(i) && [1, 2, 3, 4, 5, 6, 7, 8].some((l) => i.nodeType === l) || !1, Ma = (i) => {
    if (!P(i))
      return !1;
    const { top: l, bottom: u } = qe(i), { clientHeight: g } = Ge(i);
    return l <= g && u >= 0;
  }, Oa = (i) => {
    if (!P(i))
      return !1;
    const { clientWidth: l, clientHeight: u } = Ge(i), { top: g, left: f, bottom: D, right: k } = qe(i, !0);
    return g >= 0 && f >= 0 && D <= u && k <= l;
  }, Ba = (i) => Vn(i) && i.every(z) || !1, Ra = (i) => typeof i == "function" || !1, za = (i) => ce(i) && i.constructor.name === "HTMLCollection" || !1, Wa = (i) => z(i) && i.tagName === "IMG" || !1, qa = (i) => {
    if (!de(i))
      return !1;
    try {
      JSON.parse(i);
    } catch {
      return !1;
    }
    return !0;
  }, ja = (i) => ce(i) && i.constructor.name === "WeakMap" || !1, Fa = (i) => P(i) && ["SVG", "Image", "Video", "Canvas"].some((l) => i.constructor.name.includes(l)) || !1, Va = (i) => ce(i) && i.constructor.name === "NodeList" || !1, Ua = (i) => Ge(i).dir === "rtl", Ka = (i) => P(i) && i.constructor.name.includes("SVG") || !1, Qa = (i) => P(i) && ["TABLE", "TD", "TH"].includes(i.nodeName) || !1, Kn = (i, l) => i ? i.closest(l) || Kn(i.getRootNode().host, l) : null, Xa = (i, l) => z(i) ? i : (P(l) ? l : x()).querySelector(i), Qn = (i, l) => (P(l) ? l : x()).getElementsByTagName(i), Ya = (i) => [...Qn("*", i)].filter(Un), Ga = (i, l) => x(l).getElementById(i) || null, _a = (i, l) => (P(l) ? l : x()).querySelectorAll(i), Ja = (i, l) => (l && P(l) ? l : x()).getElementsByClassName(i), Za = (i, l) => i.matches(l);
  t.ArrayFrom = la, t.DOMContentLoadedEvent = K, t.DOMMouseScrollEvent = j, t.Data = at, t.Float32ArrayFrom = ha, t.Float64ArrayFrom = ga, t.ObjectAssign = Lt, t.ObjectEntries = $e, t.ObjectHasOwn = pa, t.ObjectKeys = Ea, t.ObjectValues = ba, t.Timer = Sa, t.abortEvent = N, t.addClass = sa, t.addEventListener = Pi, t.animationDelay = Cn, t.animationDuration = bn, t.animationEndEvent = ot, t.animationName = yt, t.ariaChecked = n, t.ariaDescribedBy = o, t.ariaDescription = s, t.ariaExpanded = a, t.ariaHasPopup = r, t.ariaHidden = d, t.ariaLabel = c, t.ariaLabelledBy = m, t.ariaModal = h, t.ariaPressed = p, t.ariaSelected = v, t.ariaValueMax = S, t.ariaValueMin = E, t.ariaValueNow = B, t.ariaValueText = y, t.beforeunloadEvent = R, t.bezierEasings = Mi, t.blurEvent = ae, t.changeEvent = U, t.closest = Kn, t.contextmenuEvent = A, t.createCustomEvent = Ca, t.createElement = kn, t.createElementNS = In, t.dispatchEvent = $t, t.distinct = da, t.documentBody = aa, t.documentElement = ra, t.documentHead = Xe, t.dragEvent = ti, t.dragendEvent = ai, t.dragenterEvent = si, t.dragleaveEvent = oi, t.dragoverEvent = ii, t.dragstartEvent = ni, t.emulateAnimationEnd = ua, t.emulateTransitionEnd = ma, t.errorEvent = I, t.focus = fa, t.focusEvent = M, t.focusEvents = mi, t.focusinEvent = w, t.focusoutEvent = re, t.gesturechangeEvent = G, t.gestureendEvent = $, t.gesturestartEvent = _, t.getAttribute = Ln, t.getAttributeNS = Ji, t.getBoundingClientRect = qe, t.getCustomElements = Ya, t.getDocument = x, t.getDocumentBody = Da, t.getDocumentElement = Ge, t.getDocumentHead = $a, t.getElementAnimationDelay = Pn, t.getElementAnimationDuration = Nn, t.getElementById = Ga, t.getElementStyle = ue, t.getElementTransitionDelay = Mn, t.getElementTransitionDuration = On, t.getElementsByClassName = Ja, t.getElementsByTagName = Qn, t.getInstance = ca, t.getNodeScroll = Ha, t.getParentNode = La, t.getRectRelativeToOffsetParent = ka, t.getUID = Fn, t.getWindow = Ia, t.hasAttribute = Zi, t.hasAttributeNS = xi, t.hasClass = ia, t.isApple = Vi, t.isArray = Vn, t.isCanvas = Pa, t.isCustomElement = Un, t.isDocument = Dt, t.isElement = Na, t.isElementInScrollRange = Ma, t.isElementInViewport = Oa, t.isElementsArray = Ba, t.isFirefox = Ui, t.isFunction = Ra, t.isHTMLCollection = za, t.isHTMLElement = z, t.isHTMLImageElement = Wa, t.isJSON = qa, t.isMap = rt, t.isMedia = Fa, t.isMobile = Fi, t.isNode = P, t.isNodeList = Va, t.isNumber = Rn, t.isObject = ce, t.isRTL = Ua, t.isSVGElement = Ka, t.isScaledElement = Wn, t.isShadowRoot = zn, t.isString = de, t.isTableElement = Qa, t.isWeakMap = ja, t.isWindow = At, t.keyAlt = gi, t.keyArrowDown = fi, t.keyArrowLeft = pi, t.keyArrowRight = Ei, t.keyArrowUp = vi, t.keyBackspace = bi, t.keyCapsLock = Ci, t.keyControl = yi, t.keyDelete = Ti, t.keyEnter = wi, t.keyEscape = Si, t.keyInsert = Ai, t.keyMeta = Di, t.keyPause = $i, t.keyScrollLock = Hi, t.keyShift = Li, t.keySpace = ki, t.keyTab = Ii, t.keyboardEventKeys = hi, t.keydownEvent = se, t.keypressEvent = he, t.keyupEvent = J, t.loadEvent = Be, t.loadstartEvent = ri, t.matches = Za, t.mouseClickEvents = ci, t.mouseHoverEvents = di, t.mouseSwipeEvents = li, t.mouseclickEvent = le, t.mousedblclickEvent = Ae, t.mousedownEvent = Re, t.mouseenterEvent = ze, t.mousehoverEvent = Z, t.mouseinEvent = fe, t.mouseleaveEvent = ge, t.mousemoveEvent = De, t.mouseoutEvent = ve, t.mouseoverEvent = pe, t.mouseupEvent = oe, t.mousewheelEvent = We, t.moveEvent = st, t.nativeEvents = ei, t.noop = Hn, t.normalizeOptions = va, t.normalizeValue = Ht, t.off = Dn, t.offsetHeight = Oi, t.offsetWidth = Bi, t.on = An, t.one = $n, t.orientationchangeEvent = xt, t.passiveHandler = ya, t.pointercancelEvent = en, t.pointerdownEvent = tn, t.pointerleaveEvent = nn, t.pointermoveEvent = sn, t.pointerupEvent = on, t.querySelector = Xa, t.querySelectorAll = _a, t.readystatechangeEvent = an, t.reflow = Ta, t.removeAttribute = ta, t.removeAttributeNS = na, t.removeClass = oa, t.removeEventListener = Ni, t.resetEvent = rn, t.resizeEvent = ln, t.scrollEvent = mn, t.scrollHeight = Ri, t.scrollWidth = zi, t.selectEvent = cn, t.selectendEvent = dn, t.selectstartEvent = un, t.setAttribute = St, t.setAttributeNS = ea, t.setElementStyle = wa, t.submitEvent = hn, t.support3DTransform = Ki, t.supportAnimation = Gi, t.supportPassive = Qi, t.supportTouch = Yi, t.supportTransform = Xi, t.supportTransition = _i, t.tabindex = Wi, t.toLowerCase = Bn, t.toUpperCase = Aa, t.touchEvents = ui, t.touchcancelEvent = vn, t.touchendEvent = pn, t.touchmoveEvent = fn, t.touchstartEvent = gn, t.transitionDelay = Tn, t.transitionDuration = yn, t.transitionEndEvent = it, t.transitionProperty = Tt, t.unloadEvent = En, t.userAgent = Qe, t.userAgentData = Ke;
})(e);
const O = "fade", b = "show", ft = "data-bs-dismiss", vt = "alert", Gs = "Alert", tr = "5.0.0-alpha8", nr = tr;
class ne {
  element;
  options;
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(n, s) {
    const o = e.querySelector(n);
    if (!o)
      throw e.isString(n) ? Error(`${this.name} Error: "${n}" is not a valid selector.`) : Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
    const a = e.Data.get(o, this.name);
    a && a.dispose(), this.element = o, this.defaults && e.ObjectKeys(this.defaults).length && (this.options = e.normalizeOptions(o, this.defaults, s || {}, "bs")), e.Data.set(o, this.name, this);
  }
  /* istanbul ignore next */
  get version() {
    return nr;
  }
  /* istanbul ignore next */
  get name() {
    return "BaseComponent";
  }
  /* istanbul ignore next */
  get defaults() {
    return {};
  }
  /**
   * Removes component from target element;
   */
  dispose() {
    e.Data.remove(this.element, this.name), e.ObjectKeys(this).forEach((n) => {
      delete this[n];
    });
  }
}
const Xn = `.${vt}`, sr = `[${ft}="${vt}"]`, Yn = (t) => e.getInstance(t, Gs), or = (t) => new _s(t), Gn = e.createCustomEvent(`close.bs.${vt}`), ir = e.createCustomEvent(`closed.bs.${vt}`), _n = (t) => {
  const { element: n } = t;
  zt(t), e.dispatchEvent(n, ir), t.dispose(), n.remove();
}, zt = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { dismiss: o } = t;
  o && s(o, e.mouseclickEvent, t.close);
};
class _s extends ne {
  static selector = Xn;
  static init = or;
  static getInstance = Yn;
  dismiss;
  constructor(n) {
    super(n), this.dismiss = e.querySelector(sr, this.element), zt(this, !0);
  }
  /** Returns component name string. */
  get name() {
    return Gs;
  }
  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   *
   * @param e the `click` event
   */
  close(n) {
    const s = n ? Yn(e.closest(n.target, Xn)) : this, { element: o } = s;
    if (o && e.hasClass(o, b)) {
      if (e.dispatchEvent(o, Gn), Gn.defaultPrevented)
        return;
      e.removeClass(o, b), e.hasClass(o, O) ? e.emulateTransitionEnd(o, () => _n(s)) : _n(s);
    }
  }
  /** Remove the component from target element. */
  dispose() {
    zt(this), super.dispose();
  }
}
const T = "active", F = "data-bs-toggle", ar = "button", Js = "Button", rr = `[${F}="${ar}"]`, Jn = (t) => e.getInstance(t, Js), lr = (t) => new Zs(t), Zn = (t, n) => {
  (n ? C.addListener : C.removeListener)(t.element, e.mouseclickEvent, t.toggle);
};
class Zs extends ne {
  static selector = rr;
  static init = lr;
  static getInstance = Jn;
  isActive = !1;
  /**
   * @param target usually a `.btn` element
   */
  constructor(n) {
    super(n);
    const { element: s } = this;
    this.isActive = e.hasClass(s, T), e.setAttribute(s, e.ariaPressed, String(!!this.isActive)), Zn(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Js;
  }
  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle(n) {
    n && n.preventDefault();
    const s = n ? Jn(n.target) : this;
    if (!s.element)
      return;
    const { element: o, isActive: a } = s;
    if (e.hasClass(o, "disabled"))
      return;
    (a ? e.removeClass : e.addClass)(o, T), e.setAttribute(o, e.ariaPressed, a ? "false" : "true"), s.isActive = e.hasClass(o, T);
  }
  /** Removes the `Button` component from the target element. */
  dispose() {
    Zn(this), super.dispose();
  }
}
const Wt = "data-bs-target", ke = "carousel", xs = "Carousel", xn = "data-bs-parent", cr = "data-bs-container", W = (t) => {
  const n = [Wt, xn, cr, "href"], s = e.getDocument(t);
  return n.map((o) => {
    const a = e.getAttribute(t, o);
    return a ? o === xn ? e.closest(t, a) : e.querySelector(a, s) : null;
  }).filter((o) => o)[0];
}, tt = `[data-bs-ride="${ke}"]`, ee = `${ke}-item`, qt = "data-bs-slide-to", Te = "data-bs-slide", we = "paused", es = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, ie = (t) => e.getInstance(t, xs), dr = (t) => new to(t);
let He = 0, Fe = 0, _e = 0;
const kt = e.createCustomEvent(`slide.bs.${ke}`), jt = e.createCustomEvent(`slid.bs.${ke}`), ur = (t) => {
  const { index: n, direction: s, element: o, slides: a, options: r } = t;
  if (t.isAnimating && ie(o)) {
    const d = Ft(t), c = s === "left" ? "next" : "prev", m = s === "left" ? "start" : "end";
    e.addClass(a[n], T), e.removeClass(a[n], `${ee}-${c}`), e.removeClass(a[n], `${ee}-${m}`), e.removeClass(a[d], T), e.removeClass(a[d], `${ee}-${m}`), e.dispatchEvent(o, jt), e.Timer.clear(o, Te), !e.getDocument(o).hidden && r.interval && !t.isPaused && t.cycle();
  }
};
function mr() {
  const t = ie(this);
  t && !t.isPaused && !e.Timer.get(this, we) && e.addClass(this, we);
}
function hr() {
  const t = ie(this);
  t && t.isPaused && !e.Timer.get(this, we) && t.cycle();
}
function gr(t) {
  t.preventDefault();
  const n = e.closest(this, tt) || W(this), s = ie(n);
  if (!s || s.isAnimating)
    return;
  const o = +(e.getAttribute(this, qt) || /* istanbul ignore next */
  0);
  this && !e.hasClass(this, T) && // event target is not active
  !Number.isNaN(o) && s.to(o);
}
function fr(t) {
  t.preventDefault();
  const n = e.closest(this, tt) || W(this), s = ie(n);
  if (!s || s.isAnimating)
    return;
  const o = e.getAttribute(this, Te);
  o === "next" ? s.next() : o === "prev" && s.prev();
}
const vr = ({ code: t, target: n }) => {
  const s = e.getDocument(n), [o] = [...e.querySelectorAll(tt, s)].filter((m) => e.isElementInScrollRange(m)), a = ie(o);
  if (!a || a.isAnimating || /textarea|input/i.test(n.nodeName))
    return;
  const r = e.isRTL(o), d = r ? e.keyArrowLeft : e.keyArrowRight, c = r ? e.keyArrowRight : e.keyArrowLeft;
  t === c ? a.prev() : t === d && a.next();
};
function ts(t) {
  const { target: n } = t, s = ie(this);
  s && s.isTouch && (s.indicator && !s.indicator.contains(n) || !s.controls.includes(n)) && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
}
function pr(t) {
  const { target: n } = t, s = ie(this);
  if (!s || s.isAnimating || s.isTouch)
    return;
  const { controls: o, indicators: a } = s;
  [...o, ...a].some((r) => r === n || r.contains(n)) || (He = t.pageX, this.contains(n) && (s.isTouch = !0, eo(s, !0)));
}
const Er = (t) => {
  Fe = t.pageX;
}, br = (t) => {
  const { target: n } = t, s = e.getDocument(n), o = [...e.querySelectorAll(tt, s)].map((c) => ie(c)).find((c) => c.isTouch);
  if (!o)
    return;
  const { element: a, index: r } = o, d = e.isRTL(a);
  if (o.isTouch = !1, eo(o), s.getSelection()?.toString().length) {
    He = 0, Fe = 0, _e = 0;
    return;
  }
  if (_e = t.pageX, !a.contains(n) || Math.abs(He - _e) < 120) {
    He = 0, Fe = 0, _e = 0;
    return;
  }
  Fe < He ? o.to(r + (d ? -1 : 1)) : Fe > He && o.to(r + (d ? 1 : -1)), He = 0, Fe = 0, _e = 0;
}, It = (t, n) => {
  const { indicators: s } = t;
  [...s].forEach((o) => e.removeClass(o, T)), t.indicators[n] && e.addClass(s[n], T);
}, eo = (t, n) => {
  const { element: s } = t, o = n ? C.addListener : C.removeListener;
  o(e.getDocument(s), e.pointermoveEvent, Er, e.passiveHandler), o(e.getDocument(s), e.pointerupEvent, br, e.passiveHandler);
}, ns = (t, n) => {
  const { element: s, options: o, slides: a, controls: r, indicators: d } = t, { touch: c, pause: m, interval: h, keyboard: p } = o, v = n ? C.addListener : C.removeListener;
  m && h && (v(s, e.mouseenterEvent, mr), v(s, e.mouseleaveEvent, hr)), c && a.length > 2 && (v(s, e.pointerdownEvent, pr, e.passiveHandler), v(s, e.touchstartEvent, ts, { passive: !1 }), v(s, e.dragstartEvent, ts, { passive: !1 })), r.length && r.forEach((E) => {
    E && v(E, e.mouseclickEvent, fr);
  }), d.length && d.forEach((E) => {
    v(E, e.mouseclickEvent, gr);
  }), p && v(e.getDocument(s), e.keydownEvent, vr);
}, Ft = (t) => {
  const { slides: n, element: s } = t, o = e.querySelector(`.${ee}.${T}`, s);
  return e.isHTMLElement(o) ? [...n].indexOf(o) : -1;
};
class to extends ne {
  static selector = tt;
  static init = dr;
  static getInstance = ie;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o } = this;
    this.direction = e.isRTL(o) ? "right" : "left", this.index = 0, this.isTouch = !1, this.slides = e.getElementsByClassName(ee, o);
    const { slides: a } = this;
    if (a.length < 2)
      return;
    const r = e.getDocument(o);
    this.controls = [
      ...e.querySelectorAll(`[${Te}]`, o),
      ...e.querySelectorAll(`[${Te}][${Wt}="#${o.id}"]`, r)
    ], this.indicator = e.querySelector(`.${ke}-indicators`, o), this.indicators = [
      ...this.indicator ? e.querySelectorAll(`[${qt}]`, this.indicator) : [],
      ...e.querySelectorAll(`[${qt}][${Wt}="#${o.id}"]`, r)
    ];
    const { options: d } = this;
    this.options.interval = d.interval === !0 ? es.interval : d.interval, Ft(this) < 0 && (e.addClass(a[0], T), this.indicators.length && It(this, 0)), ns(this, !0), d.interval && this.cycle();
  }
  /**
   * Returns component name string.
   */
  get name() {
    return xs;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return es;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return e.hasClass(this.element, we);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return e.querySelector(`.${ee}-next,.${ee}-prev`, this.element) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element: n, options: s, isPaused: o, index: a } = this;
    e.Timer.clear(n, ke), o && (e.Timer.clear(n, we), e.removeClass(n, we)), e.Timer.set(
      n,
      () => {
        this.element && !this.isPaused && !this.isTouch && e.isElementInScrollRange(n) && this.to(a + 1);
      },
      s.interval,
      ke
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element: n, options: s } = this;
    !this.isPaused && s.interval && (e.addClass(n, we), e.Timer.set(
      n,
      () => {
      },
      1,
      we
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
  to(n) {
    const { element: s, slides: o, options: a } = this, r = Ft(this), d = e.isRTL(s);
    let c = n;
    if (this.isAnimating || r === c || e.Timer.get(s, Te))
      return;
    r < c || r === 0 && c === o.length - 1 ? this.direction = d ? "right" : "left" : (r > c || r === o.length - 1 && c === 0) && (this.direction = d ? "left" : "right");
    const { direction: m } = this;
    c < 0 ? c = o.length - 1 : c >= o.length && (c = 0);
    const h = m === "left" ? "next" : "prev", p = m === "left" ? "start" : "end", v = {
      relatedTarget: o[c],
      from: r,
      to: c,
      direction: m
    };
    e.ObjectAssign(kt, v), e.ObjectAssign(jt, v), e.dispatchEvent(s, kt), !kt.defaultPrevented && (this.index = c, It(this, c), e.getElementTransitionDuration(o[c]) && e.hasClass(s, "slide") ? e.Timer.set(
      s,
      () => {
        e.addClass(o[c], `${ee}-${h}`), e.reflow(o[c]), e.addClass(o[c], `${ee}-${p}`), e.addClass(o[r], `${ee}-${p}`), e.emulateTransitionEnd(o[c], () => ur(this));
      },
      0,
      Te
    ) : (e.addClass(o[c], T), e.removeClass(o[r], T), e.Timer.set(
      s,
      () => {
        e.Timer.clear(s, Te), s && a.interval && !this.isPaused && this.cycle(), e.dispatchEvent(s, jt);
      },
      0,
      Te
    )));
  }
  /** Remove `Carousel` component from target. */
  dispose() {
    const { slides: n } = this, s = ["start", "end", "prev", "next"];
    [...n].forEach((o, a) => {
      e.hasClass(o, T) && It(this, a), s.forEach((r) => e.removeClass(o, `${ee}-${r}`));
    }), ns(this), super.dispose();
  }
}
const Ne = "collapsing", q = "collapse", no = "Collapse", Cr = `.${q}`, so = `[${F}="${q}"]`, yr = { parent: null }, ct = (t) => e.getInstance(t, no), Tr = (t) => new oo(t), ss = e.createCustomEvent(`show.bs.${q}`), wr = e.createCustomEvent(`shown.bs.${q}`), os = e.createCustomEvent(`hide.bs.${q}`), Sr = e.createCustomEvent(`hidden.bs.${q}`), Ar = (t) => {
  const { element: n, parent: s, triggers: o } = t;
  e.dispatchEvent(n, ss), !ss.defaultPrevented && (e.Timer.set(n, e.noop, 17), s && e.Timer.set(s, e.noop, 17), e.addClass(n, Ne), e.removeClass(n, q), e.setElementStyle(n, { height: `${n.scrollHeight}px` }), e.emulateTransitionEnd(n, () => {
    e.Timer.clear(n), s && e.Timer.clear(s), o.forEach((a) => e.setAttribute(a, e.ariaExpanded, "true")), e.removeClass(n, Ne), e.addClass(n, q), e.addClass(n, b), e.setElementStyle(n, { height: "" }), e.dispatchEvent(n, wr);
  }));
}, is = (t) => {
  const { element: n, parent: s, triggers: o } = t;
  e.dispatchEvent(n, os), !os.defaultPrevented && (e.Timer.set(n, e.noop, 17), s && e.Timer.set(s, e.noop, 17), e.setElementStyle(n, { height: `${n.scrollHeight}px` }), e.removeClass(n, q), e.removeClass(n, b), e.addClass(n, Ne), e.reflow(n), e.setElementStyle(n, { height: "0px" }), e.emulateTransitionEnd(n, () => {
    e.Timer.clear(n), s && e.Timer.clear(s), o.forEach((a) => e.setAttribute(a, e.ariaExpanded, "false")), e.removeClass(n, Ne), e.addClass(n, q), e.setElementStyle(n, { height: "" }), e.dispatchEvent(n, Sr);
  }));
}, as = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { triggers: o } = t;
  o.length && o.forEach((a) => s(a, e.mouseclickEvent, Dr));
}, Dr = (t) => {
  const { target: n } = t, s = n && e.closest(n, so), o = s && W(s), a = o && ct(o);
  a && a.toggle(), s && s.tagName === "A" && t.preventDefault();
};
class oo extends ne {
  static selector = Cr;
  static init = Tr;
  static getInstance = ct;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o, options: a } = this, r = e.getDocument(o);
    this.triggers = [...e.querySelectorAll(so, r)].filter((d) => W(d) === o), this.parent = e.querySelector(a.parent, r) || W(o) || null, this.parent = W(o) || null, as(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return no;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return yr;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Toggles the visibility of the collapse. */
  toggle() {
    e.hasClass(this.element, b) ? this.hide() : this.show();
  }
  /** Hides the collapse. */
  hide() {
    const { triggers: n, element: s } = this;
    e.Timer.get(s) || (is(this), n.length && n.forEach((o) => e.addClass(o, `${q}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element: n, parent: s, triggers: o } = this;
    let a, r;
    s && (a = [...e.querySelectorAll(`.${q}.${b}`, s)].find(
      (d) => ct(d)
    ), r = a && ct(a)), (!s || !e.Timer.get(s)) && !e.Timer.get(n) && (r && a !== n && (is(r), r.triggers.forEach((d) => {
      e.addClass(d, `${q}d`);
    })), Ar(this), o.length && o.forEach((d) => e.removeClass(d, `${q}d`)));
  }
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    as(this), super.dispose();
  }
}
const Me = ["dropdown", "dropup", "dropstart", "dropend"], io = "Dropdown", ao = "dropdown-menu", ro = (t) => {
  const n = e.closest(t, "A");
  return t.tagName === "A" && // anchor href starts with #
  e.hasAttribute(t, "href") && t.href.slice(-1) === "#" || // OR a child of an anchor with href starts with #
  n && e.hasAttribute(n, "href") && n.href.slice(-1) === "#";
}, [te, mt, ht, gt] = Me, Kt = `[${F}="${te}"],[${F}="${mt}"],[${F}="${gt}"],[${F}="${ht}"]`, Ve = (t) => e.getInstance(t, io), $r = (t) => new uo(t), Hr = `${ao}-end`, rs = [te, mt], ls = [ht, gt], cs = ["A", "BUTTON"], Lr = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, Pt = e.createCustomEvent(`show.bs.${te}`), ds = e.createCustomEvent(`shown.bs.${te}`), Nt = e.createCustomEvent(`hide.bs.${te}`), us = e.createCustomEvent(`hidden.bs.${te}`), lo = e.createCustomEvent(`updated.bs.${te}`), co = (t) => {
  const { element: n, menu: s, parentElement: o, options: a } = t, { offset: r } = a;
  if (e.getElementStyle(s, "position") === "static")
    return;
  const d = e.isRTL(n), c = e.hasClass(s, Hr);
  ["margin", "top", "bottom", "left", "right"].forEach(($) => {
    const _ = {};
    _[$] = "", e.setElementStyle(s, _);
  });
  let h = Me.find(($) => e.hasClass(o, $)) || /* istanbul ignore next: fallback position */
  te;
  const p = {
    dropdown: [r, 0, 0],
    dropup: [0, 0, r],
    dropstart: d ? [-1, 0, 0, r] : [-1, r, 0],
    dropend: d ? [-1, r, 0] : [-1, 0, 0, r]
  }, v = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: d ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: d ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: d ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: d ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  }, { offsetWidth: E, offsetHeight: S } = s, { clientWidth: B, clientHeight: y } = e.getDocumentElement(n), { left: N, top: R, width: ae, height: U } = e.getBoundingClientRect(n), A = N - E - r < 0, K = N + E + ae + r >= B, j = R + S + r >= y, I = R + S + U + r >= y, M = R - S - r < 0, w = (!d && c || d && !c) && N + ae - E < 0, re = (d && c || !d && !c) && N + E >= B;
  if (ls.includes(h) && A && K && (h = te), h === ht && (d ? K : A) && (h = gt), h === gt && (d ? A : K) && (h = ht), h === mt && M && !I && (h = te), h === te && I && !M && (h = mt), ls.includes(h) && j && e.ObjectAssign(v[h], {
    top: "auto",
    bottom: 0
  }), rs.includes(h) && (w || re)) {
    let $ = { left: "auto", right: "auto" };
    !w && re && !d && ($ = { left: "auto", right: 0 }), w && !re && d && ($ = { left: 0, right: "auto" }), $ && e.ObjectAssign(v[h], $);
  }
  const G = p[h];
  if (e.setElementStyle(s, {
    ...v[h],
    margin: `${G.map(($) => $ && `${$}px`).join(" ")}`
  }), rs.includes(h) && c && c) {
    const $ = !d && w || d && re ? "menuStart" : (
      /* istanbul ignore next */
      "menuEnd"
    );
    e.setElementStyle(s, v[$]);
  }
  e.dispatchEvent(o, lo);
}, kr = (t) => [...t.children].map((n) => {
  if (n && cs.includes(n.tagName))
    return n;
  const { firstElementChild: s } = n;
  return s && cs.includes(s.tagName) ? s : null;
}).filter((n) => n), ms = (t) => {
  const { element: n, options: s } = t, o = t.open ? C.addListener : C.removeListener, a = e.getDocument(n);
  o(a, e.mouseclickEvent, gs), o(a, e.focusEvent, gs), o(a, e.keydownEvent, Pr), o(a, e.keyupEvent, Nr), s.display === "dynamic" && [e.scrollEvent, e.resizeEvent].forEach((r) => {
    o(e.getWindow(n), r, Mr, e.passiveHandler);
  });
}, hs = (t, n) => {
  (n ? C.addListener : C.removeListener)(t.element, e.mouseclickEvent, Ir);
}, pt = (t) => {
  const n = [...Me, "btn-group", "input-group"].map((s) => e.getElementsByClassName(`${s} ${b}`, e.getDocument(t))).find((s) => s.length);
  if (n && n.length)
    return [...n[0].children].find(
      (s) => Me.some((o) => o === e.getAttribute(s, F))
    );
}, gs = (t) => {
  const { target: n, type: s } = t;
  if (!n || !n.closest)
    return;
  const o = pt(n), a = o && Ve(o);
  if (!a)
    return;
  const { parentElement: r, menu: d } = a, c = e.closest(n, Kt) !== null, m = r && r.contains(n) && (n.tagName === "form" || e.closest(n, "form") !== null);
  s === e.mouseclickEvent && ro(n) && t.preventDefault(), !(s === e.focusEvent && (n === o || n === d || d.contains(n))) && (m || c || a && a.hide());
}, Ir = (t) => {
  const { target: n } = t, s = n && e.closest(n, Kt), o = s && Ve(s);
  o && (t.stopImmediatePropagation(), o.toggle(), s && ro(s) && t.preventDefault());
}, Pr = (t) => {
  [e.keyArrowDown, e.keyArrowUp].includes(t.code) && t.preventDefault();
};
function Nr(t) {
  const { code: n } = t, s = pt(this), o = s && Ve(s), { activeElement: a } = s && e.getDocument(s);
  if (!o || !a)
    return;
  const { menu: r, open: d } = o, c = kr(r);
  if (c && c.length && [e.keyArrowDown, e.keyArrowUp].includes(n)) {
    let m = c.indexOf(a);
    a === s ? m = 0 : n === e.keyArrowUp ? m = m > 1 ? m - 1 : 0 : n === e.keyArrowDown && (m = m < c.length - 1 ? m + 1 : m), c[m] && e.focus(c[m]);
  }
  e.keyEscape === n && d && (o.toggle(), e.focus(s));
}
function Mr() {
  const t = pt(this), n = t && Ve(t);
  n && n.open && co(n);
}
class uo extends ne {
  static selector = Kt;
  static init = $r;
  static getInstance = Ve;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(n, s) {
    super(n, s);
    const { parentElement: o } = this.element;
    this.parentElement = o, this.menu = e.querySelector(`.${ao}`, o), hs(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return io;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Lr;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element: n, open: s, menu: o, parentElement: a } = this;
    if (s)
      return;
    const r = pt(n), d = r && Ve(r);
    d && d.hide(), [Pt, ds, lo].forEach((c) => {
      c.relatedTarget = n;
    }), e.dispatchEvent(a, Pt), !Pt.defaultPrevented && (e.addClass(o, b), e.addClass(a, b), e.setAttribute(n, e.ariaExpanded, "true"), co(this), this.open = !s, e.focus(n), ms(this), e.dispatchEvent(a, ds));
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element: n, open: s, menu: o, parentElement: a } = this;
    s && ([Nt, us].forEach((r) => {
      r.relatedTarget = n;
    }), e.dispatchEvent(a, Nt), !Nt.defaultPrevented && (e.removeClass(o, b), e.removeClass(a, b), e.setAttribute(n, e.ariaExpanded, "false"), this.open = !s, ms(this), e.dispatchEvent(a, us)));
  }
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), hs(this), super.dispose();
  }
}
const V = "modal", Qt = "Modal", Xt = "Offcanvas", Or = "fixed-top", Br = "fixed-bottom", mo = "sticky-top", ho = "position-sticky", go = (t) => [
  ...e.getElementsByClassName(Or, t),
  ...e.getElementsByClassName(Br, t),
  ...e.getElementsByClassName(mo, t),
  ...e.getElementsByClassName(ho, t),
  ...e.getElementsByClassName("is-fixed", t)
], Rr = (t) => {
  const n = e.getDocumentBody(t);
  e.setElementStyle(n, {
    paddingRight: "",
    overflow: ""
  });
  const s = go(n);
  s.length && s.forEach((o) => {
    e.setElementStyle(o, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, fo = (t) => {
  const { clientWidth: n } = e.getDocumentElement(t), { innerWidth: s } = e.getWindow(t);
  return Math.abs(s - n);
}, vo = (t, n) => {
  const s = e.getDocumentBody(t), o = parseInt(e.getElementStyle(s, "paddingRight"), 10), r = e.getElementStyle(s, "overflow") === "hidden" && o ? 0 : fo(t), d = go(s);
  n && (e.setElementStyle(s, {
    overflow: "hidden",
    paddingRight: `${o + r}px`
  }), d.length && d.forEach((c) => {
    const m = e.getElementStyle(c, "paddingRight");
    if (c.style.paddingRight = `${parseInt(m, 10) + r}px`, [mo, ho].some((h) => e.hasClass(c, h))) {
      const h = e.getElementStyle(c, "marginRight");
      c.style.marginRight = `${parseInt(h, 10) - r}px`;
    }
  }));
}, X = "offcanvas", Se = e.createElement({ tagName: "div" }), po = (t, n) => {
  const s = e.isNode(n) && n.nodeName === "BODY", o = e.isNode(n) && !s ? n : Se, a = s ? n : e.getDocumentBody(t);
  e.isNode(t) && (o === Se && a.append(Se), o.append(t));
}, Eo = (t, n) => {
  const s = e.isNode(n) && n.nodeName === "BODY", o = e.isNode(n) && !s ? n : Se;
  e.isNode(t) && (t.remove(), o === Se && !Se.children.length && Se.remove());
}, Le = (t, n) => {
  const s = e.isNode(n) && n.nodeName !== "BODY" ? n : Se;
  return e.isNode(t) && s.contains(t);
}, bo = "backdrop", fs = `${V}-${bo}`, vs = `${X}-${bo}`, Co = `.${V}.${b}`, Yt = `.${X}.${b}`, L = e.createElement("div"), Oe = (t) => e.querySelector(`${Co},${Yt}`, e.getDocument(t)), Gt = (t) => {
  const n = t ? fs : vs;
  [fs, vs].forEach((s) => {
    e.removeClass(L, s);
  }), e.addClass(L, n);
}, yo = (t, n, s) => {
  Gt(s), po(L, e.getDocumentBody(t)), n && e.addClass(L, O);
}, To = () => {
  e.hasClass(L, b) || (e.addClass(L, b), e.reflow(L));
}, Et = () => {
  e.removeClass(L, b);
}, wo = (t) => {
  Oe(t) || (e.removeClass(L, O), Eo(L, e.getDocumentBody(t)), Rr(t));
}, So = (t) => e.isHTMLElement(t) && e.getElementStyle(t, "visibility") !== "hidden" && t.offsetParent !== null, zr = `.${V}`, Ao = `[${F}="${V}"]`, Wr = `[${ft}="${V}"]`, Do = `${V}-static`, qr = {
  backdrop: !0,
  keyboard: !0
}, Ze = (t) => e.getInstance(t, Qt), jr = (t) => new Lo(t), dt = e.createCustomEvent(`show.bs.${V}`), ps = e.createCustomEvent(`shown.bs.${V}`), Mt = e.createCustomEvent(`hide.bs.${V}`), Es = e.createCustomEvent(`hidden.bs.${V}`), $o = (t) => {
  const { element: n } = t, s = fo(n), { clientHeight: o, scrollHeight: a } = e.getDocumentElement(n), { clientHeight: r, scrollHeight: d } = n, c = r !== d;
  if (!c && s) {
    const m = e.isRTL(n) ? (
      /* istanbul ignore next */
      "paddingLeft"
    ) : "paddingRight", h = {};
    h[m] = `${s}px`, e.setElementStyle(n, h);
  }
  vo(n, c || o !== a);
}, Ho = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { element: o } = t;
  s(o, e.mouseclickEvent, Ur), s(e.getWindow(o), e.resizeEvent, t.update, e.passiveHandler), s(e.getDocument(o), e.keydownEvent, Vr);
}, bs = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { triggers: o } = t;
  o.length && o.forEach((a) => s(a, e.mouseclickEvent, Fr));
}, Cs = (t, n) => {
  const { triggers: s, element: o, relatedTarget: a } = t;
  wo(o), e.setElementStyle(o, { paddingRight: "", display: "" }), Ho(t);
  const r = dt.relatedTarget || s.find(So);
  r && e.focus(r), e.isFunction(n) && n(), Es.relatedTarget = a, e.dispatchEvent(o, Es);
}, ys = (t) => {
  const { element: n, relatedTarget: s } = t;
  e.focus(n), Ho(t, !0), ps.relatedTarget = s, e.dispatchEvent(n, ps);
}, Ts = (t) => {
  const { element: n, hasFade: s } = t;
  e.setElementStyle(n, { display: "block" }), $o(t), Oe(n) || e.setElementStyle(e.getDocumentBody(n), { overflow: "hidden" }), e.addClass(n, b), e.removeAttribute(n, e.ariaHidden), e.setAttribute(n, e.ariaModal, "true"), s ? e.emulateTransitionEnd(n, () => ys(t)) : ys(t);
}, ws = (t, n) => {
  const { element: s, options: o, hasFade: a } = t;
  o.backdrop && !n && a && e.hasClass(L, b) && !Oe(s) ? (Et(), e.emulateTransitionEnd(L, () => Cs(t))) : Cs(t, n);
}, Fr = (t) => {
  const { target: n } = t, s = n && e.closest(n, Ao), o = s && W(s), a = o && Ze(o);
  a && (s && s.tagName === "A" && t.preventDefault(), a.relatedTarget = s, a.toggle());
}, Vr = ({ code: t, target: n }) => {
  const s = e.querySelector(Co, e.getDocument(n)), o = s && Ze(s);
  if (!o)
    return;
  const { options: a } = o;
  a.keyboard && t === e.keyEscape && // the keyboard option is enabled and the key is 27
  e.hasClass(s, b) && (o.relatedTarget = null, o.hide());
};
function Ur(t) {
  const n = Ze(this);
  if (!n || e.Timer.get(this))
    return;
  const { options: s, isStatic: o, modalDialog: a } = n, { backdrop: r } = s, { target: d } = t, c = e.getDocument(this)?.getSelection()?.toString().length, m = a?.contains(d), h = d && e.closest(d, Wr);
  o && !m ? e.Timer.set(
    this,
    () => {
      e.addClass(this, Do), e.emulateTransitionEnd(a, () => Kr(n));
    },
    17
  ) : (h || !c && !o && !m && r) && (n.relatedTarget = h || null, n.hide(), t.preventDefault());
}
const Kr = (t) => {
  const { element: n, modalDialog: s } = t, o = (e.isHTMLElement(s) ? e.getElementTransitionDuration(s) : (
    /* istanbul ignore next */
    0
  )) + 17;
  e.removeClass(n, Do), e.Timer.set(n, () => e.Timer.clear(n), o);
};
class Lo extends ne {
  static selector = zr;
  static init = jr;
  static getInstance = Ze;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o } = this;
    this.modalDialog = e.querySelector(`.${V}-dialog`, o), this.triggers = [...e.querySelectorAll(Ao, e.getDocument(o))].filter(
      (a) => W(a) === o
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = e.hasClass(o, O), this.relatedTarget = null, bs(this, !0), this.update = this.update.bind(this);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Qt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return qr;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    e.hasClass(this.element, b) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element: n, options: s, hasFade: o, relatedTarget: a } = this, { backdrop: r } = s;
    let d = 0;
    if (e.hasClass(n, b) || (dt.relatedTarget = a || void 0, e.dispatchEvent(n, dt), dt.defaultPrevented))
      return;
    const c = Oe(n);
    if (c && c !== n) {
      const m = Ze(c) || /* istanbul ignore next */
      e.getInstance(c, Xt);
      m && m.hide();
    }
    r ? (Le(L) ? Gt(!0) : yo(n, o, !0), d = e.getElementTransitionDuration(L), To(), setTimeout(() => Ts(this), d)) : (Ts(this), c && e.hasClass(L, b) && Et());
  }
  /**
   * Hide the modal from the user.
   *
   * @param callback when defined it will skip animation
   */
  hide(n) {
    const { element: s, hasFade: o, relatedTarget: a } = this;
    e.hasClass(s, b) && (Mt.relatedTarget = a || void 0, e.dispatchEvent(s, Mt), !Mt.defaultPrevented && (e.removeClass(s, b), e.setAttribute(s, e.ariaHidden, "true"), e.removeAttribute(s, e.ariaModal), o ? e.emulateTransitionEnd(s, () => ws(this, n)) : ws(this, n)));
  }
  /**
   * Updates the modal layout.
   */
  update() {
    e.hasClass(this.element, b) && $o(this);
  }
  /** Removes the `Modal` component from target element. */
  dispose() {
    bs(this), this.hide(() => super.dispose());
  }
}
const Qr = `.${X}`, _t = `[${F}="${X}"]`, Xr = `[${ft}="${X}"]`, bt = `${X}-toggling`, Yr = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, xe = (t) => e.getInstance(t, Xt), Gr = (t) => new No(t), ut = e.createCustomEvent(`show.bs.${X}`), ko = e.createCustomEvent(`shown.bs.${X}`), Ot = e.createCustomEvent(`hide.bs.${X}`), Io = e.createCustomEvent(`hidden.bs.${X}`), _r = (t) => {
  const { element: n } = t, { clientHeight: s, scrollHeight: o } = e.getDocumentElement(n);
  vo(n, s !== o);
}, Ss = (t, n) => {
  const s = n ? C.addListener : C.removeListener;
  t.triggers.forEach((o) => s(o, e.mouseclickEvent, Jr));
}, Po = (t, n) => {
  const s = n ? C.addListener : C.removeListener, o = e.getDocument(t.element);
  s(o, e.keydownEvent, xr), s(o, e.mouseclickEvent, Zr);
}, As = (t) => {
  const { element: n, options: s } = t;
  s.scroll || (_r(t), e.setElementStyle(e.getDocumentBody(n), { overflow: "hidden" })), e.addClass(n, bt), e.addClass(n, b), e.setElementStyle(n, { visibility: "visible" }), e.emulateTransitionEnd(n, () => el(t));
}, Ds = (t, n) => {
  const { element: s, options: o } = t, a = Oe(s);
  s.blur(), !a && o.backdrop && e.hasClass(L, b) ? (Et(), e.emulateTransitionEnd(L, () => $s(t, n))) : $s(t, n);
}, Jr = (t) => {
  const n = e.closest(t.target, _t), s = n && W(n), o = s && xe(s);
  o && (o.relatedTarget = n, o.toggle(), n && n.tagName === "A" && t.preventDefault());
}, Zr = (t) => {
  const { target: n } = t, s = e.querySelector(Yt, e.getDocument(n)), o = e.querySelector(Xr, s), a = s && xe(s);
  if (!a)
    return;
  const { options: r, triggers: d } = a, { backdrop: c } = r, m = e.closest(n, _t), h = e.getDocument(s).getSelection();
  L.contains(n) && c === "static" || (!(h && h.toString().length) && (!s.contains(n) && c && /* istanbul ignore next */
  (!m || d.includes(n)) || o && o.contains(n)) && (a.relatedTarget = o && o.contains(n) ? o : null, a.hide()), m && m.tagName === "A" && t.preventDefault());
}, xr = ({ code: t, target: n }) => {
  const s = e.querySelector(Yt, e.getDocument(n)), o = s && xe(s);
  o && o.options.keyboard && t === e.keyEscape && (o.relatedTarget = null, o.hide());
}, el = (t) => {
  const { element: n } = t;
  e.removeClass(n, bt), e.removeAttribute(n, e.ariaHidden), e.setAttribute(n, e.ariaModal, "true"), e.setAttribute(n, "role", "dialog"), e.dispatchEvent(n, ko), Po(t, !0), e.focus(n);
}, $s = (t, n) => {
  const { element: s, triggers: o } = t;
  e.setAttribute(s, e.ariaHidden, "true"), e.removeAttribute(s, e.ariaModal), e.removeAttribute(s, "role"), e.setElementStyle(s, { visibility: "" });
  const a = ut.relatedTarget || o.find(So);
  a && e.focus(a), wo(s), e.dispatchEvent(s, Io), e.removeClass(s, bt), Oe(s) || Po(t), e.isFunction(n) && n();
};
class No extends ne {
  static selector = Qr;
  static init = Gr;
  static getInstance = xe;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o } = this;
    this.triggers = [...e.querySelectorAll(_t, e.getDocument(o))].filter(
      (a) => W(a) === o
    ), this.relatedTarget = null, Ss(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Xt;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Yr;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    e.hasClass(this.element, b) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element: n, options: s, relatedTarget: o } = this;
    let a = 0;
    if (e.hasClass(n, b) || (ut.relatedTarget = o || void 0, ko.relatedTarget = o || void 0, e.dispatchEvent(n, ut), ut.defaultPrevented))
      return;
    const r = Oe(n);
    if (r && r !== n) {
      const d = xe(r) || /* istanbul ignore next */
      e.getInstance(r, Qt);
      d && d.hide();
    }
    s.backdrop ? (Le(L) ? Gt() : yo(n, !0), a = e.getElementTransitionDuration(L), To(), setTimeout(() => As(this), a)) : (As(this), r && e.hasClass(L, b) && Et());
  }
  /**
   * Hides the offcanvas from the user.
   *
   * @param callback when `true` it will skip animation
   */
  hide(n) {
    const { element: s, relatedTarget: o } = this;
    e.hasClass(s, b) && (Ot.relatedTarget = o || void 0, Io.relatedTarget = o || void 0, e.dispatchEvent(s, Ot), !Ot.defaultPrevented && (e.addClass(s, bt), e.removeClass(s, b), n ? Ds(this, n) : e.emulateTransitionEnd(s, () => Ds(this, n))));
  }
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    Ss(this), this.hide(() => super.dispose());
  }
}
const Ie = "popover", Ct = "Popover", me = "tooltip", Mo = (t) => {
  const n = t === me, s = n ? `${t}-inner` : `${t}-body`, o = n ? "" : `<h3 class="${t}-header"></h3>`, a = `<div class="${t}-arrow"></div>`, r = `<div class="${s}"></div>`;
  return `<div class="${t}" role="${me}">${o + a + r}</div>`;
}, Oo = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, Vt = (t) => {
  const n = /\b(top|bottom|start|end)+/, { element: s, tooltip: o, container: a, options: r, arrow: d } = t;
  if (!o)
    return;
  const c = { ...Oo }, m = e.isRTL(s);
  e.setElementStyle(o, {
    // top: '0px', left: '0px', right: '', bottom: '',
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const h = t.name === Ct, { offsetWidth: p, offsetHeight: v } = o, { clientWidth: E, clientHeight: S, offsetWidth: B } = e.getDocumentElement(s);
  let { placement: y } = r;
  const { clientWidth: N, offsetWidth: R } = a, U = e.getElementStyle(a, "position") === "fixed", A = Math.abs(U ? N - R : E - B), K = m && U ? (
    /* istanbul ignore next */
    A
  ) : 0, j = E - (m ? 0 : A) - 1, {
    width: I,
    height: M,
    left: w,
    right: re,
    top: G
  } = e.getBoundingClientRect(s, !0), { x: $, y: _ } = {
    x: w,
    y: G
  };
  e.setElementStyle(d, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let se = 0, he = "", J = 0, Be = "", le = "", Ae = "", Re = "";
  const oe = d.offsetWidth || 0, Z = d.offsetHeight || 0, ze = oe / 2;
  let ge = G - v - Z < 0, fe = G + v + M + Z >= S, ve = w - p - oe < K, pe = w + p + I + oe >= j;
  const De = ["left", "right"], We = ["top", "bottom"];
  ge = De.includes(y) ? G + M / 2 - v / 2 - Z < 0 : ge, fe = De.includes(y) ? G + v / 2 + M / 2 + Z >= S : fe, ve = We.includes(y) ? w + I / 2 - p / 2 < K : ve, pe = We.includes(y) ? w + p / 2 + I / 2 >= j : pe, y = De.includes(y) && ve && pe ? "top" : y, y = y === "top" && ge ? "bottom" : y, y = y === "bottom" && fe ? "top" : y, y = y === "left" && ve ? "right" : y, y = y === "right" && pe ? "left" : y, o.className.includes(y) || (o.className = o.className.replace(n, c[y])), De.includes(y) ? (y === "left" ? J = $ - p - (h ? oe : 0) : J = $ + I + (h ? oe : 0), ge && fe ? (se = 0, he = 0, le = G + M / 2 - Z / 2) : ge ? (se = _, he = "", le = M / 2 - oe) : fe ? (se = _ - v + M, he = "", le = v - M / 2 - oe) : (se = _ - v / 2 + M / 2, le = v / 2 - Z / 2)) : We.includes(y) && (y === "top" ? se = _ - v - (h ? Z : 0) : se = _ + M + (h ? Z : 0), ve ? (J = 0, Ae = $ + I / 2 - ze) : pe ? (J = "auto", Be = 0, Re = I / 2 + j - re - ze) : (J = $ - p / 2 + I / 2, Ae = p / 2 - ze)), e.setElementStyle(o, {
    top: `${se}px`,
    bottom: he === "" ? "" : `${he}px`,
    left: J === "auto" ? J : `${J}px`,
    right: Be !== "" ? `${Be}px` : ""
  }), e.isHTMLElement(d) && (le !== "" && (d.style.top = `${le}px`), Ae !== "" ? d.style.left = `${Ae}px` : Re !== "" && (d.style.right = `${Re}px`));
  const st = e.createCustomEvent(`updated.bs.${e.toLowerCase(t.name)}`);
  e.dispatchEvent(s, st);
}, Ut = {
  template: Mo(me),
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
}, Bo = "data-original-title", Pe = "Tooltip", ye = (t, n, s) => {
  if (!(!e.isHTMLElement(t) || e.isString(n) && !n.length))
    if (e.isString(n)) {
      let o = n.trim();
      e.isFunction(s) && (o = s(o));
      const r = new DOMParser().parseFromString(o, "text/html");
      t.append(...r.body.childNodes);
    } else
      e.isHTMLElement(n) ? t.append(n) : (e.isNodeList(n) || e.isArray(n) && n.every(e.isNode)) && t.append(...n);
}, tl = (t) => {
  const n = t.name === Pe, { id: s, element: o, options: a } = t, { title: r, placement: d, template: c, animation: m, customClass: h, sanitizeFn: p, dismissible: v, content: E, btnClose: S } = a, B = n ? me : Ie, y = { ...Oo };
  let N = [], R = [];
  e.isRTL(o) && (y.left = "end", y.right = "start");
  const ae = `bs-${B}-${y[d]}`;
  let U;
  if (e.isHTMLElement(c))
    U = c;
  else {
    const w = e.createElement("div");
    ye(w, c, p), U = w.firstChild;
  }
  t.tooltip = e.isHTMLElement(U) ? U.cloneNode(!0) : (
    /* istanbul ignore next */
    void 0
  );
  const { tooltip: A } = t;
  if (!A)
    return;
  e.setAttribute(A, "id", s), e.setAttribute(A, "role", me);
  const K = n ? `${me}-inner` : `${Ie}-body`, j = n ? null : e.querySelector(`.${Ie}-header`, A), I = e.querySelector(`.${K}`, A);
  t.arrow = e.querySelector(`.${B}-arrow`, A);
  const { arrow: M } = t;
  if (e.isHTMLElement(r))
    N = [r.cloneNode(!0)];
  else {
    const w = e.createElement("div");
    ye(w, r, p), N = [...w.childNodes];
  }
  if (e.isHTMLElement(E))
    R = [E.cloneNode(!0)];
  else {
    const w = e.createElement("div");
    ye(w, E, p), R = [...w.childNodes];
  }
  if (v)
    if (r)
      if (e.isHTMLElement(S))
        N = [...N, S.cloneNode(!0)];
      else {
        const w = e.createElement("div");
        ye(w, S, p), N = [...N, w.firstChild];
      }
    else if (j && j.remove(), e.isHTMLElement(S))
      R = [...R, S.cloneNode(!0)];
    else {
      const w = e.createElement("div");
      ye(w, S, p), R = [...R, w.firstChild];
    }
  n ? r && I && ye(I, r, p) : (r && j && ye(j, N, p), E && I && ye(I, R, p), t.btn = e.querySelector(".btn-close", A) || void 0), e.addClass(A, "position-fixed"), e.addClass(M, "position-absolute"), e.hasClass(A, B) || e.addClass(A, B), m && !e.hasClass(A, O) && e.addClass(A, O), h && !e.hasClass(A, h) && e.addClass(A, h), e.hasClass(A, ae) || e.addClass(A, ae);
}, nl = (t) => {
  const n = ["HTML", "BODY"], s = [];
  let { parentNode: o } = t;
  for (; o && !n.includes(o.nodeName); )
    o = e.getParentNode(o), e.isShadowRoot(o) || e.isTableElement(o) || s.push(o);
  return s.find((a, r) => e.getElementStyle(a, "position") !== "relative" && s.slice(r + 1).every((d) => e.getElementStyle(d, "position") === "static") ? a : null) || /* istanbul ignore next: optional guard */
  e.getDocument(t).body;
}, sl = `[${F}="${me}"],[data-tip="${me}"]`, Ro = "title";
let Hs = (t) => e.getInstance(t, Pe);
const ol = (t) => new Jt(t), il = (t) => {
  const { element: n, tooltip: s, container: o, offsetParent: a } = t;
  e.removeAttribute(n, e.ariaDescribedBy), Eo(s, o === a ? o : a);
}, al = (t, n) => {
  const { element: s } = t;
  Je(t), e.hasAttribute(s, Bo) && t.name === Pe && Wo(t), n && n();
}, zo = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { element: o } = t;
  s(e.getDocument(o), e.touchstartEvent, t.handleTouch, e.passiveHandler), [e.scrollEvent, e.resizeEvent].forEach((a) => {
    s(e.getWindow(o), a, t.update, e.passiveHandler);
  });
}, Ls = (t) => {
  const { element: n } = t, s = e.createCustomEvent(`shown.bs.${e.toLowerCase(t.name)}`);
  zo(t, !0), e.dispatchEvent(n, s), e.Timer.clear(n, "in");
}, ks = (t) => {
  const { element: n, onHideComplete: s } = t, o = e.createCustomEvent(`hidden.bs.${e.toLowerCase(t.name)}`);
  zo(t), il(t), e.dispatchEvent(n, o), e.isFunction(s) && (s(), t.onHideComplete = void 0), e.Timer.clear(n, "out");
}, Je = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { element: o, options: a, btn: r } = t, { trigger: d } = a, m = !!(t.name !== Pe && a.dismissible);
  if (d.includes("manual"))
    return;
  t.enabled = !!n, d.split(" ").forEach((p) => {
    p === e.mousehoverEvent ? (s(o, e.mousedownEvent, t.show), s(o, e.mouseenterEvent, t.show), m && r ? s(r, e.mouseclickEvent, t.hide) : (s(o, e.mouseleaveEvent, t.hide), s(e.getDocument(o), e.touchstartEvent, t.handleTouch, e.passiveHandler))) : p === e.mouseclickEvent ? s(o, p, m ? t.show : t.toggle) : p === e.focusEvent && (s(o, e.focusinEvent, t.show), m || s(o, e.focusoutEvent, t.hide), e.isApple && s(o, e.mouseclickEvent, () => e.focus(o)));
  });
}, Is = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { element: o, container: a, offsetParent: r } = t, { offsetHeight: d, scrollHeight: c } = a, m = e.closest(o, `.${V}`), h = e.closest(o, `.${X}`), p = e.getWindow(o), E = a === r && d !== c ? a : p;
  s(E, e.resizeEvent, t.update, e.passiveHandler), s(E, e.scrollEvent, t.update, e.passiveHandler), m && s(m, `hide.bs.${V}`, t.hide), h && s(h, `hide.bs.${X}`, t.hide);
}, Wo = (t, n) => {
  const s = [Bo, Ro], { element: o } = t;
  e.setAttribute(
    o,
    s[n ? 0 : 1],
    n || e.getAttribute(o, s[0]) || /* istanbul ignore next */
    ""
  ), e.removeAttribute(o, s[n ? 1 : 0]);
};
class Jt extends ne {
  static selector = sl;
  static init = ol;
  static getInstance = Hs;
  static styleTip = Vt;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o } = this, a = this.name === Pe, r = a ? me : Ie, d = a ? Pe : Ct;
    Hs = (m) => e.getInstance(m, d), this.enabled = !0, this.id = `${r}-${e.getUID(o, r)}`;
    const { options: c } = this;
    !c.title && a || !a && !c.content || (e.ObjectAssign(Ut, { titleAttr: "" }), this.handleTouch = this.handleTouch.bind(this), this.update = this.update.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this.toggle = this.toggle.bind(this), e.hasAttribute(o, Ro) && a && typeof c.title == "string" && Wo(this, c.title), this.container = nl(o), this.offsetParent = ["sticky", "fixed"].some(
      (m) => e.getElementStyle(this.container, "position") === m
    ) ? this.container : e.getDocument(this.element).body, tl(this), Je(this, !0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Pe;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Ut;
  }
  // TOOLTIP PUBLIC METHODS
  // ======================
  /** Shows the tooltip. */
  show() {
    const { options: n, tooltip: s, element: o, container: a, offsetParent: r, id: d } = this, { animation: c } = n, m = e.Timer.get(o, "out"), h = a === r ? a : r;
    e.Timer.clear(o, "out"), s && !m && !Le(s, h) && e.Timer.set(
      o,
      () => {
        const p = e.createCustomEvent(`show.bs.${e.toLowerCase(this.name)}`);
        e.dispatchEvent(o, p), !p.defaultPrevented && (po(s, h), e.setAttribute(o, e.ariaDescribedBy, `#${d}`), this.update(), Is(this, !0), e.hasClass(s, b) || e.addClass(s, b), c ? e.emulateTransitionEnd(s, () => Ls(this)) : Ls(this));
      },
      17,
      "in"
    );
  }
  /** Hides the tooltip. */
  hide() {
    const { options: n, tooltip: s, element: o, container: a, offsetParent: r } = this, { animation: d, delay: c } = n;
    e.Timer.clear(o, "in"), s && Le(s, a === r ? a : r) && e.Timer.set(
      o,
      () => {
        const m = e.createCustomEvent(`hide.bs.${e.toLowerCase(this.name)}`);
        e.dispatchEvent(o, m), !m.defaultPrevented && (this.update(), e.removeClass(s, b), Is(this), d ? e.emulateTransitionEnd(s, () => ks(this)) : ks(this));
      },
      c + 17,
      "out"
    );
  }
  /** Updates the tooltip position. */
  update() {
    Vt(this);
  }
  /** Toggles the tooltip visibility. */
  toggle() {
    const { tooltip: n, container: s, offsetParent: o } = this;
    n && !Le(n, s === o ? s : o) ? this.show() : this.hide();
  }
  /** Enables the tooltip. */
  enable() {
    const { enabled: n } = this;
    n || (Je(this, !0), this.enabled = !n);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip: n, container: s, offsetParent: o, options: a, enabled: r } = this, { animation: d } = a;
    r && (n && Le(n, s === o ? s : o) && d ? (this.onHideComplete = () => Je(this), this.hide()) : Je(this), this.enabled = !r);
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
  handleTouch({ target: n }) {
    const { tooltip: s, element: o } = this;
    s && s.contains(n) || n === o || n && o.contains(n) || this.hide();
  }
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip: n, container: s, offsetParent: o, options: a } = this, r = () => al(this, () => super.dispose());
    a.animation && n && Le(n, s === o ? s : o) ? (this.options.delay = 0, this.onHideComplete = r, this.hide()) : r();
  }
}
const rl = `[${F}="${Ie}"],[data-tip="${Ie}"]`, ll = e.ObjectAssign({}, Ut, {
  template: Mo(Ie),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), cl = (t) => e.getInstance(t, Ct), dl = (t) => new qo(t);
class qo extends Jt {
  static selector = rl;
  static init = dl;
  static getInstance = cl;
  static styleTip = Vt;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(n, s) {
    super(n, s);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ct;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return ll;
  }
  /* extend original `show()` */
  show() {
    super.show();
    const { options: n, btn: s } = this;
    n.dismissible && s && setTimeout(() => e.focus(s), 17);
  }
}
const ul = "scrollspy", jo = "ScrollSpy", ml = '[data-bs-spy="scroll"]', hl = {
  offset: 10,
  target: null
}, gl = (t) => e.getInstance(t, jo), fl = (t) => new Uo(t), Ps = e.createCustomEvent(`activate.bs.${ul}`), vl = (t) => {
  const { target: n, scrollTarget: s, options: o, itemsLength: a, scrollHeight: r, element: d } = t, { offset: c } = o, m = e.isWindow(s), h = n && e.getElementsByTagName("A", n), p = s ? Fo(s) : (
    /* istanbul ignore next */
    r
  );
  if (t.scrollTop = m ? s.scrollY : s.scrollTop, h && (p !== r || a !== h.length)) {
    let v, E, S;
    t.items = [], t.offsets = [], t.scrollHeight = p, t.maxScroll = t.scrollHeight - pl(t), [...h].forEach((B) => {
      v = e.getAttribute(B, "href"), E = v && v.charAt(0) === "#" && v.slice(-1) !== "#" && e.querySelector(v, e.getDocument(d)), E && (t.items.push(B), S = e.getBoundingClientRect(E), t.offsets.push((m ? S.top + t.scrollTop : E.offsetTop) - c));
    }), t.itemsLength = t.items.length;
  }
}, Fo = (t) => e.isHTMLElement(t) ? t.scrollHeight : e.getDocumentElement(t).scrollHeight, pl = ({ element: t, scrollTarget: n }) => e.isWindow(n) ? n.innerHeight : e.getBoundingClientRect(t).height, Vo = (t) => {
  [...e.getElementsByTagName("A", t)].forEach((n) => {
    e.hasClass(n, T) && e.removeClass(n, T);
  });
}, Ns = (t, n) => {
  const { target: s, element: o } = t;
  e.isHTMLElement(s) && Vo(s), t.activeItem = n, e.addClass(n, T);
  const a = [];
  let r = n;
  for (; r !== e.getDocumentBody(o); )
    r = r.parentElement, (e.hasClass(r, "nav") || e.hasClass(r, "dropdown-menu")) && a.push(r);
  a.forEach((d) => {
    const c = d.previousElementSibling;
    c && !e.hasClass(c, T) && e.addClass(c, T);
  }), Ps.relatedTarget = n, e.dispatchEvent(o, Ps);
}, Ms = (t, n) => {
  (n ? C.addListener : C.removeListener)(t.scrollTarget, e.scrollEvent, t.refresh, e.passiveHandler);
};
class Uo extends ne {
  static selector = ml;
  static init = fl;
  static getInstance = gl;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o, options: a } = this;
    this.target = e.querySelector(a.target, e.getDocument(o)), this.target && (this.scrollTarget = o.clientHeight < o.scrollHeight ? o : e.getWindow(o), this.scrollHeight = Fo(this.scrollTarget), this.refresh = this.refresh.bind(this), Ms(this, !0), this.refresh());
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return jo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return hl;
  }
  /* eslint-enable */
  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh() {
    const { target: n } = this;
    if (n?.offsetHeight === 0)
      return;
    vl(this);
    const { scrollTop: s, maxScroll: o, itemsLength: a, items: r, activeItem: d } = this;
    if (s >= o) {
      const m = r[a - 1];
      d !== m && Ns(this, m);
      return;
    }
    const { offsets: c } = this;
    if (d && s < c[0] && c[0] > 0) {
      this.activeItem = null, n && Vo(n);
      return;
    }
    r.forEach((m, h) => {
      d !== m && s >= c[h] && (typeof c[h + 1] > "u" || s < c[h + 1]) && Ns(this, m);
    });
  }
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    Ms(this), super.dispose();
  }
}
const nt = "tab", Ko = "Tab", Os = `[${F}="${nt}"]`, Qo = (t) => e.getInstance(t, Ko), El = (t) => new Xo(t), Bt = e.createCustomEvent(`show.bs.${nt}`), Bs = e.createCustomEvent(`shown.bs.${nt}`), Rt = e.createCustomEvent(`hide.bs.${nt}`), Rs = e.createCustomEvent(`hidden.bs.${nt}`), et = /* @__PURE__ */ new Map(), zs = (t) => {
  const { tabContent: n, nav: s } = t;
  n && e.hasClass(n, Ne) && (n.style.height = "", e.removeClass(n, Ne)), s && e.Timer.clear(s);
}, Ws = (t) => {
  const { element: n, tabContent: s, content: o, nav: a } = t, { tab: r } = e.isHTMLElement(a) && et.get(a) || /* istanbul ignore next */
  { tab: null };
  if (s && o && e.hasClass(o, O)) {
    const { currentHeight: d, nextHeight: c } = et.get(n) || /* istanbul ignore next */
    {
      currentHeight: 0,
      nextHeight: 0
    };
    d === c ? zs(t) : setTimeout(() => {
      s.style.height = `${c}px`, e.reflow(s), e.emulateTransitionEnd(s, () => zs(t));
    }, 50);
  } else
    a && e.Timer.clear(a);
  Bs.relatedTarget = r, e.dispatchEvent(n, Bs);
}, qs = (t) => {
  const { element: n, content: s, tabContent: o, nav: a } = t, { tab: r, content: d } = a && et.get(a) || /* istanbul ignore next */
  { tab: null, content: null };
  let c = 0;
  if (o && s && e.hasClass(s, O) && ([d, s].forEach((m) => {
    e.isHTMLElement(m) && e.addClass(m, "overflow-hidden");
  }), c = e.isHTMLElement(d) ? d.scrollHeight : (
    /* istanbul ignore next */
    0
  )), Bt.relatedTarget = r, Rs.relatedTarget = n, e.dispatchEvent(n, Bt), !Bt.defaultPrevented) {
    if (s && e.addClass(s, T), d && e.removeClass(d, T), o && s && e.hasClass(s, O)) {
      const m = s.scrollHeight;
      et.set(n, { currentHeight: c, nextHeight: m, tab: null, content: null }), e.addClass(o, Ne), o.style.height = `${c}px`, e.reflow(o), [d, s].forEach((h) => {
        h && e.removeClass(h, "overflow-hidden");
      });
    }
    s && s && e.hasClass(s, O) ? setTimeout(() => {
      e.addClass(s, b), e.emulateTransitionEnd(s, () => {
        Ws(t);
      });
    }, 1) : (s && e.addClass(s, b), Ws(t)), r && e.dispatchEvent(r, Rs);
  }
}, js = (t) => {
  const { nav: n } = t;
  if (!e.isHTMLElement(n))
    return { tab: null, content: null };
  const s = e.getElementsByClassName(T, n);
  let o = null;
  s.length === 1 && !Me.some((r) => e.hasClass(s[0].parentElement, r)) ? [o] = s : s.length > 1 && (o = s[s.length - 1]);
  const a = e.isHTMLElement(o) ? W(o) : null;
  return { tab: o, content: a };
}, Fs = (t) => {
  if (!e.isHTMLElement(t))
    return null;
  const n = e.closest(t, `.${Me.join(",.")}`);
  return n ? e.querySelector(`.${Me[0]}-toggle`, n) : null;
}, Vs = (t, n) => {
  (n ? C.addListener : C.removeListener)(t.element, e.mouseclickEvent, bl);
}, bl = (t) => {
  const n = Qo(t.target);
  n && (t.preventDefault(), n.show());
};
class Xo extends ne {
  static selector = Os;
  static init = El;
  static getInstance = Qo;
  /** @param target the target element */
  constructor(n) {
    super(n);
    const { element: s } = this, o = W(s);
    if (!o)
      return;
    const a = e.closest(s, ".nav"), r = e.closest(o, ".tab-content");
    this.nav = a, this.content = o, this.tabContent = r, this.dropdown = Fs(s);
    const { tab: d } = js(this);
    if (a && !d) {
      const c = e.querySelector(Os, a), m = c && W(c);
      m && (e.addClass(c, T), e.addClass(m, b), e.addClass(m, T), e.setAttribute(s, e.ariaSelected, "true"));
    }
    Vs(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Ko;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element: n, content: s, nav: o, dropdown: a } = this;
    if (!(o && e.Timer.get(o)) && !e.hasClass(n, T)) {
      const { tab: r, content: d } = js(this);
      if (o && et.set(o, { tab: r, content: d, currentHeight: 0, nextHeight: 0 }), Rt.relatedTarget = n, e.isHTMLElement(r) && e.dispatchEvent(r, Rt), Rt.defaultPrevented)
        return;
      e.addClass(n, T), e.setAttribute(n, e.ariaSelected, "true");
      const c = e.isHTMLElement(r) && Fs(r);
      if (c && e.hasClass(c, T) && e.removeClass(c, T), o) {
        const m = () => {
          r && (e.removeClass(r, T), e.setAttribute(r, e.ariaSelected, "false")), a && !e.hasClass(a, T) && e.addClass(a, T);
        };
        d && (e.hasClass(d, O) || s && e.hasClass(s, O)) ? e.Timer.set(o, m, 1) : m();
      }
      d && (e.removeClass(d, b), e.hasClass(d, O) ? e.emulateTransitionEnd(d, () => qs(this)) : qs(this));
    }
  }
  /** Removes the `Tab` component from the target element. */
  dispose() {
    Vs(this), super.dispose();
  }
}
const Y = "toast", Yo = "Toast", Cl = `.${Y}`, yl = `[${ft}="${Y}"]`, Go = `[${F}="${Y}"]`, Ue = "showing", _o = "hide", Tl = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, Zt = (t) => e.getInstance(t, Yo), wl = (t) => new Zo(t), Us = e.createCustomEvent(`show.bs.${Y}`), Sl = e.createCustomEvent(`shown.bs.${Y}`), Ks = e.createCustomEvent(`hide.bs.${Y}`), Al = e.createCustomEvent(`hidden.bs.${Y}`), Qs = (t) => {
  const { element: n, options: s } = t;
  e.removeClass(n, Ue), e.Timer.clear(n, Ue), e.dispatchEvent(n, Sl), s.autohide && e.Timer.set(n, () => t.hide(), s.delay, Y);
}, Xs = (t) => {
  const { element: n } = t;
  e.removeClass(n, Ue), e.removeClass(n, b), e.addClass(n, _o), e.Timer.clear(n, Y), e.dispatchEvent(n, Al);
}, Dl = (t) => {
  const { element: n, options: s } = t;
  e.addClass(n, Ue), s.animation ? (e.reflow(n), e.emulateTransitionEnd(n, () => Xs(t))) : Xs(t);
}, $l = (t) => {
  const { element: n, options: s } = t;
  e.Timer.set(
    n,
    () => {
      e.removeClass(n, _o), e.reflow(n), e.addClass(n, b), e.addClass(n, Ue), s.animation ? e.emulateTransitionEnd(n, () => Qs(t)) : Qs(t);
    },
    17,
    Ue
  );
}, Jo = (t, n) => {
  const s = n ? C.addListener : C.removeListener, { element: o, triggers: a, dismiss: r, options: d } = t;
  r && s(r, e.mouseclickEvent, t.hide), d.autohide && [e.focusinEvent, e.focusoutEvent, e.mouseenterEvent, e.mouseleaveEvent].forEach(
    (c) => s(o, c, kl)
  ), a.length && a.forEach((c) => s(c, e.mouseclickEvent, Ll));
}, Hl = (t) => {
  e.Timer.clear(t.element, Y), Jo(t);
}, Ll = (t) => {
  const { target: n } = t, s = n && e.closest(n, Go), o = s && W(s), a = o && Zt(o);
  a && (s && s.tagName === "A" && t.preventDefault(), a.relatedTarget = s, a.show());
}, kl = (t) => {
  const n = t.target, s = Zt(n), { type: o, relatedTarget: a } = t;
  !s || n === a || n.contains(a) || ([e.mouseenterEvent, e.focusinEvent].includes(o) ? e.Timer.clear(n, Y) : e.Timer.set(n, () => s.hide(), s.options.delay, Y));
};
class Zo extends ne {
  static selector = Cl;
  static init = wl;
  static getInstance = Zt;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(n, s) {
    super(n, s);
    const { element: o, options: a } = this;
    a.animation && !e.hasClass(o, O) ? e.addClass(o, O) : !a.animation && e.hasClass(o, O) && e.removeClass(o, O), this.dismiss = e.querySelector(yl, o), this.triggers = [...e.querySelectorAll(Go, e.getDocument(o))].filter(
      (r) => W(r) === o
    ), this.show = this.show.bind(this), this.hide = this.hide.bind(this), Jo(this, !0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return Yo;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return Tl;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return e.hasClass(this.element, b);
  }
  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show() {
    const { element: n, isShown: s } = this;
    if (n && !s) {
      if (e.dispatchEvent(n, Us), Us.defaultPrevented)
        return;
      $l(this);
    }
  }
  /** Hides the toast. */
  hide() {
    const { element: n, isShown: s } = this;
    if (n && s) {
      if (e.dispatchEvent(n, Ks), Ks.defaultPrevented)
        return;
      Dl(this);
    }
  }
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element: n, isShown: s } = this;
    s && e.removeClass(n, b), Hl(this), super.dispose();
  }
}
const xo = {
  Alert: _s,
  Button: Zs,
  Carousel: to,
  Collapse: oo,
  Dropdown: uo,
  Modal: Lo,
  Offcanvas: No,
  Popover: qo,
  ScrollSpy: Uo,
  Tab: Xo,
  Toast: Zo,
  Tooltip: Jt
}, Il = (t, n) => {
  [...n].forEach((s) => t(s));
}, Pl = (t, n) => {
  const s = e.Data.getAllFor(t);
  s && [...s].forEach(([o, a]) => {
    n.contains(o) && a.dispose();
  });
}, Ys = (t) => {
  const n = t && t.nodeName ? t : document, s = [...e.getElementsByTagName("*", n)];
  e.ObjectValues(xo).forEach((o) => {
    const { init: a, selector: r } = o;
    Il(
      a,
      s.filter((d) => e.matches(d, r))
    );
  });
}, Ml = (t) => {
  const n = t && t.nodeName ? t : document;
  e.ObjectKeys(xo).forEach((s) => {
    Pl(s, n);
  });
};
document.body ? Ys() : C.addListener(document, "DOMContentLoaded", () => Ys(), { once: !0 });
export {
  _s as Alert,
  Zs as Button,
  to as Carousel,
  oo as Collapse,
  uo as Dropdown,
  Nl as Listener,
  Lo as Modal,
  No as Offcanvas,
  qo as Popover,
  Uo as ScrollSpy,
  Xo as Tab,
  Zo as Toast,
  Jt as Tooltip,
  Ys as initCallback,
  Ml as removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
