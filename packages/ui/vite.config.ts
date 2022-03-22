import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve, join } from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  publicDir: join(__dirname, '../../'),
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
      name: 'ui',
    },
  },
});
