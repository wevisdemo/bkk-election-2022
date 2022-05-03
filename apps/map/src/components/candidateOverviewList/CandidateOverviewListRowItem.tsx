import { useContext } from 'react';
import { PARTY_UNDEFINED_STRING } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { ElectionDataType } from '../../models/election';
import Progress, { ProgressItem } from '../Progress';

interface Props {
	candidateId: string;
	index: number;
	topVoteCount: number;
	isInTop: boolean;
}

export default function CandidateOverviewListRowItem({ candidateId, topVoteCount, index, isInTop }: Props) {
	const preset = useContext(presetContext);

	if (!preset) return <tr></tr>;

	const result = preset.electionData.total.result.find((v) => v.candidateId === candidateId);
	if (!result) return <tr></tr>;

	const candidate = preset.candidateMap[candidateId];

	return (
		<>
			<div class="flex flex-row mt-4">
				<span class="basis-4">
					{index + 1}
				</span>
				<span class="text-left font-semibold flex-1">
					{`${candidate.fullname}` + (candidate.number ? ` [${candidate.number}]` : '')}
				</span>
				<span class="text-right basis-2/12 hidden md:block">
					{candidate.party || PARTY_UNDEFINED_STRING}
				</span>
				<span class="text-right basis-2/12">
					{result.count.toLocaleString()}
				</span>
				<span class="text-right basis-2/12">
					{(result.count / preset.electionData.total.totalVotes).toLocaleString(
						undefined, {style: 'percent', minimumFractionDigits: 1})
					}
				</span>
			</div>
			<div
				class={`flex flex-row mt-2 border-0 border-b-2 border-white/20 ${isInTop ? 'h-11' : 'h-2'}`}
			>
				<Progress
					progressItems={
						[
							{
								color:
									preset.electionData.type === ElectionDataType.Poll
										? candidate.color + '71'
										: candidate.color,
								percent: result.count / topVoteCount,
								strip: preset.electionData.type === ElectionDataType.Live
							}
						] as ProgressItem[]
					}
					sClass={`relative p-0 rounded-r-[2px]`}
					border={`${
						preset.electionData.type === ElectionDataType.Poll ? '2px dashed' + candidate.color : ''
					}`}
				>
					{isInTop && candidate.image && <img src={candidate.image} class="h-12 absolute right-2 bottom-0" />}
				</Progress>
			</div>
		</>
	);
}
