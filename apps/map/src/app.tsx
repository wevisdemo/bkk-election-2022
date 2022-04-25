import { useState } from 'react';
import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';
import Dashboard from './components/dashboard';
import { Preset, presetContext } from './contexts/preset';
import { electionPresets } from './data/presets';
import { fetchPreset } from './utils/fetch';

const App: FunctionComponent = () => {
	const [preset, setPreset] = useState<Preset | null>(null);

	useEffect(() => {
		loadUIComponents();

		fetchPreset(electionPresets[0]).then(setPreset);
	}, [loadUIComponents, electionPresets, setPreset]);

	return (
		<div class="flex flex-col min-h-screen">
			<ui-navbar></ui-navbar>
			<presetContext.Provider value={preset}>
				<Dashboard />
			</presetContext.Provider>
		</div>
	);
};

export default App;
