(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{515:function(t,e,n){var content=n(639);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(43).default)("150d0921",content,!0,{sourceMap:!1})},521:function(t,e,n){"use strict";n.r(e);n(31),n(26),n(57),n(58);var r=n(20),o=n(4),c=(n(56),n(633),n(44),n(513),n(636),n(30),n(514)),d=n.n(c),l=n(520),h=n(0),f=n.n(h),v=n(637),m=n.n(v);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var k={props:{dataSet:{type:Object,default:function(){}},color:{type:Function,default:function(){}},animate:{type:Boolean,default:!0},play_animation:{type:Boolean,default:!1},activeChart:{type:null,default:""},stackedBarChart:{type:Array,default:function(){return[]}},type:{type:String,default:"engagement"},duration:{type:Number,default:2e4},start_date:{type:String,default:""},xAxisStart:{type:String,default:""},xAxisEnd:{type:String,default:""}},data:function(){return{width:1e3,height:520,step:8,left_tooltip:0,point:0,hover:"",active:"",animate_finish:!1,animate_start:!1}},computed:{margin:function(){return{top:30,left:30,right:"mobiel"===this.$mq?22:30,bottom:30}},innerWidth:function(){return this.width-this.margin.left-this.margin.right},innerHeight:function(){return this.height-this.margin.top-this.margin.bottom},formatThousands:function(){return l.f(",")},raw_data:function(){return d.a.get(this.dataSet,"raw_data",[])},candidates:function(){return d.a.get(this.dataSet,"candidates",[])},group_date:function(){return d.a.get(this.dataSet,"group_date",{})},check_width:function(){var t=this.group_date.length;return(this.width-this.margin.left-this.margin.right)/(t-1)},line:function(){var t=this;return l.g().x((function(e){return t.xScale(e.date)})).y((function(e){return t.yScale(e.value)}))},xScaleActiveDate:function(){return l.m().domain([this.margin.left,this.width-this.margin.right]).range(this.group_date.keys_data)},xScale:function(){return l.l().domain(this.group_date.keys_data).range([this.margin.left,this.width-this.margin.right])},xAxis:function(){var t=this,e=this.group_date.length,n=l.a(this.xScale).tickFormat((function(e){var n=e;return"engagement"===t.type&&(n=f()(e).add(543,"years").format("DD MMM YY")),n})).ticks(e).tickSize(1).tickPadding(12);return"engagement"===this.type&&(n=n.tickValues(l.e(this.raw_data,(function(t){return t.date})))),n},yScale:function(){var t=l.h(this.raw_data,(function(t){return t.value}));return l.j().domain([0,t]).range([this.height-this.margin.bottom,this.margin.top]).nice()},yAxis:function(){var t=this,e=9,n=function(e){return t.formatkilo(e)};if("rank"===this.type){var r=this.candidates.length;e=r,n=function(t){return 0===t?t:r+1-t}}return l.b(this.yScale).tickFormat(n).ticks(e).tickSize(-this.innerWidth)},transitionPath:function(){return l.p().ease(l.d).duration(this.duration)},interaction:function(){return this.hover||this.active}},watch:{play_animation:{handler:function(t){var e=this;t&&this.animate&&this.$nextTick((function(){e.handleStartAnimation()}))},immediate:!0},animate_finish:function(t){t&&!this.animate_start&&this.setShowDotsEnd()},activeChart:function(t){this.active=t,this.onMouseMove(),this.updateAnimatePathLabel(t,800)}},beforeMount:function(){window.addEventListener("resize",this.resizeHandler)},destroyed:function(){window.removeEventListener("resize",this.resizeHandler)},mounted:function(){this.resizeHandler(),this.drawLineChart()},methods:{resizeHandler:function(){this.width=this.$refs.container.clientWidth,this.height=this.$refs.container.clientHeight},handleStartAnimation:function(){var t=this;setTimeout((function(){t.setAnimatePathLine(),t.updateAnimatePathLabel(t.xAxisEnd,t.duration)}),1e3)},formatkilo:function(t){return m()(t).format("0 a")},dateDisplay:function(t){return f()(t).add(543,"years").format("DD MMM YY")},dateFormat:function(t){return f()(t).format("yyyy-MM-DD")},drawLineChart:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var svg;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$nextTick();case 2:(svg=l.n("svg")).select(".axis-group").append("g").attr("class","y-axis").attr("transform","translate(".concat(t.margin.left,", 0)")).call(t.yAxis).call((function(t){t.selectAll(".tick").append("line").attr("class","line-tick").attr("x2",7),t.selectAll(".tick text").style("text-anchor","start").attr("x",-30)})),svg.select(".axis-group").append("g").attr("class","x-axis").attr("transform","translate(0, ".concat(t.height-t.margin.top,")")).call(t.xAxis),t.animate?t.resetLinePath():(t.setShowDotsEnd(),t.updateAnimatePathLabel(t.xAxisEnd,0));case 6:case"end":return e.stop()}}),e)})))()},resetLinePath:function(){l.o(".line-path .line").each((function(){var select=l.n(this),t=select.node().getTotalLength();select.attr("stroke-dashoffset",t).attr("stroke-dasharray",t)}))},onClickChecks:function(){var t=l.n(".checks").attr("x"),e=this.xScaleActiveDate(t);e!==this.active&&(this.active=e,this.$emit("change",e))},onMouseHover:function(t){l.n(".checks").style("opacity",1),l.n(".tooltip-wrapper").style("opacity",1)},onMouseleave:function(){this.active?this.onMouseMove():(l.n(".checks").style("opacity",0),l.o(".mark-dots").style("opacity",0),l.n(".tooltip-wrapper").style("opacity",0))},onMouseMove:function(t){var e=this.active;if(t){var n=d.a.get(t,"x",0);e=this.xScaleActiveDate(n),this.hover=e}l.o(".mark-dots").style("opacity",0),l.o(".dots-".concat(e)).style("opacity",1),l.n(".checks").attr("x",this.xScale(e)),this.handleTooltip(e)},handleTooltip:d.a.debounce((function(t){var e=this,title=this.dateDisplay(t),n="",r=d.a.get(this.group_date,"data[".concat(t,"]"),[]);if("rank"===this.type){var o=d.a.get(r,"[0]",{});title="สัปดาห์ที่ ".concat(o.date),n="".concat(this.dateDisplay(o.date_from)," - ").concat(this.dateDisplay(o.date_to))}var c=d.a.chain(r).map((function(t){return x(x({},t),{},{value_str:"rank"===e.type?t.rank:e.formatkilo(t.value)})})).orderBy("value","desc").value(),h=l.n(".tooltip");h.select(".title").html(title),h.select(".description").html(n),c.forEach((function(t,i){var e=l.n(".content-".concat(i));e.select(".name").html(t.candidate),e.select(".value").html(t.value_str).style("color",t.color)}));var f=30+this.margin.left,v=this.xScale(t)-f,m=this.$refs.tooltip;if(m){var y=m.clientWidth;v=v-y<-20?f:v-y+this.margin.left,l.n(".tooltip-wrapper").style("left","".concat(v,"px"))}}),50),setAnimatePathLine:function(){var t=this;l.o(".line").each((function(){l.n(this).transition(t.transitionPath).attr("stroke-dashoffset",0)}))},clearAnimatePathLine:function(){l.o(".line").call((function(t){return t.transition()}))},setShowDotsEnd:function(){l.o("dots-".concat(this.xAxisEnd)).style("opacity",1)},setAnimatePathLabel:function(){var t=this,marker=l.o(".marker-group");this.animate_finish=!1,setTimeout((function(){marker.call((function(){marker.each((function(g,i){var e=this;l.n(this).call((function(){var n=0,data=d.a.get(g,"data",[]),r=data.length;!function animate(){var o=d.a.get(data,"[".concat(n,"]"),{}),time=o.time;l.n(e).select(".marker").transition().delay(time).duration(400).ease(l.c).attr("transform","scale(".concat(o.highest_per_date&&n===r-1?1.7:1,")")),l.n(e).transition().duration(time).ease(l.d).attr("transform","translate(".concat(t.xScale(o.date),",").concat(t.yScale(o.value),")")).on("end",(function(){n<r?animate():t.animate_finish=!0})),n++}()}))}))}))}),1e3)},updateAnimatePathLabel:function(t,e){var n=this,r=this,o=f()(t).diff(this.xAxisStart,"days"),line=l.g().x((function(t){return n.xScale(t.date)})).y((function(t){return n.yScale(t.value)})).defined((function(t,i){return i<=o&&i>=n.point||i<=n.point&&i>=o}));l.o(".line-path .line-seg").data(this.candidates).each((function(t){l.n(this).attr("d",line(t.data))}));l.o(".marker-group").data(this.candidates).each((function(c,i){var h=this,v=l.n("#line-seg-".concat(c.candidate));l.n(this).transition().duration(e).ease(l.d).attrTween("transform",o>r.point?r.translateRight(v.node()):r.translateLeft(v.node())).on("end",(function(){r.point=o,r.animate_finish=!0,function(select,e){var r="rank"===n.type?f()(t).diff(n.start_date,"week")+1:t,o=d.a.get(n.group_date,"data[".concat(r,"]"),{}).find((function(t){return t.candidate===e.candidate})),c=d.a.get(o,"highest_per_date");select.select(".marker").transition().duration(250).attr("transform","scale(".concat(c?1.7:1,")"))}(l.n(h),c)}))}))},translateRight:function(t){var e=t.getTotalLength();return function(){return function(n){var p=t.getPointAtLength(n*e);return"translate("+p.x+","+p.y+")"}}},translateLeft:function(t){var e=t.getTotalLength();return function(){return function(n){var p=t.getPointAtLength((1-n)*e);return"translate("+p.x+","+p.y+")"}}},handleHover:function(t){l.n(t).moveToFront()},calDistance:function(data,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"forward",n="forward"===e?-1:1,r=d.a.get(data,"[".concat(t+n,"]"),{}),o=d.a.get(data,"[".concat(t,"]"),{});if(d.a.isEmpty(r))return 0;var c=this.xScale(r.date)-this.xScale(o.date),l=this.yScale(r.value)-this.yScale(o.value);return Math.hypot(c,l)||0},setDataGroupCandidate:function(){var t=this,e=function(data){var e=data.map((function(e,n){var r=t.calDistance(data,n,"forward"),o=t.calDistance(data,n,"black");return x(x({},e),{},{distance:r,distanceBk:o})})),n=e.reduce((function(t,e){return t+e.distance}),0);return e.map((function(e){var time=t.duration*e.distance/n,r=t.duration*e.distanceBk/n;return x(x({},e),{},{time:time,timeBk:r,pathLength:n})}))},n=[],r=d.a.groupBy(this.raw_data,"candidate");for(var o in r){var c=d.a.get(r,o,[]),data=e(c);n.push({candidate:o,min:l.i(c,(function(t){return t.value})),max:l.h(c,(function(t){return t.value})),highest_per_date:d.a.get(data,"[0].highest_per_date"),color:this.color(o),data:c})}this.candidates=n},checksEvent:d.a.throttle((function(t){this.hover=t}),150),sumRangeTimeData:function(){var t=this,data=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return data.filter((function(e){return t.handleCondition(e)})).reduce((function(t,e){return t+e.time}),0)},handleSetActiveChart:function(t){var e=this;this.active=t;var n=l.o(".marker-group").data(this.candidates);n.transition().duration(600).attr("transform",(function(n){var r=n.data.find((function(e){return e.date===t}))||{};return"translate(".concat(e.xScale(r.date),",").concat(e.yScale(r.value),")")})),n.select(".marker").transition().duration(400).ease(l.c).attr("transform",(function(e){var n=e.data.find((function(e){return e.date===t}))||{};return"scale(".concat(n.highest_per_date?1.7:1,")")}))}}},w=k,_=(n(638),n(54)),component=Object(_.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"line-chart-race"},[n("div",{ref:"tooltip",staticClass:"tooltip-wrapper",staticStyle:{opacity:"0"}},[n("div",{staticClass:"tooltip typo-b5"},[n("div",{staticClass:"title mb-1"}),t._v(" "),n("div",{staticClass:"description typo-b6"}),t._v(" "),t._l(t.candidates,(function(e,r){return n("div",{key:e.candidate,class:"data-list content-"+r},[n("div",{staticClass:"name pr-4"}),t._v(" "),n("div",{staticClass:"value"})])}))],2)]),t._v(" "),n("svg",{ref:"container"},[n("g",{staticClass:"axis-group"}),t._v(" "),n("g",[n("rect",{staticClass:"checks",staticStyle:{transition:"'all 0.2s'"},attrs:{"stroke-width":"1px",width:".5px",height:t.height-t.margin.top-t.margin.bottom,y:t.margin.top,opacity:"0",stroke:"#e0e1e1"}})]),t._v(" "),n("g",{staticClass:"g-lines"},t._l(t.candidates,(function(e){return n("g",{key:"line-"+e.candidate,staticClass:"line-group"},[n("g",{staticClass:"circle"},[n("circle",{attrs:{fill:e.color,cx:t.margin.left,cy:t.yScale(e.data[0].value),r:"4"}}),t._v(" "),t._l(e.data,(function(r,o){return n("circle",{key:o,class:["dots-"+r.date,{"mark-dots":o!==e.data.length-1}],staticStyle:{opacity:"0"},attrs:{fill:e.color,cx:t.xScale(r.date),cy:t.yScale(r.value),r:"4"}})}))],2),t._v(" "),n("g",{staticClass:"line-path"},[n("path",{staticClass:"line",attrs:{d:t.line(e.data),fill:"none",stroke:e.color,"stroke-linejoin":"round","stroke-linecap":"round","stroke-width":"mobile"===t.$mq?2:4}}),t._v(" "),n("path",{staticClass:"line-seg",attrs:{id:"line-seg-"+e.candidate,d:t.line(e.data),fill:"none",stroke:"none","stroke-width":"2"}})])])})),0),t._v(" "),n("g",{staticClass:"g-marker"},t._l(t.candidates,(function(e){return n("g",{key:"marker-"+e.candidate,staticClass:"marker-group",attrs:{transform:"translate("+t.xScale((e.data||{})[0].date)+","+t.yScale((e.data||{})[0].value)+")"}},[n("g",{staticClass:"marker",attrs:{transform:"scale(1)"}},[n("clipPath",{attrs:{id:"clip-"+e.candidate}},[n("use",{attrs:{"xlink:href":"#circle-"+e.candidate}})]),t._v(" "),n("circle",{staticClass:"circle",attrs:{id:"circle-"+e.candidate,r:"mobile"===t.$mq?6.5:12,fill:e.color,stroke:e.color,"stroke-width":4}}),t._v(" "),n("image",{staticClass:"image",attrs:{href:e.image,height:"mobile"===t.$mq?13:24,width:"mobile"===t.$mq?13:24,x:"mobile"===t.$mq?-6.5:-12,y:"mobile"===t.$mq?-6.5:-12,"clip-path":"url(#clip-"+e.candidate+")"}})])])})),0),t._v(" "),n("rect",{staticClass:"listening-rect",attrs:{width:t.innerWidth,height:t.innerHeight,x:t.margin.left,y:t.margin.top,fill:"transparent"},on:{mouseover:t.onMouseHover,mousemove:t.onMouseMove,mouseleave:t.onMouseleave,click:function(e){t.animate_finish&&"engagement"===t.type&&t.onClickChecks(t.item)}}})])])}),[],!1,null,"290a225d",null);e.default=component.exports},638:function(t,e,n){"use strict";n(515)},639:function(t,e,n){var r=n(42)((function(i){return i[1]}));r.push([t.i,'.line-chart-race[data-v-290a225d]{width:100%;height:100%;position:relative}.tooltip-wrapper[data-v-290a225d]{position:absolute;top:50%;transform:translateY(-50%);z-index:10;transition:all .2s;pointer-events:none}.tooltip-wrapper .tooltip[data-v-290a225d]{background:rgba(0,0,0,.8);border:1px solid hsla(0,0%,100%,.2);border-radius:5px;color:#fff;padding:18px;min-width:170px}.tooltip-wrapper .tooltip .title[data-v-290a225d]{font-weight:700}.tooltip-wrapper .tooltip .description[data-v-290a225d]{font-weight:400}.tooltip-wrapper .tooltip .data-list[data-v-290a225d]{width:100%;display:flex;align-items:center;justify-content:space-between;margin-top:10px}svg[data-v-290a225d]{width:100%;height:100%}svg[data-v-290a225d]  .x-axis .tick text,svg[data-v-290a225d]  .y-axis .tick text{font-family:"Anuphan";font-style:normal;font-weight:400;font-size:12px;fill:#fff}svg[data-v-290a225d]  .x-axis .domain{stroke:#fff}svg[data-v-290a225d]  .x-axis .tick line{display:none}svg[data-v-290a225d]  .x-axis .tick:first-of-type text{text-anchor:start}svg[data-v-290a225d]  .x-axis .tick:last-of-type text{text-anchor:end}svg[data-v-290a225d]  .y-axis .domain{display:none}svg[data-v-290a225d]  .y-axis .tick text{text-anchor:start}svg[data-v-290a225d]  .y-axis .tick line{stroke:#373746}svg[data-v-290a225d]  .y-axis .tick .line-tick{stroke:#fff}svg .listening-rect[data-v-290a225d]{cursor:pointer}text[data-v-290a225d]{font-family:Prompt}.line-group[data-v-290a225d]{transition:all .3s}.line-group.not-active[data-v-290a225d]{opacity:.1}.checks[data-v-290a225d]{cursor:pointer}.legend-wrapper[data-v-290a225d]{margin-top:14px}.legend-wrapper .legend[data-v-290a225d]{max-height:260px;display:flex;justify-content:center;align-items:center;flex-direction:column;flex-wrap:wrap;margin:0 -8px}.legend-wrapper .legend-group.not-active[data-v-290a225d]{opacity:.3}.legend-wrapper .legend-group[data-v-290a225d]{min-width:270px;cursor:default;padding:5px 8px;transition:all .3s}.legend-wrapper .legend-group>span[data-v-290a225d]{max-width:100%;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:flex}.legend-wrapper .legend-group .circle[data-v-290a225d]{flex:0 0 auto;width:25px;height:25px;border-radius:20px}.legend-wrapper .legend-group .label[data-v-290a225d]{flex:1;padding:0 0 0 8px}.fade-enter-active[data-v-290a225d],.fade-leave-active[data-v-290a225d]{transition:opacity .2s}.fade-enter[data-v-290a225d],.fade-leave-to[data-v-290a225d]{opacity:0}',""]),r.locals={},t.exports=r}}]);