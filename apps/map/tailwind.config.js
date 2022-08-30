const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	presets: [require('../../packages/tailwind/tailwind.config.js')],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xs: '375px',
			...defaultTheme.screens
		}
	}
};
