import { Fragment } from 'react';
import { AnswerStandardList } from '../../components/wrapper/answerStandardList';
import { IAnswer, IQuestion } from '../../types/business';
import { ShareList } from '../wrapper/shareList';
import { QuestionListCard } from '../card/questionListCard';
import { BackToHomeCard } from '../card/backToHome';

interface PropsType {
  question: IQuestion;
  questionList: IQuestion[];
  answerList: IAnswer[];
  pageUrl: string;
}

const questionTypeDict = {
  policy: 'POLICY',
  attitude: 'OPINION',
  lifestyle: 'LIFESTYLE',
  special: 'SPECIAL',
};

type questionType = 'policy' | 'attitude' | 'lifestyle' | 'special';

export default function StandardQuestion({
  question,
  questionList,
  answerList,
  pageUrl,
}: PropsType) {
  const sortedAnswerList = answerList.sort((a, b) =>
    a.nc_xeff__candidates_id > b.nc_xeff__candidates_id ? 1 : -1
  );

  return (
    <Fragment>
      <div className="pt-[40px] md:pt-[110px]  px-[20px]">
        <div className=" max-w-[930px] m-auto text-center">
          <h2 className="typo-h7 ">
            {questionTypeDict[question.type as questionType]} QUESTION{' '}
            {question.number}:
          </h2>
          <h1 className="typo-h2 mt-[15px]">{question.question}</h1>
          {question.description && (
            <p className="typo-b4 mt-[75px] md:mt-[60px]">
              {question.description}
            </p>
          )}
        </div>
        <div className="mt-[60px] md:mt-[80px] mb-[48px] md:mb-[94px]">
          <AnswerStandardList answerList={sortedAnswerList} />
        </div>
      </div>
      <ShareList url={pageUrl} />
      <div className="bg-black mt-[20px]">
        <QuestionListCard questionList={questionList} />
        <BackToHomeCard />
      </div>
    </Fragment>
  );
}
