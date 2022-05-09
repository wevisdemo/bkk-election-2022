import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PARTY_UNDEFINED_STRING, TOP_CANDIDATE_DISPLAY } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { Result } from '../../models/election';
import SortableListHeader from '../SortableListHeader';
import CandidateOverviewListRowItem from './CandidateOverviewListRowItem';

enum CandidateOverviewSortType {
	COUNT = 'count',
	NUMBER = 'number',
	NAME = 'name',
	PERCENT = 'percent',
	PARTY = 'party'
}

export default function CandidateOverviewList() {
	const preset = useContext(presetContext);
	const [isBottom, setIsBottom] = useState<boolean>(false);
	const [descending, setDescending] = useState<boolean>(true);
	const [sortType, setSortType] = useState<CandidateOverviewSortType>(
		CandidateOverviewSortType.COUNT
	);
	const containerRef = useRef<null | HTMLDivElement>(null);

	if (!preset) {
		return <></>;
	}

	const results = useMemo(() => {
		const _res = preset.electionData.total.result;
		switch (sortType) {
			case CandidateOverviewSortType.PARTY:
				return _res.sort((a, b) => {
					return (preset.candidateMap[a.candidateId].party || PARTY_UNDEFINED_STRING).localeCompare(
						preset.candidateMap[b.candidateId].party || PARTY_UNDEFINED_STRING
					);
				});
			case CandidateOverviewSortType.NAME:
				return _res.sort((a, b) =>
					preset.candidateMap[a.candidateId].fullname.localeCompare(
						preset.candidateMap[b.candidateId].fullname
					)
				);
			case CandidateOverviewSortType.NUMBER:
				return _res.sort((a, b) => {
					return (preset.candidateMap[a.candidateId].number || 0) - (
						preset.candidateMap[b.candidateId].number || 0
					);
				});
			case CandidateOverviewSortType.PERCENT:
			case CandidateOverviewSortType.COUNT:
			default:
				return _res.sort((a, b) => b.count - a.count);
		}
	}, [preset, sortType]);

	useEffect(() => {
		if (containerRef.current) {
			setIsBottom(containerRef.current.scrollHeight - containerRef.current.scrollTop - containerRef.current.clientHeight < 1)
		}
	})

	const topVoteCount: number = Math.max(...results.map((v: Result) => v.count));
	const headers = [
		{
			text: '#',
			sClass: 'text-left basis-6',
			sortType: CandidateOverviewSortType.NUMBER
		},
		{
			text: 'ชื่อผู้สมัคร',
			sClass: 'text-left basis-4 flex-1',
			sortType: CandidateOverviewSortType.NAME
		},
		{
			text: 'สังกัด',
			sClass: 'text-right basis-4/12 hidden 2xl:block',
			sortType: CandidateOverviewSortType.PARTY
		},
		{
			text: 'คะแนนเสียง',
			sClass: 'text-right basis-3/12',
			sortType: CandidateOverviewSortType.COUNT
		},
		{ 
			text: '%',
			sClass: 'text-right basis-2/12',
			sortType: CandidateOverviewSortType.PERCENT
		}
	];

	const headerOnClick = (headerSortType?: CandidateOverviewSortType) => {
		if (headerSortType) {
			if (headerSortType === sortType) {
				setDescending(!descending);
				results.reverse();
			} else {
				setSortType(headerSortType);
				setDescending(true);
			}
		}
	};

	return (
		<div class="flex flex-col felx-1 h-full overflow-y-auto relative typo-u4">
			<div class="flex flex-row font-normal border-b border-white/40 pb-1">
				{headers.map((v) => (
					<SortableListHeader
						headerText={v.text}
						isActive={sortType === v.sortType}
						sClass={v.sClass + (v.sortType ? ' cursor-pointer' : '')}
						descending={descending}
						headerOnClick={() => headerOnClick(v.sortType)}
					/>
				))}
			</div>
			<div class="overflow-y-auto hide-scrollbar" ref={containerRef} onScroll={(event) => {
				const target = event.target as HTMLElement;
				setIsBottom(target.scrollHeight - target.scrollTop - target.clientHeight < 1);
			}}>
				<div
					class={`absolute z-10 w-full h-11 bg-gradient-to-t from-black to-black/0 bottom-0 pointer-events-none ${isBottom && 'hidden'
						}`}
				/>
				{results.map((_res: Result, index: number) => {
					return (
						<CandidateOverviewListRowItem
							candidateId={_res.candidateId}
							index={index}
							topVoteCount={topVoteCount}
							isInTop={
								(sortType === CandidateOverviewSortType.COUNT || sortType === CandidateOverviewSortType.PERCENT) &&
								descending &&
								index < TOP_CANDIDATE_DISPLAY
							}
						/>
					);
				})}
			</div>
		</div>
	);
}
