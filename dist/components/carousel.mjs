import { $ as e, Dt as t, I as n, K as r, L as i, O as a, P as o, R as s, U as c, W as l, X as u, _ as d, _t as f, bt as p, ft as m, g as h, h as g, ht as ee, j as _, l as v, lt as te, m as y, n as b, nt as ne, o as re, ot as x, pt as ie, q as S, r as C, rt as w, t as T, u as ae, vt as E, w as D, x as O, xt as k } from "./base-component-Bm8KwB_I.mjs";
import { t as A } from "./isDisabled-CA05SUmE.mjs";
import { t as j } from "./activeClass-LUKCeUHG.mjs";
import { n as M, t as N } from "./getTargetElement-CNLJ8Fpo.mjs";
//#region src/strings/carouselString.ts
var P = "carousel", F = "Carousel", I = `[data-bs-ride="${P}"]`, L = `${P}-item`, R = "data-bs-slide-to", z = "data-bs-slide", B = "paused", oe = k() ? a : D;
console.log({
	isMobile: k(),
	touchEvent: oe
});
var V = {
	pause: "hover",
	keyboard: !1,
	touch: !0,
	interval: 5e3
}, H = (e) => ie(e, F), se = (e) => new $(e), U = 0, W = 0, G = 0, K = x(`slide.bs.${P}`), q = x(`slid.bs.${P}`), J = (t) => {
	let { index: a, direction: o, element: s, slides: c, options: l } = t;
	if (t.isAnimating) {
		let u = Q(t), d = o === "left" ? "next" : "prev", f = o === "left" ? "start" : "end";
		y(c[a], j), i(c[a], `${L}-${d}`), i(c[a], `${L}-${f}`), i(c[u], j), i(c[u], `${L}-${f}`), n(s, q), e.clear(s, z), t.cycle && !r(s).hidden && l.interval && !t.isPaused && t.cycle();
	}
};
function ce() {
	let t = H(this);
	t && !t.isPaused && !e.get(this, B) && y(this, B);
}
function le() {
	let t = H(this);
	t && t.isPaused && !e.get(this, B) && t.cycle();
}
function ue(e) {
	e.preventDefault();
	let t = O(this, I) || N(this), n = t && H(t);
	if (A(this) || !n || n.isAnimating) return;
	let r = +(d(this, R) || 0);
	this && !s(this, "active") && !Number.isNaN(r) && n.to(r);
}
function de(e) {
	e.preventDefault();
	let t = O(this, I) || N(this), n = t && H(t);
	if (A(this) || !n || n.isAnimating) return;
	let r = d(this, z);
	r === "next" ? n.next() : r === "prev" && n.prev();
}
var fe = ({ code: e, target: t }) => {
	let [n] = [...S(I, r(t))].filter((e) => v(e)), i = H(n);
	if (!i || i.isAnimating || /textarea|input|select/i.test(t.nodeName)) return;
	let a = g(n);
	e === (a ? "ArrowRight" : "ArrowLeft") ? i.prev() : e === (a ? te : l) && i.next();
};
function Y(e) {
	let { target: t } = e, n = H(this);
	n && n.isTouch && !n.controls.includes(t) && !n.controls.includes(t?.parentElement) && (!n.indicator || !n.indicator.contains(t)) && e.preventDefault();
}
function pe(e) {
	let { target: t } = e, n = H(this);
	if (!n || n.isAnimating || n.isTouch) return;
	let { controls: r, indicator: i } = n;
	![...r, i].every((e) => e && (e === t || e.contains(t))) && this.contains(t) && (U = e.pageX, n.isTouch = !0, Z(n, !0));
}
var me = (e) => {
	W = e.pageX;
}, he = (e) => {
	let { target: t } = e, n = r(t), i = [...S(I, n)].map((e) => H(e)).find((e) => e.isTouch);
	if (!i) return;
	let { element: a, index: o } = i, s = g(a);
	G = e.pageX, i.isTouch = !1, Z(i), !n.getSelection()?.toString().length && a.contains(t) && Math.abs(U - G) > 120 && (W < U ? i.to(o + (s ? -1 : 1)) : W > U && i.to(o + (s ? 1 : -1))), U = 0, W = 0, G = 0;
}, X = (e, t) => {
	let { indicators: n } = e;
	[...n].forEach((e) => i(e, j)), e.indicators[t] && y(n[t], j);
}, Z = (e, n) => {
	let { element: i } = e, a = n ? b : C;
	a(r(i), t, me, f), a(r(i), h, he, f);
}, Q = (e) => {
	let { slides: t, element: n } = e, r = o(`.${L}.${j}`, n);
	return r ? [...t].indexOf(r) : -1;
}, $ = class extends T {
	static selector = I;
	static init = se;
	static getInstance = H;
	constructor(e, t) {
		super(e, t);
		let { element: n } = this;
		this.direction = g(n) ? "right" : "left", this.isTouch = !1, this.slides = w(L, n);
		let { slides: i } = this;
		if (i.length < 2) return;
		let a = Q(this), s = [...i].find((e) => ae(e, `.${L}-next`));
		this.index = a;
		let c = r(n);
		this.controls = [...S(`[${z}]`, n), ...S(`[${z}][${M}="#${n.id}"]`, c)].filter((e, t, n) => t === n.indexOf(e)), this.indicator = o(`.${P}-indicators`, n), this.indicators = [...this.indicator ? S(`[${R}]`, this.indicator) : [], ...S(`[${R}][${M}="#${n.id}"]`, c)].filter((e, t, n) => t === n.indexOf(e));
		let { options: l } = this;
		this.options.interval = l.interval === !0 ? V.interval : l.interval, s ? this.index = [...i].indexOf(s) : a < 0 && (this.index = 0, y(i[0], j), this.indicators.length && X(this, 0)), this.indicators.length && X(this, this.index), this._toggleEventListeners(!0), l.interval && this.cycle();
	}
	get name() {
		return F;
	}
	get defaults() {
		return V;
	}
	get isPaused() {
		return s(this.element, B);
	}
	get isAnimating() {
		return o(`.${L}-next,.${L}-prev`, this.element) !== null;
	}
	cycle() {
		let { element: t, options: n, isPaused: r, index: a } = this;
		e.clear(t, P), r && (e.clear(t, B), i(t, B)), e.set(t, () => {
			this.element && !this.isPaused && !this.isTouch && v(t) && this.to(a + 1);
		}, n.interval, P);
	}
	pause() {
		let { element: t, options: n } = this;
		this.isPaused || !n.interval || (y(t, B), e.set(t, () => {}, 1, B));
	}
	next() {
		this.isAnimating || this.to(this.index + 1);
	}
	prev() {
		this.isAnimating || this.to(this.index - 1);
	}
	to(t) {
		let { element: r, slides: a, options: o } = this, l = Q(this), u = g(r), d = t;
		if (this.isAnimating || l === d || e.get(r, z)) return;
		l < d || l === 0 && d === a.length - 1 ? this.direction = u ? "right" : "left" : (l > d || l === a.length - 1 && d === 0) && (this.direction = u ? "left" : "right");
		let { direction: f } = this;
		d < 0 ? d = a.length - 1 : d >= a.length && (d = 0);
		let p = f === "left" ? "next" : "prev", h = f === "left" ? "start" : "end", v = {
			relatedTarget: a[d],
			from: l,
			to: d,
			direction: f
		};
		_(K, v), _(q, v), n(r, K), !K.defaultPrevented && (this.index = d, X(this, d), ee(a[d]) && s(r, "slide") ? e.set(r, () => {
			y(a[d], `${L}-${p}`), c(a[d]), y(a[d], `${L}-${h}`), y(a[l], `${L}-${h}`), m(a[d], () => this.slides && this.slides.length && J(this));
		}, 0, z) : (y(a[d], j), i(a[l], j), e.set(r, () => {
			e.clear(r, z), r && o.interval && !this.isPaused && this.cycle(), n(r, q);
		}, 0, z)));
	}
	_toggleEventListeners = (e) => {
		let { element: t, options: n, slides: i, controls: o, indicators: s } = this, { touch: c, pause: l, interval: d, keyboard: m } = n, h = e ? b : C;
		l && d && (h(t, p, ce), h(t, re, le)), c && i.length > 2 && (h(t, D, pe, f), h(t, a, Y, { passive: !1 }), h(t, ne, Y, { passive: !1 })), o.length && o.forEach((e) => {
			h(e, E, de);
		}), s.length && s.forEach((e) => {
			h(e, E, ue);
		}), m && h(r(t), u, fe);
	};
	dispose() {
		let { isAnimating: e } = this, t = {
			...this,
			isAnimating: e
		};
		this._toggleEventListeners(), super.dispose(), t.isAnimating && m(t.slides[t.index], () => {
			J(t);
		});
	}
};
//#endregion
export { $ as default };

//# sourceMappingURL=carousel.mjs.map