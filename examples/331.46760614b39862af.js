"use strict";(self.webpackChunksandbox=self.webpackChunksandbox||[]).push([[331],{766:(h,l,e)=>{e.r(l),e.d(l,{ClumpComponent:()=>R,ObjectClumpComponent:()=>C,ObjectClumpComponentModule:()=>k,PointerDirective:()=>P});var a=e(9255),c=e(7540),s=e(221),p=e(4761),g=e(7322),M=e(8255),r=e(991),u=e(4478),m=e(9570),E=e(9436),D=e(6698),f=e(4476),A=e(1307),y=e(3741),d=e(2046),t=e(3193),T=e(4349),U=e(132),b=e(2164),I=e(4433),L=e(54),K=e(1188),W=e(1785),O=e(5751),Z=e(4752),x=e(7426),j=e(1644),N=e(4986),F=e(8181);function S(n,i){1&n&&t._UZ(0,"ngt-bloom-effect")}const J=function(){return[1,2]},G=function(){return[0,0,20]},Q=function(n){return{position:n,fov:35,near:1,far:40}},Y=function(){return[30,30,30]},z=function(){return["shadow","mapSize"]},$=function(){return[512,512]},X=function(n,i,o){return[n,i,o]},H=function(){return[0,2,0]},V=function(){return[1,32,32]};let C=(()=>{class n{constructor(){this.kernelSize=y.DD.VERY_LARGE}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["sandbox-object-clump"]],decls:12,vars:19,consts:[["shadows","","initialLog","",3,"dpr","camera"],["intensity","0.25"],["intensity","1","angle","0.2","penumbra","1","castShadow","",3,"position"],[3,"attach","vector2"],["intensity","5","color","purple",3,"position"],["iterations","10",3,"gravity"],["files","assets/adamsbridge.hdr"],["ngt-effect-composer-content",""]],template:function(o,_){1&o&&(t.TgZ(0,"ngt-canvas",0),t._UZ(1,"ngt-ambient-light",1),t.TgZ(2,"ngt-spot-light",2),t._UZ(3,"ngt-vector2",3),t.qZA(),t._UZ(4,"ngt-directional-light",4),t.TgZ(5,"ngt-physics",5),t._UZ(6,"sandbox-pointer")(7,"sandbox-clump"),t.qZA(),t._UZ(8,"ngt-soba-environment",6),t.TgZ(9,"ngt-effect-composer"),t.YNc(10,S,1,0,"ng-template",7),t.qZA(),t._UZ(11,"ngt-soba-sky"),t.qZA()),2&o&&(t.Q6J("dpr",t.DdM(7,J))("camera",t.VKq(9,Q,t.DdM(8,G))),t.xp6(2),t.Q6J("position",t.DdM(11,Y)),t.xp6(1),t.Q6J("attach",t.DdM(12,z))("vector2",t.DdM(13,$)),t.xp6(1),t.Q6J("position",t.kEZ(14,X,-10,-10,-10)),t.xp6(1),t.Q6J("gravity",t.DdM(18,H)))},directives:function(){return[T.B3,U.w,b.K,I.M,L.Y,K.r,P,R,W.$5,O.dM,O.sY,Z.$,x.fH]},encapsulation:2,changeDetection:0}),n})(),P=(()=>{class n extends c.gU{constructor(o,_,B){super(),this.physicBody=o,this.store=_,this.zone=B,this.pointerRef=this.physicBody.useSphere(()=>({type:"Kinematic",args:[3],position:[0,0,0]}),!1)}ngOnInit(){this.zone.runOutsideAngular(()=>{this.onCanvasReady(this.store.ready$,()=>this.store.registerBeforeRender({callback:({pointer:o,viewport:_})=>{this.pointerRef.api.position.set(o.x*_.width/2,o.y*_.height/2,0)}}),!0)})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(a.CN),t.Y36(c.W7),t.Y36(t.R0b))},n.\u0275dir=t.lG2({type:n,selectors:[["sandbox-pointer"]],features:[t._Bn([a.CN]),t.qOj]}),n})();const v=new d.yGw,w=new d.Pa4;let R=(()=>{class n{constructor(o,_){this.textureLoader=o,this.physicBody=_,this.count=40,this.texture$=this.textureLoader.load("assets/cross.jpg"),this.sphereRef=this.physicBody.useSphere(()=>({args:[1],mass:1,angularDamping:.1,linearDamping:.65,position:[d.M8C.randFloatSpread(20),d.M8C.randFloatSpread(20),d.M8C.randFloatSpread(20)]}))}onBeforeRender(o){for(let _=0;_<this.count;_++)o.object.getMatrixAt(_,v),this.sphereRef.api.at(_).applyForce(w.setFromMatrixPosition(v).normalize().multiplyScalar(-50).toArray(),[0,0,0])}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(E.Wt),t.Y36(a.CN))},n.\u0275cmp=t.Xpm({type:n,selectors:[["sandbox-clump"]],features:[t._Bn([E.Wt,a.CN])],decls:4,vars:7,consts:[["castShadow","","receiveShadow","",3,"ref","count","beforeRender"],[3,"args"],["color","red","roughness","0","envMapIntensity","0.2","emissive","#370037",3,"map"]],template:function(o,_){1&o&&(t.TgZ(0,"ngt-instanced-mesh",0),t.NdJ("beforeRender",function(q){return _.onBeforeRender(q)}),t._UZ(1,"ngt-sphere-geometry",1)(2,"ngt-mesh-standard-material",2),t.ALo(3,"async"),t.qZA()),2&o&&(t.Q6J("ref",_.sphereRef.ref)("count",_.count),t.xp6(1),t.Q6J("args",t.DdM(6,V)),t.xp6(1),t.Q6J("map",t.lcZ(3,4,_.texture$)))},directives:[j.f,N.o,F.h],pipes:[f.Ov],encapsulation:2,changeDetection:0}),n})(),k=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[f.ez,A.Bz.forChild([{path:"",component:C}]),u.km,r.R,p.fV,M.To,c.DX,g.EQ,g.Hk,s.fN,g.in,a.M1,D.wj,D.vc,m.Rn,s.pk,a.B$]]}),n})()},2089:(h,l,e)=>{e.d(l,{I:()=>a.I});var a=e(4552)},4552:(h,l,e)=>{e.d(l,{I:()=>M,U:()=>g});var a=e(7540),c=e(2046),s=e(3193);const p=["*"];let g=(()=>{class r extends a.Jy{objectInitFn(){return new c.ZAu}}return r.\u0275fac=function(){let u;return function(E){return(u||(u=s.n5z(r)))(E||r)}}(),r.\u0275cmp=s.Xpm({type:r,selectors:[["ngt-group"]],features:[s._Bn([(0,a.Q2)(r)]),s.qOj],ngContentSelectors:p,decls:1,vars:0,template:function(m,E){1&m&&(s.F$t(),s.Hsn(0))},encapsulation:2,changeDetection:0}),r})(),M=(()=>{class r{}return r.\u0275fac=function(m){return new(m||r)},r.\u0275mod=s.oAB({type:r}),r.\u0275inj=s.cJS({}),r})()},1137:(h,l,e)=>{function a(c,s,p){return s in c?Object.defineProperty(c,s,{value:p,enumerable:!0,configurable:!0,writable:!0}):c[s]=p,c}e.d(l,{Z:()=>a})}}]);