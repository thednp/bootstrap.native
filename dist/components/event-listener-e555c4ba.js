const d = {}, p = (t) => {
  const { type: o, currentTarget: a } = t;
  [...d[o]].forEach(([n, s]) => {
    a === n && [...s].forEach(([e, r]) => {
      e.apply(n, [t]), typeof r == "object" && r.once && i(n, o, e, r);
    });
  });
}, E = (t, o, a, n) => {
  d[o] || (d[o] = /* @__PURE__ */ new Map());
  const s = d[o];
  s.has(t) || s.set(t, /* @__PURE__ */ new Map());
  const e = s.get(t), { size: r } = e;
  e.set(a, n), r || t.addEventListener(o, p, n);
}, i = (t, o, a, n) => {
  const s = d[o], e = s && s.get(t), r = e && e.get(a), c = r !== void 0 ? r : n;
  e && e.has(a) && e.delete(a), s && (!e || !e.size) && s.delete(t), (!s || !s.size) && delete d[o], (!e || !e.size) && t.removeEventListener(o, p, c);
};
export {
  E,
  i as r
};
//# sourceMappingURL=event-listener-e555c4ba.js.map
