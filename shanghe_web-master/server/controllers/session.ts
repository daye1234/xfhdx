/*
 * Created: 2020-08-18 09:42:12
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

import { isEmpty } from 'lodash';
import { login } from '../services/session';
import { isValidReferer, decryptPassword } from '../libs/utils';

const resolveError = (ctx: any, status: number) => {
  ctx.session = null;
  ctx.cookies.set('token', null);
  ctx.cookies.set('user_id', null);
  ctx.status = status;
  ctx.body = {
    code: status,
  };
};
// 登录
const handleLogin = async (ctx: any) => {
  const params = ctx.request.body;

  let referer = ctx.cookies.get('referer');
  referer = referer ? decodeURIComponent(referer) : '';

  const error = {};
  let user = null;

  if (
    isEmpty(params) ||
    !params.username ||
    !params.encrypt ||
    !params.captcha
  ) {
    Object.assign(error, {
      status: 400,
      reason: 'Invalid Login Params',
      message: 'invalid login params',
    });
  }
  if (isEmpty(error)) {
    try {
      params.password = decryptPassword(params.encrypt, 'shangheweb');
      // 判断验证码

      if (params.captcha.toLowerCase() != ctx.session.captcha.toLowerCase()) {
        Object.assign(error, {
          status: 400,
          reason: 'Internal Server Error',
          message: '验证码输入错误',
        });
        ctx.body = error;
        return;
      }
      user = await login(
        {
          username: params.username,
          password: params.password,
        },
        { 'content-type': 'application/json' }
      );
      if (!user) {
        Object.assign(error, {
          status: 400,
          reason: 'Internal Server Error',
          message: '用户名或密码错误',
        });
      }
    } catch (err) {
      ctx.app.emit('error', err);

      switch (err.code) {
        case 401:
          Object.assign(error, {
            status: err.code,
            reason: 'User Not Match',
            message: '用户名或密码错误',
          });
          break;
        case 429:
          Object.assign(error, {
            status: err.code,
            reason: 'Too Many Requests',
            message: 'Too many failed login attempts, please wait!',
          });
          break;
        case 502:
          Object.assign(error, {
            status: err.code,
            reason: 'Internal Server Error',
            message: '服务器错误，请稍后重试',
          });
          break;
        case 'ETIMEDOUT':
          Object.assign(error, {
            status: 400,
            reason: 'Internal Server Error',
            message: 'Unable to access the api server',
          });
          break;
        default:
          Object.assign(error, {
            status: err.code,
            reason: err.statusText,
            message: err.message,
          });
      }
    }
  }

  if (!isEmpty(error) || !user) {
    ctx.body = error;
    return;
  }

  ctx.session.userinfo = user || {};
  ctx.cookies.set('token', user.token);
  ctx.cookies.set('expires', user.expires);
  ctx.cookies.set('referer', null);
  ctx.body = {
    status: 200,
    reason: 'success',
    message: '登录成功',
    referer: isValidReferer(referer) ? referer : '/',
  };
};
const handleUpdateUser = async (ctx: any) => {
  const params = ctx.request.body;
  ctx.session.userinfo = params;

  ctx.body = {
    status: 200,
    reason: 'success',
    message: '保存用户信息成功',
  };
};
const handleLogout = async (ctx: any) => {
  ctx.cookies.set('token', null);
  ctx.cookies.set('expires', null);
  ctx.session.userinfo = {};

  // await send_gateway_request({
  //   method: 'GET',
  //   url: '/oauth/logout',
  // })
  const referer = isValidReferer(ctx.query.referer) ? ctx.query.referer : '/';
  ctx.redirect(`/login?referer=${referer}`);
};

export { handleLogin, handleLogout, handleUpdateUser };
