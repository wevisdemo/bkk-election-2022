import { useState } from 'react';
import { IQA, IQA2 } from '../../types/business';
import { ExclusiveQuestionBadge } from '../badge/exclusiveQuestionBadge';
import { GeneralQuestionList } from './generalQuestionList';

interface PropsType {
  qa: IQA2[];
}

interface qaTypeList {
  exclusive: IQA[];
  policy: IQA[];
  opinion: IQA[];
  lifestyle: IQA[];
  special: IQA[];
}

const inititalQaTypeLis: qaTypeList = {
  exclusive: [],
  policy: [],
  opinion: [],
  lifestyle: [],
  special: [],
};

export function GovernorQuestionList() {
  const [qaTypeList, setQaTypeList] = useState<qaTypeList>(inititalQaTypeLis);

  return (
    <div>
      <div className="bg-black">
        <div className="bg-black pt-[80px]">
          <div className="w-[90vw] max-w-[1500px] m-auto text-center">
            <div className="">
              <p className="font-heading font-semibold text-[12pt] md:text-[16pt] text-white">
                Exclusive Speech
              </p>
              <p className="font-heading font-semibold text-[24pt] md:text-[36pt] text-white mt-[15px] md:mb-[30px]">
                {qaTypeList.exclusive[0].question}
              </p>
              {/* <ExclusiveQuestionBadge
                answer={qaTypeList.exclusive[0]}
                ignoreGovernor
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <GeneralQuestionList qaList={qaTypeList.policy} qaType="policy" />
        <GeneralQuestionList qaList={qaTypeList.opinion} qaType="opinion" />
        <GeneralQuestionList qaList={qaTypeList.lifestyle} qaType="lifestyle" />
        <GeneralQuestionList qaList={qaTypeList.special} qaType="special" />
      </div>
    </div>
  );
}
