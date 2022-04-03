import { IQA } from '../../types/business';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { GeneralQuestionCard } from '../card/generalQuestion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
interface Propstype {
  qaList: IQA[];
  qaType: 'policy' | 'opiniion' | 'lifestyle' | 'special';
}

const questionTypeDict = {
  policy: 'ด้านนโยบาย',
  opiniion: 'ด้านวิศัยทัศน์',
  lifestyle: 'ด้าน Lifestyle',
  special: 'เคลียใจ',
};

export function GeneralQuestionList(props: Propstype) {
  const { qaList, qaType } = props;

  return (
    <div className="block py-[50px]">
      <p className="font-heading font-semibold text-[21pt] md:text-[28pt] leading-[1.25] mb-[60px] text-center">
        ตอบ {qaList.length} คำถาม{questionTypeDict[qaType]}
      </p>
      <div className="">
        <Swiper
          className="!w-[95vw] !mr-[0px]"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          {qaList.map((qa, index) => {
            return (
              <SwiperSlide className="!w-fit" key={`qa-general-${index}`}>
                <GeneralQuestionCard qa={qa} />
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ... */}
        </Swiper>
      </div>
    </div>
  );
}
