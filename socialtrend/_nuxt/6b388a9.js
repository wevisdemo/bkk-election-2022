(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{515:function(t,e,n){var content=n(640);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("0c270d1e",content,!0,{sourceMap:!1})},522:function(t,e,n){"use strict";n.r(e);n(26),n(57),n(58);var r=n(4),o=n(20),c=(n(56),n(634),n(31),n(513),n(637),n(44),n(30),n(514)),l=n.n(c),d=n(521),h=n(0),f=n.n(h),v=n(638),m=n.n(v);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var k={props:{dataSet:{type:Array,default:function(){return[]}},color:{type:Function,default:function(){}},photo:{type:Function,default:function(){}},animate:{type:Boolean,default:!1},activeChart:{type:null,default:""},stackedBarChart:{type:Array,default:function(){return[]}},type:{type:String,default:"engagement"},duration:{type:Number,default:2e4},xAxisStart:{type:String,default:""},xAxisEnd:{type:String,default:""}},data:function(){return{width:1e3,height:520,step:8,left_tooltip:0,point:0,hover:"",active:"",candidates:[],animate_finish:!1,animate_start:!1,margin:{top:30,left:30,right:22,bottom:30}}},computed:{innerWidth:function(){return this.width-this.margin.left-this.margin.right},innerHeight:function(){return this.height-this.margin.top-this.margin.bottom},formatThousands:function(){return d.f(",")},candidate_group:function(){var t=l.a.groupBy(this.dataSet,"candidate");return Object.keys(t)},yAxis_group:function(){var t=l.a.groupBy(this.dataSet,"date");return Object.keys(t)},check_width:function(){var t=this.yAxis_group.length;return(this.width-this.margin.left-this.margin.right)/(t-1)},line:function(){var t=this;return d.g().x((function(e){return t.xScale(e.date)})).y((function(e){return t.yScale(e.value)}))},xScale:function(){return d.l().domain(this.yAxis_group).range([this.margin.left,this.width-this.margin.right])},xAxis:function(){var t=this,e=this.yAxis_group.length,n=d.a(this.xScale).tickFormat((function(e){var n=e;return"engagement"===t.type&&(n=f()(e).add(543,"years").format("DD MMM YY")),n})).ticks(e).tickSize(1).tickPadding(12);return"engagement"===this.type&&(n=n.tickValues(d.e(this.dataSet,(function(t){return t.date})))),n},yScale:function(){var t=d.h(this.dataSet,(function(t){return t.value}));return d.j().domain([0,t]).range([this.height-this.margin.bottom,this.margin.top]).nice()},yAxis:function(){var t=this,e=9,n=function(e){return t.formatkilo(e)};if("rank"===this.type){var r=l.a.groupBy(this.dataSet,"candidate"),o=Object.keys(r);e=o.length,n=function(t){return 0===t?t:o.length+1-t}}return d.b(this.yScale).tickFormat(n).ticks(e).tickSize(-this.innerWidth).tickPadding(6)},stackedScale:function(){var t=l.a.get(window,"clientWidth",0),e=d.h(this.dataSet,(function(t){return t.value}));return d.j().domain([0,e]).range([0,t])},transitionPath:function(){return d.o().ease(d.d).duration(this.duration)},ready:function(){return this.animate&&0!==this.candidates},active_data:function(){var t=this,e=this.hover||this.active,n=[],title=this.dateDisplay(e),r="";return this.candidates.forEach((function(o){var c=l.a.get(o,"data",[]).find((function(t){return"".concat(t.date)==="".concat(e)}));if(c){"rank"===t.type&&(title="สัปดาห์ที่ ".concat(c.date),r="".concat(t.dateDisplay(c.date_from)," - ").concat(t.dateDisplay(c.date_to)));var d=l.a.pick(c,["candidate","value","rank"]);n.push(x(x({},d),{},{color:o.color,value_str:"rank"===t.type?d.rank:t.formatkilo(d.value)}))}})),{title:title,description:r,date:e,candidates:l.a.orderBy(n,"value","desc")}}},watch:{hover:{handler:function(){this.leftTooltip()},immediate:!0},ready:{handler:function(t){var e=this;t&&this.$nextTick((function(){e.handleStartAnimation()}))},immediate:!0},animate_finish:function(t){t&&!this.animate_start&&(this.animate_start=!0)},activeChart:function(t){this.handleSetActiveChart(t)}},beforeMount:function(){window.addEventListener("resize",this.resizeHandler)},destroyed:function(){window.removeEventListener("resize",this.resizeHandler)},mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var svg,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.resizeHandler(),e.next=3,t.setDataGroupCandidate();case 3:(svg=d.m("svg")).select(".axis-group").append("g").attr("class","y-axis").attr("transform","translate(".concat(t.margin.left,", 0)")).call(t.yAxis).call((function(t){t.selectAll(".tick").append("line").attr("class","line-tick").attr("x2",7)})).call((function(t){t.selectAll(".tick text").style("text-anchor","start").attr("x",-26)})),svg.select(".axis-group").append("g").attr("class","x-axis").attr("transform","translate(0, ".concat(t.height-t.margin.top,")")).call(t.xAxis),n=d.n(".line-path").data(t.candidates),d.n(".marker-group").data(t.candidates),n.selectAll(".line").each((function(){var select=d.m(this),t=select.node().getTotalLength();select.attr("stroke-dashoffset",t).attr("stroke-dasharray",t)}));case 10:case"end":return e.stop()}}),e)})))()},methods:{resizeHandler:function(){this.width=this.$refs.container.clientWidth,this.height=this.$refs.container.clientHeight},handleStartAnimation:function(){this.setAnimatePathLine(),this.setAnimatePathLabel()},formatkilo:function(t){return m()(t).format("0 a")},dateDisplay:function(t){return f()(t).add(543,"years").format("DD MMM YY")},dateFormat:function(t){return f()(t).format("yyyy-MM-DD")},handleActiveLegend:function(t){l.a.isEqual(this.active,t)?this.active="":this.active=t},leftTooltip:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=30+t.margin.left,r=t.hover||t.active,o=t.xScale(r)-n,e.next=5,t.$nextTick();case 5:if(c=t.$refs.tooltip){e.next=8;break}return e.abrupt("return");case 8:l=c.clientWidth,o=o-l<-20?n:o-l+t.margin.left,t.left_tooltip=o;case 11:case"end":return e.stop()}}),e)})))()},setAnimatePathLine:function(){var t=this;d.n(".line").each((function(){d.m(this).transition(t.transitionPath).delay(1e3).attr("stroke-dashoffset",0)}))},setAnimatePathLabel:function(){var t=this,marker=d.n(".marker-group");this.animate_finish=!1,setTimeout((function(){marker.call((function(){marker.each((function(g,i){var e=this;d.m(this).call((function(){var n=0,data=l.a.get(g,"data",[]),r=data.length;!function animate(){var o=l.a.get(data,"[".concat(n,"]"),{}),time=o.time;d.m(e).select(".marker").transition().delay(time).duration(400).ease(d.c).attr("transform","scale(".concat(o.highest_per_date&&n===r-1?1.7:1,")")),d.m(e).transition().duration(time).ease(d.d).attr("transform","translate(".concat(t.xScale(o.date),",").concat(t.yScale(o.value),")")).on("end",(function(){n<r?animate():t.animate_finish=!0})),n++}()}))}))}))}),1e3)},updateAnimatePathLabel:function(t,e){var n=this,r=f()(t).diff(this.xAxisStart,"days")+1;console.log("val ",t),console.log("nextPoint ",r);var line=this.line.defined((function(t,i){return i<=r&&i>=n.point||i<=n.point&&i>=r})),o=d.n(".line-path .line-seg").data(this.candidates).each((function(t){d.m(this).attr("d",line(t.data))})),marker=d.n("marker-group");console.log(marker),marker.transition().duration(e).attrTween("transform",r>this.point?this.translateRight(o.node()):this.translateLeft(o.node())).on("end",(function(){n.point=r}))},translateRight:function(t){console.log("translateRight");var e=t.getTotalLength();return console.log("l ",e),function(){return function(n){var p=t.getPointAtLength(n*e);return"translate("+p.x+","+p.y+")"}}},translateLeft:function(t){var e=t.getTotalLength();return function(){return function(n){var p=t.getPointAtLength((1-n)*e);return"translate("+p.x+","+p.y+")"}}},handleHover:function(t){d.m(t).moveToFront()},min:function(data){return d.i(data,(function(t){return t.value}))},calDistance:function(data,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"forward",n="forward"===e?-1:1,r=l.a.get(data,"[".concat(t+n,"]"),{}),o=l.a.get(data,"[".concat(t,"]"),{});if(l.a.isEmpty(r))return 0;var c=this.xScale(r.date)-this.xScale(o.date),d=this.yScale(r.value)-this.yScale(o.value);return Math.hypot(c,d)||0},setDataGroupCandidate:function(){var t=this,e=function(data){var e=data.map((function(e,n){var r=t.calDistance(data,n,"forward"),o=t.calDistance(data,n,"black");return x(x({},e),{},{distance:r,distanceBk:o})})),n=e.reduce((function(t,e){return t+e.distance}),0);return e.map((function(e){var time=t.duration*e.distance/n,r=t.duration*e.distanceBk/n;return x(x({},e),{},{time:time,timeBk:r,pathLength:n})}))},n=[],r=l.a.groupBy(this.dataSet,"candidate");for(var o in r){var c=l.a.get(r,o,[]),data=e(c);n.push({candidate:o,min:d.i(c,(function(t){return t.value})),max:d.h(c,(function(t){return t.value})),highest_per_date:l.a.get(data,"[0].highest_per_date"),color:this.color(o),data:data})}this.candidates=n,console.log(n)},checksEvent:l.a.throttle((function(t){this.hover=t}),150),sumRangeTimeData:function(){var t=this,data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return data.filter((function(e){return t.handleCondition(e)})).reduce((function(t,e){return t+e.time}),0)},handleSetActiveChart:function(t){var e=this;this.active=t;var n=d.n(".marker-group").data(this.candidates);n.transition().duration(600).attr("transform",(function(n){var r=n.data.find((function(e){return e.date===t}))||{};return"translate(".concat(e.xScale(r.date),",").concat(e.yScale(r.value),")")})),n.select(".marker").transition().duration(400).ease(d.c).attr("transform",(function(e){var n=e.data.find((function(e){return e.date===t}))||{};return"scale(".concat(n.highest_per_date?1.7:1,")")}))},onClickChecks:function(t){t!==this.active&&(this.handleSetActiveChart(t),this.$emit("change",t))}}},_=k,w=(n(639),n(54)),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"line-chart-race"},[n("transition",{attrs:{name:"fade"}},[t.hover||t.active?n("div",{ref:"tooltip",staticClass:"tooltip-wrapper",style:"left: "+t.left_tooltip+"px"},[n("div",{staticClass:"tooltip typo-b5"},[n("div",{staticClass:"title"},[t._v(t._s(t.active_data.title))]),t._v(" "),t.active_data.description?n("div",{staticClass:"description mt-1 typo-b6"},[t._v("\n          "+t._s(t.active_data.description)+"\n        ")]):t._e(),t._v(" "),t._l(t.active_data.candidates,(function(e,r){return n("div",{key:r,staticClass:"data-list"},[n("div",{staticClass:"name pr-4"},[t._v(t._s(e.candidate))]),t._v(" "),n("div",{staticClass:"value",style:"color: "+e.color},[t._v("\n            "+t._s(e.value_str)+"\n          ")])])}))],2)]):t._e()]),t._v(" "),n("svg",{ref:"container"},[n("g",{staticClass:"axis-group"}),t._v(" "),t._l(t.yAxis_group,(function(e,r){return n("g",{key:r,staticClass:"checks",attrs:{transform:"translate("+(t.xScale(e)-t.check_width/2)+", 0)"}},[n("g",{style:{opacity:t.hover===e||t.active===e&&!t.hover?1:0}},[n("line",{staticStyle:{transition:"'all 0.2s'"},attrs:{x1:t.check_width/2,x2:t.check_width/2,y1:t.margin.top,y2:t.height-t.margin.bottom,stroke:"#e0e1e1"}})])])})),t._v(" "),n("g",{staticClass:"g-lines"},t._l(t.candidates,(function(e){return n("g",{key:"line-"+e.candidate,staticClass:"line-group"},[n("g",{staticClass:"circle"},[n("circle",{attrs:{fill:e.color,cx:t.margin.left,cy:t.yScale(e.data[0].value),r:"4"}}),t._v(" "),t._l(e.data,(function(r,o){return n("circle",{key:o,style:"opacity: "+(t.hover===r.date||o===e.data.length-1&&t.animate_start?"1":"0"),attrs:{fill:e.color,cx:t.xScale(r.date),cy:t.yScale(r.value),r:"4"}})}))],2),t._v(" "),n("g",{staticClass:"line-path"},[n("path",{staticClass:"line",attrs:{d:t.line(e.data),fill:"none",stroke:e.color,"stroke-linejoin":"round","stroke-linecap":"round","stroke-width":"mobile"===t.$mq?2:4}})])])})),0),t._v(" "),n("g",{staticClass:"g-marker"},t._l(t.candidates,(function(e){return n("g",{key:"marker-"+e.candidate,staticClass:"marker-group",attrs:{transform:"translate("+t.xScale((e.data||{})[0].date)+","+t.yScale((e.data||{})[0].value)+")"}},[n("g",{staticClass:"marker",attrs:{transform:"scale(1)"}},[n("clipPath",{attrs:{id:"clip-"+e.candidate}},[n("use",{attrs:{"xlink:href":"#circle-"+e.candidate}})]),t._v(" "),n("circle",{staticClass:"circle",attrs:{id:"circle-"+e.candidate,r:"mobile"===t.$mq?6.5:12,fill:e.color,stroke:e.color,"stroke-width":4}}),t._v(" "),n("image",{staticClass:"image",attrs:{href:t.photo(e.candidate),height:"mobile"===t.$mq?13:24,width:"mobile"===t.$mq?13:24,x:"mobile"===t.$mq?-6.5:-12,y:"mobile"===t.$mq?-6.5:-12,"clip-path":"url(#clip-"+e.candidate+")"}})])])})),0),t._v(" "),n("g",{staticClass:"checks-group",on:{mouseleave:function(e){t.hover=""}}},t._l(t.yAxis_group,(function(e,r){return n("g",{key:r,staticClass:"checks",attrs:{transform:"translate("+(t.xScale(e)-t.check_width/2)+", 0)"},on:{click:function(n){t.animate_finish&&"engagement"===t.type&&t.onClickChecks(e)},mouseover:function(n){return t.checksEvent(e)}}},[n("rect",{staticClass:"check-rect",staticStyle:{"pointer-events":"all"},attrs:{x:0,y:t.margin.top,height:t.height-t.margin.bottom,fill:"none",width:t.check_width}})])})),0)],2)],1)}),[],!1,null,"5ebd4150",null);e.default=component.exports},639:function(t,e,n){"use strict";n(515)},640:function(t,e,n){var r=n(42)((function(i){return i[1]}));r.push([t.i,'.line-chart-race[data-v-5ebd4150]{width:100%;height:100%;position:relative}.tooltip-wrapper[data-v-5ebd4150]{position:absolute;top:50%;transform:translateY(-50%);z-index:10;transition:all .2s;pointer-events:none}.tooltip-wrapper .tooltip[data-v-5ebd4150]{background:rgba(0,0,0,.8);border:1px solid hsla(0,0%,100%,.2);border-radius:5px;color:#fff;padding:18px;min-width:170px}.tooltip-wrapper .tooltip .title[data-v-5ebd4150]{font-weight:700}.tooltip-wrapper .tooltip .description[data-v-5ebd4150]{font-weight:400}.tooltip-wrapper .tooltip .data-list[data-v-5ebd4150]{width:100%;display:flex;align-items:center;justify-content:space-between;margin-top:10px}svg[data-v-5ebd4150]{width:100%;height:100%}svg[data-v-5ebd4150]  .x-axis .tick text,svg[data-v-5ebd4150]  .y-axis .tick text{font-family:"Anuphan";font-style:normal;font-weight:400;font-size:12px;fill:#fff}svg[data-v-5ebd4150]  .x-axis .domain{stroke:#fff}svg[data-v-5ebd4150]  .x-axis .tick line{display:none}svg[data-v-5ebd4150]  .x-axis .tick:first-of-type text{text-anchor:start}svg[data-v-5ebd4150]  .x-axis .tick:last-of-type text{text-anchor:end}svg[data-v-5ebd4150]  .y-axis .domain{display:none}svg[data-v-5ebd4150]  .y-axis .tick text{text-anchor:start}svg[data-v-5ebd4150]  .y-axis .tick line{stroke:#373746}svg[data-v-5ebd4150]  .y-axis .tick .line-tick{stroke:#fff}text[data-v-5ebd4150]{font-family:Prompt}.line-group[data-v-5ebd4150]{transition:all .3s}.line-group.not-active[data-v-5ebd4150]{opacity:.1}.checks[data-v-5ebd4150]{cursor:pointer}.legend-wrapper[data-v-5ebd4150]{margin-top:14px}.legend-wrapper .legend[data-v-5ebd4150]{max-height:260px;display:flex;justify-content:center;align-items:center;flex-direction:column;flex-wrap:wrap;margin:0 -8px}.legend-wrapper .legend-group.not-active[data-v-5ebd4150]{opacity:.3}.legend-wrapper .legend-group[data-v-5ebd4150]{min-width:270px;cursor:default;padding:5px 8px;transition:all .3s}.legend-wrapper .legend-group>span[data-v-5ebd4150]{max-width:100%;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:flex}.legend-wrapper .legend-group .circle[data-v-5ebd4150]{flex:0 0 auto;width:25px;height:25px;border-radius:20px}.legend-wrapper .legend-group .label[data-v-5ebd4150]{flex:1;padding:0 0 0 8px}.fade-enter-active[data-v-5ebd4150],.fade-leave-active[data-v-5ebd4150]{transition:opacity .2s}.fade-enter[data-v-5ebd4150],.fade-leave-to[data-v-5ebd4150]{opacity:0}',""]),r.locals={},t.exports=r}}]);