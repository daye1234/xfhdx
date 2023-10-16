/*
 * Created: 2020-08-03 13:39:53
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 
 */

const path = require('path')

// root
exports.root = function(dir){
  return path.resolve(__dirname, `./../${dir}`)
}

// 路径指向根目录
exports.resolve = function(dir){
    return path.join(__dirname,'./../',dir)
}

// 指向dist文件夹
exports.resolveAssetsRootDir = function(dir){
    return path.join(dir)
}