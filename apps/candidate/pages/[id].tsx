import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next/types';
import { HighLightCandidatePage } from '../components/subPage/highlightCandidatePage';
import { CandidatePage } from '../components/subPage/candidatePage';
import { IGovernor } from '../types/business';
import { useRouter } from 'next/router';
import { fetchTheStandardElectionPosts, Post } from 'wordpress-api';
import { useEffect, useState } from 'react';
import { getNocoApi } from '../utils/nocoHandler';

const mocGov: IGovernor = {
  id: 1,
  name: 'วิโรจน์ ลักขณาอดิศร',
  number: 1,
  sex: 'male',
  birthdate: '1977-12-11',
  property:
    'บัญชีแสดงรายการทรัพย์สินและหนี้สิน กรณีเข้ารับตำแหน่งสมาชิกสภาผู้แทนราษฎร เมื่อวันที่ 25 พฤษภาคม 2562 แจ้งมีทรัพย์สิน 51,435,181 บาท มีหนี้สิน 42,701 บาท',
  higher_education:
    '- ปริญญาเอก ปรัชญาดุษฎีบัณฑิต (เศรษฐศาสตร์) หลักสูตรนานาชาติ คณะพัฒนาการเศรษฐกิจ สถาบันบัณฑิตพัฒนบริหารศาสตร์\n- ปริญญาโท บริหารธุรกิจมหาบัณฑิต คณะพาณิชยศาสตร์และการบัญชี จุฬาลงกรณ์มหาวิทยาลัย\n- ปริญญาตรี วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมยานยนต์ จุฬาลงกรณ์มหาวิทยาลัย\n',
  career:
    '- อดีตผู้ช่วยผู้อำนวยการซีเอ็ดบุ๊คเซ็นเตอร์ ด้านกิจกรรมส่งเสริมการตลาด บมจ.ซีเอ็ดยูเคชั่น\n- อดีตผู้อำนวยการศูนย์การเรียนรู้ SE-ED Learning Center บมจ.ซีเอ็ดยูเคชั่น\n- อดีตผู้อำนวยการฝ่ายทรัพยากรบุคคลและพัฒนาองค์กร บมจ.ซีเอ็ดยูเคชั่น\n- อดีตเจ้าหน้าที่ที่ปรึกษา บริษัท โนโว ควอลิตี้ เซอร์วิสเซส (ประเทศไทย) จำกัด\n- อดีตวิศวกรควบคุมคุณภาพ บริษัท อีซูซุ มอเตอร์ (ประเทศไทย) จำกัด',
  political_career:
    '- โฆษกพรรคก้าวไกล\n- อดีตสมาชิกสภาผู้แทนราษฎร แบบบัญชีรายชื่อ พรรคอนาคตใหม่ และพรรคก้าวไกล\n- อดีตกรรมาธิการวิสามัญพิจารณาร่างพระราชบัญญัติการศึกษาแห่งชาติ พ.ศ. ....\n- อดีตกรรมาธิการวิสามัญเพื่อพิจารณาติดตามและตรวจสอบการใช้จ่ายเงินจากการกู้เงินตามพระราชกำหนดให้อำนาจกระทรวงการคลังกู้เงินเพื่อแก้ไขปัญหาเศรษฐกิจและสังคม จากการระบาดของโรคติดเชื้อไวรัสโคโรนา 2019 เพิ่มเติม พ.ศ. 2564\n- อดีตกรรมาธิการวิสามัญพิจารณาร่างพระราชบัญญัติงบประมาณรายจ่ายประจำปีงบประมาณ พ.ศ. 2563\n- อดีตกรรมาธิการการศึกษา สภาผู้แทนราษฎร และอดีตอนุกรรมาธิการชุดต่างๆ ได้แก่ อนุกรรมาธิการศึกษาปัญหาและแนวทางการแก้ไขปัญหาการบริหารจัดการการศึกษาของโรงเรียนขนาดเล็กและโรงเรียนขยายโอกาส, อนุกรรมาธิการเพื่อพิจารณาศึกษาโครงสร้างพื้นฐานโรงเรียนและสวัสดิภาพผู้เรียน, อนุกรรมาธิการเพื่อพิจารณาศึกษาปัญหาและแนวทางแก้ไขการจัดการศึกษาเอกชน',
  party: 'พรรคก้าวไกล',
  policy:
    '(สรุปคอนเซปต์คร่าวๆ) Non quam volutpat vel id nulla elementum elementum rhoncus. Leo, faucibus ipsum ut a risus vitae donec malesuada ipsum. At neque, nullam tristique eu dictumst. Dignissim quis non sed sed nunc enim. Felis ullamcorper ornare sit congue vestibulum odio. Adipiscing netus mollis tempor, nunc, aliquam nisl rhoncus quis commodo. Pellentesque nisl orci, donec ultricies sed molestie. Feugiat malesuada nunc non quam cursus. Id congue ultricies lacus diam nullam erat eu eget. Nisl, vitae aliquet mauris tempus.',
  contact_web: null,
  contact_facebook: 'https://www.facebook.com/wirojlak',
  contact_twitter: 'https://twitter.com/wirojlak',
  profile_pic: null,
  cover_pic: null,
  nickname: 'โรจน์',
  highlight: true,
  policy_url:
    'https://www.moveforwardparty.org/wp-content/uploads/2022/03/%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B9%84%E0%B8%9B%E0%B9%84%E0%B8%94%E0%B9%89_print-ver5OP.pdf?fbclid=IwAR3npTkEGaOQcBI1gCQ0LPfOnxeVjcc6dZZNx5jdsmhRxV8vU4RoQyDbYcM',
  age: 44,
  basic_education: 'โรงเรียนวัดสุทธิ​ว​รา​ราม',
  slogan: 'พร้อมชนเพื่อคนกรุงเทพ',
  contact_youtube: null,
  contact_tiktok: 'https://www.tiktok.com/@wirojlak',
  other_data: null,
  contact_email: null,
  contact_instagram: null,
  contact_line: null,
};

interface PropsType {
  candidate: IGovernor;
}

export default function Governor({ candidate }: PropsType) {
  const router = useRouter();
  const [news, setNews] = useState<Post[]>([]);
  const [pageUrl, setPageUrl] = useState<string>('');
  const { id } = router.query;
  const is_highlight = candidate.highlight || false;

  useEffect(() => {
    const getPort = async () => {
      try {
        const res = await fetchTheStandardElectionPosts({
          tag: candidate.name || '',
        });
        setNews(res);
      } catch (error: any) {}
    };
    getPort();
    setPageUrl(window.location.href);
  }, []);

  return (
    <div>
      {is_highlight && (
        <HighLightCandidatePage
          governor={candidate}
          newsList={news}
          pageUrl={pageUrl}
        />
      )}
      {!is_highlight && (
        <CandidatePage governor={candidate} newsList={news} pageUrl={pageUrl} />
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [res, errMsg] = await getNocoApi('governors');
  if (!errMsg) {
  }
  const data = res.data as IGovernor[];

  const paths = data.map((gov) => {
    return {
      params: { id: gov.id?.toString() || '' },
    };
  });
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  const id = context.params?.id;
  const [res, errMsg] = await getNocoApi(`governors/${id}`);
  if (errMsg) {
    return { props: { candidate: res.data as IGovernor } };
  }
  return { props: { candidate: res.data as IGovernor } };
};
