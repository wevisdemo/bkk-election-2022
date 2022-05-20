import { Candidate } from "./election-data/models/candidate";
import { Candidate as RealtimeCandidate } from "./realtime/models/candidate";

export function getIdForGovernor(c: Candidate | RealtimeCandidate): string {
  return `${c.no}`;
}

export function getIdForCouncilMember(c: Candidate): string {
  return `${c.electionArea.name}-${c.no}`;
}

export type IdGetter = (c: Candidate) => string;