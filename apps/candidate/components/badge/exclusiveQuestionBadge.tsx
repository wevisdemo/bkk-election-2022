import { Spinner } from '@chakra-ui/spinner';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
  ignoreGovernor?: boolean;
}
export function ExclusiveQuestionBadge({ answer, ignoreGovernor }: PropsType) {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const router = useRouter();
  const youtubeId = getYoutubeId(answer.url);
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';
  const onClickCandidate = () => {
    router.push(`/${answer.nc_xeff__candidates_id}`);
  };
  const [ytUrl, setYtUrl] = useState<string>('');

  useEffect(() => {
    setIsLoaded(true);
    setYtUrl(youtubeEmbedUrl);
  }, [youtubeEmbedUrl]);

  return (
    <div className="max-w-[1500px] w-[90vw] pt-[40px] md:pt-[50px] pb-[28px] md:pb-[100px] mx-auto text-center">
      {youtubeEmbedUrl ? (
        <Fragment>
          <div
            className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px]"
            style={{ display: !isLoaded ? 'none' : 'flex' }}
          >
            <Spinner
              className="h-[40vw] w-[40vw] m-auto"
              thickness="7px"
              speed="0.65s"
              emptyColor="white"
              color="black"
            />
          </div>
          <iframe
            style={{ display: isLoaded ? 'none' : 'unset' }}
            onLoad={() => {
              setIsLoaded(false);
            }}
            className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px]"
            id={`answer-${answer.id}`}
            src={ytUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Fragment>
      ) : (
        <div className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}
      {!ignoreGovernor && (
        <Link href={`/${answer.nc_xeff__candidates_id}`}>
          <a>
            <p
              className="typo-h6 text-white mb-[20px] hover:cursor-pointer hover:underline"
              // onClick={() => onClickCandidate()}
            >
              {answer.governorsRead.name}
            </p>
          </a>
        </Link>
      )}
      <p className="typo-b3 text-white max-w-[650px] m-auto">{answer.text}</p>
    </div>
  );
}
