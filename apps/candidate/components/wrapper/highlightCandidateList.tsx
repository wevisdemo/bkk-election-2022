import { IGovernor } from '../../types/business';
import { HighlightCandidateBadge } from '../badge/highlightCandidate';

interface PropType {
  candidateList: IGovernor[];
  isComingSoon?: boolean;
}
export function HighLightCandidateList({
  candidateList,
  isComingSoon,
}: PropType) {
  const candidateBadgeList = candidateList.map((candidate) => {
    return (
      <HighlightCandidateBadge
        key={`hl-candidate-${candidate.id}`}
        candidate={candidate}
        isComingSoon={isComingSoon}
      />
    );
  });
  return (
    <div className="grid grid-cols md:grid-cols-[repeat(3,auto)] gap-[10px] mt-[46px] m-auto">
      {candidateBadgeList}
    </div>
  );
}
