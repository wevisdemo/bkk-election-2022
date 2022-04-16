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
    <div className="md:max-w-[1500px] max-w-[250px] pb-[40px] flex flex-col justify-center text-white">
      <p className="typo-b5 mt-[20px] md:order-3 md:text-center">
        {answer.text}
      </p>
      {youtubeEmbedUrl ? (
        <iframe
          className="md:max-w-[1500px] md:max-h-[843.75px] md:w-[90vw] md:h-[50.625vw] w-[250px] h-[250px] mt-[20px] md:mt-0 md:order-1"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-[250px] md:w-[450px] h-[250px] md:h-[450px md:ml-[30px] mt-[20px] md:mt-0 bg-[#333333] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}
    </div>
  );
}
