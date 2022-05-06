import { ElectionArea } from "./election-area";
import { Party } from "./party";

export interface Candidate {
  id: number;
  no: number;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  totalVotes: number;
  active: boolean;
  electionArea: ElectionArea;
  party: Party;
  avatarURL: string;
  updatedAt: string;
}