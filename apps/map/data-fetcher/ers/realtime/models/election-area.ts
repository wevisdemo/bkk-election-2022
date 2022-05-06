import { Candidate } from "./candidate";

export interface ElectionArea {
  id: number;
  areaNo: number;
  name: string;
  reportState: 'WAITING' | 'REPORTING' | 'FINISHED';
  totalVotes: number;
  goodVotes: number;
  badVotes: number;
  noVotes: number;
  eligible: number;
  progress: number;
  updatedAt: string;
}

export interface ElectionAreaWithCandidates extends ElectionArea {
  candidates: Candidate[];
}