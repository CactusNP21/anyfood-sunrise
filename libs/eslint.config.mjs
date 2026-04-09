import nx from '@nx/eslint-plugin';
import baseConfig from '../eslint.config.mjs';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'lib',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'anyfood',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-input-rename': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
