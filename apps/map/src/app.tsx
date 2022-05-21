import { useState } from 'react';
import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';
import { dequal } from 'dequal';
import Dashboard from './components/dashboard';
import Footer from './components/Footer';
import { Config, configContext } from './contexts/config';
import { Preset, presetContext } from './contexts/preset';
import { fetchConfig, fetchPreset } from './utils/fetch';

const DEFAULT_PRESET_INDEX = 0;
const CONFIG_REFRESH_INTERVAL = 60000;

const App: FunctionComponent = () => {
	const [config, setConfig] = useState<Config | null>(null);
	const [activePresetIndex, setActivePresetIndex] = useState<number>(DEFAULT_PRESET_INDEX);
	const [configDefaultPresetIndex, setConfigDefaultPresetIndex] =
		useState<number>(DEFAULT_PRESET_INDEX);
	const [preset, setPreset] = useState<Preset | null>(null);
	const [presetRefreshTimer, setPresetRefreshTimer] = useState<NodeJS.Timer | null>(null);
	const [isNewPresetLoading, setIsNewPresetLoading] = useState(true);

	useEffect(() => {
		loadUIComponents();

		if (import.meta.env.VITE_BUILD_ENV == 'PRODUCTION') {
			const script = document.createElement('script');
			script.async = true;
			script.defer = true;
			script.src = 'https://analytics.punchup.world/js/plausible.js';
			script.setAttribute('data-domain', 'bkkelection2022.wevis.info');
			document.head.appendChild(script);
		}
	}, []);

	useEffect(() => {
		const loadConfig = () =>
			fetchConfig().then((newConfig) => {
				if (!dequal(config, newConfig)) {
					setConfig(newConfig);

					if (newConfig.defaultPresetIndex !== configDefaultPresetIndex) {
						setConfigDefaultPresetIndex(newConfig.defaultPresetIndex);
						setActivePresetIndex(newConfig.defaultPresetIndex);
					}
				}
			});

		loadConfig();
		const timer = setInterval(loadConfig, CONFIG_REFRESH_INTERVAL);
		return () => clearInterval(timer);
	}, [config, configDefaultPresetIndex]);

	useEffect(() => {
		if (!config) return;

		if (presetRefreshTimer) {
			clearInterval(presetRefreshTimer);
			setPresetRefreshTimer(null);
		}

		const presetIndex = config.presetIndexes[activePresetIndex];
		const { refreshIntervalMs } = presetIndex;

		setIsNewPresetLoading(true);

		fetchPreset(presetIndex).then((newPreset) => {
			setPreset(newPreset);
			setIsNewPresetLoading(false);
		});

		if (refreshIntervalMs) {
			setPresetRefreshTimer(
				setInterval(() => fetchPreset(presetIndex).then(setPreset), refreshIntervalMs)
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
					{isNewPresetLoading && (
						<div class="absolute inset-0 top-12 md:top-14 flex items-center justify-center bg-black bg-opacity-50 z-50">
							<div className="scale-50">
								<div className="loader-spinner" />
							</div>
						</div>
					)}
				</configContext.Provider>
			</div>
		</div>
	);
};

export default App;
