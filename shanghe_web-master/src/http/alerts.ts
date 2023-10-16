import { baseUrl } from './index';
export const getTabTypes = `${baseUrl}/api_noauth/scholarism_type`; //获取快讯分类
export const getTabTypesPages = `${baseUrl}/api_noauth/scholarism_type/pages`; //分页获取快讯分类

export const getlist = `${baseUrl}/api_noauth/scholarism_information/pages`; //获取快讯列表

export const getdetail = `${baseUrl}/api_noauth/scholarism_information/`; //获取快讯列表

export const getpreOrnext = `${baseUrl}/api_noauth/scholarism_information/next_and_previous`; //获取快讯列表

export const get_KX = `${baseUrl}/api_noauth/scholarism_information/pages?page_index=1&page_size=10&_=1695692020974`; //获取快讯内容

export const get_KX2 = `${baseUrl}/api_noauth/scholarism_information/1296?_=16956920895606`; //二级快讯内容

export const get_seeKX2 = `${baseUrl}/api_noauth/scholarism_information/next_and_previous?id=1296&_=1695692089560`; //二级快讯查询成功
