import globals from "globals"
import pluginJs from "@eslint/js"
import stylistic from '@stylistic/eslint-plugin'
import babelParser from '@babel/eslint-parser'

export default [
  {files: ["**/*.js"], languageOptions: {
    parser: babelParser,
    parserOptions: {
      babelOptions: {
        parserOpts: {
          plugins: ["importAttributes"]
        }
      }
    }
  }},
  {ignores: ["build/**/*", "legacy/**/*", "vendors/**/*"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {plugins: { '@stylistic': stylistic }},
  {rules: {
    'no-unused-vars': ['warn'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/indent': ['error', 2],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/semi': ['error', 'never']
  }}
]
