import React, { FunctionComponent, useContext, useMemo } from 'react';
import RatioList from './ratioListByDistrict/RatioList';
import { Visualization } from '../models/visualization';
import { presetContext } from '../contexts/preset';
import VisualizationToggle from './VisualizationToggle';
import CandidateLegend from './CandidateLegend';
import MapWinner from './district-map/MapWinner';
import GridWinner from './district-map/GridWinner';
import GridRatio from './district-map/GridRatio';

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

	return (
		<div
			className={`flex flex-col md:flex-row w-full h-full gap-3 md:gap-8 overflow-hidden ${className}`}
		>
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
					{activeViz === Visualization.GRID_WINNER && <GridWinner />}
					{activeViz === Visualization.GRID_RATIO && <GridRatio />}
					{activeViz === Visualization.MAP_WINNER && <MapWinner />}
					{activeViz === Visualization.LIST_RATIO && <RatioList />}
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
