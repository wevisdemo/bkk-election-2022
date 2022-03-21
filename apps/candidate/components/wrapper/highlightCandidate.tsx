import { ICandidate } from '../../types';
import { CandidateBadge } from '../badge/candidate';

interface PropType {
  candidateList: ICandidate[];
}
export function HighLightCandidate(props: PropType) {
  const candidateBadgeList = props.candidateList.map((candidate) => {
    return CandidateBadge({ candidate, section: 'highlight' });
  });
  return (
    <div className="grid grid-cols-3 gap-[10px] max-w-[1160px] m-auto mt-[46px]">
      {candidateBadgeList}
    </div>
  );
}
