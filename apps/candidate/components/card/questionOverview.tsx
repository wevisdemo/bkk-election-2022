import Image from 'next/image';
import playButtonBw from '../../static/icons/play-wb.svg';
import playButtonGray from '../../static/icons/play-gray.svg';
import { AppContext } from '../../store';
import { useContext } from 'react';

interface Propstype {
  isComingSoon?: boolean;
}

export function QuestionOverview(props: Propstype) {
  // TODO: get from props
  const { store } = useContext(AppContext);
  const questionCategory = store.questionCategory;
  const { isComingSoon } = props;

  const onClickQuestion = () => {
    console.log('question');

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
          <Image
            src={playButtonGray}
            alt="play-bt-gray"
            width="25px"
            height="25px"
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
          <Image src={playButtonBw} alt="play-bt-bw" width={61} height={61} />
        </div>
        <div className="text-center p-10 border border-[#9d9d9d] rounded-[10px] max-w-[1145px] m-auto">
          <p className="typo-h4 mt-5 mb-10">
            ฟัง 5 ผู้สมัครในกระแสตอบ 21 คำถามเดียวกัน
          </p>
          <div className="border-y p-10 border-[#9d9d9d80] flex items-center m-auto justify-center">
            <Image
              src={playButtonGray}
              alt="play-bt-gray"
              width={25}
              height={25}
            />
            <p className="typo-b5 ml-[10px]">
              <span className="font-bold">Exclusive Speech :</span>
              ทำไมต้องเลือกคุณเป็นผู้ว่าฯ กทม.
            </p>
          </div>
          <div className="grid grid-cols md:grid-cols-3 gap-[30px] my-10">
            {questionColumn('Policy', questionCategory.policy)}
            {questionColumn('Opinion', questionCategory.opinion)}
            {questionColumn('Lifestyle', questionCategory.lifestyle)}
          </div>
          <div className="font-body text-[12pt] md:text-[14pt] border-t border-[#9d9d9d80] pt-10 pt-[30px] font-bold">
            + อีก 5 คำถามเคลียร์ใจเฉพาะตัวผู้สมัคร
          </div>
        </div>
      </div>
    </div>
  );
}
