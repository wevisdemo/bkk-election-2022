import type { NextPage } from 'next';
import Image from 'next/image';
import arrow from '../static/icons/arrow.svg';
import arrowW from '../static/icons/arrow-white.svg';
import { CandidateBadge } from '../components/badge/candidate';
import { HighLightCandidateList } from '../components/wrapper/highlightCandidateList';
import { QuestionOverview } from '../components/card/questionOverview';
import { CandidateList } from '../components/wrapper/candidateList';
import { AppContext } from '../store';
import { useContext } from 'react';
import { CouncilList } from '../components/wrapper/councilList';

const Home: NextPage = () => {
  const { store } = useContext(AppContext);
  const candidateList = store.candidateList;
  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <p className="typo-h2 mt-12">ข้อมูลผู้สมัคร</p>
        <div className="typo-u4 mt-4 mb-12 w-[47rem]">
          Egestas dui dis eget velit faucibus odio sed venenatis. Velit posuere
          tortor suspendisse non dignissim massa feugiat. Bibendum vitae id
          mattis interdum scelerisque. Enim, auctor enim euismod ut bibendum
          vestibulum feugiat.
        </div>
      </div>
      <div className="w-full grid grid-cols-2 ">
        <div className="text-center bg-black text-white py-5">
          <Image src={arrowW} alt="arrow" width="16" height="17" />
          <span className="typo-h9 ml-5">ผู้สมัครผู้ว่าฯ กทม.</span>
        </div>
        <div className="text-center py-5">
          <Image src={arrow} alt="arrow" width="16" height="17" />
          <span className="typo-h9 ml-5">ผู้สมัครสมาชิกสภากทม.</span>
        </div>
      </div>
      {/* break */}
      <div className="bg-black">
        <div className=" m-auto flex flex-col pb-[126px]">
          <div className="text-center">
            <p className="typo-h3 text-white mt-[66px]">ผู้สมัครผู้ว่าฯ กทม.</p>
            <p className="typo-h6 mt-4 text-white">ผู้สมัครในกระแส</p>
          </div>
          <HighLightCandidateList candidateList={candidateList} />
          <QuestionOverview />
        </div>
      </div>
      <div className="bg-[#333333]">
        <div className="max-w-[1160px] m-auto flex flex-col pt-[12px] pb-[156px]">
          <CandidateList candidateList={store.candidateList} />
        </div>
      </div>
      {/* break */}
      <CouncilList
        districts={store.districtList}
        councils={store.councilList}
      />
      <div></div>
    </div>
  );
};

export default Home;
