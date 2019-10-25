import axios from 'axios'
import requestConfig from './common/requestConfig'
import deploy from './common/deploy'
import * as interceptors from './common/interceptors'
import urls from './common/handling'

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const httpclient = axios.create({
  ...requestConfig,
  ...deploy
})

// Add a request interceptor
httpclient.interceptors.request.use(
  interceptors.requestInterceptor,
  interceptors.requestException
)

// Add a response interceptor
httpclient.interceptors.response.use(
  interceptors.responseInterceptor,
  interceptors.reponseException
)

export default {
  install (Vue, options) {
    Vue.prototype.$urls = urls
    Vue.prototype.$axios = httpclient
  }
}
