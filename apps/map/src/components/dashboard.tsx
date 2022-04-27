import React from 'react';
import { useContext } from 'react';
import { FunctionComponent } from 'react';
import { presetContext } from '../contexts/preset';
import { Candidate } from '../models/candidate';
import { Result } from '../models/election';
import CandidateLegen from './CandidateLegen';
import CandidateOverviewList from './candidateOverviewList/CandidateOverviewList';

const Dashboard: FunctionComponent = () => {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	const candidates: Candidate[] = preset.electionData.total.result
		.sort((a, b) => b.count - a.count)
		.map((v: Result) => preset.candidateMap[v.candidateId]);

	return (
		<div className="bg-black text-white flex-1 p-12">
			<h1 className="typo-h2">{preset.fullname}</h1>
			<CandidateOverviewList />
			<CandidateLegen candidates={candidates}>
				ขนาดกล่อง ตามจำนวนผู้มีสิทธิ์เลือกตั้งในเขตนั้น <br />
				สัดส่วนสี ในแต่ละกล่องตามสัดส่วนคะแนนของผู้สมัคร
			</CandidateLegen>
		</div>
	);
};

export default Dashboard;
