import { ElectionData, ElectionDataType } from "../../src/models/election";
import { ElectionDataFetcher, ElectionDataFetcherType } from "../fetcher";
import { getCandidates, getElection, getElectionAreas } from "./election-data";
import { BKK_COUNCIL_MEMBER_ELECTION_ID, BKK_GOVERNOR_ELECTION_ID } from "./election-ids";
import { getIdForCouncilMember, getIdForGovernor } from "./get-candidate-ids";
import { getCandidates as getRealtimeCandidates, getElection as getRealtimeElection, getElectionAreaById, getElectionAreas as getRealtimeElectionAreas } from "./realtime";

export const fetchElectionData: ElectionDataFetcher = (type: ElectionDataFetcherType): Promise<ElectionData> => {
  if (type === ElectionDataFetcherType.Governor) {
    return fetchGovernorElectionData();
  } else if (type === ElectionDataFetcherType.CouncilMember) {
    return fetchCouncilMemberElectionData();
  }
  throw new Error('Not a suitable election data fetcher type!');
}

async function fetchGovernorElectionData(): Promise<ElectionData> {
  const election = await getRealtimeElection(BKK_GOVERNOR_ELECTION_ID);
  const candidates = await getRealtimeCandidates(BKK_GOVERNOR_ELECTION_ID);
  const areaIds = (await getRealtimeElectionAreas(BKK_GOVERNOR_ELECTION_ID)).map(a => a.id);
  const areas = await Promise.all(
    areaIds.map(id => getElectionAreaById(BKK_GOVERNOR_ELECTION_ID, id))
  );

  return {
    type: ElectionDataType.Live,
    total: {
      eligiblePopulation: election.eligible,
      totalVotes: election.totalVotes,
      progress: election.progress,
      result: candidates.map(c => ({
        candidateId: getIdForGovernor(c),
        count: c.totalVotes,
      })),
    },
    districts: areas.map(a => ({
      name: stripDistrictPrefix(a.name),
      voting: {
        eligiblePopulation: a.eligible,
        totalVotes: a.totalVotes,
        progress: a.progress,
        result: a.candidates.map(c => ({
          candidateId: getIdForGovernor(c),
          count: c.totalVotes,
        }))
      }
    })),
  }
}

async function fetchCouncilMemberElectionData(): Promise<ElectionData> {
  const election = await getElection(BKK_COUNCIL_MEMBER_ELECTION_ID);
  const candidates = await getCandidates(BKK_COUNCIL_MEMBER_ELECTION_ID);
  const areas = await getElectionAreas(BKK_COUNCIL_MEMBER_ELECTION_ID);
  
  return {
    type: ElectionDataType.Completed,
    total: {
      eligiblePopulation: election.eligible,
      totalVotes: election.totalVotes,
      progress: 100,
      result: candidates.map(c => ({
        candidateId: getIdForCouncilMember(c),
        count: c.totalVotes,
      })),
    },
    districts: areas.map(a => ({
      name: stripDistrictPrefix(a.name),
      voting: {
        eligiblePopulation: a.eligible,
        totalVotes: a.totalVotes,
        progress: 100,
        result: a.candidates.map(c => ({
          candidateId: getIdForCouncilMember(c),
          count: c.totalVotes,
        }))
      }
    })),
  };
}

function stripDistrictPrefix(districtName: string): string {
  return districtName.startsWith('เขต') ? districtName.split('เขต')[1] : districtName;
}