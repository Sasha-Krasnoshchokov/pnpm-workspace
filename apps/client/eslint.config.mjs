import baseConfig from '@repo/eslint/base.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Local overrides
    },
  },
];
