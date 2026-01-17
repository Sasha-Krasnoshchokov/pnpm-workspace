import baseConfig from '../../packages/eslint-config/base.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      // Local overrides
    },
  },
];
