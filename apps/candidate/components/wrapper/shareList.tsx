import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
} from 'react-share';

import iTwitterW from '../../static/icons/socials/twitter.svg';
import iFacebookW from '../../static/icons/socials/facebook.svg';
import iLineW from '../../static/icons/socials/line.svg';
import iTwitterB from '../../static/icons/socials/black/twitter.svg';
import iFacebookB from '../../static/icons/socials/black/facebook.svg';
import iLineB from '../../static/icons/socials/black/line.svg';

interface PropsType {
  url: string;
  white?: boolean;
}

export function ShareList({ url, white }: PropsType) {
  return (
    <div className="flex items-center px-[30px] py-[16px] m-auto justify-center">
      <p className="font-body text-[16px] mr-[10px]"> Share</p>
      <div className="space-x-[10px] flex">
        <FacebookShareButton url={url}>
          <img src={white ? iFacebookW.src : iFacebookB.src} alt="i-facebook" />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <img src={white ? iTwitterW.src : iTwitterB.src} alt="i-twitter" />
        </TwitterShareButton>
        <LineShareButton url={url}>
          <img src={white ? iLineW.src : iLineB.src} alt="i-line" />
        </LineShareButton>
      </div>
    </div>
  );
}
