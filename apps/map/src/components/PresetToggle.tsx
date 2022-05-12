import React, { FunctionComponent, useContext, useState } from 'react';
import { presetContext } from '../contexts/preset';
import { electionIndexes } from '../data/presets';
import { ElectionDataType } from '../models/election';

interface PresetToggleProps {
	activeIndex: number;
	onChange: (e: number) => void;
}

const PresetToggle: FunctionComponent<PresetToggleProps> = ({ activeIndex, onChange }) => {
	const preset = useContext(presetContext);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

	return (
		<div className="w-full lg:w-full lg:max-w-[360px] flex flex-col relative">
			<button
				class="flex flex-row items-center rounded-sm border border-white py-2 px-4 mb-1 typo-u5 font-bold"
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
			>
				<div className="flex-1 text-left flex flex-row">
					{/* <span className='mr-2 inline-block typo-u5 font-[400]'>ชุดข้อมูล:</span> */}
					{preset?.electionData.type === ElectionDataType.Live && <LiveBadge />}
					{electionIndexes[activeIndex].shortname}
				</div>
				<svg
					width="14"
					height="9"
					viewBox="0 0 14 9"
					fill="none"
					className={`transform transition-transform duration-150 ${
						isDropdownOpen ? 'rotate-180' : ''
					}`}
				>
					<path d="M1 1L7 7L13 1" stroke="white" stroke-width="2" />
				</svg>
			</button>
			<div
				className={`absolute inset-x-0 top-full flex-col rounded-sm border border-white bg-black z-10 overflow-hidden ${
					isDropdownOpen ? 'flex' : 'hidden'
				}`}
			>
				{electionIndexes.map(({ shortname, electionDataUrl }, index) => (
					<button
						key={shortname}
						disabled={!electionDataUrl}
						onClick={() => {
							setIsDropdownOpen(false)
							if (electionDataUrl) onChange(index)
						}}
						className={`typo-u5 px-3 py-2 rounded-sm h-fit m-[2px] flex flex-row ${
							index === activeIndex
								? 'bg-white text-black font-semibold'
								: electionDataUrl
								? 'hover:bg-white hover:text-black'
								: 'opacity-40'
						}`}
					>
						{preset?.electionData.type === ElectionDataType.Live &&
							preset?.shortname === shortname && <LiveBadge />}
						{shortname}
					</button>
				))}
			</div>
		</div>
	);
};

const LiveBadge = () => <div class="bg-[#D02525] text-white mr-1 px-1 font-semibold">LIVE</div>;

export default PresetToggle;
