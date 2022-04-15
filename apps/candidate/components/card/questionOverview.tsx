import playButtonBw from '../../static/icons/play-wb.svg';
import playButtonGray from '../../static/icons/play-gray.svg';
import { AppContext } from '../../store';
import { useContext, useEffect, useState } from 'react';
import { IQuestion, IQuestionCategory } from '../../types/business';

interface Propstype {
  isComingSoon?: boolean;
  questionList: IQuestion[];
}

const initialQuestionCat: IQuestionCategory = {
  exclusive: [],
  policy: [],
  opinion: [],
  lifestyle: [],
};

export function QuestionOverview(props: Propstype) {
  // TODO: get from props
  const { store } = useContext(AppContext);
  // const questionCategory = store.questionCategory;
  const [questionCat, setQuestionCat] =
    useState<IQuestionCategory>(initialQuestionCat);
  const { isComingSoon, questionList } = props;

  useEffect(() => {
    const exclusiveQuestion = questionList.filter(
      (question) => question.type === 'exclusive'
    );
    const policyQuestion = questionList.filter(
      (question) => question.type === 'policy'
    );
    const opinionQuestion = questionList.filter(
      (question) => question.type === 'attitude'
    );
    const lifestyleQuestion = questionList.filter(
      (question) => question.type === 'lifestyle'
    );
    setQuestionCat({
      exclusive: exclusiveQuestion,
      policy: policyQuestion,
      opinion: opinionQuestion,
      lifestyle: lifestyleQuestion,
    });
  }, [questionList]);

  const onClickQuestion = () => {
    // TODO: redirect to question
  };

  const questionRow = (question: IQuestion) => {
    return (
      <div
        className="flex hover:cursor-pointer hover:underline hover:decoration-1"
        onClick={onClickQuestion}
        key={`question-${question.type}-${question.number}`}
      >
        <div>
          <img
            src={playButtonGray.src}
            alt="play-bt-gray"
            className="w-[25px] h-[25px]"
          />
        </div>
        <div className="typo-b6 flex-1 ml-[10px]">{question.question}</div>
      </div>
    );
  };
  const questionColumn = (colName: string, questionList: IQuestion[]) => {
    return (
      <div className="flex flex-col text-left">
        <p className="typo-h9">{colName}:</p>
        <div className="flex flex-col space-y-[25px] mt-5">
          {questionList.map((q, index) => questionRow(q))}
        </div>
      </div>
    );
  };

  return (
    <div className="text-white mx-[8px] mt-[20px] md:mt-[40px] relative">
      {isComingSoon && (
        <div className="">
          <p className="absolute z-[12] text-center w-full typo-h6 top-[65px]">
            Coming Soon...
          </p>
          <div className="absolute w-full h-full bg-black z-10 opacity-50"></div>
        </div>
      )}
      <div className="text-white mx-[8px] mt-20 relative">
        <div className="absolute top-[-30px] w-full text-center">
          <img
            src={playButtonBw.src}
            alt="play-bt-bw"
            className="w-[61px] h-[61px] mx-auto"
          />
        </div>
        <div className="text-center p-10 border border-[#9d9d9d] rounded-[10px] max-w-[1145px] m-auto">
          <p className="typo-h4 mt-5 mb-10">
            ฟัง 5 ผู้สมัครในกระแสตอบ 21 คำถามเดียวกัน
          </p>
          {questionCat.exclusive.length > 0 && (
            <div className="border-y p-10 border-[#9d9d9d80] flex items-center m-auto justify-center">
              <img
                src={playButtonGray.src}
                alt="play-bt-gray"
                className="w-[25px] h-[25px]"
              />
              <p className="typo-b5 ml-[10px]">
                <span className="font-bold">Exclusive Speech :</span>
                {questionCat.exclusive[0]?.question}
              </p>
            </div>
          )}
          <div className="grid grid-cols md:grid-cols-3 gap-[30px] my-10">
            {questionColumn('Policy', questionCat.policy)}
            {questionColumn('Opinion', questionCat.opinion)}
            {questionColumn('Lifestyle', questionCat.lifestyle)}
          </div>
          <div className="font-body text-[12pt] md:text-[14pt] border-t border-[#9d9d9d80] pt-10 pt-[30px] font-bold">
            + อีก 5 คำถามเคลียร์ใจเฉพาะตัวผู้สมัคร
          </div>
        </div>
      </div>
    </div>
  );
}
