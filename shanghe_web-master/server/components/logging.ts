/*
 * Created: 2020-03-08 17:09:51
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

import { GlobVar } from '../global';

import KoaLogger from 'koa-logger';
import moment from 'moment-mini';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const logging = (app: any): void => {
  if (!GlobVar.MODE_DEV) {
    app.use(
      KoaLogger((str: any) => {
        console.warn(str, moment().format('YYYY/MM/DDTHH:mm:ss.SSS'));
      })
    );
  }
};

export default logging;
