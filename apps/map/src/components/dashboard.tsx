import React, { useState } from 'react';
import { useContext } from 'react';
import { FunctionComponent } from 'react';
import { presetContext } from '../contexts/preset';
import CandidateOverviewList from './candidateOverviewList/CandidateOverviewList';
import PresetToggle from './PresetToggle';
import TabsView from './TabsView';
import DistrictVisualization from './DistrictVisualization';
import { Visualization } from '../models/visualization';
interface DashboardProps {
	activePresetIndex: number;
	onPresetChange: (i: number) => void;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ activePresetIndex, onPresetChange }) => {
	const preset = useContext(presetContext);
	const [activeViz, setActiveViz] = useState<Visualization>(Visualization.GRID_RATIO);

	if (!preset) return <></>;

	return (
		<div className="flex-1 flex flex-col bg-black text-white px-5 pt-4 pb-2 lg:px-12 lg:py-8 space-y-1 overflow-hidden lg:space-y-6 pb-16">
			<div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:border-b lg:pb-6 border-gray items-center">
				<div className="flex-1 text-center lg:text-left">
					<h1 className=" typo-h2 text-[26px] lg:text-[48px]">{preset.fullname}</h1>
					{preset.subtitle ? <p className="typo-u4 lg:text-[16px] mt-2 lg:mt-1">{preset.subtitle}</p> : <></>}
				</div>

				<PresetToggle activeIndex={activePresetIndex} onChange={onPresetChange} />
			</div>

			<div class="flex-1 hidden lg:flex flex-row space-x-12 overflow-hidden">
				<div className="flex flex-col flex-1 space-y-6 h-full">
					<h2 className="typo-h4">คะแนนรวมทั้ง กทม.</h2>
					<CandidateOverviewList />
				</div>
				<DistrictVisualization
					activeViz={activeViz}
					setActiveViz={setActiveViz}
					className="w-2/3"
				/>
			</div>

			<TabsView
				className="lg:hidden"
				tabs={[
					{ name: 'คะแนนรวมทั้ง กทม.', component: <CandidateOverviewList /> },
					{
						name: 'คะแนนรายเขต',
						component: <DistrictVisualization activeViz={activeViz} setActiveViz={setActiveViz} />
					}
				]}
			/>
		</div>
	);
};

export default Dashboard;
