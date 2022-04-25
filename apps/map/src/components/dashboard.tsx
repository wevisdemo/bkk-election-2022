import React from 'react';
import { useContext } from 'react';
import { FunctionComponent } from 'react';
import { presetContext } from '../contexts/preset';

const Dashboard: FunctionComponent = () => {
	const preset = useContext(presetContext);

	if (!preset) return <></>;

	return (
		<div className="bg-black text-white flex-1 p-12">
			<h1 className="typo-h2">{preset.fullname}</h1>
			<div>{JSON.stringify(preset.candidateMap)}</div>
			<div>{JSON.stringify(preset.electionData)}</div>
		</div>
	);
};

export default Dashboard;
