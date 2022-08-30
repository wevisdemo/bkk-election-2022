<template>
  <div ref="container" class="line-chart-race">
    <div ref="tooltip" class="tooltip-wrapper" style="opacity: 0">
      <div class="tooltip typo-b5">
        <div class="title mb-1"></div>
        <div class="description typo-b6"></div>

        <div
          v-for="(item, index) in engagement_candidates"
          :key="`${(item || {}).candidate}-${index}`"
          :class="`data-list content-${index}`"
        >
          <div class="name pr-4"></div>
          <div class="value"></div>
        </div>
      </div>
    </div>

    <svg>
      <g class="axis-group">
        <text :y="innerHeight" class="text empty">
          <tspan dy="1.2em" x="0">ไม่มี</tspan>
          <tspan dy="1.2em" x="0">ข้อมูล</tspan>
        </text>
      </g>
      <g>
        <rect
          class="checks"
          stroke-width="1px"
          width=".5px"
          :height="height - margin.top - margin.bottom"
          :y="margin.top"
          opacity="0"
          stroke="#e0e1e1"
          style="transition: 'all 0.2s'"
        ></rect>
      </g>

      <g v-if="engagement_candidates != 0" class="g-lines">
        <g
          v-for="item in engagement_candidates"
          :key="`line-${item.name || ''}`"
          class="line-group"
        >
          <g class="circle">
            <circle
              :fill="item.color"
              :cx="margin.left"
              :cy="yScale(item.data[0].count)"
              r="4"
            />
            <circle
              v-for="(d, index) in item.data"
              :key="index"
              :fill="item.color"
              :cx="xScale(d.date)"
              :cy="yScale(d.count)"
              r="4"
              :class="[
                `dots-${d.date}`,
                { 'mark-dots': index !== item.data.length - 1 },
              ]"
              style="opacity: 0"
            />
          </g>
          <g class="line-path">
            <path
              class="line"
              :d="line(item.data)"
              fill="none"
              :stroke="item.color"
              stroke-linejoin="round"
              stroke-linecap="round"
              :stroke-width="$mq === 'mobile' ? 2 : 4"
            ></path>

            <path
              :id="`line-seg-${item.name}`"
              class="line-seg"
              :d="line(item.data)"
              fill="none"
              stroke="none"
              stroke-width="2"
            ></path>
          </g>
          <!-- </g> -->
          <!-- </g> -->
        </g>
      </g>

      <g class="g-marker">
        <g
          v-for="item in engagement_candidates"
          :key="`marker-${item.name}`"
          :transform="`translate(${xScale((item.data || {})[0].date)},${yScale(
            (item.data || {})[0].count
          )})`"
          class="marker-group"
        >
          <g class="marker" :transform="`scale(1)`">
            <clipPath :id="`clip-${item.name}`">
              <use :xlink:href="`#circle-${item.name}`" />
            </clipPath>

            <circle
              :id="`circle-${item.name}`"
              class="circle"
              :r="$mq === 'mobile' ? 6.5 : 12"
              :fill="item.color"
              :stroke="item.color"
              :stroke-width="4"
            ></circle>
            <image
              class="image"
              :href="item.image"
              :height="$mq === 'mobile' ? 13 : 24"
              :width="$mq === 'mobile' ? 13 : 24"
              :x="$mq === 'mobile' ? -6.5 : -12"
              :y="$mq === 'mobile' ? -6.5 : -12"
              :clip-path="`url(#clip-${item.name})`"
            ></image>
          </g>
        </g>
      </g>

      <rect
        :width="innerWidth"
        :height="innerHeight"
        :x="margin.left"
        :y="margin.top"
        class="listening-rect"
        fill="transparent"
        @mouseover="onMouseHover"
        @mousemove="onMouseMove"
        @mouseleave="onMouseleave"
        @click="
          animate_finish && type === 'engagement' ? onClickChecks() : false
        "
      ></rect>
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
    width: {
      type: Number,
      default: 1000,
    },
    height: {
      type: Number,
      default: 500,
    },
    engagement_raw_data: {
      type: Array,
      default: () => [],
    },
    engagement_candidates: {
      type: Array,
      default: () => [],
    },
    color: {
      type: Function,
      default: () => {},
    },
    animate: {
      type: Boolean,
      default: true,
    },
    play_animation: {
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
    start_date: {
      type: String,
      default: '',
    },
    xAxisStart: {
      type: String,
      default: '',
    },
    xAxisEnd: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      step: 8,
      left_tooltip: 0,
      point: 0,
      hover: '',
      active: '',
      animate_finish: false,
      animate_start: false,
    }
  },
  computed: {
    margin() {
      return {
        top: 30,
        left: 32,
        right: this.$mq === 'mobiel' ? 22 : 30,
        bottom: 30,
      }
    },
    innerWidth() {
      return this.width - this.margin.left - this.margin.right
    },
    innerHeight() {
      return this.height - this.margin.top - this.margin.bottom
    },
    formatThousands() {
      return d3.format(',')
    },
    date_list() {
      return _.map(this.engagement_raw_data, 'date')
    },
    line() {
      return d3
        .line()
        .x((d) => this.xScale(d.date))
        .y((d) => this.yScale(d.count))
    },
    xScaleActiveDate() {
      return d3
        .scaleQuantize()
        .domain([this.margin.left, this.width - this.margin.right])
        .range(this.date_list)
    },
    xScale() {
      return d3
        .scalePoint()
        .domain(this.date_list)
        .range([this.margin.left, this.width - this.margin.right])
    },
    xAxis() {
      const { length } = this.engagement_raw_data

      let axis = d3
        .axisBottom(this.xScale)
        .tickFormat((d) => {
          let format = d
          if (this.type === 'engagement')
            format = moment(d).add(543, 'years').format('DD MMM YY')

          return format
        })
        .ticks(length)
        .tickSize(1)
        .tickPadding(12)

      if (this.type === 'engagement') {
        axis = axis.tickValues(
          d3.extent(this.engagement_raw_data, (d) => d.date)
        )
      }

      return axis
    },
    yScale() {
      const maximum = d3.max(this.engagement_raw_data, (d) => d.maximum.count)

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
        const { length } = this.engagement_candidates
        ticks = length
        tickFormat = (d) => {
          return d === 0 ? '' : length + 1 - d
        }
      }

      return d3
        .axisLeft(this.yScale)
        .tickFormat(tickFormat)
        .ticks(ticks)
        .tickSize(-this.innerWidth)
    },
    transitionPath() {
      return d3.transition().ease(d3.easeLinear).duration(this.duration)
    },
    interaction() {
      return this.hover || this.active
    },
  },
  watch: {
    play_animation: {
      handler(val) {
        if (!val || !this.animate) return
        this.$nextTick(() => {
          this.handleStartAnimation()
        })
      },
      immediate: true,
    },
    animate_finish(val) {
      if (val && !this.animate_start) {
        this.setShowDotsEnd()
      }
    },
    activeChart(val) {
      this.active = val
      this.onMouseMove()
      this.updateAnimatePathLabel(val, 800)
    },
  },
  mounted() {
    this.drawLineChart()
  },
  methods: {
    handleStartAnimation() {
      setTimeout(() => {
        this.setAnimatePathLine()
        this.updateAnimatePathLabel(this.xAxisEnd, this.duration)
      }, 1000)
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
    drawLineChart() {
      const svg = d3.selectAll('svg')

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

          d.selectAll('.tick text')
            .style('text-anchor', 'start')
            .attr('x', -this.margin.left)
        })

      svg
        .select('.axis-group')
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${this.height - this.margin.top})`)
        .call(this.xAxis)

      svg
        .select('.axis-group .text.empty')
        .style('opacity', this.type === 'rank' ? 1 : 0)

      if (this.animate) {
        this.resetLinePath()
      } else {
        this.setShowDotsEnd()
        this.updateAnimatePathLabel(this.xAxisEnd, 0)
      }
    },
    resetLinePath() {
      d3.selectAll('.line-path .line').each(function () {
        const select = d3.select(this)
        const l = select.node().getTotalLength()
        select.attr('stroke-dashoffset', l).attr('stroke-dasharray', l)
      })
    },
    onClickChecks() {
      const mousePosition = d3.select('.checks').attr('x')
      const date = this.xScaleActiveDate(mousePosition)
      if (date === this.active) return
      this.active = date
      this.$emit('change', date)
    },
    onMouseHover(e) {
      d3.select('.checks').style('opacity', 1)
      d3.select('.tooltip-wrapper').style('opacity', 1)
    },
    onMouseleave() {
      if (this.active) {
        this.onMouseMove()
        return
      }
      d3.select('.checks').style('opacity', 0)
      d3.selectAll('.mark-dots').style('opacity', 0)
      d3.select('.tooltip-wrapper').style('opacity', 0)
    },
    onMouseMove: _.throttle(function (e) {
      let xhoveredDate = this.active
      if (e) {
        const mousePosition = _.get(e, 'x', 0)
        xhoveredDate = this.xScaleActiveDate(mousePosition)
        this.hover = xhoveredDate
      }
      d3.selectAll('.mark-dots').style('opacity', 0)
      d3.selectAll(`.dots-${xhoveredDate}`).style('opacity', 1)
      d3.select('.checks').attr('x', this.xScale(xhoveredDate))

      this.handleTooltip(xhoveredDate)
    }, 100),
    handleTooltip: _.debounce(function (date) {
      let title = this.dateDisplay(date)
      let description = ''
      const curr = this.engagement_raw_data.find((d) => d.date === date) || {}
      if (this.type === 'rank') {
        title = `สัปดาห์ที่ ${curr.date}`
        description = `${this.dateDisplay(curr.date_from)} - ${this.dateDisplay(
          curr.date_to
        )}`
      }
      const candidates = _.chain(curr)
        .get('engagements', [])
        .map((d) => {
          let count = ''
          if (this.type === 'rank') {
            count =
              d.count === 0
                ? 'ไม่มีข้อมูล'
                : this.engagement_candidates.length + 1 - d.count
          } else {
            count = this.formatkilo(d.count)
          }

          return {
            ...d,
            count_str: count,
          }
        })
        .orderBy('count', 'desc')
        .value()

      const tooltip = d3.select('.tooltip')

      tooltip.select('.title').html(title)
      tooltip.select('.description').html(description)

      candidates.forEach((d, i) => {
        const dataList = d3.select(`.content-${i}`)
        dataList.select('.name').html(d.name)
        dataList.select('.value').html(d.count_str).style('color', d.color)
      })

      // Position left
      const margin = 30 + this.margin.left
      let left = this.xScale(date) - margin
      const elTooltip = this.$refs.tooltip
      if (!elTooltip) return
      const tooltipW = elTooltip.clientWidth
      if (left - tooltipW < -20) {
        left = margin
      } else {
        left = left - tooltipW + this.margin.left
      }

      d3.select('.tooltip-wrapper').style('left', `${left}px`)
    }, 50),
    setAnimatePathLine() {
      const _self = this
      const line = d3.selectAll('.line')
      line.each(function () {
        d3.select(this)
          .transition(_self.transitionPath)
          .attr('stroke-dashoffset', 0)
      })
    },
    clearAnimatePathLine() {
      d3.selectAll('.line').call((d) => d.transition())
    },
    setShowDotsEnd() {
      d3.selectAll(`dots-${this.xAxisEnd}`).style('opacity', 1)
    },
    updateAnimatePathLabel(val, duration) {
      const _self = this
      const diff = moment(val).diff(this.xAxisStart, 'days')
      const nextPoint = diff

      // Only include points between existing and new point.
      const line = d3
        .line()
        .x((d) => this.xScale(d.date))
        .y((d) => this.yScale(d.count))
        .defined(
          (d, i) =>
            (i <= nextPoint && i >= this.point) ||
            (i <= this.point && i >= nextPoint)
        )
      // Update path.
      d3.selectAll('.line-path .line-seg')
        .data(this.engagement_candidates)
        .each(function (d) {
          d3.select(this).attr('d', line(d.data))
        })

      // Transition marker from point to nextPoint.
      const updateMarkerSize = (select, d) => {
        const highest = _.get(d, 'data', [])
          .filter((d) => d.date === val)
          .find((d) => d.maximum.name === d.name)
        // const highest = _.get(curr, 'highest_per_date')
        select
          .select('.marker')
          .transition()
          .duration(250)
          .attr('transform', `scale(${highest ? 1.7 : 1})`)
      }

      d3.selectAll('.marker-group')
        .data(this.engagement_candidates)
        .each(function (d, i) {
          const lineSeg = d3.select(`#line-seg-${d.name}`)

          d3.select(this)
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attrTween(
              'transform',
              nextPoint > _self.point
                ? _self.translateRight(lineSeg.node())
                : _self.translateLeft(lineSeg.node())
            )
            .on('end', () => {
              _self.point = nextPoint
              _self.animate_finish = true

              updateMarkerSize(d3.select(this), d)
            })
        })
    },
    translateRight(node) {
      // Tween function for moving to right.
      const l = node.getTotalLength()
      return () => {
        return (t) => {
          const p = node.getPointAtLength(t * l)
          return 'translate(' + p.x + ',' + p.y + ')'
        }
      }
    },
    translateLeft(node) {
      // Tween function for moving to left.
      const l = node.getTotalLength()
      return () => {
        return (t) => {
          const p = node.getPointAtLength((1 - t) * l)
          return 'translate(' + p.x + ',' + p.y + ')'
        }
      }
    },
    handleHover(el) {
      d3.select(el).moveToFront()
    },
    checksEvent: _.throttle(function (val) {
      this.hover = val
    }, 150),
    sumRangeTimeData(data = []) {
      return data
        .filter((d) => this.handleCondition(d))
        .reduce((acc, curr) => {
          return (acc += curr.time)
        }, 0)
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
    .description {
      font-weight: 400;
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
    // .x-axis,
    // .y-axis {
    .axis-group {
      .tick text,
      .text {
        font-family: 'Anuphan';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        fill: #ffffff;
      }
      .text.disable {
        opacity: 0;
        visibility: hidden;
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
  .listening-rect {
    cursor: pointer;
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
