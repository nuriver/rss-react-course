import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/tests/setup.ts',
    coverage: {
      exclude: [
        'src/main.tsx',
        '.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
      ],
    },
  },
});
