/*
 * Created: 2020-03-10 10:00:18
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

const webpack = require('webpack')
const TsconfigPathsPlugin =  require('tsconfig-paths-webpack-plugin')
const jsRules = require('./rules/jsRules')
const fileRules = require('./rules/fileRules')
const {resolve} = require('./utils')

module.exports = {
  entry: {
    server: resolve('server/server.ts')
  },
  output: {
    path: resolve('dist/'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  optimization: {
    minimize: false,
  },
  externals: {
    hiredis: 'hiredis',
  }, // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(yml|html|css|svg|properties|ttf|otf|eot|woff2?)(\?.+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  resolve:{
    extensions:['.ts','.tsx','.js','.jsx'],
    plugins: [
        new TsconfigPathsPlugin({
            configFile: resolve('tsconfig.json')
        })
    ]
},
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
