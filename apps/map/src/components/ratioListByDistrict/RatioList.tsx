import { useContext, useMemo, useState } from 'react';
import { presetContext } from '../../contexts/preset';
import { District, ElectionDataType } from '../../models/election';
import SortableListHeader from '../SortableListHeader';
import RowItem from './RatioListRowItem';

enum DistrictRatioSortType {
	NAME = 'name',
	ELIGIBLE = 'eligible',
	PROGRESS = 'percent'
}

const RESULT_ARROW_DOWN = (
	<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1L5 5L9 1" stroke="white"/>
	</svg>
)

export default function RatioListTable() {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	const [sortType, setSortType] = useState<DistrictRatioSortType>(DistrictRatioSortType.NAME);
	const [descending, setDescending] = useState<boolean>(true);

	const headers = [
		{
			text: 'เขต',
			sClass: 'cursor-pointer',
			sortType: DistrictRatioSortType.NAME
		},
		{
			text: 'ผู้มีสิทธิ์เลือกตั้ง',
			sClass: 'cursor-pointer',
			sortType: DistrictRatioSortType.ELIGIBLE
		},
		{ text: 'ผลการเลือกตั้ง',
		  sClass: 'col-span-3 grow hidden md:flex',
			children: RESULT_ARROW_DOWN
		},
		{
			text: 'นับคะแนนแล้ว',
			sClass: 'cursor-pointer',
			sortType: DistrictRatioSortType.PROGRESS
		}
	];

	if (!preset.electionData.total.progress) headers.pop();

	const sortedDistricts = useMemo(() => {
		const _dist = preset.electionData.districts;
		switch (sortType) {
			case DistrictRatioSortType.ELIGIBLE:
				return _dist.sort((a: District, b: District) => b.voting.eligiblePopulation - a.voting.eligiblePopulation)
			case DistrictRatioSortType.PROGRESS:
				return _dist.sort((a: District, b: District) => (b.voting.totalVotes/b.voting.eligiblePopulation) - a.voting.totalVotes/a.voting.eligiblePopulation)
			case DistrictRatioSortType.NAME:
			default:
				return _dist.sort((a: District, b: District) => b.name.localeCompare(a.name))
		}
	}, [sortType])

	const headerOnClick = (headerSortType?: DistrictRatioSortType) => {
		if (headerSortType) {
			if (headerSortType === sortType) {
				setDescending(!descending);
				sortedDistricts.reverse();
			} else {
				setSortType(headerSortType);
				setDescending(true);
			}
		}
	}

	return (
		<div class="flex flex-col gap-4">
			<div
				class={`grid grid-cols-3 ${
					preset.electionData.total.progress ? 'md:grid-cols-6' : 'md:grid-cols-5'
				} typo-u4 gap-4 gap-y-1 md:gap-8 border-b border-white/40 pb-1`}
			>
				{headers.map((v) => (
					<SortableListHeader
						headerText={v.text}
						sClass={v.sClass}
						isActive={v.sortType === sortType}
						descending={descending}
						headerOnClick={() => headerOnClick(v.sortType)}
					>{v.children}</SortableListHeader>
				))}
			</div>
			{sortedDistricts.map((d: District, i: number) => (
				<RowItem
					district={d}
					isInProgress={preset.electionData.total.progress !== undefined}
					isLive={preset.electionData.type == ElectionDataType.Live}
				/>
			))}
		</div>
	);
}
