// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/../theme/index.css'

// 组件
import '@/components'
// 异步请求库
import axios from '@/plugin/axios'
// 功能插件
// import pluginImport from '@/plugin/import'
// import pluginExport from '@/plugin/export'
import pluginLog from '@/plugin/log'

export default {
  install (Vue, options) {
    // Element
    Vue.use(ElementUI)
    // 异步请求库
    Vue.use(axios)
    // 功能插件
    // Vue.use(pluginImport)
    // Vue.use(pluginExport)
    Vue.use(pluginLog)
    // 设置为 false 以阻止 vue 在启动时生成生产提示。
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    // 简化代码中 process.env.BASE_URL 取值
    Vue.prototype.$baseUrl = process.env.BASE_URL
  }
}
