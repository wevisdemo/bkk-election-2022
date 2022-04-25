import { Post } from 'wordpress-api';

import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { NewsCard } from '../card/newsCard';
import { SwiperButtonNext, SwiperButtonPrev } from '../button/swipeNextButton';

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
  const [reachEnd, setReachEnd] = useState<boolean>(false);
  const [reachBeginning, setReachBeginning] = useState<boolean>(true);
  const [slide, setSlide] = useState<number>(3);

  useEffect(() => {
    if (document.documentElement.offsetWidth < 786) {
      setSlide(1);
    }
  }, []);
  return (
    <div className="m-auto py-[16px] relative">
      <p className="typo-h5 my-[25px] text-center">RELATED NEWS</p>
      {/* TODO: refactor slide */}
      <Swiper
        className=" md:max-w-[1160px] max-w-[250px] custom-swip"
        modules={[Navigation]}
        grabCursor={true}
        slidesPerView={slide}
        onSlideChange={() => {
          if (reachEnd) {
            setReachEnd(false);
          }
          if (reachBeginning) {
            setReachBeginning(false);
          }
        }}
        onReachEnd={() => {
          setReachEnd(true);
        }}
        onReachBeginning={() => {
          setReachBeginning(true);
        }}
      >
        <SwiperButtonNext reachEnd={reachEnd} />
        <SwiperButtonPrev reachBeginning={reachBeginning} />
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
