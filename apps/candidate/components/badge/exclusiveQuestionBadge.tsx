import { IQA } from '../../types/business';

interface PropsType {
  qa: IQA;
  ignoreGovernor?: boolean;
}
export function ExclusiveQuestionBadge(props: PropsType) {
  const qa = props.qa;
  return (
    <div className="max-w-[1500px] w-[90vw] mt-[50px] mb-[100px]">
      <iframe
        className="max-w-[1500px] max-h-[843.75px] w-[90vw] h-[50.625vw] mb-[40px]"
        src="https://www.youtube.com/embed/9L2o3X2PkA8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      {!props.ignoreGovernor && (
        <p className="font-heading font-semibold text-[14pt] md:text-[18pt] text-white mb-[20px]">
          {qa.governor}
        </p>
      )}
      <p className="typo-b5 text-white max-w-[650px] m-auto">{qa.answer}</p>
    </div>
  );
}
