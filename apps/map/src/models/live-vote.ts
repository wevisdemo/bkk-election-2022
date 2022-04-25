import { ElectionData } from './election';

export interface LiveVote {
	isLive: boolean;
	progress: number;
	electionData: ElectionData;
	updatedAt: Date;
}
