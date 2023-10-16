/*
 * Created: 2020-03-25 13:43:45
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */
const http = require('http');
import { getServerConfig } from './libs/utils';
const send = require('koa-send');
const { server: serverConfig } = getServerConfig();

const NEED_OMIT_HEADERS: any = [];
export const EcosProxy = {
  target: serverConfig.gatewayServer.url,
  changeOrigin: true,
  events: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    proxyReq: (proxyReq: any, req: any) => {
      proxyReq.setHeader('Authorization', req.token || '');
      NEED_OMIT_HEADERS.forEach((key: any) => proxyReq.removeHeader(key));
    },
  },
};

