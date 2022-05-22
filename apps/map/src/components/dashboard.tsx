import React, { useState, lazy, useMemo } from 'react';
import { useContext } from 'react';
import { FunctionComponent } from 'react';
import { presetContext } from '../contexts/preset';
import TabsView from './TabsView';
import DistrictVisualization from './DistrictVisualization';
import { Visualization } from '../models/visualization';
import HeaderPresetToggle from './HeaderPresetToggle';
import LazyloadContainer from './LazyloadContainer';
interface DashboardProps {
	activePresetIndex: number;
	onPresetChange: (i: number) => void;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ activePresetIndex, onPresetChange }) => {
	const preset = useContext(presetContext);
	const [activeViz, setActiveViz] = useState<Visualization>(Visualization.GRID_RATIO);

	if (!preset) return <></>;

	const CandidateOverviewList = useMemo(
		() => lazy(() => import('./candidateOverviewList/CandidateOverviewList')),
		[]
	);

	const haveTotalResult = preset.electionData.total.result.length > 0;

	return (
		<div className="flex-1 flex flex-col bg-black text-white px-5 pt-4 pb-2 lg:px-12 lg:py-8 space-y-1 overflow-hidden overflow-auto-shortscreen lg:space-y-6 pb-12 xs:pb-16 lg:pb-8">
			<div className="flex flex-col lg:flex-row gap-3 md:gap-4 lg:border-b lg:pb-6 border-gray items-center mb-2">
				<HeaderPresetToggle activeIndex={activePresetIndex} onChange={onPresetChange} />
			</div>

			<div class="flex-1 hidden lg:flex flex-row space-x-12 overflow-hidden justify-center">
				{haveTotalResult && (
					<div className="flex flex-col flex-1 space-y-6 h-full">
						<h2 className="typo-h4">คะแนนรวมทั้ง กทม.</h2>
						<LazyloadContainer>
							<CandidateOverviewList
								votingData={preset.electionData.total}
								enableTopHighlight={true}
							/>
						</LazyloadContainer>
					</div>
				)}

				<DistrictVisualization
					activeViz={activeViz}
					setActiveViz={setActiveViz}
					className="w-2/3"
				/>
			</div>

			<TabsView
				className="lg:hidden"
				tabs={[
					...(haveTotalResult
						? [
								{
									name: 'คะแนนรวมทั้ง กทม.',
									component: (
										<LazyloadContainer>
											<CandidateOverviewList
												votingData={preset.electionData.total}
												enableTopHighlight={true}
											/>
										</LazyloadContainer>
									)
								}
						  ]
						: []),

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
