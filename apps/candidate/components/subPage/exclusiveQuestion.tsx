import { ExclusiveQuestionBadge } from '../badge/exclusiveQuestionBadge';
import { IAnswer, IQuestion } from '../../types/business';
import { QuestionListCard } from '../card/questionListCard';
import { ShareList } from '../wrapper/shareList';
import { BackToHomeCard } from '../card/backToHome';
interface PropsType {
  question: IQuestion;
  questionList: IQuestion[];
  answerList: IAnswer[];
  pageUrl: string;
}

export function ExclusiveQuestion({
  question,
  questionList,
  answerList,
  pageUrl,
}: PropsType) {
  return (
    <div className="bg-black pt-[40px] md:pt-[110px]">
      <div className="w-[90vw] max-w-[1500px] m-auto text-center">
        <div className="">
          <p className="typo-h7 text-white">Exclusive Speech</p>
          <p className="typo-h2 text-white mt-[15px]">{question.question}</p>
        </div>
        {answerList.map((answer, index) => {
          return <ExclusiveQuestionBadge key={index} answer={answer} />;
        })}
      </div>
      <ShareList white url={pageUrl} />
      <QuestionListCard questionList={questionList} />
      <BackToHomeCard />
    </div>
  );
}
