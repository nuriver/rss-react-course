import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/tests/setup.ts',
    exclude: ['**/oldTest/**', 'node_modules'],
    coverage: {
      provider: 'v8',
      include: ['src/components/**', 'src/utilities/**', 'src/pages/index.tsx'],
    },
  },
});
