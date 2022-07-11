"use strict";(self.webpackChunkcreate_company=self.webpackChunkcreate_company||[]).push([[859],{65859:function(e,t,n){n.r(t),n.d(t,{default:function(){return C}});var a=n(1413),r=n(15861),c=n(29439),l=n(87757),i=n.n(l),o=n(72791),s=n(87661),d=n(80570),u=n(49389),m=n(87309),p=n(83734),f=n(50419),v=n(66871),h=n(66106),Z=n(30914),b=n(39772),g=n(72525),y="/admin/email/setting",x="/admin/email/setting",E={getSetting:function(){return g.Z.get(y)},updateSetting:function(e){return g.Z.post(x,e)}},j=n(80184),w=s.Z.TabPane,O=(0,o.forwardRef)((function(e,t){return(0,j.jsx)(d.Z,{onFinish:null===e||void 0===e?void 0:e.passwordSubmit,ref:t,layout:"vertical",children:(0,j.jsxs)(d.Z.Item,{label:(0,j.jsx)("h3",{children:"\u0110\u1ed5i m\u1eadt kh\u1ea9u"}),children:[(0,j.jsx)(d.Z.Item,{name:"old_password",children:(0,j.jsx)(u.Z.Password,{placeholder:"M\u1eadt kh\u1ea9u hi\u1ec7n t\u1ea1i"})}),(0,j.jsx)(d.Z.Item,{name:"new_password",children:(0,j.jsx)(u.Z.Password,{placeholder:"M\u1eadt kh\u1ea9u m\u1edbi"})}),(0,j.jsx)(d.Z.Item,{name:"confirm_password",children:(0,j.jsx)(u.Z.Password,{placeholder:"X\xe1c nh\u1eadn m\u1eadt kh\u1ea9u m\u1edbi"})}),(0,j.jsx)(d.Z.Item,{children:(0,j.jsx)(m.Z,{htmlType:"submit",loading:null===e||void 0===e?void 0:e.loading,children:"X\xe1c nh\u1eadn"})})]})})})),P=(0,o.forwardRef)((function(e,t){var n,a;return(0,o.useEffect)((function(){var n=null===e||void 0===e?void 0:e.settingMail,a=n.mailRegister,r=n.mailPayment;a&&t.current.setFieldsValue({mailRegister:a._id}),r&&t.current.setFieldsValue({mailPayment:r._id})}),[e]),(0,j.jsxs)(d.Z,{ref:t,onFinish:e.mailSubmit,layout:"vertical",children:[(0,j.jsx)(d.Z.Item,{label:"Mail \u0111\u0103ng k\xed",name:"mailRegister",children:(0,j.jsx)(p.Z,{children:null===(n=e.options)||void 0===n?void 0:n.map((function(e){return(0,j.jsx)(p.Z.Option,{value:e._id,children:e.name},e._id)}))})}),(0,j.jsx)(d.Z.Item,{label:"Mail Thanh To\xe1n",name:"mailPayment",children:(0,j.jsx)(p.Z,{children:null===(a=e.options)||void 0===a?void 0:a.map((function(e){return(0,j.jsx)(p.Z.Option,{value:e._id,children:e.name},e._id)}))})}),(0,j.jsx)(d.Z.Item,{children:(0,j.jsx)(m.Z,{htmlType:"submit",loading:null===e||void 0===e?void 0:e.loading,children:"X\xe1c nh\u1eadn"})})]})})),C=function(){var e=(0,o.useRef)(),t=(0,o.useRef)(),n=(0,o.useState)(!1),l=(0,c.Z)(n,2),d=l[0],u=l[1],m=(0,o.useState)([]),p=(0,c.Z)(m,2),g=p[0],y=p[1],x=(0,o.useState)({}),C=(0,c.Z)(x,2),N=C[0],S=C[1];(0,o.useEffect)((function(){T(),_()}),[]);var k=function(){var e=(0,r.Z)(i().mark((function e(t){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,u(!0),e.next=4,E.updateSetting((0,a.Z)({},t));case 4:n=e.sent,f.ZP.success(n.data.message),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:return e.prev=11,_(),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,8,11,14]])})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=(0,r.Z)(i().mark((function e(){var t,n,a,r=arguments;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:1,u(!0),n={page:t},e.prev=3,e.next=6,b.Z.getTemplate(n);case 6:200===(a=e.sent).data.status?y(a.data.data._template):f.ZP.error(a.data.message),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.log(e.t0);case 13:return e.prev=13,u(!1),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[3,10,13,16]])})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=(0,r.Z)(i().mark((function e(){var t,n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,u(!0),e.next=4,E.getSetting();case 4:t=e.sent,n=t.data.data,S(n),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:return e.prev=12,u(!1),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,9,12,15]])})));return function(){return e.apply(this,arguments)}}(),I=[{name:"\u0110\u1ed5i m\u1eadt kh\u1ea9u",content:(0,j.jsx)(O,{passwordSubmit:function(e){console.log(e)},ref:e,loading:d})},{name:"Mail",content:(0,j.jsx)(P,{mailSubmit:k,ref:t,options:g,settingMail:N,loading:d})}];return(0,j.jsx)(v.Z,{title:"C\xe0i \u0111\u1eb7t",children:(0,j.jsx)(h.Z,{gutter:[16,12],children:(0,j.jsx)(Z.Z,{span:24,children:(0,j.jsx)(s.Z,{defaultActiveKey:"1",children:I.map((function(e){return(0,j.jsx)(w,{tab:e.name,children:e.content},e.name)}))})})})})}},39772:function(e,t,n){var a=n(72525),r="/admin/template",c="/admin/template/delete",l="/admin/template",i="/admin/template/edit",o={getTemplate:function(e){return a.Z.get(r,{params:e})},addTemplate:function(e){return a.Z.post(l,e)},editTemplate:function(e){return a.Z.post("".concat(i,"/").concat(e._id),e)},deleteTemplate:function(e){return a.Z.post("".concat(c,"/").concat(e))}};t.Z=o},66871:function(e,t,n){n.d(t,{Z:function(){return y}});var a=n(4942),r=n(87462),c=n(72791),l=n(81694),i=n.n(l),o=n(41818),s=n(69077),d=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},u=function(e){var t=e.prefixCls,n=e.className,l=e.hoverable,o=void 0===l||l,u=d(e,["prefixCls","className","hoverable"]);return c.createElement(s.C,null,(function(e){var l=(0,e.getPrefixCls)("card",t),s=i()("".concat(l,"-grid"),n,(0,a.Z)({},"".concat(l,"-grid-hoverable"),o));return c.createElement("div",(0,r.Z)({},u,{className:s}))}))},m=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},p=function(e){return c.createElement(s.C,null,(function(t){var n=t.getPrefixCls,a=e.prefixCls,l=e.className,o=e.avatar,s=e.title,d=e.description,u=m(e,["prefixCls","className","avatar","title","description"]),p=n("card",a),f=i()("".concat(p,"-meta"),l),v=o?c.createElement("div",{className:"".concat(p,"-meta-avatar")},o):null,h=s?c.createElement("div",{className:"".concat(p,"-meta-title")},s):null,Z=d?c.createElement("div",{className:"".concat(p,"-meta-description")},d):null,b=h||Z?c.createElement("div",{className:"".concat(p,"-meta-detail")},h,Z):null;return c.createElement("div",(0,r.Z)({},u,{className:f}),v,b)}))},f=n(87661),v=n(66106),h=n(30914),Z=n(1815),b=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};var g=c.forwardRef((function(e,t){var n,l,d,m=c.useContext(s.E_),p=m.getPrefixCls,g=m.direction,y=c.useContext(Z.Z),x=e.prefixCls,E=e.className,j=e.extra,w=e.headStyle,O=void 0===w?{}:w,P=e.bodyStyle,C=void 0===P?{}:P,N=e.title,S=e.loading,k=e.bordered,T=void 0===k||k,_=e.size,I=e.type,M=e.cover,R=e.actions,K=e.tabList,A=e.children,F=e.activeTabKey,z=e.defaultActiveTabKey,B=e.tabBarExtraContent,X=e.hoverable,L=e.tabProps,V=void 0===L?{}:L,G=b(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),q=p("card",x),D=0===C.padding||"0px"===C.padding?{padding:24}:void 0,H=c.createElement("div",{className:"".concat(q,"-loading-block")}),J=c.createElement("div",{className:"".concat(q,"-loading-content"),style:D},c.createElement(v.Z,{gutter:8},c.createElement(h.Z,{span:22},H)),c.createElement(v.Z,{gutter:8},c.createElement(h.Z,{span:8},H),c.createElement(h.Z,{span:15},H)),c.createElement(v.Z,{gutter:8},c.createElement(h.Z,{span:6},H),c.createElement(h.Z,{span:18},H)),c.createElement(v.Z,{gutter:8},c.createElement(h.Z,{span:13},H),c.createElement(h.Z,{span:9},H)),c.createElement(v.Z,{gutter:8},c.createElement(h.Z,{span:4},H),c.createElement(h.Z,{span:3},H),c.createElement(h.Z,{span:16},H))),Q=void 0!==F,U=(0,r.Z)((0,r.Z)({},V),(n={},(0,a.Z)(n,Q?"activeKey":"defaultActiveKey",Q?F:z),(0,a.Z)(n,"tabBarExtraContent",B),n)),W=K&&K.length?c.createElement(f.Z,(0,r.Z)({size:"large"},U,{className:"".concat(q,"-head-tabs"),onChange:function(t){var n;null===(n=e.onTabChange)||void 0===n||n.call(e,t)}}),K.map((function(e){return c.createElement(f.Z.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(N||j||W)&&(d=c.createElement("div",{className:"".concat(q,"-head"),style:O},c.createElement("div",{className:"".concat(q,"-head-wrapper")},N&&c.createElement("div",{className:"".concat(q,"-head-title")},N),j&&c.createElement("div",{className:"".concat(q,"-extra")},j)),W));var Y=M?c.createElement("div",{className:"".concat(q,"-cover")},M):null,$=c.createElement("div",{className:"".concat(q,"-body"),style:C},S?J:A),ee=R&&R.length?c.createElement("ul",{className:"".concat(q,"-actions")},function(e){return e.map((function(t,n){return c.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(n)},c.createElement("span",null,t))}))}(R)):null,te=(0,o.Z)(G,["onTabChange"]),ne=_||y,ae=i()(q,(l={},(0,a.Z)(l,"".concat(q,"-loading"),S),(0,a.Z)(l,"".concat(q,"-bordered"),T),(0,a.Z)(l,"".concat(q,"-hoverable"),X),(0,a.Z)(l,"".concat(q,"-contain-grid"),function(){var t;return c.Children.forEach(e.children,(function(e){e&&e.type&&e.type===u&&(t=!0)})),t}()),(0,a.Z)(l,"".concat(q,"-contain-tabs"),K&&K.length),(0,a.Z)(l,"".concat(q,"-").concat(ne),ne),(0,a.Z)(l,"".concat(q,"-type-").concat(I),!!I),(0,a.Z)(l,"".concat(q,"-rtl"),"rtl"===g),l),E);return c.createElement("div",(0,r.Z)({ref:t},te,{className:ae}),d,Y,$,ee)}));g.Grid=u,g.Meta=p;var y=g}}]);
//# sourceMappingURL=859.74753e48.chunk.js.map