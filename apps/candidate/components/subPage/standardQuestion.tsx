import { Fragment, useContext } from 'react';
import playButtonGray from '../../static/icons/play-gray.svg';
import { AnswerStandardList } from '../../components/wrapper/answerStandardList';

export default function StandardQuestion() {
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
        {/* <div className=" max-w-[930px] m-auto text-center">
          <p className="font-heading font-semibold text-[12pt] md:text-[16pt] leading-[1.25]">
            {question.type} Question {question.number}:
          </p>
          <p className="font-heading font-semibold text-[24pt] md:text-[36pt] leading-[1.25] mt-[15px]">
            {question.question}
          </p>
          <p className="font-body text-[12pt] md:text-[14pt] leading-[1.5] mt-[75px] md:mt-[63px]">
            {question.description}
          </p>
        </div> */}
        <div className="mt-[90px] md:mt-[165px] mb-[48px] md:mb-[94px]">
          {/* <AnswerStandardList answerList={qaList} /> */}
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
