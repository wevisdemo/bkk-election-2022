import { useState } from 'react';
import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';
import Dashboard from './components/dashboard';
import Footer from './components/Footer';
import { Preset, presetContext } from './contexts/preset';
import { electionIndexes } from './data/presets';
import { District, ElectionData, Result } from './models/election';
import { fetchPreset, getJson } from './utils/fetch';

const DEFAULT_PRESET_INDEX = 0;

const App: FunctionComponent = () => {
	const [activePresetIndex, setActivePresetIndex] = useState<number>(DEFAULT_PRESET_INDEX);
	const [preset, setPreset] = useState<Preset | null>(null);
	const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timer | null>(null);

	useEffect(() => {
		loadUIComponents();
	}, []);

	useEffect(() => {
		if (refreshInterval) {
			clearInterval(refreshInterval);
			setRefreshInterval(null);
		}

		const presetIndex = electionIndexes[activePresetIndex];
		const { refreshIntervalMs, electionDataUrl, fullname, shortname, subtitle } = presetIndex;

		console.log('!!!!', presetIndex)

		fetchPreset(presetIndex).then((p: Preset) => {
			p.electionData.districts.forEach(
				(x: District) => x.voting.result.sort(
					(a: Result, b: Result) => b.count - a.count
				)
			)
			setPreset(p);
		});

		if (refreshIntervalMs) {
			setRefreshInterval(
				setInterval(
					async () =>
						setPreset(
							preset
								? {
										fullname,
										subtitle,
										shortname,
										candidateMap: preset.candidateMap,
										electionData: await getJson<ElectionData>(electionDataUrl)
								  }
								: null
						),
					refreshIntervalMs
				)
			);
		}

		return () => {
			if (refreshInterval) clearInterval(refreshInterval);
		};
	}, [activePresetIndex]);

	return (
		<div class="absolute inset-0">
			<div class="flex flex-col h-full">
				<ui-navbar></ui-navbar>
				<presetContext.Provider value={preset}>
					<Dashboard activePresetIndex={activePresetIndex} onPresetChange={setActivePresetIndex} />
					<Footer />
				</presetContext.Provider>
			</div>
		</div>
	);
};

export default App;
