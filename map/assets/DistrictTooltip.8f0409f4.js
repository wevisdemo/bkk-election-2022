var w=Object.defineProperty,y=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var r=(a,l,e)=>l in a?w(a,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[l]=e,c=(a,l)=>{for(var e in l||(l={}))L.call(l,e)&&r(a,e,l[e]);if(d)for(var e of d(l))T.call(l,e)&&r(a,e,l[e]);return a},p=(a,l)=>y(a,D(l));import{T as b,F as C,p as $,j as i,a as j,b as o}from"./index.3447309c.js";const A=({show:a,pointUp:l,district:e,topCandidateDisplay:v=b,className:h="",anchorRight:m,style:f})=>{const t=C($);if(!a||!t)return i(j,{});const u=e?[...e.voting.result].sort((n,s)=>s.count-n.count).slice(0,v).map(({candidateId:n,count:s})=>p(c({},t.candidateMap[n]),{percentage:s>0?(s/e.voting.totalVotes*100).toFixed(1):0})):[];return o("div",{id:"district-tooltip",className:`absolute z-10 min-w-[10rem] pointer-events-none ${h}`,style:f,children:[l&&i("div",{children:i("svg",{width:"12",height:"6",viewBox:"0 0 12 6",fill:"none",className:"ml-2",children:i("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6 0L12 6H0L6 0Z",fill:"#393939"})})}),o("div",{className:"bg-[#393939] py-2 px-3 typo-u4 space-y-2 rounded-sm shadow",style:m?{position:"relative",left:"-80%"}:{position:"relative",left:"unset"},children:[i("div",{children:e==null?void 0:e.name}),i("div",{className:"space-y-1",children:u.map(({shortname:n,number:s,color:x,percentage:g},N)=>o("div",{className:`flex flex-row items-center space-x-2 ${N===0?"font-bold":""}`,children:[i("div",{className:"w-2 h-2",style:{backgroundColor:x}}),o("div",{className:"flex-1",children:[s?`[${s}] `:"",n]}),o("div",{children:[g,"%"]})]}))})]}),!l&&i("div",{children:i("svg",{width:"12",height:"6",viewBox:"0 0 12 6",fill:"none",className:"ml-2",transform:"scale(1,-1)",children:i("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6 0L12 6H0L6 0Z",fill:"#393939"})})})]})};var B=A;export{B as D};