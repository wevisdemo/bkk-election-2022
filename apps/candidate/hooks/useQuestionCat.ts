import { useEffect, useState } from 'react';
import { IQuestion, IQuestionCategory } from '../types/business';

const initialQuestionCat: IQuestionCategory = {
  exclusive: [],
  policy: [],
  opinion: [],
  lifestyle: [],
  special: [],
};

export const useQuestionCat = (questionList: IQuestion[]) => {
  const [questionCat, setQuestionCat] =
    useState<IQuestionCategory>(initialQuestionCat);

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
    const specialQuestion = questionList.filter(
      (question) => question.type === 'special'
    );
    setQuestionCat({
      exclusive: exclusiveQuestion,
      policy: policyQuestion,
      opinion: opinionQuestion,
      lifestyle: lifestyleQuestion,
      special: specialQuestion,
    });
  }, [questionList]);

  return questionCat;
};
