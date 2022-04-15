import { IGovernor } from '../../types/business';
import iInstagram from '../../static/icons/socials/channel.svg';
import iEmail from '../../static/icons/socials/email.svg';
import iFacebook from '../../static/icons/socials/facebook.svg';
import iLine from '../../static/icons/socials/line.svg';
import iTiktok from '../../static/icons/socials/tiktok.svg';
import iTwitter from '../../static/icons/socials/twitter.svg';
import iWebsite from '../../static/icons/socials/website.svg';
import iYoutube from '../../static/icons/socials/youtube.svg';

interface PropsType {
  governor: IGovernor;
}

export function CandidateInfoCard({ governor }: PropsType) {
  const hasContact =
    governor.contact_instagram &&
    governor.contact_email &&
    governor.contact_facebook &&
    governor.contact_line &&
    governor.contact_tiktok &&
    governor.contact_twitter &&
    governor.contact_web &&
    governor.contact_youtube;
  const toList = (str: string | null) => {
    if (!str) {
      return '-';
    }
    const list = str.trim().split('\n-');
    if (list.length > 0) {
      list[0] = list[0].replace('-', '');
    }
    return (
      <ul className="list-outside list-disc ml-[20px]">
        {list.map((li, index) => {
          return <li key={`info-${index}`}>{li}</li>;
        })}
      </ul>
    );
  };

  const toGender = (str: string | null) => {
    if (!str) {
      return '-';
    }
    if (str.trim() === 'male') {
      return 'ชาย';
    }
    if (str.trim() === 'female') {
      return 'หญิง';
    }
    return str;
  };

  const toThaiDate = (str: string | null) => {
    if (!str) {
      return '-';
    }
    const date = new Date(str);
    const result = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return result;
  };

  const imgDict = {
    instagram: iInstagram.src,
    email: iEmail.src,
    facebook: iFacebook.src,
    line: iLine.src,
    tiktok: iTiktok.src,
    twitter: iTwitter.src,
    website: iWebsite.src,
    youtube: iYoutube.src,
  };

  const contactDict = {
    instagram: governor.contact_instagram,
    email: governor.contact_email,
    facebook: governor.contact_facebook,
    line: governor.contact_line,
    tiktok: governor.contact_tiktok,
    twitter: governor.contact_twitter,
    website: governor.contact_web,
    youtube: governor.contact_youtube,
  };

  type contactType =
    | 'instagram'
    | 'email'
    | 'facebook'
    | 'line'
    | 'tiktok'
    | 'twitter'
    | 'website'
    | 'youtube'
    | '';

  const contactButton = (type: contactType) => {
    if (type === '') {
      return;
    }
    if (!contactDict[type]) {
      return;
    }
    const onClickContact = (type: contactType) => {
      if (type) {
        const url = contactDict[type];
        if (!url) return;
        window.open(url, '_blank');
      }
    };
    return (
      <img
        src={imgDict[type]}
        alt={`contact-${type}`}
        onClick={() => onClickContact(type)}
        className="w-[30px] h-[30px] hover:cursor-pointer"
      />
    );
  };

  return (
    <div className="w-full max-w-[250px] md:max-w-[400px] md:max-h-[550px] max-h-[400px] bg-black/[0.7] text-white mx-auto mb-[20px] px-[20px] overflow-y-auto pb-[50px] rounded-[5px]">
      <p className="typo-h7 text-center mt-[20px]">ข้อมูลพื้นฐาน</p>
      <div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">ชื่อเล่น</p>
          <div className="font-body text-[16px] mt-[10px]">
            {governor.nickname || '-'}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">เพศภาพ</p>
          <div className="font-body text-[16px] mt-[10px]">
            {toGender(governor.sex)}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">เกิด</p>
          <div className="font-body text-[16px] mt-[10px]">
            {toThaiDate(governor.birthdate)} ({governor.age} ปี)
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">อายุ</p>
          <div className="font-body text-[16px] mt-[10px]">
            {governor.age || '-'} ปี
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            บัญชีทรัพย์สิน
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {toList(governor.property)}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            การศึกษาระดับมัธยมศึกษา
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {toList(governor.basic_education)}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            การศึกษาระดับอุดมศึกษา
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {toList(governor.higher_education)}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            ประวัติอาชีพ/การทำงานทั่วไป
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {toList(governor.career)}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            ประวัติการดำรงตำแหน่งทางการเมือง และประวัติการสังกัดพรรคการเมือง
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {toList(governor.political_career)}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            ลงสมัครในนาม
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {governor.party || '-'}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            แคมเปญสื่อสาร
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {governor.slogan || '-'}
          </div>
        </div>
        <div className="pb-[10px] border-b border-white/[0.1]">
          <p className="font-bold font-body mt-[10px] text-[14px]">
            ข้อมูลอื่นๆ
          </p>
          <div className="font-body text-[16px] mt-[10px]">
            {toList(governor.other_data)}
          </div>
        </div>
        {hasContact && (
          <div>
            <p className="font-bold font-body mt-[10px] text-[18px]">
              Official Contact
            </p>
            <div className="space-x-[10px] mt-[5px] flex">
              {contactButton('website')}
              {contactButton('email')}
              {contactButton('facebook')}
              {contactButton('twitter')}
              {contactButton('instagram')}
              {contactButton('line')}
              {contactButton('youtube')}
              {contactButton('tiktok')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
