export interface Party {
  id: number;
  code: string;
  name: string;
  logoURL: string;
  seat: number;
  totalVotes: number;
  // candidates: Candidate[]; // API Doc states that this is NOT a realtime candidate but a normal one
  updatedAt: string;
}