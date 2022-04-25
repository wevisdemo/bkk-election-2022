import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Metadata from '../../components/metadata';
import { ExclusiveQuestion } from '../../components/subPage/exclusiveQuestion';
import StandardQuestion from '../../components/subPage/standardQuestion';
import { IAnswer, IQuestion } from '../../types/business';
import { getQuestionOG } from '../../utils/dict';
import { getNocoApi } from '../../utils/nocoHandler';

interface PropsType {
  question: IQuestion;
  questionList: IQuestion[];
  answerList: IAnswer[];
  isComingSoon: boolean;
}

export default function QuestionPage({
  question,
  questionList,
  answerList,
  isComingSoon,
}: PropsType) {
  const router = useRouter();
  const [pageUrl, setPageUrl] = useState<string>('');
  const isExclusive = question.type === 'exclusive';

  useEffect(() => {
    setPageUrl(window.location.href);
    if (isComingSoon) {
      router.push('/comingSoon');
    }
  }, []);
  return (
    <div>
      <Metadata
        title={question.question || 'คำถาม'}
        imageSrc={getQuestionOG(question.question, question.number || 1)}
      />
      {isComingSoon ? (
        <div />
      ) : isExclusive ? (
        <ExclusiveQuestion
          question={question}
          answerList={answerList}
          questionList={questionList}
          pageUrl={pageUrl}
        />
      ) : (
        <StandardQuestion
          question={question}
          answerList={answerList}
          questionList={questionList}
          pageUrl={pageUrl}
        />
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const [res, errMsg] = await getNocoApi('questions');
  if (!errMsg) {
  }
  const data = res.data as IQuestion[];

  const paths = data.map((question) => {
    return {
      params: { id: question.id?.toString() || '' },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  const isComingSoon = process.env.COMING_SOON === 'true' ? true : false;
  const id = context.params?.id;
  let question = {} as IQuestion;
  let questionList = [] as IQuestion[];
  let answerList = [] as IAnswer[];
  const [questionRes, errMsg] = await getNocoApi(`questions/${id}`);
  if (errMsg) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }
  const [questionListRes, errMsg2] = await getNocoApi('questions');
  if (errMsg2) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }

  question = questionRes.data as IQuestion;
  questionList = questionListRes.data as IQuestion[];
  const answerIds = question.answersList.map((ans) => ans.id);
  answerList = await Promise.all(
    answerIds.map(async (id) => {
      const [answerRes, errMsg3] = await getNocoApi(`answers/${id}`);
      return answerRes.data as IAnswer;
    })
  );

  return { props: { question, questionList, isComingSoon, answerList } };
};
