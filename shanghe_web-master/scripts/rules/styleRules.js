/*
 * Created: 2020-08-03 13:43:50
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 针对scss文件的配置
 */

const {resolve} = require('./../utils')
const autoprefixer = require('autoprefixer') // 自动补全css前缀
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const theme = require('./../../src/theme')
module.exports = [
    {
        test: /\.scss$/,
        include:[resolve('src')],
        use:[
            //'style-loader',
            process.env.NODE_ENV == 'development'?'style-loader':MiniCssExtractPlugin.loader, // 是css单独成文件
            {
                loader: 'cache-loader',
                options:{
                    cacheDirectory: resolve('.cache-loader')
                }
            },
           {
            loader:'typings-for-css-modules-loader',
            options:{
                modules:true,
                namedExport:true,
                camelCase:true,
                sass:true,
                sourcemap: false,
                localIdentName: '[name]__[local]__[hash:base64:5]'
            }
           },
           {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                }),
                require('postcss-remove-google-fonts'),
              ],
            }
          },
           {
               loader: 'sass-loader',
               options:{
                sassOptions:{
                    includePaths:[resolve('src/styles')]
                }
               }
           },
        ]
    },
    {
        test: /\.less$/,
        // 只针对node_modules里面的文件进行编译
        include: [resolve('node_modules')],
        use: [
            //'style-loader',
            process.env.NODE_ENV == 'development'?'style-loader':MiniCssExtractPlugin.loader, // 是css单独成文件
            'css-loader',
            {
                loader: 'less-loader',
                options:{
                    lessOptions:{
                         // 禁止内联js代码，这个功能用于禁止在样式表里面写js代码
                        javascriptEnabled: true,
                         // 根据antd官网进行修改
                        modifyVars: theme
                    }
                }
            }
        ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            minimize: false,
            importLoaders: 2,
          },
        },
      ],
    },
]