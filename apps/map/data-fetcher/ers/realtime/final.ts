import { fetch } from "../network";
import { Candidate } from "./models/candidate";
import { Election } from "./models/election";
import { ElectionArea, ElectionAreaWithCandidates } from "./models/election-area";
const FINAL_API_PATH = '/final';

export async function getElection(electionId: number): Promise<Election> {
  const res = await fetch(`${FINAL_API_PATH}/${electionId}`);
  return (await res.json()) as Election;
}

export async function getElectionAreas(electionId: number): Promise<ElectionArea[]> {
  const res = await fetch(`${FINAL_API_PATH}/${electionId}/electionAreas`);
  return (await res.json()) as ElectionArea[];
}

export async function getCandidates(electionId: number): Promise<Candidate[]> {
  const res = await fetch(`${FINAL_API_PATH}/${electionId}/candidates`);
  return (await res.json()) as Candidate[];
}

export async function getElectionAreaById(electionId: number, electionAreaId: number): Promise<ElectionAreaWithCandidates> {
  const res = await fetch(`${FINAL_API_PATH}/${electionId}/electionAreas/${electionAreaId}`);
  return (await res.json()) as ElectionAreaWithCandidates;
}
