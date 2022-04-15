import { Fragment, useContext } from 'react';
import { AppContext } from '../../store';
import playButtonGray from '../../static/icons/play-gray.svg';
import { IQuestion } from '../../types/business';
import { AnswerStandardCard } from '../../components/card/answerStandard';
import { AnswerStandardList } from '../../components/wrapper/answerStandardList';

export default function StandardQuestion() {
  const { store } = useContext(AppContext);
  const qaList = store.qaList;
  // const questionCategory = store.questionCategory;
  const question: IQuestion = {
    id: 1,
    type: 'policy',
    number: 1,
    question:
      'Bibendum tempor pretium, ut lorem pellentesque ut dictum tortor tincidunt. Facilisis mi eu congue ?',
    description:
      '(เผื่ออธิบายcontextคำถามเพิ่ม)Egestas dui dis eget velit faucibus odio sed venenatis. Velit posuere tortor suspendisse non dignissim massa feugiat. Bibendum vitae id mattis interdum scelerisque. Enim, auctor enim euismod ut bibendum vestibulum feugiat.',
    nc_xeff__candidates_id: 1,
    governorsRead: {
      id: 1,
      name: 'string',
    },
  };

  const onClickQuestion = () => {
    // TODO: redirect to question
  };

  const questionRow = (question: string, colname: string, index: number) => {
    return (
      <div
        className="flex hover:cursor-pointer hover:underline hover:decoration-1"
        onClick={onClickQuestion}
        key={`question-${colname}-${index}`}
      >
        <div>
          <img
            src={playButtonGray.src}
            alt="play-bt-gray"
            className="w-[25px] h-[25px]"
          />
        </div>
        <div className="typo-b6 flex-1 ml-[10px]">{question}</div>
      </div>
    );
  };
  const questionColumn = (colName: string, questionList: string[]) => {
    return (
      <div className="flex flex-col text-left">
        <p className="typo-h9">{colName}:</p>
        <div className="flex flex-col space-y-[25px] mt-5">
          {questionList.map((q, index) => questionRow(q, colName, index))}
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="pt-[110px]  px-[20px]">
        <div className=" max-w-[930px] m-auto text-center">
          <p className="font-heading font-semibold text-[12pt] md:text-[16pt] leading-[1.25]">
            {question.type} Question {question.number}:
          </p>
          <p className="font-heading font-semibold text-[24pt] md:text-[36pt] leading-[1.25] mt-[15px]">
            {question.question}
          </p>
          <p className="font-body text-[12pt] md:text-[14pt] leading-[1.5] mt-[75px] md:mt-[63px]">
            {question.description}
          </p>
        </div>
        <div className="mt-[90px] md:mt-[165px] mb-[48px] md:mb-[94px]">
          <AnswerStandardList answerList={qaList} />
        </div>
      </div>

      <div className="bg-black py-[75px]">
        {/* move this to component */}
        <div className="text-white max-w-[1065px] m-auto px-[18px] bg-black">
          <p className="typo-h7 text-center">ดูคำถามอื่นๆ</p>
          <div className="border-b p-10 border-[#9d9d9d80] flex items-center m-auto justify-center">
            <img
              src={playButtonGray.src}
              alt="play-bt-gray"
              className="w-[25px] h-[25px]"
            />
            <p className="typo-b6 ml-[10px] flex flex-wrap">
              <span className="font-bold">Exclusive Speech :</span>
              ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.
            </p>
          </div>
          <div className="grid grid-cols md:grid-cols-3 gap-[30px] my-10">
            {/* {questionColumn('Policy', questionCategory.policy)}
            {questionColumn('Opinion', questionCategory.opinion)}
            {questionColumn('Lifestyle', questionCategory.lifestyle)} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
