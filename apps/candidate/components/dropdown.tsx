import { Fragment, useEffect, useRef, useState } from 'react';
import { IDropdownOption } from '../types/components';
import polygonIcon from '../static/icons/polygon.svg';
import * as React from 'react';

interface Propstype {
  title: string;
  firstDefault?: boolean;
  options: IDropdownOption[];
  onSelect: (i: IDropdownOption) => void;
}

const OptionListComponent = (props: {
  onSelect: (i: IDropdownOption) => void;
  options: IDropdownOption[];
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Fragment>
      {props.isShow && (
        <div className="w-[250px] px-[15px] py-[5px] absolute left-[-25px] mt-[5px] bg-white border rounded-[2px] max-h-[300px] overflow-y-scroll z-10">
          {props.options.length <= 0 && (
            <p className="font-body text-left text-[12pt]">ไม่พบข้อมูล</p>
          )}
          {props.options.map((option, index) => {
            return (
              <div
                id={`options-${index}`}
                key={`dd-option-${index}`}
                className="py-[10px] border-b border-[#dadada] text-left hover:cursor-pointer"
                onClick={() => props.onSelect(option)}
              >
                <span className="font-body font-semibold text-[12pt]">
                  {option.display}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export function Dropdown(props: Propstype) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(true);
  const [displayOptions, setDisplayOptions] = useState<IDropdownOption[]>(
    props.options
  );
  const placeHolder = (): string => {
    if (props.firstDefault) {
      if (props.options.length > 0) {
        return props.options[0].display;
      }
    }
    return props.title;
  };

  useEffect(() => {
    setValue(placeHolder());

    const concernedElement = document.querySelector('#search-bar');
    const handleMouseDown = (event: MouseEvent) => {
      if (concernedElement?.contains((event.target as Node) || null)) {
      } else {
        setIsShow(false);
        setShowList(true);
      }
    };

    document.addEventListener('mousedown', handleMouseDown, true);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, []);

  useEffect(() => {
    if (!showList) {
      const regex = new RegExp(
        value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
        'igm'
      );
      const options = props.options.filter((option) =>
        option.value.match(regex)
      );
      setDisplayOptions(options);
    } else {
      setDisplayOptions(props.options);
    }
  }, [value, props.options, showList]);

  const onClickDD = () => {
    if (!isShow) {
      setIsShow(true);
      setShowList(true);
    }
  };

  const onClickArrow = () => {
    if (isShow) {
      setIsShow(false);
      setShowList(true);
    }
  };

  return (
    <div className="relative" id="search-bar">
      <div
        className="flex p-[10px] w-[200px] border border-[#9d9d9d] hover:cursor-pointer"
        onClick={() => onClickDD()}
      >
        <input
          placeholder="เขต"
          type="text"
          className="font-body font-semibold text-[15pt] flex-1 text-left outline-0 w-full "
          value={value}
          onChange={(e) => {
            setShowList(false);
            setValue(e.target.value);
          }}
        />
        <div
          className={
            isShow ? 'rotate-180 flex items-center' : 'flex items-center'
          }
          onClick={() => onClickArrow()}
        >
          <img
            src={polygonIcon.src}
            alt="polygon-icon"
            className="w-[12px] h-[12px]"
          />
        </div>
      </div>
      <OptionListComponent
        onSelect={(i) => {
          setValue(i.value);
          setIsShow(false);
          props.onSelect(i);
        }}
        options={displayOptions}
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </div>
  );
}
