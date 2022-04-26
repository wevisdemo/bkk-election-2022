import { useContext } from 'react';
import { TOP_CANDIDATE_DISPLAY } from '../../constants/candidate';
import { presetContext } from '../../contexts/preset';
import { ElectionDataType } from '../../models/election';

interface Props {
	candidateId: number;
	index: number;
	topVoteRes: number;
}

const PARTY_UNDEFINED_STRING: string = 'อิสระ';
const STRIP_GIF_PATH = '/map/static/images/strip-black.gif';

export default function CandidateOverviewListRow({ candidateId, topVoteRes, index }: Props) {
	const preset = useContext(presetContext);

	if (!preset) return <tr></tr>;

	const indexResult = preset.electionData.total.result.find((v) => v.candidateId === candidateId);
	if (!indexResult) return <tr></tr>;

	const candidate = preset.candidateMap[candidateId];
	const percentage: number = (indexResult?.count / preset.electionData.total.totalVotes) * 100;
	const percentageBar: number = (indexResult?.count / topVoteRes) * 100;
	const candiateTitle: string =
		`${candidate.fullname}` + (candidate.number ? ` [${candidate.number}]` : '');
	const electionDataType: ElectionDataType = preset.electionData.type;
	const isInTop: boolean = index < TOP_CANDIDATE_DISPLAY;

	return (
		<>
			<div class="flex flex-row mt-4">
				<span class="basis-4">{index + 1}</span>
				<span class="text-left font-semibold flex-1">{candiateTitle}</span>
				<span class="text-right flex-1 hidden md:block">
					{candidate.party || PARTY_UNDEFINED_STRING}
				</span>
				<span class="text-right flex-1">{indexResult?.count.toLocaleString()}</span>
				<span class="text-right flex-1">{percentage.toFixed(1)}%</span>
			</div>
			<div class={`flex flex-row mt-2 border-0 border-b-2 border-white/20`}>
				<span
					class={`flex relative p-0 ${isInTop ? 'h-11' : 'h-2'} rounded-r-[2px] ${
						electionDataType == ElectionDataType.Poll ? 'border-2 border-dashed' : ''
					}
					`}
					style={{
						width: `${percentageBar}%`,
						backgroundColor: candidate.color + (electionDataType == ElectionDataType.Poll ? '71' : ''),
						borderColor: candidate.color
					}}
				>
					{electionDataType == ElectionDataType.Live && (
						<div
							style={{ backgroundImage: `url('${STRIP_GIF_PATH}')` }}
							class="opacity-20 w-full h-auto left-0 top-0"
						/>
					)}
					{isInTop && <img src={candidate.image} class="h-12 absolute right-2 bottom-0" />}
				</span>
			</div>
		</>
	);
}
