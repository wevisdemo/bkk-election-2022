import { useContext } from 'react';
import { PARTY_UNDEFINED_STRING } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { ElectionDataType, Voting } from '../../models/election';
import Progress, { ProgressItem } from '../Progress';

interface Props {
	candidateId: string;
	count: number;
	topVoteCount: number;
	isInTop: boolean;
	votingData: Voting;
}

export default function CandidateOverviewListRowItem({ votingData, candidateId, topVoteCount, count, isInTop }: Props) {
	const preset = useContext(presetContext);

	if (!preset) return <tr></tr>;

	const result = votingData.result.find((v) => v.candidateId === candidateId);
	if (!result) return <tr></tr>;

	const candidate = preset.candidateMap[candidateId];

	return (
		<>
			<div class="flex flex-row mt-4">
				<span class="basis-10">
					{candidate.number || '-'}
				</span>
				<a href={`/candidate/${candidate.number}`} target="_blank" class="text-left font-semibold flex-1 hover:underline">
					{candidate.fullname}
				</a>
				<span class="text-right basis-3/12 hidden 2xl:block">
					{candidate.party || PARTY_UNDEFINED_STRING}
				</span>
				<span class="text-right basis-3/12 2xl:basis-2/12">
					{count.toLocaleString()}
				</span>
				<span class="text-right basis-2/12">
					{/* {(result.count / votingData.totalVotes).toLocaleString( */}
					{(count / votingData.totalVotes).toLocaleString(
						undefined, {style: 'percent', minimumFractionDigits: 1})
					}
				</span>
			</div>
			<div
				class={`flex flex-row flex-1 mt-2 border-0 border-b-2 border-white/20 ${isInTop ? 'h-11' : 'h-2'}`}
			>
				<Progress
					progressItems={
						[
							{
								color:
									preset.electionData.type === ElectionDataType.Poll
										? candidate.color + '71'
										: candidate.color,
								percent: count / topVoteCount,
								strip: preset.electionData.type === ElectionDataType.Live
							}
						] as ProgressItem[]
					}
					className={`relative p-0 rounded-r-[2px]`}
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
