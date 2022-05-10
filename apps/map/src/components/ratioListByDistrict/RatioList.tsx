import { useContext, useMemo, useState } from 'react';
import { presetContext } from '../../contexts/preset';
import { District, ElectionDataType } from '../../models/election';
import CandidateLegend from '../CandidateLegend';
import SortableListHeader from '../SortableListHeader';
import RatioListRowItem from './RatioListRowItem';

enum DistrictRatioSortType {
	NAME = 'name',
	ELIGIBLE = 'eligible',
	PROGRESS = 'percent'
}

const RESULT_ARROW_DOWN = (
	<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1L5 5L9 1" stroke="white" />
	</svg>
);

export default function RatioListTable() {
	const preset = useContext(presetContext);
	const [isBottom, setIsBottom] = useState<boolean>(false);

	if (!preset) return <></>;

	const [sortType, setSortType] = useState<DistrictRatioSortType>(DistrictRatioSortType.NAME);
	const [descending, setDescending] = useState<boolean>(false);

	const headers = [
		{
			text: 'เขต',
			className: 'cursor-pointer',
			sortType: DistrictRatioSortType.NAME
		},
		{
			text: 'ผู้มีสิทธิ์เลือกตั้ง',
			className:
				'cursor-pointer' + (preset.electionData.total.progress ? '' : ' text-right md:text-left'),
			sortType: DistrictRatioSortType.ELIGIBLE
		},
		{
			text: 'ผลการเลือกตั้ง',
			className: 'col-span-3 grow hidden md:flex',
			children: RESULT_ARROW_DOWN
		},
		{
			text: 'นับคะแนนแล้ว',
			className: 'cursor-pointer',
			sortType: DistrictRatioSortType.PROGRESS
		}
	];

	if (!preset.electionData.total.progress) headers.pop();

	const sortDirection = useMemo(() => descending ? -1 : 1, [descending]);

	const getDefaultSortDescending = (newSortType: DistrictRatioSortType) => {
		return newSortType === DistrictRatioSortType.ELIGIBLE ||
			newSortType === DistrictRatioSortType.PROGRESS;
	}

	const sortedDistricts = useMemo(() => {
		const _dist = preset.electionData.districts;
		switch (sortType) {
			case DistrictRatioSortType.ELIGIBLE:
				return _dist.sort(
					(a: District, b: District) => (a.voting.eligiblePopulation - b.voting.eligiblePopulation) * sortDirection
				);
			case DistrictRatioSortType.PROGRESS:
				return _dist.sort(
					(a: District, b: District) => 
						((a.voting.progress || 100) - (b.voting.progress || 100)) * sortDirection
				);
			case DistrictRatioSortType.NAME:
			default:
				return _dist.sort((a: District, b: District) => a.name.localeCompare(b.name) * sortDirection);
		}
	}, [preset, sortType, sortDirection]);

	const headerOnClick = (headerSortType?: DistrictRatioSortType) => {
		if (headerSortType) {
			if (headerSortType === sortType) {
				setDescending(!descending);
				// sortedDistricts.reverse();
			} else {
				setSortType(headerSortType);
				setDescending(getDefaultSortDescending(headerSortType));
			}
		}
	};

	return (
		<div class='flex flex-col flex-1 overflow-y-hidden gap-4'>
			<div class="flex flex-col flex-1 relative overflow-y-hidden">
				<div
					class={`grid ${
						preset.electionData.total.progress
							? 'grid-cols-3 md:grid-cols-6'
							: 'grid-cols-2 md:grid-cols-5'
					} typo-u4 gap-4 gap-y-1 md:gap-8 border-b border-white/40 pb-1`}
				>
					{headers.map((v) => (
						<SortableListHeader
							headerText={v.text}
							className={v.className}
							isActive={v.sortType === sortType}
							descending={descending}
							headerOnClick={() => headerOnClick(v.sortType)}
						>
							{v.children}
						</SortableListHeader>
					))}
				</div>
				<div
					class="flex flex-col pt-2 pb-32 gap-2 overflow-y-auto hide-scrollbar"
					onScroll={(event) => {
						const target = event.target as HTMLElement;
						setIsBottom(target.scrollHeight - target.scrollTop - target.clientHeight < 1);
					}}
				>
					<div
						class={`absolute w-full h-11 bg-gradient-to-t z-10 from-black to-black/0 bottom-0 pointer-events-none ${
							isBottom && 'hidden'
						}`}
					/>
					{sortedDistricts.map((district: District, i: number) => (
						<RatioListRowItem
							district={district}
							isInProgress={preset.electionData.total.progress !== undefined}
							isLive={preset.electionData.type == ElectionDataType.Live}
						/>
					))}
				</div>
			</div>
			<CandidateLegend topCandidatePerDistrict={3} />
		</div>
	);
}
