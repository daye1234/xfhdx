/*
 * Created: 2020-03-12 11:15:33
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */
import { argv } from 'yargs';
import { getServerConfig } from './libs/utils';
const serverConfig = getServerConfig().server;

const GlobVar = Object.assign(global, {
  ARGV: argv || {},
  MODE_DEV: process.env.NODE_ENV === 'development',
  HOSTNAME: serverConfig.http.hostname || 'localhost',
  PORT: serverConfig.http.port || 8000,
});

export { GlobVar };
