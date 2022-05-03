export interface Candidate {
	id: string; // ผู้ว่า = number, ส.ก. = district-number
	number?: number;
	fullname: string;
	shortname: string;
	color: string;
	party?: string;
	image?: string;
}

export type CandidateMap = {
	[id: string]: Candidate;
};
