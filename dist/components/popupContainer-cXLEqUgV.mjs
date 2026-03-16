import { A as e, mt as t, ut as n } from "./base-component-Bm8KwB_I.mjs";
//#region src/strings/modalString.ts
var r = "modal", i = "offcanvas", a = n({
	tagName: "div",
	className: "popup-container"
}), o = (n, r) => {
	let i = t(r) && r.nodeName === "BODY", o = t(r) && !i ? r : a, s = i ? r : e(n);
	t(n) && (o === a && s.append(a), o.append(n));
}, s = (e, n) => {
	let r = t(n) && n.nodeName === "BODY", i = t(n) && !r ? n : a;
	t(e) && (e.remove(), i === a && !a.children.length && a.remove());
}, c = (e, n) => {
	let r = t(n) && n.nodeName !== "BODY" ? n : a;
	return t(e) && r.contains(e);
};
//#endregion
export { r as a, i, c as n, s as r, o as t };

//# sourceMappingURL=popupContainer-cXLEqUgV.mjs.map