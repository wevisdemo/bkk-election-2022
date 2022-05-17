import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PARTY_UNDEFINED_STRING, TOP_CANDIDATE_DISPLAY } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { Result } from '../../models/election';
import SortableListHeader from '../SortableListHeader';
import CandidateOverviewListRowItem from './CandidateOverviewListRowItem';

interface CandidateOverviewListProps {
	district?: string;
}

enum CandidateOverviewSortType {
	COUNT = 'count',
	NUMBER = 'number',
	NAME = 'name',
	PERCENT = 'percent',
	PARTY = 'party'
}

const NAME_TITLE_REGEX = /(นาย|นาง(สาว)?|((น|พล|พ)\.(ต\.|อ\.)?(อ|ท|ต)\.)(หญิง)?|ม\.ร\.ว\.)/i

export default function CandidateOverviewList({ district }: CandidateOverviewListProps) {
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

	const sortDirection = useMemo(() => (descending ? -1 : 1), [descending]);

	const getDefaultSortDescending = (newSortType: CandidateOverviewSortType) => {
		return (
			newSortType === CandidateOverviewSortType.COUNT ||
			newSortType === CandidateOverviewSortType.PERCENT
		);
	};

	const results = useMemo(() => {
		let newResults;
		const districtFromDistricts = preset.electionData.districts.find((d) => d.name == district);
		if (district && districtFromDistricts) {
			newResults = districtFromDistricts.voting.result;
		} else {
			newResults = preset.electionData.total.result;
		}
		switch (sortType) {
			case CandidateOverviewSortType.PARTY:
				return newResults.sort((a, b) => {
					return (
						(preset.candidateMap[a.candidateId].party || PARTY_UNDEFINED_STRING).localeCompare(
							preset.candidateMap[b.candidateId].party || PARTY_UNDEFINED_STRING
						) * sortDirection
					);
				});
			case CandidateOverviewSortType.NAME:
				return newResults.sort(
					(a, b) =>
						preset.candidateMap[a.candidateId].fullname.replace(NAME_TITLE_REGEX, '').localeCompare(
							preset.candidateMap[b.candidateId].fullname.replace(NAME_TITLE_REGEX, '')
						) * sortDirection
				);
			case CandidateOverviewSortType.NUMBER:
				return newResults.sort((a, b) => {
					return (
						((preset.candidateMap[a.candidateId].number || 0) -
							(preset.candidateMap[b.candidateId].number || 0)) *
						sortDirection
					);
				});
			case CandidateOverviewSortType.PERCENT:
			case CandidateOverviewSortType.COUNT:
			default:
				return newResults.sort((a, b) => (a.count - b.count) * sortDirection);
		}
	}, [preset, sortType, sortDirection]);

	useEffect(() => {
		if (containerRef.current) {
			setIsBottom(
				containerRef.current.scrollHeight -
					containerRef.current.scrollTop -
					containerRef.current.clientHeight <
					1
			);
		}
	});

	const topVoteCount: number = Math.max(...results.map((v: Result) => v.count));
	const headers = [
		{
			text: 'เบอร์',
			className: 'text-left basis-10',
			sortType: CandidateOverviewSortType.NUMBER
		},
		{
			text: 'ชื่อผู้สมัคร',
			className: 'text-left basis-4 flex-1',
			sortType: CandidateOverviewSortType.NAME
		},
		{
			text: 'สังกัด',
			className: 'text-right basis-4/12 hidden 2xl:block',
			sortType: CandidateOverviewSortType.PARTY
		},
		{
			text: 'คะแนนเสียง',
			className: 'text-right basis-3/12 2xl:basis-2/12',
			sortType: CandidateOverviewSortType.COUNT
		},
		{
			text: '%',
			className: 'text-right basis-2/12',
			sortType: CandidateOverviewSortType.PERCENT
		}
	];

	const headerOnClick = (headerSortType?: CandidateOverviewSortType) => {
		if (headerSortType) {
			if (headerSortType === sortType) {
				setDescending(!descending);
			} else {
				setSortType(headerSortType);
				setDescending(getDefaultSortDescending(headerSortType));
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
						className={v.className + (v.sortType ? ' cursor-pointer' : '')}
						descending={descending}
						headerOnClick={() => headerOnClick(v.sortType)}
					/>
				))}
			</div>
			<div
				class="overflow-y-auto hide-scrollbar"
				ref={containerRef}
				onScroll={(event) => {
					const target = event.target as HTMLElement;
					setIsBottom(target.scrollHeight - target.scrollTop - target.clientHeight < 1);
				}}
			>
				<div
					class={`absolute z-10 w-full h-11 bg-gradient-to-t from-black to-black/0 bottom-0 pointer-events-none ${
						isBottom && 'hidden'
					}`}
				/>
				{results.map((res: Result, index: number) => {
					return (
						<CandidateOverviewListRowItem
							candidateId={res.candidateId}
							count={res.count}
							topVoteCount={topVoteCount}
							isInTop={
								(sortType === CandidateOverviewSortType.COUNT || sortType === CandidateOverviewSortType.PERCENT) &&
								descending && !district &&
								index < TOP_CANDIDATE_DISPLAY
							}
						/>
					);
				})}
			</div>
		</div>
	);
}
