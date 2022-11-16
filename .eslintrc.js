module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: [ '@typescript-eslint/eslint-plugin' ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: [ '.eslintrc.js' ],
  rules: {
    'import/prefer-default-export': 'off',
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-body-style': [ 'error', 'as-needed' ],
    'arrow-parens': [ 'error', 'as-needed', { requireForBlockBody: true } ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ],
    quotes: [ 'error', 'single', { allowTemplateLiterals: true } ],
    'template-tag-spacing': [ 'error', 'always' ],
    semi: 'off',
    'semi-style': [ 'error', 'last' ],
    'no-whitespace-before-property': 'error',
    'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 0 } ],
    'newline-per-chained-call': [ 'error', { ignoreChainWithDepth: 2 } ],
    'linebreak-style': [ 'error', 'unix' ],
    'prefer-template': 'error',
    'prefer-spread': 'error',
    'prefer-rest-params': 'error',
    'prefer-object-spread': 'error',
    'prefer-exponentiation-operator': 'error',
    'no-var': 'error',
    'default-param-last': [ 'error' ],
    'max-depth': [ 'error', 2 ],
    'max-nested-callbacks': [ 'error', 3 ],
    'no-console': 'warn',
    'no-magic-numbers': [ 'error', { ignoreArrayIndexes: true, ignore: ['1n'] } ],
    'no-multi-assign': 'error',
    'no-return-assign': 'off',
    'guard-for-in': 'error',
    'global-require': 0,
    'no-duplicate-imports': 'error',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': [ 'error', { 'devDependencies': true } ],
    'import/no-cycle': [ 2, { 'maxDepth': 1 } ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    '@typescript-eslint/default-param-last': [ 'off' ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/semi': 'off'
  }
}
