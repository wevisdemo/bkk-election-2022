var ot=Object.defineProperty,it=Object.defineProperties;var nt=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var at=Object.prototype.hasOwnProperty,rt=Object.prototype.propertyIsEnumerable;var N=(c,i,r)=>i in c?ot(c,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):c[i]=r,T=(c,i)=>{for(var r in i||(i={}))at.call(i,r)&&N(c,r,i[r]);if(G)for(var r of G(i))rt.call(i,r)&&N(c,r,i[r]);return c},v=(c,i)=>it(c,nt(i));import{L as lt,O as st,T as ct,d as dt,A as ut,V as pt,W as S,a as _,M as j,S as z,b as ht,c as gt,C as ft}from"./MapHelper.0d5fd692.js";import{F as wt,p as mt,h as F,m as C,j as H,a as Et,_ as bt,y as k,b as Tt,D as vt}from"./index.8d9b596a.js";import{D as xt}from"./DistrictTooltip.8f617d62.js";lt.registerPlugin(st);const Wt=({onDistrictClick:c})=>{const i=wt(mt),r=F(null),w=F(null),[L,K]=C(),[x,Y]=C(),[I,q]=C(!1),M=F(0),[m,D]=C({show:!1,district:void 0,left:"unset",top:"unset",bottom:"unset",pointUp:!0,anchorRight:!1});if(!i)return H(Et,{});const{electionData:J,candidateMap:P}=i,[A,X]=C([]);let O=5e4;const V=e=>{let t=P[e];return t?t.color:vt},Z=new ct({fontFamily:"Anuphan",fontSize:20,fontStyle:"normal",fontWeight:"600",fill:"#ffffff",stroke:"#000000",strokeThickness:6,lineJoin:"round",textBaseline:"bottom"}),Q=(e,t)=>{e.on("pointerdown",p=>{M.current=Date.now()}),e.on("pointerup",p=>{Date.now()-M.current<ft&&t()})},$=(e,t)=>{if(A.length>0){tt(t);const p=e.loader.resources.stripe.animation,a=100,d=20,y=23;A.forEach(u=>{const{coordinate:n,district:l,ratio:E,districtCandidateVoteRatio:h}=u,s=Math.sqrt(a*a*E),b=n.col*a+a*.5-s*.5+n.col*d;let g=n.row*a+a*.5-s*.5+n.row*d;g+=y;const o=new z;o.beginFill(4473924),o.drawRect(b,g,s,s),o.endFill(),o.interactive=!0,o.buttonMode=!0,Q(o,()=>c==null?void 0:c(l)),o.on("pointerover",f=>{o.tint=6710886,D(R=>v(T({},R),{district:l,show:!0}))}),o.on("pointerout",f=>{o.tint=16777215,D(R=>v(T({},R),{show:!1}))});let B=0;if(h.forEach(({percentage:f,color:R},et)=>{if(et>j-1)return;const U=s*f/100;o.lineStyle(1,0,1),o.beginFill(+R.replace("#","0x"),1,!0),o.drawRect(b,g+B,s,U),o.endFill(),B+=U}),typeof l.voting.progress!="undefined"&&l.voting.progress<100){const f=o.getBounds();o.beginTextureFill({alpha:.2,texture:p==null?void 0:p.texture,matrix:new ht(f.width/30,0,0,f.height/30,f.x,f.y)}),o.drawRect(b,g,s,s),o.endFill()}t.addChild(o);const W=new gt(l.name==="\u0E1B\u0E49\u0E2D\u0E21\u0E1B\u0E23\u0E32\u0E1A\u0E28\u0E31\u0E15\u0E23\u0E39\u0E1E\u0E48\u0E32\u0E22"?"\u0E1B\u0E49\u0E2D\u0E21\u0E1B\u0E23\u0E32\u0E1A\u0E2F":l.name,Z);W.x=b+s*.5,W.y=g-10,W.anchor.set(.5),t.addChild(W)})}},tt=e=>{const t=new z;t.lineStyle(50,16777215,.3),t.moveTo(530,0),t.lineTo(530,170),t.lineTo(410,170),t.lineTo(410,530),t.lineTo(530,530),t.lineTo(530,770),t.lineTo(770,770),t.lineTo(770,650),t.lineTo(1010,650),t.lineTo(1010,740),e.addChild(t)};return bt(()=>{if(!i)return;const{districts:e}=J;let t=e.reduce((a,d)=>a.voting.eligiblePopulation>d.voting.eligiblePopulation?a:d);t&&(O=t.voting.eligiblePopulation);let p=[];e.forEach(a=>{const{voting:d}=a;let y=d.eligiblePopulation/O,u=[],n=0;d.result.forEach((l,E)=>{E===d.result.length-1?u.push({percentage:100-n,color:V(l.candidateId)}):(u.push({percentage:Math.floor(l.count/d.totalVotes*100),color:V(l.candidateId)}),n+=l.count/d.totalVotes*100)}),p.push(new dt(a,P,y,u))}),X(p)},[i]),k(()=>{var t,p,a;if(!w.current)return;const e=new ut({width:((t=w.current.parentElement)==null?void 0:t.clientWidth)||window.innerWidth,height:((p=w.current.parentElement)==null?void 0:p.clientHeight)||window.innerWidth,backgroundColor:0,antialias:!0,resolution:2,autoDensity:!0});return e.loader.add("stripe","/map/images/strip-black.gif"),e.loader.load((d,y)=>{var l,E;const u=y.stripe.animation;u&&(u.x=-u.width,u.y=-u.height,e.stage.addChild(u));const n=new pt({screenWidth:(l=w.current)==null?void 0:l.clientWidth,screenHeight:(E=w.current)==null?void 0:E.clientHeight,worldWidth:S,worldHeight:_,passiveWheel:!1,stopPropagation:!0,interaction:e.renderer.plugins.interaction});e.stage.addChild(n),n.on("pointermove",h=>{if(r.current){const{clientHeight:s,clientWidth:b}=r.current,g=!(h.data.global.y>s*.33);D(o=>v(T({},o),{left:h.data.global.x-15,top:g?h.data.global.y+20:"unset",bottom:g?"unset":s-h.data.global.y+10,pointUp:g,anchorRight:h.data.global.x>b*.66}))}}),n.on("pointerdown",h=>{h.target.cursor!=="pointer"&&D(s=>v(T({},s),{show:!1}))}),n.drag().pinch().wheel(),n.clampZoom({minWidth:300,minHeight:300,maxWidth:2e3,maxHeight:2e3}),n.fit(),n.moveCenter(S/2,_/2),K(e),Y(n),q(!0)}),(a=w.current)==null||a.appendChild(e.view),e.start(),()=>{e.destroy(!0)}},[]),k(()=>{L&&x&&I&&(x.removeChildren(),$(L,x),D(e=>v(T({},e),{show:!1})),x.fit(),x.moveCenter(S/2,_/2))},[I,A]),Tt("div",{className:"relative h-full",class:"overflow-hidden",ref:r,children:[H("div",{className:"w-full h-full",ref:w}),H(xt,{show:m.show,district:m.district,style:{left:m.left,top:m.top,bottom:m.bottom},pointUp:m.pointUp,topCandidateDisplay:j,anchorRight:m.anchorRight})]})};export{Wt as default};
