import arrowLong from '../../static/icons/arrow-long.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Propstype {
  hash?: string;
}

export function BackToHomeCard({ hash }: Propstype) {
  const router = useRouter();
  return (
    <div className="bg-black py-[46px] md:py-[76px]">
      <Link href={hash ? '/#' + hash : '/'}>
        <a>
          <div className="w-fit text-center flex justify-center space-x-[20px] m-auto hover:cursor-pointer">
            <img src={arrowLong.src} alt="arrow-home" />
            <p className="typo-h7 text-white">กลับหน้ารวมผู้สมัคร</p>
          </div>
        </a>
      </Link>
    </div>
  );
}
