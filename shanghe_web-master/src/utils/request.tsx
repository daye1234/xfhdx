/*
 * Created: 2020-03-10 10:31:44
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 针对ajax的统一处理
 */
import axios from 'axios';
import { notification } from 'antd';

const request = axios.create({
  // baseURL: '/ecos',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  // headers: { 'X-Custom-Header': 'foobar' },
});

request.interceptors.request.use(
  (config: any) => {
    config.params = { ...config.params, _: Date.now() }; //ie下接口缓存问题
    return config;
  },
  (err: any) => Promise.reject(err)
);

const err = (error: any) => {
  if (error.response) {
    const data = error.response.data;
    if (error.response.status >= 500) {
      notification.error({
        message: 'Server Error',
        description: data.message,
      });
    }
    if (error.response.status === 404) {
      notification.warn({
        message: 'Not Found',
        description: data.message,
      });
    }
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message,
      });
    }
    if (error.response.status === 301) {
      location.href = '/auth';
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      });
      window.location.href = '/logout';
    }
  }
  return Promise.reject(error);
};

request.interceptors.response.use((res: any) => {
  return res;
}, err);

export default request;
