export interface PresetIndex {
	shortname: string;
	fullname: string;
	subtitle?: string;
	descriptionModal?: string;
	electionDataUrl: string;
	candidateDataUrl: string;
	refreshIntervalMs?: number;
	isLive?: boolean;
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
