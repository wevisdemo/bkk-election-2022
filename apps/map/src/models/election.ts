export interface ElectionIndex {
	shortname: string;
	fullname: string;
	electionDataUrl: string;
	candidateDataUrl: string;
	refreshIntervalMs?: number;
}

export interface ElectionData {
	type: ElectionDataType;
	total: Voting;
	districts: District[];
	lastUpdatedAt?: string;
}

export interface District {
	name: string;
	voting: Voting;
}

export interface Voting {
	eligiblePopulation: number;
	totalVotes: number;
	progress?: number;
	result: Result[];
}

export interface Result {
	candidateId: string;
	count: number;
}

export enum ElectionDataType {
	Completed = 'COMPLETED',
	Live = 'LIVE',
	Poll = 'POLL'
}
