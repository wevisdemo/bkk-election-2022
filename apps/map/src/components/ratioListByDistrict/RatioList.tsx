import { useContext } from 'react';
import { presetContext } from '../../contexts/preset';
import { District } from '../../models/election';
import RowItem from './RatioListRowItem';

export default function RatioListTable() {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	return (
		<div class='flex flex-col gap-4'>
			{preset.electionData.districts.map((d: District, i: number) => (
				<RowItem district={d}/>
			))}
		</div>
	);
}
