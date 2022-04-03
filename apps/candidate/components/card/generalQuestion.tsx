import { IQA } from '../../types/business';

interface PropsType {
  qa: IQA;
}
export function GeneralQuestionCard(props: PropsType) {
  const { qa } = props;

  return (
    <div className="md:max-w-[450px] max-w-[250px] flex flex-col">
      <p className="font-heading font-semibold text-[14pt] md:text-[18pt] leading-[1.25]">
        {qa.question}
      </p>
      <p className="typo-b5 mt-[20px]">{qa.answer}</p>
      <video className="w-[250px] h-[250px] md:w-[450px] md:h-[450px]" controls>
        <source
          src="https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/sample-mp4-file.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
