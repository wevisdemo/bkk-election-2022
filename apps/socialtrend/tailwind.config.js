module.exports = {
  presets: [require('../../packages/tailwind/tailwind.config.js')],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {},
      screens: {
        sm: { max: '768px' },
        'md-only': { min: '768px', max: '1023px' },
        md: { max: '1023px' },
        lg: { min: '1024px' },
      },
    },
  },
}
