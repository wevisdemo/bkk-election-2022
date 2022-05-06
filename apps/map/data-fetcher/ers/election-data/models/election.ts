export interface Election {
  id: number;
  year: string;
  name: string;
  local: boolean;
  active: boolean;
  totalVotes: number;
  goodVotes: number;
  badVotes: number;
  noVotes: number;
  eligible: number;
  updatedAt: string;
}