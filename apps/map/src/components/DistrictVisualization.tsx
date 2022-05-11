import React, { FunctionComponent, useContext, useMemo } from 'react';
import RatioList from './ratioListByDistrict/RatioList';
import { Visualization } from '../models/visualization';
import { presetContext } from '../contexts/preset';
import VisualizationToggle from './VisualizationToggle';
// import DistrictMap from './district-map/district-map-canvas';
import Pixi from './district-map/MapPixi';
import CandidateLegend from './CandidateLegend';
import { TOP_CANDIDATE_DISPLAY } from '../constants/candidate';

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

	if (!preset) return <></>;

	const candidateLegend = useMemo(() => {
		return (
			<CandidateLegend
				topCandidatePerDistrict={
					activeViz === Visualization.GRID_WINNER || activeViz === Visualization.MAP_WINNER ? 1 : 2
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

	return (
		<div
			className={`flex flex-col md:flex-row w-full h-full gap-4 md:gap-8 overflow-hidden ${className}`}
		>
			<div className="flex flex-1 h-full w-full flex-col overflow-y-hidden">
				<h2 className="typo-h4 mb-2 md:mb-6 hidden lg:block">คะแนนรายเขต</h2>
				<div className="flex flex-col flex-auto h-full overflow-y-auto">
					{activeViz === Visualization.LIST_RATIO ? <RatioList /> : <Pixi type={activeViz} />}
				</div>
				<div class="md:flex hidden mt-2">{candidateLegend}</div>
			</div>
			<div class="flex md:hidden">{candidateLegend}</div>
			<div className="flex justify-center items-center">
				<VisualizationToggle value={activeViz} onChange={setActiveViz} />
			</div>
		</div>
	);
};

export default DistrictVisualization;
