/*
 * Created: 2020-03-08 14:38:24
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 整合所有路由
 *
 *
 */

import { GlobVar } from '../global';
import { Context } from 'koa';
import Router from 'koa-router';
import proxy from '../middlewares/proxy';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';

import { handleLogin,handleLogout ,handleUpdateUser} from './../controllers/session';

const send = require('koa-send');
const router = new Router();
import { getFileVersion, getServerConfig, getManifest } from '../libs/utils';
import { renderLogin, renderIndex } from './../controllers/views';

import { EcosProxy } from '../proxy';

const { client: clientConfig, server: serverConfig } = getServerConfig();
const svgCaptcha = require('svg-captcha');

const parseBody = convert(
  bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
  })
);
router
  // ecos api
  .use(proxy('/ecos/(.*)', EcosProxy))

  // // session
  // .get('/validate_login', validateLogin)
  .post('/login', parseBody, handleLogin)
  .get('/login', renderLogin)
  .post('/updateuser', parseBody,handleUpdateUser)
  .get('/logout', handleLogout)
  .get('/captcha', (ctx: any) => {
    const cap = svgCaptcha.create({
      size: 4, // 验证码长度
      width: 100,
      height: 34,
      fontSize: 36,
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      color: false, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      // background: '#f0f0f0', // 验证码图片背景颜色
    });
    const img = cap.data; // 验证码
    const text = cap.text.toLowerCase(); // 验证码字符，忽略大小写
    ctx.session.captcha = text;
    ctx.type = 'svg';
    ctx.body = img;
  })
  // page entry
  .all('*', renderIndex);

export { router };
