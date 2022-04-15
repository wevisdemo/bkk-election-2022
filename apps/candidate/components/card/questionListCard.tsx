import playButtonGray from '../../static/icons/play-gray.svg';
import { useEffect, useState } from 'react';
import { IQuestion, IQuestionCategory } from '../../types/business';
import { useRouter } from 'next/router';

interface Propstype {
  questionList: IQuestion[];
}

const initialQuestionCat: IQuestionCategory = {
  exclusive: [],
  policy: [],
  opinion: [],
  lifestyle: [],
};

export function QuestionListCard(props: Propstype) {
  const router = useRouter();
  const [questionCat, setQuestionCat] =
    useState<IQuestionCategory>(initialQuestionCat);
  const { questionList } = props;

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
    <div className="text-white max-w-[1065px] m-auto px-[18px] mt-[70px] md:mt-[110px]">
      <p className="typo-h5 text-center">ดูคำถามอื่นๆ</p>
      <div
        className="border-b p-10 border-[#9d9d9d80] flex items-center m-auto justify-center  hover:cursor-pointer hover:underline hover:decoration-1"
        onClick={() => onClickQuestion(questionCat.exclusive[0].id)}
      >
        <img
          src={playButtonGray.src}
          alt="play-bt-gray"
          className="w-[25px] h-[25px]"
        />
        <p className="typo-b5 ml-[10px] flex flex-wrap">
          <span className="font-bold">Exclusive Speech :</span>
          {questionCat.exclusive[0]?.question}
        </p>
      </div>
      <div className="grid grid-cols md:grid-cols-3 gap-[30px] mt-10">
        {questionColumn('Policy', questionCat.policy)}
        {questionColumn('Opinion', questionCat.opinion)}
        {questionColumn('Lifestyle', questionCat.lifestyle)}
      </div>
    </div>
  );
}
