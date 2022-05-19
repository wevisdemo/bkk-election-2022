import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_CANDIDATE_COLOR } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { District, Result } from '../../models/election';
import DistrictTooltip from '../DistrictTooltip';
import Progress, { ProgressItem } from '../Progress';

interface RatioListRowItemProps {
	district: District;
	isInProgress: boolean;
	isLive: boolean;
	onClick: () => void;
}

const STACKED_BAR_DISPLAY_MAX = 6;
export default function RatioListRowItem({
	district,
	isInProgress,
	isLive,
	onClick
}: RatioListRowItemProps) {
	const preset = useContext(presetContext);
	const rowRef = useRef<HTMLDivElement>(null);
	const [isTooltipOnTop, setIsTooltipOnTop] = useState<boolean>(false);

	if (!preset) return <></>;

	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	const countingProgress: number = district.voting.progress || 0;
	const countingProgressItems: ProgressItem[] = [
		{
			percent: countingProgress / 100,
			color: '#FFFFFF',
			strip: isLive
		},
		{ percent: 1 - countingProgress / 100, color: 'rgba(255, 255, 255, 0.2)' }
	];

	const progressItems: ProgressItem[] = useMemo(() => {
		const prog: ProgressItem[] = district.voting.result
			.reduce((prev: ProgressItem[], curr: Result) => {
				if (!curr.count || !district.voting.totalVotes) return prev
				const percent = curr.count / district.voting.totalVotes;
				if (prev.length == STACKED_BAR_DISPLAY_MAX) {
					prev[prev.length - 1].percent += percent;
					prog[prog.length - 1].color = DEFAULT_CANDIDATE_COLOR
					return prev
				}
				return [
					...prev,
					{
						percent: percent,
						color: preset.candidateMap[curr.candidateId].color
					}
				];
			}, []);
		
			
			if (prog.length == 0) {
				return [
					{
						percent: 100,
						color: DEFAULT_CANDIDATE_COLOR,
						strip: isLive
					}
				] as ProgressItem[];
			}

			return prog;
	}, [district]);

	useEffect(() => {
		if (rowRef.current) {
			setIsTooltipOnTop(
				rowRef.current.offsetTop - (rowRef.current.parentElement?.scrollTop || 0) <
					(rowRef.current.parentElement?.clientHeight || 0) / 2
			);
		}
	}, [isTooltipOpen]);

	return (
		<div
			class={`grid ${isInProgress ? 'grid-cols-3 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-5'
				} typo-u4 gap-x-4 gap-y-1 md:gap-8 hover:bg-white/20 items-center py-1`}
			onMouseOver={() => setIsTooltipOpen(true)}
			onMouseLeave={() => setIsTooltipOpen(false)}
			ref={rowRef}
			onClick={onClick}
		>
			<div class="font-semibold">{district.name}</div>
			<div class={isInProgress ? 'text-left' : 'text-right md:text-left'}>
				{district.voting.eligiblePopulation.toLocaleString()}&nbsp;(
				{(
					district.voting.eligiblePopulation / preset.electionData.total.eligiblePopulation
				).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 })}
				)
			</div>
			<div
				class={`${
					isInProgress ? 'col-span-3' : 'col-span-2 md:col-span-3'
				} relative flex h-full items-center order-last md:order-3`}
			>
				<div className="flex grow order-last md:order-3">
					<Progress border="1px solid #000000" className="h-[10px]" progressItems={progressItems} />
				</div>
				<DistrictTooltip
					show={isTooltipOpen}
					district={district}
					className={`${isTooltipOnTop ? 'top-full' : 'bottom-full'}`}
					pointUp={isTooltipOnTop}
					topCandidateDisplay={STACKED_BAR_DISPLAY_MAX - 1}
				/>
			</div>
			{isInProgress && isLive && (
				<div class="flex md:basis-2/12 gap-2 order-4">
					{countingProgress.toFixed(1)}%
					<Progress progressItems={countingProgressItems} className="h-1 md:h-2" />
				</div>
			)}
		</div>
	);
}
