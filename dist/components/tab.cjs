"use strict";var P=Object.defineProperty;var k=(n,s,t)=>s in n?P(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;var g=(n,s,t)=>k(n,typeof s!="symbol"?s+"":s,t);const e=require("@thednp/shorty"),H=require("@thednp/event-listener"),E=require("./collapsingClass-CLblascz.js"),d=require("./activeClass-CxJYQAGN.js"),h=require("./fadeClass-Co6nOzNJ.js"),m=require("./showClass-D_Ms1FgG.js"),p=require("./dropdownClasses-CnEyz_iw.js"),D=require("./dataBsToggle-Dj-Ng54N.js"),w=require("./getTargetElement-Cl-PhUJH.js"),_=require("./base-component-DBcDoOjV.js"),f="tab",B="Tab",L=`[${D.dataBsToggle}="${f}"]`,I=n=>e.getInstance(n,B),j=n=>new u(n),b=e.createCustomEvent(`show.bs.${f}`),q=e.createCustomEvent(`shown.bs.${f}`),T=e.createCustomEvent(`hide.bs.${f}`),M=e.createCustomEvent(`hidden.bs.${f}`),v=new Map,x=n=>{const{tabContent:s,nav:t}=n;// istanbul ignore else @preserve
s&&e.hasClass(s,E.collapsingClass)&&(s.style.height="",e.removeClass(s,E.collapsingClass));// istanbul ignore else @preserve
t&&e.Timer.clear(t)},$=n=>{const{element:s,tabContent:t,content:a,nav:l}=n,{tab:r}=e.isHTMLElement(l)&&v.get(l)||{tab:null};// istanbul ignore next @preserve
// istanbul ignore else @preserve
if(t&&a&&e.hasClass(a,h.fadeClass)){const{currentHeight:o,nextHeight:i}=v.get(s)||{currentHeight:0,nextHeight:0};// istanbul ignore next @preserve
// istanbul ignore else @preserve: vitest won't validate this branch
o!==i?setTimeout(()=>{t.style.height=`${i}px`,e.reflow(t),e.emulateTransitionEnd(t,()=>x(n))},50):x(n)}else l&&e.Timer.clear(l);q.relatedTarget=r,e.dispatchEvent(s,q)},S=n=>{const{element:s,content:t,tabContent:a,nav:l}=n,{tab:r,content:o}=l&&v.get(l)||{tab:null,content:null};let i=0;// istanbul ignore else @preserve
a&&t&&e.hasClass(t,h.fadeClass)&&([o,t].forEach(c=>{// istanbul ignore else @preserve
e.isHTMLElement(c)&&e.addClass(c,"overflow-hidden")}),i=e.isHTMLElement(o)?o.scrollHeight:0),b.relatedTarget=r,M.relatedTarget=s,e.dispatchEvent(s,b);// istanbul ignore else @preserve
if(!b.defaultPrevented){// istanbul ignore else @preserve
t&&e.addClass(t,d.activeClass);// istanbul ignore else @preserve
o&&e.removeClass(o,d.activeClass);// istanbul ignore else @preserve
if(a&&t&&e.hasClass(t,h.fadeClass)){const c=t.scrollHeight;v.set(s,{currentHeight:i,nextHeight:c,tab:null,content:null}),e.addClass(a,E.collapsingClass),a.style.height=`${i}px`,e.reflow(a),[o,t].forEach(C=>{// istanbul ignore else @preserve
C&&e.removeClass(C,"overflow-hidden")})}if(t&&t&&e.hasClass(t,h.fadeClass))setTimeout(()=>{e.addClass(t,m.showClass),e.emulateTransitionEnd(t,()=>{$(n)})},1);else{// istanbul ignore else @preserve
t&&e.addClass(t,m.showClass),$(n)}// istanbul ignore else @preserve
r&&e.dispatchEvent(r,M)}},y=n=>{const{nav:s}=n;// istanbul ignore next @preserve
if(!e.isHTMLElement(s))return{tab:null,content:null};const t=e.getElementsByClassName(d.activeClass,s);let a=null;// istanbul ignore else @preserve
t.length===1&&!p.dropdownMenuClasses.some(r=>e.hasClass(t[0].parentElement,r))?[a]=t:t.length>1&&(a=t[t.length-1]);const l=e.isHTMLElement(a)?w.getTargetElement(a):null;return{tab:a,content:l}},A=n=>{// istanbul ignore next @preserve
if(!e.isHTMLElement(n))return null;const s=e.closest(n,`.${p.dropdownMenuClasses.join(",.")}`);return s?e.querySelector(`.${p.dropdownMenuClasses[0]}-toggle`,s):null},N=n=>{const s=I(n.target);// istanbul ignore else @preserve
s&&(n.preventDefault(),s.show())};class u extends _.BaseComponent{constructor(t){super(t);g(this,"_toggleEventListeners",t=>{(t?H.addListener:H.removeListener)(this.element,e.mouseclickEvent,N)});const{element:a}=this,l=w.getTargetElement(a);// istanbul ignore else @preserve
if(l){const r=e.closest(a,".nav"),o=e.closest(l,".tab-content");this.nav=r,this.content=l,this.tabContent=o,this.dropdown=A(a);const{tab:i}=y(this);if(r&&!i){const c=e.querySelector(L,r),C=c&&w.getTargetElement(c);// istanbul ignore else @preserve
C&&(e.addClass(c,d.activeClass),e.addClass(C,m.showClass),e.addClass(C,d.activeClass),e.setAttribute(a,e.ariaSelected,"true"))}this._toggleEventListeners(!0)}}get name(){return B}show(){const{element:t,content:a,nav:l,dropdown:r}=this;// istanbul ignore else @preserve
if(!(l&&e.Timer.get(l))&&!e.hasClass(t,d.activeClass)){const{tab:o,content:i}=y(this);// istanbul ignore else @preserve
l&&v.set(l,{tab:o,content:i,currentHeight:0,nextHeight:0}),T.relatedTarget=t;// istanbul ignore else @preserve
if(e.isHTMLElement(o)){e.dispatchEvent(o,T);// istanbul ignore else @preserve
if(!T.defaultPrevented){e.addClass(t,d.activeClass),e.setAttribute(t,e.ariaSelected,"true");const c=e.isHTMLElement(o)&&A(o);c&&e.hasClass(c,d.activeClass)&&e.removeClass(c,d.activeClass);// istanbul ignore else @preserve
if(l){const C=()=>{// istanbul ignore else @preserve
o&&(e.removeClass(o,d.activeClass),e.setAttribute(o,e.ariaSelected,"false")),r&&!e.hasClass(r,d.activeClass)&&e.addClass(r,d.activeClass)};i&&(e.hasClass(i,h.fadeClass)||a&&e.hasClass(a,h.fadeClass))?e.Timer.set(l,C,1):C()}// istanbul ignore else @preserve
i&&(e.removeClass(i,m.showClass),e.hasClass(i,h.fadeClass)?e.emulateTransitionEnd(i,()=>S(this)):S(this))}}}}dispose(){this._toggleEventListeners(),super.dispose()}}g(u,"selector",L),g(u,"init",j),g(u,"getInstance",I);module.exports=u;
//# sourceMappingURL=tab.cjs.map
