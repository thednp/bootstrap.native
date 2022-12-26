"use strict";const s=require("./shorty-1329a513.cjs"),a=(d,r,p)=>{if(!(!s.u(d)||s.g(r)&&!r.length))if(s.g(r)){let i=r.trim();s.so(p)&&(i=p(i));const e=new DOMParser().parseFromString(i,"text/html");d.append(...e.body.childNodes)}else s.u(r)?d.append(r):(s.lo(r)||s.ue(r)&&r.every(s.a))&&d.append(...r)};module.exports=a;
//# sourceMappingURL=setHtml.cjs.map
