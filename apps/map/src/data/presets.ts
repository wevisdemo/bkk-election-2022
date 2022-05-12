import { ElectionIndex } from '../models/election';

export const electionIndexes: ElectionIndex[] = [
	{
		shortname: `คะแนนผู้ว่าฯ '65 (ไม่เป็นทางการ) [Mocked]`,
		fullname: `ผลนับคะแนนเลือกตั้งผู้ว่าฯ กทม. 65 (ไม่เป็นทางการ)`,
		subtitle: `จาก 2,500 หน่วยเลือกตั้ง โดยอาสาสมัครในโครงการของสื่อมวลชนและภาคส่วนอื่นๆ`,
		electionDataUrl: '/map/data/65-electiondata-live-mock.json',
		candidateDataUrl: '/map/data/65-candidates.json'
	},
	{
		shortname: `คะแนนผู้ว่าฯ '65 (ไม่เป็นทางการ) [Live API]`,
		fullname: `ผลนับคะแนนเลือกตั้งผู้ว่าฯ กทม. 65 (ไม่เป็นทางการ)`,
		subtitle: `จาก 2,500 หน่วยเลือกตั้ง โดยอาสาสมัครในโครงการของสื่อมวลชนและภาคส่วนอื่นๆ`,
		electionDataUrl: 'https://bkkelection2022live.wevis.info/election-data.json',
		candidateDataUrl: '/map/data/65-candidates.json',
		refreshIntervalMs: 30000
	},
	{
		shortname: `Exit Poll ผู้ว่าฯ กทม. '65`,
		fullname: `Exit Poll ผู้ว่าฯ กทม. '65`,
		electionDataUrl: '',
		candidateDataUrl: ''
	},
	{
		shortname: `คะแนน ส.ก. '65 (ไม่เป็นทางการ) - เร็วๆ นี้`,
		fullname: `คะแนน ส.ก. '65 (ไม่เป็นทางการ)`,
		electionDataUrl: '',
		candidateDataUrl: ''
	},
	{
		shortname: `คะแนนเลือกตั้งครั้งก่อน (2556)`,
		fullname: `คะแนนเลือกตั้งผู้ว่าฯ กทม. ครั้งก่อน (2556)`,
		electionDataUrl: '/map/data/56-electiondata.json',
		candidateDataUrl: '/map/data/56-candidates.json'
	}
];
