import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '/tests/setup.ts',
    testTimeout: 20000,
    include: ['**/tests/**'],
    exclude: ['node_modules', 'tests/helpers', 'tests/setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text'],
      reportsDirectory: 'coverage',
      include: ['src/components', 'app/**/*'],
      exclude: [
        'src/main.tsx',
        '.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        'public/**/*',
        '**/tests/**',
        '**/legacy/**',
      ],
    },
  },
});
