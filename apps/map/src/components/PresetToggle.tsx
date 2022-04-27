import React, { FunctionComponent, useContext } from 'react';
import { presetContext } from '../contexts/preset';
import { electionIndexes } from '../data/presets';
import { ElectionDataType } from '../models/election';

interface PresetToggleProps {
	activeIndex: number;
	onChange: (e: number) => void;
}

const PresetToggle: FunctionComponent<PresetToggleProps> = ({ activeIndex, onChange }) => {
	const preset = useContext(presetContext);

	return (
		<div className="flex flex-row rounded-sm border border-white">
			{electionIndexes.map(({ shortname, electionDataUrl }, index) => (
				<button
					key={shortname}
					disabled={!electionDataUrl}
					onClick={() => electionDataUrl && onChange(index)}
					className={`typo-u5 px-3 py-2 rounded-sm h-fit m-[2px] flex flex-row ${
						index === activeIndex
							? 'bg-white text-black font-semibold'
							: electionDataUrl
							? 'hover:bg-white hover:text-black'
							: 'opacity-40'
					}`}
				>
					{preset?.electionData.type === ElectionDataType.Live && (
						<div class="bg-[#D02525] text-white mr-1 px-1 font-semibold">LIVE</div>
					)}
					{shortname}
				</button>
			))}
		</div>
	);
};

export default PresetToggle;
