import Link from 'next/link';
import { IAnswer } from '../../types/business';
import YoutubePlayer from '../youtubePlayer';
interface PropsType {
  answer: IAnswer;
  disabledLink?: boolean;
}
export function GeneralQuestionCard({ answer, disabledLink }: PropsType) {
  return (
    <div className="md:max-w-[450px] max-w-[250px] flex flex-col justify-between h-full text-left mr-[30px] md:mr-[68px]">
      <div>
        <Link href={`/question/${answer.nc_xeff__questions_id}`}>
          <a
            style={{
              pointerEvents: disabledLink ? 'none' : 'all',
              cursor: disabledLink ? 'unset' : 'pointer',
            }}
            className={`typo-h6 ${disabledLink ? '' : 'hover:underline'}`}
          >
            <h2>{answer.question.question}</h2>
          </a>
        </Link>
        <p className="typo-b5 mt-[20px]">{answer.text}</p>
      </div>
      <YoutubePlayer
        url={answer.url}
        title={answer.question.question}
        className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] mt-[20px]"
        aspectHeight={1}
        aspectWidth={1}
      />
    </div>
  );
}
