"use strict";(self.webpackChunkcreate_company=self.webpackChunkcreate_company||[]).push([[644],{69019:function(e,n,t){function r(e){return Object.keys(e).reduce((function(n,t){return!t.startsWith("data-")&&!t.startsWith("aria-")&&"role"!==t||t.startsWith("data-__")||(n[t]=e[t]),n}),{})}t.d(n,{Z:function(){return r}})},65873:function(e,n,t){t.d(n,{Z:function(){return K}});var r,o=t(4942),c=t(87462),a=t(72791),i=t(70085),l=t(81694),u=t.n(l),s=t(60732),f=t(72073),m=t(87309),d=t(6417),p=t(93486),v=t(69077),C=t(96096),g=t(29464),y=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t};(0,C.jD)()&&document.documentElement.addEventListener("click",(function(e){r={x:e.pageX,y:e.pageY},setTimeout((function(){r=null}),100)}),!0);var k=function(e){var n,t=a.useContext(v.E_),l=t.getPopupContainer,C=t.getPrefixCls,k=t.direction,x=function(n){var t=e.onCancel;null===t||void 0===t||t(n)},Z=function(n){var t=e.onOk;null===t||void 0===t||t(n)},b=function(n){var t=e.okText,r=e.okType,o=e.cancelText,i=e.confirmLoading;return a.createElement(a.Fragment,null,a.createElement(m.Z,(0,c.Z)({onClick:x},e.cancelButtonProps),o||n.cancelText),a.createElement(m.Z,(0,c.Z)({},(0,d.n)(r),{loading:i,onClick:Z},e.okButtonProps),t||n.okText))},E=e.prefixCls,T=e.footer,h=e.visible,P=e.wrapClassName,w=e.centered,N=e.getContainer,O=e.closeIcon,j=e.focusTriggerAfterClose,A=void 0===j||j,I=y(e,["prefixCls","footer","visible","wrapClassName","centered","getContainer","closeIcon","focusTriggerAfterClose"]),S=C("modal",E),F=C(),R=a.createElement(p.Z,{componentName:"Modal",defaultLocale:(0,f.A)()},b),L=a.createElement("span",{className:"".concat(S,"-close-x")},O||a.createElement(s.Z,{className:"".concat(S,"-close-icon")})),M=u()(P,(n={},(0,o.Z)(n,"".concat(S,"-centered"),!!w),(0,o.Z)(n,"".concat(S,"-wrap-rtl"),"rtl"===k),n));return a.createElement(i.Z,(0,c.Z)({},I,{getContainer:void 0===N?l:N,prefixCls:S,wrapClassName:M,footer:void 0===T?R:T,visible:h,mousePosition:r,onClose:x,closeIcon:L,focusTriggerAfterClose:A,transitionName:(0,g.mL)(F,"zoom",e.transitionName),maskTransitionName:(0,g.mL)(F,"fade",e.maskTransitionName)}))};k.defaultProps={width:520,confirmLoading:!1,visible:!1,okType:"primary"};var x=k,Z=t(54164),b=t(29966),E=t(68944),T=t(11532),h=t(35796),P=t(29439),w=t(98368);function N(e){return!(!e||!e.then)}var O=function(e){var n=a.useRef(!1),t=a.useRef(),r=(0,w.Z)(!1),o=(0,P.Z)(r,2),i=o[0],l=o[1];a.useEffect((function(){var n;if(e.autoFocus){var r=t.current;n=setTimeout((function(){return r.focus()}))}return function(){n&&clearTimeout(n)}}),[]);var u=e.type,s=e.children,f=e.prefixCls,p=e.buttonProps;return a.createElement(m.Z,(0,c.Z)({},(0,d.n)(u),{onClick:function(t){var r=e.actionFn,o=e.close;if(!n.current)if(n.current=!0,r){var c;if(e.emitEvent){if(c=r(t),e.quitOnNullishReturnValue&&!N(c))return n.current=!1,void o(t)}else if(r.length)c=r(o),n.current=!1;else if(!(c=r()))return void o();!function(t){var r=e.close;N(t)&&(l(!0),t.then((function(){l(!1,!0),r.apply(void 0,arguments),n.current=!1}),(function(e){console.error(e),l(!1,!0),n.current=!1})))}(c)}else o()},loading:i,prefixCls:f},p,{ref:t}),s)},j=t(14824),A=t(94775),I=function(e){var n=e.icon,t=e.onCancel,r=e.onOk,c=e.close,i=e.zIndex,l=e.afterClose,s=e.visible,f=e.keyboard,m=e.centered,d=e.getContainer,p=e.maskStyle,v=e.okText,C=e.okButtonProps,y=e.cancelText,k=e.cancelButtonProps,Z=e.direction,b=e.prefixCls,E=e.wrapClassName,T=e.rootPrefixCls,h=e.iconPrefixCls,P=e.bodyStyle,w=e.closable,N=void 0!==w&&w,I=e.closeIcon,S=e.modalRender,F=e.focusTriggerAfterClose;(0,j.Z)(!("string"===typeof n&&n.length>2),"Modal","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(n,"` at https://ant.design/components/icon"));var R=e.okType||"primary",L="".concat(b,"-confirm"),M=!("okCancel"in e)||e.okCancel,B=e.width||416,_=e.style||{},z=void 0===e.mask||e.mask,W=void 0!==e.maskClosable&&e.maskClosable,D=null!==e.autoFocusButton&&(e.autoFocusButton||"ok"),H=u()(L,"".concat(L,"-").concat(e.type),(0,o.Z)({},"".concat(L,"-rtl"),"rtl"===Z),e.className),q=M&&a.createElement(O,{actionFn:t,close:c,autoFocus:"cancel"===D,buttonProps:k,prefixCls:"".concat(T,"-btn")},y);return a.createElement(A.ZP,{prefixCls:T,iconPrefixCls:h,direction:Z},a.createElement(x,{prefixCls:b,className:H,wrapClassName:u()((0,o.Z)({},"".concat(L,"-centered"),!!e.centered),E),onCancel:function(){return c({triggerCancel:!0})},visible:s,title:"",footer:"",transitionName:(0,g.mL)(T,"zoom",e.transitionName),maskTransitionName:(0,g.mL)(T,"fade",e.maskTransitionName),mask:z,maskClosable:W,maskStyle:p,style:_,bodyStyle:P,width:B,zIndex:i,afterClose:l,keyboard:f,centered:m,getContainer:d,closable:N,closeIcon:I,modalRender:S,focusTriggerAfterClose:F},a.createElement("div",{className:"".concat(L,"-body-wrapper")},a.createElement("div",{className:"".concat(L,"-body")},n,void 0===e.title?null:a.createElement("span",{className:"".concat(L,"-title")},e.title),a.createElement("div",{className:"".concat(L,"-content")},e.content)),a.createElement("div",{className:"".concat(L,"-btns")},q,a.createElement(O,{type:R,actionFn:r,close:c,autoFocus:"ok"===D,buttonProps:C,prefixCls:"".concat(T,"-btn")},v)))))},S=[],F=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)n.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(t[r[o]]=e[r[o]])}return t},R="";function L(e){var n=document.createDocumentFragment(),t=(0,c.Z)((0,c.Z)({},e),{close:i,visible:!0});function r(){Z.unmountComponentAtNode(n);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];var c=r.some((function(e){return e&&e.triggerCancel}));e.onCancel&&c&&e.onCancel.apply(e,r);for(var a=0;a<S.length;a++){var l=S[a];if(l===i){S.splice(a,1);break}}}function o(e){var t=e.okText,r=e.cancelText,o=e.prefixCls,i=F(e,["okText","cancelText","prefixCls"]);setTimeout((function(){var e=(0,f.A)(),l=(0,A.w6)(),u=l.getPrefixCls,s=l.getIconPrefixCls,m=u(void 0,R),d=o||"".concat(m,"-modal"),p=s();Z.render(a.createElement(I,(0,c.Z)({},i,{prefixCls:d,rootPrefixCls:m,iconPrefixCls:p,okText:t||(i.okCancel?e.okText:e.justOkText),cancelText:r||e.cancelText})),n)}))}function i(){for(var n=this,a=arguments.length,i=new Array(a),l=0;l<a;l++)i[l]=arguments[l];o(t=(0,c.Z)((0,c.Z)({},t),{visible:!1,afterClose:function(){"function"===typeof e.afterClose&&e.afterClose(),r.apply(n,i)}}))}return o(t),S.push(i),{destroy:i,update:function(e){o(t="function"===typeof e?e(t):(0,c.Z)((0,c.Z)({},t),e))}}}function M(e){return(0,c.Z)((0,c.Z)({icon:a.createElement(h.Z,null),okCancel:!1},e),{type:"warning"})}function B(e){return(0,c.Z)((0,c.Z)({icon:a.createElement(b.Z,null),okCancel:!1},e),{type:"info"})}function _(e){return(0,c.Z)((0,c.Z)({icon:a.createElement(E.Z,null),okCancel:!1},e),{type:"success"})}function z(e){return(0,c.Z)((0,c.Z)({icon:a.createElement(T.Z,null),okCancel:!1},e),{type:"error"})}function W(e){return(0,c.Z)((0,c.Z)({icon:a.createElement(h.Z,null),okCancel:!0},e),{type:"confirm"})}var D=t(93433);var H=t(70454),q=function(e,n){var t=e.afterClose,r=e.config,o=a.useState(!0),i=(0,P.Z)(o,2),l=i[0],u=i[1],s=a.useState(r),f=(0,P.Z)(s,2),m=f[0],d=f[1],C=a.useContext(v.E_),g=C.direction,y=C.getPrefixCls,k=y("modal"),x=y(),Z=function(){u(!1);for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var r=n.some((function(e){return e&&e.triggerCancel}));m.onCancel&&r&&m.onCancel()};return a.useImperativeHandle(n,(function(){return{destroy:Z,update:function(e){d((function(n){return(0,c.Z)((0,c.Z)({},n),e)}))}}})),a.createElement(p.Z,{componentName:"Modal",defaultLocale:H.Z.Modal},(function(e){return a.createElement(I,(0,c.Z)({prefixCls:k,rootPrefixCls:x},m,{close:Z,visible:l,afterClose:t,okText:m.okText||(m.okCancel?e.okText:e.justOkText),direction:g,cancelText:m.cancelText||e.cancelText}))}))},V=a.forwardRef(q),X=0,Y=a.memo(a.forwardRef((function(e,n){var t=function(){var e=a.useState([]),n=(0,P.Z)(e,2),t=n[0],r=n[1];return[t,a.useCallback((function(e){return r((function(n){return[].concat((0,D.Z)(n),[e])})),function(){r((function(n){return n.filter((function(n){return n!==e}))}))}}),[])]}(),r=(0,P.Z)(t,2),o=r[0],c=r[1];return a.useImperativeHandle(n,(function(){return{patchElement:c}}),[]),a.createElement(a.Fragment,null,o)})));function G(e){return L(M(e))}var J=x;J.useModal=function(){var e=a.useRef(null),n=a.useState([]),t=(0,P.Z)(n,2),r=t[0],o=t[1];a.useEffect((function(){r.length&&((0,D.Z)(r).forEach((function(e){e()})),o([]))}),[r]);var c=a.useCallback((function(n){return function(t){var r;X+=1;var c,i=a.createRef(),l=a.createElement(V,{key:"modal-".concat(X),config:n(t),ref:i,afterClose:function(){c()}});return c=null===(r=e.current)||void 0===r?void 0:r.patchElement(l),{destroy:function(){function e(){var e;null===(e=i.current)||void 0===e||e.destroy()}i.current?e():o((function(n){return[].concat((0,D.Z)(n),[e])}))},update:function(e){function n(){var n;null===(n=i.current)||void 0===n||n.update(e)}i.current?n():o((function(e){return[].concat((0,D.Z)(e),[n])}))}}}}),[]);return[a.useMemo((function(){return{info:c(B),success:c(_),error:c(z),warning:c(M),confirm:c(W)}}),[]),a.createElement(Y,{ref:e})]},J.info=function(e){return L(B(e))},J.success=function(e){return L(_(e))},J.error=function(e){return L(z(e))},J.warning=G,J.warn=G,J.confirm=function(e){return L(W(e))},J.destroyAll=function(){for(;S.length;){var e=S.pop();e&&e()}},J.config=function(e){var n=e.rootPrefixCls;(0,j.Z)(!1,"Modal","Modal.config is deprecated. Please use ConfigProvider.config instead."),R=n};var K=J}}]);
//# sourceMappingURL=644.0489396f.chunk.js.map