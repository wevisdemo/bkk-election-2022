import React, { FunctionComponent, useContext } from 'react';
import { presetContext } from '../contexts/preset';
import { District, Voting } from '../models/election';
import CandidateOverviewList from './candidateOverviewList/CandidateOverviewList';
import Modal from './Modal';

interface DistrictModalProps {
	activeDistrict: District;
	votingData: Voting;
	isLive: boolean;
	onClose: () => void;
}

const DistrictModal: FunctionComponent<DistrictModalProps> = ({
	activeDistrict,
	onClose,
	votingData,
	isLive
}) => {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	return (
		<Modal
			containerClassName="lg:absolute lg:z-10 lg:top-0 lg:left-0 lg:right-0 lg:bottom-0"
			className="max-h-full max-w-[calc(100vw-2rem)] h-full w-full lg:absolute lg:z-10 lg:top-0 lg:left-0 lg:right-0 lg:bottom-0 !max-w-none"
			title={`เขต${activeDistrict.name}`}
			subtitle={`ผู้มีสิทธิ์เลือกตั้ง ${activeDistrict.voting.eligiblePopulation.toLocaleString()} คน`}
			imageUrl={`/map/images/districts-attraction/${activeDistrict.name}.webp`}
			onClose={onClose}
		>
			<CandidateOverviewList votingData={votingData} enableTopHighlight={false} />
			{votingData.progress !== undefined && (
				<div class="flex flex-row border-t border-gray py-3 pb-0 typo-u4">
					<div className="flex-1 flex flex-row lg:flex-col space-y-1">
						{isLive && (
							<>
								<div>
									จำนวนหน่วยที่อาสาฯ
									<br className="lg:hidden" />
									เริ่มนับแล้ว {(votingData.progress || 0).toFixed(1)}%
								</div>
								<div className="lg:h-2 lg:w-full lg:w-48 bg-white bg-opacity-30 w-1 h-7 order-first lg:order-none relative mr-2 counting-progress-xs">
									<div
										className="absolute bg-white w-full bottom-0 lg:hidden"
										style={{
											height: `${votingData.progress}%`
										}}
									>
										{isLive && (
											<div
												className="absolute inset-0 opacity-20"
												style={{ backgroundImage: `url(/map/images/strip-black.gif)` }}
											/>
										)}
									</div>
									<div
										className="absolute bg-white h-full left-0 hidden lg:block"
										style={{
											width: `${votingData.progress}%`
										}}
									>
										{isLive && (
											<div
												className="absolute inset-0 opacity-20"
												style={{ backgroundImage: `url(/map/images/strip-black.gif)` }}
											/>
										)}
									</div>
								</div>{' '}
							</>
						)}
					</div>

					{preset.electionData.lastUpdatedAt && (
						<div className="flex text-right">
							<p>
								อัปเดตล่าสุด{` `}
								{new Date(preset.electionData.lastUpdatedAt).toLocaleString('th-TH', {
									dateStyle: 'short',
									timeStyle: 'short'
								})}
							</p>
						</div>
					)}
				</div>
			)}
		</Modal>
	);
};

export default DistrictModal;
