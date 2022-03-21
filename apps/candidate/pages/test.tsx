import type { NextPage } from 'next';
import Image from 'next/image';
import arrow from '../static/icon/arrow.svg';
import arrowW from '../static/icon/arrow-white.svg';
import { CandidateBadge } from '../components/badge/candidate';
import { HighLightCandidate } from '../components/wrapper/highlightCandidate';
import { QuestionOverview } from '../components/card/questionOverview';
import { AppContext } from '../store';
import { useContext } from 'react';

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
      <div className="bg-black flex flex-col">
        <div className="text-center">
          <p className="typo-h3 text-white mt-[66px]">ผู้สมัครผู้ว่าฯ กทม.</p>
          <p className="typo-h6 mt-4 text-white">ผู้สมัครในกระแส</p>
        </div>
        <HighLightCandidate candidateList={candidateList} />
        <QuestionOverview />
      </div>
    </div>
  );
};

export default Home;
