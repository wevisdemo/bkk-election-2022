import { CandidateMap } from "../../src/models/candidate";
import { CandidatesFetcher, ElectionDataFetcherType } from "../fetcher";
import { getCandidates } from "./election-data";
import { Candidate } from "./election-data/models/candidate";
import { Candidate as OutputCandidate } from '../../src/models/candidate';
import { BKK_COUNCIL_MEMBER_ELECTION_ID, BKK_GOVERNOR_ELECTION_ID } from "./election-ids";
import { getIdForCouncilMember, getIdForGovernor, IdGetter } from "./get-candidate-ids";

export const fetchCandidates: CandidatesFetcher = (type: ElectionDataFetcherType): Promise<CandidateMap> => {
  if (type === ElectionDataFetcherType.Governor) {
    return fetchGovernorCandidates();
  } else if (type === ElectionDataFetcherType.CouncilMember) {
    return fetchCouncilMemberCandidates();
  }
  throw new Error('Not a suitable election data fetcher type!');
}

async function fetchGovernorCandidates(): Promise<CandidateMap> {
  const candidates = await getCandidates(BKK_GOVERNOR_ELECTION_ID);
  return mapCandidates(candidates, getIdForGovernor);
}

async function fetchCouncilMemberCandidates(): Promise<CandidateMap> {
  const candidates = await getCandidates(BKK_COUNCIL_MEMBER_ELECTION_ID);
  return mapCandidates(candidates, getIdForCouncilMember);
}

function mapCandidates(candidates: Candidate[], idGetter: IdGetter): CandidateMap {
  return candidates
    .map(c => {
      const candidate = mapCandidate(c);
      return {...candidate, id: idGetter(c) };
    })
    .reduce((prev: CandidateMap, next: OutputCandidate): CandidateMap => {
      prev[next.id] = next;
      return prev;
    }, {});
}

function mapCandidate(candidate: Candidate): OutputCandidate {
  return {
    id: 'UNMAPPED', // ผู้ว่า = number, ส.ก. = district-number
    number: candidate.no,
    fullname: candidate.fullName,
    shortname: getCandidateShortName(candidate),
    color: 'UNMAPPED',
    party: candidate.party.name,
    image: candidate.avatarURL,
  }
}

const normalTitles = ['นาย', 'นาง', 'นางสาว'];

function getCandidateShortName(candidate: Candidate): string {
  if (normalTitles.includes(candidate.title)) {
    return candidate.firstName;
  }
  return `${candidate.title}${candidate.firstName}`
}