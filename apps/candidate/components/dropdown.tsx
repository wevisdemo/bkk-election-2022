import { useState } from 'react';
import { IDropdownOption } from '../types/components';
import polygonIcon from '../static/icons/polygon.svg';
import Image from 'next/image';

interface Propstype {
  title: string;
  firstDefault?: boolean;
  options: IDropdownOption[];
  onSelect: (i: IDropdownOption) => void;
}
export function Dropdown(props: Propstype) {
  const [selected, setSelected] = useState<IDropdownOption>();
  const [isShow, setIsShow] = useState<boolean>(false);

  const placeHolder = (): string => {
    if (props.firstDefault) {
      if (props.options.length > 0) {
        return props.options[0].display;
      }
    }
    return props.title;
  };

  // TODO: click outside

  const optionListComponent = () => {
    return (
      isShow && (
        <div
          className="w-[250px] px-[15px] py-[5px] absolute left-[-25px] mt-[5px] bg-white border rounded-[2px]"
          onBlur={() => setIsShow(false)}
        >
          {props.options.map((option, index) => {
            return (
              <div
                key={`dd-option-${index}`}
                className="py-[10px] border-b border-[#dadada] text-left"
              >
                <span className="font-body font-semibold text-[12pt]">
                  {option.display}
                </span>
              </div>
            );
          })}
        </div>
      )
    );
  };

  return (
    <div className="relative">
      <div
        className="flex p-[10px] w-[200px] border border-[#9d9d9d] hover:cursor-pointer"
        onClick={() => setIsShow(!isShow)}
      >
        <span className="font-body font-semibold text-[15pt] flex-1 text-left">
          {placeHolder()}
        </span>
        <div className={isShow ? 'rotate-180 flex' : 'flex'}>
          <Image src={polygonIcon} alt="polygon-icon" width={12} height={12} />
        </div>
      </div>
      {optionListComponent()}
    </div>
  );
}
