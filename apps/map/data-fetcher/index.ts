import { writeFile } from 'fs/promises';
import { fillGovernorColorAndImage } from './candidate-info-filler';
import { fetchCandidates, fetchElectionData } from "./ers";
import { ElectionDataFetcherType } from "./fetcher";
import dotenv from 'dotenv';

dotenv.config();

async function writeCandidates() {
  const candidates = await fetchCandidates(ElectionDataFetcherType.Governor);
  fillGovernorColorAndImage(candidates);
  return writeFile('./data/candidates.json', JSON.stringify(candidates, null, 2));
}

async function writeElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.Governor);
  return writeFile('./data/election-data.json', JSON.stringify(data, null, 2));
}

writeCandidates();
writeElectionData();
