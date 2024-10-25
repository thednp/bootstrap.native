"use strict";const e=require("@thednp/shorty"),i="modal",a="offcanvas",s=e.createElement({tagName:"div",className:"popup-container"}),N=(p,o)=>{const n=e.isNode(o)&&o.nodeName==="BODY",d=e.isNode(o)&&!n?o:s,c=n?o:e.getDocumentBody(p);// istanbul ignore else @preserve
e.isNode(p)&&(d===s&&c.append(s),d.append(p))},f=(p,o)=>{const n=e.isNode(o)&&o.nodeName==="BODY",d=e.isNode(o)&&!n?o:s;// istanbul ignore else @preserve
e.isNode(p)&&(p.remove(),d===s&&!s.children.length&&s.remove())},l=(p,o)=>{const n=e.isNode(o)&&o.nodeName!=="BODY"?o:s;return e.isNode(p)&&n.contains(p)};exports.appendPopup=N;exports.hasPopup=l;exports.modalString=i;exports.offcanvasString=a;exports.removePopup=f;
//# sourceMappingURL=popupContainer-DIlSFkzD.js.map
