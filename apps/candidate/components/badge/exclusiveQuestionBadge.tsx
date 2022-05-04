import Link from 'next/link';
import { IAnswer } from '../../types/business';
import YoutubePlayer from '../youtubePlayer';

interface PropsType {
  answer: IAnswer;
  ignoreGovernor?: boolean;
}
export function ExclusiveQuestionBadge({ answer, ignoreGovernor }: PropsType) {
  return (
    <div className="max-w-[1500px] w-[90vw] pt-[40px] md:pt-[50px] pb-[28px] md:pb-[100px] mx-auto text-center">
      <YoutubePlayer
        url={answer.url}
        title={answer.governorsRead.name}
        className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px] typo-h3 text-white"
        poster="maxresdefault"
      />
      {!ignoreGovernor && (
        <Link href={`/${answer.nc_xeff__candidates_id}`}>
          <a>
            <h6 className="typo-h6 text-white mb-[20px] hover:cursor-pointer hover:underline">
              {answer.governorsRead.name}
            </h6>
          </a>
        </Link>
      )}
      <p className="typo-b3 text-white max-w-[650px] m-auto">{answer.text}</p>
    </div>
  );
}
