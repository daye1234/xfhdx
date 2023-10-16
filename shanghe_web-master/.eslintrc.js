/*
 * Created: 2020-03-08 18:50:07
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier/react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'jsx-control-statements',
    'prettier',
    'react-hooks'
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    'jsx-control-statements/jsx-control-statements': true,
  },
  globals: {
    $: true,
  },
  rules: {
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    quotes: [1, 'single'],
    'prettier/prettier': 1,
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
    eqeqeq: ['warn', 'always'],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: true
      },
    ],
    // '@typescript-eslint/indent': [
    //   'error',
    //   2,
    //   {
    //     VariableDeclarator: 2,
    //     SwitchCase: 1
    //   },
    // ],
    // '@typescript-eslint/rule-name': 'error',
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-triple-slash-reference': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'always',
        types: 'never',
        lib: 'never'
      },
    ],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    // React相关校验规则
    // 'react/jsx-indent': [2, 2],
    'react/jsx-no-undef': [2, {
      allowGlobals: true
    }],
    'jsx-control-statements/jsx-use-if-tag': 0,
    'react/prop-types': 0, //防止在React组件定义中丢失props验证
    '@typescript-eslint/camelcase': 0,
    'react/no-string-refs': 0,
    'react/jsx-no-target-blank': 0,
  },
}