import { fetch } from "../network";
import { Candidate } from "./models/candidate";
import { Election } from "./models/election";
import { ElectionArea } from "./models/election-area";

const ELECTION_DATA_API_PATH = `/elections`;

export async function getElection(electionId: number): Promise<Election> {
  const res = await fetch(`${ELECTION_DATA_API_PATH}/${electionId}`);
  return (await res.json()) as Election;
}

export async function getCandidates(electionId: number): Promise<Candidate[]> {
  const res = await fetch(`${ELECTION_DATA_API_PATH}/${electionId}/candidates`);
  return (await res.json()) as Candidate[];
}

export async function getElectionAreas(electionId: number): Promise<ElectionArea[]> {
  const res = await fetch(`${ELECTION_DATA_API_PATH}/${electionId}/electionAreas`);
  return (await res.json()) as ElectionArea[];
}