import { useContext, useEffect, useMemo, useState } from 'react';
import { presetContext } from '../../contexts/preset';
import { Result } from '../../models/election';
import RowItem, { PARTY_UNDEFINED_STRING } from './RowItem';

export default function CandidateOverviewList() {
	const preset = useContext(presetContext);

	if (!preset) {
		return <></>;
	}

	const [sortType, setSortType] = useState<string>('COUNT');
	const results = useMemo(() => {
		const _res = preset.electionData.total.result;
		switch (sortType) {
			case 'PARTY':
				return _res.sort((a, b) => {
					return (preset.candidateMap[a.candidateId].party || PARTY_UNDEFINED_STRING).localeCompare(
						preset.candidateMap[b.candidateId].party || PARTY_UNDEFINED_STRING
					);
				});
			case 'NAME':
				return _res.sort((a, b) =>
					preset.candidateMap[a.candidateId].fullname.localeCompare(
						preset.candidateMap[b.candidateId].fullname
					)
				);
			case 'PERCENT':
			case 'COUNT':
			default:
				return _res.sort((a, b) => b.count - a.count);
		}
	}, [sortType]);

	const topVoteRes: number = Math.max(...results.map((v: Result) => v.count));

	return (
		<div class="flex flex-1 flex-col text-white typo-u4">
			<div class="flex flex-row font-normal border-b-2 border-white/40">
				<span class="text-left basis-4 opacity-50">#</span>
				<span
					class="text-left flex-1 opacity-50 cursor-pointer"
					onClick={() => setSortType('NAME')}
				>
					ผู้สมัคร [หมายเลข]
					{sortType === 'NAME' && '↓'}
				</span>
				<span
					class="text-right basis-2/12 hidden md:block opacity-50 cursor-pointer"
					onClick={() => setSortType('PARTY')}
				>
					สังกัด
					{sortType === 'PARTY' && '↓'}
				</span>
				<span
					class="text-right basis-2/12 opacity-50 cursor-pointer"
					onClick={() => setSortType('COUNT')}
				>
					คะแนนเสียง
					{sortType === 'COUNT' && '↓'}
				</span>
				<span
					class="text-right basis-2/12 opacity-50 cursor-pointer"
					onClick={() => setSortType('PERCENT')}
				>
					%
					{sortType === 'PERCENT' && '↓'}
				</span>
			</div>
			{results.map((_res: Result, index: number) => {
				return <RowItem candidateId={_res.candidateId} index={index} topVoteRes={topVoteRes} />;
			})}
		</div>
	);
}
