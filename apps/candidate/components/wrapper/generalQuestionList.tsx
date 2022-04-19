import { IAnswer } from '../../types/business';
import { Navigation, Mousewheel } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { GeneralQuestionCard } from '../card/generalQuestion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Propstype {
  answerList: IAnswer[];
  questionType: 'policy' | 'opinion' | 'lifestyle' | 'special';
}

const questionTypeDict = {
  policy: 'ด้านนโยบาย',
  opinion: 'ด้านวิศัยทัศน์',
  lifestyle: 'ด้าน Lifestyle',
  special: 'เคลียใจ',
};

export function GeneralQuestionList({ answerList, questionType }: Propstype) {
  return (
    <div className="block py-[50px]">
      <p className="font-heading font-semibold text-[21pt] md:text-[28pt] leading-[1.25] mb-[60px] text-center">
        ตอบ {answerList.length} คำถาม{questionTypeDict[questionType]}
      </p>

      <div className="relative">
        {/* <div className="shadow1 "></div> */}
        <Swiper
          className="!w-[95vw] !mr-[0px] custom-swip"
          slidesPerView={'auto'}
          spaceBetween={68}
          grabCursor={true}
          navigation={true}
          modules={[Mousewheel, Navigation]}
          mousewheel={{
            forceToAxis: true,
          }}
        >
          {answerList.map((answer, index) => {
            return (
              <SwiperSlide key={`qa-general-${index}`}>
                <GeneralQuestionCard answer={answer} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
