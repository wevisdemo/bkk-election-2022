import { IAnswer } from '../../types/business';
import YoutubePlayer from '../youtubePlayer';

interface PropsType {
  answer: IAnswer;
  ignoreQuestion?: boolean;
}
export function ExclusiveQuestionCard({ answer }: PropsType) {
  return (
    <div className="max-w-[1500px] w-[90vw] pb-[28px] md:pb-[100px]flex flex-col justify-center text-white">
      <h2 className="typo-b5 mt-[20px] md:order-3 md:text-center max-w-[250px] md:max-w-[1500px] m-auto pb-[20px]">
        {answer.text}
      </h2>
      <YoutubePlayer
        url={answer.url}
        title="EXCLUSIVE SPEECH: ทำไม คนกรุงเทพฯ ต้องเลือกคุณเป็นผู้ว่าฯ กทม."
        className="md:max-w-[1500px] md:max-h-[843.75px] w-[90vw] h-[50.625vw] md:order-1 m-auto"
        poster="maxresdefault"
      />
    </div>
  );
}
