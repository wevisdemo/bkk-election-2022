import { CandidateElectionArea } from "./candidate-election-area";
import { Party } from "./party";

export interface Candidate {
  id: number;
  no: number;
  rank: number;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  totalVotes: number;
  avatarURL: string;
  party: Party;
  electionAreas: CandidateElectionArea[];
  updatedAt: string;
}