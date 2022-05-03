import { ComponentProps, FunctionComponent } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { getYoutubeId } from '../utils/tranformation';

interface YoutubePlayerProps
  extends Omit<ComponentProps<typeof LiteYouTubeEmbed>, 'id'> {
  url: string;
  className?: string;
}

const YoutubePlayer: FunctionComponent<YoutubePlayerProps> = ({
  url,
  className = '',
  ...liteYoutubeProp
}: YoutubePlayerProps) => {
  const youtubeId = getYoutubeId(url);

  if (!youtubeId)
    return (
      <div className={`${className} typo-h3 flex items-center justify-center`}>
        No Video
      </div>
    );

  return (
    <div className={className}>
      <LiteYouTubeEmbed id={youtubeId} {...liteYoutubeProp} />
    </div>
  );
};

export default YoutubePlayer;
