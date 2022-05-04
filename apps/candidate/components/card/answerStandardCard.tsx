import Link from 'next/link';
import { IAnswer } from '../../types/business';
import YoutubePlayer from '../youtubePlayer';

interface PropsType {
  answer: IAnswer;
}

export function AnswerStandardCard(props: PropsType) {
  const { answer } = props;

  return (
    <div className="flex flex-col md:flex-row max-w-[250px] md:max-w-[930px] items-center m-auto">
      <div className="flex-1">
        <Link href={`/${answer.nc_xeff__candidates_id}`}>
          <a>
            <h6 className="typo-h6 hover:cursor-pointer hover:underline">
              {answer.governorsRead.name}
            </h6>
          </a>
        </Link>
        <p className="typo-b3 mt-[20px]">{answer.text}</p>
      </div>
      <YoutubePlayer
        url={answer.url}
        title={answer.governorsRead.name}
        className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] md:ml-[30px]"
        aspectHeight={1}
        aspectWidth={1}
      />
    </div>
  );
}
