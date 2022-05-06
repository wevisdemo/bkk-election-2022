import React, { useMemo } from 'react';
import { useContext } from 'react';
import { FunctionComponent } from 'react';
import { TOP_CANDIDATE_PER_DISTRICT } from '../constants/candidate';
import { presetContext } from '../contexts/preset';
import { Candidate } from '../models/candidate';
import CandidateLegend from './CandidateLegend';
import CandidateOverviewList from './candidateOverviewList/CandidateOverviewList';
import DistrictMap from './district-map/district-map-canvas';
import PresetToggle from './PresetToggle';
import RatioList from './ratioListByDistrict/RatioList';
import TabsView from './TabsView';
import { Visualization } from '../models/visualization'
interface DashboardProps {
	activePresetIndex: number;
	onPresetChange: (i: number) => void;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ activePresetIndex, onPresetChange }) => {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	const candidateLabels: Candidate[] = useMemo(() => {
		let tempCandidates: Candidate[] = [];
		for (const district of preset.electionData.districts) {
			const sorted = district.voting.result.sort((a, b) => b.count - a.count);
			for (let i = 0; i < TOP_CANDIDATE_PER_DISTRICT; i++) {
				const candidate = preset.candidateMap[sorted[i].candidateId];
				if (tempCandidates.indexOf(candidate) == -1) {
					tempCandidates.push(candidate)
				}
			}
		}
		return tempCandidates;
	}, [preset]);

	return (
		<div className="flex-1 flex flex-col bg-black text-white p-6 lg:p-12 space-y-4 lg:space-y-12 overflow-y-hidden">
			<div className="flex flex-col lg:flex-row gap-4 lg:border-b lg:pb-6 border-gray items-center">
				<h1 className="flex-1 typo-h2">{preset.fullname}</h1>
				<PresetToggle activeIndex={activePresetIndex} onChange={onPresetChange} />
			</div>

			<div class="flex-1 hidden lg:flex flex-row space-x-12 overflow-y-auto">
				<div className="flex flex-col flex-1 space-y-6 h-full">
					<h2 className="typo-h4">คะแนนรวมทั้ง กทม.</h2>
					<CandidateOverviewList />
				</div>
				<div className="flex flex-col w-2/3 ">
					<div>
						<h2 className="typo-h4">คะแนนรายเขต</h2>
						<RatioList />
						<CandidateLegend candidates={candidateLabels}>
							<span>
								<b>ขนาดกล่อง</b> ตามจำนวนผู้มีสิทธิ์เลือกตั้งในเขตนั้น <br />
								<b>สัดส่วนสี</b> ในแต่ละกล่องตามสัดส่วนคะแนนของผู้สมัคร
							</span>
						</CandidateLegend>
					</div>
					<div>
						<h2 className="typo-h4">คะแนนรายเขต</h2>
						<DistrictMap styles={{ minWidth: "1012px", height: "900px" }}
							type={Visualization.GRID_RATIO}
							options={{ autoSize: true, debug: true }} />
						<CandidateLegend candidates={candidateLabels}>
							<span>
								<b>ขนาดกล่อง</b> ตามจำนวนผู้มีสิทธิ์เลือกตั้งในเขตนั้น <br />
								<b>สัดส่วนสี</b> ในแต่ละกล่องตามสัดส่วนคะแนนของผู้สมัคร
							</span>
						</CandidateLegend>
					</div>
					<div>
						<h2 className="typo-h4">คะแนนรายเขต</h2>
						<DistrictMap styles={{ minWidth: "1012px", minHeight: "900px" }}
							type={Visualization.GRID_WINNER}
							options={{ autoSize: true, debug: true }} />
						<CandidateLegend candidates={candidateLabels}>
							<span>
								<b>ขนาดกล่อง</b> ตามจำนวนผู้มีสิทธิ์เลือกตั้งในเขตนั้น <br />
								<b>สัดส่วนสี</b> ในแต่ละกล่องตามสัดส่วนคะแนนของผู้สมัคร
							</span>
						</CandidateLegend>
					</div>
					<div>
						<h2 className="typo-h4">คะแนนรายเขต</h2>
						<DistrictMap styles={{ minWidth: "1012px", minHeight: "900px" }}
							type={Visualization.MAP_WINNER}
							options={{ autoSize: true, debug: true }} />
						<CandidateLegend candidates={candidateLabels}>
							<span>
								<b>ขนาดกล่อง</b> ตามจำนวนผู้มีสิทธิ์เลือกตั้งในเขตนั้น <br />
								<b>สัดส่วนสี</b> ในแต่ละกล่องตามสัดส่วนคะแนนของผู้สมัคร
							</span>
						</CandidateLegend>
					</div>
				</div>
			</div>

			<TabsView
				className="lg:hidden"
				tabs={[
					{ name: 'คะแนนรวมทั้ง กทม.', component: <CandidateOverviewList /> },
					{ name: 'คะแนนรายเขต', component: <RatioList /> }
				]}
			/>
		</div>
	);
};

export default Dashboard;
