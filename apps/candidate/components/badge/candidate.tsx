import Image from 'next/image';
import { ICandidate } from '../../types';
import candidataImg from '../../static/images/candidate.png';

interface PropType {
  candidate: ICandidate;
  section?: string;
}

export function CandidateBadge(props: PropType) {
  const isSectionHighlight = props.section == 'highlight';
  const getWidth = isSectionHighlight ? 380 : 200;
  const getWidthMb = isSectionHighlight ? 280 : 140;
  const candidate = props.candidate;
  // TODO: event on click
  return (
    <div className={`w-[${getWidth}px]`}>
      <Image
        src={candidataImg}
        alt="candidate-badge"
        width={getWidth}
        height={getWidth}
      />
      <div className="flex text-white">
        <div className="typo-h1">{candidate.id}</div>
        <div className="flex flex-col">
          <p className="typo-h7">{candidate.name}</p>
          <p className="typo-b5">{candidate.team}</p>
        </div>
      </div>
    </div>
  );
}
