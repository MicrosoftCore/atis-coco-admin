/**
 * @description intercept http request & handle abnormal ...
 * @borrows （e.g. https://github.com/axios/axios）
 * @see （e.g. https://github.com/axios/axios）
 */
import { Message } from 'element-ui'
import Cookies from 'js-cookie'
import router from '@/router'

const requestInterceptor = config => {
  let {
    headers,
    method
  } = config

  Object.assign(headers, {
    Authorization: `Bearer ${Cookies.get('access_token')}`
  })

  if (method.toLocaleUpperCase() === 'GET') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}

const responseInterceptor = response => {
  const {
    data,
    status
  } = response

  /**
   * @description Standard DATA Structure.
   * @memberof 'Data','IsSuccess','ResponseCode','ResponseDes'.
   */
  const __standard_data_structure__ = 'Data' && 'IsSuccess' && 'ResponseCode' && 'ResponseDes'
  /**
   * @description Response code.
   */
  const __response_to_success__ = status === 200

  if (
      data.hasOwnProperty(__standard_data_structure__) &&
      __response_to_success__
    ) {
    // This is the standard data structure.
    let {
      Data,
      IsSuccess,
      ResponseCode,
      ResponseDes
    } = data
    if (IsSuccess) {
      return Data
    } else {
      switch (ResponseCode) {
        case 500:
          Message.error({
            message: `${ResponseDes}`
          })
          break
        default:
          Message.error({
            message: `${ResponseDes}`
          })
          return Promise.reject(ResponseDes)
      }
    }
  } else {
    return data
  }
}

const requestException = error => Promise.reject(error)

const reponseException = error => {
  if (error && error.response) {
    // console.log(error.response)
    let {
      data,
      status
    } = error.response
    switch (status) {
      case 401:
        router.push({
          name: 'login'
        })
        Promise.reject(new Error('authentication failed'))
        break
      default:
        return data
    }
  }
  Promise.reject(error)
}

export {
  requestInterceptor,
  responseInterceptor,
  requestException,
  reponseException
}
