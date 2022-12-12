const d = {}, c = (o) => {
  const { type: n, target: a, currentTarget: s } = o;
  [...d[n]].forEach(([e, t]) => {
    [s, a].includes(e) && [...t].forEach(([r, i]) => {
      r.apply(e, [o]), typeof i == "object" && i.once && p(e, n, r, i);
    });
  });
}, g = (o, n, a, s) => {
  d[n] || (d[n] = /* @__PURE__ */ new Map());
  const e = d[n];
  e.has(o) || e.set(o, /* @__PURE__ */ new Map());
  const t = e.get(o), { size: r } = t;
  t.set(a, s), r || o.addEventListener(n, c, s);
}, p = (o, n, a, s) => {
  const e = d[n], t = e && e.get(o), r = t && t.get(a), i = r !== void 0 ? r : s;
  t && t.has(a) && t.delete(a), e && (!t || !t.size) && e.delete(o), (!e || !e.size) && delete d[n], (!t || !t.size) && o.removeEventListener(n, c, i);
};
export {
  g as E,
  p as d
};
//# sourceMappingURL=event-listener-097fdcc5.js.map
