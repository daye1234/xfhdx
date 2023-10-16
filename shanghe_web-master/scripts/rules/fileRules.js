/*
 * Created: 2020-08-03 15:24:59
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 针对文件的规则
 */

const {resolve} = require('./../utils.js')

module.exports = [
    {
        test: /\.svg$/,
        loader: '@svgr/webpack',
        include: resolve('src')
    },
    {
      test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
      include: resolve('src/assets'),
      use: {
        loader: 'file-loader',
      },
    },
    {
      test: /\.(jpg|jpeg|png|svg)(\?.+)?$/,
      include: resolve('src/assets'),
      use: 'url-loader?limit=100000',
    },
]
