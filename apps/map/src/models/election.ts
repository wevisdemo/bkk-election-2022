export interface ElectionIndex {
	shortname: string;
	fullname: string;
	electionDataUrl: string;
	candidateDataUrl: string;
}

export interface ElectionData {
	total: Voting;
	districts: District[];
}

export interface District {
	name: string;
	voting: Voting;
}

export interface Voting {
	eligiblePopulation: number;
	totalVotes: number;
	result: Result[];
}

export interface Result {
	candidateId: number;
	count: number;
}
