import { IGovernor } from '../../types/business';
import Image from 'next/image';
import arrowLong from '../../static/icons/arrow-long.svg';
import { useRouter } from 'next/router';
export function BackToHomeCard() {
  const router = useRouter();
  const onClickBack = () => {
    router.push('/');
  };
  return (
    <div className="bg-black py-[46px] md:py-[76px]">
      <div
        className="w-fit text-center flex justify-center space-x-[20px] m-auto hover:cursor-pointer"
        onClick={onClickBack}
      >
        <Image src={arrowLong} alt="arrow" />
        <p className="typo-h7 text-white">กลับหน้ารวมผู้สมัคร</p>
      </div>
    </div>
  );
}
