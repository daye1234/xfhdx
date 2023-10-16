/*
 * Created: 2020-03-08 17:15:04
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 错误处理
 */

import isString from 'lodash/isString';

const errorProcess = (app: {
  use: (
    arg0: (
      ctx: {
        status: any;
        body: any;
        app: { emit: (arg0: string, arg1: any) => void };
      },
      next: () => any
    ) => Promise<void>
  ) => void;
  on: (arg0: string, arg1: (err: any) => void) => void;
}): void => {
  app.use(
    async (
      ctx: {
        status: any;
        body: any;
        app: { emit: (arg0: string, arg1: any) => void };
      },
      next: () => any
    ) => {
      try {
        await next();
      } catch (err) {
        let error = err;
        console.warn(error);

        if (isString(error)) {
          error = {
            code: 500,
            status: 'Failure',
            reason: err,
          };
        }

        if (error.code < 100) {
          error.code = 500;
        }

        ctx.status = typeof error.code === 'number' ? error.code : 500;
        ctx.body = error;
        ctx.app.emit('error', error);
      }
    }
  );

  app.on('error', (err: any) => {
    /* centralized error handling:
     *   console.error error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
     */
    console.error(err);
  });

  // catch uncaught error
  process.on('uncaughtException', (err) => {
    console.error(err);
    /* eslint-disable no-console */
    console.log('NOT exit...');
  });
};

export default errorProcess;
