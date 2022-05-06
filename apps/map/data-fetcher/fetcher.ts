import { CandidateMap } from "../src/models/candidate";
import { ElectionData } from "../src/models/election";

export type ElectionDataFetcher = (type: ElectionDataFetcherType) => Promise<ElectionData>;
export type CandidatesFetcher = (type: ElectionDataFetcherType) => Promise<CandidateMap>;

export enum ElectionDataFetcherType {
  Governor,
  CouncilMember,
}