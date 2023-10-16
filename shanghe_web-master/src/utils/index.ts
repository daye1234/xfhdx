import React from 'react';
import { isUndefined, trimStart } from 'lodash';
import { MobXProviderContext } from 'mobx-react';
import moment from 'moment-mini';

// 请求过滤参数处理
export const getFilterString = (
  params: { [x: string]: string },
  fuzzyMatchKeys = ['name', 'app', 'label', 'annotation']
) =>
  Object.keys(params)
    .filter((key) => !isUndefined(params[key]) && params[key] !== '')
    .map((key) =>
      fuzzyMatchKeys.includes(key) && !/\|/g.test(params[key])
        ? `${key}~${trimStart(params[key])}`
        : `${key}=${trimStart(params[key])}`
    )
    .join(',');

export const getFormatTime = (time: string | number, format?: string) => {
  format = format || 'YYYY.MM.DD';
  // 由于后端时间是0区时间
  // const s = '2013-01-01T00:00:00';
  // return moment(time).utcOffset(s).format(format);
  return moment(time).format(format);
};
// 密码加密
export const encrypt = (salt: string, str: string) => {
  return mix(salt, window.btoa(str));
};
const mix = (salt: string, str: string) => {
  if (str.length > salt.length) {
    salt += str.slice(0, str.length - salt.length);
  }

  const ret = [];
  const prefix = [];
  for (let i = 0, len = salt.length; i < len; i++) {
    const tomix = str.length > i ? str.charCodeAt(i) : 64;
    const sum = salt.charCodeAt(i) + tomix;
    prefix.push(sum % 2 === 0 ? '0' : '1');
    ret.push(String.fromCharCode(Math.floor(sum / 2)));
  }

  return `${window.btoa(prefix.join(''))}@${ret.join('')}`;
};
export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
};

export const useStores = (name: string) => {
  return React.useContext(MobXProviderContext)[name];
};
