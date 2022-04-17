import { IGovernor } from '../../types/business';
import candidataImg from '../../static/images/candidate.png';
import playGrayWhite from '../../static/icons/play-gw.svg';
import { useRouter } from 'next/router';
interface PropType {
  candidate: IGovernor;
  isComingSoon?: boolean;
}

type numberListType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

const colorDict = {
  1: '#F66C03',
  2: '#D185FF',
  3: '#008989',
  4: '#4BDFFF',
  5: '#6DA7FF',
  6: '#EDDF95',
  7: '#A7764F',
  8: '#82E016',
  9: '#FF408E',
  10: '#39A96A',
  11: '#476FFF',
  12: '#C6A059',
  13: '#588CB1',
  14: '#83A74F',
  15: '#FFF06C',
  16: '#FFA1D7',
  17: '#8E7CFF',
  18: '#9CA3E7',
  19: '#C8595C',
  20: '#FFA37C',
  21: '#B8E7B1',
  22: '#7CFFD8',
  23: '#3C7EFF',
  24: '#CDA682',
  25: '#FF7C7C',
  26: '#1892AD',
  27: '#FFA149',
  28: '#789978',
  29: '#9867C9',
  30: '#BFF27F',
  31: '#FC4145',
};

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
