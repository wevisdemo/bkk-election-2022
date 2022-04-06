import { IGovernor } from '../../types/business';
import arrow from '../../static/icons/arrow.svg';
import { useRouter } from 'next/router';
import { BackToHomeCard } from '../card/backToHome';
import { CandidateInfoCard } from '../card/candidateInfo';
import { Post } from 'wordpress-api';
import { NewsList } from '../wrapper/newsList';
import { ShareList } from '../wrapper/shareList';
interface PropsType {
  governor: IGovernor;
  newsList: Post[];
  pageUrl: string;
}
export function CandidatePage({ governor, newsList, pageUrl }: PropsType) {
  const bgUrl = 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg';

  const onClickPolicyLink = (link: string) => {
    window.open(link, '_blank');
  };
  return (
    <div className="h-[calc(100vh-46px)]">
      <div className="bg-[#333333]">
        <div
          className="h-[780px] md:h-[670px] w-full bg-contain bg-no-repeat md:bg-cover items-center"
          style={{
            backgroundImage: 'url(' + `${bgUrl}` + ')',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center m-auto md:mr-[60px] w-full h-full">
            <div className="text-white text-center md:text-left mt-[40px] md:mx-auto">
              <p className="font-heading font-semibold text-[27pt] md:text-[48pt] leading-[1.25]">
                {governor.name}
              </p>
              <p className="typo-h5">เบอร์ {governor.number}</p>
            </div>
            <CandidateInfoCard governor={governor} />
          </div>
        </div>
      </div>
      {governor.policy && (
        <div className="px-[8px] py-[28px] md:py-[80px]">
          <p className="typo-h6 mb-[30px] md:mb-[42px] ml-[10%]">นโยบายเด่น</p>
          <p className="font-body text-[12pt] md:text-[14pt] leading-[1.5] max-w-[280px] md:max-w-[750px] m-auto">
            {governor.policy}
            {governor.policy_url !== null && (
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
            )}
          </p>
        </div>
      )}
      {newsList.length > 0 && (
        <div>
          <NewsList newsList={newsList} />
          <div className="m-auto mb-[20px] mt-[70px] text-center">
            <ShareList url={pageUrl} />
          </div>
        </div>
      )}
      <BackToHomeCard />
    </div>
  );
}
