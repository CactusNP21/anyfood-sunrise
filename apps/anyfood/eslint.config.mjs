import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import boundaries from 'eslint-plugin-boundaries';
import typescriptParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  ...baseConfig,
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      // 'boundaries/elements': [
      //   { type: 'core', pattern: 'core/*' },
      //   { type: 'auth', pattern: 'auth/**/*.ts', mode: 'file' },
      //   { type: 'home', pattern: 'home/**/*.ts', mode: 'file' },
      // ],
    },
    rules: {
      // 'boundaries/element-types': [
      //   'error',
      //   {
      //     default: 'disallow',
      //     rules: [{ from: 'core', allow: ['home'] }],
      //   },
      // ],
    },
  },
  // {
  //   files: ['**/*.ts'],
  //   rules: {
  //     '@angular-eslint/directive-selector': [
  //       'error',
  //       {
  //         type: 'attribute',
  //         prefix: 'app',
  //         style: 'camelCase',
  //       },
  //     ],
  //     '@angular-eslint/component-selector': [
  //       'error',
  //       {
  //         type: 'element',
  //         prefix: 'app',
  //         style: 'kebab-case',
  //       },
  //     ],
  //   },
  // },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
