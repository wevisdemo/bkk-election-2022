import React, { FunctionComponent, useContext, useMemo } from 'react';
import RatioList from './ratioListByDistrict/RatioList';
import { Visualization } from '../models/visualization';
import { presetContext } from '../contexts/preset';
import VisualizationToggle from './VisualizationToggle';
import DistrictMap from './district-map/district-map-canvas';

interface DistrictVisualizationProps {
	activeViz: Visualization;
	setActiveViz: (vis: Visualization) => void;
	className?: string;
}

const DistrictVisualization: FunctionComponent<DistrictVisualizationProps> = ({
	activeViz,
	setActiveViz,
	className = ''
}) => {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	return (
		<div
			className={`flex flex-col md:flex-row w-full h-full gap-4 md:gap-8 overflow-hidden ${className}`}
		>
			<div className="flex flex-1 h-full w-full flex-col overflow-y-auto">
				<h2 className="typo-h4 mb-2 md:mb-4">คะแนนรายเขต</h2>
				<div className="flex flex-auto h-full overflow-y-auto">
					{activeViz === Visualization.LIST_RATIO ? (
						<RatioList />
					) : (
						<DistrictMap
							styles={{ minWidth: '1012px', height: '900px' }}
							type={activeViz}
							options={{ autoSize: true, debug: true }}
						/>
					)}
				</div>
			</div>
			<div className="flex justify-center items-center">
				<VisualizationToggle value={activeViz} onChange={setActiveViz} />
			</div>
		</div>
	);
};

export default DistrictVisualization;
