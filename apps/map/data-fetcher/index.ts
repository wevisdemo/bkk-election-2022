import { writeFile, rm, symlink, mkdir } from 'fs/promises';
import { fetchElectionData } from "./ers";
import { ElectionDataFetcherType } from "./fetcher";
import dotenv from 'dotenv';
import { scheduleJob } from 'node-schedule';
import { ElectionData } from '../src/models/election';

dotenv.config();

const cron = '*/30 * * * * *';
const outputPath = './output';
const outputFilename = 'election-data';

scheduleJob(cron, async () => {
  console.info('===================');
  console.info('Attempt to fetch at ', new Date().toISOString());
  try {
    const filename = await writeElectionData();
    console.info(`[SUCCEED] File has been written at ${filename}`);
  } catch (e) {
    console.error('[ERROR] ', e);
  }
});

console.info('data-fetch has been scheduled with ', cron);

async function writeElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.Governor);
  const now = new Date().toISOString();
  data.lastUpdatedAt = now;

  const newFilename = `${outputFilename}-${now}.json`;
  const newFilePath = `${outputPath}/all/${newFilename}`;
  const publicPath = `${outputPath}/${outputFilename}.json`;
  
  if (!isLiveInProgress(data)) {
    console.info(`[NOT LIVE] progress = ${data.total.progress}. Writing directly to ${publicPath}`);
    return writeFile(publicPath, JSON.stringify(data, null, 2));
  }

  console.info(`[LIVE] progress = ${data.total.progress}`);
  await mkdirIfNotExists(`${outputPath}/all`);
  await writeFile(newFilePath, JSON.stringify(data, null, 2));
  await rmIfExists(publicPath);

  try {
    await symlink(`./all/${newFilename}`, publicPath);
  } catch (e) {
    console.error(`[ERROR] Fail to create a symlink at ${publicPath}: ${e}`);
  }
  return newFilePath;
}

function isLiveInProgress(data: ElectionData): boolean {
  if (data.total.progress === undefined) {
    return false;
  }
  return data.total.progress >= 1 && data.total.progress < 95;
}

async function rmIfExists(path: string): Promise<void> {
  try {
    await rm(path);
  } catch (e) {
    console.info(`[INFO] ${path} does not exist`);
  }
}

async function mkdirIfNotExists(path: string): Promise<void> {
  try {
    await mkdir(path);
    console.log(`[INFO] ${path} is created.`);
  } catch (e) {}
}