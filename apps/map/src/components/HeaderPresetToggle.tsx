import React, { FunctionComponent, useContext, useState } from 'react';
import { configContext } from '../contexts/config';
import { presetContext } from '../contexts/preset';
import Modal from './Modal';

interface PresetToggleProps {
	activeIndex: number;
	onChange: (e: number) => void;
}

const HeaderPresetToggle: FunctionComponent<PresetToggleProps> = ({ activeIndex, onChange }) => {
	const preset = useContext(presetContext);
	const config = useContext(configContext);
	const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
	const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState<boolean>(false);

	if (!config || !preset) return <></>;

	return (
		<div className="w-full lg:w-full flex flex-col relative">
			<div className="flex-1 text-center">
				<h1 className="font-heading typo-title text-[24px] lg:text-[36px] xl:text-[48px] leading-tight">
					{config.presetIndexes[activeIndex].isLive && <LiveBadge />} {preset.fullname}
				</h1>
				<p className="font-body text-[12px] xs:text-[14px] lg:text-[16px] mt-2 lg:mt-1">
					{preset.subtitle}{' '}
					{preset.descriptionModal && (
						<>
							<a
								href="#"
								className="opacity-70 hover:underline"
								onClick={() => setIsDescriptionModalOpen(true)}
							>
								(อ่านที่มาโครงการและวิธีนับคะแนน)
							</a>
							{isDescriptionModalOpen && (
								<Modal
									title="ที่มาโครงการและวิธีนับคะแนน"
									onClose={() => setIsDescriptionModalOpen(false)}
								>
									<p className="indent-6 typo-b6">{preset.descriptionModal}</p>
								</Modal>
							)}
						</>
					)}
					<button
						className="px-1 bg-[#ccc] m-1 text-black rounded font-body text-[12px] xs:text-[14px] font-[600]"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						เปลี่ยนชุดข้อมูล
						<svg
							width="14"
							height="9"
							viewBox="0 0 14 9"
							fill="none"
							className="inline-block transform transition-transform duration-150 ml-1"
						>
							<path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" />
						</svg>
					</button>
				</p>
			</div>
			<div
				className={`absolute max-w-[360px] m-auto inset-x-0 top-full flex-col rounded-sm border border-white bg-black z-10 overflow-hidden ${
					isDropdownOpen ? 'flex' : 'hidden'
				}`}
			>
				{config.presetIndexes.map(({ shortname, electionDataUrl }, index) => (
					<button
						key={shortname}
						disabled={!electionDataUrl}
						onClick={() => {
							setIsDropdownOpen(false);
							if (electionDataUrl) onChange(index);
						}}
						className={`typo-u4 px-3 py-2 rounded-sm h-fit m-[2px] flex flex-row ${
							index === activeIndex
								? 'bg-white text-black font-semibold'
								: electionDataUrl
								? 'hover:bg-white hover:text-black'
								: 'opacity-40'
						}`}
					>
						{config.presetIndexes[index].isLive && <LiveBadge />}
						{shortname}
					</button>
				))}
			</div>
		</div>
	);
};

const LiveBadge = () => (
	<div class="bg-[#D02525] typo-u4 text-white mr-1 px-1 font-semibold inline-block rounded-[2px] align-middle">
		LIVE
	</div>
);

export default HeaderPresetToggle;
