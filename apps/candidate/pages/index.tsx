import type { GetStaticProps } from 'next';
import arrow from '../static/icons/arrow.svg';
import arrowW from '../static/icons/arrow-white.svg';
import { HighLightCandidateList } from '../components/wrapper/highlightCandidateList';
import { QuestionOverview } from '../components/card/questionOverview';
import { CandidateList } from '../components/wrapper/candidateList';
import { useContext, useEffect, useRef, useState } from 'react';
import { CouncilList } from '../components/wrapper/councilList';
import { ShareList } from '../components/wrapper/shareList';
import { getNocoApi } from '../utils/nocoHandler';
import { ICouncil, IGovernor, IQuestion } from '../types/business';
import Metadata from '../components/metadata';
import { useRouter } from 'next/router';
import Head from 'next/head';
import candidateHome from '../static/images/og/candidates_home.png';

interface PropsType {
  candidateList: IGovernor[];
  councilList: ICouncil[];
  questionList: IQuestion[];
  isComingSoon: boolean;
  errMsg: string;
}
const Home = ({
  candidateList,
  councilList,
  questionList,
  isComingSoon,
  errMsg,
}: PropsType) => {
  const [govArrow, setGovArrow] = useState<boolean>(true);
  const [counArrow, setCounArrow] = useState<boolean>(true);
  const [govRotate, setGovRotate] = useState<boolean>(false);
  const [counRotate, setCounRotate] = useState<boolean>(false);
  const [pageUrl, setPageUrl] = useState<string>('');
  const candidateRef = useRef<HTMLDivElement>(null);
  const councilRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 0;
    const candidateTop = (candidateRef.current?.offsetTop || 0) - navHeight;
    const candidateBot =
      candidateTop + (candidateRef.current?.offsetHeight || 0);
    const councilTop = (councilRef.current?.offsetTop || 0) - navHeight;
    const councilBot = councilTop + (councilRef.current?.offsetHeight || 0);
    document.addEventListener('scroll', (e) => {
      const srcollTop = document.documentElement.scrollTop;
      if (srcollTop >= candidateTop && srcollTop < candidateBot) {
        setGovArrow(false);
      } else {
        setGovArrow(true);
      }
      if (srcollTop >= candidateBot) {
        setGovRotate(true);
      } else {
        setGovRotate(false);
      }
      if (srcollTop >= councilTop && srcollTop < councilBot) {
        setCounArrow(false);
      } else {
        setCounArrow(true);
      }
      if (srcollTop >= councilBot) {
        setCounRotate(true);
      } else {
        setCounRotate(false);
      }
    });
    setPageUrl(window.location.href);
  }, [councilRef.current?.offsetHeight]);

  useEffect(() => {
    const hashList = window.location.href.split('#');
    if (hashList.length < 2) {
      return;
    }
    const hash = hashList[1];
    router.replace('/', undefined, { shallow: true });
    const element = document.getElementById(hash);
    if (!element) {
      return;
    }
    element?.scrollIntoView();
  }, []);

  const jumpToGovSection = () => {
    window.scrollTo({
      top:
        (candidateRef.current?.offsetTop || 0) -
        (navRef.current?.offsetHeight || 0),
      behavior: 'smooth',
    });
  };

  const jumpToCounSection = () => {
    window.scrollTo({
      top:
        (councilRef.current?.offsetTop || 0) -
        (navRef.current?.offsetHeight || 0),
      behavior: 'smooth',
    });
  };

  const getCandidateHighlight = () => {
    return candidateList.filter((candidate) => candidate.highlight);
  };

  const onSelectDistrict = () => {
    jumpToCounSection();
  };

  return (
    <>
      <Metadata title="ข้อมูลผู้สมัคร" imageSrc={candidateHome.src} />
      <div>
        <div className="flex flex-col items-center text-center px-[20px] mt-12">
          <p className="typo-h6">Meet the Candidates</p>
          <p className="typo-h1">ข้อมูลผู้สมัคร</p>
          <div className="typo-u3 mt-[10px] mb-[70px] max-w-[280px] md:max-w-[47rem]">
            ทำความรู้จักผู้สมัครผู้ว่าฯ กทม. และค้นหาสมาชิกสภา กทม. ในเขตของคุณ
          </div>
        </div>
        <div ref={navRef} className="w-full grid grid-cols-2 sticky top-0 z-20">
          <div
            className="text-center bg-black text-white py-5 px-[10px] hover:cursor-pointer flex items-center justify-center"
            onClick={jumpToGovSection}
          >
            {govArrow ? (
              <img
                className={
                  govRotate
                    ? 'rotate-180 w-[16px] h-[17px]'
                    : 'w-[16px] h-[17px]'
                }
                src={arrowW.src}
                alt="arrow"
              />
            ) : (
              <div className="w-[16px] h-[17px]" />
            )}
            <span className="typo-h8 ml-[10px] md:ml-[20px]">
              ผู้สมัครผู้ว่าฯ กทม.
            </span>
          </div>
          <div
            className="text-center bg-white py-5 px-[10px] hover:cursor-pointer flex items-center justify-center"
            onClick={jumpToCounSection}
          >
            {counArrow ? (
              <img
                className={
                  counRotate
                    ? 'rotate-180 w-[16px] h-[17px]'
                    : 'w-[16px] h-[17px]'
                }
                src={arrow.src}
                alt="arrow"
              />
            ) : (
              <div className="w-[16px] h-[17px]" />
            )}
            <span className="typo-h8 ml-[10px] md:ml-[20px]">
              ผู้สมัครสมาชิกสภากทม.
            </span>
          </div>
        </div>
        {/* break */}
        <div ref={candidateRef}>
          <div className="bg-black">
            <div
              id="highlight-candidate-list"
              className=" m-auto flex flex-col pb-[126px] pt-[20px]"
            >
              <HighLightCandidateList
                candidateList={getCandidateHighlight()}
                isComingSoon={isComingSoon}
              />
              <QuestionOverview
                isComingSoon={isComingSoon}
                questionList={questionList}
              />
            </div>
          </div>
          <div className="bg-[#333333]">
            <div
              id="candidate-list"
              className=" m-auto flex flex-col pt-[12px] pb-[50px] md:pb-[156px]"
            >
              <CandidateList
                candidateList={candidateList}
                isComingSoon={isComingSoon}
              />
            </div>
          </div>
        </div>
        {/* break */}
        <div ref={councilRef}>
          <CouncilList
            councils={councilList}
            onSelectDistrict={onSelectDistrict}
          />
        </div>
        <div className="m-auto mb-[20px] text-center">
          <ShareList url={pageUrl} />
        </div>
        <ui-footer />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  const isComingSoon = process.env.COMING_SOON === 'true' ? true : false;
  let candidateList = [] as IGovernor[];
  let councilList = [] as ICouncil[];
  let questionList = [] as IQuestion[];
  const [candidateRes, errMsg1] = await getNocoApi('governors');
  if (errMsg1) {
    // TODO: redirect
    return {
      props: {
        candidateList,
        councilList,
        questionList,
        isComingSoon,
        errMsg: errMsg1,
      },
    };
  }
  candidateList = candidateRes.data as IGovernor[];

  const [councilRes, errMsg2] = await getNocoApi('councils?limit=1000');
  if (errMsg2) {
    // TODO: redirect
    return {
      props: {
        candidateList,
        councilList,
        questionList,
        isComingSoon,
        errMsg: errMsg1,
      },
    };
  }
  councilList = councilRes.data as ICouncil[];

  const [questionRes, errMsg3] = await getNocoApi('questions');
  if (errMsg2) {
    // TODO: redirect
    return {
      props: {
        candidateList,
        councilList,
        questionList,
        isComingSoon,
        errMsg: errMsg1,
      },
    };
  }
  questionList = questionRes.data as IQuestion[];

  return {
    props: {
      candidateList,
      councilList,
      questionList,
      isComingSoon,
      errMsg: '',
    },
  };
};

export default Home;
