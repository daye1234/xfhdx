import detector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUsTrans from './locales/en/common.json';
import enUsHire from './locales/en/hire.json';

import zhCnTrans from './locales/zh/common.json';
import zhCnHire from './locales/zh/hire.json';

const resources = {
  en: {
    common: {
      ...enUsTrans,
    },
    hire: {
      ...enUsHire,
    },
  },
  zh: {
    common: {
      ...zhCnTrans,
    },
    hire: {
      ...zhCnHire,
    },
  },
};
i18n
  // .use(detector) //嗅探当前浏览器语言
  .use(initReactI18next) //init i18next
  .init({
    //引入资源文件
    resources,
    // Set default namespace
    defaultNS: 'common',
    lng: 'zh',
    //选择默认语言，选择内容为上述配置中的key，即en/zh
    fallbackLng: 'zh',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
// i18next.on('languageChanged', function (lng) {
//   moment.locale(lng);
// });
export { i18n };
