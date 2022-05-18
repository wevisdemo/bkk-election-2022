import { useState } from 'react';
import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';
import Dashboard from './components/dashboard';
import Footer from './components/Footer';
import { Config, configContext } from './contexts/config';
import { Preset, presetContext } from './contexts/preset';
import { ElectionData } from './models/election';
import { fetchConfig, fetchPreset, getJson } from './utils/fetch';

const DEFAULT_PRESET_INDEX = 0;

const App: FunctionComponent = () => {
	const [config, setConfig] = useState<Config | null>(null);
	const [activePresetIndex, setActivePresetIndex] = useState<number>(DEFAULT_PRESET_INDEX);
	const [preset, setPreset] = useState<Preset | null>(null);
	const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timer | null>(null);

	useEffect(loadUIComponents, []);

	useEffect(() => {
		fetchConfig().then(setConfig);
	}, []);

	useEffect(() => {
		if (!config) return;

		if (refreshInterval) {
			clearInterval(refreshInterval);
			setRefreshInterval(null);
		}

		const presetIndex = config.presetIndexes[activePresetIndex];
		const { refreshIntervalMs, electionDataUrl } = presetIndex;

		fetchPreset(presetIndex).then(setPreset);

		if (refreshIntervalMs) {
			setRefreshInterval(
				setInterval(async () => {
					let electionData = await getJson<ElectionData>(electionDataUrl);
					setPreset(
						preset
							? {
									...preset,
									electionData: electionData
							  }
							: null
					);
				}, refreshIntervalMs)
			);
		}

		return () => {
			if (refreshInterval) clearInterval(refreshInterval);
		};
	}, [config, activePresetIndex]);

	return (
		<div class="absolute inset-0 bg-black">
			<div class="flex flex-col h-full">
				<ui-navbar></ui-navbar>
				<configContext.Provider value={config}>
					{preset && (
						<presetContext.Provider value={preset}>
							<Dashboard
								activePresetIndex={activePresetIndex}
								onPresetChange={setActivePresetIndex}
							/>
							<Footer />
						</presetContext.Provider>
					)}
				</configContext.Provider>
			</div>
		</div>
	);
};

export default App;
