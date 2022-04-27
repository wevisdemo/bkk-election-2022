import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { IQuestion, IAnswer } from '../../types/business';
import { ExclusiveQuestionBadge } from '../badge/exclusiveQuestionBadge';
import { ExclusiveQuestionCard } from '../card/exclusiveQuestionCard';
import { AnswerStandardList } from './answerStandardList';
import { GeneralQuestionList } from './generalQuestionList';

interface PropsType {
  questionList: IQuestion[];
  answerList: IAnswer[];
}

interface IAnswerCategory {
  exclusive: IAnswer[];
  policy: IAnswer[];
  opinion: IAnswer[];
  lifestyle: IAnswer[];
  special: IAnswer[];
}

const initialAnswerCategory: IAnswerCategory = {
  exclusive: [],
  policy: [],
  opinion: [],
  lifestyle: [],
  special: [],
};

interface IQuestionCategory {
  exclusive: IQuestion[];
  policy: IQuestion[];
  opinion: IQuestion[];
  lifestyle: IQuestion[];
  special: IQuestion[];
}

type questionType =
  | 'exclusive'
  | 'policy'
  | 'opinion'
  | 'lifestyle'
  | 'special';

export function CandidateQuestionWrapper({
  questionList,
  answerList,
}: PropsType) {
  const [answerCategory, setAnswerCategory] = useState<IAnswerCategory>(
    initialAnswerCategory
  );

  const sortQuestionByNumber = (questions: IQuestion[]) => {
    questions.sort((a, b) => {
      return a.number > b.number ? 1 : -1;
    });
    return questions;
  };

  const mapAnswerByType = (
    type: questionType,
    questionList: IQuestion[],
    answerList: IAnswer[]
  ) => {
    const sortedQuestionList = sortQuestionByNumber(questionList);
    let ansGroupByType: IAnswer[] = [];
    for (const question of sortedQuestionList) {
      const answer = answerList.find(
        (ans) => ans.questionsRead.id === question.id
      );
      if (!answer) {
        continue;
      }
      ansGroupByType = [...ansGroupByType, answer];
    }
    setAnswerCategory((ansCat) => {
      ansCat[type] = ansGroupByType;
      return ansCat;
    });
  };

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
    mapAnswerByType('exclusive', exclusiveQuestion, answerList);
    mapAnswerByType('policy', policyQuestion, answerList);
    mapAnswerByType('opinion', opinionQuestion, answerList);
    mapAnswerByType('lifestyle', lifestyleQuestion, answerList);
    mapAnswerByType('special', specialQuestion, answerList);
  }, [questionList, answerList]);

  return (
    <Fragment>
      {answerCategory.exclusive.length > 0 && (
        <div className="bg-black pt-[28px] md:pt-[80px] ">
          <div className="max-w-[1500px] w-[90vw] pt-[40px] md:pt-[50px] pb-[28px] md:pb-[100px] m-auto">
            <p className="typo-h7 text-white md:text-center w-full max-w-[250px] md: m-auto">
              EXCLUSIVE SPEECH
            </p>
            <div className="w-full flex">
              <Link
                href={`/question/${answerCategory.exclusive[0].nc_xeff__questions_id}`}
              >
                <a className="typo-h3 text-white md:text-center w-full max-w-[250px] md:max-w-[1500px] mt-[10px] m-auto hover:cursor-pointer hover:underline">
                  {answerCategory.exclusive[0].questionsRead.question}
                </a>
              </Link>
            </div>
            <ExclusiveQuestionCard
              answer={answerCategory.exclusive[0]}
              ignoreQuestion
            />
          </div>
        </div>
      )}
      <div className="">
        {answerCategory.policy.length > 0 && (
          <Fragment>
            <GeneralQuestionList
              answerList={answerCategory.policy}
              questionType="policy"
            />
            <div className="border-b-[2px] border-[#DADADA] w-[90vw] m-auto" />
          </Fragment>
        )}
        {answerCategory.opinion.length > 0 && (
          <Fragment>
            <GeneralQuestionList
              answerList={answerCategory.opinion}
              questionType="opinion"
            />
            <div className="border-b-[2px] border-[#DADADA] w-[90vw] m-auto" />
          </Fragment>
        )}
        {answerCategory.lifestyle.length > 0 && (
          <Fragment>
            <GeneralQuestionList
              answerList={answerCategory.lifestyle}
              questionType="lifestyle"
            />
          </Fragment>
        )}
        {answerCategory.special.length > 0 && (
          <div className="bg-[#F1F1F1]">
            <GeneralQuestionList
              disabledLink={true}
              answerList={answerCategory.special}
              questionType="special"
            />
            {/* <div className="border-b-[2px] border-[#DADADA] w-[90vw] m-auto" /> */}
          </div>
        )}
      </div>
    </Fragment>
  );
}
