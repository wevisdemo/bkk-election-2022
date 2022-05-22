import{F as C,p as A,h as N,m as E,j as l,a as F,_ as v,D as h,y as L,b as p,P as T,S as O,E as I}from"./index.f48a17c2.js";import{D as P}from"./DistrictTooltip.e3a0f9ed.js";const y=6;function _({district:r,isInProgress:s,isLive:i,onClick:x}){const n=C(A),a=N(null),[c,f]=E(!1);if(!n)return l(F,{});const[d,u]=E(!1),g=r.voting.progress||0,b=[{percent:g/100,color:"#FFFFFF",strip:i},{percent:1-g/100,color:"rgba(255, 255, 255, 0.2)"}],D=v(()=>{const e=r.voting.result.reduce((t,m)=>{if(!m.count||!r.voting.totalVotes)return t;const w=m.count/r.voting.totalVotes;return t.length==y?(t[t.length-1].percent+=w,t[t.length-1].color=h,t):[...t,{percent:w||0,color:n.candidateMap[m.candidateId].color,strip:i}]},[]);if(e.length==0)return[{percent:1,color:h,strip:i}];const o=e.reduce((t,m)=>t+m.percent,0);if(console.log(o),o!=1){const t=1-o;e[e.length-1].color.localeCompare(h)===0?e[e.length-1].percent+=t:e.push({percent:t,color:h,strip:i})}return e},[r]);return L(()=>{var e,o;a.current&&f(a.current.offsetTop-(((e=a.current.parentElement)==null?void 0:e.scrollTop)||0)<(((o=a.current.parentElement)==null?void 0:o.clientHeight)||0)/2)},[d]),p("div",{class:`grid ${s?"grid-cols-3 md:grid-cols-6":"grid-cols-2 md:grid-cols-5"} typo-u4 gap-x-4 gap-y-1 md:gap-8 hover:bg-white/20 items-center py-1`,onMouseOver:()=>u(!0),onMouseLeave:()=>u(!1),ref:a,onClick:x,children:[l("div",{class:"font-semibold",children:r.name}),p("div",{class:s?"text-left":"text-right md:text-left",children:[r.voting.eligiblePopulation.toLocaleString(),"\xA0(",(r.voting.eligiblePopulation/n.electionData.total.eligiblePopulation).toLocaleString(void 0,{style:"percent",minimumFractionDigits:1}),")"]}),p("div",{class:`${s?"col-span-3":"col-span-2 md:col-span-3"} relative flex h-full items-center order-last md:order-3`,children:[l("div",{className:"flex grow order-last md:order-3",children:l(T,{border:"1px solid #000000",className:"h-[10px]",progressItems:D})}),l(P,{show:d,district:r,className:`${c?"top-full":"bottom-full"}`,pointUp:c,topCandidateDisplay:y-1})]}),s&&i&&p("div",{class:"flex md:basis-2/12 gap-2 order-4",children:[g.toFixed(1),"%",l(T,{progressItems:b,className:"h-1 md:h-2"})]})]})}l("svg",{width:"10",height:"6",viewBox:"0 0 10 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:l("path",{d:"M1 1L5 5L9 1",stroke:"white"})});function M({onDistrictClick:r}){const s=C(A),[i,x]=E(!1);if(!s)return l(F,{});const[n,a]=E("name"),[c,f]=E(!1),d=[{text:"\u0E40\u0E02\u0E15",className:"cursor-pointer",sortType:"name"},{text:"\u0E1C\u0E39\u0E49\u0E21\u0E35\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07",className:"cursor-pointer whitespace-nowrap"+(s.electionData.total.progress?"":" text-right md:text-left"),sortType:"eligible"},{text:"\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07",className:"col-span-3 grow hidden md:flex",children:""},{text:"\u0E19\u0E31\u0E1A\u0E04\u0E30\u0E41\u0E19\u0E19\u0E41\u0E25\u0E49\u0E27",className:"cursor-pointer whitespace-nowrap text-right",sortType:"percent"}];s.electionData.total.progress||d.pop();const u=v(()=>c?-1:1,[c]),g=e=>e==="eligible"||e==="percent",b=v(()=>{const e=s.electionData.districts;switch(n){case"eligible":return e.sort((o,t)=>(o.voting.eligiblePopulation-t.voting.eligiblePopulation)*u);case"percent":return e.sort((o,t)=>((o.voting.progress||100)-(t.voting.progress||100))*u);case"name":default:return e.sort((o,t)=>o.name.localeCompare(t.name)*u)}},[s,n,u]),D=e=>{e&&(e===n?f(!c):(a(e),f(g(e))))};return p("div",{class:"flex flex-col flex-1 relative overflow-y-hidden",children:[l("div",{class:`grid ${s.electionData.total.progress?"grid-cols-3 md:grid-cols-6":"grid-cols-2 md:grid-cols-5"} typo-u4 gap-4 gap-y-1 md:gap-8 border-b border-white/40 pb-1`,children:d.map(e=>l(O,{headerText:e.text,className:e.className,isActive:e.sortType===n,descending:c,headerOnClick:()=>D(e.sortType),children:e.children}))}),p("div",{class:"flex flex-col pt-2 gap-2 overflow-y-auto hide-scrollbar",onScroll:e=>{const o=e.target;x(o.scrollHeight-o.scrollTop-o.clientHeight<1)},children:[l("div",{class:`absolute w-full h-11 bg-gradient-to-t z-[5] from-black to-black/0 bottom-0 pointer-events-none ${i&&"hidden"}`}),b.map((e,o)=>l(_,{district:e,isInProgress:s.electionData.total.progress!==void 0,isLive:s.electionData.type==I.Live,onClick:()=>r(e)}))]})]})}export{M as default};