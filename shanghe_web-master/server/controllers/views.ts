import { getServerConfig, getFileVersion,isValidReferer, getManifest } from '../libs/utils';

const { client: clientConfig } = getServerConfig();

import { GlobVar } from '../global';

const renderLogin = async (ctx: any) => {
  ctx.cookies.set(
    'referer',
    isValidReferer(ctx.query.referer) ? ctx.query.referer : '/'
  );
  // 判断一下登录是否失效
  // const token = ctx.cookies.get('token') || '';
  const token = ctx.session.userinfo ? ctx.session.userinfo.token : '';
  if (token) {
    ctx.redirect(ctx.query.referer);
  } else {
    await renderIndex(ctx, {});
  }
};

const renderIndex = async (ctx: any, params: any) => {
 
  const manifest = getManifest('main');
  await ctx.render('index', {
    manifest,
    t: ctx.t.bind(ctx),
    isDev: GlobVar.MODE_DEV,
    version: getFileVersion,
    title: clientConfig.title,
    config: JSON.stringify(clientConfig),
    userinfo: JSON.stringify(ctx.session.userinfo || {}),
  });
};

export { renderLogin,renderIndex };
