export interface Election {
  id: number;
  totalVotes: number;
  goodVotes: number;
  badVotes: number;
  noVotes: number;
  eligible: number;
  progress: number;
  updatedAt: string;
}