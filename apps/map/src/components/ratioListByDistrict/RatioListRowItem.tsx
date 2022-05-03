import { useContext } from 'react';
import { presetContext } from '../../contexts/preset';
import { District, Result } from '../../models/election';
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

	const countingProgress: number = district.voting.progress || 1;
	const countingProgressItems: ProgressItem[] = [
		{
			percent: countingProgress,
			color: '#FFFFFF',
			strip: isLive
		},
		{ percent: 1 - countingProgress,
			color: 'rgba(255, 255, 255, 0.2)'
		}
	];

	const progressItems: ProgressItem[] = district.voting.result
		.sort((a: Result, b: Result) => b.count - a.count)
		.map((res: Result) => {
			return {
				percent: res.count / district.voting.totalVotes,
				color: preset.candidateMap[res.candidateId].color
			};
		});

	return (
		<div class={`grid ${isInProgress ? 'grid-cols-3 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-5'} typo-u4 gap-x-4 gap-y-1 md:gap-8 hover:bg-white/20`}>
			<div class="font-semibold">{district.name}</div>
			<div class={ isInProgress ? 'text-left' : 'text-right md:text-left'}>
				{district.voting.eligiblePopulation.toLocaleString()} (
				{(
					district.voting.eligiblePopulation / preset.electionData.total.eligiblePopulation
				).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 1 })}
				)
			</div>
			<div class={`${isInProgress ? 'col-span-3' : 'col-span-2 md:col-span-3'} flex grow order-last md:order-3 my-auto`}>
				<Progress border="1px solid #000000" sClass="h-[10px]" progressItems={progressItems} />
			</div>
			{isInProgress && (
				<div class="flex md:basis-2/12 gap-2 order-4 my-auto">
					{countingProgress.toLocaleString(undefined, {
						style: 'percent',
						minimumFractionDigits: 1
					})}
					<Progress progressItems={countingProgressItems} sClass="h-1 md:h-2" />
				</div>
			)}
		</div>
	);
}
