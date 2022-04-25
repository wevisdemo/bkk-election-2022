import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
  ignoreQuestion?: boolean;
}
export function ExclusiveQuestionCard({ answer }: PropsType) {
  const youtubeId = getYoutubeId(answer.url);
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';

  return (
    <div className="max-w-[1500px] w-[90vw] pb-[28px] md:pb-[100px]flex flex-col justify-center text-white">
      <p className="typo-b5 mt-[20px] md:order-3 md:text-center max-w-[250px] md:max-w-[1500px] m-auto pb-[20px]">
        {answer.text}
      </p>
      {youtubeEmbedUrl ? (
        <iframe
          className="md:max-w-[1500px] md:max-h-[843.75px] w-[90vw] h-[50.625vw] md:order-1 m-auto"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-[250px] md:w-[450px] h-[250px] md:h-[450px md:ml-[30px] bg-[#333333] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}
    </div>
  );
}
