import { Candidate } from "./election-data/models/candidate";
import { Candidate as RealtimeCandidate } from "./realtime/models/candidate";
import { stripDistrictPrefix } from "./utils";

export function getIdForGovernor(c: Candidate | RealtimeCandidate): string {
  return `${c.no}`;
}

export function getIdForCouncilMember(c: Candidate): string {
  return `${stripDistrictPrefix(c.electionArea.name)}-${c.no}`;
}

export type IdGetter = (c: Candidate) => string;