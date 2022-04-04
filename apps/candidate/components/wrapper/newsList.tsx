import { Post } from 'wordpress-api';

import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { NewsCard } from '../card/newsCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { useEffect, useState } from 'react';

interface PropsType {
  newsList: Post[];
}
export function NewsList({ newsList }: PropsType) {
  const [slide, setSlide] = useState<number>(3);

  useEffect(() => {
    console.log(document.documentElement.offsetWidth);
    if (document.documentElement.offsetWidth < 786) {
      setSlide(1);
    }
  }, []);
  return (
    <div className="m-auto py-[16px]">
      <p className="typo-h5 my-[25px] text-center">Related News</p>
      <Swiper
        className=" md:max-w-[1140px] max-w-[250px]"
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
        spaceBetween={30}
        slidesPerView={slide}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {newsList.map((news) => {
          return (
            <SwiperSlide className="" key={`qa-general-${news.id}`}>
              <NewsCard news={news} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
