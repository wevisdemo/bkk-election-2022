import { useContext, useMemo, useState } from 'react';
import { presetContext } from '../../contexts/preset';
import { District, Result } from '../../models/election';
import DistrictTooltip from '../DistrictTooltip';
import Progress, { ProgressItem } from '../Progress';

interface RatioListRowItemProps {
	district: District;
	isInProgress: boolean;
	isLive: boolean;
}

export default function RatioListRowItem({
	district,
	isInProgress,
	isLive
}: RatioListRowItemProps) {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

	const countingProgress: number = district.voting.progress || 100;
	const countingProgressItems: ProgressItem[] = [
		{
			percent: countingProgress / 100,
			color: '#FFFFFF',
			strip: isLive
		},
		{ percent: 1 - countingProgress / 100, color: 'rgba(255, 255, 255, 0.2)' }
	];

	const progressItems: ProgressItem[] = useMemo(
		() =>
			district.voting.result
				.sort((a: Result, b: Result) => b.count - a.count)
				.map((res: Result) => {
					return {
						percent: res.count / district.voting.totalVotes,
						color: preset.candidateMap[res.candidateId].color
					};
				}),
		[district]
	);

	return (
		<div
			class={`grid ${
				isInProgress ? 'grid-cols-3 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-5'
			} typo-u4 gap-x-4 gap-y-1 md:gap-8 hover:bg-white/20 items-center py-1`}
			onMouseOver={() => setIsTooltipOpen(true)}
			onMouseLeave={() => setIsTooltipOpen(false)}
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
				<DistrictTooltip show={isTooltipOpen} district={district} className="top-full" />
			</div>
			{isInProgress && (
				<div class="flex md:basis-2/12 gap-2 order-4">
					{countingProgress.toFixed(1)}%
					<Progress progressItems={countingProgressItems} className="h-1 md:h-2" />
				</div>
			)}
		</div>
	);
}
