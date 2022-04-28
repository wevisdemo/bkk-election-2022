import Link from 'next/link';
import searchIcon from '../../static/icons/search.svg';
import { ICouncil } from '../../types/business';

interface PropsType {
  council: ICouncil;
}

export function Council(props: PropsType) {
  const council = props.council;

  const onClickGoogleSearch = (name: string) => {
    window.open(`https://www.google.com/search?q=${name}`, '_blank');
  };

  const specialWord = (district: string) => {
    if (district === 'ป้อมปราบศัตรูพ่าย') {
      return `ป้อมปราบ\nศัตรูพ่าย`;
    }
    return district;
  };

  return (
    <div className="relative w-full max-w-[288px] md:max-w-[1024px]  mb-[40px]">
      {council.disqualified && (
        <div className="absolute bg-[#ffffffb3] w-full h-full absolute typo-u4 flex justify-center items-center z-[5] p-[10px]">
          {council.disqualified}
        </div>
      )}
      <div className="flex border-t border-[#9d9d9d] w-full max-w-[288px] md:max-w-[1024px]">
        <div className=" justify-center w-[100px] md:w-[150px] h-[100px] md:h-[150px] bg-[#333333] text-white">
          <p className="font-heading font-semibold text-[27pt] md:text-[48pt] leading-[45px] md:leading-[80px]">
            {council.number}
          </p>
          <p className="font-heading font-semibold text-[14pt] md:text-[18pt] whitespace-pre-wrap">
            {specialWord(council.district)}
          </p>
        </div>
        <div className="flex flex-col flex-1 md:ml-[50px] ml-[20px] text-left">
          <p className="typo-h7 my-[20px]">{council.name}</p>
          {/* <div className="flex flex-col md:flex-row mb[20px]"> */}
          <div className="grid grid-cols-1 md:grid-cols-5 mb-[20px] ">
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
              <p className="typo-b7 md:text-[14pt] mb-[2px]">สังกัด</p>
              <p className="typo-b7 md:text-[14pt] font-bold">
                {council.party}
              </p>
            </div>
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
              <p className="typo-b7 md:text-[14pt] mb-[2px]">อายุ</p>
              <p className="typo-b7 md:text-[14pt] font-bold">
                {council.age} ปี
              </p>
            </div>
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
              <p className="typo-b7 md:text-[14pt] mb-[2px]">เพศ</p>
              <p className="typo-b7 md:text-[14pt] font-bold">{council.sex}</p>
            </div>
            <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#dadada] md:mr-[15px] pb-[5px] md:pb-0 mb-[5px] md:mb-0">
              <p className="typo-b7 md:text-[14pt] mb-[2px]">การศึกษา</p>
              <p className="typo-b7 md:text-[14pt] font-bold">
                {council.education}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="typo-b7 md:text-[14pt] mb-[2px]">อาชีพ</p>
              <p className="typo-b7 md:text-[14pt] font-bold">
                {council.career}
              </p>
            </div>
          </div>
          <Link href={`https://www.google.com/search?q=${council.name}`}>
            <a rel="noopener noreferrer" target="_blank">
              <div
                className="flex font-body text-[9pt] border border-[#dadada] p-[10px] w-fit hover:cursor-pointer"
                // onClick={() => onClickGoogleSearch(council.name)}
              >
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
  );
}
