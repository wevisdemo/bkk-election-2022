import { writeFile } from 'fs/promises';
import { fetchCandidates, fetchElectionData } from "./ers";
import { ElectionDataFetcherType } from "./fetcher";

async function writeCandidates() {
  const candidates = await fetchCandidates(ElectionDataFetcherType.Governor);
  return writeFile('./data/candidates.json', JSON.stringify(candidates, null, 2));
}

async function writeElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.Governor);
  return writeFile('./data/election-data.json', JSON.stringify(data, null, 2));
}

writeCandidates();
writeElectionData();
