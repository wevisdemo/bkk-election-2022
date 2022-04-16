import { IAnswer } from '../../types/business';
import { AnswerStandardCard } from '../card/answerStandardCard';

interface PropsType {
  answerList: IAnswer[];
}

export function AnswerStandardList(props: PropsType) {
  const { answerList } = props;

  return (
    <div className="space-y-[68px]">
      {answerList.map((ans, index) => {
        return (
          <AnswerStandardCard key={`standard-ans-${index}`} answer={ans} />
        );
      })}
    </div>
  );
}
