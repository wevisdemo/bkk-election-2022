import { useRouter } from 'next/router';
import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
  ignoreGovernor?: boolean;
}
export function ExclusiveQuestionBadge({ answer, ignoreGovernor }: PropsType) {
  const router = useRouter();
  const youtubeId = getYoutubeId(answer.url);
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';
  const onClickCandidate = () => {
    router.push(`/${answer.nc_xeff__candidates_id}`);
  };

  return (
    <div className="max-w-[1500px] w-[90vw] pt-[40px] md:pt-[50px] pb-[28px] md:pb-[100px] mx-auto text-center">
      {youtubeEmbedUrl ? (
        <iframe
          className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px]"
          src={youtubeEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px] bg-[#333333] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}

      {!ignoreGovernor && (
        <a href={`/candidate/${answer.nc_xeff__candidates_id}`}>
          <p
            className="typo-h6 text-white mb-[20px] hover:cursor-pointer hover:underline"
            // onClick={() => onClickCandidate()}
          >
            {answer.governorsRead.name}
          </p>
        </a>
      )}
      <p className="typo-b3 text-white max-w-[650px] m-auto">{answer.text}</p>
    </div>
  );
}
