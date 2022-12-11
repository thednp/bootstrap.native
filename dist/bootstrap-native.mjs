const e = {}, r = (s) => {
  const { type: c, target: n, currentTarget: i } = s;
  [...e[c]].forEach(([t, o]) => {
    [i, n].includes(t) && [...o].forEach(([a2, f]) => {
      a2.apply(t, [s]), typeof f == "object" && f.once && d$1(t, c, a2, f);
    });
  });
}, E$1 = (s, c, n, i) => {
  e[c] || (e[c] = /* @__PURE__ */ new Map());
  const t = e[c];
  t.has(s) || t.set(s, /* @__PURE__ */ new Map());
  const o = t.get(s), { size: a2 } = o;
  o.set(n, i), a2 || s.addEventListener(c, r, i);
}, d$1 = (s, c, n, i) => {
  const t = e[c], o = t && t.get(s), a2 = o && o.get(n), f = a2 !== void 0 ? a2 : i;
  o && o.has(n) && o.delete(n), t && (!o || !o.size) && t.delete(s), (!t || !t.size) && delete e[c], (!o || !o.size) && s.removeEventListener(c, r, f);
}, g$1 = E$1, M$1 = d$1;
const eventListener = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addListener: E$1,
  globalListener: r,
  off: M$1,
  on: g$1,
  registry: e,
  removeListener: d$1
}, Symbol.toStringTag, { value: "Module" }));
const ge = "aria-describedby", Ee = "aria-expanded", be = "aria-hidden", we = "aria-modal", Ae = "aria-pressed", Se = "aria-selected", H = "DOMContentLoaded", _ = "focus", tt = "focusin", et = "focusout", ct = "keydown", it = "keyup", ut = "click", dt = "mousedown", ft = "hover", mt = "mouseenter", gt = "mouseleave", ht = "mousemove", Mt = "pointerdown", kt = "pointermove", Tt = "pointerup", Lt = "resize", xt = "scroll", Bt = "touchstart", He = "ArrowDown", Pe = "ArrowUp", Ue = "ArrowLeft", Fe = "ArrowRight", je = "Escape", Qt = "transitionDuration", qt = "transitionDelay", D = "transitionend", U = "transitionProperty", Gt = navigator.userAgentData, S = Gt, { userAgent: jt } = navigator, M = jt, I = /iPhone|iPad|iPod|Android/i;
S ? S.brands.some((t) => I.test(t.brand)) : I.test(M);
const z = /(iPhone|iPod|iPad)/, ln = S ? S.brands.some((t) => z.test(t.brand)) : z.test(M);
M ? M.includes("Firefox") : false;
const { head: N } = document;
["webkitPerspective", "perspective"].some((t) => t in N.style);
const Jt = (t, e2, n, o) => {
  const s = o || false;
  t.addEventListener(e2, n, s);
}, Kt = (t, e2, n, o) => {
  const s = o || false;
  t.removeEventListener(e2, n, s);
}, Xt = (t, e2, n, o) => {
  const s = (c) => {
    (c.target === t || c.currentTarget === t) && (n.apply(t, [c]), Kt(t, e2, s, o));
  };
  Jt(t, e2, s, o);
}, Yt = () => {
};
(() => {
  let t = false;
  try {
    const e2 = Object.defineProperty({}, "passive", {
      get: () => (t = true, t)
    });
    Xt(document, H, Yt, e2);
  } catch {
  }
  return t;
})();
["webkitTransform", "transform"].some((t) => t in N.style);
["webkitAnimation", "animation"].some((t) => t in N.style);
["webkitTransition", "transition"].some((t) => t in N.style);
const Zt = (t, e2) => t.getAttribute(e2), hn = (t, e2) => t.hasAttribute(e2), F = (t, e2, n) => t.setAttribute(e2, n), An = (t, e2) => t.removeAttribute(e2), Mn = (t, ...e2) => {
  t.classList.add(...e2);
}, Nn = (t, ...e2) => {
  t.classList.remove(...e2);
}, kn = (t, e2) => t.classList.contains(e2), v = (t) => t != null && typeof t == "object" || false, a = (t) => v(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((e2) => t.nodeType === e2) || false, u = (t) => a(t) && t.nodeType === 1 || false, y = /* @__PURE__ */ new Map(), L = {
  set: (t, e2, n) => {
    if (!u(t))
      return;
    y.has(e2) || y.set(e2, /* @__PURE__ */ new Map()), y.get(e2).set(t, n);
  },
  getAllFor: (t) => y.get(t) || null,
  get: (t, e2) => {
    if (!u(t) || !e2)
      return null;
    const n = L.getAllFor(e2);
    return t && n && n.get(t) || null;
  },
  remove: (t, e2) => {
    const n = L.getAllFor(e2);
    !n || !u(t) || (n.delete(t), n.size === 0 && y.delete(e2));
  }
}, Ln = (t, e2) => L.get(t, e2), g = (t) => typeof t == "string" || false, W = (t) => v(t) && t.constructor.name === "Window" || false, R = (t) => a(t) && t.nodeType === 9 || false, d = (t) => W(t) ? t.document : R(t) ? t : a(t) ? t.ownerDocument : window.document, h = (t) => Object.entries(t), $t = (t) => {
  if (!t)
    return;
  if (g(t))
    return d().createElement(t);
  const { tagName: e2 } = t, n = $t(e2);
  if (!n)
    return;
  const o = { ...t };
  return delete o.tagName, h(o).forEach(([s, c]) => {
    g(s) && g(c) && F(n, s, c);
  }), n;
}, Q = (t, e2) => t.dispatchEvent(e2), E = (t, e2) => {
  const n = getComputedStyle(t), o = e2.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(o);
}, ne = (t) => {
  const e2 = E(t, U), n = E(t, qt), o = n.includes("ms") ? 1 : 1e3, s = e2 && e2 !== "none" ? parseFloat(n) * o : 0;
  return Number.isNaN(s) ? 0 : s;
}, oe = (t) => {
  const e2 = E(t, U), n = E(t, Qt), o = n.includes("ms") ? 1 : 1e3, s = e2 && e2 !== "none" ? parseFloat(n) * o : 0;
  return Number.isNaN(s) ? 0 : s;
}, zn = (t, e2) => {
  let n = 0;
  const o = new Event(D), s = oe(t), c = ne(t);
  if (s) {
    const i = (l) => {
      l.target === t && (e2.apply(t, [l]), t.removeEventListener(D, i), n = 1);
    };
    t.addEventListener(D, i), setTimeout(() => {
      n || Q(t, o);
    }, s + c + 17);
  } else
    e2.apply(t, [o]);
}, Bn = (t, e2) => t.focus(e2), x = (t) => ["true", true].includes(t) ? true : ["false", false].includes(t) ? false : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, se = (t) => t.toLowerCase(), Hn = (t, e2, n, o) => {
  const s = { ...n }, c = { ...t.dataset }, i = { ...e2 }, l = {}, p = "title";
  return h(c).forEach(([r2, f]) => {
    const A = o && typeof r2 == "string" && r2.includes(o) ? r2.replace(o, "").replace(/[A-Z]/g, (G) => se(G)) : r2;
    l[A] = x(f);
  }), h(s).forEach(([r2, f]) => {
    s[r2] = x(f);
  }), h(e2).forEach(([r2, f]) => {
    r2 in s ? i[r2] = s[r2] : r2 in l ? i[r2] = l[r2] : i[r2] = r2 === p ? Zt(t, p) : f;
  }), i;
}, q = (t, ...e2) => Object.assign(t, ...e2), Un = (t) => Object.keys(t), Fn = (t) => Object.values(t), Wn = (t, e2) => {
  const n = new CustomEvent(t, {
    cancelable: true,
    bubbles: true
  });
  return v(e2) && q(n, e2), n;
}, Rn = { passive: true }, Qn = (t) => t.offsetHeight, qn = (t, e2) => {
  h(e2).forEach(([n, o]) => {
    if (o && g(n) && n.includes("--"))
      t.style.setProperty(n, o);
    else {
      const s = {};
      s[n] = o, q(t.style, s);
    }
  });
}, O = (t) => v(t) && t.constructor.name === "Map" || false, ce = (t) => typeof t == "number" || false, m = /* @__PURE__ */ new Map(), Gn = {
  set: (t, e2, n, o) => {
    !u(t) || (o && o.length ? (m.has(t) || m.set(t, /* @__PURE__ */ new Map()), m.get(t).set(o, setTimeout(e2, n))) : m.set(t, setTimeout(e2, n)));
  },
  get: (t, e2) => {
    if (!u(t))
      return null;
    const n = m.get(t);
    return e2 && n && O(n) ? n.get(e2) || null : ce(n) ? n : null;
  },
  clear: (t, e2) => {
    if (!u(t))
      return;
    const n = m.get(t);
    e2 && e2.length && O(n) ? (clearTimeout(n.get(e2)), n.delete(e2), n.size === 0 && m.delete(t)) : (clearTimeout(n), m.delete(t));
  }
}, w = (t, e2) => {
  const { width: n, height: o, top: s, right: c, bottom: i, left: l } = t.getBoundingClientRect();
  let p = 1, r2 = 1;
  if (e2 && u(t)) {
    const { offsetWidth: f, offsetHeight: A } = t;
    p = f > 0 ? Math.round(n) / f : 1, r2 = A > 0 ? Math.round(o) / A : 1;
  }
  return {
    width: n / p,
    height: o / r2,
    top: s / r2,
    right: c / p,
    bottom: i / r2,
    left: l / p,
    x: l / p,
    y: s / r2
  };
}, Jn = (t) => d(t).body, k = (t) => d(t).documentElement;
let V = 0, B = 0;
const b = /* @__PURE__ */ new Map(), ae = (t, e2) => {
  let n = e2 ? V : B;
  if (e2) {
    const o = ae(t), s = b.get(o) || /* @__PURE__ */ new Map();
    b.has(o) || b.set(o, s), O(s) && !s.has(e2) ? (s.set(e2, n), V += 1) : n = s.get(e2);
  } else {
    const o = t.id || t;
    b.has(o) ? n = b.get(o) : (b.set(o, n), B += 1);
  }
  return n;
}, $n = (t) => {
  var e2;
  return t ? R(t) ? t.defaultView : a(t) ? (e2 = t == null ? void 0 : t.ownerDocument) == null ? void 0 : e2.defaultView : t : window;
}, ue = (t) => Array.isArray(t) || false, eo = (t) => {
  if (!a(t))
    return false;
  const { top: e2, bottom: n } = w(t), { clientHeight: o } = k(t);
  return e2 <= o && n >= 0;
}, so = (t) => typeof t == "function" || false, uo = (t) => a(t) && ["SVG", "Image", "Video", "Canvas"].some((e2) => t.constructor.name.includes(e2)) || false, lo = (t) => v(t) && t.constructor.name === "NodeList" || false, po = (t) => k(t).dir === "rtl", de = (t, e2) => t ? t.closest(e2) || de(t.getRootNode().host, e2) : null, go = (t, e2) => u(t) ? t : (a(e2) ? e2 : d()).querySelector(t), pe = (t, e2) => (a(e2) ? e2 : d()).getElementsByTagName(t), bo = (t, e2) => (a(e2) ? e2 : d()).querySelectorAll(t), ho = (t, e2) => (e2 && a(e2) ? e2 : d()).getElementsByClassName(
  t
), yo = (t, e2) => t.matches(e2);
const fadeClass = "fade";
const showClass = "show";
const dataBsDismiss = "data-bs-dismiss";
const alertString = "alert";
const alertComponent = "Alert";
const version = "5.0.0-alpha1";
const Version = version;
class BaseComponent {
  element;
  options;
  constructor(target, config) {
    const element = go(target);
    if (!element) {
      if (g(target)) {
        throw Error(`${this.name} Error: "${target}" is not a valid selector.`);
      } else {
        throw Error(`${this.name} Error: your target is not an instance of HTMLElement.`);
      }
    }
    const prevInstance = L.get(element, this.name);
    if (prevInstance)
      prevInstance.dispose();
    this.element = element;
    if (this.defaults && Un(this.defaults).length) {
      this.options = Hn(element, this.defaults, config || {}, "bs");
    }
    L.set(element, this.name, this);
  }
  get version() {
    return Version;
  }
  get name() {
    return "BaseComponent";
  }
  get defaults() {
    return {};
  }
  dispose() {
    L.remove(this.element, this.name);
    Un(this).forEach((prop) => {
      delete this[prop];
    });
  }
}
const alertSelector = `.${alertString}`;
const alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`;
const getAlertInstance = (element) => Ln(element, alertComponent);
const alertInitCallback = (element) => new Alert(element);
const closeAlertEvent = Wn(`close.bs.${alertString}`);
const closedAlertEvent = Wn(`closed.bs.${alertString}`);
const alertTransitionEnd = (that) => {
  const { element } = that;
  toggleAlertHandler(that);
  Q(element, closedAlertEvent);
  that.dispose();
  element.remove();
};
const toggleAlertHandler = (that, add) => {
  const action = add ? E$1 : d$1;
  const { dismiss } = that;
  if (dismiss)
    action(dismiss, ut, that.close);
};
class Alert extends BaseComponent {
  static selector = alertSelector;
  static init = alertInitCallback;
  static getInstance = getAlertInstance;
  dismiss;
  constructor(target) {
    super(target);
    this.dismiss = go(alertDismissSelector, this.element);
    toggleAlertHandler(this, true);
  }
  get name() {
    return alertComponent;
  }
  close(e2) {
    const self = e2 ? getAlertInstance(de(e2.target, alertSelector)) : this;
    const { element } = self;
    if (element && kn(element, showClass)) {
      Q(element, closeAlertEvent);
      if (closeAlertEvent.defaultPrevented)
        return;
      Nn(element, showClass);
      if (kn(element, fadeClass)) {
        zn(element, () => alertTransitionEnd(self));
      } else
        alertTransitionEnd(self);
    }
  }
  dispose() {
    toggleAlertHandler(this);
    super.dispose();
  }
}
const activeClass = "active";
const dataBsToggle = "data-bs-toggle";
const buttonString = "button";
const buttonComponent = "Button";
const buttonSelector = `[${dataBsToggle}="${buttonString}"]`;
const getButtonInstance = (element) => Ln(element, buttonComponent);
const buttonInitCallback = (element) => new Button(element);
const toggleButtonHandler = (self, add) => {
  const action = add ? E$1 : d$1;
  action(self.element, ut, self.toggle);
};
class Button extends BaseComponent {
  static selector = buttonSelector;
  static init = buttonInitCallback;
  static getInstance = getButtonInstance;
  isActive = false;
  constructor(target) {
    super(target);
    const { element } = this;
    this.isActive = kn(element, activeClass);
    F(element, Ae, String(!!this.isActive));
    toggleButtonHandler(this, true);
  }
  get name() {
    return buttonComponent;
  }
  toggle(e2) {
    if (e2)
      e2.preventDefault();
    const self = e2 ? getButtonInstance(e2.target) : this;
    if (!self.element)
      return;
    const { element, isActive } = self;
    if (kn(element, "disabled"))
      return;
    const action = isActive ? Nn : Mn;
    action(element, activeClass);
    F(element, Ae, isActive ? "false" : "true");
    self.isActive = kn(element, activeClass);
  }
  dispose() {
    toggleButtonHandler(this);
    super.dispose();
  }
}
const dataBsTarget = "data-bs-target";
const carouselString = "carousel";
const carouselComponent = "Carousel";
const dataBsParent = "data-bs-parent";
const dataBsContainer = "data-bs-container";
const getTargetElement = (element) => {
  const targetAttr = [dataBsTarget, dataBsParent, dataBsContainer, "href"];
  const doc = d(element);
  return targetAttr.map((att) => {
    const attValue = Zt(element, att);
    if (attValue) {
      return att === dataBsParent ? de(element, attValue) : go(attValue, doc);
    }
    return null;
  }).filter((x2) => x2)[0];
};
const carouselSelector = `[data-bs-ride="${carouselString}"]`;
const carouselItem = `${carouselString}-item`;
const dataBsSlideTo = "data-bs-slide-to";
const dataBsSlide = "data-bs-slide";
const pausedClass = "paused";
const carouselDefaults = {
  pause: "hover",
  keyboard: false,
  touch: true,
  interval: 5e3
};
const getCarouselInstance = (element) => Ln(element, carouselComponent);
const carouselInitCallback = (element) => new Carousel(element);
let startX = 0;
let currentX = 0;
let endX = 0;
const carouselSlideEvent = Wn(`slide.bs.${carouselString}`);
const carouselSlidEvent = Wn(`slid.bs.${carouselString}`);
const carouselTransitionEndHandler = (self) => {
  const { index, direction, element, slides, options } = self;
  if (self.isAnimating && getCarouselInstance(element)) {
    const activeItem = getActiveIndex(self);
    const orientation = direction === "left" ? "next" : "prev";
    const directionClass = direction === "left" ? "start" : "end";
    Mn(slides[index], activeClass);
    Nn(slides[index], `${carouselItem}-${orientation}`);
    Nn(slides[index], `${carouselItem}-${directionClass}`);
    Nn(slides[activeItem], activeClass);
    Nn(slides[activeItem], `${carouselItem}-${directionClass}`);
    Q(element, carouselSlidEvent);
    Gn.clear(element, dataBsSlide);
    if (!d(element).hidden && options.interval && !self.isPaused) {
      self.cycle();
    }
  }
};
function carouselPauseHandler() {
  const self = getCarouselInstance(this);
  if (self && !self.isPaused && !Gn.get(this, pausedClass)) {
    Mn(this, pausedClass);
  }
}
function carouselResumeHandler() {
  const self = getCarouselInstance(this);
  if (self && self.isPaused && !Gn.get(this, pausedClass)) {
    self.cycle();
  }
}
function carouselIndicatorHandler(e2) {
  e2.preventDefault();
  const element = de(this, carouselSelector) || getTargetElement(this);
  const self = getCarouselInstance(element);
  if (!self || self.isAnimating)
    return;
  const newIndex = +(Zt(this, dataBsSlideTo) || 0);
  if (this && !kn(this, activeClass) && !Number.isNaN(newIndex)) {
    self.to(newIndex);
  }
}
function carouselControlsHandler(e2) {
  e2.preventDefault();
  const element = de(this, carouselSelector) || getTargetElement(this);
  const self = getCarouselInstance(element);
  if (!self || self.isAnimating)
    return;
  const orientation = Zt(this, dataBsSlide);
  if (orientation === "next") {
    self.next();
  } else if (orientation === "prev") {
    self.prev();
  }
}
const carouselKeyHandler = ({ code, target }) => {
  const doc = d(target);
  const [element] = [...bo(carouselSelector, doc)].filter((x2) => eo(x2));
  const self = getCarouselInstance(element);
  if (!self || self.isAnimating || /textarea|input/i.test(target.nodeName))
    return;
  const RTL = po(element);
  const arrowKeyNext = !RTL ? Fe : Ue;
  const arrowKeyPrev = !RTL ? Ue : Fe;
  if (code === arrowKeyPrev)
    self.prev();
  else if (code === arrowKeyNext)
    self.next();
};
function carouselPointerDownHandler(e2) {
  const { target } = e2;
  const self = getCarouselInstance(this);
  if (!self || self.isAnimating || self.isTouch) {
    return;
  }
  const { controls, indicators } = self;
  if ([...controls, ...indicators].some((el) => el === target || el.contains(target))) {
    return;
  }
  startX = e2.pageX;
  if (this.contains(target)) {
    self.isTouch = true;
    toggleCarouselTouchHandlers(self, true);
  }
}
const carouselPointerMoveHandler = (e2) => {
  currentX = e2.pageX;
};
const carouselPointerUpHandler = (e2) => {
  const { target } = e2;
  const doc = d(target);
  const self = [...bo(carouselSelector, doc)].map((c) => getCarouselInstance(c)).find((i) => i.isTouch);
  if (!self) {
    return;
  }
  const { element, index } = self;
  const RTL = po(element);
  self.isTouch = false;
  toggleCarouselTouchHandlers(self);
  if (doc.getSelection()?.toString().length) {
    startX = 0;
    currentX = 0;
    endX = 0;
    return;
  }
  endX = e2.pageX;
  if (!element.contains(target) || Math.abs(startX - endX) < 120) {
    startX = 0;
    currentX = 0;
    endX = 0;
    return;
  }
  if (currentX < startX) {
    self.to(index + (RTL ? -1 : 1));
  } else if (currentX > startX) {
    self.to(index + (RTL ? 1 : -1));
  }
  startX = 0;
  currentX = 0;
  endX = 0;
};
const activateCarouselIndicator = (self, pageIndex) => {
  const { indicators } = self;
  [...indicators].forEach((x2) => Nn(x2, activeClass));
  if (self.indicators[pageIndex])
    Mn(indicators[pageIndex], activeClass);
};
const toggleCarouselTouchHandlers = (self, add) => {
  const { element } = self;
  const action = add ? E$1 : d$1;
  action(d(element), kt, carouselPointerMoveHandler, Rn);
  action(d(element), Tt, carouselPointerUpHandler, Rn);
};
const toggleCarouselHandlers = (self, add) => {
  const { element, options, slides, controls, indicators } = self;
  const { touch, pause, interval, keyboard } = options;
  const action = add ? E$1 : d$1;
  if (pause && interval) {
    action(element, mt, carouselPauseHandler);
    action(element, gt, carouselResumeHandler);
  }
  if (touch && slides.length > 2) {
    action(element, Mt, carouselPointerDownHandler, Rn);
  }
  if (controls.length) {
    controls.forEach((arrow) => {
      if (arrow)
        action(arrow, ut, carouselControlsHandler);
    });
  }
  if (indicators.length) {
    indicators.forEach((indicator) => {
      action(indicator, ut, carouselIndicatorHandler);
    });
  }
  if (keyboard)
    action(d(element), ct, carouselKeyHandler);
};
const getActiveIndex = (self) => {
  const { slides, element } = self;
  const activeItem = go(`.${carouselItem}.${activeClass}`, element);
  return u(activeItem) ? [...slides].indexOf(activeItem) : -1;
};
class Carousel extends BaseComponent {
  static selector = carouselSelector;
  static init = carouselInitCallback;
  static getInstance = getCarouselInstance;
  constructor(target, config) {
    super(target, config);
    const { element } = this;
    this.direction = po(element) ? "right" : "left";
    this.index = 0;
    this.isTouch = false;
    this.slides = ho(carouselItem, element);
    const { slides } = this;
    if (slides.length < 2) {
      return;
    }
    const doc = d(element);
    this.controls = [
      ...bo(`[${dataBsSlide}]`, element),
      ...bo(`[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`, doc)
    ];
    this.indicator = go(`.${carouselString}-indicators`, element);
    this.indicators = [
      ...this.indicator ? bo(`[${dataBsSlideTo}]`, this.indicator) : [],
      ...bo(`[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`, doc)
    ];
    const { options } = this;
    this.options.interval = options.interval === true ? carouselDefaults.interval : options.interval;
    if (getActiveIndex(this) < 0) {
      Mn(slides[0], activeClass);
      if (this.indicators.length)
        activateCarouselIndicator(this, 0);
    }
    toggleCarouselHandlers(this, true);
    if (options.interval)
      this.cycle();
  }
  get name() {
    return carouselComponent;
  }
  get defaults() {
    return carouselDefaults;
  }
  get isPaused() {
    return kn(this.element, pausedClass);
  }
  get isAnimating() {
    return go(`.${carouselItem}-next,.${carouselItem}-prev`, this.element) !== null;
  }
  cycle() {
    const { element, options, isPaused, index } = this;
    Gn.clear(element, carouselString);
    if (isPaused) {
      Gn.clear(element, pausedClass);
      Nn(element, pausedClass);
    }
    Gn.set(
      element,
      () => {
        if (this.element && !this.isPaused && !this.isTouch && eo(element)) {
          this.to(index + 1);
        }
      },
      options.interval,
      carouselString
    );
  }
  pause() {
    const { element, options } = this;
    if (!this.isPaused && options.interval) {
      Mn(element, pausedClass);
      Gn.set(
        element,
        () => {
        },
        1,
        pausedClass
      );
    }
  }
  next() {
    if (!this.isAnimating) {
      this.to(this.index + 1);
    }
  }
  prev() {
    if (!this.isAnimating) {
      this.to(this.index - 1);
    }
  }
  to(idx) {
    const { element, slides, options } = this;
    const activeItem = getActiveIndex(this);
    const RTL = po(element);
    let next = idx;
    if (this.isAnimating || activeItem === next || Gn.get(element, dataBsSlide))
      return;
    if (activeItem < next || activeItem === 0 && next === slides.length - 1) {
      this.direction = RTL ? "right" : "left";
    } else if (activeItem > next || activeItem === slides.length - 1 && next === 0) {
      this.direction = RTL ? "left" : "right";
    }
    const { direction } = this;
    if (next < 0) {
      next = slides.length - 1;
    } else if (next >= slides.length) {
      next = 0;
    }
    const orientation = direction === "left" ? "next" : "prev";
    const directionClass = direction === "left" ? "start" : "end";
    const eventProperties = {
      relatedTarget: slides[next],
      from: activeItem,
      to: next,
      direction
    };
    q(carouselSlideEvent, eventProperties);
    q(carouselSlidEvent, eventProperties);
    Q(element, carouselSlideEvent);
    if (carouselSlideEvent.defaultPrevented)
      return;
    this.index = next;
    activateCarouselIndicator(this, next);
    if (oe(slides[next]) && kn(element, "slide")) {
      Gn.set(
        element,
        () => {
          Mn(slides[next], `${carouselItem}-${orientation}`);
          Qn(slides[next]);
          Mn(slides[next], `${carouselItem}-${directionClass}`);
          Mn(slides[activeItem], `${carouselItem}-${directionClass}`);
          zn(slides[next], () => carouselTransitionEndHandler(this));
        },
        0,
        dataBsSlide
      );
    } else {
      Mn(slides[next], activeClass);
      Nn(slides[activeItem], activeClass);
      Gn.set(
        element,
        () => {
          Gn.clear(element, dataBsSlide);
          if (element && options.interval && !this.isPaused) {
            this.cycle();
          }
          Q(element, carouselSlidEvent);
        },
        0,
        dataBsSlide
      );
    }
  }
  dispose() {
    const { slides } = this;
    const itemClasses = ["start", "end", "prev", "next"];
    [...slides].forEach((slide, idx) => {
      if (kn(slide, activeClass))
        activateCarouselIndicator(this, idx);
      itemClasses.forEach((c) => Nn(slide, `${carouselItem}-${c}`));
    });
    toggleCarouselHandlers(this);
    super.dispose();
  }
}
const collapsingClass = "collapsing";
const collapseString = "collapse";
const collapseComponent = "Collapse";
const collapseSelector = `.${collapseString}`;
const collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`;
const collapseDefaults = { parent: null };
const getCollapseInstance = (element) => Ln(element, collapseComponent);
const collapseInitCallback = (element) => new Collapse(element);
const showCollapseEvent = Wn(`show.bs.${collapseString}`);
const shownCollapseEvent = Wn(`shown.bs.${collapseString}`);
const hideCollapseEvent = Wn(`hide.bs.${collapseString}`);
const hiddenCollapseEvent = Wn(`hidden.bs.${collapseString}`);
const expandCollapse = (self) => {
  const { element, parent, triggers } = self;
  Q(element, showCollapseEvent);
  if (showCollapseEvent.defaultPrevented)
    return;
  Gn.set(element, Yt, 17);
  if (parent)
    Gn.set(parent, Yt, 17);
  Mn(element, collapsingClass);
  Nn(element, collapseString);
  qn(element, { height: `${element.scrollHeight}px` });
  zn(element, () => {
    Gn.clear(element);
    if (parent)
      Gn.clear(parent);
    triggers.forEach((btn) => F(btn, Ee, "true"));
    Nn(element, collapsingClass);
    Mn(element, collapseString);
    Mn(element, showClass);
    qn(element, { height: "" });
    Q(element, shownCollapseEvent);
  });
};
const collapseContent = (self) => {
  const { element, parent, triggers } = self;
  Q(element, hideCollapseEvent);
  if (hideCollapseEvent.defaultPrevented)
    return;
  Gn.set(element, Yt, 17);
  if (parent)
    Gn.set(parent, Yt, 17);
  qn(element, { height: `${element.scrollHeight}px` });
  Nn(element, collapseString);
  Nn(element, showClass);
  Mn(element, collapsingClass);
  Qn(element);
  qn(element, { height: "0px" });
  zn(element, () => {
    Gn.clear(element);
    if (parent)
      Gn.clear(parent);
    triggers.forEach((btn) => F(btn, Ee, "false"));
    Nn(element, collapsingClass);
    Mn(element, collapseString);
    qn(element, { height: "" });
    Q(element, hiddenCollapseEvent);
  });
};
const toggleCollapseHandler = (self, add) => {
  const action = add ? E$1 : d$1;
  const { triggers } = self;
  if (triggers.length) {
    triggers.forEach((btn) => action(btn, ut, collapseClickHandler));
  }
};
const collapseClickHandler = (e2) => {
  const { target } = e2;
  const trigger = target && de(target, collapseToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getCollapseInstance(element);
  if (self)
    self.toggle();
  if (trigger && trigger.tagName === "A")
    e2.preventDefault();
};
class Collapse extends BaseComponent {
  static selector = collapseSelector;
  static init = collapseInitCallback;
  static getInstance = getCollapseInstance;
  constructor(target, config) {
    super(target, config);
    const { element, options } = this;
    const doc = d(element);
    this.triggers = [...bo(collapseToggleSelector, doc)].filter((btn) => getTargetElement(btn) === element);
    this.parent = go(options.parent, doc) || getTargetElement(element) || null;
    toggleCollapseHandler(this, true);
  }
  get name() {
    return collapseComponent;
  }
  get defaults() {
    return collapseDefaults;
  }
  toggle() {
    if (!kn(this.element, showClass))
      this.show();
    else
      this.hide();
  }
  hide() {
    const { triggers, element } = this;
    if (Gn.get(element))
      return;
    collapseContent(this);
    if (triggers.length) {
      triggers.forEach((btn) => Mn(btn, `${collapseString}d`));
    }
  }
  show() {
    const { element, parent, triggers } = this;
    let activeCollapse;
    let activeCollapseInstance;
    if (parent) {
      activeCollapse = [...bo(`.${collapseString}.${showClass}`, parent)].find(
        (i) => getCollapseInstance(i)
      );
      activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse);
    }
    if ((!parent || !Gn.get(parent)) && !Gn.get(element)) {
      if (activeCollapseInstance && activeCollapse !== element) {
        collapseContent(activeCollapseInstance);
        activeCollapseInstance.triggers.forEach((btn) => {
          Mn(btn, `${collapseString}d`);
        });
      }
      expandCollapse(this);
      if (triggers.length) {
        triggers.forEach((btn) => Nn(btn, `${collapseString}d`));
      }
    }
  }
  dispose() {
    toggleCollapseHandler(this);
    super.dispose();
  }
}
const dropdownMenuClasses = ["dropdown", "dropup", "dropstart", "dropend"];
const dropdownComponent = "Dropdown";
const dropdownMenuClass = "dropdown-menu";
const isEmptyAnchor = (element) => {
  const parentAnchor = de(element, "A");
  return element.tagName === "A" && hn(element, "href") && element.href.slice(-1) === "#" || parentAnchor && hn(parentAnchor, "href") && parentAnchor.href.slice(-1) === "#";
};
const [dropdownString, dropupString, dropstartString, dropendString] = dropdownMenuClasses;
const dropdownSelector = `[${dataBsToggle}="${dropdownString}"],[${dataBsToggle}="${dropupString}"],[${dataBsToggle}="${dropendString}"],[${dataBsToggle}="${dropstartString}"]`;
const getDropdownInstance = (element) => Ln(element, dropdownComponent);
const dropdownInitCallback = (element) => new Dropdown(element);
const dropdownMenuEndClass = `${dropdownMenuClass}-end`;
const verticalClass = [dropdownString, dropupString];
const horizontalClass = [dropstartString, dropendString];
const menuFocusTags = ["A", "BUTTON"];
const dropdownDefaults = {
  offset: 5,
  display: "dynamic"
};
const showDropdownEvent = Wn(`show.bs.${dropdownString}`);
const shownDropdownEvent = Wn(`shown.bs.${dropdownString}`);
const hideDropdownEvent = Wn(`hide.bs.${dropdownString}`);
const hiddenDropdownEvent = Wn(`hidden.bs.${dropdownString}`);
const styleDropdown = (self) => {
  const { element, menu, parentElement, options } = self;
  const { offset } = options;
  if (E(menu, "position") === "static")
    return;
  const RTL = po(element);
  const menuEnd = kn(menu, dropdownMenuEndClass);
  const resetProps = ["margin", "top", "bottom", "left", "right"];
  resetProps.forEach((p) => {
    const style = {};
    style[p] = "";
    qn(menu, style);
  });
  let positionClass = dropdownMenuClasses.find((c) => kn(parentElement, c)) || dropdownString;
  const dropdownMargin = {
    dropdown: [offset, 0, 0],
    dropup: [0, 0, offset],
    dropstart: RTL ? [-1, 0, 0, offset] : [-1, offset, 0],
    dropend: RTL ? [-1, offset, 0] : [-1, 0, 0, offset]
  };
  const dropdownPosition = {
    dropdown: { top: "100%" },
    dropup: { top: "auto", bottom: "100%" },
    dropstart: RTL ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
    dropend: RTL ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
    menuStart: RTL ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
    menuEnd: RTL ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
  };
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu;
  const { clientWidth, clientHeight } = k(element);
  const { left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight } = w(element);
  const leftFullExceed = targetLeft - menuWidth - offset < 0;
  const rightFullExceed = targetLeft + menuWidth + targetWidth + offset >= clientWidth;
  const bottomExceed = targetTop + menuHeight + offset >= clientHeight;
  const bottomFullExceed = targetTop + menuHeight + targetHeight + offset >= clientHeight;
  const topExceed = targetTop - menuHeight - offset < 0;
  const leftExceed = (!RTL && menuEnd || RTL && !menuEnd) && targetLeft + targetWidth - menuWidth < 0;
  const rightExceed = (RTL && menuEnd || !RTL && !menuEnd) && targetLeft + menuWidth >= clientWidth;
  if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropstartString && (!RTL ? leftFullExceed : rightFullExceed)) {
    positionClass = dropendString;
  }
  if (positionClass === dropendString && (RTL ? leftFullExceed : rightFullExceed)) {
    positionClass = dropstartString;
  }
  if (positionClass === dropupString && topExceed && !bottomFullExceed) {
    positionClass = dropdownString;
  }
  if (positionClass === dropdownString && bottomFullExceed && !topExceed) {
    positionClass = dropupString;
  }
  if (horizontalClass.includes(positionClass) && bottomExceed) {
    q(dropdownPosition[positionClass], {
      top: "auto",
      bottom: 0
    });
  }
  if (verticalClass.includes(positionClass) && (leftExceed || rightExceed)) {
    let posAjust = { left: "auto", right: "auto" };
    if (!leftExceed && rightExceed && !RTL)
      posAjust = { left: "auto", right: 0 };
    if (leftExceed && !rightExceed && RTL)
      posAjust = { left: 0, right: "auto" };
    if (posAjust)
      q(dropdownPosition[positionClass], posAjust);
  }
  const margins = dropdownMargin[positionClass];
  qn(menu, {
    ...dropdownPosition[positionClass],
    margin: `${margins.map((x2) => x2 ? `${x2}px` : x2).join(" ")}`
  });
  if (verticalClass.includes(positionClass) && menuEnd) {
    if (menuEnd) {
      const endAdjust = !RTL && leftExceed || RTL && rightExceed ? "menuStart" : "menuEnd";
      qn(menu, dropdownPosition[endAdjust]);
    }
  }
};
const getMenuItems = (menu) => {
  return [...menu.children].map((c) => {
    if (c && menuFocusTags.includes(c.tagName))
      return c;
    const { firstElementChild } = c;
    if (firstElementChild && menuFocusTags.includes(firstElementChild.tagName)) {
      return firstElementChild;
    }
    return null;
  }).filter((c) => c);
};
const toggleDropdownDismiss = (self) => {
  const { element, options } = self;
  const action = self.open ? E$1 : d$1;
  const doc = d(element);
  action(doc, ut, dropdownDismissHandler);
  action(doc, _, dropdownDismissHandler);
  action(doc, ct, dropdownPreventScroll);
  action(doc, it, dropdownKeyHandler);
  if (options.display === "dynamic") {
    [xt, Lt].forEach((ev) => {
      action($n(element), ev, dropdownLayoutHandler, Rn);
    });
  }
};
const toggleDropdownHandler = (self, add) => {
  const action = add ? E$1 : d$1;
  action(self.element, ut, dropdownClickHandler);
};
const getCurrentOpenDropdown = (element) => {
  const currentParent = [...dropdownMenuClasses, "btn-group", "input-group"].map((c) => ho(`${c} ${showClass}`, d(element))).find((x2) => x2.length);
  if (currentParent && currentParent.length) {
    return [...currentParent[0].children].find(
      (x2) => dropdownMenuClasses.some((c) => c === Zt(x2, dataBsToggle))
    );
  }
  return void 0;
};
const dropdownDismissHandler = (e2) => {
  const { target, type } = e2;
  if (!target || !target.closest)
    return;
  const element = getCurrentOpenDropdown(target);
  const self = element && getDropdownInstance(element);
  if (!self)
    return;
  const { parentElement, menu } = self;
  const hasData = de(target, dropdownSelector) !== null;
  const isForm = parentElement && parentElement.contains(target) && (target.tagName === "form" || de(target, "form") !== null);
  if (type === ut && isEmptyAnchor(target)) {
    e2.preventDefault();
  }
  if (type === _ && (target === element || target === menu || menu.contains(target))) {
    return;
  }
  if (isForm || hasData)
    ;
  else if (self) {
    self.hide();
  }
};
const dropdownClickHandler = (e2) => {
  const { target } = e2;
  const element = target && de(target, dropdownSelector);
  const self = element && getDropdownInstance(element);
  if (self) {
    e2.stopImmediatePropagation();
    self.toggle();
    if (element && isEmptyAnchor(element))
      e2.preventDefault();
  }
};
const dropdownPreventScroll = (e2) => {
  if ([He, Pe].includes(e2.code))
    e2.preventDefault();
};
function dropdownKeyHandler(e2) {
  const { code } = e2;
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);
  const { activeElement } = element && d(element);
  if (!self || !activeElement)
    return;
  const { menu, open } = self;
  const menuItems = getMenuItems(menu);
  if (menuItems && menuItems.length && [He, Pe].includes(code)) {
    let idx = menuItems.indexOf(activeElement);
    if (activeElement === element) {
      idx = 0;
    } else if (code === Pe) {
      idx = idx > 1 ? idx - 1 : 0;
    } else if (code === He) {
      idx = idx < menuItems.length - 1 ? idx + 1 : idx;
    }
    if (menuItems[idx])
      Bn(menuItems[idx]);
  }
  if (je === code && open) {
    self.toggle();
    Bn(element);
  }
}
function dropdownLayoutHandler() {
  const element = getCurrentOpenDropdown(this);
  const self = element && getDropdownInstance(element);
  if (self && self.open)
    styleDropdown(self);
}
class Dropdown extends BaseComponent {
  static selector = dropdownSelector;
  static init = dropdownInitCallback;
  static getInstance = getDropdownInstance;
  constructor(target, config) {
    super(target, config);
    const { parentElement } = this.element;
    this.parentElement = parentElement;
    this.menu = go(`.${dropdownMenuClass}`, parentElement);
    toggleDropdownHandler(this, true);
  }
  get name() {
    return dropdownComponent;
  }
  get defaults() {
    return dropdownDefaults;
  }
  toggle() {
    if (this.open)
      this.hide();
    else
      this.show();
  }
  show() {
    const { element, open, menu, parentElement } = this;
    if (open)
      return;
    const currentElement = getCurrentOpenDropdown(element);
    const currentInstance = currentElement && getDropdownInstance(currentElement);
    if (currentInstance)
      currentInstance.hide();
    [showDropdownEvent, shownDropdownEvent].forEach((e2) => {
      e2.relatedTarget = element;
    });
    Q(parentElement, showDropdownEvent);
    if (showDropdownEvent.defaultPrevented)
      return;
    Mn(menu, showClass);
    Mn(parentElement, showClass);
    F(element, Ee, "true");
    styleDropdown(this);
    this.open = !open;
    Bn(element);
    toggleDropdownDismiss(this);
    Q(parentElement, shownDropdownEvent);
  }
  hide() {
    const { element, open, menu, parentElement } = this;
    if (!open)
      return;
    [hideDropdownEvent, hiddenDropdownEvent].forEach((e2) => {
      e2.relatedTarget = element;
    });
    Q(parentElement, hideDropdownEvent);
    if (hideDropdownEvent.defaultPrevented)
      return;
    Nn(menu, showClass);
    Nn(parentElement, showClass);
    F(element, Ee, "false");
    this.open = !open;
    toggleDropdownDismiss(this);
    Q(parentElement, hiddenDropdownEvent);
  }
  dispose() {
    if (this.open)
      this.hide();
    toggleDropdownHandler(this);
    super.dispose();
  }
}
const modalString = "modal";
const modalComponent = "Modal";
const fixedTopClass = "fixed-top";
const fixedBottomClass = "fixed-bottom";
const stickyTopClass = "sticky-top";
const positionStickyClass = "position-sticky";
const getFixedItems = (parent) => [
  ...ho(fixedTopClass, parent),
  ...ho(fixedBottomClass, parent),
  ...ho(stickyTopClass, parent),
  ...ho(positionStickyClass, parent),
  ...ho("is-fixed", parent)
];
const resetScrollbar = (element) => {
  const bd = Jn(element);
  qn(bd, {
    paddingRight: "",
    overflow: ""
  });
  const fixedItems = getFixedItems(bd);
  if (fixedItems.length) {
    fixedItems.forEach((fixed) => {
      qn(fixed, {
        paddingRight: "",
        marginRight: ""
      });
    });
  }
};
const measureScrollbar = (element) => {
  const { clientWidth } = k(element);
  const { innerWidth } = $n(element);
  return Math.abs(innerWidth - clientWidth);
};
const setScrollbar = (element, overflow) => {
  const bd = Jn(element);
  const bodyPad = parseInt(E(bd, "paddingRight"), 10);
  const isOpen = E(bd, "overflow") === "hidden";
  const sbWidth = isOpen && bodyPad ? 0 : measureScrollbar(element);
  const fixedItems = getFixedItems(bd);
  if (overflow) {
    qn(bd, {
      overflow: "hidden",
      paddingRight: `${bodyPad + sbWidth}px`
    });
    if (fixedItems.length) {
      fixedItems.forEach((fixed) => {
        const itemPadValue = E(fixed, "paddingRight");
        fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`;
        if ([stickyTopClass, positionStickyClass].some((c) => kn(fixed, c))) {
          const itemMValue = E(fixed, "marginRight");
          fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
        }
      });
    }
  }
};
const offcanvasString = "offcanvas";
const popupContainer = $t({ tagName: "DIV" });
const appendPopup = (target) => {
  const BODY = Jn(target);
  if (a(target)) {
    if (!BODY.contains(popupContainer)) {
      BODY.append(popupContainer);
    }
    popupContainer.append(target);
  }
};
const removePopup = (target) => {
  if (a(target)) {
    target.remove();
    if (!popupContainer.children.length) {
      popupContainer.remove();
    }
  }
};
const hasPopup = (target) => {
  return popupContainer.contains(target);
};
const backdropString = "backdrop";
const modalBackdropClass = `${modalString}-${backdropString}`;
const offcanvasBackdropClass = `${offcanvasString}-${backdropString}`;
const modalActiveSelector = `.${modalString}.${showClass}`;
const offcanvasActiveSelector = `.${offcanvasString}.${showClass}`;
const overlay = $t("div");
const getCurrentOpen = (element) => {
  return go(`${modalActiveSelector},${offcanvasActiveSelector}`, d(element));
};
const toggleOverlayType = (isModal) => {
  const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
  [modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
    Nn(overlay, c);
  });
  Mn(overlay, targetClass);
};
const appendOverlay = (hasFade, isModal) => {
  toggleOverlayType(isModal);
  appendPopup(overlay);
  if (hasFade)
    Mn(overlay, fadeClass);
};
const showOverlay = () => {
  if (!kn(overlay, showClass)) {
    Mn(overlay, showClass);
    Qn(overlay);
  }
};
const hideOverlay = () => {
  Nn(overlay, showClass);
};
const removeOverlay = (element) => {
  if (!getCurrentOpen(element)) {
    Nn(overlay, fadeClass);
    removePopup(overlay);
    resetScrollbar(element);
  }
};
const isVisible = (element) => {
  return u(element) && E(element, "visibility") !== "hidden" && element.offsetParent !== null;
};
const modalSelector = `.${modalString}`;
const modalToggleSelector = `[${dataBsToggle}="${modalString}"]`;
const modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`;
const modalStaticClass = `${modalString}-static`;
const modalDefaults = {
  backdrop: true,
  keyboard: true
};
const getModalInstance = (element) => Ln(element, modalComponent);
const modalInitCallback = (element) => new Modal(element);
const showModalEvent = Wn(`show.bs.${modalString}`);
const shownModalEvent = Wn(`shown.bs.${modalString}`);
const hideModalEvent = Wn(`hide.bs.${modalString}`);
const hiddenModalEvent = Wn(`hidden.bs.${modalString}`);
const setModalScrollbar = (self) => {
  const { element } = self;
  const scrollbarWidth = measureScrollbar(element);
  const { clientHeight, scrollHeight } = k(element);
  const { clientHeight: modalHeight, scrollHeight: modalScrollHeight } = element;
  const modalOverflow = modalHeight !== modalScrollHeight;
  if (!modalOverflow && scrollbarWidth) {
    const pad = !po(element) ? "paddingRight" : "paddingLeft";
    const padStyle = {};
    padStyle[pad] = `${scrollbarWidth}px`;
    qn(element, padStyle);
  }
  setScrollbar(element, modalOverflow || clientHeight !== scrollHeight);
};
const toggleModalDismiss = (self, add) => {
  const action = add ? E$1 : d$1;
  const { element } = self;
  action(element, ut, modalDismissHandler);
  action($n(element), Lt, self.update, Rn);
  action(d(element), ct, modalKeyHandler);
};
const toggleModalHandler = (self, add) => {
  const action = add ? E$1 : d$1;
  const { triggers } = self;
  if (triggers.length) {
    triggers.forEach((btn) => action(btn, ut, modalClickHandler));
  }
};
const afterModalHide = (self, callback) => {
  const { triggers, element, relatedTarget } = self;
  removeOverlay(element);
  qn(element, { paddingRight: "", display: "" });
  toggleModalDismiss(self);
  const focusElement = showModalEvent.relatedTarget || triggers.find(isVisible);
  if (focusElement)
    Bn(focusElement);
  if (so(callback))
    callback();
  hiddenModalEvent.relatedTarget = relatedTarget;
  Q(element, hiddenModalEvent);
};
const afterModalShow = (self) => {
  const { element, relatedTarget } = self;
  Bn(element);
  toggleModalDismiss(self, true);
  shownModalEvent.relatedTarget = relatedTarget;
  Q(element, shownModalEvent);
};
const beforeModalShow = (self) => {
  const { element, hasFade } = self;
  qn(element, { display: "block" });
  setModalScrollbar(self);
  if (!getCurrentOpen(element)) {
    qn(Jn(element), { overflow: "hidden" });
  }
  Mn(element, showClass);
  An(element, be);
  F(element, we, "true");
  if (hasFade)
    zn(element, () => afterModalShow(self));
  else
    afterModalShow(self);
};
const beforeModalHide = (self, callback) => {
  const { element, options, hasFade } = self;
  if (options.backdrop && !callback && hasFade && kn(overlay, showClass) && !getCurrentOpen(element)) {
    hideOverlay();
    zn(overlay, () => afterModalHide(self));
  } else {
    afterModalHide(self, callback);
  }
};
const modalClickHandler = (e2) => {
  const { target } = e2;
  const trigger = target && de(target, modalToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getModalInstance(element);
  if (!self)
    return;
  if (trigger && trigger.tagName === "A")
    e2.preventDefault();
  self.relatedTarget = trigger;
  self.toggle();
};
const modalKeyHandler = ({ code, target }) => {
  const element = go(modalActiveSelector, d(target));
  const self = element && getModalInstance(element);
  if (!self)
    return;
  const { options } = self;
  if (options.keyboard && code === je && kn(element, showClass)) {
    self.relatedTarget = null;
    self.hide();
  }
};
function modalDismissHandler(e2) {
  const self = getModalInstance(this);
  if (!self || Gn.get(this))
    return;
  const { options, isStatic, modalDialog } = self;
  const { backdrop } = options;
  const { target } = e2;
  const selectedText = d(this)?.getSelection()?.toString().length;
  const targetInsideDialog = modalDialog?.contains(target);
  const dismiss = target && de(target, modalDismissSelector);
  if (isStatic && !targetInsideDialog) {
    Gn.set(
      this,
      () => {
        Mn(this, modalStaticClass);
        zn(modalDialog, () => staticTransitionEnd(self));
      },
      17
    );
  } else if (dismiss || !selectedText && !isStatic && !targetInsideDialog && backdrop) {
    self.relatedTarget = dismiss || null;
    self.hide();
    e2.preventDefault();
  }
}
const staticTransitionEnd = (self) => {
  const { element, modalDialog } = self;
  const duration = (u(modalDialog) ? oe(modalDialog) : 0) + 17;
  Nn(element, modalStaticClass);
  Gn.set(element, () => Gn.clear(element), duration);
};
class Modal extends BaseComponent {
  static selector = modalSelector;
  static init = modalInitCallback;
  static getInstance = getModalInstance;
  constructor(target, config) {
    super(target, config);
    const { element } = this;
    this.modalDialog = go(`.${modalString}-dialog`, element);
    this.triggers = [...bo(modalToggleSelector, d(element))].filter(
      (btn) => getTargetElement(btn) === element
    );
    this.isStatic = this.options.backdrop === "static";
    this.hasFade = kn(element, fadeClass);
    this.relatedTarget = null;
    toggleModalHandler(this, true);
    this.update = this.update.bind(this);
  }
  get name() {
    return modalComponent;
  }
  get defaults() {
    return modalDefaults;
  }
  toggle() {
    if (kn(this.element, showClass))
      this.hide();
    else
      this.show();
  }
  show() {
    const { element, options, hasFade, relatedTarget } = this;
    const { backdrop } = options;
    let overlayDelay = 0;
    if (kn(element, showClass))
      return;
    showModalEvent.relatedTarget = relatedTarget || void 0;
    Q(element, showModalEvent);
    if (showModalEvent.defaultPrevented)
      return;
    const currentOpen = getCurrentOpen(element);
    if (currentOpen && currentOpen !== element) {
      const this1 = getModalInstance(currentOpen);
      const that1 = this1 || Ln(currentOpen, "Offcanvas");
      if (that1)
        that1.hide();
    }
    if (backdrop) {
      if (!hasPopup(overlay)) {
        appendOverlay(hasFade, true);
      } else {
        toggleOverlayType(true);
      }
      overlayDelay = oe(overlay);
      showOverlay();
      setTimeout(() => beforeModalShow(this), overlayDelay);
    } else {
      beforeModalShow(this);
      if (currentOpen && kn(overlay, showClass)) {
        hideOverlay();
      }
    }
  }
  hide(callback) {
    const { element, hasFade, relatedTarget } = this;
    if (!kn(element, showClass))
      return;
    hideModalEvent.relatedTarget = relatedTarget || void 0;
    Q(element, hideModalEvent);
    if (hideModalEvent.defaultPrevented)
      return;
    Nn(element, showClass);
    F(element, be, "true");
    An(element, we);
    if (hasFade) {
      zn(element, () => beforeModalHide(this, callback));
    } else {
      beforeModalHide(this, callback);
    }
  }
  update() {
    if (kn(this.element, showClass))
      setModalScrollbar(this);
  }
  dispose() {
    toggleModalHandler(this);
    this.hide(() => super.dispose());
  }
}
const offcanvasComponent = "Offcanvas";
const offcanvasSelector = `.${offcanvasString}`;
const offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`;
const offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`;
const offcanvasTogglingClass = `${offcanvasString}-toggling`;
const offcanvasDefaults = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const getOffcanvasInstance = (element) => Ln(element, offcanvasComponent);
const offcanvasInitCallback = (element) => new Offcanvas(element);
const showOffcanvasEvent = Wn(`show.bs.${offcanvasString}`);
const shownOffcanvasEvent = Wn(`shown.bs.${offcanvasString}`);
const hideOffcanvasEvent = Wn(`hide.bs.${offcanvasString}`);
const hiddenOffcanvasEvent = Wn(`hidden.bs.${offcanvasString}`);
const setOffCanvasScrollbar = (self) => {
  const { element } = self;
  const { clientHeight, scrollHeight } = k(element);
  setScrollbar(element, clientHeight !== scrollHeight);
};
const toggleOffcanvasEvents = (self, add) => {
  const action = add ? E$1 : d$1;
  self.triggers.forEach((btn) => action(btn, ut, offcanvasTriggerHandler));
};
const toggleOffCanvasDismiss = (self, add) => {
  const action = add ? E$1 : d$1;
  const doc = d(self.element);
  action(doc, ct, offcanvasKeyDismissHandler);
  action(doc, ut, offcanvasDismissHandler);
};
const beforeOffcanvasShow = (self) => {
  const { element, options } = self;
  if (!options.scroll) {
    setOffCanvasScrollbar(self);
    qn(Jn(element), { overflow: "hidden" });
  }
  Mn(element, offcanvasTogglingClass);
  Mn(element, showClass);
  qn(element, { visibility: "visible" });
  zn(element, () => showOffcanvasComplete(self));
};
const beforeOffcanvasHide = (self, callback) => {
  const { element, options } = self;
  const currentOpen = getCurrentOpen(element);
  element.blur();
  if (!currentOpen && options.backdrop && kn(overlay, showClass)) {
    hideOverlay();
    zn(overlay, () => hideOffcanvasComplete(self, callback));
  } else
    hideOffcanvasComplete(self, callback);
};
const offcanvasTriggerHandler = (e2) => {
  const trigger = de(e2.target, offcanvasToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getOffcanvasInstance(element);
  if (self) {
    self.relatedTarget = trigger;
    self.toggle();
    if (trigger && trigger.tagName === "A") {
      e2.preventDefault();
    }
  }
};
const offcanvasDismissHandler = (e2) => {
  const { target } = e2;
  const element = go(offcanvasActiveSelector, d(target));
  const offCanvasDismiss = go(offcanvasDismissSelector, element);
  const self = element && getOffcanvasInstance(element);
  if (!self)
    return;
  const { options, triggers } = self;
  const { backdrop } = options;
  const trigger = de(target, offcanvasToggleSelector);
  const selection = d(element).getSelection();
  if (overlay.contains(target) && backdrop === "static")
    return;
  if (!(selection && selection.toString().length) && (!element.contains(target) && backdrop && (!trigger || triggers.includes(target)) || offCanvasDismiss && offCanvasDismiss.contains(target))) {
    self.relatedTarget = offCanvasDismiss && offCanvasDismiss.contains(target) ? offCanvasDismiss : null;
    self.hide();
  }
  if (trigger && trigger.tagName === "A")
    e2.preventDefault();
};
const offcanvasKeyDismissHandler = ({ code, target }) => {
  const element = go(offcanvasActiveSelector, d(target));
  const self = element && getOffcanvasInstance(element);
  if (!self)
    return;
  if (self.options.keyboard && code === je) {
    self.relatedTarget = null;
    self.hide();
  }
};
const showOffcanvasComplete = (self) => {
  const { element } = self;
  Nn(element, offcanvasTogglingClass);
  An(element, be);
  F(element, we, "true");
  F(element, "role", "dialog");
  Q(element, shownOffcanvasEvent);
  toggleOffCanvasDismiss(self, true);
  Bn(element);
};
const hideOffcanvasComplete = (self, callback) => {
  const { element, triggers } = self;
  F(element, be, "true");
  An(element, we);
  An(element, "role");
  qn(element, { visibility: "" });
  const visibleTrigger = showOffcanvasEvent.relatedTarget || triggers.find(isVisible);
  if (visibleTrigger)
    Bn(visibleTrigger);
  removeOverlay(element);
  Q(element, hiddenOffcanvasEvent);
  Nn(element, offcanvasTogglingClass);
  if (!getCurrentOpen(element)) {
    toggleOffCanvasDismiss(self);
  }
  if (so(callback))
    callback();
};
class Offcanvas extends BaseComponent {
  static selector = offcanvasSelector;
  static init = offcanvasInitCallback;
  static getInstance = getOffcanvasInstance;
  constructor(target, config) {
    super(target, config);
    const { element } = this;
    this.triggers = [...bo(offcanvasToggleSelector, d(element))].filter(
      (btn) => getTargetElement(btn) === element
    );
    this.relatedTarget = null;
    toggleOffcanvasEvents(this, true);
  }
  get name() {
    return offcanvasComponent;
  }
  get defaults() {
    return offcanvasDefaults;
  }
  toggle() {
    if (kn(this.element, showClass))
      this.hide();
    else
      this.show();
  }
  show() {
    const { element, options, relatedTarget } = this;
    let overlayDelay = 0;
    if (kn(element, showClass))
      return;
    showOffcanvasEvent.relatedTarget = relatedTarget || void 0;
    shownOffcanvasEvent.relatedTarget = relatedTarget || void 0;
    Q(element, showOffcanvasEvent);
    if (showOffcanvasEvent.defaultPrevented)
      return;
    const currentOpen = getCurrentOpen(element);
    if (currentOpen && currentOpen !== element) {
      const this1 = getOffcanvasInstance(currentOpen);
      const that1 = this1 || Ln(currentOpen, "Modal");
      if (that1)
        that1.hide();
    }
    if (options.backdrop) {
      if (!hasPopup(overlay)) {
        appendOverlay(true);
      } else {
        toggleOverlayType();
      }
      overlayDelay = oe(overlay);
      showOverlay();
      setTimeout(() => beforeOffcanvasShow(this), overlayDelay);
    } else {
      beforeOffcanvasShow(this);
      if (currentOpen && kn(overlay, showClass)) {
        hideOverlay();
      }
    }
  }
  hide(callback) {
    const { element, relatedTarget } = this;
    if (!kn(element, showClass))
      return;
    hideOffcanvasEvent.relatedTarget = relatedTarget || void 0;
    hiddenOffcanvasEvent.relatedTarget = relatedTarget || void 0;
    Q(element, hideOffcanvasEvent);
    if (hideOffcanvasEvent.defaultPrevented)
      return;
    Mn(element, offcanvasTogglingClass);
    Nn(element, showClass);
    if (!callback) {
      zn(element, () => beforeOffcanvasHide(this, callback));
    } else
      beforeOffcanvasHide(this, callback);
  }
  dispose() {
    toggleOffcanvasEvents(this);
    this.hide(() => super.dispose());
  }
}
const popoverString = "popover";
const popoverComponent = "Popover";
const tooltipString = "tooltip";
const getTipTemplate = (tipType) => {
  const isTooltip = tipType === tooltipString;
  const bodyClass = isTooltip ? `${tipType}-inner` : `${tipType}-body`;
  const header = !isTooltip ? `<h3 class="${tipType}-header"></h3>` : "";
  const arrow = `<div class="${tipType}-arrow"></div>`;
  const body = `<div class="${bodyClass}"></div>`;
  return `<div class="${tipType}" role="${tooltipString}">${header + arrow + body}</div>`;
};
const tipClassPositions = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
};
const styleTip = (self, e2) => {
  const tipClasses = /\b(top|bottom|start|end)+/;
  const { element, tooltip, options, arrow } = self;
  if (!tooltip)
    return;
  const tipPositions = { ...tipClassPositions };
  const RTL = po(element);
  if (RTL) {
    tipPositions.left = "end";
    tipPositions.right = "start";
  }
  qn(tooltip, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  const isPopover = self.name === popoverComponent;
  const { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip;
  const { clientWidth: htmlcw, clientHeight: htmlch } = k(element);
  let { placement } = options;
  const { left: parentLeft, right: parentRight, top: parentTop } = w(popupContainer, true);
  const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = popupContainer;
  const scrollbarWidth = Math.abs(parentCWidth - parentOWidth);
  const parentPosition = E(popupContainer, "position");
  const fixedParent = parentPosition === "fixed";
  const staticParent = parentPosition === "static";
  const leftBoundry = RTL && fixedParent ? scrollbarWidth : 0;
  const rightBoundry = fixedParent ? parentCWidth + parentLeft + (RTL ? scrollbarWidth : 0) : parentCWidth + parentLeft + (htmlcw - parentRight) - 1;
  const {
    width: elemWidth,
    height: elemHeight,
    left: elemRectLeft,
    right: elemRectRight,
    top: elemRectTop
  } = w(element, true);
  console.log($n(tooltip));
  const win = $n(tooltip);
  const scroll = { x: win.scrollX, y: win.scrollY };
  const { x: x2, y: y2 } = { x: elemRectLeft + scroll.x, y: elemRectTop + scroll.y };
  qn(arrow, {
    top: "",
    left: "",
    right: "",
    bottom: ""
  });
  let topPosition = 0;
  let leftPosition = 0;
  let rightPosition = 0;
  let arrowTop = 0;
  let arrowLeft = 0;
  let arrowRight = 0;
  const arrowWidth = arrow.offsetWidth || 0;
  const arrowHeight = arrow.offsetHeight || 0;
  const arrowAdjust = arrowWidth / 2;
  let topExceed = elemRectTop - tipHeight - arrowHeight < 0;
  let bottomExceed = elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch;
  let leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry;
  let rightExceed = elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;
  const horizontal = ["left", "right"];
  const vertical = ["top", "bottom"];
  topExceed = horizontal.includes(placement) ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0 : topExceed;
  bottomExceed = horizontal.includes(placement) ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch : bottomExceed;
  leftExceed = vertical.includes(placement) ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry : leftExceed;
  rightExceed = vertical.includes(placement) ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry : rightExceed;
  placement = horizontal.includes(placement) && leftExceed && rightExceed ? "top" : placement;
  placement = placement === "top" && topExceed ? "bottom" : placement;
  placement = placement === "bottom" && bottomExceed ? "top" : placement;
  placement = placement === "left" && leftExceed ? "right" : placement;
  placement = placement === "right" && rightExceed ? "left" : placement;
  if (!tooltip.className.includes(placement)) {
    tooltip.className = tooltip.className.replace(tipClasses, tipPositions[placement]);
  }
  if (horizontal.includes(placement)) {
    if (placement === "left") {
      leftPosition = x2 - tipWidth - (isPopover ? arrowWidth : 0);
    } else {
      leftPosition = x2 + elemWidth + (isPopover ? arrowWidth : 0);
    }
    if (topExceed) {
      topPosition = y2;
      arrowTop = elemHeight / 2 - arrowWidth;
    } else if (bottomExceed) {
      topPosition = y2 - tipHeight + elemHeight;
      arrowTop = tipHeight - elemHeight / 2 - arrowWidth;
    } else {
      topPosition = y2 - tipHeight / 2 + elemHeight / 2;
      arrowTop = tipHeight / 2 - arrowHeight / 2;
    }
  } else if (vertical.includes(placement)) {
    if (e2 && uo(element)) {
      let eX = 0;
      let eY = 0;
      if (staticParent) {
        eX = e2.pageX;
        eY = e2.pageY;
      } else {
        eX = e2.clientX - parentLeft + (fixedParent ? scroll.x : 0);
        eY = e2.clientY - parentTop + (fixedParent ? scroll.y : 0);
      }
      eX -= RTL && fixedParent && scrollbarWidth ? scrollbarWidth : 0;
      if (placement === "top") {
        topPosition = eY - tipHeight - arrowWidth;
      } else {
        topPosition = eY + arrowWidth;
      }
      if (e2.clientX - tipWidth / 2 < leftBoundry) {
        leftPosition = 0;
        arrowLeft = eX - arrowAdjust;
      } else if (e2.clientX + tipWidth / 2 > rightBoundry) {
        leftPosition = "auto";
        rightPosition = 0;
        arrowRight = rightBoundry - eX - arrowAdjust;
        arrowRight -= fixedParent ? parentLeft + (RTL ? scrollbarWidth : 0) : 0;
      } else {
        leftPosition = eX - tipWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    } else {
      if (placement === "top") {
        topPosition = y2 - tipHeight - (isPopover ? arrowHeight : 0);
      } else {
        topPosition = y2 + elemHeight + (isPopover ? arrowHeight : 0);
      }
      if (leftExceed) {
        leftPosition = 0;
        arrowLeft = x2 + elemWidth / 2 - arrowAdjust;
      } else if (rightExceed) {
        leftPosition = "auto";
        rightPosition = 0;
        arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust;
      } else {
        leftPosition = x2 - tipWidth / 2 + elemWidth / 2;
        arrowLeft = tipWidth / 2 - arrowAdjust;
      }
    }
  }
  qn(tooltip, {
    top: `${topPosition}px`,
    left: leftPosition === "auto" ? leftPosition : `${leftPosition}px`,
    right: rightPosition !== void 0 ? `${rightPosition}px` : ""
  });
  if (u(arrow)) {
    if (arrowTop !== void 0) {
      arrow.style.top = `${arrowTop}px`;
    }
    if (arrowLeft !== void 0) {
      arrow.style.left = `${arrowLeft}px`;
    } else if (arrowRight !== void 0) {
      arrow.style.right = `${arrowRight}px`;
    }
  }
  console.log(tooltip, leftPosition, rightPosition, arrowLeft);
};
const tooltipDefaults = {
  template: getTipTemplate(tooltipString),
  title: "",
  customClass: "",
  trigger: "hover focus",
  placement: "top",
  sanitizeFn: void 0,
  animation: true,
  delay: 200,
  container: document.body,
  content: "",
  dismissible: false,
  btnClose: ""
};
const dataOriginalTitle = "data-original-title";
const tooltipComponent = "Tooltip";
const setHtml = (element, content, sanitizeFn) => {
  if (!u(element) || g(content) && !content.length)
    return;
  if (g(content)) {
    let dirty = content.trim();
    if (so(sanitizeFn))
      dirty = sanitizeFn(dirty);
    const domParser = new DOMParser();
    const tempDocument = domParser.parseFromString(dirty, "text/html");
    element.append(...[...tempDocument.body.childNodes]);
  } else if (u(content)) {
    element.append(content);
  } else if (lo(content) || ue(content) && content.every(a)) {
    element.append(...[...content]);
  }
};
const createTip = (self) => {
  const isTooltip = self.name === tooltipComponent;
  const { id, element, options } = self;
  const { title, placement, template, animation, customClass, sanitizeFn, dismissible, content, btnClose } = options;
  const tipString = isTooltip ? tooltipString : popoverString;
  const tipPositions = { ...tipClassPositions };
  let titleParts = [];
  let contentParts = [];
  if (po(element)) {
    tipPositions.left = "end";
    tipPositions.right = "start";
  }
  const placementClass = `bs-${tipString}-${tipPositions[placement]}`;
  let tooltipTemplate;
  if (u(template)) {
    tooltipTemplate = template;
  } else {
    const htmlMarkup = $t("div");
    setHtml(htmlMarkup, template, sanitizeFn);
    tooltipTemplate = htmlMarkup.firstChild;
  }
  self.tooltip = u(tooltipTemplate) ? tooltipTemplate.cloneNode(true) : void 0;
  const { tooltip } = self;
  if (!tooltip)
    return;
  F(tooltip, "id", id);
  F(tooltip, "role", tooltipString);
  const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`;
  const tooltipHeader = isTooltip ? null : go(`.${popoverString}-header`, tooltip);
  const tooltipBody = go(`.${bodyClass}`, tooltip);
  self.arrow = go(`.${tipString}-arrow`, tooltip);
  const { arrow } = self;
  if (u(title))
    titleParts = [title.cloneNode(true)];
  else {
    const tempTitle = $t("div");
    setHtml(tempTitle, title, sanitizeFn);
    titleParts = [...[...tempTitle.childNodes]];
  }
  if (u(content))
    contentParts = [content.cloneNode(true)];
  else {
    const tempContent = $t("div");
    setHtml(tempContent, content, sanitizeFn);
    contentParts = [...[...tempContent.childNodes]];
  }
  if (dismissible) {
    if (title) {
      if (u(btnClose))
        titleParts = [...titleParts, btnClose.cloneNode(true)];
      else {
        const tempBtn = $t("div");
        setHtml(tempBtn, btnClose, sanitizeFn);
        titleParts = [...titleParts, tempBtn.firstChild];
      }
    } else {
      if (tooltipHeader)
        tooltipHeader.remove();
      if (u(btnClose))
        contentParts = [...contentParts, btnClose.cloneNode(true)];
      else {
        const tempBtn = $t("div");
        setHtml(tempBtn, btnClose, sanitizeFn);
        contentParts = [...contentParts, tempBtn.firstChild];
      }
    }
  }
  if (!isTooltip) {
    if (title && tooltipHeader)
      setHtml(tooltipHeader, titleParts, sanitizeFn);
    if (content && tooltipBody)
      setHtml(tooltipBody, contentParts, sanitizeFn);
    self.btn = go(".btn-close", tooltip) || void 0;
  } else if (title && tooltipBody)
    setHtml(tooltipBody, title, sanitizeFn);
  Mn(tooltip, "position-absolute");
  Mn(arrow, "position-absolute");
  if (!kn(tooltip, tipString))
    Mn(tooltip, tipString);
  if (animation && !kn(tooltip, fadeClass))
    Mn(tooltip, fadeClass);
  if (customClass && !kn(tooltip, customClass)) {
    Mn(tooltip, customClass);
  }
  if (!kn(tooltip, placementClass))
    Mn(tooltip, placementClass);
};
const tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`;
const titleAttr = "title";
let getTooltipInstance = (element) => Ln(element, tooltipComponent);
const tooltipInitCallback = (element) => new Tooltip(element);
const removeTooltip = (self) => {
  const { element, tooltip } = self;
  An(element, ge);
  removePopup(tooltip);
};
const disposeTooltipComplete = (self, callback) => {
  const { element } = self;
  toggleTooltipHandlers(self);
  if (hn(element, dataOriginalTitle) && self.name === tooltipComponent) {
    toggleTooltipTitle(self);
  }
  if (callback)
    callback();
};
const toggleTooltipAction = (self, add) => {
  const action = add ? E$1 : d$1;
  const { element } = self;
  action(d(element), Bt, self.handleTouch, Rn);
  if (!uo(element)) {
    [xt, Lt].forEach((ev) => {
      action($n(element), ev, self.update, Rn);
    });
  }
};
const tooltipShownAction = (self) => {
  const { element } = self;
  const shownTooltipEvent = Wn(`shown.bs.${se(self.name)}`);
  toggleTooltipAction(self, true);
  Q(element, shownTooltipEvent);
  Gn.clear(element, "in");
};
const tooltipHiddenAction = (self, callback) => {
  const { element } = self;
  const hiddenTooltipEvent = Wn(`hidden.bs.${se(self.name)}`);
  toggleTooltipAction(self);
  removeTooltip(self);
  Q(element, hiddenTooltipEvent);
  if (so(callback))
    callback();
  Gn.clear(element, "out");
};
const toggleTooltipHandlers = (self, add) => {
  const action = add ? E$1 : d$1;
  const { element, options, btn } = self;
  const { trigger } = options;
  const isPopover = self.name !== tooltipComponent;
  const dismissible = isPopover && options.dismissible ? true : false;
  if (trigger?.includes("manual"))
    return;
  self.enabled = !!add;
  const triggerOptions = trigger?.split(" ");
  const elemIsMedia = uo(element);
  if (elemIsMedia) {
    action(element, ht, self.update, Rn);
  }
  triggerOptions?.forEach((tr) => {
    if (elemIsMedia || tr === ft) {
      action(element, dt, self.show);
      action(element, mt, self.show);
      if (dismissible && btn) {
        action(btn, ut, self.hide);
      } else {
        action(element, gt, self.hide);
        action(d(element), Bt, self.handleTouch, Rn);
      }
    } else if (tr === ut) {
      action(element, tr, !dismissible ? self.toggle : self.show);
    } else if (tr === _) {
      action(element, tt, self.show);
      if (!dismissible)
        action(element, et, self.hide);
      if (ln) {
        action(element, ut, () => Bn(element));
      }
    }
  });
};
const toggleTooltipOpenHandlers = (self, add) => {
  const action = add ? E$1 : d$1;
  const { element } = self;
  const parentModal = de(element, `.${modalString}`);
  const parentOffcanvas = de(element, `.${offcanvasString}`);
  if (!uo(element)) {
    const win = $n(element);
    action(win, Lt, self.update, Rn);
    action(win, xt, self.update, Rn);
  }
  if (parentModal)
    action(parentModal, `hide.bs.${modalString}`, self.hide);
  if (parentOffcanvas)
    action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.hide);
};
const toggleTooltipTitle = (self, content) => {
  const titleAtt = [dataOriginalTitle, titleAttr];
  const { element } = self;
  F(element, titleAtt[content ? 0 : 1], content || Zt(element, titleAtt[0]) || "");
  An(element, titleAtt[content ? 1 : 0]);
};
class Tooltip extends BaseComponent {
  static selector = tooltipSelector;
  static init = tooltipInitCallback;
  static getInstance = getTooltipInstance;
  static styleTip = styleTip;
  constructor(target, config) {
    super(target, config);
    const { element } = this;
    const isTooltip = this.name === tooltipComponent;
    const tipString = isTooltip ? tooltipString : popoverString;
    const tipComponent = isTooltip ? tooltipComponent : popoverComponent;
    getTooltipInstance = (elem) => Ln(elem, tipComponent);
    this.enabled = true;
    this.id = `${tipString}-${ae(element, tipString)}`;
    const { options } = this;
    if (!options.title && isTooltip || !isTooltip && !options.content) {
      return;
    }
    q(tooltipDefaults, { titleAttr: "" });
    this.handleTouch = this.handleTouch.bind(this);
    this.update = this.update.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.toggle = this.toggle.bind(this);
    if (hn(element, titleAttr) && isTooltip) {
      toggleTooltipTitle(this, options.title);
    }
    createTip(this);
    toggleTooltipHandlers(this, true);
  }
  get name() {
    return tooltipComponent;
  }
  get defaults() {
    return tooltipDefaults;
  }
  show(e2) {
    const { options, tooltip, element, id } = this;
    const { animation } = options;
    const outTimer = Gn.get(element, "out");
    Gn.clear(element, "out");
    if (tooltip && !outTimer && !hasPopup(tooltip)) {
      Gn.set(
        element,
        () => {
          const showTooltipEvent = Wn(`show.bs.${se(this.name)}`);
          Q(element, showTooltipEvent);
          if (showTooltipEvent.defaultPrevented)
            return;
          appendPopup(tooltip);
          F(element, ge, `#${id}`);
          this.update(e2);
          toggleTooltipOpenHandlers(this, true);
          if (!kn(tooltip, showClass))
            Mn(tooltip, showClass);
          if (animation)
            zn(tooltip, () => tooltipShownAction(this));
          else
            tooltipShownAction(this);
        },
        17,
        "in"
      );
    }
  }
  hide(e2, callback) {
    const { options, tooltip, element } = this;
    const { animation, delay } = options;
    Gn.clear(element, "in");
    if (tooltip && hasPopup(tooltip)) {
      Gn.set(
        element,
        () => {
          const hideTooltipEvent = Wn(`hide.bs.${se(this.name)}`);
          Q(element, hideTooltipEvent);
          if (hideTooltipEvent.defaultPrevented)
            return;
          this.update(e2);
          Nn(tooltip, showClass);
          toggleTooltipOpenHandlers(this);
          if (animation)
            zn(tooltip, () => tooltipHiddenAction(this, callback));
          else
            tooltipHiddenAction(this, callback);
        },
        delay + 17,
        "out"
      );
    }
  }
  update(e2) {
    styleTip(this, e2);
  }
  toggle(e2) {
    const { tooltip } = this;
    if (tooltip && !hasPopup(tooltip))
      this.show(e2);
    else
      this.hide();
  }
  enable() {
    const { enabled } = this;
    if (!enabled) {
      toggleTooltipHandlers(this, true);
      this.enabled = !enabled;
    }
  }
  disable() {
    const { tooltip, options, enabled } = this;
    const { animation } = options;
    if (enabled) {
      if (tooltip && hasPopup(tooltip) && animation) {
        this.hide(void 0, () => toggleTooltipHandlers(this));
      } else {
        toggleTooltipHandlers(this);
      }
      this.enabled = !enabled;
    }
  }
  toggleEnabled() {
    if (!this.enabled)
      this.enable();
    else
      this.disable();
  }
  handleTouch({ target }) {
    const { tooltip, element } = this;
    if (tooltip && tooltip.contains(target) || target === element || target && element.contains(target))
      ;
    else {
      this.hide();
    }
  }
  dispose() {
    const { tooltip, options } = this;
    const callback = () => disposeTooltipComplete(this, () => super.dispose());
    if (options.animation && tooltip && hasPopup(tooltip)) {
      this.options.delay = 0;
      this.hide(void 0, callback);
    } else {
      callback();
    }
  }
}
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`;
const popoverDefaults = q({}, tooltipDefaults, {
  template: getTipTemplate(popoverString),
  content: "",
  dismissible: false,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
});
const getPopoverInstance = (element) => Ln(element, popoverComponent);
const popoverInitCallback = (element) => new Popover(element);
class Popover extends Tooltip {
  static selector = popoverSelector;
  static init = popoverInitCallback;
  static getInstance = getPopoverInstance;
  static styleTip = styleTip;
  constructor(target, config) {
    super(target, config);
  }
  get name() {
    return popoverComponent;
  }
  get defaults() {
    return popoverDefaults;
  }
  show() {
    super.show();
    const { options, btn } = this;
    if (options.dismissible && btn)
      setTimeout(() => Bn(btn), 17);
  }
}
const scrollspyString = "scrollspy";
const scrollspyComponent = "ScrollSpy";
const scrollspySelector = '[data-bs-spy="scroll"]';
const scrollspyDefaults = {
  offset: 10,
  target: null
};
const getScrollSpyInstance = (element) => Ln(element, scrollspyComponent);
const scrollspyInitCallback = (element) => new ScrollSpy(element);
const activateScrollSpy = Wn(`activate.bs.${scrollspyString}`);
const updateSpyTargets = (self) => {
  const { target, scrollTarget, options, itemsLength, scrollHeight, element } = self;
  const { offset } = options;
  const isWin = W(scrollTarget);
  const links = target && pe("A", target);
  const scrollHEIGHT = scrollTarget && getScrollHeight(scrollTarget);
  self.scrollTop = isWin ? scrollTarget.scrollY : scrollTarget.scrollTop;
  if (links && (itemsLength !== links.length || scrollHEIGHT !== scrollHeight)) {
    let href;
    let targetItem;
    let rect;
    self.items = [];
    self.offsets = [];
    self.scrollHeight = scrollHEIGHT;
    self.maxScroll = self.scrollHeight - getOffsetHeight(self);
    [...links].forEach((link) => {
      href = Zt(link, "href");
      targetItem = href && href.charAt(0) === "#" && href.slice(-1) !== "#" && go(href, d(element));
      if (targetItem) {
        self.items.push(link);
        rect = w(targetItem);
        self.offsets.push((isWin ? rect.top + self.scrollTop : targetItem.offsetTop) - offset);
      }
    });
    self.itemsLength = self.items.length;
  }
};
const getScrollHeight = (scrollTarget) => {
  return u(scrollTarget) ? scrollTarget.scrollHeight : k(scrollTarget).scrollHeight;
};
const getOffsetHeight = ({ element, scrollTarget }) => {
  return W(scrollTarget) ? scrollTarget.innerHeight : w(element).height;
};
const clear = (target) => {
  [...pe("A", target)].forEach((item) => {
    if (kn(item, activeClass))
      Nn(item, activeClass);
  });
};
const activate = (self, item) => {
  const { target, element } = self;
  if (u(target))
    clear(target);
  self.activeItem = item;
  Mn(item, activeClass);
  const parents = [];
  let parentItem = item;
  while (parentItem !== Jn(element)) {
    parentItem = parentItem.parentElement;
    if (kn(parentItem, "nav") || kn(parentItem, "dropdown-menu"))
      parents.push(parentItem);
  }
  parents.forEach((menuItem) => {
    const parentLink = menuItem.previousElementSibling;
    if (parentLink && !kn(parentLink, activeClass)) {
      Mn(parentLink, activeClass);
    }
  });
  activateScrollSpy.relatedTarget = item;
  Q(element, activateScrollSpy);
};
const toggleSpyHandlers = (self, add) => {
  const action = add ? E$1 : d$1;
  action(self.scrollTarget, xt, self.refresh, Rn);
};
class ScrollSpy extends BaseComponent {
  static selector = scrollspySelector;
  static init = scrollspyInitCallback;
  static getInstance = getScrollSpyInstance;
  constructor(target, config) {
    super(target, config);
    const { element, options } = this;
    this.target = go(options.target, d(element));
    if (!this.target)
      return;
    this.scrollTarget = element.clientHeight < element.scrollHeight ? element : $n(element);
    this.refresh = this.refresh.bind(this);
    toggleSpyHandlers(this, true);
    this.refresh();
  }
  get name() {
    return scrollspyComponent;
  }
  get defaults() {
    return scrollspyDefaults;
  }
  refresh() {
    const { target } = this;
    if (target?.offsetHeight === 0)
      return;
    updateSpyTargets(this);
    const { scrollTop, maxScroll, itemsLength, items, activeItem } = this;
    if (scrollTop >= maxScroll) {
      const newActiveItem = items[itemsLength - 1];
      if (activeItem !== newActiveItem) {
        activate(this, newActiveItem);
      }
      return;
    }
    const { offsets } = this;
    if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
      this.activeItem = null;
      if (u(target))
        clear(target);
      return;
    }
    items.forEach((item, i) => {
      if (activeItem !== item && scrollTop >= offsets[i] && (typeof offsets[i + 1] === "undefined" || scrollTop < offsets[i + 1])) {
        activate(this, item);
      }
    });
  }
  dispose() {
    toggleSpyHandlers(this);
    super.dispose();
  }
}
const tabString = "tab";
const tabComponent = "Tab";
const tabSelector = `[${dataBsToggle}="${tabString}"]`;
const getTabInstance = (element) => Ln(element, tabComponent);
const tabInitCallback = (element) => new Tab(element);
const showTabEvent = Wn(`show.bs.${tabString}`);
const shownTabEvent = Wn(`shown.bs.${tabString}`);
const hideTabEvent = Wn(`hide.bs.${tabString}`);
const hiddenTabEvent = Wn(`hidden.bs.${tabString}`);
const tabPrivate = /* @__PURE__ */ new Map();
const triggerTabEnd = (self) => {
  const { tabContent, nav } = self;
  if (tabContent && kn(tabContent, collapsingClass)) {
    tabContent.style.height = "";
    Nn(tabContent, collapsingClass);
  }
  if (nav)
    Gn.clear(nav);
};
const triggerTabShow = (self) => {
  const { element, tabContent, content: nextContent, nav } = self;
  const { tab } = u(nav) && tabPrivate.get(nav) || { tab: null };
  if (tabContent && nextContent && kn(nextContent, fadeClass)) {
    const { currentHeight, nextHeight } = tabPrivate.get(element) || { currentHeight: 0, nextHeight: 0 };
    if (currentHeight === nextHeight) {
      triggerTabEnd(self);
    } else {
      setTimeout(() => {
        tabContent.style.height = `${nextHeight}px`;
        Qn(tabContent);
        zn(tabContent, () => triggerTabEnd(self));
      }, 50);
    }
  } else if (nav)
    Gn.clear(nav);
  shownTabEvent.relatedTarget = tab;
  Q(element, shownTabEvent);
};
const triggerTabHide = (self) => {
  const { element, content: nextContent, tabContent, nav } = self;
  const { tab, content } = nav && tabPrivate.get(nav) || { tab: null, content: null };
  let currentHeight = 0;
  if (tabContent && nextContent && kn(nextContent, fadeClass)) {
    [content, nextContent].forEach((c) => {
      if (u(c))
        Mn(c, "overflow-hidden");
    });
    currentHeight = u(content) ? content.scrollHeight : 0;
  }
  showTabEvent.relatedTarget = tab;
  hiddenTabEvent.relatedTarget = element;
  Q(element, showTabEvent);
  if (showTabEvent.defaultPrevented)
    return;
  if (nextContent)
    Mn(nextContent, activeClass);
  if (content)
    Nn(content, activeClass);
  if (tabContent && nextContent && kn(nextContent, fadeClass)) {
    const nextHeight = nextContent.scrollHeight;
    tabPrivate.set(element, { currentHeight, nextHeight, tab: null, content: null });
    Mn(tabContent, collapsingClass);
    tabContent.style.height = `${currentHeight}px`;
    Qn(tabContent);
    [content, nextContent].forEach((c) => {
      if (c)
        Nn(c, "overflow-hidden");
    });
  }
  if (nextContent && nextContent && kn(nextContent, fadeClass)) {
    setTimeout(() => {
      Mn(nextContent, showClass);
      zn(nextContent, () => {
        triggerTabShow(self);
      });
    }, 1);
  } else {
    if (nextContent)
      Mn(nextContent, showClass);
    triggerTabShow(self);
  }
  if (tab)
    Q(tab, hiddenTabEvent);
};
const getActiveTab = (self) => {
  const { nav } = self;
  if (!u(nav))
    return { tab: null, content: null };
  const activeTabs = ho(activeClass, nav);
  let tab = null;
  if (activeTabs.length === 1 && !dropdownMenuClasses.some((c) => kn(activeTabs[0].parentElement, c))) {
    [tab] = activeTabs;
  } else if (activeTabs.length > 1) {
    tab = activeTabs[activeTabs.length - 1];
  }
  const content = u(tab) ? getTargetElement(tab) : null;
  return { tab, content };
};
const getParentDropdown = (element) => {
  if (!u(element))
    return null;
  const dropdown = de(element, `.${dropdownMenuClasses.join(",.")}`);
  return dropdown ? go(`.${dropdownMenuClasses[0]}-toggle`, dropdown) : null;
};
const toggleTabHandler = (self, add) => {
  const action = add ? E$1 : d$1;
  action(self.element, ut, tabClickHandler);
};
const tabClickHandler = (e2) => {
  const self = getTabInstance(e2.target);
  if (!self)
    return;
  e2.preventDefault();
  self.show();
};
class Tab extends BaseComponent {
  static selector = tabSelector;
  static init = tabInitCallback;
  static getInstance = getTabInstance;
  constructor(target) {
    super(target);
    const { element } = this;
    const content = getTargetElement(element);
    if (!content)
      return;
    const nav = de(element, ".nav");
    const container = de(content, ".tab-content");
    this.nav = nav;
    this.content = content;
    this.tabContent = container;
    this.dropdown = getParentDropdown(element);
    const { tab } = getActiveTab(this);
    if (nav && !tab) {
      const firstTab = go(tabSelector, nav);
      const firstTabContent = firstTab && getTargetElement(firstTab);
      if (firstTabContent) {
        Mn(firstTab, activeClass);
        Mn(firstTabContent, showClass);
        Mn(firstTabContent, activeClass);
        F(element, Se, "true");
      }
    }
    toggleTabHandler(this, true);
  }
  get name() {
    return tabComponent;
  }
  show() {
    const { element, content: nextContent, nav, dropdown } = this;
    if (!(nav && Gn.get(nav)) && !kn(element, activeClass)) {
      const { tab, content } = getActiveTab(this);
      if (nav)
        tabPrivate.set(nav, { tab, content, currentHeight: 0, nextHeight: 0 });
      hideTabEvent.relatedTarget = element;
      if (u(tab))
        Q(tab, hideTabEvent);
      if (hideTabEvent.defaultPrevented)
        return;
      Mn(element, activeClass);
      F(element, Se, "true");
      const activeDropdown = u(tab) && getParentDropdown(tab);
      if (activeDropdown && kn(activeDropdown, activeClass)) {
        Nn(activeDropdown, activeClass);
      }
      if (nav) {
        const toggleTab = () => {
          if (tab) {
            Nn(tab, activeClass);
            F(tab, Se, "false");
          }
          if (dropdown && !kn(dropdown, activeClass))
            Mn(dropdown, activeClass);
        };
        if (content && (kn(content, fadeClass) || nextContent && kn(nextContent, fadeClass))) {
          Gn.set(nav, toggleTab, 1);
        } else
          toggleTab();
      }
      if (content) {
        Nn(content, showClass);
        if (kn(content, fadeClass)) {
          zn(content, () => triggerTabHide(this));
        } else {
          triggerTabHide(this);
        }
      }
    }
  }
  dispose() {
    toggleTabHandler(this);
    super.dispose();
  }
}
const toastString = "toast";
const toastComponent = "Toast";
const toastSelector = `.${toastString}`;
const toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`;
const toastToggleSelector = `[${dataBsToggle}="${toastString}"]`;
const showingClass = "showing";
const hideClass = "hide";
const toastDefaults = {
  animation: true,
  autohide: true,
  delay: 5e3
};
const getToastInstance = (element) => Ln(element, toastComponent);
const toastInitCallback = (element) => new Toast(element);
const showToastEvent = Wn(`show.bs.${toastString}`);
const shownToastEvent = Wn(`shown.bs.${toastString}`);
const hideToastEvent = Wn(`hide.bs.${toastString}`);
const hiddenToastEvent = Wn(`hidden.bs.${toastString}`);
const showToastComplete = (self) => {
  const { element, options } = self;
  Nn(element, showingClass);
  Gn.clear(element, showingClass);
  Q(element, shownToastEvent);
  if (options.autohide) {
    Gn.set(element, () => self.hide(), options.delay, toastString);
  }
};
const hideToastComplete = (self) => {
  const { element } = self;
  Nn(element, showingClass);
  Nn(element, showClass);
  Mn(element, hideClass);
  Gn.clear(element, toastString);
  Q(element, hiddenToastEvent);
};
const hideToast = (self) => {
  const { element, options } = self;
  Mn(element, showingClass);
  if (options.animation) {
    Qn(element);
    zn(element, () => hideToastComplete(self));
  } else {
    hideToastComplete(self);
  }
};
const showToast = (self) => {
  const { element, options } = self;
  Gn.set(
    element,
    () => {
      Nn(element, hideClass);
      Qn(element);
      Mn(element, showClass);
      Mn(element, showingClass);
      if (options.animation) {
        zn(element, () => showToastComplete(self));
      } else {
        showToastComplete(self);
      }
    },
    17,
    showingClass
  );
};
const toggleToastHandlers = (self, add) => {
  const action = add ? E$1 : d$1;
  const { element, triggers, dismiss, options } = self;
  if (dismiss) {
    action(dismiss, ut, self.hide);
  }
  if (options.autohide) {
    [tt, et, mt, gt].forEach(
      (e2) => action(element, e2, interactiveToastHandler)
    );
  }
  if (triggers.length) {
    triggers.forEach((btn) => action(btn, ut, toastClickHandler));
  }
};
const completeDisposeToast = (self) => {
  Gn.clear(self.element, toastString);
  toggleToastHandlers(self);
};
const toastClickHandler = (e2) => {
  const { target } = e2;
  const trigger = target && de(target, toastToggleSelector);
  const element = trigger && getTargetElement(trigger);
  const self = element && getToastInstance(element);
  if (!self)
    return;
  if (trigger && trigger.tagName === "A")
    e2.preventDefault();
  self.relatedTarget = trigger;
  self.show();
};
const interactiveToastHandler = (e2) => {
  const element = e2.target;
  const self = getToastInstance(element);
  const { type, relatedTarget } = e2;
  if (!self || element === relatedTarget || element.contains(relatedTarget))
    return;
  if ([mt, tt].includes(type)) {
    Gn.clear(element, toastString);
  } else {
    Gn.set(element, () => self.hide(), self.options.delay, toastString);
  }
};
class Toast extends BaseComponent {
  static selector = toastSelector;
  static init = toastInitCallback;
  static getInstance = getToastInstance;
  constructor(target, config) {
    super(target, config);
    const { element, options } = this;
    if (options.animation && !kn(element, fadeClass))
      Mn(element, fadeClass);
    else if (!options.animation && kn(element, fadeClass))
      Nn(element, fadeClass);
    this.dismiss = go(toastDismissSelector, element);
    this.triggers = [...bo(toastToggleSelector, d(element))].filter(
      (btn) => getTargetElement(btn) === element
    );
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    toggleToastHandlers(this, true);
  }
  get name() {
    return toastComponent;
  }
  get defaults() {
    return toastDefaults;
  }
  get isShown() {
    return kn(this.element, showClass);
  }
  show() {
    const { element, isShown } = this;
    if (element && !isShown) {
      Q(element, showToastEvent);
      if (showToastEvent.defaultPrevented)
        return;
      showToast(this);
    }
  }
  hide() {
    const { element, isShown } = this;
    if (element && isShown) {
      Q(element, hideToastEvent);
      if (hideToastEvent.defaultPrevented)
        return;
      hideToast(this);
    }
  }
  dispose() {
    const { element, isShown } = this;
    if (isShown) {
      Nn(element, showClass);
    }
    completeDisposeToast(this);
    super.dispose();
  }
}
const componentsList = {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip
};
const initComponentDataAPI = (callback, collection) => {
  [...collection].forEach((x2) => callback(x2));
};
const removeComponentDataAPI = (component, context) => {
  const compData = L.getAllFor(component);
  if (compData) {
    [...compData].forEach(([element, instance]) => {
      if (context.contains(element))
        instance.dispose();
    });
  }
};
const initCallback = (context) => {
  const lookUp = context && context.nodeName ? context : document;
  const elemCollection = [...pe("*", lookUp)];
  Fn(componentsList).forEach((cs) => {
    const { init, selector } = cs;
    initComponentDataAPI(
      init,
      elemCollection.filter((item) => yo(item, selector))
    );
  });
};
const removeDataAPI = (context) => {
  const lookUp = context && context.nodeName ? context : document;
  Un(componentsList).forEach((comp) => {
    removeComponentDataAPI(comp, lookUp);
  });
};
if (document.body)
  initCallback();
else {
  E$1(document, "DOMContentLoaded", () => initCallback(), { once: true });
}
export {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  eventListener as Listener,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
  initCallback,
  removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
