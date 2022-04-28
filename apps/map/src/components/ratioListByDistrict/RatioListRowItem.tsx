import { useContext } from 'react';
import { presetContext } from '../../contexts/preset';
import { District, ElectionDataType, Result } from '../../models/election';
import Progress, { ProgressItem } from './Progress';

interface RatioListRowItemProps {
	district: District;
}

export default function RatioListRowItem({ district }: RatioListRowItemProps) {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	const countingProgress: number =
		(district.voting.totalVotes / district.voting.eligiblePopulation);
	const countingProgressItems: ProgressItem[] = [
		{ percent: countingProgress, color: '#FFFFFF', strip: (preset.electionData.type === ElectionDataType.Live) },
		{ percent: 1 - countingProgress, color: 'rgba(255, 255, 255, 0.2)' }
	];
	return (
		<div class="grid grid-cols-3 md:grid-cols-6 typo-u4 gap-4 gap-y-1 md:gap-8 hover:bg-white/20">
			<div class="font-semibold">{district.name}</div>
			<div class="">{district.voting.eligiblePopulation.toLocaleString()}</div>
			<div class='col-span-3 flex grow order-last md:order-3'>
				<Progress
					border="#000"
					progressItems={district.voting.result.map((res: Result) => {
						return {
							percent: res.count/district.voting.totalVotes,
							color: preset.candidateMap[res.candidateId].color
						} as ProgressItem;
					})}
				/>
			</div>
			<div class="flex md:basis-2/12 gap-2 order-4">
				{countingProgress.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 1})}
				<Progress progressItems={countingProgressItems} />
			</div>
		</div>
	);
}
