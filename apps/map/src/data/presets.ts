import { ElectionIndex } from '../models/election';

export const electionIndexes: ElectionIndex[] = [
	{
		shortname: `ผลผู้ว่าฯ '65 [Mocked]`,
		fullname: `ผลเลือกตั้งผู้ว่าฯ กทม. '65`,
		electionDataUrl: '/map/data/65-electiondata-live-mock.json',
		candidateDataUrl: '/map/data/65-candidates.json'
	},
	{
		shortname: `ผลผู้ว่าฯ '65 [Live API]`,
		fullname: `ผลเลือกตั้งผู้ว่าฯ กทม. '65`,
		electionDataUrl: 'https://bkkelection2022live.wevis.info/election-data.json',
		candidateDataUrl: '/map/data/65-candidates.json',
		refreshIntervalMs: 30000
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
		fullname: `ผลเลือกตั้งผู้ว่าฯ กทม. '56`,
		electionDataUrl: '/map/data/56-electiondata.json',
		candidateDataUrl: '/map/data/56-candidates.json'
	}
];
