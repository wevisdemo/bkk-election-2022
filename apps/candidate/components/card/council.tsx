import Link from 'next/link';
import searchIcon from '../../static/icons/search.svg';
import { ICouncil } from '../../types/business';
import { districtOrderList, getCouncilImage } from '../../utils/dict';

interface PropsType {
  council: ICouncil;
}

export function Council(props: PropsType) {
  const council = props.council;
  const districtNumber =
    districtOrderList.findIndex((d) => d === council.district) + 1;

  const councilImage = getCouncilImage(districtNumber, council.number);

  const specialWord = (district: string) => {
    if (district === 'ป้อมปราบศัตรูพ่าย') {
      return `ป้อมปราบ\nศัตรูพ่าย`;
    }
    return district;
  };

  return (
    <div className="relative w-full max-w-[288px] md:max-w-[1024px]  mb-[40px]">
      {council.disqualified && (
        <div className="absolute bg-white bg-opacity-80 w-full h-full typo-b4 flex justify-center items-center z-[5] p-[10px]">
          <p className="bg-white rounded p-1 max-w-lg">
            {council.disqualified}
          </p>
        </div>
      )}
      <div className="flex border-t border-[#9d9d9d] w-full max-w-[288px] md:max-w-[1024px]">
        <div className=" justify-center w-[100px] md:w-[150px] h-[100px] md:h-[150px] bg-[#333333] text-white flex flex-col">
          <h2 className="typo-h1">{council.number}</h2>
          <h5 className="typo-h6 whitespace-pre-wrap">
            {specialWord(council.district)}
          </h5>
        </div>
        <div className="flex flex-col md:flex-row flex-1">
          <img
            className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-[100px] object-cover object-top mt-[20px] ml-[20px]"
            src={councilImage}
            alt={`council-${districtNumber}-${council.number}`}
          />
          <div className="flex flex-col ml-[20px] text-left flex-1">
            <p className="typo-h3 my-[20px]">{council.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-5 mb-[20px] ">
              <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
                <p className="typo-b3 mb-[2px]">สังกัด</p>
                <p className="typo-b3 font-bold">{council.party}</p>
              </div>
              <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
                <p className="typo-b3 mb-[2px]">อายุ</p>
                <p className="typo-b3 font-bold">{council.age} ปี</p>
              </div>
              <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
                <p className="typo-b3 mb-[2px]">เพศ</p>
                <p className="typo-b3 font-bold">{council.sex}</p>
              </div>
              <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
                <p className="typo-b3 mb-[2px]">การศึกษา</p>
                <p className="typo-b3 font-bold">{council.education}</p>
              </div>
              <div className="flex flex-col">
                <p className="typo-b3 mb-[2px]">อาชีพ</p>
                <p className="typo-b3 font-bold">{council.career}</p>
              </div>
            </div>
            <Link href={`https://www.google.com/search?q=${council.name}`}>
              <a rel="noopener noreferrer" target="_blank">
                <div className="flex font-body text-[9pt] border border-[#dadada] p-[10px] w-fit hover:cursor-pointer">
                  <img
                    src={searchIcon.src}
                    alt="search"
                    className="w-[14px] h-[14px]"
                  />
                  <span className="ml-[8px]">ค้นประวัติใน Google</span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
