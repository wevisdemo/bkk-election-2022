import { IGovernor } from '../../types/business';
import arrow from '../../static/icons/arrow.svg';
import { BackToHomeCard } from '../card/backToHome';
import { CandidateInfoCard } from '../card/candidateInfo';
import { Post } from 'wordpress-api';
import { NewsList } from '../wrapper/newsList';
import { ShareList } from '../wrapper/shareList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import md from 'markdown-it';
interface PropsType {
  governor: IGovernor;
  newsList: Post[];
  pageUrl: string;
  isComingSoon: boolean;
}
export function CandidatePage({
  governor,
  newsList,
  pageUrl,
  isComingSoon,
}: PropsType) {
  const [matches, setMatches] = useState<boolean>(false);
  const [hashFrom, setHashFrom] = useState<string>('');
  const router = useRouter();

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
  const onClickPolicyLink = (link: string) => {
    window.open(link, '_blank');
  };
  return (
    <div className="h-[calc(100vh-46px)]">
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
      {governor.policy && (
        <div className="px-[8px] py-[28px] md:py-[80px]">
          <p className="typo-h6 mb-[30px] md:mb-[42px] ml-[10%]">นโยบายเด่น</p>
          <p className="font-body text-[12pt] md:text-[14pt] leading-[1.5] max-w-[280px] md:max-w-[750px] m-auto">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: md().render(governor.policy) }}
            />
            {/* {governor.policy_url !== null && (
              <button
                onClick={() => onClickPolicyLink(governor.policy_url || '')}
                disabled={governor.policy_url === null}
                className="py-[10px] px-[15px] flex items-center border border-[#9d9d9d] rounded-[2px] w-fit mt-[30px] "
              >
                <p className="text-[#333333] font-body text-[11pt] leading-[1.5] mr-[12px]">
                  ดูนโยบายเพิ่มเติม
                </p>
                <img
                  src={arrow.src}
                  alt="arrow"
                  className="fill-[#333333] rotate-[270deg] w-[12px] h-[12px]"
                />
              </button>
            )} */}
          </p>
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
      <BackToHomeCard hash={hashFrom} />
    </div>
  );
}
