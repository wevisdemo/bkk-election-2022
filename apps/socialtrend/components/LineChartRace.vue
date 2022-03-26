<template>
  <div class="line-chart-race">
    <transition name="fade">
      <div
        v-if="hover || active"
        ref="tooltip"
        class="tooltip-wrapper"
        :style="`left: ${left_tooltip}px`"
      >
        <div class="tooltip typo-b5">
          <div class="title">{{ active_data.date }}</div>
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
      <g
        v-for="(item, index) in yAxis_group"
        :key="index"
        class="checks"
        :transform="`translate(${xScale(item) - check_width / 2}, 0)`"
      >
        <g
          :style="{
            opacity:
              dateFormat(hover) === dateFormat(item) ||
              (dateFormat(active) === dateFormat(item) && !hover)
                ? 1
                : 0,
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

      <g class="x-tick">
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
      </g>

      <g class="y-tick">
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
      </g>

      <g class="y-axis-line">
        <line
          v-for="(item, index) in yAxisTick"
          :key="`${item}${index}`"
          :x1="margin.left"
          :y1="yScale(item)"
          :x2="width - margin.right"
          :y2="yScale(item)"
          stroke="#DADCE0"
        />
      </g>

      <g class="g-lines">
        <g
          v-for="item in candidates"
          :key="item.menu"
          :class="[
            'line-group',
            {
              'not-active': active.menu && active.menu !== item.menu,
            },
          ]"
          @click="handleActiveLegend(item)"
          @mouseleave="active = ''"
        >
          <g>
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
                dateFormat(hover) === dateFormat(d.date) ||
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
          </g>

          <g :id="item.menu" class="labels-group">
            <g class="end-circle-container">
              <!-- <circle class="circle bg" r="13" fill="#ffffff"></circle> -->
              <circle class="circle bg" :fill="item.color" r="4" />

              <circle
                class="circle bg"
                :r="circleSize(item.max)"
                :fill="item.color"
              ></circle>
              <image
                :href="require(`~/assets/images/Vector.png`)"
                :height="circleSize(item.max) * 2 - 4"
                :width="circleSize(item.max) * 2 - 4"
                :x="circleSize(item.max) * -1 + 2"
                :y="circleSize(item.max) * -1 + 2"
              ></image>
            </g>
            <!-- <g v-if="$mq !== 'mobile'" class="name">
            <text
              class="name-bg"
              alignment-baseline="central"
              dominant-baseline="central"
              stroke-width="0.25em"
              :fill="item.color"
              font-size="14"
              x="22"
              y="0"
              font-weight="bold"
              opacity="1"
            >
              <tspan class="name-label">{{ item.menu }}</tspan>
              <tspan class="rank">{{ item.max }}</tspan>
            </text>
          </g> -->
          </g>
        </g>
      </g>

      <g class="checks-group" @mouseleave="hover = ''">
        <g
          v-for="(item, index) in yAxis_group"
          :key="index"
          class="checks"
          :transform="`translate(${xScale(item) - check_width / 2}, 0)`"
          @click="
            animate_finish && type === 'engagement'
              ? onClickChecks(item)
              : false
          "
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
export default {
  props: {
    data_set: {
      type: Array,
      default: () => [],
    },
    animate: {
      type: Boolean,
      default: false,
    },
    active_chart: {
      type: null,
      default: '',
    },
    type: {
      type: String,
      default: 'engagement',
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
      active_date: '',
      old_active_date: 2020,
      candidates: [],
      animate_finish: false,
      animate_start: false,
      // margin: { top: 40, left: 70, right: 150, bottom: 40 },
    }
  },
  computed: {
    duration() {
      return this.$mq !== 'desktop' ? 7500 : 12500
    },
    margin() {
      return {
        top: 30,
        left: 24,
        right: 24,
        bottom: 30,
      }
    },
    formatkilo() {
      return d3.format('~s')
    },
    formatThousands() {
      return d3.format(',')
    },
    candidate_group() {
      const group = _.groupBy(this.data_set, 'candidate')
      return Object.keys(group)
    },
    color() {
      return d3
        .scaleOrdinal()
        .domain(this.candidate_group)
        .range([
          '#e41a1c',
          '#377eb8',
          '#4daf4a',
          '#984ea3',
          '#ff7f00',
          '#ffff33',
          '#a65628',
          '#f781bf',
          '#999999',
        ])
    },
    yAxis_group() {
      // let data

      // if (this.type === 'engagement') {
      const group = _.groupBy(this.data_set, 'date')
      const data = Object.keys(group).map((d) => new Date(d))
      // } else {
      //   const group = _.groupBy(this.data_set, 'value')
      //   data = Object.keys(group)
      // }
      return data
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
    },
    yScale() {
      const domain =
        this.type === 'engagement' ? [0, this.maximum] : [this.maximum, 1]

      return d3
        .scaleLinear()
        .domain(domain)
        .range([this.height - this.margin.bottom, this.margin.top])
    },
    xScale() {
      return d3
        .scaleTime()
        .domain(d3.extent(this.data_set, (d) => d.date))
        .range([this.margin.left, this.width - this.margin.right])
    },
    transitionPath() {
      return d3.transition().ease(d3.easeLinear).duration(this.duration)
    },
    maximum() {
      const max = d3.max(this.yAxisTick)
      const valueMax = d3.max(this.data_set, (d) => d.value)
      return max > valueMax ? max : valueMax
    },
    yAxisTick() {
      const ticks = this.type === 'engagement' ? 6 : this.yAxis_group.length
      const res = d3
        .scaleLinear()
        .domain([0, d3.max(this.data_set, (d) => d.value)])
        .nice()
        .ticks(ticks)
      return res
    },
    ready() {
      return this.animate && this.candidates !== 0
    },
    active_data() {
      const value = this.hover || this.active
      const tooltipData = []
      const order = this.type === 'engagement' ? 'desc' : 'asc'
      this.candidates.forEach((d) => {
        const arrData = _.get(d, 'data', [])
        const find = arrData.find((d) => this.isDateSame(d.date, value))
        if (!find) return
        const pick = _.pick(find, ['candidate', 'value'])
        tooltipData.push({
          ...pick,
          color: d.color,
          value_str: this.formatkilo(pick.value),
        })
      })
      return {
        date: this.dateDisplay(value),
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
        // if (!val) return
        this.animateStart()
      },
      immediate: true,
    },
    animate_finish(val) {
      if (val && !this.animate_start) this.animate_start = true
    },
    active_chart(val) {
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
    await this.setDataGroupMenu()
    const linePath = d3.selectAll('.line-path').data(this.candidates)
    const lineGroup = d3.selectAll('.line-group').data(this.candidates)
    const labelsGroup = d3.selectAll('.labels-group').data(this.candidates)
    d3.selectAll('.legend-group').data(this.candidates)
    lineGroup.on('mouseover', function (d) {
      d3.select(this).raise()
    })
    const line = linePath.selectAll('.line')
    line.each(function () {
      const select = d3.select(this)
      const pathLength = select.node().getTotalLength()
      select
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-dasharray', pathLength)
    })
    const xScale = this.xScale
    const yScale = this.yScale
    labelsGroup.each(function (d) {
      d3.select(this).attr(
        'transform',
        `translate(${xScale(_.get(d, 'data[0].date'))},${yScale(
          _.get(d, 'data[0].value')
        )})`
      )
    })

    this.animateStart()
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
      let left =
        this.xScale(this.type === 'engagement' ? new Date(value) : value) -
        margin
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
    circleSize(val) {
      const valueMax = d3.max(this.data_set, (d) => d.value)
      const maxRadius = this.$mq === 'mobile' ? 26 : 40
      const smallRadius = this.$mq === 'mobile' ? 13 : 20
      return val === valueMax ? maxRadius / 2 : smallRadius / 2
    },
    setAnimatePathLine() {
      const _self = this
      const line = d3.selectAll('.line-path').selectAll('.line')
      line.each(function () {
        d3.select(this)
          .transition(_self.transitionPath)
          .delay(100)
          .attr('stroke-dashoffset', 0)
      })
    },
    isDateSame(date, val) {
      return moment(date).isSame(new Date(val))
    },
    setAnimatePathLabel() {
      const _self = this
      const labels = d3.selectAll('.labels-group')

      const animate = () => {
        labels.each(function (g, i) {
          d3.select(this).call(() => {
            let index = 0
            let data = g.data
            data = _.chain(g.data)
              .filter((d) => _self.handleCondition(d))
              .orderBy(
                'date',
                _self.old_active_date > _self.active_date && _self.active_date
                  ? 'desc'
                  : 'asc'
              )
              .value()
            const { length } = data
            const animate = () => {
              const d = _.get(data, `[${index}]`, {})
              const time =
                _self.active_date && _self.old_active_date > _self.active_date
                  ? d.timeBk
                  : d.time
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
      labels.call(() => animate())
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
    setDataGroupMenu() {
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
      const groups = _.groupBy(this.data_set, 'candidate')

      for (const key in groups) {
        const arr = _.get(groups, key, [])
        const data = {
          candidate: key,
          min: d3.min(arr, (d) => d.value),
          max: d3.max(arr, (d) => d.value),
          color: this.color(key),
          data: setFormatData(arr),
        }
        candidates.push(data)
      }
      this.candidates = candidates
      console.log(candidates)
    },
    checksEvent: _.throttle(function (val) {
      if (this.type === 'engagement') {
        this.hover = this.dateFormat(val)
      } else {
        this.hover = val
      }
    }, 150),
    sumRangeTimeData(data = []) {
      return data
        .filter((d) => this.handleCondition(d))
        .reduce((acc, curr) => {
          const currTime =
            this.old_active_date > this.active_date ? curr.timeBk : curr.time
          return (acc += currTime)
        }, 0)
    },
    handleCondition(d) {
      let cond = true
      if (this.active_date && this.old_active_date < this.active_date)
        cond = this.active_date >= d.date && d.date > this.old_active_date
      if (this.active_date && this.old_active_date > this.active_date)
        cond = this.active_date <= d.date && d.date < this.old_active_date
      return cond
    },
    onClickChecks(date) {
      // const _self = this
      this.active = date
      // this.old_active_date = _.clone(this.active_date) || 2020
      // this.active_date = item
      this.$emit('change', this.active_data)
      this.$emit('update:active_chart', date)
      // if (this.old_active_date === this.active_date) return
      // animate path line
      // const path = d3.selectAll('.line-path')
      // path.each(function (d, i) {
      //   const rangedate = d.data.filter((d) => d.date > _self.active_date)
      //   const dashoffset = rangedate.reduce(
      //     (acc, curr) => acc + curr.distance,
      //     0
      //   )
      //   const time = _self.sumRangeTimeData(d.data)

      //   d3.select(this)
      //     .selectAll('.line')
      //     .transition()
      //     .ease(d3.easeLinear)
      //     .duration(time)
      //     .attr('stroke-dashoffset', dashoffset)
      // })

      // animate position labels
      // this.setAnimatePathLabel()

      d3.selectAll('.labels-group')
        .data(this.candidates)
        .transition()
        .duration(600)
        .attr('transform', (group) => {
          const d =
            group.data.find(
              (d) => this.dateFormat(d.date) === this.dateFormat(date)
            ) || {}
          return `translate(${this.xScale(d.date)},${this.yScale(d.value)})`
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
