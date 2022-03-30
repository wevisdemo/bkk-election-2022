import { IQA } from '../../types/business';

interface PropsType {
  answer: IQA;
}

export function AnswerStandardCard(props: PropsType) {
  const { answer } = props;

  return (
    <div className="flex flex-col md:flex-row max-w-[230px] md:max-w-[930px] items-center m-auto">
      <div className="flex-1">
        <p className="font-heading font-semibold text-[14pt] md:text-[18pt] leading-[1.25]">
          {answer.governor}
        </p>
        <p className="typo-b5 mt-[20px]">{answer.answer}</p>
      </div>
      <video className="w-[250px] h-[250px] md:w-[450px] md:h-[450px]" controls>
        <source
          src="https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
