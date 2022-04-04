import { IGovernor } from '../../types/business';
import Image from 'next/image';
import arrow from '../../static/icons/arrow.svg';
import { useRouter } from 'next/router';
import { BackToHomeCard } from '../card/backToHome';
interface PropsType {
  governor: IGovernor;
}
export function CandidatePage({ governor }: PropsType) {
  const onClickPolicyLink = (link: string) => {
    window.open(link, '_blank');
  };
  return (
    <div>
      <div className="h-[440px] md:h-[670px] w-full bg-[url('https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg')] bg-cover flex flex-col md:flex-row items-center">
        <div className="text-white ml-[98px]">
          <p className="font-heading font-semibold text-[27pt] md:text-[48pt]">
            {governor.name}
          </p>
          <p className="typo-h5">เบอร์ {governor.number}</p>
        </div>
        <div></div>
      </div>
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
              <Image
                src={arrow}
                alt="arrow"
                width={12}
                height={12}
                className="fill-[#333333] rotate-[270deg]"
              />
            </button>
          )}
        </p>
      </div>
      <BackToHomeCard />
    </div>
  );
}
