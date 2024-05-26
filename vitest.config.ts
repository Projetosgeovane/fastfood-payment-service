import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
      include: [
        'src/modules/**/domain/application/**/*.ts',
        'src/modules/**/domain/enterprise/**/*.ts',
      ],

      reportsDirectory: './coverage/unit',
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
