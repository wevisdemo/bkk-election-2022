import { createContext } from 'react';
import { CandidateMap } from '../models/candidate';
import { ElectionData } from '../models/election';

interface Preset {
	electionData: ElectionData;
	candidateMap: CandidateMap;
}

export const presetContext = createContext<Preset | null>(null);
