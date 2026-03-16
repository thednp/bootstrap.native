import { A as e, K as t, L as n, P as r, R as i, U as a, V as o, Y as s, d as c, gt as l, m as u, rt as d, ut as f, yt as p } from "./base-component-Bm8KwB_I.mjs";
import { t as m } from "./fadeClass-Bzjdr13Y.mjs";
import { t as h } from "./showClass-CH6sh0pm.mjs";
import { a as g, i as _, r as v, t as y } from "./popupContainer-cXLEqUgV.mjs";
//#region src/strings/modalComponent.ts
var b = "Modal", x = "Offcanvas", S = "fixed-top", C = "fixed-bottom", w = "sticky-top", T = "position-sticky", E = (e) => [
	...d(S, e),
	...d(C, e),
	...d(w, e),
	...d(T, e),
	...d("is-fixed", e)
], D = (t) => {
	let n = e(t);
	c(n, {
		paddingRight: "",
		overflow: ""
	});
	let r = E(n);
	r.length && r.forEach((e) => {
		c(e, {
			paddingRight: "",
			marginRight: ""
		});
	});
}, O = (e) => {
	let { clientWidth: t } = p(e), { innerWidth: n } = l(e);
	return Math.abs(n - t);
}, k = (t, n) => {
	let r = e(t), a = parseInt(s(r, "paddingRight"), 10), o = s(r, "overflow") === "hidden" && a ? 0 : O(t), l = E(r);
	n && (c(r, {
		overflow: "hidden",
		paddingRight: `${a + o}px`
	}), l.length && l.forEach((e) => {
		let t = s(e, "paddingRight");
		if (e.style.paddingRight = `${parseInt(t, 10) + o}px`, ["sticky-top", "position-sticky"].some((t) => i(e, t))) {
			let t = s(e, "marginRight");
			e.style.marginRight = `${parseInt(t, 10) - o}px`;
		}
	}));
}, A = "backdrop", j = `${g}-${A}`, M = `${_}-${A}`, N = `.${g}.${h}`, P = `.${_}.${h}`, F = f("div"), I = (e) => r(`${N},${P}`, t(e)), L = (e) => {
	let t = e ? j : M;
	[j, M].forEach((e) => {
		n(F, e);
	}), u(F, t);
}, R = (t, n, r) => {
	L(r), y(F, e(t)), n && u(F, m);
}, z = () => {
	i(F, "show") || (u(F, h), a(F));
}, B = () => {
	n(F, h);
}, V = (t) => {
	I(t) || (n(F, m), v(F, e(t)), D(t));
}, H = (e) => o(e) && s(e, "visibility") !== "hidden" && e.offsetParent !== null;
//#endregion
export { N as a, V as c, O as d, k as f, B as i, z as l, b as m, R as n, P as o, x as p, I as r, F as s, H as t, L as u };

//# sourceMappingURL=isVisible-Bwf_dI1N.mjs.map