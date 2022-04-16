import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
}

export function AnswerStandardCard(props: PropsType) {
  const { answer } = props;
  const youtubeId = getYoutubeId(answer.url);
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';

  return (
    <div className="flex flex-col md:flex-row max-w-[250px] md:max-w-[930px] items-center m-auto">
      <div className="flex-1">
        <p className="typo-h6">{answer.governorsRead.name}</p>
        <p className="typo-b3 mt-[20px]">{answer.text}</p>
      </div>
      {youtubeEmbedUrl ? (
        <iframe
          className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] mb-[40px] md:ml-[30px] mt-[20px] md:mt-0"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] mb-[40px] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}
    </div>
  );
}
