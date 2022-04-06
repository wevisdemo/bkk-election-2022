import { ICandidate, IGovernor } from '../../types/business';
import { CandidateBadge } from '../badge/candidate';
import { HighlightCandidateBadge } from '../badge/highlightCandidate';

interface PropType {
  candidateList: IGovernor[];
}
export function HighLightCandidateList(props: PropType) {
  const candidateBadgeList = props.candidateList.map((candidate) => {
    return (
      <HighlightCandidateBadge
        key={`hl-candidate-${candidate.id}`}
        candidate={candidate}
      />
    );
  });
  return (
    <div className="grid grid-cols md:grid-cols-[repeat(3,auto)] gap-[10px] mt-[46px] m-auto">
      {candidateBadgeList}
    </div>
  );
}
