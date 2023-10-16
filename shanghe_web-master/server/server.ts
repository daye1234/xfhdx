/*
 * Created: 2020-08-04 10:14:03
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 服务端入口文件
 */

import { lt } from 'semver';
// check runtime
if (lt(process.version, '7.6.0')) {
  console.error('Node Version should be greater than 7.6.0');
  process.exit(-1);
}
const Koa = require('koa'); // 不使用import的原因是Koa.prototype.apply会报错

import bodyParser from 'koa-bodyparser';
import { router } from './routers/index';

import { GlobVar } from './global';

import boot from './components/boot';
import locale from './components/locale';
import logging from './components/logging';
import errorProcess from './components/errorProcess';

Koa.prototype.apply = function (module: any, ...rest: any) {
  module(this, ...rest);
  return this;
};

const app = new Koa();

// app.use(bodyParser());

app.keys = ['sd->_<'];
app
  .apply(boot)
  .apply(locale)
  .apply(logging)
  .apply(errorProcess)
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(GlobVar.PORT, () => {
  console.warn(`sk app running at port ${GlobVar.PORT}`);
});
