import { useEffect, useState } from 'react';
import { ICouncil, IDistrict } from '../../types/business';
import { IDropdownOption } from '../../types/components';
import { Council } from '../card/council';
import { Dropdown } from '../dropdown';

interface PropsType {
  councils: ICouncil[];
}

export function CouncilList(props: PropsType) {
  const onSelectDropdown = (option: IDropdownOption) => {
    setCurrDistrict(option.value);
  };
  const [districtList, setDistrictList] = useState<string[]>([]);
  const [section, setSection] = useState<string>('district');
  const [currDistrict, setCurrDistrict] = useState<string>('เขต');
  const [displayCouncils, setDisplayCouncils] = useState<ICouncil[]>(
    props.councils
  );
  const [dropdownOptions, setDropdownOptions] = useState<IDropdownOption[]>([]);

  const onClickSelectDistrict = (district: string) => {
    setCurrDistrict(district);
    setSection('council');
  };

  useEffect(() => {
    const newCouncils = props.councils.filter(
      (council) => council.district === currDistrict
    );
    setDisplayCouncils(newCouncils);
  }, [currDistrict, props.councils]);

  useEffect(() => {
    let totalList: IDropdownOption[] = [];
    const ddOptions: IDropdownOption[] = props.councils.map((council) => {
      return {
        display: council.district,
        value: council.district,
      };
    });

    for (const dd of ddOptions) {
      if (totalList.find((curr) => curr.value === dd.value)) {
        continue;
      }
      totalList.push(dd);
    }
    const districtStrList = totalList.map((district) => district.value);
    setDistrictList(districtStrList);
    setDropdownOptions(totalList);
  }, []);

  const districtListComponent = districtList.map((district, index) => {
    return (
      <button
        onClick={() => onClickSelectDistrict(district)}
        key={`district-${index}`}
        className="typo-b5 font-[600] mx-auto w-full max-w-[280px] md:max-w-[400px] py-[16px] px-[20px] border border-[#dadada]"
      >
        {district}
      </button>
    );
  });

  const councilListComponent = displayCouncils.map((council, index) => {
    return <Council council={council} key={`council-${index}`} />;
  });

  return (
    <div className="text-center p-[20px] pb-[90px] md:pt-[130px] md:pb-[100px]">
      <p className="typo-h2 mb-[28px]">ผู้สมัครสมาชิกสภากทม.</p>
      {section == 'district' && (
        <p className="typo-b5 mb-[20px] md:mb-[40px]">เลือกเขต</p>
      )}
      {section == 'council' && (
        <div className="space-x-[5px] md:space-x-[15px] flex items-center justify-center mb-[58px] md:mb-[94px]">
          <span className="typo-b5">เขต</span>
          <Dropdown
            options={dropdownOptions}
            title={currDistrict}
            onSelect={onSelectDropdown}
          />
          <span className="typo-b5">{displayCouncils.length} คน</span>
        </div>
      )}
      {section == 'district' && (
        <div className="grid grid-cols-1 gap-[10px]">
          {districtListComponent}
        </div>
      )}
      {section == 'council' && (
        <div className="flex flex-col items-center">{councilListComponent}</div>
      )}
    </div>
  );
}
