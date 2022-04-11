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
              <div
                class="select-candidate"
                :style="`background: ${socialtrend_current.color}`"
              >
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
                    <div class="label typo-u3">{{ item.label }}</div>
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
                <span
                  class="font-bold transition duration-200"
                  :style="`color: ${socialtrend_current.color}`"
                >
                  {{ item.keyword }}<sup>{{ `(${item.count})` }}</sup>
                </span>
                <template
                  v-if="index < socialtrend_current.top_keywords.length - 1"
                >
                  &nbsp;,&nbsp;
                </template>
                <br
                  v-if="
                    ($mq === 'mobile' && index % 2 !== 0) ||
                    ($mq !== 'mobile' && index === 3)
                  "
                />
              </span>
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
              <span class="font-bold capitalize">{{
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

      <div class="text-center text-white px-10 sm:px-5">
        <div class="container mx-auto">
          <div class="typo-h1 pt-16">ส่องกระแสชาวโซเชียล</div>
          <div class="pt-11 pb-16">
            <p class="typo-b4">
              สนามเลือกตั้งบนโลกออนไลน์นั้นเข้มข้นไม่แพ้การเดินสายเคาะประตูบ้านหรือปราศรัยบนเวที
              ทั้งจากการแย่งชิงพื้นที่ของผู้สมัครรับเลือกตั้ง
              และจากความเห็นของประชาชน
            </p>
            <p class="typo-b4 pt-8">
              ไปดูกันว่า.. ผู้สมัครผู้ว่าฯ กทม. คนไหน
              ถูกพูดถึงมากน้อยแค่ไหนในแต่ละสัปดาห์?
              มีความคิดเห็นต่อประเด็นปัญหาด้านต่างๆ ของ กทม. อย่างไร?
              และวาระไหนที่ได้รับความสนใจมากที่สุด?
            </p>
            <p class="pt-8 opacity-70">
              หมายเหตุ: ข้อมูลที่ใช้ในงานชิ้นนี้ เก็บรวบรวมโดยเครื่องมือ Social
              Monitoring ของ Wisesight จากช่องทาง Facebook, Twitter, Youtube,
              Instagram, Forum และเว็บไซต์สำนักข่าวต่างๆ
              ซึ่งข้อมูลที่เก็บรวบรวมเป็นไปตามนโยบายด้านข้อมูลของบริษัท
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center py-7">
        <div class="flex items-center text-center text-white">
          <div class="date-picker overflow-hidden" style="height: 44px">
            <div class="label-wrapper">
              <div class="label">
                <span class="text typo-b4">
                  <template v-if="data_type === 'engagement'">
                    วันที่
                  </template>
                  <template v-else>สัปดาห์ที่</template>
                </span>
                <div class="date-wrapper">
                  <div class="date typo-u2">
                    <span v-html="daterangeDisplay.startAt"></span> -
                    <br v-if="$mq === 'mobile' && data_type === 'rank'" />
                    <span v-html="daterangeDisplay.endAt"></span>
                  </div>
                  <img
                    src="~/assets/images/calendar.svg"
                    alt="calendar.svg"
                    class="icon"
                  />
                </div>
              </div>
              <!-- <div class="label">
                <span class="text typo-b4">ถึง</span>
                <div class="date-wrapper">
                  <div class="date typo-u2">
                    {{ daterangeDisplay(daterange[1]) }}
                  </div>
                  <img
                    src="~/assets/images/calendar.svg"
                    alt="calendar.svg"
                    class="icon"
                  />
                </div>
              </div> -->
            </div>

            <el-date-picker
              v-model="daterange"
              :editable="false"
              :picker-options="pickerOptions"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="center"
              class="opacity-0"
              @blur="curr_date_active = ''"
              @change="onChangeTypeChart"
            >
            </el-date-picker>
          </div>
          <!-- <template v-else>
            <div class="date-picker overflow-hidden">
              <div class="label-wrapper">
                <div class="label">
                  <span class="text typo-b4">สัปดาห์ที่</span>
                  <div class="date-wrapper">
                    <div class="date typo-u2">
                      {{ startWeek }}
                    </div>
                    <img
                      src="~/assets/images/calendar.svg"
                      alt="calendar.svg"
                      class="icon"
                    />
                  </div>
                </div>
              </div>

              :picker-options="pickerWeekOptions"
              {{ weekNum }}
              <el-date-picker
                v-model="startWeek"
                :editable="false"
                type="week"
                align="center"
                class="opacity-0"
              >
              </el-date-picker>
            </div>

            <div class="date-picker overflow-hidden">
              <div class="label-wrapper">
                <div class="label">
                  <span class="text typo-b4">ถึง</span>
                  <div class="date-wrapper">
                    <div class="date typo-u2">
                      {{ endWeek }}
                    </div>
                    <img
                      src="~/assets/images/calendar.svg"
                      alt="calendar.svg"
                      class="icon"
                    />
                  </div>
                </div>
              </div>
              :picker-options="pickerOptions"
              <el-date-picker
                v-model="endWeek"
                :editable="false"
                type="week"
                align="center"
                class="opacity-0"
              >
              </el-date-picker>
            </div>
          </template> -->
        </div>
        <div
          class="flex items-center text-center text-white mt-6 sm:flex-col sm:items-end"
        >
          <div>
            <span class="mr-3">ดู</span>
            <el-select
              v-model="keyword"
              placeholder="Select"
              class="select-outline"
              @change="onChangeTypeChart"
            >
              <el-option
                v-for="(item, index) in keyword_options"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
                <div class="label typo-u3">
                  <div class="title">{{ item.label }}</div>
                  <div
                    class="description typo-u5 overflow-ellipsis overflow-hidden"
                  >
                    {{ item.description }}
                  </div>
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="ml-5 sm:ml-0 sm:mt-3">
            <span class="mr-3">จาก</span>
            <el-select
              v-model="platform"
              placeholder="Select"
              class="select-outline"
              @change="onChangeTypeChart"
            >
              <el-option
                v-for="item in platform_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div
                  class="label typo-u3 items-center"
                  style="flex-direction: row; justify-content: flex-start"
                >
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    alt=""
                    class="w-5 mr-3"
                  />
                  <div class="title">{{ item.label }}</div>
                </div>
              </el-option>
            </el-select>
          </div>
        </div>
        <el-checkbox-group
          v-model="candidate_filter"
          size="small"
          class="candidate-tags mt-6 px-4"
          @change="onChangeTypeChart"
        >
          <el-checkbox
            v-for="item in candidate_options"
            :key="item.value"
            :label="item.label"
            border
            class="typo-u3 font-bold"
            :style="`--color: ${color_palettes(item.value)}`"
          >
            {{ item.label }}
            <img src="~/assets/images/close.svg" alt="" class="i-close" />
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="section-chart mt-5">
        <el-radio-group
          v-model="data_type"
          size="mini"
          class="radio-group"
          @change="onChangeTypeChart"
        >
          <el-radio-button label="engagement">Engagement</el-radio-button>
          <el-radio-button label="rank">Rank</el-radio-button>
        </el-radio-group>

        <div v-view="viewHandlerChart" class="chart-wrapper mt-4">
          <div class="chart overflow-hidden">
            <LineChartRace
              v-if="render_chart && line_chart_data != 0"
              :dataSet="line_chart_data"
              :activeChart="active_date"
              :photo="photo"
              :type="data_type"
              :duration="duration"
              :animate="chartAnimate"
              :color="color_palettes"
              :xAxisStart="daterange[0]"
              :xAxisEnd="daterange[1]"
              @change="
                (date) => {
                  active_date = date
                  onChangeActive()
                }
              "
            />
          </div>
          <div v-if="data_type == 'engagement'" class="mt-3">
            <div
              class="typo-b5 text-white text-center flex flex-col items-center justify-center px-5"
            >
              <div
                v-if="active_date"
                class="flex flex-wrap items-center sm:block"
              >
                <img
                  src="~/assets/images/arrow-down.svg"
                  alt="arrow-down.svg"
                  class="mr-3"
                /><br v-if="$mq === 'mobile'" />
                โพสต์ที่ได้รับความสนใจสูงที่สุด<br
                  v-if="$mq === 'mobile'"
                />เกี่ยวกับ
                <span
                  class="font-bold"
                  :style="`color: ${current_chart_active.color}`"
                >
                  {{ `${current_chart_active.candidate} ` }}
                </span>
                ในวันที่

                <div class="date-picker">
                  <div class="label-wrapper">
                    <div class="label">
                      <div class="date-wrapper">
                        <div class="date typo-u2">
                          {{ dateFormat(active_date) }}
                        </div>
                        <img
                          src="~/assets/images/calendar.svg"
                          alt="calendar.svg"
                          class="icon"
                        />
                      </div>
                    </div>
                  </div>

                  <el-date-picker
                    v-model="active_date"
                    type="date"
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    placeholder="Pick a day"
                    :picker-options="pickerDateActiveOptions"
                    class="opacity-0"
                    @change="onChangeActive"
                  >
                  </el-date-picker>
                </div>
              </div>

              <span v-else class="font-bold">
                กดที่ชาร์ทเพื่อดูโพสต์ที่ได้รับความสนใจสูงที่สุดของแต่ละคน
              </span>
            </div>

            <div
              v-if="posts != 0 && active_date"
              class="max-w-2xl px-8 mx-auto relative"
            >
              <div
                :class="[
                  'prev-btn absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer',
                  {
                    'opacity-20': carousel_index === 0,
                  },
                ]"
                @click="onPrev"
              >
                <img
                  src="~/assets/images/arrow-next.svg"
                  alt=""
                  style="transform: scale(-1)"
                />
              </div>
              <div
                :class="[
                  'next-btn absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer',
                  {
                    'opacity-20': carousel_index === posts.length - 1,
                  },
                ]"
                @click="onNext"
              >
                <img src="~/assets/images/arrow-next.svg" alt="" />
              </div>
              <el-carousel
                ref="carousel"
                :autoplay="false"
                :loop="false"
                :height="$mq === 'mobile' ? '440px' : '300px'"
                class="mt-8"
                indicator-position="none"
                arrow="never"
                @change="(index) => (carousel_index = index)"
              >
                <el-carousel-item
                  v-for="(item, index) in posts"
                  :key="index"
                  class="text-black px-3"
                >
                  <div
                    class="bg-white h-full rounded-md p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div class="flex justify-between items-start">
                        <div class="">
                          <div class="font-bold typo-b5">{{ item.author }}</div>
                          <div class="typo-b7 opacity-50 mt-2">
                            {{ dateFormat(item.created_time, 'full') }}
                          </div>
                        </div>

                        <img :src="item.platform_icon" alt="" />
                      </div>

                      <p v-html="truncate(item.text)" class="typo-b5 mt-2"></p>
                    </div>

                    <div
                      class="typo-b6 mt-5 pt-5"
                      style="border-top: 1px solid #cfcfcf"
                    >
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
      </div>

      <div class="text-white text-center px-10 pb-32 mt-14 sm:px-5">
        <div class="container mx-auto">
          <div class="flex items-center justify-center py-9">
            <span class="typo-b5">Share</span>
            <div class="flex items-center ml-2">
              <!-- <img src="~/assets/images/share.svg" alt="share-icon" /> -->
              <ShareNetwork
                title=""
                network="facebook"
                :url="webUrl"
                class="mx-1"
              >
                <img src="~/assets/images/facebook.svg" alt="facebook-icon" />
              </ShareNetwork>
              <ShareNetwork
                title=""
                network="twitter"
                :url="webUrl"
                class="mx-1"
              >
                <img src="~/assets/images/twitter.svg" alt="twitter-icon" />
              </ShareNetwork>
              <ShareNetwork title="" network="line" :url="webUrl" class="mx-1">
                <img src="~/assets/images/line.svg" alt="line-icon" />
              </ShareNetwork>
            </div>
          </div>

          <div class="mt-16 pt-6" style="border-top: 1px solid #9c9c9c">
            <span class="font-bold typo-b4 opacity-75">Methodology</span>
            <div class="pt-7 typo-b5 opacity-75">
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
              <span class="opacity-75"> Data by </span>
              <img
                src="~/assets/images/wisesight-logo.svg"
                alt="wisesight-logo.svg"
                class="ml-4 sm:w-36"
              />
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
import VueSocialSharing from 'vue-social-sharing'
import LineChartRace from '~/components/LineChartRace'
Vue.use(checkView)
Vue.use(VueSocialSharing)

export default {
  name: 'IndexPage',
  components: {
    LineChartRace,
  },
  data() {
    return {
      webUrl: 'https://staging.bkkelection2022.wevis.info/socialtrend',
      chartAnimate: false,
      line_chart_data: [],
      render_chart: true,
      socialtrend_current: {},
      socialtrend: [],
      engagement: [],
      avgTime: 0,
      posts: [],
      carousel_index: 0,
      data_type: 'engagement',
      daterange: [],
      startWeek: '',
      endWeek: '',
      current_chart_active: {},
      start_input_date: '2021-11-01',
      end_input_date: '',
      active_date: '',
      keyword: '',
      curr_date_active: '',
      keyword_options: [],
      platform: '',
      platform_options: [
        {
          label: 'ทุกช่องทาง',
          value: '',
        },
        {
          label: 'Facebook',
          value: 'facebook',
          icon: require('~/assets/images/i-facebook.svg'),
        },
        {
          label: 'Twitter',
          value: 'twitter',
          icon: require('~/assets/images/i-twitter.svg'),
        },
        {
          label: 'Instagram',
          value: 'instagram',
          icon: require('~/assets/images/i-instagram.svg'),
        },
        {
          label: 'News',
          value: 'news',
          icon: require('~/assets/images/i-news.svg'),
        },
        {
          label: 'Youtube',
          value: 'youtube',
          icon: require('~/assets/images/i-youtube.svg'),
        },
        {
          label: 'Forum',
          value: 'forum',
          icon: require('~/assets/images/i-forum.svg'),
        },
      ],
      candidate: '',
      candidate_options: [
        {
          label: 'วิโรจน์',
          value: 'วิโรจน์',
        },
        {
          label: 'สุชัชวีร์',
          value: 'สุชัชวีร์',
        },
        {
          label: 'รสนา',
          value: 'รสนา',
        },
        {
          label: 'ชัชชาติ',
          value: 'ชัชชาติ',
        },
      ],
      candidate_filter: [],
      candidate_config: [
        'วิโรจน์',
        'ฐิฏา',
        'สกลธี',
        'สุชัชวีร์',
        'วีรชัย',
        'อัศวิน',
        'รสนา',
        'ชัชชาติ',
        'วัชรี',
        'ศุภชัย',
        'ศิธา',
        'ประยูร',
        'พิศาล',
        'ธเนตร',
        'ทูตปรีชา',
        'ศศิกานต',
        'อุเทน์',
      ],
      color_config: [
        '#FF6D1B',
        '#D185FF',
        '#00B6B6',
        '#43DDFF',
        '#6DA7FF',
        '#FDB604',
        '#BB7D4B',
        '#96D74B',
        '#FF408E',
        '#39A96A',
        '#476FFF',
        '#C6A059',
        '#588CB1',
        '#83A74F',
        '#FFF06C',
        '#FFA1D7',
        '#8E7CFF',
      ],
      photo_config: [
        require('~/assets/images/candidate/candidate-01.png'),
        require('~/assets/images/candidate/candidate-03.png'),
        require('~/assets/images/candidate/candidate-03.png'),
        require('~/assets/images/candidate/candidate-04.png'),
        require('~/assets/images/candidate/candidate-04.png'),
        require('~/assets/images/candidate/candidate-07.png'),
        require('~/assets/images/candidate/candidate-07.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
        require('~/assets/images/candidate/candidate-08.png'),
      ],
    }
  },
  computed: {
    format() {
      return d3.format(',')
    },
    duration() {
      const { length } = Object.keys(this.date_group)

      const time = length * 400
      const duration = this.data_type === 'rank' ? time * 3 : time
      return duration < 20000 ? 20000 : duration
    },
    last_day() {
      return moment().diff(this.start_input_date, 'days')
    },
    color_palettes() {
      return d3
        .scaleOrdinal()
        .domain(this.candidate_config)
        .range(this.color_config)
    },
    photo() {
      return d3
        .scaleOrdinal()
        .domain(this.candidate_config)
        .range(this.photo_config)
    },
    // end_input_date() {
    //   const key = this.data_type === 'engagement' ? 'date' : 'date_to'
    //   return d3.max(this.line_chart_data, (d) => d[key]) || 0
    // },
    daterangeDisplay() {
      const start = this.daterange[0]
      const end = this.daterange[1]
      let startAt = this.dateFormat(start)
      let endAt = this.dateFormat(end)
      if (this.data_type === 'rank') {
        const week = (value) =>
          moment(value).diff(this.start_input_date, 'week') + 1

        const daterange = (date, type) => {
          let start = ''
          let end = ''
          if (type === 'start') {
            start = this.dateFormat(date)
            end = this.dateFormat(moment(date).add(7, 'days'))
          }
          if (type === 'end') {
            start = this.dateFormat(moment(date).subtract(7, 'days'))
            end = this.dateFormat(date)
          }

          return `${start} - ${end}`
        }

        startAt = `${week(start)} <span class="font-normal">(${daterange(
          start,
          'start'
        )})</span>`
        endAt = `${week(end)} <span class="font-normal">(${daterange(
          end,
          'end'
        )})</span>`
      }

      return { startAt, endAt }
    },
    pickerOptions() {
      const disabledDate = (date) => {
        const start = this.start_input_date
        const end = this.end_input_date
        const isBetween =
          moment(date).isSameOrBefore(end) && moment(date).isSameOrAfter(start)
        const crrrDate = this.curr_date_active
          ? moment(this.curr_date_active).isSame(date)
          : false
        let inWeek = false

        if (this.data_type === 'rank' && this.curr_date_active) {
          const diff = moment(date).diff(this.curr_date_active, 'days')
          inWeek = diff >= -7 && diff <= 7
        }
        return !isBetween || crrrDate || inWeek
      }

      const onPick = ({ minDate, maxDate }) => {
        if (maxDate) {
          this.curr_date_active = ''
        } else {
          this.curr_date_active = minDate
        }
      }

      return {
        firstDayOfWeek: 1,
        disabledDate,
        onPick,
      }
    },
    pickerDateActiveOptions() {
      return {
        firstDayOfWeek: 1,
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
    date_group() {
      return _.groupBy(this.line_chart_data, 'date')
    },
    candidates() {
      return this.candidate_options
        .filter((c) => this.candidate_filter.includes(c.label))
        .map((c) => {
          const data = _.chain(this.line_chart_data)
            .filter((d) => d.candidate === c.value)
            .orderBy('date', 'asc')
            .value()
          return {
            ...c,
            data,
            image: this.photo(c.value),
          }
        })
    },
  },
  watch: {
    candidate(val) {
      this.socialtrend_current =
        this.socialtrend.find((d) => d.candidate === val) || {}
      this.clearAnimateKeywords()
    },
    $mq(val) {
      if (val === 'desktop' || val === 'mobile') {
        this.setDefaultStackedBarChart()
      }
    },
    carousel_index(val) {
      this.current_chart_active = _.get(this.posts, `[${val}]`, {})
    },

    // end_input_date() {
    //   const isAfter = moment(this.active_date).isAfter(this.end_input_date)
    //   if (!isAfter) return
    //   this.active_date = this.end_input_date
    // },
  },
  async created() {
    // await Promise.all([
    //   this.getKeywords(),
    //   this.getEngagement()
    // ])
    this.getKeywords()
    this.candidate_filter = this.candidate_options.map((d) => d.label)
    this.line_chart_data = await this.getEngagement()
    this.end_input_date = d3.max(this.line_chart_data, (d) => d.date) || 0
    await this.getCandidateStat()
    this.setDaterange()
    this.animateKeywords()
  },
  destroyed() {
    window.removeEventListener('resize', _.debounce(this.reRenderChart, 200))
  },
  beforeMount() {
    window.scrollTo(0, 0)
    window.addEventListener('resize', _.debounce(this.reRenderChart, 200))
  },
  mounted() {
    window.registerUICustomElements()

    this.setDefaultStackedBarChart()

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
      // const start = d3.min(this.line_chart_data, (d) => d.date)
      const start = this.start_input_date
      const end = this.end_input_date
      if (!start || !end) return
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
        ? `${str.substr(0, maximum - 1)} &hellip;`
        : str
    },
    validateCalendarOnWeek() {
      let startAt = _.get(this.daterange, '[0]')
      const diffDaterange = moment(this.daterange[1]).diff(
        this.daterange[0],
        'days'
      )
      if (diffDaterange > 8) return
      let endAt = moment(startAt).add(8, 'days').format('yyyy-MM-DD')
      const diffOfDataEnddate = moment(this.end_input_date).diff(
        startAt,
        'days'
      )
      if (diffOfDataEnddate < 8) {
        endAt = _.clone(startAt)
        startAt = moment(startAt).subtract(8, 'days').format('yyyy-MM-DD')
      }
      this.daterange = [startAt, endAt]

      // const isWeek = moment(startAt).add(8, 'day')
      // end_input_date
      // inWeek = diff >= -7 && diff <= 7
    },
    async getKeywords() {
      let data = []
      try {
        const res = await this.$api.get('top-keywords')
        data = _.get(res, 'data.data', [])
      } catch (error) {
        console.error(error)
      }

      const options = data.map((d) => {
        const description = d.top_keywords.map((k) => k.keyword).join(', ')

        return {
          label: d.issue,
          value: d.issue,
          description: `เช่น ${description}`,
        }
      })
      this.keyword_options = [
        {
          label: 'ทุก keyword',
          value: '',
          description: '',
        },
        ...options,
      ]
    },
    async getPosts() {
      let data = []
      try {
        const res = await this.$api.get('top-engagement-message', {
          params: {
            date: this.active_date,
            candidates: this.candidate_filter.toString(),
          },
        })
        data = _.get(res, 'data.data', [])
      } catch (error) {
        console.error(error)
      }

      this.posts = _.chain(data)
        .orderBy('total_engagement', 'desc')
        .map((d) => {
          const platform =
            this.platform_options.find((p) => p.value === d.channel) || {}
          const color = this.color_palettes(d.candidate)

          return {
            ...d,
            platform_icon: platform.icon,
            color,
          }
        })
        .value()
    },
    async getCandidateStat() {
      let data = []
      try {
        const res = await this.$api.get('candidate-stat', {
          params: {
            candidates: this.candidate_filter.toString(),
          },
        })
        data = _.get(res, 'data.data', [])
      } catch (error) {
        console.error(error)
      }

      const socialtrend = []
      this.candidate_options.forEach((c) => {
        const arrData = data
          .filter((d) => d.candidate === c.value)
          .map((d) => {
            const topKeywords = d.top_keywords.slice(0, 5)
            const color = this.color_palettes(d.candidate)
            return { ...d, top_keywords: topKeywords, color }
          })
        socialtrend.push(...arrData)
      })

      this.socialtrend = socialtrend
    },
    async getEngagement() {
      let data = []
      const dateTo =
        _.get(this.daterange, '[1]') || moment().format('yyyy-MM-DD')
      const dateFrom = _.get(this.daterange, '[0]') || this.start_input_date
      try {
        const res = await this.$api.get('sum-engagement-per-date', {
          params: {
            date_from: dateFrom,
            date_to: dateTo,
            candidates: this.candidate_filter.toString(),
            keywords: this.keyword ? this.keyword : undefined,
            channels: this.platform ? this.platform : undefined,
          },
        })

        data = _.get(res, 'data.data', [])

        console.log(data)
      } catch (error) {
        console.error(error)
      }

      this.engagement = _.orderBy(data, 'date', 'asc').map((d) => {
        const highest =
          _.chain(data)
            .groupBy('date')
            .get(d.date, [])
            .maxBy('value')
            .value() || {}

        return {
          ...d,
          ratio: _.get(d, 'ratio', 0) * 100,
          highest: _.get(highest, 'value', 0),
          highest_per_date: highest.candidate === d.candidate,
          image: this.photo(d.candidate),
          color: this.color_palettes(d.candidate),
        }
      })

      return _.clone(this.engagement)
    },
    async getRank() {
      let data = []
      const dateTo =
        _.get(this.daterange, '[1]') || moment().format('yyyy-MM-DD')
      const dateFrom = _.get(this.daterange, '[0]') || this.start_input_date
      try {
        const res = await this.$api.get('rank-per-week', {
          params: {
            date_from: dateFrom,
            date_to: dateTo,
            candidates: this.candidate_filter.toString(),
            keywords: this.keyword ? this.keyword : undefined,
            channels: this.platform ? this.platform : undefined,
          },
        })

        data = _.get(res, 'data.data', [])

        console.log(data)
      } catch (error) {
        console.error(error)
      }

      return _.orderBy(data, 'date_from', 'asc').map((d) => {
        const { length } = this.candidate_filter
        const value = length + 1 - d.value
        const highest =
          _.chain(data)
            .groupBy('date')
            .get(d.date, [])
            .minBy('value')
            .value() || {}
        const date = moment(d.date_from).diff(this.start_input_date, 'week')

        return {
          ...d,
          ratio: _.get(d, 'ratio', 0) * 100,
          value,
          date: `${date + 1}`,
          rank: d.value,
          highest: _.get(highest, 'value', 0),
          highest_per_date: highest.candidate === d.candidate,
        }
      })
    },
    async onChangeTypeChart() {
      this.setDefaultStackedBarChart()
      this.active_date = ''

      if (this.data_type === 'engagement') {
        this.line_chart_data = await this.getEngagement()
      } else {
        this.line_chart_data = await this.getRank()
        this.validateCalendarOnWeek()
      }

      this.reRenderChart()
      if (!this.chartAnimate) return
      this.$nextTick(() => {
        this.setAnimateStackedBarChart()
      })
    },
    dateFormat(date, full) {
      const format = full ? 'DD MMM YYYY' : 'DD MMM YY'
      return moment(date).add(543, 'years').format(format)
    },
    async onChangeActive() {
      this.updateStackedBarChart(this.active_date)
      await this.getPosts()
      this.carousel_index = 0
      const carousel = this.$refs.carousel
      if (carousel) carousel.setActiveItem(0)
      this.current_chart_active = _.get(this.posts, '[0]', {})
    },
    viewHandlerChart(e) {
      if (e.percentInView > 0.4 && !this.chartAnimate) {
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
      let index = 1
      const { length } = this.socialtrend
      const update = () => {
        this.socialtrend_current = this.socialtrend[index]

        if (index < length - 1) index += 1
        else index = 0
      }

      this.interval = setInterval(() => update(), 2000)
      this.socialtrend_current = _.get(this.socialtrend, '[0]', {})
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
          if (this.$mq === 'mobile') {
            el.transition()
              .duration(300)
              .ease(d3.easeLinear)
              .style('height', (d) => {
                const ratio = 100 / length
                return `${ratio}%`
              })
              .style('width', '100%')
          } else {
            el.transition()
              .duration(300)
              .ease(d3.easeLinear)
              .style('width', (d) => {
                const ratio = 100 / length
                return `${ratio}%`
              })
              .style('height', '100%')
          }
        })
    },
    setAnimateStackedBarChart() {
      const _self = this
      const candidates = d3
        .selectAll('.stacked-bar-chart .candidate')
        .data(this.candidates)
      const { length } = Object.keys(this.date_group)
      // const time = 15000
      const time = (this.duration + 1000) / length
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
    onPrev() {
      this.$refs.carousel.prev()
    },
    onNext() {
      this.$refs.carousel.next()
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
  min-width: 180px !important;
  max-width: 300px;
  .popper__arrow {
    display: none;
  }
  ul {
    li {
      height: auto;
      line-height: normal;
      padding: 0 15px;
      overflow: unset;
      color: #000000 !important;
      .label {
        width: 100%;
        min-height: 34px;
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
        }
        .description {
          color: rgba($color: #000000, $alpha: 0.5);
        }
      }
    }
    li:not(:last-of-type) .label {
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>

<style lang="scss" scoped>
@import '~/assets/style/custom.scss';
.container {
  max-width: 750px;
}
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
.date-picker {
  height: auto;
  display: inline-flex;
  position: relative;
  cursor: pointer;
  .label-wrapper {
    display: flex;
    position: relative;
    white-space: nowrap;
    pointer-events: none;
    .label {
      flex: 1;
      height: 100%;
      padding: 0 4px;
      left: 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .text {
      }
      .date-wrapper {
        margin-left: 8px;
        border-bottom: 1px solid #ffffff;
        padding-bottom: 2px;
        display: flex;
        align-items: center;
        .date {
          font-weight: 600;
        }
        .icon {
          margin-left: 5px;
        }
      }
    }
    .label + .label {
      width: 50%;
    }
  }
  .el-date-editor {
    position: absolute;
    width: 100%;
    height: 100%;
    ::v-deep {
      input {
        cursor: pointer;
      }
    }
  }
}
.select-outline {
  width: 150px;
  ::v-deep {
    .el-input__inner {
      font-family: 'Anuphan';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      border: 1px solid #c9c9c9 !important;
      background: transparent;
      color: #ffffff;
      border-radius: 2px;
      font-weight: bold;
      font-size: 14px;
      height: 33px;
      line-height: 33px;
    }
    .el-input__icon {
      font-weight: bold;
      line-height: 33px;
    }
  }
}
.candidate-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 70%;
  @include mobile() {
    max-width: 100%;
  }

  .el-checkbox {
    min-width: 112px;
    border-radius: 2px;
    padding: 0 30px;
    margin: 3px !important;
    border: 1px solid var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    ::v-deep {
      .el-checkbox__input {
        display: none;
      }
      .el-checkbox__label {
        color: var(--color);
        font-weight: bold;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .i-close {
        display: none;
        margin-left: 8px;
      }
    }
  }
  .el-checkbox.is-checked {
    background-color: var(--color);
    ::v-deep {
      .el-checkbox__label {
        color: #000000 !important;
      }
      .i-close {
        display: inline-block;
      }
    }
  }
}
.radio-group {
  ::v-deep {
    .el-radio-button__inner {
      border-color: rgba($color: #ffffff, $alpha: 0.4);
      padding: 10px;
      background: transparent;
      font-weight: 600;
      font-size: 14px;
      font-family: 'Anuphan';
      color: #aaaaaa;
      box-shadow: none !important;
    }
    .el-radio-button {
      box-shadow: none !important;
    }
    .el-radio-button.is-active .el-radio-button__inner {
      color: #ffffff;
    }
  }
}
</style>
