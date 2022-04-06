import { Fragment, useContext } from 'react';
import { AppContext } from '../../store';
import { IGovernor } from '../../types/business';
import { CandidateBadge } from '../badge/candidate';

interface PropsType {
  candidateList: IGovernor[];
}

export function CandidateList(props: PropsType) {
  const candidateCount = props.candidateList.length;

  const candidateListComponent = props.candidateList.map((candidate, index) => {
    return (
      <CandidateBadge key={`candidate-badge-${index}`} candidate={candidate} />
    );
  });

  return (
    <Fragment>
      <p className="typo-h7 text-white py-[48px] text-center">
        ผู้สมัครผู้ว่าฯ กทม.ทั้งหมด
        <span className="typo-b5"> ({candidateCount}) </span>
      </p>
      <div className="grid grid-cols-[repeat(2,auto)] md:grid-cols-[repeat(5,auto)] gap-[15px] md:gap-[30px] m-auto">
        {candidateListComponent}
      </div>
    </Fragment>
  );
}
