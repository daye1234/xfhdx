import { baseUrl } from './index';
export const editEmail =  `${baseUrl}/api/user/change_email`; //修改邮箱
export const editPassword=  `${baseUrl}/api/user/change_password`; //修改密码
export const resetPassword=  `${baseUrl}/api_noauth/user/reset_password`; //重置密码

export const editPhone=  `${baseUrl}/api/user/change_phone`;//修改手机
export const saveInfo=  `${baseUrl}/api/user/change_base_info`; //保存设置
