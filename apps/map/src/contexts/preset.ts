import { createContext } from 'react';
import { CandidateMap } from '../models/candidate';
import { ElectionData, ElectionIndex } from '../models/election';

export interface Preset
	extends Omit<ElectionIndex, 'electionDataUrl' | 'candidateDataUrl' | 'refreshIntervalMs'> {
	electionData: ElectionData;
	candidateMap: CandidateMap;
}

export const presetContext = createContext<Preset | null>(null);
