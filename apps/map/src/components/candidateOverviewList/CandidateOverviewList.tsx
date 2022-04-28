import { useContext, useEffect, useMemo, useState } from 'react';
import { presetContext } from '../../contexts/preset';
import { Result } from '../../models/election';
import CandidateOverviewListHeader from './CandidateOverviewListHeader';
import RowItem, { PARTY_UNDEFINED_STRING } from './CandidateOverviewListRowItem';

enum SortType {
	COUNT = 'count',
	NAME = 'name',
	PERCENT = 'percent',
	PARTY = 'party'
}

export default function CandidateOverviewList() {
	const preset = useContext(presetContext);

	if (!preset) {
		return <></>;
	}

	const [sortType, setSortType] = useState<SortType>(SortType.COUNT);
	const results = useMemo(() => {
		const _res = preset.electionData.total.result;
		switch (sortType) {
			case SortType.PARTY:
				return _res.sort((a, b) => {
					return (preset.candidateMap[a.candidateId].party || PARTY_UNDEFINED_STRING).localeCompare(
						preset.candidateMap[b.candidateId].party || PARTY_UNDEFINED_STRING
					);
				});
			case SortType.NAME:
				return _res.sort((a, b) =>
					preset.candidateMap[a.candidateId].fullname.localeCompare(
						preset.candidateMap[b.candidateId].fullname
					)
				);
			case SortType.PERCENT:
			case SortType.COUNT:
			default:
				return _res.sort((a, b) => b.count - a.count);
		}
	}, [sortType]);

	const topVoteRes: number = Math.max(...results.map((v: Result) => v.count));
	const headers = [
		{ text: '#',
			isActive: false,
			sClass: 'text-left basis-4'
		},
		{
			text: 'ผู้สมัคร [หมายเลข]',
			sClass: 'text-left basis-4 flex-1',
			sortType: SortType.NAME
		},
		{
			text: 'สังกัด',
			sClass: 'text-right basis-2/12 hidden md:block',
			sortType: SortType.PARTY
		},
		{
			text: 'คะแนนเสียง',
			sClass: 'text-right basis-2/12',
			sortType: SortType.COUNT
		},
		{ text: '%',
		  isActive: false,
			sClass: 'text-right basis-2/12',
			sortType: SortType.PERCENT
		}
	];

	return (
		<div class="flex flex-1 flex-col text-white typo-u4">
			<div class="flex flex-row font-normal border-b-2 border-white/40">
				{headers.map((v, i, vs) => (
					<CandidateOverviewListHeader
						headerText={v.text}
						isActive={sortType === v.sortType}
						sClass={v.sClass + (v.sortType ? ' cursor-pointer' : '')}
						headerOnClick={() => {
							if (v.sortType) {
								setSortType(v.sortType);
							}
						}}
					/>
				))}
			</div>
			{results.map((_res: Result, index: number) => {
				return <RowItem candidateId={_res.candidateId} index={index} topVoteRes={topVoteRes} />;
			})}
		</div>
	);
}
