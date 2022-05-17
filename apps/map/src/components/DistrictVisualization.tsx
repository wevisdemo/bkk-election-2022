import React, { FunctionComponent, useContext, useMemo, useState, lazy, Suspense } from 'react';
import { Visualization } from '../models/visualization';
import { presetContext } from '../contexts/preset';
import VisualizationToggle from './VisualizationToggle';
import CandidateLegend from './CandidateLegend';
import { District, ElectionDataType } from '../models/election';
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

	const VisComponent = getVisComponent(activeViz);

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
					<Suspense
						fallback={
							<div class="w-full h-full flex items-center justify-center typo-u5">Loading...</div>
						}
					>
						<VisComponent onDistrictClick={openDistrictModal} />
					</Suspense>
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

const getVisComponent = (activeViz: Visualization) => {
	switch (activeViz) {
		case Visualization.GRID_WINNER:
			return lazy(() => import('./district-map/GridWinner'));
		case Visualization.GRID_RATIO:
			return lazy(() => import('./district-map/GridRatio'));
		case Visualization.MAP_WINNER:
			return lazy(() => import('./district-map/MapWinner'));
		case Visualization.LIST_RATIO:
		default:
			return lazy(() => import('./ratioListByDistrict/RatioList'));
	}
};

export default DistrictVisualization;
