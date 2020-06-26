!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("react")):"function"==typeof define&&define.amd?define(["react"],n):"object"==typeof exports?exports.FSMRouter=n(require("react")):t.FSMRouter=n(t.React)}(window,(function(t){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,e),a.l=!0,a.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var a in t)e.d(r,a,function(n){return t[n]}.bind(null,a));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/dist/",e(e.s=1)}([function(n,e){n.exports=t},function(t,n,e){"use strict";e.r(n),e.d(n,"Link",(function(){return $})),e.d(n,"Machine",(function(){return B})),e.d(n,"State",(function(){return H})),e.d(n,"Transition",(function(){return G})),e.d(n,"useMachine",(function(){return D}));var r=e(0),a=e.n(r);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=function(t){if(t.length){var n=c(a.a.Children.toArray(t),"State");if(n.length)return n;if(t.props&&t.props.children)return t.props.children.reduce((function(t,n){return t=t.concat(c(a.a.Children.toArray(n.props.children),"State"))}),[])}return[]},c=function(t,n){return t.filter((function(t){return t.type.displayName===n}))},u=function(t,n){return n.split(".").pop()===t},s=function(t){return/^:(.+)/.test(t)},f=function(t){return"/"===t},l=function(t){return t.split("/").filter(Boolean)},p=function(t,n){return"/"+l(t).map((function(t){if(s(t)){var e=t.replace(":","");return Object.keys(n).includes(e)?n[e].toString():(console.error("Cannot push to a dynamic URL without supplying the proper parameters: ".concat(t," parameter is missing.")),"undefined")}return t})).join("/")+(window.location.search?window.location.search:"")},d=function t(n,e){var r=e.find((function(t){return t.stack===n})),a=r.childStates,i={path:r.path,stack:r.stack};if(a.length){var o=a.map((function(t){return e.find((function(n){return n.id===t}))})),c=o.find((function(t){return t.initial}))||o[0];if(c.childStates.length)return t(c.stack,e);i.path=c.path||"/",i.stack=c.stack}return i},h=function(t,n,e){var r={params:null,path:null,stack:null,url:t},a=function(t,n,e){var r={params:{},path:t,stack:null},a=n.find((function(n){return n.path===t}));if(a)return r.path=a.path,r.stack=a.stack,r;if(function(t){return""===t.slice(1)}(t))return r.stack=n.find((function(t){return 1===t.stack.match(/\./g).length&&t.initial})).stack,r;var i=n.filter((function(t){return t.path&&t.path.match(/\/:/g)})).map((function(t){return t.path}));if(i.length){var o=l(t),c=i.find((function(t){var n=l(t);return r.params={},n.length===o.length&&!n.map((function(t,n){return s(t)?(r.params[t.slice(1)]=o[n],!0):t===o[n]})).includes(!1)}));c&&(r.path=c,r.stack=n.find((function(t){return t.path===c})).stack)}if(!r.stack){var u=n.find((function(t){return"*"===t.id}));r.stack="#"+e+".*",u||console.warn('No <State/> configuration matches URL "'.concat(t,", and no catch-all <State id='*' path='/404'/> exists. Consider adding one."))}return r}(t,n,e),i=a.params,o=a.path,c=a.stack;if(r.params=i,r.path=o,r.stack=c,function(t){return"*"===t.split(".").pop()}(c));else{var u=d(c,n),f=u.path,h=u.stack;r.path=f,r.stack=h,r.url=p(f,i)}return r},v=function t(n,e,r){if(function(t){return!t.match(/\./g)}(e))return null;var a=r.find((function(t){return t.stack===e})).transitions;if(a.length){var i=a.find((function(t){var e=t.cond,r=t.event;t.target;return r===n&&null===e||!0===e}));if(i)return i}var o=e.split(".").slice(0,-1).join(".");return t(n,o,r)};function m(){return(m=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}function y(t){return"/"===t.charAt(0)}function g(t,n){for(var e=n,r=e+1,a=t.length;r<a;e+=1,r+=1)t[e]=t[r];t.pop()}var b=function(t,n){void 0===n&&(n="");var e,r=t&&t.split("/")||[],a=n&&n.split("/")||[],i=t&&y(t),o=n&&y(n),c=i||o;if(t&&y(t)?a=r:r.length&&(a.pop(),a=a.concat(r)),!a.length)return"/";if(a.length){var u=a[a.length-1];e="."===u||".."===u||""===u}else e=!1;for(var s=0,f=a.length;f>=0;f--){var l=a[f];"."===l?g(a,f):".."===l?(g(a,f),s++):s&&(g(a,f),s--)}if(!c)for(;s--;s)a.unshift("..");!c||""===a[0]||a[0]&&y(a[0])||a.unshift("");var p=a.join("/");return e&&"/"!==p.substr(-1)&&(p+="/"),p};var w=function(t,n){if(!t)throw new Error("Invariant failed")};function O(t){return"/"===t.charAt(0)?t:"/"+t}function k(t,n){return function(t,n){return 0===t.toLowerCase().indexOf(n.toLowerCase())&&-1!=="/?#".indexOf(t.charAt(n.length))}(t,n)?t.substr(n.length):t}function j(t){return"/"===t.charAt(t.length-1)?t.slice(0,-1):t}function S(t){var n=t.pathname,e=t.search,r=t.hash,a=n||"/";return e&&"?"!==e&&(a+="?"===e.charAt(0)?e:"?"+e),r&&"#"!==r&&(a+="#"===r.charAt(0)?r:"#"+r),a}function x(t,n,e,r){var a;"string"==typeof t?(a=function(t){var n=t||"/",e="",r="",a=n.indexOf("#");-1!==a&&(r=n.substr(a),n=n.substr(0,a));var i=n.indexOf("?");return-1!==i&&(e=n.substr(i),n=n.substr(0,i)),{pathname:n,search:"?"===e?"":e,hash:"#"===r?"":r}}(t)).state=n:(void 0===(a=m({},t)).pathname&&(a.pathname=""),a.search?"?"!==a.search.charAt(0)&&(a.search="?"+a.search):a.search="",a.hash?"#"!==a.hash.charAt(0)&&(a.hash="#"+a.hash):a.hash="",void 0!==n&&void 0===a.state&&(a.state=n));try{a.pathname=decodeURI(a.pathname)}catch(t){throw t instanceof URIError?new URIError('Pathname "'+a.pathname+'" could not be decoded. This is likely caused by an invalid percent-encoding.'):t}return e&&(a.key=e),r?a.pathname?"/"!==a.pathname.charAt(0)&&(a.pathname=b(a.pathname,r.pathname)):a.pathname=r.pathname:a.pathname||(a.pathname="/"),a}function P(){var t=null;var n=[];return{setPrompt:function(n){return t=n,function(){t===n&&(t=null)}},confirmTransitionTo:function(n,e,r,a){if(null!=t){var i="function"==typeof t?t(n,e):t;"string"==typeof i?"function"==typeof r?r(i,a):a(!0):a(!1!==i)}else a(!0)},appendListener:function(t){var e=!0;function r(){e&&t.apply(void 0,arguments)}return n.push(r),function(){e=!1,n=n.filter((function(t){return t!==r}))}},notifyListeners:function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];n.forEach((function(t){return t.apply(void 0,e)}))}}}var A=!("undefined"==typeof window||!window.document||!window.document.createElement);function E(t,n){n(window.confirm(t))}function C(){try{return window.history.state||{}}catch(t){return{}}}function M(t){void 0===t&&(t={}),A||w(!1);var n,e=window.history,r=(-1===(n=window.navigator.userAgent).indexOf("Android 2.")&&-1===n.indexOf("Android 4.0")||-1===n.indexOf("Mobile Safari")||-1!==n.indexOf("Chrome")||-1!==n.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history,a=!(-1===window.navigator.userAgent.indexOf("Trident")),i=t,o=i.forceRefresh,c=void 0!==o&&o,u=i.getUserConfirmation,s=void 0===u?E:u,f=i.keyLength,l=void 0===f?6:f,p=t.basename?j(O(t.basename)):"";function d(t){var n=t||{},e=n.key,r=n.state,a=window.location,i=a.pathname+a.search+a.hash;return p&&(i=k(i,p)),x(i,r,e)}function h(){return Math.random().toString(36).substr(2,l)}var v=P();function y(t){m(B,t),B.length=e.length,v.notifyListeners(B.location,B.action)}function g(t){(function(t){return void 0===t.state&&-1===navigator.userAgent.indexOf("CriOS")})(t)||L(d(t.state))}function b(){L(d(C()))}var M=!1;function L(t){if(M)M=!1,y();else{v.confirmTransitionTo(t,"POP",s,(function(n){n?y({action:"POP",location:t}):function(t){var n=B.location,e=N.indexOf(n.key);-1===e&&(e=0);var r=N.indexOf(t.key);-1===r&&(r=0);var a=e-r;a&&(M=!0,R(a))}(t)}))}}var T=d(C()),N=[T.key];function I(t){return p+S(t)}function R(t){e.go(t)}var U=0;function D(t){1===(U+=t)&&1===t?(window.addEventListener("popstate",g),a&&window.addEventListener("hashchange",b)):0===U&&(window.removeEventListener("popstate",g),a&&window.removeEventListener("hashchange",b))}var _=!1;var B={length:e.length,action:"POP",location:T,createHref:I,push:function(t,n){var a=x(t,n,h(),B.location);v.confirmTransitionTo(a,"PUSH",s,(function(t){if(t){var n=I(a),i=a.key,o=a.state;if(r)if(e.pushState({key:i,state:o},null,n),c)window.location.href=n;else{var u=N.indexOf(B.location.key),s=N.slice(0,u+1);s.push(a.key),N=s,y({action:"PUSH",location:a})}else window.location.href=n}}))},replace:function(t,n){var a=x(t,n,h(),B.location);v.confirmTransitionTo(a,"REPLACE",s,(function(t){if(t){var n=I(a),i=a.key,o=a.state;if(r)if(e.replaceState({key:i,state:o},null,n),c)window.location.replace(n);else{var u=N.indexOf(B.location.key);-1!==u&&(N[u]=a.key),y({action:"REPLACE",location:a})}else window.location.replace(n)}}))},go:R,goBack:function(){R(-1)},goForward:function(){R(1)},block:function(t){void 0===t&&(t=!1);var n=v.setPrompt(t);return _||(D(1),_=!0),function(){return _&&(_=!1,D(-1)),n()}},listen:function(t){var n=v.appendListener(t);return D(1),function(){D(-1),n()}}};return B}function L(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function T(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?L(Object(e),!0).forEach((function(n){N(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):L(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function N(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function I(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var e=[],r=!0,a=!1,i=void 0;try{for(var o,c=t[Symbol.iterator]();!(r=(o=c.next()).done)&&(e.push(o.value),!n||e.length!==n);r=!0);}catch(t){a=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(a)throw i}}return e}(t,n)||function(t,n){if(!t)return;if("string"==typeof t)return R(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return R(t,n)}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var U=a.a.createContext({});U.displayName="Machine";var D=function(){var t=Object(r.useContext)(U);return[{current:t.current,history:t.history,id:t.id,params:t.params},t.send]};function _(t){var n=t.children,e=t.history,i=t.id,u=t.path,s=e||M({basename:u}),l=I(Object(r.useMemo)((function(){var t,e=o(a.a.Children.toArray(n));if(0===e.length)throw new Error("<Machine/> has no children <State/> nodes! At least one is required to be considered a valid state machine.");return[e,(t=i,function t(n){var e=n.findIndex((function(t){return t.props.initial}));return e=e>=0?e:0,n.reduce((function(n,r,i){var u=r.props,s=u.children,l=u.id,p=u.path,d=void 0===p?"/":p,h=u.type,v=o(a.a.Children.toArray(s)),m=c(a.a.Children.toArray(s),"Transition").map((function(t){var n=t.props;return{cond:n.cond||null,event:n.event,sendId:l,target:n.target}}));return n.push({childStates:v.map((function(t){return t.props.id})),id:l,initial:e===i,path:d,stack:"."+l,transitions:m,type:"parallel"===h?"parallel":0===v.length?"atomic":v.length>1?"compound":"default"}),v.length&&t(v).forEach((function(t,e){return n.push({childStates:t.childStates,id:t.id,initial:t.initial,path:f(d)?t.path:f(t.path)?d:d+t.path,stack:"."+l+t.stack,transitions:t.transitions,type:t.type})})),n}),[])}(e).map((function(n){return n.stack="#"+t+n.stack,n})))]}),[n]),2),m=l[0],y=l[1],g=I(Object(r.useMemo)((function(){var t,n="#"+i+"."+(t=m,t.find((function(t){return t.props.initial}))||t[0]).props.id,e=h(s.location.pathname,y,i),r=e.params,a=(e.path,e.stack),o=e.url;return s.location.pathname!==o&&s.push(o),[a||n,r]}),[]),2),b=g[0],w=g[1],O=I(Object(r.useState)({current:b,event:null,params:w}),2),k=O[0],j=O[1];Object(r.useEffect)((function(){var t=k.current;k.event;return s.listen((function(n,e){var r=h(n.pathname,y,i),a=r.params,o=(r.path,r.stack);r.url;o!==t&&j({current:o,params:a})}))}),[k.current]);var S=T(T({},k),{},{history:s,id:i,resolvePath:function(t){var n=p(t,k.params);n!==s.location.pathname&&s.push(n,{stack:k.current})},send:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,e=v(t,k.current,y);if(e){var r=n&&n.params||k.params,a=(e.cond,e.event,e.target),i=y.find((function(t){return t.id===a}));if(i){var o=d(i.stack,y),c=o.path,u=o.stack;console.log("Machine Event Sent:",{event:t,data:n,targetId:a,path:c}),j({current:u,event:t,params:r})}else console.error('Invalid transition target: No target State Node of id "'.concat(a,'" exists. event ').concat(t," will be discarded."))}}});return a.a.createElement(U.Provider,{value:S},m)}_.displayName="Machine";var B=_,q=a.a.createContext({id:null,path:null,stack:null});function F(t){var n=t.children,e=t.component,i=t.id,c=(t.initial,t.onEntry,t.onExit,t.path),s=t.type,f=Object(r.useContext)(U),l=(f.event,f.current),p=f.history,d=f.id,h=f.params,v=f.resolvePath,m=f.send,y=Object(r.useContext)(q),g=(y.id,y.path),b=y.stack,w=b?"".concat(b,".").concat(i):"#".concat(d,".").concat(i),O=c?g?g+c:c:g,k=!!function(t,n){return!!n.split(".").find((function(n){return n===t}))}(i,l)&&{exact:u(i,l),params:h,path:O,url:p.location.pathname},j=Object(r.useMemo)((function(){var t=s,e=o(a.a.Children.toArray(n));return"parallel"!==t&&(t=e.length?e.length>1?"compound":"default":"atomic"),t}),[n]);Object(r.useEffect)((function(){k&&"atomic"===j&&"*"!==i&&v(O||"/")}),[l]);var S={id:i,path:O,stack:w,send:m},x={children:n,history:p,machine:{current:l,send:m},match:k};return k?a.a.createElement(q.Provider,{value:S},e?a.a.createElement(e,x):n):null}q.displayName="StateNode",F.displayName="State";var H=F;function W(t){var n,e,o=t.children,c=t.className,u=t.disabled,s=void 0!==u&&u,f=t.event,l=t.href,p=void 0===l?"#":l,d=t.onClick,h=t.replace,v=void 0!==h&&h,m=Object(r.useContext)(U).history,y=Object(r.useContext)(q).send;return a.a.createElement("a",{className:(n=[c,{"link-exact":p===m.location.pathname,"link-active":m.location.pathname.includes(p)&&!s,disabled:s}],e=n.map((function(t){switch(i(t)){case"string":return t;case"object":return Object.keys(t).filter((function(n){return Boolean(t[n])})).join(" ").trim();default:return null}})).join(" ").trim(),Boolean(e)?e:null),href:p,onClick:function(t){s?t.preventDefault():(f&&(t.preventDefault(),y(f)),v||f||(t.preventDefault(),m.push(p)),d&&d(t))}},o)}W.displayName="Link";var $=W,z=function(t){return null};z.displayName="Transition";var G=z}])}));
//# sourceMappingURL=index.js.map