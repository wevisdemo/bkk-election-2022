import { Candidate } from "./candidate";
import { Subdistrict } from "./subdistrict";

export interface ElectionArea {
  id: number;
  areaNo: number;
  name: string;
  totalVotes: number;
  goodVotes: number;
  badVotes: number;
  noVotes: number;
  eligible: number;
  seatAvailable: number;
  candidates: Candidate[];
  subdistricts: Subdistrict[];
  updatedAt: string;
}