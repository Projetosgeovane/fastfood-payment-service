import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
      include: ['**/src/modules/**/infra/**'],
      reportsDirectory: './coverage/e2e',
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
