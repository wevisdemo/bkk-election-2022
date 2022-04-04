import { useContext } from 'react';
import { ExclusiveQuestion } from '../../components/badge/exclusiveQuestion';
import { AppContext } from '../../store';
import playButtonGray from '../../static/icons/play-gray.svg';

export default function QuestionExclusive() {
  const { store } = useContext(AppContext);
  const qaList = store.qaList;
  const questionCategory = store.questionCategory;

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
            src={playButtonGray}
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

  const question = 'ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.';
  return (
    <div className="bg-black pt-[110px]">
      <div className="w-[90vw] max-w-[1500px] m-auto text-center">
        <div className="">
          <p className="font-heading font-semibold text-[12pt] md:text-[16pt] text-white">
            Exclusive Speech
          </p>
          <p className="font-heading font-semibold text-[24pt] md:text-[36pt] text-white mt-[15px]">
            {question}
          </p>
        </div>
        {qaList.map((qa, index) => {
          return <ExclusiveQuestion key={index} qa={qa} />;
        })}
      </div>

      {/* move this to component */}
      <div className="text-white max-w-[1065px] m-auto px-[18px]">
        <p className="typo-h7 text-center">ดูคำถามอื่นๆ</p>
        <div className="border-b p-10 border-[#9d9d9d80] flex items-center m-auto justify-center">
          <img
            src={playButtonGray}
            alt="play-bt-gray"
            className="w-[25px] h-[25px]"
          />
          <p className="typo-b6 ml-[10px] flex flex-wrap">
            <span className="font-bold">Exclusive Speech :</span>
            ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.
          </p>
        </div>
        <div className="grid grid-cols md:grid-cols-3 gap-[30px] my-10">
          {questionColumn('Policy', questionCategory.policy)}
          {questionColumn('Opinion', questionCategory.opinion)}
          {questionColumn('Lifestyle', questionCategory.lifestyle)}
        </div>
      </div>
    </div>
  );
}
