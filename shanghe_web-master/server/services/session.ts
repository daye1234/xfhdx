import { send_gateway_request } from '../libs/request'
const login = async (data:any, headers:any) => {
    const resp = await send_gateway_request({
      method: 'POST',
      url: '/ecos/api_noauth/user/login',
      headers: {
        ...headers,
        // 'content-type': 'application/x-www-form-urlencoded',
      },
      params: {
        ...data,
      },
    })
    // const resp = {
    //   token: '1234'
    // }
    return handleLoginResp(resp)
  }
  const handleLoginResp = (resp:any) => {
    if (!resp.token) {
      throw new Error(resp.message)
    }
  
    // const { token,username,user_id,updated_at,expires,created_at } = resp || {}
  
    return resp
  }
  export { login }