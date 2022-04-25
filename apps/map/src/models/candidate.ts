export interface Candidate {
	number: string;
	name: string;
	color: string;
	party: string;
	image: string;
}

export type CandidateMap = {
	[number: number]: Candidate;
};
