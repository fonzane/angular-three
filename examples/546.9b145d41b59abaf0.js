"use strict";(self.webpackChunksandbox=self.webpackChunksandbox||[]).push([[546],{2089:(V,F,p)=>{p.d(F,{I:()=>c.I});var c=p(4552)},4552:(V,F,p)=>{p.d(F,{I:()=>r,U:()=>i});var c=p(7540),b=p(2046),E=p(3193);const R=["*"];let i=(()=>{class S extends c.Jy{objectInitFn(){return new b.ZAu}}return S.\u0275fac=function(){let w;return function(U){return(w||(w=E.n5z(S)))(U||S)}}(),S.\u0275cmp=E.Xpm({type:S,selectors:[["ngt-group"]],features:[E._Bn([(0,c.Q2)(S)]),E.qOj],ngContentSelectors:R,decls:1,vars:0,template:function(k,U){1&k&&(E.F$t(),E.Hsn(0))},encapsulation:2,changeDetection:0}),S})(),r=(()=>{class S{}return S.\u0275fac=function(k){return new(k||S)},S.\u0275mod=E.oAB({type:S}),S.\u0275inj=E.cJS({}),S})()},1546:(V,F,p)=>{p.d(F,{Li:()=>c.L});var c=p(8220);p(7540),p(2089),p(4552),p(9049)},8220:(V,F,p)=>{p.d(F,{S:()=>oe,L:()=>Q});var c=p(7540),b=p(3193),E=p(2310),R=p(6742),i=p(1137),r=p(2046);const S=(v,P)=>(v%P+P)%P;class w extends r.pBf{constructor(P,n){super(),(0,i.Z)(this,"object",void 0),(0,i.Z)(this,"domElement",void 0),(0,i.Z)(this,"enabled",!0),(0,i.Z)(this,"target",new r.Pa4),(0,i.Z)(this,"minDistance",0),(0,i.Z)(this,"maxDistance",1/0),(0,i.Z)(this,"minZoom",0),(0,i.Z)(this,"maxZoom",1/0),(0,i.Z)(this,"minPolarAngle",0),(0,i.Z)(this,"maxPolarAngle",Math.PI),(0,i.Z)(this,"minAzimuthAngle",-1/0),(0,i.Z)(this,"maxAzimuthAngle",1/0),(0,i.Z)(this,"enableDamping",!1),(0,i.Z)(this,"dampingFactor",.05),(0,i.Z)(this,"enableZoom",!0),(0,i.Z)(this,"zoomSpeed",1),(0,i.Z)(this,"enableRotate",!0),(0,i.Z)(this,"rotateSpeed",1),(0,i.Z)(this,"enablePan",!0),(0,i.Z)(this,"panSpeed",1),(0,i.Z)(this,"screenSpacePanning",!0),(0,i.Z)(this,"keyPanSpeed",7),(0,i.Z)(this,"autoRotate",!1),(0,i.Z)(this,"autoRotateSpeed",2),(0,i.Z)(this,"reverseOrbit",!1),(0,i.Z)(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),(0,i.Z)(this,"mouseButtons",{LEFT:r.RsA.ROTATE,MIDDLE:r.RsA.DOLLY,RIGHT:r.RsA.PAN}),(0,i.Z)(this,"touches",{ONE:r.QmN.ROTATE,TWO:r.QmN.DOLLY_PAN}),(0,i.Z)(this,"target0",void 0),(0,i.Z)(this,"position0",void 0),(0,i.Z)(this,"zoom0",void 0),(0,i.Z)(this,"_domElementKeyEvents",null),(0,i.Z)(this,"getPolarAngle",void 0),(0,i.Z)(this,"getAzimuthalAngle",void 0),(0,i.Z)(this,"setPolarAngle",void 0),(0,i.Z)(this,"setAzimuthalAngle",void 0),(0,i.Z)(this,"getDistance",void 0),(0,i.Z)(this,"listenToKeyEvents",void 0),(0,i.Z)(this,"saveState",void 0),(0,i.Z)(this,"reset",void 0),(0,i.Z)(this,"update",void 0),(0,i.Z)(this,"connect",void 0),(0,i.Z)(this,"dispose",void 0),this.object=P,this.domElement=n,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object instanceof r.cPb?this.object.zoom:1,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=t=>{let s=S(t,2*Math.PI),l=u.phi;l<0&&(l+=2*Math.PI),s<0&&(s+=2*Math.PI);let h=Math.abs(s-l);2*Math.PI-h<h&&(s<l?s+=2*Math.PI:l+=2*Math.PI),f.phi=s-l,e.update()},this.setAzimuthalAngle=t=>{let s=S(t,2*Math.PI),l=u.theta;l<0&&(l+=2*Math.PI),s<0&&(s+=2*Math.PI);let h=Math.abs(s-l);2*Math.PI-h<h&&(s<l?s+=2*Math.PI:l+=2*Math.PI),f.theta=s-l,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ve),this._domElementKeyEvents=t},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object instanceof r.cPb?e.object.zoom:1},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object instanceof r.cPb&&(e.object.zoom=e.zoom0,e.object.updateProjectionMatrix()),e.dispatchEvent(N),e.update(),a=o.NONE},this.update=(()=>{const t=new r.Pa4,s=(new r._fP).setFromUnitVectors(P.up,new r.Pa4(0,1,0)),l=s.clone().invert(),h=new r.Pa4,y=new r._fP,T=2*Math.PI;return function(){const Ee=e.object.position;t.copy(Ee).sub(e.target),t.applyQuaternion(s),u.setFromVector3(t),e.autoRotate&&a===o.NONE&&$(function Ce(){return 2*Math.PI/60/60*e.autoRotateSpeed}()),e.enableDamping?(u.theta+=f.theta*e.dampingFactor,u.phi+=f.phi*e.dampingFactor):(u.theta+=f.theta,u.phi+=f.phi);let D=e.minAzimuthAngle,A=e.maxAzimuthAngle;return isFinite(D)&&isFinite(A)&&(D<-Math.PI?D+=T:D>Math.PI&&(D-=T),A<-Math.PI?A+=T:A>Math.PI&&(A-=T),u.theta=D<=A?Math.max(D,Math.min(A,u.theta)):u.theta>(D+A)/2?Math.max(D,u.theta):Math.min(A,u.theta)),u.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,u.phi)),u.makeSafe(),u.radius*=M,u.radius=Math.max(e.minDistance,Math.min(e.maxDistance,u.radius)),!0===e.enableDamping?e.target.addScaledVector(_,e.dampingFactor):e.target.add(_),t.setFromSpherical(u),t.applyQuaternion(l),Ee.copy(e.target).add(t),e.object.lookAt(e.target),!0===e.enableDamping?(f.theta*=1-e.dampingFactor,f.phi*=1-e.dampingFactor,_.multiplyScalar(1-e.dampingFactor)):(f.set(0,0,0),_.set(0,0,0)),M=1,!!(H||h.distanceToSquared(e.object.position)>C||8*(1-y.dot(e.object.quaternion))>C)&&(e.dispatchEvent(N),h.copy(e.object.position),y.copy(e.object.quaternion),H=!1,!0)}})(),this.connect=t=>{t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Se),e.domElement.addEventListener("pointerdown",ge),e.domElement.addEventListener("pointercancel",fe),e.domElement.addEventListener("wheel",be)},this.dispose=()=>{var t,s,l,h,y,T;null===(t=e.domElement)||void 0===t||t.removeEventListener("contextmenu",Se),null===(s=e.domElement)||void 0===s||s.removeEventListener("pointerdown",ge),null===(l=e.domElement)||void 0===l||l.removeEventListener("pointercancel",fe),null===(h=e.domElement)||void 0===h||h.removeEventListener("wheel",be),null===(y=e.domElement)||void 0===y||y.ownerDocument.removeEventListener("pointermove",q),null===(T=e.domElement)||void 0===T||T.ownerDocument.removeEventListener("pointerup",ee),null!==e._domElementKeyEvents&&e._domElementKeyEvents.removeEventListener("keydown",ve)};const e=this,N={type:"change"},g={type:"start"},d={type:"end"},o={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=o.NONE;const C=1e-6,u=new r.$V,f=new r.$V;let M=1;const _=new r.Pa4;let H=!1;const j=new r.FM8,O=new r.FM8,L=new r.FM8,x=new r.FM8,I=new r.FM8,Z=new r.FM8,z=new r.FM8,B=new r.FM8,X=new r.FM8,m=[],G={};function K(){return Math.pow(.95,e.zoomSpeed)}function $(t){e.reverseOrbit?f.theta+=t:f.theta-=t}function ne(t){e.reverseOrbit?f.phi+=t:f.phi-=t}const se=(()=>{const t=new r.Pa4;return function(l,h){t.setFromMatrixColumn(h,0),t.multiplyScalar(-l),_.add(t)}})(),ae=(()=>{const t=new r.Pa4;return function(l,h){!0===e.screenSpacePanning?t.setFromMatrixColumn(h,1):(t.setFromMatrixColumn(h,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(l),_.add(t)}})(),Y=(()=>{const t=new r.Pa4;return function(l,h){const y=e.domElement;if(y&&e.object instanceof r.cPb&&e.object.isPerspectiveCamera){t.copy(e.object.position).sub(e.target);let W=t.length();W*=Math.tan(e.object.fov/2*Math.PI/180),se(2*l*W/y.clientHeight,e.object.matrix),ae(2*h*W/y.clientHeight,e.object.matrix)}else y&&e.object instanceof r.iKG&&e.object.isOrthographicCamera?(se(l*(e.object.right-e.object.left)/e.object.zoom/y.clientWidth,e.object.matrix),ae(h*(e.object.top-e.object.bottom)/e.object.zoom/y.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function J(t){e.object instanceof r.cPb&&e.object.isPerspectiveCamera?M/=t:e.object instanceof r.iKG&&e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),H=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function re(t){e.object instanceof r.cPb&&e.object.isPerspectiveCamera?M*=t:e.object instanceof r.iKG&&e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),H=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ie(t){j.set(t.clientX,t.clientY)}function le(t){x.set(t.clientX,t.clientY)}function ce(){1==m.length?j.set(m[0].pageX,m[0].pageY):j.set(.5*(m[0].pageX+m[1].pageX),.5*(m[0].pageY+m[1].pageY))}function ue(){1==m.length?x.set(m[0].pageX,m[0].pageY):x.set(.5*(m[0].pageX+m[1].pageX),.5*(m[0].pageY+m[1].pageY))}function de(){const t=m[0].pageX-m[1].pageX,s=m[0].pageY-m[1].pageY,l=Math.sqrt(t*t+s*s);z.set(0,l)}function he(t){if(1==m.length)O.set(t.pageX,t.pageY);else{const l=te(t);O.set(.5*(t.pageX+l.x),.5*(t.pageY+l.y))}L.subVectors(O,j).multiplyScalar(e.rotateSpeed);const s=e.domElement;s&&($(2*Math.PI*L.x/s.clientHeight),ne(2*Math.PI*L.y/s.clientHeight)),j.copy(O)}function me(t){if(1==m.length)I.set(t.pageX,t.pageY);else{const s=te(t);I.set(.5*(t.pageX+s.x),.5*(t.pageY+s.y))}Z.subVectors(I,x).multiplyScalar(e.panSpeed),Y(Z.x,Z.y),x.copy(I)}function pe(t){const s=te(t),l=t.pageX-s.x,h=t.pageY-s.y,y=Math.sqrt(l*l+h*h);B.set(0,y),X.set(0,Math.pow(B.y/z.y,e.zoomSpeed)),J(X.y),z.copy(B)}function ge(t){var s,l;!1!==e.enabled&&(0===m.length&&(null===(s=e.domElement)||void 0===s||s.ownerDocument.addEventListener("pointermove",q),null===(l=e.domElement)||void 0===l||l.ownerDocument.addEventListener("pointerup",ee)),function ke(t){m.push(t)}(t),"touch"===t.pointerType?function Re(t){switch(Pe(t),m.length){case 1:switch(e.touches.ONE){case r.QmN.ROTATE:if(!1===e.enableRotate)return;ce(),a=o.TOUCH_ROTATE;break;case r.QmN.PAN:if(!1===e.enablePan)return;ue(),a=o.TOUCH_PAN;break;default:a=o.NONE}break;case 2:switch(e.touches.TWO){case r.QmN.DOLLY_PAN:if(!1===e.enableZoom&&!1===e.enablePan)return;(function we(){e.enableZoom&&de(),e.enablePan&&ue()})(),a=o.TOUCH_DOLLY_PAN;break;case r.QmN.DOLLY_ROTATE:if(!1===e.enableZoom&&!1===e.enableRotate)return;(function De(){e.enableZoom&&de(),e.enableRotate&&ce()})(),a=o.TOUCH_DOLLY_ROTATE;break;default:a=o.NONE}break;default:a=o.NONE}a!==o.NONE&&e.dispatchEvent(g)}(t):function xe(t){let s;switch(t.button){case 0:s=e.mouseButtons.LEFT;break;case 1:s=e.mouseButtons.MIDDLE;break;case 2:s=e.mouseButtons.RIGHT;break;default:s=-1}switch(s){case r.RsA.DOLLY:if(!1===e.enableZoom)return;(function Ne(t){z.set(t.clientX,t.clientY)})(t),a=o.DOLLY;break;case r.RsA.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===e.enablePan)return;le(t),a=o.PAN}else{if(!1===e.enableRotate)return;ie(t),a=o.ROTATE}break;case r.RsA.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(!1===e.enableRotate)return;ie(t),a=o.ROTATE}else{if(!1===e.enablePan)return;le(t),a=o.PAN}break;default:a=o.NONE}a!==o.NONE&&e.dispatchEvent(g)}(t))}function q(t){!1!==e.enabled&&("touch"===t.pointerType?function Le(t){switch(Pe(t),a){case o.TOUCH_ROTATE:if(!1===e.enableRotate)return;he(t),e.update();break;case o.TOUCH_PAN:if(!1===e.enablePan)return;me(t),e.update();break;case o.TOUCH_DOLLY_PAN:if(!1===e.enableZoom&&!1===e.enablePan)return;(function Ae(t){e.enableZoom&&pe(t),e.enablePan&&me(t)})(t),e.update();break;case o.TOUCH_DOLLY_ROTATE:if(!1===e.enableZoom&&!1===e.enableRotate)return;(function je(t){e.enableZoom&&pe(t),e.enableRotate&&he(t)})(t),e.update();break;default:a=o.NONE}}(t):function Ie(t){if(!1!==e.enabled)switch(a){case o.ROTATE:if(!1===e.enableRotate)return;!function Me(t){O.set(t.clientX,t.clientY),L.subVectors(O,j).multiplyScalar(e.rotateSpeed);const s=e.domElement;s&&($(2*Math.PI*L.x/s.clientHeight),ne(2*Math.PI*L.y/s.clientHeight)),j.copy(O),e.update()}(t);break;case o.DOLLY:if(!1===e.enableZoom)return;!function _e(t){B.set(t.clientX,t.clientY),X.subVectors(B,z),X.y>0?J(K()):X.y<0&&re(K()),z.copy(B),e.update()}(t);break;case o.PAN:if(!1===e.enablePan)return;!function Oe(t){I.set(t.clientX,t.clientY),Z.subVectors(I,x).multiplyScalar(e.panSpeed),Y(Z.x,Z.y),x.copy(I),e.update()}(t)}}(t))}function ee(t){var s,l,h;ye(t),0===m.length&&(null===(s=e.domElement)||void 0===s||s.releasePointerCapture(t.pointerId),null===(l=e.domElement)||void 0===l||l.ownerDocument.removeEventListener("pointermove",q),null===(h=e.domElement)||void 0===h||h.ownerDocument.removeEventListener("pointerup",ee)),e.dispatchEvent(d),a=o.NONE}function fe(t){ye(t)}function be(t){!1===e.enabled||!1===e.enableZoom||a!==o.NONE&&a!==o.ROTATE||(t.preventDefault(),e.dispatchEvent(g),function Te(t){t.deltaY<0?re(K()):t.deltaY>0&&J(K()),e.update()}(t),e.dispatchEvent(d))}function ve(t){!1===e.enabled||!1===e.enablePan||function Fe(t){let s=!1;switch(t.code){case e.keys.UP:Y(0,e.keyPanSpeed),s=!0;break;case e.keys.BOTTOM:Y(0,-e.keyPanSpeed),s=!0;break;case e.keys.LEFT:Y(e.keyPanSpeed,0),s=!0;break;case e.keys.RIGHT:Y(-e.keyPanSpeed,0),s=!0}s&&(t.preventDefault(),e.update())}(t)}function Se(t){!1!==e.enabled&&t.preventDefault()}function ye(t){delete G[t.pointerId];for(let s=0;s<m.length;s++)if(m[s].pointerId==t.pointerId)return void m.splice(s,1)}function Pe(t){let s=G[t.pointerId];void 0===s&&(s=new r.FM8,G[t.pointerId]=s),s.set(t.pageX,t.pageY)}function te(t){return G[(t.pointerId===m[0].pointerId?m[1]:m[0]).pointerId]}void 0!==n&&this.connect(n),this.update()}}const U=["*"];let oe=(()=>{class v extends c.WZ{constructor(){super(...arguments),this.change=new b.vpe,this.start=new b.vpe,this.end=new b.vpe,this.init=this.effect((0,E.b)(()=>{const n=this.get(e=>e.camera);n&&this.prepareInstance(new w(n))})),this.setBeforeRender=this.effect((0,c.oe)(()=>this.store.registerBeforeRender({priority:-1,callback:()=>{this.instance.value.enabled&&this.instance.value.update()}}))),this.connectDomElement=this.effect((0,c.oe)(()=>{const n=this.get(e=>e.domElement)||this.store.get(e=>e.events.connected)||this.store.get(e=>e.gl.domElement);return this.instance.value.connect(n),()=>{this.instance.value.dispose()}})),this.setEvents=this.effect((0,c.oe)(()=>{const{invalidate:n,performance:e}=this.store.get(),N=this.get(a=>a.regress),g=a=>{n(),N&&e.regress(),this.change.observed&&this.change.emit(a)};let d,o;return this.instance.value.addEventListener("change",g),this.start.observed&&(d=a=>{this.start.emit(a)},this.instance.value.addEventListener("start",d)),this.end.observed&&(o=a=>{this.end.emit(a)},this.instance.value.addEventListener("end",o)),()=>{this.instance.value.removeEventListener("change",g),o&&this.instance.value.removeEventListener("end",o),d&&this.instance.value.removeEventListener("start",d)}})),this.setDefaultControls=this.effect((0,c.oe)(()=>{if(this.get(e=>e.makeDefault)){const e=this.store.get(N=>N.controls);return this.store.set({controls:this.instance.value}),()=>{this.store.set({controls:e})}}}))}set enabled(n){this.set({enabled:(0,c.Ig)(n)})}set camera(n){this.set({camera:n})}set domElement(n){this.set({domElement:n})}set makeDefault(n){this.set({makeDefault:(0,c.Ig)(n)})}set regress(n){this.set({regress:(0,c.Ig)(n)})}set target(n){this.set({target:n})}set enableDamping(n){this.set({enableDamping:(0,c.Ig)(n)})}set minDistance(n){this.set({minDistance:(0,c.su)(n)})}set maxDistance(n){this.set({maxDistance:(0,c.su)(n)})}set minZoom(n){this.set({minZoom:(0,c.su)(n)})}set maxZoom(n){this.set({maxZoom:(0,c.su)(n)})}set minPolarAngle(n){this.set({minPolarAngle:(0,c.su)(n)})}set maxPolarAngle(n){this.set({maxPolarAngle:(0,c.su)(n)})}set minAzimuthAngle(n){this.set({minAzimuthAngle:(0,c.su)(n)})}set maxAzimuthAngle(n){this.set({maxAzimuthAngle:(0,c.su)(n)})}set dampingFactor(n){this.set({dampingFactor:(0,c.su)(n)})}set enableZoom(n){this.set({enableZoom:(0,c.Ig)(n)})}set zoomSpeed(n){this.set({zoomSpeed:(0,c.su)(n)})}set enableRotate(n){this.set({enableRotate:(0,c.Ig)(n)})}set rotateSpeed(n){this.set({rotateSpeed:(0,c.su)(n)})}set enablePan(n){this.set({enablePan:(0,c.Ig)(n)})}set panSpeed(n){this.set({panSpeed:(0,c.su)(n)})}set screenSpacePanning(n){this.set({screenSpacePanning:(0,c.Ig)(n)})}set keyPanSpeed(n){this.set({keyPanSpeed:(0,c.su)(n)})}set autoRotate(n){this.set({autoRotate:(0,c.Ig)(n)})}set autoRotateSpeed(n){this.set({autoRotateSpeed:(0,c.su)(n)})}set reverseOrbit(n){this.set({reverseOrbit:(0,c.Ig)(n)})}set keys(n){this.set({keys:n})}set mouseButtons(n){this.set({mouseButtons:n})}set touches(n){this.set({touches:n})}preInit(){this.set(n=>{var e,N,g,d;return{enabled:null===(e=n.enabled)||void 0===e||e,enableDamping:null===(N=n.enableDamping)||void 0===N||N,domElement:null!==(d=null!==(g=n.domElement)&&void 0!==g?g:this.store.get(o=>o.events.connected))&&void 0!==d?d:this.store.get(o=>o.gl.domElement)}})}ngOnInit(){super.ngOnInit(),this.zone.runOutsideAngular(()=>{this.onCanvasReady(this.store.ready$,()=>{this.get(n=>n.camera)||this.set(this.store.select(n=>n.camera).pipe((0,R.U)(n=>({camera:n})))),this.init(this.select(n=>n.camera)),this.setBeforeRender(),this.connectDomElement(this.select(this.instance$,this.select(n=>n.domElement))),this.setEvents(this.instance$),this.setDefaultControls(this.select(this.instance$,this.select(n=>n.makeDefault)))})})}get optionFields(){return Object.assign(Object.assign({},super.optionFields),{enabled:!1,target:!0,enableDamping:!1,minDistance:!0,maxDistance:!0,minZoom:!0,maxZoom:!0,minPolarAngle:!0,maxPolarAngle:!0,minAzimuthAngle:!0,maxAzimuthAngle:!0,dampingFactor:!0,enableZoom:!0,zoomSpeed:!0,enableRotate:!0,rotateSpeed:!0,enablePan:!0,panSpeed:!0,screenSpacePanning:!0,keyPanSpeed:!0,autoRotate:!0,autoRotateSpeed:!0,reverseOrbit:!0,keys:!0,mouseButtons:!0,touches:!0})}}return v.\u0275fac=function(){let P;return function(e){return(P||(P=b.n5z(v)))(e||v)}}(),v.\u0275cmp=b.Xpm({type:v,selectors:[["ngt-soba-orbit-controls"]],inputs:{enabled:"enabled",camera:"camera",domElement:"domElement",makeDefault:"makeDefault",regress:"regress",target:"target",enableDamping:"enableDamping",minDistance:"minDistance",maxDistance:"maxDistance",minZoom:"minZoom",maxZoom:"maxZoom",minPolarAngle:"minPolarAngle",maxPolarAngle:"maxPolarAngle",minAzimuthAngle:"minAzimuthAngle",maxAzimuthAngle:"maxAzimuthAngle",dampingFactor:"dampingFactor",enableZoom:"enableZoom",zoomSpeed:"zoomSpeed",enableRotate:"enableRotate",rotateSpeed:"rotateSpeed",enablePan:"enablePan",panSpeed:"panSpeed",screenSpacePanning:"screenSpacePanning",keyPanSpeed:"keyPanSpeed",autoRotate:"autoRotate",autoRotateSpeed:"autoRotateSpeed",reverseOrbit:"reverseOrbit",keys:"keys",mouseButtons:"mouseButtons",touches:"touches"},outputs:{change:"change",start:"start",end:"end"},features:[b._Bn([(0,c.UV)(v)]),b.qOj],ngContentSelectors:U,decls:1,vars:0,template:function(n,e){1&n&&(b.F$t(),b.Hsn(0))},encapsulation:2,changeDetection:0}),v})(),Q=(()=>{class v{}return v.\u0275fac=function(n){return new(n||v)},v.\u0275mod=b.oAB({type:v}),v.\u0275inj=b.cJS({}),v})()},1137:(V,F,p)=>{function c(b,E,R){return E in b?Object.defineProperty(b,E,{value:R,enumerable:!0,configurable:!0,writable:!0}):b[E]=R,b}p.d(F,{Z:()=>c})}}]);