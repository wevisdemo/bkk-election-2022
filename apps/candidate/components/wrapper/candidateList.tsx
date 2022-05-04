import { Fragment } from 'react';
import { IGovernor } from '../../types/business';
import { CandidateBadge } from '../badge/candidate';

interface PropsType {
  candidateList: IGovernor[];
  isComingSoon?: boolean;
}

export function CandidateList({ candidateList, isComingSoon }: PropsType) {
  const candidateCount = candidateList.length;

  const candidateListComponent = candidateList.map((candidate, index) => {
    return (
      <CandidateBadge
        key={`candidate-badge-${index}`}
        candidate={candidate}
        showPlayButton={!isComingSoon}
        fromHome={true}
      />
    );
  });

  return (
    <Fragment>
      <h2 className="typo-h5 text-white py-[48px] text-center">
        ผู้สมัครผู้ว่าฯ กทม.ทั้งหมด
        <span className="typo-b2"> ({candidateCount} คน) </span>
      </h2>
      <div className="grid grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(5,auto)] gap-[15px] md:gap-[30px] m-auto">
        {candidateListComponent}
      </div>
    </Fragment>
  );
}
