import { useContext, useEffect, useMemo, useState } from 'react';
import { presetContext } from '../../contexts/preset';
import { Result } from '../../models/election';
import RowItem from './RowItem';

const ArrowDown = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 0 24 24"
		width="24px"
		fill="#fff"
		class='inline-block'
	>
		<path d="M0 0h24v24H0V0z" fill="none" />
		<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
	</svg>
);

export default function CandidateOverviewList() {
	const preset = useContext(presetContext);

	if (!preset) {
		return <></>;
	}

	const [sortType, setSortType] = useState<string>('COUNT');
	const results = useMemo(() => {
		const res = preset.electionData.total.result;
		switch (sortType) {
			case 'PARTY':
				return res.sort((a, b) => {
					return (preset.candidateMap[a.candidateId].party || '').localeCompare(
						preset.candidateMap[b.candidateId].party || ''
					);
				});
			case 'NAME':
				return res.sort((a, b) =>
					preset.candidateMap[a.candidateId].fullname.localeCompare(
						preset.candidateMap[b.candidateId].fullname
					)
				);
			case 'PERCENT':
			case 'COUNT':
			default:
				return res.sort((a, b) => b.count - a.count);
		}
	}, [sortType]);

	const topVoteRes: number = Math.max(...results.map((v: Result) => v.count));

	return (
		<div class="flex flex-col text-white typo-u4">
			<div class="flex flex-row font-normal border-b-2 border-white/40">
				<span class="text-left basis-4 opacity-50">#</span>
				<span class="text-left flex-1 opacity-50" onClick={() => setSortType('NAME')}>
					ผู้สมัคร [หมายเลข]
					{sortType == 'NAME' && ArrowDown}
				</span>
				<span
					class="text-right flex-1 hidden md:block opacity-50"
					onClick={() => setSortType('PARTY')}
				>
					สังกัด
					{sortType == 'PARTY' && ArrowDown}
				</span>
				<span class="text-right flex-1 opacity-50" onClick={() => setSortType('COUNT')}>
					คะแนนเสียง
					{sortType == 'COUNT' && ArrowDown}
				</span>
				<span class="text-right flex-1 opacity-50" onClick={() => setSortType('PERCENT')}>
					%
					{sortType == 'PERCENT' && ArrowDown}
				</span>
			</div>
			{results.map((res: Result, index: number) => {
				return <RowItem candidateId={res.candidateId} index={index} topVoteRes={topVoteRes} />;
			})}
		</div>
	);
}
