import { IAnswer, IGovernor, IQuestion } from '../../types/business';
import { BackToHomeCard } from '../card/backToHome';
import { CandidateInfoCard } from '../card/candidateInfo';
import { NewsList } from '../wrapper/newsList';
import { Post } from 'wordpress-api';
import { ShareList } from '../wrapper/shareList';
import { useEffect, useState } from 'react';
import { CandidateQuestionWrapper } from '../wrapper/candidateQuestionWrapper';
import { useRouter } from 'next/router';
import { CandidateBadge } from '../badge/candidate';

interface PropsType {
  governor: IGovernor;
  isComingSoon?: boolean;
  newsList: Post[];
  pageUrl: string;
  questionList: IQuestion[];
  answerList: IAnswer[];
  hlCandidateList: IGovernor[];
}
export function HighLightCandidatePage({
  governor,
  isComingSoon,
  newsList,
  pageUrl,
  questionList,
  answerList,
  hlCandidateList,
}: PropsType) {
  const [matches, setMatches] = useState<boolean>(false);
  const [hashFrom, setHashFrom] = useState<string>('');
  const router = useRouter();

  const getOtherCandidate = () => {
    return hlCandidateList.filter((candidate) => candidate.id !== governor.id);
  };

  useEffect(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setMatches(true);
    }
    window
      .matchMedia('(min-width: 768px)')
      .addEventListener('change', (e) => setMatches(e.matches));

    const hashList = window.location.href.split('#');
    if (hashList.length < 2) {
      return;
    }
    const hash = hashList[1];
    router.replace(hashList[0], undefined, { shallow: true });
    setHashFrom(hash);
  }, []);
  return (
    <div>
      <div className="bg-[#333333] relative md:h-[100vh]">
        <div
          className="h-[100vh] w-full bg-cover md:bg-cover bg-center absolute z-0"
          style={{
            backgroundImage:
              'url(' +
              `${matches ? governor.cover_pic : governor.profile_pic}` +
              ')',
          }}
        />
        <div className="flex flex-col md:flex-row justify-between items-center m-auto md:mr-[60px] w-full h-full z-10 relative md:pr-[20px]">
          <div className="text-white text-center md:text-left mt-[40px] md:ml-[6vw] md:mb-[6vw] md:mx-auto md:self-end">
            <p className="typo-h2 drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              {governor.name}
            </p>
            <p className="typo-h5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
              เบอร์ {governor.number}
            </p>
          </div>
          <div className="mt-[60vh] md:my-auto">
            <CandidateInfoCard governor={governor} />
          </div>
        </div>
      </div>
      {isComingSoon ? (
        <div className="bg-[#f1f1f1] px-[8px] py-[28px] md:py-[80px] text-center">
          <p className="typo-b5 mb-[20px]">Coming Soon..</p>
          <p className="typo-h5 mb-[5px]">
            1 Exclusive Speech : ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.
          </p>
          <p className="typo-h5 mb-[5px]">
            20 คำตอบด้านนโยบาย วิสัยทัศน์ และ ไลฟ์สไตล์
          </p>
          <p className="typo-h5">+ อีก 5 คำตอบเคลียร์ใจเฉพาะตัว</p>
        </div>
      ) : (
        <div>
          <CandidateQuestionWrapper
            questionList={questionList}
            answerList={answerList}
          />
        </div>
      )}
      {newsList.length > 0 && (
        <div>
          <NewsList newsList={newsList} />
        </div>
      )}
      <div className="m-auto mb-[20px] mt-[70px] text-center">
        <ShareList url={pageUrl} />
      </div>
      <div className="bg-black">
        <div className="py-[34px] py-[52px]">
          <p className="typo-h5 text-white text-center px-[20px]">
            ฟังคำตอบจากผู้สมัครผู้ว่าฯ กทม. ในกระแสคนอื่น
          </p>
          <div className="w-fit m-auto grid grid-cols-2 md:grid-cols-4 mb-[20px] gap-[15px] md:gap-[30px] mt-[35px] md:mt-[74px]">
            {getOtherCandidate().map((candidate) => {
              return (
                <CandidateBadge
                  key={`candidate-${candidate.id}`}
                  candidate={candidate}
                  showPlayButton={false}
                />
              );
            })}
          </div>
        </div>
        <BackToHomeCard hash={hashFrom} />
      </div>
    </div>
  );
}
