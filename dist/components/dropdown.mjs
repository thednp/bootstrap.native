import { C as e, Ct as t, E as n, G as r, I as i, K as a, L as o, Q as s, R as c, V as l, X as u, Y as ee, _ as d, d as f, h as te, j as p, m, n as h, ot as g, pt as _, r as v, rt as y, st as b, t as x, vt as S, x as C, yt as ne, z as w } from "./base-component-Bm8KwB_I.mjs";
import { t as T } from "./showClass-CH6sh0pm.mjs";
import { t as E } from "./isDisabled-CA05SUmE.mjs";
import { t as D } from "./dataBsToggle-CeJMDTHb.mjs";
import { t as O } from "./dist-CAr49AgA.mjs";
import { t as k } from "./dropdownClasses-DJ-0Bzzu.mjs";
//#region src/strings/dropdownComponent.ts
var A = "Dropdown", j = "dropdown-menu", M = (e) => {
	let t = C(e, "A");
	return e.tagName === "A" && b(e, "href") && d(e, "href")?.slice(-1) === "#" || t && b(t, "href") && d(t, "href")?.slice(-1) === "#";
}, [N, P, F, I] = k, L = `[${D}="${N}"]`, R = (e) => _(e, A), z = (e) => new $(e), B = `${j}-end`, V = [N, P], H = [F, I], U = ["A", "BUTTON"], re = {
	offset: 5,
	display: "dynamic"
}, W = g(`show.bs.${N}`), G = g(`shown.bs.${N}`), K = g(`hide.bs.${N}`), q = g(`hidden.bs.${N}`), J = g(`updated.bs.${N}`), Y = (e) => {
	let { element: n, menu: r, parentElement: a, options: o } = e, { offset: s } = o;
	if (ee(r, "position") === "static") return;
	let l = te(n), u = c(r, B);
	[
		"margin",
		"top",
		"bottom",
		"left",
		"right"
	].forEach((e) => {
		let t = {};
		t[e] = "", f(r, t);
	});
	let d = k.find((e) => c(a, e)) || N, m = {
		dropdown: [
			s,
			0,
			0
		],
		dropup: [
			0,
			0,
			s
		],
		dropstart: l ? [
			-1,
			0,
			0,
			s
		] : [
			-1,
			s,
			0
		],
		dropend: l ? [
			-1,
			s,
			0
		] : [
			-1,
			0,
			0,
			s
		]
	}, h = {
		dropdown: { top: "100%" },
		dropup: {
			top: "auto",
			bottom: "100%"
		},
		dropstart: l ? {
			left: "100%",
			right: "auto"
		} : {
			left: "auto",
			right: "100%"
		},
		dropend: l ? {
			left: "auto",
			right: "100%"
		} : {
			left: "100%",
			right: "auto"
		},
		menuStart: l ? {
			right: "0",
			left: "auto"
		} : {
			right: "auto",
			left: "0"
		},
		menuEnd: l ? {
			right: "auto",
			left: "0"
		} : {
			right: "0",
			left: "auto"
		}
	}, { offsetWidth: g, offsetHeight: _ } = r, { clientWidth: v, clientHeight: y } = ne(n), { left: b, top: x, width: S, height: C } = t(n), w = b - g - s < 0, T = b + g + S + s >= v, E = x + _ + s >= y, D = x + _ + C + s >= y, O = x - _ - s < 0, A = (!l && u || l && !u) && b + S - g < 0, j = (l && u || !l && !u) && b + g >= v;
	if (H.includes(d) && w && T && (d = N), d === F && (l ? T : w) && (d = I), d === I && (l ? w : T) && (d = F), d === P && O && !D && (d = N), d === N && D && !O && (d = P), H.includes(d) && E && p(h[d], {
		top: "auto",
		bottom: 0
	}), V.includes(d) && (A || j)) {
		let e = {
			left: "auto",
			right: "auto"
		};
		!A && j && !l && (e = {
			left: "auto",
			right: 0
		}), A && !j && l && (e = {
			left: 0,
			right: "auto"
		}), e && p(h[d], e);
	}
	let M = m[d];
	f(r, {
		...h[d],
		margin: `${M.map((e) => e && `${e}px`).join(" ")}`
	}), V.includes(d) && u && u && f(r, h[!l && A || l && j ? "menuStart" : "menuEnd"]), i(a, J);
}, ie = (e) => Array.from(e.children).map((e) => {
	if (e && U.includes(e.tagName)) return e;
	let { firstElementChild: t } = e;
	return t && U.includes(t.tagName) ? t : null;
}).filter((e) => e), X = (e) => {
	let { element: t, options: n, menu: i } = e, o = e.open ? h : v, c = a(t);
	o(c, S, Q), o(c, r, Q), o(c, u, oe), o(c, s, se), n.display === "dynamic" && (e.open ? e._observer.observe(i) : e._observer.disconnect());
}, Z = (e) => {
	let t = [
		...k,
		"btn-group",
		"input-group"
	].map((t) => y(`${t} ${T}`, a(e))).find((e) => e.length);
	if (t && t.length) return [...t[0].children].find((e) => k.some((t) => t === d(e, D)));
}, Q = (e) => {
	let { target: t, type: n } = e;
	if (!l(t)) return;
	let r = Z(t), i = r && R(r);
	if (!i) return;
	let { parentElement: a, menu: o } = i, s = a && a.contains(t) && (t.tagName === "form" || C(t, "form") !== null);
	["click", "mousedown"].includes(n) && M(t) && e.preventDefault(), !s && n !== "focus" && t !== r && t !== o && i.hide();
};
function ae(e) {
	let t = R(this);
	E(this) || t && (e.stopPropagation(), t.toggle(), M(this) && e.preventDefault());
}
var oe = (e) => {
	["ArrowDown", "ArrowUp"].includes(e.code) && e.preventDefault();
};
function se(e) {
	let { code: t } = e, n = Z(this);
	if (!n) return;
	let r = R(n), { activeElement: i } = a(n);
	if (!r || !i) return;
	let { menu: o, open: s } = r, c = ie(o);
	if (c && c.length && ["ArrowDown", "ArrowUp"].includes(t)) {
		let e = c.indexOf(i);
		i === n ? e = 0 : t === "ArrowUp" ? e = e > 1 ? e - 1 : 0 : t === "ArrowDown" && (e = e < c.length - 1 ? e + 1 : e), c[e] && w(c[e]);
	}
	t === "Escape" && s && (r.toggle(), w(n));
}
var $ = class extends x {
	static selector = L;
	static init = z;
	static getInstance = R;
	constructor(e, t) {
		super(e, t);
		let { parentElement: n } = this.element, [r] = y(j, n);
		r && (this.parentElement = n, this.menu = r, this._observer = new O(() => Y(this)), this._toggleEventListeners(!0));
	}
	get name() {
		return A;
	}
	get defaults() {
		return re;
	}
	toggle() {
		this.open ? this.hide() : this.show();
	}
	show() {
		let { element: t, open: r, menu: a, parentElement: o } = this;
		if (r) return;
		let s = Z(t), c = s && R(s);
		c && c.hide(), [
			W,
			G,
			J
		].forEach((e) => {
			e.relatedTarget = t;
		}), i(o, W), !W.defaultPrevented && (m(a, T), m(o, T), n(t, e, "true"), Y(this), this.open = !r, w(t), X(this), i(o, G));
	}
	hide() {
		let { element: t, open: r, menu: a, parentElement: s } = this;
		r && ([K, q].forEach((e) => {
			e.relatedTarget = t;
		}), i(s, K), !K.defaultPrevented && (o(a, T), o(s, T), n(t, e, "false"), this.open = !r, X(this), i(s, q)));
	}
	_toggleEventListeners = (e) => {
		(e ? h : v)(this.element, S, ae);
	};
	dispose() {
		this.open && this.hide(), this._toggleEventListeners(), super.dispose();
	}
};
//#endregion
export { $ as default };

//# sourceMappingURL=dropdown.mjs.map