import { ElectionData } from './election';

export interface LiveVote {
	isLive: boolean;
	electionData: ElectionData;
	updatedAt: Date;
}
