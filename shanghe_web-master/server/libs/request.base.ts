import fetch from 'node-fetch' 
import {merge,isEmpty,get} from 'lodash' 
import qs from 'qs' 

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/**
 * This is our overly complicated isomorphic "request",
 * methods: get, post, put, patch, delete
 * @param url
 * @param params
 * @param options
 * @param reject
 * @returns {Function}
 */
const request = methods.reduce(
  (prev, method) => ({
    ...prev,
    [method.toLowerCase()]: (...args:any) => buildRequest(method, ...args),
  }),
  {}
)

/**
 * Build and execute remote request
 * @param method
 * @param url
 * @param params
 * @param config
 */
function buildRequest(method:any, url?:any, params?:any, options?:any) {
  let requestURL = url
  const request = merge(
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    },
    options
  )

  const isForm =
    get(options, 'headers[content-type]', '').indexOf(
      'application/x-www-form-urlencoded'
    ) !== -1

  if (method === 'GET') {
    if (!isEmpty(params)) {
      requestURL += `?${qs.stringify(params)}`
    }
  } else if (isForm) {
    request.body = qs.stringify(params)
  } else {
    request.body = JSON.stringify(params)
  }
  return fetch(requestURL, request).then(handleResponse)
}

/**
 * Decide what to do with the response
 * @param response
 * @returns {Promise}
 * @private
 */
function handleResponse(response:any) {
  const redirect = response.redirected
  if (redirect) {
    return Promise.reject()
  }

  if (response.status === 302) {
    return response
  }

  const contentType = response.headers.get('content-type')

  if (contentType && contentType.includes('json')) {
    return response.json().then((res:any) => {
      if (response.status === 401) {
        console.warn('Unauthorized', response, response.ok)
      }

      if (response.ok && response.status >= 200 && response.status < 400) {
        return res
      }

      return Promise.reject({
        code: response.status,
        ...res,
        statusText: response.statusText,
      })
    })
  }

  if (response.status === 200 || response.status === 204) {
    return response.text()
  }

  return response.text().then((text:any) =>
    Promise.reject({
      code: response.status,
      statusText: response.statusText,
      message: text,
    })
  )
}

export default request