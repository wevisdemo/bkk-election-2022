import{S as k,i as b,s as y,e as g,G as M,c as m,d as h,b as i,I as u,M as d,k as T,a as w,m as A,Z as f,g as E,U as B}from"./vendor-daa16896.js";function q(o){let t,s,e,a,l,n;return document.title=t=o[0],{c(){s=g("meta"),e=g("meta"),a=g("meta"),l=g("meta"),n=g("meta"),this.h()},l(r){const c=M('[data-svelte="svelte-xwbfui"]',document.head);s=m(c,"META",{name:!0,content:!0}),e=m(c,"META",{property:!0,content:!0}),a=m(c,"META",{property:!0,content:!0}),l=m(c,"META",{property:!0,content:!0}),n=m(c,"META",{name:!0,content:!0}),c.forEach(h),this.h()},h(){i(s,"name","description"),i(s,"content",o[1]),i(e,"property","og:title"),i(e,"content",o[0]),i(a,"property","og:description"),i(a,"content",o[1]),i(l,"property","og:image"),i(l,"content","https://bkkelection2022.wevis.info/static/images/main_og.png"),i(n,"name","twitter:card"),i(n,"content","summary_large_image")},m(r,c){u(document.head,s),u(document.head,e),u(document.head,a),u(document.head,l),u(document.head,n)},p(r,[c]){c&1&&t!==(t=r[0])&&(document.title=t),c&1&&i(e,"content",r[0])},i:d,o:d,d(r){h(s),h(e),h(a),h(l),h(n)}}}function I(o,t,s){let e,{title:a=""}=t;const l="\u0E2A\u0E23\u0E38\u0E1B\u0E04\u0E23\u0E1A '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07\u0E1C\u0E39\u0E49\u0E27\u0E48\u0E32\u0E2F \u0E01\u0E17\u0E21. 2565' \u0E41\u0E25\u0E30 '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07 \u0E2A.\u0E01.' \u0E40\u0E0A\u0E47\u0E01\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34 \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22 \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E41\u0E04\u0E19\u0E14\u0E34\u0E40\u0E14\u0E15 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E04\u0E39\u0E48\u0E21\u0E37\u0E2D\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07 \u0E41\u0E25\u0E30\u0E40\u0E0A\u0E47\u0E01\u0E1C\u0E25\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07 \u0E01\u0E17\u0E21. \u0E41\u0E1A\u0E1A\u0E40\u0E23\u0E35\u0E22\u0E25\u0E44\u0E17\u0E21\u0E4C";return o.$$set=n=>{"title"in n&&s(2,a=n.title)},o.$$.update=()=>{o.$$.dirty&4&&s(0,e=`${a?`${a} - `:""}Bangkok Election 2022 : \u0E40\u0E01\u0E32\u0E30\u0E15\u0E34\u0E14 '\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E31\u0E49\u0E07\u0E1C\u0E39\u0E49\u0E27\u0E48\u0E32\u0E2F \u0E01\u0E17\u0E21. 2565'`)},[e,l,a]}class V extends k{constructor(t){super();b(this,t,I,q,y,{title:2})}}var _=[{name:"WeVis",logo:"/static/images/logo-wevis.svg",logoBlack:"/static/images/logo-wevis-black.svg",href:"https://wevis.info"},{name:"The Standard",logo:"/static/images/logo-tsd.svg",logoBlack:"/static/images/logo-tsd-black.svg",href:"https://thestandard.co/"},{name:"Wisesight",logo:"/static/images/logo-wisesight.svg",logoBlack:"/static/images/logo-wisesight-black.svg",href:"https://wisesight.com/"}];function p(o,t,s){const e=o.slice();return e[1]=t[s].name,e[2]=t[s].logo,e[3]=t[s].logoBlack,e[4]=t[s].href,e}function v(o){let t,s,e,a,l,n;return{c(){t=g("a"),s=g("img"),l=T(),this.h()},l(r){t=m(r,"A",{href:!0,target:!0});var c=w(t);s=m(c,"IMG",{src:!0,alt:!0,class:!0}),l=A(c),c.forEach(h),this.h()},h(){f(s.src,e=o[0]?o[3]:o[2])||i(s,"src",e),i(s,"alt",a=o[1]),i(s,"class","h-6 md:h-8"),i(t,"href",n=o[4]),i(t,"target","_blank")},m(r,c){E(r,t,c),u(t,s),u(t,l)},p(r,c){c&1&&!f(s.src,e=r[0]?r[3]:r[2])&&i(s,"src",e)},d(r){r&&h(t)}}}function S(o){let t,s=_,e=[];for(let a=0;a<s.length;a+=1)e[a]=v(p(o,s,a));return{c(){t=g("div");for(let a=0;a<e.length;a+=1)e[a].c();this.h()},l(a){t=m(a,"DIV",{class:!0});var l=w(t);for(let n=0;n<e.length;n+=1)e[n].l(l);l.forEach(h),this.h()},h(){i(t,"class","flex flex-row space-x-8 justify-center")},m(a,l){E(a,t,l);for(let n=0;n<e.length;n+=1)e[n].m(t,null)},p(a,[l]){if(l&1){s=_;let n;for(n=0;n<s.length;n+=1){const r=p(a,s,n);e[n]?e[n].p(r,l):(e[n]=v(r),e[n].c(),e[n].m(t,null))}for(;n<e.length;n+=1)e[n].d(1);e.length=s.length}},i:d,o:d,d(a){a&&h(t),B(e,a)}}}function G(o,t,s){let{black:e=!1}=t;return o.$$set=a=>{"black"in a&&s(0,e=a.black)},[e]}class W extends k{constructor(t){super();b(this,t,G,S,y,{black:0})}}export{V as M,W as P};