import { writeFile, mkdir, rm, symlink } from 'fs/promises';
import { scheduleJob } from "node-schedule";
import { ElectionData } from '../src/models/election';
import { fetchElectionData } from "./ers";
import { ElectionDataFetcherType } from "./fetcher";

const cron = '*/15 * * * * *';
const outputPath = './output';
const outputFilename = 'election-data';
const councilOutputFilename = 'election-data-council';

export function live() {
  scheduleJob(cron, async () => {
    console.info('===================');
    console.info('=== Attempt to fetch at ', new Date().toISOString());
    try {
      const filename = await writeElectionData();
      console.info(`('=== [SUCCEED] File has been written at ${filename}`);
    } catch (e) {
      console.error('=== [ERROR] ', e);
    }
  });

  scheduleJob(cron, async () => {
    console.info('>>>>>>>>>>>>>>>>>>>');
    console.info('>>> Council: Attempt to fetch at ', new Date().toISOString());
    try {
      const filename = await writeCouncilMemberElectionData();
      console.info(`>>> Council: [SUCCEED] File has been written at ${filename}`);
    } catch (e) {
      console.error('>>> Council: [ERROR] ', e);
    }
  });

  console.info('data-fetch has been scheduled with ', cron);
}

async function writeCouncilMemberElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.LiveCouncilMember);
  const now = new Date().toISOString();
  data.lastUpdatedAt = now;

  const publicPath = `${outputPath}/${councilOutputFilename}.json`;
  await writeFile(publicPath, JSON.stringify(data));
  return publicPath;
}

async function writeElectionData() {
  const data = await fetchElectionData(ElectionDataFetcherType.LiveGovernor);
  const now = new Date().toISOString();
  data.lastUpdatedAt = now;

  const newFilename = `${outputFilename}-${now}.json`;
  const newFilePath = `${outputPath}/all/${newFilename}`;
  const publicPath = `${outputPath}/${outputFilename}.json`;

  if (!isLiveInProgress(data)) {
    console.info(`[NOT LIVE] progress = ${data.total.progress}. Writing directly to ${publicPath}`);
    await rmIfExists(publicPath);
    await writeFile(publicPath, JSON.stringify(data));
    return publicPath;
  }

  console.info(`[LIVE] progress = ${data.total.progress}`);
  await mkdirIfNotExists(`${outputPath}/all`);
  await writeFile(newFilePath, JSON.stringify(data));
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
  } catch (e) { }
}