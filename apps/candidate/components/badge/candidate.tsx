import Image from 'next/image';
import { ICandidate } from '../../types/business';
import candidataImg from '../../static/images/candidate.png';
import { useRouter } from 'next/router';
interface PropType {
  candidate: ICandidate;
  section?: string;
}

export function CandidateBadge(props: PropType) {
  const candidate = props.candidate;
  const router = useRouter();
  const onClickCandidate = (id: number) => {
    router.push(`/governors/${id}`);
  };

  return (
    <div
      className={`max-w-[250px] w-[43vw] md:w-[15vw] m-auto hover:cursor-pointer`}
      onClick={() => onClickCandidate(candidate.id)}
    >
      {/* eslint-disable */}
      <img
        src={candidataImg.src}
        alt="candidate"
        className={`w-[43vw] h-[43vw] md:w-[15vw] md:h-[15vw] max-w-[250px] max-h-[250px]`}
      />
      <div className="flex text-white mt-[10px]">
        <div className="font-heading font-semibold text-[21pt] md:text-[27pt] mr-[10px]">
          {candidate.id}
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-heading font-semibold text-[11pt] md:text-[14pt]">
            {candidate.name}
          </p>
          <p className="font-body text-[11pt] md:text-[12pt] text-[#ffffff80]">
            {candidate.team}
          </p>
        </div>
      </div>
    </div>
  );
}
