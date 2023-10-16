/*
 * @Author: wangcs
 * @Date: 2021-05-07 09:49:45
 * @LastEditTime: 2021-09-27 16:33:10
 * @LastEditors: wangcs
 * @Description: 
 * @FilePath: \supercomputing\scripts\webpack.prod.js
 */
const webpack = require('webpack')
const HappyPack = require('happypack') // 同一时间处理多个任务
const TsconfigPathsPlugin =  require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const ChunkRenamePlugin = require('webpack-chunk-rename-plugin')
const plugins = require('./plugins')

const {resolve,root} = require('./utils')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const optimization = require('./optimization')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
    mode: 'production',
    entry:{
      main:'./src/core/index.tsx'
    },
    output:{
        filename:  '[name].[chunkhash].js',
        path: root('dist/'),
        publicPath: '/dist/',
        chunkFilename: '[name].[chunkhash].js',
    },
    resolve:{
        extensions:['.ts','.tsx','.js','.jsx'],
        symlinks: false,
        modules: [resolve('src'), resolve('src/pages'), 'node_modules'],// 告诉 webpack 解析模块时应该搜索的目录。
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('tsconfig.json')
            })
        ]
    },
    optimization,
    module:{
        rules:[
          {
            test: /\.tsx?$/,
            include: [resolve('src')],
            use: 'happypack/loader?id=tsx',
          },
           ...jsRules,
           ...styleRules,
           ...fileRules
        ] 
    },
    plugins:[
      ...plugins,
      
      new HappyPack({ // 多个线程
        id: 'tsx',
        loaders: ['babel-loader?cacheDirectory'],
      }),
      new ChunkRenamePlugin({
        vendor: '[name].js',
      }),
      new CopyPlugin({
        patterns:[
          {
            from: resolve('src/assets'),
            to: resolve('dist/assets'),
          },
        ]
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      }),
      new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
    ],
})