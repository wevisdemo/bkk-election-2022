import { useContext, useState } from 'react';
import { PARTY_UNDEFINED_STRING } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { ElectionDataType, Voting } from '../../models/election';
import Modal from '../Modal';
import Progress, { ProgressItem } from '../Progress';

interface Props {
	candidateId: string;
	count: number;
	topVoteCount: number;
	isInTop: boolean;
	votingData: Voting;
}

export default function CandidateOverviewListRowItem({
	candidateId,
	topVoteCount,
	count,
	isInTop,
	votingData
}: Props) {
	const preset = useContext(presetContext);
	const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

	if (!preset) return <tr></tr>;

	const result = votingData.result.find((v) => v.candidateId === candidateId);
	if (!result) return <tr></tr>;

	const candidate = preset.candidateMap[candidateId];

	return (
		<>
			<div class="flex flex-row mt-4">
				<span class="basis-10">{candidate.number || '-'}</span>
				<div class="flex-1 flex flex-row">
					<a
						href={`/candidate/${candidate.number}`}
						target="_blank"
						class="text-left font-semibold hover:underline"
					>
						{candidate.fullname}
					</a>
					{candidate.descriptionModal && (
						<>
							<button
								class="opacity-70 hover:opacity-100 ml-1"
								onClick={() => setIsDescriptionModalOpen(true)}
							>
								<svg viewBox="0 0 16 16" fill="none" class="fill-white w-3 h-3">
									<path d="M7.24975 5.75H8.74975V4.25L7.24975 4.25V5.75ZM7.99975 14C4.69226 14 1.99976 11.3075 1.99976 8C1.99976 4.6925 4.69226 2 7.99975 2C11.3073 2 13.9998 4.6925 13.9998 8C13.9998 11.3075 11.3073 14 7.99975 14ZM7.99975 0.5C7.01484 0.5 6.03957 0.693993 5.12963 1.0709C4.21969 1.44781 3.39289 2.00026 2.69645 2.6967C1.28993 4.10322 0.499756 6.01088 0.499756 8C0.499756 9.98912 1.28993 11.8968 2.69645 13.3033C3.39289 13.9997 4.21969 14.5522 5.12963 14.9291C6.03957 15.306 7.01484 15.5 7.99975 15.5C9.98888 15.5 11.8965 14.7098 13.3031 13.3033C14.7096 11.8968 15.4998 9.98912 15.4998 8C15.4998 7.01509 15.3058 6.03981 14.9289 5.12987C14.5519 4.21993 13.9995 3.39314 13.3031 2.6967C12.6066 2.00026 11.7798 1.44781 10.8699 1.0709C9.95994 0.693993 8.98467 0.5 7.99975 0.5ZM7.24975 11.75H8.74975V7.25H7.24975L7.24975 11.75Z" />
								</svg>
							</button>
							{isDescriptionModalOpen && (
								<Modal title={candidate.fullname} onClose={() => setIsDescriptionModalOpen(false)}>
									{candidate.descriptionModal}
								</Modal>
							)}
						</>
					)}
				</div>
				<span class="text-right basis-3/12 hidden 2xl:block">
					{candidate.party || PARTY_UNDEFINED_STRING}
				</span>
				<span class="text-right basis-3/12 2xl:basis-2/12">{count.toLocaleString()}</span>
				<span class="text-right basis-2/12">
					{/* {(result.count / votingData.totalVotes).toLocaleString( */}
					{(count / votingData.totalVotes).toLocaleString(undefined, {
						style: 'percent',
						minimumFractionDigits: 1
					})}
				</span>
			</div>
			<div
				class={`flex flex-row flex-1 mt-2 border-0 border-b-2 border-white/20 ${
					isInTop ? 'h-11' : 'h-2'
				}`}
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
					{isInTop && candidate.image && (
						<img src={candidate.image} class="h-12 absolute right-2 bottom-0 object-cover" />
					)}
				</Progress>
			</div>
		</>
	);
}
