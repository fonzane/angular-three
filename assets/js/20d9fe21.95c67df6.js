"use strict";(self.webpackChunklibs_documentations=self.webpackChunklibs_documentations||[]).push([[821],{9613:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return d}});var r=t(9496);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),g=l(t),d=a,m=g["".concat(p,".").concat(d)]||g[d]||s[d]||i;return t?r.createElement(m,o(o({ref:n},u),{},{components:t})):r.createElement(m,o({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=g;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=t[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},9515:function(e,n,t){t.r(n),t.d(n,{assets:function(){return u},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return s}});var r=t(2848),a=t(9213),i=(t(9496),t(9613)),o=["components"],c={id:"spring",title:"Spring",sidebar_label:"Spring"},p=void 0,l={unversionedId:"cannon/spring",id:"cannon/spring",title:"Spring",description:"To interact with Cannon Spring API, we use NgtPhysicSpring from @angular-three/core",source:"@site/docs/cannon/spring.mdx",sourceDirName:"cannon",slug:"/cannon/spring",permalink:"/docs/cannon/spring",editUrl:"https://github.com/nartc/angular-three/tree/main/libs/documentations/docs/docs/cannon/spring.mdx",tags:[],version:"current",frontMatter:{id:"spring",title:"Spring",sidebar_label:"Spring"},sidebar:"docs",previous:{title:"Constraint",permalink:"/docs/cannon/constraint"},next:{title:"Ray",permalink:"/docs/cannon/ray"}},u={},s=[{value:"Spring Creator",id:"spring-creator",level:2}],g={toc:s};function d(e){var n=e.components,t=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"To interact with ",(0,i.kt)("a",{parentName:"p",href:"https://pmndrs.github.io/cannon-es/docs/classes/Spring.html"},"Cannon Spring API"),", we use ",(0,i.kt)("inlineCode",{parentName:"p"},"NgtPhysicSpring")," from ",(0,i.kt)("inlineCode",{parentName:"p"},"@angular-three/core")),(0,i.kt)("h2",{id:"spring-creator"},"Spring Creator"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"name"),(0,i.kt)("th",{parentName:"tr",align:null},"description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"useSpring"),(0,i.kt)("td",{parentName:"tr",align:null},"A spring, connecting two bodies.")))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"useSpring")," returns a ",(0,i.kt)("inlineCode",{parentName:"p"},"NgtPhysicSpringReturn")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"export interface NgtPhysicSpringReturn {\n  bodyA: Ref<THREE.Object3D>;\n  bodyB: Ref<THREE.Object3D>;\n  api: NgtPhysicSpringApi;\n}\n")))}d.isMDXComponent=!0}}]);