import { IGovernor } from '../../types/business';
import candidataImg from '../../static/images/candidate.png';
import playGrayWhite from '../../static/icons/play-gw.svg';
import { useRouter } from 'next/router';
import { colorDict, numberListType } from '../../utils/dict';
interface PropType {
  candidate: IGovernor;
  isComingSoon?: boolean;
}

export function CandidateBadge({ candidate, isComingSoon }: PropType) {
  const router = useRouter();
  const onClickCandidate = (id: number | null) => {
    if (!id) {
      return;
    }
    router.push(`/${id}#c-${id}`);
  };

  return (
    <div
      id={`c-${candidate.number}`}
      className={`h-full max-w-[250px] w-[43vw] md:w-[15vw] m-auto hover:cursor-pointer`}
      onClick={() => onClickCandidate(candidate.id)}
    >
      {/* eslint-disable */}
      <div className="w-[43vw] h-[43vw] md:w-[15vw] md:h-[15vw] max-w-[250px] max-h-[250px] relative">
        <img
          src={candidate.profile_pic || candidataImg.src}
          alt="candidate"
          className={`w-[43vw] h-[43vw] md:w-[15vw] md:h-[15vw] max-w-[250px] max-h-[250px] hover:border border-white`}
        />
        {!isComingSoon && candidate.highlight && (
          <img
            src={playGrayWhite.src}
            alt="play"
            className="w-[30px] h-[30px] absolute bottom-[10px] right-[10px] pointer-events-none"
          />
        )}
      </div>
      <div className="flex text-white mt-[10px]">
        <div
          style={{
            color: colorDict[(candidate.number as numberListType) || 1],
          }}
          className="typo-h3 mr-[10px]"
        >
          {candidate.number}
        </div>
        <div className="flex flex-col justify-center">
          <p className="typo-h8">{candidate.name}</p>
          <p className="typo-b5 text-[#ffffff80]">{candidate.party}</p>
        </div>
      </div>
    </div>
  );
}
