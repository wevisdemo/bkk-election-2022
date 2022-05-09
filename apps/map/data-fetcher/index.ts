import { writeFile } from 'fs/promises';
import { fetchElectionData } from "./ers";
import { ElectionDataFetcherType } from "./fetcher";
import dotenv from 'dotenv';
import { scheduleJob } from 'node-schedule';

dotenv.config();

const cron = '*/30 * * * * *';
const outputPath = './output/election-data.json';

scheduleJob(cron, async () => {
  console.log('===================');
  console.log('Attempt to fetch at ', new Date().toISOString());
  try {
    await writeElectionData();
    console.log(`Succeed! File has been written at ${outputPath}`);
  } catch (e) {
    console.error('Error: ', e);
  }
});

console.log('data-fetch has been scheduled with ', cron);

async function writeElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.Governor);
  data.lastUpdatedAt = new Date().toISOString();
  return writeFile(outputPath, JSON.stringify(data, null, 2));
}