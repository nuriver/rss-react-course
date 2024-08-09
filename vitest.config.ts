import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/tests/setup.ts',
    include: ['**/tests/**'],
    exclude: [
      '**/oldTests/**',
      'node_modules',
      'tests/testData.tsx',
      'tests/customRender.tsx',
      'tests/setup.ts',
    ],
    coverage: {
      provider: 'v8',
      include: ['src/components/**', 'src/utilities/**', 'src/app/**'],
    },
  },
});
