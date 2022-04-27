import playButtonGray from '../../static/icons/play-gray.svg';
import { IQuestion } from '../../types/business';
import { useRouter } from 'next/router';
import { useQuestionCat } from '../../hooks/useQuestionCat';

interface Propstype {
  questionList: IQuestion[];
}

export function QuestionListCard(props: Propstype) {
  const router = useRouter();
  const { questionList } = props;

  const questionCat = useQuestionCat(questionList);

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

  const onClickQuestion = (id: number) => {
    router.push(`/question/${id}`);
  };

  const onClickCandidate = (id: number) => {
    router.push(`/${id}`);
  };

  const questionRow = (question: IQuestion) => {
    return (
      <a
        href={`/candidate/question/${question.id}`}
        className="flex hover:cursor-pointer hover:underline hover:decoration-1"
        // onClick={() => onClickQuestion(question.id)}
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
      </a>
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

  return (
    <div className="text-white max-w-[1065px] m-auto px-[18px] pt-[70px] md:pt-[110px] pb-[64px] md:pb-[88px]">
      <p className="typo-h5 text-center">ดูคำถามอื่นๆ</p>
      {questionCat.exclusive.length > 0 && (
        <div className="border-b border-[#9d9d9d80] py-[20px] md:py-[40px] flex m-auto justify-center">
          <a
            href={`/candidate/question/${questionCat.exclusive[0].id}`}
            className="flex m-fit hover:cursor-pointer hover:underline hover:decoration-1"
            // onClick={() => onClickQuestion(questionCat.exclusive[0].id)}
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
          </a>
        </div>
      )}
      <div className="grid grid-cols md:grid-cols-3 gap-[30px] py-[20px] md:py-[40px] border-b border-[#9d9d9d80]">
        {questionColumn('POLICY', questionCat.policy)}
        {questionColumn('OPINION', questionCat.opinion)}
        {questionColumn('LIFESTYLE', questionCat.lifestyle)}
      </div>
      <div className="py-[20px] md:py-[40px] border-b border-[#9d9d9d80]">
        <p className="typo-b4 text-center font-bold">
          + อีก {Math.max(...questionCat.special.map(({ number }) => number))}{' '}
          คำถามเคลียร์ใจเฉพาะตัวผู้สมัคร
        </p>
        <div className="flex md:flex-row flex-col flex-wrap justify-between md:mt-[15px]">
          {getSpecialQuestionCandidate().map((question) => {
            return (
              <a
                href={`/candidate/${question.nc_xeff__candidates_id || 1}`}
                className="flex hover:cursor-pointer hover:underline hover:decoration-1 mt-[25px] mx-[5px]"
                // onClick={() =>
                //   onClickCandidate(question.governorsRead?.id || 1)
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
  );
}
