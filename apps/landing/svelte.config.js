import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

process.env.VITE_BUILD_ENV = process.env.BUILD_ENV;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		prerender: {
			default: true,
			onError: 'continue'
		},
		adapter: adapter()
	}
};

export default config;
