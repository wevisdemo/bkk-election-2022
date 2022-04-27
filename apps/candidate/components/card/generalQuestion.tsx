import { Spinner } from '@chakra-ui/spinner';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { IAnswer } from '../../types/business';
import { getYoutubeId } from '../../utils/tranformation';

interface PropsType {
  answer: IAnswer;
  disabledLink?: boolean;
}
export function GeneralQuestionCard({ answer, disabledLink }: PropsType) {
  const router = useRouter();
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
    <div className="md:max-w-[450px] max-w-[250px] flex flex-col justify-between h-full text-left mr-[30px] md:mr-[68px]">
      <div>
        <Link href={`/question/${answer.nc_xeff__questions_id}`}>
          <a
            style={{
              pointerEvents: disabledLink ? 'none' : 'all',
              cursor: disabledLink ? 'unset' : 'pointer',
            }}
            className={`font-heading font-semibold text-[14pt] md:text-[18pt] leading-[1.25] ${
              disabledLink ? '' : 'hover:underline'
            }`}
          >
            {answer.questionsRead.question}
          </a>
        </Link>
        <p className="typo-b5 mt-[20px]">{answer.text}</p>
      </div>
      {youtubeEmbedUrl ? (
        <Fragment>
          <div
            className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] md:ml-[30px] mt-[20px] md:mt-0"
            style={{ display: !isLoaded ? 'none' : 'flex' }}
          >
            <Spinner
              className="w-[50%] h-[50%] m-auto"
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
            className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] md:ml-[30px] mt-[20px] md:mt-0"
            id={`answer-${answer.id}`}
            src={ytUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Fragment>
      ) : (
        <div className="w-[250px] md:w-[450px] h-[250px] md:h-[450px] mb-[40px] typo-h3 text-white flex items-center justify-center">
          No Video
        </div>
      )}
    </div>
  );
}
