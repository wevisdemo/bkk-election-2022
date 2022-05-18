import { createContext } from 'react';
import { CandidateMap } from '../models/candidate';
import { ElectionData, PresetIndex } from '../models/election';

export interface Preset
	extends Omit<PresetIndex, 'electionDataUrl' | 'candidateDataUrl' | 'refreshIntervalMs'> {
	electionData: ElectionData;
	candidateMap: CandidateMap;
}

export const presetContext = createContext<Preset | null>(null);
