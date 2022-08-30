import dotenv from 'dotenv';
import { writeFile } from 'fs/promises';
import { program, Argument } from 'commander';
import { live } from './live';
import { fetchCandidates, fetchElectionData } from './ers';
import { ElectionDataFetcherType } from './fetcher';
import { CandidateMap } from '../src/models/candidate';
import { ElectionData } from '../src/models/election';
import { fillCouncilMemberColor, fillGovernorColorAndImage } from './candidate-info-filler';

dotenv.config();

program
  .option('-d', 'Live mode, fetch with cron and generate output files into ./output', true)
  .action(() => {
    live();
  });

program
  .command('generate')
  .description('One-time generate specific file')
  .addArgument(new Argument('<filetype>', 'type of file').choices(['candidates', 'election-data']))
  .addArgument(new Argument('<electiontype>', 'type of election').choices(['governor', 'council-member', 'ect-governor', 'ect-council-member']))
  .option('--live', 'Generate from live APIs', false)
  .option('-o', 'Output path', 'result.json')
  .action(async (fileType, electionType, options) => {
    let type = ElectionDataFetcherType.Governor;
    if (electionType === 'council-member') {
      if (options.live) {
        type = ElectionDataFetcherType.LiveCouncilMember;
      } else {
        type = ElectionDataFetcherType.CouncilMember;
      }
    } else if (electionType === 'governor') {
      if (options.live) {
        type = ElectionDataFetcherType.LiveGovernor;
      } else {
        type = ElectionDataFetcherType.Governor;
      }
    } else if (electionType === 'ect-governor') {
      type = ElectionDataFetcherType.LiveECTGovernor;
    } else if (electionType === 'ect-council-member') {
      type = ElectionDataFetcherType.LiveECTCouncilMember;
    }

    let data: CandidateMap | ElectionData;
    if (fileType === 'candidates') {
      data = await fetchCandidates(type);
      if (type === ElectionDataFetcherType.Governor) {
        fillGovernorColorAndImage(data);
      } else if (type === ElectionDataFetcherType.CouncilMember) {
        fillCouncilMemberColor(data);
      }
    } else {
      data = await fetchElectionData(type);
      const now = new Date().toISOString();
      data.lastUpdatedAt = now;
    }

    writeFile(options.o, JSON.stringify(data));
  });

program.parse();