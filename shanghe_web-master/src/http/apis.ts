/*
 * Created: 2020-08-18 09:56:45
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: 接口地址统一存放位置
 */

import { baseUrl } from './index';
// 获取用户信息
export const getUserInfo = (user_id: string) => {
  return `${baseUrl}/qcec/v1/user/${user_id}`;
};
// 退 出
export const logout = '/logout';
// 登 录
export const login = '/login';
// 发送邮箱验证码
export const send_email =`${baseUrl}/api_noauth/user/send_email`;
// 注册
export const register =`${baseUrl}/api_noauth/user/register`;

// 友情链接
export const getlinks = () => {
  return `${baseUrl}/api_noauth/links`;
};

// 获取一级分类
export const parent_type = () => {
  return `${baseUrl}/api_noauth/content_type/parent`;
};
// 获取二级分类
export const getTypeUrl = () => {
  return `${baseUrl}/api_noauth/content_type`;
};
// 获取列表
export const getQuestion = () => {
  return `${baseUrl}/api_noauth/content/pages`;
};
