import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import htmlPlugin from 'vite-plugin-html-config';

process.env.VITE_BUILD_ENV = process.env.BUILD_ENV;

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
			'react/jsx-runtime': 'preact/jsx-runtime'
		}
	},
	plugins: [
		preact(),
		/* @ts-ignore */
		htmlPlugin({
			favicon: '/static/favicon.png',
			links: [
				{
					rel: 'stylesheet',
					href: '/static/fonts/typography.css'
				},
				{
					rel: 'stylesheet',
					href: '/ui/style.css'
				}
			]
		})
	],
	base: '/map/',
	server: {
		port: 3004
	}
});
