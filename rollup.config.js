import {rollupPluginHTML as html} from '@web/rollup-plugin-html'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-import-css'
import postcss from 'rollup-plugin-postcss'
import { copy } from '@web/rollup-plugin-copy'
import alias from '@rollup/plugin-alias'
import versionInjector from 'rollup-plugin-version-injector'
import summary from 'rollup-plugin-summary'
// eslint-disable-next-line no-unused-vars
import { autoReload } from "rollup-plugin-auto-reload"
// eslint-disable-next-line no-unused-vars
import { babel } from '@rollup/plugin-babel'
import esbuild from 'rollup-plugin-esbuild'
import { generateSW } from 'rollup-plugin-workbox'
import del from 'rollup-plugin-delete'
import path from 'node:path'

export default {
  input: 'index.html',
  plugins: [
    html({    
      minify: true,
      publicPath: '/'
    }),
    resolve(),
    css({
      minify: true,
      modules: true // [Workround] rollup-plugin-esbuild (import-attributes) doesn't affect rollup moduleInfo
    }),
    postcss({
      extensions: ['.scss'],
      inject: false,  
      use: {
        sass: {
          // [Deprecated] Consider using postcss-preset-env instead of sass
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }),
    // babel({ babelHelpers: 'bundled' }),
    esbuild({ target: 'es2024' }),
    copy({ patterns: ['assets/**/*'] }),
    alias({
      entries: [
        { find: '@', replacement: path.resolve(import.meta.dirname, 'lib') },
        { find: '~', replacement: path.resolve(import.meta.dirname, 'modules') }
      ]
    }),
    generateSW({ swDest: 'build/sw.js', globDirectory: 'build' }),
    versionInjector(),
    // autoReload(),
    del({ targets: 'build' }),
    summary()
  ],
  output: { dir: 'build', hashCharacters: 'hex', entryFileNames: '[name].[hash].js', chunkFileNames: '[name].[hash].js', assetFileNames: 'assets/[name].[hash][extname]' },
  preserveEntrySignatures: 'strict'
}
