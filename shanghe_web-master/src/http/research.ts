import { baseUrl } from './index';

export const getTabTypes = `${baseUrl}/api_noauth/scientific_type`; //获取科研成果分类
export const getlist = `${baseUrl}/api_noauth/scientific_payoffs/pages`; //获取科研成果列表
export const getdetail = `${baseUrl}/api_noauth/scientific_payoffs/`; //获取成果详情

export const getpreOrnext = `${baseUrl}/api_noauth/scientific_payoffs/next_and_previous`; //获取上下一页
