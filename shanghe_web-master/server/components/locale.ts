/*
 * Created: 2020-03-08 17:05:01
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 翻译
 */

const locales = require('koa-locales')

import { root } from '../libs/utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const locale = (app: any): void => {
  locales(app, {
    functionName: 't',
    defaultLocale: 'zh',
    queryField: 'lang',
    cookieField: 'lang',
    localeAlias: { 'zh-CN': 'zh', 'en-UK': 'en', 'en-US': 'en' },
    dirs: [root('server/locales')],
  })
}

export default locale
