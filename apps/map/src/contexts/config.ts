import { createContext } from 'react';
import { PresetIndex } from '../models/election';

export interface Config {
	defaultPresetIndex: number;
	presetIndexes: PresetIndex[];
}

export const configContext = createContext<Config | null>(null);
