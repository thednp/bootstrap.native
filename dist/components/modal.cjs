"use strict";const e=require("./base-component-DaZCwW-u.js"),f=require("./event-listener-BQdA_KAC.js"),H=require("./dataBsToggle-Dj-Ng54N.js"),Y=require("./dataBsDismiss-CMHF7If_.js"),F=require("./fadeClass-Co6nOzNJ.js"),d=require("./showClass-D_Ms1FgG.js"),l=require("./popupContainer-CSoNJ-n6.js"),r=require("./isVisible-tPDn--vr.js"),D=require("./getTargetElement-CXAsWuzD.js"),_=`.${l.modalString}`,E=`[${H.dataBsToggle}="${l.modalString}"]`,B=`[${Y.dataBsDismiss}="${l.modalString}"]`,$=`${l.modalString}-static`,L={backdrop:!0,keyboard:!0},m=s=>e.to(s,r.modalComponent),P=s=>new O(s),p=e.vo(`show.bs.${l.modalString}`),S=e.vo(`shown.bs.${l.modalString}`),v=e.vo(`hide.bs.${l.modalString}`),T=e.vo(`hidden.bs.${l.modalString}`),k=s=>{const{element:t}=s,o=r.measureScrollbar(t),{clientHeight:n,scrollHeight:a}=e.S(t),{clientHeight:c,scrollHeight:g}=t,i=c!==g;if(!i&&o){const u={[e.Uo(t)?"paddingLeft":"paddingRight"]:`${o}px`};e.ho(t,u)}r.setScrollbar(t,i||n!==a)},M=(s,t)=>{const o=t?f.E:f.r,{element:n}=s;o(n,e.mt,A),o(e.d(n),e.dt,x),t?s._observer.observe(n):s._observer.disconnect()},y=s=>{const{triggers:t,element:o,relatedTarget:n}=s;r.removeOverlay(o),e.ho(o,{paddingRight:"",display:""}),M(s);const a=p.relatedTarget||t.find(r.isVisible);a&&e.io(a),T.relatedTarget=n||void 0,e.q(o,T),e.Ao(o)},C=s=>{const{element:t,relatedTarget:o}=s;e.io(t),M(s,!0),S.relatedTarget=o||void 0,e.q(t,S),e.Ao(t)},w=s=>{const{element:t,hasFade:o}=s;e.ho(t,{display:"block"}),k(s),r.getCurrentOpen(t)||e.ho(e.So(t),{overflow:"hidden"}),e.qn(t,d.showClass),e.Gn(t,e.$),e.Qn(t,e.Pe,"true"),o?e.ro(t,()=>C(s)):C(s)},q=s=>{const{element:t,options:o,hasFade:n}=s;o.backdrop&&n&&e.Yn(r.overlay,d.showClass)&&!r.getCurrentOpen(t)?(r.hideOverlay(),e.ro(r.overlay,()=>y(s))):y(s)},R=s=>{const{target:t}=s,o=t&&e.ke(t,E),n=o&&D.getTargetElement(o),a=n&&m(n);a&&(o&&o.tagName==="A"&&s.preventDefault(),a.relatedTarget=o,a.toggle())},x=({code:s,target:t})=>{const o=e.Ro(r.modalActiveSelector,e.d(t)),n=o&&m(o);if(!n)return;const{options:a}=n;a.keyboard&&s===e.gn&&e.Yn(o,d.showClass)&&(n.relatedTarget=null,n.hide())},A=s=>{const{currentTarget:t}=s,o=t&&m(t);if(!o||!t||e.yo.get(t))return;const{options:n,isStatic:a,modalDialog:c}=o,{backdrop:g}=n,{target:i}=s,h=e.d(t)?.getSelection()?.toString().length,u=c.contains(i),b=i&&e.ke(i,B);a&&!u?e.yo.set(t,()=>{e.qn(t,$),e.ro(c,()=>I(o))},17):(b||!h&&!a&&!u&&g)&&(o.relatedTarget=b||null,o.hide(),s.preventDefault())},I=s=>{const{element:t,modalDialog:o}=s,n=(e.ie(o)||0)+17;e.Zn(t,$),e.yo.set(t,()=>e.yo.clear(t),n)};class O extends e.BaseComponent{static selector=_;static init=P;static getInstance=m;constructor(t,o){super(t,o);const{element:n}=this,a=e.Ro(`.${l.modalString}-dialog`,n);a&&(this.modalDialog=a,this.triggers=[...e.de(E,e.d(n))].filter(c=>D.getTargetElement(c)===n),this.isStatic=this.options.backdrop==="static",this.hasFade=e.Yn(n,F.fadeClass),this.relatedTarget=null,this._observer=new ResizeObserver(()=>this.update()),this._toggleEventListeners(!0))}get name(){return r.modalComponent}get defaults(){return L}toggle(){e.Yn(this.element,d.showClass)?this.hide():this.show()}show(){const{element:t,options:o,hasFade:n,relatedTarget:a}=this,{backdrop:c}=o;let g=0;if(e.Yn(t,d.showClass)||(p.relatedTarget=a||void 0,e.q(t,p),p.defaultPrevented))return;const i=r.getCurrentOpen(t);if(i&&i!==t){const h=m(i)||e.to(i,r.offcanvasComponent);h&&h.hide()}c?(l.hasPopup(r.overlay)?r.toggleOverlayType(!0):r.appendOverlay(t,n,!0),g=e.ie(r.overlay),r.showOverlay(),setTimeout(()=>w(this),g)):(w(this),i&&e.Yn(r.overlay,d.showClass)&&r.hideOverlay())}hide(){const{element:t,hasFade:o,relatedTarget:n}=this;e.Yn(t,d.showClass)&&(v.relatedTarget=n||void 0,e.q(t,v),!v.defaultPrevented&&(e.Zn(t,d.showClass),e.Qn(t,e.$,"true"),e.Gn(t,e.Pe),o?e.ro(t,()=>q(this)):q(this)))}update=()=>{e.Yn(this.element,d.showClass)&&k(this)};_toggleEventListeners=t=>{const o=t?f.E:f.r,{triggers:n}=this;n.length&&n.forEach(a=>o(a,e.mt,R))};dispose(){const t={...this},{modalDialog:o,hasFade:n}=t,a=()=>setTimeout(()=>super.dispose(),17);this.hide(),this._toggleEventListeners(),n?e.ro(o,a):a()}}module.exports=O;
//# sourceMappingURL=modal.cjs.map
