import baseConfig from '@repo/eslint/base.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      // Local overrides
    },
  },
];
