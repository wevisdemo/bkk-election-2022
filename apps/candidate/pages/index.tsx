import type { NextPage } from 'next';
import arrow from '../static/icons/arrow.svg';
import arrowW from '../static/icons/arrow-white.svg';
import { CandidateBadge } from '../components/badge/candidate';
import { HighLightCandidateList } from '../components/wrapper/highlightCandidateList';
import { QuestionOverview } from '../components/card/questionOverview';
import { CandidateList } from '../components/wrapper/candidateList';
import { AppContext } from '../store';
import { useContext, useEffect, useRef, useState } from 'react';
import { CouncilList } from '../components/wrapper/councilList';

const Home: NextPage = () => {
  const { store } = useContext(AppContext);

  const [govArrow, setGovArrow] = useState<boolean>(true);
  const [counArrow, setCounArrow] = useState<boolean>(true);
  const [govRotate, setGovRotate] = useState<boolean>(false);
  const [counRotate, setCounRotate] = useState<boolean>(false);
  const candidateList = store.candidateList;
  const candidateRef = useRef<HTMLDivElement>(null);
  const councilRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 0;

    const candidateTop = (candidateRef.current?.offsetTop || 0) - navHeight;
    const candidateBot =
      candidateTop + (candidateRef.current?.offsetHeight || 0);

    const councilTop =
      (councilRef.current?.offsetTop || 0) -
      (navRef.current?.offsetHeight || 0);
    const councilBot = councilTop + (councilRef.current?.offsetHeight || 0);
    document.addEventListener('scroll', (e) => {
      const srcollTop = document.documentElement.scrollTop;
      if (srcollTop >= candidateTop && srcollTop < candidateBot) {
        setGovArrow(false);
      } else {
        setGovArrow(true);
      }
      if (srcollTop >= candidateBot) {
        setGovRotate(true);
      } else {
        setGovRotate(false);
      }
      if (srcollTop >= councilTop && srcollTop < councilBot) {
        setCounArrow(false);
      } else {
        setCounArrow(true);
      }
      if (srcollTop >= councilBot) {
        setCounRotate(true);
      } else {
        setCounRotate(false);
      }
    });
    console.log(candidateRef.current?.offsetTop);
  }, []);

  const jumpToGovSection = () => {
    window.scrollTo({
      top:
        (candidateRef.current?.offsetTop || 0) -
        (navRef.current?.offsetHeight || 0),
      behavior: 'smooth',
    });
  };

  const jumpToCounSection = () => {
    window.scrollTo({
      top:
        (councilRef.current?.offsetTop || 0) -
        (navRef.current?.offsetHeight || 0),
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center text-center px-[20px] mt-12">
        <p className="typo-h6">Meet the Candidates</p>
        <p className="typo-h1">ข้อมูลผู้สมัคร</p>
        <div className="typo-u3 mt-[10px] mb-[70px] max-w-[280px] md:max-w-[47rem]">
          ทำความรู้จักผู้สมัครผู้ว่าฯ กทม. และค้นหาสมาชิกสภา กทม. ในเขตของคุณ
        </div>
      </div>
      <div ref={navRef} className="w-full grid grid-cols-2 sticky top-0 z-20">
        <div
          className="text-center bg-black text-white py-5 hover:cursor-pointer flex items-center justify-center"
          onClick={jumpToGovSection}
        >
          {govArrow && (
            <img
              className={
                govRotate ? 'rotate-180 w-[16px] h-[17px]' : 'w-[16px] h-[17px]'
              }
              src={arrowW.src}
              alt="arrow"
            />
          )}
          <span className="typo-h8 ml-[10px] md:ml-[20px]">
            ผู้สมัครผู้ว่าฯ กทม.
          </span>
        </div>
        <div
          className="text-center bg-white py-5 hover:cursor-pointer flex items-center justify-center"
          onClick={jumpToCounSection}
        >
          {counArrow && (
            <img
              className={
                counRotate
                  ? 'rotate-180 w-[16px] h-[17px]'
                  : 'w-[16px] h-[17px]'
              }
              src={arrow.src}
              alt="arrow"
            />
          )}
          <span className="typo-h8 ml-[10px] md:ml-[20px]">
            ผู้สมัครสมาชิกสภากทม.
          </span>
        </div>
      </div>
      {/* break */}
      <div ref={candidateRef}>
        <div className="bg-black">
          <div className=" m-auto flex flex-col pb-[126px]">
            <div className="text-center">
              <p className="typo-h2 text-white pt-[66px]">
                ผู้สมัครผู้ว่าฯ กทม.
              </p>
              <p className="typo-h5 mt-4 text-white">ผู้สมัครในกระแส</p>
            </div>
            <HighLightCandidateList candidateList={candidateList} />
            <QuestionOverview isComingSoon />
          </div>
        </div>
        <div className="bg-[#333333]">
          <div className=" m-auto flex flex-col pt-[12px] pb-[50px] md:pb-[156px]">
            <CandidateList candidateList={store.candidateList} />
          </div>
        </div>
      </div>
      {/* break */}
      <div ref={councilRef}>
        <CouncilList
          districts={store.districtList}
          councils={store.councilList}
        />
      </div>
      <ui-footer />
    </div>
  );
};

export default Home;
