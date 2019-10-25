/**
 * @description Automatic configuration of environment during packing.
 * @host dev:  (e.g.'http://atis-managementapi-uat.chinacloudsites.cn/').
 * @host test: (e.g.'https://atis-managementapi-uat.chinacloudsites.cn/').
 * @host prod: (e.g.'https://atis-managementapi.chinacloudsites.cn/').
 */

const baseURL = process.env.BASE_URL

export default {
  baseURL,
  timeout: 10000,
  headers: {
    'content-type': 'application/json'
  }
}
