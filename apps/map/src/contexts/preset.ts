import { createContext } from 'react';
import { CandidateMap } from '../models/candidate';
import { ElectionData } from '../models/election';

export interface Preset {
	shortname: string;
	fullname: string;
	subtitle?: string;
	electionData: ElectionData;
	candidateMap: CandidateMap;
}

export const presetContext = createContext<Preset | null>(null);
