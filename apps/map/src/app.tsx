import { loadUIComponents } from 'ui';

export function App() {
	loadUIComponents();

	return (
		<>
			<ui-navbar></ui-navbar>
			<p class="typo-h1">Hello Vite + Preact!</p>
			<p>
				<a
					class="text-ultramarine"
					href="https://preactjs.com/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn Preact
				</a>
			</p>
		</>
	);
}
