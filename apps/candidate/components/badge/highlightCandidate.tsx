import Image from 'next/image';
import { ICandidate } from '../../types/business';
import candidataImg from '../../static/images/candidate.png';
import { useRouter } from 'next/router';

interface PropType {
  candidate: ICandidate;
}

export function HighlightCandidateBadge(props: PropType) {
  const candidate = props.candidate;
  const router = useRouter();
  const onClickCandidate = (id: number) => {
    router.push(`/governors/${id}`);
  };

  return (
    <div
      className={`max-w-[500px] w-[85vw] md:w-[30vw] m-auto hover:cursor-pointer`}
      onClick={() => onClickCandidate(candidate.id)}
    >
      {/* eslint-disable */}
      <img
        src={candidataImg.src}
        alt="candidate"
        className={`w-[85vw] h-[85vw] md:w-[30vw] md:h-[30vw] max-w-[500px] max-h-[500px] hover:border border-white`}
      />
      <div className="flex text-white mt-[5px] md:mt-[12px]">
        <div className="typo-h2 mr-[10px]">{candidate.id}</div>
        <div className="flex flex-col justify-center">
          <p className="typo-h8">{candidate.name}</p>
          <p className="typo-b5 text-[#ffffff80]">{candidate.team}</p>
        </div>
      </div>
    </div>
  );
}
