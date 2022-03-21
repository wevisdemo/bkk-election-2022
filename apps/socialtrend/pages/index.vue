<template>
  <div>
    <div class="fixed top-0 left-0 right-0 bottom-0 bg-black z-0"></div>

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
              <span class="mr-3">วันที่</span>
              <el-date-picker
                v-model="start_date_input"
                type="date"
                placeholder="Pick a day"
              >
              </el-date-picker>
              <span class="ml-3 mr-3">ถึง</span>
              <el-date-picker
                v-model="end_date_input"
                type="date"
                placeholder="Pick a day"
              >
              </el-date-picker>
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
          <div class="chart bg-slate-400"></div>
          <div class="mt-3">
            <div
              class="typo-b5 text-white text-center flex flex-col items-center justify-center"
            >
              กดที่ชาร์ทเพื่อดูโพสต์ที่ได้รับความสนใจสูงที่สุดของแต่ละคน

              <div class="flex items-center">
                โพสต์ที่ได้รับความสนใจสูงที่สุดเกี่ยวกับวิโรจน์ ในวันที่
                <el-date-picker
                  v-model="active_date"
                  type="date"
                  placeholder="Pick a day"
                >
                </el-date-picker>
              </div>
            </div>

            <el-carousel height="150px" class="mt-8">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
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

export default {
  name: 'IndexPage',
  data() {
    return {
      data_type: 'engagement',
      start_date_input: '',
      end_date_input: '',
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
      candidate: '1',
      candidate_options: [
        {
          label: 'ชัชชาติ',
          value: '1',
        },
        {
          label: 'ชัชชาติ',
          value: '2',
        },
        {
          label: 'ชัชชาติ',
          value: '3',
        },
        {
          label: 'ชัชชาติ',
          value: '4',
        },
      ],
      candidate_filter: ['1', '2', '3', '4'],
    }
  },
  computed: {
    format() {
      return d3.format(',')
    },
  },
  methods: {},
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
