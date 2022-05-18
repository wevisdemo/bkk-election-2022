import { useState } from 'react';
import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';
import { dequal } from 'dequal';
import Dashboard from './components/dashboard';
import Footer from './components/Footer';
import { Config, configContext } from './contexts/config';
import { Preset, presetContext } from './contexts/preset';
import { ElectionData } from './models/election';
import { fetchConfig, fetchPreset, getJson } from './utils/fetch';

const DEFAULT_PRESET_INDEX = 0;
const CONFIG_REFRESH_INTERVAL = 5000;

const App: FunctionComponent = () => {
	const [config, setConfig] = useState<Config | null>(null);
	const [activePresetIndex, setActivePresetIndex] = useState<number>(DEFAULT_PRESET_INDEX);
	const [preset, setPreset] = useState<Preset | null>(null);
	const [presetRefreshTimer, setPresetRefreshTimer] = useState<NodeJS.Timer | null>(null);

	useEffect(loadUIComponents, []);

	useEffect(() => {
		const loadConfig = () =>
			fetchConfig().then((newConfig) => {
				if (!dequal(config, newConfig)) {
					setConfig(newConfig);
				}
			});

		loadConfig();
		const timer = setInterval(loadConfig, CONFIG_REFRESH_INTERVAL);
		return () => clearInterval(timer);
	}, [config]);

	useEffect(() => {
		if (!config) return;

		if (presetRefreshTimer) {
			clearInterval(presetRefreshTimer);
			setPresetRefreshTimer(null);
		}

		const presetIndex = config.presetIndexes[activePresetIndex];
		const { refreshIntervalMs, electionDataUrl } = presetIndex;

		fetchPreset(presetIndex).then(setPreset);

		if (refreshIntervalMs) {
			setPresetRefreshTimer(
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
			if (presetRefreshTimer) clearInterval(presetRefreshTimer);
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
