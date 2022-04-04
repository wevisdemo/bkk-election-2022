import { IGovernor } from '../../types/business';
import arrowLong from '../../static/icons/arrow-long.svg';
import { useRouter } from 'next/router';
import { BackToHomeCard } from '../card/backToHome';
import { CandidateInfoCard } from '../card/candidateInfo';
interface PropsType {
  governor: IGovernor;
  isComingSoon?: boolean;
}
export function HighLightCandidatePage({ governor, isComingSoon }: PropsType) {
  // TODO: change bgUrl
  const bgUrl = 'https://peachpharm.files.wordpress.com/2013/06/mac-4.jpg';

  return (
    <div>
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
      <BackToHomeCard />
    </div>
  );
}

<style>.imageCover{}</style>;
