import { IQA } from '../../types/business';

interface PropsType {
  qa: IQA;
  ignoreGovernor?: boolean;
}
export function ExclusiveQuestion(props: PropsType) {
  const qa = props.qa;
  return (
    <div className="max-w-[1500px] w-[90vw] mt-[50px] mb-[100px]">
      <img
        src={qa.url}
        alt="video-thumbnail"
        className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px]"
      />
      {!props.ignoreGovernor && (
        <p className="font-heading font-semibold text-[14pt] md:text-[18pt] text-white mb-[20px]">
          {qa.governor}
        </p>
      )}
      <p className="typo-b5 text-white max-w-[650px] m-auto">{qa.answer}</p>
    </div>
  );
}
