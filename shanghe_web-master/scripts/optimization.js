/*
 * @Author: wangcs
 * @Date: 2021-03-29 11:36:07
 * @LastEditTime: 2021-09-28 09:32:12
 * @LastEditors: wangcs
 * @Description: 
 * @FilePath: \supercomputing\scripts\optimization.js
 */

//  const TerserPlugin = require('terser-webpack-plugin')
//  const UptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    flagIncludedChunks: true,
    occurrenceOrder: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    // 缓存webpack固定生成的代码块，该代码块通常不i按，用于维系各个模块之间的关系
    // runtimeChunk: {
    //     name: 'mainfest'
    // },
    minimize: true,
    // 指定进行分块的代码和分块后的文件
    splitChunks: {
      chunks: 'all',
    //   minSize: 30000, // 模块最少大于30KB才拆分
    //   maxSize: 0,  // 模块大小无上限，只要大于30KB都拆分
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
        cacheGroups: {
            // default: false,
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                // name: 'vendor',
                priority: 10,
            },
            common: {
                name:'common',
                minChunks: 2,
                minSize: 30000,
            },
        }
    },
}