import React from 'react';
import { District } from '../models/election';

type DistrictTooltipProps = {
	show: boolean,
	district: District,
	topCandidateDisplay: number
};

const DistrictTooltip = (props: DistrictTooltipProps) => {
	const { district } = props;



	return (
		<div id="district-tooltip">
			<div>{district.name}</div>
			<div>
				{district.voting.result.map((res) => {
					<div>
						<div>{res.candidateId}</div>
						<div>{res.count}</div>
					</div>
				})}
			</div>

		</div>
	);
};

export default DistrictTooltip
