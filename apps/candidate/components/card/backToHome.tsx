import arrowLong from '../../static/icons/arrow-long.svg';
import { useRouter } from 'next/router';

interface Propstype {
  hash?: string;
}

export function BackToHomeCard({ hash }: Propstype) {
  const router = useRouter();
  const onClickBack = () => {
    router.push('/#' + hash);
  };
  return (
    <div className="bg-black py-[46px] md:py-[76px]">
      <div
        className="w-fit text-center flex justify-center space-x-[20px] m-auto hover:cursor-pointer"
        onClick={onClickBack}
      >
        <img src={arrowLong.src} alt="arrow-home" />
        <p className="typo-h7 text-white">กลับหน้ารวมผู้สมัคร</p>
      </div>
    </div>
  );
}
