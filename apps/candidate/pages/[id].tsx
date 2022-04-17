import { GetStaticPaths, GetStaticProps } from 'next/types';
import { HighLightCandidatePage } from '../components/subPage/highlightCandidatePage';
import { CandidatePage } from '../components/subPage/candidatePage';
import { IAnswer, IGovernor, IQuestion } from '../types/business';
import { useRouter } from 'next/router';
import { fetchTheStandardElectionPosts, Post } from 'wordpress-api';
import { useEffect, useState } from 'react';
import { getNocoApi } from '../utils/nocoHandler';
import Metadata from '../components/metadata';
import { getCandidateOG } from '../utils/dict';

interface PropsType {
  candidate: IGovernor;
  answerList: IAnswer[];
  questionList: IQuestion[];
  isComingSoon: boolean;
}

export default function Governor({
  candidate,
  answerList,
  questionList,
  isComingSoon,
}: PropsType) {
  const router = useRouter();
  const [news, setNews] = useState<Post[]>([]);
  const [pageUrl, setPageUrl] = useState<string>('');
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
      <Metadata
        title={candidate.name || 'ข้อมูลผู้สมัคร'}
        imageSrc={getCandidateOG(candidate.number || 1)}
      />

      {is_highlight ? (
        <HighLightCandidatePage
          isComingSoon={isComingSoon}
          governor={candidate}
          newsList={news}
          pageUrl={pageUrl}
          questionList={questionList}
          answerList={answerList}
        />
      ) : (
        <CandidatePage
          isComingSoon={isComingSoon}
          governor={candidate}
          newsList={news}
          pageUrl={pageUrl}
        />
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
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  const isComingSoon = process.env.COMING_SOON === 'true' ? true : false;
  const id = context.params?.id;
  let answerList: IAnswer[] = [];
  let questionList: IQuestion[] = [];
  const [candidateRes, errMsg] = await getNocoApi(`governors/${id}`);
  if (errMsg) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }
  const candidate = candidateRes.data as IGovernor;

  if (!isComingSoon) {
    if (candidate.answersList.length > 0) {
      const answerIds = candidate.answersList.map((answer) => answer.id);
      const query = answerIds.reduce((result, id, index) => {
        if (index === answerIds.length - 1) {
          return result + id.toString() + ')';
        }
        return result + id.toString() + ',';
      }, '(id,in,');
      const encodedQuery = encodeURIComponent(query);
      const [AnswerRes, errMsg2] = await getNocoApi(
        `answers?where=${encodedQuery}`
      );
      if (errMsg2) {
        return {
          redirect: {
            permanent: true,
            destination: '/',
          },
        };
      }
      answerList = AnswerRes.data as IAnswer[];

      const questionIds = answerList.map((ans) => ans.questionsRead.id);
      const questionQuery = questionIds.reduce((result, id, index) => {
        if (index === answerIds.length - 1) {
          return result + id.toString() + ')';
        }
        return result + id.toString() + ',';
      }, '(id,in,');
      const questionEncodedQuery = encodeURIComponent(questionQuery);
      const [questinoRes, errMsg3] = await getNocoApi(
        `questions?where=${questionEncodedQuery}`
      );
      if (errMsg3) {
        return {
          redirect: {
            permanent: true,
            destination: '/',
          },
        };
      }
      questionList = questinoRes.data as IQuestion[];
    }
  }
  return { props: { candidate, answerList, questionList, isComingSoon } };
};
