/*
 * Created: 2020-08-03 13:43:40
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 针对ts文件的配置
 */

const {resolve} = require('./../utils')
module.exports = [
    {
      test:/\.(j|t)sx?$/,
      use:[
          { 
            loader: 'cache-loader',
            options:{
              cacheDirectory: resolve('.cache-loader')
            } 
          },
          {
              loader:'babel-loader',
              options:{
                  babelrc: false,
                  presets: [[
                    '@babel/preset-env',
                    {
                      corejs: '2',
                      useBuiltIns: 'entry',
                    },
                  ],
                  '@babel/preset-typescript',
                  '@babel/preset-react',
                  'mobx'
                ],
                  plugins: [
                    ['import', {libraryName: 'antd', libaryDirectory: 'lib', style: true}],
                    ['@babel/plugin-proposal-decorators', {legacy: true}],
                    ['@babel/plugin-proposal-class-properties', {loose: true}],
                    '@babel/plugin-syntax-dynamic-import'
                  ]
              }
          }
      ],
      exclude: /node_modules/
  },
]