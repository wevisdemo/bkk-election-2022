import { Candidate } from "./candidate";

export interface Party {
  id: number;
  code: string;
  name: string;
  logoURL: string;
  active: boolean;
  candidates: Candidate[];
  updatedAt: string;
}