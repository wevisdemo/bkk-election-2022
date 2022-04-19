import { FunctionComponent, useEffect } from 'react';
import { loadUIComponents } from 'ui';

const App: FunctionComponent = () => {
	useEffect(() => {
		loadUIComponents();
	}, []);

	return (
		<>
			<ui-navbar></ui-navbar>
			<p className="typo-h1">Map</p>
			<p className="text-ultramarine">Write with react, build with preact/compat</p>
		</>
	);
};

export default App;
