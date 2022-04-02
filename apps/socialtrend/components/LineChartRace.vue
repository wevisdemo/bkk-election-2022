<template>
  <div class="line-chart-race">
    <!-- <div
      class="stacked-bar-chart fixed top-0 left-0 right-0 bottom-0 bg-black flex"
      style="z-index: -1"
    >
      <div
        v-for="item in candidate"
        :key="(item || {}).value"
        :id="(item || {}).value"
        class="candidate flex-auto px-0.5 opacity-20 transition-all duration-500"
      >
        <img :src="item.image" alt="" class="w-full h-full object-cover" />
      </div>
    </div> -->

    <transition name="fade">
      <div
        v-if="hover || active"
        ref="tooltip"
        class="tooltip-wrapper"
        :style="`left: ${left_tooltip}px`"
      >
        <div class="tooltip typo-b5">
          <div class="title">{{ active_data.date_display }}</div>
          <div
            v-for="(item, index) in active_data.candidates"
            :key="index"
            class="data-list"
          >
            <div class="name pr-4">{{ item.candidate }}</div>
            <div class="value" :style="`color: ${item.color}`">
              {{ item.value_str }}
            </div>
          </div>
        </div>
      </div>
    </transition>
    <svg ref="container">
      <g class="axis-group"></g>
      <g
        v-for="(item, index) in yAxis_group"
        :key="index"
        class="checks"
        :transform="`translate(${xScale(item) - check_width / 2}, 0)`"
      >
        <g
          :style="{
            opacity: hover === item || (active === item && !hover) ? 1 : 0,
          }"
        >
          <line
            :x1="check_width / 2"
            :x2="check_width / 2"
            :y1="margin.top"
            :y2="height - margin.bottom"
            stroke="#e0e1e1"
            style="transition: 'all 0.2s'"
          ></line>
        </g>
      </g>

      <!-- <g class="x-tick">
        <g
          v-for="(d, index) in yAxis_group"
          v-show="
            type === 'engagement'
              ? index == 0 || index == yAxis_group.length - 1
              : true
          "
          :key="index"
          :transform="`translate(${xScale(d)}, 0)`"
          :font-size="$mq === 'mobile' ? 10 : 13"
          fill="#5a5033"
        >
          <text
            :y="height - 10"
            :text-anchor="
              index === 0
                ? 'start'
                : index === yAxis_group.length - 1
                ? 'end'
                : 'middle'
            "
          >
            {{ dateDisplay(d) }}
          </text>
        </g>
      </g> -->

      <!-- <g class="y-tick">
        <text
          v-for="(item, index) in yAxisTick"
          :key="`${item}${index}`"
          :x="20"
          :y="yScale(item)"
          dominant-baseline="middle"
          text-anchor="end"
          :font-size="$mq === 'mobile' ? 10 : 13"
          fill="#5a5033"
        >
          <tspan v-if="item !== 0">
            {{ formatThousands(item) }}
          </tspan>
        </text>
      </g> -->

      <g class="y-axis-line">
        <!-- <line
          v-for="(item, index) in yAxisTick"
          :key="`${item}${index}`"
          :x1="margin.left"
          :y1="yScale(item)"
          :x2="width - margin.right"
          :y2="yScale(item)"
          stroke="#DADCE0"
        /> -->
      </g>

      <g class="g-lines">
        <g
          v-for="item in candidates"
          :key="`line-${item.candidate}`"
          class="line-group"
        >
          <!-- <g> -->
          <circle
            :fill="item.color"
            :cx="margin.left"
            :cy="yScale(item.data[0].value)"
            r="4"
          />
          <circle
            v-for="(d, index) in item.data"
            :key="index"
            :fill="item.color"
            :cx="xScale(d.date)"
            :cy="yScale(d.value)"
            r="4"
            :style="`opacity: ${
              hover === d.date ||
              (index === item.data.length - 1 && animate_start)
                ? '1'
                : '0'
            }`"
          />
          <g class="line-path">
            <path
              class="line"
              :d="line(item.data)"
              fill="none"
              :stroke="item.color"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="4"
            ></path>
          </g>
          <!-- </g> -->
          <!-- </g> -->
        </g>
      </g>

      <g class="g-labels">
        <g
          v-for="item in candidates"
          :key="`labels-${item.candidate}`"
          :transform="`translate(${xScale((item.data || {})[0].date)},${yScale(
            (item.data || {})[0].value
          )})`"
          class="labels-group"
        >
          <g
            class="labels"
            :transform="`scale(${item.highest_per_date ? 1.7 : 1})`"
          >
            <clipPath :id="`clip-${item.candidate}`">
              <use :xlink:href="`#circle-${item.candidate}`" />
            </clipPath>

            <circle
              :id="`circle-${item.candidate}`"
              class="circle"
              :r="$mq === 'mobile' ? 6.5 : 12"
              :fill="item.color"
              :stroke="item.color"
              :stroke-width="4"
            ></circle>
            <image
              class="image"
              :href="photo(item.candidate)"
              :height="$mq === 'mobile' ? 13 : 24"
              :width="$mq === 'mobile' ? 13 : 24"
              :x="$mq === 'mobile' ? -6.5 : -12"
              :y="$mq === 'mobile' ? -6.5 : -12"
              :clip-path="`url(#clip-${item.candidate})`"
            ></image>
          </g>
        </g>
      </g>

      <g class="checks-group" @mouseleave="hover = ''">
        <g
          v-for="(item, index) in yAxis_group"
          :key="index"
          class="checks"
          :transform="`translate(${xScale(item) - check_width / 2}, 0)`"
          @click="animate_finish ? onClickChecks(item) : false"
          @mouseover="checksEvent(item)"
        >
          <rect
            class="check-rect"
            :x="0"
            :y="margin.top"
            :height="height - margin.bottom"
            fill="none"
            :width="check_width"
            style="pointer-events: all"
          ></rect>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'
import moment from 'moment'
import numeral from 'numeral'
export default {
  props: {
    dataSet: {
      type: Array,
      default: () => [],
    },
    color: {
      type: Function,
      default: () => {},
    },
    photo: {
      type: Function,
      default: () => {},
    },
    animate: {
      type: Boolean,
      default: false,
    },
    activeChart: {
      type: null,
      default: '',
    },
    stackedBarChart: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'engagement',
    },
    duration: {
      type: Number,
      default: 20000,
    },
  },
  data() {
    return {
      width: 1000,
      height: 520,
      step: 8,
      left_tooltip: 0,
      // duration: 8000,
      hover: '',
      active: '',
      candidates: [],
      animate_finish: false,
      animate_start: false,
      margin: { top: 30, left: 30, right: 30, bottom: 30 },
    }
  },
  computed: {
    innerWidth() {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    formatThousands() {
      return d3.format(',')
    },
    candidate_group() {
      const group = _.groupBy(this.dataSet, 'candidate')
      return Object.keys(group)
    },
    yAxis_group() {
      // let data

      // if (this.type === 'engagement') {
      const group = _.groupBy(this.dataSet, 'date')
      return Object.keys(group)
      // } else {
      //   const group = _.groupBy(this.dataSet, 'value')
      //   data = Object.keys(group)
      // }
    },
    check_width() {
      const { length } = this.yAxis_group
      const contentWidth = this.width - this.margin.left - this.margin.right
      return contentWidth / (length - 1)
    },
    line() {
      return d3
        .line()
        .x((d) => this.xScale(d.date))
        .y((d) => this.yScale(d.value))

      // let fnLine = d3
      //   .line()
      //   .x((d) => this.xScale(d.date))
      //   .y((d) => this.yScale(d.value))

      // if (this.type === 'rank') {
      //   fnLine = fnLine.curve(d3.curveMonotoneX)
      // }

      // return fnLine
    },
    xScale() {
      return d3
        .scalePoint()
        .domain(this.yAxis_group)
        .range([this.margin.left, this.width - this.margin.right])
    },
    xAxis() {
      const { length } = this.yAxis_group
      let axis = d3
        .axisBottom(this.xScale)
        .tickFormat((d) => moment(d).add(543, 'years').format('DD MMM YY'))
        .ticks(length)
        .tickSize(1)
        .tickPadding(12)

      if (this.type === 'engagement') {
        axis = axis.tickValues(d3.extent(this.dataSet, (d) => d.date))
      }

      return axis
    },
    // yAxisTick() {
    //   return d3
    //     .scaleLinear()
    //     .domain([0, d3.max(this.dataSet, (d) => d.value)])
    // },
    yScale() {
      const maximum = d3.max(this.dataSet, (d) => d.value)
      // const domain = this.type === 'engagement' ? [0, maximum] : [maximum, 0]

      return d3
        .scaleLinear()
        .domain([0, maximum])
        .range([this.height - this.margin.bottom, this.margin.top])
        .nice()
    },
    yAxis() {
      let ticks = 9
      let tickFormat = (d) => this.formatkilo(d)
      if (this.type === 'rank') {
        const group = _.groupBy(this.dataSet, 'candidate')
        const keys = Object.keys(group)
        ticks = keys.length
        tickFormat = (d) => {
          if (d === 0) return d
          else return keys.length + 1 - d
        }
      }

      return d3
        .axisLeft(this.yScale)
        .tickFormat(tickFormat)
        .ticks(ticks)
        .tickSize(-this.innerWidth)
        .tickPadding(6)
    },
    stackedScale() {
      const clientWidth = _.get(window, 'clientWidth', 0)
      const maximum = d3.max(this.dataSet, (d) => d.value)

      return d3.scaleLinear().domain([0, maximum]).range([0, clientWidth])
    },
    transitionPath() {
      return d3.transition().ease(d3.easeLinear).duration(this.duration)
    },
    // maximum() {
    //   const max = d3.max(this.yAxisTick)
    //   const valueMax = d3.max(this.dataSet, (d) => d.value)
    //   return max > valueMax ? max : valueMax
    // },
    ready() {
      return this.animate && this.candidates !== 0
    },
    active_data() {
      const value = this.hover || this.active
      const tooltipData = []
      const order = this.type === 'engagement' ? 'desc' : 'asc'
      this.candidates.forEach((d) => {
        const arrData = _.get(d, 'data', [])
        const find = arrData.find((d) => d.date === value)
        if (!find) return
        const pick = _.pick(find, ['candidate', 'value'])
        tooltipData.push({
          ...pick,
          color: d.color,
          value_str: this.formatkilo(pick.value),
        })
      })
      return {
        date_display: this.dateDisplay(value),
        date: value,
        candidates: _.orderBy(tooltipData, 'value', order),
      }
    },
  },
  watch: {
    hover: {
      handler() {
        this.leftTooltip()
      },
      immediate: true,
    },
    ready: {
      handler(val) {
        if (!val) return
        this.$nextTick(() => {
          this.animateStart()
        })
      },
      immediate: true,
    },
    animate_finish(val) {
      if (val && !this.animate_start) this.animate_start = true
    },
    activeChart(val) {
      this.onClickChecks(val)
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  async mounted() {
    this.resizeHandler()
    await this.setDataGroupCandidate()
    const svg = d3.select('svg')

    svg
      .select('.axis-group')
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(this.yAxis)
      .call((d) => {
        d.selectAll('.tick')
          .append('line')
          .attr('class', 'line-tick')
          .attr('x2', 7)
      })
      .call((d) => {
        d.selectAll('.tick text').style('text-anchor', 'start').attr('x', -26)
      })

    svg
      .select('.axis-group')
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.height - this.margin.top})`)
      .call(this.xAxis)

    const linePath = d3.selectAll('.line-path').data(this.candidates)
    d3.selectAll('.labels-group').data(this.candidates)
    const line = linePath.selectAll('.line')
    line.each(function () {
      const select = d3.select(this)
      const pathLength = select.node().getTotalLength()
      select
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-dasharray', pathLength)
    })
    // const xScale = this.xScale
    // const yScale = this.yScale
    // labelsGroup.each(function (d) {
    //   d3.select(this).attr(
    //     'transform',
    //     `translate(${xScale(_.get(d, 'data[0].date'))},${yScale(
    //       _.get(d, 'data[0].value')
    //     )})`
    //   )
    // })
  },
  methods: {
    resizeHandler() {
      this.width = this.$refs.container.clientWidth
      this.height = this.$refs.container.clientHeight
    },
    animateStart() {
      this.setAnimatePathLabel()
      this.setAnimatePathLine()
    },
    formatkilo(num) {
      return numeral(num).format('0 a')
    },
    dateDisplay(date) {
      return moment(date).add(543, 'years').format('DD MMM YY')
    },
    dateFormat(date) {
      return moment(date).format('yyyy-MM-DD')
    },
    handleActiveLegend(item) {
      if (_.isEqual(this.active, item)) {
        this.active = ''
      } else {
        this.active = item
      }
    },
    async leftTooltip() {
      const margin = 30 + this.margin.left
      const value = this.hover || this.active
      let left = this.xScale(value) - margin
      await this.$nextTick()
      const elTooltip = this.$refs.tooltip
      if (!elTooltip) return
      const tooltipW = elTooltip.clientWidth
      if (left - tooltipW < -20) {
        left = margin
      } else {
        left = left - tooltipW + this.margin.left
      }
      this.left_tooltip = left
    },
    // circleSize(data = {}) {
    //   // const valueMax = d3.max(this.dataSet, (d) => d.value)
    //   const maxRadius = this.$mq === 'mobile' ? 26 : 40
    //   const smallRadius = this.$mq === 'mobile' ? 13 : 20
    //   return data.highest_per_date ? maxRadius : smallRadius
    // },
    setAnimatePathLine() {
      const _self = this
      const line = d3.selectAll('.line-path').selectAll('.line')
      line.each(function () {
        d3.select(this)
          .transition(_self.transitionPath)
          .delay(1000)
          .attr('stroke-dashoffset', 0)
      })
    },
    setAnimatePathLabel() {
      const _self = this
      const labels = d3.selectAll('.labels-group')

      const animate = () => {
        labels.each(function (g, i) {
          d3.select(this).call(() => {
            let index = 0
            const data = _.get(g, 'data', [])
            const { length } = data
            const animate = () => {
              const d = _.get(data, `[${index}]`, {})
              const time = d.time

              d3.select(this)
                .select('.labels')
                .transition()
                .delay(time)
                .duration(400)
                .ease(d3.easeCircleIn)
                .attr('transform', `scale(${d.highest_per_date ? 1.7 : 1})`)

              d3.select(this)
                .transition()
                .duration(time)
                .ease(d3.easeLinear)
                .attr(
                  'transform',
                  `translate(${_self.xScale(d.date)},${_self.yScale(d.value)})`
                )
                .on('end', () => {
                  if (index < length) animate()
                  else _self.animate_finish = true
                })
              index++
            }

            animate()
          })
        })
      }

      this.animate_finish = false

      setTimeout(() => {
        labels.call(() => animate())
      }, 1000)
    },
    handleHover(el) {
      d3.select(el).moveToFront()
    },
    min(data) {
      return d3.min(data, (d) => d.value)
    },
    calDistance(data, index, direction = 'forward') {
      const start = direction === 'forward' ? -1 : +1
      const d1 = _.get(data, `[${index + start}]`, {})
      const d2 = _.get(data, `[${index}]`, {})

      if (_.isEmpty(d1)) return 0
      const x = this.xScale(d1.date) - this.xScale(d2.date)
      const y = this.yScale(d1.value) - this.yScale(d2.value)
      return Math.hypot(x, y) || 0
    },
    setDataGroupCandidate() {
      const setFormatData = (data) => {
        const dataset = data.map((d, index) => {
          const distance = this.calDistance(data, index, 'forward')
          const distanceBk = this.calDistance(data, index, 'black')
          return {
            ...d,
            distance,
            distanceBk,
          }
        })

        const pathLength = dataset.reduce((acc, curr) => acc + curr.distance, 0)

        const res = dataset.map((d) => {
          const time = (this.duration * d.distance) / pathLength
          const timeBk = (this.duration * d.distanceBk) / pathLength
          return {
            ...d,
            time,
            timeBk,
            pathLength,
          }
        })

        return res
      }

      const candidates = []
      const groups = _.groupBy(this.dataSet, 'candidate')

      for (const key in groups) {
        const arr = _.get(groups, key, [])
        const data = setFormatData(arr)

        candidates.push({
          candidate: key,
          min: d3.min(arr, (d) => d.value),
          max: d3.max(arr, (d) => d.value),
          highest_per_date: _.get(data, '[0].highest_per_date'),
          color: this.color(key),
          data,
        })
      }
      this.candidates = candidates
      console.log(candidates)
    },
    checksEvent: _.throttle(function (val) {
      // if (this.type === 'engagement') {
      //   this.hover = this.dateFormat(val)
      // } else {
      this.hover = val
      // }
    }, 150),
    sumRangeTimeData(data = []) {
      return data
        .filter((d) => this.handleCondition(d))
        .reduce((acc, curr) => {
          return (acc += curr.time)
        }, 0)
    },
    onClickChecks(date) {
      this.active = date
      this.$emit('change', this.active_data)
      this.$emit('update:activeChart', date)

      const labelsGroup = d3.selectAll('.labels-group').data(this.candidates)

      labelsGroup
        .transition()
        .duration(600)
        .attr('transform', (group) => {
          const d = group.data.find((d) => d.date === date) || {}
          return `translate(${this.xScale(d.date)},${this.yScale(d.value)})`
        })

      labelsGroup
        .select('.labels')
        .transition()
        .duration(400)
        .ease(d3.easeCircleIn)
        .attr('transform', (group) => {
          const d = group.data.find((d) => d.date === date) || {}
          return `scale(${d.highest_per_date ? 1.7 : 1})`
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.line-chart-race {
  width: 100%;
  height: 100%;
  position: relative;
}
.tooltip-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: all 0.2s;
  pointer-events: none;
  .tooltip {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: #ffffff;
    padding: 18px;
    min-width: 170px;
    .title {
      font-weight: bold;
    }
    .data-list {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .name {
      }
      .value {
      }
    }
  }
}
svg {
  width: 100%;
  height: 100%;
  // @include mobile() {
  //   height: auto;
  //   min-height: 420px;
  // }
  ::v-deep {
    .x-axis,
    .y-axis {
      .tick text {
        font-family: 'Anuphan';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        fill: #ffffff;
      }
    }
    .x-axis {
      .domain {
        stroke: #ffffff;
      }
      .tick line {
        display: none;
      }
      .tick:first-of-type text {
        text-anchor: start;
      }
      .tick:last-of-type text {
        text-anchor: end;
      }
    }
    .y-axis {
      .domain {
        display: none;
      }
      .tick {
        text {
          text-anchor: start;
        }
        line {
          stroke: #373746;
        }
        .line-tick {
          stroke: #ffffff;
        }
      }
    }
  }
}
text {
  font-family: Prompt;
}
.line-group {
  transition: all 0.3s;
}
.line-group.not-active {
  opacity: 0.1;
}
.checks {
  cursor: pointer;
}
// .g-lines:hover .line-group {
//   opacity: 0.1;
// }
// .g-lines:hover .line-group:hover {
//   opacity: 1 !important;
// }
.legend-wrapper {
  margin-top: 14px;
  .legend {
    max-height: 260px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    // @include mobile() {
    //   max-height: 210px;
    // }
    margin: 0 -8px;
    // transform: translateX(10%);
  }
  .legend-group.not-active {
    opacity: 0.3;
  }
  .legend-group {
    min-width: 270px;
    cursor: default;
    // @include mobile() {
    //   flex: 0 0 auto;
    //   min-width: 166px;
    // }
    padding: 5px 8px;
    transition: all 0.3s;
    > span {
      max-width: 100%;
      width: fit-content;
      display: flex;
    }
    .circle {
      flex: 0 0 auto;
      width: 25px;
      height: 25px;
      border-radius: 20px;
      // @include mobile() {
      //   width: 22px;
      //   height: 22px;
      // }
    }
    .label {
      flex: 1;
      padding: 0 0 0 8px;
      // @include mobile() {
      //   padding: 2px 0 0 8px;
      // }
      .name {
      }
      .rank {
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
