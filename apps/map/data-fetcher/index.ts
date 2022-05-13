import { writeFile, rm, symlink } from 'fs/promises';
import { fetchElectionData } from "./ers";
import { ElectionDataFetcherType } from "./fetcher";
import dotenv from 'dotenv';
import { scheduleJob } from 'node-schedule';

dotenv.config();

const cron = '*/30 * * * * *';
const outputPath = './output';
const outputFilename = 'election-data';

scheduleJob(cron, async () => {
  console.log('===================');
  console.log('Attempt to fetch at ', new Date().toISOString());
  try {
    const filename = await writeElectionData();
    console.log(`Succeed! File has been written at ${filename}`);
  } catch (e) {
    console.error('Error: ', e);
  }
});

console.log('data-fetch has been scheduled with ', cron);

async function writeElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.Governor);
  const now = new Date().toISOString();
  data.lastUpdatedAt = now;

  const newFilename = `${outputFilename}-${now}.json`;
  const newFilePath = `${outputPath}/${newFilename}`;
  const publicPath = `${outputPath}/${outputFilename}.json`;

  await writeFile(newFilePath, JSON.stringify(data, null, 2));
  await rmIfExists(publicPath);

  try {
    await symlink(`./${newFilename}`, publicPath);
  } catch (e) {
    console.log(`Fail to create a symlink at ${publicPath}: ${e}`);
  }
  return newFilePath;
}

async function rmIfExists(path: string): Promise<void> {
  try {
    await rm(path);
  } catch (e) {
    console.log(`${path} does not exist`);
  }
}
