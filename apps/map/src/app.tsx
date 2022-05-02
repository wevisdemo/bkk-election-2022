import { useMemo, useState } from 'react';
import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';
import Dashboard from './components/dashboard';
import Footer from './components/Footer';
import { Preset, presetContext } from './contexts/preset';
import { electionIndexes } from './data/presets';
import { fetchPreset } from './utils/fetch';

const DEFAULT_PRESET_INDEX = 3;

const App: FunctionComponent = () => {
	const [activePresetIndex, setActivePresetIndex] = useState<number>(DEFAULT_PRESET_INDEX);
	const [preset, setPreset] = useState<Preset | null>(null);

	useEffect(() => {
		loadUIComponents();
	}, []);

	useMemo(() => {
		fetchPreset(electionIndexes[activePresetIndex]).then(setPreset);
	}, [activePresetIndex]);

	return (
		<div class="flex flex-col h-screen">
			<ui-navbar></ui-navbar>
			<presetContext.Provider value={preset}>
				<Dashboard activePresetIndex={activePresetIndex} onPresetChange={setActivePresetIndex} />
				<Footer />
			</presetContext.Provider>
		</div>
	);
};

export default App;
