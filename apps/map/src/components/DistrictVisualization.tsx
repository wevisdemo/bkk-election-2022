import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import RatioList from './ratioListByDistrict/RatioList';
import { Visualization } from '../models/visualization';
import { presetContext } from '../contexts/preset';
import VisualizationToggle from './VisualizationToggle';
// import DistrictMap from './district-map/district-map-canvas';
import Pixi from './district-map/MapPixi';
import CandidateLegend from './CandidateLegend';
import { TOP_CANDIDATE_DISPLAY } from '../constants/candidate';
import Modal from './Modal';
import CandidateOverviewList from './candidateOverviewList/CandidateOverviewList';
import { District, ElectionDataType } from '../models/election';

interface DistrictVisualizationProps {
	activeViz: Visualization;
	setActiveViz: (vis: Visualization) => void;
	className?: string;
}

const DistrictVisualization: FunctionComponent<DistrictVisualizationProps> = ({
	activeViz,
	setActiveViz,
	className = ''
}) => {
	const preset = useContext(presetContext);
	const [isShowDistrictModal, setShowDistrictModal] = useState<boolean>(false);
	const [activeDistrictIndex, setActiveDistrictIndex] = useState<number>(0);
	const [activeDistrict, setActiveDistrict] = useState<District | null>(null);

	if (!preset) return <></>;

	const candidateLegend = useMemo(() => {
		return (
			<CandidateLegend
				topCandidatePerDistrict={
					activeViz === Visualization.GRID_WINNER || activeViz === Visualization.MAP_WINNER ? 1 : 3
				}
			>
				{activeViz === Visualization.GRID_RATIO ? (
					<div>
						<p>
							<span className="font-bold">ขนาดกล่อง</span> ตามจำนวนผู้มีสิทธิ์เลือกตั้งในเขตนั้น
						</p>
						<p>
							<span className="font-bold">สัดส่วนสี</span> ในแต่ละกล่องตามสัดส่วนคะแนนของผู้สมัคร
						</p>
					</div>
				) : (activeViz === Visualization.GRID_WINNER || activeViz === Visualization.MAP_WINNER) && (
					<p>
						<span className="font-bold">สี</span> ของแต่ละเขตแสดงผู้ได้คะแนนสูงสุดในเขตนั้นๆ
					</p>
				)}
			</CandidateLegend>
		);
	}, [preset, activeViz]);

	const openDistrictModal = (district: District) => {
		console.log('open', district);
		let districtIndex = preset.electionData.districts.findIndex(d => d.name === district.name)
		setActiveDistrictIndex(districtIndex);
		setActiveDistrict(district);
		setShowDistrictModal(true);
	}

	return (
		<div
			className={`relative flex flex-col md:flex-row w-full h-full gap-3 md:gap-8 overflow-hidden ${className}`}
		>
			{isShowDistrictModal &&
				<Modal
					containerClassName="lg:absolute lg:z-10 lg:top-0 lg:left-0 lg:right-0 lg:bottom-0"
					className="max-h-full max-w-[calc(100vw-2rem)] h-full lg:absolute lg:z-10 lg:top-0 lg:left-0 lg:right-0 lg:bottom-0 max-w-none"
					title={`เขต${activeDistrict?.name}`}
					subtitle={`ผู้มีสิทธิ์เลือกตั้ง ${activeDistrict?.voting.eligiblePopulation.toLocaleString()} คน`}
					imageUrl={`https://picsum.photos/500`}
					onClose={() => setShowDistrictModal(false)}
				>
					{/* <p className="typo-u4 mb-4 -mt-8"></p> */}
					<CandidateOverviewList
						votingData={preset.electionData.districts[activeDistrictIndex].voting}
						enableTopHighlight={false} />
					{preset.electionData.districts[activeDistrictIndex].voting.progress !== undefined && (
						<div class="flex flex-row border-t border-gray py-3 pb-0 lg:py-6 typo-u4">
							<div className="flex-1 flex flex-row lg:flex-col space-y-1">
								<div>นับคะแนนโดย<br className='lg:hidden' />อาสาฯ แล้ว {(preset.electionData.districts[activeDistrictIndex].voting.progress || 0).toFixed(1)}%</div>
								<div className="lg:h-2 lg:w-full lg:w-48 bg-white bg-opacity-30 w-1 h-7 order-first lg:order-none relative mr-2 counting-progress-xs">
									<div className="absolute bg-white w-full bottom-0 lg:hidden" style={{ height: `${preset.electionData.districts[activeDistrictIndex].voting.progress}%` }}>
										{preset.electionData.type === ElectionDataType.Live && (
											<div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(/map/images/strip-black.gif)` }} />
										)}
									</div>
									<div className="absolute bg-white h-full left-0 hidden lg:block" style={{ width: `${preset.electionData.districts[activeDistrictIndex].voting.progress}%` }}>
										{preset.electionData.type === ElectionDataType.Live && (
											<div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(/map/images/strip-black.gif)` }} />
										)}
									</div>
								</div>
							</div>
							{preset?.electionData.lastUpdatedAt && (
								<div className="text-right">
									<p>อัปเดตล่าสุด</p>
									<p>
										{new Date(preset?.electionData.lastUpdatedAt).toLocaleString('th-TH', {
											dateStyle: 'short',
											timeStyle: 'short'
										})}
									</p>
								</div>
							)}
						</div>
					)}
				</Modal>
			}
			<div className="flex flex-1 h-full w-full flex-col overflow-y-hidden">
				<h2 className={`typo-h4 mb-2 md:mb-6 hidden lg:block z-[1] pointer-events-none ${activeViz === Visualization.LIST_RATIO ? '' : 'md:mb-[-40px]'}`}>คะแนนรายเขต</h2>
				<div className={`${activeViz === Visualization.LIST_RATIO ? 'flex' : ''} flex-col flex-auto h-full overflow-hidden relative`}>
					{activeViz === Visualization.LIST_RATIO ?
						<RatioList onDistrictClick={openDistrictModal} /> :
						<Pixi onDistrictClick={openDistrictModal} type={activeViz} />
					}
				</div>
				<div class={`md:flex hidden mt-2 ${activeViz === Visualization.LIST_RATIO ? '' : 'md:mt-[-60px]'}`}>{candidateLegend}</div>
			</div>
			<div class="flex md:hidden">{candidateLegend}</div>
			<div className="flex justify-center items-center">
				<VisualizationToggle value={activeViz} onChange={setActiveViz} />
			</div>
		</div>
	);
};

export default DistrictVisualization;
