
import { fetch } from "../network";
import { Candidate } from "./models/candidate";
import { Election } from "./models/election";

const FINAL_API_PATH = '/final';

export async function getElection(electionId: number): Promise<Election> {
  const res = await fetch(`${FINAL_API_PATH}/${electionId}`);
  return (await res.json()) as Election;
}

export async function getCandidates(electionId: number): Promise<Candidate[]> {
  const res = await fetch(`${FINAL_API_PATH}/${electionId}/candidates`);
  return (await res.json()) as Candidate[];
}