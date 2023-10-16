/*
 * Created: 2020-08-04 10:14:01
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

import { isArray, get, isFunction } from 'lodash';
import { pathToRegexp } from 'path-to-regexp';
import HttpProxy from 'http-proxy';
import streamify from 'stream-array';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const proxy = (context: string, options: any) => (ctx: any, next: any): any => {
  let eventRegistered = false;

  const regex = pathToRegexp(context);
  const proxy = HttpProxy.createProxyServer();
  if (!regex.test(ctx.path)) return next();
  const { events, ...httpProxyOpts } = options;

  ctx.req.token = ctx.cookies.get('token');

  return new Promise((resolve, reject) => {
    if (events && typeof events === 'object' && !eventRegistered) {
      Object.entries(events).forEach(([event, handler]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        proxy.on(event, handler);
      });
      eventRegistered = true;
    }

    ctx.res.on('close', () => {
      reject(new Error(`Http response closed while proxying ${ctx.req.url}`));
    });

    ctx.res.on('finish', () => {
      resolve({});
    });

    if (
      get(ctx, 'req.headers["content-type"]', '').includes(
        'multipart/form-data'
      )
    ) {
      httpProxyOpts.buffer = isArray(ctx.req.rawBody)
        ? streamify(ctx.req.rawBody)
        : ctx.req.rawBody;
    }
    if (isFunction(httpProxyOpts.optionsHandle)) {
      httpProxyOpts.optionsHandle(httpProxyOpts, ctx.req);
    }
    proxy.web(ctx.req, ctx.res, httpProxyOpts, (e: any) => {
      console.error(e);
      const status = {
        ECONNREFUSED: 503,
        ETIMEOUT: 504,
      }[e.code];
      ctx.status = status || 500;
      resolve(ctx);
    });
  });
};

export default proxy;
