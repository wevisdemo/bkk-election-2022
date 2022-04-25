export interface ElectionIndex {
	shortName: string;
	electionDataUrl: string;
	candidateDataUrl: string;
}

export interface ElectionData {
	fullName: string;
	total: Voting;
	districts: District[];
}

export interface Voting {
	eligiblePopulation: number;
	totalVotes: number;
	result: Result[];
}

export interface Result {
	number: number;
	count: number;
}

export interface District {
	name: string;
	voting: Voting;
}
