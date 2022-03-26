<template>
  <div>
    <div class="fixed top-0 left-0 right-0 bottom-0 bg-black z-0"></div>
    <!-- <ui-navbar></ui-navbar> -->

    <div class="relative z-50">
      <div class="hero w-full h-screen px-10">
        <div class="container mx-auto h-full flex items-center justify-center">
          <div class="text-center text-white typo-b3">
            <div class="text-left mx-auto max-w-max">
              <span> ในช่วง xx วัน ที่ผ่านมา </span>
              <el-select v-model="candidate" placeholder="Select">
                <el-option
                  v-for="item in candidate_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span>ถูกพูดถึงในโลกโซเชียล</span>
            </div>
            <div>
              {{ format(8888888) }} ข้อความ โดยมีคำว่า keyword<sup>(xx)</sup> ,
              keyword<sup>(xx)</sup> , keyword<sup>(xx)</sup> , keyword<sup
                >(xx)</sup
              >
              ,<br />
              keyword<sup>(xx)</sup> ประกบคู่มากที่สุดตามลำดับ
              สร้างการมีส่วนร่วมได้ทั้งหมด<br />
              {{ format(8888888) }} ครั้ง เกิดขึ้นบน Facebook มากที่สุด
            </div>
          </div>
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

        <div class="chart-wrapper mt-4">
          <div class="chart">
            <client-only>
              <LineChartRace
                v-if="render_chart && line_chart_data != 0"
                :data_set="line_chart_data"
                :active_chart.sync="active_date"
                :type="data_type"
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
import LineChartRace from '~/components/LineChartRace'

export default {
  name: 'IndexPage',
  components: {
    LineChartRace,
  },
  data() {
    return {
      line_chart_data: [],
      render_chart: true,
      current_chart_data: {},
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
      candidate: 'ชัชชาติ',
      candidate_options: [
        {
          label: 'ชัชชาติ',
          value: 'ชัชชาติ',
        },
        {
          label: 'รสนา',
          value: 'รสนา',
        },
        {
          label: 'สุชัชวีร์',
          value: 'สุชัชวีร์',
        },
      ],
      candidate_filter: ['ชัชชาติ', 'รสนา', 'สุชัชวีร์'],
    }
  },
  computed: {
    format() {
      return d3.format(',')
    },
    engagement() {
      const data = [
        {
          date: '2022-01-01',
          candidate: 'ชัชชาติ',
          value: 240000,
        },
        {
          date: '2022-01-01',
          candidate: 'รสนา',
          value: 4235234,
        },
        {
          date: '2022-01-01',
          candidate: 'สุชัชวีร์',
          value: 5685457,
        },
        {
          date: '2022-01-02',
          candidate: 'ชัชชาติ',
          value: 5677878,
        },
        {
          date: '2022-01-02',
          candidate: 'รสนา',
          value: 5464356,
        },
        {
          date: '2022-01-02',
          candidate: 'สุชัชวีร์',
          value: 4564545,
        },
        {
          date: '2022-01-03',
          candidate: 'ชัชชาติ',
          value: 6677848,
        },
        {
          date: '2022-01-03',
          candidate: 'รสนา',
          value: 455456,
        },
        {
          date: '2022-01-03',
          candidate: 'สุชัชวีร์',
          value: 3432645,
        },
        {
          date: '2022-01-04',
          candidate: 'ชัชชาติ',
          value: 5567878,
        },
        {
          date: '2022-01-04',
          candidate: 'รสนา',
          value: 456342,
        },
        {
          date: '2022-01-04',
          candidate: 'สุชัชวีร์',
          value: 4563445,
        },
      ]
      return _.chain(data)
        .filter((d) => this.candidate_filter.includes(d.candidate))
        .map((d) => ({
          ...d,
          date: new Date(d.date),
          date_display: d.date,
        }))
        .value()
    },
    rank() {
      const data = [
        {
          date: '2022-01-01',
          candidate: 'ชัชชาติ',
          value: 2,
        },
        {
          date: '2022-01-01',
          candidate: 'รสนา',
          value: 1,
        },
        {
          date: '2022-01-01',
          candidate: 'สุชัชวีร์',
          value: 3,
        },
        {
          date: '2022-01-02',
          candidate: 'ชัชชาติ',
          value: 2,
        },
        {
          date: '2022-01-02',
          candidate: 'รสนา',
          value: 1,
        },
        {
          date: '2022-01-02',
          candidate: 'สุชัชวีร์',
          value: 3,
        },
        {
          date: '2022-01-03',
          candidate: 'ชัชชาติ',
          value: 1,
        },
        {
          date: '2022-01-03',
          candidate: 'รสนา',
          value: 3,
        },
        {
          date: '2022-01-03',
          candidate: 'สุชัชวีร์',
          value: 2,
        },
      ]

      return data.map((d) => ({
        ...d,
        date: new Date(d.date),
        date_display: d.date,
      }))
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
  },
  watch: {
    data_type: {
      immediate: true,
      handler(val) {
        this.reRenderChart()
        this.line_chart_data =
          val === 'engagement' ? this.engagement : this.rank
      },
    },
    // end_input_date() {
    //   const isAfter = moment(this.active_date).isAfter(this.end_input_date)
    //   if (!isAfter) return
    //   this.active_date = this.end_input_date
    // },
  },
  mounted() {
    // window.registerUICustomElements()

    this.setDaterange()
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
    dateFormat(date) {
      return moment(date).add(543, 'years').format('DD MMM YYYY')
    },
    onChangeActive(val) {
      this.carousel_index = 0
      this.current_chart_data = val
    },
  },
}
</script>

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
</style>
