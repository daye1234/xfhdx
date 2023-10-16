/*
 * Created: 2020-08-03 13:38:01
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 
 */
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const WebpackBar = require('webpackbar')
const WebpackAssetsManifest = require('webpack-assets-manifest');
module.exports = [
  new WebpackBar(),
  // new MomentLocalesPlugin({
  //   localesToKeep: ['en', 'zh-CN'],
  // }),
  new WebpackAssetsManifest({
    entrypoints: true,
    writeToDisk: true,
    output: '../dist/manifest.json',
  }),
]