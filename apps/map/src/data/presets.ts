import { ElectionIndex } from '../models/election';

export const electionIndexes: ElectionIndex[] = [
	{
		shortname: `ผลผู้ว่าฯ '65 (เร็วๆ นี้)`,
		fullname: `ผลเลือกตั้งผู้ว่าฯ กทม. '65`,
		electionDataUrl: '',
		candidateDataUrl: ''
	},
	{
		shortname: `Exit Poll ผู้ว่าฯ '65`,
		fullname: `Exit Poll ผู้ว่าฯ กทม. '65`,
		electionDataUrl: '',
		candidateDataUrl: ''
	},
	{
		shortname: `ผล ส.ก. '65`,
		fullname: `ผลเลือกตั้ง ส.ก. กทม. '65`,
		electionDataUrl: '',
		candidateDataUrl: ''
	},
	{
		shortname: `คะแนนย้อนหลัง '56`,
		fullname: `ผลเลือกตั้งผู้ว่าฯ กทม. '65`,
		electionDataUrl: '/map/data/65-electiondata.json',
		candidateDataUrl: '/map/data/65-candidates.json'
	}
];
