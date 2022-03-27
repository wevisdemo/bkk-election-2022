import { ICouncil, IDistrict } from '../../types/business';
import { IDropdownOption } from '../../types/components';
import { Council } from '../card/council';
import { Dropdown } from '../dropdown';

interface PropsType {
  districts: IDistrict[];
  councils: ICouncil[];
}

export function CouncilList(props: PropsType) {
  const onSelectDropdown = (option: IDropdownOption) => {};

  const dropdownOptions: IDropdownOption[] = [
    { display: 'คลองเตย', value: 'คลองเตย' },
    { display: 'บางซื่อ', value: 'บางซื่อ' },
    { display: 'บางแค', value: 'บางแค' },
    { display: 'จตุจักร', value: 'จตุจักร' },
  ];

  const districtListComponent = props.districts.map((district, index) => {
    return (
      <button
        key={`district-${index}`}
        className="typo-b5 font-[600] m-auto w-[400px] py-[16px] border border-[#dadada]"
      >
        {district.display}
      </button>
    );
  });

  const councilListComponent = props.councils.map((council, index) => {
    return <Council council={council} key={`council-${index}`} />;
  });

  return (
    <div className="text-center mt-[120px] my-[130px]">
      <p className="typo-h2 mt-[120px] mb-[28px]">ผู้สมัครสมาชิกสภากทม.</p>
      <p className="typo-b5 mb-[40px]">เลือกเขต</p>
      <div className="space-x-[15px] flex items-center justify-center">
        <span className="typo-b5">เขต</span>
        <Dropdown
          options={dropdownOptions}
          title="เขต"
          onSelect={onSelectDropdown}
        />
        <span className="typo-b5">{props.councils.length} คน</span>
      </div>
      <div className="grid grid-cols-1 gap-[10px]">{districtListComponent}</div>
      <div className="flex flex-col items-center"> {councilListComponent}</div>
    </div>
  );
}
