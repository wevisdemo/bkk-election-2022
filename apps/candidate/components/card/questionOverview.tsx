import playButtonBw from '../../static/icons/play-wb.svg';
import playButtonGray from '../../static/icons/play-gray.svg';
import { useEffect, useState } from 'react';
import { IGovernor, IQuestion, IQuestionCategory } from '../../types/business';
import { useRouter } from 'next/router';

interface Propstype {
  isComingSoon?: boolean;
  questionList: IQuestion[];
  candidateList: IGovernor[];
}

const initialQuestionCat: IQuestionCategory = {
  exclusive: [],
  policy: [],
  opinion: [],
  lifestyle: [],
};

export function QuestionOverview(props: Propstype) {
  const router = useRouter();
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

  const onClickQuestion = (id: number) => {
    router.push(`/question/${id}`);
  };

  const questionRow = (question: IQuestion) => {
    return (
      <div
        className="flex hover:cursor-pointer hover:underline hover:decoration-1"
        onClick={() => onClickQuestion(question.id)}
        key={`question-${question.type}-${question.number}`}
      >
        <div>
          <img
            src={playButtonGray.src}
            alt="play-bt-gray"
            className="w-[15px] h-[15px] md:w-[25px] md:h-[25px]"
          />
        </div>
        <div className="typo-b4 flex-1 ml-[10px]">{question.question}</div>
      </div>
    );
  };
  const questionColumn = (colName: string, questionList: IQuestion[]) => {
    return (
      <div className="flex flex-col text-left">
        <p className="typo-h6">{colName}:</p>
        <div className="flex flex-col space-y-[25px] mt-5">
          {questionList.map((q, index) => questionRow(q))}
        </div>
      </div>
    );
  };

  const getGeneralQuestionsCount = (): number => {
    return (
      questionCat.lifestyle.length +
      questionCat.policy.length +
      questionCat.opinion.length
    );
  };

  const getSpecialQuestionCandidate = () => {
    return questionList
      .filter((question) => question.type === 'special')
      .reduce((result, curr) => {
        if (
          result.find((q) => q.governorsRead?.name === curr.governorsRead?.name)
        ) {
          return result;
        } else {
          if (curr.governorsRead) {
            return [...result, curr];
          }
        }
        return result;
      }, [] as IQuestion[])
      .sort((a, b) =>
        a.nc_xeff__candidates_id > b.nc_xeff__candidates_id ? 1 : -1
      );
  };

  const onClickCandidate = (id: number) => {
    router.push(`/${id}`);
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
        <div className="text-center px-[18px] pb-[20px] md:pb-[50px] border border-[#9d9d9d] rounded-[10px] max-w-[1145px] m-auto">
          <p className="typo-h5 pt-[60px] pb-[20px] border-b border-[#9d9d9d80]">
            ฟัง {props.candidateList.length} ผู้สมัครตอบ{' '}
            {getGeneralQuestionsCount()} คำถามเดียวกัน
          </p>
          {questionCat.exclusive.length > 0 && (
            <div className="border-b border-[#9d9d9d80] py-[20px] md:py-[40px] flex m-auto justify-center">
              <div
                className="flex m-fit hover:cursor-pointer hover:underline hover:decoration-1"
                onClick={() => onClickQuestion(questionCat.exclusive[0].id)}
              >
                <img
                  src={playButtonGray.src}
                  alt="play-bt-gray"
                  className="w-[15px] h-[15px] md:w-[25px] md:h-[25px]"
                />
                <p className="typo-b5 ml-[10px] flex flex-wrap text-left">
                  <span className="font-bold">EXCLUSIVE SPEECH : </span>{' '}
                  {questionCat.exclusive[0]?.question}
                </p>
              </div>
            </div>
          )}
          <div className="grid grid-cols md:grid-cols-3 gap-[30px] py-[20px] md:py-[40px] border-b border-[#9d9d9d80]">
            {questionColumn('POLICY', questionCat.policy)}
            {questionColumn('OPINION', questionCat.opinion)}
            {questionColumn('LIFESTYLE', questionCat.lifestyle)}
          </div>
          <div className="pt-[20px] md:pt-[40px] ">
            <p className="typo-b4 text-center font-bold">
              + อีก {getSpecialQuestionCandidate().length}{' '}
              คำถามเคลียร์ใจเฉพาะตัวผู้สมัคร
            </p>
            <div className="flex md:flex-row flex-col flex-wrap justify-between md:mt-[15px]">
              {getSpecialQuestionCandidate().map((question) => {
                return (
                  <a
                    href={`/candidate/${question.nc_xeff__candidates_id || 1}`}
                    className="flex hover:cursor-pointer hover:underline hover:decoration-1 mt-[25px] mx-[5px]"
                    // onClick={() =>
                    //   onClickCandidate(question.nc_xeff__candidates_id || 1)
                    // }
                    key={`candidate-${question.nc_xeff__candidates_id}`}
                  >
                    <div className="flex items-center">
                      <img
                        src={playButtonGray.src}
                        alt="play-bt-gray"
                        className="w-[15px] h-[15px] md:w-[25px] md:h-[25px]"
                      />
                    </div>
                    <div className="typo-b4 ml-[10px]">
                      {question.governorsRead?.name}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
