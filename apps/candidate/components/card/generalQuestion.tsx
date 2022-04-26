import { useRouter } from 'next/router';
import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
  disabledLink?: boolean;
}
export function GeneralQuestionCard({ answer, disabledLink }: PropsType) {
  const router = useRouter();
  const youtubeId = getYoutubeId(answer.url);
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';

  const onClickQuestion = () => {
    router.push(`/question/${answer.nc_xeff__questions_id}`);
  };

  return (
    <div className="md:max-w-[450px] max-w-[250px] flex flex-col justify-between h-full text-left mr-[30px] md:mr-[68px]">
      <div>
        <a
          style={{
            pointerEvents: disabledLink ? 'none' : 'all',
            cursor: disabledLink ? 'unset' : 'pointer',
          }}
          href={`/candidate/question/${answer.nc_xeff__questions_id}`}
          className={`font-heading font-semibold text-[14pt] md:text-[18pt] leading-[1.25] ${
            disabledLink ? '' : 'hover:underline'
          }`}
          // onClick={() => onClickQuestion()}
        >
          {answer.questionsRead.question}
        </a>
        <p className="typo-b5 mt-[20px]">{answer.text}</p>
      </div>
      {youtubeEmbedUrl ? (
        <iframe
          className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] mt-[20px] md:mt-[40px]"
          src={youtubeEmbedUrl}
          name={`question-${answer.nc_xeff__questions_id}-${Date.now()}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] md:ml-[30px] mt-[20px] md:mt-[40px] bg-[#333333] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}
    </div>
  );
}
