import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'

// store
import store from '@/store/index'

// 核心插件
import d2Admin from '@/plugin/d2admin'

// 模拟数据
// import '@/mock'

// font-awesome
import '@/assets/library/font-awesome-4.7.0/css/font-awesome.min.css'

// simplemde css
import 'simplemde/dist/simplemde.min.css'

// svg图标
import '@/assets/icons/index.js'

// markdown主题
import 'github-markdown-css'

// 代码高亮主题
import '@/assets/library/highlight/styles/atom-one-light.css'

import VueFroala from 'vue-froala-wysiwyg'

// [ 可选插件组件 ] 照片查看器
import Viewer from 'v-viewer'
// [ 可选插件组件 ] 时间格式化工具
const moment = require('moment')
require('moment/locale/zh-cn')

// 核心插件
Vue.use(d2Admin)

// 可选插件组件
Vue.use(Viewer)
Vue.use(VueFroala)
Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted () {
    // 用户登陆后从数据库加载一系列的设置
    this.$store.commit('d2admin/account/load', this)

    // 从数据库加载常规数据
    this.$store.commit('common/load', this)
  }
}).$mount('#app')
