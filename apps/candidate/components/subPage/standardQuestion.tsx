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

export default function StandardQuestion({
  question,
  questionList,
  answerList,
  pageUrl,
}: PropsType) {
  return (
    <Fragment>
      <div className="pt-[40px] md:pt-[110px]  px-[20px]">
        <div className=" max-w-[930px] m-auto text-center">
          <p className="typo-h7 ">
            {question.type} Question {question.number}:
          </p>
          <p className="typo-h2 mt-[15px]">{question.question}</p>
          <p className="typo-b4 mt-[75px] md:mt-[60px]">
            {question.description}
          </p>
        </div>
        <div className="mt-[90px] md:mt-[165px] mb-[48px] md:mb-[94px]">
          <AnswerStandardList answerList={answerList} />
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
