module.exports = {
  // prefix: 'tw-',
  important: true,
  presets: [require('../../packages/tailwind/tailwind.config.js')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extends: {
      spacing: {
        752: '47rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
