import { useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import polygon from '../../static/icons/polygon-out.svg';

export const SwiperButtonNext = ({ reachEnd }: { reachEnd?: boolean }) => {
  useEffect(() => {}, [reachEnd]);
  const swiper = useSwiper();
  return (
    <button
      className="absolute top-[50%] right-[15px] md:right-[30px] z-20"
      onClick={() => {
        if (!reachEnd) {
          swiper.slideNext();
        }
      }}
    >
      <img
        style={{
          filter: reachEnd
            ? 'invert(99%) sepia(0%) saturate(6661%) hue-rotate(207deg) brightness(115%) contrast(73%)'
            : '',
        }}
        src={polygon.src}
        alt="polygon"
      />
    </button>
  );
};

export const SwiperButtonPrev = ({
  reachBeginning,
}: {
  reachBeginning?: boolean;
}) => {
  const swiper = useSwiper();
  return (
    <button
      className="absolute top-[50%] left-[15px] md:left-[30px] rotate-180 z-20"
      onClick={() => {
        if (!reachBeginning) {
          swiper.slidePrev();
        }
      }}
    >
      <img
        src={polygon.src}
        alt="polygon"
        style={{
          filter: reachBeginning
            ? 'invert(99%) sepia(0%) saturate(6661%) hue-rotate(207deg) brightness(115%) contrast(73%)'
            : '',
        }}
      />
    </button>
  );
};
