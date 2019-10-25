// import store from '@/store'
import util from '@/libs/util'

export default {
  install (Vue, options) {
    // 打印log
    // 如果只有一个参数 就只简单打印第一个参数
    // 如果有大于一个参数 第一个参数会当做是分组的名称
    Vue.prototype.$log = util.log
  }
}
