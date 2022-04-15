import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { ExclusiveQuestion } from '../../components/subPage/exclusiveQuestion';
import { IAnswer, IQuestion } from '../../types/business';
import { getNocoApi } from '../../utils/nocoHandler';

interface PropsType {
  question: IQuestion;
  questionList: IQuestion[];
  answerList: IAnswer[];
}

export default function QuestionPage({
  question,
  questionList,
  answerList,
}: PropsType) {
  const [pageUrl, setPageUrl] = useState<string>('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);
  return (
    <div>
      <ExclusiveQuestion
        question={question}
        answerList={answerList}
        questionList={questionList}
        pageUrl={pageUrl}
      />
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
  if (isComingSoon) {
    return {
      redirect: {
        permanent: true,
        destination: '/comingSoon',
      },
    };
  }
  const id = context.params?.id;
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

  const question = questionRes.data as IQuestion;
  const questionList = questionListRes.data as IQuestion[];
  const answerIds = question.answersList.map((ans) => ans.id);
  const answerList: IAnswer[] = await Promise.all(
    answerIds.map(async (id) => {
      const [answerRes, errMsg3] = await getNocoApi(`answers/${id}`);
      return answerRes.data as IAnswer;
    })
  );

  return { props: { question, questionList, answerList } };
};
