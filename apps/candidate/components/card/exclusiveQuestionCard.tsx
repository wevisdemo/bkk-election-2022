import { Spinner } from '@chakra-ui/spinner';
import { Fragment, useEffect, useState } from 'react';
import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
  ignoreQuestion?: boolean;
}
export function ExclusiveQuestionCard({ answer }: PropsType) {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const youtubeId = getYoutubeId(answer.url);
  const youtubeEmbedUrl = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : '';
  const [ytUrl, setYtUrl] = useState<string>('');

  useEffect(() => {
    setIsLoaded(true);
    setYtUrl(youtubeEmbedUrl);
  }, [youtubeEmbedUrl]);

  return (
    <div className="max-w-[1500px] w-[90vw] pb-[28px] md:pb-[100px]flex flex-col justify-center text-white">
      <p className="typo-b5 mt-[20px] md:order-3 md:text-center max-w-[250px] md:max-w-[1500px] m-auto pb-[20px]">
        {answer.text}
      </p>
      {youtubeEmbedUrl ? (
        <Fragment>
          <div
            className="md:max-w-[1500px] md:max-h-[843.75px] w-[90vw] h-[50.625vw] md:order-1 m-auto"
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
            key={`iframe-q${answer.id}`}
            style={{ display: isLoaded ? 'none' : 'unset' }}
            onLoad={() => {
              setIsLoaded(false);
            }}
            className="md:max-w-[1500px] md:max-h-[843.75px] w-[90vw] h-[50.625vw] md:order-1 m-auto"
            id={`answer-${answer.id}`}
            src={ytUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Fragment>
      ) : (
        <div className="md:max-w-[1500px] md:max-h-[843.75px] w-[90vw] h-[50.625vw] md:order-1 m-auto">
          No Video
        </div>
      )}
    </div>
  );
}
