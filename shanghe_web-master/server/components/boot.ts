/*
 * Created: 2020-03-08 14:18:03
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 基础的配置页面
 */

import { GlobVar } from '../global';

import compress from 'koa-compress';
import mount from 'koa-mount';
import render from 'koa-ejs';
import serve from 'koa-static';
// const session = require('koa-session2');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

import { getServerConfig, root } from '../libs/utils';
import { Context } from 'koa';

const serverConfig = getServerConfig().server;

const boot = (
  app: import('koa')<import('koa').DefaultState, import('koa').DefaultContext>
): void => {
  app.use(
    session({
      store: undefined,
        /* !GlobVar.MODE_DEV && serverConfig.mysql
          ? new MysqlStore(serverConfig.mysql)
          : undefined, */
      // store:undefined,
      key: serverConfig.sessionKey,
      maxAge: serverConfig.sessionTimeout,
      signed: true,
    })
  );

  // compress middleware
  app.use(
    compress({
      // filter(contentType: string) {
      //   return /(text|javascript)/i.test(contentType)
      // },
      threshold: 2048,
      br: false,
      gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
      // flush: require('zlib').Z_SYNC_FLUSH,
    })
  );

  // serve static files
  const httpStatic = serverConfig.http.static[process.env.NODE_ENV];

  for (const [k, v] of Object.entries(httpStatic)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.use(mount(k, serve(root(v), { index: false, maxage: 604800000 })));
  }

  if (GlobVar.MODE_DEV) {
    app.use(async (ctx: Context, next: any) => {
      if (
        /(\.hot-update\.)|(\.(png|jpg|ttf|otf|eot|woff2?)(\?.+)?$)|(\.js$)/.test(
          ctx.url
        )
      ) {
        ctx.redirect(`http://localhost:8001${ctx.url}`);
      } else {
        await next();
      }
    });
  }

  render(app, {
    root: root('server/views'),
    cache: !GlobVar.MODE_DEV,
    layout: false,
  });
};

export default boot;
