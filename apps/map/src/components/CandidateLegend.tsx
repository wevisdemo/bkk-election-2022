import React, { useContext, useMemo, useState } from 'react';
import { DEFAULT_CANDIDATE_COLOR } from '../constants/candidate';
import { presetContext } from '../contexts/preset';
import { Candidate } from '../models/candidate';
import Modal from './Modal';

interface CandidateLegendProps {
	topCandidatePerDistrict: number;
	children?: React.ReactNode;
}

interface Label {
	text: string;
	color: string;
}

const INSTRUCTION_SHORT_STRING = 'วิธีอ่าน';
const INSTRUCTION_STRING = 'วิธีอ่านแผนภาพ';
const OTHER_CANDIDATES_TEXT = 'อื่นๆ';

export default function CandidateLegend({
	topCandidatePerDistrict,
	children
}: CandidateLegendProps) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	const candidateLabels: Label[] = useMemo(() => {
		let tempLabels: Label[] = [];
		let hasDefualtCandidateColor = false; 
		for (const district of preset.electionData.districts) {
			const sorted = district.voting.result.sort((a, b) => b.count - a.count);
			for (let i = 0; i < topCandidatePerDistrict && i < sorted.length; i++) {
				const candidate = preset.candidateMap[sorted[i].candidateId];
				if (candidate.color.localeCompare(DEFAULT_CANDIDATE_COLOR) === 0){
					hasDefualtCandidateColor = true;
				} else if (!tempLabels.find((l) => l.color == candidate.color) && candidate && sorted[i].count > 0) {
					tempLabels.push({ text: candidate.shortname, color: candidate.color });
				}
			}
		}
		if (hasDefualtCandidateColor) {
			tempLabels.push({ text: OTHER_CANDIDATES_TEXT, color: DEFAULT_CANDIDATE_COLOR })
		}
		return tempLabels.filter((candidate) => candidate);
	}, [preset, topCandidatePerDistrict]);

	return (
		<div class="flex md:flex-col gap-2 md:w-full typo-u4 relative ml-auto mr-auto">
			<div class="flex gap-2 md:gap-4 w-full md:w-1/2 ml-auto mr-auto md:mr-0">
				<div class="ml-auto overflow-auto overflow-y-hidden hide-scrollbar">
					<div class="flex flex-row gap-2">
						{candidateLabels.map((label: Label) => (
							<div class="flex shrink-0 gap-1 items-center">
								<span class="w-2 md:w-3 h-2 md:h-3" style={{ backgroundColor: label.color }}></span>
								{label.text}
							</div>
						))}
					</div>
				</div>
				<div
					class={`flex flex-row shrink-0 gap-2 md:hidden ${children || 'hidden'}`}
					onClick={() => setShowModal(true)}
				>
					<div class="border opacity-30" />
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="block self-center"
					>
						<path
							d="M7.24975 5.75H8.74975V4.25L7.24975 4.25V5.75ZM7.99975 14C4.69226 14 1.99976 11.3075 1.99976 8C1.99976 4.6925 4.69226 2 7.99975 2C11.3073 2 13.9998 4.6925 13.9998 8C13.9998 11.3075 11.3073 14 7.99975 14ZM7.99975 0.5C7.01484 0.5 6.03957 0.693993 5.12963 1.0709C4.21969 1.44781 3.39289 2.00026 2.69645 2.6967C1.28993 4.10322 0.499756 6.01088 0.499756 8C0.499756 9.98912 1.28993 11.8968 2.69645 13.3033C3.39289 13.9997 4.21969 14.5522 5.12963 14.9291C6.03957 15.306 7.01484 15.5 7.99975 15.5C9.98888 15.5 11.8965 14.7098 13.3031 13.3033C14.7096 11.8968 15.4998 9.98912 15.4998 8C15.4998 7.01509 15.3058 6.03981 14.9289 5.12987C14.5519 4.21993 13.9995 3.39314 13.3031 2.6967C12.6066 2.00026 11.7798 1.44781 10.8699 1.0709C9.95994 0.693993 8.98467 0.5 7.99975 0.5ZM7.24975 11.75H8.74975V7.25H7.24975L7.24975 11.75Z"
							fill="white"
						/>
					</svg>
					<p class="underline font-semibold">{INSTRUCTION_SHORT_STRING}</p>
				</div>
			</div>
			<div class="hidden md:flex text-right ml-auto">{children}</div>

			{showModal && (
				<Modal title={INSTRUCTION_STRING} onClose={() => setShowModal(false)}>
					{children}
				</Modal>
			)}
		</div>
	);
}
