/*
 * Created: 2020-08-03 10:38:30
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: webpack dev config
 */
const webpack = require('webpack')
const TsconfigPathsPlugin =  require('tsconfig-paths-webpack-plugin')
const WebpackNotifier = require('webpack-notifier')
const plugins = require('./plugins')
const {resolve} = require('./utils')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const optimization = require('./optimization')

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    entry:{
        main:resolve('src/core/index.tsx')
    },
    output:{
        path:resolve('build'),
        filename: '[name].js',
        publicPath: '/',
        pathinfo: false,
    },
    resolve:{
        extensions:['.ts','.tsx','.js','.jsx'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('tsconfig.json')
            })
        ]
    },
    plugins:[
      ...plugins,
      new WebpackNotifier({
        title: `sd`,
        alwaysNotify: true,
        excludeWarnings: true,
      }),
      new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      // new webpack.NamedModulesPlugin(),
      new webpack.WatchIgnorePlugin([
        resolve('server'),
        resolve('build'),
        resolve('dist'),
      ]),
    ],
    optimization,
    module:{
        rules:[
           ...jsRules,
           ...styleRules,
           ...fileRules
        ] 
    },
    devServer: {
      publicPath: '/',
      compress: true,
      noInfo: false,
      quiet: false,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      host: '0.0.0.0',
      port: 8001,
    },
}