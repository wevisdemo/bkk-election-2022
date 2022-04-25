export interface Candidate {
	id: string; // ผู้ว่า = number, ส.ก. = district-number
	number: string;
	fullname: string;
	shortname: string;
	color: string;
	party: string;
	image: string;
}

export type CandidateMap = {
	[number: number]: Candidate;
};
