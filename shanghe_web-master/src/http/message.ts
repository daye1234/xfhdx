import { baseUrl } from './index';
export const getMessageTypes = `${baseUrl}/api_noauth/message_type`; //获取留言分类

export const saveMessage = `${baseUrl}/api/message`; //保存留言

export const getMyMessage = `${baseUrl}/api/message/my_messages`; //我得留言

export const getSelMessage = `${baseUrl}/api_noauth/message/pages`; //留言选登

export const getReplys = `${baseUrl}/api_noauth/message_comment/replys`; //查看留言回复

export const getMessageDetail = `${baseUrl}/api_noauth/message/`; //查看留言详细

export const saveReply = `${baseUrl}/api/message_comment`; //回复留言

export const resetMessage = `${baseUrl}/api/message/see_gfreply/`; //重置是否有新留言
export const get_introduce = `${baseUrl}/api_noauth/center_intro`; //中心介绍
export const get_contact = `${baseUrl}/api_noauth/contact_info`; //联系我们

export const get_leader = `${baseUrl}/api_noauth/team_info/pages?page_index=1&page_size=5&fllx=01&_=1694779672688`; //中心领导
export const get_team = `${baseUrl}/api_noauth/team_info/pages`; //科研团队
export const get_expert = `${baseUrl}/api_noauth/team_info/pages?page_index=1&page_size=5&fllx=02&_=1694776900087`; //特聘专家