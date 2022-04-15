import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Fragment, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { AppContext } from '../../store';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import { GeneralQuestionList } from '../../components/wrapper/generalQuestionList';

export default function Candidate() {
  // const { store } = useContext(AppContext);
  // const qaList = store.qaList;

  // const qa = {
  //   id: 1,
  //   governor: 'ชัชชาติ สิทธิพันฒ์',
  //   question: 'ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.',
  //   answer: 'ผมจะทำให้กทม.xxxxxxxx',
  //   url: 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg',
  // };
  return (
    <div></div>
    // <div>
    //   <div className="h-[440px] md:h-[670px] w-full bg-[url('https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg')] bg-cover flex flex-col md:flex-row items-center">
    //     <div className="text-white">
    //       <p className="font-heading font-semibold text-[27pt] md:text-[48pt]">
    //         ชัชชาติ สิทธิพันธุ์
    //       </p>
    //       <p className="typo-h6">เบอร์ 1</p>
    //     </div>
    //     <div></div>
    //   </div>
    //   <div className="bg-black">
    //     <div className="bg-black pt-[80px]">
    //       <div className="w-[90vw] max-w-[1500px] m-auto text-center">
    //         <div className="">
    //           <p className="font-heading font-semibold text-[12pt] md:text-[16pt] text-white">
    //             Exclusive Speech
    //           </p>
    //           <p className="font-heading font-semibold text-[24pt] md:text-[36pt] text-white mt-[15px] md:mb-[30px]">
    //             {qa.question}
    //           </p>
    //           <ExclusiveQuestion qa={qa} ignoreGovernor />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <GeneralQuestionList qaList={qaList} qaType="policy" />
    //     <GeneralQuestionList qaList={qaList} qaType="opinion" />
    //     <GeneralQuestionList qaList={qaList} qaType="lifestyle" />
    //     <GeneralQuestionList qaList={qaList} qaType="special" />
    //   </div>
    // </div>
    // break
    // <Swiper
    //   // install Swiper modules
    //   modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   spaceBetween={50}
    //   slidesPerView={3}
    //   navigation
    //   pagination={{ clickable: true }}
    //   // scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log('slide change')}
    // >
    //   <SwiperSlide>Slide 1</SwiperSlide>
    //   <SwiperSlide>Slide 2</SwiperSlide>
    //   <SwiperSlide>Slide 3</SwiperSlide>
    //   <SwiperSlide>Slide 4</SwiperSlide>
    //   ...
    // </Swiper>
  );
}
