<template>
  <div>
    <div
      class="stacked-bar-chart fixed top-0 left-0 right-0 bottom-0 bg-black flex sm:flex-col"
      style="z-index: -1"
    >
      <div
        v-for="item in candidates"
        :key="item.value"
        class="candidate px-0.5 opacity-20"
      >
        <img :src="item.image" alt="" class="w-full h-full object-cover" />
      </div>
    </div>

    <div>
      <div class="hero w-full h-screen px-10 sm:p-5">
        <div
          class="container mx-auto h-full flex items-center justify-center relative"
        >
          <div class="text-center text-white typo-b3">
            <div class="text-left sm:text-center mx-auto max-w-max">
              <span>
                ในช่วง
                <span class="font-bold">{{ last_day }} วัน</span> ที่ผ่านมา
              </span>
              <br v-if="$mq === 'mobile'" />
              <div class="select-candidate" :style="`background: #A8FF3D`">
                <span class="label">{{
                  candidate ? candidate : socialtrend_current.candidate
                }}</span>
                <el-select v-model="candidate" placeholder=" ">
                  <el-option
                    v-for="item in candidate_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    class="typo-u2"
                  >
                  </el-option>
                </el-select>
              </div>
              <span>ถูกพูดถึงในโลกโซเชียล</span>
            </div>
            <div v-if="socialtrend_current.total_mention">
              <span class="font-bold"
                >{{ format(socialtrend_current.total_mention) }} ข้อความ
                โดยมีคำว่า</span
              >

              <br v-if="$mq === 'mobile'" />
              <span
                v-for="(item, index) in socialtrend_current.top_keywords"
                :key="item.candidate"
                class="whitespace-nowrap"
              >
                <span class="font-bold" style="color: #a8ff3d">
                  {{ item.keyword }}<sup>{{ `(${item.count})` }}</sup>
                </span>
                <template
                  v-if="index < socialtrend_current.top_keywords.length - 1"
                >
                  &nbsp;,&nbsp;
                </template>
                <br v-if="$mq === 'mobile' && index % 2 !== 0" />
              </span>
              <br v-if="$mq !== 'mobile'" />
              <!-- ,
              keyword<sup>(xx)</sup> , keyword<sup>(xx)</sup> , keyword<sup
                >(xx)</sup
              >
              ,<br />
              keyword<sup>(xx)</sup>  -->
              ประกบคู่มากที่สุดตามลำดับ สร้างการมีส่วนร่วมได้ทั้งหมด<br />
              <span class="font-bold"
                >{{ format(socialtrend_current.total_engagement) }} ครั้ง</span
              >
              เกิดขึ้นบน
              <span class="font-bold">{{
                socialtrend_current.top_channel
              }}</span>
              มากที่สุด
            </div>
          </div>
        </div>
        <div
          class="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          style="transform: translateX(-50%)"
        >
          <img
            src="~/assets/images/arrow.svg"
            alt=""
            class="animate-bounce sm:w-6"
          />
        </div>
      </div>

      <div class="text-center text-white px-10">
        <div class="container mx-auto">
          <div class="typo-h1 pt-16">ส่องกระแสชาวโซเชียล</div>
          <div class="pt-11 pb-16">
            <p class="typo-b4">
              สนามเลือกตั้งไม่ได้มีอยู่แค่ในโลกภายนอก
              และการหาเสียงไม่ได้ปรากฎอยู่แค่การเคาะประตูบ้าน หรือปราศรัยบนเวที
              แต่การแย่งชิงพื้นที่ทางการเมืองยังเกิดขึ้นในโลกโซเชียลมีเดียอย่างเข้มข้นด้วยเช่นกัน
              พรรคการเมืองที่คุณชื่นชอบ ถูกพูดถึงมากแค่ไหนในแต่ละสัปดาห์?
              สื่อมวลชนกระแสหลักหยิบประเด็นใดมานำเสนอ?
              และวาระทางการเมืองแบบไหนที่ได้รับความสนใจมากที่สุด?
              ผู้สมัครแต่ละคนชอบพูด/ถูกพูดถึงพร้อมกับคำว่าอะไรบ่อยๆ
              ชวนไปสำรวจได้ผ่านข้อมูลชุดนี้
            </p>
            <p class="pt-8 opacity-70">
              หมายเหตุ: (1)
              ข้อมูลที่ใช้ในการวิเคราะห์มาจากบัญชีหลักของพรรคการเมือง
              บัญชีผู้ได้รับการเสนอชื่อให้เป็นนายกรัฐมนตรี
              และบัญชีของสื่อมวลชนกระแสหลักที่มียอดผู้ติดตามเกินหนึ่งล้านคน (2)
              ข้อมูลชุดนี้แสดงเฉพาะ 11
              พรรคที่เริ่มมีความเคลื่อนไหวสูงสุดในช่วงปลายปี 2561 (3)
              ข้อมูลบนสื่อโซเชียลบางส่วน มีอยู่ก่อน พ.ร.ฎ.
              เลือกตั้งที่ออกเมื่อวันที่ 23 ก.พ. 62
            </p>
          </div>

          <div class="flex flex-col items-center py-7">
            <div class="flex items-center text-center text-white">
              <!-- <span class="mr-3">วันที่</span> -->
              <el-date-picker
                v-model="daterange"
                type="daterange"
                :editable="false"
                value-format="yyyy-MM-DD"
                placeholder="Pick a day"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
              <!-- <span class="ml-3 mr-3">ถึง</span> -->
              <!-- <el-date-picker
                v-model="end_input_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="Pick a day"
                :picker-options="pickerOptions"
              >
              </el-date-picker> -->
            </div>
            <div class="flex items-center text-center text-white mt-6">
              <span class="mr-3">ดู</span>
              <el-select v-model="keyword" placeholder="Select">
                <el-option
                  v-for="item in keyword_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span class="ml-5 mr-3">จาก</span>
              <el-select v-model="platform" placeholder="Select">
                <el-option
                  v-for="item in platform_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="mt-7">
              <el-checkbox-group v-model="candidate_filter" size="small">
                <el-checkbox
                  v-for="item in candidate_options"
                  :key="item.value"
                  :label="item.value"
                  border
                >
                  {{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>

      <div class="section-chart">
        <el-radio-group v-model="data_type">
          <el-radio-button label="engagement">Engagement</el-radio-button>
          <el-radio-button label="rank">Rank</el-radio-button>
        </el-radio-group>

        <div v-view="viewHandlerChart" class="chart-wrapper mt-4">
          <div class="chart">
            <client-only>
              <LineChartRace
                v-if="render_chart && line_chart_data != 0"
                :dataSet="line_chart_data"
                :activeChart.sync="active_date"
                :type="data_type"
                :duration="duration"
                :animate="chartAnimate"
                @change="onChangeActive"
              />
            </client-only>
          </div>
          <div class="mt-3">
            <div
              class="typo-b5 text-white text-center flex flex-col items-center justify-center"
            >
              <div v-if="active_date" class="flex items-center">
                โพสต์ที่ได้รับความสนใจสูงที่สุดเกี่ยวกับ
                <span
                  class="font-bold"
                  :style="`color: ${current_chart_active.color}`"
                  >{{ current_chart_active.candidate }}
                </span>
                ในวันที่
                <el-date-picker
                  v-model="active_date"
                  type="date"
                  :editable="false"
                  value-format="yyyy-MM-DD"
                  placeholder="Pick a day"
                  :picker-options="pickerDateActiveOptions"
                >
                </el-date-picker>
              </div>

              <template v-else>
                กดที่ชาร์ทเพื่อดูโพสต์ที่ได้รับความสนใจสูงที่สุดของแต่ละคน
              </template>
            </div>

            <el-carousel
              v-if="posts != 0 && active_date"
              :autoplay="false"
              :loop="false"
              class="mt-8"
              @change="(index) => (carousel_index = index)"
            >
              <el-carousel-item
                v-for="(item, index) in posts"
                :key="index"
                :name="item.date"
                class="text-black"
              >
                <div class="bg-white rounded-md p-5">
                  <div class="flex justify-between">
                    <div class="">
                      <div class="font-bold typo-b5">{{ item.author }}</div>
                      <div class="typo-b7 opacity-50">
                        {{ dateFormat(item.created_time) }}
                      </div>
                    </div>
                  </div>

                  <p
                    v-html="truncate(item.text)"
                    class="typo-b5 mt-2 pb-5 border-b"
                  ></p>

                  <div class="typo-b6 mt-5">
                    <span class="font-bold"
                      >{{ format(item.engagement_count) }}
                    </span>
                    Engagement
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <div class=""></div>
      </div>

      <div class="text-white text-center px-10 pb-32">
        <div class="container mx-auto">
          <div class="flex items-center justify-center py-9">
            <span class="typo-b5">Share</span>
          </div>

          <div class="mt-16 border-t border-white pt-6">
            <span class="font-bold typo-b4">Methodology</span>
            <div class="pt-7 typo-b5">
              Quis mi semper maecenas dictumst ut. Luctus vel tempus in quis
              fames odio ut faucibus libero. Dignissim elit massa orci ornare
              sit orci, condimentum nec vehicula. Bibendum euismod phasellus
              sagittis ultrices egestas diam amet mattis consequat. Proin turpis
              odio nunc, at nulla. Laoreet viverra nunc libero, at auctor
              senectus laoreet massa. Suspendisse neque vel pellentesque sed
              bibendum rutrum nisl. Vel sapien iaculis at eget nulla dignissim
              in sed nisi.Quis mi semper maecenas dictumst ut. Luctus vel tempus
              in quis fames odio ut faucibus libero. Dignissim elit massa orci
              ornare sit orci, condimentum nec vehicula. Bibendum euismod
              phasellus sagittis ultrices egestas diam amet mattis consequat.
              Proin turpis odio nunc, at nulla. Laoreet viverra nunc libero, at
              auctor senectus laoreet massa. Suspendisse neque vel pellentesque
              sed bibendum rutrum nisl. Vel sapien iaculis at eget nulla
              dignissim in sed nisi.
            </div>

            <div class="mt-10 flex items-center justify-center typo-b6">
              Data by
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import _ from 'lodash'
import moment from 'moment'
import Vue from 'vue'
import checkView from 'vue-check-view'
import LineChartRace from '~/components/LineChartRace'
Vue.use(checkView)

export default {
  name: 'IndexPage',
  components: {
    LineChartRace,
  },
  data() {
    return {
      chartAnimate: false,
      line_chart_data: [],
      render_chart: true,
      current_chart_data: {},
      socialtrend_current: {},
      socialtrend: [],
      avgTime: 0,
      posts: [
        {
          channel: 'Facebook',
          author: 'abc',
          candidate: 'ชัชชาติ',
          created_time: '2022-03-22T16:45:09.641Z',
          text: 'ปาร์ตี้เคลียร์ครัวซองต์สเตชั่นมาร์ก ซิตี้ คาปูชิโนติวเตอร์ฟรุตสต๊อก เตี๊ยมชัวร์สัมนาตัวตนโอเปอเรเตอร์ แคมเปญดีลเลอร์ ไฮกุ เซ็นเซอร์ อุด้งโยโย่ โต๊ะจีนรวมมิตร ทาวน์เฮาส์รีโมทเทวาเฝอ ศิลปากรเจไดรีสอร์ทอาว์ กู๋โปรโมชั่นเพนกวิน ม้าหินอ่อน วิดีโอเอ็นเตอร์เทนรามาธิบดีจิตพิสัยแชมพู ตู้เซฟสต็อกซัมเมอร์ศิลปากร เทปวีไอพีโปรเจกเตอร์เบญจมบพิตรช็อค',
          engagement_count: 123,
        },
        {
          channel: 'Facebook',
          author: 'abc',
          candidate: 'รสนา',
          created_time: '2022-03-22T16:45:09.641Z',
          text: 'ปาร์ตี้เคลียร์ครัวซองต์สเตชั่นมาร์ก ซิตี้ คาปูชิโนติวเตอร์ฟรุตสต๊อก เตี๊ยมชัวร์สัมนาตัวตนโอเปอเรเตอร์ แคมเปญดีลเลอร์ ไฮกุ เซ็นเซอร์ อุด้งโยโย่ โต๊ะจีนรวมมิตร ทาวน์เฮาส์รีโมทเทวาเฝอ ศิลปากรเจไดรีสอร์ทอาว์ กู๋โปรโมชั่นเพนกวิน ม้าหินอ่อน วิดีโอเอ็นเตอร์เทนรามาธิบดีจิตพิสัยแชมพู ตู้เซฟสต็อกซัมเมอร์ศิลปากร เทปวีไอพีโปรเจกเตอร์เบญจมบพิตรช็อค',
          engagement_count: 123,
        },
        {
          channel: 'Facebook',
          author: 'abc',
          candidate: 'สุชัชวีร์',
          created_time: '2022-03-22T16:45:09.641Z',
          text: 'ปาร์ตี้เคลียร์ครัวซองต์สเตชั่นมาร์ก ซิตี้ คาปูชิโนติวเตอร์ฟรุตสต๊อก เตี๊ยมชัวร์สัมนาตัวตนโอเปอเรเตอร์ แคมเปญดีลเลอร์ ไฮกุ เซ็นเซอร์ อุด้งโยโย่ โต๊ะจีนรวมมิตร ทาวน์เฮาส์รีโมทเทวาเฝอ ศิลปากรเจไดรีสอร์ทอาว์ กู๋โปรโมชั่นเพนกวิน ม้าหินอ่อน วิดีโอเอ็นเตอร์เทนรามาธิบดีจิตพิสัยแชมพู ตู้เซฟสต็อกซัมเมอร์ศิลปากร เทปวีไอพีโปรเจกเตอร์เบญจมบพิตรช็อค',
          engagement_count: 123,
        },
      ],
      carousel_index: 0,
      data_type: 'engagement',
      daterange: [],
      start_input_date: '2022-01-01',
      // end_input_date: '',
      active_date: '',
      keyword: '1',
      keyword_options: [
        {
          label: 'ทุก keyword',
          value: '1',
        },
      ],
      platform: '1',
      platform_options: [
        {
          label: 'ทุกช่องทาง',
          value: '1',
        },
      ],
      candidate: '',
      candidate_options: [
        {
          label: 'ชัชชาติ',
          value: 'ชัชชาติ',
          image: require('~/assets/images/Rectangle 67.jpg'),
        },
        {
          label: 'รสนา',
          value: 'รสนา',
          image: require('~/assets/images/Rectangle 67.jpg'),
        },
        {
          label: 'สุชัชวีร์',
          value: 'สุชัชวีร์',
          image: require('~/assets/images/Rectangle 67.jpg'),
        },
      ],
      candidate_filter: ['ชัชชาติ', 'รสนา', 'สุชัชวีร์'],
    }
  },
  computed: {
    format() {
      return d3.format(',')
    },
    duration() {
      return this.$mq !== 'desktop' ? 15000 : 20000
    },
    last_day() {
      return moment().diff(this.start_input_date, 'days')
    },
    engagement() {
      return [
        {
          date: '2022-01-01',
          candidate: 'ชัชชาติ',
          value: 240000,
          ratio: '2.3620440775140192',
        },
        {
          date: '2022-01-01',
          candidate: 'รสนา',
          value: 4235234,
          ratio: '41.682539110775046',
        },
        {
          date: '2022-01-01',
          candidate: 'สุชัชวีร์',
          value: 5685457,
          ratio: '55.95541681171093',
        },
        {
          date: '2022-01-02',
          candidate: 'ชัชชาติ',
          value: 5677878,
          ratio: '36.14921939119408',
        },
        {
          date: '2022-01-02',
          candidate: 'รสนา',
          value: 5464356,
          ratio: '34.78979362987153',
        },
        {
          date: '2022-01-02',
          candidate: 'สุชัชวีร์',
          value: 4564545,
          ratio: '29.060986978934384',
        },
        {
          date: '2022-01-03',
          candidate: 'ชัชชาติ',
          value: 6677848,
          ratio: '63.201592209086',
        },
        {
          date: '2022-01-03',
          candidate: 'รสนา',
          value: 455456,
          ratio: '4.310601915644302',
        },
        {
          date: '2022-01-03',
          candidate: 'สุชัชวีร์',
          value: 3432645,
          ratio: '32.4878058752697',
        },
        {
          date: '2022-01-04',
          candidate: 'ชัชชาติ',
          value: 5567878,
          ratio: '52.58834691124058',
        },
        {
          date: '2022-01-04',
          candidate: 'รสนา',
          value: 456342,
          ratio: '4.310128814993675',
        },
        {
          date: '2022-01-04',
          candidate: 'สุชัชวีร์',
          value: 4563445,
          ratio: '43.10152427376575',
        },
      ]
    },
    rank() {
      const data = [
        {
          date: '2022-01-01',
          candidate: 'ชัชชาติ',
          value: 2,
          ratio: 33.33,
        },
        {
          date: '2022-01-01',
          candidate: 'รสนา',
          value: 1,
          ratio: 50,
        },
        {
          date: '2022-01-01',
          candidate: 'สุชัชวีร์',
          value: 3,
          ratio: 16.66,
        },
        {
          date: '2022-01-02',
          candidate: 'ชัชชาติ',
          value: 2,
          ratio: 33.33,
        },
        {
          date: '2022-01-02',
          candidate: 'รสนา',
          value: 3,
          ratio: 16.66,
        },
        {
          date: '2022-01-02',
          candidate: 'สุชัชวีร์',
          value: 1,
          ratio: 50,
        },
        {
          date: '2022-01-03',
          candidate: 'ชัชชาติ',
          value: 1,
          ratio: 50,
        },
        {
          date: '2022-01-03',
          candidate: 'รสนา',
          value: 3,
          ratio: 16.66,
        },
        {
          date: '2022-01-03',
          candidate: 'สุชัชวีร์',
          value: 2,
          ratio: 33.33,
        },
      ]

      return data.map((d) => {
        const { length } = this.candidate_options
        return { ...d, value: length + 1 - d.value }
      })
    },
    pickerOptions() {
      return {
        disabledDate: (date) => {
          const extent = d3.extent(this.line_chart_data, (d) => d.date)
          const start = _.get(extent, '[0]')
          const end = _.get(extent, '[1]')
          const isBetween =
            moment(date).isSameOrBefore(end) &&
            moment(date).isSameOrAfter(moment(start).subtract(1, 'd'))
          return !isBetween
        },
      }
    },
    pickerDateActiveOptions() {
      return {
        disabledDate: (date) => {
          const start = _.get(this.daterange, '[0]')
          const end = _.get(this.daterange, '[1]')
          const isBetween =
            moment(date).isSameOrBefore(end) &&
            moment(date).isSameOrAfter(start)
          return !isBetween
        },
      }
    },
    // current_chart_active() {
    //   // const data = _.orderBy(this.posts, 'engagement_count', 'desc')
    //   console.log(_.get(this.posts, `[${this.carousel_index}]`, {}))
    //   return _.get(this.posts, `[${this.carousel_index}]`, {})
    // },
    current_chart_active() {
      return _.get(
        this.current_chart_data,
        `candidates[${this.carousel_index}]`,
        {}
      )
    },
    date_group() {
      return _.groupBy(this.line_chart_data, 'date')
    },
    candidates() {
      // const maximumArr = this.candidate_options.map(c => {})
      // const {length} = this.candidate_options
      // const res = this.candidate_options.map((c) => {

      const dateArr = _.groupBy(this.line_chart_data, 'date')
      const dateGroup = []
      for (const key in dateArr) {
        const toltal = d3.sum(dateArr[key], (d) => d.value)
        dateArr[key].forEach((d) => {
          const data = {
            ...d,
            ratio: (d.value / toltal) * 100,
          }

          dateGroup.push(data)
        })
      }

      const candidates = []
      const group = _.chain(this.line_chart_data)
        .orderBy('date', 'asc')
        .groupBy('candidate')
        .value()

      for (const key in group) {
        const candidate = this.candidate_options.find((c) => c.value === key)
        const data = dateGroup.filter((d) => d.candidate === key)

        candidates.push({
          ...candidate,
          data,
          width: _.get(data, '[0].ratio'),
        })
      }

      return candidates
    },
  },
  watch: {
    data_type: {
      immediate: true,
      handler(val) {
        this.line_chart_data =
          val === 'engagement' ? this.engagement : this.rank
        this.reRenderChart()

        if (!this.chartAnimate) return
        this.$nextTick(() => {
          this.setAnimateStackedBarChart()
        })
      },
    },
    candidate(val) {
      this.socialtrend_current =
        this.socialtrend.find((d) => d.candidate === val) || {}
      this.clearAnimateKeywords()
    },
    // end_input_date() {
    //   const isAfter = moment(this.active_date).isAfter(this.end_input_date)
    //   if (!isAfter) return
    //   this.active_date = this.end_input_date
    // },
  },
  mounted() {
    // window.registerUICustomElements()
    this.getKeywords()
    this.setDaterange()
    this.setDefaultStackedBarChart()
    this.animateKeywords()

    // const animateTime = 13
    // const avgTime = animateTime / Object.keys(date_group).length
    // let time = 0
    // const interval = setInterval(() => {
    //   this.candidate_animate.forEach(c => {
    //     const  =

    //     this.calRatio(c)
    //   });

    //   time += 1
    //   if (animateTime >= time) clearInterval(interval)
    // }, 1000);

    // const dateGroup = Object.keys(this.date_group)
  },
  methods: {
    setDaterange() {
      const start = d3.min(this.line_chart_data, (d) => d.date)
      const end = d3.max(this.line_chart_data, (d) => d.date)
      this.daterange = [start, end]
    },
    reRenderChart() {
      this.render_chart = false
      setTimeout(() => {
        this.render_chart = true
      }, 0)
    },
    truncate(str = '') {
      const maximum = 350

      return str.length > maximum
        ? str.substr(0, maximum - 1) + '&hellip;'
        : str
    },
    getKeywords() {
      // try {
      //   const res = await this.$api.get('candidate-stat', {
      //     params: {
      //       period: moment.format('yyyy-mm-dd')
      //     }
      //   })

      //   this.socialtrend = res
      // } catch (error) {
      //   console.error(error);
      // }

      this.socialtrend = [
        {
          candidate: 'ชัชชาติ',
          total_mention: 324235,
          total_engagement: 345435,
          top_keywords: [
            {
              keyword: 'การเดินทาง',
              count: 23,
            },
            {
              keyword: 'พื้นที่สาธารณะ',
              count: 655,
            },
            {
              keyword: 'สุขภาพ',
              count: 435,
            },
            {
              keyword: 'ความเท่าเทียม',
              count: 34,
            },
            {
              keyword: 'สิ่งแวดล้อม',
              count: 34,
            },
          ],
          top_channel: 'Facebook',
        },
        {
          candidate: 'รสนา',
          total_mention: 1212343,
          total_engagement: 6543234,
          top_keywords: [
            {
              keyword: 'การเดินทาง',
              count: 45,
            },
            {
              keyword: 'พื้นที่สาธารณะ',
              count: 34,
            },
            {
              keyword: 'สุขภาพ',
              count: 53,
            },
            {
              keyword: 'ความเท่าเทียม',
              count: 34,
            },
            {
              keyword: 'สิ่งแวดล้อม',
              count: 654,
            },
          ],
          top_channel: 'Facebook',
        },
        {
          candidate: 'สุชัชวีร์',
          total_mention: 2342345,
          total_engagement: 43563546,
          top_keywords: [
            {
              keyword: 'การเดินทาง',
              count: 324,
            },
            {
              keyword: 'พื้นที่สาธารณะ',
              count: 345,
            },
            {
              keyword: 'สุขภาพ',
              count: 34,
            },
            {
              keyword: 'ความเท่าเทียม',
              count: 14,
            },
            {
              keyword: 'สิ่งแวดล้อม',
              count: 45,
            },
          ],
          top_channel: 'Facebook',
        },
      ]
    },
    dateFormat(date) {
      return moment(date).add(543, 'years').format('DD MMM YYYY')
    },
    onChangeActive(val = {}) {
      this.carousel_index = 0
      this.current_chart_data = val
      this.updateStackedBarChart(val.date)
    },
    viewHandlerChart(e) {
      if (e.percentInView > 0.8 && !this.chartAnimate) {
        this.chartAnimate = true
        this.setAnimateStackedBarChart()
      }
    },
    updateStackedBarChart(date) {
      d3.selectAll('.stacked-bar-chart .candidate')
        .data(this.candidates)
        .call((el) => {
          el.transition()
            .duration(600)
            .ease(d3.easeLinear)
            .style(this.$mq === 'mobile' ? 'height' : 'width', (curr) => {
              const data = curr.data.find((d) => d.date === date)
              return `${_.get(data, 'ratio')}%`
            })
        })
    },
    animateKeywords() {
      let index = 0
      const { length } = this.socialtrend
      const update = () => {
        this.socialtrend_current = this.socialtrend[index]

        if (index < length - 1) index += 1
        else index = 0
      }

      this.interval = setInterval(() => update(), 2000)
    },
    clearAnimateKeywords() {
      if (!this.interval) return
      clearInterval(this.interval)
    },
    setDefaultStackedBarChart() {
      const { length } = this.candidates
      d3.selectAll('.stacked-bar-chart .candidate')
        .data(this.candidates)
        .call((el) => {
          el.transition()
            .duration(300)
            .ease(d3.easeLinear)
            .style(this.$mq === 'mobile' ? 'height' : 'width', (d) => {
              const ratio = 100 / length
              return `${ratio}%`
            })
        })
    },
    setAnimateStackedBarChart() {
      const _self = this
      const candidates = d3
        .selectAll('.stacked-bar-chart .candidate')
        .data(this.candidates)
      const { length } = Object.keys(this.date_group)
      // const time = 15000
      const time = (this.duration + 500) / length
      const firstTime = 600
      const avgTime = time + (time - firstTime) / (length - 1)

      const animate = () => {
        candidates.each(function (d) {
          let index = 0
          const data = d.data

          const animate = () => {
            const d = _.get(data, `[${index}]`, {})
            d3.select(this)
              .transition()
              .duration(index === 0 ? firstTime : avgTime)
              .style(_self.$mq === 'mobile' ? 'height' : 'width', `${d.ratio}%`)
              .on('end', () => {
                if (index < length) animate()
              })
            index++
          }

          animate()
        })
      }
      // setTimeout(() => {
      candidates.call(() => animate())
      // }, 300)
    },
    // animateStarckBarChart() {
    //   const { length } = Object.keys(this.date_group)
    //   let index = 1
    //   let time = 0
    //   const animateTime = 13000
    //   this.avgTime = animateTime / length
    //   let timePoint = this.avgTime
    //   console.log('avgTime ', this.avgTime)
    //   console.log('this.candidate_animate ', this.candidate_animate)
    //   const animate = (index) => {
    //     this.candidate_animate.forEach((d) => {
    //       const data = d.data[index]
    //       // const data = _.get(this.candidate_animate, `data[${index}]`)

    //       if (!data) return
    //       d.width = data.ratio
    //     })
    //     // console.log('index ', index)
    //     // console.log('data ', data)
    //   }

    //   const interval = setInterval(() => {
    //     if (
    //       (time === 0 || time >= timePoint || time + 500 >= timePoint) &&
    //       index <= length
    //     ) {
    //       animate(index)
    //       timePoint += this.avgTime
    //       index += 1
    //       console.log('timePoint ', timePoint)
    //     }
    //     console.log('time ', time)

    //     if (time >= animateTime) {
    //       clearInterval(interval)
    //     } else {
    //       time += 500
    //     }
    //   }, 500)
    // },
    // calRatio(data) {
    //   // const current = this.engagement.filter(d => d.date === data.date)
    //   // const maximum = d3.max(current, (d) => d.value)
    //   const toltal = d3.sum(current, (d) => d.value)
    //   return (data.value / toltal) * 100
    // },
  },
}
</script>

<style lang="scss">
.el-select-dropdown {
  margin-top: 8px;
  border-radius: 2px;
  .popper__arrow {
    display: none;
  }
  ul {
    li {
      padding: 0 15px;
      overflow: unset;
      color: #000000;
      > span {
        width: 100%;
        display: block;
      }
    }
    li:not(:last-of-type) > span {
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>

<style lang="scss" scoped>
.section-chart {
  width: 97vw;
  margin: 0 auto;
  .chart-wrapper {
    .chart {
      height: 52vh;
    }
  }
}
.select-candidate {
  width: 150px;
  height: 33px;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  transition: all 0.2s;
  .label {
    position: absolute;
    z-index: 10;
    font-weight: 600;
    color: #000000;
    pointer-events: none;
    top: 50%;
    left: 12px;
    right: 30px;
    text-align: left;
    transform: translateY(-50%);
    white-space: nowrap;
    overflow: hidden;
  }
  .el-select {
    ::v-deep {
      .el-input__inner {
        height: 33px;
        line-height: 33px;
        opacity: 0;
      }
      .el-input__icon {
        color: #000000;
        font-weight: bold;
        line-height: 33px;
      }
    }
  }
}
</style>
