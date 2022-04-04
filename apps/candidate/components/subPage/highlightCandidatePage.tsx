import { IGovernor } from '../../types/business';
import Image from 'next/image';
import arrowLong from '../../static/icons/arrow-long.svg';
import { useRouter } from 'next/router';
import { BackToHomeCard } from '../card/backToHome';
interface PropsType {
  governor: IGovernor;
  isComingSoon?: boolean;
}
export function HighLightCandidatePage({ governor, isComingSoon }: PropsType) {
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
