import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import RatioList from './ratioListByDistrict/RatioList';
import { Visualization } from '../models/visualization';
import { presetContext } from '../contexts/preset';
import VisualizationToggle from './VisualizationToggle';
import CandidateLegend from './CandidateLegend';
import { District, ElectionDataType } from '../models/election';
import MapWinner from './district-map/MapWinner';
import GridWinner from './district-map/GridWinner';
import GridRatio from './district-map/GridRatio';
import DistrictModal from './DistrictModal';

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
				) : (
					(activeViz === Visualization.GRID_WINNER || activeViz === Visualization.MAP_WINNER) && (
						<p>
							<span className="font-bold">สี</span> ของแต่ละเขตแสดงผู้ได้คะแนนสูงสุดในเขตนั้นๆ
						</p>
					)
				)}
			</CandidateLegend>
		);
	}, [preset, activeViz]);

	const openDistrictModal = (district: District) => setActiveDistrict(district);

	return (
		<div
			className={`min-h-[320px] relative flex flex-col md:flex-row w-full h-full gap-3 md:gap-8 overflow-hidden ${className}`}
		>
			{activeDistrict && (
				<DistrictModal
					activeDistrict={activeDistrict}
					votingData={
						preset.electionData.districts[
							preset.electionData.districts.findIndex((d) => d.name === activeDistrict.name)
						].voting
					}
					isLive={preset.electionData.type === ElectionDataType.Live}
					onClose={() => setActiveDistrict(null)}
				/>
			)}
			<div className="flex flex-1 h-full w-full flex-col overflow-y-hidden">
				<h2
					className={`typo-h4 mb-2 md:mb-6 hidden lg:block z-[1] pointer-events-none ${
						activeViz === Visualization.LIST_RATIO ? '' : 'md:mb-[-40px]'
					}`}
				>
					คะแนนรายเขต
				</h2>
				<div
					className={`${
						activeViz === Visualization.LIST_RATIO ? 'flex' : ''
					} flex-col flex-auto h-full overflow-hidden relative`}
				>
					{activeViz === Visualization.GRID_WINNER && (
						<GridWinner onDistrictClick={openDistrictModal} />
					)}
					{activeViz === Visualization.GRID_RATIO && (
						<GridRatio onDistrictClick={openDistrictModal} />
					)}
					{activeViz === Visualization.MAP_WINNER && (
						<MapWinner onDistrictClick={openDistrictModal} />
					)}
					{activeViz === Visualization.LIST_RATIO && (
						<RatioList onDistrictClick={openDistrictModal} />
					)}
				</div>
				<div
					class={`md:flex hidden mt-2 ${
						activeViz === Visualization.LIST_RATIO ? '' : 'md:mt-[-60px]'
					}`}
				>
					{candidateLegend}
				</div>
			</div>
			<div class="flex md:hidden">{candidateLegend}</div>
			<div className="flex justify-center items-center">
				<VisualizationToggle value={activeViz} onChange={setActiveViz} />
			</div>
		</div>
	);
};

export default DistrictVisualization;
